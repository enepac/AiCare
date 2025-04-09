import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/utils/db";
import SymptomLog from "@/models/SymptomLog";
import { getScopedEmail, isViewerMode } from "@/lib/utils/viewerScope";

// GET: /symptoms?date=YYYY-MM-DD (optional)
export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const scopedEmail = await getScopedEmail(req);
  if (!scopedEmail) {
    return NextResponse.json({ error: "Unable to resolve user context" }, { status: 403 });
  }

  const date = req.nextUrl.searchParams.get("date");
  const filter = date ? { userEmail: scopedEmail, date } : { userEmail: scopedEmail };

  const logs = await SymptomLog.find(filter).sort({ date: -1 });
  return NextResponse.json(logs);
}

// POST: create or update log for a date
export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  if (await isViewerMode(req)) {
    return NextResponse.json({ error: "Viewers cannot modify shared data" }, { status: 403 });
  }

  const scopedEmail = await getScopedEmail(req);
  const body = await req.json();

  const updated = await SymptomLog.findOneAndUpdate(
    { userEmail: scopedEmail, date: body.date },
    {
      userEmail: scopedEmail,
      symptoms: body.symptoms,
      notes: body.notes ?? ""
    },
    { upsert: true, new: true }
  );

  return NextResponse.json(updated);
}

// DELETE: /symptoms?id=xxx
export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  if (await isViewerMode(req)) {
    return NextResponse.json({ error: "Viewers cannot modify shared data" }, { status: 403 });
  }

  const scopedEmail = await getScopedEmail(req);
  const id = req.nextUrl.searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const deleted = await SymptomLog.findOneAndDelete({
    _id: id,
    userEmail: scopedEmail
  });

  return NextResponse.json({ message: "Deleted", deleted });
}
