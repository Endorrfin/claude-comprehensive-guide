# CLAUDE.md — Claude: The Comprehensive Guide (Interactive)

Working guide and **source of truth** for every session in this repo. **Read this file
fully before starting any session.** Update the *Status / progress log* (§14) at the end of
each session.

> Author/brand: **Vasyl Krupka · Senior Fullstack Engineer · Ukraine 🇺🇦**.
> Sibling projects & quality bar: `_examples/node-js_comprehensive-guide` (the gold standard —
> Vite+React+TS, hero simulators, data-driven chapters) and `_examples/Design Principles & Patterns`
> (the "DPmap" interactive map). Match that depth and polish.

---

## 1. Mission

A **deep, interactive guide to Claude and its tools** — from a short beginner block to deep,
professional, *power-user* mastery of the whole Claude ecosystem. Concepts explained with prose
**plus** visual diagrams, tables, mental models and **interactive simulators** (the agent loop,
context/token budget, MCP request flow, sub-agent fan-out, prompt anatomy…). Built to *understand,
internalize and remember* how to use Claude like a professional (deep-dive mode).

- **Audience:** primarily **power users / professionals** (middle → senior → staff), with a small
  **beginner on-ramp** (3–5 chapters). Focus chosen by user (2026-06-23): **power-user / product-heavy**
  — Claude.ai + Cowork + Artifacts + Projects + Connectors + Skills are the core; Claude Code & agentic
  engineering get a solid but lighter group.
- **Levels:** every chapter tagged `beginner | middle | senior | staff`.
- **Language:** **Bilingual EN / UA** with a runtime toggle (user choice 2026-06-23). **All technical
  terminology stays in English** in both languages; Ukrainian is used only where it translates without
  loss of quality (explanations, analogies, mental models). EN authored first, UA second.
- **Deploy:** static site on **GitHub Pages**, public, auto-published by GitHub Actions.
- **Source of curriculum:** `info.txt` (3 fact-checked YouTube chapter lists — authoritative *seed*,
  cover it all but **do not limit to it**) + this file's §5.
- **Form/depth reference:** the Node guide's hero sims + DPmap interactive maps. That interactive,
  data-driven, diagram-rich style is the target.
- **Correctness mandate:** Claude's product surface moves fast and the build model's knowledge cutoff
  is older than the live date. **Web-search and verify every version-sensitive fact** (models, prices,
  feature availability, launch dates) per chapter; fill `sources`; never trust memory for product facts.

## 2. Stack & key decisions (with why)

- **Vite + React 19 + TypeScript (strict)** — best fit for stateful interactive simulators
  (step/play/pause), component reuse across ~28 chapters, the user's stack, and it matches the
  proven gold standard (Node guide). *(Confirm latest stable Vite/React at scaffold; pin them.)*
- **No router library** — small custom **hash router** (`#/chapter/<id>`, `#/map`, `#/decide`,
  `#/mental-models`, `#/glossary`). Hash routing + `vite base:'./'` makes the build work under **any**
  GitHub Pages sub-path with zero config (proven in `world-map`).
- **All content static** (TS/JSON data modules imported at build time) — no runtime fetches; works
  offline; deploys anywhere.
- **Single source of truth for content:** `src/data/concepts.ts` (+ `interview.ts`, `mentalModels.ts`,
  `glossary.ts`, `decide.ts`). Pages are *rendered from data*; we never hand-write page HTML.
- **Bilingual at the data layer:** every human-readable string is a `Localized` value `{ en; uk }`.
  UI chrome strings live in `src/i18n/ui.ts`. A `useLang()` context + `<T>`/`t()` helpers resolve them.
- **Tooling/CI Node:** Node 22 LTS (user runs v22.17.0, npm 10.9.2, M1 Max).

## 3. Repo layout (target)

