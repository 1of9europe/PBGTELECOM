"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createContract, updateContract } from "@/lib/actions/contracts";

type ContractFormProps = {
  contract?: {
    id: string;
    customerId: string;
    name: string;
    monthlyPrice: { toString(): string };
    startDate: Date;
    endDate: Date | null;
    status: string;
    includedVisitsPerYear: number;
    responseTimeHours: number;
    notes: string;
  };
  customers: { id: string; companyName: string }[];
};

export function ContractForm({ contract, customers }: ContractFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = contract
        ? await updateContract(contract.id, formData)
        : await createContract(formData);
      if (result.success) {
        toast.success(contract ? "Contrat mis à jour" : "Contrat créé");
        router.push("/dashboard/contracts");
        router.refresh();
      } else toast.error(result.error);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="customerId">Client</Label>
          <NativeSelect id="customerId" name="customerId" defaultValue={contract?.customerId ?? customers[0]?.id} required>
            {customers.map((c) => <option key={c.id} value={c.id}>{c.companyName}</option>)}
          </NativeSelect>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">Nom du contrat</Label>
          <Input id="name" name="name" defaultValue={contract?.name} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="monthlyPrice">Prix mensuel (€)</Label>
          <Input id="monthlyPrice" name="monthlyPrice" type="number" step="0.01" defaultValue={contract ? Number(contract.monthlyPrice) : ""} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <NativeSelect id="status" name="status" defaultValue={contract?.status ?? "ACTIVE"}>
            <option value="ACTIVE">Actif</option>
            <option value="EXPIRED">Expiré</option>
            <option value="CANCELLED">Annulé</option>
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate">Date de début</Label>
          <Input id="startDate" name="startDate" type="date" defaultValue={contract?.startDate ? new Date(contract.startDate).toISOString().split("T")[0] : ""} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">Date de fin</Label>
          <Input id="endDate" name="endDate" type="date" defaultValue={contract?.endDate ? new Date(contract.endDate).toISOString().split("T")[0] : ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="includedVisitsPerYear">Visites / an</Label>
          <Input id="includedVisitsPerYear" name="includedVisitsPerYear" type="number" defaultValue={contract?.includedVisitsPerYear ?? 2} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="responseTimeHours">Délai réponse (h)</Label>
          <Input id="responseTimeHours" name="responseTimeHours" type="number" defaultValue={contract?.responseTimeHours ?? 24} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" defaultValue={contract?.notes} />
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>{pending ? "Enregistrement..." : contract ? "Mettre à jour" : "Créer le contrat"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
      </div>
    </form>
  );
}
