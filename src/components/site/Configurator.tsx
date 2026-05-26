import { useEffect, useMemo, useRef, useState } from "react";
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
import schuifpuiModern from "@/assets/cfg-schuifpui-modern.avif";
import schuifpuiKlassiek from "@/assets/cfg-schuifpui-klassiek.avif";
import schuifpuiIndustrieel from "@/assets/cfg-schuifpui-industrieel.avif";
import kozijnModern from "@/assets/cfg-kozijn-modern.avif";
import kozijnKlassiek from "@/assets/cfg-kozijn-klassiek.avif";
import kozijnIndustrieel from "@/assets/cfg-kozijn-industrieel.avif";
import voordeurModern from "@/assets/cfg-voordeur-modern.avif";
import voordeurKlassiek from "@/assets/cfg-voordeur-klassiek.avif";
import voordeurIndustrieel from "@/assets/cfg-voordeur-industrieel.avif";
import panoramaModern from "@/assets/cfg-panorama-modern.avif";
import panoramaKlassiek from "@/assets/cfg-panorama-klassiek.avif";
import panoramaIndustrieel from "@/assets/cfg-panorama-industrieel.avif";
import { cn } from "@/lib/utils";
import { ImagesBadge } from "./ImagesBadge";
import { Reveal } from "./Reveal";

/* ------------------------------------------------------------------ */
/*  Config domain                                                      */
/* ------------------------------------------------------------------ */

type Material = "Aluminium" | "Kunststof" | "Hout";
type StyleName = "Modern" | "Klassiek" | "Industrieel";
type TypeId = (typeof TYPES)[number]["id"];

const TYPES = [
  { id: "schuifpui", name: "Schuifpui", icon: PanelTop, dim: "4500 × 2200 mm", cols: 4, rows: 1 },
  { id: "kozijn", name: "Kozijn", icon: Square, dim: "1800 × 1400 mm", cols: 2, rows: 2 },
  { id: "voordeur", name: "Voordeur", icon: DoorOpen, dim: "1100 × 2300 mm", cols: 1, rows: 3 },
  { id: "panorama", name: "Panorama", icon: Maximize2, dim: "6000 × 2400 mm", cols: 6, rows: 1 },
] as const;

const STYLES: { id: StyleName; desc: string; tag: string }[] = [
  { id: "Modern", desc: "Slank aluminium · koel daglicht · minimal villa", tag: "Minimal villa" },
  { id: "Klassiek", desc: "Warme tinten · gordijnen · tijdloze indeling", tag: "Refined warmth" },
  { id: "Industrieel", desc: "Stalen raster · cinematic schaduw · loft", tag: "Loft architecture" },
];

const COLORS = [
  {
    id: "antraciet",
    name: "Antraciet",
    code: "RAL 7016",
    hex: "#2e343b",
    sheen: "#77818c",
    accent: "Graphite matte",
  },
  {
    id: "zwart",
    name: "Zwart",
    code: "RAL 9005",
    hex: "#121316",
    sheen: "#3b414b",
    accent: "Architectural black",
  },
  {
    id: "wit",
    name: "Wit",
    code: "RAL 9016",
    hex: "#f1eee7",
    sheen: "#ffffff",
    accent: "Scandinavian light",
  },
  {
    id: "olive",
    name: "Olive",
    code: "RAL 6003",
    hex: "#5b6449",
    sheen: "#8a9574",
    accent: "Natural muted luxury",
  },
  {
    id: "creme-zand",
    name: "Creme / Zand",
    code: "RAL 1013",
    hex: "#cdbca4",
    sheen: "#efe1c9",
    accent: "Mediterranean warmth",
  },
] as const;

type ColorId = (typeof COLORS)[number]["id"];

const MATERIALS: {
  id: Material;
  desc: string;
  sheen: number;
  tag: string;
  surface: string;
  filter: string;
  reflectionMul: number;
  shadowMul: number;
  warmthMul: number;
  accent: string;
}[] = [
  {
    id: "Aluminium",
    desc: "Slank, koel, architecturaal luxe",
    sheen: 0.92,
    tag: "Cold premium",
    surface:
      "linear-gradient(145deg, rgba(214,225,236,0.24), rgba(115,129,145,0.08) 55%, rgba(19,22,28,0.2))",
    filter: "saturate(1.02) contrast(1.08) brightness(1.01)",
    reflectionMul: 1.18,
    shadowMul: 0.94,
    warmthMul: 0.82,
    accent: "#d9e3ec",
  },
  {
    id: "Kunststof",
    desc: "Zacht, geisoleerd, praktisch premium",
    sheen: 0.48,
    tag: "Soft insulated",
    surface:
      "linear-gradient(145deg, rgba(255,255,255,0.16), rgba(182,190,199,0.06) 58%, rgba(18,20,24,0.18))",
    filter: "saturate(0.97) contrast(1.01) brightness(1.03)",
    reflectionMul: 0.78,
    shadowMul: 0.82,
    warmthMul: 0.96,
    accent: "#f2f5f7",
  },
  {
    id: "Hout",
    desc: "Warm, natuurlijk, verfijnd karakter",
    sheen: 0.28,
    tag: "Natural elegance",
    surface:
      "linear-gradient(145deg, rgba(219,191,150,0.2), rgba(131,94,62,0.08) 55%, rgba(20,15,12,0.2))",
    filter: "saturate(1.08) brightness(1.01) contrast(1.02) sepia(0.08)",
    reflectionMul: 0.55,
    shadowMul: 0.72,
    warmthMul: 1.18,
    accent: "#d9b98e",
  },
];

const GLASS = [
  {
    id: "hrpp",
    name: "HR++",
    desc: "Standaard isolatie",
    tint: "#bcd6e2",
    opacity: 0.18,
    reflect: 0.55,
  },
  {
    id: "triple",
    name: "Triple glas",
    desc: "Maximale isolatie",
    tint: "#b4cfdc",
    opacity: 0.22,
    reflect: 0.62,
  },
  {
    id: "privacy",
    name: "Privacy",
    desc: "Mat satijn",
    tint: "#dde6ea",
    opacity: 0.55,
    reflect: 0.35,
  },
  {
    id: "tinted",
    name: "Getint",
    desc: "Zonwerend grijs",
    tint: "#3a4148",
    opacity: 0.55,
    reflect: 0.4,
  },
  {
    id: "panoramic",
    name: "Panoramisch",
    desc: "Ultraheldere coating",
    tint: "#a8c8d8",
    opacity: 0.1,
    reflect: 0.75,
  },
] as const;

const STEPS = ["Type", "Stijl", "Kleur", "Glas", "Details", "Samenvatting"] as const;

const CONFIG_BUTTON_PRIMARY =
  "inline-flex items-center gap-2 rounded-[0.95rem] bg-[linear-gradient(135deg,oklch(0.76_0.11_215),oklch(0.73_0.10_215))] px-5 py-2.5 text-[12.5px] font-semibold tracking-[0.01em] text-primary-foreground shadow-[0_14px_28px_-20px_oklch(0.78_0.13_215/0.52)] transition-all duration-200 ease-out hover:-translate-y-px hover:brightness-[1.02] active:scale-[0.99]";

