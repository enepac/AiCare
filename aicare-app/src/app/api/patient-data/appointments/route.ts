import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/utils/db";
import AppointmentRecord from "@/models/AppointmentRecord";

// GET: List all appointments
export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const records = await AppointmentRecord.find({ userEmail: token.email }).sort({
    appointmentDate: -1
  });

  return NextResponse.json(records);
}

// POST: Add new appointment
export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  await dbConnect();

  const record = await AppointmentRecord.create({
    ...body,
    userEmail: token.email
  });

  return NextResponse.json(record);
}

// PUT: Update appointment (must include _id)
export async function PUT(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { _id, ...update } = body;
  if (!_id) return NextResponse.json({ error: "Missing _id" }, { status: 400 });

  await dbConnect();

  const updated = await AppointmentRecord.findOneAndUpdate(
    { _id, userEmail: token.email },
    { $set: update },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// DELETE: Remove appointment by ID
export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await dbConnect();

  const deleted = await AppointmentRecord.findOneAndDelete({
    _id: id,
    userEmail: token.email
  });

  return NextResponse.json({ message: "Deleted", deleted });
}
