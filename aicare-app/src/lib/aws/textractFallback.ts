import { TextractClient, DetectDocumentTextCommand } from "@aws-sdk/client-textract";

export async function parseDocumentWithBasicTextract(bucket: string, key: string) {
  const client = new TextractClient({ region: "us-east-2" });

  const command = new DetectDocumentTextCommand({
    Document: {
      S3Object: {
        Bucket: bucket,
        Name: key
      }
    }
  });

  const response = await client.send(command);

  const text =
    response.Blocks?.filter((block) => block.BlockType === "LINE")
      .map((block) => block.Text)
      .join("\n") || "";

  return { extractedText: text };
}
