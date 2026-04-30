import Image from "next/image";
import Link from "next/link";

type TmdbTrendingItem = {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  backdrop_path: string | null;
  poster_path: string | null;
  media_type: "movie" | "tv" | "person";
};

type TmdbTrendingResponse = {
  results?: TmdbTrendingItem[];
};

const TMDB_BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_BASE_URL ?? "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

export const dynamic = "force-dynamic";

async function getTopSearches() {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;

  if (!accessToken) {
    return [];
  }

  const response = await fetch(`${TMDB_BASE_URL}/trending/all/day?language=en-US`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      accept: "application/json",
    },
    next: {
      revalidate: 60 * 60,
    },
  });

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as TmdbTrendingResponse;

  return (data.results ?? [])
    .filter((item) => item.media_type !== "person")
    .filter((item) => item.backdrop_path || item.poster_path)
    .slice(0, 10);
}

function getTitle(item: TmdbTrendingItem) {
  return (
    item.original_title ??
    item.original_name ??
    item.title ??
    item.name ??
    "Untitled"
  );
}

function getImagePath(item: TmdbTrendingItem) {
  return item.backdrop_path ?? item.poster_path;
}

export default async function SearchPage() {
  const topSearches = await getTopSearches();

  return (
    <section className="flex h-full w-full flex-col overflow-hidden bg-black">
      <div className="h-11 w-full flex-none bg-black" aria-hidden="true" />

      <div className="flex h-[52px] w-full flex-none items-center bg-grey-800 px-5">
        <Image
          src="/icons/ic_search_long.svg"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 flex-none"
        />
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          name="search"
          type="text"
          inputMode="search"
          placeholder="Search for a show, movie, genre, e.t.c."
          className="ml-5 flex h-[31px] min-w-0 flex-1 appearance-none items-center bg-transparent font-[Pretendard] text-[15px] leading-[135%] font-normal tracking-[-0.3px] text-white outline-none placeholder:font-normal placeholder:text-grey-600 [font-feature-settings:'liga'_off,'clig'_off]"
        />
        <button
          type="button"
          className="ml-4 flex h-4 w-4 flex-none items-center justify-center bg-transparent p-0"
          aria-label="Clear search"
        >
          <Image
            src="/icons/ic_x.svg"
            alt=""
            width={16}
            height={16}
            className="h-4 w-4"
          />
        </button>
      </div>

      <div className="no-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto pb-4">
        <h1 className="my-[15px] px-4 text-left font-[Pretendard] text-[24px] leading-[135%] font-semibold tracking-[-0.48px] text-white [font-feature-settings:'liga'_off,'clig'_off]">
          Top Searches
        </h1>

        {topSearches.length > 0 ? (
          <ul className="flex w-full flex-col items-start gap-1">
            {topSearches.map((item) => {
              const imagePath = getImagePath(item);

              return (
                <li key={`${item.media_type}-${item.id}`} className="w-full">
                  <Link
                    href={`/detail/${item.id}?mediaType=${item.media_type}`}
                    className="flex h-[76px] w-full items-center bg-grey-800"
                  >
                    <div className="relative h-[76px] w-[146px] flex-none overflow-hidden rounded-[2px] bg-grey-900">
                      {imagePath ? (
                        <Image
                          src={`${TMDB_IMAGE_BASE_URL}/w300${imagePath}`}
                          alt=""
                          fill
                          sizes="146px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="ml-[18px] flex h-7 w-[199px] flex-none items-center justify-between">
                      <p className="min-w-0 max-w-[151px] overflow-hidden font-[Pretendard] text-[16px] leading-[135%] font-normal tracking-[-0.32px] text-ellipsis whitespace-nowrap text-white [font-feature-settings:'liga'_off,'clig'_off]">
                        {getTitle(item)}
                      </p>
                      <span
                        className="flex h-7 w-7 flex-none items-center justify-center"
                        aria-hidden="true"
                      >
                        <Image
                          src="/icons/ic_play_circle.svg"
                          alt=""
                          width={23.333}
                          height={23.333}
                          className="h-[23.333px] w-[23.333px]"
                        />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="px-4 text-body-2 text-grey-600">
            TMDB_ACCESS_TOKEN을 .env.local에 추가하면 Top Searches가 표시됩니다.
          </p>
        )}
      </div>
    </section>
  );
}
