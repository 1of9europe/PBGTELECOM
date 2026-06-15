"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge, getSubscriptionStatusVariant } from "@/components/shared/StatusBadge";
import { DeleteButton } from "@/components/shared/DeleteButton";
import { ButtonLink } from "@/components/ui/button-link";
import { SUBSCRIPTION_STATUS_LABELS } from "@/types";
import { deleteSubscription } from "@/lib/actions/subscriptions";
import { formatCurrency } from "@/lib/filters";
import { Pencil } from "lucide-react";

export type SubscriptionRow = {
  id: string;
  planName: string;
  priceMonthly: { toString(): string };
  status: string;
  customer: { companyName: string };
};

const columns: ColumnDef<SubscriptionRow>[] = [
  {
    accessorKey: "planName",
    header: "Plan",
    cell: ({ row }) => (
      <Link href={`/dashboard/subscriptions/${row.original.id}/edit`} className="font-medium hover:text-primary">
        {row.original.planName}
      </Link>
    ),
  },
  { accessorKey: "customer.companyName", header: "Client" },
  {
    accessorKey: "priceMonthly",
    header: "Mensuel",
    cell: ({ row }) => formatCurrency(Number(row.original.priceMonthly)),
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => (
      <StatusBadge
        label={SUBSCRIPTION_STATUS_LABELS[row.original.status] ?? row.original.status}
        variant={getSubscriptionStatusVariant(row.original.status)}
      />
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end gap-1">
        <ButtonLink variant="ghost" size="sm" href={`/dashboard/subscriptions/${row.original.id}/edit`}><Pencil className="h-4 w-4" /></ButtonLink>
        <DeleteButton id={row.original.id} onDelete={deleteSubscription} />
      </div>
    ),
  },
];

export function SubscriptionsTable({ data }: { data: SubscriptionRow[] }) {
  return <DataTable columns={columns} data={data} searchPlaceholder="Rechercher un abonnement..." searchKey="planName" />;
}
