"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/session";
import { ticketSchema } from "@/lib/validations";
import { ticketScope, contains } from "@/lib/filters";
import { Role } from "@/generated/prisma/enums";

type ActionResult = { success: true } | { success: false; error: string };

export async function getTickets(search?: string, status?: string) {
  const user = await requireAuth();
  const scope = ticketScope(user);

  return prisma.ticket.findMany({
    where: {
      ...scope,
      ...(status ? { status: status as "OPEN" | "IN_PROGRESS" | "WAITING_CUSTOMER" | "RESOLVED" | "CLOSED" } : {}),
      ...(search
        ? {
            OR: [
              { title: contains(search) },
              { customer: { companyName: contains(search) } },
            ],
          }
        : {}),
    },
    include: {
      customer: { select: { companyName: true } },
      site: { select: { name: true } },
      assignedTo: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getTicket(id: string) {
  const user = await requireAuth();
  const scope = ticketScope(user);

  return prisma.ticket.findFirst({
    where: { id, ...scope },
    include: {
      customer: true,
      site: true,
      equipment: true,
      assignedTo: true,
      createdBy: { select: { name: true, email: true } },
      interventions: true,
    },
  });
}

export async function createTicket(formData: FormData): Promise<ActionResult> {
  const user = await requireAuth();

  const parsed = ticketSchema.safeParse({
    customerId: formData.get("customerId"),
    siteId: formData.get("siteId"),
    equipmentId: formData.get("equipmentId") || undefined,
    title: formData.get("title"),
    description: formData.get("description"),
    priority: formData.get("priority") || "MEDIUM",
    status: formData.get("status") || "OPEN",
    assignedToId: formData.get("assignedToId") || undefined,
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  if (user.role === Role.CUSTOMER) {
    if (user.customerId !== parsed.data.customerId) {
      return { success: false, error: "Accès refusé" };
    }
    parsed.data.status = "OPEN";
    parsed.data.assignedToId = undefined;
  }

  const { equipmentId, assignedToId, ...rest } = parsed.data;

  await prisma.ticket.create({
    data: {
      ...rest,
      equipmentId: equipmentId || null,
      assignedToId: assignedToId || null,
      createdById: user.id,
    },
  });

  revalidatePath("/dashboard/tickets");
  return { success: true };
}

export async function updateTicket(id: string, formData: FormData): Promise<ActionResult> {
  const user = await requireAuth();

  const parsed = ticketSchema.safeParse({
    customerId: formData.get("customerId"),
    siteId: formData.get("siteId"),
    equipmentId: formData.get("equipmentId") || undefined,
    title: formData.get("title"),
    description: formData.get("description"),
    priority: formData.get("priority") || "MEDIUM",
    status: formData.get("status") || "OPEN",
    assignedToId: formData.get("assignedToId") || undefined,
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  if (user.role === Role.CUSTOMER && user.customerId !== parsed.data.customerId) {
    return { success: false, error: "Accès refusé" };
  }

  const { equipmentId, assignedToId, ...rest } = parsed.data;

  await prisma.ticket.update({
    where: { id },
    data: {
      ...rest,
      equipmentId: equipmentId || null,
      assignedToId: assignedToId || null,
    },
  });

  revalidatePath("/dashboard/tickets");
  revalidatePath(`/dashboard/tickets/${id}`);
  return { success: true };
}

export async function deleteTicket(id: string): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);

  await prisma.ticket.delete({ where: { id } });
  revalidatePath("/dashboard/tickets");
  return { success: true };
}

export async function getTechnicianOptions() {
  await requireAuth();

  return prisma.user.findMany({
    where: { role: { in: [Role.TECHNICIAN, Role.ADMIN, Role.SUPER_ADMIN] } },
    select: { id: true, name: true, email: true, role: true },
    orderBy: { name: "asc" },
  });
}
