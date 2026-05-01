import Image from "next/image";
import DetailLink from "@/components/Detail/DetailLink";
import type { TmdbTrendingItem } from "@/types/tmdb";
import {
  getTmdbImagePath,
  getTmdbImageUrl,
  getTmdbTitle,
} from "@/utils/tmdb";

type SearchResultItemProps = {
  item: TmdbTrendingItem;
};

export default function SearchResultItem({ item }: SearchResultItemProps) {
  const imagePath = getTmdbImagePath(item);
  const title = getTmdbTitle(item);

  return (
    <li className="w-full">
      <DetailLink
        id={item.id}
        mediaType={item.media_type}
        imagePath={imagePath}
        title={title}
        className="flex h-[76px] w-full items-center bg-grey-800"
        ariaLabel={`${title} 상세 페이지로 이동`}
      >
        <div className="relative h-[76px] w-[146px] flex-none overflow-hidden rounded-[2px] bg-grey-900">
          {imagePath ? (
            <Image
              src={getTmdbImageUrl(imagePath, "w500")}
              alt=""
              fill
              sizes="146px"
              className="object-cover"
            />
          ) : null}
        </div>
        <div className="ml-[18px] flex h-7 w-[199px] flex-none items-center justify-between">
          <p className="min-w-0 max-w-[151px] overflow-hidden font-[Pretendard] text-[16px] leading-[135%] font-normal tracking-[-0.32px] text-ellipsis whitespace-nowrap text-white [font-feature-settings:'liga'_off,'clig'_off]">
            {title}
          </p>
          <span
            className="flex h-7 w-7 flex-none items-center justify-center"
            aria-hidden="true"
          >
            <Image
              src="/icons/ic_play_circle.svg"
              alt=""
              width={23.333}
              height={23.333}
              className="h-[23.333px] w-[23.333px]"
            />
          </span>
        </div>
      </DetailLink>
    </li>
  );
}
