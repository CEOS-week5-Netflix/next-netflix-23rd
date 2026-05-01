import Image from "next/image";
import Link from "next/link";
import { getMoviesByType } from "@/apis/tmdb";
import { RowType } from "@/types/movie";
import MyListRow from "./MyListRow";

const IMAGE_BASE =
  process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

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

  return (
    <div className="py-4">
      <h2 className="text-white font-semibold text-base px-4 mb-2">
        {TITLES[type]}
      </h2>
      <div className="flex overflow-x-auto gap-2 px-4 scrollbar-hide">
        {movies.map((movie) => (
          <Link
            href={`/detail/${movie.id}?mediaType=movie`}
            key={movie.id}
            className="relative flex-shrink-0 w-[100px] h-[150px]"
            aria-label={`${movie.title} 상세 페이지로 이동`}
          >
            <Image
              src={`${IMAGE_BASE}/w185${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="100px"
              className="object-cover rounded"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
