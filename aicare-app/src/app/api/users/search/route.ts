import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/user";

export async function GET(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ users: [] });
  }

  try {
    const regex = new RegExp(query, "i");

    const users = await User.find({
      $and: [
        {
          $or: [{ name: regex }, { email: regex }]
        },
        { email: { $ne: session.user.email } } // exclude self
      ]
    })
      .select("_id name email image")
      .limit(10);

    return NextResponse.json({ users });
  } catch (err) {
    console.error("❌ Failed to search users:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