```
Claude guide/                           # = git repo root; deploy publishes dist/ only
  index.html                            # app shell (title, favicon, theme-color)
  package.json  vite.config.ts  tsconfig.json  .eslintrc
  .github/workflows/deploy.yml          # Actions → Pages (Node 22, npm ci, build, upload dist)
  .gitignore                            # node_modules, dist, AND _examples/ + info.txt (see §12)
  public/  favicon.svg  .nojekyll
  src/
    main.tsx  App.tsx                   # layout + hash router
    i18n/     ui.ts  LangContext.tsx    # EN/UA UI strings + language provider/toggle
    theme/    tokens.css  global.css    # Claude-inspired dark tokens
    data/
      concepts.ts                       # SINGLE SOURCE OF TRUTH (groups + chapters + sections), bilingual
      interview.ts                      # senior/staff Q&A bank (tagged by chapter)
      mentalModels.ts                   # "draw from memory" gallery
      glossary.ts                       # bilingual term bank (terms stay English)
      decide.ts                         # "which tool for the job" decision data
    components/
      layout/  TopBar(search+lang) Sidebar Toc ProgressBar Footer(brand)
      map/     EcosystemMap MapNode Drawer         # landing overview (clickable → chapter)
      chapter/ ChapterPage Section Prose Figure CodeBlock DataTable Callout Compare LevelBadge
      sims/    AgentLoopSim TokenBudgetSim McpFlowSim SubAgentFanoutSim PromptAnatomy ...
      figures/ (SVG diagram components, one per key)
      study/   Flashcards Quiz InterviewBank ToolPicker
    lib/     hashRouter.ts  search.ts  registry.tsx(sim+figure registry)  utils.ts
  scripts/   (QA + optional PDF pipeline)
  CLAUDE.md  README.md  (this file + public readme)
```

## 4. Content / data model (the contract)

Every chapter is **data**; renderers turn it into a page. Bilingual via `Localized`.

```ts
type Localized = { en: string; uk: string };           // technical terms stay English in both
type Level = 'beginner' | 'middle' | 'senior' | 'staff';

type Group   = { id: string; name: Localized; accent: string; blurb: Localized };
type Chapter = {
  id: string; group: string; order: number; level: Level;
  title: Localized; tagline: Localized; readMins: number;
  mentalModel: Localized;          // the one line/picture to recall from memory
  sections: Section[];             // ordered content blocks (prose + figures + sims + …)
  keyPoints: Localized[];          // takeaways ("draw from memory")
  pitfalls: { title: Localized; body: Localized }[];     // pro-level traps & misconceptions
  interview?: { q: Localized; a: Localized; level?: Level }[];
  seeAlso: string[];               // related chapter ids (cross-links)
  sources: { title: string; url: string }[];  // verification + on-page citations (English)
};
type Section =
  | { kind:'prose';   md: Localized }
  | { kind:'figure';  fig: string; caption?: Localized }   // SVG/diagram component key
  | { kind:'sim';     sim: string }                        // interactive widget registry key
  | { kind:'table';   head: Localized[]; rows: Localized[][]; caption?: Localized }
  | { kind:'code';    lang: string; code: string; note?: Localized }  // code is language-neutral
  | { kind:'callout'; tone:'tip'|'warn'|'senior'|'security'; title: Localized; md: Localized }
  | { kind:'compare'; a: Localized; b: Localized; rows: [Localized,Localized,Localized][] };
```

Figures and sims are referenced by **key** and resolved via `lib/registry.tsx`, so content stays
declarative and widgets stay reusable. Content is edited **only** in `src/data/*`.

## 5. Curriculum (seed = info.txt; cover all, not limited to it)

> **Terminology (decided 2026-06-23):** **Section** (the 6 blocks) → **Module** (the navigable,
> skippable unit, was "chapter") → **Topics** (variable per module) → content **blocks**. The
> **full module-by-module + topic-by-topic + per-module visual-asset plan lives in `CURRICULUM.md`**
> (the detailed annex). The list below is the section/module overview; treat `CURRICULUM.md` as
> authoritative for topics. Refined `Module`/`Topic` schema: see `CURRICULUM.md` §C (supersedes §4 naming).

Six sections, **~28 modules · ~120 topics**. Product-heavy weighting. Levels in brackets. ★ = signature interactive.

