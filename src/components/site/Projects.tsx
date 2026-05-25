import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import p1 from "@/assets/official-projects/reinas-project-1.jpg";
import p2 from "@/assets/official-projects/reinas-project-2.jpg";
import p3 from "@/assets/official-projects/reinas-project-3.jpg";
import p4 from "@/assets/official-projects/reinas-project-4.jpg";
import p5 from "@/assets/official-projects/reinas-project-5.jpg";
import p6 from "@/assets/official-projects/reinas-project-6.jpg";
import p7 from "@/assets/official-projects/reinas-project-7.jpg";
import p8 from "@/assets/official-projects/reinas-project-8.jpg";
import { Reveal } from "./Reveal";

const projects = [
  {
    title: "Gevelvernieuwing",
    tag: "Antraciete kozijnen en entree op maat",
    loc: "Laatste werk",
    img: p1,
    pos: "center center",
  },
  {
    title: "Warme entree",
    tag: "Voordeur en raamupgrade met avondbeleving",
    loc: "Laatste werk",
    img: p2,
    pos: "center center",
  },
  {
    title: "Klassieke voordeur",
    tag: "Witte voordeur met verfijnde detaillering",
    loc: "Laatste werk",
    img: p3,
    pos: "center center",
  },
  {
    title: "Rustige kozijnlijn",
    tag: "Kunststof raamoplossing met heldere lichtinval",
    loc: "Laatste werk",
    img: p4,
    pos: "center center",
  },
  {
    title: "Dakopbouw detail",
    tag: "Slanke zwarte kozijnen in een moderne uitbreiding",
    loc: "Laatste werk",
    img: p5,
    pos: "center top",
  },
  {
    title: "Terrasrenovatie",
    tag: "Aluminium kozijnen en achterdeur als totaalbeeld",
    loc: "Laatste werk",
    img: p6,
    pos: "center center",
  },
  {
    title: "Volledige gevelupgrade",
    tag: "Ramen, deur en afwerking in een krachtige compositie",
    loc: "Laatste werk",
    img: p7,
    pos: "center center",
  },
  {
    title: "Schuifpui op maat",
    tag: "Brede glaspartij met slanke profielen en zicht",
    loc: "Laatste werk",
    img: p8,
    pos: "center center",
  },
];

