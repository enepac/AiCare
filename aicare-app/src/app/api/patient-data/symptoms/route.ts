import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/utils/db";
import SymptomLog from "@/models/SymptomLog";

// GET: /symptoms?date=YYYY-MM-DD (optional)
export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const date = req.nextUrl.searchParams.get("date");
  const filter = date ? { userEmail: token.email, date } : { userEmail: token.email };

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
  const body = await req.json();

  const updated = await SymptomLog.findOneAndUpdate(
    { userEmail: token.email, date: body.date },
    {
      userEmail: token.email,
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
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const deleted = await SymptomLog.findOneAndDelete({
    _id: id,
    userEmail: token.email
  });

  return NextResponse.json({ message: "Deleted", deleted });
}
