import { WhyChooseUsSection } from "@/components/marketing/WhyChooseUsSection";
import { ProcessSection } from "@/components/marketing/ProcessSection";
import { ContactSection } from "@/components/marketing/ContactSection";
import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { aboutContent, company } from "@/content/siteContent";
import { ButtonLink } from "@/components/ui/button-link";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "À propos",
  description:
    "Expert en systèmes de sécurité depuis 2004. PBG TELECOM accompagne entreprises et particuliers en vidéoprotection, alarmes et contrôle d'accès.",
  path: "/a-propos",
});

export default function AboutPage() {
  return (
    <>
      <SectionWrapper className="pb-0 pt-16 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-sky-400">
            À propos
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {aboutContent.title}
          </h1>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="mx-auto max-w-3xl space-y-6">
          {aboutContent.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-slate-400 md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.values.map((value) => (
            <div
              key={value.title}
              className="rounded-xl border border-white/10 bg-[#111827]/60 p-6 text-center"
            >
              <h3 className="text-base font-semibold text-sky-400">{value.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            {company.slogan} — {company.zones}
          </p>
          <ButtonLink
            href="/#contact"
            className="mt-6 bg-sky-500 text-white hover:bg-sky-400"
          >
            Demander un audit gratuit
          </ButtonLink>
        </div>
      </SectionWrapper>

      <WhyChooseUsSection />
      <ProcessSection />
      <ContactSection />
    </>
  );
}
