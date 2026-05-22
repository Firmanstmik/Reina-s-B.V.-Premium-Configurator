import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Mail, Phone, ShieldCheck, Truck, Home as HomeIcon } from "lucide-react";
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
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      {/* Top utility bar */}
      <div
        className={`w-full border-b border-white/5 bg-background/70 backdrop-blur-xl transition-all duration-500 ${
          scrolled ? "h-0 -translate-y-full overflow-hidden opacity-0" : "opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-7 px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:justify-end md:gap-9">
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
            <span className="normal-case tracking-normal">info@reinas-bv.nl</span>
          </a>
          <a href="tel:+31000000000" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
            <Phone className="h-3.5 w-3.5 text-primary" />
            <span className="normal-case tracking-normal">+31 (0) 00 000 0000</span>
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <div
        className={`w-full border-b border-white/[0.06] transition-all duration-500 ${
          scrolled ? "bg-background/85 backdrop-blur-2xl shadow-[0_10px_40px_-20px_oklch(0_0_0/0.7)]" : "bg-background/40 backdrop-blur-xl"
        }`}
      >
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <img src={logo} alt="Reina's B.V." className="h-11 w-11 object-contain" />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-[15px] font-semibold tracking-[0.04em]">REINA&apos;S B.V.</span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
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
                  className="group relative inline-flex items-center gap-1 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground/85 transition-colors hover:text-primary"
                >
                  {l.label}
                  {l.hasMenu && <ChevronDown className="h-3 w-3 opacity-70" />}
                  <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.78_0.13_215/0.55)] transition-all hover:shadow-[0_18px_50px_-12px_oklch(0.78_0.13_215/0.75)]"
          >
            Offerte aanvragen
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </nav>
      </div>
    </header>
  );
}
