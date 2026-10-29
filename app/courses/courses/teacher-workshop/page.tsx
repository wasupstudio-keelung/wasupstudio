import type { Metadata } from "next";
import { SiteImage as Image } from "@/app/_components/SiteImage";
import Link from "next/link";
import { Container } from "@/app/_components/Container";
import { YouTubeEmbed } from "@/app/_components/YouTubeEmbed";

export const metadata: Metadata = {
  title: "教師研習",
  description:
    "教師研習的課程主題包含教材應用（議題桌遊遊戲應用於課堂）及桌遊教材設計，協助教師掌握議題桌遊的引導技巧，或動手設計屬於自己的遊戲化教案。",
};

const materialTopics = [
  {
    group: "一、人際關係與溝通",
    items: [
      { name: "遊戲教材《我們班的叢林法則》", tags: "人際衝突、班級經營" },
      { name: "桌遊《情緒謎語》", tags: "人際衝突、社會情緒學習（SEL）、表演藝術" },
    ],
  },
  {
    group: "二、性別平等",
    items: [
      { name: "桌遊《練愛猜心》", tags: "性別平等、情感教育" },
      { name: "桌遊《家分題》", tags: "性別平等、家庭教育" },
    ],
  },
  {
    group: "三、媒體素養",
    items: [
      { name: "桌遊《抓誑新聞》", tags: "媒體識讀、資訊素養" },
    ],
  },
  {
    group: "四、全球議題",
    items: [
      { name: "桌遊《碳排危機》", tags: "減碳、SDGs、環境" },
      { name: "桌遊《我們的福爾摩沙》", tags: "SDGs、環境、國際觀" },
      { name: "桌遊《瞎掰王SDGs教育版》", tags: "SDGs" },
    ],
  },
  // 2026-08-26：這裡原本多了一組「五、兒童權利公約／桌遊《未來議會》」，原站這一頁**沒有**，
  // 已依使用者決定移除，並把議題思辨課改回原站的編號「五、」。
  // 查證：解碼後的 HTML 裡「兒童權利公約」0 筆（對照組「教師研習」8 筆、「情緒謎語」2 筆，
  // 證明搜尋方法有效，不是 entity 編碼造成的假陰性）；「未來議會」雖有 2 筆，但兩筆都在導覽選單的
  // 買桌遊下拉裡（前一項都是「抓誑新聞」），不是內文。原站這份清單只到「四、全球議題」，
  // 接著就是「五、議題思辨課」。
  // 註：總覽頁與「教材應用」頁確實有《未來議會》這組，那是那兩頁自己的內容，不影響本頁。
  {
    group: "五、議題思辨課",
    items: [{ name: "不用購買教材，可設定各種議題", tags: "人權、議題思辨" }],
  },
];

// 原站「三、教育桌遊設計工作坊」底下還有三個規格的子項目（2026-08-25 稽核發現整段漏掉），
// 文字照 01-content-raw/pages/courses/teacher-workshop/page.html 解碼後重建。
const lessonDesignTopics: { title: string; items?: string[] }[] = [
  { title: "遊戲化教學（六大策略）" },
  { title: "遊戲化教案工作坊" },
  {
    title: "教育桌遊設計工作坊",
    items: [
      "桌遊設計之概要",
      "桌遊設計之概要＋改做練習",
      "桌遊設計工作坊",
    ],
  },
];

export default function TeacherWorkshopPage() {
  return (
    <>
      <section className="bg-black/[0.03] py-20">
        <Container>
          <h1 className="text-3xl font-bold text-ink md:text-4xl">教師研習</h1>
          <p className="mt-6 max-w-2xl text-ink/70">
            阿普蛙的教師研習課程分為兩大類：把議題桌遊帶進課堂的「教材應用」，以及帶老師動手設計遊戲化教案、教材的「教案、教材設計」。歡迎依教學現場的需求邀約課程。
          </p>
          <a
            href="https://forms.gle/7FqM18Ei29dgTnh96"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-full bg-brand-green px-8 py-3 font-semibold text-white transition hover:bg-brand-green-bright"
          >
            邀約課程
          </a>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              {/* 原站標題是「教材應用-議題桌遊（遊戲）應用於課堂」，重建時漏掉「桌遊（遊戲）」 */}
              <h2 className="text-2xl font-bold text-ink">
                🎲 教材應用-議題桌遊（遊戲）應用於課堂
              </h2>
              <p className="mt-3 text-ink/70">
                以下遊戲教材可依主題應用於課堂，每款遊戲的教師研習時間約 2~3 小時。
              </p>
              <div className="mt-6 space-y-5">
                {materialTopics.map((g) => (
                  <div key={g.group}>
                    <h3 className="font-bold text-ink">{g.group}</h3>
                    {/* 原站每組底下的教材是有編號的（1. 2. 3.） */}
                    <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm text-ink/70">
                      {g.items.map((it) => (
                        <li key={it.name}>
                          {it.name}
                          <span className="text-ink/40">　{it.tags}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
              <Link
                href="/courses/teacher-workshop/material-application"
                className="mt-8 inline-block rounded-full bg-brand-green px-6 py-3 font-semibold text-white transition hover:bg-brand-green-bright"
              >
                進一步瞭解課程
              </Link>
            </div>

            <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-black/[0.03]">
              <Image
                src="/images/courses/teacher-workshop-1.jpg"
                alt="教師研習現場，講師帶領教師分組進行議題桌遊教材應用"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-black/[0.03] py-16">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-black/[0.05] md:order-2">
              <Image
                src="/images/courses/teacher-workshop-2.jpg"
                alt="教師分組進行遊戲化教案設計工作坊"
                fill
                className="object-cover"
              />
            </div>

            <div className="md:order-1">
              <h2 className="text-2xl font-bold text-ink">📖 教案、教材設計</h2>
              <ul className="mt-6 space-y-3">
                {lessonDesignTopics.map((t, i) => (
                  <li key={t.title} className="font-semibold text-ink">
                    {["一", "二", "三"][i]}、{t.title}
                    {t.items && (
                      <ol className="mt-1 list-decimal space-y-1 pl-6 text-sm font-normal text-ink/70">
                        {t.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ol>
                    )}
                  </li>
                ))}
              </ul>
              <Link
                href="/courses/teacher-workshop/lesson-design"
                className="mt-8 inline-block rounded-full bg-brand-green px-6 py-3 font-semibold text-white transition hover:bg-brand-green-bright"
              >
                進一步了解課程
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold text-ink">課程介紹影片</h2>
          <div className="mt-6">
            <YouTubeEmbed id="UWM4UCOjNHQ" title="阿普蛙教師研習課程介紹影片" />
          </div>
        </Container>
      </section>
    </>
  );
}
