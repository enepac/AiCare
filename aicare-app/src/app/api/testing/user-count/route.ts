import { dbConnect } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // Count users in the database
    const userCount = await User.countDocuments();

    return NextResponse.json({ userCount });
  } catch (error) {
    console.error("Error getting user count:", error);
    return NextResponse.json({ message: "❌ Failed to get user count" }, { status: 500 });
  }
}
