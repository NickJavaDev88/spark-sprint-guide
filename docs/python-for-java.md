# Python for Java developers

You already know most of the ideas. What changes is the syntax, a few defaults, and one big rule: Python checks types **when code runs**, not when it compiles.

## Is Python weakly typed?

Not exactly. Two separate ideas get mixed up:

| Idea | Java | Python | JavaScript |
|---|---|---|---|
| When are types checked? | Compile time (static) | Run time (dynamic) | Run time (dynamic) |
| Are implicit conversions allowed? | Few (strong) | Almost none (strong) | Many (weak) |

So Python is **dynamically and strongly typed**. Variables carry no declared type, but values do, and Python will not silently mix them:

```python
x = 1
x = "now a string"        # allowed: names can be rebound to any type
"1" + 1                   # TypeError: you cannot add str and int
```

JavaScript would turn `"1" + 1` into `"11"`. Python raises an error.

Type hints (`def f(x: int) -> str`) are **not enforced at run time**. They are documentation for people and for tools such as mypy, which checks them statically. See [Typing, mypy and coverage](./typing-mypy-coverage).

## Cheat sheet

| Java | Python |
|---|---|
| `null` | `None` (test with `is None`) |
| `String`, `int`, `double`, `boolean` | `str`, `int`, `float`, `bool` (`True` / `False`) |
| `List<T>`, `Map<K,V>`, `Set<T>` | `list[T]`, `dict[K, V]`, `set[T]` |
| `a.equals(b)` | `a == b` |
| `a == b` (reference identity) | `a is b` |
| `this` | `self` (explicit first parameter of every method) |
| Constructor | `__init__(self, ...)` |
| Getter/setter | `@property` or just a public attribute |
| `toString()` | `__repr__` / `__str__` |
| `interface` | `typing.Protocol` or `abc.ABC` |
| `@Override` | nothing needed (`typing.override` exists in newer versions) |
| `static` method | `@staticmethod` or a module-level function |
| `try (var x = ...)` | `with open(...) as f:` |
| Checked exceptions | None. All exceptions are unchecked |
| `for (int i = 0; i < n; i++)` | `for i in range(n):` |
| Streams `.map().filter().collect()` | Comprehensions, generators |
| `public static void main` | `if __name__ == "__main__":` |
| `import java.util.List;` | `from collections import deque` / `import os` |
| Braces for blocks | Indentation (4 spaces) is the syntax |

## Things that surprise Java developers

### Indentation is the block

There are no braces. A wrongly indented line is a different program, or a `SyntaxError`.

### Truthiness

Empty containers, `0`, `None` and `""` are falsy:

```python
items = []
if not items:
    print("empty")
```

### Mutable default arguments

This is the most famous trap:

```python
def add(x, bucket=[]):      # the list is created ONCE, at definition time
    bucket.append(x)
    return bucket

add(1)   # [1]
add(2)   # [1, 2]  (surprise)
```

The usual fix:

```python
def add(x, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(x)
    return bucket
```

### Comprehensions replace most streams

```python
squares = [n * n for n in range(10) if n % 2 == 0]
by_len = {w: len(w) for w in ["spark", "py"]}
```

### Everything is an object, and names are references

Assignment never copies. `b = a` makes two names for the same list.

### Slicing

```python
s = "pyspark"
s[0:2]    # "py"
s[-5:]    # "spark"
s[::-1]   # "krapsyp"
```

### Modules and packages

A file is a module. A directory with `__init__.py` is a package. Spark's `pyspark.sql.tests.test_arrow` is the module `test_arrow.py` inside nested packages.

## Classes you will actually meet

```python
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

    def norm(self) -> float:
        return (self.x ** 2 + self.y ** 2) ** 0.5
```

`@dataclass` generates `__init__`, `__repr__` and `__eq__` for you.

## Your first unittest

PySpark tests use `unittest`. This is the shape you will see everywhere:

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
            add("1", 2)   # str + int fails at run time, hints or not


if __name__ == "__main__":
    unittest.main()
```

Run it with `python -m unittest` or `python this_file.py`.

## Self-check

You are ready to leave this page when you can answer without looking:

1. Why is `"1" + 1` an error in Python but not in JavaScript?
2. What does `x is None` do that `x == None` might not?
3. Why does the mutable-default example print `[1, 2]`?
4. What is the Python equivalent of try-with-resources?
