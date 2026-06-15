import { Camera, Plus } from "lucide-react";
import { getEquipment } from "@/lib/actions/equipment";
import { EquipmentTable } from "@/components/equipment/equipment-table";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { ButtonLink } from "@/components/ui/button-link";
import { requireAuth } from "@/lib/session";
import { isInternal } from "@/lib/permissions";

export default async function EquipmentPage() {
  const user = await requireAuth();
  const equipment = await getEquipment();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Équipements"
        description="Parc caméras, NVR, contrôle d'accès et réseau"
        actions={
          isInternal(user.role) ? (
            <ButtonLink href="/dashboard/equipment/new"><Plus className="mr-2 h-4 w-4" />Nouvel équipement</ButtonLink>
          ) : undefined
        }
      />
      {equipment.length === 0 ? (
        <EmptyState icon={Camera} title="Aucun équipement" description="Le parc équipements est vide." />
      ) : (
        <EquipmentTable data={equipment} />
      )}
    </div>
  );
}
