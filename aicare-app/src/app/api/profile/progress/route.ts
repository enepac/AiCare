import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import User from "@/models/user";
import { dbConnect } from "@/lib/mongodb";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    console.log("❌ Unauthorized request");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email } = session.user;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // List of profile fields that should be filled
    const requiredFields = [
      "age",
      "gender",
      "allergies",
      "medications",
      "familyHistory",
      "activityLevel",
      "diet"
    ];

    // Identify missing fields
    const missingFields = requiredFields.filter((field) => !user[field] || user[field] === "");

    console.log("🔍 Missing profile fields:", missingFields);

    // Calculate completion percentage
    const completedFields = requiredFields.length - missingFields.length;
    const completionPercentage = Math.round((completedFields / requiredFields.length) * 100);

    return NextResponse.json({
      completedSteps: Object.keys(user.toObject()).filter(
        (key) => requiredFields.includes(key) && user[key] !== "" && user[key] !== null
      ),
      missingFields,
      completionPercentage
    });
  } catch (error) {
    console.error("❌ Error fetching profile progress:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
