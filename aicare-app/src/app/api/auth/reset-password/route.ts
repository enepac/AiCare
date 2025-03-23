import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { dbConnect } from "@/lib/mongodb";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ message: "Missing token or password" }, { status: 400 });
    }

    // Find user with the reset token
    const user = await User.findOne({ resetToken: token });

    if (!user || !user._id) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    if (!user.password) {
      return NextResponse.json(
        { message: "User does not have a password set. Please use Google login." },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined; // ✅ Use `undefined` instead of `null`
    await user.save();

    return NextResponse.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ message: "Error resetting password" }, { status: 500 });
  }
}
