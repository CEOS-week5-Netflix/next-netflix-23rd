import Image from "next/image";

export default function PlayButton() {
  return (
    <button
      type="button"
      className="flex h-11 w-[302px] items-center justify-center rounded bg-grey-600 text-black"
    >
      <span className="flex h-[27px] w-16 items-center justify-center gap-3">
        <Image
          src="/icons/ic_play.svg"
          alt=""
          width={14}
          height={16}
          className="h-4 w-3.5"
        />
        <span className="text-center font-[Pretendard] text-[20px] leading-[135%] font-[600] tracking-[-0.4px] text-black [font-feature-settings:'liga'_off,'clig'_off]">
          Play
        </span>
      </span>
    </button>
  );
}
