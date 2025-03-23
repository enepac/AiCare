import { DefaultSession } from "next-auth";

/**
 * Augment NextAuth's default Session & JWT interfaces
 */
declare module "next-auth" {
  interface User {
    isProfileComplete?: boolean;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      isProfileComplete?: boolean;
    } & DefaultSession["user"];
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    name?: string;
    image?: string;
    isProfileComplete?: boolean;
    accessToken?: string;
  }
}
