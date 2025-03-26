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
    throw new Error(`Docling RTF parsing explicitly failed: ${error.message || error}`);
  } finally {
    fs.unlinkSync(tempFilePath); // Cleanup temp file explicitly
  }
}
