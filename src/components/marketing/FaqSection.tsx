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
            className="group rounded-2xl border border-white/10 bg-[#0f182a]/75 open:border-cyan-400/25"
          >
            <summary className="cursor-pointer list-none px-6 py-4 text-sm font-medium text-white transition-colors marker:content-none hover:text-cyan-100 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span className="shrink-0 text-cyan-300 transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <div className="border-t border-white/5 px-6 py-4">
              <p className="text-sm leading-relaxed text-slate-300/90">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </SectionWrapper>
  );
}
