import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Conversation from "@/models/conversation";
import { dbConnect } from "@/utils/db";

export async function GET(req: NextRequest, { params }: { params: { threadId: string } }) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conversation = await Conversation.findOne({
    threadId: params.threadId,
    userId: session.user.id
  });

  if (!conversation) {
    return NextResponse.json({ error: "Thread not found or unauthorized" }, { status: 404 });
  }

  return NextResponse.json({
    title: conversation.title,
    messages: conversation.messages
  });
}

export async function DELETE(req: NextRequest, { params }: { params: { threadId: string } }) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conversation = await Conversation.findOneAndDelete({
    threadId: params.threadId,
    userId: session.user.id
  });

  if (!conversation) {
    return NextResponse.json({ error: "Thread not found or unauthorized" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest, { params }: { params: { threadId: string } }) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title } = await req.json();

  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "Invalid title" }, { status: 400 });
  }

  const updated = await Conversation.findOneAndUpdate(
    { threadId: params.threadId, userId: session.user.id },
    { title },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: "Thread not found or unauthorized" }, { status: 404 });
  }

  return NextResponse.json({ success: true, title: updated.title });
}
