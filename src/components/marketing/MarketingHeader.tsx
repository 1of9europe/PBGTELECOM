"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { navigation, CLIENT_PORTAL_URL } from "@/content/siteContent";
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
          ? "border-b border-white/10 bg-[#060b15]/90 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-3.5">
        <Link href="/" className="group shrink-0 transition-opacity hover:opacity-90">
          <BrandLogo tone="yellow" size="lg" priority className="h-11 w-auto md:h-12" />
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-400 transition-colors duration-200 hover:text-white"
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
            className="h-9 rounded-lg border-white/18 bg-transparent px-4 text-slate-200 transition-colors hover:border-white/30 hover:bg-white/[0.05] hover:text-white"
          >
            Espace client
          </ButtonLink>
          <ButtonLink
            href="/#contact"
            size="sm"
            className="h-9 rounded-lg bg-white px-4 font-medium text-slate-950 transition-colors hover:bg-slate-100"
          >
            Audit gratuit
          </ButtonLink>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-slate-300 hover:bg-white/5 hover:text-white xl:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-[#090f1a]/98 backdrop-blur-xl transition-all duration-300 xl:hidden",
          mobileOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-0.5 px-4 py-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-3 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4">
            <ButtonLink
              href={CLIENT_PORTAL_URL}
              variant="outline"
              className="h-11 w-full rounded-lg border-white/18 bg-transparent text-slate-200"
              onClick={() => setMobileOpen(false)}
            >
              Espace client
            </ButtonLink>
            <ButtonLink
              href="/#contact"
              className="h-11 w-full rounded-lg bg-white font-medium text-slate-950 hover:bg-slate-100"
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
