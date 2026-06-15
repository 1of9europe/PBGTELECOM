import Image from "next/image";
import {
  Lock,
  ClipboardList,
  History,
  ServerCog,
  MessageSquare,
  FileText,
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
            className="mt-8 h-11 rounded-lg bg-white px-6 font-medium text-slate-950 transition-colors hover:bg-slate-100"
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
          <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#0a1220]/90 p-1.5 shadow-[0_24px_64px_-32px_rgba(0,0,0,0.9)] md:rounded-3xl md:p-2">
            <Image
              src={saasSection.image}
              alt="Interface espace client PBG TELECOM — suivi interventions, équipements et documents"
              width={1600}
              height={900}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[16/10] w-full rounded-[1.1rem] object-cover md:rounded-[1.35rem]"
            />
            <div className="pointer-events-none absolute inset-x-1.5 bottom-1.5 top-1.5 rounded-[1rem] bg-gradient-to-t from-[#04080f]/30 via-transparent to-transparent md:inset-x-2 md:bottom-2 md:top-2 md:rounded-[1.2rem]" />
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
