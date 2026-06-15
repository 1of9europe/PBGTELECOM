import { Plus, Ticket } from "lucide-react";
import { getTickets } from "@/lib/actions/tickets";
import { TicketsTable } from "@/components/tickets/tickets-table";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { ButtonLink } from "@/components/ui/button-link";
import { requireAuth } from "@/lib/session";

export default async function TicketsPage() {
  await requireAuth();
  const tickets = await getTickets();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tickets SAV"
        description="Demandes de support et incidents"
        actions={
          <ButtonLink href="/dashboard/tickets/new"><Plus className="mr-2 h-4 w-4" />Nouveau ticket</ButtonLink>
        }
      />
      {tickets.length === 0 ? (
        <EmptyState icon={Ticket} title="Aucun ticket" description="Aucune demande SAV enregistrée." />
      ) : (
        <TicketsTable data={tickets} />
      )}
    </div>
  );
}
