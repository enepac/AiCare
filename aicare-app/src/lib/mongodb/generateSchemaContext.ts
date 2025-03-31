import { MongoClient, ObjectId } from "mongodb";

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = "AiCareDB";
const SAMPLE_LIMIT = 5;

const OMIT_FIELDS = ["_id", "__v", "password", "token", "session", "userEmail"];

export async function generateSchemaContext(userId?: string, userEmail?: string): Promise<string> {
  const client = new MongoClient(mongoUri);

  try {
    console.log("⚙️ generateSchemaContext() started");

    await client.connect();
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();

    const summaries: string[] = [];

    for (const { name: collectionName } of collections) {
      console.log(`📦 Scanning collection: ${collectionName}`);

      const collection = db.collection(collectionName);

      const filter: Record<string, unknown> = {};

      if (collectionName === "users" && userEmail) {
        filter["email"] = userEmail;
      } else if (collectionName === "medicalrecords" && userEmail) {
        filter["userEmail"] = userEmail;
      } else if (collectionName === "conversations" && userId) {
        filter["userId"] = new ObjectId(userId);
      }

      const docs = await collection
        .find(filter, { projection: omitProjection(OMIT_FIELDS) })
        .limit(SAMPLE_LIMIT)
        .toArray();

      if (!docs.length) {
        console.log(`⚠️ No documents found in: ${collectionName}`);
        continue;
      }

      console.log(`📌 First doc from ${collectionName}:`, docs[0]);

      let formatted = "";

      if (collectionName === "users") {
        docs.forEach((doc, i) => {
          console.log(`🧪 User doc sample ${i + 1}:`, doc);
        });

        formatted = docs.map((doc, i) => formatUserProfile(doc, i + 1)).join("\n");
      } else {
        formatted = docs.map((doc, i) => formatDocument(doc, `Record ${i + 1}`)).join("\n");
      }

      if (formatted.trim()) {
        summaries.push(`📘 Collection: **${collectionName}**\n${formatted}`);
        console.log(`✅ Summary pushed for: ${collectionName}`);
      } else {
        console.log(`⚠️ No fields formatted for ${collectionName}`);
      }
    }

    const output = summaries.join("\n\n");
    console.log("🧾 Final schema summary output:\n", output);
    return output;
  } catch (err) {
    console.error("❌ generateSchemaContext error:", err);
    return "MongoDB context unavailable due to an internal error.";
  } finally {
    await client.close();
  }
}

function omitProjection(fields: string[]) {
  const projection: Record<string, 0> = {};
  for (const field of fields) projection[field] = 0;
  return projection;
}

function formatDocument(doc: Record<string, unknown>, label: string): string {
  const entries = Object.entries(doc)
    .map(([key, value]) => {
      const val =
        typeof value === "object" && value !== null
          ? JSON.stringify(value, null, 2)
          : String(value);
      return `- ${key}: ${val}`;
    })
    .join("\n");
  return `\n${label}:\n${entries}`;
}

function formatUserProfile(doc: Record<string, unknown>, index: number): string {
  const importantKeys = [
    "name",
    "email",
    "age",
    "gender",
    "height",
    "weight",
    "bmi",
    "bloodType",
    "medications",
    "allergies",
    "activityLevel",
    "diet",
    "isPregnant",
    "conditions"
  ];

  const entries = importantKeys
    .filter((key) => key in doc)
    .map((key) => {
      const value = doc[key];
      const formatted =
        typeof value === "object" && value !== null
          ? JSON.stringify(value, null, 2)
          : String(value);
      return `- ${key}: ${formatted}`;
    })
    .join("\n");

  return `User ${index}:\n${entries}`;
}
