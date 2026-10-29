import type { Metadata } from "next";
import Link from "next/link";
import { SiteImage as Image } from "@/app/_components/SiteImage";
import { Container } from "@/app/_components/Container";
import { PageBanner } from "@/app/_components/PageBanner";

export const metadata: Metadata = {
  title: "找課程",
  description:
    "藉由議題遊戲，透過「體驗式學習」，讓學員理解民主社會的組成，並培養公共意識、公民素養，對於社會議題產生自己的想法，提升學員的獨立思考能力及表達能力，並實際應用在生活當中。",
};

// 「課程類型」四張卡片。
// 2026-08-25 稽核發現：這一區原本只渲染 courseNav 的子選單連結（教材應用／教案-教材設計…），
// 但原站每張卡片其實是「照片＋標題＋一整份課程清單＋課程介紹按鈕」，清單內容整段沒被搬過來。
// 以下標題與清單文字逐字照 01-content-raw/pages/courses/index/page.html 解碼後的內容重建，
// 包含原站卡片標題與導覽選單不一致的地方（卡片寫「青少年培力課程」「親職課程/親子課程」，
// 選單寫「入班授課｜青少年培力課程」「家庭教育課程」）——照原站保留這個差異。
type CourseGroup = {
  label: string;
  items?: string[];
  bullet?: boolean; // 原站這一組用 <ul>（實心圓點）而不是 <ol>（數字）
};

type CourseCard = {
  href: string;
  title: string;
  image: string;
  // 教師研習卡片分成 🎲 / 📖 兩大段，其他三張卡片只有一份扁平清單
  sections?: { title: string; groups: CourseGroup[] }[];
  items?: { text: string; sub?: string[] }[];
};

const courseCards: CourseCard[] = [
  {
    href: "/courses/teacher-workshop",
    title: "教師研習",
    image: "/images/courses/courses-2.jpg",
    sections: [
      {
        title: "🎲 【教材應用-議題遊戲應用於課堂】",
        groups: [
          {
            label: "一、人際關係與溝通",
            items: ["遊戲教材《我們班的叢林法則》", "桌遊《情緒謎語》"],
          },
          {
            label: "二、性別平等",
            items: ["桌遊《練愛猜心》", "桌遊《家分題》"],
          },
          {
            label: "三、媒體素養",
            items: ["桌遊《抓誑新聞》"],
          },
          {
            label: "四、全球議題",
            items: ["桌遊《碳排危機》", "桌遊《我們的福爾摩沙》"],
          },
          {
            label: "五、兒童權利公約",
            items: ["桌遊《未來議會》"],
            bullet: true,
          },
          { label: "六、議題思辨課" },
        ],
      },
      {
        title: "📖【教案、教材設計】",
        groups: [
          { label: "一、遊戲化教學（六大策略）" },
          { label: "二、遊戲化教案工作坊" },
          {
            label: "三、教育桌遊設計工作坊",
            items: [
              "桌遊設計之概要",
              "桌遊設計之概要＋改做練習",
              "桌遊設計工作坊",
            ],
          },
        ],
      },
    ],
  },
  {
    href: "/courses/in-class",
    title: "青少年培力課程",
    image: "/images/courses/courses-3.jpg",
    items: [
      { text: "1.在遊戲中學議題" },
      { text: "2.議題探究與實作" },
      { text: "3.增進溝通能力" },
      { text: "4.民主從開班會開始" },
    ],
  },
  {
    href: "/courses/corporate-training",
    title: "教育訓練",
    image: "/images/courses/courses-4.jpg",
    items: [
      {
        text: "1.提升團隊溝通力",
        sub: ["學習風格", "非暴力溝通", "遊戲帶你有感表達"],
      },
      { text: "2.提升對社會議題之敏銳度" },
    ],
  },
  {
    href: "/courses/family-education",
    title: "親職課程/親子課程",
    image: "/images/courses/courses-5.jpg",
    items: [
      { text: "1.如何與孩子好好溝通" },
      { text: "2.用遊戲討論家務分工" },
      { text: "3.玩桌遊認識兒童氣質" },
    ],
  },
];

const features = [
  {
    icon: "/images/courses/courses-icon-1.png",
    text: "體驗議題遊戲，探討遊戲影射的現實情境，提升社會議題的敏銳度與好奇心。",
  },
  {
    icon: "/images/courses/courses-icon-2.png",
    text: "藉由遊戲中學員的策略運用、情緒展現，協助學員了解自我。",
  },
  {
    icon: "/images/courses/courses-icon-3.png",
    text: "促進團隊內部合作，學習團隊間的協調，協助學員建立更好的合作、溝通模式。",
  },
];

