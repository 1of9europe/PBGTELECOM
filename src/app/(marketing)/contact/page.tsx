import { ContactSection } from "@/components/marketing/ContactSection";
import { FaqSection } from "@/components/marketing/FaqSection";
import { SectionWrapper } from "@/components/marketing/SectionWrapper";

export const metadata = {
  title: "Contact",
  description:
    "Contactez PBG TELECOM pour un audit gratuit ou un devis. Vidéosurveillance, alarmes, contrôle d'accès — Île-de-France & PACA.",
};

export default function ContactPage() {
  return (
    <>
      <SectionWrapper className="pb-0 pt-16 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-sky-400">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Parlons de votre projet
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">
            Demandez un audit gratuit ou un devis pour votre installation de vidéosurveillance,
            alarme, contrôle d&apos;accès ou réseau courants faibles.
          </p>
        </div>
      </SectionWrapper>
      <ContactSection />
      <FaqSection />
    </>
  );
}
