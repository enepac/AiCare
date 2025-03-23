import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import User from "@/models/user";

export async function GET() {
  await dbConnect();
  const users = await User.find({});
  return NextResponse.json(users);
}
