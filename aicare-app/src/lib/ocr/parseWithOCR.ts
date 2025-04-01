import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFile } from "fs/promises";
import { extname, basename } from "path";
import { parsePdfWithTesseract } from "./ocrFallback";
import { exec } from "child_process";
import { promisify } from "util";

const s3 = new S3Client({ region: "us-east-2" });
const execAsync = promisify(exec);

const BUCKET_NAME = process.env.S3_UPLOAD_BUCKET || "aicare-chatbot-uploads";

export async function parseWithOCR(localFilePath: string): Promise<string> {
  const fileBuffer = await readFile(localFilePath);
  const key = `uploads/${Date.now()}-${basename(localFilePath)}`;
  const extension = extname(localFilePath).toLowerCase();

  // 1. Upload file to S3
  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: fileBuffer
      })
    );
    console.log(`📤 Uploaded to S3: ${key}`);
  } catch (err) {
    console.error("❌ S3 upload failed:", err);
    throw new Error("Failed to upload file to S3");
  }

  // 2. OCR depending on file type
  try {
    if (extension === ".pdf") {
      const { extractedText } = await parsePdfWithTesseract(BUCKET_NAME, key);
      return extractedText;
    }

    if ([".png", ".jpg", ".jpeg"].includes(extension)) {
      console.log("🔍 Running Tesseract on image:", localFilePath);
      const { stdout } = await execAsync(`tesseract "${localFilePath}" stdout -l eng`);
      return stdout;
    }

    throw new Error("Unsupported file type for OCR");
  } catch (err) {
    console.error("❌ OCR processing failed:", err);
    throw new Error("Failed to extract text from file");
  }
}
