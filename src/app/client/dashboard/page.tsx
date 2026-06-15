import {
  Activity,
  Cable,
  CalendarClock,
  FileText,
  LifeBuoy,
  Lock,
  MessageSquare,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { ClientDashboardCard } from "@/components/client/ClientDashboardCard";
import { ClientFeatureCard } from "@/components/client/ClientFeatureCard";
import { ClientPageHeader } from "@/components/client/ClientPageHeader";
import { ClientStatusBadge } from "@/components/client/ClientStatusBadge";
import { getClientDashboardData } from "@/lib/actions/client";

const valueBlocks = [
  { title: "Accès sécurisé client", description: "Connexion dédiée et protection renforcée de vos données.", icon: Lock },
  { title: "Suivi des demandes", description: "Vision claire des tickets ouverts, en cours et résolus.", icon: LifeBuoy },
  { title: "Historique des interventions", description: "Consultez les interventions planifiées et passées.", icon: Activity },
  { title: "Centralisation des équipements", description: "Retrouvez vos équipements et leur statut en un coup d'oeil.", icon: Cable },
  { title: "Communication simplifiée", description: "Suivez les échanges et gardez un fil clair avec nos équipes.", icon: MessageSquare },
  { title: "Documents et informations projet", description: "Accédez à vos documents clés et aux consignes projet.", icon: FileText },
];

export default async function ClientDashboardPage() {
  const data = await getClientDashboardData();

  return (
    <div className="space-y-8">
      <ClientPageHeader
        title="Tableau de bord client"
        description="Un espace clair pour piloter votre activité avec PBG TELECOM."
        actions={
          <>
            <ButtonLink href="/client/requests?new=1" className="bg-blue-600 text-white hover:bg-blue-500">
              <Plus className="mr-2 h-4 w-4" />
              Créer une demande
            </ButtonLink>
            <ButtonLink
              href="/client/equipments"
              variant="outline"
              className="border-slate-700 bg-transparent text-slate-100 hover:bg-slate-900"
            >
              Voir mes équipements
            </ButtonLink>
          </>
        }
      />

      <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950 to-blue-950/40 p-6 md:p-8">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            Portail client sécurisé
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Un espace client pensé pour simplifier le suivi de vos installations
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
            Centralisez vos demandes, vos équipements, vos interventions et vos documents dans un espace sécurisé relié aux services PBG TELECOM.
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ClientDashboardCard
          title="Demandes ouvertes"
          value={data.metrics.openRequests}
          description="Tickets nécessitant une action"
          icon={LifeBuoy}
        />
        <ClientDashboardCard
          title="Interventions prévues"
          value={data.metrics.plannedInterventions}
          description="Interventions programmées"
          icon={CalendarClock}
        />
        <ClientDashboardCard
          title="Équipements suivis"
          value={data.metrics.equipmentsCount}
          description="Parc actuellement supervisé"
          icon={Cable}
        />
        <ClientDashboardCard
          title="Documents disponibles"
          value={data.metrics.documentsCount}
          description="Contrats, factures, rapports"
          icon={FileText}
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {valueBlocks.map((block) => (
          <ClientFeatureCard key={block.title} title={block.title} description={block.description} icon={block.icon} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <h3 className="text-lg font-semibold text-white">Dernières activités</h3>
          <div className="mt-4 space-y-3">
            {data.recentActivities.length === 0 ? (
              <p className="text-sm text-slate-400">Aucune activité récente.</p>
            ) : (
              data.recentActivities.map((activity) => (
                <div key={activity.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium text-white">{activity.title}</p>
                    <ClientStatusBadge label={activity.status} variant="info" />
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    {activity.siteName} · Mise à jour {activity.updatedAt}
                  </p>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <h3 className="text-lg font-semibold text-white">Prochaine intervention</h3>
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            {data.nextIntervention ? (
              <>
                <p className="text-sm font-medium text-white">{data.nextIntervention.ticketTitle}</p>
                <p className="mt-1 text-sm text-slate-300">{data.nextIntervention.siteName}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {data.nextIntervention.scheduledAt} · {data.nextIntervention.technician}
                </p>
                <ClientStatusBadge className="mt-3" label={data.nextIntervention.status} variant="warning" />
              </>
            ) : (
              <p className="text-sm text-slate-400">Aucune intervention planifiée pour le moment.</p>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
