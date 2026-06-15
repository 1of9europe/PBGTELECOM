import { ServicesSection } from "@/components/marketing/ServicesSection";
import { ProcessSection } from "@/components/marketing/ProcessSection";
import { ContactSection } from "@/components/marketing/ContactSection";
import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata = {
  title: "Services",
  description:
    "Vidéosurveillance, alarmes intrusion et incendie, contrôle d'accès, interphonie, réseaux courants faibles et maintenance par PBG TELECOM.",
};

export default function ServicesPage() {
  return (
    <>
      <SectionWrapper className="pb-0 pt-16 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-sky-400">
            Nos prestations
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Solutions de sécurité sur mesure
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">
            PBG TELECOM conçoit, installe et maintient des systèmes de vidéosurveillance,
            alarmes, contrôle d&apos;accès et réseaux courants faibles adaptés à chaque site.
          </p>
          <ButtonLink
            href="/#contact"
            className="mt-8 bg-sky-500 text-white hover:bg-sky-400"
          >
            Demander un audit gratuit
          </ButtonLink>
        </div>
      </SectionWrapper>
      <ServicesSection />
      <ProcessSection />
      <ContactSection />
    </>
  );
}