**I · Foundations & first steps** *(beginner on-ramp)*
1. What is Claude — models (Opus 4.8 · Sonnet 4.6 · Haiku 4.5), plans, apps (web/desktop/mobile), what it can/can't do `[beginner]`
2. Interface & settings tour — chat layout, model picker, voices, appearance, privacy/billing, shortcuts, organizing & incognito chats `[beginner]`
3. Talking to Claude — prompting basics, context, how requests become results `[beginner]`
4. Attachments, writing styles & voice — files in, style control, talking to Claude `[beginner]`
5. Memory & chat search — what Memory stores, controls, finding past chats `[beginner]`

**II · Working smarter: prompting & the persistent workspace** *(middle → senior)*
6. Prompting mastery — patterns, structured prompts, GCAO, examples ★ **Prompt Anatomy** `[middle]`
7. Projects — instructions, knowledge, context walls, per-project skills `[middle]`
8. Artifacts — mini-apps, inline visualizations, data analytics `[middle]`
9. Live Artifacts — stateful + connected (persistent storage, API calls, MCP) `[senior]`
10. Context & token management — context window, what fills it, cost levers (caching/batch) ★ **Token Budget** `[senior]`

**III · Extending Claude** *(senior)*
11. Connectors & MCP — directory, remote vs local, OAuth, Notion/Gmail/Calendar/Drive ★ **MCP Flow** `[senior]`
12. Skills — concepts & using them — SKILL.md anatomy, pre-built skills, progressive disclosure ★ **Progressive Disclosure** `[senior]`
13. Building your own skills — authoring basic → advanced, scripts/resources, testing `[senior]`
14. Plugins & marketplaces — bundles (skills+subagents+commands+hooks+MCP), installing/sharing `[senior]`

**IV · Cowork: your desktop agent** *(middle → senior, the product-heavy crown)*
15. Cowork mental model & setup — the third tab, local files, the agent loop ★ **The Agent Loop** `[middle]`
16. Files, folders & outputs — selecting folders, reading/writing, deliverables `[middle]`
17. Scheduled tasks — recurring work, briefings, cadence vs one-off `[middle]`
18. Computer use — when Claude drives your screen; the 3 tiers (connector → browser → computer) `[senior]`
19. Cowork projects, connectors, plugins & mobile/dispatch `[senior]`

**V · Claude in your tools & code** *(middle → staff)*
20. Claude in Chrome — browser agent, record workflows, scheduled web tasks `[middle]`
21. Claude for Excel & PowerPoint — office agents, cell-level citations, shared context `[middle]`
22. Claude Code essentials — environments, models, effort, permissions, CLAUDE.md, plan mode `[senior]`
23. Sub-agents, agent teams & worktrees — parallelization & orchestration ★ **Sub-agent Fan-out** `[staff]`
24. Hooks, slash commands & advanced agentic patterns — auto-research, multi-agent consensus, pipelines `[staff]`

**VI · Mastery**
25. Security & safe agent use — permissions, prompt injection, link safety, data boundaries, financial actions `[senior]`
26. Choosing the right tool — decision guides ★ **Tool Picker** (Cowork vs Code vs Chrome vs Excel vs connector vs skill) `[senior]`
27. The ecosystem map — how it all composes in one picture (models → apps → context → capabilities → orchestration) `[senior]`
28. Mental models gallery + glossary / cheat-sheet — the pictures to recall from memory `[middle]`

*(Scope is adjustable. Chapters can merge/split; ~24–28 is the target band.)*

## 6. Signature interactives (the differentiator) + diagram-first baseline

**Policy (user choice 2026-06-23 = blend of "signature interactives" + "diagram-first"):** build a
small, cheap, reusable sim/quiz framework; ship **~6 signature interactives** where they add real
insight, and a **crisp SVG diagram + table** everywhere else ("maximal where useful"). Each sim has a
non-animated step fallback (a11y / `prefers-reduced-motion`).

Signature interactives (priority order):

1. ★ **The Agent Loop** *(Ch.15)* — animate prompt → think → tool call → observation → think → … → answer;
   step/play/pause. The mental model behind every Cowork/Code agent. **Golden-standard candidate.**
2. ★ **Context / Token Budget** *(Ch.10)* — drag turns, files, memory, project knowledge into a fixed
   window; watch the budget fill, what gets truncated, and caching/batch cost levers.
