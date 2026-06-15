import { notFound } from "next/navigation";
import Link from "next/link";
import { getCustomer } from "@/lib/actions/customers";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge, getCustomerStatusVariant } from "@/components/shared/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button-link";
import { CUSTOMER_STATUS_LABELS, CUSTOMER_TYPE_LABELS } from "@/types";
import { requireRole } from "@/lib/session";
import { Role } from "@prisma/client";

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole([Role.SUPER_ADMIN, Role.ADMIN]);
  const { id } = await params;
  const customer = await getCustomer(id);
  if (!customer) notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        title={customer.companyName}
        description={customer.contactName}
        actions={
          <ButtonLink href={`/dashboard/customers/${id}/edit`} variant="outline">
            Modifier
          </ButtonLink>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Informations</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">Email :</span> {customer.email}</p>
            <p><span className="text-muted-foreground">Téléphone :</span> {customer.phone}</p>
            <p><span className="text-muted-foreground">Adresse :</span> {customer.address}</p>
            <p><span className="text-muted-foreground">Type :</span> {CUSTOMER_TYPE_LABELS[customer.type]}</p>
            <StatusBadge label={CUSTOMER_STATUS_LABELS[customer.status] ?? customer.status} variant={getCustomerStatusVariant(customer.status)} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Sites ({customer.sites.length})</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {customer.sites.map((site) => (
              <Link key={site.id} href={`/dashboard/sites/${site.id}`} className="block rounded-lg border p-3 text-sm hover:bg-muted/50">
                <p className="font-medium">{site.name}</p>
                <p className="text-muted-foreground">{site.address}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
