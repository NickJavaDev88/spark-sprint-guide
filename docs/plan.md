# 30-hour plan

This plan assumes you read Java comfortably, have never written Python, and have roughly 64 hours between now and check-in. Adjust the numbers to your own window.

## Time budget

| Item | Hours |
|---|---|
| Window until check-in | about 64 |
| Sleep (3 nights × 8 h) | −24 |
| Awake time | about 40 |
| Meals and breaks | about −8 |
| **Usable study time** | **about 32** |
| **Plan** | **30** (28.5 of blocks + 1.5 buffer) |

## Principles

1. **Spark first.** Everything here is chosen because the sprint needs it. Python you will never meet in Spark can wait.
2. **Type the code.** Reading is not learning. Every block ends with something you ran.
3. **Start the build before you study.** PySpark tests need Spark compiled first, and that takes a while.
4. **unittest before pytest.** PySpark tests are classes with `self`, in the `unittest` style, run through `python/run-tests`.
5. **If time runs short, cut in this order:** decorators and generators (Block 2), then the optional reading in Block 3. Never cut the environment, typing or coverage.

## Block 0: accounts and build (0.5 h, tonight, first)

- ☐ Request an Apache JIRA account ([form](https://selfserve.apache.org/jira-account.html)).
- ☐ Fork `apache/spark` on GitHub.
- ☐ In your fork, open the **Actions** tab and enable the "Build and test" and "Report test results" workflows.
- ☐ Clone your fork and add `upstream`.
- ☐ Start the Maven or sbt build in a terminal and leave it running (commands in the [setup checklist](./setup)).

**Done when:** the build is running and you have submitted the JIRA request.

## Block 1: Python syntax (7 h)

| Time | Task |
|---|---|
| 1.5 h | [Learn X in Y Minutes: Python](https://learnxinyminutes.com/python/), typing each snippet into a REPL |
| 3.5 h | The exercises of the [PyLadies workshop curriculum](https://python-tutorial-workshop.github.io/#curriculum). Write every exercise yourself, even the easy ones |
| 1 h | [W3Schools Python](https://www.w3schools.com/python/default.asp) only to fill gaps: slicing, dict, set, comprehensions, f-strings, exceptions, imports |
| 1 h | Set up a virtual environment (`venv` or `uv`) and run a script from the terminal |

**Done when:** you can write a 40-line script with functions, a dict, a list comprehension and a `try/except` without looking anything up. Read [Python for Java developers](./python-for-java) alongside this block.

## Block 2: Python you will meet in real code (6 h)

| Time | Task |
|---|---|
| 3 h | Classes, `__init__`, dunder methods, `@dataclass`, `@property`, decorators, generators, `with`, `*args` and `**kwargs` |
| 2 h | `unittest.TestCase`: `setUp`, `assertEqual`, `assertRaises`, `subTest`, `mock.patch` |
| 0.5 h | `breakpoint()` and the `pdb` basics |
| 0.5 h | Port a small Java class you know (with its test) to Python |

**Done when:** you can read a test file in the Spark repository and explain what each line does.

## Block 3: typing and mypy (5 h)

| Time | Task |
|---|---|
| 2 h | Annotations: `list[int]`, `dict[str, int]`, `X \| None`, `Callable`, `TypeVar`, `Protocol`, `TypedDict`, `Literal` |
| 2 h | Run `mypy --strict` on your Block 2 port and fix every error |
| 1 h | Open `python/pyspark/sql/` in the Spark repo and read how functions are annotated |

**Done when:** `mypy --strict` reports zero errors on your own code and you can explain why a type hint does not stop a program from running. Details in [Typing, mypy and coverage](./typing-mypy-coverage).

## Block 4: coverage.py (4 h)

| Time | Task |
|---|---|
| 1.5 h | `coverage run -m unittest`, `coverage report -m`, `coverage html`, and `--branch` |
| 1.5 h | How it works: coverage hooks the interpreter's tracing, records executed lines in a `.coverage` file and compares them with the lines that could run |
| 1 h | `# pragma: no cover`, then get your Block 2 port to 100% line and branch coverage |
| 0.5 h | Search the Spark repo for a coverage runner script (`python/run-tests-with-coverage`, verify it exists) and read how it is used |

**Done when:** you can explain in two minutes how coverage knows which lines ran.

## Block 5: rehearse the Spark PR (6 h)

| Time | Task |
|---|---|
| 1.5 h | `pip install pyspark`, create a local session and try a few DataFrame operations |
| 1 h | With the build finished, run one PySpark test file with `python/run-tests --testnames` |
| 1 h | Read "Contributing to PySpark" and the Spark contributing guide; browse JIRA issues labeled `starter` |
| 2.5 h | Rehearse the flow on a throwaway branch: a small change, a test, the style check, the PR title format, the JIRA ID in the test comment |

**Done when:** one PySpark test file runs from your terminal and you can recite the PR title format.

## Day-by-day schedule

Assuming you start on Thursday evening and the event is on Sunday:

| Slot | Hours | Blocks |
|---|---|---|
| Thursday night | about 5 | 0, then the start of 1 |
| Friday | about 11 | rest of 1, then 2 and 3 |
| Saturday | about 11 | 4 and 5 |
| Sunday morning | about 1.5 | Verify the [setup checklist](./setup), pack, leave |

## After the sprint

- **Answer review comments fast.** Spark's guide asks contributors to stay responsive, and a PR with no attention is best improved and re-pinged after a few days, or made smaller.
- **Keep the habit.** Reviewing other people's PRs and answering questions on the mailing list are valid contributions, per Spark's own guide.
- **Apache Airflow** is a natural next Python-heavy project. Its contributing docs include a beginner quick start, static-check and testing guides, and a `#new-contributors` Slack channel for first-PR questions. It was not part of this sprint, and its code base is advanced Python, so treat it as a follow-up, not as study material for these 30 hours.
