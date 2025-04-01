import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import MedicalRecord from "@/models/MedicalRecord";
import mime from "mime-types";
import { uploadFileToS3 } from "@/lib/aws/s3Uploader";
import { parseDocumentWithTextract } from "@/lib/aws/textractParser";
import { parsePdfWithTesseract } from "@/lib/ocr/ocrFallback";
import { parseMedicalTextWithGPT } from "@/lib/ai/gptMedicalParser";
import { generateSchemaSummary } from "@/lib/mongodb/schemaSummary";
import { parseDocx } from "@/lib/fileParsers/parseDocx";
import { parseRtfWithDocling } from "@/lib/fileParsers/parseRtfDocling";
import { parseHtmlCheerio } from "@/lib/fileParsers/parseHtmlCheerio";

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/dicom",
  "text/plain",
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/rtf",
  "text/rtf",
  "application/msword",
  "text/html"
];

export async function POST(req: NextRequest) {
  await dbConnect();

  const authHeader = req.headers.get("Authorization");
  console.log("🔍 Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized - No token provided" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  let userEmail: string;

  try {
    const decodedToken = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as { email?: string };

    if (!decodedToken.email) {
      return NextResponse.json({ error: "Unauthorized - Token invalid" }, { status: 401 });
    }

    userEmail = decodedToken.email;
    console.log("✅ Token Verified: User Email →", userEmail);
  } catch (error) {
    console.error("❌ JWT Verification Failed:", error);
    return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileType = file.type || mime.lookup(file.name) || "";
    console.log("🔍 Explicit File MIME Type:", fileType);

    if (!ALLOWED_FILE_TYPES.includes(fileType)) {
      return NextResponse.json({ error: `Invalid file type: ${fileType}` }, { status: 400 });
    }

    const fileExtension = mime.extension(fileType);
    const sanitizedEmail = userEmail.replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `${Date.now()}-${sanitizedEmail}.${fileExtension}`;

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    console.log("🔍 Uploading file to S3:", fileName);
    const s3Url = await uploadFileToS3(fileBuffer, fileName, fileType);
    console.log("✅ File successfully uploaded to S3:", s3Url);

    let extractedText = "";

    if (["application/pdf", "image/jpeg", "image/png"].includes(fileType)) {
      try {
        const textractResult = await parseDocumentWithTextract(
          "aicare-medical-records-uploads",
          fileName
        );
        extractedText = textractResult.extractedText;
      } catch (textractError) {
        console.warn("⚠️ Textract failed, using Tesseract OCR fallback...", textractError);
        const tesseractResult = await parsePdfWithTesseract(
          "aicare-medical-records-uploads",
          fileName
        );
        extractedText = tesseractResult.extractedText;
      }
    } else if (
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      extractedText = await parseDocx(fileBuffer);
    } else if (["application/rtf", "text/rtf", "application/msword"].includes(fileType)) {
      extractedText = await parseRtfWithDocling(fileBuffer);
    } else if (["text/plain", "text/csv"].includes(fileType)) {
      extractedText = fileBuffer.toString("utf-8");
    } else if (fileType === "text/html") {
      const htmlContent = fileBuffer.toString("utf-8");
      extractedText = await parseHtmlCheerio(htmlContent);
    } else {
      return NextResponse.json({ error: "Unsupported file type for parsing" }, { status: 400 });
    }

    if (!extractedText) {
      return NextResponse.json({ error: "Failed to extract text from document." }, { status: 500 });
    }

    console.log("✅ Extracted Text (preview):", extractedText.slice(0, 1000));

    const structuredData = await parseMedicalTextWithGPT(extractedText);
    console.log("✅ GPT Structured Data:", structuredData);

    const newRecord = new MedicalRecord({
      userEmail,
      fileName,
      fileType,
      uploadDate: new Date(),
      filePath: s3Url,
      ...structuredData
    });

    const savedRecord = await newRecord.save();
    console.log("✅ Medical record (structured) saved:", savedRecord);

    await generateSchemaSummary();
    console.log("✅ Schema summary updated.");

    return NextResponse.json({
      message: "File uploaded, parsed, and stored successfully",
      fileName,
      filePath: s3Url,
      parsedAI: structuredData
    });
  } catch (error) {
    console.error("❌ Error during file processing:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
