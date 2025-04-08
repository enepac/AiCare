import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/lib/mongodb";
import { SharedAccess } from "@/models/SharedAccess";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { targetEmail } = await req.json();
  if (!targetEmail || !targetEmail.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  await dbConnect();

  const result = await SharedAccess.deleteOne({
    patientEmail: token.email,
    viewerEmail: targetEmail,
    status: { $in: ["pending", "accepted"] }
  });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Nothing to cancel or already removed" }, { status: 404 });
  }

  console.log(`❌ Invite/share canceled: ${token.email} → ${targetEmail}`);
  return NextResponse.json({ message: "Share or invite canceled successfully" });
}
