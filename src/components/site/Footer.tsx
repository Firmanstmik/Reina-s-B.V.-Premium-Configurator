import {
  ArrowRight,
  DoorOpen,
  FileText,
  Frame,
  Images,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  SlidersHorizontal,
} from "lucide-react";
import logo from "@/assets/LOGO-REINAS-BV.webp";
import project1 from "@/assets/official-projects/reinas-project-1.jpg";
import project2 from "@/assets/official-projects/reinas-project-2.jpg";
import project3 from "@/assets/official-projects/reinas-project-3.jpg";
import project4 from "@/assets/official-projects/reinas-project-4.jpg";
import project5 from "@/assets/official-projects/reinas-project-5.jpg";
import project6 from "@/assets/official-projects/reinas-project-6.jpg";
import project7 from "@/assets/official-projects/reinas-project-7.jpg";
import project8 from "@/assets/official-projects/reinas-project-8.jpg";
import aluminiumKozijnen from "@/assets/official-solutions/reinas-aluminium-kozijnen.jpeg";
import kunststofKozijnen from "@/assets/official-solutions/reinas-kunststof-kozijnen.jpeg";
import schuifpuienImage from "@/assets/official-solutions/reinas-schuifpuien.jpeg";
import voordeurenImage from "@/assets/official-solutions/reinas-voordeuren.jpeg";
import zakelijkeGevelsystemen from "@/assets/official-solutions/reinas-zakelijke-gevelsystemen.jpeg";
import { FloatingDock, type FloatingDockItem } from "@/components/ui/floating-dock";
import { Reveal } from "./Reveal";

const COMPANY_ADDRESS = "Hoogstraat 41b, 6102 XS Echt, Nederland";

