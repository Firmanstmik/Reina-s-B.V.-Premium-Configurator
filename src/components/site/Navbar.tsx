import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Mail, Menu, Phone, ShieldCheck, Truck, Home as HomeIcon, X } from "lucide-react";
import logo from "@/assets/logo.png";

const links = [
  { label: "Home", href: "#home" },
  { label: "Producten", href: "#producten", hasMenu: true },
  { label: "Diensten", href: "#diensten" },
  { label: "Projecten", href: "#projecten" },
  { label: "Over ons", href: "#over" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      {/* Top utility bar */}
      <div
        className={`w-full border-b border-white/5 bg-background/70 backdrop-blur-xl transition-all duration-500 ${
          scrolled ? "h-0 -translate-y-full overflow-hidden opacity-0" : "opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-7 px-6 py-2.5 text-[12px] tracking-[0.01em] text-muted-foreground md:justify-end md:gap-8">
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
          <a href="mailto:info@reinas-bv.nl" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
            <Mail className="h-3.5 w-3.5 text-primary" />
            info@reinas-bv.nl
          </a>
          <a href="tel:+31000000000" className="hidden items-center gap-2 transition-colors hover:text-foreground sm:inline-flex">
            <Phone className="h-3.5 w-3.5 text-primary" />
            +31 (0) 00 000 0000
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <div
        className={`w-full border-b border-white/[0.06] transition-all duration-500 ${
          scrolled ? "bg-background/85 backdrop-blur-2xl shadow-[0_10px_40px_-20px_oklch(0_0_0/0.7)]" : "bg-background/40 backdrop-blur-xl"
        }`}
      >
        <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-6 md:h-[76px]">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <img src={logo} alt="Reina's B.V." className="h-10 w-10 object-contain md:h-11 md:w-11" />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-[15px] font-semibold tracking-[0.02em]">Reina&apos;s B.V.</span>
              <span className="mt-1 text-[11px] tracking-[0.04em] text-muted-foreground">
                Mooier · sterker · zekerder
              </span>
            </span>
          </a>

          {/* Links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative inline-flex items-center gap-1 py-2 text-[13.5px] font-medium tracking-[0.01em] text-foreground/85 transition-colors hover:text-primary"
                >
                  {l.label}
                  {l.hasMenu && <ChevronDown className="h-3 w-3 opacity-70" />}
                  <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow px-5 py-2.5 text-[13px] font-semibold tracking-[0.01em] text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.78_0.13_215/0.55)] transition-all hover:shadow-[0_18px_50px_-12px_oklch(0.78_0.13_215/0.75)] md:inline-flex"
          >
            Offerte aanvragen
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Sluit menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-background/40 backdrop-blur-md transition-colors hover:border-primary/40 hover:text-primary lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[68px] origin-top transition-all duration-500 ${
          open ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="mx-4 mt-2 rounded-2xl glass-strong p-5 shadow-[var(--shadow-elevated)]">
          <ul className="flex flex-col">
            {links.map((l) => (
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
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow px-5 py-3.5 text-[13px] font-semibold text-primary-foreground"
          >
            Offerte aanvragen
            <ArrowRight className="h-4 w-4" />
          </a>
          <div className="mt-4 flex flex-col gap-2 text-[13px] text-muted-foreground">
            <a href="mailto:info@reinas-bv.nl" className="inline-flex items-center gap-2 hover:text-foreground">
              <Mail className="h-3.5 w-3.5 text-primary" /> info@reinas-bv.nl
            </a>
            <a href="tel:+31000000000" className="inline-flex items-center gap-2 hover:text-foreground">
              <Phone className="h-3.5 w-3.5 text-primary" /> +31 (0) 00 000 0000
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
