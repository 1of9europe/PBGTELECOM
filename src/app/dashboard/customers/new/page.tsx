import { CustomerForm } from "@/components/customers/customer-form";
import { PageHeader } from "@/components/shared/PageHeader";
import { requireRole } from "@/lib/session";
import { Role } from "@prisma/client";

export default async function NewCustomerPage() {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);

  return (
    <div className="space-y-6">
      <PageHeader title="Nouveau client" description="Ajouter un client au portefeuille PBG TELECOM" />
      <CustomerForm />
    </div>
  );
}
