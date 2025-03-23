import { dbConnect } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    console.log("✅ MongoDB Test Route Called");
    return NextResponse.json({
      message: "✅ Successfully connected to MongoDB"
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    return NextResponse.json({ message: "❌ Failed to connect to MongoDB" }, { status: 500 });
  }
}
