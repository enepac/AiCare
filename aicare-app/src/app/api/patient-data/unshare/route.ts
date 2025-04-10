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

  const deletion = await SharedAccess.deleteOne({
    $or: [
      { patientEmail: token.email, viewerEmail: targetEmail },
      { patientEmail: targetEmail, viewerEmail: token.email }
    ]
  });

  if (deletion.deletedCount === 0) {
    return NextResponse.json({ message: "No matching share found." }, { status: 404 });
  }

  console.log(`🔒 Share access removed between ${token.email} and ${targetEmail}`);
  return NextResponse.json({ message: "Access removed successfully." });
}
