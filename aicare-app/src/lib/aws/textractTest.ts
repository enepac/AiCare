import { TextractClient, DetectDocumentTextCommand } from "@aws-sdk/client-textract";
import fs from "fs";
import path from "path";

const client = new TextractClient({ region: "us-east-1" });

async function detectText(filePath: string) {
  const fileBytes = fs.readFileSync(path.resolve(filePath));

  const command = new DetectDocumentTextCommand({
    Document: { Bytes: fileBytes }
  });

  try {
    const response = await client.send(command);
    console.log("Detected text:", response.Blocks?.map((block) => block.Text).join("\n"));
  } catch (error) {
    console.error("Error detecting text:", error);
  }
}

// Replace 'your-file-path.png' with a real image file for testing
detectText("/workspaces/aicare/record_ai.png");
