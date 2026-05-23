import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Eye,
  Sparkles,
  Zap,
  DoorOpen,
  Square,
  PanelTop,
  Maximize2,
} from "lucide-react";
import sceneSchuifpui from "@/assets/cfg-type-schuifpui.jpg";
import sceneKozijn from "@/assets/cfg-type-kozijn.jpg";
import sceneVoordeur from "@/assets/cfg-type-voordeur.jpg";
import scenePanorama from "@/assets/cfg-type-panorama.jpg";

/* ------------------------------------------------------------------ */
/*  Config domain                                                      */
/* ------------------------------------------------------------------ */

type Material = "Aluminium" | "Kunststof" | "Hout";
type StyleName = "Modern" | "Klassiek" | "Industrieel";

const TYPES = [
  { id: "schuifpui", name: "Schuifpui", icon: PanelTop, dim: "4500 × 2200 mm", cols: 4, rows: 1 },
  { id: "kozijn",    name: "Kozijn",    icon: Square,   dim: "1800 × 1400 mm", cols: 2, rows: 2 },
  { id: "voordeur",  name: "Voordeur",  icon: DoorOpen, dim: "1100 × 2300 mm", cols: 1, rows: 3 },
  { id: "panorama",  name: "Panorama",  icon: Maximize2,dim: "6000 × 2400 mm", cols: 6, rows: 1 },
] as const;

const STYLES: { id: StyleName; desc: string }[] = [
  { id: "Modern",       desc: "Strakke smalle profielen" },
  { id: "Klassiek",     desc: "Warme, tijdloze indeling" },
  { id: "Industrieel",  desc: "Stalen-look met raster" },
];

const COLORS = [
  { name: "Antraciet",   code: "RAL 7016", hex: "#2b3035", sheen: "#3c434a" },
  { name: "Mat zwart",   code: "RAL 9005", hex: "#0e0e10", sheen: "#23232a" },
  { name: "Warm wit",    code: "RAL 9016", hex: "#f1ede4", sheen: "#ffffff" },
  { name: "Olijfgroen",  code: "RAL 6003", hex: "#4a5238", sheen: "#65704c" },
  { name: "Premium grijs",code: "RAL 7030", hex: "#7e7a72", sheen: "#9a958c" },
  { name: "Champagne",   code: "DB 703",   hex: "#a2906f", sheen: "#c9b693" },
] as const;

const MATERIALS: { id: Material; desc: string; sheen: number }[] = [
  { id: "Aluminium", desc: "Slank, koel, premium",     sheen: 0.85 },
  { id: "Kunststof", desc: "Onderhoudsarm, isolerend", sheen: 0.45 },
  { id: "Hout",      desc: "Warm, natuurlijk karakter",sheen: 0.25 },
];

const GLASS = [
  { id: "hrpp",     name: "HR++",        desc: "Standaard isolatie",  tint: "#bcd6e2", opacity: 0.18, reflect: 0.55 },
  { id: "triple",   name: "Triple glas", desc: "Maximale isolatie",   tint: "#b4cfdc", opacity: 0.22, reflect: 0.62 },
  { id: "privacy",  name: "Privacy",     desc: "Mat satijn",          tint: "#dde6ea", opacity: 0.55, reflect: 0.35 },
  { id: "tinted",   name: "Getint",      desc: "Zonwerend grijs",     tint: "#3a4148", opacity: 0.55, reflect: 0.40 },
  { id: "panoramic",name: "Panoramisch", desc: "Ultraheldere coating",tint: "#a8c8d8", opacity: 0.10, reflect: 0.75 },
] as const;

const STEPS = ["Type", "Stijl", "Kleur", "Glas", "Details", "Samenvatting"] as const;

/* ------------------------------------------------------------------ */
/*  Photorealistic per-type scenes                                     */
/* ------------------------------------------------------------------ */

