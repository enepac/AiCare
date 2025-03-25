import { NextRequest, NextResponse } from "next/server";
import { generateSchemaSummary } from "@/lib/mongodb/schemaSummary";

export const dynamic = "force-dynamic";

// Simple security using a cron token
const CRON_SECRET = process.env.CRON_SECRET || "change_this_to_a_secret";

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split("Bearer ")[1];

  if (!token || token !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await generateSchemaSummary();
    return NextResponse.json({ message: "Schema summary generated successfully" });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
