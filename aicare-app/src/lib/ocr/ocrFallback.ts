import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { tmpdir } from "os";
import { join } from "path";
import { promises as fs } from "fs";
import { pipeline } from "stream/promises";
import { exec } from "child_process";
import { promisify } from "util";

const s3 = new S3Client({ region: "us-east-2" });
const execAsync = promisify(exec);

export async function parsePdfWithTesseract(bucket: string, key: string) {
  const tmpBase = join(tmpdir(), `ocr-${Date.now()}`);
  const tmpPdfPath = `${tmpBase}.pdf`;

  try {
    // 1. Download PDF from S3
    const { Body } = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    if (!Body || typeof Body === "string") throw new Error("Invalid S3 object body");

    const writeStream = await fs.open(tmpPdfPath, "w");
    await pipeline(Body as NodeJS.ReadableStream, writeStream.createWriteStream());
    await writeStream.close();

    // 2. Convert ALL pages to PNGs
    console.log("🔧 Converting PDF to PNG via pdftoppm...");
    const convertCmd = `pdftoppm -png -r 300 "${tmpPdfPath}" "${tmpBase}"`;
    await execAsync(convertCmd);

    const pngFiles = (await fs.readdir(tmpdir()))
      .filter((f) => f.startsWith(`ocr-${tmpBase.split("ocr-")[1]}`) && f.endsWith(".png"))
      .map((f) => join(tmpdir(), f));

    if (pngFiles.length === 0) throw new Error("No PNG files generated from PDF");

    // 3. Run Tesseract OCR per page
    let combinedText = "";
    for (const pngFile of pngFiles) {
      const txtFile = pngFile.replace(".png", ".txt");
      const tesseractCmd = `tesseract "${pngFile}" "${pngFile.replace(".png", "")}" -l eng`;
      console.log("🔍 Running Tesseract on:", pngFile);
      await execAsync(tesseractCmd);
      const pageText = await fs.readFile(txtFile, "utf-8");
      combinedText += pageText + "\n";
      await fs.unlink(txtFile);
    }

    console.log("✅ OCR Result:", combinedText.slice(0, 300), "...");
    return { extractedText: combinedText };
  } catch (err) {
    console.error("❌ Tesseract OCR fallback failed:", err);
    throw err;
  } finally {
    try {
      await fs.unlink(tmpPdfPath);
      const tmpFiles = (await fs.readdir(tmpdir())).filter((f) =>
        f.startsWith(`ocr-${tmpBase.split("ocr-")[1]}`)
      );
      for (const file of tmpFiles) {
        await fs.unlink(join(tmpdir(), file));
      }
    } catch (cleanupError) {
      console.warn("⚠️ OCR cleanup failed:", cleanupError);
    }
  }
}
