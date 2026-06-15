import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { faq } from "@/content/siteContent";

export function FaqSection() {
  return (
    <SectionWrapper
      id="faq"
      title="Questions fréquentes"
      subtitle="Tout ce que vous devez savoir avant de nous contacter."
    >
      <div className="mx-auto max-w-3xl space-y-3">
        {faq.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-white/10 bg-[#111827]/60 open:border-sky-500/20"
          >
            <summary className="cursor-pointer list-none px-6 py-4 text-sm font-medium text-white transition-colors marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span className="shrink-0 text-sky-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <div className="border-t border-white/5 px-6 py-4">
              <p className="text-sm leading-relaxed text-slate-400">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </SectionWrapper>
  );
}
