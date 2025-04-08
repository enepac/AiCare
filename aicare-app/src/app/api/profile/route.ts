import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import User from "@/models/user";
import { dbConnect } from "@/lib/mongodb";
import { resolveEffectiveUser } from "@/lib/server/resolveEffectiveUser";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const effectiveEmail = await resolveEffectiveUser(req);

    const user = await User.findOne(
      { email: effectiveEmail },
      {
        name: 1,
        email: 1,
        age: 1,
        gender: 1,
        allergies: 1,
        medications: 1,
        familyHistory: 1,
        activityLevel: 1,
        diet: 1,
        height: 1,
        weight: 1,
        bmi: 1,
        bloodType: 1,
        isPregnant: 1
      }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const {
      name,
      age = "",
      gender = "",
      allergies = "",
      medications = "",
      familyHistory = "",
      activityLevel = "",
      diet = "",
      height = null,
      weight = null,
      bmi = null,
      bloodType = "",
      isPregnant = false
    } = user;

    const requiredFields = [
      "age",
      "gender",
      "allergies",
      "medications",
      "bloodType",
      "familyHistory",
      "activityLevel",
      "diet",
      "height",
      "weight",
      "bmi"
    ];

    const isProfileComplete = requiredFields.every((field) => {
      const value = user[field as keyof typeof user];
      return value !== "" && value !== null && value !== undefined;
    });

    return NextResponse.json({
      name,
      email: effectiveEmail,
      age,
      gender,
      allergies,
      medications,
      familyHistory,
      activityLevel,
      diet,
      height,
      weight,
      bmi,
      bloodType,
      isPregnant,
      isProfileComplete
    });
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    const errorMessage = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
