import { getCustomerOptions } from "@/lib/actions/customers";
import { ContractForm } from "@/components/contracts/contract-form";
import { PageHeader } from "@/components/shared/PageHeader";
import { requireRole } from "@/lib/session";
import { Role } from "@prisma/client";

export default async function NewContractPage() {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);
  const customers = await getCustomerOptions();

  return (
    <div className="space-y-6">
      <PageHeader title="Nouveau contrat" />
      <ContractForm customers={customers} />
    </div>
  );
}
