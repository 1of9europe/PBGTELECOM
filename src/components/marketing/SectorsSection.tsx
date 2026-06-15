import {
  Building2,
  Landmark,
  Store,
  BriefcaseBusiness,
  Warehouse,
  House,
  ArrowRight,
} from "lucide-react";
import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { sectors } from "@/content/siteContent";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/marketing/Reveal";

const sectorIcons: LucideIcon[] = [
  Building2,
  Landmark,
  Store,
  BriefcaseBusiness,
  Warehouse,
  House,
];

export function SectorsSection() {
  return (
    <SectionWrapper
      id="secteurs"
      title="Secteurs d'intervention"
      subtitle="Des dispositifs de protection adaptes a chaque environnement et niveau d'exigence."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sectors.map((sector, index) => {
          const Icon = sectorIcons[index] ?? Building2;
          return (
            <Reveal key={sector.title} delayMs={index * 45}>
              <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e1728]/75 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/35 hover:shadow-[0_18px_55px_-25px_rgba(34,211,238,0.4)]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-300/[0.08]">
                    <Icon className="size-5 text-cyan-200" />
                  </div>
                  <ArrowRight className="size-4 text-slate-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-cyan-200" />
                </div>
                <h3 className="text-lg font-semibold text-white">{sector.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300/90">
                  {sector.description}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
