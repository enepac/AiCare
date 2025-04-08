import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import User from "@/models/user";
import { SharedAccess } from "@/models/SharedAccess";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/mongodb";

export async function resolveEffectiveUser(req?: Request): Promise<string> {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");

  const viewer = await User.findOne({ email: session.user.email });
  if (!viewer) throw new Error("User not found");

  // Determine cookie source
  let activePatientId = "";
  if (req) {
    const cookieHeader = req.headers.get("cookie") || "";
    const cookieMap = Object.fromEntries(cookieHeader.split("; ").map((c) => c.split("=")));
    activePatientId = cookieMap["activePatientId"];
  } else {
    activePatientId = cookies().get("activePatientId")?.value || "";
  }

  if (!activePatientId) {
    return session.user.email;
  }

  const isAllowed = await SharedAccess.findOne({
    viewerId: viewer._id,
    ownerId: activePatientId,
    status: "accepted"
  });

  if (!isAllowed) {
    return session.user.email;
  }

  const patient = await User.findById(activePatientId);
  return patient?.email || session.user.email;
}
