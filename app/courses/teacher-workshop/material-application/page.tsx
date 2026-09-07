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
  title: "教材應用－議題桌遊應用於課堂",
  description:
    "阿普蛙教材應用課程，涵蓋人際關係與溝通、性別平等、媒體素養、全球議題、兒童權利公約、議題思辨課六大主題，將議題桌遊帶進課堂，每款遊戲研習時間約 2~3 小時。",
};

type Link_ = { label: string; href: string; external?: boolean };

type Item = {
  name: string;
  kind?: string; // 例如「數位互動影片教材」，非桌遊時標註
  image: string;
  theme: string;
  audience: string;
  // 原站絕大多數卡片寫「適合對象」，只有《未來議會》寫「適用對象」，照原站保留
  audienceLabel?: string;
  experience: { label: string; desc: string }[];
  outline: { label: string; desc: string }[];
  link?: Link_;
  // 原站放在圖片／連結底下的星號附註
  note?: string;
};

type Group = {
  heading: string;
  items: Item[];
};

// 有對應站內商品頁的遊戲，直接連到 /board-games/<slug>，避免手動重複維護連結
const boardGameLink = (slug: string, label = "桌遊介紹"): Link_ | undefined => {
  const game = boardGames.find((g) => g.slug === slug);
  if (game) return { label, href: game.href };
  // 完售品仍然有商品頁。不查這一份的話，商品一從販售中搬走，這顆按鈕就會無聲消失。
  const soldOut = soldOutBoardGames.find((g) => g.slug === slug && g.href);
  return soldOut ? { label, href: soldOut.href! } : undefined;
};

// 《家分題》已完售，不在 site-data.ts 的 boardGames（販售中）清單裡，所以 boardGameLink() 查不到；
// 它的商品頁 2026-08-26 才從原站孤兒頁 /234782099838988.html 補建出來，這裡直接指定路由。
const FAMILY_TOPICS_LINK: Link_ = {
  label: "桌遊介紹",
  href: "/board-games/family-topics",
};

