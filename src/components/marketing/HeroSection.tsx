import Image from "next/image";
import { ArrowRight, Shield, Radar, Clock3, Building2, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { hero, company } from "@/content/siteContent";
import { Reveal } from "@/components/marketing/Reveal";

const iconMap = [Shield, Radar, Clock3, Building2];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-6 pt-6 md:pb-10 md:pt-8">
      <div className="absolute inset-0 bg-[#050a14]">
        <div className="absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-cyan-500/[0.04] blur-[100px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.03] to-transparent" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-8 md:gap-16 md:px-8 md:pb-16 md:pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14">
        <Reveal className="flex flex-col gap-6 md:gap-8">
          <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-slate-300 md:px-4 md:text-xs">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400/60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-cyan-400" />
            </span>
            {hero.badge}
          </div>

          <div className="space-y-4 md:space-y-5">
            <h1 className="max-w-[18ch] text-[2rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:max-w-none sm:text-4xl md:text-[3.25rem] md:leading-[1.08] lg:text-[3.5rem]">
              Sécurisez vos bâtiments avec un{" "}
              <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
                expert terrain
              </span>{" "}
              depuis 2004
            </h1>

            <p className="max-w-xl text-[0.95rem] leading-[1.7] text-slate-400 md:text-lg md:leading-[1.75]">
              {hero.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {hero.trustStats.map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-3 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.05] md:px-4 md:py-3.5"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <p className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[0.65rem] leading-snug text-slate-500 md:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
            <ButtonLink
              href="/#contact"
              size="lg"
              className="group h-12 gap-2 rounded-lg bg-white px-6 text-[0.95rem] font-medium text-slate-950 shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_8px_24px_-8px_rgba(0,0,0,0.5)] transition-all duration-200 hover:bg-slate-100 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_12px_32px_-10px_rgba(0,0,0,0.55)]"
            >
              {hero.ctaPrimary}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink
              href="/#services"
              variant="outline"
              size="lg"
              className="h-12 rounded-lg border-white/20 bg-transparent px-6 text-[0.95rem] text-white transition-all duration-200 hover:border-white/35 hover:bg-white/[0.06]"
            >
              {hero.ctaSecondary}
            </ButtonLink>
          </div>

          <div className="space-y-3 border-t border-white/[0.08] pt-5">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
              Ils nous font confiance
            </p>
            <div className="flex flex-wrap gap-2">
              {hero.trustSectors.map((sector) => (
                <span
                  key={sector}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs text-slate-300"
                >
                  <CheckCircle2 className="size-3 text-cyan-400/80" />
                  {sector}
                </span>
              ))}
            </div>
            <p className="text-sm text-slate-500">
              {company.slogan} · IDF & PACA · Intervention France selon projet
            </p>
          </div>
        </Reveal>

        <Reveal className="relative mt-2 lg:mt-0 lg:pl-4" delayMs={120}>
          <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#0a1220]/90 p-1.5 shadow-[0_24px_64px_-32px_rgba(0,0,0,0.9)] md:rounded-3xl md:p-2">
            <Image
              src="/images/hero.png"
              alt="Installation vidéosurveillance, contrôle d'accès et sécurisation de bâtiment professionnel par PBG TELECOM"
              width={1600}
              height={900}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[16/10] w-full rounded-[1.1rem] object-cover md:rounded-[1.35rem]"
            />
            <div className="pointer-events-none absolute inset-x-1.5 bottom-1.5 top-12 rounded-[1rem] bg-gradient-to-t from-[#04080f]/80 via-[#04080f]/20 to-transparent md:inset-x-2 md:bottom-2 md:top-16 md:rounded-[1.2rem]" />

            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg border border-white/10 bg-[#0a1220]/80 px-2.5 py-1.5 backdrop-blur-sm md:left-4 md:top-4 md:px-3">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/50 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[0.65rem] font-medium uppercase tracking-wider text-slate-300 md:text-xs">
                Surveillance active
              </span>
            </div>
          </div>

          <div className="animate-float pointer-events-none absolute -left-2 -top-4 hidden w-48 items-center gap-3 rounded-xl border border-white/12 bg-[#0c1528]/95 p-3 shadow-lg backdrop-blur-md sm:flex md:-left-5 md:-top-6 md:w-52 md:rounded-2xl">
            <span className="flex size-9 items-center justify-center rounded-lg bg-cyan-400/10">
              <Shield className="size-4 text-cyan-300" />
            </span>
            <div>
              <p className="text-[0.65rem] uppercase tracking-wider text-slate-500">Confiance terrain</p>
              <p className="text-sm font-medium text-white">+20 ans d&apos;expertise</p>
            </div>
          </div>

          <div className="animate-float-delayed pointer-events-none absolute -bottom-4 right-0 hidden w-56 rounded-xl border border-white/12 bg-[#0c1528]/95 p-3.5 shadow-lg backdrop-blur-md sm:block md:-bottom-6 md:w-60 md:rounded-2xl md:p-4">
            <p className="text-[0.65rem] font-medium uppercase tracking-wider text-slate-500">
              Opérations
            </p>
            <div className="mt-2.5 space-y-2">
              {hero.floatingCards.map((item, index) => {
                const Icon = iconMap[index];
                return (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-white/[0.06]">
                      <Icon className="size-3.5 text-cyan-300/90" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm text-slate-200">{item.label}</p>
                      <p className="text-[0.65rem] text-slate-500">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
