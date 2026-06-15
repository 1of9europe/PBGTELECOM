"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createSite, updateSite } from "@/lib/actions/sites";

type SiteFormProps = {
  site?: {
    id: string;
    customerId: string;
    name: string;
    address: string;
    accessInstructions: string;
    notes: string;
  };
  customers: { id: string; companyName: string }[];
};

export function SiteForm({ site, customers }: SiteFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = site ? await updateSite(site.id, formData) : await createSite(formData);
      if (result.success) {
        toast.success(site ? "Site mis à jour" : "Site créé");
        router.push("/dashboard/sites");
        router.refresh();
      } else toast.error(result.error);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="customerId">Client</Label>
          <NativeSelect id="customerId" name="customerId" defaultValue={site?.customerId ?? customers[0]?.id} required>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.companyName}</option>
            ))}
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Nom du site</Label>
          <Input id="name" name="name" defaultValue={site?.name} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Adresse</Label>
          <Textarea id="address" name="address" defaultValue={site?.address} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accessInstructions">Instructions d&apos;accès</Label>
          <Textarea id="accessInstructions" name="accessInstructions" defaultValue={site?.accessInstructions} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" defaultValue={site?.notes} />
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>{pending ? "Enregistrement..." : site ? "Mettre à jour" : "Créer le site"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
      </div>
    </form>
  );
}
