import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect } from "@/lib/mongodb";
import { SharedAccess } from "@/models/SharedAccess";
import User from "@/models/user";

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  const { id, action } = await req.json();

  const access = await SharedAccess.findById(id);
  if (!access) {
    return new Response(JSON.stringify({ error: "Invalid invite" }), { status: 404 });
  }

  const viewer = await User.findOne({ email: userEmail });

  if (!viewer || !access.viewerId.equals(viewer._id)) {
    return new Response(JSON.stringify({ error: "Not authorized" }), { status: 403 });
  }

  if (action === "accept") {
    access.status = "accepted";
    await access.save();
  } else if (action === "reject") {
    await access.deleteOne();
  }

  return new Response(JSON.stringify({ success: true }));
}
