# CLAUDE.md — my_notes 個人課程筆記網站

## 1. 專案目的
把過去的上課資料（手寫筆記 PDF、上課講義 PDF）整理成一份份重點清楚、方便複習的網頁筆記。
目標是「過了一段時間回來看，也能很快找到重點」。
網站部署在 GitHub Pages，任何頁面都必須能直接在瀏覽器瀏覽。
- Repo：https://github.com/hanjung-iam/my_notes
- 網站：https://hanjung-iam.github.io/my_notes/（啟用 GitHub Pages 後生效）

網站分三層：
1. **首頁** `index.html`：每門課程一張卡片，可搜尋與依標籤篩選。
2. **課程頁** `courses/<課程slug>/index.html`：該課程的每份筆記一張卡片。
3. **筆記頁** `courses/<課程slug>/<NN-筆記slug>.html`：一個單元／章節的完整重點整理。

## 2. 運作方式（AI 工作流程）
當使用者說「整理 note/資料結構」或「把 note/演算法/xxx.pdf 加進筆記」時：

1. **盤點**：讀取 `note/<課程資料夾>/` 中的 PDF，對照 `data/courses.js` 每份筆記的 `sources`，找出尚未整理的檔案。
2. **提出整理計畫，等使用者確認**：依「單元／章節」分組（同一單元的手寫筆記與講義合併成一份），列出：
   - 每份筆記的標題（AI 依內容訂定）、編號與檔名
   - 包含哪些 PDF、哪些頁碼
   - 預計使用的標籤
   **使用者確認前，不得建立或修改任何檔案。**
3. **新課程**：若課程尚未存在，建立 `courses/<slug>/index.html`（由 `templates/course.html` 複製），並在 `data/courses.js` 新增課程。
4. **撰寫筆記頁**：一律從 `templates/note.html` 複製，依第 7 節的結構撰寫。
5. **更新資料**：在 `data/courses.js` 新增或更新該筆記的資料。
6. **跑完第 9 節的檢查清單**，並向使用者回報：新增／修改了哪些檔案、有哪些「待確認」項目、是否缺少圖示。

## 3. 技術限制
- 只用 **純 HTML + CSS + 原生 JavaScript**。不用框架、不用 npm、不需要 build，檔案放上 GitHub Pages 即可運作。
- 唯一允許的外部資源：**KaTeX**（數學公式），從 jsdelivr 載入固定版本 `katex@0.16.11`。不得加入其他函式庫、CDN 或網路字型。
- 所有連結與資源路徑一律用**相對路徑**（網站會位於 `/my_notes/` 子路徑下，不可用 `/` 開頭的絕對路徑）。
- 首頁與課程頁的卡片、搜尋、標籤篩選，都由 `assets/js/main.js` 讀取 `data/courses.js` 產生。
- 資料檔用 `.js`（`window.NOTES_DATA = {...}`），不用 `.json` + fetch，這樣本機直接雙擊 HTML 也能看。
- **筆記內容直接寫在筆記頁的 HTML 中**，不由 JS 動態產生。
- 筆記頁的**目錄由 `main.js` 依 `<h2 id>`、`<h3 id>` 自動產生**，不要手寫目錄；課程圖示也由 `main.js` 依 `<body data-course>` 自動放入 `#note-icon`。
- 數學公式：行內用 `\( ... \)`，獨立一行用 `\[ ... \]`（不要用 `$`）。HTML 中的 `<`、`>`、`&` 要寫成 `&lt;`、`&gt;`、`&amp;`。
- 筆記頁的所有 `<script>` 都放在 `<head>` 並加上 `defer`（順序：KaTeX → auto-render → courses.js → main.js），否則公式不會渲染。
- 每個頁面的 `<body>` 都要有 `data-page`（home / course / note）與 `data-root`（到網站根目錄的相對路徑，課程頁與筆記頁為 `../../`）。
- 搜尋範圍：課程名稱、筆記標題、標籤、摘要。

