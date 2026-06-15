import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { processSteps } from "@/content/siteContent";
import { Reveal } from "@/components/marketing/Reveal";

export function ProcessSection() {
  return (
    <SectionWrapper
      id="methode"
      title="Notre méthode de travail"
      subtitle="Un parcours clair, du premier audit jusqu'au maintien en conditions operationnelles."
    >
      <div className="relative">
        <div className="absolute left-[1.18rem] top-0 h-full w-px bg-gradient-to-b from-cyan-300/20 via-cyan-300/40 to-transparent md:hidden" />
        <div className="hidden md:block">
          <div className="absolute left-0 right-0 top-12 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent" />
        </div>

        <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-6">
          {processSteps.map((step, index) => (
            <Reveal key={step.step} delayMs={index * 55}>
              <article className="relative h-full rounded-2xl border border-white/10 bg-[#0f182a]/70 p-5 transition-colors hover:border-cyan-400/30">
                <span className="mb-4 flex size-9 items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-300/10 text-sm font-semibold text-cyan-200">
                  {step.step}
                </span>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300/90">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
