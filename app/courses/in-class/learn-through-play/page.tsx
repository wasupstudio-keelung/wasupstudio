import type { Metadata } from "next";
import { Container } from "@/app/_components/Container";
import { CourseFacts } from "@/app/_components/CourseFacts";
import { CourseImage } from "@/app/_components/CourseImage";
import {
  TabbedBox,
  TabPane,
  WeeblyOutlineButton,
} from "@/app/_components/TabbedBox";
import { boardGames, soldOutBoardGames } from "@/app/_lib/site-data";

export const metadata: Metadata = {
  title: "在遊戲中學議題｜入班授課",
  description:
    "阿普蛙用遊戲比喻現實情境，青少年透過遊戲便能理解該主題的重要性及與自身的連結，進而去思考回到生活中我們可以怎麼做，形塑與他人共好的社會。",
};

const INVITE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScTpdFbaeh221rvaEMgG_1vrh0RC_9rOEx1j8ActjGE4PiM7A/viewform";

type CourseLink = { label: string; href: string; external?: boolean };

// 原站每張課程卡圖片下方的「遊戲介紹／桌遊介紹」按鈕。
// 有站內商品頁的直接連 /board-games/<slug>，避免手動維護連結。
const boardGameLink = (
  slug: string,
  label = "桌遊介紹",
): CourseLink | undefined => {
  const game = boardGames.find((g) => g.slug === slug);
  if (game) return { label, href: game.href };
  // 完售品仍然有商品頁。不查這一份的話，商品一從販售中搬走，這顆按鈕就會無聲消失。
  const soldOut = soldOutBoardGames.find((g) => g.slug === slug && g.href);
  return soldOut ? { label, href: soldOut.href! } : undefined;
};

// 《家分題》已完售，不在 site-data.ts 的 boardGames（販售中）清單裡，所以 boardGameLink() 查不到；
// 它的商品頁 2026-08-26 才從原站孤兒頁 /234782099838988.html 補建出來，這裡直接指定路由。
const FAMILY_TOPICS_LINK: CourseLink = {
  label: "桌遊介紹",
  href: "/board-games/family-topics",
};

// 課程內容有些是兩層清單（大階段 + 底下細項），照原站保留層級
type ContentItem = string | { label: string; items: string[] };

type Course = {
  title: string;
  tag?: string;
  subtitle?: string;
  image?: string;
  grade: string;
  hours: string;
  goals: string[];
  content: ContentItem[];
  link?: CourseLink;
};

type Category = {
  label: string;
  courses: Course[];
};

