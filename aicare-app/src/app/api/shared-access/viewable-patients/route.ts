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
    const viewer = await User.findOne({ email: session.user.email });
    if (!viewer) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const shared = await SharedAccess.find({
      viewerId: viewer._id,
      status: "accepted" // ✅ Only show accepted shares
    }).populate("ownerId");

    const result = shared
      .filter((entry) => entry.ownerId) // ✅ Ensure valid patient references
      .map((entry) => ({
        _id: entry.ownerId._id.toString(),
        name: entry.ownerId.name,
        email: entry.ownerId.email
      }));

    return NextResponse.json(result);
  } catch (err) {
    console.error("❌ Failed to load viewable patients:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
