import type { Metadata } from "next";
import { company, faq, seo } from "@/content/siteContent";

export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.AUTH_URL ??
    "http://localhost:3000";
  return url.replace(/\/$/, "");
}

export const publicSeoRoutes = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/services", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/secteurs", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/a-propos", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
] as const;

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  const siteUrl = getSiteUrl();
  const pageDescription = description ?? seo.description;
  const canonical = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const ogTitle = title ? `${title} | ${company.name}` : seo.title;

  return {
    ...(title ? { title } : {}),
    description: pageDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle,
      description: pageDescription,
      type: "website",
      locale: "fr_FR",
      url: canonical,
      siteName: company.name,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: pageDescription,
    },
  };
}

export const privateAreaRobots: Metadata["robots"] = {
  index: false,
  follow: false,
};

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${getSiteUrl()}/#organization`,
    name: company.name,
    description: seo.description,
    url: getSiteUrl(),
    telephone: company.phone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressCountry: "FR",
    },
    foundingDate: String(company.founded),
    areaServed: ["Île-de-France", "PACA", "France"],
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: getSiteUrl(),
  };
}

export function buildFaqSchema(
  items: readonly { question: string; answer: string }[] = faq
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
