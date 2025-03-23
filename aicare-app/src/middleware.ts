import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * This middleware:
 * 1. Skips checks for NextAuth routes and Next.js internal paths (avoiding sign-in loops).
 * 2. Verifies the user’s JWT token (cookie-based by default).
 * 3. Optionally checks the user’s profile completion and redirects to /profile if incomplete.
 */
export async function middleware(req: NextRequest) {
  // 1) Skip middleware for auth routes, Next.js internal assets, or static files.
  if (
    req.nextUrl.pathname.startsWith("/api/auth") ||
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.startsWith("/static") ||
    req.nextUrl.pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // 2) Retrieve token from cookies via NextAuth JWT strategy.
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    // Redirect to homepage if not logged in
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 3) Optional: Check profile completion status
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/profile/progress`, {
      headers: { Cookie: req.headers.get("cookie") ?? "" }
    });

    if (res.ok) {
      const { completionPercentage } = await res.json();
      if (completionPercentage < 100 && req.nextUrl.pathname !== "/profile") {
        return NextResponse.redirect(new URL("/profile", req.url));
      }
    }
  } catch (error) {
    console.error("❌ Error fetching profile progress:", error);
  }

  return NextResponse.next();
}

// Apply middleware only to dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"]
};
