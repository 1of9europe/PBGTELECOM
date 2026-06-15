"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { company, contactNeedTypes } from "@/content/siteContent";
import { toast } from "sonner";

/**
 * TODO: Brancher l'envoi du formulaire via EmailJS, Resend, Brevo ou une API interne.
 * Exemple d'intégration :
 * - Créer une route API POST /api/contact
 * - Ou appeler directement un service email côté client (EmailJS)
 */
async function submitContactForm(data: FormData): Promise<void> {
  void data;
  // Placeholder — remplacer par l'appel réel au backend mail
  await new Promise((resolve) => setTimeout(resolve, 800));
}

export function ContactSection() {
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);

    try {
      const formData = new FormData(e.currentTarget);
      await submitContactForm(formData);
      toast.success("Demande envoyée ! Nous vous recontacterons rapidement.");
      e.currentTarget.reset();
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer ou nous appeler.");
    } finally {
      setPending(false);
    }
  }

  return (
    <SectionWrapper
      id="contact"
      title="Contactez-nous"
      subtitle="Demandez un audit gratuit ou un devis pour votre projet de sécurité."
      className="bg-[#0c1220]"
    >
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-white/10 bg-[#111827]/60 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Coordonnées
            </h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={company.phoneHref}
                  className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-sky-400"
                >
                  <Phone className="size-4 shrink-0 text-sky-500" />
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={company.emailHref}
                  className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-sky-400"
                >
                  <Mail className="size-4 shrink-0 text-sky-500" />
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <MapPin className="mt-0.5 size-4 shrink-0 text-sky-500" />
                {company.address}
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <Globe className="mt-0.5 size-4 shrink-0 text-sky-500" />
                {company.zones}
              </li>
            </ul>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-white/10 bg-[#111827]/60 p-6 lg:col-span-3"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">
                Nom *
              </Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Votre nom"
                className="border-white/10 bg-[#0a0f1a]/50 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-slate-300">
                Société
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="Nom de votre société"
                className="border-white/10 bg-[#0a0f1a]/50 text-white placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-300">
                Téléphone *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="06 00 00 00 00"
                className="border-white/10 bg-[#0a0f1a]/50 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="votre@email.fr"
                className="border-white/10 bg-[#0a0f1a]/50 text-white placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="needType" className="text-slate-300">
              Type de besoin *
            </Label>
            <NativeSelect
              id="needType"
              name="needType"
              required
              className="h-9 border-white/10 bg-[#0a0f1a]/50 text-white"
              defaultValue=""
            >
              <option value="" disabled>
                Sélectionnez un besoin
              </option>
              {contactNeedTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </NativeSelect>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-slate-300">
              Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Décrivez votre projet ou votre besoin..."
              className="border-white/10 bg-[#0a0f1a]/50 text-white placeholder:text-slate-500"
            />
          </div>

          <Button
            type="submit"
            disabled={pending}
            className="h-11 w-full bg-sky-500 text-white hover:bg-sky-400 sm:w-auto sm:px-8"
          >
            {pending ? "Envoi en cours..." : "Envoyer ma demande"}
          </Button>
        </form>
      </div>
    </SectionWrapper>
  );
}
