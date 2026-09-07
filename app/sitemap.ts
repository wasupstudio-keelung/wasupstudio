import type { MetadataRoute } from "next";
import { boardGames, courseNav } from "@/app/_lib/site-data";
import { columns } from "@/app/_lib/columns";

// 靜態匯出（output: "export"）要求所有 route handler 明確標成靜態，
// sitemap/robots 這種內建產生器也不例外。
export const dynamic = "force-static";

const BASE_URL = "https://www.wasupstudio.com";

// 課程頁的巢狀路徑（含子項目）攤平成一維清單。
function flattenCourseHrefs(): string[] {
  const hrefs: string[] = ["/courses"];
  for (const item of courseNav) {
    hrefs.push(item.href);
    if (item.children) {
      for (const child of item.children) hrefs.push(child.href);
    }
  }
  return hrefs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/design-consulting",
    "/board-games",
    "/digital-materials",
    "/about",
    // 2026-09-02 新增，原站沒有這一頁（見 MIGRATION-PLAN 偏離清單第 14 條）。
    "/privacy",
    // 已完售、但原站有獨立商品頁的兩款（2026-08-26 從原站孤兒頁補建）。
    // 它們不在 site-data.ts 的 boardGames（販售中）清單裡，所以下面的 productPaths 掃不到，
    // 得在這裡明列，否則這兩個新路由不會出現在 sitemap。
    "/board-games/great-politician",
    "/board-games/family-topics",
    // 2026-09-07 客戶指示改列「已完售」的兩款，商品頁保留，同樣要自己明列。
    "/board-games/crazy-news",
    "/board-games/pin-zhentou",
  ];

  const productPaths = boardGames.map((g) => g.href);
  const coursePaths = flattenCourseHrefs();

  // 專欄：總覽頁 ＋ 每篇文章。2026-09-02 從原站的 /blog/ 搬過來，
  // slug 沿用原站的，這樣舊網址可以一對一 301 過來。
  const columnPaths = ["/columns", ...columns.map((c) => `/columns/${c.slug}`)];

  const allPaths = [...staticPaths, ...productPaths, ...coursePaths, ...columnPaths];

  return allPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
