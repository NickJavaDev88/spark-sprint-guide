# 30 小時計畫

這份計畫假設你讀 Java 沒問題、從沒寫過 Python，而且從現在到報到之間大約有 64 小時。請依你自己的時間調整數字。

## 時間預算

| 項目 | 小時 |
|---|---|
| 從現在到報到的時間 | 約 64 |
| 睡眠（3 晚 × 8 小時） | −24 |
| 清醒時間 | 約 40 |
| 用餐與休息 | 約 −8 |
| **可用的學習時間** | **約 32** |
| **計畫** | **30**（區塊 28.5 + 緩衝 1.5） |

## 原則

1. **先處理 Spark。** 這裡的每一項都是因為衝刺會用到才選的。Spark 裡碰不到的 Python 可以先放著。
2. **動手打程式碼。** 光看不會學會。每個區塊結尾都要有你實際跑過的東西。
3. **先開始編譯，再開始念書。** PySpark 的測試需要先編譯好 Spark，而且要花一段時間。
4. **先學 unittest，再學 pytest。** PySpark 的測試是帶 `self` 的 class，屬於 `unittest` 風格，並透過 `python/run-tests` 執行。
5. **時間不夠時，依這個順序刪減：** 先刪裝飾器與 generator（區塊 2），再刪區塊 3 的選讀。環境、型別標註與 coverage 絕對不能刪。

## 區塊 0：帳號與編譯（0.5 小時，今晚，最先做）

- ☐ 申請 Apache JIRA 帳號（[表單](https://selfserve.apache.org/jira-account.html)）。
- ☐ 在 GitHub 上 fork `apache/spark`。
- ☐ 在你的 fork 開啟 **Actions** 分頁，啟用「Build and test」與「Report test results」兩個 workflow。
- ☐ Clone 你的 fork，並加上 `upstream`。
- ☐ 在終端機啟動 Maven 或 sbt 編譯並放著跑（指令見[環境檢查表](./setup)）。

**完成標準：** 編譯正在執行，且 JIRA 申請已送出。

## 區塊 1：Python 語法（7 小時）

| 時間 | 任務 |
|---|---|
| 1.5 小時 | [Learn X in Y Minutes: Python](https://learnxinyminutes.com/python/)，每段範例都在 REPL 自己打一遍 |
| 3.5 小時 | [PyLadies 工作坊講義](https://python-tutorial-workshop.github.io/#curriculum)的練習題。每題都自己寫，連簡單的也一樣 |
| 1 小時 | [W3Schools Python](https://www.w3schools.com/python/default.asp) 只用來補漏洞：slicing、dict、set、comprehension、f-string、例外處理、import |
| 1 小時 | 建立虛擬環境（`venv` 或 `uv`），並在終端機執行一支腳本 |

**完成標準：** 不查資料就能寫出一支 40 行的腳本，包含函式、dict、list comprehension 與 `try/except`。這個區塊請搭配閱讀[給 Java 開發者的 Python](./python-for-java)。

## 區塊 2：真實程式碼裡會遇到的 Python（6 小時）

| 時間 | 任務 |
|---|---|
| 3 小時 | Class、`__init__`、dunder 方法、`@dataclass`、`@property`、裝飾器、generator、`with`、`*args` 與 `**kwargs` |
| 2 小時 | `unittest.TestCase`：`setUp`、`assertEqual`、`assertRaises`、`subTest`、`mock.patch` |
| 0.5 小時 | `breakpoint()` 與 `pdb` 基本操作 |
| 0.5 小時 | 把你熟悉的一個小型 Java class（連同測試）改寫成 Python |

**完成標準：** 能讀懂 Spark repository 裡的一個測試檔，並說明每一行在做什麼。

## 區塊 3：型別標註與 mypy（5 小時）

| 時間 | 任務 |
|---|---|
| 2 小時 | 型別標註：`list[int]`、`dict[str, int]`、`X \| None`、`Callable`、`TypeVar`、`Protocol`、`TypedDict`、`Literal` |
| 2 小時 | 對區塊 2 改寫的程式碼執行 `mypy --strict`，修到沒有錯誤 |
| 1 小時 | 打開 Spark repository 的 `python/pyspark/sql/`，看函式是怎麼標註型別的 |

**完成標準：** 你自己的程式碼在 `mypy --strict` 下零錯誤，而且能說明為什麼型別標註不會阻止程式執行。細節見[型別、mypy 與 coverage](./typing-mypy-coverage)。

## 區塊 4：coverage.py（4 小時）

| 時間 | 任務 |
|---|---|
| 1.5 小時 | `coverage run -m unittest`、`coverage report -m`、`coverage html` 與 `--branch` |
| 1.5 小時 | 運作原理：coverage 掛進直譯器的追蹤機制，把執行過的行記錄到 `.coverage` 檔，再和「可能被執行的行」比對 |
| 1 小時 | `# pragma: no cover`，並把區塊 2 的改寫成果做到行與分支覆蓋率 100% |
| 0.5 小時 | 在 Spark repository 找找有沒有執行 coverage 的腳本（`python/run-tests-with-coverage`，請確認是否存在），讀一下它怎麼用 |

**完成標準：** 能在兩分鐘內說明 coverage 如何知道哪些行被執行過。

## 區塊 5：演練 Spark PR（6 小時）

| 時間 | 任務 |
|---|---|
| 1.5 小時 | `pip install pyspark`，建立本機 session，試幾個 DataFrame 操作 |
| 1 小時 | 編譯完成後，用 `python/run-tests --testnames` 執行一個 PySpark 測試檔 |
| 1 小時 | 閱讀「Contributing to PySpark」與 Spark 貢獻指南，瀏覽 JIRA 上標有 `starter` 的 issue |
| 2.5 小時 | 在用完即丟的 branch 上演練整個流程：一個小改動、一個測試、風格檢查、PR 標題格式，以及測試註解中的 JIRA ID |

**完成標準：** 能在你的終端機執行一個 PySpark 測試檔，並能背出 PR 標題的格式。

## 逐日安排

假設你從週四晚上開始，活動在週日：

| 時段 | 小時 | 區塊 |
|---|---|---|
| 週四晚上 | 約 5 | 0，再開始 1 |
| 週五 | 約 11 | 完成 1，接著 2 與 3 |
| 週六 | 約 11 | 4 與 5 |
| 週日早上 | 約 1.5 | 檢查[環境檢查表](./setup)、收拾行李、出發 |

## 衝刺之後

- **快速回應 review 意見。** Spark 的貢獻指南希望貢獻者保持回應；如果 PR 沒人理，建議先改善說明或內容，幾天後再通知可能的 reviewer，或把 PR 縮小。
- **保持這個習慣。** 依 Spark 自己的指南，幫忙 review 別人的 PR、在郵件列表回答問題，都算有效的貢獻。
- **Apache Airflow** 是自然的下一個、以 Python 為主的專案。它的貢獻文件有新手快速上手、靜態檢查與測試指南，以及供第一個 PR 提問用的 Slack 頻道 `#new-contributors`。它不在這次衝刺的專案中，而且程式碼屬於進階 Python，所以請把它當成後續目標，而不是這 30 小時的學習教材。
