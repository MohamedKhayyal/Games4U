import { NextResponse } from "next/server";

const API = process.env.NEXT_PUBLIC_API_URL;

const PROTECTED = ["/cart", "/orders", "/profile", "/admin"];
const AUTH_PAGES = ["/auth/login", "/auth/signUp"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // تجاهل ملفات Next الداخلية
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  try {
    const res = await fetch(`${API}/api/users/me`, {
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
    });

    const loggedIn = res.ok;

    // 🚫 لو logged in وحاول يدخل login / signup
    if (loggedIn && isAuthPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 🚫 لو مش logged in وحاول يدخل صفحة محمية
    if (!loggedIn && isProtected) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    if (isProtected) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return NextResponse.next();
  }
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
