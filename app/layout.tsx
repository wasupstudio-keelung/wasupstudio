import type { Metadata } from "next";
import { birdseye, montserrat } from "@/app/fonts";
import { Header } from "@/app/_components/Header";
import { Footer } from "@/app/_components/Footer";
import { Analytics } from "@/app/_components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wasupstudio.com"),

  // Search Console 2026-09-07 回報「重複網頁；使用者未選取標準網頁」。
  // 同一頁當時有 5 個都回 200 的網址（http／https × 有無 www，再加 workers.dev 備援網址），
  // 而 70 頁裡一個 canonical 都沒有，所以 Google 沒有依據可以挑出要收錄哪一個。
  // "./" 會相對 metadataBase 解析成「這一頁自己的網址」，子頁只要不覆寫 alternates 就繼承這行，
  // 所以 30 個各自有 metadata 的頁不用逐一改。
  alternates: {
    canonical: "./",
  },

  title: {
    default: "阿普蛙工作室｜遊戲,公民,教育 - 阿普蛙 Wa's UP",
    template: "%s - 阿普蛙工作室｜遊戲,公民,教育",
  },
  description:
    "阿普蛙致力於用遊戲影響教育，透過「理論」結合「遊戲機制」並且「實際行動」，培養現代公民「慎思明辨」及「關懷社會」之能力。",
  keywords: [
    "阿普蛙",
    "阿普蛙工作室",
    "遊戲",
    "教育",
    "遊戲化",
    "wa's up",
    "公民",
    "獨立思考",
    "批判性思考",
    "議題桌遊",
  ],
  // 原站首頁有這張 google-site-verification meta（值照抄），另外 DNS 上還有一筆
  // 4muqbk3t4xrn 的 CNAME 也是 Google 網域驗證用的。兩種驗證方式都要保留，
  // 否則 Search Console / Workspace 的網域驗證會失效。
  verification: {
    google: "6hxDApw91mv30j6kMZulR1XyVl6A93F3wSj7Z_k88uc",
  },
  openGraph: {
    title: "阿普蛙 Wa's UP",
    description:
      "阿普蛙致力於用遊戲影響教育，透過「理論」結合「遊戲機制」並且「實際行動」，培養現代公民「慎思明辨」及「關懷社會」之能力。",
    url: "https://www.wasupstudio.com",
    siteName: "阿普蛙工作室｜遊戲,公民,教育",
    locale: "zh_TW",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant" className={`${birdseye.variable} ${montserrat.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
