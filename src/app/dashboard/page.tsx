import Link from "next/link";
import { getDashboardStats } from "@/lib/actions/dashboard";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  StatusBadge,
  getTicketPriorityVariant,
  getTicketStatusVariant,
  getInterventionStatusVariant,
} from "@/components/shared/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  CalendarClock,
  Euro,
  FileText,
  Ticket,
} from "lucide-react";
import { requireAuth } from "@/lib/session";
import { isAdmin } from "@/lib/permissions";
import {
  TICKET_PRIORITY_LABELS,
  TICKET_STATUS_LABELS,
  INTERVENTION_STATUS_LABELS,
} from "@/types";
import { formatDateTime } from "@/lib/filters";
import { ButtonLink } from "@/components/ui/button-link";

export default async function DashboardPage() {
  const user = await requireAuth();
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Tableau de bord"
        description={`Bienvenue${user.name ? `, ${user.name}` : ""} — vue d'ensemble PBG TELECOM`}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {isAdmin(user.role) && (
          <DashboardCard
            title="Clients actifs"
            value={stats.activeCustomers}
            icon={Building2}
            description="Portefeuille commercial"
          />
        )}
        <DashboardCard
          title="Tickets ouverts"
          value={stats.openTickets}
          icon={Ticket}
          description="SAV en cours"
        />
        <DashboardCard
          title="Interventions prévues"
          value={stats.plannedInterventions}
          icon={CalendarClock}
          description="Planification terrain"
        />
        <DashboardCard
          title="Contrats actifs"
          value={stats.activeContracts}
          icon={FileText}
          description="Maintenance récurrente"
        />
        <DashboardCard
          title="MRR estimé"
          value={stats.estimatedMrrFormatted}
          icon={Euro}
          description="Contrats + abonnements"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Tickets récents</CardTitle>
            <ButtonLink href="/dashboard/tickets" variant="ghost" size="sm">
              Voir tout
            </ButtonLink>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.recentTickets.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucun ticket récent.</p>
            ) : (
              stats.recentTickets.map((ticket) => (
                <Link
                  key={ticket.id}
                  href={`/dashboard/tickets/${ticket.id}`}
                  className="flex items-start justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium">{ticket.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {ticket.customer.companyName} — {ticket.site.name}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusBadge
                      label={TICKET_STATUS_LABELS[ticket.status] ?? ticket.status}
                      variant={getTicketStatusVariant(ticket.status)}
                    />
                    <StatusBadge
                      label={TICKET_PRIORITY_LABELS[ticket.priority] ?? ticket.priority}
                      variant={getTicketPriorityVariant(ticket.priority)}
                    />
                  </div>
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Interventions du mois</CardTitle>
            <ButtonLink href="/dashboard/interventions" variant="ghost" size="sm">
              Voir tout
            </ButtonLink>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.upcomingInterventions.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucune intervention planifiée.</p>
            ) : (
              stats.upcomingInterventions.map((intervention) => (
                <Link
                  key={intervention.id}
                  href={`/dashboard/interventions/${intervention.id}/edit`}
                  className="flex items-start justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium">{intervention.site.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(intervention.scheduledAt)} — {intervention.technician.name}
                    </p>
                  </div>
                  <StatusBadge
                    label={INTERVENTION_STATUS_LABELS[intervention.status] ?? intervention.status}
                    variant={getInterventionStatusVariant(intervention.status)}
                  />
                </Link>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
