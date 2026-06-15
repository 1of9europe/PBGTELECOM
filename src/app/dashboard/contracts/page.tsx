import { FileText, Plus } from "lucide-react";
import { getContracts } from "@/lib/actions/contracts";
import { ContractsTable } from "@/components/contracts/contracts-table";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { ButtonLink } from "@/components/ui/button-link";
import { requireAuth } from "@/lib/session";
import { isAdmin } from "@/lib/permissions";

export default async function ContractsPage() {
  const user = await requireAuth();
  const contracts = await getContracts();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contrats de maintenance"
        description="Contrats récurrents et SLA"
        actions={
          isAdmin(user.role) ? (
            <ButtonLink href="/dashboard/contracts/new"><Plus className="mr-2 h-4 w-4" />Nouveau contrat</ButtonLink>
          ) : undefined
        }
      />
      {contracts.length === 0 ? (
        <EmptyState icon={FileText} title="Aucun contrat" description="Aucun contrat de maintenance actif." />
      ) : (
        <ContractsTable data={contracts} />
      )}
    </div>
  );
}
