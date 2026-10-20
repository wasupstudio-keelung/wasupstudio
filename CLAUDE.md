@AGENTS.md

# wasupstudio 重建站

技術棧、設計系統、部署流程見 [README.md](README.md)。搬遷案的背景／待辦／視覺規格在上一層的 `../00-plan/`（屬於另一個 private repo，不在這個 repo 裡）。

## 動程式碼之前

- **部署：`main` 的程式碼要上線，是在 `site/` 跑 `npx wrangler deploy`**（帳號 2026-10-14 起釘在 `wrangler.jsonc` 的 `account_id`，是客戶名下那個，接案方是 Super Administrator。⚠️ 不要把那一行拿掉：wrangler 在多帳號下不會問要哪一個，它安靜挑接案方的個人帳號，實測與驗法寫在該設定檔的註解裡）。正式站 `www.wasupstudio.com`，備援預覽 `wasupstudio.wasupstudio.workers.dev`。**2026-10-20 起 push 到 `main` 會自動部署**：客戶當天在 Cloudflare 接上了 Workers Builds，commit 進 `main` 之後 Cloudflare 會自己 build 並上線。所以**動手前先 `git fetch` 看 `HEAD..origin/main`**，客戶會直接在 GitHub 網頁上改字；**push 就等於上線，不要推半成品**。上面那行 `wrangler deploy` 留著當備援。build 失敗時線上維持舊版，但客戶看不到失敗，查法是 `gh api repos/wasupstudio-keelung/wasupstudio/commits/<sha>/check-runs`。（GitHub Pages 的 workflow 已於 2026-09-02 移除。）
- **圖片一律用 [app/_components/SiteImage.tsx](app/_components/SiteImage.tsx)，不要直接 `import Image from "next/image"`。** 目前 `basePath` 是空字串所以這層不做事，保留是為了將來若要部署到子路徑時只改一個常數。**CSS `background-image: url(...)` 這種非 `next/image` 的用法不能套 `SiteImage` 元件**，要改用同一個檔案 export 的 `withBasePath()` 包住路徑字串。
- **`app/globals.css` 的全域規則一定要包在 `@layer base` 裡。** 沒有 layer 的規則會贏過 Tailwind 的 utilities layer，靜默蓋掉元素上的 utility（`font-medium` 曾整個沒作用）。驗收要看 computed style，不要看到 class 就當作套上了。
- **刻意跟原站不同的地方，註解只寫「見 MIGRATION-PLAN 偏離清單第 N 條」，不要在註解裡複述原站長什麼樣**——註解會跟著後續改動被改寫成「原站就是這樣」，本案 9 個商品頁裡有 7 個就是這樣讓假前提傳了好幾輪稽核。
- 這個專案**沒有自動化測試**，改完用 `npm run build` ＋ `npm run lint` 驗收。視覺改動還要另外跟原站並排比對，build 過了不等於做對了。
