# Spark setup checklist

Commands here come from the official Spark documentation unless marked **verify**. Verify means: it is what the author expects to find, but it was not confirmed, so check it in the repository you cloned.

> The "Spark" project at the sprint is [apache/spark](https://github.com/apache/spark). In this guide, `master` is the main branch, as in Spark's own contributing guide.

## 1. Accounts

- ☐ GitHub account with SSH key or HTTPS token working.
- ☐ Apache JIRA account requested at [selfserve.apache.org/jira-account.html](https://selfserve.apache.org/jira-account.html).

## 2. Tools

- ☐ `git`.
- ☐ A JDK of a version Spark supports. **Verify** the exact versions on the "Building Spark" page of the Spark docs for the release you are building.
- ☐ Python 3 and `venv` (or `uv`). **Verify** the minimum Python version in the `python/` directory of your checkout.

## 3. Fork and clone

```bash
# After forking apache/spark on GitHub:
git clone git@github.com:YOUR_USER/spark.git
cd spark
git remote add upstream https://github.com/apache/spark.git
git fetch upstream
```

In your fork's **Actions** tab, enable **Build and test** and **Report test results**. Spark's contributing guide asks you to run tests on your fork before opening a PR, because every run on the main repository consumes limited CI resources.

## 4. Build Spark first

PySpark tests need Spark itself built first. Either of these works, per the PySpark testing guide:

```bash
build/mvn -DskipTests clean package
```

```bash
build/sbt -Phive clean package
```

Start it now and leave it running. It is slow, and you can study while it runs.

## 5. Python environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install the Python development dependencies. **Verify** the file name: look for `dev/requirements.txt` in the repository, or the "Contributing to PySpark" page of the PySpark docs.

## 6. Run a test

```bash
python/run-tests --python-executable=python3
```

To run a single test module (much faster):

```bash
python/run-tests --testnames pyspark.sql.tests.test_arrow
```

- On macOS, set `OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES` if tests crash on fork.
- To debug a test, add `breakpoint()` in the test code and run it with `python/run-tests`; the script stops there and opens a `pdb` session.
- To try the Spark Connect client: `bin/pyspark --remote "local[*]"`.

## 7. The PR flow

1. Find or confirm the JIRA issue. Do not create a duplicate. Trivial changes (a typo fix, for example) do not need a JIRA.
2. Create a branch in your fork.
3. Make the change. Add or update a test, and make it self-descriptive.
4. In Python tests, put the JIRA ID in a comment:

   ```python
   def test_case(self):
       # SPARK-12345: a short description of the test
       ...
   ```

5. Follow the style of the surrounding code. Spark's Python style is **PEP 8 with lines up to 100 characters**. **Verify** the lint entry point (`dev/lint-python` is where the author expects it).
6. Push to your fork and wait for the GitHub Actions run there to go green.
7. Open the PR against `master` of `apache/spark`. The title has the form:

   ```text
   [SPARK-xxxx][COMPONENT] Title
   ```

   where `COMPONENT` is one of the categories listed at spark-prs.appspot.com. State in the description that the contribution is your original work and licensed under the project's open-source license.
8. If it needs changes, push more commits to the same branch. If there are conflicts: `git fetch upstream`, then `git rebase upstream/master`.

## 8. Day-of checklist (Sunday morning)

- ☐ JIRA account approved (or an alternative plan if not).
- ☐ The Spark build finished without errors.
- ☐ One PySpark test module runs from your terminal.
- ☐ Fork up to date with `upstream/master`.
- ☐ Laptop charger, a second charger or power strip, and the venv activated in a terminal.
- ☐ Offline copy of this guide (print or save the pages): venue Wi-Fi can be slow.
- ☐ Arrive by 09:30 for check-in.

## Sources

- [Contributing to Spark](https://spark.apache.org/contributing.html)
- [Testing PySpark](https://spark.apache.org/docs/latest/api/python/development/testing.html)