const TYPE_SCENES: Record<typeof TYPES[number]["id"], string> = {
  schuifpui: sceneSchuifpui,
  kozijn: sceneKozijn,
  voordeur: sceneVoordeur,
  panorama: scenePanorama,
};

/* Per-type cinematic "mood" — ambient color, tagline & atmosphere tuning.
   Each type triggers a unique lighting morph in the live preview. */
const TYPE_MOODS: Record<
  typeof TYPES[number]["id"],
  { tag: string; ambient: string; warm: string; filter: string }
> = {
  schuifpui: {
    tag: "Golden hour · tuin",
    ambient: "#f6b66b",
    warm: "#ffd9a8",
    filter: "saturate(1.06) contrast(1.04) brightness(1.0)",
  },
  kozijn: {
    tag: "Soft morning · intiem",
    ambient: "#e8c79a",
    warm: "#f1e2c4",
    filter: "saturate(1.0) contrast(1.05) brightness(1.02)",
  },
  voordeur: {
    tag: "Twilight · entree",
    ambient: "#ff8a4c",
    warm: "#ffb37a",
    filter: "saturate(1.1) contrast(1.1) brightness(0.96)",
  },
  panorama: {
    tag: "Cinematic · horizon",
    ambient: "#7fb7d8",
    warm: "#cfe3ee",
    filter: "saturate(1.05) contrast(1.05) brightness(1.02)",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Configurator() {
  const [step, setStep]       = useState(0);
  const [typeId, setTypeId]   = useState<typeof TYPES[number]["id"]>(TYPES[0].id);
  const [styleId, setStyleId] = useState<StyleName>("Modern");
  const [colorIx, setColorIx] = useState(0);
  const [matIx, setMatIx]     = useState(0);
  const [glassIx, setGlassIx] = useState(0);
  const [profile, setProfile] = useState(0); // 0..3 — adds row density

  // Cinematic parallax — tracks pointer over the preview stage
  const stageRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const onStageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    setParallax({ x: nx * -18, y: ny * -10 });
  };
  const onStageLeave = () => setParallax({ x: 0, y: 0 });

  const type    = TYPES.find((t) => t.id === typeId)!;
  const color   = COLORS[colorIx];
  const mat     = MATERIALS[matIx];
  const glass   = GLASS[glassIx];
  const mood    = TYPE_MOODS[typeId];

  // Indicative price estimate (richt-prijs)
  const price = useMemo(() => {
    const base =
      typeId === "panorama" ? 4800 :
      typeId === "schuifpui" ? 3600 :
      typeId === "voordeur"  ? 2400 : 1450;
    const matMul = mat.id === "Aluminium" ? 1.25 : mat.id === "Hout" ? 1.35 : 1;
    const glassAdd =
      glass.id === "triple" ? 420 :
      glass.id === "panoramic" ? 580 :
      glass.id === "privacy" || glass.id === "tinted" ? 260 : 0;
    const styleAdd = styleId === "Industrieel" ? 320 : styleId === "Klassiek" ? 180 : 0;
    return Math.round((base * matMul + glassAdd + styleAdd) / 10) * 10;
  }, [typeId, mat.id, glass.id, styleId]);

  const goNext = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const goPrev = () => setStep((s) => Math.max(0, s - 1));

  return (
    <section id="configurator" className="relative overflow-hidden px-4 py-24 md:px-6 md:py-36">
      <div className="absolute inset-x-0 top-0 h-[60%] gradient-radial-glow" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-primary">Live configurator</p>
          <h2 className="font-display mt-4 text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-tight">
            Ontwerp uw kozijn,{" "}
            <span className="font-serif-italic gradient-text">in real-time.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Selecteer type, stijl, kleur, materiaal en glas. De preview reageert direct,
            net als bij een Tesla of Apple configurator. Volledig vrijblijvend.
          </p>
        </div>

        {/* Stepper */}
        <div className="mt-12 flex justify-center">
          <ol className="glass relative flex w-full max-w-3xl items-center justify-between gap-1 rounded-2xl p-1.5">
            {STEPS.map((s, i) => {
              const active = i === step;
              const done = i < step;
              return (
                <li key={s} className="flex-1">
                  <button
                    onClick={() => setStep(i)}
                    className={`group relative flex w-full items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-[11.5px] font-medium tracking-[0.04em] transition-all md:px-3 md:text-[12.5px] ${
                      active
                        ? "bg-gradient-to-br from-primary/25 to-primary/5 text-foreground ring-1 ring-primary/50 shadow-[0_0_30px_-8px_oklch(0.78_0.13_215/0.6)]"
                        : done
                        ? "text-foreground/80 hover:text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-full text-[10px] transition-all ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : done
                          ? "bg-primary/30 text-primary"
                          : "bg-white/5 text-muted-foreground"
                      }`}
                    >
                      {done ? <Check className="h-3 w-3" /> : i + 1}
                    </span>
                    <span className="hidden sm:inline">{s}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Main grid */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_1.4fr] lg:gap-8">
          {/* ---------- Controls panel ---------- */}
          <div className="glass-strong relative flex flex-col overflow-hidden rounded-3xl p-7 shadow-[var(--shadow-elevated)] md:p-9">
            <div key={step} className="slide-pull-left flex-1">
              {step === 0 && (
                <ControlGroup
                  title="Kies uw type"
                  subtitle="Het uitgangspunt van uw ontwerp"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {TYPES.map((t) => {
                      const sel = t.id === typeId;
                      const Icon = t.icon;
                      const m = TYPE_MOODS[t.id];
                      return (
                        <button
                          key={t.id}
                          onClick={() => setTypeId(t.id)}
                          className={`group relative overflow-hidden rounded-2xl text-left ring-1 transition-all duration-500 ${
                            sel
                              ? "ring-primary shadow-[0_0_0_1px_oklch(0.78_0.13_215/0.55),0_20px_60px_-18px_oklch(0.78_0.13_215/0.75)] -translate-y-0.5"
                              : "ring-white/10 hover:ring-white/25 hover:-translate-y-0.5"
                          }`}
                        >
                          {/* Mini cinematic thumbnail */}
                          <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <img
                              src={TYPE_SCENES[t.id]}
                              alt={t.name}
                              loading="lazy"
                              draggable={false}
                              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${sel ? "scale-110" : "scale-100 group-hover:scale-105"}`}
                              style={{ filter: sel ? "saturate(1.08) contrast(1.04)" : "saturate(0.85) brightness(0.85)" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                            <div
                              className="pointer-events-none absolute inset-0 transition-opacity duration-700"
                              style={{
                                background: `radial-gradient(80% 60% at 50% 100%, ${m.ambient}55, transparent 70%)`,
                                opacity: sel ? 1 : 0.4,
                                mixBlendMode: "screen",
                              }}
                            />
                            <div className={`absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-lg backdrop-blur-md ring-1 transition-all ${sel ? "bg-primary/25 text-primary ring-primary/50" : "bg-background/60 text-foreground/80 ring-white/15"}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            {sel && (
                              <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_18px_oklch(0.78_0.13_215/0.7)]">
                                <Check className="h-3.5 w-3.5" />
                              </span>
                            )}
                          </div>
                          <div className="relative p-3.5">
                            <p className="text-sm font-semibold tracking-tight">{t.name}</p>
                            <p className="mt-0.5 text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">{m.tag}</p>
                            <p className="mt-1.5 text-[11px] text-muted-foreground/80">{t.dim}</p>
                          </div>
                          {/* Luxury neon edge on active */}
                          {sel && (
                            <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/40" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </ControlGroup>
              )}

              {step === 1 && (
                <ControlGroup title="Kies een stijl" subtitle="Bepaalt de profieldikte en sfeer">
                  <div className="space-y-3">
                    {STYLES.map((s) => {
                      const sel = s.id === styleId;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setStyleId(s.id)}
                          className={`flex w-full items-center justify-between rounded-2xl p-4 text-left ring-1 transition-all ${
                            sel
                              ? "bg-primary/10 ring-primary shadow-[0_0_30px_-12px_oklch(0.78_0.13_215/0.7)]"
                              : "bg-white/[0.03] ring-white/10 hover:bg-white/[0.06]"
                          }`}
                        >
                          <div>
                            <p className="text-sm font-semibold">{s.id}</p>
                            <p className="mt-0.5 text-[12px] text-muted-foreground">{s.desc}</p>
                          </div>
                          <span className={`grid h-6 w-6 place-items-center rounded-full transition-colors ${sel ? "bg-primary text-primary-foreground" : "bg-white/10 text-muted-foreground"}`}>
                            {sel ? <Check className="h-3.5 w-3.5" /> : ""}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </ControlGroup>
              )}

              {step === 2 && (
                <ControlGroup title="Kleur & materiaal" subtitle="Voelt direct anders aan in preview">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Kleur</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {COLORS.map((c, i) => {
                        const sel = i === colorIx;
                        return (
                          <button
                            key={c.code}
                            onClick={() => setColorIx(i)}
                            aria-label={c.name}
                            className={`group relative h-12 w-12 overflow-hidden rounded-xl transition-all ${
                              sel ? "scale-110 ring-2 ring-primary shadow-[0_0_20px_oklch(0.78_0.13_215/0.6)]" : "ring-1 ring-white/15 hover:scale-105 hover:ring-white/35"
                            }`}
                            style={{
                              background: `linear-gradient(135deg, ${c.sheen} 0%, ${c.hex} 45%, ${c.hex} 100%)`,
                            }}
                          >
                            {sel && (
                              <span className="absolute inset-0 grid place-items-center">
                                <Check className="h-4 w-4 text-white drop-shadow" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      <span className="text-foreground">{color.name}</span> · {color.code}
                    </p>
                  </div>

                  <div className="mt-7">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Materiaal</p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {MATERIALS.map((m, i) => {
                        const sel = i === matIx;
                        return (
                          <button
                            key={m.id}
                            onClick={() => setMatIx(i)}
                            className={`rounded-xl p-3 text-left ring-1 transition-all ${
                              sel
                                ? "bg-primary/10 ring-primary"
                                : "bg-white/[0.03] ring-white/10 hover:bg-white/[0.06]"
                            }`}
                          >
                            <p className="text-[13px] font-semibold">{m.id}</p>
                            <p className="mt-0.5 text-[10.5px] leading-snug text-muted-foreground">{m.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </ControlGroup>
              )}

              {step === 3 && (
                <ControlGroup title="Glas" subtitle="Isolatie, privacy en lichtinval">
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {GLASS.map((g, i) => {
                      const sel = i === glassIx;
                      return (
                        <button
                          key={g.id}
                          onClick={() => setGlassIx(i)}
                          className={`flex items-center gap-3 rounded-xl p-3 text-left ring-1 transition-all ${
                            sel ? "bg-primary/10 ring-primary" : "bg-white/[0.03] ring-white/10 hover:bg-white/[0.06]"
                          }`}
                        >
                          <span
                            className="grid h-9 w-9 place-items-center rounded-lg ring-1 ring-white/20"
                            style={{ background: `linear-gradient(135deg, #ffffff22, ${g.tint})` }}
                          >
                            <span className="h-3 w-3 rounded-sm bg-white/60" />
                          </span>
                          <div>
                            <p className="text-[13px] font-semibold">{g.name}</p>
                            <p className="text-[11px] text-muted-foreground">{g.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </ControlGroup>
              )}

              {step === 4 && (
                <ControlGroup title="Profiel & detail" subtitle="Indeling van glasvlakken">
                  <div className="grid grid-cols-4 gap-2.5">
                    {[0, 1, 2, 3].map((i) => {
                      const sel = i === profile;
                      return (
                        <button
                          key={i}
                          onClick={() => setProfile(i)}
                          className={`grid aspect-[3/4] place-items-center rounded-xl ring-1 transition-all ${
                            sel
                              ? "bg-primary/10 ring-primary shadow-[0_0_25px_-10px_oklch(0.78_0.13_215/0.7)]"
                              : "bg-white/[0.03] ring-white/10 hover:bg-white/[0.06]"
                          }`}
                        >
                          <div
                            className="grid h-10 w-10 gap-[2px] rounded-sm p-[2px]"
                            style={{
                              gridTemplateRows: `repeat(${i + 1}, 1fr)`,
                              gridTemplateColumns: `repeat(${Math.min(i + 1, 2)}, 1fr)`,
                              background: "oklch(1 0 0 / 0.06)",
                            }}
                          >
                            {Array.from({ length: (i + 1) * Math.min(i + 1, 2) }).map((_, k) => (
                              <div key={k} className="rounded-[1px] bg-foreground/40" />
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </ControlGroup>
              )}

              {step === 5 && (
                <ControlGroup title="Samenvatting" subtitle="Klaar om aan te vragen">
                  <ul className="space-y-2.5 text-sm">
                    {[
                      ["Type", type.name],
                      ["Stijl", styleId],
                      ["Kleur", `${color.name} (${color.code})`],
                      ["Materiaal", mat.id],
                      ["Glas", glass.name],
                      ["Afmeting", type.dim],
                    ].map(([k, v]) => (
                      <li key={k} className="flex items-center justify-between border-b border-white/5 pb-2.5">
                        <span className="text-muted-foreground">{k}</span>
                        <span className="font-medium">{v}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Premium price card */}
                  <div className="relative mt-6 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-5">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/25 blur-3xl" />
                    <div className="relative flex items-end justify-between">
                      <div>
                        <p className="text-[10.5px] uppercase tracking-[0.22em] text-primary">Indicatieve richtprijs</p>
                        <p className="font-display mt-1.5 text-3xl font-medium tracking-tight">
                          € {price.toLocaleString("nl-NL")}
                        </p>
                        <p className="mt-1 text-[11px] text-muted-foreground">Excl. BTW, incl. montage in Limburg</p>
                      </div>
                      <span className="rounded-full bg-primary/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary ring-1 ring-primary/40">
                        Vrijblijvend
                      </span>
                    </div>
                  </div>
                </ControlGroup>
              )}
            </div>

            {/* Nav buttons */}
            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                onClick={goPrev}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-medium text-muted-foreground transition-all hover:text-foreground disabled:opacity-30"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Vorige
              </button>

              {step < STEPS.length - 1 ? (
                <button
                  onClick={goNext}
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow px-6 py-2.5 text-[13px] font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.78_0.13_215/0.55)] transition-all hover:shadow-[0_18px_50px_-12px_oklch(0.78_0.13_215/0.75)]"
                >
                  Volgende
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              ) : (
                <a
                  href="#contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-glow px-6 py-2.5 text-[13px] font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.78_0.13_215/0.55)] transition-all hover:shadow-[0_22px_60px_-14px_oklch(0.78_0.13_215/0.8)] pulse-glow"
                >
                  Offerte aanvragen
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          </div>

          {/* ---------- Live preview ---------- */}
          <div className="relative">
            {/* Outer ambient halo — reacts to selected color */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] opacity-80 blur-3xl transition-all duration-1000"
              style={{
                background: `radial-gradient(55% 55% at 25% 30%, ${mood.ambient}55, transparent 70%), radial-gradient(60% 60% at 80% 75%, ${color.hex}44, transparent 70%), radial-gradient(40% 40% at 50% 50%, oklch(0.78 0.13 215 / 0.28), transparent 70%)`,
              }}
            />
            <div
              ref={stageRef}
              onMouseMove={onStageMove}
              onMouseLeave={onStageLeave}
              className="glass-strong relative overflow-hidden rounded-3xl shadow-[var(--shadow-elevated)] ring-1 ring-white/10"
            >
              {/* Cinematic per-type scene stack */}
              <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/11]">
                {/* Photorealistic scene layers — crossfade on TYPE change */}
                {(Object.keys(TYPE_SCENES) as Array<keyof typeof TYPE_SCENES>).map((id) => {
                  const active = id === typeId;
                  const matFilter =
                    mat.id === "Hout"
                      ? "saturate(1.08) brightness(1.02) contrast(1.02) sepia(0.06)"
                      : mat.id === "Kunststof"
                      ? "saturate(0.95) brightness(1.03) contrast(1.0)"
                      : "saturate(1.04) brightness(1.0) contrast(1.04)";
                  const typeFilter = TYPE_MOODS[id].filter;
                  return (
                    <img
                      key={id}
                      src={TYPE_SCENES[id]}
                      alt={`${id} architectuurfoto`}
                      loading="lazy"
                      width={1600}
                      height={1088}
                      draggable={false}
                      className="absolute inset-0 h-full w-full select-none object-cover"
                      style={{
                        opacity: active ? 1 : 0,
                        transform: `translate3d(${parallax.x * 0.2}px, ${parallax.y * 0.2}px, 0) scale(${active ? 1.04 : 1.12})`,
                        filter: active ? `${matFilter} ${typeFilter}` : `${matFilter} ${typeFilter} blur(14px)`,
                        transition:
                          "opacity 1100ms cubic-bezier(0.22,1,0.36,1), transform 1600ms cubic-bezier(0.22,1,0.36,1), filter 1100ms ease",
                        willChange: "opacity, transform, filter",
                      }}
                    />
                  );
                })}

                {/* Per-type ambient atmosphere — morphs lighting mood */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 transition-all duration-[1100ms]"
                  style={{
                    background: `radial-gradient(80% 60% at 50% 0%, ${mood.warm}33, transparent 60%), radial-gradient(70% 55% at 50% 100%, ${mood.ambient}40, transparent 70%)`,
                    mixBlendMode: "screen",
                  }}
                />

                {/* Cinematic transition flash on type change */}
                <div
                  key={`flash-${typeId}`}
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(60% 50% at 50% 50%, ${mood.warm}, transparent 70%)`,
                    mixBlendMode: "screen",
                    animation: "cfgFlash 1100ms cubic-bezier(0.22,1,0.36,1) both",
                  }}
                />

                {/* FRAME COLOR CAST — repaints the dark frames in the photo.
                    `color` blend preserves luminance, so dark frames pick up hue
                    while the bright sky/grass through the glass barely shifts. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 transition-all duration-700"
                  style={{
                    background: color.hex,
                    mixBlendMode: "color",
                    opacity: 0.55,
                  }}
                />
                {/* Specular highlight that follows frame color */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 transition-all duration-700"
                  style={{
                    background: `linear-gradient(150deg, ${color.sheen}55 0%, transparent 35%)`,
                    mixBlendMode: "screen",
                    opacity: mat.id === "Aluminium" ? 0.7 : mat.id === "Kunststof" ? 0.45 : 0.25,
                  }}
                />

                {/* GLASS atmosphere — tints daylight coming through the windows */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 transition-all duration-700"
                  style={{
                    background: glass.tint,
                    mixBlendMode: "multiply",
                    opacity: glass.opacity * 0.65,
                  }}
                />
                {/* Frosted privacy bloom */}
                {glass.id === "privacy" && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 transition-all duration-700"
                    style={{
                      background:
                        "radial-gradient(60% 50% at 50% 45%, rgba(255,255,255,0.28), transparent 75%)",
                      mixBlendMode: "screen",
                      backdropFilter: "blur(0.5px)",
                    }}
                  />
                )}
                {/* Panoramic crystal-clear coating bloom */}
                {glass.id === "panoramic" && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 transition-all duration-700"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(200,230,255,0.18), transparent 40%)",
                      mixBlendMode: "screen",
                    }}
                  />
                )}

                {/* Diagonal sweeping reflection across the glass */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{
                    background: `linear-gradient(115deg, transparent 35%, rgba(255,255,255,${0.08 * glass.reflect}) 50%, transparent 65%)`,
                    mixBlendMode: "screen",
                    transform: `translate3d(${parallax.x * 0.6}px, ${parallax.y * 0.4}px, 0)`,
                    transition: "transform 700ms cubic-bezier(0.22,1,0.36,1), background 900ms ease",
                  }}
                />

                {/* Cinematic vignette + bottom fade */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_30%,oklch(0.08_0.012_240/0.55)_95%)]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />

                {/* Color-reactive floor glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 transition-all duration-1000"
                  style={{
                    background: `radial-gradient(70% 50% at 50% 100%, ${color.hex}30, transparent 70%)`,
                    mixBlendMode: "screen",
                  }}
                />
                {/* Subtle cyan rim light */}
                <div className="pointer-events-none absolute -top-20 left-1/2 h-48 w-3/4 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

                {/* HUD chips */}
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  <Chip label="LIVE" dot />
                  <Chip label={type.name} />
                  <Chip label={mood.tag} />
                </div>

                {/* Material/Glass HUD — right side */}
                <div className="absolute right-5 top-5 flex flex-col items-end gap-2">
                  <Chip label={mat.id} />
                  <Chip label={glass.name} />
                </div>

                {/* Summary card */}
                <div
                  className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 backdrop-blur-2xl"
                  style={{ background: "oklch(0.14 0.012 240 / 0.7)", border: "1px solid oklch(1 0 0 / 0.08)" }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-10 w-10 rounded-lg ring-1 ring-white/20 transition-all duration-700"
                      style={{
                        background: `linear-gradient(135deg, ${color.sheen} 0%, ${color.hex} 55%, #000 130%)`,
                        boxShadow: `inset 0 1px 0 ${color.sheen}88, 0 6px 18px -6px ${color.hex}aa`,
                      }}
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        Uw samenstelling · <span className="text-primary">€ {price.toLocaleString("nl-NL")}</span>
                      </p>
                      <p className="mt-0.5 truncate text-[12.5px] font-medium">
                        {type.name} · {mat.id} · {color.name} · {glass.name}
                      </p>
                    </div>
                  </div>
                  <a
                    href="#contact"
                    className="hidden shrink-0 rounded-xl bg-gradient-to-br from-primary to-primary-glow px-4 py-2 text-[12px] font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.78_0.13_215/0.6)] sm:inline-flex"
                  >
                    Offerte
                  </a>
                </div>
              </div>
            </div>

            {/* Micro features under preview */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { icon: Eye,       t: "Real-time preview", b: "Direct visueel resultaat." },
                { icon: Zap,       t: "In enkele minuten", b: "Eenvoudig en snel." },
                { icon: Sparkles,  t: "Vrijblijvend",      b: "Persoonlijke offerte." },
              ].map((s) => (
                <div key={s.t} className="glass rounded-2xl p-4">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/25">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <p className="mt-3 text-[12.5px] font-semibold">{s.t}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{s.b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function ControlGroup({
  title, subtitle, children,
}: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.22em] text-primary">{subtitle}</p>
      <h3 className="font-display mt-2 text-[1.5rem] font-medium leading-tight tracking-tight">{title}</h3>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Chip({ label, dot }: { label: string; dot?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-background/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/90 ring-1 ring-white/15 backdrop-blur-md">
      {dot && <span className="relative grid h-1.5 w-1.5 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      </span>}
      {label}
    </span>
  );
}
