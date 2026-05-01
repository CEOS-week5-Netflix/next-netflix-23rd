import { getTopSearches } from "@/apis/tmdb";
import SearchPageContent from "@/components/Search/SearchPageContent";

export const revalidate = 3600;

export default async function SearchPage() {
  const topSearches = await getTopSearches();

  return <SearchPageContent topSearches={topSearches} />;
}
