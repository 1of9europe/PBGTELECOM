"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createTicket, updateTicket } from "@/lib/actions/tickets";

type TicketFormProps = {
  ticket?: {
    id: string;
    customerId: string;
    siteId: string;
    equipmentId: string | null;
    title: string;
    description: string;
    priority: string;
    status: string;
    assignedToId: string | null;
  };
  customers: { id: string; companyName: string }[];
  sites: { id: string; name: string; customerId: string }[];
  technicians: { id: string; name: string | null; email: string }[];
  isCustomer?: boolean;
};

export function TicketForm({ ticket, customers, sites, technicians, isCustomer }: TicketFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = ticket ? await updateTicket(ticket.id, formData) : await createTicket(formData);
      if (result.success) {
        toast.success(ticket ? "Ticket mis à jour" : "Ticket créé");
        router.push("/dashboard/tickets");
        router.refresh();
      } else toast.error(result.error);
    });
  }

  const filteredSites = ticket
    ? sites.filter((s) => s.customerId === ticket.customerId)
    : sites;

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div className="grid gap-4">
        {!isCustomer && (
          <div className="space-y-2">
            <Label htmlFor="customerId">Client</Label>
            <NativeSelect id="customerId" name="customerId" defaultValue={ticket?.customerId ?? customers[0]?.id} required>
              {customers.map((c) => <option key={c.id} value={c.id}>{c.companyName}</option>)}
            </NativeSelect>
          </div>
        )}
        {isCustomer && ticket && (
          <input type="hidden" name="customerId" value={ticket.customerId} />
        )}
        {isCustomer && !ticket && customers[0] && (
          <input type="hidden" name="customerId" value={customers[0].id} />
        )}
        <div className="space-y-2">
          <Label htmlFor="siteId">Site</Label>
          <NativeSelect id="siteId" name="siteId" defaultValue={ticket?.siteId ?? filteredSites[0]?.id} required>
            {(isCustomer ? sites : filteredSites).map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Titre</Label>
          <Input id="title" name="title" defaultValue={ticket?.title} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={5} defaultValue={ticket?.description} required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="priority">Priorité</Label>
            <NativeSelect id="priority" name="priority" defaultValue={ticket?.priority ?? "MEDIUM"}>
              <option value="LOW">Basse</option>
              <option value="MEDIUM">Moyenne</option>
              <option value="HIGH">Haute</option>
              <option value="URGENT">Urgente</option>
            </NativeSelect>
          </div>
          {!isCustomer && (
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <NativeSelect id="status" name="status" defaultValue={ticket?.status ?? "OPEN"}>
                <option value="OPEN">Ouvert</option>
                <option value="IN_PROGRESS">En cours</option>
                <option value="WAITING_CUSTOMER">Attente client</option>
                <option value="RESOLVED">Résolu</option>
                <option value="CLOSED">Fermé</option>
              </NativeSelect>
            </div>
          )}
        </div>
        {!isCustomer && (
          <div className="space-y-2">
            <Label htmlFor="assignedToId">Assigné à</Label>
            <NativeSelect id="assignedToId" name="assignedToId" defaultValue={ticket?.assignedToId ?? ""}>
              <option value="">Non assigné</option>
              {technicians.map((t) => (
                <option key={t.id} value={t.id}>{t.name ?? t.email}</option>
              ))}
            </NativeSelect>
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>{pending ? "Enregistrement..." : ticket ? "Mettre à jour" : "Créer le ticket"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
      </div>
    </form>
  );
}