const groups: Group[] = [
  {
    heading: "一、人際關係與溝通",
    items: [
      {
        name: "《我們班的叢林法則》",
        kind: "數位互動影片教材",
        image: "/images/courses/material-application-1.png",
        theme: "人際衝突與溝通、友善溝通、班級經營",
        audience: "國小、國一階段班級導師、輔導老師",
        experience: [
          {
            label: "遊戲體驗",
            desc: "透過故事影片，共同參與虛構的叢林班日常，討論並制定影片中角色的未來選擇，體驗合作與反思的樂趣。",
          },
          {
            label: "引導反思",
            desc: "從角色感受與需求出發，引導討論合理因應策略，深化對學生情感需求的理解。",
          },
        ],
        outline: [
          {
            label: "深度體會學生感受與需求",
            desc: "在衝突情境中挖掘學生真實感受，瞭解他們的需求。",
          },
          {
            label: "結局的隱含意義",
            desc: "解析不同結局的象徵意義，引導教師面對學生衝突時的靈活應對。",
          },
          {
            label: "教材操作技巧",
            desc: "掌握《我們班的叢林法則》操作方式，學會遊戲引導技巧。",
          },
        ],
        link: {
          label: "教材介紹",
          href: "https://wasupstudionobullying.com",
          external: true,
        },
      },
      {
        name: "《情緒謎語》",
        kind: "桌遊",
        image: "/images/courses/material-application-2.jpg",
        theme: "人際衝突與溝通、社會情緒學習、友善溝通、班級經營",
        audience: "國小、國中、高中、大學教師",
        experience: [
          {
            label: "遊戲體驗",
            desc: "分組進行角色扮演，利用事件卡模擬學生可能遇到的情緒困境。每個小組輪流演出，其他小組猜測情緒，並給予回饋，實際體驗遊戲的操作方式，模擬真實的學生情境，以熟悉遊戲流程（依研習時數，可教導 2-4 種玩法）。",
          },
          {
            label: "反思與討論",
            desc: "集體討論如何在課堂中使用這款遊戲，針對不同年級、學生特性與學習目標，調整教學方法。",
          },
        ],
        outline: [
          {
            label: "理解情緒教育的核心",
            desc: "教師將學習如何透過遊戲輔助學生辨識情緒，並了解情緒對人際互動的影響。",
          },
          {
            label: "提升教學技巧",
            desc: "掌握如何在課堂中應用桌遊《情緒謎語》，並學習操作上的各種細節。",
          },
          {
            label: "應用情境教學",
            desc: "學習如何利用實際情境引導學生發展同理心，並將遊戲中的經驗應用於班級管理與教學活動中。",
          },
        ],
        link: boardGameLink("riddle-me-feelings", "桌遊介紹"),
      },
    ],
  },
  {
    heading: "二、性別平等",
    items: [
      {
        name: "《練愛猜心》",
        kind: "桌遊",
        image: "/images/courses/material-application-3.jpg",
        theme: "性別平等、情感教育",
        audience: "國小高年級、國中、高中、大學階段班級導師、輔導老師",
        experience: [
          {
            label: "遊戲體驗",
            desc: "透過生動的情境，培養同理心，突破刻板印象，傾聽不同聲音。",
          },
          {
            label: "引導反思",
            desc: "從每個事件背後探索不同思維，拓展對情感和性別平等的理解。",
          },
        ],
        outline: [
          {
            label: "情感共鳴的力量",
            desc: "透過遊戲認識不同的感受，建立情感共鳴。",
          },
          {
            label: "真實場景的應用",
            desc: "利用遊戲題庫了解學生生活中可能遇到的情境，促進班級和諧氛圍。",
          },
          {
            label: "遊戲操作技巧",
            desc: "教授《練愛猜心》在課堂中的引導技巧，提高學習效果。",
          },
        ],
        link: boardGameLink("practice-for-love", "遊戲介紹"),
      },
      {
        name: "《家分題》",
        kind: "桌遊",
        image: "/images/courses/material-application-4.jpg",
        theme: "家庭互動、拆解性別角色、創造平等共融家庭",
        audience: "國小中高年級、國中階段，社會、公民教師、班級導師、輔導老師",
        experience: [
          {
            label: "遊戲體驗",
            desc: "透過模擬家庭生活，體驗競合樂趣，挑戰傳統性別角色，打破性別框架。",
          },
          {
            label: "引導反思",
            desc: "從遊戲中連結到現實，探討如何在家庭中實踐性別平等。",
          },
        ],
        outline: [
          {
            label: "合作與性別平等的互動",
            desc: "探討競爭與合作心態對結果的影響，思考家庭互動如何促進性別平權。",
          },
          {
            label: "性別平等在家庭中的實踐",
            desc: "從家務分工出發，引導思考性別平權的實際應用。",
          },
          {
            label: "桌遊操作技巧",
            desc: "教導《家分題》在課堂中的巧妙應用，提供引導時的實用技巧。",
          },
        ],
        link: FAMILY_TOPICS_LINK,
      },
    ],
  },
  {
    heading: "三、媒體素養",
    items: [
      {
        name: "《抓誑新聞》",
        kind: "桌遊",
        image: "/images/courses/material-application-5.jpg",
        theme: "媒體識讀、資訊素養",
        audience: "國小高年級、國中、高中、大學階段，國文、社會、公民教師",
        experience: [
          {
            label: "遊戲體驗",
            desc: "扮演「識讀勇者」，通過辨識毒物、打擊怪獸、自我成長，在阻止「媒體巨獸」成長的同時，學習辨識假新聞的技能。",
          },
          {
            label: "引導反思",
            desc: "遊戲後進行引導反思，將遊戲連結到現實生活。",
          },
        ],
        outline: [
          {
            label: "四種毒物辨識",
            desc: "學習識別新聞中的標籤、置入、誤導、刺激等四種毒物。",
          },
          {
            label: "公民責任",
            desc: "探討身為公民應如何應對惡質媒體，以及公民間的互動關係。",
          },
          {
            label: "教學操作技巧",
            desc: "教授如何在課堂上引導學生操作《抓誑新聞》，注意事項及引導技巧。",
          },
        ],
        link: boardGameLink("crazy-news", "桌遊介紹"),
      },
      {
        name: "《犯罪現場》",
        kind: "桌遊",
        image: "/images/courses/material-application-6.jpg",
        theme: "媒體識讀、資訊素養",
        audience: "國中、高中、大學階段 - 社會、公民教師",
        experience: [
          {
            label: "遊戲體驗",
            desc: "扮演不同角色，體驗在案件中對同樣資訊的不同解讀，思考背後的邏輯，學習思辨能力。",
          },
          {
            label: "引導反思",
            desc: "透過不同角色的對比，探討現實中媒體的書寫者、帶風向者、大眾在資訊落差時的解讀差異。",
          },
        ],
        outline: [
          {
            label: "主題式遊戲應用",
            desc: "學習如何透過主題式遊戲模擬現實生活中的事件，培養媒體辨識能力。",
          },
          {
            label: "理解不同角色觀點",
            desc: "藉由遊戲角色，理解媒體背後所代表的不同角色。",
          },
          {
            label: "媒體影響力",
            desc: "探討自媒體在日常生活中的影響，引導思考對社會的影響。",
          },
        ],
      },
    ],
  },
  {
    heading: "四、全球議題",
    items: [
      {
        name: "《瞎掰王SDGs教育版》",
        kind: "桌遊",
        image: "/images/courses/material-application-7.jpg",
        theme: "SDGs 聯合國 17 項目標",
        audience: "國中、高中、大學階段教師",
        experience: [
          {
            label: "遊戲體驗",
            desc: "每回合會抽取一道跟永續發展目標有關的題目，各組玩家輪流擔任偵探，需識破誰在「瞎掰」。其餘玩家抽取角色卡：瞎掰人及老實人，老實人會知道正確解答，瞎掰人則需瞎掰答案，爭取偵探的信任。",
          },
          {
            label: "引導反思",
            desc: "每回合結束後，說明該題目正確解答，及符合 SDGs 的哪一項目標。",
          },
        ],
        outline: [
          {
            label: "教學應用",
            desc: "學習如何在課堂上運用桌遊進行 SDGs 教學。",
          },
          {
            label: "引導技巧",
            desc: "教導遊戲中如何引導學生創意發想及口語表達技巧。",
          },
          { label: "設計題目", desc: "結合自身專業，設計相關題目。" },
        ],
        link: boardGameLink("talk-nonsense-sdgs", "桌遊介紹"),
      },
      {
        name: "《我們的福爾摩沙》",
        kind: "桌遊",
        image: "/images/courses/material-application-8.jpg",
        theme: "SDGs、環境、國際",
        audience: "國中、高中、大學階段 - 自然、社會、公民教師",
        experience: [
          {
            label: "遊戲體驗",
            desc: "以社會企業角色，通過競爭、合作，達到 SDGs 的目標，理解全球永續發展議題。",
          },
          {
            label: "引導反思",
            desc: "遊戲後進行引導反思，將遊戲連結到全球現實生活。",
          },
        ],
        outline: [
          { label: "SDGs 概述", desc: "了解聯合國永續發展目標的 17 項目標。" },
          {
            label: "教學應用技巧",
            desc: "學習如何在課堂上操作《我們的福爾摩沙》。",
          },
          {
            label: "社會企業理念",
            desc: "探討社會企業如何在達成 SDGs 目標的同時取得勝利。",
          },
        ],
      },
      {
        name: "《碳排危機》",
        kind: "桌遊",
        image: "/images/courses/material-application-9.png",
        theme: "減碳、SDGs、環境",
        audience: "國中、高中、大學階段教師",
        experience: [
          {
            label: "遊戲體驗",
            desc: "透過模擬生活行為，學習如何在日常生活中減少碳排放，理解永續發展目標的重要性。",
          },
          {
            label: "引導反思",
            desc: "遊戲後進行引導反思，將碳排放議題連結到現實生活。",
          },
        ],
        outline: [
          {
            label: "教學應用",
            desc: "學習如何在課堂上運用桌遊進行永續發展教學。",
          },
          {
            label: "引導反思技巧",
            desc: "教授遊戲後如何有效引導學生進行反思。",
          },
          {
            label: "環境知識強化",
            desc: "深入理解日常行為對環境的影響，以及相關碳排放知識。",
          },
        ],
      },
    ],
  },
  {
    heading: "五、兒童權利公約",
    items: [
      {
        name: "《未來議會》",
        kind: "桌遊",
        image: "/images/courses/material-application-10.jpg",
        theme: "兒童權利公約、校園議題討論",
        audienceLabel: "適用對象",
        audience: "國小高年級、國中、高中教師及兒少工作者",
        experience: [
          {
            label: "遊戲體驗（體驗兩種遊戲階段）",
            desc: "階段一：競猜遊戲——教師分組模擬進行競猜活動，針對抽出的兒少議題卡進行下注競猜，了解如何利用兒少數據來促進學生對社會議題的認知。階段二：討論議案——每組代表一個黨派，針對指定議題發表立場意見，並試圖與其他黨派達成共識，這一階段的模擬能幫助教師了解如何在教學中促進學生的溝通與合作能力。",
          },
          {
            label: "反思討論",
            desc: "教師分享遊戲體驗，討論如何將這種形式的議題討論引入日常教學，並探討實際應用時可能面臨的挑戰及解決策略。",
          },
        ],
        outline: [
          {
            label: "了解兒少議題現況",
            desc: "教師將學習如何透過最新的兒少數據調查及相關資料引導學生理解兒少生活中的挑戰與權利。",
          },
          {
            label: "學習使用遊戲作為教學工具",
            desc: "掌握《未來議會》桌遊的規則及玩法，並學會如何在課堂上利用此遊戲促進學生的批判性思維及團隊討論能力。",
          },
          {
            label: "提升議題討論技巧",
            desc: "透過模擬遊戲，教師將學習如何引導學生表達自己的觀點。",
          },
        ],
        link: {
          label: "桌遊介紹",
          href: "https://www.yina.org.tw/product/detail/boardgame/894?utm_campaign=game&utm_source=KOL&utm_medium=wasupstudio",
          external: true,
        },
        // 原站原文：出版方是兒盟聯盟，不是阿普蛙。重建時被改寫成「由阿普蛙與兒福聯盟合作開發、出版」而失真。
        note: "*《未來議會》是由阿普蛙與兒福聯盟合作開發，由兒盟聯盟出版。",
      },
    ],
  },
];

