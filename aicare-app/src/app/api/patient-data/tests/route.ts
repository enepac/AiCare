import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/utils/db";
import TestResult from "@/models/TestResult";
import { SharedAccess } from "@/models/SharedAccess";
import User from "@/models/user";

// Viewer-aware email resolution utility
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

// GET: fetch test results with viewer context
export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const viewerEmail = req.headers.get("x-viewer-email")?.trim() || null;
  const { email } = await resolveTargetEmail(token.email, viewerEmail);

  const results = await TestResult.find({ userEmail: email }).sort({ testDate: -1 });
  return NextResponse.json(results);
}

// POST: create a test result (manual or AI)
export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const viewerEmail = req.headers.get("x-viewer-email")?.trim() || null;
  const { readonly, email } = await resolveTargetEmail(token.email, viewerEmail);
  if (readonly) return NextResponse.json({ error: "Viewer cannot modify data" }, { status: 403 });

  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    // Simulated GPT result — replace with real parsing logic
    const parsed = {
      testName: "Hemoglobin",
      value: 12.5,
      unit: "g/dL",
      referenceRange: "13.5–17.5",
      interpretation: "Low",
      sourceType: "upload",
      parsedByAI: true
    };

    return NextResponse.json(parsed);
  }

  const body = await req.json();
  const result = await TestResult.create({
    ...body,
    userEmail: email
  });

  return NextResponse.json(result);
}

// PUT: update a test result
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

  const updated = await TestResult.findOneAndUpdate(
    { _id, userEmail: email },
    { $set: update },
    { new: true }
  );

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

// DELETE: delete a test result
export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const viewerEmail = req.headers.get("x-viewer-email")?.trim() || null;
  const { readonly, email } = await resolveTargetEmail(token.email, viewerEmail);
  if (readonly) return NextResponse.json({ error: "Viewer cannot modify data" }, { status: 403 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const deleted = await TestResult.findOneAndDelete({ _id: id, userEmail: email });
  return NextResponse.json({ message: "Deleted", deleted });
}
