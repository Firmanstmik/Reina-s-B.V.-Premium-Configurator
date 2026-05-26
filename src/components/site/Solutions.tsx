import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import aluminiumKozijnen from "@/assets/official-solutions/reinas-aluminium-kozijnen.jpeg";
import houtenKozijnen from "@/assets/official-solutions/reinas-houten-kozijnen.jpeg";
import kunststofKozijnen from "@/assets/official-solutions/reinas-kunststof-kozijnen.jpeg";
import schuifpuienImage from "@/assets/official-solutions/reinas-schuifpuien.jpeg";
import voordeurenImage from "@/assets/official-solutions/reinas-voordeuren.jpeg";
import zakelijkeGevelsystemen from "@/assets/official-solutions/reinas-zakelijke-gevelsystemen.jpeg";
import { CometCard } from "@/components/ui/comet-card";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SolutionCard = {
  title: string;
  description: string;
  feature: string;
  cta: string;
  href: string;
  image: string;
  objectPosition: string;
  className: string;
  accent: string;
  eyebrow: string;
};

const solutions: SolutionCard[] = [
  {
    title: "Aluminium Kozijnen",
    description:
      "Slanke profielen, royale lichtinval en een architecturale uitstraling voor moderne villa's en hoogwaardige renovaties.",
    feature: "Slanke lijnen · hoge isolatiewaarde · premium afwerking",
    cta: "Ontdek systeem",
    href: "https://www.reinas-bv.nl/onze-producten/aluminium-kozijnen",
    image: aluminiumKozijnen,
    objectPosition: "78% 30%",
    className: "md:col-span-2 min-h-[26rem] lg:min-h-[30rem]",
    accent: "rgba(108, 184, 230, 0.22)",
    eyebrow: "Architectural minimal",
  },
  {
    title: "Kunststof Kozijnen",
    description:
      "Onderhoudsarm comfort met een verfijnde uitstraling, ontworpen voor duurzaam woonplezier en een rustige gevelcompositie.",
    feature: "Rustige detaillering · warm comfort · duurzame keuze",
    cta: "Bekijk mogelijkheden",
    href: "https://www.reinas-bv.nl/onze-producten/kunststof-kozijnen",
    image: kunststofKozijnen,
    objectPosition: "center center",
    className: "min-h-[23rem] lg:min-h-[27rem]",
    accent: "rgba(122, 204, 232, 0.18)",
    eyebrow: "Quiet comfort",
  },
  {
    title: "Houten Kozijnen",
    description:
      "Natuurlijke diepte en een warme, ambachtelijke uitstraling voor woningen waar karakter en verfijning samenkomen.",
    feature: "Natuurlijk materiaal · verfijnde detaillering · tijdloze luxe",
    cta: "Ontdek systeem",
    href: "https://www.reinas-bv.nl/onze-producten/houten-kozijnen",
    image: houtenKozijnen,
    objectPosition: "center center",
    className: "min-h-[23rem] lg:min-h-[27rem]",
    accent: "rgba(214, 184, 136, 0.16)",
    eyebrow: "Warm materiality",
  },
  {
    title: "Schuifpuien",
    description:
      "Maximale openheid tussen binnen en buiten, met strakke kaders en een premium beleving van licht, zicht en ruimte.",
    feature: "Panoramisch zicht · vloeiende overgang · elegante profielen",
    cta: "Configureer live",
    href: "https://www.reinas-bv.nl/",
    image: schuifpuienImage,
    objectPosition: "center center",
    className: "md:col-span-2 min-h-[24rem] lg:min-h-[28rem]",
    accent: "rgba(92, 176, 224, 0.22)",
    eyebrow: "Inside meets out",
  },
  {
    title: "Voordeuren",
    description:
      "Een entree die direct vertrouwen, klasse en identiteit uitstraalt, met maatwerk dat perfect aansluit op de architectuur.",
    feature: "Sterke eerste indruk · veiligheid · maatwerk entree",
    cta: "Bekijk mogelijkheden",
    href: "https://www.reinas-bv.nl/",
    image: voordeurenImage,
    objectPosition: "center center",
    className: "min-h-[24rem] lg:min-h-[28rem]",
    accent: "rgba(145, 192, 226, 0.2)",
    eyebrow: "Entrance statement",
  },
  {
    title: "Zakelijke Gevelsystemen",
    description:
      "Representatieve geveloplossingen voor bedrijfspanden, utiliteit en projectbouw waar uitstraling, prestaties en schaal samenkomen.",
    feature: "Projectmatige slagkracht · strakke gevels · betrouwbare uitvoering",
    cta: "Plan een adviesgesprek",
    href: "https://www.reinas-bv.nl/projecten-zakelijke-markt",
    image: zakelijkeGevelsystemen,
    objectPosition: "center top",
    className: "min-h-[24rem] lg:min-h-[28rem]",
    accent: "rgba(90, 183, 232, 0.18)",
    eyebrow: "Commercial systems",
  },
];

