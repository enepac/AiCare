import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/utils/db";
import { SharedAccess } from "@/models/SharedAccess";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { targetEmail } = await req.json();
  if (!targetEmail || !targetEmail.includes("@")) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  await dbConnect();

  const existing = await SharedAccess.findOne({
    viewerEmail: token.email,
    patientEmail: targetEmail
  });

  if (existing && existing.status === "accepted") {
    return NextResponse.json({ message: "Already granted access." });
  }

  await SharedAccess.findOneAndUpdate(
    { viewerEmail: token.email, patientEmail: targetEmail },
    { $set: { status: "requested" } },
    { upsert: true }
  );

  console.log(`📨 ${token.email} requested to view ${targetEmail}'s data`);

  return NextResponse.json({ message: "Request sent successfully" });
}
