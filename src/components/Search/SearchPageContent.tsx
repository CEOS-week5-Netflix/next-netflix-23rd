"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { TmdbTrendingItem } from "@/types/tmdb";
import SearchHeader from "./SearchHeader";
import SearchResults from "./SearchResults";

type SearchPageContentProps = {
  topSearches: TmdbTrendingItem[];
};

type SearchResponse = {
  results?: TmdbTrendingItem[];
  page?: number;
  totalPages?: number;
  totalResults?: number;
};

const FIRST_SEARCH_PAGE = 1;
const SEARCH_DEBOUNCE_MS = 300;

function mergeSearchResults(
  previous: TmdbTrendingItem[],
  next: TmdbTrendingItem[],
) {
  const seen = new Set(previous.map((item) => `${item.media_type}-${item.id}`));
  const merged = [...previous];

  next.forEach((item) => {
    const key = `${item.media_type}-${item.id}`;

    if (!seen.has(key)) {
      seen.add(key);
      merged.push(item);
    }
  });

  return merged;
}

async function fetchSearchPage(
  query: string,
  page: number,
  signal: AbortSignal,
): Promise<SearchResponse> {
  const searchParams = new URLSearchParams({
    query,
    page: String(page),
  });
  const response = await fetch(`/api/search?${searchParams}`, { signal });

  if (!response.ok) {
    return {};
  }

  return (await response.json()) as SearchResponse;
}

export default function SearchPageContent({
  topSearches,
}: SearchPageContentProps) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TmdbTrendingItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const trimmedQuery = useMemo(() => query.trim(), [query]);
  const isSearching = trimmedQuery.length > 0;
  const items = isSearching ? searchResults : topSearches;
  const hasMore = isSearching && currentPage > 0 && currentPage < totalPages;

  useEffect(() => {
    const resetTimer = window.setTimeout(() => {
      setSearchResults([]);
      setCurrentPage(0);
      setTotalPages(0);
      setIsLoading(isSearching);
      setIsLoadingMore(false);
    }, 0);

    if (!isSearching) {
      return () => window.clearTimeout(resetTimer);
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const data = await fetchSearchPage(
          trimmedQuery,
          FIRST_SEARCH_PAGE,
          controller.signal,
        );
        setSearchResults(data.results ?? []);
        setCurrentPage(data.page ?? FIRST_SEARCH_PAGE);
        setTotalPages(data.totalPages ?? 0);
      } catch {
        if (!controller.signal.aborted) {
          setSearchResults([]);
          setCurrentPage(0);
          setTotalPages(0);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(resetTimer);
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [isSearching, trimmedQuery]);

  useEffect(() => {
    const root = scrollContainerRef.current;
    const target = loadMoreRef.current;

    if (
      !root ||
      !target ||
      !isSearching ||
      !hasMore ||
      isLoading ||
      isLoadingMore
    ) {
      return;
    }

    const controller = new AbortController();
    const observer = new IntersectionObserver(
      (entries) => {
        const shouldLoadMore = entries.some((entry) => entry.isIntersecting);

        if (!shouldLoadMore) {
          return;
        }

        observer.disconnect();

        void (async () => {
          setIsLoadingMore(true);

          try {
            const nextPage = currentPage + 1;
            const data = await fetchSearchPage(
              trimmedQuery,
              nextPage,
              controller.signal,
            );

            setSearchResults((previous) =>
              mergeSearchResults(previous, data.results ?? []),
            );
            setCurrentPage(data.page ?? nextPage);
            setTotalPages(data.totalPages ?? totalPages);
          } catch {
            if (!controller.signal.aborted) {
              setTotalPages(currentPage);
            }
          } finally {
            if (!controller.signal.aborted) {
              setIsLoadingMore(false);
            }
          }
        })();
      },
      {
        root,
        rootMargin: "160px 0px",
      },
    );

    observer.observe(target);

    return () => {
      controller.abort();
      observer.disconnect();
    };
  }, [
    currentPage,
    hasMore,
    isLoading,
    isLoadingMore,
    isSearching,
    totalPages,
    trimmedQuery,
  ]);

  return (
    <section className="flex h-full w-full flex-col overflow-hidden bg-black">
      <SearchHeader
        value={query}
        onChange={setQuery}
        onClear={() => setQuery("")}
      />

      <div
        ref={scrollContainerRef}
        className="no-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto pb-4"
      >
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
        {isSearching && !isLoading ? (
          <div
            ref={loadMoreRef}
            className="flex h-12 items-center justify-center px-4 text-caption-1 text-grey-600"
          >
            {isLoadingMore ? "더 불러오는 중..." : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
