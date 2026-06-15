import Image from "next/image";
import { Shield, Radar, Clock3, Building2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { hero, company } from "@/content/siteContent";
import { Reveal } from "@/components/marketing/Reveal";

export function HeroSection() {
  const iconMap = [Shield, Radar, Clock3, Building2];

  return (
    <section className="relative overflow-hidden pb-8 pt-10 md:pb-12 md:pt-14">
      <div className="absolute inset-0 bg-[#050a14]">
        <div className="absolute -left-24 top-0 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute -right-20 top-16 h-[28rem] w-[28rem] rounded-full bg-blue-600/20 blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-300/[0.05] to-transparent" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:34px_34px] opacity-25" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-14 pt-12 md:px-8 md:pb-20 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal className="space-y-9">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-300/[0.06] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-cyan-200">
            <span className="size-1.5 rounded-full bg-cyan-300" />
            {hero.badge}
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-6xl md:leading-[1.04]">
            {hero.title}
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-slate-300/90 md:text-xl md:leading-relaxed">
            {hero.subtitle}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <ButtonLink
              href="/#contact"
              size="lg"
              className="h-11 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 px-6 text-[0.95rem] text-slate-950 shadow-[0_0_38px_-10px_rgba(34,211,238,0.9)] hover:from-sky-400 hover:to-cyan-300"
            >
              {hero.ctaPrimary}
            </ButtonLink>
            <ButtonLink
              href="/#services"
              variant="outline"
              size="lg"
              className="h-11 rounded-xl border-white/15 bg-white/[0.02] px-6 text-slate-100 hover:border-cyan-400/40 hover:bg-cyan-400/10"
            >
              {hero.ctaSecondary}
            </ButtonLink>
          </div>
          <p className="text-sm text-slate-500">
            {company.slogan} · IDF & PACA · Intervention France selon projet
          </p>
        </Reveal>

        <Reveal className="relative lg:pl-6" delayMs={120}>
          <div className="absolute -inset-5 rounded-[2rem] bg-cyan-400/10 blur-[80px]" />
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0b1426]/80 p-2 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.85)]">
            <Image
              src="/images/hero-placeholder.svg"
              alt="Technicien sécurité PBG TELECOM en intervention sur site professionnel"
              width={1600}
              height={900}
              priority
              className="aspect-[16/10] w-full rounded-[1.35rem] object-cover"
            />
            <div className="absolute inset-x-2 bottom-2 top-16 rounded-[1.2rem] bg-gradient-to-t from-[#04080f]/90 via-transparent to-transparent" />
          </div>

          <div className="pointer-events-none absolute -left-5 -top-6 flex w-52 items-center gap-3 rounded-2xl border border-cyan-300/20 bg-[#0c1528]/88 p-3 shadow-xl backdrop-blur-md">
            <span className="flex size-8 items-center justify-center rounded-lg bg-cyan-300/12">
              <Shield className="size-4 text-cyan-300" />
            </span>
            <div>
              <p className="text-xs text-slate-400">Confiance terrain</p>
              <p className="text-sm font-medium text-white">+20 ans d&apos;expertise</p>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-6 right-0 w-60 rounded-2xl border border-white/15 bg-[#101a30]/90 p-4 shadow-xl backdrop-blur-md">
            <p className="text-xs uppercase tracking-wider text-slate-400">Operations</p>
            <div className="mt-2 space-y-2.5">
              {hero.floatingCards.map((item, index) => {
                const Icon = iconMap[index];
                return (
                  <div key={item} className="flex items-center gap-2.5">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-cyan-400/10">
                      <Icon className="size-3.5 text-cyan-300" />
                    </span>
                    <span className="text-sm text-slate-200">{item}</span>
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
