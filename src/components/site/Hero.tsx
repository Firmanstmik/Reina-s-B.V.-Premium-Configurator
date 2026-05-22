import { useEffect, useState } from "react";
import { ArrowRight, Play, ShieldCheck } from "lucide-react";
import slide1 from "@/assets/hero-slide-1.jpg";
import slide2 from "@/assets/hero-slide-2.jpg";
import slide3 from "@/assets/hero-slide-3.jpg";
import { SegmentBar } from "./SegmentSwitch";



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
      "Maatwerk kozijnen, deuren, schuifpuien en meer. Met vakmanschap, kwaliteit en oog voor detail realiseren wij duurzame oplossingen voor particuliere en zakelijke projecten.",
    primaryLabel: "Bekijk producten",
    trustTitle: "Betrouwbaar & duurzaam",
    trustBody:
      "Hoogwaardige materialen, vakkundige montage en betrouwbare service.",
  },
  {
    image: slide2,
    eyebrow: "Zakelijke markt · Architecturale gevels",
    titleLead: "Architectuur die",
    titleItalic: "uw merk",
    titleTail: "een gezicht geeft.",
    description:
      "Van kantoor en bedrijfspand tot grootschalige projectbouw — wij realiseren glasgevels en aluminium puien die voldoen aan de hoogste eisen op gebied van design, isolatie en duurzaamheid.",
    primaryLabel: "Bekijk zakelijke projecten",
    trustTitle: "Partner in projectbouw",
    trustBody:
      "Heldere planning, eigen montageteams en complete ontzorging — van tekening tot oplevering.",
  },
  {
    image: slide3,
    eyebrow: "Vakmanschap uit Limburg",
    titleLead: "Eén specialist voor",
    titleItalic: "uw complete",
    titleTail: "gevel & buitenruimte.",
    description:
      "Kozijnen, rolluiken, horren, screens en poorten — hoogwaardige materialen, vakkundig advies en een afwerking tot in het laatste detail. Persoonlijk geleverd, vakkundig geplaatst.",
    primaryLabel: "Vraag direct uw offerte aan",
    trustTitle: "Vakmanschap uit Limburg",
    trustBody:
      "Persoonlijk advies aan huis, scherpe offerte en oplevering volgens afspraak.",
  },
];

const INTERVAL = 6000;

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

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-background"
      style={{ minHeight: "100vh" }}
    >
      {/* Slides — fixed frame, identical sizing; clip-path curtain reveal */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => {
          const isActive = i === active;
          const isPrev = i === prev;
          return (
            <div
              key={i}
              className="absolute inset-0 overflow-hidden"
              style={{
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
                opacity: isActive || isPrev ? 1 : 0,
              }}
              aria-hidden={!isActive}
            >
              <div
                key={`${i}-${active}`}
                className={`absolute inset-0 ${isActive ? "hero-img-enter" : isPrev ? "hero-img-exit" : ""}`}
              >
                <img
                  src={slide.image}
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
        <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-background/30 via-transparent to-background/90" />
        <div className="pointer-events-none absolute inset-0 z-[3] gradient-radial-glow opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-[140px] pb-[220px] md:pt-[160px]">

        <div className="max-w-2xl">
          <div
            key={`eyebrow-${active}`}
            className="fade-in mb-7 inline-flex items-center gap-2 rounded-lg glass px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-primary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-glow" />
            {SLIDES[active].eyebrow}
          </div>

          <h1
            key={`title-${active}`}
            className="font-display fade-in text-[clamp(2.5rem,6.4vw,5.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-foreground"
            style={{ animationDuration: "600ms" }}
          >
            {SLIDES[active].titleLead}{" "}
            <span className="font-serif-italic gradient-text">{SLIDES[active].titleItalic}</span>{" "}
            {SLIDES[active].titleTail}
          </h1>

          <p
            key={`desc-${active}`}
            className="fade-in mt-7 max-w-lg text-[15px] leading-relaxed text-muted-foreground md:text-base"
            style={{ animationDuration: "700ms" }}
          >
            {SLIDES[active].description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              key={`cta-${active}`}
              href="#producten"
              className="group fade-in inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_12px_40px_-12px_oklch(0.78_0.13_215/0.55)] transition-all hover:shadow-[0_20px_60px_-15px_oklch(0.78_0.13_215/0.75)]"
              style={{ animationDuration: "700ms" }}
            >
              {SLIDES[active].primaryLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button className="group inline-flex items-center gap-3 rounded-xl px-2 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground transition-all">
              <span className="grid h-10 w-10 place-items-center rounded-full glass ring-1 ring-white/15 transition-transform group-hover:scale-110">
                <Play className="h-3.5 w-3.5 fill-primary text-primary" />
              </span>
              Bekijk video
            </button>
          </div>
        </div>


        {/* Trust card */}
        <div
          key={`trust-${active}`}
          className="fade-in pointer-events-none absolute right-6 bottom-[260px] hidden max-w-[300px] md:block"
          style={{ animationDelay: "600ms" }}
        >
          <div className="glass-strong pointer-events-auto rounded-2xl p-4 shadow-[var(--shadow-elevated)]">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{SLIDES[active].trustTitle}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {SLIDES[active].trustBody}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="absolute left-6 right-6 bottom-[200px] flex items-center gap-3 md:bottom-[210px]">
          {SLIDES.map((_, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Ga naar slide ${i + 1}`}
                className="group relative h-[2px] w-12 overflow-hidden rounded-full bg-white/15 transition-all md:w-16"
              >
                <span
                  className="absolute inset-y-0 left-0 bg-primary"
                  style={{
                    width: isActive ? "100%" : "0%",
                    transition: isActive ? `width ${INTERVAL}ms linear` : "width 400ms ease",
                  }}
                />
              </button>
            );
          })}
          <span className="ml-2 font-display text-xs tabular-nums text-muted-foreground">
            {String(active + 1).padStart(2, "0")}
            <span className="mx-1.5 opacity-50">/</span>
            {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Particulier / Zakelijk bottom bar */}
        <div className="absolute left-4 right-4 bottom-8 md:left-6 md:right-6">
          <SegmentBar />
        </div>
      </div>
    </section>
  );
}
