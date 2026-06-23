# Claude: The Comprehensive Guide

A deep, interactive, **bilingual (EN/UA)** guide to mastering Claude and its tools — Cowork,
Artifacts, Projects, Connectors/MCP, Skills and agentic workflows. Power-user focused, with a short
beginner on-ramp. Concepts taught with prose **plus** diagrams, tables, mental models and interactive
simulators.

- **Live:** https://endorrfin.github.io/claude-comprehensive-guide/
- **Author:** Vasyl Krupka · Senior Fullstack Engineer · Ukraine 🇺🇦

## Stack

Vite + React 19 + TypeScript (strict). No router library (small hash router). All content is static
data in `src/data` — pages render from it. Bilingual via a `Localized {en;uk}` data layer + an EN/UA
toggle (technical terms stay English in both). Deployed to GitHub Pages by GitHub Actions.

## Commands

```bash
npm install        # Node 22+
npm run dev        # local dev server → http://localhost:5173
npm run build      # tsc (strict) + vite build → dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
```

Deploy is automatic: push to `main` → `.github/workflows/deploy.yml` builds and publishes `dist/`.
Set **Settings → Pages → Source = GitHub Actions** once.

## How it's organized

`Section (6) → Module (28) → Topic (~123) → content blocks` (prose · figure · sim · table · callout ·
compare · code). Every module is self-contained and skippable; topics are deep-linkable
(`#/m/<module>/<topic>`). A level filter (beginner/middle/senior/staff) and EN/UA toggle live in the top bar.

```
src/
  data/        concepts.ts (single source of truth) · types.ts
  i18n/        LangContext.tsx · ui.ts
  theme/       tokens.css (Claude-dark) · global.css
  lib/         hashRouter · registry · utils
  components/  layout/ · map/ · chapter/ · sims/ · figures/ · pages/
```

## Status

**S1 — scaffold + golden module.** The full skeleton is navigable (all 28 modules + their topics in the
menu and on the Ecosystem-Map landing). **M15 · Cowork mental model & The Agent Loop** is fully authored
with the hero simulator; the other 27 modules show their planned topics and fill in session by session.
See `CLAUDE.md` (source of truth) and `CURRICULUM.md` (detailed plan).
