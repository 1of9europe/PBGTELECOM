"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Globe, ShieldCheck, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { SectionWrapper } from "@/components/marketing/SectionWrapper";
import { company, contactNeedTypes } from "@/content/siteContent";
import { toast } from "sonner";
import { Reveal } from "@/components/marketing/Reveal";

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
      title="Parlez-nous de votre besoin"
      subtitle="Audit gratuit, proposition technique claire et accompagnement sur mesure."
      className="bg-[#070d19]"
      centered={false}
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="space-y-5">
          <div className="rounded-3xl border border-white/10 bg-[#0f182a]/75 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
              Coordonnées
            </h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={company.phoneHref}
                  className="flex items-center gap-3 text-sm text-slate-200 transition-colors hover:text-cyan-200"
                >
                  <Phone className="size-4 shrink-0 text-cyan-300" />
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={company.emailHref}
                  className="flex items-center gap-3 text-sm text-slate-200 transition-colors hover:text-cyan-200"
                >
                  <Mail className="size-4 shrink-0 text-cyan-300" />
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <MapPin className="mt-0.5 size-4 shrink-0 text-cyan-300" />
                {company.address}
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <Globe className="mt-0.5 size-4 shrink-0 text-cyan-300" />
                {company.zones}
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0f182a]/65 p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-cyan-300/10">
                <ShieldCheck className="size-4 text-cyan-300" />
              </div>
              <p className="text-sm text-slate-200">Demande traitée par un expert terrain</p>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-cyan-300/10">
                <Clock3 className="size-4 text-cyan-300" />
              </div>
              <p className="text-sm text-slate-300">Réponse rapide sur votre projet de sécurisation</p>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={110}>
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl border border-white/10 bg-[#0f182a]/75 p-6 md:p-7"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-200">
                Nom *
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Votre nom"
                  className="h-10 rounded-xl border-white/10 bg-[#0a1322] text-white placeholder:text-slate-500 focus-visible:border-cyan-300/40 focus-visible:ring-cyan-300/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-slate-200">
                Société
                </Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Nom de votre société"
                  className="h-10 rounded-xl border-white/10 bg-[#0a1322] text-white placeholder:text-slate-500 focus-visible:border-cyan-300/40 focus-visible:ring-cyan-300/30"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-200">
                Téléphone *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="06 00 00 00 00"
                  className="h-10 rounded-xl border-white/10 bg-[#0a1322] text-white placeholder:text-slate-500 focus-visible:border-cyan-300/40 focus-visible:ring-cyan-300/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="votre@email.fr"
                  className="h-10 rounded-xl border-white/10 bg-[#0a1322] text-white placeholder:text-slate-500 focus-visible:border-cyan-300/40 focus-visible:ring-cyan-300/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="needType" className="text-slate-200">
              Type de besoin *
              </Label>
              <NativeSelect
                id="needType"
                name="needType"
                required
                className="h-10 rounded-xl border-white/10 bg-[#0a1322] text-white focus-visible:ring-cyan-300/30"
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
              <Label htmlFor="message" className="text-slate-200">
              Message *
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Décrivez votre projet ou votre besoin..."
                className="rounded-xl border-white/10 bg-[#0a1322] text-white placeholder:text-slate-500 focus-visible:border-cyan-300/40 focus-visible:ring-cyan-300/30"
              />
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="h-11 w-full rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 shadow-[0_0_32px_-12px_rgba(34,211,238,0.85)] hover:from-sky-400 hover:to-cyan-300 sm:w-auto sm:px-8"
            >
              {pending ? "Envoi en cours..." : "Envoyer ma demande"}
            </Button>
          </form>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
