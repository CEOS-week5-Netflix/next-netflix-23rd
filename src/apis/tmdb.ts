import { notFound } from "next/navigation";
import type {
  TmdbDetail,
  TmdbTrendingItem,
  TmdbTrendingResponse,
} from "@/types/tmdb";
import { getTmdbImagePath, getTmdbMediaType } from "@/utils/tmdb";

const TMDB_BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_BASE_URL ?? "https://api.themoviedb.org/3";

function getTmdbHeaders() {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;

  if (!accessToken) {
    return null;
  }

  return {
    Authorization: `Bearer ${accessToken}`,
    accept: "application/json",
  };
}

export async function getTopSearches(): Promise<TmdbTrendingItem[]> {
  const headers = getTmdbHeaders();

  if (!headers) {
    return [];
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/trending/all/day?language=en-US`,
    {
      headers,
      next: {
        revalidate: 60 * 60,
      },
    },
  );

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as TmdbTrendingResponse;

  return (data.results ?? [])
    .filter((item) => item.media_type !== "person")
    .filter((item) => getTmdbImagePath(item))
    .slice(0, 10);
}

export async function getDetail(
  id: string,
  mediaType?: string,
): Promise<TmdbDetail | null> {
  const headers = getTmdbHeaders();

  if (!headers) {
    return null;
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/${getTmdbMediaType(mediaType)}/${id}?language=en-US`,
    {
      headers,
      next: {
        revalidate: 60 * 60,
      },
    },
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as TmdbDetail;
}
