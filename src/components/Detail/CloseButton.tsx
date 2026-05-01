"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CloseButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center bg-transparent p-0 focus-visible:outline-none"
      aria-label="Close detail page"
      onClick={() => router.back()}
    >
      <Image
        src="/icons/ic_x.svg"
        alt=""
        width={16}
        height={16}
        className="h-4 w-4 opacity-70 transition-opacity hover:opacity-100"
      />
    </button>
  );
}
