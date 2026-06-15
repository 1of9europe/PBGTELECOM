"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/session";
import {
  customerLinkedScope,
  formatCurrency,
  interventionScope,
  ticketScope,
} from "@/lib/filters";
import { isAdmin } from "@/lib/permissions";
import { Role } from "@/generated/prisma/enums";

export async function getDashboardStats() {
  const user = await requireAuth();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  const ticketFilter = ticketScope(user);
  const interventionFilter = interventionScope(user);
  const contractFilter = customerLinkedScope(user);

  const [
    activeCustomers,
    openTickets,
    plannedInterventions,
    activeContracts,
    activeSubscriptions,
    activeContractsSum,
    recentTickets,
    upcomingInterventions,
  ] = await Promise.all([
    isAdmin(user.role)
      ? prisma.customer.count({ where: { status: "ACTIVE" } })
      : user.role === Role.CUSTOMER
        ? prisma.customer.count({ where: { id: user.customerId ?? "", status: "ACTIVE" } })
        : Promise.resolve(0),

    prisma.ticket.count({
      where: {
        ...ticketFilter,
        status: { in: ["OPEN", "IN_PROGRESS", "WAITING_CUSTOMER"] },
      },
    }),

    prisma.intervention.count({
      where: {
        ...interventionFilter,
        status: "PLANNED",
        scheduledAt: { gte: now },
      },
    }),

    prisma.maintenanceContract.count({
      where: { ...contractFilter, status: "ACTIVE" },
    }),

    isAdmin(user.role)
      ? prisma.subscription.count({ where: { status: "ACTIVE" } })
      : prisma.subscription.count({
          where: { ...customerLinkedScope(user), status: "ACTIVE" },
        }),

    prisma.maintenanceContract.aggregate({
      where: { ...contractFilter, status: "ACTIVE" },
      _sum: { monthlyPrice: true },
    }),

    prisma.ticket.findMany({
      where: ticketFilter,
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        customer: { select: { companyName: true } },
        site: { select: { name: true } },
      },
    }),

    prisma.intervention.findMany({
      where: {
        ...interventionFilter,
        status: { in: ["PLANNED", "IN_PROGRESS"] },
        scheduledAt: { gte: startOfMonth, lte: endOfMonth },
      },
      take: 5,
      orderBy: { scheduledAt: "asc" },
      include: {
        site: { select: { name: true } },
        technician: { select: { name: true } },
      },
    }),
  ]);

  const subscriptionsSum = isAdmin(user.role)
    ? await prisma.subscription.aggregate({
        where: { status: "ACTIVE" },
        _sum: { priceMonthly: true },
      })
    : await prisma.subscription.aggregate({
        where: { ...customerLinkedScope(user), status: "ACTIVE" },
        _sum: { priceMonthly: true },
      });

  const contractMrr = Number(activeContractsSum._sum.monthlyPrice ?? 0);
  const subscriptionMrr = Number(subscriptionsSum._sum.priceMonthly ?? 0);
  const estimatedMrr = contractMrr + subscriptionMrr;

  return {
    activeCustomers,
    openTickets,
    plannedInterventions,
    activeContracts,
    activeSubscriptions,
    estimatedMrr,
    estimatedMrrFormatted: formatCurrency(estimatedMrr),
    recentTickets,
    upcomingInterventions,
  };
}
