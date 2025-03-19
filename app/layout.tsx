import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BaseHeader } from "@/components/header";
import { TanstackQueryProvider } from "./TanstackQueryProvider";
import { ThemeProvider } from "./ThemeProvider";

const preFontThin = localFont({
  src: [
    { path: "./fonts/Pretendard-Thin.otf", weight: "100" },
    { path: "./fonts/Pretendard-ExtraLight.otf", weight: "200" },
    { path: "./fonts/Pretendard-Light.otf", weight: "300" },
    { path: "./fonts/Pretendard-Regular.otf", weight: "400" },
    { path: "./fonts/Pretendard-Medium.otf", weight: "500" },
    { path: "./fonts/Pretendard-SemiBold.otf", weight: "600" },
    { path: "./fonts/Pretendard-Bold.otf", weight: "700" },
    { path: "./fonts/Pretendard-ExtraBold.otf", weight: "800" },
    { path: "./fonts/Pretendard-Black.otf", weight: "900" },
  ],
});

export const metadata: Metadata = {
  title: "Github Search",
  description: "Github Search everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`relative ${preFontThin.className} antialiased bg-Background dark:bg-BackgroundDark`}
      >
        <TanstackQueryProvider>
          <ThemeProvider>
            <BaseHeader />
            {children}
          </ThemeProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
