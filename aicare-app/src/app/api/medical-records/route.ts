import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import MedicalRecord from "@/models/MedicalRecord";
import mime from "mime-types";
import { uploadFileToS3 } from "@/lib/aws/s3Uploader";
import { parseDocumentWithTextract } from "@/lib/aws/textractParser";
import { parseMedicalTextWithGPT } from "@/lib/ai/gptMedicalParser";
import { generateSchemaSummary } from "@/lib/mongodb/schemaSummary"; // ✅ added import

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "application/dicom"];

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

    const fileType = mime.lookup(file.name);
    if (!fileType || !ALLOWED_TYPES.includes(fileType)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const fileExtension = mime.extension(fileType);
    const sanitizedEmail = userEmail.replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `${Date.now()}-${sanitizedEmail}.${fileExtension}`;

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    console.log("🔍 Uploading file to S3:", fileName);
    const s3Url = await uploadFileToS3(fileBuffer, fileName, fileType);
    console.log("✅ File successfully uploaded to S3:", s3Url);

    // Textract parsing
    const textractResult = await parseDocumentWithTextract(
      "aicare-medical-records-uploads",
      fileName
    );
    console.log("✅ Extracted Text:", textractResult.extractedText);

    // GPT-powered structured parsing with consistent field names
    const structuredData = await parseMedicalTextWithGPT(textractResult.extractedText);
    console.log("✅ GPT Structured Data:", structuredData);

    // Save dynamically structured data directly to MongoDB (dynamic schema)
    const newRecord = new MedicalRecord({
      userEmail,
      fileName,
      fileType,
      uploadDate: new Date(),
      filePath: s3Url,
      ...structuredData // Dynamically merge GPT-structured fields
    });

    const savedRecord = await newRecord.save();
    console.log("✅ Medical record (dynamic structured fields) saved:", savedRecord);

    // ✅ Immediately regenerate schema summary after every upload
    await generateSchemaSummary();
    console.log("✅ Schema summary updated after upload.");

    return NextResponse.json({
      message: "File uploaded, parsed, and dynamically stored successfully",
      fileName,
      filePath: s3Url,
      parsedAI: structuredData
    });
  } catch (error) {
    console.error("❌ Error during file processing:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false
  }
};
