import { cn } from "@/lib/utils";

type ClientStatusVariant = "success" | "warning" | "danger" | "info" | "neutral";

const statusStyles: Record<ClientStatusVariant, string> = {
  success: "border-emerald-400/30 bg-emerald-500/15 text-emerald-200",
  warning: "border-amber-400/30 bg-amber-500/15 text-amber-200",
  danger: "border-red-400/30 bg-red-500/15 text-red-200",
  info: "border-blue-400/30 bg-blue-500/15 text-blue-200",
  neutral: "border-slate-500/40 bg-slate-800 text-slate-200",
};

type ClientStatusBadgeProps = {
  label: string;
  variant?: ClientStatusVariant;
  className?: string;
};

export function ClientStatusBadge({
  label,
  variant = "neutral",
  className,
}: ClientStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        statusStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
