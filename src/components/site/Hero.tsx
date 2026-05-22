import { ArrowRight, Play, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero-villa.jpg";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Luxe moderne villa met maatwerk aluminium kozijnen"
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background" />
        <div className="absolute inset-0 gradient-radial-glow" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-28 pt-40 md:pb-36 md:pt-44">
        <div className="max-w-3xl">
          <div className="reveal-up mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-glow" />
            Premium maatwerk kozijnen
          </div>

          <h1
            className="font-display reveal-up text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[1.02] tracking-tight text-foreground"
            style={{ animationDelay: "100ms" }}
          >
            Kozijnen die uw <br className="hidden sm:block" />
            leefruimte naar een{" "}
            <span className="font-serif-italic gradient-text">hoger niveau</span> tillen.
          </h1>

          <p
            className="reveal-up mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: "220ms" }}
          >
            Maatwerk kozijnen, deuren, schuifpuien en meer. Met vakmanschap, kwaliteit en oog
            voor detail realiseren wij duurzame oplossingen voor particuliere en zakelijke
            projecten in heel Limburg.
          </p>

          <div
            className="reveal-up mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "340ms" }}
          >
            <a
              href="#producten"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-primary to-primary-glow px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_20px_60px_-15px_oklch(0.78_0.13_215/0.7)]"
            >
              Bekijk producten
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

        {/* Trust badge floating card */}
        <div className="fade-in absolute right-6 top-40 hidden max-w-[260px] md:block" style={{ animationDelay: "600ms" }}>
          <div className="glass-strong rounded-2xl p-4 shadow-[var(--shadow-elevated)]">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Betrouwbaar & duurzaam</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Hoogwaardige materialen, vakkundige montage en betrouwbare service.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="fade-in absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block" style={{ animationDelay: "900ms" }}>
          <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span>Scroll</span>
            <span className="h-10 w-px bg-gradient-to-b from-muted-foreground/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
