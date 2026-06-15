import { MapPin, Plus } from "lucide-react";
import { getSites } from "@/lib/actions/sites";
import { SitesTable } from "@/components/sites/sites-table";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { ButtonLink } from "@/components/ui/button-link";
import { requireAuth } from "@/lib/session";
import { isAdmin } from "@/lib/permissions";

export default async function SitesPage() {
  const user = await requireAuth();
  const sites = await getSites();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sites"
        description="Sites d'installation par client"
        actions={
          isAdmin(user.role) ? (
            <ButtonLink href="/dashboard/sites/new"><Plus className="mr-2 h-4 w-4" />Nouveau site</ButtonLink>
          ) : undefined
        }
      />
      {sites.length === 0 ? (
        <EmptyState icon={MapPin} title="Aucun site" description="Aucun site enregistré pour le moment." />
      ) : (
        <SitesTable data={sites} />
      )}
    </div>
  );
}