export function Solutions() {
  return (
    <section
      id="oplossingen"
      className="relative overflow-hidden bg-background px-4 py-28 md:px-6 md:py-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/[0.06] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-[oklch(0.96_0.01_78_/_0.08)] to-[oklch(0.97_0.008_80_/_0.68)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:96px_96px]" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-[28rem] w-[72rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-[82rem]">
        <Reveal variant="rise" className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-primary">ONZE OPLOSSINGEN</p>
          <h2 className="font-display mt-5 text-[clamp(2.4rem,5vw,4.7rem)] font-medium leading-[1.02] tracking-tight">
            Architectuur die <span className="font-serif-italic gradient-text">luxe</span> voelbaar
            maakt.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">
            Maatwerk systemen voor comfort, design en duurzaamheid, gepresenteerd zoals de projecten
            ook aanvoelen: rustig, precies en premium afgewerkt.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
          {solutions.map((solution, index) => (
            <Reveal
              key={solution.title}
              variant={index % 2 === 0 ? "slide-left" : "slide-right"}
              delay={((index % 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6}
              className={solution.className}
            >
              <SolutionPanel solution={solution} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionPanel({ solution }: { solution: SolutionCard }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, { stiffness: 180, damping: 22, mass: 0.8 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 180, damping: 22, mass: 0.8 });
  const imageX = useSpring(useTransform(rotateY, [-8, 8], [12, -12]), {
    stiffness: 180,
    damping: 24,
    mass: 0.8,
  });
  const imageY = useSpring(useTransform(rotateX, [-8, 8], [-10, 10]), {
    stiffness: 180,
    damping: 24,
    mass: 0.8,
  });

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(x * 8);
    rotateX.set(y * -8);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <CometCard
      className="h-full"
      rotateDepth={7.5}
      translateDepth={7}
      hoverScale={1}
      glareOpacity={0.18}
    >
      <motion.a
        href={solution.href}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "group glass-strong relative block h-full overflow-hidden rounded-[2rem] border border-white/10",
          "shadow-[0_28px_90px_-32px_oklch(0_0_0/0.82),0_0_0_1px_oklch(1_0_0/0.04)]",
        )}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.85_0.16_210_/_0.08),transparent_38%)] opacity-80" />
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${solution.accent}, transparent 34%, transparent 68%, rgba(255,255,255,0.05))`,
          }}
        />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-primary/35" />
        </div>

        <motion.img
          src={solution.image}
          alt={solution.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            x: imageX,
            y: imageY,
            objectPosition: solution.objectPosition,
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-background/92 via-background/62 to-background/14 md:via-background/48" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/12 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-[38%] bg-gradient-to-r from-primary/10 to-transparent opacity-70 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

        <div className="relative flex h-full flex-col justify-between p-6 md:p-8 lg:p-10">
          <div className="max-w-[36rem]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/45 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-foreground/78 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_oklch(0.85_0.16_210/0.9)]" />
              {solution.eyebrow}
            </div>
            <h3 className="font-display mt-5 max-w-[14ch] text-[clamp(1.75rem,3vw,3.2rem)] font-medium leading-[1.02] tracking-tight text-white">
              {solution.title}
            </h3>
            <p className="mt-4 max-w-[38rem] text-sm leading-relaxed text-white/74 md:text-[15px]">
              {solution.description}
            </p>
            <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-primary/90">
              {solution.feature}
            </p>
          </div>

          <div className="mt-10 flex items-end justify-between gap-4">
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/42">
              Premium architectural systems
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/14 px-4 py-2 text-[12px] font-semibold text-primary shadow-[0_12px_34px_-18px_oklch(0.78_0.13_215/0.9)] backdrop-blur-md transition-all duration-500 group-hover:border-primary/40 group-hover:bg-primary/18">
              {solution.cta}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-80" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 rounded-full bg-primary/12 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-y-0 right-5 hidden w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent md:block" />
      </motion.a>
    </CometCard>
  );
}
