import { NextRequest, NextResponse } from "next/server";
import Conversation from "@/models/conversation";
import { dbConnect } from "@/utils/db";

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json(); // Only call req.json() once explicitly here
  const { title, threadId } = body;

  const existingConversation = await Conversation.findOne({ threadId });
  if (existingConversation) {
    return NextResponse.json({ error: "Thread already exists" }, { status: 400 });
  }

  const conversation = await Conversation.create({
    userId: "67de0c4150ae4251e11d910b", // Hardcoded for testing
    threadId: threadId || "default-thread",
    title: title || "Default Thread",
    messages: []
  });

  console.log("Created conversation:", conversation);

  return NextResponse.json({
    threadId: conversation.threadId,
    title: conversation.title
  });
}
