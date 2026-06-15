import { notFound } from "next/navigation";
import { getTicket, getTechnicianOptions } from "@/lib/actions/tickets";
import { getCustomerOptions } from "@/lib/actions/customers";
import { getSiteOptions } from "@/lib/actions/sites";
import { TicketForm } from "@/components/tickets/ticket-form";
import { PageHeader } from "@/components/shared/PageHeader";
import { requireAuth } from "@/lib/session";
import { Role } from "@/generated/prisma/enums";

export default async function EditTicketPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireAuth();
  const { id } = await params;
  const ticket = await getTicket(id);
  if (!ticket) notFound();
  const customers = await getCustomerOptions();
  const sites = await getSiteOptions();
  const technicians = await getTechnicianOptions();

  return (
    <div className="space-y-6">
      <PageHeader title={`Modifier — ${ticket.title}`} />
      <TicketForm
        ticket={ticket}
        customers={customers}
        sites={sites}
        technicians={technicians}
        isCustomer={user.role === Role.CUSTOMER}
      />
    </div>
  );
}
