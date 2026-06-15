export * from "@/generated/prisma/browser";

export const CUSTOMER_TYPE_LABELS: Record<string, string> = {
  SYNDIC: "Syndic",
  COMPANY: "Entreprise",
  SHOP: "Commerce",
  INDIVIDUAL: "Particulier",
};

export const CUSTOMER_STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Actif",
  INACTIVE: "Inactif",
};

export const EQUIPMENT_TYPE_LABELS: Record<string, string> = {
  CAMERA: "Caméra",
  NVR: "NVR",
  DVR: "DVR",
  ACCESS_CONTROL: "Contrôle d'accès",
  ROUTER: "Routeur",
  SWITCH: "Switch",
  OTHER: "Autre",
};

export const EQUIPMENT_STATUS_LABELS: Record<string, string> = {
  ONLINE: "En ligne",
  OFFLINE: "Hors ligne",
  UNKNOWN: "Inconnu",
  MAINTENANCE: "Maintenance",
};

export const CONTRACT_STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Actif",
  EXPIRED: "Expiré",
  CANCELLED: "Annulé",
};

export const TICKET_PRIORITY_LABELS: Record<string, string> = {
  LOW: "Basse",
  MEDIUM: "Moyenne",
  HIGH: "Haute",
  URGENT: "Urgente",
};

export const TICKET_STATUS_LABELS: Record<string, string> = {
  OPEN: "Ouvert",
  IN_PROGRESS: "En cours",
  WAITING_CUSTOMER: "Attente client",
  RESOLVED: "Résolu",
  CLOSED: "Fermé",
};

export const INTERVENTION_STATUS_LABELS: Record<string, string> = {
  PLANNED: "Planifiée",
  IN_PROGRESS: "En cours",
  COMPLETED: "Terminée",
  CANCELLED: "Annulée",
};

export const SUBSCRIPTION_STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Actif",
  PAST_DUE: "Impayé",
  CANCELLED: "Annulé",
};

export const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Administrateur",
  TECHNICIAN: "Technicien",
  CUSTOMER: "Client",
};
