"use client";

import { useEffect, useMemo, useState } from "react";
import type { TmdbTrendingItem } from "@/types/tmdb";
import SearchHeader from "./SearchHeader";
import SearchResults from "./SearchResults";

type SearchPageContentProps = {
  topSearches: TmdbTrendingItem[];
};

type SearchResponse = {
  results?: TmdbTrendingItem[];
};

export default function SearchPageContent({
  topSearches,
}: SearchPageContentProps) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TmdbTrendingItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const trimmedQuery = useMemo(() => query.trim(), [query]);
  const isSearching = trimmedQuery.length > 0;
  const items = isSearching ? searchResults : topSearches;

  useEffect(() => {
    if (!isSearching) {
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          setSearchResults([]);
          return;
        }

        const data = (await response.json()) as SearchResponse;
        setSearchResults(data.results ?? []);
      } catch {
        if (!controller.signal.aborted) {
          setSearchResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 300);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [isSearching, topSearches, trimmedQuery]);

  return (
    <section className="flex h-full w-full flex-col overflow-hidden bg-black">
      <SearchHeader
        value={query}
        onChange={setQuery}
        onClear={() => setQuery("")}
      />

      <div className="no-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto pb-4">
        <h1 className="my-[15px] px-4 text-left font-[Pretendard] text-[24px] leading-[135%] font-semibold tracking-[-0.48px] text-white [font-feature-settings:'liga'_off,'clig'_off]">
          {isSearching ? "Search Results" : "Top Searches"}
        </h1>
        <SearchResults
          items={items}
          emptyMessage={
            isSearching
              ? "검색 결과가 없습니다."
              : "TMDB_ACCESS_TOKEN을 .env.local에 추가하면 Top Searches가 표시됩니다."
          }
          isLoading={isSearching && isLoading}
        />
      </div>
    </section>
  );
}
