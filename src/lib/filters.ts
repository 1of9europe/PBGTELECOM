import { Role } from "@/generated/prisma/enums";
import { isAdmin } from "@/lib/permissions";
import type { SessionUser } from "@/lib/permissions";

/** Filtre multi-tenant pour les entités liées à un client */
export function customerScope(user: SessionUser) {
  if (isAdmin(user.role)) return {};
  if (user.role === Role.CUSTOMER && user.customerId) {
    return { customerId: user.customerId };
  }
  return { customerId: "__denied__" };
}

/** Filtre pour les sites selon le rôle */
export function siteScope(user: SessionUser) {
  if (isAdmin(user.role)) return {};
  if (user.role === Role.CUSTOMER && user.customerId) {
    return { customer: { id: user.customerId } };
  }
  if (user.role === Role.TECHNICIAN) {
    return {
      interventions: { some: { technicianId: user.id } },
    };
  }
  return { id: "__denied__" };
}

/** Filtre pour les équipements */
export function equipmentScope(user: SessionUser) {
  if (isAdmin(user.role)) return {};
  if (user.role === Role.CUSTOMER && user.customerId) {
    return { site: { customerId: user.customerId } };
  }
  if (user.role === Role.TECHNICIAN) {
    return {
      site: {
        interventions: { some: { technicianId: user.id } },
      },
    };
  }
  return { id: "__denied__" };
}

/** Filtre pour les tickets */
export function ticketScope(user: SessionUser) {
  if (isAdmin(user.role)) return {};
  if (user.role === Role.CUSTOMER && user.customerId) {
    return { customerId: user.customerId };
  }
  if (user.role === Role.TECHNICIAN) {
    return { assignedToId: user.id };
  }
  return { customerId: "__denied__" };
}

/** Filtre pour les interventions */
export function interventionScope(user: SessionUser) {
  if (isAdmin(user.role)) return {};
  if (user.role === Role.TECHNICIAN) {
    return { technicianId: user.id };
  }
  if (user.role === Role.CUSTOMER && user.customerId) {
    return { site: { customerId: user.customerId } };
  }
  return { id: "__denied__" };
}

/** Filtre pour les contrats et abonnements */
export function customerLinkedScope(user: SessionUser) {
  return customerScope(user);
}

/** Filtre contains compatible SQLite (sans mode insensitive) */
export function contains(value: string) {
  return { contains: value };
}

export function parseOptionalDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatCurrency(value: number | string) {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(num);
}

export function formatDate(value?: Date | string | null) {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(value?: Date | string | null) {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
