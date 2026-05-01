type DetailInfoProps = {
  overview: string;
};

export default function DetailInfo({ overview }: DetailInfoProps) {
  return (
    <div className="px-[34px] pt-[96px] pb-20">
      <h1 className="text-left font-[Pretendard] text-[24px] leading-[135%] font-[600] tracking-[-0.48px] text-white [font-feature-settings:'liga'_off,'clig'_off]">
        Previews
      </h1>
      <p className="mt-3 w-[320px] font-[Pretendard] text-[12px] leading-[135%] font-normal tracking-[-0.24px] text-white [font-feature-settings:'liga'_off,'clig'_off]">
        {overview}
      </p>
    </div>
  );
}
