import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Producten", href: "#producten" },
  { label: "Projecten", href: "#projecten" },
  { label: "Configurator", href: "#configurator" },
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
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <nav
        className={`glass-strong flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ${
          scrolled ? "shadow-[0_20px_60px_-20px_oklch(0_0_0/0.6)]" : ""
        }`}
      >
        <a href="#home" className="flex items-center gap-2.5 pl-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 ring-1 ring-primary/30">
            <span className="font-display text-base font-semibold text-primary">R</span>
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-sm font-semibold tracking-tight">Reina&apos;s B.V.</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Mooier · sterker · zekerder</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-primary to-primary-glow px-5 py-2.5 text-[13px] font-semibold text-primary-foreground transition-all hover:shadow-[0_10px_40px_-10px_oklch(0.78_0.13_215/0.7)]"
        >
          Offerte aanvragen
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
        </a>
      </nav>
    </header>
  );
}
