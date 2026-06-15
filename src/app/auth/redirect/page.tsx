import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/session";
import { getDefaultRouteByRole } from "@/lib/navigation";

export default async function AuthRedirectPage() {
  const user = await requireAuth();
  redirect(getDefaultRouteByRole(user.role));
}
