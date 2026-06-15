import { Role } from "@/generated/prisma/enums";

export type SessionUser = {
  id: string;
  email: string;
  name?: string | null;
  role: Role;
  customerId?: string | null;
};

export function isAdmin(role: Role): boolean {
  return role === Role.SUPER_ADMIN || role === Role.ADMIN;
}

export function isInternal(role: Role): boolean {
  return isAdmin(role) || role === Role.TECHNICIAN;
}

export function canManageAll(role: Role): boolean {
  return isAdmin(role);
}

export function canAccessDashboard(_role: Role): boolean {
  return true;
}
