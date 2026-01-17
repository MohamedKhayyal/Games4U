import { NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/cart", "/orders", "/profile", "/admin"];
const AUTH_ROUTES = ["/auth/login", "/auth/signUp"];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // تجاهل الملفات الداخلية
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // ✅ اقرأ cookie مباشرة
  const token = req.cookies.get("jwt")?.value;

  const isLoggedIn = !!token;

  // 🚫 Logged in وحاول يدخل login أو signup
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🚫 مش Logged in وحاول يدخل صفحة محمية
  if (!isLoggedIn && isProtected) {
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
