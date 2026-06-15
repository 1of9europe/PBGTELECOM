import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { getDefaultRouteByRole } from "@/lib/navigation";

const { auth } = NextAuth(authConfig);

const publicRoutes = ["/", "/services", "/secteurs", "/a-propos", "/contact"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  const isPublic =
    pathname === "/login" ||
    pathname === "/auth/redirect" ||
    pathname.startsWith("/api/auth") ||
    publicRoutes.includes(pathname);

  if (isPublic) {
    if (isLoggedIn && pathname === "/login") {
      const target = getDefaultRouteByRole(req.auth?.user?.role);
      return NextResponse.redirect(new URL(target, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = req.auth?.user?.role;
  const isCustomer = role === Role.CUSTOMER;
  const isAdmin = role === Role.ADMIN || role === Role.SUPER_ADMIN;
  const isAdminPath = pathname.startsWith("/admin");
  const isDashboardPath = pathname.startsWith("/dashboard");
  const isClientPath = pathname.startsWith("/client");

  if (isCustomer && !isClientPath) {
    return NextResponse.redirect(new URL("/client/dashboard", nextUrl));
  }

  if (isClientPath && !isCustomer) {
    const target = getDefaultRouteByRole(role);
    return NextResponse.redirect(new URL(target, nextUrl));
  }

  if (isAdminPath && !isAdmin) {
    const target = getDefaultRouteByRole(role);
    return NextResponse.redirect(new URL(target, nextUrl));
  }

  if (isDashboardPath && isCustomer) {
    return NextResponse.redirect(new URL("/client/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