3. ★ **MCP Request Flow** *(Ch.11)* — Claude → MCP server (local stdio / remote) → external API
   (Notion/Gmail) → result back into context; remote-vs-local toggle.
4. ★ **Sub-agent Fan-out** *(Ch.23)* — a main agent spawns N subagents (own context windows) in
   parallel; results merge; contrast with git-coordinated agent teams.
5. ★ **Prompt Anatomy** *(Ch.6)* — assemble a prompt from parts (role/context/task/format/examples);
   see how structure shifts the result. Doubles as a reusable "good vs bad prompt" compare.
6. ★ **Tool Picker** *(Ch.26)* — DPmap-style decision widget: pick a task → recommends the right Claude
   tool + why (data in `decide.ts`).

Plus the **Ecosystem Map** landing (clickable → chapter, like DPmap) and opportunistic light
interactives (skills progressive-disclosure, scheduled-task timeline, computer-use 3-tiers).

## 7. Theme / brand — Claude-inspired **dark** (user choice 2026-06-23)

Warm, editorial, Anthropic/Claude feel: warm-dark background + **Claude coral/clay** accent + cream text.

Core tokens (tune at scaffold against the live Claude site):
```
--bg:#14110D   --surface:#1C1813   --s2:#241F18   --line:#332C22  --line2:#41382B
--tx:#F5F1E8   --tx2:#B8AE9E       --tx3:#857A68
--accent:#D97757          /* Claude coral/clay, primary */
--accent-deep:#C2613F     /* fills / borders */
--accent-bright:#E8A07E   /* headings / glow highlight */
```
**Semantic palette for diagrams & sims** (keep consistent across the guide):
- **coral `#D97757`** = Claude / the model itself
- **teal `#38BDF8`** = tools & connectors / MCP / I/O to the world
- **violet `#A78BFA`** = context / memory / projects
- **green `#6CC24A`** = success / connected / "safe"
- **amber `#F2A93B`** = agentic / automation / scheduled / computer use
- **red `#F87171`** = warnings / security / permission boundaries

Fonts (all free/Google) — **decided 2026-06-23:** **Fraunces** (display serif — editorial Claude nod,
optical sizing; *Newsreader* is the fallback) · **Inter** (body) · **JetBrains Mono** (code/labels).
Favicon: inline SVG (coral spark/asterisk on dark).
Footer: **"Vasyl Krupka · Senior Fullstack Engineer"** + 🇺🇦. Dark is primary; light optional later.

## 8. Internationalization (EN / UA)

- `Localized = { en; uk }` for all content; `src/i18n/ui.ts` for chrome strings; `useLang()` +
  `<T value={...}/>` / `t(...)` to resolve. Toggle in TopBar; persist choice in `localStorage`
  (standalone app, not a Claude.ai artifact — localStorage is fine here).
- **Author EN first, UA second.** Keep ALL technical terms English in UA (Cowork, Skills, MCP,
  sub-agents, Artifacts, prompt, context window, token, connector…). Translate only explanation/analogy.
- `<html lang>` follows the toggle; search indexes both languages.

## 9. Deliverables

- **Web guide** (this app) — primary.
- **README.md** — public overview + live link + local commands.
- **Deferred / optional:** per-concept deep-dive **PDF** booklet and **LinkedIn** assets (decide later;
  pipeline of record if revived: satori → resvg PNG → img2pdf, Claude-dark theme, Ukraine footer —
  mirror DPmap `srp.js`). Not in scope for the core build.

## 10. Conventions (incl. user rules)

- TypeScript **strict** + `noUnusedLocals/Parameters`; **ESLint clean** (build fails otherwise) —
  generate code with linters in mind (user rule 5).
- Content edited **only** in `src/data/*`; never hand-edit rendered output.
- **Correctness:** every non-trivial product claim must be verifiable — fill `sources`; **web-search
  to confirm** version-sensitive facts (models, prices, availability, dates). Each content session ends
  with a verification step (typecheck + build + fact spot-check). High-stakes facts → double-check.
- **Accessibility:** keyboard nav, focus rings, ARIA on sims, `prefers-reduced-motion` step fallback,
  contrast-checked palette.
