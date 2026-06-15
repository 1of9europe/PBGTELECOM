import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { realizations } from "@/content/siteContent";

export function RealizationsSection() {
  return (
    <SectionWrapper
      id="realisations"
      title="Réalisations & références"
      subtitle="Exemples de projets types réalisés par PBG TELECOM sur le terrain."
      className="bg-[#0c1220]"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {realizations.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-white/10 bg-[#111827]/60 p-6 transition-all hover:border-sky-500/20"
          >
            <div className="mb-3 h-1 w-12 rounded-full bg-sky-500/60" />
            <h3 className="text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
