"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge, getInterventionStatusVariant } from "@/components/shared/StatusBadge";
import { DeleteButton } from "@/components/shared/DeleteButton";
import { ButtonLink } from "@/components/ui/button-link";
import { INTERVENTION_STATUS_LABELS } from "@/types";
import { deleteIntervention } from "@/lib/actions/interventions";
import { formatDateTime } from "@/lib/filters";
import { Pencil } from "lucide-react";

export type InterventionRow = {
  id: string;
  scheduledAt: Date;
  status: string;
  site: { name: string; customer: { companyName: string } };
  technician: { name: string | null; email: string };
  ticket: { title: string } | null;
};

const columns: ColumnDef<InterventionRow>[] = [
  {
    accessorKey: "scheduledAt",
    header: "Planifiée",
    cell: ({ row }) => formatDateTime(row.original.scheduledAt),
  },
  { accessorKey: "site.name", header: "Site" },
  { accessorKey: "site.customer.companyName", header: "Client" },
  {
    accessorKey: "technician.name",
    header: "Technicien",
    cell: ({ row }) => row.original.technician.name ?? row.original.technician.email,
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => (
      <StatusBadge
        label={INTERVENTION_STATUS_LABELS[row.original.status] ?? row.original.status}
        variant={getInterventionStatusVariant(row.original.status)}
      />
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end gap-1">
        <ButtonLink variant="ghost" size="sm" href={`/dashboard/interventions/${row.original.id}/edit`}><Pencil className="h-4 w-4" /></ButtonLink>
        <DeleteButton id={row.original.id} onDelete={deleteIntervention} />
      </div>
    ),
  },
];

export function InterventionsTable({ data }: { data: InterventionRow[] }) {
  return <DataTable columns={columns} data={data} searchPlaceholder="Rechercher..." searchKey="site.name" />;
}
