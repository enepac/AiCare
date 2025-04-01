import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { v4 as uuidv4 } from "uuid";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { dbConnect } from "@/utils/db";
import Conversation from "@/models/conversation";
import User from "@/models/user";
import { parseMedicalTextWithGPT } from "@/lib/ai/gptMedicalParser";
import { parseWithOCR } from "@/lib/ocr/parseWithOCR";
import { IMessage } from "@/models/conversation";

export const POST = async (req: NextRequest, { params }: { params: { threadId: string } }) => {
  const token = await getToken({ req });
  if (!token || !token.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userEmail = token.email;
  const threadId = params.threadId;
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file || !threadId) {
    return NextResponse.json({ message: "Missing file or threadId" }, { status: 400 });
  }

  const filename = `${uuidv4()}-${file.name}`;
  const tempPath = path.join("/tmp", filename);
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  try {
    // Save file temporarily to disk
    await writeFile(tempPath, fileBuffer);

    // Extract OCR from file (Textract → Tesseract fallback)
    const ocrText = await parseWithOCR(tempPath);
    if (!ocrText) throw new Error("OCR failed or empty");

    // Parse medical fields using GPT
    const parsedAI = await parseMedicalTextWithGPT(ocrText);

    // Find user and conversation
    await dbConnect();
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const conversation = await Conversation.findOne({
      threadId,
      userId: user._id
    });

    if (!conversation) {
      return NextResponse.json({ message: "Thread not found" }, { status: 404 });
    }

    // Append AI message to conversation
    const aiMessage: IMessage = {
      sender: "ai",
      content: `📄 Extracted insights from uploaded file:\n\n${JSON.stringify(parsedAI, null, 2)}`,
      timestamp: new Date()
    };

    conversation.messages.push(aiMessage);
    await conversation.save();

    return NextResponse.json({ aiMessage });
  } catch (err) {
    console.error("❌ Upload processing failed:", err);
    return NextResponse.json({ message: "File upload or processing failed." }, { status: 500 });
  } finally {
    await unlink(tempPath).catch(() => null); // Cleanup temp file
  }
};
