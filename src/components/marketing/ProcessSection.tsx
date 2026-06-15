import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { processSteps } from "@/content/siteContent";

export function ProcessSection() {
  return (
    <SectionWrapper
      id="methode"
      title="Notre méthode de travail"
      subtitle="De l'audit gratuit à la maintenance, un accompagnement complet à chaque étape."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step, index) => (
          <div
            key={step.step}
            className="relative rounded-xl border border-white/10 bg-[#111827]/60 p-6"
          >
            <span className="text-3xl font-bold text-sky-500/30">{step.step}</span>
            <h3 className="mt-3 text-base font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {step.description}
            </p>
            {index < processSteps.length - 1 && (
              <div className="absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 items-center justify-center rounded-full bg-sky-500/20 text-sky-400 lg:flex">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
