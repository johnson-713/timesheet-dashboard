import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  console.log("token", token, pathname);

  // If token exists and user is at /login or /, redirect to /dashboard
  if (token && (pathname === "/login" || pathname === "/")) {
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    return NextResponse.redirect(dashboardUrl);
  }

  // If no token and trying to access dashboard, redirect to /login
  if (!token && (pathname === "/" || pathname.startsWith("/dashboard"))) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/", "/dashboard/:path*"],
};
