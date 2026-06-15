import { CreditCard, Plus } from "lucide-react";
import { getSubscriptions } from "@/lib/actions/subscriptions";
import { SubscriptionsTable } from "@/components/subscriptions/subscriptions-table";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { ButtonLink } from "@/components/ui/button-link";
import { requireRole } from "@/lib/session";
import { Role } from "@prisma/client";

export default async function SubscriptionsPage() {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);
  const subscriptions = await getSubscriptions();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Abonnements"
        description="Plans récurrents et facturation Stripe"
        actions={
          <ButtonLink href="/dashboard/subscriptions/new"><Plus className="mr-2 h-4 w-4" />Nouvel abonnement</ButtonLink>
        }
      />
      {subscriptions.length === 0 ? (
        <EmptyState icon={CreditCard} title="Aucun abonnement" description="Aucun abonnement configuré." />
      ) : (
        <SubscriptionsTable data={subscriptions} />
      )}
    </div>
  );
}
