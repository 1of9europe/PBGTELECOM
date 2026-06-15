"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createIntervention, updateIntervention } from "@/lib/actions/interventions";

type InterventionFormProps = {
  intervention?: {
    id: string;
    ticketId: string | null;
    siteId: string;
    technicianId: string;
    scheduledAt: Date;
    startedAt: Date | null;
    completedAt: Date | null;
    status: string;
    report: string;
    customerSignature: string | null;
  };
  sites: { id: string; name: string }[];
  technicians: { id: string; name: string | null; email: string }[];
  defaultTechnicianId?: string;
};

export function InterventionForm({
  intervention,
  sites,
  technicians,
  defaultTechnicianId,
}: InterventionFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = intervention
        ? await updateIntervention(intervention.id, formData)
        : await createIntervention(formData);
      if (result.success) {
        toast.success(intervention ? "Intervention mise à jour" : "Intervention créée");
        router.push("/dashboard/interventions");
        router.refresh();
      } else toast.error(result.error);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="siteId">Site</Label>
          <NativeSelect id="siteId" name="siteId" defaultValue={intervention?.siteId ?? sites[0]?.id} required>
            {sites.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </NativeSelect>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="technicianId">Technicien</Label>
          <NativeSelect
            id="technicianId"
            name="technicianId"
            defaultValue={intervention?.technicianId ?? defaultTechnicianId ?? technicians[0]?.id}
            required
          >
            {technicians.map((t) => (
              <option key={t.id} value={t.id}>{t.name ?? t.email}</option>
            ))}
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <Label htmlFor="scheduledAt">Date planifiée</Label>
          <Input
            id="scheduledAt"
            name="scheduledAt"
            type="datetime-local"
            defaultValue={
              intervention?.scheduledAt
                ? new Date(intervention.scheduledAt).toISOString().slice(0, 16)
                : ""
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <NativeSelect id="status" name="status" defaultValue={intervention?.status ?? "PLANNED"}>
            <option value="PLANNED">Planifiée</option>
            <option value="IN_PROGRESS">En cours</option>
            <option value="COMPLETED">Terminée</option>
            <option value="CANCELLED">Annulée</option>
          </NativeSelect>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="report">Rapport d&apos;intervention</Label>
          <Textarea id="report" name="report" rows={5} defaultValue={intervention?.report} />
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Enregistrement..." : intervention ? "Mettre à jour" : "Planifier l'intervention"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
      </div>
    </form>
  );
}
