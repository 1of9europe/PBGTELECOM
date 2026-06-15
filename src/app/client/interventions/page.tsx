import { Activity } from "lucide-react";
import { ClientPageHeader } from "@/components/client/ClientPageHeader";
import { ClientStatusBadge } from "@/components/client/ClientStatusBadge";
import { getClientInterventions } from "@/lib/actions/client";
import { formatDateTime } from "@/lib/filters";
import { INTERVENTION_STATUS_LABELS } from "@/types";

function getInterventionVariant(status: string) {
  switch (status) {
    case "PLANNED":
      return "info" as const;
    case "IN_PROGRESS":
      return "warning" as const;
    case "COMPLETED":
      return "success" as const;
    default:
      return "neutral" as const;
  }
}

export default async function ClientInterventionsPage() {
  const interventions = await getClientInterventions();

  return (
    <div className="space-y-6">
      <ClientPageHeader
        title="Historique des interventions"
        description="Retrouvez les interventions planifiées et passées, avec rapport et technicien associé."
      />

      {interventions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-10 text-center">
          <Activity className="mx-auto h-8 w-8 text-slate-500" />
          <p className="mt-3 text-sm text-slate-300">Aucune intervention disponible.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {interventions.map((intervention) => (
            <article key={intervention.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-white">
                    {intervention.ticket?.title ?? "Intervention de maintenance"}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {intervention.site.name} · {formatDateTime(intervention.scheduledAt)}
                  </p>
                </div>
                <ClientStatusBadge
                  label={INTERVENTION_STATUS_LABELS[intervention.status] ?? intervention.status}
                  variant={getInterventionVariant(intervention.status)}
                />
              </div>
              <div className="mt-3 grid gap-2 text-sm text-slate-300 md:grid-cols-2">
                <p>
                  <span className="text-slate-500">Technicien :</span>{" "}
                  {intervention.technician.name ?? "Assignation en cours"}
                </p>
                <p>
                  <span className="text-slate-500">Rapport :</span>{" "}
                  {intervention.report ? "Disponible" : "Sera ajouté après intervention"}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
