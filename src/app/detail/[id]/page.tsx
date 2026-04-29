type DetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DetailPage({ params }: DetailPageProps) {
  await params;

  return null;
}
