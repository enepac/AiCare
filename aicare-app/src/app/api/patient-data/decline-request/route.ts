import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/utils/db";
import { SharedAccess } from "@/models/SharedAccess";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { viewerEmail } = await req.json();
  if (!viewerEmail || !viewerEmail.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  await dbConnect();

  const existing = await SharedAccess.findOne({
    patientEmail: token.email,
    viewerEmail
  });

  if (!existing) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  await SharedAccess.deleteOne({
    patientEmail: token.email,
    viewerEmail
  });

  console.log(`❌ Access request from ${viewerEmail} declined by ${token.email}`);
  return NextResponse.json({ message: "Request declined successfully." });
}
