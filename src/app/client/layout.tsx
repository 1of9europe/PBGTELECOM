import { ClientSidebar } from "@/components/client/ClientSidebar";
import { ClientHeader } from "@/components/client/ClientHeader";
import { getClientContext } from "@/lib/actions/client";
import type { Metadata } from "next";
import { privateAreaRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Espace client",
  robots: privateAreaRobots,
};

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { customer, user } = await getClientContext();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex min-h-screen flex-col md:flex-row">
        <ClientSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <ClientHeader customerName={customer.companyName} userName={user.name} />
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
