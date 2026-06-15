import { CheckCircle2 } from "lucide-react";
import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { whyChooseUs } from "@/content/siteContent";

export function WhyChooseUsSection() {
  return (
    <SectionWrapper
      id="pourquoi"
      title="Pourquoi choisir PBG TELECOM ?"
      subtitle="Fiabilité, réactivité et accompagnement sur mesure depuis 2004."
      className="bg-[#0c1220]"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseUs.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-xl border border-white/5 bg-[#111827]/40 p-5 transition-colors hover:border-sky-500/20"
          >
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-sky-400" />
            <p className="text-sm leading-relaxed text-slate-300">{item}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
