import { notFound } from "next/navigation";
import { getSubscription } from "@/lib/actions/subscriptions";
import { getCustomerOptions } from "@/lib/actions/customers";
import { SubscriptionForm } from "@/components/subscriptions/subscription-form";
import { PageHeader } from "@/components/shared/PageHeader";
import { requireRole } from "@/lib/session";
import { Role } from "@prisma/client";

export default async function EditSubscriptionPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);
  const { id } = await params;
  const subscription = await getSubscription(id);
  if (!subscription) notFound();
  const customers = await getCustomerOptions();

  return (
    <div className="space-y-6">
      <PageHeader title={`Modifier — ${subscription.planName}`} />
      <SubscriptionForm subscription={subscription} customers={customers} />
    </div>
  );
}
