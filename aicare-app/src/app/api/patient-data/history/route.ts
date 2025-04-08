import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/utils/db";
import MedicalHistory from "@/models/MedicalHistory";
import { getScopedEmail, isViewerMode } from "@/lib/utils/viewerScope";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const scopedEmail = await getScopedEmail(req);
  if (!scopedEmail) return NextResponse.json({ error: "Invalid context" }, { status: 403 });

  const entries = await MedicalHistory.find({ userEmail: scopedEmail }).sort({ date: -1 });
  return NextResponse.json(entries);
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  if (await isViewerMode(req)) {
    return NextResponse.json({ error: "Viewers cannot modify shared data" }, { status: 403 });
  }

  const scopedEmail = await getScopedEmail(req);
  const body = await req.json();

  const entry = new MedicalHistory({ userEmail: scopedEmail, ...body });
  const saved = await entry.save();

  return NextResponse.json(saved);
}

export async function PUT(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  if (await isViewerMode(req)) {
    return NextResponse.json({ error: "Viewers cannot modify shared data" }, { status: 403 });
  }

  const scopedEmail = await getScopedEmail(req);
  const body = await req.json();
  const { _id, ...updates } = body;

  const updated = await MedicalHistory.findOneAndUpdate(
    { _id, userEmail: scopedEmail },
    { $set: updates },
    { new: true }
  );

  if (!updated) return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  if (await isViewerMode(req)) {
    return NextResponse.json({ error: "Viewers cannot modify shared data" }, { status: 403 });
  }

  const scopedEmail = await getScopedEmail(req);
  const id = req.nextUrl.searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const deleted = await MedicalHistory.findOneAndDelete({ _id: id, userEmail: scopedEmail });
  if (!deleted) return NextResponse.json({ error: "Entry not found" }, { status: 404 });

  return NextResponse.json({ message: "Deleted", deleted });
}
