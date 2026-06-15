"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Button } from "@/components/ui/button";
import { company, navigation, CLIENT_PORTAL_URL } from "@/content/siteContent";
import { cn } from "@/lib/utils";

export function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-[#060b15]/82 shadow-[0_8px_34px_-22px_rgba(0,0,0,0.7)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10">
            <ShieldCheck className="size-5 text-cyan-300" />
          </div>
          <div className="leading-none">
            <p className="text-lg font-semibold tracking-wide text-white">
              {company.name}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Securite & telecom
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 xl:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300/90 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <ButtonLink
            href={CLIENT_PORTAL_URL}
            variant="outline"
            size="sm"
            className="h-9 border-white/15 bg-white/[0.03] px-4 text-slate-100 hover:border-cyan-400/40 hover:bg-cyan-400/10"
          >
            Espace client
          </ButtonLink>
          <ButtonLink
            href="/#contact"
            size="sm"
            className="h-9 bg-gradient-to-r from-sky-500 to-cyan-400 px-4 text-slate-950 shadow-[0_0_30px_-10px_rgba(34,211,238,0.8)] hover:from-sky-400 hover:to-cyan-300"
          >
            Audit gratuit
          </ButtonLink>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-slate-200 xl:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-[#090f1a]/95 backdrop-blur-xl transition-all duration-300 xl:hidden",
          mobileOpen ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-5">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4">
            <ButtonLink
              href={CLIENT_PORTAL_URL}
              variant="outline"
              className="w-full border-white/15 bg-white/[0.03] text-slate-100"
              onClick={() => setMobileOpen(false)}
            >
              Espace client
            </ButtonLink>
            <ButtonLink
              href="/#contact"
              className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950"
              onClick={() => setMobileOpen(false)}
            >
              Audit gratuit
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
