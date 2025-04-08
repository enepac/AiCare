import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect } from "@/lib/mongodb";
import { SharedAccess } from "@/models/SharedAccess";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const viewerEmail = session.user.email;

  try {
    const count = await SharedAccess.countDocuments({
      viewerEmail,
      status: "pending"
    });

    return NextResponse.json({ hasPending: count > 0 });
  } catch (error) {
    console.error("❌ Error checking pending invites:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
