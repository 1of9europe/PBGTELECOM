"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type DeleteButtonProps = {
  id: string;
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>;
  label?: string;
};

export function DeleteButton({ id, onDelete, label = "Supprimer" }: DeleteButtonProps) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-destructive hover:text-destructive"
      disabled={pending}
      onClick={() => {
        if (!confirm("Confirmer la suppression ?")) return;
        startTransition(async () => {
          const result = await onDelete(id);
          if (result.success) {
            toast.success("Supprimé avec succès");
          } else {
            toast.error(result.error ?? "Erreur lors de la suppression");
          }
        });
      }}
    >
      <Trash2 className="mr-1 h-4 w-4" />
      {label}
    </Button>
  );
}