## 4. 檔案結構與命名
```
my_notes/
├── CLAUDE.md
├── README.md
├── .gitignore                 # 必須包含 note/
├── index.html                 # 首頁
├── note/                      # 原始 PDF（使用者放置，唯讀，不上傳 GitHub）
│   └── 資料結構/
│       └── *.pdf
├── courses/
│   └── data-structures/
│       ├── index.html         # 課程頁
│       ├── 01-array-and-linked-list.html
│       └── 02-stack-and-queue.html
├── data/
│   └── courses.js             # 課程與筆記的唯一資料登錄檔
├── assets/
│   ├── icons/                 # 課程圖示（使用者提供）
│   ├── css/style.css          # 全站唯一樣式檔
│   └── js/main.js             # 全站唯一腳本
└── templates/
    ├── course.html            # 課程頁模板
    └── note.html              # 筆記頁模板
```

命名規則：
| 項目 | 規則 | 範例 |
|---|---|---|
| 課程顯示名稱 | 與 `note/` 底下的資料夾名稱**完全相同** | 資料結構 |
| 課程 slug | 英文小寫、用 `-` 連接，由 AI 依課程名稱翻譯 | `data-structures` |
| 筆記檔名 | `NN-英文slug.html`，NN 為兩位數的課程進度順序；講義有編號時直接用講義編號（Lecture 03 → `03`），合併多份講義時用最小的編號 | `03-solving-recurrences.html` |
| 筆記標題 | AI 依內容訂定，繁體中文，專有名詞保留英文 | 二元搜尋樹 (Binary Search Tree) |
| 課程圖示 | `assets/icons/<課程slug>.(png\|svg\|jpg)`，以英文 slug 命名 | `assets/icons/data-structures.png` |
| 標籤 | 繁體中文、簡短；新增前先沿用已有的標籤 | 排序、樹、圖論 |

- **AI 不得自行製作課程圖示**。找不到圖示檔時，卡片自動改用「課程名稱第一個字 + 代表色方塊」，並提醒使用者補上圖示。
- 建立新課程時，AI 必須告訴使用者該課程的 slug，以及圖示檔該怎麼命名。

`data/courses.js` 格式：
```js
window.NOTES_DATA = {
  courses: [
    {
      slug: "data-structures",
      name: "資料結構",                   // = note/ 資料夾名稱
      folder: "資料結構",
      icon: "assets/icons/data-structures.png",
      color: "blue",                      // 見第 6 節代表色
      description: "一句話描述",
      notes: [
        {
          file: "01-array-and-linked-list.html",
          title: "陣列與鏈結串列 (Array & Linked List)",
          unit: "Ch.2",
          summary: "卡片上顯示的一句話摘要",
          tags: ["線性結構"],
          sources: ["講義_ch2.pdf", "手寫_0915.pdf"],
          updated: "2026-11-16"
        }
      ]
    }
  ]
};
```

## 5. 資料來源規則（最重要）
- 筆記內容**只能來自 `note/` 中使用者提供的 PDF**。不得加入外部知識、網路資料、AI 自己想的例子或延伸說明。
- 允許的加工：重新排序、濃縮、改成條列、整理成比較表格、把手寫內容轉成文字、翻譯成繁體中文。所有資訊都必須在來源中找得到。
- 程式碼一律以**來源中的 Pseudocode** 呈現（可以整理排版、縮排），不可自行改寫成 C、Python 等程式語言，也不可自行補完。
- 每個知識點都要標註來源：`檔名 p.頁碼`。
- 手寫字看不清楚時：能辨識的部分照寫，看不清的部分用 `[?]` 標示，並加上「待確認」提醒框。**不可猜測。**
- 手寫筆記與講義內容衝突，或疑似有錯時：用「待確認」提醒框並列兩方的說法，**不自行判斷對錯，也不自行修正。**
- 自我測驗的題目與答案，都必須能在來源中找到依據，答案要附上來源頁碼。
- **不得修改、移動、重新命名或刪除 `note/` 中的任何檔案。**

## 6. 視覺風格（Notion 風）
整體原則：白底、大量留白、細線分隔、不用漸層和重陰影，資訊層次清楚。

