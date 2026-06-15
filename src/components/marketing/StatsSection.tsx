import { stats } from "@/content/siteContent";
import { Reveal } from "@/components/marketing/Reveal";

export function StatsSection() {
  return (
    <section className="px-4 pb-4 md:px-8 md:pb-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1220]/80 md:rounded-3xl">
            <div className="grid divide-y divide-white/[0.08] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
              {stats.map((stat, index) => (
                <article
                  key={stat.label}
                  className="group px-5 py-6 transition-colors duration-300 hover:bg-white/[0.03] md:px-6 md:py-7"
                >
                  <div className="flex items-baseline gap-1">
                    <p className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                      {stat.value}
                    </p>
                    {stat.suffix && (
                      <span className="text-sm font-medium text-cyan-400/80">{stat.suffix}</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-snug text-slate-400 transition-colors group-hover:text-slate-300">
                    {stat.label}
                  </p>
                  <div
                    className="mt-4 h-px w-8 bg-gradient-to-r from-cyan-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ transitionDelay: `${index * 40}ms` }}
                  />
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
