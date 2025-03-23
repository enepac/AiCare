import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/mongodb";
import MedicalRecord from "@/models/MedicalRecord";

export async function PATCH(req: NextRequest) {
  await dbConnect();

  const authHeader = req.headers.get("Authorization") || "";
  if (!authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized - Missing token" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  let userEmail: string;

  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!);
    if (typeof decoded !== "object" || decoded === null || !("email" in decoded)) {
      throw new Error("Invalid token");
    }

    const { email } = decoded as { email: string };
    userEmail = email;
  } catch {
    return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, fileName } = body;

    if (!id || !fileName || typeof fileName !== "string") {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    const record = await MedicalRecord.findOne({ _id: id, userEmail });

    if (!record) {
      return NextResponse.json({ error: "Record not found or unauthorized" }, { status: 404 });
    }

    record.fileName = fileName;
    await record.save();

    return NextResponse.json({ message: "Metadata updated successfully", record });
  } catch (err) {
    console.error("❌ Error updating metadata:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
