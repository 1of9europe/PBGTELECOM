import { getClientContext } from "@/lib/actions/client";
import { ClientPageHeader } from "@/components/client/ClientPageHeader";

export default async function ClientProfilePage() {
  const { customer } = await getClientContext();

  return (
    <div className="space-y-6">
      <ClientPageHeader
        title="Profil client"
        description="Informations société et préférences de communication."
      />

      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
        <h2 className="mb-4 text-lg font-semibold text-white">Informations société</h2>
        <dl className="grid gap-3 text-sm md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <dt className="text-slate-500">Société</dt>
            <dd className="mt-1 text-slate-100">{customer.companyName}</dd>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <dt className="text-slate-500">Contact principal</dt>
            <dd className="mt-1 text-slate-100">{customer.contactName}</dd>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <dt className="text-slate-500">Téléphone</dt>
            <dd className="mt-1 text-slate-100">{customer.phone}</dd>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <dt className="text-slate-500">Email</dt>
            <dd className="mt-1 text-slate-100">{customer.email}</dd>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 md:col-span-2">
            <dt className="text-slate-500">Adresse</dt>
            <dd className="mt-1 text-slate-100">{customer.address}</dd>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 md:col-span-2">
            <dt className="text-slate-500">Préférence de communication</dt>
            <dd className="mt-1 text-slate-100">Email prioritaire, téléphone en cas d’urgence</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
