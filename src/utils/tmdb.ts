import type { TmdbDetail, TmdbTrendingItem } from "@/types/tmdb";

export const TMDB_IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

export function getTmdbTitle(item: TmdbDetail | TmdbTrendingItem) {
  return (
    item.original_title ??
    item.original_name ??
    item.title ??
    item.name ??
    "Untitled"
  );
}

export function getTmdbImagePath(item: TmdbDetail | TmdbTrendingItem) {
  return item.backdrop_path ?? item.poster_path;
}

export function getTmdbMediaType(mediaType?: string) {
  return mediaType === "tv" ? "tv" : "movie";
}

export function getTmdbImageUrl(path: string, size = "w300") {
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}
