import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe requis"),
});

export const customerSchema = z.object({
  companyName: z.string().min(2, "Nom requis"),
  contactName: z.string().min(2, "Contact requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(6, "Téléphone requis"),
  address: z.string().min(5, "Adresse requise"),
  type: z.enum(["SYNDIC", "COMPANY", "SHOP", "INDIVIDUAL"]),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export const siteSchema = z.object({
  customerId: z.string().min(1, "Client requis"),
  name: z.string().min(2, "Nom requis"),
  address: z.string().min(5, "Adresse requise"),
  accessInstructions: z.string().optional(),
  notes: z.string().optional(),
});

export const equipmentSchema = z.object({
  siteId: z.string().min(1, "Site requis"),
  type: z.enum([
    "CAMERA",
    "NVR",
    "DVR",
    "ACCESS_CONTROL",
    "ROUTER",
    "SWITCH",
    "OTHER",
  ]),
  brand: z.string().min(1, "Marque requise"),
  model: z.string().min(1, "Modèle requis"),
  serialNumber: z.string().optional(),
  ipAddress: z.string().optional(),
  installDate: z.string().optional(),
  warrantyEndDate: z.string().optional(),
  status: z.enum(["ONLINE", "OFFLINE", "UNKNOWN", "MAINTENANCE"]).default("UNKNOWN"),
  notes: z.string().optional(),
});

export const contractSchema = z.object({
  customerId: z.string().min(1, "Client requis"),
  name: z.string().min(2, "Nom requis"),
  monthlyPrice: z.coerce.number().positive("Prix invalide"),
  startDate: z.string().min(1, "Date de début requise"),
  endDate: z.string().optional(),
  status: z.enum(["ACTIVE", "EXPIRED", "CANCELLED"]).default("ACTIVE"),
  includedVisitsPerYear: z.coerce.number().int().min(0).default(2),
  responseTimeHours: z.coerce.number().int().min(1).default(24),
  notes: z.string().optional(),
});

export const ticketSchema = z.object({
  customerId: z.string().min(1, "Client requis"),
  siteId: z.string().min(1, "Site requis"),
  equipmentId: z.string().optional(),
  title: z.string().min(3, "Titre requis"),
  description: z.string().min(10, "Description requise"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  status: z
    .enum(["OPEN", "IN_PROGRESS", "WAITING_CUSTOMER", "RESOLVED", "CLOSED"])
    .default("OPEN"),
  assignedToId: z.string().optional(),
});

export const interventionSchema = z.object({
  ticketId: z.string().optional(),
  siteId: z.string().min(1, "Site requis"),
  technicianId: z.string().min(1, "Technicien requis"),
  scheduledAt: z.string().min(1, "Date planifiée requise"),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  status: z
    .enum(["PLANNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
    .default("PLANNED"),
  report: z.string().optional(),
  customerSignature: z.string().optional(),
});

export const subscriptionSchema = z.object({
  customerId: z.string().min(1, "Client requis"),
  planName: z.string().min(2, "Nom du plan requis"),
  priceMonthly: z.coerce.number().positive("Prix invalide"),
  status: z.enum(["ACTIVE", "PAST_DUE", "CANCELLED"]).default("ACTIVE"),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CustomerInput = z.infer<typeof customerSchema>;
export type SiteInput = z.infer<typeof siteSchema>;
export type EquipmentInput = z.infer<typeof equipmentSchema>;
export type ContractInput = z.infer<typeof contractSchema>;
export type TicketInput = z.infer<typeof ticketSchema>;
export type InterventionInput = z.infer<typeof interventionSchema>;
export type SubscriptionInput = z.infer<typeof subscriptionSchema>;