const dockItems: FloatingDockItem[] = [
  {
    title: "Configurator",
    label: "Premium configurator",
    href: "/#configurator",
    icon: SlidersHorizontal,
    description:
      "Open direct de configurator en verfijn stijl, materiaal en afwerking in een showroomachtige flow.",
    accent: "rgba(103, 196, 239, 0.22)",
    previews: [
      {
        src: schuifpuienImage,
        alt: "Reina's configurator preview",
        objectPosition: "center center",
      },
      { src: project2, alt: "Reina's project detail", objectPosition: "center center" },
      { src: project6, alt: "Reina's architectuur project", objectPosition: "center center" },
    ],
  },
  {
    title: "Schuifpuien",
    label: "Moderne schuifpuien",
    href: "/#oplossingen",
    icon: DoorOpen,
    description:
      "Bekijk panoramische oplossingen met slanke profielen, royale lichtinval en een rustige architectonische lijn.",
    accent: "rgba(92, 184, 234, 0.2)",
    previews: [
      { src: schuifpuienImage, alt: "Reina's schuifpuien", objectPosition: "center center" },
      { src: project5, alt: "Reina's schuifpui project", objectPosition: "center center" },
      { src: project8, alt: "Reina's moderne gevel", objectPosition: "center center" },
    ],
  },
  {
    title: "Kozijnen",
    label: "Maatwerk kozijnen",
    href: "/#oplossingen",
    icon: Frame,
    description:
      "Direct naar aluminium en kunststof kozijnoplossingen met premium detaillering en duurzame prestaties.",
    accent: "rgba(121, 196, 225, 0.18)",
    previews: [
      { src: aluminiumKozijnen, alt: "Reina's aluminium kozijnen", objectPosition: "78% 30%" },
      {
        src: kunststofKozijnen,
        alt: "Reina's kunststof kozijnen",
        objectPosition: "center center",
      },
      { src: project1, alt: "Reina's kozijnen project", objectPosition: "center center" },
    ],
  },
  {
    title: "Projecten",
    label: "Vakmanschap projecten",
    href: "/#projecten",
    icon: Images,
    description:
      "Ga naar recent werk en ervaar hoe Reina's materialiteit, licht en afwerking in echte projecten samenkomen.",
    accent: "rgba(107, 198, 248, 0.22)",
    previews: [
      { src: project3, alt: "Reina's villa project", objectPosition: "center center" },
      { src: project4, alt: "Reina's woning project", objectPosition: "center center" },
      { src: project7, alt: "Reina's gevel project", objectPosition: "center center" },
    ],
  },
  {
    title: "Advies",
    label: "Persoonlijk advies",
    href: "/contact",
    icon: MessageSquare,
    description:
      "Plan een persoonlijk gesprek over materiaalkeuze, uitstraling en technische mogelijkheden voor uw project.",
    accent: "rgba(103, 193, 227, 0.18)",
    previews: [
      { src: voordeurenImage, alt: "Reina's entree maatwerk", objectPosition: "center center" },
      { src: zakelijkeGevelsystemen, alt: "Reina's projectadvies", objectPosition: "center top" },
      { src: project6, alt: "Reina's adviesproject", objectPosition: "center center" },
    ],
  },
  {
    title: "Offerte aanvragen",
    label: "Vrijblijvende offerte",
    href: "https://wa.me/3161224631?text=Hallo%20Reina%27s%20B.V.,%20ik%20ontvang%20graag%20een%20vrijblijvende%20offerte.",
    icon: FileText,
    description:
      "Start direct een vrijblijvende offerteaanvraag via WhatsApp en ontvang snel persoonlijk vervolgcontact.",
    accent: "rgba(123, 205, 239, 0.22)",
    external: true,
    previews: [
      { src: project2, alt: "Reina's offerte projectreferentie", objectPosition: "center center" },
      { src: project5, alt: "Reina's detail project", objectPosition: "center center" },
      { src: project8, alt: "Reina's premium maatwerk", objectPosition: "center center" },
    ],
  },
];

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
      <div className="relative overflow-hidden border-b border-black/6 bg-white px-4 py-20 md:px-6 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_38%,rgba(74,194,255,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,248,252,0.96))]" />
        <Reveal variant="bloom" className="relative mx-auto max-w-[82rem]">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-[oklch(0.22_0.014_240)]">
                Klaar om uw project{" "}
                <span className="font-serif-italic gradient-text">te starten?</span>
              </h2>
              <p className="mt-4 max-w-lg text-[oklch(0.44_0.012_240)]">
                Neem contact met ons op voor persoonlijk advies en een vrijblijvende offerte op
                maat.
              </p>
            </div>
            <a
              href="https://wa.me/3161224631"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-lg bg-gradient-to-br from-[oklch(0.63_0.2_149)] via-[oklch(0.61_0.21_156)] to-[oklch(0.57_0.18_162)] px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_54px_-18px_oklch(0.58_0.18_156/0.8)] transition-all hover:shadow-[0_24px_70px_-18px_oklch(0.58_0.18_156/0.92)]"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/16 ring-1 ring-white/18 backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
                <WhatsAppIcon />
              </span>
              Neem contact op
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>

      <div className="relative border-b border-white/5 px-4 py-16 md:px-6 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,13,0.96),rgba(5,9,15,0.78))]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(104,202,255,0.12),transparent_34%),radial-gradient(circle_at_20%_50%,rgba(84,140,198,0.08),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />

        <Reveal variant="bloom" className="relative mx-auto max-w-[82rem]">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] uppercase tracking-[0.28em] text-primary/90">
                  Premium quick access
                </p>
                <h3 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4vw,3.55rem)] font-medium leading-[1.03] tracking-tight text-white/92">
                  Een zwevende dock-ervaring voor snelle keuzes, echte projecten en direct advies.
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/56 md:text-[1.02rem]">
                  Ontworpen als een digitale showroom: rustig, exact en cinematografisch, met
                  directe toegang tot configuratie, materiaalcategorieen en offerteaanvraag.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:max-w-[30rem]">
                {["Live configuratie", "Recente projectbeelden", "Persoonlijk vervolgcontact"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-white/58 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>

            <FloatingDock items={dockItems} className="pt-1" />
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
                { label: "Producten", href: "/#oplossingen" },
                { label: "Diensten", href: "/#oplossingen" },
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
                { label: "Kozijnen", href: "/#oplossingen" },
                { label: "Deuren", href: "/#oplossingen" },
                { label: "Schuifpuien", href: "/#oplossingen" },
                {
                  label: "Rolluiken",
                  href: "https://www.reinas-bv.nl/onze-producten",
                  external: true,
                },
                {
                  label: "Garagedeuren",
                  href: "https://www.reinas-bv.nl/onze-producten",
                  external: true,
                },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noreferrer" : undefined}
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
                <MapPin className="mt-0.5 h-4 w-4 text-primary" /> {COMPANY_ADDRESS}
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
