import { notFound, redirect } from "next/navigation";
import { getIntervention } from "@/lib/actions/interventions";
import { getSiteOptions } from "@/lib/actions/sites";
import { getTechnicianOptions } from "@/lib/actions/tickets";
import { InterventionForm } from "@/components/interventions/intervention-form";
import { PageHeader } from "@/components/shared/PageHeader";
import { requireAuth } from "@/lib/session";
import { isInternal } from "@/lib/permissions";

export default async function EditInterventionPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireAuth();
  if (!isInternal(user.role)) redirect("/dashboard/interventions");
  const { id } = await params;
  const intervention = await getIntervention(id);
  if (!intervention) notFound();
  const sites = await getSiteOptions();
  const technicians = await getTechnicianOptions();

  return (
    <div className="space-y-6">
      <PageHeader title="Modifier l'intervention" />
      <InterventionForm intervention={intervention} sites={sites} technicians={technicians} />
    </div>
  );
}
