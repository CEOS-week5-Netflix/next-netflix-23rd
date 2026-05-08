type SearchResultsSkeletonProps = {
  count?: number;
};

export default function SearchResultsSkeleton({
  count = 7,
}: SearchResultsSkeletonProps) {
  return (
    <div className="flex w-full flex-col gap-1" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div className="flex h-[76px] w-full items-center bg-grey-800" key={index}>
          <div className="h-[76px] w-[146px] flex-none animate-pulse bg-grey-900" />
          <div className="ml-[18px] h-5 w-[150px] animate-pulse bg-grey-900" />
        </div>
      ))}
    </div>
  );
}
