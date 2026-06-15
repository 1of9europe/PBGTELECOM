import { Cable } from "lucide-react";
import { ClientPageHeader } from "@/components/client/ClientPageHeader";
import { ClientStatusBadge } from "@/components/client/ClientStatusBadge";
import { getClientEquipments } from "@/lib/actions/client";
import { EQUIPMENT_TYPE_LABELS } from "@/types";

function getEquipmentLabel(status: string) {
  switch (status) {
    case "ONLINE":
      return { label: "Fonctionnel", variant: "success" as const };
    case "OFFLINE":
      return { label: "Hors ligne", variant: "danger" as const };
    case "MAINTENANCE":
      return { label: "Maintenance", variant: "warning" as const };
    default:
      return { label: "Statut inconnu", variant: "neutral" as const };
  }
}

export default async function ClientEquipmentsPage() {
  const equipments = await getClientEquipments();

  return (
    <div className="space-y-6">
      <ClientPageHeader
        title="Centralisation des équipements"
        description="Visualisez uniquement vos équipements et leur état de fonctionnement."
      />

      {equipments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-10 text-center">
          <Cable className="mx-auto h-8 w-8 text-slate-500" />
          <p className="mt-3 text-sm text-slate-300">Aucun équipement enregistré pour ce compte.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {equipments.map((equipment) => {
            const status = getEquipmentLabel(equipment.status);
            return (
              <article key={equipment.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{EQUIPMENT_TYPE_LABELS[equipment.type] ?? equipment.type}</p>
                    <p className="text-sm text-slate-300">
                      {equipment.brand} {equipment.model}
                    </p>
                  </div>
                  <ClientStatusBadge label={status.label} variant={status.variant} />
                </div>
                <dl className="mt-4 grid gap-2 text-sm text-slate-300">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Site</dt>
                    <dd className="text-right">{equipment.site.name}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Type</dt>
                    <dd className="text-right">{EQUIPMENT_TYPE_LABELS[equipment.type] ?? equipment.type}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Marque / Modèle</dt>
                    <dd className="text-right">
                      {equipment.brand} / {equipment.model}
                    </dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
