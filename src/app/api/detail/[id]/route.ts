import { NextResponse } from "next/server";
import { getDetail } from "@/apis/tmdb";

type DetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: Request, { params }: DetailRouteProps) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const mediaType = searchParams.get("mediaType") ?? undefined;
  const detail = await getDetail(id, mediaType);

  if (!detail) {
    return NextResponse.json({ detail: null }, { status: 404 });
  }

  return NextResponse.json({ detail });
}
