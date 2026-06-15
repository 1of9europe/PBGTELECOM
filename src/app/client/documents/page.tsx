import { FileText } from "lucide-react";
import { ClientPageHeader } from "@/components/client/ClientPageHeader";
import { ClientStatusBadge } from "@/components/client/ClientStatusBadge";
import { getClientDocuments } from "@/lib/actions/client";
import { formatDate } from "@/lib/filters";

const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  QUOTE: "Devis",
  INVOICE: "Facture",
  CONTRACT: "Contrat",
  INTERVENTION_REPORT: "Rapport d'intervention",
  PROJECT_DOCUMENT: "Document projet",
  OTHER: "Autre",
};

export default async function ClientDocumentsPage() {
  const documents = await getClientDocuments();

  return (
    <div className="space-y-6">
      <ClientPageHeader
        title="Documents"
        description="Accédez à vos devis, factures, contrats, rapports d’intervention et documents projet."
      />

      {documents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-10 text-center">
          <FileText className="mx-auto h-8 w-8 text-slate-500" />
          <p className="mt-3 text-sm text-slate-300">
            Aucun document disponible. La structure est prête pour alimenter automatiquement cet espace.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((document) => (
            <article key={document.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-white">{document.title}</p>
                  <p className="mt-1 text-xs text-slate-400">Ajouté le {formatDate(document.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <ClientStatusBadge label={DOCUMENT_TYPE_LABELS[document.type] ?? document.type} variant="info" />
                  <a
                    href={document.fileUrl}
                    className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-900"
                  >
                    Ouvrir
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
