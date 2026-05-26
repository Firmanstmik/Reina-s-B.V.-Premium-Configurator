export type GoogleReviewItem = {
  id: string;
  authorName: string;
  authorPhotoUrl: string | null;
  authorProfileUrl: string | null;
  rating: number;
  text: string;
  relativeTime: string;
  publishedAt: string | null;
};

export type GoogleReviewsFeed = {
  status: "live" | "stale" | "unconfigured" | "unavailable";
  placeName: string;
  placeAddress: string;
  placeMapsUrl: string;
  rating: number | null;
  reviewCount: number | null;
  reviews: GoogleReviewItem[];
  updatedAt: string;
  errorMessage?: string;
};
