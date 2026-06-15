"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Shield } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Button } from "@/components/ui/button";
import { company, navigation, CLIENT_PORTAL_URL } from "@/content/siteContent";
import { cn } from "@/lib/utils";

export function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0f1a]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-sky-500/10 ring-1 ring-sky-500/30">
            <Shield className="size-5 text-sky-400" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            {company.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink
            href={CLIENT_PORTAL_URL}
            variant="outline"
            size="sm"
            className="border-white/10 bg-transparent text-slate-200 hover:bg-white/5 hover:text-white"
          >
            Espace client
          </ButtonLink>
          <ButtonLink
            href="/#contact"
            size="sm"
            className="bg-sky-500 text-white hover:bg-sky-400"
          >
            Demander un audit gratuit
          </ButtonLink>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-slate-300 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/5 bg-[#0a0f1a] transition-all lg:hidden",
          mobileOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
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
          <div className="mt-3 flex flex-col gap-2 border-t border-white/5 pt-4">
            <ButtonLink
              href={CLIENT_PORTAL_URL}
              variant="outline"
              className="w-full border-white/10 bg-transparent text-slate-200"
            >
              Espace client
            </ButtonLink>
            <ButtonLink
              href="/#contact"
              className="w-full bg-sky-500 text-white hover:bg-sky-400"
              onClick={() => setMobileOpen(false)}
            >
              Demander un audit gratuit
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
