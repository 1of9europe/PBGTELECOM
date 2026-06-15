import { auth } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import type { SessionUser } from "@/lib/permissions";

export async function requireAuth(): Promise<SessionUser> {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return {
    id: session.user.id,
    email: session.user.email!,
    name: session.user.name,
    role: session.user.role,
    customerId: session.user.customerId,
  };
}

export async function requireRole(allowed: Role[]): Promise<SessionUser> {
  const user = await requireAuth();

  if (!allowed.includes(user.role)) {
    redirect("/dashboard");
  }

  return user;
}

export async function getOptionalAuth(): Promise<SessionUser | null> {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email!,
    name: session.user.name,
    role: session.user.role,
    customerId: session.user.customerId,
  };
}
