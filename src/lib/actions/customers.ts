"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/session";
import { customerSchema } from "@/lib/validations";
import { customerScope, contains } from "@/lib/filters";
import { Role } from "@/generated/prisma/enums";
import type { Prisma } from "@/generated/prisma/client";

type ActionResult = { success: true } | { success: false; error: string };

type CustomerWithCount = Prisma.CustomerGetPayload<{
  include: { _count: { select: { sites: true; tickets: true; contracts: true } } };
}>;

export async function getCustomers(search?: string): Promise<CustomerWithCount[]> {
  const user = await requireAuth();
  const scope = customerScope(user);

  return prisma.customer.findMany({
    where: {
      ...scope,
      ...(search
        ? {
            OR: [
              { companyName: contains(search) },
              { contactName: contains(search) },
              { email: contains(search) },
            ],
          }
        : {}),
    },
    orderBy: { companyName: "asc" },
    include: {
      _count: { select: { sites: true, tickets: true, contracts: true } },
    },
  });
}

export async function getCustomer(id: string) {
  const user = await requireAuth();
  const scope = customerScope(user);

  return prisma.customer.findFirst({
    where: { id, ...scope },
    include: {
      sites: true,
      contracts: true,
      subscriptions: true,
      _count: { select: { tickets: true } },
    },
  });
}

export async function createCustomer(formData: FormData): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);

  const parsed = customerSchema.safeParse({
    companyName: formData.get("companyName"),
    contactName: formData.get("contactName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    type: formData.get("type"),
    status: formData.get("status") || "ACTIVE",
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  await prisma.customer.create({ data: parsed.data });
  revalidatePath("/dashboard/customers");
  return { success: true };
}

export async function updateCustomer(id: string, formData: FormData): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);

  const parsed = customerSchema.safeParse({
    companyName: formData.get("companyName"),
    contactName: formData.get("contactName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    type: formData.get("type"),
    status: formData.get("status") || "ACTIVE",
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  await prisma.customer.update({ where: { id }, data: parsed.data });
  revalidatePath("/dashboard/customers");
  revalidatePath(`/dashboard/customers/${id}`);
  return { success: true };
}

export async function deleteCustomer(id: string): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);

  await prisma.customer.delete({ where: { id } });
  revalidatePath("/dashboard/customers");
  return { success: true };
}

export async function getCustomerOptions() {
  const user = await requireAuth();
  const scope = customerScope(user);

  return prisma.customer.findMany({
    where: { ...scope, status: "ACTIVE" },
    select: { id: true, companyName: true },
    orderBy: { companyName: "asc" },
  });
}
