import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/utils/db";
import MedicationRecord from "@/models/MedicationRecord";
import { SharedAccess } from "@/models/SharedAccess";
import User from "@/models/user";

// Utility to resolve userEmail or shared access, with override
async function resolveTargetEmail(
  tokenEmail: string,
  overrideEmail?: string | null
): Promise<{ email: string; readonly: boolean }> {
  if (!overrideEmail || overrideEmail === tokenEmail) {
    return { email: tokenEmail, readonly: false };
  }

  const owner = await User.findOne({ email: overrideEmail });
  if (owner) {
    return { email: overrideEmail, readonly: true };
  }

  const viewer = await User.findOne({ email: tokenEmail });
  if (!viewer) return { email: tokenEmail, readonly: false };

  const access = await SharedAccess.findOne({
    viewerId: viewer._id,
    status: "accepted"
  });

  if (access) {
    const owner = await User.findById(access.ownerId);
    if (owner) {
      return { email: owner.email, readonly: true };
    }
  }

  return { email: tokenEmail, readonly: false };
}

// GET: All medications for the user or shared view
export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const viewerEmail = req.headers.get("x-viewer-email")?.trim() || null;
  const { email } = await resolveTargetEmail(token.email, viewerEmail);

  const records = await MedicationRecord.find({ userEmail: email }).sort({ startDate: -1 });
  return NextResponse.json(records);
}

// POST: Add a new medication
export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const viewerEmail = req.headers.get("x-viewer-email")?.trim() || null;
  const { readonly, email } = await resolveTargetEmail(token.email, viewerEmail);

  if (readonly) return NextResponse.json({ error: "Viewer cannot modify data" }, { status: 403 });

  const body = await req.json();

  const record = await MedicationRecord.create({
    ...body,
    userEmail: email
  });

  return NextResponse.json(record);
}

// PUT: Update a medication
export async function PUT(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const viewerEmail = req.headers.get("x-viewer-email")?.trim() || null;
  const { readonly, email } = await resolveTargetEmail(token.email, viewerEmail);

  if (readonly) return NextResponse.json({ error: "Viewer cannot modify data" }, { status: 403 });

  const body = await req.json();
  const { _id, ...update } = body;
  if (!_id) return NextResponse.json({ error: "Missing _id" }, { status: 400 });

  const updated = await MedicationRecord.findOneAndUpdate(
    { _id, userEmail: email },
    { $set: update },
    { new: true }
  );

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

// DELETE: Remove a medication
export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const viewerEmail = req.headers.get("x-viewer-email")?.trim() || null;
  const { readonly, email } = await resolveTargetEmail(token.email, viewerEmail);

  if (readonly) return NextResponse.json({ error: "Viewer cannot modify data" }, { status: 403 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const deleted = await MedicationRecord.findOneAndDelete({ _id: id, userEmail: email });
  return NextResponse.json({ message: "Deleted", deleted });
}
