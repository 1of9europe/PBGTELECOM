import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { hero, company } from "@/content/siteContent";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0f1a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.15)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(14,165,233,0.08)_0%,_transparent_50%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-1.5 text-sm text-sky-300">
            <span className="size-1.5 rounded-full bg-sky-400" />
            {company.tagline}
          </div>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
            {hero.title}
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
            {hero.subtitle}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              href="/#contact"
              size="lg"
              className="h-11 bg-sky-500 px-6 text-white hover:bg-sky-400"
            >
              {hero.ctaPrimary}
            </ButtonLink>
            <ButtonLink
              href="/#services"
              variant="outline"
              size="lg"
              className="h-11 border-white/10 bg-transparent px-6 text-slate-200 hover:bg-white/5 hover:text-white"
            >
              {hero.ctaSecondary}
            </ButtonLink>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-2xl bg-sky-500/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 ring-1 ring-white/5">
            <Image
              src="/images/hero-placeholder.svg"
              alt="Technicien sécurité PBG TELECOM en intervention sur site professionnel"
              width={1600}
              height={900}
              priority
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a]/80 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
