import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Conversation from "@/models/conversation";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(req: NextRequest, { params }: { params: { threadId: string } }) {
  try {
    await dbConnect();
    const thread = await Conversation.findOne({ threadId: params.threadId }).lean();
    if (!thread) {
      return NextResponse.json({ error: "Thread not found." }, { status: 404 });
    }
    return NextResponse.json({ messages: thread.messages || [] }, { status: 200 });
  } catch (error) {
    console.error("[GET /chatbot/messages]", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { threadId: string } }) {
  try {
    await dbConnect();
    const body = await req.json();
    const { content } = body;

    if (!content || !params.threadId) {
      return NextResponse.json({ error: "Missing content or threadId." }, { status: 400 });
    }

    const thread = await Conversation.findOne({ threadId: params.threadId });
    if (!thread) {
      return NextResponse.json({ error: "Thread not found." }, { status: 404 });
    }

    const userMessage = {
      sender: "user" as const,
      content,
      timestamp: new Date()
    };

    thread.messages.push(userMessage);

    const messagesForGPT: ChatCompletionMessageParam[] = thread.messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.content
    }));

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messagesForGPT,
      temperature: 0.7
    });

    const aiMessage = {
      sender: "ai" as const,
      content:
        aiResponse.choices[0]?.message.content || "Sorry, I had trouble generating a response.",
      timestamp: new Date()
    };

    thread.messages.push(aiMessage);
    await thread.save();

    return NextResponse.json({ aiMessage }, { status: 200 });
  } catch (error) {
    console.error("[POST /chatbot/messages]", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
