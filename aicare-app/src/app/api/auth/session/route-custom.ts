import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const authHeader = req.headers.get("Authorization");

  console.log("🔍 Received Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("❌ Missing or invalid Authorization header");
    return NextResponse.json({ error: "Unauthorized - Missing Token" }, { status: 401 });
  }

  const session = await getServerSession(authOptions);
  console.log("🔍 Session Retrieved:", session);

  if (!session) {
    console.error("❌ No session found from getServerSession");
    return NextResponse.json({ error: "Unauthorized - Invalid Session" }, { status: 401 });
  }

  return NextResponse.json(session);
}
