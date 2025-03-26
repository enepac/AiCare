import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect } from "@/utils/db";
import Conversation from "@/models/conversation";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // Retrieve all conversations for the authenticated user, sort by most recent update.
    const threads = await Conversation.find({ userId: session.user.id })
      .sort({ updatedAt: -1 })
      .lean();

    return NextResponse.json({ threads }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving conversation threads:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
