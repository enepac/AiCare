import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // ✅ Import JWT for token verification
import User from "@/models/user";
import { dbConnect } from "@/lib/mongodb";

export async function GET(req: Request) {
  await dbConnect();

  // ✅ Extract Bearer Token
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("❌ Missing or invalid Authorization header");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    // ✅ Verify JWT Token
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as {
      id: string;
      email: string;
    };

    if (!decoded?.id) {
      console.error("❌ Invalid token payload");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Fetch User Data from Database
    const user = await User.findById(decoded.id);
    if (!user) {
      console.error("❌ User not found in database");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Return User Profile Data
    return NextResponse.json({
      name: user.name,
      email: user.email,
      age: user.age ?? null,
      gender: user.gender ?? "",
      allergies: user.allergies ?? "",
      medications: user.medications ?? "",
      familyHistory: user.familyHistory ?? "",
      activityLevel: user.activityLevel ?? "",
      diet: user.diet ?? "",
      height: user.height ?? null,
      weight: user.weight ?? null,
      bmi: user.bmi ?? null,
      bloodType: user.bloodType ?? "",
      isPregnant: user.isPregnant ?? false,
      profileCompletionSteps: user.profileCompletionSteps || []
    });
  } catch (error) {
    console.error("❌ Invalid or expired token:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
