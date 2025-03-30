import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Conversation from "@/models/conversation";
import { v4 as uuidv4 } from "uuid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newThread = await Conversation.create({
      threadId: uuidv4(),
      title: "New Conversation",
      userId: session.user.id,
      messages: []
    });

    return NextResponse.json({ thread: newThread }, { status: 201 });
  } catch (error) {
    console.error("[POST /chatbot/new-thread]", error);
    return NextResponse.json({ error: "Failed to create new thread" }, { status: 500 });
  }
}
