import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/utils/db";
import MedicalHistory from "@/models/MedicalHistory";

// GET: List entries for the logged-in user
export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const entries = await MedicalHistory.find({ userEmail: token.email }).sort({ date: -1 });
  return NextResponse.json(entries);
}

// POST: Create a new entry
export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const entry = new MedicalHistory({
    userEmail: token.email,
    ...body
  });

  await dbConnect();
  const saved = await entry.save();
  return NextResponse.json(saved);
}

// PUT: Update an existing entry (requires _id in body)
export async function PUT(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { _id, ...updates } = body;

  await dbConnect();
  const updated = await MedicalHistory.findOneAndUpdate(
    { _id, userEmail: token.email },
    { $set: updates },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// DELETE: Pass ID as query param (e.g. /api/patient-data/history?id=xxx)
export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await dbConnect();
  const deleted = await MedicalHistory.findOneAndDelete({ _id: id, userEmail: token.email });

  if (!deleted) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted", deleted });
}
