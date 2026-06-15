import { notFound } from "next/navigation";
import { getCustomer } from "@/lib/actions/customers";
import { CustomerForm } from "@/components/customers/customer-form";
import { PageHeader } from "@/components/shared/PageHeader";
import { requireRole } from "@/lib/session";
import { Role } from "@prisma/client";

export default async function EditCustomerPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);
  const { id } = await params;
  const customer = await getCustomer(id);
  if (!customer) notFound();

  return (
    <div className="space-y-6">
      <PageHeader title={`Modifier — ${customer.companyName}`} />
      <CustomerForm customer={customer} />
    </div>
  );
}