- **User working rules (apply every session):** (1) specific solutions, not generic; (2) brief "why",
  not long lectures unless asked; (3) describe change + why **before** doing it; (4) mark in-code edits
  `// CHANGED:`; (5) lint-aware; (6) reliability/security/best-practice first; (7) ask when unclear;
  (8) don't just agree — challenge wrong/partial reasoning with clarifying questions.
- Be concise and direct (user preference).
- **Session summary (end of EVERY session — user rule 2026-06-23):** always close with
  **(1)** what was done/implemented; **(2)** suggested **branch name** + **commit message** +
  **short description**; **(3)** challenges/questions, if any. Branch convention `sN-short-topic`
  (e.g. `s1-scaffold-golden-module`); commit style: concise imperative.

## 11. Deploy (GitHub Pages via Actions)

- `.github/workflows/deploy.yml`: on push to `main` → `actions/checkout` → `setup-node@22` → `npm ci`
  → `npm run build` → `upload-pages-artifact (dist)` → `deploy-pages`. Pages **Source = GitHub Actions**.
- `vite base:'./'` + hash routing + `public/.nojekyll`. **Decided 2026-06-23:** repo
  **`claude-comprehensive-guide`** on account **`endorrfin`** → live URL
  **`https://endorrfin.github.io/claude-comprehensive-guide/`** (base `'./'` keeps it sub-path-safe).
- **Suggested GitHub "Description":** *"Deep, interactive, bilingual (EN/UA) guide to mastering Claude
  and its tools — Cowork, Artifacts, Projects, Connectors/MCP, Skills & agentic workflows."*
  Suggested **topics/tags:** `claude · anthropic · cowork · mcp · skills · artifacts · agentic · vite · react · typescript · github-pages`.
- **Pending (user):** create the repo `claude-comprehensive-guide`, then (after S1 push) set
  Settings → Pages → **Source = GitHub Actions**.

## 12. Gotchas / constraints (read before building)

- **`_examples/` and `info.txt` must be excluded** from the new git repo & deploy: `_examples/` holds
  three reference projects, each with its **own nested `.git`** and large assets. Add both to `.gitignore`
  (deploy ships only `dist/`, so they never reach the live site anyway).
- **Build tool:** recent Vite uses **Rolldown**. On **Apple-silicon (M1 Max)** an npm optional-dep bug
  can leave the native binary missing (`Cannot find module …-darwin-arm64`); reinstall the platform
  package if so. **CI on linux-x64 is unaffected.**
- **This Linux sandbox blocks `unlink`** on the mounted FS → Vite `emptyOutDir` fails on a *rebuild*
  into an existing dir (EPERM). Workaround in-sandbox: build into a fresh `--outDir` or set
  `build.emptyOutDir:false`. The user's Mac & CI are unaffected.
- **No browser in the sandbox** → can't screenshot the running app. Validate via `tsc` + `vite build`
  (must pass) + targeted unit checks + SSR/route smoke. Prefer `mv`/overwrite over `rm`.
- **Product facts drift** — anything dated here is "verified 2026-06-23" and **must be re-checked** at
  build time for the chapter that uses it.

### Verified product facts (2026-06-23 — re-verify per chapter)
- **Models:** Opus **4.8** (launched 2026-05-28; flagship, adaptive thinking; $5/$25 per MTok; Fast Mode
  $10/$50), Sonnet **4.6** ($3/$15, best balance), Haiku **4.5** ($1/$5, speed/volume). 1M-token context
  on Opus 4.8/4.7 & Sonnet 4.6. Batch −50%, prompt caching −90% cached input.
- **Cowork:** desktop agent (3rd tab in Claude Desktop); local file read/write; scheduled tasks; MCP
  connectors; plugins (11 open-source role plugins); computer use; mobile; **Windows GA 2026-02-10**.
- **Skills:** `SKILL.md` (YAML frontmatter: name+description) + scripts/resources; pre-built pptx/xlsx/
  docx/pdf; create in Code, upload via API, or add in claude.ai settings; run on claude.ai/API/Bedrock/Foundry.
- **Claude Code:** subagents (Task tool, own context), **agent teams** (git-coordinated; launched
  2026-02-05 with Opus 4.6), hooks, plugins, plan mode, Auto Mode (Sonnet 4.6 safety classifier),
  slash commands, MCP.
