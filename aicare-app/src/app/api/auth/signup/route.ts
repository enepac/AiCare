import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/user";
import { SharedAccess } from "@/models/SharedAccess";
import bcrypt from "bcryptjs";
import { validatePassword } from "@/utils/validation";

export async function POST(req: NextRequest) {
  const { name, email, password, ref } = await req.json();
  await dbConnect();

  // Check if the email is already in use
  if (await User.findOne({ email })) {
    return NextResponse.json({ message: "Email already in use" }, { status: 400 });
  }

  // ✅ Enforce Secure Password Validation
  const passwordError = validatePassword(password);
  if (passwordError) {
    return NextResponse.json({ message: passwordError }, { status: 400 });
  }

  // ✅ Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  // ✅ If referred via share link, accept the SharedAccess
  if (ref && typeof ref === "string") {
    const existing = await SharedAccess.findOne({
      patientEmail: ref,
      viewerEmail: email,
      status: "pending"
    });

    if (existing) {
      await SharedAccess.updateOne({ _id: existing._id }, { $set: { status: "accepted" } });
      console.log(`✅ Linked ${email} to ${ref}'s data via SharedAccess`);
    }
  }

  return NextResponse.json({ message: "User created successfully!" });
}
