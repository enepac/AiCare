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
    return NextResponse.json({ error: "Invalid target email" }, { status: 400 });
  }

  await dbConnect();

  const result = await SharedAccess.findOneAndUpdate(
    {
      patientEmail: token.email,
      viewerEmail: targetEmail,
      status: "accepted"
    },
    { status: "revoked" }
  );

  if (!result) {
    return NextResponse.json({ error: "No existing access found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Sharing access revoked successfully" });
}
