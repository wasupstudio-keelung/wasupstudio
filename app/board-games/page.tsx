import type { Metadata } from "next";
import { SiteImage as Image } from "@/app/_components/SiteImage";
import Link from "next/link";
import { Container } from "@/app/_components/Container";
import { PageBanner } from "@/app/_components/PageBanner";
import { boardGamePriceText, boardGames, soldOutBoardGames } from "@/app/_lib/site-data";

export const metadata: Metadata = {
  title: "買桌遊",
  description: "用桌遊，翻轉你的公民意識。阿普蛙設計的議題型桌遊作品一覽。",
};

// 原站「販售中」相簿的排列順序，跟導覽列下拉選單的順序不一樣：
// 相簿是 …抓誑新聞→玩一世人→拚陣頭→未來議會→十分機靈，
// 導覽列是 …抓誑新聞→未來議會→玩一世人→拚陣頭→十分機靈。
// site-data.ts 的 boardGames 依導覽列排（Header/sitemap 都吃它），所以這頁另外指定相簿順序。
const gridOrder = [
  // 2026-09-04 新品，客戶在 Weebly 導覽裡把它排第一，總覽也排第一。
  "words-collide",
  "riddle-me-feelings",
  "talk-nonsense-sdgs",
  "practice-for-love",
  "crazy-news",
  "play-a-lifetime",
  "pin-zhentou",
  "future-parliament",
  "sharp-ten",
];

const gridRank = (slug: string) => {
  const i = gridOrder.indexOf(slug);
  return i === -1 ? gridOrder.length : i; // 沒列到的新商品排在最後，不會憑空消失
};

const gridGames = [...boardGames].sort(
  (a, b) => gridRank(a.slug) - gridRank(b.slug),
);

export default function BoardGamesPage() {
  return (
    <>
      <PageBanner
        image="/images/banners/board-games-banner.png"
        imagePosition="50% 98%"
        title="桌遊　把議題變好玩了"
        align="right"
      />

      {/* 新品主打：情緒謎語雙語版 */}
      <section className="py-16">
        <Container className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/images/board-games/riddle-me-feelings-banner.png"
              alt="Riddle Me Feelings 情緒謎語雙語版"
              width={394}
              height={311}
              className="h-auto w-full"
            />
          </div>
          <div className="text-center md:text-left">
            <p className="text-sm text-ink/60">人際溝通 × 社會情緒學習 × 表演藝術</p>
            <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">《情緒謎語雙語版》新上市</h2>
            <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
              <Link
                href="/board-games/riddle-me-feelings"
                className="rounded-full border border-ink px-8 py-3 font-semibold text-ink"
              >
                遊戲介紹
              </Link>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeNjwzit1cjicwRAKBiZfYBmvYPlf8z7C4FX6mtrHeE4nO0TQ/viewform"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-brand-green px-8 py-3 font-semibold text-white transition hover:bg-brand-green-bright"
              >
                購買桌遊
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 原站「販售中」標題旁邊有一顆「購買桌遊」按鈕（跟上方主打區同一個表單），重建時漏掉 */}
      <section className="pb-16">
        <Container className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <h2 className="text-center text-2xl font-bold text-ink md:text-3xl">販售中</h2>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeNjwzit1cjicwRAKBiZfYBmvYPlf8z7C4FX6mtrHeE4nO0TQ/viewform"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-brand-green px-8 py-3 font-semibold text-white transition hover:bg-brand-green-bright"
          >
            購買桌遊
          </a>
        </Container>
      </section>

      <section className="pb-16">
        <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {gridGames.map((game) => (
            <Link
              key={game.slug}
              href={game.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-4/3 w-full bg-black/[0.04]">
                {game.image ? (
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-contain p-4 transition group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-ink/40">
                    {game.title}
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs text-ink/50">{game.tagline}</p>
                <h2 className="mt-1 text-lg font-bold text-ink">{game.title}</h2>
                <p className="mt-auto pt-4 text-brand-green font-semibold">
                  {boardGamePriceText(game)}
                </p>
              </div>
            </Link>
          ))}
        </Container>
      </section>

      {/* 已完售：原站放在總覽頁最下方的 3 款舊作品。
          2026-08-26 更正：原本這裡（跟 site-data.ts 的註解）寫「原站也沒有連結到獨立頁面」，
          核對原始 HTML 後發現《大政治家：選戰風雲》那一格的圖片和標題都是連結，指向
          /2282325919278352347836984251363908038642.html——那是沒掛在導覽列、Phase 0 漏掉的孤兒頁，
          已補建成 /board-games/great-politician，這裡把連結接回去。另外兩款原站確實沒有連結。 */}
      <section className="bg-[#3f4240] py-16">
        <Container>
          <h2 className="text-2xl font-bold text-white md:text-3xl">＊已完售</h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {soldOutBoardGames.map((game) => {
              const card = (
                <>
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-white/5">
                    <Image src={game.image} alt={game.title} fill className="object-contain p-4 opacity-80" />
                  </div>
                  <p className="mt-4 text-xs text-white/60">{game.tagline}</p>
                  <h3 className="mt-1 text-lg font-bold text-white">{game.title}</h3>
                </>
              );

              return game.href ? (
                <Link key={game.title} href={game.href} className="group block text-center">
                  {card}
                </Link>
              ) : (
                <div key={game.title} className="text-center">
                  {card}
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
