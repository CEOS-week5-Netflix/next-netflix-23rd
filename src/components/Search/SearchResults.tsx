import type { TmdbTrendingItem } from "@/types/tmdb";
import SearchResultItem from "./SearchResultItem";

type SearchResultsProps = {
  items: TmdbTrendingItem[];
};

export default function SearchResults({ items }: SearchResultsProps) {
  if (items.length === 0) {
    return (
      <p className="px-4 text-body-2 text-grey-600">
        TMDB_ACCESS_TOKEN을 .env.local에 추가하면 Top Searches가 표시됩니다.
      </p>
    );
  }

  return (
    <ul className="flex w-full flex-col items-start gap-1">
      {items.map((item) => (
        <SearchResultItem key={`${item.media_type}-${item.id}`} item={item} />
      ))}
    </ul>
  );
}
