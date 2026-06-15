import {
  Lock,
  ClipboardList,
  History,
  ServerCog,
  MessageSquare,
  FileText,
  MonitorSmartphone,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { saasSection, CLIENT_PORTAL_URL } from "@/content/siteContent";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/marketing/Reveal";

const featureIcons: LucideIcon[] = [
  Lock,
  ClipboardList,
  History,
  ServerCog,
  MessageSquare,
  FileText,
];

export function SaasSection() {
  return (
    <SectionWrapper id="espace-client" className="bg-[#070d19]">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-cyan-300">
            Espace client
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {saasSection.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
            {saasSection.description}
          </p>
          <ButtonLink
            href={CLIENT_PORTAL_URL}
            size="lg"
            className="mt-8 h-11 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 px-6 text-slate-950 shadow-[0_0_36px_-12px_rgba(34,211,238,0.9)] hover:from-sky-400 hover:to-cyan-300"
          >
            {saasSection.cta}
          </ButtonLink>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {saasSection.features.map((feature, index) => {
              const Icon = featureIcons[index] ?? Lock;
              return (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0f182a]/70 p-3.5"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan-300/10">
                    <Icon className="size-4 text-cyan-200" />
                  </div>
                  <span className="text-sm text-slate-200">{feature}</span>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delayMs={120}>
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0b1324]/90 p-4 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.85)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-rose-400/70" />
                <span className="size-2.5 rounded-full bg-amber-300/70" />
                <span className="size-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <span className="flex items-center gap-2 text-xs text-slate-400">
                <MonitorSmartphone className="size-3.5" />
                Portail client securise
              </span>
            </div>

            <div className="mt-4 grid gap-4">
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-300/[0.06] p-4">
                <p className="text-xs uppercase tracking-wider text-cyan-200">Interventions</p>
                <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-[#121c31] px-3 py-2">
                  <span className="text-sm text-slate-200">Maintenance preventive</span>
                  <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-xs text-emerald-300">
                    Planifiee
                  </span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[#111b30] p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-400">Equipements</p>
                  <p className="mt-3 text-2xl font-semibold text-white">126</p>
                  <p className="text-xs text-slate-400">actifs et suivis</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#111b30] p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-400">Demandes</p>
                  <p className="mt-3 text-2xl font-semibold text-white">08</p>
                  <p className="text-xs text-slate-400">en cours de traitement</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111b30] p-4">
                <p className="text-xs uppercase tracking-wider text-slate-400">Documents projet</p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between rounded-lg border border-white/8 bg-[#0d1526] px-3 py-2 text-sm text-slate-300">
                    <span>Plan implantation cameras</span>
                    <span className="text-xs text-cyan-300">PDF</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-white/8 bg-[#0d1526] px-3 py-2 text-sm text-slate-300">
                    <span>Rapport intervention 14/06</span>
                    <span className="text-xs text-cyan-300">SIGNE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
