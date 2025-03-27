import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Conversation from "@/models/conversation";
import { dbConnect } from "@/utils/db";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { title?: string } = {};
  try {
    body = await req.json();
  } catch {
    // No body provided — fallback to empty object
  }

  const title = body?.title || "New Conversation";
  const threadId = nanoid();

  const conversation = await Conversation.create({
    userId: session.user.id,
    threadId,
    title,
    messages: []
  });

  return NextResponse.json({
    threadId: conversation.threadId,
    title: conversation.title
  });
}
