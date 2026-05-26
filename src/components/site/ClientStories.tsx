import { ExternalLink } from "lucide-react";
import project1 from "@/assets/official-projects/reinas-project-1.jpg";
import project3 from "@/assets/official-projects/reinas-project-3.jpg";
import project5 from "@/assets/official-projects/reinas-project-5.jpg";
import project6 from "@/assets/official-projects/reinas-project-6.jpg";
import project8 from "@/assets/official-projects/reinas-project-8.jpg";
import {
  AnimatedTestimonials,
  type AnimatedTestimonialItem,
} from "@/components/ui/animated-testimonials";
import type { GoogleReviewsFeed } from "@/lib/google-reviews";
import { Reveal } from "./Reveal";

const projectScenes = [
  {
    src: project1,
    alt: "Reina's gevelvernieuwing project",
    objectPosition: "center center",
  },
  {
    src: project3,
    alt: "Reina's voordeur detail",
    objectPosition: "center center",
  },
  {
    src: project5,
    alt: "Reina's moderne kozijnen",
    objectPosition: "center top",
  },
  {
    src: project6,
    alt: "Reina's aluminium renovatieproject",
    objectPosition: "center center",
  },
  {
    src: project8,
    alt: "Reina's schuifpui project",
    objectPosition: "center center",
  },
];

const featuredReviewerPriority = [
  "i houben",
  "john lahaye",
  "petra van sloun",
  "johan gunther",
  "marcel snijders",
  "erik bemelen",
  "arjan gunther",
];

type ClientStoriesProps = {
  feed: GoogleReviewsFeed;
};

const fallbackTestimonials: Omit<
  AnimatedTestimonialItem,
  "imageSrc" | "imageAlt" | "imageObjectPosition" | "id"
>[] = [
  {
    name: "I Houben",
    quote:
      "rolluiken met somfy io serie motor en solar accu besteld en geplaatst. optijd geleverd en netjes geplaatst. werkt super. goede prijs en kwaliteit",
    meta: "Google review voor Reina's B.V.",
    age: "4 bulan lalu",
    rating: 5,
    avatarSrc: null,
    verifiedLabel: "Verified Google Review",
  },
  {
    name: "john lahaye",
    quote:
      "Snelle en vakkundige levering, installatie en expertise. Meteen even paar kaartjes van ze verspreid want voor die prijs kon ik het ook nergens vinden. Dus ik kan ze aanbevelen.",
    meta: "Google review voor Reina's B.V.",
    age: "6 bulan lalu",
    rating: 5,
    avatarSrc: null,
    verifiedLabel: "Verified Google Review",
  },
  {
    name: "Petra van Sloun",
    quote:
      "Super mooi en vakkundig werk geleverd! Ondanks de obstakels van een oud en scheef huis. Alles in 1 dag klaar en alles netjes achter gelaten.",
    meta: "Google review voor Reina's B.V.",
    age: "setahun lalu",
    rating: 5,
    avatarSrc: null,
    verifiedLabel: "Verified Google Review",
  },
  {
    name: "Johan Gunther",
    quote:
      "In slechts 6 weken van deskundig advies tot plaatsing van kunststof kozijnen. De monteurs hebben op vakkundige wijze geweldig werk geleverd en alles schoon achtergelaten. We kunnen Reina's echt van harte aanbevelen!",
    meta: "Google review voor Reina's B.V.",
    age: "setahun lalu",
    rating: 5,
    avatarSrc: null,
    verifiedLabel: "Verified Google Review",
  },
  {
    name: "Marcel Snijders",
    quote:
      "Geweldig werk afgeleverd. Heel netjes gewerkt. 4 dezelfde kunststof kozijnen geleverd en gemonteerd. Van offerte tot uitvoering gewoon top! Dikke 10 voor Reina's!",
    meta: "Google review voor Reina's B.V.",
    age: "setahun lalu",
    rating: 5,
    avatarSrc: null,
    verifiedLabel: "Verified Google Review",
  },
];

export function ClientStories({ feed }: ClientStoriesProps) {
  const prioritizedReviews = [...feed.reviews].sort((left, right) => {
    const leftIndex = getReviewerPriority(left.authorName);
    const rightIndex = getReviewerPriority(right.authorName);

    if (leftIndex !== rightIndex) {
      return leftIndex - rightIndex;
    }

    return right.rating - left.rating;
  });

  const sourceReviews =
    prioritizedReviews.length > 0
      ? prioritizedReviews.map((review) => ({
          id: review.id,
          quote: truncateReview(review.text),
          name: review.authorName,
          meta: `Google review voor ${feed.placeName}`,
          age: review.relativeTime,
          rating: review.rating,
          avatarSrc: review.authorPhotoUrl,
          verifiedLabel: "Verified Google Review",
          href: review.authorProfileUrl ?? feed.placeMapsUrl,
        }))
      : fallbackTestimonials.map((review, index) => ({
          ...review,
          id: `fallback-${index}`,
          href: feed.placeMapsUrl,
        }));

  const testimonialItems = sourceReviews.map<AnimatedTestimonialItem>((review, index) => {
    const projectScene = projectScenes[index % projectScenes.length];

    return {
      ...review,
      imageSrc: projectScene.src,
      imageAlt: projectScene.alt,
      imageObjectPosition: projectScene.objectPosition,
    };
  });

  const ratingLabel =
    feed.rating != null ? `${renderStars(feed.rating)} ${feed.rating.toFixed(1)}` : "★★★★★ 5.0";
  const reviewCountLabel =
    feed.reviewCount != null
      ? `Gebaseerd op ${feed.reviewCount} Google reviews`
      : "Gebaseerd op geselecteerde Google reviews";

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(4,7,12,1),rgba(6,10,16,0.96))] px-4 py-28 md:px-6 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:88px_88px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-primary/[0.08] to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-[28rem] w-[66rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-[82rem]">
        <Reveal variant="rise">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.28em] text-primary/88">
                Luxury client stories
              </p>
              <h2 className="mt-5 font-display text-[clamp(2.35rem,5vw,4.8rem)] font-medium leading-[1.02] tracking-tight text-white/94">
                Vertrouwen dat u
                <span className="font-serif-italic text-white/94"> direct voelt.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/58 md:text-[1.05rem]">
                Google reviews in een premium presentatie, gekoppeld aan echte Reina&apos;s
                projecten en ontworpen als trust layer vlak voor de laatste stap naar contact.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 lg:max-w-[25rem] lg:justify-end">
              <div className="rounded-lg border border-primary/20 bg-primary/10 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-primary/90">
                {ratingLabel}
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white/56">
                {reviewCountLabel}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal variant="bloom" className="mt-14">
          <AnimatedTestimonials
            items={testimonialItems}
            ratingLabel={ratingLabel}
            reviewCountLabel={reviewCountLabel}
            googleMapsUrl={feed.placeMapsUrl}
          />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={feed.placeMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-primary/22 bg-primary/12 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/16"
            >
              Bekijk Google Maps
              <ExternalLink className="h-4 w-4" />
            </a>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/54">
              Status: {feed.status}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function truncateReview(value: string, maxLength = 260) {
  const normalized = value.trim().replace(/\s+/g, " ");

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).trimEnd()}...`;
}

function renderStars(rating: number) {
  return "★★★★★".slice(0, Math.round(rating)).padEnd(5, "★");
}

function getReviewerPriority(name: string) {
  const normalized = name.trim().toLowerCase();
  const matchIndex = featuredReviewerPriority.findIndex((candidate) => candidate === normalized);

  return matchIndex === -1 ? featuredReviewerPriority.length + 1 : matchIndex;
}
