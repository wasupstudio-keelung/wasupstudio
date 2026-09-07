import type { Metadata } from "next";
import {
  ProductGallery,
  type GalleryImage,
} from "@/app/_components/ProductGallery";
import { YouTubeEmbed } from "@/app/_components/YouTubeEmbed";
import { Container } from "@/app/_components/Container";
import { SiteImage, withBasePath } from "@/app/_components/SiteImage";
import { studioContact } from "@/app/_lib/site-data";

export const metadata: Metadata = {
  title: "抓誑新聞 Crazy News",
  description:
    "全球第一款媒體識讀桌遊。合作對抗類遊戲，收錄30則台灣時事新聞，結合108課綱跨領域學習，培養媒體識讀能力。",
};

// 原站三行標語的符號並不一致（第二行是實心 ▼、其餘是空心 ▽），照原樣保留。
const highlights = [
  ["▽", "結合108課綱跨領域學習，培養媒體識讀能力"],
  ["▼", "合作對抗類遊戲"],
  ["▽", "收錄30則台灣時事新聞"],
];

const features = [
  [
    "角色扮演",
    "玩家可擔任媒體或是閱聽人，體驗媒體生態中不同角色的立場與能力。",
  ],
  [
    "即時對戰",
    "玩家們需使用僅有的手牌，安排本回合的戰術。在一回合的短兵相接中，與媒體怪物們分出高下！",
  ],
  [
    "團隊合作",
    "新聞又長又多、聽不懂怎麼辦？與隊友相互合作，將可提升擊倒問題新聞的成功率！",
  ],
  [
    "媒體識讀",
    "玩家將學會分辨「置入」、「誤導」、「標籤」還有「刺激」的錯誤的報導方式，並培養主動參與的公民意識！",
  ],
];

const info = [
  ["遊戲人數", "3-7人"],
  ["遊戲時間", "30-50 分鐘"],
  ["遊戲年齡", "10＋"],
  ["遊戲設計", "Wa'sup 阿普蛙工作室有限公司"],
  ["共同出版", "台灣少年權益與福利促進聯盟"],
];

// 原站相簿只有 6 張實物照（分頁籤就是 1~6）。重建時多塞了一張「二刷修訂說明」當第 1 張，
// 而那張在原站是放在右欄按鈕旁邊、不在相簿裡，2026-09-02 已移到正確位置（見下方按鈕那一列），
// 所以這裡把它拿掉，否則同一張圖會在同一頁出現兩次。
const galleryImages: GalleryImage[] = [
  {
    src: "/images/products/crazy-news/gallery-1.png",
    alt: "抓誑新聞桌遊實物照 1",
  },
  {
    src: "/images/products/crazy-news/gallery-2.jpg",
    alt: "抓誑新聞桌遊實物照 2",
  },
  {
    src: "/images/products/crazy-news/gallery-3.jpg",
    alt: "抓誑新聞桌遊實物照 3",
  },
  {
    src: "/images/products/crazy-news/gallery-4.jpg",
    alt: "抓誑新聞桌遊實物照 4",
  },
  {
    src: "/images/products/crazy-news/gallery-5.png",
    alt: "抓誑新聞桌遊實物照 5",
  },
  {
    src: "/images/products/crazy-news/gallery-6.png",
    alt: "抓誑新聞桌遊實物照 6",
  },
];

// 原站 4 支影片分屬 3 個位置：前 2 支沒有標題（1 支在開場區、1 支在「遊戲特色」旁），
// 後 2 支各自有「完整教學影片」「短教學及試玩影片」標題。
const videoSections: { heading: string; ids: string[] }[] = [
  { heading: "遊戲介紹影片", ids: ["Hq73q3RjOMU", "fGWV-wUCpHQ"] },
  { heading: "完整教學影片", ids: ["kk9nf5SMw5A"] },
  { heading: "短教學及試玩影片", ids: ["ByQtfzyXpX0"] },
];

