"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";

export default function NetflixLogoHandler() {
  const router = useRouter();
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [logoState, setLogoState] = useState<"image" | "lottie" | "finished">(
    "image",
  );

  const [isImageFading, setIsImageFading] = useState(false); // 1. 이미지 사라짐 상태
  const [isLottieFading, setIsLottieFading] = useState(false); // 2. 로티 사라짐 상태

  // 로티 재생 및 종료 제어
  useEffect(() => {
    if (!dotLottie || logoState !== "lottie") return;

    const handleComplete = () => {
      setIsLottieFading(true);
      setTimeout(() => {
        setLogoState("finished");
        router.push("/main");
      }, 1000); // 로티 페이드아웃 시간
    };

    dotLottie.addEventListener("complete", handleComplete);
    dotLottie.play();

    return () => {
      dotLottie.removeEventListener("complete", handleComplete);
    };
  }, [dotLottie, logoState]);

  // ⭐ 로고 이미지 클릭 핸들러
  const handleImageClick = () => {
    setIsImageFading(true); // 이미지 페이드아웃 시작

    // 이미지 페이드아웃(500ms)이 끝난 후 로티로 교체
    setTimeout(() => {
      setLogoState("lottie");
    }, 500);
  };

  const dotLottieRefCallback = (instance: DotLottie) => {
    setDotLottie(instance);
  };

  if (logoState === "finished") return null;

  return (
    <div className="mt-80 flex items-center justify-center z-50 pointer-events-none">
      {/* 1. 이미지 섹션 */}
      {logoState === "image" && (
        <div
          onClick={handleImageClick}
          className={`
            pointer-events-auto cursor-pointer transition-all duration-500 ease-in-out
            ${isImageFading ? "opacity-0 scale-95" : "opacity-100 scale-100 hover:scale-110"}
          `}
        >
          <Image
            src="/assets/landing/NetflixLogo.png"
            alt="Netflix"
            width={100}
            height={80}
            priority
          />
        </div>
      )}

      {/* 2. 로티 섹션 */}
      {logoState === "lottie" && (
        <div
          className={`
            w-[400px]  transition-opacity duration-1000
            ${isLottieFading ? "opacity-0" : "opacity-100"}
          `}
        >
          <div className="pointer-events-auto">
            <DotLottieReact
              src="/assets/landing/Netflix_Logo_Swoop.json"
              dotLottieRefCallback={dotLottieRefCallback}
              autoplay={true}
              loop={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
