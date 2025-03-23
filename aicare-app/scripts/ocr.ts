import * as fs from "fs";
import * as path from "path";
import * as Tesseract from "tesseract.js";

async function runOCR(filePath: string) {
  try {
    const buffer = fs.readFileSync(filePath);

    const { data } = await Tesseract.recognize(buffer, "eng");
    console.log(data.text); // Output extracted text to stdout
  } catch (err) {
    console.error("❌ OCR Error:", err);
    process.exit(1);
  }
}

// Read file path from CLI args
const args = process.argv.slice(2);
if (!args.length) {
  console.error("❌ No file path provided.");
  process.exit(1);
}

const absolutePath = path.resolve(process.cwd(), args[0]);
runOCR(absolutePath);
