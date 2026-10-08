---
layout: home
hero:
  name: Spark Sprint Guide
  text: 從 Java 到你的第一個 Apache Spark PR
  tagline: 給會 Java、但沒寫過 Python 的開發者，一份約 30 小時的學習計畫，圍繞 PyCon Taiwan 2026 衝刺開發中的「Your first PR to Apache Spark」專案設計。
  actions:
    - theme: brand
      text: 從計畫開始
      link: /zh-TW/plan
    - theme: alt
      text: 活動資訊
      link: /zh-TW/event
features:
  - title: 範圍務實
    details: 專案負責人要求 Python、git 與 GitHub，最好再了解 coveragepy。不需要會 Spark 或 PySpark，這份計畫就針對這個範圍。
  - title: 先處理 Spark
    details: 先準備環境並開始編譯 Spark，因為 PySpark 的測試需要先編譯好 Spark。編譯的同時你可以念書。
  - title: Java 到 Python 的橋樑
    details: 一張對照表，把你已經會的概念（型別、null、介面、try-with-resources）對應到道地的 Python，另外涵蓋型別標註、mypy 與 coverage.py。
  - title: 三語並行
    details: 繁體中文（台灣）、英文與西班牙文，每一頁結構相同。
---

## 如何使用這份指南

1. 先讀一次[活動資訊](./event)（5 分鐘），了解活動期待什麼、不期待什麼。
2. 今晚先做[30 小時計畫](./plan)的**區塊 0**：申請帳號、fork，並讓 Spark 在背景開始編譯。
3. 依序完成各區塊。每個區塊結尾都有「完成標準」，讓你知道何時該往下走。
4. 活動前一天早上，用[Spark 環境檢查表](./setup)確認一切正常再出門。
5. 把[資源連結](./resources)放在手邊。

> **非官方。** 這是社群整理的學習指南，與 PyCon TW、Apache Software Foundation 及 Apache Spark 專案無隸屬關係。日期、需求與指令已於 **2026-10-08** 對照官方頁面確認；請在出發前再次檢查官方來源是否有臨時異動。標示「請確認」的項目尚未驗證，請以你 clone 下來的 repository 為準。
