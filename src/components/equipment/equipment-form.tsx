"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createEquipment, updateEquipment } from "@/lib/actions/equipment";

type EquipmentFormProps = {
  equipment?: {
    id: string;
    siteId: string;
    type: string;
    brand: string;
    model: string;
    serialNumber: string;
    ipAddress: string | null;
    installDate: Date | null;
    warrantyEndDate: Date | null;
    status: string;
    notes: string;
  };
  sites: { id: string; name: string }[];
};

export function EquipmentForm({ equipment, sites }: EquipmentFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = equipment
        ? await updateEquipment(equipment.id, formData)
        : await createEquipment(formData);
      if (result.success) {
        toast.success(equipment ? "Équipement mis à jour" : "Équipement créé");
        router.push("/dashboard/equipment");
        router.refresh();
      } else toast.error(result.error);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="siteId">Site</Label>
          <NativeSelect id="siteId" name="siteId" defaultValue={equipment?.siteId ?? sites[0]?.id} required>
            {sites.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <NativeSelect id="type" name="type" defaultValue={equipment?.type ?? "CAMERA"}>
            <option value="CAMERA">Caméra</option>
            <option value="NVR">NVR</option>
            <option value="DVR">DVR</option>
            <option value="ACCESS_CONTROL">Contrôle d&apos;accès</option>
            <option value="ROUTER">Routeur</option>
            <option value="SWITCH">Switch</option>
            <option value="OTHER">Autre</option>
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <NativeSelect id="status" name="status" defaultValue={equipment?.status ?? "UNKNOWN"}>
            <option value="ONLINE">En ligne</option>
            <option value="OFFLINE">Hors ligne</option>
            <option value="UNKNOWN">Inconnu</option>
            <option value="MAINTENANCE">Maintenance</option>
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand">Marque</Label>
          <Input id="brand" name="brand" defaultValue={equipment?.brand} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="model">Modèle</Label>
          <Input id="model" name="model" defaultValue={equipment?.model} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="serialNumber">N° de série</Label>
          <Input id="serialNumber" name="serialNumber" defaultValue={equipment?.serialNumber} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ipAddress">Adresse IP</Label>
          <Input id="ipAddress" name="ipAddress" defaultValue={equipment?.ipAddress ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="installDate">Date d&apos;installation</Label>
          <Input id="installDate" name="installDate" type="date" defaultValue={equipment?.installDate ? new Date(equipment.installDate).toISOString().split("T")[0] : ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="warrantyEndDate">Fin de garantie</Label>
          <Input id="warrantyEndDate" name="warrantyEndDate" type="date" defaultValue={equipment?.warrantyEndDate ? new Date(equipment.warrantyEndDate).toISOString().split("T")[0] : ""} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" defaultValue={equipment?.notes} />
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>{pending ? "Enregistrement..." : equipment ? "Mettre à jour" : "Créer l'équipement"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
      </div>
    </form>
  );
}
