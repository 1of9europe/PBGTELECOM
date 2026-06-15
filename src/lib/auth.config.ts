import type { NextAuthConfig } from "next-auth";
import type { Role } from "@/generated/prisma/enums";
import { getDefaultRouteByRole } from "@/lib/navigation";

export const authConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role as Role;
        token.customerId = user.customerId ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as Role;
        session.user.customerId = (token.customerId as string | null) ?? null;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;
      const publicRoutes = ["/", "/services", "/secteurs", "/a-propos", "/contact"];
      const isPublic =
        pathname === "/login" ||
        pathname.startsWith("/api/auth") ||
        publicRoutes.includes(pathname);

      if (isPublic) {
        if (isLoggedIn && pathname === "/login") {
          const target = getDefaultRouteByRole(auth?.user?.role);
          return Response.redirect(new URL(target, nextUrl));
        }
        return true;
      }

      return isLoggedIn;
    },
  },
} satisfies NextAuthConfig;
