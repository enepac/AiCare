import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Conversation from "@/models/conversation";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const token = await getToken({ req: request });

    if (!token?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const threads = await Conversation.find({ userId: token.id }).sort({ updatedAt: -1 }).lean();

    console.log("✅ THREAD COUNT:", threads.length);
    return NextResponse.json({ threads }, { status: 200 });
  } catch (error) {
    console.error("[GET /chatbot/threads]", error);
    return NextResponse.json({ error: "Failed to load threads" }, { status: 500 });
  }
}
