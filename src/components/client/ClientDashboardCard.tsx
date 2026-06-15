import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ClientDashboardCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  className?: string;
};

export function ClientDashboardCard({
  title,
  value,
  description,
  icon: Icon,
  className,
}: ClientDashboardCardProps) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-slate-800 bg-slate-950/70 p-5 shadow-sm backdrop-blur",
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-300">{title}</p>
        <span className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-2 text-blue-300">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="text-3xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </article>
  );
}
