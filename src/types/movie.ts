export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
}

export interface TMDBResponse {
  results: Movie[];
}

export type RowType = "action" | "original" | "korea" | "mylist";