const categories: Category[] = [
  {
    label: "一、人際關係與溝通",
    courses: [
      {
        title: "我們班的叢林法則",
        subtitle: "班級挑戰，解密人際關係的叢林之謎！",
        image: "/images/courses/learn-through-play-2.png",
        grade: "三年級至七年級",
        hours: "2-3 小時",
        goals: [
          "深入了解人際衝突中的情感與需求。",
          "探討旁觀者的力量，如何影響事件發展。",
          "共同思考衝突事件的聰明因應策略。",
        ],
        content: [
          "戲劇體驗：融入虛構的叢林班日常，透過生動戲劇影片，一同探討角色未來的選擇，體驗合作與反思的奇妙旅程。",
          "引導反思：從角色感受與需求出發，引導深入討論合理的因應策略，讓學生更理解彼此的情感需求。",
        ],
        link: {
          label: "遊戲介紹",
          href: "https://wasupstudionobullying.com",
          external: true,
        },
      },
      {
        title: "情緒謎語",
        image: "/images/courses/learn-through-play-3.jpg",
        grade: "國小三年級以上、國中、高中、大學",
        hours: "2-3 小時",
        goals: [
          "認識與理解情緒：學生將學習辨識不同的情緒及其強度，並了解情緒如何影響我們的行為和決策。",
          "增進人際關係技巧：透過遊戲中的模擬情境，學生將提升察言觀色的能力，學習如何透過溝通來解決人際衝突。",
          "培養同理心與情緒管理：學生將學會理解他人的感受，並探索在不同情境下的適當反應，以改善人際互動。",
          "應用生活情境學習：學生能夠將課堂上學到的技能應用到日常生活中，改善班級氛圍，增強班級凝聚力。",
        ],
        content: [
          {
            label: "暖身引言",
            items: [
              "引導學生思考對不同情緒表現的理解。",
              "簡介遊戲規則與所使用的桌遊配件（情緒卡、情緒圖版等）。",
            ],
          },
          {
            label: "遊戲體驗",
            items: [
              "學生分組進行遊戲，每組輪流演出事件卡，模擬生活化的對話情境。",
              "小組討論：猜測扮演者的情緒。",
            ],
          },
          {
            label: "反思與分享",
            items: [
              "反思遊戲中的學習經驗，討論在現實生活中如何應對類似情境。",
              "邀請學生分享他們在遊戲中的觀察和學習，並討論如何應用到日常生活中。",
            ],
          },
        ],
        link: boardGameLink("riddle-me-feelings"),
      },
    ],
  },
  {
    label: "二、性別平等",
    courses: [
      {
        title: "練愛猜心",
        tag: "性別平等 × 情感教育",
        subtitle: "猜心遊戲，解鎖感情密碼！",
        image: "/images/courses/learn-through-play-4.jpg",
        grade: "國小高年級、國中、高中、大學",
        hours: "2-3 小時",
        goals: [
          "透過遊戲深入了解不同人的感受和想法，培養同理心。",
          "學習正確表達情緒，促進有效溝通。",
          "探討遇到困境時可以尋求哪些單位協助。",
        ],
        content: [
          "遊戲體驗：每回合抽取事件，挑戰各組成為「當事人」，讓其他組猜測情緒，深度傾聽他人心聲。",
          "引導反思：思考並討論不同人的感受和背後的需求，強調溝通的關鍵性。",
        ],
        link: boardGameLink("practice-for-love"),
      },
      {
        title: "家分題",
        tag: "性別平等 × 家務分工",
        subtitle: "為家庭生活加分！",
        image: "/images/courses/learn-through-play-5.jpg",
        grade: "國小中高年級、國中、高中、大學",
        hours: "3 小時",
        goals: [
          "引導學生思考家務分工的重要性，打破傳統角色刻板印象。",
          "探討幸福家庭的自主和他人連結的平衡。",
          "透過遊戲看見自我與他人的互動關係，學習正向溝通方式。",
        ],
        content: [
          "遊戲體驗：扮演同住的家人、朋友，戰勝家務挑戰，同時思考家務分工的重要性，共同討論策略。",
          "引導反思：思考當人改變目標，進而影響人們的心態及作法，進而領悟家務分工的重要性。",
        ],
        link: FAMILY_TOPICS_LINK,
      },
    ],
  },
  {
    label: "三、媒體素養",
    courses: [
      {
        title: "抓誑新聞",
        subtitle: "識讀勇者的冒險！",
        image: "/images/courses/learn-through-play-6.jpg",
        grade: "國小高年級、國中、高中、大學",
        hours: "3 小時",
        goals: [
          "學習辨識新聞中的陷阱——標籤、置入、誤導、刺激。",
          "體驗媒體混亂、媒體與閱聽人資訊不對等，引發對媒體與社會互動的思考。",
          "培養閱聽人的自主性、提升識讀能力，透過檢舉促使媒體自律。",
        ],
        content: [
          "學生成為「識讀勇者」，挑戰聽新聞、破除藏匿的四大毒物！升級能力、與夥伴協作，共同打擊媒體怪獸，既考驗識讀能力，也考驗學員的協作分工。",
        ],
        link: boardGameLink("crazy-news"),
      },
      {
        title: "童話村命案",
        subtitle: "探索真相的媒體大戰！",
        image: "/images/courses/learn-through-play-7.jpg",
        grade: "國小高年級、國中、高中、大學",
        hours: "3 小時",
        goals: [
          "透過調查、採訪、新聞撰寫到播報，培養邏輯思考、閱讀理解、作文及口語表達能力。",
          "學習透過提出、驗證、修正假設的步驟來判讀媒體。",
          "引導思考媒體與閱聽人之間的關聯性，將兩者視為相互影響的夥伴。",
        ],
        content: [
          "學生組成媒體公司，競爭成為影響力最大的媒體。童話村發生命案，各媒體需找真相、搶收視，考驗採訪技巧，哪家媒體能獲得最大影響力，誰了解事情的真相？",
        ],
      },
      {
        title: "犯罪現場",
        subtitle: "媒體解謎的思辨之旅",
        image: "/images/courses/learn-through-play-8.jpg",
        grade: "國中、高中、大學",
        hours: "3 小時",
        goals: [
          "透過桌遊模擬現實生活事件，培養媒體辨識能力。",
          "以不同角色體驗媒體背後的不同角度，探討媒體對社會的影響。",
          "引導思考自媒體在日常生活中的影響，對社會造成的影響。",
        ],
        content: [
          "學生扮演不同角色，體驗在案件中對同樣資訊的不同解讀，學習思辨能力。透過不同角色的對比，探討現實中媒體的書寫者、帶風向者、大眾在資訊落差時的解讀差異。",
        ],
      },
    ],
  },
  {
    label: "四、兒童權利公約",
    courses: [
      {
        title: "CRC偵探事件簿",
        subtitle: "兒童權利偵探啟程！",
        image: "/images/courses/learn-through-play-9.jpg",
        grade: "國中、高中、大學",
        hours: "3 小時",
        goals: [
          "認識兒童權利公約（CRC），培養學生辨識能力。",
          "從遊戲中學會資訊彙整與判斷，深化對事情真相的理解，避免盲目跟風，培養獨立思考的能力。",
          "提升學生的溝通表達技巧，由情報討論到最終表決，真實展現表意權的實質影響。",
        ],
        content: [
          "透過模擬學生會的運作，以情境體驗方式深度思考每個案件。蒐集、釐清事件資訊，討論是否侵權，實際申訴與否。通過討論，學生深入了解兒童權利公約賦予孩子的各種權利，從表意權、受保護權、勞動權、隱私權等方面，以真實案例改編的故事，讓學生看到校園可能發生的事情，提升對兒童權利的意識感。",
        ],
      },
      {
        title: "CRC糾察隊",
        subtitle: "CRC 糾察特訓，守護兒童權利！",
        image: "/images/courses/learn-through-play-10.jpg",
        grade: "國小、國中",
        hours: "2 小時",
        goals: [
          "認識兒童權利公約（CRC），深入了解各項權利的重要性。",
          "透過辨識每個事件對兒童權利的傷害，培養學生的辨識能力。",
        ],
        content: [
          "以繪本形式生動介紹兒童權利公約的四大原則與八項重要權利。",
          "透過有趣的遊戲，讓學生們組成團隊，討論每個事件對兒童的哪項權利造成傷害。結合現實生活，提升學生對於周遭可能侵害兒童權利的敏感度。",
        ],
      },
      {
        title: "未來議會",
        image: "/images/courses/learn-through-play-11.jpg",
        grade: "國小高年級、國中、高中",
        hours: "2-3 小時",
        goals: [
          "理解兒少議題與權利：學生將學習並理解當代兒少生活中的重要議題，如教育、健康、心理健康等，並認識兒少權利的基本概念。",
          "提升批判性思維與討論能力：學生將透過遊戲中的議題競猜及討論環節，培養獨立思考和發表意見的能力，並學會從多角度思考問題。",
          "促進團隊合作與溝通技巧：學生將在小組內進行角色扮演，學習如何表達自己的意見並與他人溝通，達成共識。",
        ],
        content: [
          {
            label: "階段一：競猜遊戲（30 分鐘）",
            items: [
              "學生分組（每組代表一個黨派），每組會針對從議題卡中抽出的兒少議題進行下注競猜，根據他們認為的正確答案，下注他們手上的「民意支持」點數。",
              "講師根據兒少數據調查公佈正確答案，並計算每組的得分，最高得分的團隊獲得最多的民意支持。",
            ],
          },
          {
            label: "階段二：討論議案",
            items: [
              "每組將抽取新的議題卡，根據該議題發表黨派立場意見，並試圖說服其他黨派同意他們的觀點。",
              "各組在討論結束後進行投票，最受支持的黨派將獲得額外的分數，最終分數最高者成為未來議會中最具影響力的政黨。",
            ],
          },
        ],
      },
    ],
  },
  {
    label: "五、全球議題",
    courses: [
      {
        title: "我們的福爾摩沙",
        subtitle: "融入聯合國 17 項指標，共創永續發展的未來！",
        image: "/images/courses/learn-through-play-12.jpg",
        grade: "國小高年級、國中、高中、大學",
        hours: "3 小時",
        goals: [
          "透過桌遊，使孩子深入認識包括貧窮、城鄉差距、海洋資源、垃圾污染等 17 項指標。",
          "強調第 17 項指標的「永續發展與全球合作」，培養孩子合作解決問題的能力，體會彼此為夥伴而非敵人的重要性。",
        ],
        content: [
          "學生組成社會企業，面對各種社會議題如空氣污染、人口老化等。透過思考公司營運方式，同時改善社會問題，實踐永續發展的理念。",
        ],
      },
      {
        title: "碳排危機",
        subtitle: "體驗生活中的每個選擇，深刻了解減碳對生活和環境的影響！",
        image: "/images/courses/learn-through-play-13.jpg",
        grade: "國中、高中、大學",
        hours: "3 小時",
        goals: [
          "認識減碳和不減碳的行為，了解碳排放對生活及環境的影響。",
          "反思個人行為對環境的影響，提升學生環境意識，促使友善環境的行動。",
        ],
        content: [
          "透過具競爭性的桌遊，讓玩家深刻理解每個生活選擇的重要性。遊戲中的選擇將影響不同結局，玩家能否安然度過碳排危機呢？",
        ],
      },
      {
        title: "紅黑戰爭",
        subtitle: "媒體處於戰爭陰影中的抉擇！",
        image: "/images/courses/learn-through-play-14.jpg",
        grade: "國小高年級、國中、高中、大學",
        hours: "3 小時",
        goals: [
          "學習戰爭中產生的假訊息，了解其對戰爭的影響。",
          "學習判別假訊息的方法，提升媒體素養。",
        ],
        content: [
          "方塊國面臨紅心國與黑桃國的戰爭，學生扮演方塊國的媒體，必須在真實與吸引之間取得平衡，以最佳方式報導戰爭情勢。",
        ],
      },
      {
        title: "方塊國會議",
        subtitle: "決策與合作的思辨之旅！",
        image: "/images/courses/learn-through-play-15.jpg",
        grade: "國小高年級、國中、高中、大學",
        hours: "3 小時",
        goals: [
          "訓練學生獨立思考、邏輯推理及表達的能力。",
          "針對戰爭相關議題，深度思考並學習非攻擊性的討論方式。",
        ],
        content: [
          "學生以方塊國代表身份，面對戰爭的各種挑戰，包括是否參戰、對待難民等。在議會中做出決策，同時說服其他代表支持，是一場充滿挑戰的思辨之旅。",
        ],
      },
    ],
  },
  {
    label: "六、文化教育",
    courses: [
      {
        title: "拚陣頭",
        subtitle: "探索藝陣文化的熱血之旅！",
        image: "/images/courses/learn-through-play-16.jpg",
        grade: "國小高年級、國中、高中、大學",
        hours: "2 小時",
        goals: [
          "透過桌遊《拚陣頭》，融入教育與娛樂，讓學生在遊戲中深入認識藝陣文化。",
          "通過各種陣頭的特徵，讓學生親身體驗不同元素，發現藝陣的趣味之處。",
        ],
        content: [
          "學生擔任鄉里的「頭人」，面對即將到來的廟會盛事，號召人才共同參與跳陣頭。在比拼中領略「輸人毋輸陣，輸陣歹看面」的文化精神，探索村子陣頭的獨特之處。",
        ],
      },
      {
        title: "鬥陣度中元",
        subtitle: "解密雞籠中元祭的智慧之旅！",
        image: "/images/courses/learn-through-play-17.jpg",
        grade: "國小高年級、國中",
        hours: "2 小時",
        goals: [
          "認識雞籠中元祭的起源，並深刻理解其背後的歷史背景。",
          "反思械鬥和競爭對社會帶來的負面影響，以及前人如何智慧地轉化競爭為祭典。",
        ],
        content: [
          "透過遊戲，生動介紹雞籠中元祭的起源，引導學生深刻反思械鬥對社會的影響。同時，遊戲中展現競爭的轉化，探討如何透過智慧和節慶的方式凝聚社區。",
        ],
      },
    ],
  },
];

