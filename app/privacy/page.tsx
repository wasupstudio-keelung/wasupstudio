import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/app/_components/Container";
import { studioContact } from "@/app/_lib/site-data";

// 見 MIGRATION-PLAN 偏離清單第 14 條。
//
// ⚠️ 這頁的內容只寫「從程式碼與 DNS 查得到、確定為真」的事，加上客戶自己講的營運事實。
// **不要憑印象補任何對外承諾**，補了就是替客戶發明承諾；每次改內容都要一併更新 LAST_UPDATED。
//
// 第四節（保存多久、誰看得到）是 2026-09-07 依客戶書面回覆補的：
// 保存期限客戶原話「我們目前是都留在表單裡，可以看政策需要我們怎麼配合」，
// 所以措辭寫成「除非來信要求刪除，否則持續保存」——這是照他們實際作業寫的，
// **刻意不寫「保存 N 年後自動刪除」**，那會變成一個沒有人會執行的承諾。
// 存取範圍客戶原話「只有我們阿普蛙看的到」。
export const metadata: Metadata = {
  title: "隱私權政策",
  description:
    "阿普蛙工作室官網的隱私權政策：我們會蒐集哪些資料、資料如何使用、經手資料的第三方服務，以及您可以如何行使個人資料的相關權利。",
};

const LAST_UPDATED = "2026 年 9 月 7 日";

// 這一頁列出的第三方，是實際會在瀏覽本站時被連到的服務。
// 新增／移除任何嵌入內容或分析工具時，這張表要一起改。
const thirdParties = [
  {
    name: "Google 表單（Google LLC）",
    what: "您在「填寫聯絡表單」、「購買桌遊／教材」、「邀約課程」等按鈕填寫的內容",
    note: "表單由阿普蛙工作室以自己的 Google 帳號建立與收件",
  },
  {
    name: "YouTube（Google LLC）",
    what: "商品頁與課程頁嵌入的介紹影片，播放時會與 YouTube 伺服器連線",
    note: "本站使用 youtube-nocookie.com 網域嵌入，未播放前不會寫入個人化廣告 cookie",
  },
  {
    name: "Cloudflare, Inc.",
    what: "本網站的主機與內容傳遞網路，伺服器日誌會記錄來源 IP、瀏覽器版本、瀏覽的網址與時間",
    note: "用於維持網站運作與資安防護",
  },
];