const CONFIG_BUTTON_SECONDARY =
  "inline-flex items-center gap-2 rounded-[0.95rem] border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[12.5px] font-medium tracking-[0.01em] text-foreground/78 shadow-[0_10px_24px_-22px_oklch(0_0_0/0.65)] transition-all duration-200 ease-out hover:-translate-y-px hover:border-white/16 hover:bg-white/[0.05] hover:text-foreground active:scale-[0.99]";

/* ------------------------------------------------------------------ */
/*  Photorealistic per-type scenes                                     */
/* ------------------------------------------------------------------ */

const TYPE_SCENES: Record<(typeof TYPES)[number]["id"], string> = {
  schuifpui: sceneSchuifpui,
  kozijn: sceneKozijn,
  voordeur: sceneVoordeur,
  panorama: scenePanorama,
};

const STYLE_IMAGES: Record<TypeId, Record<StyleName, string>> = {
  schuifpui: {
    Modern: schuifpuiModern,
    Klassiek: schuifpuiKlassiek,
    Industrieel: schuifpuiIndustrieel,
  },
  kozijn: {
    Modern: kozijnModern,
    Klassiek: kozijnKlassiek,
    Industrieel: kozijnIndustrieel,
  },
  voordeur: {
    Modern: voordeurModern,
    Klassiek: voordeurKlassiek,
    Industrieel: voordeurIndustrieel,
  },
  panorama: {
    Modern: panoramaModern,
    Klassiek: panoramaKlassiek,
    Industrieel: panoramaIndustrieel,
  },
};

const PREVIEW_FRAMING: Record<
  TypeId,
  {
    zoom: number;
    position: string;
  }
> = {
  schuifpui: { zoom: 1.02, position: "center center" },
  kozijn: { zoom: 1.08, position: "center center" },
  voordeur: { zoom: 1.04, position: "center center" },
  panorama: { zoom: 1.01, position: "center center" },
};

const STYLE_ASSET_TOKENS: Record<StyleName, string> = {
  Modern: "modern",
  Klassiek: "klassiek",
  Industrieel: "industrieel",
};

const MATERIAL_ASSET_TOKENS: Record<Material, string> = {
  Aluminium: "aluminium",
  Kunststof: "kunststof",
  Hout: "hout",
};

const COLOR_ASSET_TOKENS: Record<ColorId, string> = {
  antraciet: "antraciet",
  zwart: "zwart",
  wit: "wit",
  olive: "olive",
  "creme-zand": "creme_zand",
};

