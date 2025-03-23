import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function authMiddleware(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  return session;
}
