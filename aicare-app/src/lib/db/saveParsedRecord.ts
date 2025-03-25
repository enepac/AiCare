import { dbConnect } from "@/lib/mongodb";

export async function saveParsedRecord(parsedData: Record<string, unknown>) {
  const conn = await dbConnect();

  const MedicalRecord = conn.collection("medical_records");

  const result = await MedicalRecord.insertOne({
    ...parsedData,
    createdAt: new Date()
  });

  return result.insertedId;
}
