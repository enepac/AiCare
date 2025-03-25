import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const checkRecords = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI not defined.");
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const records = await client
      .db("AiCareDB")
      .collection("medicalrecords")
      .find({})
      .limit(3)
      .toArray();
    console.log("✅ Retrieved Records:", JSON.stringify(records, null, 2));
  } catch (error) {
    console.error("❌ Error retrieving records:", error);
  } finally {
    await client.close();
  }
};

checkRecords();
