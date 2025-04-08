import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/lib/mongodb";
import { SharedAccess } from "@/models/SharedAccess";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { patientEmail } = await req.json();
  if (!patientEmail || typeof patientEmail !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await dbConnect();

  const removed = await SharedAccess.findOneAndDelete({
    patientEmail,
    viewerEmail: token.email,
    status: "pending"
  });

  if (!removed) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Request rejected" });
}
