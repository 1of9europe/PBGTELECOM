import { notFound } from "next/navigation";
import { getSite } from "@/lib/actions/sites";
import { getCustomerOptions } from "@/lib/actions/customers";
import { SiteForm } from "@/components/sites/site-form";
import { PageHeader } from "@/components/shared/PageHeader";
import { requireRole } from "@/lib/session";
import { Role } from "@prisma/client";

export default async function EditSitePage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);
  const { id } = await params;
  const site = await getSite(id);
  if (!site) notFound();
  const customers = await getCustomerOptions();

  return (
    <div className="space-y-6">
      <PageHeader title={`Modifier — ${site.name}`} />
      <SiteForm site={site} customers={customers} />
    </div>
  );
}
