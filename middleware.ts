import { NextRequest, NextResponse } from "next/server";

// This is where we handle protected routes and authentication check
export function middleware(req: NextRequest) {
  // Check for the session using cookies or headers
  const session =
    req.cookies.get("next-auth.session-token.0") ||
    req.cookies.get("__Secure-next-auth.session-token.0");

  // If there is no session, redirect to the login page
  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If session exists, allow the user to access the requested page
  return NextResponse.next();
}

// Apply middleware to only certain paths or to all paths (like app/*)
export const config = {
  matcher: ["/dashboard", "/dashboard/:path"], // Paths you want to protect
};