- **Connectors/MCP:** Connectors Directory (since 2025-07, 200+); consumer connectors added 2026-04
  (all plans, mobile beta); remote (Anthropic-hosted: M365/Gmail/Calendar) vs local (stdio) MCP.
- **Projects/Artifacts/Memory:** Projects wall off context+files+skills; Artifacts now persistent +
  API calls + MCP (Live Artifacts = stateful/connected); Memory to **all users incl. free since 2026-03-02**.
- **Claude for Chrome:** browser agent (navigate/click/forms, record workflows, scheduled); beta all paid plans.
- **Claude for Excel/PowerPoint:** Excel reads multi-tab workbooks w/ cell-level citations, pivot tables;
  Opus 4.6; Max/Team/Enterprise; shared context with PowerPoint add-in (2026-03).

## 13. Session roadmap (step by step, ~12 sessions)

> Pattern (from the gold standard): **lock a golden standard first**, then batch. Each session ends with
> typecheck + build + (after Pages is live) a push to confirm deploy. Bilingual = author EN then UA per chapter.

- **S0 · Planning** *(this session)* — agree stack/structure/scope; write this `CLAUDE.md`; task list.
  **Status: drafted, awaiting user approval before S1.**
- **S1 · Scaffold + golden chapter** — Vite/React 19/TS app; Claude-dark theme; hash router; i18n
  (EN/UA toggle); layout (TopBar+search+lang, Sidebar, Footer); deploy workflow; `.gitignore`;
  favicon/footer; finalize bilingual `concepts.ts` schema (Module/Topic per `CURRICULUM.md` §C);
  **Ecosystem-Map landing** + **full sidebar menu showing all 6 sections / 28 modules / topics as a
  navigable skeleton** (bodies may stub) so the user can run it and see design + menu + navigation;
  **golden module fully built + hero sim — confirmed: M15 Cowork mental model + The Agent Loop**
  (the centerpiece). Verify build + first Pages deploy.
- **S2 · Prompting & workspace** — Ch.6 Prompting mastery + **Prompt Anatomy**; Ch.7 Projects.
- **S3 · Artifacts** — Ch.8 Artifacts; Ch.9 Live Artifacts (embed a tiny live demo).
- **S4 · Context + Connectors** — Ch.10 Context/token mgmt + **Token Budget**; Ch.11 Connectors & MCP + **MCP Flow**.
- **S5 · Skills & plugins** — Ch.12 Skills + **Progressive Disclosure**; Ch.13 Building skills; Ch.14 Plugins/marketplaces.
- **S6 · Cowork core** — Ch.15 (if not golden) + Ch.16 Files/outputs; Ch.17 Scheduled tasks (+timeline); Ch.18 Computer use (+3-tiers).
- **S7 · Cowork advanced + tools** — Ch.19 Cowork projects/connectors/plugins/mobile; Ch.20 Claude in Chrome; Ch.21 Excel/PowerPoint.
- **S8 · Claude Code & agentic** — Ch.22 Code essentials; Ch.23 Sub-agents/teams/worktrees + **Sub-agent Fan-out**; Ch.24 hooks/slash/advanced patterns.
- **S9 · Beginner block** — Ch.1–5 (what is Claude, interface, prompting basics, attachments/styles, memory/search) — reuses components built above.
- **S10 · Mastery + polish** — Ch.25 Security; Ch.26 Choosing the right tool + **Tool Picker**; Ch.27 Ecosystem map polish; Ch.28 Mental models + glossary; global search, flashcards, mobile/a11y/perf, **bilingual QA**. *(web-search to confirm latest facts.)*
- **S11–S12 · Buffer** — extra "maximal" interactives, full UA pass, final QA; optional PDF/LinkedIn pack.

## 14. Status / progress log

