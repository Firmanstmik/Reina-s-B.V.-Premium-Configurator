import { ArrowRight, Hammer, Leaf, ShieldCheck, Users } from "lucide-react";
import detail from "@/assets/detail-handle.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import { Reveal } from "./Reveal";

const features = [
  {
    icon: Hammer,
    title: "Maatwerk oplossingen",
    body: "Elk project is uniek. Wij leveren altijd oplossingen die perfect aansluiten bij uw wensen.",
  },
  {
    icon: ShieldCheck,
    title: "Duurzame kwaliteit",
    body: "Hoogwaardige materialen en productieprocessen voor een lange levensduur.",
  },
  {
    icon: Leaf,
    title: "Energie-efficiënt",
    body: "Uitstekende isolatie voor lager energieverbruik en meer wooncomfort.",
  },
  {
    icon: Users,
    title: "Professionele montage",
    body: "Vakkundige en nette installatie door ervaren specialisten.",
  },
];

export function WhyUs() {
  return (
    <section id="over" className="relative bg-warm px-4 py-28 md:px-6 md:py-40">
      <div className="mx-auto grid max-w-[82rem] gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Left */}
        <div>
          <Reveal variant="slide-left" className="w-fit">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[oklch(0.55_0.12_215)]">
              Waarom kiezen voor Reina&apos;s B.V.
            </p>
          </Reveal>
          <Reveal variant="slide-left" delay={1} className="w-fit">
            <h2 className="font-display mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-tight">
              Vakmanschap <span className="font-serif-italic">in elk detail.</span>
            </h2>
          </Reveal>
          <Reveal variant="slide-left" delay={2}>
            <p className="text-warm-muted mt-6 max-w-lg text-base leading-relaxed">
              Wij combineren hoogwaardige materialen met ambachtelijke vakkundigheid en de nieuwste
              technieken. Zo garanderen wij kwaliteit, veiligheid en design in elk project.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal
                key={f.title}
                variant="rise"
                delay={(i + 2) as 2 | 3 | 4 | 5}
                className="group"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[oklch(0.18_0.012_240)] text-[oklch(0.85_0.16_210)]">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="text-warm-muted mt-1.5 text-sm leading-relaxed">{f.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal variant="rise" delay={6} className="w-fit">
            <a
              href="#contact"
              className="border-warm text-[var(--light-fg)] group mt-12 inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition-colors hover:border-transparent hover:bg-foreground hover:text-background"
            >
              Meer over ons
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* Right: collage */}
        <Reveal variant="bloom" delay={2} className="relative h-[520px] lg:h-[620px]">
          <Reveal variant="curtain" className="absolute left-0 top-0 h-[78%] w-[70%]">
            <img
              src={detail}
              alt="Premium aluminium kozijn detail"
              className="h-full w-full rounded-2xl object-cover shadow-[var(--shadow-elevated)]"
              loading="lazy"
            />
          </Reveal>
          <Reveal
            variant="zoom-soft"
            delay={2}
            className="absolute right-0 top-[40%] h-[38%] w-[58%]"
          >
            <img
              src={p1}
              alt="Moderne villa"
              className="float-y h-full w-full rounded-2xl object-cover shadow-[var(--shadow-elevated)]"
              loading="lazy"
            />
          </Reveal>
          <Reveal
            variant="zoom-soft"
            delay={4}
            className="absolute bottom-0 left-[18%] h-[34%] w-[46%]"
          >
            <img
              src={p2}
              alt="Nieuwbouwwoning"
              className="h-full w-full rounded-2xl object-cover shadow-[var(--shadow-elevated)] [animation-delay:1.5s]"
              loading="lazy"
            />
          </Reveal>

          {/* Stamp badge */}
          <Reveal
            variant="zoom-soft"
            delay={5}
            className="absolute left-[26%] top-[24%] grid h-32 w-32 place-items-center rounded-full bg-[oklch(0.16_0.012_240)] text-center text-[oklch(0.97_0.005_240)]"
          >
            <div>
              <p className="font-display text-3xl font-medium leading-none">10+</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Jaar ervaring
              </p>
            </div>
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}
