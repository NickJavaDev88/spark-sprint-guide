# Spark 環境檢查表

這裡的指令都來自 Spark 官方文件，標示 **請確認** 的除外。「請確認」的意思是：作者預期你會在 repository 找到，但尚未驗證，請在你 clone 下來的 repository 裡自己檢查。

> 衝刺的「Spark」專案就是 [apache/spark](https://github.com/apache/spark)。本指南中的 `master` 指主要分支，與 Spark 貢獻指南用法一致。

## 1. 帳號

- ☐ GitHub 帳號，且 SSH 金鑰或 HTTPS token 可以正常使用。
- ☐ 已在 [selfserve.apache.org/jira-account.html](https://selfserve.apache.org/jira-account.html) 申請 Apache JIRA 帳號。

## 2. 工具

- ☐ `git`。
- ☐ Spark 支援版本的 JDK。**請確認**：到你要編譯的版本的 Spark 文件「Building Spark」頁面查看確切版本。
- ☐ Python 3 與 `venv`（或 `uv`）。**請確認**：在你 checkout 的 `python/` 目錄裡查看最低 Python 版本。

## 3. Fork 與 clone

```bash
# 在 GitHub 上 fork apache/spark 之後：
git clone git@github.com:你的帳號/spark.git
cd spark
git remote add upstream https://github.com/apache/spark.git
git fetch upstream
```

在你的 fork 的 **Actions** 分頁，啟用 **Build and test** 與 **Report test results**。Spark 貢獻指南要求在開 PR 之前先在自己的 fork 跑測試，因為主 repository 上每一次執行都會消耗有限的 CI 資源。

## 4. 先編譯 Spark

PySpark 的測試需要先編譯好 Spark 本身。依 PySpark 測試指南，以下任一方式都可以：

```bash
build/mvn -DskipTests clean package
```

```bash
build/sbt -Phive clean package
```

現在就開始，並讓它一直跑。這個步驟很慢，你可以在等待時念書。

## 5. Python 環境

```bash
python3 -m venv .venv
source .venv/bin/activate
```

安裝 Python 開發相依套件。**請確認**檔名：在 repository 裡找 `dev/requirements.txt`，或看 PySpark 文件的「Contributing to PySpark」頁面。

## 6. 執行測試

```bash
python/run-tests --python-executable=python3
```

只執行單一測試模組（快很多）：

```bash
python/run-tests --testnames pyspark.sql.tests.test_arrow
```

- 在 macOS 上，如果測試在 fork 時當掉，請設定 `OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES`。
- 要除錯某個測試，在測試程式碼裡加上 `breakpoint()`，再用 `python/run-tests` 執行；腳本會停在該處並開啟 `pdb` 互動除錯。
- 想試試 Spark Connect 用戶端：`bin/pyspark --remote "local[*]"`。

## 7. PR 流程

1. 找出或確認對應的 JIRA issue。不要重複建立。瑣碎的修改（例如修正錯字）不需要 JIRA。
2. 在你的 fork 建立一個 branch。
3. 進行修改。新增或更新測試，並讓測試自我說明。
4. 在 Python 測試裡，用註解寫上 JIRA ID：

   ```python
   def test_case(self):
       # SPARK-12345: a short description of the test
       ...
   ```

5. 遵循周圍程式碼的風格。Spark 的 Python 風格是 **PEP 8，但每行最多 100 個字元**。**請確認** lint 的入口（作者預期是 `dev/lint-python`）。
6. Push 到你的 fork，等那裡的 GitHub Actions 全部通過。
7. 對 `apache/spark` 的 `master` 開 PR。標題格式如下：

   ```text
   [SPARK-xxxx][COMPONENT] Title
   ```

   其中 `COMPONENT` 是 spark-prs.appspot.com 上列出的分類之一。請在描述中聲明這項貢獻是你的原創作品，並依專案的開源授權條款授權。
8. 如果被要求修改，就在同一個 branch 繼續 push commit。如果有衝突：先 `git fetch upstream`，再 `git rebase upstream/master`。

## 8. 當天檢查表（週日早上）

- ☐ JIRA 帳號已核准（若沒有，要有備案）。
- ☐ Spark 編譯已無錯誤完成。
- ☐ 能在你的終端機執行一個 PySpark 測試模組。
- ☐ 你的 fork 已與 `upstream/master` 同步。
- ☐ 筆電充電器、備用充電器或延長線，並已在終端機啟用 venv。
- ☐ 把這份指南存成離線版本（列印或另存頁面）：現場 Wi-Fi 可能很慢。
- ☐ 09:30 前抵達報到。

## 資料來源

- [Contributing to Spark](https://spark.apache.org/contributing.html)
- [Testing PySpark](https://spark.apache.org/docs/latest/api/python/development/testing.html)
