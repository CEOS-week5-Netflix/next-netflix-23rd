"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { getMyList, MY_LIST_EVENT } from "@/store/myList";

const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

function subscribeToMyList(onStoreChange: () => void) {
  window.addEventListener(MY_LIST_EVENT, onStoreChange);
  return () => window.removeEventListener(MY_LIST_EVENT, onStoreChange);
}

export default function MyListRow() {
  const movies = useSyncExternalStore(subscribeToMyList, getMyList, () => []);

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
