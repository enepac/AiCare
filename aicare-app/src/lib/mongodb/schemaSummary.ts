import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export async function generateSchemaSummary() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  const dbName = "AiCareDB";
  const collectionName = "medicalrecords";

  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const collection = client.db(dbName).collection(collectionName);

    const samples = await collection.find({}).limit(100).toArray();

    const ignoredFields = new Set([
      "_id",
      "__v",
      "userEmail",
      "fileName",
      "fileType",
      "uploadDate",
      "filePath"
    ]);
    const schemaSet = new Set<string>();

    samples.forEach((record) => {
      Object.keys(record).forEach((key) => {
        if (!ignoredFields.has(key)) {
          schemaSet.add(key);
        }
      });
    });

    const schemaSummary = Array.from(schemaSet);
    const outputPath = path.join(process.cwd(), "schema_summary.json");

    fs.writeFileSync(outputPath, JSON.stringify(schemaSummary, null, 2));
    console.log("✅ Schema summary generated successfully:", schemaSummary);
  } catch (error) {
    console.error("❌ Schema summary generation error:", error);
  } finally {
    await client.close();
  }
}
