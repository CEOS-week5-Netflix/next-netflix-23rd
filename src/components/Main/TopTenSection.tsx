"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Check, Play, Info, Plus } from "lucide-react";
import { Movie } from "@/types/movie";
import { getMyList, MY_LIST_EVENT, toggleMyList } from "@/store/myList";

interface Props {
  movies: Movie[];
  imageBase: string;
}

function subscribeToMyList(onStoreChange: () => void) {
  window.addEventListener(MY_LIST_EVENT, onStoreChange);
  return () => window.removeEventListener(MY_LIST_EVENT, onStoreChange);
}

const EMPTY_MOVIES = [];

export default function TopTenSection({ movies, imageBase }: Props) {
  const [current, setCurrent] = useState(0);
  const myList = useSyncExternalStore(
    subscribeToMyList,
    getMyList,
    () => EMPTY_MOVIES,
  );
  const inList = myList.some((movie) => movie.id === movies[current].id);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [movies.length]);

  function handleToggle() {
    toggleMyList(movies[current]);
  }

  return (
    <>
      {/* 캐러셀 */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {movies.map((movie, index) => (
            <div key={movie.id} className="relative flex-shrink-0 w-full h-[520px]">
              <Link
                href={`/detail/${movie.id}?mediaType=movie`}
                className="absolute inset-0"
                aria-label={`${movie.title} 상세 페이지로 이동`}
              >
                <Image
                  src={`${imageBase}/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  sizes="375px"
                  className="object-cover"
                  priority={index === 0}
                />
              </Link>
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <span className="text-lg font-bold text-white flex flex-row gap-2 items-center justify-center">
                  <Image src="/icons/topten.svg" alt="top 10" width={20} height={20} />
                  #{index + 1} in Today
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 액션 바 */}
      <div className="absolute bottom-18 left-0 right-0 z-10">
        <div className="flex flex-row justify-between px-10 mb-20">
          <button
            onClick={handleToggle}
            className="flex flex-col items-center justify-center gap-1 text-white text-xs"
          >
            {inList ? <Check size={24} /> : <Plus size={24} />}
            My List
          </button>
          <div className="flex flex-row items-center bg-gray-300 text-black text-xl font-bold px-4 gap-2 rounded-md hover:bg-white cursor-pointer">
            <Play fill="#000000" stroke="none" />
            Play
          </div>
          <button className="flex flex-col items-center justify-center gap-1 text-white text-xs">
            <Info size={24} />
            Info
          </button>
        </div>
      </div>
    </>
  );
}
