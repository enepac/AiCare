import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect } from "@/lib/mongodb";
import { SharedAccess } from "@/models/SharedAccess";
import User from "@/models/user";

export async function getScopedEmail(): Promise<string | null> {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  const viewer = await User.findOne({ email: session.user.email });

  if (!viewer) return null;

  const shared = await SharedAccess.findOne({
    viewerId: viewer._id,
    status: "accepted"
  }).populate("ownerId");

  if (shared?.ownerId?.email) {
    return shared.ownerId.email; // Scoped as a viewer
  }

  return viewer.email; // Fallback to self
}

export async function getScopedUserId(): Promise<string | null> {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  const viewer = await User.findOne({ email: session.user.email });

  if (!viewer) return null;

  const shared = await SharedAccess.findOne({
    viewerId: viewer._id,
    status: "accepted"
  });

  if (shared?.ownerId) {
    return shared.ownerId.toString(); // Scoped as a viewer
  }

  return viewer._id.toString(); // Fallback to self
}
