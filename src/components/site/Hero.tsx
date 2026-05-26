import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import slide1 from "@/assets/hero-slide-1.jpg";
import slide2 from "@/assets/hero-slide-2.jpg";
import slide3 from "@/assets/hero-slide-3.jpg";

type Slide = {
  image: string;
  eyebrow: string;
  titleLead: string;
  titleItalic: string;
  titleTail: string;
  description: string;
  primaryLabel: string;
  trustTitle: string;
  trustBody: string;
};

const SLIDES: Slide[] = [
  {
    image: slide1,
    eyebrow: "Premium maatwerk kozijnen",
    titleLead: "Kozijnen die uw leefruimte naar een",
    titleItalic: "hoger niveau",
    titleTail: "tillen.",
    description:
      "Maatwerk kozijnen, deuren en schuifpuien. Met vakmanschap, kwaliteit en oog voor detail realiseren wij duurzame oplossingen voor particuliere en zakelijke projecten.",
    primaryLabel: "Bekijk producten",
    trustTitle: "Betrouwbaar & duurzaam",
    trustBody: "Hoogwaardige materialen, vakkundige montage en betrouwbare service.",
  },
  {
    image: slide2,
    eyebrow: "Zakelijke markt · Architecturale gevels",
    titleLead: "Architectuur die",
    titleItalic: "uw merk",
    titleTail: "een gezicht geeft.",
    description:
      "Van kantoor en bedrijfspand tot grootschalige projectbouw. Wij realiseren glasgevels en aluminium puien die voldoen aan de hoogste eisen op gebied van design, isolatie en duurzaamheid.",
    primaryLabel: "Bekijk zakelijke projecten",
    trustTitle: "Partner in projectbouw",
    trustBody:
      "Heldere planning, eigen montageteams en complete ontzorging, van tekening tot oplevering.",
  },
  {
    image: slide3,
    eyebrow: "Vakmanschap in heel Nederland",
    titleLead: "Eén specialist voor",
    titleItalic: "uw complete",
    titleTail: "gevel & buitenruimte.",
    description:
      "Kozijnen, rolluiken, horren, screens en poorten. Hoogwaardige materialen, vakkundig advies en een afwerking tot in het laatste detail. Persoonlijk geleverd, vakkundig geplaatst.",
    primaryLabel: "Vraag direct uw offerte aan",
    trustTitle: "Vakmanschap in heel Nederland",
    trustBody: "Persoonlijk advies aan huis, scherpe offerte en oplevering volgens afspraak.",
  },
];

const INTERVAL = 6500;

export function Hero() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => {
        setPrev(i);
        return (i + 1) % SLIDES.length;
      });
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  const go = (i: number) => {
    if (i === active) return;
    setPrev(active);
    setActive(i);
  };

  const slide = SLIDES[active];

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden bg-background">
      {/* Slides — architectural "shutter" frame reveal */}
      <div className="absolute inset-0">
        {SLIDES.map((s, i) => {
          const isActive = i === active;
          const isPrev = i === prev;
          return (
            <div
              key={i}
              {...(!isActive ? { "aria-hidden": "true" } : {})}
              className={`absolute inset-0 overflow-hidden ${
                isActive ? "z-[2] opacity-100" : isPrev ? "z-[1] opacity-100" : "z-0 opacity-0"
              }`}
            >
              <div
                key={`${i}-${active}`}
                className={`absolute inset-0 ${isActive ? "hero-frame-enter" : isPrev ? "hero-frame-exit" : ""}`}
              >
                <img
                  src={s.image}
                  alt=""
                  className="h-full w-full object-cover object-center ken-burns will-change-transform"
                  width={1920}
                  height={1280}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
                />
              </div>
            </div>
          );
        })}
        {/* Cinematic gradients */}
        <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-background/92 via-background/55 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-background/30 via-transparent to-background/95" />
        <div className="pointer-events-none absolute inset-0 z-[3] gradient-radial-glow opacity-60" />
        {/* Subtle architectural grid — evokes window mullions */}
        <div className="pointer-events-none absolute inset-0 z-[3] opacity-[0.08] [background-image:linear-gradient(to_right,oklch(1_0_0_/_0.7)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0_/_0.7)_1px,transparent_1px)] [background-size:120px_120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[82rem] flex-col px-5 pt-[140px] pb-[140px] sm:px-6 md:pt-[170px] md:pb-[156px] lg:pb-[170px]">
        <div className="flex flex-1 items-center">
          <div key={`grp-${active}`} className="max-w-2xl">
            <div className="hero-text-in [--delay:120ms] mb-6 inline-flex items-center gap-2 rounded-lg glass px-3.5 py-1.5 text-[10.5px] uppercase tracking-[0.26em] text-primary sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-glow" />
              {slide.eyebrow}
            </div>

            <h1 className="hero-text-in [--delay:260ms] font-display text-[clamp(2.1rem,7.2vw,5.75rem)] font-medium leading-[1.04] tracking-[-0.02em] text-foreground">
              {slide.titleLead}{" "}
              <span className="font-serif-italic gradient-text">{slide.titleItalic}</span>{" "}
              {slide.titleTail}
            </h1>

            <p className="hero-text-in [--delay:420ms] mt-6 max-w-lg text-[14.5px] leading-relaxed text-muted-foreground sm:text-[15px] md:text-base">
              {slide.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-12">
              <a
                href="#producten"
                className="group hero-text-in [--delay:560ms] inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow px-6 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-[0_12px_40px_-12px_oklch(0.78_0.13_215/0.55)] transition-all hover:shadow-[0_20px_60px_-15px_oklch(0.78_0.13_215/0.75)] sm:px-7 sm:text-[12px]"
              >
                {slide.primaryLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="hero-text-in [--delay:680ms] inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3.5 text-[11.5px] font-semibold tracking-[0.06em] text-foreground/90 transition-all hover:border-primary/50 hover:text-primary sm:text-[12px]"
              >
                Offerte aanvragen
              </a>
            </div>
          </div>
        </div>

        {/* Trust card — desktop only */}
        <div
          key={`trust-${active}`}
          className="hero-text-in [--delay:780ms] pointer-events-none absolute right-6 bottom-[280px] hidden max-w-[300px] lg:block"
        >
          <div className="glass-strong pointer-events-auto rounded-2xl p-4 shadow-[var(--shadow-elevated)]">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{slide.trustTitle}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {slide.trustBody}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="absolute left-5 right-5 bottom-[230px] flex items-center gap-2.5 sm:left-6 sm:right-6 md:bottom-[248px]">
          {SLIDES.map((_, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ga naar slide ${i + 1}`}
                className="group relative h-[2px] w-10 overflow-hidden rounded-sm bg-white/15 transition-all sm:w-14 md:w-16"
              >
                <span
                  className={`absolute inset-y-0 left-0 bg-primary transition-[width] ${
                    isActive
                      ? "w-full duration-[6500ms] ease-linear"
                      : "w-0 duration-[400ms] ease-out"
                  }`}
                />
              </button>
            );
          })}
          <span className="ml-2 font-display text-[11px] tabular-nums text-muted-foreground sm:text-xs">
            {String(active + 1).padStart(2, "0")}
            <span className="mx-1.5 opacity-50">/</span>
            {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
