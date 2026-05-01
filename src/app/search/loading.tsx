export default function SearchLoading() {
  return (
    <section className="flex h-full w-full flex-col overflow-hidden bg-black">
      <div className="h-11 w-full flex-none bg-black" />
      <div className="h-[52px] w-full flex-none animate-pulse bg-grey-800" />
      <div className="min-h-0 flex-1 pb-4">
        <div className="my-[15px] ml-4 h-8 w-44 animate-pulse bg-grey-800" />
        <div className="flex w-full flex-col gap-1">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              className="flex h-[76px] w-full items-center bg-grey-800"
              key={index}
            >
              <div className="h-[76px] w-[146px] flex-none animate-pulse bg-grey-900" />
              <div className="ml-[18px] h-5 w-[150px] animate-pulse bg-grey-900" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
