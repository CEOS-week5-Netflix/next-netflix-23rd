import { getTopSearches } from "@/apis/tmdb";
import SearchPageContent from "@/components/Search/SearchPageContent";

export const dynamic = "force-dynamic";

export default async function SearchPage() {
  const topSearches = await getTopSearches();

  return <SearchPageContent topSearches={topSearches} />;
}
