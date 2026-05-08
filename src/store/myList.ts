"use client";

import { Movie } from "@/types/movie";

const KEY = "myList";
const EMPTY_LIST: Movie[] = [];

let cachedRaw: string | null = null;
let cachedList: Movie[] = EMPTY_LIST;

function isMovie(value: unknown): value is Movie {
  if (!value || typeof value !== "object") {
    return false;
  }

  const movie = value as Partial<Movie>;

  return (
    typeof movie.id === "number" &&
    typeof movie.title === "string" &&
    typeof movie.poster_path === "string"
  );
}

export function getMyList(): Movie[] {
  if (typeof window === "undefined") return EMPTY_LIST;

  const raw = localStorage.getItem(KEY) ?? "[]";

  if (raw === cachedRaw) {
    return cachedList;
  }

  try {
    cachedRaw = raw;
    const parsed = JSON.parse(raw);
    cachedList = Array.isArray(parsed) ? parsed.filter(isMovie) : EMPTY_LIST;
    return cachedList;
  } catch {
    cachedRaw = raw;
    cachedList = EMPTY_LIST;
    return cachedList;
  }
}

export const MY_LIST_EVENT = "mylist-update";

export function toggleMyList(movie: Movie): void {
  const list = getMyList();
  const exists = list.some((m) => m.id === movie.id);
  const next = exists ? list.filter((m) => m.id !== movie.id) : [...list, movie];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(MY_LIST_EVENT));
}

export function isInMyList(id: number): boolean {
  return getMyList().some((m) => m.id === id);
}
