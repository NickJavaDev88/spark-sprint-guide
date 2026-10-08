# 給 Java 開發者的 Python

大部分概念你都已經會了。真正改變的是語法、一些預設行為，以及一條大原則：Python 在**程式執行時**才檢查型別，而不是在編譯時。

## Python 是弱型別嗎？

不完全是。這裡其實混在一起的是兩個不同的概念：

| 概念 | Java | Python | JavaScript |
|---|---|---|---|
| 何時檢查型別？ | 編譯時（靜態） | 執行時（動態） | 執行時（動態） |
| 允許隱式轉換嗎？ | 很少（強型別） | 幾乎沒有（強型別） | 很多（弱型別） |

所以 Python 是**動態且強型別**。變數不宣告型別，但值本身有型別，Python 不會默默把它們混在一起：

```python
x = 1
x = "現在變成字串"         # 允許：名稱可以重新指向任何型別
"1" + 1                   # TypeError：不能把 str 和 int 相加
```

JavaScript 會把 `"1" + 1` 變成 `"11"`，Python 則直接丟出錯誤。

型別標註（`def f(x: int) -> str`）**在執行時不會被強制檢查**。它們是給人看的文件，也是給 mypy 這類工具用的，由工具做靜態檢查。請見[型別、mypy 與 coverage](./typing-mypy-coverage)。

## 對照表

| Java | Python |
|---|---|
| `null` | `None`（用 `is None` 判斷） |
| `String`、`int`、`double`、`boolean` | `str`、`int`、`float`、`bool`（`True` / `False`） |
| `List<T>`、`Map<K,V>`、`Set<T>` | `list[T]`、`dict[K, V]`、`set[T]` |
| `a.equals(b)` | `a == b` |
| `a == b`（參考相等） | `a is b` |
| `this` | `self`（每個方法明確的第一個參數） |
| 建構子 | `__init__(self, ...)` |
| Getter/setter | `@property`，或直接用公開屬性 |
| `toString()` | `__repr__` / `__str__` |
| `interface` | `typing.Protocol` 或 `abc.ABC` |
| `@Override` | 不需要（新版本有 `typing.override`） |
| `static` 方法 | `@staticmethod` 或模組層級的函式 |
| `try (var x = ...)` | `with open(...) as f:` |
| Checked exception | 沒有。所有例外都是 unchecked |
| `for (int i = 0; i < n; i++)` | `for i in range(n):` |
| Stream `.map().filter().collect()` | Comprehension、generator |
| `public static void main` | `if __name__ == "__main__":` |
| `import java.util.List;` | `from collections import deque` / `import os` |
| 用大括號分隔區塊 | 縮排（4 個空格）就是語法 |

## Java 開發者常覺得意外的地方

### 縮排就是區塊

沒有大括號。縮排錯一行就是另一支程式，或是 `SyntaxError`。

### 真假值判斷

空的容器、`0`、`None` 與 `""` 都視為假：

```python
items = []
if not items:
    print("empty")
```

### 可變的預設參數

這是最有名的陷阱：

```python
def add(x, bucket=[]):      # 這個 list 在函式定義時只會建立「一次」
    bucket.append(x)
    return bucket

add(1)   # [1]
add(2)   # [1, 2]  (意外)
```

常見的解法：

```python
def add(x, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(x)
    return bucket
```

### Comprehension 取代大部分 stream

```python
squares = [n * n for n in range(10) if n % 2 == 0]
by_len = {w: len(w) for w in ["spark", "py"]}
```

### 一切皆物件，名稱只是參考

賦值從不複製。`b = a` 只是讓兩個名稱指向同一個 list。

### Slicing

```python
s = "pyspark"
s[0:2]    # "py"
s[-5:]    # "spark"
s[::-1]   # "krapsyp"
```

### 模組與套件

一個檔案就是一個模組。含有 `__init__.py` 的目錄就是一個套件。Spark 的 `pyspark.sql.tests.test_arrow` 指的是巢狀套件裡的模組 `test_arrow.py`。

## 你真的會遇到的 class

```python
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

    def norm(self) -> float:
        return (self.x ** 2 + self.y ** 2) ** 0.5
```

`@dataclass` 會幫你產生 `__init__`、`__repr__` 與 `__eq__`。

## 你的第一個 unittest

PySpark 的測試使用 `unittest`。到處都會看到這個結構：

```python
import unittest


def add(a: int, b: int) -> int:
    return a + b


class AddTest(unittest.TestCase):
    def setUp(self):
        self.base = 10

    def test_add(self):
        # SPARK-12345: example of the comment style Spark uses in tests
        self.assertEqual(add(self.base, 5), 15)

    def test_bad_type_at_runtime(self):
        with self.assertRaises(TypeError):
            add("1", 2)   # 不管有沒有型別標註，str + int 在執行時都會失敗


if __name__ == "__main__":
    unittest.main()
```

用 `python -m unittest` 或 `python 這個檔案.py` 執行。

## 自我檢查

當你不看資料也能回答下列問題，就可以離開這一頁了：

1. 為什麼 `"1" + 1` 在 Python 是錯誤，在 JavaScript 卻不是？
2. `x is None` 做到了什麼是 `x == None` 不一定做到的？
3. 為什麼可變預設參數的範例會印出 `[1, 2]`？
4. Python 中相當於 try-with-resources 的是什麼？
