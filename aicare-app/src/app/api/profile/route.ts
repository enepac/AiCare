import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";
import User from "@/models/user";
import { dbConnect } from "@/lib/mongodb";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email } = session.user;
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const requiredFields = [
      "age",
      "gender",
      "bloodType",
      "diet",
      "activityLevel",
      "height",
      "weight",
      "bmi"
    ];

    const isProfileComplete = requiredFields.every(
      (field) => user[field] !== "" && user[field] !== null && user[field] !== undefined
    );

    return NextResponse.json({
      name: user.name,
      email: user.email,
      age: user.age || "",
      gender: user.gender || "",
      allergies: user.allergies || "",
      medications: user.medications || "",
      familyHistory: user.familyHistory || "",
      activityLevel: user.activityLevel || "",
      diet: user.diet || "",
      height: user.height || null,
      weight: user.weight || null,
      bmi: user.bmi || null,
      bloodType: user.bloodType || "",
      isPregnant: user.isPregnant ?? false,
      isProfileComplete
    });
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profileUpdates = await req.json();

    await User.updateOne({ email: session.user.email }, { $set: profileUpdates }, { upsert: true });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Error saving profile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
