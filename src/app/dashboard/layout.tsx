import { requireAuth } from "@/lib/session";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { privateAreaRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Administration",
  robots: privateAreaRobots,
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();
  if (user.role === Role.CUSTOMER) {
    redirect("/client/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AppSidebar user={user} />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
