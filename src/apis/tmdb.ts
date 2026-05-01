import { notFound } from "next/navigation";
import type { Movie, RowType, TMDBResponse } from "@/types/movie";
import type {
  TmdbDetail,
  TmdbTrendingItem,
  TmdbTrendingResponse,
} from "@/types/tmdb";
import { getTmdbImagePath, getTmdbMediaType } from "@/utils/tmdb";

const TMDB_BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_BASE_URL ?? "https://api.themoviedb.org/3";

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

function getTmdbHeaders() {
  if (!TMDB_ACCESS_TOKEN) {
    return null;
  }

  return {
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
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

export async function searchTmdb(query: string): Promise<TmdbTrendingItem[]> {
  const headers = getTmdbHeaders();
  const keyword = query.trim();

  if (!headers || !keyword) {
    return [];
  }

  const searchParams = new URLSearchParams({
    query: keyword,
    language: "en-US",
    include_adult: "false",
  });

  const response = await fetch(`${TMDB_BASE_URL}/search/multi?${searchParams}`, {
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as TmdbTrendingResponse;

  return (data.results ?? [])
    .filter((item) => item.media_type !== "person")
    .filter((item) => getTmdbImagePath(item))
    .slice(0, 20);
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

async function fetchMovies(url: string): Promise<Movie[]> {
  const headers = getTmdbHeaders();

  if (!headers) {
    return [];
  }

  const res = await fetch(url, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`TMDB API 호출 실패 (${res.status}): ${body}`);
  }

  const data: TMDBResponse = await res.json();
  return data.results.filter((movie) => movie.poster_path).slice(0, 10);
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  return fetchMovies(
    `${TMDB_BASE_URL}/movie/popular?language=ko-KR&region=KR&page=1`,
  );
}

export async function getMoviesByType(
  type: Exclude<RowType, "mylist">,
): Promise<Movie[]> {
  const endpoints: Record<Exclude<RowType, "mylist">, string> = {
    action: `${TMDB_BASE_URL}/discover/movie?with_genres=28,35&language=ko-KR`,
    original: `${TMDB_BASE_URL}/discover/movie?with_networks=213&language=ko-KR`,
    korea: `${TMDB_BASE_URL}/discover/movie?with_original_language=ko&language=ko-KR&sort_by=popularity.desc`,
  };

  return fetchMovies(endpoints[type]);
}
