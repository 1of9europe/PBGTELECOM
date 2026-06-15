"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { toast } from "sonner";
import { createSubscription, updateSubscription } from "@/lib/actions/subscriptions";

type SubscriptionFormProps = {
  subscription?: {
    id: string;
    customerId: string;
    planName: string;
    priceMonthly: { toString(): string };
    status: string;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
  };
  customers: { id: string; companyName: string }[];
};

export function SubscriptionForm({ subscription, customers }: SubscriptionFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = subscription
        ? await updateSubscription(subscription.id, formData)
        : await createSubscription(formData);
      if (result.success) {
        toast.success(subscription ? "Abonnement mis à jour" : "Abonnement créé");
        router.push("/dashboard/subscriptions");
        router.refresh();
      } else toast.error(result.error);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="customerId">Client</Label>
          <NativeSelect id="customerId" name="customerId" defaultValue={subscription?.customerId ?? customers[0]?.id} required>
            {customers.map((c) => <option key={c.id} value={c.id}>{c.companyName}</option>)}
          </NativeSelect>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="planName">Nom du plan</Label>
          <Input id="planName" name="planName" defaultValue={subscription?.planName} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="priceMonthly">Prix mensuel (€)</Label>
          <Input id="priceMonthly" name="priceMonthly" type="number" step="0.01" defaultValue={subscription ? Number(subscription.priceMonthly) : ""} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <NativeSelect id="status" name="status" defaultValue={subscription?.status ?? "ACTIVE"}>
            <option value="ACTIVE">Actif</option>
            <option value="PAST_DUE">Impayé</option>
            <option value="CANCELLED">Annulé</option>
          </NativeSelect>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="stripeCustomerId">Stripe Customer ID</Label>
          <Input id="stripeCustomerId" name="stripeCustomerId" defaultValue={subscription?.stripeCustomerId ?? ""} placeholder="cus_..." />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="stripeSubscriptionId">Stripe Subscription ID</Label>
          <Input id="stripeSubscriptionId" name="stripeSubscriptionId" defaultValue={subscription?.stripeSubscriptionId ?? ""} placeholder="sub_..." />
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>{pending ? "Enregistrement..." : subscription ? "Mettre à jour" : "Créer l'abonnement"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
      </div>
    </form>
  );
}