const debateCourse = {
  heading: "六、議題思辨課（不用購買教材）",
  image: "/images/courses/material-application-11.jpg",
  theme: "可設定各種議題",
  audience: "國小、國中、高中、大學階段教師 - 自然、社會、公民教師",
  experience: [
    {
      label: "議題討論",
      desc: "踏入現代公民的思維世界，您將被指派支持或反對某個社會議題的立場。這不只是角色扮演，更是一次實質的議論，您將提出自己的主張，回應他人的質疑，並嘗試影響他人的立場。",
    },
    {
      label: "引導反思",
      desc: "深入融入思辨的過程，講師將提出挑戰性問題，引導成員思考議題的多重面向。這不僅是知識的碰撞，更是價值觀的對話，帶您探索議題的深度與廣度。",
    },
  ],
  outline: [
    {
      label: "營造合適的討論環境",
      desc: "學習創造一個開放、尊重且具建設性的討論環境，讓每位成員都敢言，共同參與。",
    },
    {
      label: "整理與確認語意",
      desc: "透過整理、確認語意，提升溝通清晰度，讓討論更有條理且順暢。",
    },
    {
      label: "透過提問引發思考",
      desc: "學習提問的藝術，引導成員深入思考，發現議題的更多層面。",
    },
    {
      label: "分享阿普蛙的帶領經驗",
      desc: "講師將分享阿普蛙在過往的帶領經驗，提供實際案例和應對策略，讓您更有信心引導豐富的討論。",
    },
  ],
};