const CONFIG_RENDER_MODULES = import.meta.glob("../../assets/cfg-*.avif", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const CONFIG_RENDER_MAP = new Map<string, string>();

Object.entries(CONFIG_RENDER_MODULES).forEach(([assetPath, assetSrc]) => {
  const fileName = assetPath.split("/").pop()?.replace(".avif", "");
  if (!fileName) return;

  const tokens = fileName.replace(/^cfg-/, "").split("-");
  if (tokens.length !== 4) return;

  const [typeToken, styleToken, materialToken, colorToken] = tokens;
  CONFIG_RENDER_MAP.set(
    [
      normalizeAssetToken(typeToken),
      normalizeAssetToken(styleToken),
      normalizeAssetToken(materialToken),
      normalizeAssetToken(colorToken),
    ].join("|"),
    assetSrc,
  );
});

/* Per-type cinematic "mood" — ambient color, tagline & atmosphere tuning.
   Each type triggers a unique lighting morph in the live preview. */
const TYPE_MOODS: Record<
  (typeof TYPES)[number]["id"],
  {
    tag: string;
    ambient: string;
    warm: string;
    filter: string;
    sunColor: string; // sun glare hue
    sunAngle: number; // degrees for the sun-sweep diagonal
    sunOpacity: number; // intensity of sun sweep
    driftSec: number; // seconds for slow camera drift
    vignette: number; // 0..1 — strength of cinematic vignette
    haloOpacity: number;
  }
> = {
  schuifpui: {
    tag: "Golden hour · tuin",
    ambient: "#f6b66b",
    warm: "#ffd9a8",
    filter: "saturate(1.04) contrast(1.0) brightness(1.06)",
    sunColor: "rgba(255,215,160,0.32)",
    sunAngle: 10,
    sunOpacity: 0.6,
    driftSec: 24,
    vignette: 0.28,
    haloOpacity: 0.65,
  },
  kozijn: {
    tag: "Soft morning · intiem",
    ambient: "#f1d6a8",
    warm: "#fbeacc",
    filter: "saturate(1.01) contrast(1.0) brightness(1.08)",
    sunColor: "rgba(255,240,210,0.38)",
    sunAngle: 16,
    sunOpacity: 0.65,
    driftSec: 32,
    vignette: 0.12,
    haloOpacity: 0.7,
  },
  voordeur: {
    tag: "Twilight · entree",
    ambient: "#ff8a4c",
    warm: "#ffb37a",
    filter: "saturate(1.05) contrast(1.04) brightness(1.02)",
    sunColor: "rgba(255,170,110,0.4)",
    sunAngle: 4,
    sunOpacity: 0.7,
    driftSec: 28,
    vignette: 0.42,
    haloOpacity: 0.8,
  },
  panorama: {
    tag: "Cinematic · horizon",
    ambient: "#7fb7d8",
    warm: "#cfe3ee",
    filter: "saturate(1.03) contrast(1.02) brightness(1.06)",
    sunColor: "rgba(255,230,200,0.32)",
    sunAngle: 14,
    sunOpacity: 0.65,
    driftSec: 34,
    vignette: 0.2,
    haloOpacity: 0.7,
  },
};

/* --- STYLE moods ---------------------------------------------------
   Each style now uses its own dedicated image per type.
   These overlays remain intentionally subtle to enhance the loaded AVIF
   with a premium cinematic layer without breaking its framing. */
const STYLE_MOODS: Record<
  StyleName,
  {
    tag: string;
    /* CSS filter appended after the type filter on the base photo */
    filter: string;
    /* Ambient color wash blended over the scene */
    wash: string;
    washOpacity: number;
    washBlend: "screen" | "multiply" | "overlay" | "soft-light";
    /* Multiplier on the type's vignette intensity */
    vignetteMul: number;
    /* Subtle accent edge color (cool / warm / amber) */
    edge: string;
    /* Style-specific signature overlay */
    signature: "modern-sheen" | "classic-curtain" | "industrial-grid";
  }
> = {
  Modern: {
    tag: "Minimal villa · cool daylight",
    filter: "saturate(0.93) contrast(1.06) brightness(1.05) hue-rotate(-6deg)",
    wash: "linear-gradient(180deg, rgba(210,228,238,0.18), transparent 55%)",
    washOpacity: 0.7,
    washBlend: "screen",
    vignetteMul: 0.7,
    edge: "rgba(200,220,235,0.5)",
    signature: "modern-sheen",
  },
  Klassiek: {
    tag: "Refined warmth · soft sunlight",
    filter: "saturate(1.08) contrast(0.98) brightness(1.04) sepia(0.1) hue-rotate(-4deg)",
    wash: "radial-gradient(80% 60% at 50% 30%, rgba(255,225,180,0.28), transparent 65%)",
    washOpacity: 0.85,
    washBlend: "screen",
    vignetteMul: 0.95,
    edge: "rgba(220,185,140,0.55)",
    signature: "classic-curtain",
  },
  Industrieel: {
    tag: "Loft architecture · cinematic shadow",
    filter: "saturate(0.82) contrast(1.18) brightness(0.88) hue-rotate(6deg)",
    wash: "radial-gradient(70% 55% at 50% 45%, rgba(20,18,14,0.0), rgba(15,12,10,0.45) 95%)",
    washOpacity: 0.9,
    washBlend: "multiply",
    vignetteMul: 1.55,
    edge: "rgba(255,165,90,0.45)",
    signature: "industrial-grid",
  },
};

const COLOR_MOODS: Record<
  (typeof COLORS)[number]["id"],
  {
    tag: string;
    filter: string;
    ambientWash: string;
    ambientBlend: "screen" | "soft-light" | "overlay";
    ambientOpacity: number;
    shadowWash: string;
    shadowOpacity: number;
    exposure: string;
    exposureOpacity: number;
    reflectionTone: string;
    reflectionOpacity: number;
    frameOpacity: number;
    floorGlow: string;
    floorOpacity: number;
    previewGlow: string;
    swatchGlow: string;
  }
> = {
  antraciet: {
    tag: "Graphite matte",
    filter: "saturate(0.96) contrast(1.05) brightness(0.98)",
    ambientWash:
      "linear-gradient(180deg, rgba(190,204,218,0.1), transparent 45%), radial-gradient(75% 60% at 50% 100%, rgba(84,96,109,0.16), transparent 70%)",
    ambientBlend: "screen",
    ambientOpacity: 0.7,
    shadowWash: "radial-gradient(85% 90% at 50% 55%, rgba(22,25,31,0), rgba(11,14,19,0.42) 100%)",
    shadowOpacity: 0.7,
    exposure:
      "linear-gradient(180deg, rgba(214,225,236,0.08), transparent 26%, rgba(14,17,22,0.08) 100%)",
    exposureOpacity: 0.7,
    reflectionTone:
      "linear-gradient(118deg, transparent 36%, rgba(221,229,236,0.11) 50%, transparent 64%)",
    reflectionOpacity: 0.48,
    frameOpacity: 0.5,
    floorGlow: "#45505c",
    floorOpacity: 0.2,
    previewGlow: "rgba(90,102,117,0.26)",
    swatchGlow: "0 0 0 1px rgba(160,173,186,0.18), 0 20px 34px -22px rgba(128,140,155,0.55)",
  },
  zwart: {
    tag: "Architectural black",
    filter: "saturate(0.92) contrast(1.12) brightness(0.92)",
    ambientWash:
      "linear-gradient(180deg, rgba(165,176,191,0.06), transparent 36%), radial-gradient(80% 70% at 50% 100%, rgba(18,20,26,0.26), transparent 72%)",
    ambientBlend: "soft-light",
    ambientOpacity: 0.82,
    shadowWash: "radial-gradient(90% 95% at 50% 55%, rgba(9,10,13,0), rgba(5,6,8,0.56) 100%)",
    shadowOpacity: 0.88,
    exposure:
      "linear-gradient(180deg, rgba(182,194,210,0.05), transparent 24%, rgba(5,6,9,0.16) 100%)",
    exposureOpacity: 0.78,
    reflectionTone:
      "linear-gradient(118deg, transparent 38%, rgba(170,184,198,0.08) 50%, rgba(18,19,24,0.14) 58%, transparent 66%)",
    reflectionOpacity: 0.56,
    frameOpacity: 0.58,
    floorGlow: "#1b1d23",
    floorOpacity: 0.18,
    previewGlow: "rgba(35,40,48,0.28)",
    swatchGlow: "0 0 0 1px rgba(73,81,92,0.24), 0 22px 36px -24px rgba(0,0,0,0.75)",
  },
  wit: {
    tag: "Scandinavian light",
    filter: "saturate(0.94) contrast(0.98) brightness(1.08)",
    ambientWash:
      "linear-gradient(180deg, rgba(255,255,255,0.22), transparent 40%), radial-gradient(75% 58% at 50% 100%, rgba(232,236,240,0.18), transparent 72%)",
    ambientBlend: "screen",
    ambientOpacity: 0.92,
    shadowWash:
      "radial-gradient(85% 90% at 50% 55%, rgba(255,255,255,0), rgba(173,182,192,0.18) 100%)",
    shadowOpacity: 0.42,
    exposure:
      "linear-gradient(180deg, rgba(255,255,255,0.16), transparent 28%, rgba(239,242,246,0.08) 100%)",
    exposureOpacity: 0.94,
    reflectionTone:
      "linear-gradient(118deg, transparent 34%, rgba(255,255,255,0.16) 50%, transparent 64%)",
    reflectionOpacity: 0.42,
    frameOpacity: 0.28,
    floorGlow: "#ebe6dc",
    floorOpacity: 0.18,
    previewGlow: "rgba(235,238,241,0.24)",
    swatchGlow: "0 0 0 1px rgba(255,255,255,0.42), 0 22px 36px -26px rgba(255,255,255,0.36)",
  },
  olive: {
    tag: "Natural muted luxury",
    filter: "saturate(0.98) contrast(1.02) brightness(0.99) hue-rotate(-4deg)",
    ambientWash:
      "linear-gradient(180deg, rgba(204,212,180,0.11), transparent 42%), radial-gradient(75% 58% at 50% 100%, rgba(95,109,78,0.18), transparent 72%)",
    ambientBlend: "soft-light",
    ambientOpacity: 0.76,
    shadowWash: "radial-gradient(85% 90% at 50% 55%, rgba(38,42,31,0), rgba(26,30,22,0.34) 100%)",
    shadowOpacity: 0.62,
    exposure:
      "linear-gradient(180deg, rgba(221,229,198,0.08), transparent 25%, rgba(83,96,67,0.08) 100%)",
    exposureOpacity: 0.74,
    reflectionTone:
      "linear-gradient(118deg, transparent 36%, rgba(211,219,190,0.11) 50%, transparent 64%)",
    reflectionOpacity: 0.45,
    frameOpacity: 0.46,
    floorGlow: "#667052",
    floorOpacity: 0.2,
    previewGlow: "rgba(111,122,92,0.24)",
    swatchGlow: "0 0 0 1px rgba(156,168,132,0.24), 0 20px 34px -24px rgba(106,116,84,0.56)",
  },
  "creme-zand": {
    tag: "Mediterranean warmth",
    filter: "saturate(1.01) contrast(0.98) brightness(1.04) sepia(0.06)",
    ambientWash:
      "linear-gradient(180deg, rgba(255,236,207,0.16), transparent 42%), radial-gradient(78% 60% at 50% 100%, rgba(209,185,144,0.18), transparent 72%)",
    ambientBlend: "screen",
    ambientOpacity: 0.86,
    shadowWash: "radial-gradient(85% 90% at 50% 55%, rgba(62,46,32,0), rgba(47,33,22,0.22) 100%)",
    shadowOpacity: 0.5,
    exposure:
      "linear-gradient(180deg, rgba(255,241,219,0.12), transparent 26%, rgba(205,188,164,0.08) 100%)",
    exposureOpacity: 0.82,
    reflectionTone:
      "linear-gradient(118deg, transparent 36%, rgba(250,232,205,0.14) 50%, transparent 64%)",
    reflectionOpacity: 0.46,
    frameOpacity: 0.38,
    floorGlow: "#c4b091",
    floorOpacity: 0.22,
    previewGlow: "rgba(210,186,148,0.22)",
    swatchGlow: "0 0 0 1px rgba(244,227,197,0.24), 0 22px 36px -26px rgba(205,181,141,0.52)",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Configurator() {
  const [step, setStep] = useState(0);
  const [typeId, setTypeId] = useState<(typeof TYPES)[number]["id"]>(TYPES[0].id);
  const [styleId, setStyleId] = useState<StyleName>("Modern");
  const [colorIx, setColorIx] = useState(0);
  const [matIx, setMatIx] = useState(0);
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

  const type = TYPES.find((t) => t.id === typeId)!;
  const color = COLORS[colorIx];
  const mat = MATERIALS[matIx];
  const glass = GLASS[glassIx];
  const mood = TYPE_MOODS[typeId];
  const styleMood = STYLE_MOODS[styleId];
  const colorMood = COLOR_MOODS[color.id];
  const framing = PREVIEW_FRAMING[typeId];
  const activePreviewImage = useMemo(
    () => resolveConfigPreviewImage(typeId, styleId, mat.id, color.id),
    [typeId, styleId, mat.id, color.id],
  );
  const finishKey = `${typeId}-${styleId}-${mat.id}-${color.id}-${glass.id}`;
  const [settledPreviewImage, setSettledPreviewImage] = useState(activePreviewImage);
  const [incomingPreviewImage, setIncomingPreviewImage] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    STYLES.forEach((style) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = resolveConfigPreviewImage(typeId, style.id, mat.id, color.id);
    });
  }, [typeId, mat.id, color.id]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    COLORS.forEach((option) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = resolveConfigPreviewImage(typeId, styleId, mat.id, option.id);
    });
  }, [typeId, styleId, mat.id]);

  useEffect(() => {
    if (typeof window === "undefined" || activePreviewImage === settledPreviewImage) return;

    const img = new window.Image();
    let cancelled = false;
    let timeoutId: number | null = null;

    setPreviewLoading(true);
    img.decoding = "async";
    img.src = activePreviewImage;

    const finishSwap = () => {
      if (cancelled) return;
      setIncomingPreviewImage(activePreviewImage);

      timeoutId = window.setTimeout(() => {
        if (cancelled) return;
        setSettledPreviewImage(activePreviewImage);
        setIncomingPreviewImage(null);
        setPreviewLoading(false);
      }, 380);
    };

    if (img.complete) {
      finishSwap();
    } else {
      img.onload = finishSwap;
      img.onerror = finishSwap;
    }

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [activePreviewImage, settledPreviewImage]);

  // Indicative price estimate (richt-prijs)
  const price = useMemo(() => {
    const base =
      typeId === "panorama"
        ? 4800
        : typeId === "schuifpui"
          ? 3600
          : typeId === "voordeur"
            ? 2400
            : 1450;
    const matMul = mat.id === "Aluminium" ? 1.25 : mat.id === "Hout" ? 1.35 : 1;
    const glassAdd =
      glass.id === "triple"
        ? 420
        : glass.id === "panoramic"
          ? 580
          : glass.id === "privacy" || glass.id === "tinted"
            ? 260
            : 0;
    const styleAdd = styleId === "Industrieel" ? 320 : styleId === "Klassiek" ? 180 : 0;
    return Math.round((base * matMul + glassAdd + styleAdd) / 10) * 10;
  }, [typeId, mat.id, glass.id, styleId]);

  const goNext = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const goPrev = () => setStep((s) => Math.max(0, s - 1));

  return (
    <section id="configurator" className="relative overflow-hidden px-4 py-24 md:px-6 md:py-36">
      <div className="absolute inset-x-0 top-0 h-[60%] gradient-radial-glow" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-[82rem]">
        {/* Header */}
        <Reveal variant="rise" className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-primary">Live configurator</p>
          <h2 className="font-display mt-4 text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-tight">
            Ontwerp uw kozijn,{" "}
            <span className="font-serif-italic gradient-text">in real-time.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Selecteer type, stijl, kleur, materiaal en glas. De preview reageert direct, net als bij
            een Tesla of Apple configurator. Volledig vrijblijvend.
          </p>
        </Reveal>

        {/* Stepper */}
        <Reveal variant="lift" delay={1} className="mt-12 flex justify-center">
          <ol className="glass relative flex w-full max-w-3xl items-center justify-between gap-1 rounded-2xl p-1.5">
            {STEPS.map((s, i) => {
              const active = i === step;
              const done = i < step;
              return (
                <li key={s} className="flex-1">
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    className={`group relative flex w-full items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-[11.5px] font-medium tracking-[0.04em] transition-all md:px-3 md:text-[12.5px] ${
                      active
                        ? "bg-white/[0.05] text-foreground ring-1 ring-white/12 shadow-[0_18px_28px_-26px_oklch(0_0_0/0.8)]"
                        : done
                          ? "text-foreground/80 hover:text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-full text-[10px] transition-all ${
                        active
                          ? "bg-primary/16 text-primary ring-1 ring-primary/18"
                          : done
                            ? "bg-white/[0.08] text-foreground/78"
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
        </Reveal>

        {/* Main grid */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.82fr_1.68fr] lg:gap-8">
          {/* ---------- Controls panel ---------- */}
          <Reveal
            variant="slide-left"
            delay={1}
            className={cn(
              "glass-strong relative flex flex-col overflow-hidden rounded-3xl shadow-[var(--shadow-elevated)]",
              step === 2 ? "p-6 md:p-7" : "p-7 md:p-9",
            )}
          >
            <div key={step} className="slide-pull-left flex-1">
              {step === 0 && (
                <ControlGroup title="Kies uw type" subtitle="Het uitgangspunt van uw ontwerp">
                  <div className="grid grid-cols-2 gap-3">
                    {TYPES.map((t) => {
                      const sel = t.id === typeId;
                      const Icon = t.icon;
                      const m = TYPE_MOODS[t.id];
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTypeId(t.id)}
                          className={`group relative overflow-hidden rounded-2xl text-left ring-1 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            sel
                              ? "ring-primary/70 shadow-[0_0_0_1px_oklch(0.78_0.13_215/0.35),0_24px_60px_-28px_oklch(0.78_0.13_215/0.5),0_8px_24px_-12px_oklch(0_0_0/0.5)] -translate-y-0.5"
                              : "ring-white/10 hover:ring-white/20 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_oklch(0_0_0/0.6)]"
                          }`}
                        >
                          {/* Mini cinematic thumbnail */}
                          <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <img
                              src={TYPE_SCENES[t.id]}
                              alt={t.name}
                              loading="lazy"
                              draggable={false}
                              className={`absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${sel ? "scale-110" : "scale-100 group-hover:scale-[1.04]"}`}
                              style={{
                                filter: sel
                                  ? "saturate(1.06) contrast(1.02) brightness(1.04)"
                                  : "saturate(0.88) brightness(0.9)",
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
                            <div
                              className="pointer-events-none absolute inset-0 transition-opacity duration-700"
                              style={{
                                background: `radial-gradient(80% 60% at 50% 100%, ${m.ambient}55, transparent 70%)`,
                                opacity: sel ? 1 : 0.4,
                                mixBlendMode: "screen",
                              }}
                            />
                            {/* Reflection sheen — sweeps across on hover/active */}
                            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                              <div
                                aria-hidden="true"
                                className={`absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent ${
                                  sel
                                    ? "[animation:cfgCardSheen_5s_ease-in-out_infinite]"
                                    : "opacity-0 group-hover:opacity-100 group-hover:[animation:cfgCardSheen_1.6s_ease-out_forwards]"
                                }`}
                              />
                            </div>
                            <div
                              className={`absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-lg backdrop-blur-md ring-1 transition-all duration-500 ${sel ? "bg-primary/20 text-primary ring-primary/35" : "bg-background/55 text-foreground/80 ring-white/12"}`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            {sel && (
                              <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-primary/95 text-primary-foreground shadow-[0_0_14px_-2px_oklch(0.78_0.13_215/0.55)] ring-1 ring-primary/40">
                                <Check className="h-3.5 w-3.5" />
                              </span>
                            )}
                          </div>
                          <div className="relative p-4">
                            <p className="text-[13.5px] font-semibold tracking-[-0.005em]">
                              {t.name}
                            </p>
                            <p className="mt-1 text-[9.5px] uppercase tracking-[0.22em] text-muted-foreground/85">
                              {m.tag}
                            </p>
                            <p className="mt-2 text-[11px] tabular-nums tracking-tight text-muted-foreground/70">
                              {t.dim}
                            </p>
                          </div>
                          {/* Refined inset edge on active — thin, sophisticated */}
                          {sel && (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/25"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </ControlGroup>
              )}

              {step === 1 && (
                <ControlGroup
                  title="Kies een stijl"
                  subtitle={`Architecturale personality · zelfde ${type.name.toLowerCase()}, andere taal`}
                >
                  <div className="grid grid-cols-1 gap-3">
                    {STYLES.map((s) => {
                      const sel = s.id === styleId;
                      const sm = STYLE_MOODS[s.id];
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setStyleId(s.id)}
                          className={`group relative flex items-stretch gap-3 overflow-hidden rounded-2xl p-2 text-left ring-1 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            sel
                              ? "ring-primary/70 shadow-[0_0_0_1px_oklch(0.78_0.13_215/0.3),0_20px_50px_-24px_oklch(0.78_0.13_215/0.5)] -translate-y-0.5"
                              : "ring-white/10 hover:ring-white/25 hover:-translate-y-0.5"
                          }`}
                        >
                          {/* Mini reinterpretation of the active TYPE scene */}
                          <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10">
                            <img
                              src={STYLE_IMAGES[typeId][s.id]}
                              alt={`${type.name} · ${s.id}`}
                              loading="lazy"
                              draggable={false}
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                            />
                            <div
                              aria-hidden
                              className="pointer-events-none absolute inset-0"
                              style={{
                                background: sm.wash,
                                mixBlendMode: sm.washBlend,
                                opacity: sm.washOpacity * 0.9,
                              }}
                            />
                            {sm.signature === "industrial-grid" && (
                              <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0"
                                style={{
                                  backgroundImage:
                                    "linear-gradient(rgba(8,7,6,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(8,7,6,0.5) 1px, transparent 1px)",
                                  backgroundSize: "33.33% 50%, 33.33% 50%",
                                  mixBlendMode: "multiply",
                                  opacity: 0.6,
                                }}
                              />
                            )}
                            <div
                              className="pointer-events-none absolute inset-0"
                              style={{
                                background: `radial-gradient(circle at 50% 45%, transparent 40%, oklch(0.10 0.012 240 / 0.55) 100%)`,
                              }}
                            />
                            {sel && (
                              <span className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_12px_-2px_oklch(0.78_0.13_215/0.7)]">
                                <Check className="h-3 w-3" />
                              </span>
                            )}
                          </div>
                          {/* Copy */}
                          <div className="flex min-w-0 flex-1 flex-col justify-center pr-3">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
                              {sm.tag}
                            </p>
                            <p className="mt-1 text-[14px] font-semibold tracking-tight">{s.id}</p>
                            <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">
                              {s.desc}
                            </p>
                          </div>
                          {sel && (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/25"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground/80">
                    Elke stijl gebruikt nu een eigen architectuurbeeld voor uw{" "}
                    <span className="text-foreground">{type.name.toLowerCase()}</span>. Het type
                    blijft identiek, maar sfeer, licht en materialiteit transformeren direct.
                  </p>
                </ControlGroup>
              )}

              {step === 2 && (
                <ControlGroup
                  title="Kleur & materiaal"
                  subtitle="Zelfde architectuur · andere premium finish"
                  subtitleClassName="max-w-[16rem] text-[10px] uppercase tracking-[0.22em] text-primary"
                >
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground/78">
                      Kleur
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
                      {COLORS.map((c, i) => {
                        const sel = i === colorIx;
                        return (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => setColorIx(i)}
                            aria-label={c.name}
                            className={`group relative flex min-h-[104px] flex-col items-center justify-start rounded-[1.2rem] border px-3.5 pb-3.5 pt-4 text-center transition-all duration-250 ${
                              sel
                                ? "border-primary/70 bg-white/[0.035] shadow-[0_0_0_1px_oklch(0.78_0.13_215/0.25),0_18px_30px_-26px_oklch(0.78_0.13_215/0.45)]"
                                : "border-white/10 bg-white/[0.02] hover:border-white/16 hover:bg-white/[0.03]"
                            }`}
                          >
                            <span
                              className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full"
                              style={{
                                background: `radial-gradient(circle at 30% 28%, ${c.sheen} 0%, ${c.hex} 58%, ${c.hex} 100%)`,
                                boxShadow:
                                  "inset 0 1px 1px rgba(255,255,255,0.18), inset 0 -8px 14px rgba(0,0,0,0.24)",
                              }}
                            >
                              <span
                                aria-hidden="true"
                                className="absolute inset-[1px] rounded-full"
                                style={{
                                  background:
                                    "linear-gradient(145deg, rgba(255,255,255,0.22), transparent 38%, rgba(0,0,0,0.1) 100%)",
                                }}
                              />
                              {sel && (
                                <span className="relative z-10 grid h-5.5 w-5.5 place-items-center rounded-full bg-black/55 text-primary ring-1 ring-white/10">
                                  <Check className="h-3 w-3" />
                                </span>
                              )}
                            </span>
                            <span className="mt-3 text-[12.5px] font-semibold leading-tight text-foreground">
                              {c.name}
                            </span>
                            {sel && (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 rounded-[1.2rem] ring-1 ring-inset ring-primary/22"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-[12.5px] text-foreground/92">
                      <span className="font-semibold">{color.name}</span> · {color.code} ·{" "}
                      {color.accent}
                    </p>
                  </div>

                  <div className="mt-5">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground/78">
                      Materiaal
                    </p>
                    <div className="mt-3 grid grid-cols-1 gap-2.5 md:grid-cols-3">
                      {MATERIALS.map((m, i) => {
                        const sel = i === matIx;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setMatIx(i)}
                            className={`group relative overflow-hidden rounded-[1.3rem] border p-3.5 text-left transition-all duration-250 ${
                              sel
                                ? "border-primary/70 bg-white/[0.04] shadow-[0_0_0_1px_oklch(0.78_0.13_215/0.25),0_20px_30px_-28px_oklch(0.78_0.13_215/0.35)]"
                                : "border-white/10 bg-white/[0.02] hover:border-white/16 hover:bg-white/[0.03]"
                            }`}
                          >
                            <div
                              className="absolute inset-0 opacity-50 transition-opacity duration-300"
                              style={{
                                background: m.surface,
                                mixBlendMode: "screen",
                              }}
                            />
                            <div className="relative">
                              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/72">
                                {m.tag}
                              </p>
                              <p className="mt-1.5 text-[13.5px] font-semibold tracking-tight">
                                {m.id}
                              </p>
                              <p className="mt-1.5 text-[10.5px] leading-relaxed text-muted-foreground/85">
                                {m.desc}
                              </p>
                            </div>
                            {sel && (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 rounded-[1.3rem] ring-1 ring-inset ring-primary/22"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-3 max-w-[32rem] text-[11.5px] leading-relaxed text-muted-foreground/82">
                      Materiaal verfijnt reflectie, warmte en schaduw zonder de architectuur of
                      camera te veranderen.
                    </p>
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
                          type="button"
                          onClick={() => setGlassIx(i)}
                          className={`flex items-center gap-3 rounded-xl p-3 text-left ring-1 transition-all ${
                            sel
                              ? "bg-primary/10 ring-primary"
                              : "bg-white/[0.03] ring-white/10 hover:bg-white/[0.06]"
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
                          type="button"
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
                      <li
                        key={k}
                        className="flex items-center justify-between border-b border-white/5 pb-2.5"
                      >
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
                        <p className="text-[10.5px] uppercase tracking-[0.22em] text-primary">
                          Indicatieve richtprijs
                        </p>
                        <p className="font-display mt-1.5 text-3xl font-medium tracking-tight">
                          € {price.toLocaleString("nl-NL")}
                        </p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          Excl. BTW, incl. montage in Limburg
                        </p>
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
            <div
              className={cn(
                "flex items-center justify-between gap-3",
                step === 2 ? "mt-6" : "mt-8",
              )}
            >
              <button
                type="button"
                onClick={goPrev}
                disabled={step === 0}
                className={`${CONFIG_BUTTON_SECONDARY} disabled:pointer-events-none disabled:opacity-35`}
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Vorige
              </button>

              {step < STEPS.length - 1 ? (
                <button type="button" onClick={goNext} className={`group ${CONFIG_BUTTON_PRIMARY}`}>
                  Volgende
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              ) : (
                <a href="#contact" className={`group relative ${CONFIG_BUTTON_PRIMARY}`}>
                  Offerte aanvragen
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          </Reveal>

          {/* ---------- Live preview ---------- */}
          <Reveal variant="slide-right" delay={2} className="relative">
            {/* Outer ambient halo — reacts to selected color */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] blur-2xl transition-all duration-1000 [animation:cfgHaloBreathe_11s_ease-in-out_infinite]"
              style={{
                background: `radial-gradient(48% 48% at 26% 30%, ${mood.ambient}30, transparent 72%), radial-gradient(52% 52% at 78% 74%, ${colorMood.previewGlow}, transparent 74%), radial-gradient(34% 34% at 50% 50%, oklch(0.78 0.13 215 / 0.1), transparent 74%)`,
                opacity: mood.haloOpacity * 0.42,
              }}
            />
            <div
              ref={stageRef}
              onMouseMove={onStageMove}
              onMouseLeave={onStageLeave}
              className="glass-strong relative overflow-hidden rounded-3xl shadow-[var(--shadow-elevated)] ring-1 ring-white/10"
              style={{
                boxShadow: `0 24px 52px -28px oklch(0 0 0 / 0.62), 0 8px 22px -14px oklch(0 0 0 / 0.34), 0 0 0 1px ${color.hex}10`,
              }}
            >
              {/* Cinematic per-type scene stack */}
              <div className="relative min-h-[420px] w-full overflow-hidden md:min-h-[490px] xl:min-h-[560px]">
                {/* Photorealistic scene layers — crossfade on TYPE change */}
                {(Object.keys(TYPE_SCENES) as Array<keyof typeof TYPE_SCENES>).map((id) => {
                  const active = id === typeId;
                  const layerSrc = active
                    ? settledPreviewImage
                    : resolveConfigPreviewImage(id, styleId, mat.id, color.id);
                  const m = TYPE_MOODS[id];
                  const finishFilter = "saturate(1.01) contrast(1.02) brightness(1.01)";
                  return (
                    <div
                      key={id}
                      {...(!active ? { "aria-hidden": "true" } : {})}
                      className="absolute inset-0 h-full w-full overflow-hidden"
                      style={{
                        opacity: active ? 1 : 0,
                        transform: `translate3d(${parallax.x * 0.2}px, ${parallax.y * 0.2}px, 0)`,
                        transition:
                          "opacity 1100ms cubic-bezier(0.22,1,0.36,1), transform 1600ms cubic-bezier(0.22,1,0.36,1)",
                        willChange: "opacity, transform",
                      }}
                    >
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{
                          transform: `scale(${(active ? framing.zoom : PREVIEW_FRAMING[id].zoom).toFixed(3)})`,
                          transformOrigin: "center center",
                        }}
                      >
                        <img
                          src={layerSrc}
                          alt={`${id} · ${styleId}`}
                          loading={active ? "eager" : "lazy"}
                          fetchPriority={active ? "high" : undefined}
                          width={1600}
                          height={1088}
                          draggable={false}
                          className="absolute inset-0 h-full w-full select-none object-cover"
                          style={{
                            objectPosition: active
                              ? framing.position
                              : PREVIEW_FRAMING[id].position,
                            filter: active
                              ? finishFilter
                              : "saturate(0.92) contrast(0.96) brightness(0.76) blur(10px)",
                            transition: "filter 1100ms ease",
                            animation: active
                              ? `cfgDrift ${m.driftSec}s ease-in-out infinite alternate`
                              : undefined,
                            transform: active ? undefined : "scale(1.12)",
                            willChange: "transform, filter",
                          }}
                        />
                        {active && incomingPreviewImage && (
                          <img
                            key={`${typeId}-${styleId}-${mat.id}-${color.id}-incoming`}
                            src={incomingPreviewImage}
                            alt={`${type.name} · ${styleId} · ${mat.id} · ${color.name}`}
                            loading="eager"
                            fetchPriority="high"
                            width={1600}
                            height={1088}
                            draggable={false}
                            className="cfg-preview-incoming absolute inset-0 h-full w-full select-none object-cover"
                            style={{
                              objectPosition: framing.position,
                              filter: finishFilter,
                              transform: `translate3d(${parallax.x * 0.2}px, ${parallax.y * 0.2}px, 0)`,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Per-type ambient atmosphere — morphs lighting mood */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 transition-all duration-[1100ms]"
                  style={{
                    background: `radial-gradient(80% 60% at 50% 0%, ${mood.warm}18, transparent 60%), radial-gradient(70% 55% at 50% 100%, ${mood.ambient}18, transparent 70%)`,
                    mixBlendMode: "screen",
                    opacity: 0.75,
                  }}
                />

                {/* STIJL atmosphere overlays — now enhancing dedicated style renders. */}
                <div
                  key={`style-wash-${typeId}-${styleId}`}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 transition-all duration-[1100ms]"
                  style={{
                    background: styleMood.wash,
                    mixBlendMode: styleMood.washBlend,
                    opacity: styleMood.washOpacity * 0.42,
                    animation: "cfgFlash 1100ms cubic-bezier(0.22,1,0.36,1) both",
                  }}
                />

                {/* STIJL signature overlays — same product, different personality */}
                {styleMood.signature === "industrial-grid" && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 transition-opacity duration-[1100ms]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(8,7,6,0.42) 1px, transparent 1px), linear-gradient(90deg, rgba(8,7,6,0.42) 1px, transparent 1px)",
                      backgroundSize: "33.33% 50%, 33.33% 50%",
                      mixBlendMode: "multiply",
                      opacity: 0.22,
                      maskImage: "radial-gradient(75% 65% at 50% 50%, black 60%, transparent 100%)",
                      WebkitMaskImage:
                        "radial-gradient(75% 65% at 50% 50%, black 60%, transparent 100%)",
                    }}
                  />
                )}
                {styleMood.signature === "classic-curtain" && (
                  <>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 w-[18%]"
                      style={{
                        background: "linear-gradient(90deg, rgba(255,225,180,0.32), transparent)",
                        mixBlendMode: "screen",
                        opacity: 0.45,
                      }}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 right-0 w-[18%]"
                      style={{
                        background: "linear-gradient(-90deg, rgba(255,225,180,0.32), transparent)",
                        mixBlendMode: "screen",
                        opacity: 0.45,
                      }}
                    />
                  </>
                )}
                {styleMood.signature === "modern-sheen" && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(110deg, transparent 34%, rgba(220,235,245,0.08) 50%, transparent 66%)",
                      mixBlendMode: "screen",
                    }}
                  />
                )}

                {/* Cinematic transition flash on type/style change */}
                <div
                  key={`flash-${typeId}-${styleId}`}
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(60% 50% at 50% 50%, ${mood.warm}66, transparent 72%)`,
                    mixBlendMode: "screen",
                    opacity: 0.38,
                    animation: "cfgFlash 900ms cubic-bezier(0.22,1,0.36,1) both",
                  }}
                />

                {/* KLEUR finish system — same architecture, different premium finish. */}
                <div
                  key={`finish-ambient-${finishKey}`}
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: colorMood.ambientWash,
                    mixBlendMode: colorMood.ambientBlend,
                    opacity: colorMood.ambientOpacity * mat.warmthMul * 0.34,
                    animation: "cfgFlash 900ms cubic-bezier(0.22,1,0.36,1) both",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 transition-all duration-[1100ms]"
                  style={{
                    background: colorMood.shadowWash,
                    mixBlendMode: "multiply",
                    opacity: colorMood.shadowOpacity * mat.shadowMul * 0.42,
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 transition-all duration-[1100ms]"
                  style={{
                    background: `linear-gradient(180deg, ${color.sheen}26 0%, ${color.hex}18 45%, ${color.hex}10 100%)`,
                    mixBlendMode: "soft-light",
                    opacity: 0.24,
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 transition-all duration-[1100ms]"
                  style={{
                    background: color.hex,
                    mixBlendMode: "color",
                    opacity: colorMood.frameOpacity * 0.16,
                  }}
                />
                <div
                  key={`finish-exposure-${finishKey}`}
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: colorMood.exposure,
                    mixBlendMode: "screen",
                    opacity: colorMood.exposureOpacity * 0.28,
                    animation: "cfgFlash 1000ms cubic-bezier(0.22,1,0.36,1) both",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 transition-all duration-[1100ms]"
                  style={{
                    background: `linear-gradient(148deg, ${color.sheen}50 0%, transparent 34%, transparent 62%, ${mat.accent}1f 100%)`,
                    mixBlendMode: "screen",
                    opacity: mat.sheen * 0.22,
                  }}
                />

                {/* GLASS atmosphere — tints daylight coming through the windows */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 transition-all duration-700"
                  style={{
                    background: glass.tint,
                    mixBlendMode: "multiply",
                    opacity: glass.opacity * 0.24,
                  }}
                />
                {/* Frosted privacy bloom */}
                {glass.id === "privacy" && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 transition-all duration-700"
                    style={{
                      background:
                        "radial-gradient(60% 50% at 50% 45%, rgba(255,255,255,0.14), transparent 75%)",
                      mixBlendMode: "screen",
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
                        "linear-gradient(180deg, rgba(200,230,255,0.08), transparent 42%)",
                      mixBlendMode: "screen",
                    }}
                  />
                )}

                {/* Refined low-iron glass reflection — subtle environmental streak */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{
                    background: colorMood.reflectionTone,
                    mixBlendMode: "screen",
                    transform: `translate3d(${parallax.x * 0.5}px, ${parallax.y * 0.35}px, 0)`,
                    transition:
                      "transform 900ms cubic-bezier(0.22,1,0.36,1), background 1100ms ease, opacity 1100ms ease",
                    opacity: colorMood.reflectionOpacity * glass.reflect * mat.reflectionMul * 0.54,
                  }}
                />
                <div
                  key={`reflect-${finishKey}-${glass.id}`}
                  aria-hidden
                  className="cfg-preview-reflection pointer-events-none absolute inset-0 overflow-hidden"
                  style={{
                    opacity: (previewLoading ? 0.22 : 0.14) * mat.reflectionMul,
                    transform: `translate3d(${parallax.x * 0.15}px, ${parallax.y * 0.1}px, 0)`,
                  }}
                />

                {/* Animated cinematic sunlight glare — slowly sweeps across glass.
                    Re-keyed per-type so it restarts with new angle/color/intensity. */}
                <div
                  key={`sun-${typeId}`}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{ mixBlendMode: "screen" }}
                >
                  <div
                    className="absolute -inset-1/4 h-[150%] w-[50%]"
                    style={{
                      background: `linear-gradient(${mood.sunAngle + 90}deg, transparent 0%, ${mood.sunColor} 45%, rgba(255,255,255,0.6) 50%, ${mood.sunColor} 55%, transparent 100%)`,
                      filter: "blur(20px)",
                      opacity: mood.sunOpacity * 0.36,
                      animation: "cfgSunSweep 18s ease-in-out infinite",
                    }}
                  />
                </div>

                {/* Ambient luminous dust — drifting sunlight particles.
                    Two layers with different scales/durations for parallax depth. */}
                <div
                  key={`dust-a-${typeId}`}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{ mixBlendMode: "screen", opacity: 0.16 }}
                >
                  <div
                    className="absolute -inset-[10%]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 30%, rgba(255,235,200,0.9) 0.6px, transparent 1.4px), radial-gradient(circle at 70% 60%, rgba(255,220,180,0.7) 0.5px, transparent 1.2px), radial-gradient(circle at 40% 80%, rgba(255,245,220,0.8) 0.7px, transparent 1.6px), radial-gradient(circle at 85% 20%, rgba(255,230,190,0.6) 0.4px, transparent 1px)",
                      backgroundSize: "180px 180px, 220px 220px, 260px 260px, 200px 200px",
                      filter: "blur(0.35px)",
                      animation: "cfgDust 28s ease-in-out infinite alternate",
                    }}
                  />
                  <div
                    className="absolute -inset-[10%]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 35% 45%, rgba(255,240,210,0.55) 0.4px, transparent 1px), radial-gradient(circle at 80% 75%, rgba(255,225,180,0.5) 0.5px, transparent 1.2px)",
                      backgroundSize: "320px 320px, 380px 380px",
                      filter: "blur(0.45px)",
                      animation: "cfgDust 40s ease-in-out infinite alternate-reverse",
                    }}
                  />
                </div>

                {/* Cinematic vignette + bottom fade — lifted blacks */}
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 42%, transparent 40%, oklch(0.12 0.012 240 / 0.58) 100%)",
                    opacity: Math.min(0.5, mood.vignette * styleMood.vignetteMul * 0.72),
                  }}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/46 via-background/8 to-transparent" />

                {/* Color-reactive floor glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 transition-all duration-1000"
                  style={{
                    background: `radial-gradient(70% 50% at 50% 100%, ${colorMood.floorGlow}, transparent 70%)`,
                    mixBlendMode: "screen",
                    opacity: colorMood.floorOpacity * 0.34,
                  }}
                />
                {/* Subtle cyan rim light — sophisticated, not neon */}
                <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-2/3 -translate-x-1/2 rounded-full bg-primary/4 blur-3xl" />
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                    previewLoading ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.85_0.16_210_/_0.06),transparent_58%)] mix-blend-screen" />
                  <div className="absolute inset-x-[18%] top-[12%] h-px bg-gradient-to-r from-transparent via-white/45 to-transparent blur-sm [animation:cfgPreviewPulse_1.4s_ease-in-out_infinite]" />
                </div>

                {/* HUD chips */}
                <div className="absolute left-5 top-5 flex max-w-[calc(100%-9rem)] flex-wrap gap-2 sm:max-w-[calc(100%-11rem)]">
                  <Chip label="LIVE" dot />
                  <Chip label={type.name} />
                  <Chip label={mood.tag} />
                  <Chip label={`Stijl · ${styleId}`} />
                </div>

                {/* Material/Glass HUD — right side */}
                <div className="absolute right-5 top-5 flex flex-col items-end gap-2">
                  <Chip label={`Kleur · ${color.name}`} />
                  <Chip label={`Materiaal · ${mat.id}`} />
                  <Chip label={`Glas · ${glass.name}`} />
                </div>

                {/* Summary card */}
                <div
                  className="absolute inset-x-5 bottom-5 flex flex-wrap items-center justify-between gap-3 rounded-[1.15rem] px-4 py-3 backdrop-blur-xl"
                  style={{
                    background: `linear-gradient(135deg, oklch(0.14 0.012 240 / 0.68), oklch(0.14 0.012 240 / 0.58)), radial-gradient(80% 130% at 0% 100%, ${color.hex}16, transparent 55%)`,
                    border: "1px solid oklch(1 0 0 / 0.06)",
                  }}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <ImagesBadge className="hidden shrink-0 md:flex" title="Live combinaties" />
                    <span
                      className="h-10 w-10 rounded-lg ring-1 ring-white/20 transition-all duration-700"
                      style={{
                        background: `linear-gradient(135deg, ${color.sheen} 0%, ${color.hex} 55%, #000 130%)`,
                        boxShadow: `inset 0 1px 0 ${color.sheen}88, 0 10px 26px -10px ${color.hex}cc`,
                      }}
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] tracking-[0.08em] text-muted-foreground/78">
                        Uw samenstelling ·{" "}
                        <span className="text-primary">€ {price.toLocaleString("nl-NL")}</span>
                      </p>
                      <p className="mt-0.5 truncate text-[12.5px] font-medium">
                        {type.name} · {styleId} · {mat.id} · {color.name} · {glass.name}
                      </p>
                    </div>
                  </div>
                  <a
                    href="#contact"
                    className={`hidden shrink-0 sm:inline-flex ${CONFIG_BUTTON_SECONDARY}`}
                  >
                    Offerte
                  </a>
                </div>
              </div>
            </div>

            {/* Micro features under preview */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                { icon: Eye, t: "Real-time preview", b: "Direct visueel resultaat." },
                { icon: Zap, t: "In enkele minuten", b: "Eenvoudig en snel." },
                { icon: Sparkles, t: "Vrijblijvend", b: "Persoonlijke offerte." },
              ].map((s) => (
                <div
                  key={s.t}
                  className="glass flex items-center gap-4 rounded-[1.2rem] border border-white/7 px-5 py-4 transition-all duration-300 hover:border-white/12 hover:bg-white/[0.035]"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[0.95rem] bg-[linear-gradient(180deg,oklch(0.78_0.13_215_/_0.08),oklch(0.78_0.13_215_/_0.04))] text-primary ring-1 ring-primary/14 shadow-[inset_0_1px_0_oklch(1_0_0_/_0.08),0_12px_22px_-18px_oklch(0.78_0.13_215_/_0.26)]">
                    <s.icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-semibold tracking-[-0.01em] text-foreground">
                      {s.t}
                    </p>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">
                      {s.b}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function normalizeAssetToken(value: string) {
  const normalized = value
    .toLowerCase()
    .replace(/[/\s]+/g, "_")
    .replace(/-/g, "_");

  if (normalized === "klasieek") return "klassiek";
  if (normalized === "creem_zand") return "creme_zand";

  return normalized;
}

function getConfigRenderKey(
  typeId: TypeId,
  styleId: StyleName,
  materialId: Material,
  colorId: ColorId,
) {
  return [
    normalizeAssetToken(typeId),
    normalizeAssetToken(STYLE_ASSET_TOKENS[styleId]),
    normalizeAssetToken(MATERIAL_ASSET_TOKENS[materialId]),
    normalizeAssetToken(COLOR_ASSET_TOKENS[colorId]),
  ].join("|");
}

function resolveConfigPreviewImage(
  typeId: TypeId,
  styleId: StyleName,
  materialId: Material,
  colorId: ColorId,
) {
  return (
    CONFIG_RENDER_MAP.get(getConfigRenderKey(typeId, styleId, materialId, colorId)) ??
    STYLE_IMAGES[typeId][styleId]
  );
}

function ControlGroup({
  title,
  subtitle,
  children,
  subtitleClassName,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  subtitleClassName?: string;
}) {
  return (
    <div>
      <p
        className={cn(
          "text-[11px] font-medium tracking-[0.08em] text-primary/82",
          subtitleClassName,
        )}
      >
        {subtitle}
      </p>
      <h3 className="font-display mt-2 text-[1.5rem] font-medium leading-tight tracking-tight">
        {title}
      </h3>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Chip({ label, dot }: { label: string; dot?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[0.8rem] bg-background/42 px-2.5 py-1 text-[9.5px] font-medium tracking-[0.08em] text-foreground/76 ring-1 ring-white/10 backdrop-blur-xl">
      {dot && (
        <span className="relative grid h-1.5 w-1.5 place-items-center">
          <span className="absolute inset-0 rounded-full bg-primary/18 blur-[2px]" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
        </span>
      )}
      {label}
    </span>
  );
}
