"use client";

import { Plus, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";

type ClientHeaderProps = {
  customerName: string;
  userName?: string | null;
};

export function ClientHeader({ customerName, userName }: ClientHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-black/80 px-4 py-3 backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Compte client</p>
          <p className="text-sm font-medium text-white">
            {customerName}
            {userName ? <span className="text-slate-400"> · {userName}</span> : null}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ButtonLink href="/client/requests?new=1" className="bg-blue-600 text-white hover:bg-blue-500">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle demande
          </ButtonLink>
          <ButtonLink
            href="/client/profile"
            variant="outline"
            className="border-slate-700 bg-transparent text-slate-100 hover:bg-slate-900"
          >
            <User className="mr-2 h-4 w-4" />
            Profil
          </ButtonLink>
          <Button
            variant="ghost"
            className="text-slate-300 hover:bg-slate-900 hover:text-white"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Déconnexion
          </Button>
        </div>
      </div>
    </header>
  );
}
