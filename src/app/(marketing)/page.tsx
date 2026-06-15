import { JsonLd } from "@/components/seo/JsonLd";
import { buildFaqSchema, createPageMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/marketing/HeroSection";
import { StatsSection } from "@/components/marketing/StatsSection";
import { ServicesSection } from "@/components/marketing/ServicesSection";
import { WhyChooseUsSection } from "@/components/marketing/WhyChooseUsSection";
import { SectorsSection } from "@/components/marketing/SectorsSection";
import { SaasSection } from "@/components/marketing/SaasSection";
import { ProcessSection } from "@/components/marketing/ProcessSection";
import { RealizationsSection } from "@/components/marketing/RealizationsSection";
import { FaqSection } from "@/components/marketing/FaqSection";
import { ContactSection } from "@/components/marketing/ContactSection";

export const metadata = createPageMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildFaqSchema()} />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <SectorsSection />
      <SaasSection />
      <ProcessSection />
      <RealizationsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
