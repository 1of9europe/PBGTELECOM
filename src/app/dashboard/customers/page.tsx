import { Plus, Users } from "lucide-react";
import { getCustomers } from "@/lib/actions/customers";
import { CustomersTable } from "@/components/customers/customers-table";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { ButtonLink } from "@/components/ui/button-link";
import { requireRole } from "@/lib/session";
import { Role } from "@prisma/client";

export default async function CustomersPage() {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);
  const customers = await getCustomers();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        description="Gestion du portefeuille clients PBG TELECOM"
        actions={
          <ButtonLink href="/dashboard/customers/new"><Plus className="mr-2 h-4 w-4" />Nouveau client</ButtonLink>
        }
      />
      {customers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Aucun client"
          description="Commencez par ajouter votre premier client."
          action={<ButtonLink href="/dashboard/customers/new">Ajouter un client</ButtonLink>}
        />
      ) : (
        <CustomersTable data={customers} />
      )}
    </div>
  );
}
