import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect } from "@/utils/db";
import Conversation from "@/models/conversation";

interface RouteParams {
  params: {
    threadId: string;
  };
}

// GET /api/chatbot/threads/[threadId]
export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // Retrieve conversation by _id, ensuring it belongs to the authenticated user
    const conversation = await Conversation.findOne({
      _id: params.threadId,
      userId: session.user.id
    }).lean();

    if (!conversation) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ conversation }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving single conversation:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
