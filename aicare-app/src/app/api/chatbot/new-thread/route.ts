import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect } from "@/utils/db";
import Conversation from "@/models/conversation";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const { title } = await req.json();
    const newConversation = await Conversation.create({
      userId: session.user.id,
      title: title ?? "New Conversation",
      messages: [],
      attachments: []
    });

    return NextResponse.json({ conversation: newConversation }, { status: 201 });
  } catch (error) {
    console.error("Error creating new conversation:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
