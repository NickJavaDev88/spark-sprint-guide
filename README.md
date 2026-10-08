# Spark Sprint Guide

**English** · [Español](#español) · [繁體中文](#繁體中文)

A trilingual study guide (繁體中文 / English / Español) for developers who know Java and want to make their first **Apache Spark** pull request at the *PyCon Taiwan 2026 Sprints* ("Your first PR to Apache Spark"), starting from zero Python.

> Unofficial community guide. Not affiliated with PyCon TW, the Apache Software Foundation or the Apache Spark project. Facts were checked against official pages on 2026-10-08; items marked "verify" were not confirmed.

## What is inside

| Page | Content |
|---|---|
| Overview | How to use the guide |
| The event | Schedule, requirements, the other sprint projects, a fallback plan |
| 30-hour plan | Six blocks with hours, "done when" criteria and a day-by-day schedule |
| Spark setup checklist | Fork, build, run PySpark tests, the PR flow, day-of checklist |
| Python for Java developers | Cheat sheet, typing model, pitfalls, a first `unittest` |
| Typing, mypy & coverage | Type hints, mypy exercises, how coverage.py works |
| Resources | Official links |

## Run it locally

Requires Node.js 20 or later and [pnpm](https://pnpm.io/) (`corepack enable` picks the version pinned in `package.json`).

```bash
pnpm install
pnpm dev           # http://localhost:5173/spark-sprint-guide/
pnpm build         # static site in docs/.vitepress/dist
```

Supply-chain settings (`pnpm-workspace.yaml`, `.npmrc`): dependency install scripts are disabled, and only package versions published at least 3 days ago are installed.

The site is built with [VitePress](https://vitepress.dev/). Content lives in `docs/` (English at the root, `docs/es/` and `docs/zh-TW/` for the translations). Each language has the same seven pages.

## Publish on GitHub Pages

1. Create the repository on GitHub and push this folder to the `main` branch.
2. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds the site and publishes it at `https://YOUR_USER.github.io/REPO_NAME/`.

The workflow sets the site's base path from the repository name, so you can rename the repository without changing any file. For local runs, the default base is `/spark-sprint-guide/`; set the `BASE` environment variable to change it.

## Contributing

Corrections, new translations and updates after the event are welcome as pull requests. Keep the same structure in every language: when you change a page, update its counterpart in the other two languages, or open an issue so someone can.

## License

MIT. See [LICENSE](LICENSE).

---

## Español

Guía de estudio trilingüe para desarrolladores que saben Java y quieren hacer su primer pull request a **Apache Spark** en el *PyCon Taiwan 2026 Sprints* ("Your first PR to Apache Spark"), partiendo de cero en Python.

- **Ejecutar en local:** `pnpm install` y luego `pnpm dev` (requiere Node.js 20 o superior).
- **Publicar en GitHub Pages:** sube el repo a la rama `main`, ve a *Settings → Pages* y elige **GitHub Actions** como *Source*. El workflow de `.github/workflows/deploy.yml` hace el resto.
- **Contenido:** `docs/es/` contiene las siete páginas en español, con la misma estructura que el resto de idiomas.
- Guía comunitaria no oficial; los datos se comprobaron contra las páginas oficiales el 2026-10-08.

## 繁體中文

給已經會 Java、想在 *PyCon Taiwan 2026 衝刺開發*（「Your first PR to Apache Spark」）送出第一個 **Apache Spark** PR 的開發者所寫的三語學習指南，起點是完全沒寫過 Python。

- **本機執行：** `pnpm install` 後執行 `pnpm dev`（需要 Node.js 20 以上）。
- **發佈到 GitHub Pages：** 把 repo push 到 `main` 分支，到 *Settings → Pages* 將 **Source** 設為 **GitHub Actions**，`.github/workflows/deploy.yml` 會完成其餘工作。
- **內容：** `docs/zh-TW/` 內有七頁繁體中文內容，結構與其他語言一致。
- 非官方社群指南；資料已於 2026-10-08 對照官方頁面確認。
