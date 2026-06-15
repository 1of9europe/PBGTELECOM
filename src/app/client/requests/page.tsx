import { LifeBuoy } from "lucide-react";
import { ClientPageHeader } from "@/components/client/ClientPageHeader";
import { ClientStatusBadge } from "@/components/client/ClientStatusBadge";
import { ClientRequestForm } from "@/components/client/ClientRequestForm";
import { getClientRequests, getClientSites } from "@/lib/actions/client";
import { TICKET_PRIORITY_LABELS, TICKET_STATUS_LABELS } from "@/types";

function getRequestStatusVariant(status: string) {
  switch (status) {
    case "OPEN":
      return "info" as const;
    case "IN_PROGRESS":
      return "warning" as const;
    case "WAITING_CUSTOMER":
      return "neutral" as const;
    case "RESOLVED":
      return "success" as const;
    case "CLOSED":
      return "neutral" as const;
    default:
      return "neutral" as const;
  }
}

function getPriorityVariant(priority: string) {
  switch (priority) {
    case "URGENT":
      return "danger" as const;
    case "HIGH":
      return "warning" as const;
    case "MEDIUM":
      return "info" as const;
    default:
      return "neutral" as const;
  }
}

export default async function ClientRequestsPage() {
  const [tickets, sites] = await Promise.all([getClientRequests(), getClientSites()]);

  return (
    <div className="space-y-6">
      <ClientPageHeader
        title="Suivi des demandes"
        description="Consultez vos demandes et créez un nouveau ticket en quelques secondes."
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-3">
          {tickets.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-10 text-center">
              <LifeBuoy className="mx-auto h-8 w-8 text-slate-500" />
              <p className="mt-3 text-sm text-slate-300">Aucune demande pour le moment.</p>
            </div>
          ) : (
            tickets.map((ticket) => (
              <article key={ticket.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{ticket.title}</p>
                    <p className="mt-1 text-xs text-slate-400">{ticket.site.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClientStatusBadge
                      label={TICKET_STATUS_LABELS[ticket.status] ?? ticket.status}
                      variant={getRequestStatusVariant(ticket.status)}
                    />
                    <ClientStatusBadge
                      label={TICKET_PRIORITY_LABELS[ticket.priority] ?? ticket.priority}
                      variant={getPriorityVariant(ticket.priority)}
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-300">{ticket.description}</p>
                <p className="mt-3 text-xs text-slate-400">
                  Dernier suivi: {ticket.interventions[0] ? "Intervention liée" : "En attente de planification"}
                  {ticket.assignedTo?.name ? ` · Référent: ${ticket.assignedTo.name}` : ""}
                </p>
              </article>
            ))
          )}
        </section>
        <aside>
          <ClientRequestForm sites={sites.map((site) => ({ id: site.id, name: site.name }))} />
        </aside>
      </div>
    </div>
  );
}
