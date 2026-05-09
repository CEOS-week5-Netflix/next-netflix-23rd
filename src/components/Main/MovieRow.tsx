import { getMoviesByType } from "@/apis/tmdb";
import { RowType } from "@/types/movie";
import MovieCarousel from "./MovieCarousel";
import MyListRow from "./MyListRow";

const TITLES: Record<RowType, string> = {
  action: "액션 & 코미디",
  original: "Netflix 오리지널",
  korea: "한국 영화",
  mylist: "찜한 목록",
};

interface Props {
  type: RowType;
}

export default async function MovieRow({ type }: Props) {
  if (type === "mylist") {
    return <MyListRow />;
  }

  const movies = await getMoviesByType(type);

  return <MovieCarousel title={TITLES[type]} movies={movies} />;
}
