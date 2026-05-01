import Image from "next/image";

type SearchHeaderProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

export default function SearchHeader({
  value,
  onChange,
  onClear,
}: SearchHeaderProps) {
  return (
    <>
      <div className="h-11 w-full flex-none bg-black" aria-hidden="true" />

      <div className="flex h-[52px] w-full flex-none items-center bg-grey-800 px-5">
        <Image
          src="/icons/ic_search_long.svg"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 flex-none"
        />
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          name="search"
          type="text"
          inputMode="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search for a show, movie, genre, e.t.c."
          className="ml-5 flex h-[31px] min-w-0 flex-1 appearance-none items-center bg-transparent font-[Pretendard] text-[15px] leading-[135%] font-normal tracking-[-0.3px] text-white outline-none placeholder:font-normal placeholder:text-grey-600 [font-feature-settings:'liga'_off,'clig'_off]"
        />
        <button
          type="button"
          className="ml-4 flex h-4 w-4 flex-none items-center justify-center bg-transparent p-0"
          aria-label="Clear search"
          onClick={onClear}
        >
          <Image
            src="/icons/ic_x.svg"
            alt=""
            width={16}
            height={16}
            className="h-4 w-4"
          />
        </button>
      </div>
    </>
  );
}
