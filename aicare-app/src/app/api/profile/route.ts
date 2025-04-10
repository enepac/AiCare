import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import User from "@/models/user";
import { dbConnect } from "@/lib/mongodb";
import { resolveEffectiveUser } from "@/lib/server/resolveEffectiveUser";
import { z } from "zod";

export async function GET(req: NextRequest) {
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

// ✅ Profile input validation schema using zod
const profileSchema = z.object({
  name: z.string().min(2).max(100),
  age: z.number().int().min(0).max(130),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"]),
  allergies: z.string().max(500).optional().nullable(),
  medications: z.string().max(500).optional().nullable(),
  familyHistory: z.string().max(1000).optional().nullable(),
  activityLevel: z.enum(["Low", "Moderate", "High"]).optional().nullable(),
  diet: z.string().max(300).optional().nullable(),
  height: z.number().min(30).max(300),
  weight: z.number().min(2).max(600),
  bmi: z.number().min(10).max(100).optional().nullable(),
  bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  isPregnant: z.boolean().optional()
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const effectiveEmail = await resolveEffectiveUser(req);
    const body = await req.json();

    const parsed = profileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updateResult = await User.updateOne({ email: effectiveEmail }, { $set: parsed.data });

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ error: "No changes made" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
