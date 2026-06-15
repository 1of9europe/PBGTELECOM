import { getCustomerOptions } from "@/lib/actions/customers";
import { SiteForm } from "@/components/sites/site-form";
import { PageHeader } from "@/components/shared/PageHeader";
import { requireRole } from "@/lib/session";
import { Role } from "@prisma/client";

export default async function NewSitePage() {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);
  const customers = await getCustomerOptions();

  return (
    <div className="space-y-6">
      <PageHeader title="Nouveau site" description="Ajouter un site client" />
      <SiteForm customers={customers} />
    </div>
  );
}
