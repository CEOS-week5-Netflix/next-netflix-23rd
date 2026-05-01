"use client";

import { useEffect, useState } from "react";
import type { TmdbDetail } from "@/types/tmdb";
import { getTmdbImagePath, getTmdbTitle } from "@/utils/tmdb";
import CloseButton from "./CloseButton";
import { DETAIL_PREVIEW_PREFIX } from "./DetailLink";
import DetailHero from "./DetailHero";
import DetailInfo from "./DetailInfo";
import HomeIndicator from "./HomeIndicator";
import PlayButton from "./PlayButton";

type DetailPageContentProps = {
  id: string;
  mediaType?: string;
};

type DetailResponse = {
  detail: TmdbDetail | null;
};

type DetailPreview = {
  imagePath: string;
  title?: string;
};

function getStoredPreview(id: string, mediaType = "movie"): DetailPreview | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = sessionStorage.getItem(`${DETAIL_PREVIEW_PREFIX}${mediaType}:${id}`);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as DetailPreview;
  } catch {
    return null;
  }
}

export default function DetailPageContent({
  id,
  mediaType,
}: DetailPageContentProps) {
  const [detail, setDetail] = useState<TmdbDetail | null>(null);
  const [preview] = useState<DetailPreview | null>(() =>
    getStoredPreview(id, mediaType),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const searchParams = new URLSearchParams();

    if (mediaType) {
      searchParams.set("mediaType", mediaType);
    }

    async function loadDetail() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/detail/${id}?${searchParams.toString()}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          setDetail(null);
          return;
        }

        const data = (await response.json()) as DetailResponse;
        setDetail(data.detail);
      } catch {
        if (!controller.signal.aborted) {
          setDetail(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadDetail();

    return () => controller.abort();
  }, [id, mediaType]);

  if (!detail && !isLoading) {
    return (
      <section className="flex h-full w-full flex-col bg-black px-6 pt-16 text-white">
        <CloseButton />
        <h1 className="text-heading-1">Previews</h1>
        <p className="mt-4 text-caption-1 text-grey-600">
          TMDB_ACCESS_TOKEN을 .env.local에 추가하면 상세 정보가 표시됩니다.
        </p>
      </section>
    );
  }

  return (
    <section className="no-scrollbar relative h-full w-full overflow-x-hidden overflow-y-auto bg-black">
      <CloseButton />
      <DetailHero
        imagePath={detail ? getTmdbImagePath(detail) : preview?.imagePath ?? null}
        imageSize={detail ? "w1280" : "w500"}
      />

      <div className="absolute top-[430px] left-0 z-10 flex w-full flex-col items-center">
        <PlayButton />
      </div>

      {detail ? (
        <DetailInfo
          overview={
            detail.overview ||
            `${getTmdbTitle(detail)} preview is now available.`
          }
        />
      ) : (
        <div className="px-[34px] pt-[96px] pb-20">
          <div className="h-8 w-32 animate-pulse bg-grey-800" />
          <div className="mt-4 h-3 w-[300px] animate-pulse bg-grey-800" />
          <div className="mt-2 h-3 w-[260px] animate-pulse bg-grey-800" />
          <div className="mt-2 h-3 w-[220px] animate-pulse bg-grey-800" />
        </div>
      )}
      <HomeIndicator />
    </section>
  );
}
