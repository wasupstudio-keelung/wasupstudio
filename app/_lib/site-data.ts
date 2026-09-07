// 全站共用的結構資料（導覽選單、商品清單、課程清單）。
// 個別頁面的實際內文直接寫在各自的 page.tsx 裡（內容即程式碼，方便之後直接用 Claude Code 改文字），
// 這份檔案只放「會在多處重複用到」的清單資料，避免到處複製貼上。

export type BoardGame = {
  slug: string;
  title: string;
  tagline: string;
  // 單一售價（數字）。⚠️ 不要在這裡寫貨幣符號或「元」，格式一律由
  // boardGamePriceText() 產生，避免 7 個項目各寫各的（原站一路寫「售價960元」，
  // 沒有 NT$、數字與「元」之間也沒有空格）。
  price?: number;
  // 售價沒辦法用單一數字表達時（例如核心盒與擴充是兩段價）用這格覆寫卡片文字，
  // 優先於 price。⚠️ 這格是直接顯示的字串，要自己帶「元」。
  priceLabel?: string;
  // price 與 priceLabel 都沒有值＝客戶頁面上沒寫售價，總覽卡片顯示「預購中」。
  image: string | null; // 少數幾款原站就沒有專屬產品照，null 代表照實維持沒有圖
  href: string;
};

// 總覽卡片上的售價文字。原站「買桌遊」總覽頁寫的是「情緒謎語雙語版（售價960元）」，
// 所以這裡不寫貨幣符號、數字與「元」之間也不空格。
// ⚠️ 2026-09-07 之前這裡是寫死在 board-games/page.tsx 的 `NT$ ${price}`，那是原站沒有的
// 貨幣符號（原站 83 頁一個 NT$ 都沒有），已改掉。要改格式改這裡一處就好。
export function boardGamePriceText(game: BoardGame): string {
  if (game.priceLabel) return game.priceLabel;
  if (game.price === undefined) return "預購中";
  return `${game.price}元`;
}

export const boardGames: BoardGame[] = [
  {
    // 2026-09-04 從 Weebly 未發布的草稿頁補進來，客戶在 Weebly 導覽裡把它排在第一個。
    // 草稿沒寫售價、只有一顆「預購連結」按鈕。見 MIGRATION-PLAN 偏離清單第 17 條。
    slug: "words-collide",
    title: "異言不合｜我就說兩句",
    tagline: "人際溝通 × 社會情緒學習",
    image: "/images/products/words-collide.jpg",
    href: "/board-games/words-collide",
  },
  {
    slug: "riddle-me-feelings",
    title: "情緒謎語（雙語版）",
    tagline: "人際溝通 × 社會情緒學習 × 表演藝術",
    price: 960,
    image: "/images/products/riddle-me-feelings.png",
    href: "/board-games/riddle-me-feelings",
  },
  {
    slug: "talk-nonsense-sdgs",
    title: "瞎掰王SDGs教育版",
    tagline: "冷知識 × 瞎掰胡扯 × SDGs 17項永續發展目標",
    price: 690,
    image: "/images/products/talk-nonsense-sdgs.png",
    href: "/board-games/talk-nonsense-sdgs",
  },
  {
    slug: "practice-for-love",
    title: "練愛猜心",
    tagline: "性別平等 × 人際溝通",
    price: 690,
    image: "/images/products/practice-for-love.png",
    href: "/board-games/practice-for-love",
  },
  {
    slug: "future-parliament",
    title: "未來議會",
    tagline: "兒童人權 × 兒少生活議題 × 表達意見",
    price: 990,
    image: "/images/products/future-parliament.png",
    href: "/board-games/future-parliament",
  },
  {
    slug: "play-a-lifetime",
    title: "玩一世人",
    tagline: "佛法 × 人生觀",
    price: 860,
    image: "/images/products/play-a-lifetime.jpg",
    href: "/board-games/play-a-lifetime",
  },
  {
    slug: "sharp-ten",
    title: "十分機靈",
    tagline: "10 選 1 的緊湊問答遊戲",
    price: 590,
    image: "/images/products/sharp-ten.png",
    href: "/board-games/sharp-ten",
  },
];

// 原站「買桌遊」總覽頁最下方還有一個「＊已完售」區塊，列出 3 款已下架的舊作品。
// 2026-08-26 更正：原本這裡註解寫「原站也沒有連結到個別頁面」，逐字核對原始 HTML 後發現不對——
// 原站《大政治家：選戰風雲》那一格的圖片和標題**都是連結**，指向
// /2282325919278352347836984251363908038642.html（那頁是沒掛在導覽列的孤兒頁，已補建成
// /board-games/great-politician）。另外兩格（議想世界、家分題）在原站這個區塊確實沒有連結。
//
// ⚠️《家分題》其實也有一頁（原站 /234782099838988.html，已補建成 /board-games/family-topics），
// 只是原站是從 3 個課程頁的內文連過去、這個「已完售」區塊沒有連。這裡照原站保持不連；
// 如果之後決定要讓總覽頁也連得到，只要幫這筆補上 href: "/board-games/family-topics" 即可。
export type SoldOutGame = {
  // slug 只給「有站內商品頁」的款式。課程頁的 boardGameLink() 會先查 boardGames、
  // 查不到再查這裡，這樣商品從販售中搬到完售時，課程頁的「桌遊介紹」按鈕不會靜默消失。
  slug?: string;
  title: string;
  tagline: string;
  image: string;
  href?: string; // 原站這個區塊只有《大政治家》是連結，其餘兩款沒有
};

