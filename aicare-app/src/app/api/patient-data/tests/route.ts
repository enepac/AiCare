import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/utils/db";
import TestResult from "@/models/TestResult";
import SharedAccess from "@/models/SharedAccess";

// Shared viewer resolution
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

// GET all results
export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const { email } = await resolveTargetEmail(token.email);

  const results = await TestResult.find({ userEmail: email }).sort({ testDate: -1 });
  return NextResponse.json(results);
}

// POST new test (manual or upload)
export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const { email, readonly } = await resolveTargetEmail(token.email);
  if (readonly) return NextResponse.json({ error: "Viewer cannot modify data" }, { status: 403 });

  const contentType = req.headers.get("content-type") || "";

  // File upload (multipart)
  if (contentType.includes("multipart/form-data")) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    // const buffer = Buffer.from(await file.arrayBuffer());

    // 🔁 Simulated GPT result (replace later)
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

  // Manual JSON entry
  const body = await req.json();
  const result = await TestResult.create({
    ...body,
    userEmail: email
  });

  return NextResponse.json(result);
}

// PUT: update test result
export async function PUT(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const { email, readonly } = await resolveTargetEmail(token.email);
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

// DELETE test result
export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const { email, readonly } = await resolveTargetEmail(token.email);
  if (readonly) return NextResponse.json({ error: "Viewer cannot modify data" }, { status: 403 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const deleted = await TestResult.findOneAndDelete({ _id: id, userEmail: email });
  return NextResponse.json({ message: "Deleted", deleted });
}
