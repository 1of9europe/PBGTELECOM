"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/DataTable";
import {
  StatusBadge,
  getCustomerStatusVariant,
} from "@/components/shared/StatusBadge";
import { DeleteButton } from "@/components/shared/DeleteButton";
import { ButtonLink } from "@/components/ui/button-link";
import { CUSTOMER_STATUS_LABELS, CUSTOMER_TYPE_LABELS } from "@/types";
import { deleteCustomer } from "@/lib/actions/customers";
import { Pencil } from "lucide-react";

export type CustomerRow = {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  type: string;
  status: string;
  _count: { sites: number; tickets: number; contracts: number };
};

const columns: ColumnDef<CustomerRow>[] = [
  {
    accessorKey: "companyName",
    header: "Entreprise",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/customers/${row.original.id}`}
        className="font-medium hover:text-primary"
      >
        {row.original.companyName}
      </Link>
    ),
  },
  { accessorKey: "contactName", header: "Contact" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => CUSTOMER_TYPE_LABELS[row.original.type] ?? row.original.type,
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => (
      <StatusBadge
        label={CUSTOMER_STATUS_LABELS[row.original.status] ?? row.original.status}
        variant={getCustomerStatusVariant(row.original.status)}
      />
    ),
  },
  {
    id: "counts",
    header: "Sites / Tickets",
    cell: ({ row }) =>
      `${row.original._count.sites} / ${row.original._count.tickets}`,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end gap-1">
        <ButtonLink variant="ghost" size="sm" href={`/dashboard/customers/${row.original.id}/edit`}>
          <Pencil className="h-4 w-4" />
        </ButtonLink>
        <DeleteButton id={row.original.id} onDelete={deleteCustomer} />
      </div>
    ),
  },
];

export function CustomersTable({ data }: { data: CustomerRow[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder="Rechercher un client..."
      searchKey="companyName"
    />
  );
}
