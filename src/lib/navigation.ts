import { Role } from "@/generated/prisma/enums";

export function getDefaultRouteByRole(role?: Role | null) {
  if (role === Role.CUSTOMER) {
    return "/client/dashboard";
  }

  if (role === Role.ADMIN || role === Role.SUPER_ADMIN) {
    return "/admin/dashboard";
  }

  return "/dashboard";
}
