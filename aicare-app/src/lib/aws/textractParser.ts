import {
  TextractClient,
  AnalyzeDocumentCommand,
  AnalyzeDocumentCommandOutput,
  FeatureType,
  BlockType
} from "@aws-sdk/client-textract";

const textractClient = new TextractClient({ region: "us-east-2" });

function extractTextFromBlocks(textractData: AnalyzeDocumentCommandOutput): string {
  return (
    textractData.Blocks?.filter((block) => block.BlockType === BlockType.LINE)
      .map((block) => block.Text)
      .join("\n") || ""
  );
}

export async function parseDocumentWithTextract(s3Bucket: string, documentName: string) {
  const params = {
    Document: {
      S3Object: {
        Bucket: s3Bucket,
        Name: documentName
      }
    },
    FeatureTypes: [FeatureType.FORMS, FeatureType.TABLES] // ✅ Fixed to use correct enum values
  };

  try {
    const command = new AnalyzeDocumentCommand(params);
    const response = await textractClient.send(command);

    const extractedText = extractTextFromBlocks(response);

    return { extractedText };
  } catch (error) {
    console.error("Textract Parsing Error:", error);
    throw error;
  }
}
