import Image from "next/image";
import {
  Camera,
  ShieldAlert,
  Flame,
  KeyRound,
  PhoneCall,
  Network,
  Wrench,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { services } from "@/content/siteContent";
import { Reveal } from "@/components/marketing/Reveal";

const iconMap: Record<string, LucideIcon> = {
  videoprotection: Camera,
  "alarmes-intrusion": ShieldAlert,
  "alarme-incendie": Flame,
  "controle-acces": KeyRound,
  interphonie: PhoneCall,
  reseaux: Network,
  maintenance: Wrench,
};

export function ServicesSection() {
  return (
    <SectionWrapper
      id="services"
      title="Nos services de sécurité"
      subtitle="Des solutions premium pour protéger, superviser et maintenir vos bâtiments sur le long terme."
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => {
          const Icon = iconMap[service.id] ?? Camera;
          return (
            <Reveal key={service.id} delayMs={index * 55}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0d1628]/92 to-[#0a111f]/95 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/35 hover:shadow-[0_18px_55px_-25px_rgba(34,211,238,0.45)]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cyan-400/0 via-cyan-300/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {"image" in service && service.image && (
                  <div className="mb-4 overflow-hidden rounded-xl border border-white/10">
                    <Image
                      src={service.image}
                      alt={`Installation ${service.title} — PBG TELECOM`}
                      width={400}
                      height={250}
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="aspect-[16/10] w-full object-cover opacity-85 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                    />
                  </div>
                )}
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-300/[0.08]">
                    <Icon className="size-5 text-cyan-200" />
                  </div>
                  <ArrowUpRight className="size-4 text-slate-500 transition-colors group-hover:text-cyan-200" />
                </div>
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300/85">
                  {service.description}
                </p>
                <p className="mt-4 text-xs font-medium uppercase tracking-wide text-cyan-300/90">
                  {service.detail}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
