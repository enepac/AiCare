import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/lib/mongodb";
import { SharedAccess } from "@/models/SharedAccess";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { viewerEmail } = await req.json();
  if (!viewerEmail || !viewerEmail.includes("@")) {
    return NextResponse.json({ error: "Invalid viewer email" }, { status: 400 });
  }

  await dbConnect();

  const deleted = await SharedAccess.deleteOne({
    patientEmail: token.email,
    viewerEmail
  });

  if (deleted.deletedCount === 0) {
    return NextResponse.json({ error: "No access found to revoke" }, { status: 404 });
  }

  console.log(`🔒 Access revoked: ${token.email} revoked ${viewerEmail}`);
  return NextResponse.json({ success: true });
}
