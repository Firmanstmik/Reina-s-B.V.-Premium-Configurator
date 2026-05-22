import { useMemo, useState } from "react";
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
import previewImg from "@/assets/configurator-preview.jpg";

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
/*  Live SVG window preview                                            */
/* ------------------------------------------------------------------ */

function WindowPreview({
  cols, rows, color, sheen, material, glass, styleId,
}: {
  cols: number; rows: number;
  color: string; sheen: string;
  material: Material;
  glass: typeof GLASS[number];
  styleId: StyleName;
}) {
  // Frame thickness varies by style + material
  const baseFrame =
    styleId === "Industrieel" ? 28 :
    styleId === "Klassiek"   ? 22 : 14;
  const frame = baseFrame + (material === "Hout" ? 6 : material === "Kunststof" ? 3 : 0);
  const mullion = Math.max(7, frame * 0.6);

  const W = 800, H = 520;
  const innerX = frame, innerY = frame;
  const innerW = W - frame * 2, innerH = H - frame * 2;
  const cellW = (innerW - mullion * (cols - 1)) / cols;
  const cellH = (innerH - mullion * (rows - 1)) / rows;

  // Material-driven optics
  const sheenStrength =
    material === "Aluminium" ? 0.95 : material === "Kunststof" ? 0.45 : 0.22;
  const roughness =
    material === "Hout" ? 0.75 : material === "Kunststof" ? 0.35 : 0.18;
  const isWood = material === "Hout";
  const isAlu  = material === "Aluminium";

  // Unique gradient IDs per render to avoid SVG cache collisions across re-renders
  const uid = `${material}-${color.replace("#", "")}-${glass.id}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="absolute inset-0 h-full w-full"
      style={{
        transition: "filter 900ms ease",
        filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.55)) drop-shadow(0 10px 20px rgba(0,0,0,0.35))",
      }}
    >
      <defs>
        {/* Frame — top-light gradient with sheen highlight */}
        <linearGradient id={`frame-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={sheen} stopOpacity={0.55 + sheenStrength * 0.35} />
          <stop offset="22%"  stopColor={color} />
          <stop offset="78%"  stopColor={color} />
          <stop offset="100%" stopColor="#000000" stopOpacity={0.55} />
        </linearGradient>
        {/* Subtle brushed-metal vertical streaks (aluminium only) */}
        <linearGradient id={`brush-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity={isAlu ? 0.05 : 0} />
          <stop offset="20%"  stopColor="#ffffff" stopOpacity={0} />
          <stop offset="50%"  stopColor="#ffffff" stopOpacity={isAlu ? 0.07 : 0} />
          <stop offset="80%"  stopColor="#ffffff" stopOpacity={0} />
          <stop offset="100%" stopColor="#000000" stopOpacity={isAlu ? 0.18 : 0.08} />
        </linearGradient>
        {/* Wood grain */}
        <linearGradient id={`wood-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#000" stopOpacity={isWood ? 0.18 : 0} />
          <stop offset="50%"  stopColor="#fff" stopOpacity={isWood ? 0.04 : 0} />
          <stop offset="100%" stopColor="#000" stopOpacity={isWood ? 0.22 : 0} />
        </linearGradient>

        {/* Glass — sky reflection + room shadow */}
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#cfe6f2" stopOpacity={0.35 * glass.reflect} />
          <stop offset="35%"  stopColor={glass.tint} stopOpacity={glass.opacity} />
          <stop offset="70%"  stopColor={glass.tint} stopOpacity={glass.opacity * 0.85} />
          <stop offset="100%" stopColor="#0a1018" stopOpacity={0.45} />
        </linearGradient>
        {/* Diagonal environment reflection (sky / clouds streak) */}
        <linearGradient id={`env-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stopColor="#ffffff" stopOpacity={0.0} />
          <stop offset="35%" stopColor="#ffffff" stopOpacity={0.16 * glass.reflect} />
          <stop offset="55%" stopColor="#ffffff" stopOpacity={0.35 * glass.reflect} />
          <stop offset="70%" stopColor="#ffffff" stopOpacity={0.10 * glass.reflect} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
        </linearGradient>
        {/* Bottom inner shadow (depth into the room) */}
        <linearGradient id={`depth-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#000" stopOpacity={0} />
          <stop offset="100%" stopColor="#000" stopOpacity={0.35} />
        </linearGradient>

        {/* Handle gradient */}
        <linearGradient id={`handle-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={sheen} stopOpacity={1} />
          <stop offset="50%"  stopColor={color} />
          <stop offset="100%" stopColor="#000" stopOpacity={0.5} />
        </linearGradient>

        {/* Soft bevel filter */}
        <filter id={`bevel-${uid}`} x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      {/* ===== Outer frame body ===== */}
      <rect x="0" y="0" width={W} height={H} rx="8" ry="8" fill={color} />
      <rect x="0" y="0" width={W} height={H} rx="8" ry="8" fill={`url(#frame-${uid})`} />
      {/* Material texture overlay */}
      {isAlu && (
        <rect x="0" y="0" width={W} height={H} rx="8" ry="8" fill={`url(#brush-${uid})`} opacity={0.9} />
      )}
      {isWood && (
        <>
          <rect x="0" y="0" width={W} height={H} rx="8" ry="8" fill={`url(#wood-${uid})`} />
          {/* faint wood grain lines */}
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={i}
              x1={0} y1={(i + 1) * (H / 15)}
              x2={W} y2={(i + 1) * (H / 15) + (i % 2 ? 1.5 : -1.2)}
              stroke="#000" strokeOpacity={0.07} strokeWidth={0.6}
            />
          ))}
        </>
      )}
      {/* Top highlight rim */}
      <rect x="0" y="0" width={W} height={2.5} fill="#ffffff" opacity={0.18 + sheenStrength * 0.25} />
      {/* Bottom shadow rim */}
      <rect x="0" y={H - 3} width={W} height={3} fill="#000" opacity={0.45} />
      {/* Left/right edge shading */}
      <rect x="0" y="0" width={3} height={H} fill="#fff" opacity={0.06 + sheenStrength * 0.06} />
      <rect x={W - 3} y="0" width={3} height={H} fill="#000" opacity={0.35} />

      {/* Inner opening shadow (gives the frame thickness) */}
      <rect
        x={innerX - 2} y={innerY - 2}
        width={innerW + 4} height={innerH + 4}
        fill="none" stroke="#000" strokeOpacity={0.55} strokeWidth="3"
        rx="2"
      />

      {/* ===== Glass cells ===== */}
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => {
          const x = innerX + c * (cellW + mullion);
          const y = innerY + r * (cellH + mullion);
          return (
            <g key={`${r}-${c}`} style={{ transition: "opacity 700ms ease" }}>
              {/* Glass base */}
              <rect x={x} y={y} width={cellW} height={cellH} fill={`url(#glass-${uid})`} />
              {/* Environment reflection streak */}
              <rect x={x} y={y} width={cellW} height={cellH} fill={`url(#env-${uid})`} />
              {/* Depth shadow toward bottom */}
              <rect x={x} y={y + cellH * 0.55} width={cellW} height={cellH * 0.45} fill={`url(#depth-${uid})`} />
              {/* Window cross reflection — silhouette */}
              <polygon
                points={`${x},${y + cellH * 0.18} ${x + cellW * 0.42},${y} ${x + cellW * 0.62},${y} ${x},${y + cellH * 0.52}`}
                fill="#ffffff"
                opacity={0.05 + glass.reflect * 0.10}
              />
              {/* Inner bevel — dark + light edge for depth */}
              <rect
                x={x + 0.5} y={y + 0.5}
                width={cellW - 1} height={cellH - 1}
                fill="none" stroke="#000" strokeOpacity={0.55} strokeWidth="1.2"
              />
              <rect
                x={x + 1.5} y={y + 1.5}
                width={cellW - 3} height={cellH - 3}
                fill="none" stroke="#ffffff" strokeOpacity={0.07} strokeWidth="0.8"
              />
              {/* Spacer bar (warm-edge) — premium IGU look */}
              <rect
                x={x + 3} y={y + 3}
                width={cellW - 6} height={cellH - 6}
                fill="none" stroke="#1a2026" strokeOpacity={0.5} strokeWidth="1"
              />
            </g>
          );
        })
      )}

      {/* Mullion highlights (vertical) */}
      {Array.from({ length: cols - 1 }).map((_, i) => {
        const x = innerX + (i + 1) * cellW + i * mullion;
        return (
          <g key={`mv-${i}`}>
            <rect x={x} y={innerY} width={mullion} height={innerH} fill={color} />
            <rect x={x} y={innerY} width={mullion} height={innerH} fill={`url(#frame-${uid})`} opacity={0.85} />
            <rect x={x} y={innerY} width={1} height={innerH} fill="#fff" opacity={0.18 + sheenStrength * 0.2} />
            <rect x={x + mullion - 1} y={innerY} width={1} height={innerH} fill="#000" opacity={0.4} />
          </g>
        );
      })}
      {/* Mullion highlights (horizontal) */}
      {Array.from({ length: rows - 1 }).map((_, i) => {
        const y = innerY + (i + 1) * cellH + i * mullion;
        return (
          <g key={`mh-${i}`}>
            <rect x={innerX} y={y} width={innerW} height={mullion} fill={color} />
            <rect x={innerX} y={y} width={innerW} height={mullion} fill={`url(#frame-${uid})`} opacity={0.85} />
            <rect x={innerX} y={y} width={innerW} height={1} fill="#fff" opacity={0.2 + sheenStrength * 0.2} />
            <rect x={innerX} y={y + mullion - 1} width={innerW} height={1} fill="#000" opacity={0.4} />
          </g>
        );
      })}

      {/* Premium handle */}
      <g filter={`url(#bevel-${uid})`}>
        <rect
          x={innerX + cellW - 30} y={innerY + cellH / 2 - 26}
          width="9" height="52" rx="4"
          fill={`url(#handle-${uid})`}
        />
        <rect
          x={innerX + cellW - 29} y={innerY + cellH / 2 - 25}
          width="2" height="50" rx="1"
          fill="#fff" opacity={0.35 + sheenStrength * 0.25}
        />
      </g>
    </svg>
  );
}

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

  const type    = TYPES.find((t) => t.id === typeId)!;
  const color   = COLORS[colorIx];
  const mat     = MATERIALS[matIx];
  const glass   = GLASS[glassIx];

  // Profile alters row density (adds horizontal bars)
  const effectiveRows = useMemo(() => Math.max(type.rows, profile + 1), [type.rows, profile]);

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
                      return (
                        <button
                          key={t.id}
                          onClick={() => setTypeId(t.id)}
                          className={`group relative overflow-hidden rounded-2xl p-4 text-left ring-1 transition-all ${
                            sel
                              ? "bg-primary/10 ring-primary shadow-[0_0_30px_-10px_oklch(0.78_0.13_215/0.65)]"
                              : "bg-white/[0.03] ring-white/10 hover:bg-white/[0.06] hover:ring-white/20"
                          }`}
                        >
                          <div className={`grid h-10 w-10 place-items-center rounded-xl transition-colors ${sel ? "bg-primary/20 text-primary" : "bg-white/5 text-foreground/70"}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <p className="mt-3 text-sm font-semibold">{t.name}</p>
                          <p className="mt-0.5 text-[11px] text-muted-foreground">{t.dim}</p>
                          {sel && <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-3 w-3" /></span>}
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
            <div className="glass-strong relative overflow-hidden rounded-3xl shadow-[var(--shadow-elevated)]">
              {/* Background scene */}
              <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/11]">
                <img
                  src={previewImg}
                  alt="Architectural scene"
                  className="absolute inset-0 h-full w-full scale-[1.06] object-cover ken-burns"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,transparent_0%,oklch(0.10_0.012_240/0.55)_75%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />

                {/* The configurable window — floats subtly */}
                <div
                  className="absolute inset-x-[8%] top-[10%] bottom-[18%] float-y"
                  style={{ filter: "drop-shadow(0 30px 40px rgba(0,0,0,.55))" }}
                >
                  <div key={`${typeId}-${styleId}-${matIx}-${colorIx}-${glassIx}-${profile}`} className="absolute inset-0 fade-in">
                    <WindowPreview
                      cols={type.cols}
                      rows={effectiveRows}
                      color={color.hex}
                      sheen={color.sheen}
                      material={mat.id}
                      glass={glass}
                      styleId={styleId}
                    />
                  </div>
                </div>

                {/* HUD chips */}
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  <Chip label="LIVE" dot />
                  <Chip label={type.name} />
                  <Chip label={styleId} />
                </div>

                {/* Summary card */}
                <div
                  className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 backdrop-blur-2xl"
                  style={{ background: "oklch(0.14 0.012 240 / 0.7)", border: "1px solid oklch(1 0 0 / 0.08)" }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-9 w-9 rounded-lg ring-1 ring-white/20 transition-all duration-500"
                      style={{ background: `linear-gradient(135deg, ${color.sheen}, ${color.hex})` }}
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Uw samenstelling</p>
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
