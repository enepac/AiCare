import { dbConnect } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await dbConnect();

    // Delete all users (for testing only)
    await User.deleteMany({});

    return NextResponse.json({
      message: "✅ All test users removed successfully!"
    });
  } catch (error) {
    console.error("Error resetting users:", error);
    return NextResponse.json({ message: "❌ Failed to reset users" }, { status: 500 });
  }
}
