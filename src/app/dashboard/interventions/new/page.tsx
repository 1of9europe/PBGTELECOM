import { getSiteOptions } from "@/lib/actions/sites";
import { getTechnicianOptions } from "@/lib/actions/tickets";
import { InterventionForm } from "@/components/interventions/intervention-form";
import { PageHeader } from "@/components/shared/PageHeader";
import { requireAuth } from "@/lib/session";
import { isInternal } from "@/lib/permissions";
import { Role } from "@/generated/prisma/enums";
import { redirect } from "next/navigation";

export default async function NewInterventionPage() {
  const user = await requireAuth();
  if (!isInternal(user.role)) redirect("/dashboard/interventions");
  const sites = await getSiteOptions();
  const technicians = await getTechnicianOptions();

  return (
    <div className="space-y-6">
      <PageHeader title="Planifier une intervention" />
      <InterventionForm
        sites={sites}
        technicians={technicians}
        defaultTechnicianId={user.role === Role.TECHNICIAN ? user.id : undefined}
      />
    </div>
  );
}
