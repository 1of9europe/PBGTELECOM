import Image from "next/image";
import {
  Camera,
  ShieldAlert,
  Flame,
  KeyRound,
  Network,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { services } from "@/content/siteContent";

const iconMap: Record<string, LucideIcon> = {
  videosurveillance: Camera,
  "alarmes-intrusion": ShieldAlert,
  "alarme-incendie": Flame,
  "controle-acces": KeyRound,
  reseaux: Network,
  maintenance: Wrench,
};

export function ServicesSection() {
  return (
    <SectionWrapper
      id="services"
      title="Nos services de sécurité"
      subtitle="Des solutions complètes en vidéosurveillance, alarmes, contrôle d'accès, interphonie et réseaux courants faibles."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = iconMap[service.id] ?? Camera;
          return (
            <article
              key={service.id}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#111827]/60 p-6 transition-all hover:border-sky-500/30 hover:shadow-[0_0_30px_-5px_rgba(14,165,233,0.15)]"
            >
              {"image" in service && service.image && (
                <div className="mb-5 overflow-hidden rounded-lg border border-white/5">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={250}
                    className="aspect-[16/10] w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                  />
                </div>
              )}
              <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-sky-500/10 ring-1 ring-sky-500/20">
                <Icon className="size-5 text-sky-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {service.description}
              </p>
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
