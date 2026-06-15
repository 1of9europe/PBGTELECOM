import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark relative min-h-screen bg-[#050913] text-foreground">
      <JsonLd data={[buildOrganizationSchema(), buildWebSiteSchema()]} />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_8%,rgba(56,189,248,0.04),transparent_30%),radial-gradient(circle_at_85%_25%,rgba(59,130,246,0.03),transparent_28%),linear-gradient(to_bottom,#050913_0%,#050b15_42%,#040812_100%)]" />
      <MarketingHeader />
      <main className="relative">{children}</main>
      <MarketingFooter />
    </div>
  );
}
