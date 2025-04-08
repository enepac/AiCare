import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect } from "@/lib/mongodb";
import { SharedAccess } from "@/models/SharedAccess";
import User from "@/models/user";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const owner = await User.findOne({ email: session.user.email });
    if (!owner) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const invites = await SharedAccess.find({ ownerId: owner._id }).populate("viewerId");

    const result = invites.map((entry) => ({
      viewerEmail: entry.viewerId?.email || "unknown",
      status: entry.status
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error("❌ Error fetching invites:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
