"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export const DETAIL_PREVIEW_PREFIX = "detail-preview:";

type DetailLinkProps = {
  id: number | string;
  mediaType: string;
  imagePath: string | null;
  title?: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

export default function DetailLink({
  id,
  mediaType,
  imagePath,
  title,
  className,
  ariaLabel,
  children,
}: DetailLinkProps) {
  const href = `/detail/${id}?mediaType=${mediaType}`;

  function savePreview() {
    if (!imagePath) {
      return;
    }

    sessionStorage.setItem(
      `${DETAIL_PREVIEW_PREFIX}${mediaType}:${id}`,
      JSON.stringify({ imagePath, title }),
    );
  }

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={savePreview}
      onMouseEnter={savePreview}
      onTouchStart={savePreview}
    >
      {children}
    </Link>
  );
}
