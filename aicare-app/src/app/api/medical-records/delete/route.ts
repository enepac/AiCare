import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { dbConnect } from "@/lib/mongodb";
import MedicalRecord from "@/models/MedicalRecord";

export async function DELETE(req: NextRequest) {
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

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing file ID" }, { status: 400 });
  }

  try {
    const record = await MedicalRecord.findOne({ _id: id, userEmail });
    if (!record) {
      return NextResponse.json({ error: "Record not found or unauthorized" }, { status: 404 });
    }

    const fullFilePath = path.join(process.cwd(), "public", record.filePath);
    if (fs.existsSync(fullFilePath)) {
      fs.unlinkSync(fullFilePath);
    }

    await MedicalRecord.deleteOne({ _id: id });

    return NextResponse.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting record:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
