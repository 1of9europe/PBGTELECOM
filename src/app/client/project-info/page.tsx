import { Building2, ShieldCheck, Users } from "lucide-react";
import { ClientPageHeader } from "@/components/client/ClientPageHeader";
import { getClientProjectInfo } from "@/lib/actions/client";
import { ROLE_LABELS } from "@/types";

export default async function ClientProjectInfoPage() {
  const data = await getClientProjectInfo();

  return (
    <div className="space-y-6">
      <ClientPageHeader
        title="Informations projet"
        description="Sites suivis, contacts PBG, accès, consignes et notes projet visibles côté client."
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="mb-4 flex items-center gap-2 text-slate-100">
            <Building2 className="h-4 w-4 text-blue-300" />
            <h2 className="font-semibold">Sites suivis</h2>
          </div>
          <div className="space-y-3">
            {data.sites.map((site) => (
              <div key={site.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <p className="font-medium text-white">{site.name}</p>
                <p className="mt-1 text-xs text-slate-400">{site.address}</p>
                <p className="mt-2 text-xs text-slate-300">
                  <span className="text-slate-500">Accès :</span> {site.accessInstructions || "Non renseigné"}
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  <span className="text-slate-500">Consignes :</span> {site.notes || "Aucune consigne spécifique"}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="mb-4 flex items-center gap-2 text-slate-100">
            <Users className="h-4 w-4 text-blue-300" />
            <h2 className="font-semibold">Contacts PBG</h2>
          </div>
          <div className="space-y-3">
            {data.contacts.map((contact) => (
              <div key={contact.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <p className="font-medium text-white">{contact.name ?? contact.email}</p>
                <p className="text-xs text-slate-400">{contact.email}</p>
                <p className="mt-1 text-xs text-blue-200">{ROLE_LABELS[contact.role]}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="mb-4 flex items-center gap-2 text-slate-100">
            <ShieldCheck className="h-4 w-4 text-blue-300" />
            <h2 className="font-semibold">Contrats actifs</h2>
          </div>
          <div className="space-y-3">
            {data.contracts.length === 0 ? (
              <p className="text-sm text-slate-400">Aucun contrat enregistré.</p>
            ) : (
              data.contracts.map((contract) => (
                <div key={contract.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-200">
                  <p className="font-medium text-white">{contract.name}</p>
                  <p className="mt-1 text-xs text-slate-400">Statut: {contract.status}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Délai d’intervention: {contract.responseTimeHours}h · Visites incluses: {contract.includedVisitsPerYear}/an
                  </p>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <h2 className="mb-4 font-semibold text-slate-100">Abonnements</h2>
          <div className="space-y-3">
            {data.subscriptions.length === 0 ? (
              <p className="text-sm text-slate-400">Aucun abonnement actif.</p>
            ) : (
              data.subscriptions.map((subscription) => (
                <div key={subscription.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-200">
                  <p className="font-medium text-white">{subscription.planName}</p>
                  <p className="mt-1 text-xs text-slate-400">Statut: {subscription.status}</p>
                  <p className="mt-1 text-xs text-slate-400">{Number(subscription.priceMonthly)} EUR / mois</p>
                </div>
              ))
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
