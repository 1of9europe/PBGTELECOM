import Link from "next/link";
import { ShieldCheck, Phone, Mail, MapPin } from "lucide-react";
import { company, footerLinks, CLIENT_PORTAL_URL } from "@/content/siteContent";

export function MarketingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#040914]">
      <div className="mx-auto max-w-7xl px-4 py-18 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-300/10">
                <ShieldCheck className="size-5 text-cyan-200" />
              </div>
              <div>
                <span className="text-lg font-semibold text-white">{company.name}</span>
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
                  Securite & telecom
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-300/85">{company.footerTagline}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-200">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300/85 transition-colors hover:text-cyan-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-200">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={company.phoneHref}
                  className="flex items-center gap-2 text-sm text-slate-300/85 transition-colors hover:text-cyan-200"
                >
                  <Phone className="size-4 shrink-0 text-cyan-300/80" />
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={company.emailHref}
                  className="flex items-center gap-2 text-sm text-slate-300/85 transition-colors hover:text-cyan-200"
                >
                  <Mail className="size-4 shrink-0 text-cyan-300/80" />
                  {company.email}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm text-slate-300/85">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-cyan-300/80" />
                  {company.address}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-200">
              Zones
            </h3>
            <p className="text-sm leading-relaxed text-slate-300/85">
              Île-de-France & PACA
              <br />
              Intervention France entière selon projet
            </p>
            <Link
              href={CLIENT_PORTAL_URL}
              className="mt-4 inline-block text-sm font-medium text-cyan-200 transition-colors hover:text-cyan-100"
            >
              Accéder à l&apos;espace client →
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-slate-500/90">
            © {currentYear} {company.name}. Tous droits réservés.
          </p>
          <p className="text-xs text-slate-500/90">
            Vidéosurveillance · Alarmes · Contrôle d&apos;accès · Courants faibles
          </p>
        </div>
      </div>
    </footer>
  );
}
