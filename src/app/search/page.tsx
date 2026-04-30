import { getTopSearches } from "@/apis/tmdb";
import SearchHeader from "@/components/Search/SearchHeader";
import SearchResults from "@/components/Search/SearchResults";

export const dynamic = "force-dynamic";

export default async function SearchPage() {
  const topSearches = await getTopSearches();

  return (
    <section className="flex h-full w-full flex-col overflow-hidden bg-black">
      <SearchHeader />

      <div className="no-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto pb-4">
        <h1 className="my-[15px] px-4 text-left font-[Pretendard] text-[24px] leading-[135%] font-semibold tracking-[-0.48px] text-white [font-feature-settings:'liga'_off,'clig'_off]">
          Top Searches
        </h1>
        <SearchResults items={topSearches} />
      </div>
    </section>
  );
}
