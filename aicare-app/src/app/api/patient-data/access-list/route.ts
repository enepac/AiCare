import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect } from "@/lib/mongodb";
import { SharedAccess } from "@/models/SharedAccess";
import User from "@/models/user";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const email = session.user.email;

  try {
    // Users this person is viewing (as viewer)
    const asViewer = await SharedAccess.find({ viewerEmail: email });
    const asViewerDetails = await Promise.all(
      asViewer.map(async (entry) => {
        const user = await User.findOne({ email: entry.patientEmail });
        return user
          ? {
              mode: "viewer",
              email: user.email,
              name: user.name,
              status: entry.status
            }
          : null;
      })
    );

    // Users who can view this person (as patient)
    const asPatient = await SharedAccess.find({ patientEmail: email });
    const asPatientDetails = await Promise.all(
      asPatient.map(async (entry) => {
        const user = await User.findOne({ email: entry.viewerEmail });
        return user
          ? {
              mode: "patient",
              email: user.email,
              name: user.name,
              status: entry.status
            }
          : null;
      })
    );

    return NextResponse.json({
      asViewer: asViewerDetails.filter(Boolean),
      asPatient: asPatientDetails.filter(Boolean)
    });
  } catch (error) {
    console.error("❌ Failed to fetch access list:", error);
    return NextResponse.json({ error: "Failed to fetch access list" }, { status: 500 });
  }
}
