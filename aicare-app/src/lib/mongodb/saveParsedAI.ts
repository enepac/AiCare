import { MongoClient, ObjectId } from "mongodb";

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = "AiCare";
const collectionName = "medicalRecords";

export default async function saveParsedAI(recordId: string, parsedAI: Record<string, unknown>) {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    await collection.updateOne(
      { _id: new ObjectId(recordId) },
      { $set: { parsedAI } },
      { upsert: true }
    );

    console.log("✅ Parsed AI successfully stored in MongoDB.");
  } catch (error) {
    console.error("❌ MongoDB Save Error:", error);
    throw error;
  } finally {
    await client.close();
  }
}