export function Projects() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const autoDirectionRef = useRef<1 | -1>(1);
  const pauseUntilRef = useRef(0);
  const hoverRef = useRef(false);
  const autoScrollRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;

    if (!el) {
      return;
    }

    let frame = 0;

    const tick = (timestamp: number) => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const lastFrame = lastFrameRef.current ?? timestamp;
      const deltaSeconds = Math.min((timestamp - lastFrame) / 1000, 0.05);

      lastFrameRef.current = timestamp;

      if (maxScroll > 0 && !isDragging && !hoverRef.current && Date.now() > pauseUntilRef.current) {
        autoScrollRef.current += 16 * deltaSeconds * autoDirectionRef.current;
        const next = autoScrollRef.current;

        if (next <= 0) {
          autoScrollRef.current = 0;
          el.scrollLeft = 0;
          autoDirectionRef.current = 1;
          pauseUntilRef.current = Date.now() + 260;
        } else if (next >= maxScroll) {
          autoScrollRef.current = maxScroll;
          el.scrollLeft = maxScroll;
          autoDirectionRef.current = -1;
          pauseUntilRef.current = Date.now() + 260;
        } else {
          el.scrollLeft = next;
        }
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      lastFrameRef.current = null;
    };
  }, [isDragging]);

  const pauseAutoscroll = (delay = 1800) => {
    pauseUntilRef.current = Date.now() + delay;
  };

  const nudgeScroll = (direction: 1 | -1) => {
    const el = scrollerRef.current;

    if (!el) {
      return;
    }

    autoDirectionRef.current = direction;
    pauseAutoscroll(2200);
    el.scrollBy({
      left: direction * 320,
      behavior: "smooth",
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;

    if (!el) {
      return;
    }

    setIsDragging(true);
    pauseAutoscroll(2600);
    dragStartXRef.current = event.clientX;
    startScrollLeftRef.current = el.scrollLeft;
    autoScrollRef.current = el.scrollLeft;
    el.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;

    if (!el || !isDragging) {
      return;
    }

    const delta = event.clientX - dragStartXRef.current;
    el.scrollLeft = startScrollLeftRef.current - delta;
    autoScrollRef.current = el.scrollLeft;
    autoDirectionRef.current = delta > 0 ? -1 : 1;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;

    if (!el) {
      return;
    }

    if (el.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }

    setIsDragging(false);
    pauseAutoscroll();
  };

  return (
    <section id="projecten" className="bg-warm px-4 py-28 md:px-6 md:py-36">
      <div className="mx-auto max-w-[82rem]">
        <Reveal variant="rise">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[oklch(0.55_0.12_215)]">
                Onze recente projecten
              </p>
              <h2 className="font-display mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-tight">
                Inspirerende <span className="font-serif-italic">realisaties.</span>
              </h2>
            </div>
            <a
              href="https://www.reinas-bv.nl/referenties"
              className="border-warm group inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-transparent hover:bg-foreground hover:text-background"
            >
              Bekijk alle projecten
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        <Reveal variant="zoom-soft" className="mt-14">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-warm to-transparent md:w-16" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-warm to-transparent md:w-16" />

            <div
              ref={scrollerRef}
              className={`flex gap-6 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                isDragging ? "cursor-grabbing select-none" : "cursor-grab"
              } touch-pan-y`}
              onScroll={() => {
                if (scrollerRef.current) {
                  autoScrollRef.current = scrollerRef.current.scrollLeft;
                }
              }}
              onMouseEnter={() => {
                hoverRef.current = true;
              }}
              onMouseLeave={() => {
                hoverRef.current = false;
                if (isDragging) {
                  setIsDragging(false);
                }
                pauseAutoscroll(900);
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {projects.map((p) => (
                <a
                  key={p.title}
                  href="https://www.reinas-bv.nl/referenties"
                  className="group relative block h-full w-[16.8rem] shrink-0 snap-start overflow-hidden rounded-2xl border border-warm bg-card sm:w-[17.4rem] lg:w-[18.1rem]"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                      style={{ objectPosition: p.pos }}
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 overflow-hidden bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 text-white">
                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="relative min-h-[5.7rem]">
                          <div className="absolute inset-x-0 bottom-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-10">
                            <h3 className="font-display text-lg font-medium tracking-tight">
                              {p.title}
                            </h3>
                          </div>
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-6 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
                            <p className="text-[12px] leading-relaxed text-white/82">{p.tag}</p>
                          </div>
                        </div>
                        <p className="mt-2 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] opacity-70">
                          <MapPin className="h-3 w-3" /> {p.loc}
                        </p>
                      </div>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <button
              type="button"
              aria-label="Geser proyek ke kiri"
              onClick={() => nudgeScroll(-1)}
              className="absolute left-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-[1.1rem] border border-black/8 bg-white/18 text-foreground/78 shadow-[0_18px_42px_-24px_oklch(0_0_0/0.24)] backdrop-blur-xl transition-all duration-500 hover:border-[oklch(0.74_0.14_215/0.42)] hover:bg-[oklch(0.94_0.03_215/0.58)] hover:text-[oklch(0.48_0.14_215)] hover:shadow-[0_20px_50px_-22px_oklch(0.72_0.14_215/0.38)] md:grid"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Geser proyek ke kanan"
              onClick={() => nudgeScroll(1)}
              className="absolute right-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-[1.1rem] border border-black/8 bg-white/18 text-foreground/78 shadow-[0_18px_42px_-24px_oklch(0_0_0/0.24)] backdrop-blur-xl transition-all duration-500 hover:border-[oklch(0.74_0.14_215/0.42)] hover:bg-[oklch(0.94_0.03_215/0.58)] hover:text-[oklch(0.48_0.14_215)] hover:shadow-[0_20px_50px_-22px_oklch(0.72_0.14_215/0.38)] md:grid"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