export default function LearnThroughPlayPage() {
  return (
    // ⚠️ 2026-08-26 重做版面。原站這頁量起來是**單一個** wsite-section（底色 #fcfcfc），
    // 內容依序是：①一列兩欄「27.7% 標題＋邀約課程按鈕（都置中）／72.3% 導言」
    // ②「一、人際關係與溝通」等 6 個分類標題（24px 粗體黑、靠左），每個標題底下接一組分頁籤。
    // 重建站原本自己加了淡灰 hero 底、「入班授課｜青少年培力課程」小標籤、一張 21:9 橫幅大圖
    // （拿課程照裁的）、grid 版的課程主題清單、綠色圓角按鈕，最後還多一段「想邀請阿普蛙入班
    // 授課？」CTA——原站通通沒有，已移除。課程也不再是卡片直列，改回原站的分頁籤。
    <section className="bg-[#fcfcfc] py-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-[28fr_72fr] md:items-start">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-ink">🎲在遊戲中學議題</h1>
            <div className="mt-6">
              <WeeblyOutlineButton href={INVITE_FORM_URL} external>
                邀約課程
              </WeeblyOutlineButton>
            </div>
          </div>
          {/* 原站量測：16px／行高 28px、靠左。課程主題／適合年齡／課程時間是同一段裡的三行，
              不是重建站原本做的 dl 表格。 */}
          <div className="text-base leading-[28px] text-ink">
            <p>
              阿普蛙用遊戲比喻現實情境，青少年透過遊戲便能理解該主題的重要性及與自身的連結，進而去思考回到生活中我們可以怎麼做，形塑與他人共好的社會。
            </p>
            <p>
              課程主題：人際關係與溝通、性別平等、媒體素養、兒童權利公約、全球議題
            </p>
            <p>適合年齡：國小高年級、國中生、高中生、大學生、成人</p>
            <p>
              課程時間：每一主題建議安排三小時，亦可針對營隊或帶狀課程，進行多元主題搭配。
            </p>
          </div>
        </div>

        <div className="mt-14 space-y-14">
          {categories.map((category) => (
            <div key={category.label}>
              <h2 className="text-2xl font-bold text-ink">{category.label}</h2>
              <div className="mt-6">
                <TabbedBox
                  tabs={category.courses.map((course) => ({
                    label: `《${course.title}》`,
                    content: (
                      <TabPane
                        media={
                          <>
                            {course.image && (
                              <CourseImage
                                src={course.image}
                                alt={`《${course.title}》遊戲實照`}
                              />
                            )}
                            {course.link && (
                              <div className="mt-2">
                                <WeeblyOutlineButton
                                  href={course.link.href}
                                  external={course.link.external}
                                >
                                  {course.link.label}
                                </WeeblyOutlineButton>
                              </div>
                            )}
                          </>
                        }
                      >
                        <CourseFacts
                          subtitle={course.subtitle}
                          facts={[
                            {
                              label: "適合年級",
                              value: course.grade,
                            },
                            {
                              label: "授課時間",
                              value: course.hours,
                            },
                          ]}
                          sections={[
                            {
                              label: "課程目標",
                              items: course.goals,
                            },
                            {
                              label: "課程內容",
                              items: course.content,
                            },
                          ]}
                        />
                      </TabPane>
                    ),
                  }))}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
