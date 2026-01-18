import { NextResponse } from "next/server";

const PROTECTED = ["/cart", "/orders", "/profile", "/admin"];
const AUTH_PAGES = ["/auth/login", "/auth/signUp"];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("jwt")?.value;
  const loggedIn = Boolean(token);

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  if (loggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!loggedIn && isProtected) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/orders/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/auth/login",
    "/auth/signUp",
  ],
};