const CTA_HREF =
  "https://docs.google.com/forms/d/e/1FAIpQLScTpdFbaeh221rvaEMgG_1vrh0RC_9rOEx1j8ActjGE4PiM7A/viewform";

// 原站分頁籤 pane：左欄（28.7%）圖片＋「桌遊介紹／教材介紹」按鈕＋星號附註；
// 右欄（71.3%）主題／適合對象 →「研習內容：」條列 →「研習大綱：」條列。
function Outline({ items }: { items: { label: string; desc: string }[] }) {
  return (
    <ul className="list-disc pl-6 text-[#2a3140]">
      {items.map((o) => (
        <li key={o.label}>
          <strong>{o.label}：</strong> {o.desc}
        </li>
      ))}
    </ul>
  );
}

function ItemPane({ item }: { item: Item }) {
  return (
    <TabPane
      media={
        <>
          <CourseImage src={item.image} alt={item.name} />
          {item.link && (
            <div className="mt-2">
              <WeeblyOutlineButton
                href={item.link.href}
                external={item.link.external}
              >
                {item.link.label}
              </WeeblyOutlineButton>
            </div>
          )}
          {item.note && (
            <p className="mt-3 text-left text-base leading-[30px] text-ink">
              {item.note}
            </p>
          )}
        </>
      }
    >
      <CourseFacts
        facts={[
          { label: "主題", value: item.theme },
          { label: item.audienceLabel ?? "適合對象", value: item.audience },
        ]}
      />
      <div className="mt-2 text-base leading-[30px] text-ink">
        <p>
          <strong className="text-[#0e121d]">研習內容：</strong>
        </p>
        <Outline items={item.experience} />
        <p className="mt-2">
          <strong className="text-[#0e121d]">研習大綱：</strong>
        </p>
        <Outline items={item.outline} />
      </div>
    </TabPane>
  );
}

