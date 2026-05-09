"use client";

import { useSyncExternalStore } from "react";
import { getMyList, MY_LIST_EVENT } from "@/store/myList";
import type { Movie } from "@/types/movie";
import MovieCarousel from "./MovieCarousel";

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

  return <MovieCarousel title="찜한 목록" movies={movies} />;
}
