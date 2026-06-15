import { Plus, Wrench } from "lucide-react";
import { getInterventions } from "@/lib/actions/interventions";
import { InterventionsTable } from "@/components/interventions/interventions-table";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { ButtonLink } from "@/components/ui/button-link";
import { requireAuth } from "@/lib/session";
import { isInternal } from "@/lib/permissions";

export default async function InterventionsPage() {
  const user = await requireAuth();
  const interventions = await getInterventions();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Interventions"
        description="Planification et suivi terrain"
        actions={
          isInternal(user.role) ? (
            <ButtonLink href="/dashboard/interventions/new"><Plus className="mr-2 h-4 w-4" />Planifier</ButtonLink>
          ) : undefined
        }
      />
      {interventions.length === 0 ? (
        <EmptyState icon={Wrench} title="Aucune intervention" description="Aucune intervention planifiée." />
      ) : (
        <InterventionsTable data={interventions} />
      )}
    </div>
  );
}
