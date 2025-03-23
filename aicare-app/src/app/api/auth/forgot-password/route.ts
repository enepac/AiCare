import { dbConnect } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1-hour expiry

    // Save token to user in DB
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();
    console.log("✅ Reset token saved:", resetToken);

    console.log("🛠 Sending password reset email...");

    // Configure Nodemailer transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS // Use App Password
      }
    });

    // Send email
    const mailOptions = {
      from: `"AiCare Support" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Reset Your AiCare Password",
      html: `
        <p>You requested a password reset.</p>
        <p>Click <a href="${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}">
        here</a> to reset your password.</p>
        <p>If you did not request this, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Reset email sent to:", email);

    return NextResponse.json({
      message: "Reset link sent to email!"
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
