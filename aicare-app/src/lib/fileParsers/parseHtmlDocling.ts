// parseHtmlDocling.ts
import { exec } from "child_process";
import path from "path";
import fs from "fs";

export async function parseHtmlDocling(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const doclingEnvPath = path.join(process.cwd(), ".venv-docling/bin/docling");

    if (!fs.existsSync(filePath)) {
      reject(new Error(`File not found: ${filePath}`));
      return;
    }

    exec(`${doclingEnvPath} parse --format html ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Docling HTML parsing error: ${stderr}`));
        return;
      }
      resolve(stdout);
    });
  });
}