export default function CrazyNewsPage() {
  return (
    <>
      {/* 2026-08-25 全站逐頁核對 section 背景才發現：這頁跟其他 7 款商品頁不一樣，原站有自己專屬的
          兩段式開場——先是一張 430px 底圖（不是 <img>，掛在 .wsite-body-section 的 CSS
          background-image，同一種擷取盲區）疊白/淺灰文字的引言，再接一段近深灰 #323D3F 底的
          標語+書名區塊，不是重建站原本套用的通用商品頁純白單欄排版。 */}
      <section
        className="relative flex min-h-[430px] items-center bg-[#1a1a1a] bg-cover bg-center py-16"
        style={{
          backgroundImage: `url(${withBasePath("/images/banners/crazy-news-hero.jpg")})`,
        }}
      >
        <Container className="max-w-3xl">
          <p className="text-lg leading-relaxed text-white sm:text-xl">
            從前從前，求知若渴的人類為了得到更多的資訊，創造了「媒體」。
            <br />
            由媒體當他們的眼、當他們的嘴，甚至是……當他們的腦。
            <br />
            後來，人類越來越依賴媒體而失去自主性、忘記該如何思考，
            <br />
            而漸漸「誑化」的媒體成了指引方向的主人，使用者則成了盲目跟隨的奴隸……
          </p>
        </Container>
      </section>

      <section className="bg-[#323D3F] py-16">
        {/* ⚠️ 2026-08-25 更正：上一輪只把「標語＋書名」那一小塊做成 #323D3F，之後全是白底——
            但原站這頁**整個 body 只有 2 個 wsite-section**：一張 430px 底圖 hero，加一個
            #323D3F 深灰區塊，而那個深灰區塊**一路包到頁尾**（遊戲理念／遊戲特色／遊戲資訊／
            兩個影片區全在裡面，原始碼裡還留著 color:rgb(255,255,255) 的 span）。
            也就是這頁 hero 以下整片都是深底白字，不是重建站原本的深灰一小條＋白底一大片。
            已把這個 Container 併進同一個 section，並把區塊內的文字/邊框色全部改成淺色。 */}
        {/* 2026-08-26：原站這一段是**一列兩欄**（欄寬 45.3% / 54.7%，讀原站 <td> style 取得）——
            左欄＝標語＋書名＋介紹＋亮點＋售價，右欄＝相簿＋購買/邀約/播報網頁按鈕。
            重建站原本把兩者上下疊成 max-w-3xl 置中單欄，相簿還縮成 max-w-md，跟原站不是同一種版面。
            見 MIGRATION-PLAN.md Phase 2「圖文左右順序」。
            2026-09-01：原站左欄夾的兩張圖（二刷印章、遊戲資訊圖示）與右欄的二刷說明圖已補齊，
            位置與原站的巢狀兩欄結構一致，尺寸照原站 getBoundingClientRect 實測值。 */}
        <Container>
          <div className="grid gap-12 md:grid-cols-[45fr_55fr]">
            <div>
              <p className="text-sm font-semibold text-[#d5d5d5]">
                全球第一款媒體識讀桌遊
              </p>
              {/* 原站標題與二刷印章是一列兩欄（73.5% / 26.5%，讀原站 <td> style 取得），
                  印章原尺寸 54x83、原站沒有縮放。 */}
              <div className="mt-2 grid grid-cols-[73.5fr_26.5fr] items-center gap-4">
                <h1 className="text-3xl font-bold text-white">
                  抓誑新聞 Crazy News
                </h1>
                <SiteImage
                  src="/images/board-games/crazy-news-2nd-print-seal.png"
                  alt="二刷"
                  width={54}
                  height={83}
                  className="h-auto w-[54px] justify-self-center"
                />
              </div>
              <p className="mt-4 text-[#d5d5d5]">
                遊戲中，你將成為「識讀者」同盟的一員，聆聽報導並破除藏匿其中的四大毒物！在媒體徹底誑化之前，號召你的夥伴升級各種特殊技、打擊怪獸，一起讓誑化的媒體恢復正常！
              </p>
              <ul className="mt-4 space-y-1 text-[#d5d5d5]">
                {highlights.map(([marker, text]) => (
                  <li key={text}>
                    {marker} {text}
                  </li>
                ))}
              </ul>
              {/* 原站是一列兩欄（42.2% / 57.8%）：左邊遊戲資訊圖示、右邊售價兩行。
                  圖示是深色透明 PNG 疊在 #323D3F 上，對比很低，2026-09-01 開原站實測確認
                  原站就長這樣，不是重建站畫錯，不要自己調亮。
                  ⚠️ 圖示上的數字（30~60min／3-6人／12+）跟本頁下方「遊戲資訊」的文字
                  （30-50分鐘／3-7人／10＋）對不起來，這是原站自己的矛盾。
                  2026-09-07 客戶回覆問題清單時**沒有裁示哪一組才對**，改為指示這款移到「已完售」，
                  所以兩邊維持原站原樣，不要再列為待辦（見 MIGRATION-PLAN 偏離清單第 18 條）。 */}
              <div className="mt-4 grid grid-cols-[42.2fr_57.8fr] items-center gap-4">
                <SiteImage
                  src="/images/board-games/crazy-news-game-info-icons.png"
                  alt="遊戲時間 30~60 分鐘、遊戲人數 3-6 人、建議年齡 12 歲以上"
                  width={181}
                  height={55}
                  className="h-auto w-[181px] max-w-full"
                />
                <p className="text-[#d5d5d5]">本品已完售</p>
              </div>
            </div>

            <div>
              <ProductGallery images={galleryImages} />

              {/* 原站這裡也是一列兩欄（50% / 50%）：左邊兩顆按鈕、右邊二刷說明圖。
                  說明圖原始檔 1076x349，原站縮到 278x90 顯示。 */}
              <div className="mt-8 grid items-center gap-6 sm:grid-cols-2">
                <div className="flex flex-wrap gap-3">
<span className="rounded-full border border-white/25 bg-white/[0.06] px-6 py-3 font-semibold text-white/55">
                    已完售
                  </span>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScTpdFbaeh221rvaEMgG_1vrh0RC_9rOEx1j8ActjGE4PiM7A/viewform"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white px-6 py-3 font-semibold text-white"
                  >
                    邀約課程
                  </a>
                </div>
                <SiteImage
                  src="/images/board-games/crazy-news-2nd-print-notes.png"
                  alt="二刷調整：①使媒體玩家更容易召喚怪獸卡 ②使閱聽人玩家更容易使用成長卡 ③增添時事新聞文本 ④微幅介面修改"
                  width={1076}
                  height={349}
                  className="h-auto w-[278px] max-w-full"
                />
              </div>

              {/* 見 MIGRATION-PLAN 偏離清單第 12 條。 */}
              <div className="mt-6 rounded-xl border border-white/25 bg-white/[0.04] px-5 py-4 text-sm leading-relaxed text-white/70">
                <p>
                  ＊「抓誑新聞媒體播報網頁」線上服務已停止，原網址{" "}
                  <span className="whitespace-nowrap">crazynews.wasupstudio.com</span>{" "}
                  不再運作。
                </p>
                <p className="mt-2">
                  播報音檔已改為提供購買者從雲端下載。需要下載連結，請來信{" "}
                  <a
                    href={`mailto:${studioContact.email}`}
                    className="underline underline-offset-2 hover:text-white"
                  >
                    {studioContact.email}
                  </a>
                  。
                </p>
              </div>
            </div>
          </div>
        </Container>

        <Container className="py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mt-12 text-lg font-bold text-white">遊戲理念</h2>
            <p className="mt-2 text-[#d5d5d5]">
              打開電視，聳動、即時的新聞畫面總是牽動著我們的眼球，而我們的每一次轉台，也都展現了我們的喜好，也形塑著媒體的報導風格。我們發現，缺乏求證、監督精神的閱聽人，與追逐流量、利潤而罔顧第四權責任的媒體，形成一種「共惡關係」。當媒體環境越來越壞時，我們沒有人能成為真正的贏家。
            </p>
            <p className="mt-4 text-[#d5d5d5]">
              我們在遊戲中藏入許多社會現況的比喻，像是誑化媒體的四種毒物、滋生的社會亂象怪獸、識讀者的特殊技能……留待玩家去細細體會。《抓誑新聞》雖然只分為媒體與識讀者兩大陣營，但其實媒體、閱聽人、社會三者不是競爭對立，而是相互影響的。因此，我們希望培養閱聽人的自主性與識讀能力，並透過檢舉及申訴行動督促媒體自律，形成一個更健全的媒體生態。
            </p>

            <h2 className="mt-12 text-lg font-bold text-white">遊戲特色</h2>
            <ul className="mt-2 space-y-2 text-[#d5d5d5]">
              {features.map(([label, desc]) => (
                <li key={label}>
                  <span className="font-semibold text-white">{label}：</span>
                  {desc}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-lg font-bold text-white">遊戲資訊</h2>
            <dl className="mt-2 grid grid-cols-2 gap-y-1 text-sm text-[#d5d5d5]">
              {info.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="font-semibold text-white">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            {/* 原站「遊戲資訊」下方還有一顆共同出版單位的連結按鈕，以及重複一次的購買／邀約按鈕 */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="http://www.newscatcher.org.tw"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white px-6 py-3 font-semibold text-white"
              >
                兒少新聞妙捕手
              </a>
              <span className="rounded-full border border-white/25 bg-white/[0.06] px-6 py-3 font-semibold text-white/55">
                已完售
              </span>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScTpdFbaeh221rvaEMgG_1vrh0RC_9rOEx1j8ActjGE4PiM7A/viewform"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white px-6 py-3 font-semibold text-white"
              >
                邀約課程
              </a>
            </div>

            {videoSections.map((section) => (
              <div key={section.heading}>
                <h2 className="mt-12 text-lg font-bold text-white">
                  {section.heading}
                </h2>
                <div
                  className={`mt-4 grid gap-4 ${section.ids.length > 1 ? "sm:grid-cols-2" : ""}`}
                >
                  {section.ids.map((id, i) => (
                    <YouTubeEmbed
                      key={id}
                      id={id}
                      title={`抓誑新聞 Crazy News｜${section.heading} ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
