import { runDocling } from "@/utils/runDocling";
import fs from "fs";
import path from "path";

export async function parseRtfWithDocling(buffer: Buffer): Promise<string> {
  const tmpDir = path.join(process.cwd(), "tmp");
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const tempFilePath = path.join(tmpDir, `temp-${Date.now()}.rtf`);
  fs.writeFileSync(tempFilePath, buffer);

  try {
    const result = await runDocling(tempFilePath);
    console.log("✅ Docling output explicitly:", result);
    return (result.doclingMarkdown as string) || "";
  } catch (error) {
    console.error("❌ Docling parsing error explicitly:", error);

    if (error instanceof Error) {
      throw new Error(`Docling RTF parsing explicitly failed: ${error.message}`);
    }

    throw new Error("Docling RTF parsing explicitly failed with unknown error.");
  } finally {
    try {
      fs.unlinkSync(tempFilePath); // Cleanup temp file explicitly
    } catch (cleanupError) {
      console.warn("⚠️ Failed to clean up temp RTF file:", cleanupError);
    }
  }
}
