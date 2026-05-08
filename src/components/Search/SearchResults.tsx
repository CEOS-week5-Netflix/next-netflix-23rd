import type { TmdbTrendingItem } from "@/types/tmdb";
import SearchResultItem from "./SearchResultItem";
import SearchResultsSkeleton from "./SearchResultsSkeleton";

type SearchResultsProps = {
  items: TmdbTrendingItem[];
  emptyMessage?: string;
  isLoading?: boolean;
};

export default function SearchResults({
  items,
  emptyMessage = "검색 결과가 없습니다.",
  isLoading = false,
}: SearchResultsProps) {
  if (isLoading) {
    return <SearchResultsSkeleton />;
  }

  if (items.length === 0) {
    return <p className="px-4 text-body-2 text-grey-600">{emptyMessage}</p>;
  }

  return (
    <ul className="flex w-full flex-col items-start gap-1">
      {items.map((item) => (
        <SearchResultItem key={`${item.media_type}-${item.id}`} item={item} />
      ))}
    </ul>
  );
}
