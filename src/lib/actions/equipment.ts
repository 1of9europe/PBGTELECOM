"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/session";
import { equipmentSchema } from "@/lib/validations";
import { equipmentScope, parseOptionalDate } from "@/lib/filters";
import { Role } from "@prisma/client";

type ActionResult = { success: true } | { success: false; error: string };

export async function getEquipment(search?: string, siteId?: string) {
  const user = await requireAuth();
  const scope = equipmentScope(user);

  return prisma.equipment.findMany({
    where: {
      ...scope,
      ...(siteId ? { siteId } : {}),
      ...(search
        ? {
            OR: [
              { brand: { contains: search, mode: "insensitive" } },
              { model: { contains: search, mode: "insensitive" } },
              { serialNumber: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: {
      site: {
        select: { name: true, customer: { select: { companyName: true } } },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getEquipmentItem(id: string) {
  const user = await requireAuth();
  const scope = equipmentScope(user);

  return prisma.equipment.findFirst({
    where: { id, ...scope },
    include: { site: { include: { customer: true } } },
  });
}

export async function createEquipment(formData: FormData): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN, Role.TECHNICIAN]);

  const parsed = equipmentSchema.safeParse({
    siteId: formData.get("siteId"),
    type: formData.get("type"),
    brand: formData.get("brand"),
    model: formData.get("model"),
    serialNumber: formData.get("serialNumber") || "",
    ipAddress: formData.get("ipAddress") || undefined,
    installDate: formData.get("installDate") || undefined,
    warrantyEndDate: formData.get("warrantyEndDate") || undefined,
    status: formData.get("status") || "UNKNOWN",
    notes: formData.get("notes") || "",
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const { installDate, warrantyEndDate, ...rest } = parsed.data;

  await prisma.equipment.create({
    data: {
      ...rest,
      installDate: parseOptionalDate(installDate),
      warrantyEndDate: parseOptionalDate(warrantyEndDate),
    },
  });

  revalidatePath("/dashboard/equipment");
  return { success: true };
}

export async function updateEquipment(id: string, formData: FormData): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN, Role.TECHNICIAN]);

  const parsed = equipmentSchema.safeParse({
    siteId: formData.get("siteId"),
    type: formData.get("type"),
    brand: formData.get("brand"),
    model: formData.get("model"),
    serialNumber: formData.get("serialNumber") || "",
    ipAddress: formData.get("ipAddress") || undefined,
    installDate: formData.get("installDate") || undefined,
    warrantyEndDate: formData.get("warrantyEndDate") || undefined,
    status: formData.get("status") || "UNKNOWN",
    notes: formData.get("notes") || "",
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const { installDate, warrantyEndDate, ...rest } = parsed.data;

  await prisma.equipment.update({
    where: { id },
    data: {
      ...rest,
      installDate: parseOptionalDate(installDate),
      warrantyEndDate: parseOptionalDate(warrantyEndDate),
    },
  });

  revalidatePath("/dashboard/equipment");
  return { success: true };
}

export async function deleteEquipment(id: string): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);

  await prisma.equipment.delete({ where: { id } });
  revalidatePath("/dashboard/equipment");
  return { success: true };
}
