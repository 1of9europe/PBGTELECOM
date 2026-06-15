import { getSiteOptions } from "@/lib/actions/sites";
import { EquipmentForm } from "@/components/equipment/equipment-form";
import { PageHeader } from "@/components/shared/PageHeader";
import { requireAuth } from "@/lib/session";
import { isInternal } from "@/lib/permissions";
import { redirect } from "next/navigation";

export default async function NewEquipmentPage() {
  const user = await requireAuth();
  if (!isInternal(user.role)) redirect("/dashboard/equipment");
  const sites = await getSiteOptions();

  return (
    <div className="space-y-6">
      <PageHeader title="Nouvel équipement" />
      <EquipmentForm sites={sites} />
    </div>
  );
}
