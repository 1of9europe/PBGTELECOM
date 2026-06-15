"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import {
  Activity,
  Cable,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  Menu,
  Settings,
  UserCircle2,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ClientNavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

const navItems: ClientNavItem[] = [
  { href: "/client/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/client/requests", label: "Demandes", icon: LifeBuoy },
  { href: "/client/equipments", label: "Équipements", icon: Cable },
  { href: "/client/interventions", label: "Interventions", icon: Activity },
  { href: "/client/documents", label: "Documents", icon: FileText },
  { href: "/client/project-info", label: "Projet", icon: Settings },
  { href: "/client/profile", label: "Profil", icon: UserCircle2 },
];

function ClientNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-blue-500/20 text-blue-200"
                : "text-slate-300 hover:bg-slate-900 hover:text-white"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function ClientSidebar() {
  return (
    <>
      <aside className="hidden w-72 shrink-0 border-r border-slate-800 bg-black/90 p-4 md:block">
        <SidebarPanel />
      </aside>

      <div className="border-b border-slate-800 bg-black/90 p-3 md:hidden">
        <Sheet>
          <SheetTrigger
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "border-slate-700 bg-slate-900 text-slate-100"
            )}
          >
            <Menu className="h-4 w-4" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 border-slate-800 bg-black p-4">
            <SidebarPanel mobile />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

function SidebarPanel({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <div className={cn("mb-6", mobile && "mt-6")}>
        <p className="text-xs uppercase tracking-[0.2em] text-blue-300">PBG TELECOM</p>
        <h2 className="mt-1 text-lg font-semibold text-white">Espace Client</h2>
      </div>
      <ClientNavLinks />
    </div>
  );
}
