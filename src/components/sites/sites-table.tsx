"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/DataTable";
import { DeleteButton } from "@/components/shared/DeleteButton";
import { ButtonLink } from "@/components/ui/button-link";
import { deleteSite } from "@/lib/actions/sites";
import { Pencil } from "lucide-react";

export type SiteRow = {
  id: string;
  name: string;
  address: string;
  customer: { companyName: string };
  _count: { equipment: number; interventions: number };
};

const columns: ColumnDef<SiteRow>[] = [
  {
    accessorKey: "name",
    header: "Site",
    cell: ({ row }) => (
      <Link href={`/dashboard/sites/${row.original.id}`} className="font-medium hover:text-primary">
        {row.original.name}
      </Link>
    ),
  },
  { accessorKey: "customer.companyName", header: "Client" },
  { accessorKey: "address", header: "Adresse" },
  {
    id: "counts",
    header: "Équip. / Interv.",
    cell: ({ row }) =>
      `${row.original._count.equipment} / ${row.original._count.interventions}`,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end gap-1">
        <ButtonLink variant="ghost" size="sm" href={`/dashboard/sites/${row.original.id}/edit`}><Pencil className="h-4 w-4" /></ButtonLink>
        <DeleteButton id={row.original.id} onDelete={deleteSite} />
      </div>
    ),
  },
];

export function SitesTable({ data }: { data: SiteRow[] }) {
  return <DataTable columns={columns} data={data} searchPlaceholder="Rechercher un site..." searchKey="name" />;
}
