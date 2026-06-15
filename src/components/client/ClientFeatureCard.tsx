import type { LucideIcon } from "lucide-react";

type ClientFeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function ClientFeatureCard({ title, description, icon: Icon }: ClientFeatureCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <div className="mb-3 inline-flex rounded-xl border border-blue-500/30 bg-blue-500/10 p-2 text-blue-300">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
    </article>
  );
}
