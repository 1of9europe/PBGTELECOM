import { notFound } from "next/navigation";
import { getSite } from "@/lib/actions/sites";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAuth } from "@/lib/session";

export default async function SiteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth();
  const { id } = await params;
  const site = await getSite(id);
  if (!site) notFound();

  return (
    <div className="space-y-6">
      <PageHeader title={site.name} description={site.customer.companyName} />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Détails</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">Adresse :</span> {site.address}</p>
            <p><span className="text-muted-foreground">Accès :</span> {site.accessInstructions || "—"}</p>
            <p><span className="text-muted-foreground">Notes :</span> {site.notes || "—"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Équipements ({site.equipment.length})</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {site.equipment.map((eq) => (
              <div key={eq.id} className="rounded-lg border p-3 text-sm">
                <p className="font-medium">{eq.brand} {eq.model}</p>
                <p className="text-muted-foreground">{eq.type} — {eq.status}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
