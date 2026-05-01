export default function DetailLoading() {
  return (
    <section className="relative h-full w-full overflow-hidden bg-black">
      <div className="absolute top-0 left-1/2 h-[415px] w-[424px] -translate-x-1/2 animate-pulse bg-grey-800" />
      <div className="absolute top-4 right-4 h-8 w-8 animate-pulse bg-grey-800" />
      <div className="absolute top-[430px] left-1/2 h-11 w-[302px] -translate-x-1/2 animate-pulse rounded bg-grey-800" />
      <div className="px-[34px] pt-[526px]">
        <div className="h-8 w-32 animate-pulse bg-grey-800" />
        <div className="mt-4 h-3 w-[300px] animate-pulse bg-grey-800" />
        <div className="mt-2 h-3 w-[260px] animate-pulse bg-grey-800" />
        <div className="mt-2 h-3 w-[220px] animate-pulse bg-grey-800" />
      </div>
    </section>
  );
}
