import { dbConnect } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import User from "@/models/user";
import { SharedAccess } from "@/models/SharedAccess";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const viewerId = body.viewerId;

  if (!viewerId) {
    return NextResponse.json({ error: "Missing viewerId" }, { status: 400 });
  }

  const viewer = await User.findById(viewerId).lean();
  const owner = await User.findOne({ email: session.user.email }).lean();

  if (!viewer || !owner) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const existing = await SharedAccess.findOne({
      ownerId: owner._id,
      viewerId: viewer._id
    });

    if (existing) {
      return NextResponse.json({ error: "Access already shared" }, { status: 409 });
    }

    await SharedAccess.create({
      ownerId: owner._id,
      ownerEmail: owner.email,
      viewerId: viewer._id,
      viewerEmail: viewer.email,
      status: "pending"
    });

    return NextResponse.json({ message: "Access invite sent." });
  } catch (error) {
    console.error("❌ Error saving shared access:", error);
    return NextResponse.json({ error: "Failed to save shared access" }, { status: 500 });
  }
}
