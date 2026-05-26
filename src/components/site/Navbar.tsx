import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Blinds,
  ChevronDown,
  DoorClosed,
  Frame,
  Maximize2,
  Mail,
  Menu,
  Phone,
  PanelTop,
  ShieldCheck,
  Truck,
  Warehouse,
  Home as HomeIcon,
  X,
  type LucideIcon,
} from "lucide-react";
import logo from "@/assets/LOGO-REINAS-BV.webp";
import project5 from "@/assets/official-projects/reinas-project-5.jpg";
import project6 from "@/assets/official-projects/reinas-project-6.jpg";
import project8 from "@/assets/official-projects/reinas-project-8.jpg";
import aluminiumKozijnen from "@/assets/official-solutions/reinas-aluminium-kozijnen.jpeg";
import houtenKozijnen from "@/assets/official-solutions/reinas-houten-kozijnen.jpeg";
import kunststofKozijnen from "@/assets/official-solutions/reinas-kunststof-kozijnen.jpeg";
import schuifpuienImage from "@/assets/official-solutions/reinas-schuifpuien.jpeg";
import { cn } from "@/lib/utils";
import { useSegment } from "@/hooks/useSegment";

const CONTACT_PHONE_DISPLAY = "+31612246431";
const CONTACT_PHONE_HREF = "tel:+31612246431";

type NavLink = {
  label: string;
  href: string;
  hasMenu?: boolean;
};

type ProductMenuItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  objectPosition: string;
  icon: LucideIcon;
  eyebrow: string;
  previewLabel: string;
  previewCopy: string;
  highlights: [string, string, string];
  accent: string;
  badge?: "Binnenkort";
};

const links: NavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "Producten", href: "/#oplossingen", hasMenu: true },
  { label: "Diensten", href: "/#diensten" },
  { label: "Projecten", href: "/#projecten" },
  { label: "Over ons", href: "/#over" },
  { label: "Contact", href: "/contact" },
];