export const soldOutBoardGames: SoldOutGame[] = [
  {
    slug: "great-politician",
    title: "大政治家：選戰風雲",
    tagline: "民主政治 × 台灣立委選舉",
    image: "/images/board-games/sold-out-da-zhengzhijia.jpg",
    href: "/board-games/great-politician",
  },
  {
    title: "議想世界",
    tagline: "議題討論 × 正義觀",
    image: "/images/board-games/sold-out-yixiang-shijie.jpg",
  },
  {
    title: "家分題",
    tagline: "性別平等 × 家務分工",
    image: "/images/board-games/sold-out-jia-fenti.jpg",
  },
  // 以下兩款是 2026-09-07 客戶回覆問題清單時指示搬過來的（原本在「販售中」）。
  // 客戶原話：「近期剛完售，可以把買桌遊底下的抓誑新聞整個移除掉，另外是從販售中把它移到已完售」，
  // 並附了一張把該卡片圈起來、箭頭指向「＊已完售」區塊的截圖。拚陣頭「比照辦理」。
  // 沿用各自原本的商品照與商品頁連結（商品頁本身保留，只是不再標價、不再賣）。
  {
    slug: "crazy-news",
    title: "抓誑新聞",
    tagline: "全球第一款媒體識讀桌遊",
    image: "/images/products/crazy-news.jpg",
    href: "/board-games/crazy-news",
  },
  {
    slug: "pin-zhentou",
    title: "拚陣頭",
    tagline: "認識台灣傳統藝陣文化的派對遊戲",
    image: "/images/products/pin-zhentou.png",
    href: "/board-games/pin-zhentou",
  },
];

export type CourseLink = {
  title: string;
  href: string;
  children?: CourseLink[];
};

export const courseNav: CourseLink[] = [
  {
    title: "教師研習",
    href: "/courses/teacher-workshop",
    children: [
      { title: "教材應用", href: "/courses/teacher-workshop/material-application" },
      { title: "教案/教材設計", href: "/courses/teacher-workshop/lesson-design" },
    ],
  },
  {
    title: "入班授課｜青少年培力課程",
    href: "/courses/in-class",
    children: [
      { title: "在遊戲中學議題", href: "/courses/in-class/learn-through-play" },
      { title: "議題探究與實作", href: "/courses/in-class/inquiry-practice" },
      { title: "提升溝通力", href: "/courses/in-class/communication" },
      { title: "民主從開會開始", href: "/courses/in-class/democracy-in-meetings" },
    ],
  },
  { title: "教育訓練", href: "/courses/corporate-training" },
  { title: "家庭教育課程", href: "/courses/family-education" },
];

// 「專欄」是 2026-09-02 新增的第 7 個項目，見 MIGRATION-PLAN 偏離清單第 15 條。
export const mainNav = [
  { title: "首頁", href: "/" },
  { title: "想設計", href: "/design-consulting" },
  { title: "買桌遊", href: "/board-games" },
  { title: "買數位教材", href: "/digital-materials" },
  { title: "找課程", href: "/courses" },
  { title: "專欄", href: "/columns" },
  { title: "關於我們", href: "/about" },
];

export const studioContact = {
  name: "阿普蛙工作室有限公司",
  taxId: "24883973",
  address: "200 基隆市仁愛區忠三路 34 號",
  email: "wasupstudio@gmail.com",
  partnership: { name: "林侃眉", phone: "0933-769550" },
  courses: { name: "杜冠賢", phone: "0917-629597" },
  facebook: "https://facebook.com/Wasupstudio",
  blog: "http://wasupthink.blogspot.tw/",
  // 客戶自己在營運的聯絡表單（Google 表單，標題「阿普蛙聯絡資料填寫-20170314」）。
  // 原站多個頁面的「邀約課程」按鈕連的就是這一份，表單裡的「您的需求」有
  // 課程邀約／產品設計／找蛙聊聊／單純留資料四個選項，涵蓋頁尾聯絡表單的用途。
  // 見 MIGRATION-PLAN 偏離清單第 13 條。
  contactForm:
    "https://docs.google.com/forms/d/e/1FAIpQLScTpdFbaeh221rvaEMgG_1vrh0RC_9rOEx1j8ActjGE4PiM7A/viewform",
};
