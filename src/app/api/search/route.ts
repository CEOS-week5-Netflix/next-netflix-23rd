import { NextResponse } from "next/server";
import { searchTmdb } from "@/apis/tmdb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") ?? "";
  const results = await searchTmdb(query);

  return NextResponse.json({ results });
}
