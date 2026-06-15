"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Camera,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Ticket,
  Wrench,
} from "lucide-react";
import { ThemeBrandLogo } from "@/components/shared/ThemeBrandLogo";
import { cn } from "@/lib/utils";
import { buttonVariants, Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Role } from "@prisma/client";
import { ROLE_LABELS } from "@/types";
import { signOut } from "next-auth/react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: Role[];
};

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  {
    href: "/dashboard/customers",
    label: "Clients",
    icon: Building2,
    roles: [Role.SUPER_ADMIN, Role.ADMIN],
  },
  { href: "/dashboard/sites", label: "Sites", icon: MapPin },
  { href: "/dashboard/equipment", label: "Équipements", icon: Camera },
  { href: "/dashboard/tickets", label: "Tickets SAV", icon: Ticket },
  { href: "/dashboard/interventions", label: "Interventions", icon: Wrench },
  { href: "/dashboard/contracts", label: "Contrats", icon: FileText },
  {
    href: "/dashboard/subscriptions",
    label: "Abonnements",
    icon: CreditCard,
    roles: [Role.SUPER_ADMIN, Role.ADMIN],
  },
];

type AppSidebarProps = {
  user: {
    name?: string | null;
    email?: string | null;
    role: Role;
  };
};

function NavLinks({ user, onNavigate }: AppSidebarProps & { onNavigate?: () => void }) {
  const pathname = usePathname();

  const filtered = navItems.filter(
    (item) => !item.roles || item.roles.includes(user.role)
  );

  return (
    <nav className="flex flex-1 flex-col gap-1">
      {filtered.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
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

export function AppSidebar({ user }: AppSidebarProps) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-sidebar md:flex">
        <SidebarContent user={user} />
      </aside>

      <div className="flex items-center border-b px-4 py-3 md:hidden">
        <Sheet>
          <SheetTrigger
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" })
            )}
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent user={user} mobile />
          </SheetContent>
        </Sheet>
        <div className="ml-3 flex min-w-0 flex-1">
          <ThemeBrandLogo size="sm" />
        </div>
      </div>
    </>
  );
}

function SidebarContent({ user, mobile }: AppSidebarProps & { mobile?: boolean }) {
  return (
    <div className="flex h-full flex-col p-4">
      {!mobile && (
        <div className="mb-6 px-2">
          <ThemeBrandLogo size="md" />
          <p className="mt-2 text-xs text-muted-foreground">Gestion SAV & Maintenance</p>
        </div>
      )}

      <NavLinks user={user} />

      <div className="mt-auto space-y-3">
        <Separator />
        <div className="rounded-lg bg-muted/50 px-3 py-2">
          <p className="truncate text-sm font-medium">{user.name ?? user.email}</p>
          <p className="text-xs text-muted-foreground">{ROLE_LABELS[user.role]}</p>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}
