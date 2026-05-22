import { useState } from "react";
import { ArrowRight, Eye, Sparkles, Zap } from "lucide-react";
import previewImg from "@/assets/configurator-preview.jpg";

const steps = ["Type", "Stijl", "Kleur", "Glas", "Details"];
const colors = [
  { name: "Antracietgrijs", code: "RAL 7016", hex: "#2b3033" },
  { name: "Warm grijs", code: "RAL 7030", hex: "#8c8479" },
  { name: "Diep zwart", code: "RAL 9005", hex: "#0e0e0e" },
  { name: "Olijfgroen", code: "RAL 6003", hex: "#4f5135" },
  { name: "Wit", code: "RAL 9016", hex: "#f1f0ea" },
];
const materials = ["Aluminium", "Kunststof", "Hout"];

export function Configurator() {
  const [step, setStep] = useState(2);
  const [color, setColor] = useState(0);
  const [material, setMaterial] = useState(0);

  return (
    <section id="configurator" className="relative overflow-hidden px-4 py-28 md:px-6 md:py-40">
      <div className="absolute inset-x-0 top-0 h-[40%] gradient-radial-glow" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        {/* Left copy */}
        <div className="flex flex-col justify-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-primary">Ontwerp uw kozijnen</p>
          <h2 className="font-display mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-tight">
            Stel uw kozijnen samen in slechts{" "}
            <span className="font-serif-italic gradient-text">enkele stappen.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Gebruik onze configurator en ontdek direct de mogelijkheden. Kies stijl, kleur,
            materiaal en bekijk een realistische preview van uw ontwerp.
          </p>

          <a
            href="#contact"
            className="group mt-10 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_20px_60px_-15px_oklch(0.78_0.13_215/0.7)]"
          >
            Start configurator
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <div className="mt-14 grid grid-cols-3 gap-6">
            {[
              { icon: Eye, t: "Real-time preview", b: "Zie direct het resultaat van uw keuzes." },
              { icon: Zap, t: "Eenvoudig & snel", b: "Binnen enkele minuten een compleet ontwerp." },
              { icon: Sparkles, t: "Vrijblijvend", b: "Ontvang vrijblijvend een offerte op maat." },
            ].map((s) => (
              <div key={s.t}>
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/25">
                  <s.icon className="h-4 w-4" />
                </div>
                <p className="mt-3 text-sm font-semibold">{s.t}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right configurator UI */}
        <div className="glass-strong relative overflow-hidden rounded-3xl p-2 shadow-[var(--shadow-elevated)]">
          {/* Step tabs */}
          <div className="flex items-center gap-1 border-b border-white/10 px-5 py-4">
            {steps.map((s, i) => (
              <button
                key={s}
                onClick={() => setStep(i)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                  i === step
                    ? "bg-white/10 text-foreground ring-1 ring-primary/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-primary">{i + 1}.</span> {s}
              </button>
            ))}
          </div>

          <div className="grid gap-2 p-2 lg:grid-cols-[1fr_1.4fr]">
            {/* Controls */}
            <div className="space-y-7 p-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Kies uw kleur</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {colors.map((c, i) => (
                    <button
                      key={c.code}
                      onClick={() => setColor(i)}
                      className={`relative h-11 w-11 overflow-hidden rounded-lg ring-1 transition-all ${
                        color === i ? "ring-2 ring-primary scale-105" : "ring-white/10 hover:ring-white/30"
                      }`}
                      style={{ background: c.hex }}
                      aria-label={c.name}
                    />
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {colors[color].name} <span className="opacity-60">({colors[color].code})</span>
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Materiaal</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {materials.map((m, i) => (
                    <button
                      key={m}
                      onClick={() => setMaterial(i)}
                      className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
                        material === i
                          ? "bg-primary/15 text-primary ring-1 ring-primary"
                          : "bg-white/5 text-muted-foreground ring-1 ring-white/10 hover:text-foreground"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Profiel</p>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={i}
                      className={`grid aspect-[3/4] place-items-center rounded-lg ring-1 transition-all ${
                        i === 0 ? "bg-white/10 ring-primary" : "bg-white/[0.02] ring-white/10 hover:bg-white/5"
                      }`}
                    >
                      <div className="grid h-6 w-6 grid-cols-2 grid-rows-2 gap-[2px] rounded-sm bg-foreground/15 p-[2px]">
                        <div className="rounded-[1px] bg-foreground/40" />
                        {i > 0 && <div className="rounded-[1px] bg-foreground/40" />}
                        {i > 1 && <div className="rounded-[1px] bg-foreground/40" />}
                        {i > 2 && <div className="rounded-[1px] bg-foreground/40" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="relative overflow-hidden rounded-2xl">
              <img src={previewImg} alt="Configurator preview" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div
                className="absolute inset-x-6 bottom-6 flex items-center justify-between rounded-xl px-4 py-3 backdrop-blur-xl"
                style={{ background: "oklch(0.16 0.012 240 / 0.7)", border: "1px solid oklch(1 0 0 / 0.08)" }}
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Uw samenstelling</p>
                  <p className="mt-1 text-xs font-medium">
                    1× Schuifpui · {materials[material]} · 4500 × 2200 mm
                  </p>
                </div>
                <button className="rounded-lg bg-gradient-to-br from-primary to-primary-glow px-4 py-2 text-xs font-semibold text-primary-foreground">
                  Offerte aanvragen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
