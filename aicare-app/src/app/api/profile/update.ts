import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { dbConnect } from "@/utils/db";
import User from "@/models/user";
import { authOptions } from "../../../lib/authOptions";

export async function PATCH(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Authenticate the user
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const updates = await req.json();

    // Ensure updates contain valid data
    if (!updates || typeof updates !== "object") {
      return NextResponse.json({ message: "Invalid request data" }, { status: 400 });
    }

    // Find and update the user profile
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
