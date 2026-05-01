import DetailPageContent from "@/components/Detail/DetailPageContent";

type DetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    mediaType?: string;
  }>;
};

export const revalidate = 3600;

export default async function DetailPage({
  params,
  searchParams,
}: DetailPageProps) {
  const [{ id }, { mediaType }] = await Promise.all([params, searchParams]);

  return <DetailPageContent id={id} mediaType={mediaType} />;
}
