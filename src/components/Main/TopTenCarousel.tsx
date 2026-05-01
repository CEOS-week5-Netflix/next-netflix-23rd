"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";

interface Props {
  movies: Movie[];
  imageBase: string;
}

export default function TopTenCarousel({ movies, imageBase }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [movies.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="relative flex-shrink-0 w-full h-[520px]"
          >
            <Image
              src={`${imageBase}/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
            <div className="absolute bottom-0  left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
              <span className="text-lg font-bold text-white flex flex-row gap-2 items-center justify-center">
                <Image
                  src="/icons/topten.svg"
                  alt="top 10"
                  width={20}
                  height={20}
                />
                #{index + 1} in Today
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
