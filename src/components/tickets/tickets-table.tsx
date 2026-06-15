"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/DataTable";
import {
  StatusBadge,
  getTicketPriorityVariant,
  getTicketStatusVariant,
} from "@/components/shared/StatusBadge";
import { DeleteButton } from "@/components/shared/DeleteButton";
import { ButtonLink } from "@/components/ui/button-link";
import { TICKET_PRIORITY_LABELS, TICKET_STATUS_LABELS } from "@/types";
import { deleteTicket } from "@/lib/actions/tickets";
import { formatDate } from "@/lib/filters";
import { Pencil } from "lucide-react";

export type TicketRow = {
  id: string;
  title: string;
  priority: string;
  status: string;
  createdAt: Date;
  customer: { companyName: string };
  site: { name: string };
  assignedTo: { name: string | null; email: string } | null;
};

const columns: ColumnDef<TicketRow>[] = [
  {
    accessorKey: "title",
    header: "Ticket",
    cell: ({ row }) => (
      <Link href={`/dashboard/tickets/${row.original.id}`} className="font-medium hover:text-primary">
        {row.original.title}
      </Link>
    ),
  },
  { accessorKey: "customer.companyName", header: "Client" },
  { accessorKey: "site.name", header: "Site" },
  {
    accessorKey: "priority",
    header: "Priorité",
    cell: ({ row }) => (
      <StatusBadge
        label={TICKET_PRIORITY_LABELS[row.original.priority] ?? row.original.priority}
        variant={getTicketPriorityVariant(row.original.priority)}
      />
    ),
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => (
      <StatusBadge
        label={TICKET_STATUS_LABELS[row.original.status] ?? row.original.status}
        variant={getTicketStatusVariant(row.original.status)}
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Créé le",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end gap-1">
        <ButtonLink variant="ghost" size="sm" href={`/dashboard/tickets/${row.original.id}/edit`}><Pencil className="h-4 w-4" /></ButtonLink>
        <DeleteButton id={row.original.id} onDelete={deleteTicket} />
      </div>
    ),
  },
];

export function TicketsTable({ data }: { data: TicketRow[] }) {
  return <DataTable columns={columns} data={data} searchPlaceholder="Rechercher un ticket..." searchKey="title" />;
}
