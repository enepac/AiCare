import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Conversation from "@/models/conversation";
import { dbConnect } from "@/utils/db";

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conversations = await Conversation.find({ userId: session.user.id })
    .sort({ updatedAt: -1 })
    .select("threadId title createdAt updatedAt");

  return NextResponse.json(conversations);
}
