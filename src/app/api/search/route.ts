import { NextResponse } from "next/server";
import { searchTmdb } from "@/apis/tmdb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") ?? "";
  const pageParam = Number(searchParams.get("page") ?? "1");
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const searchResult = await searchTmdb(query, page);

  return NextResponse.json(searchResult);
}
