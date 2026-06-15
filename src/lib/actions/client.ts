"use server";

import { revalidatePath } from "next/cache";
import { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/session";
import { clientRequestSchema } from "@/lib/validations";
import { formatDateTime } from "@/lib/filters";

type ActionResult = { success: true } | { success: false; error: string };

export async function getClientContext() {
  const user = await requireCustomer();
  const customer = await prisma.customer.findUnique({
    where: { id: user.customerId! },
    select: { id: true, companyName: true, contactName: true, email: true, phone: true, address: true },
  });

  if (!customer) {
    throw new Error("Client introuvable");
  }

  return { user, customer };
}

export async function getClientDashboardData() {
  const { customer, user } = await getClientContext();
  const now = new Date();

  const [openRequests, plannedInterventions, equipmentsCount, documentsCount, recentTickets, nextIntervention] =
    await Promise.all([
      prisma.ticket.count({
        where: {
          customerId: customer.id,
          status: { in: ["OPEN", "IN_PROGRESS", "WAITING_CUSTOMER"] },
        },
      }),
      prisma.intervention.count({
        where: {
          site: { customerId: customer.id },
          status: "PLANNED",
          scheduledAt: { gte: now },
        },
      }),
      prisma.equipment.count({ where: { site: { customerId: customer.id } } }),
      prisma.clientDocument.count({ where: { customerId: customer.id } }),
      prisma.ticket.findMany({
        where: { customerId: customer.id },
        take: 5,
        orderBy: { updatedAt: "desc" },
        include: { site: { select: { name: true } } },
      }),
      prisma.intervention.findFirst({
        where: {
          site: { customerId: customer.id },
          status: { in: ["PLANNED", "IN_PROGRESS"] },
          scheduledAt: { gte: now },
        },
        orderBy: { scheduledAt: "asc" },
        include: { site: { select: { name: true } }, technician: { select: { name: true } }, ticket: true },
      }),
    ]);

  return {
    customer,
    user,
    metrics: {
      openRequests,
      plannedInterventions,
      equipmentsCount,
      documentsCount,
    },
    recentActivities: recentTickets.map((ticket) => ({
      id: ticket.id,
      title: ticket.title,
      siteName: ticket.site.name,
      status: ticket.status,
      updatedAt: formatDateTime(ticket.updatedAt),
    })),
    nextIntervention: nextIntervention
      ? {
          id: nextIntervention.id,
          scheduledAt: formatDateTime(nextIntervention.scheduledAt),
          siteName: nextIntervention.site.name,
          status: nextIntervention.status,
          technician: nextIntervention.technician.name ?? "Technicien assigné",
          ticketTitle: nextIntervention.ticket?.title ?? "Intervention préventive",
        }
      : null,
  };
}

export async function getClientRequests() {
  const { customer } = await getClientContext();
  return prisma.ticket.findMany({
    where: { customerId: customer.id },
    include: {
      site: { select: { name: true } },
      assignedTo: { select: { name: true } },
      interventions: {
        select: { id: true, status: true, scheduledAt: true },
        orderBy: { scheduledAt: "desc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createClientRequest(formData: FormData): Promise<ActionResult> {
  const { customer, user } = await getClientContext();
  if (user.role !== Role.CUSTOMER) {
    return { success: false, error: "Accès refusé" };
  }

  const parsed = clientRequestSchema.safeParse({
    siteId: formData.get("siteId"),
    title: formData.get("title"),
    description: formData.get("description"),
    priority: formData.get("priority") || "MEDIUM",
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const allowedSite = await prisma.site.findFirst({
    where: { id: parsed.data.siteId, customerId: customer.id },
    select: { id: true },
  });
  if (!allowedSite) {
    return { success: false, error: "Site invalide" };
  }

  await prisma.ticket.create({
    data: {
      customerId: customer.id,
      siteId: parsed.data.siteId,
      title: parsed.data.title,
      description: parsed.data.description,
      priority: parsed.data.priority,
      status: "OPEN",
      createdById: user.id,
    },
  });

  revalidatePath("/client/dashboard");
  revalidatePath("/client/requests");
  return { success: true };
}

export async function getClientSites() {
  const { customer } = await getClientContext();
  return prisma.site.findMany({
    where: { customerId: customer.id },
    select: { id: true, name: true, address: true, accessInstructions: true, notes: true },
    orderBy: { name: "asc" },
  });
}

export async function getClientEquipments() {
  const { customer } = await getClientContext();
  return prisma.equipment.findMany({
    where: { site: { customerId: customer.id } },
    include: { site: { select: { name: true } } },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getClientInterventions() {
  const { customer } = await getClientContext();
  return prisma.intervention.findMany({
    where: { site: { customerId: customer.id } },
    include: {
      site: { select: { name: true } },
      technician: { select: { name: true } },
      ticket: { select: { title: true } },
    },
    orderBy: { scheduledAt: "desc" },
  });
}

export async function getClientDocuments() {
  const { customer } = await getClientContext();
  return prisma.clientDocument.findMany({
    where: { customerId: customer.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function getClientProjectInfo() {
  const { customer } = await getClientContext();

  const [sites, contacts, contracts, subscriptions] = await Promise.all([
    prisma.site.findMany({
      where: { customerId: customer.id },
      select: { id: true, name: true, address: true, accessInstructions: true, notes: true },
      orderBy: { name: "asc" },
    }),
    prisma.user.findMany({
      where: { role: { in: [Role.ADMIN, Role.SUPER_ADMIN, Role.TECHNICIAN] } },
      select: { id: true, name: true, email: true, role: true },
      orderBy: { role: "asc" },
      take: 6,
    }),
    prisma.maintenanceContract.findMany({
      where: { customerId: customer.id },
      select: { id: true, name: true, status: true, responseTimeHours: true, includedVisitsPerYear: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.subscription.findMany({
      where: { customerId: customer.id },
      select: { id: true, planName: true, status: true, priceMonthly: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return { customer, sites, contacts, contracts, subscriptions };
}
