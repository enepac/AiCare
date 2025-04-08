import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/lib/mongodb";
import { SharedAccess } from "@/models/SharedAccess";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { viewerEmail, action } = await req.json();

  if (!viewerEmail || !["accept", "reject"].includes(action)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  await dbConnect();

  const updated = await SharedAccess.findOneAndUpdate(
    { patientEmail: token.email, viewerEmail },
    { $set: { status: action === "accept" ? "accepted" : "rejected" } },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: `Request ${action === "accept" ? "approved" : "rejected"} for ${viewerEmail}`
  });
}
