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
    return NextResponse.json({ error: "Invalid patient email." }, { status: 400 });
  }

  await dbConnect();

  const updated = await SharedAccess.findOneAndUpdate(
    { viewerEmail: token.email, patientEmail },
    { $set: { status: "accepted" } },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: "Request not found." }, { status: 404 });
  }

  return NextResponse.json({ message: "Request accepted." });
}
