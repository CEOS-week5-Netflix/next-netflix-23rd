export type TmdbMediaType = "movie" | "tv" | "person";

export type TmdbTrendingItem = {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  backdrop_path: string | null;
  poster_path: string | null;
  media_type: TmdbMediaType;
};

export type TmdbTrendingResponse = {
  page?: number;
  results?: TmdbTrendingItem[];
  total_pages?: number;
  total_results?: number;
};

export type TmdbSearchResult = {
  page: number;
  results: TmdbTrendingItem[];
  totalPages: number;
  totalResults: number;
};

export type TmdbDetail = {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
};
