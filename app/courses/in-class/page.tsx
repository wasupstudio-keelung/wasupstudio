import type { Metadata } from "next";
import { SiteImage as Image } from "@/app/_components/SiteImage";
import Link from "next/link";
import { Container } from "@/app/_components/Container";
import { courseNav } from "@/app/_lib/site-data";

export const metadata: Metadata = {
  title: "入班授課｜青少年培力課程",
  description:
    "在遊戲的歡笑中，我們引導學員擁抱獨立思考的樂趣，激發他們內在的表達能力。這不僅是一場遊戲，更是通向實際應用在生活中的思考之旅。加入我們，一同體驗知識的輕鬆啟發，掌握應對社會挑戰的自信！",
};

const INVITE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScTpdFbaeh221rvaEMgG_1vrh0RC_9rOEx1j8ActjGE4PiM7A/viewform";

type CardItem = { label: string; games?: string[] };

type CardExtra = {
  emoji: string;
  // 原站卡片標題跟導覽列用的標題不完全一樣時才給（例：民主從「開會」開始）
  title?: string;
  image: string;
  items: CardItem[];
};

// 這頁本身有自己專屬的 4 張情境照片，不借用各子頁的圖
// 各卡片底下的分類／遊戲清單照原站 index 頁逐字抄，順序不要動
const cardExtras: Record<string, CardExtra> = {
  "/courses/in-class/learn-through-play": {
    emoji: "🎲",
    image: "/images/courses/in-class-1.jpg",
    items: [
      { label: "一、人際關係與溝通", games: ["我們班的叢林法則"] },
      { label: "二、性別平等", games: ["練愛猜心", "家分題"] },
      { label: "三、媒體素養", games: ["抓誑新聞", "童話村命案"] },
      { label: "四、兒童權利公約", games: ["CRC偵探事件簿", "CRC糾察隊"] },
      {
        label: "五、全球議題",
        games: ["我們的福爾摩沙", "碳排危機", "紅黑戰爭", "方塊國會議"],
      },
      { label: "六、文化教育", games: ["拚陣頭", "鬥陣度中元"] },
    ],
  },
  "/courses/in-class/inquiry-practice": {
    emoji: "📝",
    image: "/images/courses/in-class-2.jpg",
    items: [{ label: "1. 議題思辨課" }, { label: "2. 議題探究與實作" }],
  },
  "/courses/in-class/communication": {
    emoji: "🗣️",
    image: "/images/courses/in-class-3.jpg",
    items: [{ label: "1. 冒險者之旅（勇者風格）" }, { label: "2. 正向溝通工作坊" }],
  },
  "/courses/in-class/democracy-in-meetings": {
    emoji: "🎤",
    title: "民主從「開會」開始",
    image: "/images/courses/in-class-4.jpg",
    items: [],
  },
};

export default function InClassCoursesPage() {
  const inClass = courseNav.find((c) => c.href === "/courses/in-class");
  const children = inClass?.children ?? [];

  return (
    <>
      <section className="bg-black/[0.03] py-16">
        <Container>
          <p className="text-sm font-semibold text-brand-green">入班授課</p>
          <h1 className="mt-2 text-3xl font-bold text-ink md:text-4xl">
            青少年培力課程
          </h1>
          <p className="mt-4 max-w-2xl text-ink/70">
            透過歡樂有趣的遊戲體驗，帶領您輕鬆認識複雜的社會議題！🎲🌐
            在遊戲的歡笑中，我們引導學員擁抱獨立思考的樂趣，激發他們內在的表達能力。這不僅是一場遊戲，更是通向實際應用在生活中的思考之旅。加入我們，一同體驗知識的輕鬆啟發，掌握應對社會挑戰的自信！🌟✨
          </p>
          <div className="mt-8">
            <a
              href={INVITE_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full bg-brand-green px-6 py-3 font-semibold text-white transition hover:bg-brand-green-bright"
            >
              邀約課程
            </a>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="text-center text-2xl font-bold text-ink">課程類型</h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {children.map((child) => {
              const extra = cardExtras[child.href];
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 shadow-sm transition hover:shadow-md"
                >
                  {extra?.image && (
                    <div className="relative aspect-4/3 w-full bg-black/[0.04]">
                      <Image
                        src={extra.image}
                        alt={child.title}
                        fill
                        className="object-cover transition group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-ink">
                      {extra?.emoji ? `${extra.emoji} ` : ""}
                      {extra?.title ?? child.title}
                    </h3>
                    {extra && extra.items.length > 0 && (
                      <ul className="mt-3 space-y-1 text-sm text-ink/70">
                        {extra.items.map((item) => (
                          <li key={item.label}>
                            {item.label}
                            {item.games && (
                              <ul className="mt-1 space-y-0.5 pl-4 text-ink/60">
                                {item.games.map((game) => (
                                  <li key={game}>《{game}》</li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                    <span className="mt-auto pt-4 text-sm font-semibold text-brand-green">
                      查看課程內容 →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
