"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createClientRequest } from "@/lib/actions/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";

type SiteOption = { id: string; name: string };

type ClientRequestFormProps = {
  sites: SiteOption[];
};

export function ClientRequestForm({ sites }: ClientRequestFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    startTransition(async () => {
      const result = await createClientRequest(formData);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Demande créée avec succès");
      router.refresh();
      form.reset();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <h3 className="text-base font-semibold text-white">Créer une nouvelle demande</h3>
      <div className="space-y-2">
        <Label htmlFor="siteId" className="text-slate-300">
          Site concerné
        </Label>
        <NativeSelect id="siteId" name="siteId" defaultValue={sites[0]?.id ?? ""} required>
          {sites.map((site) => (
            <option key={site.id} value={site.id}>
              {site.name}
            </option>
          ))}
        </NativeSelect>
      </div>
      <div className="space-y-2">
        <Label htmlFor="title" className="text-slate-300">
          Titre
        </Label>
        <Input id="title" name="title" placeholder="Ex: Caméra extérieure hors ligne" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="text-slate-300">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          placeholder="Décrivez brièvement le besoin ou l'incident."
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="priority" className="text-slate-300">
          Priorité
        </Label>
        <NativeSelect id="priority" name="priority" defaultValue="MEDIUM">
          <option value="LOW">Basse</option>
          <option value="MEDIUM">Moyenne</option>
          <option value="HIGH">Haute</option>
          <option value="URGENT">Urgente</option>
        </NativeSelect>
      </div>
      <Button type="submit" disabled={pending} className="bg-blue-600 text-white hover:bg-blue-500">
        {pending ? "Création..." : "Créer la demande"}
      </Button>
    </form>
  );
}
