import {
  Lock,
  ClipboardList,
  History,
  Server,
  MessageSquare,
  FileText,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { saasSection, CLIENT_PORTAL_URL } from "@/content/siteContent";
import type { LucideIcon } from "lucide-react";

const featureIcons: LucideIcon[] = [
  Lock,
  ClipboardList,
  History,
  Server,
  MessageSquare,
  FileText,
];

export function SaasSection() {
  return (
    <SectionWrapper
      id="espace-client"
      className="bg-[#0c1220]"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-sky-400">
            Espace client
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {saasSection.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">
            {saasSection.description}
          </p>
          <ButtonLink
            href={CLIENT_PORTAL_URL}
            size="lg"
            className="mt-8 h-11 bg-sky-500 px-6 text-white hover:bg-sky-400"
          >
            {saasSection.cta}
          </ButtonLink>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {saasSection.features.map((feature, index) => {
            const Icon = featureIcons[index] ?? Lock;
            return (
              <div
                key={feature}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111827]/60 p-4"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/10">
                  <Icon className="size-4 text-sky-400" />
                </div>
                <span className="text-sm text-slate-300">{feature}</span>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
