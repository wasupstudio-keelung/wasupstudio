import type { Metadata } from "next";
import {
  ProductGallery,
  type GalleryImage,
} from "@/app/_components/ProductGallery";
import { Container } from "@/app/_components/Container";

// 內容來源：Weebly 編輯器裡從未發布的草稿頁（2026-09-04 擷取，
// 見 source repo 的 01-content-raw/pages-draft-2026-09-04/words-collide/）。
// 草稿裡導覽名稱與預購表單用「異言不合」、頁面標題與 H2 用「一言不合」，
// 客戶 2026-09-04 裁示正確文字是「異言不合」，全頁統一。
export const metadata: Metadata = {
  // 客戶在 Weebly 填的 SEO 標題，「一言」依客戶裁示改成「異言」。
  title: "人際溝通Ｘ社會情緒學習 桌遊《異言不合｜我就說兩句》",
  // 草稿沒填 meta description，這裡是補缺口，內容從頁面內文整理。
  description:
    "以職場情境為核心的溝通練習桌遊。玩家輪流扮演衝突或尷尬處境中的當事人，其他人組成智囊團提出應對方式並票選最合適的回應。中英對照，適合人際溝通、社會情緒學習（SEL）、非暴力溝通（NVC）與班級經營教學使用。",
};

const intro = [
  "這是一款以職場情境為核心的溝通練習桌遊。",
  "你是否也遇過這樣的時刻：明明只是想提醒對方，卻讓氣氛瞬間尷尬？只是想表達自己的想法，卻被誤會成指責？一句「我就說兩句」，有時反而讓衝突越說越大。",
  "在遊戲中，玩家將輪流扮演身處衝突或尷尬處境中的當事人，其他玩家則組成「智囊團」，提出不同的應對方式，並共同票選出最合適的回應。",
  "透過一個個貼近生活的對話場景，玩家可以在輕鬆的氛圍中，練習理解他人的處境，覺察自己的溝通習慣，並找到更適合的表達方式。",
];

const features = [
  "中英對照，適合雙語教學與多元場域使用",
  "以真實生活情境設計，貼近常見人際衝突",
  "透過角色扮演、回應票選，練習多角度思考",
  "帶領者友善設計，提供帶領簡報與學習單下載",
  "可搭配校園、家庭、愛情、友情等主題擴充使用",
];

const info = [
  ["適合人數", "3-6 人（組）"],
  ["適合年齡", "10 歲以上"],
  ["遊戲時間", "30-45 分鐘（一堂課內能夠操作完畢）"],
  ["售價", "全套組 1880 元（消費滿 2000 免運）"],
];

// 正式開賣後，預購表單換成與其他桌遊共用的購買表單。
const purchaseForm =
  "https://docs.google.com/forms/d/e/1FAIpQLSeNjwzit1cjicwRAKBiZfYBmvYPlf8z7C4FX6mtrHeE4nO0TQ/viewform";

const courseForm =
  "https://docs.google.com/forms/d/e/1FAIpQLScTpdFbaeh221rvaEMgG_1vrh0RC_9rOEx1j8ActjGE4PiM7A/viewform";

const galleryImages: GalleryImage[] = [
  { src: "/images/products/words-collide/gallery-1.jpg", alt: "異言不合｜我就說兩句 桌遊主盒與兩款擴充包" },
  { src: "/images/products/words-collide/gallery-2.jpg", alt: "異言不合｜我就說兩句 桌遊產品照 2" },
  { src: "/images/products/words-collide/gallery-3.jpg", alt: "異言不合｜我就說兩句 桌遊產品照 3" },
  { src: "/images/products/words-collide/gallery-4.jpg", alt: "異言不合｜我就說兩句 桌遊產品照 4" },
  { src: "/images/products/words-collide/gallery-5.jpg", alt: "異言不合｜我就說兩句 桌遊產品照 5" },
  { src: "/images/products/words-collide/gallery-6.jpg", alt: "異言不合｜我就說兩句 桌遊產品照 6" },
];

export default function WordsCollidePage() {
  return (
    <Container className="py-16">
      {/* 草稿跟其他商品頁一樣是「文字左、相簿右」的兩欄，DOM 順序照抄。 */}
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-brand-green">人際溝通Ｘ社會情緒學習</p>
          <h1 className="mt-2 text-3xl font-bold text-ink">《異言不合｜我就說兩句》</h1>
          {/* 草稿這段是 #248d6c 綠字、前後各三個星號，照抄。 */}
          <p className="mt-4 text-[#248d6c]">
            ***本遊戲適合教師、講師、企業培訓者與團體帶領者，作為人際溝通、社會情緒學習（SEL）、非暴力溝通（NVC）、班級經營、職場溝通與關係教育教材使用，說明書有另外說明課堂操作模式。***
          </p>
          <div className="mt-4 space-y-1 text-ink/70">
            {intro.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <h2 className="mt-8 text-lg font-bold text-ink">【遊戲特色】</h2>
          <ul className="mt-2 space-y-1 text-ink/70">
            {features.map((f, i) => (
              <li key={f}>
                {i + 1}.{f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={purchaseForm}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand-green px-6 py-3 font-semibold text-white transition hover:bg-brand-green-bright"
            >
              購買連結
            </a>
            <a
              href={courseForm}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-ink px-6 py-3 font-semibold text-ink"
            >
              課程邀約
            </a>
          </div>
        </div>

        <div>
          <ProductGallery images={galleryImages} />

          <h2 className="mt-8 text-lg font-bold text-ink">【遊戲資訊】</h2>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-ink/70">
            {info.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="font-semibold text-ink">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Container>
  );
}
