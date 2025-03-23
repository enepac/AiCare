import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth";
import { dbConnect } from "@/utils/db";
import User from "@/models/user";

export async function GET(req: NextRequest) {
  try {
    // Ensure database is connected
    await dbConnect();

    // Apply authentication middleware
    const session = await authMiddleware(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch users from the database
    const users = await User.find({});

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