export default function PrivacyPage() {
  // 流量統計那一段跟 Analytics.tsx 綁同一個環境變數：沒設 NEXT_PUBLIC_GA_ID 就兩邊都不出現，
  // 政策不會宣告一個實際上沒在跑的東西。**要移除 GA 的話這頁會自動跟著變，不用手動改文案。**
  const gaEnabled = Boolean(process.env.NEXT_PUBLIC_GA_ID);

  return (
    <>
      <section className="bg-brand-green py-16 text-white">
        <Container>
          <h1 className="font-heading text-4xl font-bold">隱私權政策</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            這份政策說明 {studioContact.name}
            （以下稱「本工作室」）在經營本網站 www.wasupstudio.com 時，會蒐集哪些個人資料、怎麼使用，以及您可以怎麼處理自己的資料。
          </p>
          <p className="mt-2 font-heading text-sm text-white/60">
            最後更新：{LAST_UPDATED}
          </p>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="mx-auto max-w-2xl space-y-10 text-ink/80">
            <div>
              <h2 className="font-heading text-xl font-bold text-ink">
                一、適用範圍
              </h2>
              <p className="mt-3 leading-relaxed">
                本政策適用於本網站 www.wasupstudio.com 及其所有子頁面。本網站沒有會員系統，也不在站內處理線上付款。
                您從本站點擊出去的外部網站（例如 Facebook 粉絲專頁、部落格、合作單位網站），適用該網站自己的隱私權政策，不在本政策範圍內。
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink">
                二、我們會蒐集哪些資料
              </h2>
              <p className="mt-3 leading-relaxed">
                <span className="font-semibold text-ink">您主動提供的資料。</span>{" "}
                只有在您自己填寫並送出表單時才會產生。本站所有表單都是 Google 表單，點擊按鈕後會在新分頁開啟。
                目前的聯絡表單會請您填寫姓名、所在縣市、年齡、性別、聯絡電話、電子信箱、社會身份、服務單位與您的需求。
                購買與課程邀約表單會另外請您填寫該筆委託所需的資訊。
              </p>
              <p className="mt-3 leading-relaxed">
                <span className="font-semibold text-ink">系統自動記錄的資料。</span>{" "}
                您瀏覽本站時，主機服務商的伺服器日誌會記錄來源 IP 位址、瀏覽器與作業系統版本、瀏覽的網址與時間。
                這類紀錄用於維持網站運作與資安防護，不會用來辨識個別瀏覽者的身分。
              </p>
              {gaEnabled ? (
                <p className="mt-3 leading-relaxed">
                  <span className="font-semibold text-ink">流量統計。</span>{" "}
                  本站使用 Google Analytics（GA4）統計整體流量，它會在您的瀏覽器寫入 cookie，用來辨識同一位訪客的多次造訪。
                  統計結果是彙整過的數字，本工作室不會透過它取得您的姓名或聯絡方式。
                  您可以安裝{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-green underline"
                  >
                    Google Analytics 退出瀏覽器外掛程式
                  </a>{" "}
                  停止這項蒐集。
                </p>
              ) : null}
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink">
                三、資料的使用方式
              </h2>
              <p className="mt-3 leading-relaxed">
                您透過表單提供的資料，用於回覆您的詢問、安排課程或合作、處理商品訂單，以及在您勾選同意接收活動通知時寄送最新消息。
                本工作室不會將您的個人資料出售、出租或提供給與上述目的無關的第三方。
                如果法律或有權機關依法要求提供，本工作室會依法配合。
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink">
                四、資料保存多久、誰看得到
              </h2>
              <p className="mt-3 leading-relaxed">
                表單填寫的內容保存在本工作室 Google 帳號底下的表單回覆中，除非您來信要求刪除，
                否則會持續保存，以便日後聯繫與查詢往來紀錄。
                您隨時可以依第八節的方式來信要求刪除，我們會在確認身分後移除該筆資料。
              </p>
              <p className="mt-3 leading-relaxed">
                這些回覆只有阿普蛙工作室內部人員看得到。本工作室不會將表單內容提供給合作講師、
                合作單位或其他外部對象；第三方服務業者依其角色接觸到資料的情形，列在下一節。
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink">
                五、會經手資料的第三方服務
              </h2>
              <p className="mt-3 leading-relaxed">
                為了讓網站與表單運作，以下服務會接觸到相關資料：
              </p>
              <ul className="mt-4 space-y-4">
                {thirdParties.map((s) => (
                  <li
                    key={s.name}
                    className="rounded-xl border border-black/10 px-5 py-4"
                  >
                    <p className="font-semibold text-ink">{s.name}</p>
                    <p className="mt-1 text-sm leading-relaxed">{s.what}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink/60">
                      {s.note}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 leading-relaxed">
                本站的中英文字型都存放在本站自己的主機上，瀏覽時不會另外向字型服務商發出請求。
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink">
                六、Cookie
              </h2>
              <p className="mt-3 leading-relaxed">
                本網站本身不會為了記住您而寫入 cookie。您在頁面上播放嵌入的 YouTube 影片時，YouTube 會寫入影片播放所需的資料。
                {gaEnabled
                  ? " 流量統計的 cookie 見上方第二節。"
                  : ""}{" "}
                您可以在瀏覽器設定中封鎖或刪除 cookie，這不會影響本站文字與圖片的瀏覽。
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink">
                七、行銷訊息
              </h2>
              <p className="mt-3 leading-relaxed">
                只有在您填寫聯絡表單並勾選希望收到活動通知時，本工作室才會寄送活動與課程消息。
                想停止接收，請來信告知，本工作室會將您從名單中移除。
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink">
                八、您對自己資料的權利
              </h2>
              <p className="mt-3 leading-relaxed">
                依照中華民國《個人資料保護法》第 3 條，您可以就本工作室持有的您的個人資料，行使下列權利：
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 leading-relaxed">
                <li>查詢或請求閱覽</li>
                <li>請求製給複製本</li>
                <li>請求補充或更正</li>
                <li>請求停止蒐集、處理或利用</li>
                <li>請求刪除</li>
              </ul>
              <p className="mt-3 leading-relaxed">
                請來信{" "}
                <a
                  href={`mailto:${studioContact.email}`}
                  className="text-brand-green underline"
                >
                  {studioContact.email}
                </a>
                ，說明您要行使的項目，本工作室會與您確認身分後處理。
                您也可以選擇不提供個人資料，這不影響您瀏覽本網站，但本工作室將無法回覆詢問或安排課程與訂單。
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink">
                九、政策的修訂
              </h2>
              <p className="mt-3 leading-relaxed">
                本工作室調整網站功能或使用的服務時，會一併更新這份政策，並修改頁面上方的最後更新日期。
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink">
                十、聯絡我們
              </h2>
              <div className="mt-3 space-y-1 leading-relaxed">
                <p>{studioContact.name}</p>
                <p>統一編號：{studioContact.taxId}</p>
                <p>地址：{studioContact.address}</p>
                <p>
                  E-mail：
                  <a
                    href={`mailto:${studioContact.email}`}
                    className="text-brand-green underline"
                  >
                    {studioContact.email}
                  </a>
                </p>
              </div>
            </div>

            <p className="border-t border-black/10 pt-6 text-sm text-ink/50">
              回到
              <Link href="/" className="text-brand-green underline">
                首頁
              </Link>
              。
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
