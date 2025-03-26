// File: /workspaces/aicare/aicare-app/src/app/api/chatbot/route.ts

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect } from "@/utils/db";
import User from "@/models/user";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { messages } = await req.json();
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: "Valid messages array required" }, { status: 400 });
  }

  await dbConnect();

  const user = await User.findById(session.user.id).lean();

  const userContext = user
    ? `Patient profile: Age ${user.age ?? "N/A"}, Gender ${user.gender ?? "N/A"}, Height ${
        user.height ?? "N/A"
      } cm, Weight ${user.weight ?? "N/A"} kg, BMI ${
        user.bmi ?? "N/A"
      }, Medical History: ${user.familyHistory ?? "N/A"}, Allergies: ${
        user.allergies ?? "N/A"
      }, Medications: ${user.medications ?? "N/A"}.`
    : "Patient profile information is unavailable.";

  const promptMessages = [
    {
      role: "system",
      content: `You are AiCare, an intelligent medical assistant providing guidance based on patient data. ${userContext}`
    },
    ...messages
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: promptMessages,
      temperature: 0.3,
      max_tokens: 1000
    });

    return NextResponse.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
