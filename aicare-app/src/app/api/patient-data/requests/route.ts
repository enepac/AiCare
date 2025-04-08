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

    const requests = await SharedAccess.find({ viewerId: viewer._id }).populate("ownerId");

    const response = requests.map((req) => ({
      _id: req._id.toString(),
      status: req.status,
      ownerName: req.ownerId?.name || "Unknown",
      ownerEmail: req.ownerId?.email || "unknown@example.com"
    }));

    return NextResponse.json(response);
  } catch (err) {
    console.error("❌ Failed to fetch share requests:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
