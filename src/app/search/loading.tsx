import SearchResultsSkeleton from "@/components/Search/SearchResultsSkeleton";

export default function SearchLoading() {
  return (
    <section className="flex h-full w-full flex-col overflow-hidden bg-black">
      <div className="h-11 w-full flex-none bg-black" />
      <div className="h-[52px] w-full flex-none animate-pulse bg-grey-800" />
      <div className="min-h-0 flex-1 pb-4">
        <div className="my-[15px] ml-4 h-8 w-44 animate-pulse bg-grey-800" />
        <SearchResultsSkeleton />
      </div>
    </section>
  );
}
