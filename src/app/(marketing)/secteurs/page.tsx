import { SectorsSection } from "@/components/marketing/SectorsSection";
import { RealizationsSection } from "@/components/marketing/RealizationsSection";
import { ContactSection } from "@/components/marketing/ContactSection";
import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { ButtonLink } from "@/components/ui/button-link";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Secteurs",
  description:
    "PBG TELECOM sécurise syndics, bailleurs sociaux, commerces, entrepôts et particuliers en Île-de-France et PACA.",
  path: "/secteurs",
});

export default function SecteursPage() {
  return (
    <>
      <SectionWrapper className="pb-0 pt-16 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-sky-400">
            Secteurs
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Des solutions adaptées à chaque métier
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">
            Entreprises, commerces, bailleurs sociaux, collectivités, syndics d&apos;immeuble,
            entrepôts et particuliers — nous adaptons nos systèmes à vos contraintes terrain.
          </p>
          <ButtonLink
            href="/#contact"
            className="mt-8 bg-sky-500 text-white hover:bg-sky-400"
          >
            Parler de mon projet
          </ButtonLink>
        </div>
      </SectionWrapper>
      <SectorsSection />
      <RealizationsSection />
      <ContactSection />
    </>
  );
}
