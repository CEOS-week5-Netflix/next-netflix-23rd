import Image from "next/image";
import { notFound } from "next/navigation";
import CloseButton from "@/components/Detail/CloseButton";

type DetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    mediaType?: string;
  }>;
};

type TmdbDetail = {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
};

const TMDB_BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_BASE_URL ?? "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

export const dynamic = "force-dynamic";

function getMediaType(mediaType?: string) {
  return mediaType === "tv" ? "tv" : "movie";
}

function getTitle(detail: TmdbDetail) {
  return (
    detail.original_title ??
    detail.original_name ??
    detail.title ??
    detail.name ??
    "Previews"
  );
}

function getImagePath(detail: TmdbDetail) {
  return detail.backdrop_path ?? detail.poster_path;
}

async function getDetail(id: string, mediaType?: string) {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;

  if (!accessToken) {
    return null;
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/${getMediaType(mediaType)}/${id}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
      next: {
        revalidate: 60 * 60,
      },
    },
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as TmdbDetail;
}

export default async function DetailPage({
  params,
  searchParams,
}: DetailPageProps) {
  const [{ id }, { mediaType }] = await Promise.all([params, searchParams]);
  const detail = await getDetail(id, mediaType);

  if (!detail) {
    return (
      <section className="flex h-full w-full flex-col bg-black px-6 pt-16 text-white">
        <h1 className="text-heading-1">Previews</h1>
        <p className="mt-4 text-caption-1 text-grey-600">
          TMDB_ACCESS_TOKEN을 .env.local에 추가하면 상세 정보가 표시됩니다.
        </p>
      </section>
    );
  }

  const imagePath = getImagePath(detail);

  return (
    <section className="no-scrollbar relative h-full w-full overflow-x-hidden overflow-y-auto bg-black">
      <CloseButton />

      <div className="relative h-[415px] w-full overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[415px] w-[424.046px] -translate-x-1/2 overflow-hidden bg-grey-600">
          {imagePath ? (
            <Image
              src={`${TMDB_IMAGE_BASE_URL}/w780${imagePath}`}
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

      <div className="absolute top-[430px] left-0 z-10 flex w-full flex-col items-center">
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
      </div>

      <div className="px-[34px] pt-[96px] pb-20">
        <h1 className="text-left font-[Pretendard] text-[24px] leading-[135%] font-[600] tracking-[-0.48px] text-white [font-feature-settings:'liga'_off,'clig'_off]">
          Previews
        </h1>
        <p className="mt-3 w-[320px] font-[Pretendard] text-[12px] leading-[135%] font-normal tracking-[-0.24px] text-white [font-feature-settings:'liga'_off,'clig'_off]">
          {detail.overview || `${getTitle(detail)} preview is now available.`}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 h-[31.703px] w-full bg-black">
        <div className="absolute top-[19.022px] left-1/2 h-[4.529px] w-[121.377px] -translate-x-1/2 rounded-[90.58px] bg-white" />
      </div>
    </section>
  );
}
