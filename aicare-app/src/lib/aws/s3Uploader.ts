import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const s3Client = new S3Client({
  region: "us-east-2"
});

export async function uploadFileToS3(
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const params = {
    Bucket: "aicare-medical-records-uploads",
    Key: fileName,
    Body: file,
    ContentType: contentType
  };

  const upload = new Upload({
    client: s3Client,
    params
  });

  try {
    await upload.done();
    return `https://aicare-medical-records-uploads.s3.us-east-2.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw error;
  }
}
