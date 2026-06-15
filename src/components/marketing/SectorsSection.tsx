import { Building2, Users, Store, Pill, Warehouse, Home } from "lucide-react";
import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { sectors } from "@/content/siteContent";
import type { LucideIcon } from "lucide-react";

const sectorIcons: LucideIcon[] = [
  Building2,
  Users,
  Store,
  Pill,
  Warehouse,
  Home,
];

export function SectorsSection() {
  return (
    <SectionWrapper
      id="secteurs"
      title="Secteurs d'intervention"
      subtitle="Entreprises, commerces, bailleurs sociaux, collectivités, syndics et particuliers."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sectors.map((sector, index) => {
          const Icon = sectorIcons[index] ?? Building2;
          return (
            <article
              key={sector.title}
              className="rounded-xl border border-white/10 bg-[#111827]/60 p-6 transition-all hover:border-sky-500/30 hover:shadow-[0_0_30px_-5px_rgba(14,165,233,0.12)]"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-sky-500/10 ring-1 ring-sky-500/20">
                <Icon className="size-5 text-sky-400" />
              </div>
              <h3 className="text-base font-semibold text-white">{sector.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {sector.description}
              </p>
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
