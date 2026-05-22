import { useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Home } from "lucide-react";
import particulierImg from "@/assets/particulier.jpg";
import zakelijkImg from "@/assets/zakelijk.jpg";

const data = {
  particulier: {
    eyebrow: "Voor particulieren",
    title: "Voor uw droomwoning of renovatieproject.",
    body: "Van maatwerk kozijnen en luxe schuifpuien tot energiezuinige voordeuren — wij realiseren oplossingen die uw woning mooier, warmer en waardevoller maken.",
    cta: "Plan een adviesgesprek",
    img: particulierImg,
    points: ["Maatwerk per woning", "Persoonlijke begeleiding", "Premium materialen"],
  },
  zakelijk: {
    eyebrow: "Voor bedrijven",
    title: "Oplossingen voor bedrijven en projecten.",
    body: "Van kantoorgebouwen tot bedrijfspanden en projectontwikkeling — wij leveren architecturale gevelsystemen op grote schaal, met strakke planning en betrouwbare oplevering.",
    cta: "Bespreek uw project",
    img: zakelijkImg,
    points: ["Project­management", "Schaalbare productie", "B2B partnerships"],
  },
};

export function SegmentSwitch() {
  const [active, setActive] = useState<"particulier" | "zakelijk">("particulier");
  const d = data[active];

  return (
    <section className="relative px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Content panel */}
        <div className="glass-strong mt-16 grid overflow-hidden rounded-2xl shadow-[var(--shadow-elevated)] lg:grid-cols-2">
          <div key={active} className="reveal-up flex flex-col justify-between gap-8 p-8 md:p-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-primary">{d.eyebrow}</p>
              <h3 className="font-display mt-4 text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
                {d.title}
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{d.body}</p>
              <ul className="mt-6 space-y-2.5">
                {d.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-foreground/85">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#contact"
              className="group inline-flex w-fit items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:bg-primary hover:text-primary-foreground"
            >
              {d.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div key={active + "img"} className="fade-in relative min-h-[280px] overflow-hidden lg:min-h-[420px]">
            <img src={d.img} alt={d.title} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Particulier / Zakelijk split bar used INSIDE Hero (bottom band) */
export function SegmentBar({
  active,
  onChange,
}: {
  active: "particulier" | "zakelijk";
  onChange: (v: "particulier" | "zakelijk") => void;
}) {
  const toggle = () =>
    onChange(active === "particulier" ? "zakelijk" : "particulier");
  return (
    <div className="glass-strong relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-2xl px-6 py-5 shadow-[var(--shadow-elevated)] md:px-8 md:py-6">
      {/* Particulier */}
      <button
        type="button"
        onClick={() => onChange("particulier")}
        className="group flex items-center gap-4 text-left"
      >
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ring-1 transition-all ${
            active === "particulier"
              ? "bg-primary/15 ring-primary/40 text-primary"
              : "bg-white/5 ring-white/10 text-foreground/70"
          }`}
        >
          <Home className="h-5 w-5" />
        </span>
        <span className="flex flex-col leading-tight">
          <span
            className={`text-[12px] font-semibold uppercase tracking-[0.22em] transition-colors ${
              active === "particulier" ? "text-primary" : "text-foreground/85"
            }`}
          >
            Particulier
          </span>
          <span className="mt-1 hidden text-xs text-muted-foreground md:inline">
            Voor uw droomwoning of renovatieproject.
          </span>
        </span>
      </button>

      {/* Center arrow control */}
      <div className="relative flex items-center justify-center">
        <span className="absolute h-16 w-16 rounded-full border border-primary/40" />
        <span className="absolute h-16 w-16 rounded-full bg-primary/10 blur-md" />
        <button
          type="button"
          onClick={toggle}
          aria-label="Wissel segment"
          className="relative z-10 grid h-14 w-14 place-items-center gap-1 rounded-full bg-background/80 ring-1 ring-primary/30 backdrop-blur transition-all hover:ring-primary"
        >
          <span className="flex items-center gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5 text-foreground/80" />
            <ArrowRight className="h-3.5 w-3.5 text-foreground/80" />
          </span>
        </button>
      </div>

      {/* Zakelijk */}
      <button
        type="button"
        onClick={() => onChange("zakelijk")}
        className="group flex items-center justify-end gap-4 text-right"
      >
        <span className="flex flex-col leading-tight">
          <span
            className={`text-[12px] font-semibold uppercase tracking-[0.22em] transition-colors ${
              active === "zakelijk" ? "text-primary" : "text-foreground/85"
            }`}
          >
            Zakelijk
          </span>
          <span className="mt-1 hidden text-xs text-muted-foreground md:inline">
            Oplossingen voor bedrijven en projecten.
          </span>
        </span>
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ring-1 transition-all ${
            active === "zakelijk"
              ? "bg-primary/15 ring-primary/40 text-primary"
              : "bg-white/5 ring-white/10 text-foreground/70"
          }`}
        >
          <Building2 className="h-5 w-5" />
        </span>
      </button>
    </div>
  );
}
