import { stats } from "@/content/siteContent";
import { Reveal } from "@/components/marketing/Reveal";

export function StatsSection() {
  return (
    <section className="px-4 md:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1324] via-[#0b1220] to-[#101b2f] p-4 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.8)] md:p-6">
        <div className="grid gap-3 md:grid-cols-5">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delayMs={index * 50}>
              <article className="h-full rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-6 text-center transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-300/[0.05]">
                <p className="text-2xl font-semibold text-cyan-300 md:text-3xl">{stat.value}</p>
                <p className="mt-2 text-xs text-slate-300/90">{stat.label}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
