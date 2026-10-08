# Typing, mypy and coverage

In a video about the sprint, the project lead names two libraries worth knowing, **coveragepy** and **mypy**, together with the basic principle of coverage. The official HackMD lists coveragepy as a plus. This page covers both tools, plus the typing vocabulary you need to read annotated code.

## 1. Type hints

Hints are optional annotations. They do nothing at run time. Python itself never rejects `add("a", "b")` because of a hint.

```python
def greet(name: str, times: int = 1) -> str:
    return ("Hello, " + name + "! ") * times

ages: dict[str, int] = {"ana": 31}
maybe: int | None = None
```

| You write | Meaning |
|---|---|
| `list[int]`, `dict[str, int]`, `tuple[int, str]` | Built-in generics (Python 3.9 and later) |
| `X \| None` | Optional value (3.10 and later). Older code writes `Optional[X]` |
| `X \| Y` | Union. Older code writes `Union[X, Y]` |
| `Callable[[int], str]` | A function taking an `int` and returning `str` |
| `TypeVar("T")` | A generic type variable, like Java's `<T>` |
| `Protocol` | Structural typing: "anything with these methods", like an interface without `implements` |
| `TypedDict` | A dict with known string keys and value types |
| `Literal["a", "b"]` | Only these exact values |
| `Any` | Opt out of checking for this value |

## 2. mypy

mypy reads your hints and reports mismatches **without running** the program.

```bash
pip install mypy
mypy your_file.py
mypy --strict your_package/
```

Try this and read the error:

```python
def greet(name: str) -> str:
    return "Hello, " + name

greet(42)
```

mypy reports an `arg-type` error: argument 1 has incompatible type `int`, expected `str`.

A second one to try, which teaches `None` handling:

```python
def first(xs: list[int]) -> int | None:
    return xs[0] if xs else None

total = first([1, 2]) + 1   # mypy complains: the value might be None
```

The fix is to narrow before use:

```python
value = first([1, 2])
if value is not None:
    total = value + 1
```

**Exercise:** take the class you ported from Java in Block 2, annotate everything, and run `mypy --strict` until it reports no errors.

## 3. coverage.py

Coverage measures **which lines of your code ran** while your tests executed.

```bash
pip install coverage
coverage run -m unittest          # run the tests under coverage
coverage report -m                # table with a "Missing" column of unexecuted lines
coverage html                     # browsable report in htmlcov/index.html
```

Add branches (did both sides of every `if` run?):

```bash
coverage run --branch -m unittest
coverage report -m
```

With `--branch` the report adds branch columns. You can also set it in `pyproject.toml`:

```toml
[tool.coverage.run]
branch = true
```

Exclude lines you deliberately do not test:

```python
def debug_dump():  # pragma: no cover
    ...
```

### How coverage works (the basic principle)

1. **Hook into the interpreter.** Coverage asks Python to call it as code executes. The classic mechanism is the tracing hook `sys.settrace`, which coverage implements with a fast C tracer. Newer Python versions also offer `sys.monitoring`, a lower-overhead API that recent coverage releases can use.
2. **Record executed lines.** Each time a line runs, coverage notes its file and line number. At the end it writes the result to a data file named `.coverage`.
3. **Work out what could have run.** Coverage parses the source code to find which lines are executable statements (comments and blank lines do not count).
4. **Compare.** Executable lines minus executed lines are the "missing" lines. `Cover` is the percentage of executable lines that ran.

Two consequences worth knowing:

- Coverage tells you a line **ran**, not that it is **correct**. A test with no assertions can still give 100%.
- Branch coverage is stricter than line coverage: `if x: y()` is fully line-covered when `x` is true, but the "false" branch is still unproven.

### A five-minute experiment

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

Run `coverage run --branch -m unittest` then `coverage report -m`. The `return "negative"` line shows as missing. Add a second test for `label(-1)` and watch it reach 100%.

## 4. How this connects to the sprint

PySpark's tests are `unittest`-style, so `coverage run -m unittest` is the mental model for measuring a module you change. The Spark repository may also include a runner that wraps its tests with coverage (**verify**: look for `python/run-tests-with-coverage`). Being able to show that your new test covers the lines you changed makes a PR easier to review.

## Self-check

1. Does a type hint change what Python does when you run the program?
2. Which tool checks hints, and does it execute your code?
3. Name the file coverage writes, and the command that makes a readable report.
4. Why can 100% line coverage still miss a bug?
