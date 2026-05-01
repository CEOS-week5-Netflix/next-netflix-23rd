"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import { getMyList, MY_LIST_EVENT } from "@/store/myList";

const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

export default function MyListRow() {
  const [movies, setMovies] = useState<Movie[]>([]);

  function refresh() {
    setMovies(getMyList());
  }

  useEffect(() => {
    refresh();
    window.addEventListener(MY_LIST_EVENT, refresh);
    return () => window.removeEventListener(MY_LIST_EVENT, refresh);
  }, []);

  if (movies.length === 0) return null;

  return (
    <div className="py-4">
      <h2 className="text-white font-semibold text-base px-4 mb-2">찜한 목록</h2>
      <div className="flex overflow-x-auto gap-2 px-4 scrollbar-hide">
        {movies.map((movie) => (
          <div key={movie.id} className="relative flex-shrink-0 w-[100px] h-[150px]">
            <Image
              src={`${IMAGE_BASE}/w185${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
