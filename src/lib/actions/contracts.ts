"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/session";
import { contractSchema } from "@/lib/validations";
import { customerLinkedScope, parseOptionalDate, contains } from "@/lib/filters";
import { Role } from "@prisma/client";

type ActionResult = { success: true } | { success: false; error: string };

export async function getContracts(search?: string, status?: string) {
  const user = await requireAuth();
  const scope = customerLinkedScope(user);

  return prisma.maintenanceContract.findMany({
    where: {
      ...scope,
      ...(status ? { status: status as "ACTIVE" | "EXPIRED" | "CANCELLED" } : {}),
      ...(search
        ? {
            OR: [
              { name: contains(search) },
              { customer: { companyName: contains(search) } },
            ],
          }
        : {}),
    },
    include: { customer: { select: { companyName: true } } },
    orderBy: { startDate: "desc" },
  });
}

export async function getContract(id: string) {
  const user = await requireAuth();
  const scope = customerLinkedScope(user);

  return prisma.maintenanceContract.findFirst({
    where: { id, ...scope },
    include: { customer: true },
  });
}

export async function createContract(formData: FormData): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);

  const parsed = contractSchema.safeParse({
    customerId: formData.get("customerId"),
    name: formData.get("name"),
    monthlyPrice: formData.get("monthlyPrice"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || undefined,
    status: formData.get("status") || "ACTIVE",
    includedVisitsPerYear: formData.get("includedVisitsPerYear") || 2,
    responseTimeHours: formData.get("responseTimeHours") || 24,
    notes: formData.get("notes") || "",
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const { endDate, startDate, ...rest } = parsed.data;

  await prisma.maintenanceContract.create({
    data: {
      ...rest,
      startDate: new Date(startDate),
      endDate: parseOptionalDate(endDate),
    },
  });

  revalidatePath("/dashboard/contracts");
  return { success: true };
}

export async function updateContract(id: string, formData: FormData): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);

  const parsed = contractSchema.safeParse({
    customerId: formData.get("customerId"),
    name: formData.get("name"),
    monthlyPrice: formData.get("monthlyPrice"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || undefined,
    status: formData.get("status") || "ACTIVE",
    includedVisitsPerYear: formData.get("includedVisitsPerYear") || 2,
    responseTimeHours: formData.get("responseTimeHours") || 24,
    notes: formData.get("notes") || "",
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const { endDate, startDate, ...rest } = parsed.data;

  await prisma.maintenanceContract.update({
    where: { id },
    data: {
      ...rest,
      startDate: new Date(startDate),
      endDate: parseOptionalDate(endDate),
    },
  });

  revalidatePath("/dashboard/contracts");
  return { success: true };
}

export async function deleteContract(id: string): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);

  await prisma.maintenanceContract.delete({ where: { id } });
  revalidatePath("/dashboard/contracts");
  return { success: true };
}
