import { getDetail } from "@/apis/tmdb";
import CloseButton from "@/components/Detail/CloseButton";
import DetailHero from "@/components/Detail/DetailHero";
import DetailInfo from "@/components/Detail/DetailInfo";
import HomeIndicator from "@/components/Detail/HomeIndicator";
import PlayButton from "@/components/Detail/PlayButton";
import { getTmdbImagePath, getTmdbTitle } from "@/utils/tmdb";

type DetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    mediaType?: string;
  }>;
};

export const dynamic = "force-dynamic";

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

  return (
    <section className="no-scrollbar relative h-full w-full overflow-x-hidden overflow-y-auto bg-black">
      <CloseButton />
      <DetailHero imagePath={getTmdbImagePath(detail)} />

      <div className="absolute top-[430px] left-0 z-10 flex w-full flex-col items-center">
        <PlayButton />
      </div>

      <DetailInfo
        overview={
          detail.overview ||
          `${getTmdbTitle(detail)} preview is now available.`
        }
      />
      <HomeIndicator />
    </section>
  );
}
