import { notFound } from "next/navigation";
import { getTicket } from "@/lib/actions/tickets";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge, getTicketPriorityVariant, getTicketStatusVariant } from "@/components/shared/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button-link";
import { TICKET_PRIORITY_LABELS, TICKET_STATUS_LABELS } from "@/types";
import { formatDate } from "@/lib/filters";
import { requireAuth } from "@/lib/session";

export default async function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth();
  const { id } = await params;
  const ticket = await getTicket(id);
  if (!ticket) notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        title={ticket.title}
        description={`${ticket.customer.companyName} — ${ticket.site.name}`}
        actions={
          <ButtonLink href={`/dashboard/tickets/${id}/edit`} variant="outline">Modifier</ButtonLink>
        }
      />
      <div className="flex gap-2">
        <StatusBadge label={TICKET_STATUS_LABELS[ticket.status] ?? ticket.status} variant={getTicketStatusVariant(ticket.status)} />
        <StatusBadge label={TICKET_PRIORITY_LABELS[ticket.priority] ?? ticket.priority} variant={getTicketPriorityVariant(ticket.priority)} />
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Description</CardTitle></CardHeader>
        <CardContent className="whitespace-pre-wrap text-sm">{ticket.description}</CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Informations</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><span className="text-muted-foreground">Créé le :</span> {formatDate(ticket.createdAt)}</p>
          <p><span className="text-muted-foreground">Créé par :</span> {ticket.createdBy.name ?? ticket.createdBy.email}</p>
          <p><span className="text-muted-foreground">Assigné à :</span> {ticket.assignedTo?.name ?? ticket.assignedTo?.email ?? "Non assigné"}</p>
          {ticket.equipment && <p><span className="text-muted-foreground">Équipement :</span> {ticket.equipment.brand} {ticket.equipment.model}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
