import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect } from "@/lib/mongodb";
import { SharedAccess } from "@/models/SharedAccess";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { viewerEmail } = await req.json();
  if (!viewerEmail || !viewerEmail.includes("@")) {
    return NextResponse.json({ error: "Invalid viewer email" }, { status: 400 });
  }

  await dbConnect();

  const deleted = await SharedAccess.findOneAndDelete({
    patientEmail: session.user.email,
    viewerEmail
  });

  if (!deleted) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  console.log(`❌ Share request from ${viewerEmail} rejected by ${session.user.email}`);

  return NextResponse.json({ message: "Request rejected" });
}
