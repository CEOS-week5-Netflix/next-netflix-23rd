import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import BottomNavigation from "@/components/BottomNavigation/BottomNavigation";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Next Netflix",
  description: "Next.js Netflix clone project",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div id="app-frame">
          <main id="app-content">{children}</main>
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
