import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/lib/mongodb";
import { SharedAccess } from "@/models/SharedAccess";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email: targetEmail } = await req.json();
  if (!targetEmail || !targetEmail.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (targetEmail === token.email) {
    return NextResponse.json(
      { error: "You cannot request access to your own account." },
      { status: 400 }
    );
  }

  await dbConnect();

  const existing = await SharedAccess.findOne({
    viewerEmail: token.email,
    patientEmail: targetEmail
  });

  if (existing) {
    return NextResponse.json(
      { message: `Access request already ${existing.status}.` },
      { status: 200 }
    );
  }

  const request = new SharedAccess({
    viewerEmail: token.email,
    patientEmail: targetEmail,
    status: "pending"
  });

  await request.save();

  console.log(`📥 Access request: ${token.email} wants to view ${targetEmail}`);
  return NextResponse.json({ message: "Access request sent." }, { status: 200 });
}
