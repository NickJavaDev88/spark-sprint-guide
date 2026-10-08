# 活動資訊

> 已於 2026-10-08 對照活動官方 HackMD 確認。該頁面的社群預覽中繼資料仍顯示舊日期，但內文給出的是下方日期。出發前請再看一次官方頁面。

## 重點一覽

| | |
|---|---|
| 活動 | PyCon Taiwan 2026 衝刺開發 Sprints |
| 日期 | 2026 年 10 月 11 日（日）10:00–17:00（GMT+8） |
| 地點 | 新加坡商鈦坦台北辦公室（Titansoft，台北） |
| 報到 | 09:30 |
| 形式 | 選一個專案、小組合作，最後發表成果 |

## 流程

| 時間 | 時長 | 活動 |
|---|---|---|
| 09:30–10:00 | 30 分鐘 | 報到 |
| 10:00–10:15 | 15 分鐘 | 活動開場與贊助商介紹 |
| 10:15–10:45 | 30 分鐘 | 專案介紹 |
| 10:45–10:50 | 5 分鐘 | 專案分組 |
| 10:50–12:30 | 100 分鐘 | 上午衝刺開發 |
| 12:30–13:30 | 60 分鐘 | 午餐時間 |
| 13:30–16:30 | 180 分鐘 | 下午衝刺開發 |
| 16:30–17:00 | 30 分鐘 | 成果發表 |

真正能衝刺的時間大約只有 **280 分鐘**。時間不多，所以「帶著能運作的環境抵達」比「懂很多 Python」更重要。

## 專案：「Your first PR to Apache Spark」

- **負責人：** Tian Gao（高天）。聯絡方式請見官方 HackMD。
- **Repository：** [apache/spark](https://github.com/apache/spark)
- **現場語言：** 中文。
- **目標（意譯）：** 給大型開源專案的第一個 PR 通常很難，因為不知道從哪裡下手，送出 PR 後也可能沒人看。這次衝刺會示範成熟專案裡有哪些事可以做、怎樣讓 PR 更容易被 review 與 merge，並給每位參加者明確的方向。負責人相信大部分人都能在這次衝刺完成一個 PR。

### 他們希望你具備什麼

| 程度 | 項目 |
|---|---|
| 必須 | Python、git、GitHub |
| 最好 | coveragepy |
| 不需要 | Spark 或 PySpark 的知識（對專案有基本了解會更容易上手） |

### 活動前要做的事

- 申請 **Apache JIRA 帳號**：[selfserve.apache.org/jira-account.html](https://selfserve.apache.org/jira-account.html)。核准可能需要時間，請先做這件事。
- Fork `apache/spark`，在你的 fork 啟用 GitHub Actions，並開始編譯 Spark。請見[環境檢查表](./setup)。
- 不要把準備時間花在挑 issue 上。負責人表示當天會給你明確的方向。

## 其他專案

| 專案 | 需求 | 語言 |
|---|---|---|
| Python Reflex：Agentic App Store | 「Vibe Coding」寫 Python（選配：Python Reflex、Databricks） | 以中文為主 |
| solvcon（幾何計算平台） | git、Python、numpy、C++、pybind11 任一 | 中文與英文 |
| PyLiteracy | Python、語言學、git | 中文 |
| swportal（sciwork 網站） | 對前端開發有興趣 | 中文 |
| Python 官方文件繁體中文翻譯 | Git、Python | 中文 |
| 利用 AI 快速開發賽事精華系統與馬賽克遮罩 | git、OpenCV、FFmpeg | 中文 |

> **2026 年的專案清單中沒有 Apache Airflow。** 如果 Airflow 是你的長期目標，請見[計畫](./plan)最後的「衝刺之後」。

### 備案

如果當天發現 Spark 不適合你，門檻最低的替代方案是 **Python 官方文件繁體中文翻譯**專案（只需要 git 與 Python，不用大型編譯）。solvcon 則依各個 track 列出具體、有標籤的 issue，如果你也看得懂 C++，會很好上手。

## 資料來源

- 官方 HackMD：[PyCon Taiwan 2026 衝刺開發 Sprints](https://hackmd.io/@pycontw/r1At0RiPfx)
- 報名頁面：[pycontw.kktix.cc/events/2026-sprints](https://pycontw.kktix.cc/events/2026-sprints)
