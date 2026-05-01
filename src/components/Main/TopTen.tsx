import { getTopRatedMovies } from "@/apis/tmdb";
import TopTenSection from "./TopTenSection";

export default async function TopTen() {
  const movies = await getTopRatedMovies();
  const IMAGE_BASE =
    process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

  return (
    <section className="absolute inset-0">
      <TopTenSection movies={movies} imageBase={IMAGE_BASE} />
    </section>
  );
}
