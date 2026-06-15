import { notFound } from "next/navigation";
import { getContract } from "@/lib/actions/contracts";
import { getCustomerOptions } from "@/lib/actions/customers";
import { ContractForm } from "@/components/contracts/contract-form";
import { PageHeader } from "@/components/shared/PageHeader";
import { requireRole } from "@/lib/session";
import { Role } from "@/generated/prisma/enums";

export default async function EditContractPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);
  const { id } = await params;
  const contract = await getContract(id);
  if (!contract) notFound();
  const customers = await getCustomerOptions();

  return (
    <div className="space-y-6">
      <PageHeader title={`Modifier — ${contract.name}`} />
      <ContractForm contract={contract} customers={customers} />
    </div>
  );
}
