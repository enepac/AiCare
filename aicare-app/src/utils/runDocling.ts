import path from "path";
import fs from "fs";
import { spawn } from "child_process";

export function runDocling(filePath: string): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const ext = path.extname(filePath).toLowerCase();

    // 🔁 Handle plain .txt directly
    if (ext === ".txt") {
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        return resolve({ doclingMarkdown: raw });
      } catch (err) {
        return reject({ error: "Failed to read .txt file", details: err });
      }
    }

    // 🔁 Handle .rtf by stripping basic tags
    if (ext === ".rtf") {
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        const plain = raw
          .replace(/\\[a-z]+\d* ?/g, "")
          .replace(/{|}|\\'/g, "")
          .replace(/\n+/g, " ")
          .replace(/ +/g, " ")
          .trim();
        return resolve({ doclingMarkdown: plain });
      } catch (err) {
        return reject({ error: "Failed to read .rtf file", details: err });
      }
    }

    // 🧠 Use Docling CLI for PDFs, DOCX, PNG, JPEG
    const doclingBinary = path.join(process.cwd(), ".venv-docling", "bin", "docling");
    const outputDir = path.join(process.cwd(), "tmp", `${Date.now()}-parsed`);
    const shellCommand = `${doclingBinary} "${filePath}" --output "${outputDir}"`;

    // console.log("🧪 Docling Shell Command:", shellCommand);

    const child = spawn("bash", ["-c", shellCommand]);

    let errorOutput = "";

    child.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    child.on("close", (code) => {
      try {
        if (code === 0 && fs.existsSync(outputDir)) {
          const files = fs.readdirSync(outputDir);
          const markdownFile = files.find((f) => f.endsWith(".md"));

          if (!markdownFile) {
            fs.rmSync(outputDir, { recursive: true, force: true });
            return resolve({
              doclingMarkdown: "⚠️ Docling ran but produced no markdown file.",
              rawFiles: files
            });
          }

          const markdownPath = path.join(outputDir, markdownFile);
          const raw = fs.readFileSync(markdownPath, "utf-8");

          fs.rmSync(outputDir, { recursive: true, force: true });

          resolve({ doclingMarkdown: raw });
        } else {
          reject({ error: "Docling CLI failed", details: errorOutput || "No output directory" });
        }
      } catch (err) {
        reject({ error: "Unhandled error reading Docling output", details: err });
      }
    });
  });
}
