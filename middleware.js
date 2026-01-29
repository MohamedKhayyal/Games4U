import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/shop", "/games"];
const USER_ROUTES = ["/cart", "/orders", "/profile"];
const ADMIN_ROUTES = ["/admin"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // ignore static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("jwt")?.value;

  // not logged in
  if (!token) {
    if (
      USER_ROUTES.some((r) => pathname.startsWith(r)) ||
      ADMIN_ROUTES.some((r) => pathname.startsWith(r))
    ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  }

  // logged in → get user role
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const user = (await res.json())?.data?.user;
  const role = user?.role;

  // 🛑 admin ممنوع يشوف الموقع
  if (role === "admin") {
    if (
      PUBLIC_ROUTES.some((r) => pathname === r || pathname.startsWith(r)) ||
      USER_ROUTES.some((r) => pathname.startsWith(r))
    ) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // 🛑 user ممنوع يشوف admin
  if (role === "user") {
    if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/shop/:path*",
    "/games/:path*",
    "/cart/:path*",
    "/orders/:path*",
    "/profile/:path*",
    "/admin/:path*",
  ],
};
