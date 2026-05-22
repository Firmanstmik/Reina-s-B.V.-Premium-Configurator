import { useState } from "react";
import { ArrowRight, Building2, Home } from "lucide-react";
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
    <section className="relative -mt-24 px-4 md:-mt-32 md:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Segmented toggle */}
        <div className="glass-strong relative mx-auto flex w-full max-w-3xl items-center rounded-full p-1.5 shadow-[var(--shadow-elevated)]">
          <div
            className={`pointer-events-none absolute inset-y-1.5 w-[calc(50%-6px)] rounded-full bg-gradient-to-br from-primary to-primary-glow shadow-[0_10px_30px_-10px_oklch(0.78_0.13_215/0.7)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
            style={{ transform: active === "zakelijk" ? "translateX(100%)" : "translateX(0)" }}
          />
          {(["particulier", "zakelijk"] as const).map((k) => {
            const Icon = k === "particulier" ? Home : Building2;
            const isActive = active === k;
            return (
              <button
                key={k}
                onClick={() => setActive(k)}
                className={`relative z-10 flex flex-1 items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors duration-500 ${
                  isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="uppercase tracking-[0.18em] text-[12px]">{k}</span>
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <div className="glass-strong mt-6 grid overflow-hidden rounded-3xl shadow-[var(--shadow-elevated)] lg:grid-cols-2">
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
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:bg-primary hover:text-primary-foreground"
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
