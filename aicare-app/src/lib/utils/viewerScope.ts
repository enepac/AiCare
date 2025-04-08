import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { SharedAccess } from "@/models/SharedAccess";

// ✅ Return scoped email — own if self, or owner's if in viewer mode
export async function getScopedEmail(req: NextRequest): Promise<string | null> {
  await dbConnect();

  const cookieStore = cookies();
  const activePatientId = cookieStore.get("activePatientId")?.value;

  const token = await getToken({ req });
  const viewerId = token?.sub;
  const viewerEmail = token?.email;

  if (!viewerEmail) return null;

  if (!activePatientId || activePatientId === viewerId) {
    return viewerEmail;
  }

  const access = await SharedAccess.findOne({
    ownerId: activePatientId,
    viewerId,
    status: "accepted"
  }).populate("ownerId");

  const owner = access?.ownerId as { email?: string };

  return owner?.email ?? viewerEmail;
}

// ✅ Determine if current session is in viewer mode
export async function isViewerMode(req: NextRequest): Promise<boolean> {
  const cookieStore = cookies();
  const activePatientId = cookieStore.get("activePatientId")?.value;

  const token = await getToken({ req });
  const viewerId = token?.sub;

  return Boolean(activePatientId && activePatientId !== viewerId);
}
