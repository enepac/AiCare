import type { NextAuthOptions } from "next-auth";
// import type { Account, Profile, User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/utils/db";
import User, { type IUser } from "@/models/user";

type ExtendedUser = {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  isProfileComplete?: boolean;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = (await User.findOne({ email: credentials.email }).lean()) as IUser | null;
        if (!user?._id) {
          throw new Error("User not found");
        }

        // Check if user registered with Google
        if (!user.password) {
          throw new Error("User registered with Google. Please sign in with Google.");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        // Return user object for JWT callback
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image ?? null,
          isProfileComplete: user.isProfileComplete ?? false
        } as ExtendedUser;
      }
    })
  ],

  session: {
    strategy: "jwt"
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();
      if (account?.provider === "google" && profile) {
        const extUser = user as ExtendedUser;
        const existingUser = (await User.findOne({ email: extUser.email })) as IUser | null;
        if (!existingUser) {
          const newUser = await User.create({
            name: extUser.name,
            email: extUser.email,
            googleId: account.providerAccountId,
            image: extUser.image,
            isProfileComplete: false,
            profileCompletionSteps: []
          });
          extUser.id = newUser._id.toString();
          extUser.isProfileComplete = newUser.isProfileComplete ?? false;
        } else {
          extUser.id = existingUser._id.toString();
          extUser.isProfileComplete = existingUser.isProfileComplete ?? false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        const extUser = user as ExtendedUser;
        token.id = extUser.id;
        token.email = extUser.email ?? "";
        token.name = extUser.name ?? "";
        token.image = extUser.image ?? "";
        token.isProfileComplete = extUser.isProfileComplete ?? false;
        token.accessToken = jwt.sign(
          { id: extUser.id, email: extUser.email },
          process.env.NEXTAUTH_SECRET!,
          { expiresIn: "30d" }
        );
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id ?? "",
        name: token.name ?? "",
        email: token.email ?? "",
        image: token.image ?? "",
        isProfileComplete: Boolean(token.isProfileComplete)
      };
      session.accessToken = token.accessToken ?? "";
      return session;
    }
  },

  debug: true
};
