import { ArrowRight, Building2, Home } from "lucide-react";
import particulierImg from "@/assets/particulier.jpg";
import zakelijkImg from "@/assets/zakelijk.jpg";
import { useSegment, type Segment } from "@/hooks/useSegment";

const data = {
  particulier: {
    eyebrow: "Voor particulieren",
    title: "Voor uw droomwoning of renovatieproject.",
    body: "Van maatwerk kozijnen en luxe schuifpuien tot energiezuinige voordeuren — wij realiseren oplossingen die uw woning mooier, warmer en waardevoller maken.",
    cta: "Plan een adviesgesprek",
    img: particulierImg,
    points: ["Maatwerk per woning", "Persoonlijke begeleiding", "Premium materialen"],
  },
  zakelijk: {
    eyebrow: "Voor bedrijven",
    title: "Oplossingen voor bedrijven en projecten.",
    body: "Van kantoorgebouwen tot bedrijfspanden en projectontwikkeling — wij leveren architecturale gevelsystemen op grote schaal, met strakke planning en betrouwbare oplevering.",
    cta: "Bespreek uw project",
    img: zakelijkImg,
    points: ["Projectmanagement", "Schaalbare productie", "B2B partnerships"],
  },
};

export function SegmentSwitch() {
  const [active] = useSegment();
  const d = data[active];
  const isZakelijk = active === "zakelijk";

  // Text slides in from the side OPPOSITE to where it now lives;
  // image slides in from the side OPPOSITE to where it now lives — "saling tarik".
  const textAnim = isZakelijk ? "slide-pull-right" : "slide-pull-left";
  const imgAnim = isZakelijk ? "slide-pull-left" : "slide-pull-right";

  return (
    <section className="relative px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="glass-strong mt-16 grid overflow-hidden rounded-2xl shadow-[var(--shadow-elevated)] lg:grid-cols-2">
          {/* Text panel */}
          <div
            key={`txt-${active}`}
            className={`${textAnim} flex flex-col justify-between gap-8 p-8 md:p-12 ${
              isZakelijk ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-primary">{d.eyebrow}</p>
              <h3 className="font-display mt-4 text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
                {d.title}
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{d.body}</p>
              <ul className="mt-6 space-y-2.5">
                {d.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-foreground/85">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#contact"
              className="group inline-flex w-fit items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:bg-primary hover:text-primary-foreground"
            >
              {d.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Image panel */}
          <div
            key={`img-${active}`}
            className={`${imgAnim} relative min-h-[280px] overflow-hidden lg:min-h-[420px] ${
              isZakelijk ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <img src={d.img} alt={d.title} className="h-full w-full object-cover" loading="lazy" />
            <div
              className={`absolute inset-0 ${
                isZakelijk
                  ? "bg-gradient-to-l from-background/40 via-transparent to-transparent"
                  : "bg-gradient-to-r from-background/40 via-transparent to-transparent"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Particulier / Zakelijk split bar — center toggle uses a TWO-COLOR split circle */
export function SegmentBar({
  active: _active,
  onChange: _onChange,
}: {
  active?: Segment;
  onChange?: (v: Segment) => void;
}) {
  const [active, setSeg] = useSegment();
  const select = (v: Segment) => {
    setSeg(v);
    _onChange?.(v);
  };

  return (
    <div className="glass-strong relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-2xl px-6 py-5 shadow-[var(--shadow-elevated)] md:px-8 md:py-6">
      {/* Particulier */}
      <button
        type="button"
        onClick={() => select("particulier")}
        className="group flex items-center gap-4 text-left"
      >
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ring-1 transition-all duration-500 ${
            active === "particulier"
              ? "bg-primary/15 ring-primary/40 text-primary"
              : "bg-white/5 ring-white/10 text-foreground/70"
          }`}
        >
          <Home className="h-5 w-5" />
        </span>
        <span className="flex flex-col leading-tight">
          <span
            className={`text-[12px] font-semibold uppercase tracking-[0.22em] transition-colors duration-500 ${
              active === "particulier" ? "text-primary" : "text-foreground/85"
            }`}
          >
            Particulier
          </span>
          <span className="mt-1 hidden text-xs text-muted-foreground md:inline">
            Voor uw droomwoning of renovatieproject.
          </span>
        </span>
      </button>

      {/* Center toggle — original circle look, with split 2-color background */}
      <div className="relative flex items-center justify-center">
        <span
          className={`absolute h-16 w-16 rounded-full border transition-colors duration-500 ${
            active === "particulier" ? "border-primary/50" : "border-foreground/30"
          }`}
        />
        <span
          className={`absolute h-16 w-16 rounded-full blur-md transition-colors duration-500 ${
            active === "particulier" ? "bg-primary/15" : "bg-foreground/10"
          }`}
        />
        <div className="relative z-10 h-14 w-14 overflow-hidden rounded-full ring-1 ring-white/15 backdrop-blur">
          {/* Split background halves */}
          <div className="absolute inset-0 grid grid-cols-2">
            <button
              type="button"
              aria-label="Particulier"
              onClick={() => select("particulier")}
              className={`transition-colors duration-500 ${
                active === "particulier"
                  ? "bg-primary/35"
                  : "bg-background/70 hover:bg-primary/15"
              }`}
            />
            <button
              type="button"
              aria-label="Zakelijk"
              onClick={() => select("zakelijk")}
              className={`transition-colors duration-500 ${
                active === "zakelijk"
                  ? "bg-foreground/25"
                  : "bg-background/70 hover:bg-foreground/15"
              }`}
            />
          </div>
          {/* Arrows on top — visual only, click passes through to halves */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-1.5">
            <ArrowLeft
              className={`h-3.5 w-3.5 transition-colors duration-500 ${
                active === "particulier" ? "text-primary" : "text-foreground/70"
              }`}
            />
            <ArrowRight
              className={`h-3.5 w-3.5 transition-colors duration-500 ${
                active === "zakelijk" ? "text-foreground" : "text-foreground/70"
              }`}
            />
          </div>
          {/* Center divider */}
          <span className="pointer-events-none absolute left-1/2 top-1.5 bottom-1.5 -translate-x-1/2 w-px bg-white/20" />
        </div>
      </div>


      {/* Zakelijk */}
      <button
        type="button"
        onClick={() => select("zakelijk")}
        className="group flex items-center justify-end gap-4 text-right"
      >
        <span className="flex flex-col leading-tight">
          <span
            className={`text-[12px] font-semibold uppercase tracking-[0.22em] transition-colors duration-500 ${
              active === "zakelijk" ? "text-primary" : "text-foreground/85"
            }`}
          >
            Zakelijk
          </span>
          <span className="mt-1 hidden text-xs text-muted-foreground md:inline">
            Oplossingen voor bedrijven en projecten.
          </span>
        </span>
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ring-1 transition-all duration-500 ${
            active === "zakelijk"
              ? "bg-primary/15 ring-primary/40 text-primary"
              : "bg-white/5 ring-white/10 text-foreground/70"
          }`}
        >
          <Building2 className="h-5 w-5" />
        </span>
      </button>
    </div>
  );
}
