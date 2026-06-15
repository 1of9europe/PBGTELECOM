"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/session";
import { subscriptionSchema } from "@/lib/validations";
import { customerLinkedScope, contains } from "@/lib/filters";
import { Role } from "@prisma/client";

type ActionResult = { success: true } | { success: false; error: string };

export async function getSubscriptions(search?: string, status?: string) {
  const user = await requireAuth();
  const scope = customerLinkedScope(user);

  return prisma.subscription.findMany({
    where: {
      ...scope,
      ...(status ? { status: status as "ACTIVE" | "PAST_DUE" | "CANCELLED" } : {}),
      ...(search
        ? {
            OR: [
              { planName: contains(search) },
              { customer: { companyName: contains(search) } },
            ],
          }
        : {}),
    },
    include: { customer: { select: { companyName: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getSubscription(id: string) {
  const user = await requireAuth();
  const scope = customerLinkedScope(user);

  return prisma.subscription.findFirst({
    where: { id, ...scope },
    include: { customer: true },
  });
}

export async function createSubscription(formData: FormData): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);

  const parsed = subscriptionSchema.safeParse({
    customerId: formData.get("customerId"),
    planName: formData.get("planName"),
    priceMonthly: formData.get("priceMonthly"),
    status: formData.get("status") || "ACTIVE",
    stripeCustomerId: formData.get("stripeCustomerId") || undefined,
    stripeSubscriptionId: formData.get("stripeSubscriptionId") || undefined,
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const { stripeCustomerId, stripeSubscriptionId, ...rest } = parsed.data;

  await prisma.subscription.create({
    data: {
      ...rest,
      stripeCustomerId: stripeCustomerId || null,
      stripeSubscriptionId: stripeSubscriptionId || null,
    },
  });

  revalidatePath("/dashboard/subscriptions");
  return { success: true };
}

export async function updateSubscription(id: string, formData: FormData): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);

  const parsed = subscriptionSchema.safeParse({
    customerId: formData.get("customerId"),
    planName: formData.get("planName"),
    priceMonthly: formData.get("priceMonthly"),
    status: formData.get("status") || "ACTIVE",
    stripeCustomerId: formData.get("stripeCustomerId") || undefined,
    stripeSubscriptionId: formData.get("stripeSubscriptionId") || undefined,
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const { stripeCustomerId, stripeSubscriptionId, ...rest } = parsed.data;

  await prisma.subscription.update({
    where: { id },
    data: {
      ...rest,
      stripeCustomerId: stripeCustomerId || null,
      stripeSubscriptionId: stripeSubscriptionId || null,
    },
  });

  revalidatePath("/dashboard/subscriptions");
  return { success: true };
}

export async function deleteSubscription(id: string): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);

  await prisma.subscription.delete({ where: { id } });
  revalidatePath("/dashboard/subscriptions");
  return { success: true };
}
