import { CheckCircle2, Radar, Shield, Wrench } from "lucide-react";
import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { whyChooseUs } from "@/content/siteContent";
import { Reveal } from "@/components/marketing/Reveal";

export function WhyChooseUsSection() {
  return (
    <SectionWrapper
      id="pourquoi"
      title="Pourquoi choisir PBG TELECOM ?"
      subtitle="Une approche terrain premium, orientée fiabilité et continuité de service."
      className="bg-[#070d19]"
      centered={false}
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
          <p className="text-sm font-medium uppercase tracking-wider text-cyan-300">
            Partenaire securite long terme
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Audit → Installation → Suivi
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300/90">
            Nos equipes conçoivent et maintiennent des installations robustes pour les
            environnements exigeants: immeubles, commerces, bureaux et sites sensibles.
          </p>

          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0c1424] px-4 py-3">
              <Radar className="size-4 text-cyan-300" />
              <span className="text-sm text-slate-200">Audit terrain et etude technique</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0c1424] px-4 py-3">
              <Shield className="size-4 text-cyan-300" />
              <span className="text-sm text-slate-200">Installation propre et securisee</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0c1424] px-4 py-3">
              <Wrench className="size-4 text-cyan-300" />
              <span className="text-sm text-slate-200">Maintenance et depannage rapide</span>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2">
          {whyChooseUs.map((item, index) => (
            <Reveal key={item} delayMs={index * 45}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-[#0f182b]/70 p-4 transition-colors hover:border-cyan-400/25">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-cyan-300" />
                <p className="text-sm leading-relaxed text-slate-200">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
