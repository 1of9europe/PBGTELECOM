"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createCustomer, updateCustomer } from "@/lib/actions/customers";
import type { Customer } from "@prisma/client";

type CustomerFormProps = {
  customer?: Customer;
};

export function CustomerForm({ customer }: CustomerFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = customer
        ? await updateCustomer(customer.id, formData)
        : await createCustomer(formData);

      if (result.success) {
        toast.success(customer ? "Client mis à jour" : "Client créé");
        router.push("/dashboard/customers");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="companyName">Nom de l&apos;entreprise</Label>
          <Input id="companyName" name="companyName" defaultValue={customer?.companyName} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactName">Contact</Label>
          <Input id="contactName" name="contactName" defaultValue={customer?.contactName} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" name="phone" defaultValue={customer?.phone} required />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" defaultValue={customer?.email} required />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="address">Adresse</Label>
          <Textarea id="address" name="address" defaultValue={customer?.address} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <NativeSelect id="type" name="type" defaultValue={customer?.type ?? "COMPANY"}>
            <option value="SYNDIC">Syndic</option>
            <option value="COMPANY">Entreprise</option>
            <option value="SHOP">Commerce</option>
            <option value="INDIVIDUAL">Particulier</option>
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <NativeSelect id="status" name="status" defaultValue={customer?.status ?? "ACTIVE"}>
            <option value="ACTIVE">Actif</option>
            <option value="INACTIVE">Inactif</option>
          </NativeSelect>
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Enregistrement..." : customer ? "Mettre à jour" : "Créer le client"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
