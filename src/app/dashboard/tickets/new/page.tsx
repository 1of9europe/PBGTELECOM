import { getCustomerOptions } from "@/lib/actions/customers";
import { getSiteOptions } from "@/lib/actions/sites";
import { getTechnicianOptions } from "@/lib/actions/tickets";
import { TicketForm } from "@/components/tickets/ticket-form";
import { PageHeader } from "@/components/shared/PageHeader";
import { requireAuth } from "@/lib/session";
import { Role } from "@prisma/client";

export default async function NewTicketPage() {
  const user = await requireAuth();
  const customers = await getCustomerOptions();
  const sites = await getSiteOptions();
  const technicians = await getTechnicianOptions();

  return (
    <div className="space-y-6">
      <PageHeader title="Nouveau ticket SAV" />
      <TicketForm
        customers={customers}
        sites={sites}
        technicians={technicians}
        isCustomer={user.role === Role.CUSTOMER}
      />
    </div>
  );
}
