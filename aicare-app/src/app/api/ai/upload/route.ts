import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import MedicalRecord from "@/models/MedicalRecord";
import fs from "fs";
import path from "path";
import mime from "mime-types";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  let userEmail: string;

  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as { email?: string };
    if (!decoded.email) throw new Error();
    userEmail = decoded.email;
  } catch {
    return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileType = mime.lookup(file.name) || "application/octet-stream";
    const fileExt = mime.extension(fileType) || "bin";
    const safeEmail = userEmail.replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `${Date.now()}-${safeEmail}.${fileExt}`;
    const fullPath = path.join(UPLOAD_DIR, fileName);
    const publicPath = `/uploads/${fileName}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(fullPath, buffer);

    let extractedText = "";

    if (fileType === "application/pdf") {
      // @ts-expect-error: legacy path is not exposed in exports field
      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf");
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item: unknown) => {
            if (typeof item === "object" && item && "str" in item) {
              return (item as { str: string }).str;
            }
            return "";
          })
          .join(" ");
        extractedText += pageText + "\n";
      }
    } else if (["image/jpeg", "image/png"].includes(fileType)) {
      const { spawn } = await import("child_process");
      const ocr = spawn("npx", ["ts-node", "scripts/ocr.ts", fullPath]);

      const chunks: Buffer[] = [];
      extractedText = await new Promise<string>((resolve, reject) => {
        ocr.stdout.on("data", (chunk) => chunks.push(chunk));
        ocr.stderr.on("data", (err) => console.error("OCR stderr:", err.toString()));
        ocr.on("close", (code) => {
          if (code !== 0) reject(new Error(`OCR failed with code ${code}`));
          else resolve(Buffer.concat(chunks).toString("utf-8").trim());
        });
      });
    } else {
      extractedText = await file.text();
    }

    if (!extractedText || extractedText.trim().length < 10) {
      return NextResponse.json({ error: "Failed to extract meaningful text" }, { status: 400 });
    }

    const aiRes = await fetch("http://localhost:54000/api/ai/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ extractedText })
    });

    const aiData = await aiRes.json();
    const parsedAI = aiData.parsed ?? {};

    const record = new MedicalRecord({
      userEmail,
      fileName,
      fileType,
      uploadDate: new Date(),
      filePath: publicPath,
      parsedAI
    });

    await record.save();

    return NextResponse.json({
      message: "AI upload complete",
      record
    });
  } catch (err) {
    console.error("❌ AI Upload Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const config = {
  api: { bodyParser: false }
};
