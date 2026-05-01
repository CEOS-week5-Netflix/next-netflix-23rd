import Image from "next/image";
import { getTmdbImageUrl } from "@/utils/tmdb";

type DetailHeroProps = {
  imagePath: string | null;
};

export default function DetailHero({ imagePath }: DetailHeroProps) {
  return (
    <div className="relative h-[415px] w-full overflow-hidden">
      <div className="absolute top-0 left-1/2 h-[415px] w-[424.046px] -translate-x-1/2 overflow-hidden bg-grey-600">
        {imagePath ? (
          <Image
            src={getTmdbImageUrl(imagePath, "w1280")}
            alt=""
            fill
            priority
            sizes="424px"
            className="object-cover"
          />
        ) : null}
        <div
          className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-linear)]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
