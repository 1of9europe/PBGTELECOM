"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge, getEquipmentStatusVariant } from "@/components/shared/StatusBadge";
import { DeleteButton } from "@/components/shared/DeleteButton";
import { ButtonLink } from "@/components/ui/button-link";
import { EQUIPMENT_STATUS_LABELS, EQUIPMENT_TYPE_LABELS } from "@/types";
import { deleteEquipment } from "@/lib/actions/equipment";
import { Pencil } from "lucide-react";

export type EquipmentRow = {
  id: string;
  type: string;
  brand: string;
  model: string;
  serialNumber: string;
  status: string;
  site: { name: string; customer: { companyName: string } };
};

const columns: ColumnDef<EquipmentRow>[] = [
  { accessorKey: "brand", header: "Marque" },
  { accessorKey: "model", header: "Modèle" },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => EQUIPMENT_TYPE_LABELS[row.original.type] ?? row.original.type,
  },
  { accessorKey: "site.name", header: "Site" },
  { accessorKey: "site.customer.companyName", header: "Client" },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => (
      <StatusBadge
        label={EQUIPMENT_STATUS_LABELS[row.original.status] ?? row.original.status}
        variant={getEquipmentStatusVariant(row.original.status)}
      />
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end gap-1">
        <ButtonLink variant="ghost" size="sm" href={`/dashboard/equipment/${row.original.id}/edit`}><Pencil className="h-4 w-4" /></ButtonLink>
        <DeleteButton id={row.original.id} onDelete={deleteEquipment} />
      </div>
    ),
  },
];

export function EquipmentTable({ data }: { data: EquipmentRow[] }) {
  return <DataTable columns={columns} data={data} searchPlaceholder="Rechercher un équipement..." searchKey="brand" />;
}
