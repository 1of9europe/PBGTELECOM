"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/session";
import { siteSchema } from "@/lib/validations";
import { siteScope, contains } from "@/lib/filters";
import { Role } from "@/generated/prisma/enums";

type ActionResult = { success: true } | { success: false; error: string };

export async function getSites(search?: string, customerId?: string) {
  const user = await requireAuth();
  const scope = siteScope(user);

  return prisma.site.findMany({
    where: {
      ...scope,
      ...(customerId ? { customerId } : {}),
      ...(search
        ? {
            OR: [
              { name: contains(search) },
              { address: contains(search) },
            ],
          }
        : {}),
    },
    include: {
      customer: { select: { companyName: true } },
      _count: { select: { equipment: true, interventions: true } },
    },
    orderBy: { name: "asc" },
  });
}

export async function getSite(id: string) {
  const user = await requireAuth();
  const scope = siteScope(user);

  return prisma.site.findFirst({
    where: { id, ...scope },
    include: {
      customer: true,
      equipment: true,
    },
  });
}

export async function createSite(formData: FormData): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);

  const parsed = siteSchema.safeParse({
    customerId: formData.get("customerId"),
    name: formData.get("name"),
    address: formData.get("address"),
    accessInstructions: formData.get("accessInstructions") || "",
    notes: formData.get("notes") || "",
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  await prisma.site.create({ data: parsed.data });
  revalidatePath("/dashboard/sites");
  return { success: true };
}

export async function updateSite(id: string, formData: FormData): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);

  const parsed = siteSchema.safeParse({
    customerId: formData.get("customerId"),
    name: formData.get("name"),
    address: formData.get("address"),
    accessInstructions: formData.get("accessInstructions") || "",
    notes: formData.get("notes") || "",
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  await prisma.site.update({ where: { id }, data: parsed.data });
  revalidatePath("/dashboard/sites");
  revalidatePath(`/dashboard/sites/${id}`);
  return { success: true };
}

export async function deleteSite(id: string): Promise<ActionResult> {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);

  await prisma.site.delete({ where: { id } });
  revalidatePath("/dashboard/sites");
  return { success: true };
}

export async function getSiteOptions(customerId?: string) {
  const user = await requireAuth();
  const scope = siteScope(user);

  return prisma.site.findMany({
    where: {
      ...scope,
      ...(customerId ? { customerId } : {}),
    },
    select: { id: true, name: true, customerId: true },
    orderBy: { name: "asc" },
  });
}
