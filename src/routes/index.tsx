import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { SegmentSwitch } from "@/components/site/SegmentSwitch";
import { WhyUs } from "@/components/site/WhyUs";
import { Configurator } from "@/components/site/Configurator";
import { Solutions } from "@/components/site/Solutions";
import { Projects } from "@/components/site/Projects";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Reina's B.V. — Premium maatwerk kozijnen, deuren & schuifpuien" },
      {
        name: "description",
        content:
          "Luxe maatwerk kozijnen, deuren, schuifpuien en rolluiken in Limburg. Vakmanschap, duurzame kwaliteit en architecturaal design voor particulier en zakelijk.",
      },
      { property: "og:title", content: "Reina's B.V. — Premium maatwerk kozijnen" },
      {
        property: "og:description",
        content: "Architecturaal maatwerk in heel Limburg — kozijnen, deuren, schuifpuien.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <SegmentSwitch />
      <WhyUs />
      <Configurator />
      <Solutions />
      <Projects />
      <Footer />
    </main>
  );
}
