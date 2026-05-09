import type { Movie, RowType, TMDBResponse } from "@/types/movie";
import type {
  TmdbDetail,
  TmdbSearchResult,
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

function getEmptySearchResult(page = 0): TmdbSearchResult {
  return {
    page,
    results: [],
    totalPages: 0,
    totalResults: 0,
  };
}

function filterValidMedia(items: TmdbTrendingItem[]): TmdbTrendingItem[] {
  return items
    .filter((item) => item.media_type !== "person")
    .filter((item) => getTmdbImagePath(item));
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

  return filterValidMedia(data.results ?? []).slice(0, 10);
}

export async function searchTmdb(
  query: string,
  page = 1,
): Promise<TmdbSearchResult> {
  const headers = getTmdbHeaders();
  const keyword = query.trim();
  const safePage = Math.max(1, Math.floor(page));

  if (!headers || !keyword) {
    return getEmptySearchResult();
  }

  const searchParams = new URLSearchParams({
    query: keyword,
    language: "en-US",
    include_adult: "false",
    page: String(safePage),
  });

  const response = await fetch(`${TMDB_BASE_URL}/search/multi?${searchParams}`, {
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    return getEmptySearchResult(safePage);
  }

  const data = (await response.json()) as TmdbTrendingResponse;
  const results = filterValidMedia(data.results ?? []);

  return {
    page: data.page ?? safePage,
    results,
    totalPages: data.total_pages ?? 0,
    totalResults: data.total_results ?? 0,
  };
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
