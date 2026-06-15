import { stats } from "@/content/siteContent";

export function StatsSection() {
  return (
    <section className="border-y border-white/5 bg-[#0c1220]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-white/5 md:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center bg-[#0c1220] px-4 py-10 text-center"
          >
            <p className="text-2xl font-semibold text-sky-400 md:text-3xl">{stat.value}</p>
            <p className="mt-2 text-xs text-slate-400 md:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
