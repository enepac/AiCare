import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect } from "@/lib/mongodb";
import { SharedAccess } from "@/models/SharedAccess";
import User from "@/models/user";

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const { viewerEmail } = await req.json();

  if (!session?.user?.email || !viewerEmail) {
    return NextResponse.json({ error: "Unauthorized or missing data" }, { status: 401 });
  }

  const viewer = await User.findOne({ email: viewerEmail });
  const owner = await User.findOne({ email: session.user.email });

  if (!viewer || !owner) {
    return NextResponse.json({ error: "Users not found" }, { status: 404 });
  }

  const result = await SharedAccess.deleteOne({
    ownerId: owner._id,
    viewerId: viewer._id
  });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "No such shared access found." }, { status: 404 });
  }

  return NextResponse.json({ message: "Access revoked" }, { status: 200 });
}
