import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import User from "@/models/user";
import { dbConnect } from "@/lib/mongodb";

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      console.log("❌ Unauthorized request");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email } = session.user;

    if (!req.body) {
      console.log("❌ Empty request body");
      return NextResponse.json({ error: "Empty request body" }, { status: 400 });
    }

    const updatedData = await req.json();
    console.log("🔄 Incoming Update Request:", updatedData);

    // ✅ Allowed fields for profile update
    type ProfileFields =
      | "age"
      | "gender"
      | "allergies"
      | "medications"
      | "familyHistory"
      | "activityLevel"
      | "diet"
      | "height"
      | "weight"
      | "bmi"
      | "bloodType"
      | "isPregnant"
      | "expectedDeliveryDate";

    const allowedFields: ProfileFields[] = [
      "age",
      "gender",
      "allergies",
      "medications",
      "familyHistory",
      "activityLevel",
      "diet",
      "height",
      "weight",
      "bmi",
      "bloodType",
      "isPregnant",
      "expectedDeliveryDate"
    ];

    // ✅ Trim all string inputs before processing
    Object.keys(updatedData).forEach((key) => {
      if (typeof updatedData[key] === "string") {
        updatedData[key] = updatedData[key].trim();
      }
    });

    // ✅ Convert isPregnant from string to boolean
    if (updatedData.isPregnant !== undefined) {
      updatedData.isPregnant = updatedData.isPregnant === "true" || updatedData.isPregnant === true;
    }

    // ✅ Convert numerical fields properly
    const numericalFields: ProfileFields[] = ["age", "height", "weight", "bmi"];
    numericalFields.forEach((field) => {
      if (updatedData[field] !== undefined) {
        updatedData[field] = Number(updatedData[field]) || null;
      }
    });

    // ✅ Filter only the allowed fields to update
    const filteredUpdates: Partial<Record<ProfileFields, string | number | boolean>> = {};
    Object.keys(updatedData).forEach((key) => {
      if (allowedFields.includes(key as ProfileFields) && updatedData[key] !== undefined) {
        filteredUpdates[key as ProfileFields] = updatedData[key];
      }
    });

    if (Object.keys(filteredUpdates).length === 0) {
      console.log("⚠️ No valid fields to update");
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    // ✅ Fetch current user data
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      console.log("❌ User not found in database");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Update completed profile steps
    const completedSteps = new Set(existingUser.profileCompletionSteps);

    Object.keys(filteredUpdates).forEach((key) => {
      if (filteredUpdates[key as ProfileFields]) {
        completedSteps.add(key);
      }
    });

    // ✅ Perform MongoDB Update
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          ...filteredUpdates,
          profileCompletionSteps: Array.from(completedSteps)
        }
      },
      { new: true, runValidators: true }
    );

    console.log("✅ Successfully updated user:", updatedUser);

    return NextResponse.json({
      message: "✅ Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
