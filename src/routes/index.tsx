import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { SegmentSwitch } from "@/components/site/SegmentSwitch";
import { WhyUs } from "@/components/site/WhyUs";
import { Configurator } from "@/components/site/Configurator";
import { Solutions } from "@/components/site/Solutions";
import { Projects } from "@/components/site/Projects";
import { ClientStories } from "@/components/site/ClientStories";
import { Footer } from "@/components/site/Footer";
import { getGoogleReviews } from "@/lib/google-reviews.server";

export const Route = createFileRoute("/")({
  loader: async () => {
    const reviewsFeed = await getGoogleReviews();

    return { reviewsFeed };
  },
  component: Index,
  head: () => ({
    meta: [
      { title: "Reina's B.V., premium maatwerk kozijnen, deuren en schuifpuien" },
      {
        name: "description",
        content:
          "Luxe maatwerk kozijnen, deuren, schuifpuien en rolluiken in Nederland. Vakmanschap, duurzame kwaliteit en architecturaal design voor particulier en zakelijk.",
      },
      { property: "og:title", content: "Reina's B.V., premium maatwerk kozijnen" },
      {
        property: "og:description",
        content: "Architecturaal maatwerk in heel Nederland, kozijnen, deuren en schuifpuien.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Index() {
  const { reviewsFeed } = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <SegmentSwitch />
      <WhyUs />
      <Configurator />
      <Solutions />
      <Projects />
      <ClientStories feed={reviewsFeed} />
      <Footer />
    </main>
  );
}
