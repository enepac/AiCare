import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
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

    const requiredFields = [
      "age",
      "gender",
      "allergies",
      "medications",
      "familyHistory",
      "activityLevel",
      "diet"
    ];

    // 👇 Fix: explicitly cast via `unknown` first
    const userObj = user.toObject() as unknown as Record<string, unknown>;

    const missingFields = requiredFields.filter(
      (field) => !userObj[field] || userObj[field] === ""
    );

    console.log("🔍 Missing profile fields:", missingFields);

    const completedFields = requiredFields.length - missingFields.length;
    const completionPercentage = Math.round((completedFields / requiredFields.length) * 100);

    return NextResponse.json({
      completedSteps: requiredFields.filter(
        (field) => userObj[field] !== "" && userObj[field] !== null
      ),
      missingFields,
      completionPercentage
    });
  } catch (error) {
    console.error("❌ Error fetching profile progress:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