- **2026-06-23 · S0 Planning** — Reviewed all three `_examples` projects (node-js guide = gold standard;
  DPmap = interactive-map form; world-map = bilingual Vite/Pages reference) + `info.txt` (3 video chapter
  lists). Web-verified the current Claude product surface (models, Cowork, Skills, Code, connectors,
  Projects/Artifacts/Memory, Chrome, Excel — see §12). **Decisions locked with user:** bilingual EN/UA ·
  power-user/product-heavy focus · Claude-inspired dark theme · blend of signature interactives +
  diagram-first. Stack = Vite+React19+TS (mirrors gold standard). This `CLAUDE.md` written + task list
  created. **Next: on user approval → S1 scaffold + golden chapter (Ecosystem-Map landing + Cowork/Agent-Loop).**
- **2026-06-23 · S0+ Detailed plan** — Adopted user's **modularity model** (Section → Module → Topic;
  modules skippable/jumpable; topics deep-linkable). Wrote **`CURRICULUM.md`** (detailed annex): all 6
  sections / 28 modules / ~120 topics, each module's topics + planned visual assets (tables · diagrams ·
  mental models · 6–7 signature sims), plus the navigation/UX spec and the refined `Module`/`Topic` data
  model. **Locked:** heading font **Fraunces** (Newsreader fallback) · repo **`claude-comprehensive-guide`**
  @ `endorrfin` (URL `https://endorrfin.github.io/claude-comprehensive-guide/`) · golden module **M15
  Cowork + The Agent Loop**. Produced an inline skeleton/menu/navigation mockup for design sign-off.
  **Next: on user approval of the detailed plan → S1 builds the runnable skeleton (he opens it locally /
  on Pages to see design + menu + navigation) + the golden module.**
- **2026-06-23 · S1 Scaffold + golden module** — DONE. Vite 8 + React 19 + TS (strict) app; Claude-dark
  theme (`theme/tokens.css` coral-on-warm-dark + reused token-driven `global.css`); Fraunces/Inter/
  JetBrains fonts; custom hash router (`#/map`, `#/m/<module>/<topic>`, `#/mental-models`, `#/glossary`,
  `#/decide`); **bilingual EN/UA** (`i18n/LangContext` + `ui.ts`, localStorage-persisted toggle);
  layout = TopBar (brand · search over modules/topics · level filter · EN/UA) + collapsible Sidebar
  (6 sections → 28 modules, level badges + ★ for signature sims) + Footer (brand + 🇺🇦 + GitHub);
  **Ecosystem-Map landing** (clickable cards, level-filter dimming) + **full navigable skeleton of all
  28 modules / 123 topics** (planned topics shown for stubs). **Golden module M15 Cowork** fully authored
  (5 topics: what Cowork is · the agent loop · local files · setup · vs Code/chat) with key points,
  pitfalls, interview Q&A, sources; **hero ★ The Agent Loop sim** (`AgentLoopSim` — step/play/pause,
  reduced-motion fallback, bilingual) + `CoworkArchitecture` figure; block renderers (prose/figure/sim/
  table/callout/compare/code) + tiny `Md`; GitHub Actions deploy workflow; `.gitignore` (excludes
  `_examples/` + `info.txt`); favicon; `README.md`. **Verified (sandbox copy):** `tsc --noEmit` clean ·
  `npm run build` OK (JS ≈81 kB gzip, relative `./assets`) · data-integrity check ALL PASS (28 modules,
  123 topics, unique ids, valid section/sim/figure refs). Workspace holds source only (node_modules built
  in scratch to avoid linux/darwin binary mismatch — user runs `npm install` locally).
  **Next (S2): Ch.6 Prompting mastery + Prompt Anatomy; Ch.7 Projects.**
- **2026-06-23 · S2 plan locked (user)** — S2 = **M6 Prompting mastery + ★ Prompt Anatomy (2nd signature
  sim)** and **M7 Projects**, both to golden quality. Cadence confirmed: **1–2 modules per session;
  speed is NOT a priority — material quality, learning UX and depth are HIGH priority.** Build Prompt
  Anatomy as the second signature interactive (assemble a prompt from parts → see how structure shifts
  the result; reuse the sim/quiz framework; reduced-motion fallback; bilingual). Recommended to run S2 in
  a **fresh session** (clean context; bootstrap by reading this file + `CURRICULUM.md` §M6/M7 + the S1
  patterns in `src/components/*` and `src/data/concepts.ts`). Land S1 on `main` first so S2 branches cleanly.
