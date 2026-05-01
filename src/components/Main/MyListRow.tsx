"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import DetailLink from "@/components/Detail/DetailLink";
import { getMyList, MY_LIST_EVENT } from "@/store/myList";
import type { Movie } from "@/types/movie";

const IMAGE_BASE =
  process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const EMPTY_MOVIES: Movie[] = [];

function subscribeToMyList(onStoreChange: () => void) {
  window.addEventListener(MY_LIST_EVENT, onStoreChange);
  return () => window.removeEventListener(MY_LIST_EVENT, onStoreChange);
}

export default function MyListRow() {
  const movies = useSyncExternalStore(
    subscribeToMyList,
    getMyList,
    () => EMPTY_MOVIES,
  );

  if (movies.length === 0) return null;

  return (
    <div className="py-4">
      <h2 className="text-white font-semibold text-base px-4 mb-2">찜한 목록</h2>
      <div className="flex overflow-x-auto gap-2 px-4 scrollbar-hide">
        {movies.map((movie) => (
          <DetailLink
            id={movie.id}
            mediaType="movie"
            imagePath={movie.poster_path}
            title={movie.title}
            key={movie.id}
            className="relative flex-shrink-0 w-[100px] h-[150px]"
            ariaLabel={`${movie.title} 상세 페이지로 이동`}
          >
            <Image
              src={`${IMAGE_BASE}/w185${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="100px"
              className="object-cover rounded"
            />
          </DetailLink>
        ))}
      </div>
    </div>
  );
}