- 文字 `#37352f`、次要文字 `#787774`、背景 `#ffffff`、淺灰底 `#f7f6f3`、邊框 `#e9e9e7`
- 字型：系統字型（`-apple-system, "Segoe UI", "Noto Sans TC", "Microsoft JhengHei", sans-serif`）；程式碼用等寬字型
- 課程代表色（只能從這裡選）：灰 `#787774`、棕 `#9f6b53`、橘 `#d9730d`、黃 `#cb912f`、綠 `#448361`、藍 `#337ea9`、紫 `#9065b0`、粉 `#c14c8a`、紅 `#d44c47`
- **課程卡片**：頂部一條代表色色帶，加上課程圖示、課程名稱、筆記數量、一句話描述；滑鼠移上去時只顯示淡淡的陰影
- **筆記卡片**：編號、標題、一句話摘要、標籤、更新日期
- **筆記頁**：主欄最大寬度約 760px；桌面版左側有固定的目錄（sticky），手機版目錄收合在頁面上方
- 提醒框（Callout），淺色底加左側 emoji：
  | 類型 | emoji | 顏色 | 用途 |
  |---|---|---|---|
  | 重點 | 💡 | 藍 | 必記的觀念 |
  | 易錯 | ❗ | 紅 | 常見錯誤、易混淆的地方 |
  | 例子 | 📝 | 綠 | 來源中的例題或範例 |
  | 待確認 | ⚠️ | 黃 | 看不清楚、衝突、疑似有錯 |
- 手機寬度（≥ 360px）不可出現水平捲動；程式碼區塊和表格可以在自己的框內水平捲動

## 7. 筆記頁固定結構（依此順序）
各區塊的 HTML 寫法（提醒框、Pseudocode、表格、來源標註、測驗）以 `templates/note.html` 為準；
完整範例可參考 `courses/algorithms/03-solving-recurrences.html`。

1. 麵包屑：首頁 / 課程名稱 / 筆記標題
2. 頁首：課程圖示、標題、資訊列（課程、單元、整理日期、來源檔案）、標籤
3. 重點摘要（TL;DR）：3–5 條，最重要的內容
4. 知識點：每個知識點一個 `<h2 id="...">` 段落，段落末尾標註來源；需要時使用提醒框、表格、Pseudocode 區塊、KaTeX 公式
5. 自我測驗：3–5 題，用 `<details>` 收合答案，答案附來源頁碼
6. 來源清單：列出本頁用到的所有 PDF 與頁碼範圍

## 8. 修改規則
- 樣式只寫在 `assets/css/style.css`；筆記頁不可使用 inline style 或 `<style>`。
- 互動功能只寫在 `assets/js/main.js`。
- 新頁面一律從 `templates/` 複製。要修改模板或共用結構時，先問使用者；確認後同步更新所有既有頁面。
- 修改既有筆記時只動被要求的部分，並更新 `courses.js` 中該筆記的 `updated` 日期。
- 未經使用者要求，不刪除筆記、不更改既有檔名（更改檔名會讓連結失效）。
- 不新增外部函式庫或工具。
- 只有在使用者要求時才 commit / push。
- 需求不清楚時先問，不要猜。

## 9. 完成檢查清單
內容
- [ ] 每個知識點都標註了來源檔名與頁碼
- [ ] 沒有來源以外的內容（包括例子、程式碼、測驗題）
- [ ] 程式碼皆為來源中的 Pseudocode，沒有自行轉寫成其他語言
- [ ] 看不清楚或內容衝突的地方都已用「待確認」提醒框標示
- [ ] 重點摘要、知識點、自我測驗的內容彼此一致

結構
- [ ] 檔名與 slug 符合第 4 節的規則
- [ ] `data/courses.js` 已更新（title、file、unit、summary、tags、sources、updated）
- [ ] 筆記頁依第 7 節的順序撰寫；每個 `<h2>`、`<h3>` 都有唯一的 `id`（目錄才會自動產生）
- [ ] 所有路徑都是相對路徑
- [ ] `note/` 沒有被修改；`.gitignore` 包含 `note/`

顯示
- [ ] 本機開啟 首頁 → 課程頁 → 筆記頁 → 麵包屑返回，全部連得通
- [ ] KaTeX 公式正常顯示
- [ ] 搜尋找得到新筆記；標籤篩選正常
- [ ] 手機寬度不破版
- [ ] 瀏覽器 console 沒有錯誤
- [ ] 已向使用者回報變更的檔案、待確認項目，以及缺少的圖示
