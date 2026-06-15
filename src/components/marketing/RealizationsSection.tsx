import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { realizations } from "@/content/siteContent";
import { Reveal } from "@/components/marketing/Reveal";

export function RealizationsSection() {
  return (
    <SectionWrapper
      id="realisations"
      title="Réalisations & références"
      subtitle="Exemples de projets types réalisés par PBG TELECOM sur le terrain."
      className="bg-[#070d19]"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {realizations.map((item, index) => (
          <Reveal key={item.title} delayMs={index * 60}>
            <article className="rounded-2xl border border-white/10 bg-[#0f182a]/75 p-6 transition-all duration-300 hover:border-cyan-400/30">
              <div className="mb-3 h-1 w-12 rounded-full bg-gradient-to-r from-cyan-300/80 to-sky-400/30" />
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300/90">
                {item.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
