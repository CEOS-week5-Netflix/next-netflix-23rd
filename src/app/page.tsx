// app/page.tsx
import NetflixAnimatedLogo from "@/components/NetflixLogoHandler";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <div>
        <NetflixAnimatedLogo />
      </div>

      {/* 랜딩페이지 메인 콘텐츠 영역 */}
      <div className="flex h-screen items-center justify-center"></div>
    </main>
  );
}
