/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GOOGLE_MAPS_API_KEY?: string;
  readonly GOOGLE_PLACES_PLACE_ID?: string;
  readonly GOOGLE_PLACES_TEXT_QUERY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
