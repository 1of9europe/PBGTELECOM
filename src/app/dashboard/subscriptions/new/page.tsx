import { getCustomerOptions } from "@/lib/actions/customers";
import { SubscriptionForm } from "@/components/subscriptions/subscription-form";
import { PageHeader } from "@/components/shared/PageHeader";
import { requireRole } from "@/lib/session";
import { Role } from "@prisma/client";

export default async function NewSubscriptionPage() {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);
  const customers = await getCustomerOptions();

  return (
    <div className="space-y-6">
      <PageHeader title="Nouvel abonnement" />
      <SubscriptionForm customers={customers} />
    </div>
  );
}
