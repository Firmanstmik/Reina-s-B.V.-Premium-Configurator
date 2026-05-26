import { createServerFn } from "@tanstack/react-start";
import type { GoogleReviewItem, GoogleReviewsFeed } from "./google-reviews";

const GOOGLE_PLACE_QUERY =
  import.meta.env.GOOGLE_PLACES_TEXT_QUERY ?? "Reina's B.V. Hoogstraat 41b 6102 XS Echt Nederland";
const PLACE_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";
const PLACE_DETAILS_URL = "https://places.googleapis.com/v1/places";
const CACHE_TTL_MS = 1000 * 60 * 30;
const FALLBACK_PLACE_NAME = "Reina's B.V.";
const FALLBACK_PLACE_ADDRESS = "Hoogstraat 41b, 6102 XS Echt, Nederland";
const FALLBACK_MAPS_URL =
  "https://www.google.com/maps/place/Reina's+B.V/@51.0848322,5.8806288,17z/data=!4m17!1m8!3m7!1s0x47c0b6263468c78d:0x55bfda3d81bfcc0!2sHoogstraat+41b,+6102+XS+Echt,+Belanda!3b1!8m2!3d51.0848322!4d5.8832037!16s%2Fg%2F11x5kq_3cj!3m7!1s0x47c0b72c2d3cf76d:0x7404ac521f89d1e1!8m2!3d51.0850112!4d5.8831772!9m1!1b1!16s%2Fg%2F11lnvjzx8p?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D";

type CacheBucket = {
  expiresAt: number;
  value: GoogleReviewsFeed;
};

let memoryCache: CacheBucket | null = null;
let lastGoodFeed: GoogleReviewsFeed | null = null;

type GoogleSearchResponse = {
  places?: Array<{
    id?: string;
    displayName?: { text?: string };
    formattedAddress?: string;
    googleMapsUri?: string;
  }>;
};

type GoogleDetailsResponse = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  googleMapsUri?: string;
  rating?: number;
  userRatingCount?: number;
  reviews?: Array<{
    name?: string;
    rating?: number;
    relativePublishTimeDescription?: string;
    publishTime?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
  }>;
};

function getApiKey() {
  return import.meta.env.GOOGLE_MAPS_API_KEY?.trim() ?? "";
}

function baseFeed(overrides?: Partial<GoogleReviewsFeed>): GoogleReviewsFeed {
  return {
    status: "unavailable",
    placeName: FALLBACK_PLACE_NAME,
    placeAddress: FALLBACK_PLACE_ADDRESS,
    placeMapsUrl: FALLBACK_MAPS_URL,
    rating: null,
    reviewCount: null,
    reviews: [],
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

async function fetchJson<T>(input: RequestInfo | URL, init: RequestInit) {
  const response = await fetch(input, init);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Google Places request failed (${response.status}): ${message}`);
  }

  return (await response.json()) as T;
}

async function resolvePlaceId(apiKey: string) {
  const configuredPlaceId = import.meta.env.GOOGLE_PLACES_PLACE_ID?.trim();

  if (configuredPlaceId) {
    return configuredPlaceId;
  }

  const result = await fetchJson<GoogleSearchResponse>(PLACE_SEARCH_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "places.id,places.displayName,places.formattedAddress,places.googleMapsUri",
    },
    body: JSON.stringify({
      textQuery: GOOGLE_PLACE_QUERY,
      languageCode: "nl",
      regionCode: "NL",
      maxResultCount: 1,
    }),
  });

  const place = result.places?.[0];

  if (!place?.id) {
    throw new Error("No Google place match found for Reina's B.V.");
  }

  return place.id;
}

function mapReview(review: NonNullable<GoogleDetailsResponse["reviews"]>[number], index: number) {
  const text = review.originalText?.text ?? review.text?.text ?? "";
  const authorName = review.authorAttribution?.displayName?.trim() || `Google klant ${index + 1}`;

  const normalized: GoogleReviewItem = {
    id: review.name ?? `${authorName}-${index}`,
    authorName,
    authorPhotoUrl: review.authorAttribution?.photoUri ?? null,
    authorProfileUrl: review.authorAttribution?.uri ?? null,
    rating: review.rating ?? 5,
    text,
    relativeTime: review.relativePublishTimeDescription ?? "Google review",
    publishedAt: review.publishTime ?? null,
  };

  return normalized;
}

async function fetchGoogleReviewsLive(): Promise<GoogleReviewsFeed> {
  const apiKey = getApiKey();

  if (!apiKey) {
    return baseFeed({
      status: "unconfigured",
      errorMessage:
        "Google Places API key ontbreekt. Voeg GOOGLE_MAPS_API_KEY toe om live reviews automatisch te synchroniseren.",
    });
  }

  const placeId = await resolvePlaceId(apiKey);
  const details = await fetchJson<GoogleDetailsResponse>(
    `${PLACE_DETAILS_URL}/${placeId}?languageCode=nl&regionCode=NL`,
    {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "id,displayName,formattedAddress,googleMapsUri,rating,userRatingCount,reviews",
      },
    },
  );

  const reviews = (details.reviews ?? [])
    .map(mapReview)
    .filter((review) => review.text.trim().length > 0);

  return baseFeed({
    status: "live",
    placeName: details.displayName?.text ?? FALLBACK_PLACE_NAME,
    placeAddress: details.formattedAddress ?? FALLBACK_PLACE_ADDRESS,
    placeMapsUrl: details.googleMapsUri ?? FALLBACK_MAPS_URL,
    rating: typeof details.rating === "number" ? Number(details.rating.toFixed(1)) : null,
    reviewCount: details.userRatingCount ?? null,
    reviews,
    updatedAt: new Date().toISOString(),
  });
}

async function getCachedGoogleReviews() {
  const now = Date.now();

  if (memoryCache && memoryCache.expiresAt > now) {
    return memoryCache.value;
  }

  try {
    const liveFeed = await fetchGoogleReviewsLive();

    memoryCache = {
      expiresAt: now + CACHE_TTL_MS,
      value: liveFeed,
    };

    if (liveFeed.status === "live") {
      lastGoodFeed = liveFeed;
    }

    return liveFeed;
  } catch (error) {
    console.error("Failed to fetch Google reviews", error);

    if (lastGoodFeed) {
      const staleFeed = {
        ...lastGoodFeed,
        status: "stale" as const,
        updatedAt: new Date().toISOString(),
        errorMessage:
          "De laatste succesvolle Google review-sync wordt getoond terwijl een nieuwe update opnieuw wordt geprobeerd.",
      };

      memoryCache = {
        expiresAt: now + 1000 * 60 * 5,
        value: staleFeed,
      };

      return staleFeed;
    }

    return baseFeed({
      status: "unavailable",
      errorMessage:
        "Live Google reviews zijn tijdelijk niet beschikbaar. Probeer het later opnieuw of open direct Google Maps.",
    });
  }
}

export const getGoogleReviews = createServerFn({ method: "GET" }).handler(async () => {
  return getCachedGoogleReviews();
});
