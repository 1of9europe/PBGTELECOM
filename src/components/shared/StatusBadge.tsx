import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "muted";

const variantStyles: Record<StatusVariant, string> = {
  default: "bg-primary/10 text-primary border-primary/20",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  danger: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  info: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  muted: "bg-muted text-muted-foreground border-border",
};

type StatusBadgeProps = {
  label: string;
  variant?: StatusVariant;
  className?: string;
};

export function StatusBadge({ label, variant = "default", className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", variantStyles[variant], className)}
    >
      {label}
    </Badge>
  );
}

export function getCustomerStatusVariant(status: string): StatusVariant {
  return status === "ACTIVE" ? "success" : "muted";
}

export function getEquipmentStatusVariant(status: string): StatusVariant {
  const map: Record<string, StatusVariant> = {
    ONLINE: "success",
    OFFLINE: "danger",
    UNKNOWN: "muted",
    MAINTENANCE: "warning",
  };
  return map[status] ?? "default";
}

export function getTicketStatusVariant(status: string): StatusVariant {
  const map: Record<string, StatusVariant> = {
    OPEN: "info",
    IN_PROGRESS: "warning",
    WAITING_CUSTOMER: "muted",
    RESOLVED: "success",
    CLOSED: "muted",
  };
  return map[status] ?? "default";
}

export function getTicketPriorityVariant(priority: string): StatusVariant {
  const map: Record<string, StatusVariant> = {
    LOW: "muted",
    MEDIUM: "info",
    HIGH: "warning",
    URGENT: "danger",
  };
  return map[priority] ?? "default";
}

export function getInterventionStatusVariant(status: string): StatusVariant {
  const map: Record<string, StatusVariant> = {
    PLANNED: "info",
    IN_PROGRESS: "warning",
    COMPLETED: "success",
    CANCELLED: "muted",
  };
  return map[status] ?? "default";
}

export function getContractStatusVariant(status: string): StatusVariant {
  const map: Record<string, StatusVariant> = {
    ACTIVE: "success",
    EXPIRED: "warning",
    CANCELLED: "muted",
  };
  return map[status] ?? "default";
}

export function getSubscriptionStatusVariant(status: string): StatusVariant {
  const map: Record<string, StatusVariant> = {
    ACTIVE: "success",
    PAST_DUE: "danger",
    CANCELLED: "muted",
  };
  return map[status] ?? "default";
}
