import { ArrowRight, Hammer, Leaf, ShieldCheck, Users } from "lucide-react";
import detail from "@/assets/detail-handle.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";

const features = [
  { icon: Hammer, title: "Maatwerk oplossingen", body: "Elk project is uniek. Wij leveren altijd oplossingen die perfect aansluiten bij uw wensen." },
  { icon: ShieldCheck, title: "Duurzame kwaliteit", body: "Hoogwaardige materialen en productieprocessen voor een lange levensduur." },
  { icon: Leaf, title: "Energie-efficiënt", body: "Uitstekende isolatie voor lager energieverbruik en meer wooncomfort." },
  { icon: Users, title: "Professionele montage", body: "Vakkundige en nette installatie door ervaren specialisten." },
];

export function WhyUs() {
  return (
    <section id="over" className="relative bg-warm px-4 py-28 md:px-6 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Left */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "oklch(0.55 0.12 215)" }}>
            Waarom kiezen voor Reina&apos;s B.V.
          </p>
          <h2 className="font-display mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-tight">
            Vakmanschap <span className="font-serif-italic">in elk detail.</span>
          </h2>
          <p className="text-warm-muted mt-6 max-w-lg text-base leading-relaxed">
            Wij combineren hoogwaardige materialen met ambachtelijke vakkundigheid en de
            nieuwste technieken. Zo garanderen wij kwaliteit, veiligheid en design in elk project.
          </p>

          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title}>
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ background: "oklch(0.18 0.012 240)", color: "oklch(0.85 0.16 210)" }}
                >
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="text-warm-muted mt-1.5 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="border-warm group mt-12 inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition-colors hover:border-transparent hover:bg-foreground hover:text-background"
            style={{ color: "var(--light-fg)" }}
          >
            Meer over ons
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Right: collage */}
        <div className="relative h-[520px] lg:h-[620px]">
          <img
            src={detail}
            alt="Premium aluminium kozijn detail"
            className="absolute left-0 top-0 h-[78%] w-[70%] rounded-2xl object-cover shadow-[var(--shadow-elevated)]"
            loading="lazy"
          />
          <img
            src={p1}
            alt="Moderne villa"
            className="float-y absolute right-0 top-[40%] h-[38%] w-[58%] rounded-2xl object-cover shadow-[var(--shadow-elevated)]"
            loading="lazy"
          />
          <img
            src={p2}
            alt="Nieuwbouwwoning"
            className="absolute bottom-0 left-[18%] h-[34%] w-[46%] rounded-2xl object-cover shadow-[var(--shadow-elevated)]"
            loading="lazy"
            style={{ animationDelay: "1.5s" }}
          />

          {/* Stamp badge */}
          <div className="absolute left-[26%] top-[24%] grid h-32 w-32 place-items-center rounded-full text-center" style={{ background: "oklch(0.16 0.012 240)", color: "oklch(0.97 0.005 240)" }}>
            <div>
              <p className="font-display text-3xl font-medium leading-none">10+</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Jaar ervaring</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