export default function CoursesPage() {
  return (
    <>
      {/* 原站這個 banner 底圖沒有畫標題文字進去（跟首頁／想設計／買桌遊總覽不同，量測 DOM 發現
          wsite-section-elements 是空的），純粹是裝飾用的窄版底圖，所以不傳 title。 */}
      <PageBanner
        image="/images/banners/courses-banner.png"
        imagePosition="center"
        className="h-[140px] md:h-[220px]"
      />

      {/* 2026-08-25 全站逐頁核對 section 背景才發現：這段原站是中灰 #7d7d7d 底、白字（量測 font
          color 得到），不是重建站原本的極淡灰底＋深色字。 */}
      <section className="bg-[#7d7d7d] py-20">
        <Container className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              在遊戲中學習
            </h1>
            <p className="mt-2 font-semibold text-brand-green-bright">
              阿普蛙的課程特色「邊玩邊學」！
            </p>
            <p className="mt-6 max-w-2xl text-white/80">
              傳統的教育方式傾向於將知識單向地傳遞給學習者，但學習者往往會喪失學習動機，或是無法理解該課程主題與自身的連結。阿普蛙透過遊戲，讓學習者在輕鬆愉快的氛圍中開始學習，在投入遊戲歷程中，去發掘該主題、議題與自身的連結性。
            </p>
            <p className="mt-4 max-w-2xl text-white/80">
              更重要的是遊戲後，講師帶領學習者進行引導反思，整理自己的遊戲經驗，並思考下一步及相關知識可以如何應用。
            </p>
            <a
              href="https://goo.gl/forms/6jmASQjVdaqPHapA2"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-full bg-brand-green px-8 py-3 font-semibold text-white transition hover:bg-brand-green-bright"
            >
              邀約課程
            </a>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-white/10">
            <Image
              src="/images/courses/courses-1.jpg"
              alt="學員圍坐在一起體驗議題桌遊"
              fill
              className="object-cover"
              priority
            />
          </div>
        </Container>
      </section>

      {/* 2026-08-25：原站這兩段的底色跟重建站剛好對調了——原站「課程類型」是 #fdfffd（極淡的
          偏綠白），「阿普蛙的遊戲特色」才是透明（純白）；重建站原本是課程類型純白、遊戲特色套
          bg-black/[0.03]。已對調回來。 */}
      <section className="bg-[#fdfffd] py-16">
        <Container>
          <h2 className="text-center text-2xl font-bold text-ink">課程類型</h2>
          <div className="mt-8 grid items-start gap-6 sm:grid-cols-2">
            {courseCards.map((card) => (
              <div
                key={card.href}
                className="flex flex-col overflow-hidden rounded-2xl border border-black/5 shadow-sm"
              >
                <div className="relative aspect-4/3 w-full bg-black/[0.04]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <Link
                    href={card.href}
                    className="text-center text-lg font-bold text-ink hover:text-brand-green"
                  >
                    {card.title}
                  </Link>

                  {card.sections?.map((section) => (
                    <div key={section.title} className="mt-4 text-sm">
                      <p className="font-semibold text-ink">{section.title}</p>
                      {section.groups.map((group) => (
                        <div key={group.label} className="mt-2">
                          <p className="font-bold text-ink">{group.label}</p>
                          {group.items && (
                            <ol
                              className={`mt-1 space-y-1 pl-6 text-ink/70 ${
                                group.bullet ? "list-disc" : "list-decimal"
                              }`}
                            >
                              {group.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ol>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}

                  {card.items && (
                    <ul className="mt-4 space-y-1 text-sm text-ink/70">
                      {card.items.map((item) => (
                        <li key={item.text}>
                          {item.text}
                          {item.sub && (
                            <ul className="mt-1 list-disc space-y-1 pl-6">
                              {item.sub.map((s) => (
                                <li key={s}>{s}</li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-6 text-center">
                    <Link
                      href={card.href}
                      className="inline-block rounded-full bg-brand-green px-6 py-2 text-sm font-semibold text-white transition hover:bg-brand-green-bright"
                    >
                      課程介紹
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 原站這段是 transparent（純白），見上一個 section 的說明 */}
      <section className="py-16">
        <Container>
          <h2 className="text-center text-2xl font-bold text-ink">
            阿普蛙的遊戲特色
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm font-semibold text-ink/70">
            在遊戲中，學員可扮演不同角色，以模擬社會中的現實狀況，例如貧富差距、資訊不對等、階級不流動等模擬真實情境，用遊戲比喻人生。
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <li
                key={f.text}
                className="flex flex-col items-center text-center"
              >
                <div className="relative h-16 w-16">
                  <Image
                    src={f.icon}
                    alt=""
                    fill
                    className="object-contain"
                    aria-hidden
                  />
                </div>
                <p className="mt-4 text-sm font-semibold text-ink/70">
                  {f.text}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
