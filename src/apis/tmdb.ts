import { Movie, RowType, TMDBResponse } from "@/types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = process.env.TMDB_ACCESS_TOKEN;

async function fetchMovies(url: string): Promise<Movie[]> {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`TMDB API 호출 실패 (${res.status}): ${body}`);
  }

  const data: TMDBResponse = await res.json();
  return data.results.slice(0, 10);
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  return fetchMovies(`${BASE_URL}/movie/popular?language=ko-KR&region=KR&page=1`);
}

export async function getMoviesByType(type: Exclude<RowType, "mylist">): Promise<Movie[]> {
  const endpoints: Record<Exclude<RowType, "mylist">, string> = {
    action: `${BASE_URL}/discover/movie?with_genres=28,35&language=ko-KR`,
    original: `${BASE_URL}/discover/movie?with_networks=213&language=ko-KR`,
    korea: `${BASE_URL}/discover/movie?with_original_language=ko&language=ko-KR&sort_by=popularity.desc`,
  };
  return fetchMovies(endpoints[type]);
}
