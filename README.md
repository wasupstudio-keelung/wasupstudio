# 阿普蛙工作室官網（wasupstudio.com 重建版）

客戶「阿普蛙工作室」的官網從 Weebly 搬遷過來的重建版，Next.js 16（App Router）+ TypeScript + Tailwind v4。背景與完整規劃見 `../00-plan/MIGRATION-PLAN.md`（這是整個搬遷案的主文件，不只是這個 repo）。

## 本機開發

```bash
npm install
npm run dev
```

開 [http://localhost:3000](http://localhost:3000)。

```bash
npm run build   # 靜態匯出（output: "export"），輸出到 out/
npm run lint    # ESLint，這個專案沒有自動化測試，驗收靠 build+lint+肉眼視覺檢查
```

## 技術棧與關鍵設定

- **內容即程式碼**：不接 CMS，客戶內容/文案直接寫在各 `app/**/page.tsx` 裡，未來要改文字/擴功能就是直接改這些檔案（用 Claude Code）。共用結構資料（導覽選單、商品清單、課程清單）在 `app/_lib/site-data.ts`。
- **靜態匯出**（`output: "export"`，見 `next.config.ts`）：沒有需要伺服器運算的頁面，整站是純 HTML/CSS/JS。**聯絡表單不是站內表單**，頁尾那顆按鈕連到客戶自己在營運的 Google 表單「阿普蛙聯絡資料填寫」（網址在 `app/_lib/site-data.ts` 的 `studioContact.contactForm`），所以不需要寄信後端。
- **圖片一律從 `app/_components/SiteImage.tsx` 引入，不要直接 `import Image from "next/image"`**：靜態匯出 + `images.unoptimized: true` 的組合下，`public/` 資料夾的圖片不會自動套用 `basePath`（Next.js 官方文件裡的已知行為），`SiteImage` 補上這一層，全站的圖片元件都要走這裡，不然在子路徑部署下圖片會讀不到。**（2026-09-02 起 `basePath` 是空字串，所以這一層目前不做事；規則照舊要遵守，保留它是為了將來若要部署到子路徑時只改一個常數，不用把全站改回 `next/image`。）****CSS `background-image: url(...)` 這種非 `next/image` 的用法**（例如 [PageBanner.tsx](app/_components/PageBanner.tsx) 的 banner 底圖）**不能用 `SiteImage` 元件，要改用同一個檔案 export 出來的 `withBasePath()` 函式**包住路徑字串，邏輯跟 `SiteImage` 一致，只是給非 `<img>` 的場景用。
- **設計系統**：品牌綠 `#007854`（`bg-brand-green`/`text-brand-green`）、亮綠 `#00ab84`（`-bright`，hover 用）、內文色 `#2a2a2a`（`text-ink`），字型見 `app/fonts/`（自架 Birdseye + Google Fonts Montserrat），容器寬度用 `<Container>` 元件（`app/_components/Container.tsx`），不要各頁自己重寫 max-width。

## 部署

**正式站 2026-09-02 已上線：<https://www.wasupstudio.com>**，跑在**客戶名下** Cloudflare 帳號的 Workers 靜態資產上。

```bash
npx wrangler deploy
```

- ⚠️ **push 到 GitHub 不會部署。** 部署是上面這一行手動跑的，設定在 `wrangler.jsonc`。
- ⚠️ **`wrangler.jsonc` 的 `account_id` 不要拿掉**（2026-10-14 補的）。wrangler 在一個 token
  看得到多個帳號時不會停下來問，它安靜挑第一個，於是部署會落在錯的帳號、而且回報成功。
  實測與驗法寫在那個設定檔的註解裡。
- 備援預覽網址：<https://wasupstudio.wasupstudio.workers.dev>（內容與正式站相同）。
  `wrangler.jsonc` 裡的 `workers_dev: true` 要留著，wrangler 一旦看到 `routes` 就會預設關掉它。
- 舊網址的 301 對照在 `public/_redirects`（涵蓋原站 sitemap 全部 82 個 URL）。
  **那個檔是產生出來的**，來源是 source repo 的 `00-plan/301-redirects.tsv`，改完要跑 `00-plan/gen-redirects.py`。

**帳號歸屬**：兩個 repo 與 Cloudflare 帳號都已在客戶名下（GitHub org `wasupstudio-keelung`，Cloudflare `Wasupstudio@gmail.com's Account`），接案方是 org Owner／Cloudflare Super Administrator。網域註冊商 2026-09-08 已從 Register.com 轉到 Cloudflare Registrar（客戶帳號下，到期日 2029-02-15），經過見 `../00-plan/HANDOVER-RUNBOOK.md`。

~~GitHub Pages~~：2026-09-02 移除，workflow 與 `next.config.ts` 的 `GITHUB_PAGES`／`basePath` 分支都已刪掉。
