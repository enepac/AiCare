import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import { dbConnect } from "@/lib/mongodb";
import MedicalRecord from "@/models/MedicalRecord";
import { parseMedicalRecordWithGPT } from "@/lib/parser/parseWithGPT";

export async function GET(req: NextRequest) {
  await dbConnect();

  const authHeader = req.headers.get("Authorization") || "";
  if (!authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized - Missing token" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  let userEmail: string;

  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!);
    if (typeof decoded !== "object" || decoded === null || !("email" in decoded)) {
      throw new Error("Invalid token");
    }
    userEmail = (decoded as { email: string }).email;
  } catch {
    return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing file ID" }, { status: 400 });
  }

  try {
    const record = await MedicalRecord.findOne({ _id: id, userEmail });
    if (!record) {
      return NextResponse.json({ error: "Record not found or unauthorized" }, { status: 404 });
    }

    const relativePath = record.filePath.startsWith("/")
      ? record.filePath.slice(1)
      : record.filePath;
    const fullPath = path.join(process.cwd(), "public", relativePath);

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: "File not found on server" }, { status: 404 });
    }

    // 🌟 Clearly integrate AWS Textract + GPT parsing pipeline
    const parsedAI = await parseMedicalRecordWithGPT(fullPath);

    // Save parsed output clearly into MongoDB
    record.parsedAI = parsedAI;
    await record.save();

    return NextResponse.json({
      parsed: record.parsedAI
    });
  } catch (error) {
    console.error("❌ Text extraction error:", error);
    return NextResponse.json({ error: "Failed to extract and parse text" }, { status: 500 });
  }
}
