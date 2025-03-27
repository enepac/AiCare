import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Conversation from "@/models/conversation";
import PatientProfile from "@/models/user";
import MedicalRecord from "@/models/MedicalRecord";
import { dbConnect } from "@/utils/db";
import { getIO } from "@../../../socket";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: NextRequest, { params }: { params: { threadId: string } }) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("User session:", session.user);

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
    const profile = await PatientProfile.findOne({ email: session.user.email });

    const medicalRecords = await MedicalRecord.find({ userEmail: session.user.email })
      .sort({ uploadDate: -1 })
      .limit(5);

    console.log("Retrieved Patient Profile:", profile);
    console.log("Retrieved Medical Records:", medicalRecords);

    const recordsContext =
      medicalRecords
        .map(
          (record) => `
      Record Date: ${record.uploadDate.toDateString()}
      Chief Complaint: ${record.chief_complaint || "Not specified"}
      Findings: ${record.findings || "Not specified"}
      Assessment: ${record.assessment || "Not specified"}
      Medications: ${record.medications || "None"}
      Follow-up Plan: ${record.follow_up_plan || "Not specified"}
    `
        )
        .join("\n\n") || "No recent medical records.";

    const context = `
    Patient Profile:
    - Name: ${profile?.name || "Not provided"}
    - Age: ${profile?.age || "Not provided"}
    - Gender: ${profile?.gender || "Not provided"}
    - Height: ${profile?.height || "Not provided"} cm
    - Weight: ${profile?.weight || "Not provided"} kg
    - BMI: ${profile?.bmi || "Not provided"}
    - Blood Type: ${profile?.bloodType || "Not provided"}
    - Allergies: ${profile?.allergies || "None"}
    - Medications: ${profile?.medications || "None"}
    - Family Medical History: ${profile?.familyHistory || "Not provided"}
    - Activity Level: ${profile?.activityLevel || "Not provided"}
    - Diet: ${profile?.diet || "Not provided"}
    - Pregnant: ${profile?.isPregnant ? "Yes" : "No"}

    Recent Medical Records:
    ${recordsContext}
    `;

    const recentMessages: ChatCompletionMessageParam[] = conversation.messages
      .slice(-10)
      .map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content
      }));

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a Medical Specialist. Use the patient's medical profile, recent medical records, and conversation history provided below to generate personalized, accurate, and context-aware responses.\n\n${context}`
        },
        ...recentMessages,
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
