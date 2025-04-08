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

  const { viewerEmail, action } = await req.json();

  if (!viewerEmail || !["accept", "reject"].includes(action)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await dbConnect();

  const update = await SharedAccess.findOneAndUpdate(
    { patientEmail: session.user.email, viewerEmail },
    {
      $set: {
        status: action === "accept" ? "accepted" : "rejected"
      }
    },
    { new: true }
  );

  if (!update) {
    return NextResponse.json({ error: "Access entry not found" }, { status: 404 });
  }

  return NextResponse.json({ message: `Access ${action}ed.` });
}
