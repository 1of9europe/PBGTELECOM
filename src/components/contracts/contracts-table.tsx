"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/DataTable";
import { getContractStatusVariant, StatusBadge } from "@/components/shared/StatusBadge";
import { DeleteButton } from "@/components/shared/DeleteButton";
import { ButtonLink } from "@/components/ui/button-link";
import { CONTRACT_STATUS_LABELS } from "@/types";
import { deleteContract, getContracts } from "@/lib/actions/contracts";
import { formatCurrency, formatDate } from "@/lib/filters";
import { Pencil } from "lucide-react";

export type ContractRow = Awaited<ReturnType<typeof getContracts>>[number];

const columns: ColumnDef<ContractRow>[] = [
  {
    accessorKey: "name",
    header: "Contrat",
    cell: ({ row }) => (
      <Link href={`/dashboard/contracts/${row.original.id}/edit`} className="font-medium hover:text-primary">
        {row.original.name}
      </Link>
    ),
  },
  { accessorKey: "customer.companyName", header: "Client" },
  {
    accessorKey: "monthlyPrice",
    header: "Mensuel",
    cell: ({ row }) => formatCurrency(Number(row.original.monthlyPrice)),
  },
  {
    accessorKey: "startDate",
    header: "Début",
    cell: ({ row }) => formatDate(row.original.startDate),
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => (
      <StatusBadge
        label={CONTRACT_STATUS_LABELS[row.original.status] ?? row.original.status}
        variant={getContractStatusVariant(row.original.status)}
      />
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end gap-1">
        <ButtonLink variant="ghost" size="sm" href={`/dashboard/contracts/${row.original.id}/edit`}><Pencil className="h-4 w-4" /></ButtonLink>
        <DeleteButton id={row.original.id} onDelete={deleteContract} />
      </div>
    ),
  },
];

export function ContractsTable({ data }: { data: ContractRow[] }) {
  return <DataTable columns={columns} data={data} searchPlaceholder="Rechercher un contrat..." searchKey="name" />;
}