const PRODUCT_MENU_ITEMS: ProductMenuItem[] = [
  {
    id: "kunststof-kozijnen",
    title: "Kunststof kozijnen",
    description: "Onderhoudsarm comfort met een rustige premium uitstraling.",
    image: kunststofKozijnen,
    objectPosition: "center center",
    icon: Frame,
    eyebrow: "Official producten",
    previewLabel: "Kunststof kozijnen",
    previewCopy:
      "Comfortabele kozijnoplossingen met verfijnde detaillering, isolatie en een nette gevelcompositie.",
    highlights: ["Onderhoudsarm", "Goede isolatie", "Rustige uitstraling"],
    accent: "rgba(122, 204, 232, 0.22)",
    badge: "Binnenkort",
  },
  {
    id: "aluminium-kozijnen",
    title: "Aluminium kozijnen",
    description: "Slanke lijnen en architecturale uitstraling voor moderne gevels.",
    image: aluminiumKozijnen,
    objectPosition: "78% 30%",
    icon: Frame,
    eyebrow: "Official producten",
    previewLabel: "Aluminium kozijnen",
    previewCopy:
      "Voor projecten waar slanke profielen, strakke verhoudingen en een premium afwerking centraal staan.",
    highlights: ["Slanke profielen", "Duurzaam", "Architectonisch"],
    accent: "rgba(108, 184, 230, 0.24)",
    badge: "Binnenkort",
  },
  {
    id: "houten-kozijnen",
    title: "Houten kozijnen",
    description: "Warme materialiteit met verfijnd maatwerk voor karaktervolle woningen.",
    image: houtenKozijnen,
    objectPosition: "center center",
    icon: Frame,
    eyebrow: "Official producten",
    previewLabel: "Houten kozijnen",
    previewCopy:
      "Een natuurlijke uitstraling met rustige diepte, geschikt voor renovatie en hoogwaardige woonarchitectuur.",
    highlights: ["Warm karakter", "Tijdloos", "Ambachtelijk"],
    accent: "rgba(214, 184, 136, 0.18)",
    badge: "Binnenkort",
  },
  {
    id: "horren",
    title: "Horren",
    description: "Strakke insectenwering die subtiel aansluit op kozijn en gevel.",
    image: project8,
    objectPosition: "center center",
    icon: PanelTop,
    eyebrow: "Official producten",
    previewLabel: "Horren",
    previewCopy:
      "Discreet geïntegreerde oplossingen voor ventilatie en comfort, zonder visuele onrust in het ontwerp.",
    highlights: ["Subtiel", "Praktisch", "Net afgewerkt"],
    accent: "rgba(116, 180, 214, 0.18)",
    badge: "Binnenkort",
  },
  {
    id: "sunscreens",
    title: "Sunscreens",
    description: "Zonwering met comfort, privacy en een nette architecturale integratie.",
    image: schuifpuienImage,
    objectPosition: "center center",
    icon: Blinds,
    eyebrow: "Official producten",
    previewLabel: "Sunscreens",
    previewCopy:
      "Voor lichtregulatie, schaduw en dagelijks wooncomfort, afgestemd op gevel en ritme van de woning.",
    highlights: ["Comfort", "Privacy", "Zonwering"],
    accent: "rgba(101, 176, 220, 0.18)",
    badge: "Binnenkort",
  },
  {
    id: "sectionaal-poorten-hekwerken",
    title: "Sectionaal poorten & hekwerken",
    description: "Veilige entrees en terreinoplossingen met rustige, sterke vormtaal.",
    image: project5,
    objectPosition: "center center",
    icon: Warehouse,
    eyebrow: "Official producten",
    previewLabel: "Sectionaal poorten & hekwerken",
    previewCopy:
      "Functionele poorten en hekwerken die veiligheid, gebruiksgemak en geveluitstraling in balans brengen.",
    highlights: ["Veilig", "Maatwerk", "Sterke uitstraling"],
    accent: "rgba(130, 187, 226, 0.22)",
    badge: "Binnenkort",
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [segment, setSegment] = useSegment();
  const [activeProductId, setActiveProductId] = useState(PRODUCT_MENU_ITEMS[0].id);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeProduct = useMemo(
    () => PRODUCT_MENU_ITEMS.find((item) => item.id === activeProductId) ?? PRODUCT_MENU_ITEMS[0],
    [activeProductId],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setMobileProductsOpen(false);
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMegaOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMegaMenu = (productId = activeProduct.id) => {
    clearCloseTimer();
    setActiveProductId(productId);
    setMegaOpen(true);
  };

  const scheduleMegaClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const toggleSegment = () => {
    setSegment(segment === "particulier" ? "zakelijk" : "particulier");
  };

  const activeSegmentLabel = segment === "particulier" ? "Particulier" : "Zakelijk";

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      {/* Top utility bar */}
      <div
        className={`w-full border-b border-white/5 bg-background/70 backdrop-blur-xl transition-all duration-500 ${
          scrolled ? "h-0 -translate-y-full overflow-hidden opacity-0" : "opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-[88rem] items-center justify-center gap-7 px-6 py-2.5 text-[12px] tracking-[0.01em] text-muted-foreground md:justify-end md:gap-8">
          <span className="hidden items-center gap-2 md:inline-flex">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            5+ jaar garantie
          </span>
          <span className="hidden items-center gap-2 md:inline-flex">
            <HomeIcon className="h-3.5 w-3.5 text-primary" />
            Gratis advies aan huis
          </span>
          <span className="hidden items-center gap-2 lg:inline-flex">
            <Truck className="h-3.5 w-3.5 text-primary" />
            Snelle plaatsing
          </span>
          <a
            href="mailto:info@reinas-bv.nl"
            className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <Mail className="h-3.5 w-3.5 text-primary" />
            info@reinas-bv.nl
          </a>
          <a
            href={CONTACT_PHONE_HREF}
            className="hidden items-center gap-2 transition-colors hover:text-foreground sm:inline-flex"
          >
            <Phone className="h-3.5 w-3.5 text-primary" />
            {CONTACT_PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <div
        className={`w-full border-b border-white/[0.06] transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-2xl shadow-[0_10px_40px_-20px_oklch(0_0_0/0.7)]"
            : "bg-background/40 backdrop-blur-xl"
        }`}
      >
        <nav className="mx-auto flex h-[74px] max-w-[88rem] items-center justify-between px-5 sm:px-6 md:h-[84px]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img src={logo} alt="Reina's B.V." className="h-12 w-auto object-contain md:h-16" />
          </a>

          {/* Links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) =>
              l.hasMenu ? (
                <li
                  key={l.href}
                  className="relative"
                  onMouseEnter={() => openMegaMenu()}
                  onMouseLeave={scheduleMegaClose}
                >
                  <button
                    type="button"
                    onFocus={() => openMegaMenu()}
                    aria-expanded={megaOpen}
                    className={cn(
                      "group relative inline-flex items-center gap-1 py-2 text-[13.5px] font-medium tracking-[0.01em] transition-colors",
                      megaOpen ? "text-primary" : "text-foreground/85 hover:text-primary",
                    )}
                  >
                    {l.label}
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 opacity-70 transition-transform duration-300",
                        megaOpen && "rotate-180",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-[2px] bg-primary transition-all duration-300",
                        megaOpen ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.99 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                          "fixed left-1/2 z-[70] w-[min(calc(100vw-2rem),84rem)] -translate-x-1/2",
                          scrolled ? "top-[5.8rem]" : "top-[7.9rem]",
                        )}
                        onMouseEnter={clearCloseTimer}
                        onMouseLeave={scheduleMegaClose}
                      >
                        {/* Keeps the hover zone stable between trigger and panel */}
                        <div className="absolute inset-x-0 -top-4 h-4" />

                        <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(6,10,16,0.94),rgba(6,10,16,0.88))] p-3 shadow-[0_30px_90px_-46px_oklch(0_0_0/0.9),0_0_0_1px_oklch(1_0_0/0.03)] backdrop-blur-[24px]">
                          <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:84px_84px]" />
                          <div
                            className="pointer-events-none absolute -right-12 top-0 h-48 w-48 rounded-full blur-3xl transition-all duration-500"
                            style={{ background: activeProduct.accent }}
                          />
                          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(127,212,255,0.42),transparent)]" />

                          <div className="relative grid gap-3 lg:grid-cols-[1.18fr_1.32fr]">
                            <div className="flex flex-col rounded-[1.45rem] border border-white/7 bg-white/[0.025] p-3.5">
                              <div className="flex items-start justify-between gap-4 border-b border-white/7 pb-3">
                                <div className="max-w-[18rem]">
                                  <p className="text-[10px] uppercase tracking-[0.26em] text-primary/90">
                                    Producten
                                  </p>
                                  <h3 className="mt-2 font-display text-[1.28rem] font-medium tracking-tight text-white/94">
                                    Premium maatwerk voor gevel, entree en comfort.
                                  </h3>
                                </div>
                                <p className="max-w-[16rem] text-right text-[10.5px] leading-relaxed text-white/48">
                                  Officiele productstructuur, rustig gepresenteerd zodat client
                                  direct ziet welke paginas als volgende gebouwd kunnen worden.
                                </p>
                              </div>

                              <div className="mt-3 grid grid-cols-3 gap-2">
                                {PRODUCT_MENU_ITEMS.map((item) => {
                                  const Icon = item.icon;
                                  const active = item.id === activeProduct.id;

                                  return (
                                    <button
                                      key={item.id}
                                      type="button"
                                      onMouseEnter={() => setActiveProductId(item.id)}
                                      onFocus={() => setActiveProductId(item.id)}
                                      aria-disabled="true"
                                      className={cn(
                                        "group relative overflow-hidden rounded-[1rem] border p-2.5 text-left transition-all duration-300",
                                        active
                                          ? "border-primary/28 bg-white/[0.05] shadow-[0_20px_36px_-28px_oklch(0.78_0.13_215/0.45)]"
                                          : "border-white/8 bg-white/[0.018] hover:border-white/14 hover:bg-white/[0.035]",
                                      )}
                                    >
                                      <div
                                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        style={{
                                          background: `linear-gradient(135deg, ${item.accent}, transparent 42%, transparent 80%)`,
                                        }}
                                      />
                                      <div className="relative flex items-start gap-2.5">
                                        <span
                                          className={cn(
                                            "grid h-8.5 w-8.5 shrink-0 place-items-center rounded-[0.85rem] border transition-colors duration-300",
                                            active
                                              ? "border-primary/22 bg-primary/10 text-primary"
                                              : "border-white/8 bg-white/[0.03] text-white/70 group-hover:text-primary",
                                          )}
                                        >
                                          <Icon className="h-3.5 w-3.5" />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center gap-1.5">
                                            <span className="text-[12px] font-semibold tracking-tight text-white/92">
                                              {item.title}
                                            </span>
                                            {item.badge && (
                                              <span className="rounded-full border border-primary/26 bg-primary/12 px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-[0.16em] text-primary">
                                                {item.badge}
                                              </span>
                                            )}
                                          </div>
                                          <p className="mt-0.5 text-[10px] leading-relaxed text-white/54">
                                            {item.description}
                                          </p>
                                        </div>
                                        <ArrowRight
                                          className={cn(
                                            "mt-0.5 h-3.5 w-3.5 shrink-0 text-white/34 transition-all duration-300",
                                            active && "translate-x-0.5 text-primary/85",
                                          )}
                                        />
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>

                              <div className="mt-3 flex items-center justify-between rounded-[1rem] border border-white/7 bg-black/20 px-3 py-2">
                                <div>
                                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">
                                    Productpagina's in voorbereiding
                                  </p>
                                  <p className="mt-1 text-[10px] text-white/62">
                                    De inhoud volgt de officiële productnavigatie en blijft nu
                                    bewust non-clickable voor de volgende bouwfase.
                                  </p>
                                </div>
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[9px] font-medium text-white/52">
                                  Binnenkort live
                                </span>
                              </div>
                            </div>

                            <div className="relative min-h-[18.75rem] overflow-hidden rounded-[1.45rem] border border-white/8 bg-white/[0.025]">
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={activeProduct.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -8 }}
                                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                                  className="absolute inset-0"
                                >
                                  <motion.img
                                    src={activeProduct.image}
                                    alt={activeProduct.title}
                                    initial={{ scale: 1.04 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 1.02 }}
                                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    style={{ objectPosition: activeProduct.objectPosition }}
                                  />

                                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,18,0.1),rgba(7,12,18,0.22)_40%,rgba(7,12,18,0.88)_100%)]" />
                                  <div
                                    className="absolute inset-0"
                                    style={{
                                      background: `radial-gradient(64% 64% at 72% 20%, ${activeProduct.accent}, transparent 72%)`,
                                      mixBlendMode: "screen",
                                      opacity: 0.82,
                                    }}
                                  />
                                  <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)]" />

                                  <div className="absolute left-3.5 top-3.5 flex flex-wrap items-center gap-1.5">
                                    <span className="rounded-full border border-white/12 bg-background/45 px-2 py-1 text-[7.5px] font-semibold uppercase tracking-[0.18em] text-white/74 backdrop-blur-xl">
                                      {activeProduct.eyebrow}
                                    </span>
                                    <span className="rounded-full border border-white/10 bg-black/28 px-2 py-1 text-[7.5px] uppercase tracking-[0.16em] text-primary/90 backdrop-blur-xl">
                                      {activeProduct.previewLabel}
                                    </span>
                                  </div>

                                  <div className="absolute inset-x-3.5 bottom-3.5 rounded-[1.2rem] border border-white/10 bg-background/44 p-3.5 shadow-[0_24px_60px_-34px_oklch(0_0_0/0.9)] backdrop-blur-2xl">
                                    <div className="flex items-start justify-between gap-3">
                                      <div className="max-w-[24rem]">
                                        <div className="flex items-center gap-1.5">
                                          <h4 className="text-[0.98rem] font-semibold tracking-tight text-white/94">
                                            {activeProduct.title}
                                          </h4>
                                          {activeProduct.badge && (
                                            <span className="rounded-full border border-primary/26 bg-primary/12 px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-[0.16em] text-primary">
                                              {activeProduct.badge}
                                            </span>
                                          )}
                                        </div>
                                        <p className="mt-1 max-w-[25rem] text-[10.5px] leading-relaxed text-white/62">
                                          {activeProduct.previewCopy}
                                        </p>
                                      </div>
                                      <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[9px] font-semibold text-white/58">
                                        Nog niet live
                                      </span>
                                    </div>

                                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                                      {activeProduct.highlights.map((highlight) => (
                                        <span
                                          key={highlight}
                                          className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[8px] uppercase tracking-[0.14em] text-white/60"
                                        >
                                          {highlight}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group relative inline-flex items-center gap-1 py-2 text-[13.5px] font-medium tracking-[0.01em] text-foreground/85 transition-colors hover:text-primary"
                  >
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ),
            )}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={toggleSegment}
              className="group hidden items-center rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/82 transition-all duration-300 hover:border-primary/32 hover:bg-white/[0.06] hover:text-primary xl:inline-flex"
              aria-label={`Wissel segment, nu ${activeSegmentLabel}`}
            >
              <span className="relative">
                {activeSegmentLabel}
                <span className="absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-primary/80 transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </button>
            <button
              type="button"
              aria-disabled="true"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-br from-primary to-primary-glow px-5 py-2.5 text-[13px] font-semibold tracking-[0.01em] text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.78_0.13_215/0.55)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:shadow-[0_18px_46px_-14px_oklch(0.78_0.13_215/0.72)] hover:brightness-[1.03]"
            >
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_18%,rgba(255,255,255,0.22)_42%,transparent_68%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              Naar configurator
              <ArrowRight className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Sluit menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-background/40 backdrop-blur-md transition-colors hover:border-primary/40 hover:text-primary lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-0 top-[74px] origin-top transition-all duration-500 lg:hidden md:top-[84px] ${
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="mx-4 mt-2 rounded-2xl glass-strong p-5 shadow-[var(--shadow-elevated)]">
          <div className="mb-4 flex justify-center border-b border-white/5 pb-4">
            <button
              type="button"
              onClick={toggleSegment}
              className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/82 transition-all duration-300 hover:border-primary/32 hover:bg-white/[0.06] hover:text-primary"
              aria-label={`Wissel segment, nu ${activeSegmentLabel}`}
            >
              {activeSegmentLabel}
            </button>
          </div>
          <ul className="flex flex-col">
            {links.map((l) =>
              l.hasMenu ? (
                <li key={l.href} className="border-b border-white/5 py-1">
                  <button
                    type="button"
                    onClick={() => setMobileProductsOpen((value) => !value)}
                    className="flex w-full items-center justify-between py-2.5 text-left text-[15px] font-medium text-foreground/90 transition-colors hover:text-primary"
                  >
                    <span>{l.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 opacity-60 transition-transform duration-300",
                        mobileProductsOpen && "rotate-180 text-primary",
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mb-2 mt-2 rounded-[1.45rem] border border-white/8 bg-white/[0.02] p-3">
                          <div className="grid gap-2">
                            {PRODUCT_MENU_ITEMS.map((item) => {
                              const Icon = item.icon;
                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => {
                                    setActiveProductId(item.id);
                                  }}
                                  aria-disabled="true"
                                  className="flex items-start gap-3 rounded-[1.15rem] border border-white/6 bg-white/[0.018] px-3 py-3 transition-colors hover:border-primary/18 hover:bg-white/[0.04]"
                                >
                                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/8 bg-white/[0.03] text-primary">
                                    <Icon className="h-4 w-4" />
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="flex items-center gap-2">
                                      <span className="text-[13.5px] font-semibold text-foreground/92">
                                        {item.title}
                                      </span>
                                      {item.badge && (
                                        <span className="rounded-full border border-primary/24 bg-primary/10 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-primary">
                                          {item.badge}
                                        </span>
                                      )}
                                    </span>
                                    <span className="mt-1 block text-[11.5px] leading-relaxed text-muted-foreground">
                                      {item.description}
                                    </span>
                                  </span>
                                  <span className="mt-0.5 shrink-0 rounded-full border border-white/8 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-foreground/42">
                                    Soon
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/5 py-3.5 text-[15px] font-medium text-foreground/90 transition-colors hover:text-primary"
                  >
                    {l.label}
                    <ArrowRight className="h-4 w-4 opacity-60" />
                  </a>
                </li>
              ),
            )}
          </ul>
          <button
            type="button"
            aria-disabled="true"
            className="group relative mt-5 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-br from-primary to-primary-glow px-5 py-3.5 text-[13px] font-semibold text-primary-foreground transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:shadow-[0_18px_46px_-14px_oklch(0.78_0.13_215/0.72)] hover:brightness-[1.03]"
          >
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_18%,rgba(255,255,255,0.22)_42%,transparent_68%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            Naar configurator
            <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <div className="mt-4 flex flex-col gap-2 text-[13px] text-muted-foreground">
            <a
              href="mailto:info@reinas-bv.nl"
              className="inline-flex items-center gap-2 hover:text-foreground"
            >
              <Mail className="h-3.5 w-3.5 text-primary" />
              <span>info@reinas-bv.nl</span>
            </a>
            <a
              href={CONTACT_PHONE_HREF}
              className="inline-flex items-center gap-2 hover:text-foreground"
            >
              <Phone className="h-3.5 w-3.5 text-primary" />
              <span>{CONTACT_PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
