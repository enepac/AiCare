import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import * as path from "path";
import fs from "fs";
import * as pdfParse from "pdf-parse/lib/pdf-parse.js";
import { dbConnect } from "@/lib/mongodb";
import MedicalRecord from "@/models/MedicalRecord";

export async function GET(req: NextRequest) {
  await dbConnect();

  // Extract token
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
    const buffer = fs.readFileSync(fullPath);

    let extractedText = "";

    if (record.fileType === "application/pdf") {
      const data = await pdfParse.default(buffer);
      extractedText = data.text;
    } else if (["image/jpeg", "image/png"].includes(record.fileType)) {
      const { spawn } = await import("child_process");
      const filePath = fullPath;

      const ocr = spawn("npx", ["ts-node", "scripts/ocr.ts", filePath]);

      const chunks: Buffer[] = [];

      extractedText = await new Promise<string>((resolve, reject) => {
        ocr.stdout.on("data", (chunk) => chunks.push(chunk));
        ocr.stderr.on("data", (err) => console.error("⚠️ OCR stderr:", err.toString()));
        ocr.on("close", (code) => {
          if (code !== 0) {
            reject(new Error(`OCR process exited with code ${code}`));
          } else {
            resolve(Buffer.concat(chunks).toString("utf-8").trim());
          }
        });
      });
    } else {
      return NextResponse.json(
        { error: "Unsupported file type for text extraction" },
        { status: 400 }
      );
    }

    return NextResponse.json({ extractedText });
  } catch (error) {
    console.error("❌ Text extraction error:", error);
    return NextResponse.json({ error: "Failed to extract text" }, { status: 500 });
  }
}
