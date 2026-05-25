import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/LOGO-REINAS-BV.webp";
import { Reveal } from "./Reveal";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5 fill-current">
      <path d="M19.11 4.89A9.9 9.9 0 0 0 12.07 2a9.94 9.94 0 0 0-8.61 14.9L2 22l5.25-1.37a9.98 9.98 0 0 0 4.81 1.23h.01A9.94 9.94 0 0 0 22 11.93a9.88 9.88 0 0 0-2.89-7.04Zm-7.04 15.29h-.01a8.28 8.28 0 0 1-4.22-1.15l-.3-.18-3.12.81.83-3.04-.2-.31a8.26 8.26 0 0 1-1.28-4.38 8.31 8.31 0 0 1 14.18-5.88 8.24 8.24 0 0 1 2.43 5.89 8.31 8.31 0 0 1-8.31 8.24Zm4.55-6.2c-.25-.13-1.47-.73-1.7-.82-.23-.08-.4-.12-.56.13-.17.25-.65.82-.8.99-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.38.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.41-.56-.42l-.48-.01c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.43 1.02 2.59c.13.17 1.77 2.71 4.29 3.8.6.26 1.07.41 1.44.53.61.19 1.17.16 1.61.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Big CTA */}
      <div className="relative border-b border-white/5 px-4 py-20 md:px-6 md:py-28">
        <div className="absolute inset-0 gradient-radial-glow" />
        <Reveal variant="bloom" className="relative mx-auto max-w-[82rem]">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] tracking-tight">
                Klaar om uw project{" "}
                <span className="font-serif-italic gradient-text">te starten?</span>
              </h2>
              <p className="mt-4 max-w-lg text-muted-foreground">
                Neem contact met ons op voor persoonlijk advies en een vrijblijvende offerte op
                maat.
              </p>
            </div>
            <a
              href="https://wa.me/3161224631"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-br from-[oklch(0.63_0.2_149)] via-[oklch(0.61_0.21_156)] to-[oklch(0.57_0.18_162)] px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_54px_-18px_oklch(0.58_0.18_156/0.8)] transition-all hover:shadow-[0_24px_70px_-18px_oklch(0.58_0.18_156/0.92)]"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/18 backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
                <WhatsAppIcon />
              </span>
              Neem contact op
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>

      {/* Footer content */}
      <div className="relative mx-auto grid max-w-[82rem] gap-12 px-4 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:px-6">
        <Reveal variant="rise">
          <div>
            <a href="/" className="inline-flex items-center">
              <img src={logo} alt="Reina's B.V." className="h-14 w-auto object-contain md:h-16" />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Specialist in maatwerk kozijnen, deuren, schuifpuien en meer. Voor particulieren en
              bedrijven in heel Limburg en omgeving.
            </p>
          </div>
        </Reveal>

        <Reveal variant="rise" delay={1}>
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Snel naar
            </p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Producten", href: "/#producten" },
                { label: "Diensten", href: "/#diensten" },
                { label: "Projecten", href: "/#projecten" },
                { label: "Over ons", href: "/#over" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-foreground/85 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal variant="rise" delay={2}>
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Producten
            </p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Kozijnen", href: "/#producten" },
                { label: "Deuren", href: "/#producten" },
                { label: "Schuifpuien", href: "/#producten" },
                { label: "Rolluiken", href: "/#producten" },
                { label: "Garagedeuren", href: "/#producten" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-foreground/85 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal variant="rise" delay={3}>
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-foreground/85">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" /> Markt 5, Echt, Limburg, Nederland
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" /> +31 6 12 34 56 78
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@reinas-bv.nl</span>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="border-t border-white/5 px-4 py-6 md:px-6">
        <div className="mx-auto flex max-w-[82rem] flex-col items-start justify-between gap-3 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© 2026 Reina&apos;s B.V. Alle rechten voorbehouden.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground">
              Privacyverklaring
            </a>
            <a href="#" className="hover:text-foreground">
              Cookiebeleid
            </a>
            <a href="#" className="hover:text-foreground">
              Algemene voorwaarden
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