export default function MaterialApplicationPage() {
  return (
    // ⚠️ 2026-08-26 重做版面。原站這頁只有 1 個 wsite-section（底色 #fcfcfc），內容依序是：
    // ①一列兩欄「62.8% 標題（33.6px 置中）／37.2% 邀約課程按鈕」②導言段落
    // ③五個分類，每個都是「24px 分類標題 ＋ 一組分頁籤」
    // ④第六個分類「議題思辨課（不用購買教材）」是一列兩欄「27.7% 按鈕／72.3% 內容」，沒有分頁籤。
    //
    // 另外更正 2026-08-25 的一個誤判：那輪在每個分類標題底下補了「該組教材的條列摘要」，
    // 說原站有這份摘要——其實那是**分頁籤上的籤名**被純文字擷取讀成一串清單。籤還原之後
    // 這份摘要就是重複，已移除。
    <section className="bg-[#fcfcfc] py-16">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-[63fr_37fr]">
          <h1 className="text-center text-[28px] font-bold text-ink md:text-[34px]">
            🎲 教材應用 - 議題桌遊（遊戲）應用於課堂
          </h1>
          <div className="text-center">
            <WeeblyOutlineButton href={CTA_HREF} external>
              邀約課程
            </WeeblyOutlineButton>
          </div>
        </div>

        <p className="mt-8 text-base leading-[30px] text-ink">
          以下有七款遊戲可以應用於課堂，主題包含了：人際關係與溝通（班級經營）、性別平等（情感教育、家庭教育）、媒體素養（資訊素養）、全球議題（淨零碳排、SDGs）等，每款遊戲的教師研習時間為
          2~3 小時。
        </p>

        <div className="mt-12 space-y-14">
          {groups.map((group) => (
            <div key={group.heading}>
              <h2 className="text-2xl font-bold text-ink">{group.heading}</h2>
              <div className="mt-6">
                <TabbedBox
                  tabs={group.items.map((item) => ({
                    label: `${item.kind ?? "桌遊"}${item.name}`,
                    content: <ItemPane item={item} />,
                  }))}
                />
              </div>
            </div>
          ))}

          <div>
            <h2 className="text-2xl font-bold text-ink">
              {debateCourse.heading}
            </h2>
            {/* 原站這一段沒有分頁籤，是一列兩欄：左邊 27.7% 一顆邀約課程按鈕、右邊 72.3% 內容 */}
            <div className="mt-6 grid gap-8 md:grid-cols-[28fr_72fr] md:items-start">
              <div className="text-center">
                <CourseImage
                  src={debateCourse.image}
                  alt={debateCourse.heading}
                />
                <div className="mt-2">
                  <WeeblyOutlineButton href={CTA_HREF} external>
                    邀約課程
                  </WeeblyOutlineButton>
                </div>
              </div>
              <div>
                <CourseFacts
                  facts={[
                    { label: "主題", value: debateCourse.theme },
                    { label: "適用對象", value: debateCourse.audience },
                  ]}
                />
                <div className="mt-2 text-base leading-[30px] text-ink">
                  <p>
                    <strong className="text-[#0e121d]">研習內容：</strong>
                  </p>
                  <Outline items={debateCourse.experience} />
                  <p className="mt-2">
                    <strong className="text-[#0e121d]">研習大綱：</strong>
                  </p>
                  <Outline items={debateCourse.outline} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
