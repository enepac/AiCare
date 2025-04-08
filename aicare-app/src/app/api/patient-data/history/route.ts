import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/utils/db";
import MedicalHistory from "@/models/MedicalHistory";
import { SharedAccess } from "@/models/SharedAccess";

async function resolveTargetEmail(
  tokenEmail: string
): Promise<{ email: string; readonly: boolean }> {
  const access = await SharedAccess.findOne({
    viewerEmail: tokenEmail,
    status: "accepted"
  });

  if (access) {
    return { email: access.patientEmail, readonly: true };
  }

  return { email: tokenEmail, readonly: false };
}

// GET: List entries
export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const { email } = await resolveTargetEmail(token.email);

  const entries = await MedicalHistory.find({ userEmail: email }).sort({ date: -1 });
  return NextResponse.json(entries);
}

// POST: Create entry
export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const { email, readonly } = await resolveTargetEmail(token.email);
  if (readonly) return NextResponse.json({ error: "Viewer cannot modify data" }, { status: 403 });

  const body = await req.json();
  const entry = new MedicalHistory({ userEmail: email, ...body });

  const saved = await entry.save();
  return NextResponse.json(saved);
}

// PUT: Update entry
export async function PUT(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const { email, readonly } = await resolveTargetEmail(token.email);
  if (readonly) return NextResponse.json({ error: "Viewer cannot modify data" }, { status: 403 });

  const body = await req.json();
  const { _id, ...updates } = body;

  const updated = await MedicalHistory.findOneAndUpdate(
    { _id, userEmail: email },
    { $set: updates },
    { new: true }
  );

  if (!updated) return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  return NextResponse.json(updated);
}

// DELETE: Remove entry
export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const { email, readonly } = await resolveTargetEmail(token.email);
  if (readonly) return NextResponse.json({ error: "Viewer cannot modify data" }, { status: 403 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const deleted = await MedicalHistory.findOneAndDelete({ _id: id, userEmail: email });
  if (!deleted) return NextResponse.json({ error: "Entry not found" }, { status: 404 });

  return NextResponse.json({ message: "Deleted", deleted });
}
