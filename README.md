# my_notes — 個人課程筆記網站

把過去的上課講義與手寫筆記（PDF）整理成 Notion 風格的重點筆記網頁，方便日後複習。

- 首頁：每門課一張卡片，可搜尋筆記標題與標籤、依標籤篩選
- 課程頁：該課程的每份筆記一張卡片
- 筆記頁：重點摘要、知識點、提醒框、Pseudocode、數學公式、自我測驗、來源頁碼

## 技術
純 HTML + CSS + 原生 JavaScript，不需要安裝或 build。數學公式使用 KaTeX（CDN）。
直接用瀏覽器開啟 `index.html` 即可瀏覽；部署於 GitHub Pages。

## 結構
```
index.html            首頁
courses/<slug>/       課程頁與筆記頁
data/courses.js       課程與筆記的資料登錄檔
assets/css|js|icons   樣式、腳本、課程圖示
templates/            課程頁與筆記頁模板
CLAUDE.md             給 AI 的專案規則（新增內容的流程、格式、檢查清單）
```

原始 PDF 放在 `note/<課程名稱>/`，因版權因素不上傳（見 `.gitignore`）。

## 新增內容
依照 [CLAUDE.md](CLAUDE.md) 的流程：放入 PDF → AI 提出整理計畫 → 確認後產生筆記頁並更新 `data/courses.js`。
