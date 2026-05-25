import { useState, type ChangeEvent, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Building2, Check, Clock3, Mail, MapPin, Phone } from "lucide-react";
import projectVisual from "@/assets/official-projects/reinas-project-6.jpg";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const contactHighlights = [
  {
    title: "Persoonlijk advies",
    body: "Een helder gesprek over stijl, materiaal en maatwerk voor uw woning of project.",
    icon: Building2,
  },
  {
    title: "Snelle terugkoppeling",
    body: "Wij reageren doorgaans binnen een werkdag op uw aanvraag of offerteverzoek.",
    icon: Clock3,
  },
  {
    title: "Premium begeleiding",
    body: "Van eerste schets tot montage houden wij overzicht, kwaliteit en afwerking centraal.",
    icon: Check,
  },
];

const contactDetails = [
  {
    label: "Locatie",
    value: "Markt 5, Echt, Limburg, Nederland",
    href: "https://www.google.com/maps/search/?api=1&query=Markt+5+Echt+Limburg+Nederland",
    icon: MapPin,
  },
  {
    label: "Telefoon",
    value: "+31 6 12 34 56 78",
    href: "tel:+31612345678",
    icon: Phone,
  },
  {
    label: "E-mail",
    value: "info@reinas-bv.nl",
    href: "mailto:info@reinas-bv.nl",
    icon: Mail,
  },
];

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Reina's B.V." },
      {
        name: "description",
        content:
          "Neem contact op met Reina's B.V. voor premium maatwerk kozijnen, deuren, schuifpuien en projectadvies in Limburg.",
      },
      { property: "og:title", content: "Contact — Reina's B.V." },
      {
        property: "og:description",
        content: "Persoonlijk advies, offerte op maat en direct contact met Reina's B.V.",
      },
    ],
  }),
});

function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange =
    (field: keyof ContactForm) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Aanvraag via website van ${form.name || "nieuwe klant"}`);
    const body = encodeURIComponent(
      [
        `Naam: ${form.name}`,
        `E-mail: ${form.email}`,
        `Telefoon: ${form.phone}`,
        "",
        "Bericht:",
        form.message,
      ].join("\n"),
    );

    window.location.href = `mailto:info@reinas-bv.nl?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative overflow-hidden px-4 pb-20 pt-36 md:px-6 md:pb-28 md:pt-44">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-primary/[0.08] to-transparent" />
        <div className="pointer-events-none absolute right-[-8rem] top-24 h-[24rem] w-[24rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute left-[-6rem] top-[28rem] h-[20rem] w-[20rem] rounded-full bg-white/[0.04] blur-3xl" />

        <div className="relative mx-auto max-w-[82rem]">
          <Reveal variant="rise">
            <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              <div className="max-w-3xl">
                <p className="text-[11px] uppercase tracking-[0.28em] text-primary">
                  CONTACT REINA&apos;S B.V.
                </p>
                <h1 className="font-display mt-6 text-[clamp(2.7rem,6vw,5.2rem)] font-medium leading-[0.98] tracking-tight">
                  Laten we uw <span className="font-serif-italic gradient-text">project</span>{" "}
                  premium vormgeven.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  Voor maatwerk kozijnen, deuren, schuifpuien en zakelijke geveloplossingen denken
                  wij graag met u mee. Rustig, persoonlijk en met oog voor afwerking, planning en
                  uitstraling.
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {contactHighlights.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <Reveal
                        key={item.title}
                        variant="rise"
                        delay={(index + 1) as 1 | 2 | 3}
                        className="h-full"
                      >
                        <div className="glass-strong h-full rounded-[1.75rem] border border-white/10 p-5">
                          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/20">
                            <Icon className="h-5 w-5" />
                          </span>
                          <h2 className="mt-5 text-lg font-semibold tracking-tight">
                            {item.title}
                          </h2>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {item.body}
                          </p>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>

              <Reveal variant="slide-right">
                <div className="glass-strong relative overflow-hidden rounded-[2rem] border border-white/10 p-3">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
                  <img
                    src={projectVisual}
                    alt="Premium project van Reina's B.V."
                    className="h-[22rem] w-full rounded-[1.4rem] object-cover md:h-[30rem]"
                  />
                  <div className="absolute inset-x-8 bottom-8 rounded-[1.4rem] border border-white/10 bg-background/58 p-5 backdrop-blur-xl">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-primary">
                      Persoonlijk contact
                    </p>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/78">
                      Van particuliere renovatie tot zakelijke uitvoering: wij vertalen wensen naar
                      een oplossing die technisch klopt en visueel overtuigt.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 pb-24 md:px-6 md:pb-32">
        <div className="mx-auto grid max-w-[82rem] gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal variant="slide-left">
            <div className="glass-strong rounded-[2rem] border border-white/10 p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-primary">
                    Vraag advies aan
                  </p>
                  <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3.2rem)] font-medium tracking-tight">
                    Vertel ons kort wat u zoekt.
                  </h2>
                </div>
              </div>

              <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-foreground/88">Naam</span>
                    <input
                      value={form.name}
                      onChange={handleChange("name")}
                      required
                      className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/35"
                      placeholder="Uw naam"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-foreground/88">E-mail</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      required
                      className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/35"
                      placeholder="naam@bedrijf.nl"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-foreground/88">Telefoonnummer</span>
                  <input
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/35"
                    placeholder="+31 6 ..."
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-foreground/88">Bericht</span>
                  <textarea
                    value={form.message}
                    onChange={handleChange("message")}
                    required
                    rows={7}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/35"
                    placeholder="Vertel ons iets over uw woning, project of gewenste oplossing..."
                  />
                </label>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    Liever direct contact? Bel of mail ons gerust voor persoonlijk overleg.
                  </p>
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-14px_oklch(0.78_0.13_215/0.75)] transition-all hover:shadow-[0_20px_60px_-18px_oklch(0.78_0.13_215/0.85)]"
                  >
                    Verstuur aanvraag
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </form>
            </div>
          </Reveal>

          <div className="grid gap-8">
            <Reveal variant="slide-right">
              <div className="glass-strong rounded-[2rem] border border-white/10 p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-primary">
                  Direct contact
                </p>
                <h2 className="font-display mt-4 text-[clamp(1.8rem,3.2vw,2.8rem)] font-medium tracking-tight">
                  Bereikbaar voor particulieren en zakelijke projecten.
                </h2>

                <div className="mt-8 space-y-4">
                  {contactDetails.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.label === "Locatie" ? "_blank" : undefined}
                        rel={item.label === "Locatie" ? "noreferrer" : undefined}
                        className="group flex items-start gap-4 rounded-[1.35rem] border border-white/8 bg-white/[0.02] p-4 transition-colors hover:border-primary/20 hover:bg-white/[0.04]"
                      >
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/20">
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                            {item.label}
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-foreground/88">
                            {item.value}
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal variant="slide-right" delay={1}>
              <div className="glass-strong overflow-hidden rounded-[2rem] border border-white/10">
                <div className="border-b border-white/8 px-6 py-5">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-primary">
                    Bezoeklocatie
                  </p>
                  <h2 className="font-display mt-3 text-2xl font-medium tracking-tight">
                    Echt, Limburg
                  </h2>
                </div>
                <iframe
                  title="Kaart van Reina's B.V."
                  src="https://www.google.com/maps?q=Markt%205%20Echt%20Limburg%20Nederland&z=15&output=embed"
                  className="h-[20rem] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
