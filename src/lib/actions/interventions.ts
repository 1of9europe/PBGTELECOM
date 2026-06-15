"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/session";
import { interventionSchema } from "@/lib/validations";
import { interventionScope, parseOptionalDate, contains } from "@/lib/filters";
import { Role } from "@/generated/prisma/enums";

type ActionResult = { success: true } | { success: false; error: string };

export async function getInterventions(search?: string, status?: string) {
  const user = await requireAuth();
  const scope = interventionScope(user);

  return prisma.intervention.findMany({
    where: {
      ...scope,
      ...(status ? { status: status as "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" } : {}),
      ...(search
        ? {
            OR: [
              { report: contains(search) },
              { site: { name: contains(search) } },
            ],
          }
        : {}),
    },
    include: {
      site: {
        select: { name: true, customer: { select: { companyName: true } } },
      },
      technician: { select: { name: true, email: true } },
      ticket: { select: { title: true } },
    },
    orderBy: { scheduledAt: "asc" },
  });
}

export async function getIntervention(id: string) {
  const user = await requireAuth();
  const scope = interventionScope(user);

  return prisma.intervention.findFirst({
    where: { id, ...scope },
    include: {
      site: { include: { customer: true } },
      technician: true,
      ticket: true,
    },
  });
}

export async function createIntervention(formData: FormData): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN, Role.TECHNICIAN]);

  const parsed = interventionSchema.safeParse({
    ticketId: formData.get("ticketId") || undefined,
    siteId: formData.get("siteId"),
    technicianId: formData.get("technicianId"),
    scheduledAt: formData.get("scheduledAt"),
    startedAt: formData.get("startedAt") || undefined,
    completedAt: formData.get("completedAt") || undefined,
    status: formData.get("status") || "PLANNED",
    report: formData.get("report") || "",
    customerSignature: formData.get("customerSignature") || undefined,
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const { ticketId, scheduledAt, startedAt, completedAt, customerSignature, ...rest } =
    parsed.data;

  await prisma.intervention.create({
    data: {
      ...rest,
      ticketId: ticketId || null,
      scheduledAt: new Date(scheduledAt),
      startedAt: parseOptionalDate(startedAt),
      completedAt: parseOptionalDate(completedAt),
      customerSignature: customerSignature || null,
    },
  });

  revalidatePath("/dashboard/interventions");
  return { success: true };
}

export async function updateIntervention(id: string, formData: FormData): Promise<ActionResult> {
  const user = await requireAuth();

  const parsed = interventionSchema.safeParse({
    ticketId: formData.get("ticketId") || undefined,
    siteId: formData.get("siteId"),
    technicianId: formData.get("technicianId"),
    scheduledAt: formData.get("scheduledAt"),
    startedAt: formData.get("startedAt") || undefined,
    completedAt: formData.get("completedAt") || undefined,
    status: formData.get("status") || "PLANNED",
    report: formData.get("report") || "",
    customerSignature: formData.get("customerSignature") || undefined,
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  if (user.role === Role.TECHNICIAN && parsed.data.technicianId !== user.id) {
    return { success: false, error: "Vous ne pouvez modifier que vos interventions" };
  }

  const { ticketId, scheduledAt, startedAt, completedAt, customerSignature, ...rest } =
    parsed.data;

  await prisma.intervention.update({
    where: { id },
    data: {
      ...rest,
      ticketId: ticketId || null,
      scheduledAt: new Date(scheduledAt),
      startedAt: parseOptionalDate(startedAt),
      completedAt: parseOptionalDate(completedAt),
      customerSignature: customerSignature || null,
    },
  });

  revalidatePath("/dashboard/interventions");
  return { success: true };
}

export async function deleteIntervention(id: string): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);

  await prisma.intervention.delete({ where: { id } });
  revalidatePath("/dashboard/interventions");
  return { success: true };
}
