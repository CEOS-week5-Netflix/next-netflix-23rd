"use client";

import { Movie } from "@/types/movie";

const KEY = "myList";

export function getMyList(): Movie[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
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
