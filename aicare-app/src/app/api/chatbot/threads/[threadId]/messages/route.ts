import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Conversation from "@/models/conversation";
import { dbConnect } from "@/utils/db";
import { getIO } from "@../../../socket";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: NextRequest, { params }: { params: { threadId: string } }) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content } = await req.json();

  if (!content) {
    return NextResponse.json({ error: "Message content is required" }, { status: 400 });
  }

  const conversation = await Conversation.findOneAndUpdate(
    { threadId: params.threadId, userId: session.user.id },
    { $push: { messages: { sender: "user", content, timestamp: new Date() } } },
    { new: true }
  );

  if (!conversation) {
    return NextResponse.json({ error: "Thread not found or unauthorized" }, { status: 404 });
  }

  const io = getIO();
  io.to(params.threadId).emit("new_message", { sender: "user", content });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.o",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful healthcare assistant named AiCare, providing concise and clear responses."
        },
        { role: "user", content }
      ]
    });

    const aiContent = completion.choices[0].message.content?.trim();

    if (!aiContent) {
      throw new Error("GPT returned an empty response.");
    }

    conversation.messages.push({
      sender: "ai",
      content: aiContent,
      timestamp: new Date()
    });

    await conversation.save();

    io.to(params.threadId).emit("new_message", { sender: "ai", content: aiContent });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json({ error: "GPT response generation failed." }, { status: 500 });
  }
}
