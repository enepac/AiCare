import { TextractClient, DetectDocumentTextCommand } from "@aws-sdk/client-textract";
import fs from "fs";
import path from "path";

const client = new TextractClient({ region: "us-east-1" });

export async function extractTextFromDocument(filePath: string): Promise<string> {
  const fileBytes = fs.readFileSync(path.resolve(filePath));

  const command = new DetectDocumentTextCommand({
    Document: { Bytes: fileBytes }
  });

  const response = await client.send(command);

  return response.Blocks?.map((block) => block.Text).join("\n") || "";
}
