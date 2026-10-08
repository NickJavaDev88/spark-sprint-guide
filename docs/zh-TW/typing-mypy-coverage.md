# 型別、mypy 與 coverage

在一支關於這次衝刺的影片中，專案負責人點名了兩個值得了解的函式庫：**coveragepy** 與 **mypy**，並提到 coverage 的基本原理。官方 HackMD 則把 coveragepy 列為「最好了解」。這一頁涵蓋這兩個工具，以及閱讀有型別標註的程式碼所需的詞彙。

## 1. 型別標註

型別標註是選用的註記，執行時不會有任何作用。Python 不會因為標註而拒絕 `add("a", "b")`。

```python
def greet(name: str, times: int = 1) -> str:
    return ("Hello, " + name + "! ") * times

ages: dict[str, int] = {"ana": 31}
maybe: int | None = None
```

| 你寫的 | 意思 |
|---|---|
| `list[int]`、`dict[str, int]`、`tuple[int, str]` | 內建泛型（Python 3.9 以上） |
| `X \| None` | 可選值（3.10 以上）。舊程式碼寫成 `Optional[X]` |
| `X \| Y` | 聯集型別。舊程式碼寫成 `Union[X, Y]` |
| `Callable[[int], str]` | 接收 `int`、回傳 `str` 的函式 |
| `TypeVar("T")` | 泛型型別變數，類似 Java 的 `<T>` |
| `Protocol` | 結構型別：「只要有這些方法就行」，像是不需要 `implements` 的介面 |
| `TypedDict` | 鍵為字串、值型別已知的 dict |
| `Literal["a", "b"]` | 只能是這些確切的值 |
| `Any` | 這個值不做型別檢查 |

## 2. mypy

mypy 會讀取你的型別標註，並在**不執行**程式的情況下回報不一致之處。

```bash
pip install mypy
mypy your_file.py
mypy --strict your_package/
```

試試這段程式並閱讀錯誤訊息：

```python
def greet(name: str) -> str:
    return "Hello, " + name

greet(42)
```

mypy 會回報 `arg-type` 錯誤：第 1 個引數的型別是 `int`，與預期的 `str` 不相容。

再試一個，用來練習 `None` 的處理：

```python
def first(xs: list[int]) -> int | None:
    return xs[0] if xs else None

total = first([1, 2]) + 1   # mypy 會抱怨：這個值可能是 None
```

解法是在使用前先縮小型別範圍：

```python
value = first([1, 2])
if value is not None:
    total = value + 1
```

**練習：** 拿你在區塊 2 從 Java 改寫的 class，把所有地方都加上型別標註，然後執行 `mypy --strict` 直到沒有錯誤。

## 3. coverage.py

Coverage 衡量的是：測試執行時，你的程式碼裡**哪些行被執行過**。

```bash
pip install coverage
coverage run -m unittest          # 在 coverage 底下執行測試
coverage report -m                # 表格，含「Missing」欄位列出沒執行到的行
coverage html                     # 可瀏覽的報告，位於 htmlcov/index.html
```

加上分支（每個 `if` 的兩邊都有執行到嗎？）：

```bash
coverage run --branch -m unittest
coverage report -m
```

使用 `--branch` 之後，報告會多出分支相關欄位。你也可以在 `pyproject.toml` 設定：

```toml
[tool.coverage.run]
branch = true
```

排除你刻意不測試的行：

```python
def debug_dump():  # pragma: no cover
    ...
```

### Coverage 如何運作（基本原理）

1. **掛進直譯器。** Coverage 請 Python 在程式碼執行時通知它。經典的機制是追蹤掛鉤 `sys.settrace`，coverage 用一個快速的 C 追蹤器實作它。較新的 Python 版本還提供負擔更低的 `sys.monitoring` API，新版 coverage 可以使用。
2. **記錄被執行的行。** 每次有一行被執行，coverage 就記下檔案與行號。結束時把結果寫入名為 `.coverage` 的資料檔。
3. **算出哪些行「可能」被執行。** Coverage 會解析原始碼，找出哪些行是可執行的陳述式（註解與空白行不算）。
4. **比對。** 可執行的行扣掉已執行的行，就是「missing」的行。`Cover` 是可執行行中實際被執行的百分比。

兩個值得知道的結論：

- Coverage 只告訴你某一行**有被執行**，不代表它**正確**。沒有任何 assert 的測試，照樣可以拿到 100%。
- 分支覆蓋率比行覆蓋率更嚴格：`if x: y()` 在 `x` 為真時，行覆蓋率就已經全滿，但「假」的分支仍然沒有被證明。

### 五分鐘小實驗

```python
# shape.py
def label(n: int) -> str:
    if n < 0:
        return "negative"
    return "non-negative"
```

```python
# test_shape.py
import unittest
from shape import label

class LabelTest(unittest.TestCase):
    def test_non_negative(self):
        self.assertEqual(label(3), "non-negative")
```

執行 `coverage run --branch -m unittest`，再執行 `coverage report -m`。`return "negative"` 那一行會顯示為 missing。再為 `label(-1)` 加一個測試，看它升到 100%。

## 4. 這與衝刺的關係

PySpark 的測試是 `unittest` 風格，所以 `coverage run -m unittest` 就是你衡量自己修改過的模組時的思考模型。Spark repository 也可能附有用 coverage 包裝測試的執行腳本（**請確認**：找找 `python/run-tests-with-coverage`）。能證明你新增的測試涵蓋了你改動的那幾行，會讓 PR 更容易被 review。

## 自我檢查

1. 型別標註會改變 Python 執行程式時的行為嗎？
2. 哪個工具檢查型別標註？它需要執行你的程式碼才能檢查嗎？
3. 寫出 coverage 產生的資料檔名稱，以及產生可讀報告的指令。
4. 為什麼行覆蓋率 100% 仍然可能漏掉 bug？
