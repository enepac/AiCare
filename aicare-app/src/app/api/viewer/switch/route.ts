import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import SharedAccess from "@/models/SharedAccess";
import { dbConnect } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { patientEmail }: { patientEmail: string | null } = await req.json();
  await dbConnect();

  // Clear viewer mode
  if (!patientEmail) {
    const res = NextResponse.json({ message: "Viewer mode disabled" });
    res.cookies.delete("activeViewer");
    return res;
  }

  const access = await SharedAccess.findOne({
    viewerEmail: session.user.email,
    patientEmail,
    status: "accepted"
  });

  if (!access) {
    return NextResponse.json(
      { error: "Access not granted to this patient's data." },
      { status: 403 }
    );
  }

  const res = NextResponse.json({ message: `Now viewing ${patientEmail}'s data` });
  res.cookies.set("activeViewer", patientEmail, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  return res;
}
