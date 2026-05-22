import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Big CTA */}
      <div className="relative border-b border-white/5 px-4 py-20 md:px-6 md:py-28">
        <div className="absolute inset-0 gradient-radial-glow" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] tracking-tight">
              Klaar om uw project <span className="font-serif-italic gradient-text">te starten?</span>
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Neem contact met ons op voor persoonlijk advies en een vrijblijvende offerte op maat.
            </p>
          </div>
          <a
            href="mailto:info@reinas-bv.nl"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_20px_60px_-15px_oklch(0.78_0.13_215/0.7)]"
          >
            Neem contact op
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Footer content */}
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:px-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 ring-1 ring-primary/30">
              <span className="font-display text-lg font-semibold text-primary">R</span>
            </span>
            <div className="leading-tight">
              <p className="font-display text-base font-semibold">Reina&apos;s B.V.</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Mooier · sterker · zekerder</p>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Specialist in maatwerk kozijnen, deuren, schuifpuien en meer. Voor particulieren en
            bedrijven in heel Limburg en omgeving.
          </p>
        </div>

        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Snel naar</p>
          <ul className="space-y-2.5 text-sm">
            {["Producten", "Diensten", "Projecten", "Over ons", "Contact"].map((l) => (
              <li key={l}>
                <a href="#" className="text-foreground/85 transition-colors hover:text-primary">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Producten</p>
          <ul className="space-y-2.5 text-sm">
            {["Kozijnen", "Deuren", "Schuifpuien", "Rolluiken", "Garagedeuren"].map((l) => (
              <li key={l}>
                <a href="#" className="text-foreground/85 transition-colors hover:text-primary">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Contact</p>
          <ul className="space-y-3 text-sm text-foreground/85">
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> Markt 5, Echt, Limburg, Nederland</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> +31 6 12 34 56 78</li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /><span>info@reinas-bv.nl</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-6 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© 2026 Reina&apos;s B.V. Alle rechten voorbehouden.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground">Privacyverklaring</a>
            <a href="#" className="hover:text-foreground">Cookiebeleid</a>
            <a href="#" className="hover:text-foreground">Algemene voorwaarden</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
