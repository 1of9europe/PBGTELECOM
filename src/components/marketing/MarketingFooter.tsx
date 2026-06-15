import Link from "next/link";
import { Shield, Phone, Mail, MapPin } from "lucide-react";
import { company, footerLinks, CLIENT_PORTAL_URL } from "@/content/siteContent";

export function MarketingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#060a12]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-sky-500/10 ring-1 ring-sky-500/30">
                <Shield className="size-5 text-sky-400" />
              </div>
              <span className="text-lg font-semibold text-white">{company.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">{company.footerTagline}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-sky-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={company.phoneHref}
                  className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-sky-400"
                >
                  <Phone className="size-4 shrink-0 text-sky-500/70" />
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={company.emailHref}
                  className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-sky-400"
                >
                  <Mail className="size-4 shrink-0 text-sky-500/70" />
                  {company.email}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm text-slate-400">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-sky-500/70" />
                  {company.address}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Zones
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Île-de-France & PACA
              <br />
              Intervention France entière selon projet
            </p>
            <Link
              href={CLIENT_PORTAL_URL}
              className="mt-4 inline-block text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
            >
              Accéder à l&apos;espace client →
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-slate-500">
            © {currentYear} {company.name}. Tous droits réservés.
          </p>
          <p className="text-xs text-slate-500">
            Vidéosurveillance · Alarmes · Contrôle d&apos;accès · Courants faibles
          </p>
        </div>
      </div>
    </footer>
  );
}
