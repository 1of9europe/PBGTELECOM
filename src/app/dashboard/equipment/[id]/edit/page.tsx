import { notFound } from "next/navigation";
import { getEquipmentItem } from "@/lib/actions/equipment";
import { getSiteOptions } from "@/lib/actions/sites";
import { EquipmentForm } from "@/components/equipment/equipment-form";
import { PageHeader } from "@/components/shared/PageHeader";
import { requireAuth } from "@/lib/session";
import { isInternal } from "@/lib/permissions";
import { redirect } from "next/navigation";

export default async function EditEquipmentPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireAuth();
  if (!isInternal(user.role)) redirect("/dashboard/equipment");
  const { id } = await params;
  const equipment = await getEquipmentItem(id);
  if (!equipment) notFound();
  const sites = await getSiteOptions();

  return (
    <div className="space-y-6">
      <PageHeader title={`Modifier — ${equipment.brand} ${equipment.model}`} />
      <EquipmentForm equipment={equipment} sites={sites} />
    </div>
  );
}
