import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";

const projects = [
  { title: "Moderne villa", tag: "Aluminium kozijnen & schuifpuien", loc: "Echt, Limburg", img: p1 },
  { title: "Nieuwbouw woning", tag: "Kunststof kozijnen", loc: "Maastricht", img: p2 },
  { title: "Bedrijfspand", tag: "Aluminium gevelkozijnen", loc: "Roermond", img: p3 },
  { title: "Renovatie woning", tag: "Kunststof kozijnen & deur", loc: "Sittard", img: p4 },
];

export function Projects() {
  return (
    <section id="projecten" className="bg-warm px-4 py-28 md:px-6 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "oklch(0.55 0.12 215)" }}>
              Onze recente projecten
            </p>
            <h2 className="font-display mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-tight">
              Inspirerende <span className="font-serif-italic">realisaties.</span>
            </h2>
          </div>
          <a
            href="#"
            className="border-warm group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-transparent hover:bg-foreground hover:text-background"
          >
            Bekijk alle projecten
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <a
              key={p.title}
              href="#"
              className="group relative overflow-hidden rounded-2xl border-warm border bg-card"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 text-white">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-medium tracking-tight">{p.title}</h3>
                    <p className="mt-1 text-[12px] opacity-80">{p.tag}</p>
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
      </div>
    </section>
  );
}
