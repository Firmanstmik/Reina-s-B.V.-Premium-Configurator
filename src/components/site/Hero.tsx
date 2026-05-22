import { useEffect, useState } from "react";
import { ArrowRight, Play, ShieldCheck } from "lucide-react";
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
    eyebrow: "Particuliere markt · Maatwerk op niveau",
    titleLead: "Maatwerk kozijnen voor",
    titleItalic: "de woning",
    titleTail: "van uw leven.",
    description:
      "Van karakteristieke villa tot moderne nieuwbouw — wij ontwerpen, produceren en plaatsen kozijnen, deuren en schuifpuien die uw woning mooier, sterker en zekerder maken.",
    primaryLabel: "Ontdek ons aanbod",
    trustTitle: "Mooier · sterker · zekerder",
    trustBody: "Eigen vakmensen, A-merk materialen en een garantie waar u op kunt bouwen.",
  },
  {
    image: slide2,
    eyebrow: "Zakelijke markt · Architecturale gevels",
    titleLead: "Maatwerk kozijnen voor",
    titleItalic: "de zakelijke",
    titleTail: "vastgoedmarkt.",
    description:
      "Van kantoor en bedrijfspand tot grootschalige projectbouw — wij realiseren kozijnen, glasgevels en aluminium puien die voldoen aan de hoogste eisen op gebied van design, isolatie en duurzaamheid.",
    primaryLabel: "Bekijk zakelijke projecten",
    trustTitle: "Partner in projectbouw",
    trustBody: "Heldere planning, eigen montageteams en complete ontzorging — van eerste tekening tot oplevering.",
  },
  {
    image: slide3,
    eyebrow: "Specialist sinds jaar en dag",
    titleLead: "Uw betrouwbare partner voor",
    titleItalic: "kozijnen, rolluiken,",
    titleTail: "horren, screens & poorten.",
    description:
      "Eén specialist voor het volledige plaatje rond uw woning of pand. Hoogwaardige materialen, vakkundig advies en een afwerking tot in het laatste detail.",
    primaryLabel: "Vraag direct uw offerte aan",
    trustTitle: "Vakmanschap uit Limburg",
    trustBody: "Persoonlijk advies aan huis, scherpe offerte en oplevering volgens afspraak.",
  },
];

const INTERVAL = 6000;

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Slides */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => {
          const isActive = i === active;
          return (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ opacity: isActive ? 1 : 0 }}
              aria-hidden={!isActive}
            >
              <img
                src={slide.image}
                alt=""
                className="h-full w-full object-cover will-change-transform"
                style={{
                  transform: isActive ? "scale(1.08)" : "scale(1.0)",
                  transition: "transform 8000ms cubic-bezier(0.22,1,0.36,1)",
                }}
                width={1920}
                height={1280}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : undefined}
              />
            </div>
          );
        })}
        {/* Cinematic gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
        <div className="absolute inset-0 gradient-radial-glow opacity-70" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-28 pt-40 md:pb-36 md:pt-44">
        <div key={active} className="max-w-3xl">
          <div
            className="reveal-up mb-7 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[11px] uppercase tracking-[0.24em] text-primary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-glow" />
            {SLIDES[active].eyebrow}
          </div>

          <h1
            className="font-display reveal-up text-[clamp(2.75rem,7.4vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.02em] text-foreground"
            style={{ animationDelay: "120ms" }}
          >
            {SLIDES[active].titleLead}{" "}
            <span className="font-serif-italic gradient-text">{SLIDES[active].titleItalic}</span>{" "}
            {SLIDES[active].titleTail}
          </h1>

          <p
            className="reveal-up mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: "260ms" }}
          >
            {SLIDES[active].description}
          </p>

          <div
            className="reveal-up mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "400ms" }}
          >
            <a
              href="#producten"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-primary to-primary-glow px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_20px_60px_-15px_oklch(0.78_0.13_215/0.7)]"
            >
              {SLIDES[active].primaryLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button className="group inline-flex items-center gap-3 rounded-full glass px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-white/10">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/20 ring-1 ring-primary/40 transition-transform group-hover:scale-110">
                <Play className="h-3.5 w-3.5 fill-primary text-primary" />
              </span>
              Bekijk video
            </button>
          </div>
        </div>

        {/* Trust card */}
        <div
          key={`trust-${active}`}
          className="fade-in absolute right-6 top-40 hidden max-w-[280px] md:block"
          style={{ animationDelay: "600ms" }}
        >
          <div className="glass-strong rounded-2xl p-4 shadow-[var(--shadow-elevated)]">
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

        {/* Pagination + progress */}
        <div className="absolute bottom-10 left-6 right-6 flex items-center justify-between md:left-6">
          <div className="flex items-center gap-3">
            {SLIDES.map((_, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
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
            <span className="ml-3 font-display text-xs tabular-nums text-muted-foreground">
              {String(active + 1).padStart(2, "0")}
              <span className="mx-1.5 opacity-50">/</span>
              {String(SLIDES.length).padStart(2, "0")}
            </span>
          </div>

          <div className="hidden flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex">
            <span>Scroll</span>
            <span className="h-10 w-px bg-gradient-to-b from-muted-foreground/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
