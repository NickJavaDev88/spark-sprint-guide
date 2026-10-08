# The event

> Checked against the official HackMD of the event on 2026-10-08. The page's social-preview metadata still shows an older date, but the body gives the dates below. Re-check the official page before you go.

## At a glance

| | |
|---|---|
| Event | PyCon Taiwan 2026 Sprints (衝刺開發) |
| Date | Sunday, 11 October 2026, 10:00–17:00 (GMT+8) |
| Location | 新加坡商鈦坦台北辦公室 (Titansoft, Taipei) |
| Check-in | 09:30 |
| Format | Pick a project, work in a small group, present results at the end |

## Schedule

| Time | Duration | Activity |
|---|---|---|
| 09:30–10:00 | 30 min | Check-in |
| 10:00–10:15 | 15 min | Opening and sponsor introduction |
| 10:15–10:45 | 30 min | Introduction to projects |
| 10:45–10:50 | 5 min | Grouping |
| 10:50–12:30 | 100 min | Morning sprint |
| 12:30–13:30 | 60 min | Lunch |
| 13:30–16:30 | 180 min | Afternoon sprint |
| 16:30–17:00 | 30 min | Presentation and closing |

You have roughly **280 minutes of real sprint time**. That is short, which is why arriving with a working environment matters more than knowing a lot of Python.

## The project: "Your first PR to Apache Spark"

- **Lead:** Tian Gao (高天). Contact details are on the official HackMD.
- **Repository:** [apache/spark](https://github.com/apache/spark)
- **Language of the room:** Mandarin Chinese.
- **Goal, in the lead's words (paraphrased):** a first PR to a large open-source project is hard because people do not know where to start and nobody reviews the PR. The sprint shows what kinds of work a mature project has, how to make a PR easy to review and merge, and gives each participant a clear direction. The lead expects most participants to finish one PR.

### What they ask you to know

| Level | Item |
|---|---|
| Required | Python, git, GitHub |
| Nice to have | coveragepy |
| Not required | Spark or PySpark knowledge (basic familiarity with the project makes it easier) |

### What to do before the day

- Request an **Apache JIRA account**: [selfserve.apache.org/jira-account.html](https://selfserve.apache.org/jira-account.html). Approval may take time, so do it first.
- Fork `apache/spark`, enable its GitHub Actions in your fork and start building Spark. See the [setup checklist](./setup).
- Do not spend your preparation time choosing an issue. The lead says they will give you a clear direction on the day.

## The other projects

| Project | Needs | Language |
|---|---|---|
| Python Reflex: Agentic App Store | "Vibe coding" for Python (optional: Python Reflex, Databricks) | Mostly Mandarin |
| solvcon (geometry-based computation) | Any of git, Python, numpy, C++, pybind11 | Mandarin and English |
| PyLiteracy | Python, linguistics, git | Mandarin |
| swportal (sciwork websites) | Interest in front-end development | Mandarin |
| Python docs, Traditional Chinese translation | Git, Python | Mandarin |
| AI sports-highlight system and mosaic masking | git, OpenCV, FFmpeg | Mandarin |

> **Apache Airflow is not among the 2026 projects.** If Airflow is your long-term target, see "After the sprint" in the [plan](./plan#after-the-sprint).

### A fallback plan

If Spark turns out to be a bad fit on the day, the lowest-barrier alternative is the **Python docs zh-TW** project (git and Python only, no large build). solvcon publishes concrete, labeled issues per track, which is useful if you also read C++.

## Source

- Official HackMD: [PyCon Taiwan 2026 Sprints](https://hackmd.io/@pycontw/r1At0RiPfx)
- Registration page: [pycontw.kktix.cc/events/2026-sprints](https://pycontw.kktix.cc/events/2026-sprints)
