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
  - **Files/outputs (M16, verified S6):** reads/writes **only folders you grant**; code/shell run in an
    **isolated VM** (scratchpad = temporary; your folder persists); deliverables **docx/xlsx/pptx/pdf**
    via the pre-built skills, **30 MB/file**; **deletion gate** requires explicit Allow **in both
    permission modes** (*Ask before acting* / *Act without asking*); Global instructions (Settings→Cowork)
    + per-folder instructions. Cowork itself = **paid plans only**; code-execution/file-creation = all plans incl. Free.
  - **Scheduled tasks (M17, verified S6):** create via the **`/schedule` skill** or the **Scheduled page**;
    cadences are **presets** (hourly · daily · weekly · weekdays · manual) — **no raw-cron textbox** (cron is
    the underlying model; `/schedule` reads natural language); one-off = `fireAt`. **Runs only while the
    computer is awake + Desktop open** → missed runs **skip then catch up once on wake** (shown in history).
    Each run = its own Cowork session. Paid plans only.
  - **Computer use (M18, verified S6):** **research preview, Pro/Max ONLY** (not Team/Enterprise), Desktop
    macOS/Windows, **off by default** (Settings→General; macOS also needs Accessibility + Screen Recording).
    **Three tiers of acting** (precise-first): connector → browser (Claude in Chrome) → screen. **Per-app
    access tiers** (fixed by category): **View only** (browsers, trading platforms) · **Click only**
    (terminals, IDEs) · **Full control** (everything else). **No sandbox**; screenshots see the screen;
    trading/crypto **blocked by default**; per-app approval (30 min in Dispatch); cross-app link trap.
  - **Projects · connectors · plugins · Dispatch (M19, verified S7):** a **Cowork project** = a **local**
    workspace (Instructions · Scheduled tasks · Context [folder / linked chat project / URL] · project-scoped
    Memory); **desktop-only, no cloud sync, no sharing on Team/Enterprise**; create from scratch / existing
    folder / imported chat project. **Connectors & plugins are account-level, NOT project-scoped** (only
    Instructions + Context are scoped). **Dispatch** = one continuous phone↔desktop thread (**Pro/Max only** —
    narrower than Cowork) that **routes** dev→Claude Code / knowledge→Cowork on an **awake** desktop and
    messages back the result; computer use in phone sessions uses 30-min approvals.
- **Skills:** `SKILL.md` (YAML frontmatter: name+description) + scripts/resources; pre-built pptx/xlsx/
  docx/pdf; create in Code, upload via API, or add in claude.ai settings; run on claude.ai/API/Bedrock/Foundry.
- **Claude Code:** subagents (Task tool, own context), **agent teams** (git-coordinated; launched
  2026-02-05 with Opus 4.6), hooks, plugins, plan mode, Auto Mode (Sonnet 4.6 safety classifier),
  slash commands, MCP.
- **Connectors/MCP:** Connectors Directory (since 2025-07, 200+); consumer connectors added 2026-04
  (all plans, mobile beta); remote (Anthropic-hosted: M365/Gmail/Calendar) vs local (stdio) MCP.
- **Projects/Artifacts/Memory:** Projects wall off context+files+skills; Artifacts now persistent +
  API calls + MCP (Live Artifacts = stateful/connected); Memory to **all users incl. free since 2026-03-02**.
- **Claude in Chrome (M20, verified S7):** browser **extension**; side-panel agent that screenshots the
  active tab + reads the DOM, then navigates/clicks/types/fills/extracts; multi-tab via tab group; built-in
  site knowledge (Slack/Gmail/Calendar/Docs/GitHub); **shortcuts** (`/`) + **recorded workflows** +
  **scheduled** shortcuts; pairs with Code (build-test-verify + console logs). **Beta, all paid plans,
  Chrome-only**; **Pro = Haiku 4.5 only** (Max/Team/Ent pick Opus 4.7 / Sonnet 4.6 / Haiku 4.5). Two
  **permission modes** (Ask before acting = plan + per-domain prompts · Act without asking = autonomous,
  higher injection risk); **protected actions** (purchase/delete/account/permissions) always ask in both;
  **refuses instructions found in page/email content**; blocked sites (banking/trading/crypto/adult/piracy).
- **Claude for Excel/PowerPoint (M21, verified S7):** Microsoft 365 **add-ins**, **GA on ALL paid plans**
  (Pro/Max/Team/Enterprise) — *not* beta (the old "Opus 4.6; Max/Team/Ent" note was **stale**; no model
  pinned). **Excel:** multi-tab, **clickable cell-level citations**, dependency-safe edits + change tracking
  + overwrite protection; native ops by language (pivot tables, charts, conditional formatting, data
  validation); skills (`/`) + connectors; per-app Instructions; **no** data tables/macros/VBA; `.xlsx`/`.xlsm`.
  **PowerPoint:** template-aware (slide master), pinpoint edits, native editable charts. **"Shared context"
  = the separate opt-in "Work across Microsoft 365 apps"** (Excel/PPT/Word/Outlook, **open files only**,
  default on Pro/Max · off Team/Enterprise) — within one app, Instructions + history are **separate** Excel↔PPT.
  Prompt-injection: trusted files only; risky funcs (WEBSERVICE/IMPORTDATA/INDIRECT/DDE/CALL…) pop per-tool confirms.

## 13. Session roadmap (step by step, ~12 sessions)

> Pattern (from the gold standard): **lock a golden standard first**, then batch. Each session ends with
> typecheck + build + (after Pages is live) a push to confirm deploy. Bilingual = author EN then UA per chapter.

> **Progress (2026-06-23): S0–S9 ✅ done; S10a ✅ done** — **27 / 28 modules authored (M1–M27)**; Sections
> **I, II, III, IV & V complete + Section VI M25–M27** (S10a). **All 7 signature sims built** — Agent Loop,
> Prompt Anatomy, Token Budget, MCP Flow, Progressive Disclosure, ★ Sub-agent Fan-out [S8], **★ Tool Picker
> [S10a, the last one]** — + 2 light interactives (Schedule-Timeline M17, Browser-Agent-Loop M20). **Only M28
> (mental-models gallery + glossary + cheat-sheet + flashcards) remains** — it is the revision layer + study
> surfaces (new `glossary.ts`, the `#/mental-models` / `#/glossary` pages, flashcards), deferred to **S10b**
> together with the perf (code-splitting/lazy-loading) + bilingual-QA sweep. The `#/decide` route is now live
> (Tool Picker). **Next: S10b — M28 + polish.**

- **S0 · Planning** ✅ — agree stack/structure/scope; write this `CLAUDE.md`; task list.
  **Status: drafted, awaiting user approval before S1.**
- **S1 · Scaffold + golden chapter** ✅ — Vite/React 19/TS app; Claude-dark theme; hash router; i18n
  (EN/UA toggle); layout (TopBar+search+lang, Sidebar, Footer); deploy workflow; `.gitignore`;
  favicon/footer; finalize bilingual `concepts.ts` schema (Module/Topic per `CURRICULUM.md` §C);
  **Ecosystem-Map landing** + **full sidebar menu showing all 6 sections / 28 modules / topics as a
  navigable skeleton** (bodies may stub) so the user can run it and see design + menu + navigation;
  **golden module fully built + hero sim — confirmed: M15 Cowork mental model + The Agent Loop**
  (the centerpiece). Verify build + first Pages deploy.
- **S2 · Prompting & workspace** ✅ — Ch.6 Prompting mastery + **Prompt Anatomy**; Ch.7 Projects.
- **S3 · Artifacts** ✅ — Ch.8 Artifacts; Ch.9 Live Artifacts (embed a tiny live demo).
- **S4 · Context + Connectors** ✅ — Ch.10 Context/token mgmt + **Token Budget**; Ch.11 Connectors & MCP + **MCP Flow**.
- **S5 · Skills & plugins** ✅ — Ch.12 Skills + **Progressive Disclosure**; Ch.13 Building skills; Ch.14 Plugins/marketplaces.
- **S6 · Cowork core** ✅ — Ch.16 Files/outputs; Ch.17 Scheduled tasks (+timeline); Ch.18 Computer use (+3-tiers). *(M15 was the S1 golden.)*
- **S7 · Cowork advanced + tools** ✅ — Ch.19 Cowork projects/connectors/plugins/mobile; Ch.20 Claude in Chrome (+ light Browser-Agent-Loop); Ch.21 Excel/PowerPoint.
- **S8 · Claude Code & agentic** ✅ — Ch.22 Code essentials; Ch.23 Sub-agents/teams/worktrees + **Sub-agent Fan-out**; Ch.24 hooks/slash/advanced patterns.
- **S9 · Beginner block** — Ch.1–5 (what is Claude, interface, prompting basics, attachments/styles, memory/search) — reuses components built above.
- **S10a · Mastery (teaching close)** ✅ — Ch.25 Security; Ch.26 Choosing the right tool + ★ **Tool Picker** (last signature sim, also the live `#/decide` page); Ch.27 Ecosystem map. *(Scoped with user 2026-06-23: M25–M27 + Tool Picker now; M28 + polish → S10b, because M28 is study-UI + new datasets, a different kind of build.)*
- **S10b · Revision layer + polish** — Ch.28 Mental models gallery + glossary (new `glossary.ts` — **comprehensive: every term across all 27 modules**, user choice 2026-06-23) + cheat-sheet + flashcards; wire `#/mental-models` & `#/glossary`; global search; mobile/a11y/**perf incl. code-splitting / lazy-loading** *(bundle ~986 kB / 296 kB gzip after S10a — past Vite's >500 kB note; introduce route-/sim-level lazy-loading here)*; **bilingual QA**. *(web-search to confirm latest facts.)*
- **S11–S12 · Buffer** — extra "maximal" interactives, full UA pass, final QA; optional PDF/LinkedIn pack.

### Standard-conformance track — parity with `database guide` + `Node-js guide` (Waves C1–C4)

> **Why:** the family now shares a Tier-1 bar (see `_standard/GUIDE-AUTHORING-STANDARD.md` §8 and the gap
> analysis `_standard/CLAUDE-GUIDE-PARITY.md`). After cross-port Wave 1 (Node-js got ESLint + multi-gate CI)
> and Wave 2 / database S23 (engine unit tests + a wired SSR/render smoke), **both peers share two halves —
> infra/CI gates *and* a test/correctness layer — and Claude guide has neither wired**, though it is the
> originator of the `gen:meta`/`meta.ts` split (already conformant, do not touch).
>
> **Division of labour (§12, standard §3.4/§3.11):** the agent edits + runs the verify gate in a scratch
> copy; the **owner** runs `npm install`, commits on the `sN-*` branch, and deploys. Sandbox blocks `unlink`
> → build to a fresh `--outDir` (e.g. `dist-s15`); SSR smokes run with the app tsconfig for the automatic
> JSX runtime. Read `_standard/CLAUDE-GUIDE-PARITY.md` for the full gap list + effort/risk before starting.

- **S15 · Wave C1 — infra parity** *(additive, low risk; mirrors Node-js Wave 1)* — add `eslint.config.js`
  (Tier-1 flat config from `_standard/templates/tier1-spa/`) + `"lint": "eslint ."` and fix what it surfaces
  (`// CHANGED (S15)`); **promote** the gitignored `scripts/_integrity-s11.ts` → committed
  `scripts/check-data.ts` + `"check:data"`; add a `"verify"` aggregate (typecheck → lint → check:data →
  build, leaving room for test + smoke); upgrade `.github/workflows/deploy.yml` to the multi-gate order +
  `cancel-in-progress: false`. **Done when:** ESLint green, committed `check:data`, `verify` + CI green.
  **✅ DONE 2026-06-29 — see §14 (S15).**
- **S16 · Wave C2 — test parity** *(the new bar; mirrors database S23)* — port the permanent SSR/render
  smoke (`scripts/smoke.ts` pattern from the database guide: render every sim/figure EN+UK + pages + module
  headers + app-shell hashes), wire `"smoke"` into `verify` + CI; then extract 3–4 algorithmic sims into pure
  `src/lib/*.ts` engines + `scripts/test-*.ts` golden tests (standard §4.5), folded into a `"test"` umbrella.
  **✅ DONE 2026-06-30 — see §14 (S16). Claude guide now holds the full mutual Tier-1 bar (infra + tests).**
- **S17 · Wave C3 — config modernization** — split tsconfig into project references
  (`tsconfig.app.json` + `tsconfig.node.json`, `build = tsc -b && vite build`); add `verbatimModuleSyntax` +
  `erasableSyntaxOnly` + `noUncheckedSideEffectImports`; bump **TS 5.7 → 6** and adopt **`tsx`** for scripts
  (replaces `node --experimental-strip-types`); add `homepage`/`author`/`license` to `package.json`.
- **S18 · Wave C4 — structural (owner-confirm; the big one)** — split the monolithic `src/data/concepts.ts`
  (5,033 lines) into `src/data/modules/m<N>-*.ts` + a thin aggregator; add **`num`** to `Module`; fold
  `SIGNATURE_SIMS` → `signature?: true`. Data-contract change → **confirm with owner first**; `check:data`
  is the safety net after each step. **Recommended stop after C2** (full mutual parity); C3–C4 are polish.

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
- **2026-06-23 · S2 Prompting & workspace** — DONE. Web-verified every product fact first (Anthropic
  prompt-engineering best-practices, Console prompting tools, Projects + RAG help-centre articles).
  **M6 Prompting mastery** fully authored (5 topics: anatomy of a prompt · GCAO & templates · patterns
  few-shot/CoT/self-critique · constraints/schemas/XML · anti-patterns & debugging) with key points,
  pitfalls, 3 interview Q&A, sources. Built the **2nd signature interactive ★ Prompt Anatomy**
  (`PromptAnatomySim` + `promptAnatomy.css`): toggle prompt parts (role·context·task[core]·examples·
  format·constraints) → live assembled prompt + a *simulated* result that shifts across 4 tiers with
  Specificity/Consistency/Tone meters; Bare/Full presets + reduced-motion-gated "Build up" autoplay;
  bilingual. **M7 Projects** fully authored (5 topics: what a Project is · instructions · knowledge &
  the context wall · skills/connectors in a project · project vs chat) + new `ProjectWorkspace` figure
  (walled workspace: knowledge+instructions inside the context wall, skills/connectors compose in).
  Registered both widgets in `registry.tsx`. **Correctness note / user-rule-8 challenge:** the curriculum
  said "*per-project* skills & connectors" — verification showed that's inaccurate (skills are **global +
  dynamic**, connectors are **account/org-level + per-chat**; only knowledge + instructions are
  project-scoped). Authored topic 7.4 to teach that distinction instead. Also captured modern facts:
  **adaptive thinking** (rarely hand-write "think step by step"), **prefill deprecated on 4.6+** (use XML
  output tags), **don't over-prompt** (overtriggers). **Verified (sandbox copy):** `tsc --noEmit` clean ·
  `vite build` OK (37 modules, JS ≈99 kB gzip) · data-integrity ALL PASS (28 modules · 123 topics · 3
  authored; M6 sim + M7 figure resolve; bilingual coverage; ids/orders/seeAlso valid). Workspace holds
  source only (built in scratch to avoid darwin/linux binary mismatch — user runs `npm install` locally).
  **Next (S3): Ch.8 Artifacts; Ch.9 Live Artifacts (embed a tiny live demo).**
- **2026-06-23 · S3 Artifacts & Live Artifacts** — DONE. Web-verified all product facts first
  (Anthropic help-centre "What are artifacts", "Publish and share artifacts", the build-artifacts /
  "AI-powered apps" blog, and the "Prototype AI-powered apps" tutorial). **M8 Artifacts** fully authored
  (4 topics: what artifacts are · 6 core types · inline viz & analytics · editing/versioning/sharing) +
  new `ChatArtifactPanel` figure (chat ↔ artifact window with toolbar) + compare/tables/callouts, key
  points, pitfalls, 2 interview Q&A, sources. **M9 Live Artifacts** fully authored (4 topics: stateful /
  persistent storage · connected Claude-API + MCP · a mini-tool you return to · limits/safety/cost) +
  new `LiveArtifactFlow` figure (3 powers: storage · Claude API · MCP) + per-capability **availability
  table** (API on all plans incl. Free; storage & MCP Pro+; 20 MB · text-only · published-only). Built
  the **embedded "tiny live demo"** `LiveArtifactDemo` (+ `liveArtifactDemo.css`): a Daily-log mini-tool
  with **real localStorage persistence** (survives reload) + a clearly-tagged **simulated** Claude
  "Summarize" call + a capability strip (storage live · API simulated · MCP illustrative); SSR-guarded,
  bilingual, reduced-motion friendly. Registered 1 sim + 2 figures in `registry.tsx`; removed the m8/m9
  stubs; spliced both into `MODULES`. **Correctness note / user-rule-8 challenge:** "**Live Artifacts**"
  is NOT an official Anthropic product name — the real terms are **AI-powered artifacts**, **persistent
  storage** and **MCP integration**. Kept the module title (per curriculum) but added a `senior` callout
  teaching the real naming. **Verified (mounted deps + linux native bindings via `NODE_PATH`):**
  `tsc --noEmit` clean (strict · noUnusedLocals/Parameters) · `vite build` OK (**41 modules**, JS ≈113 kB
  gzip, CSS ≈5.9 kB gzip, 134 ms) · data-integrity **ALL PASS** (28 modules · 123 topics · **5 authored**;
  m8/m9 sim+figure refs resolve; bilingual coverage; table/compare shapes; ids/orders/seeAlso valid).
  Workspace holds source only; `node_modules` untouched. *(Sandbox housekeeping: a stray `.git/index.lock`
  from running `git status` couldn't be unlinked on the mounted FS, so it was renamed to
  `.git/_index.lock.removeme` — safe to delete on your Mac; git is unblocked.)*
  **Next (S4): Ch.10 Context/token mgmt + ★ Token Budget; Ch.11 Connectors & MCP + ★ MCP Flow.**
- **2026-06-23 · S4a Context & token management (M10)** — DONE. Scoped to **M10 only** (one golden
  module + one signature sim) per the user's "quality over speed" cadence; M11 (MCP Flow) deferred to
  S4b. Design agreed first via an interactive **Token Budget mockup** (the visualize tool), then built.
  Web-verified every version-sensitive fact against the **canonical API pricing doc**: token ≈ 4 chars /
  0.75 words; **1M context now FLAT-rate (no surcharge)** on Opus 4.8/4.7/4.6 & Sonnet 4.6 (200K
  standard, Haiku 4.5 = 200K); prices Opus $5/$25 · Sonnet $3/$15 · Haiku $1/$5 per MTok (output 5×);
  prompt caching **cache-hit 0.1× (−90%)**, writes **1.25×** (5m) / **2×** (1h); **Batch −50%**, stacks
  with caching (~5% of standard); **gem:** Opus 4.7+ use a new tokenizer that can use **~35% more
  tokens** for the same text. **M10** fully authored (5 topics: the window & what fills it · Tokens 101 ·
  truncation & "lost in the middle" · cost levers · curate-the-desk strategies) + key points, 3 pitfalls,
  3 interview Q&A, 4 sources. Built the **3rd signature interactive ★ Token Budget** (`TokenBudgetSim` +
  `tokenBudget.css`): toggle context blocks (system · knowledge · skills+tools · memory · conversation ·
  attached file · answer reserve), sliders (turns, file), model select, **200K↔1M** window toggle, and
  **caching/batch** levers → live stacked window bar + truncation warning + 3 cost cards (raw / after
  levers / saved); deterministic, matches published pricing, bilingual, reduced-motion-gated bar
  animation, ARIA. New `ContextWindow` figure (request anatomy + reserved output + "lost in the middle"
  recall curve). Registered 1 sim + 1 figure; removed the m10 stub; spliced m10 into `MODULES`.
  **Verified:** `tsc --noEmit` clean · `vite build` OK (**44 modules**, JS ≈122 kB gzip, CSS ≈6.35 kB
  gzip, 231 ms) · data-integrity **ALL PASS** (28 modules · 123 topics · **6 authored**; m10 ★ in
  SIGNATURE_SIMS; token-budget sim + context-window figure resolve; bilingual; shapes/ids/seeAlso valid).
  *(Note: the working tree had briefly reverted to S2; a `git pull` restored S3 — PR #2
  `s3-artifacts-live-artifacts` — so M8/M9 are committed and present. S4 built cleanly on top.)*
  **Next (S4b): Ch.11 Connectors & MCP + ★ MCP Flow.**
- **2026-06-23 · S4b Connectors & MCP (M11)** — DONE. Web-verified every fact first (official MCP site
  — architecture + transports + the 2025-11-25 authorization spec; Anthropic's "Introducing MCP" launch;
  Claude Help Center "Use connectors" + "Get started with custom connectors using remote MCP").
  **M11** fully authored to golden quality (5 topics: what MCP is · the Connectors Directory (directory
  vs custom) · remote vs local servers · OAuth & permission scopes · walkthroughs Notion/Gmail/Calendar)
  with key points, 3 pitfalls, 3 interview Q&A (senior/senior/staff), 5 sources. Built the **4th signature
  interactive ★ MCP Flow** (`McpFlowSim` + `mcpFlow.css`): step/play/pause through prompt → plan →
  connect → discover (tools/list) → choose → **permission gate** → tool call → external app → result
  back into context → answer, with a **Remote·HTTP / Local·stdio** toggle AND a **Read / Write** toggle.
  Per the user's question, the sim shows **two flagged security gates**: OAuth **consent** on first
  connect (remote only) and a tool-call **approval** gate that is a hard pause for writes but **auto-allows**
  reads ("Always allow") — teaching least-privilege + human-in-the-loop. New `McpArchitecture` figure
  (host + client ↔ MCP server ↔ external app; transport + scoped-OAuth-token + trust boundary). Registered
  1 sim + 1 figure in `registry.tsx`; removed the m11 stub; spliced m11 into `MODULES`.
  **Correctness notes / user-rule-8 challenges:** (1) **"Remote ≠ Anthropic-hosted"** — remote only means
  *reached over HTTP*; the server may be the vendor's or your own. The curriculum's "Anthropic-hosted vs
  local" shorthand is imprecise; the real axis is the **transport** (stdio vs HTTP). Authored a `senior`
  callout teaching this. (2) **Two independent axes** — *directory vs custom* (who built/vetted it) is not
  *remote vs local* (where it runs); added a callout so they aren't conflated. (3) Directory size: third
  parties cite 369–418 (Jun 2026) and disagree, so the copy says **"hundreds, on all plans incl. Free"**
  rather than pinning a number. **Verified (mounted deps + linux arm64 native bindings via `NODE_PATH`):**
  `tsc --noEmit` clean (strict · noUnusedLocals/Parameters) · `vite build` OK (**47 modules**, JS ≈133.7 kB
  gzip, CSS ≈6.6 kB gzip, 243 ms) · data-integrity **ALL PASS** (28 modules · **7 authored**; m11 ★ in
  SIGNATURE_SIMS; mcp-flow sim + mcp-architecture figure resolve; bilingual coverage; table/compare
  shapes; ids/orders/seeAlso valid). Workspace holds source only (built into scratch outDir to dodge the
  sandbox unlink/`emptyOutDir` limit; `node_modules` untouched).
  **Next (S5): Ch.12 Skills + ★ Progressive Disclosure; Ch.13 Building skills; Ch.14 Plugins/marketplaces.**
- **2026-06-23 · S5a Skills — concepts & using them (M12)** — DONE. **Scoped to M12 only** (one golden
  module + one signature sim) per the user's quality-over-speed cadence — like S4a was M10 alone; **M13
  Building skills + M14 Plugins deferred to S5b** (user chose "M12 only, go deepest"). Web-verified every
  fact first against four authoritative pages: the Anthropic engineering blog "Equipping agents for the
  real world with Agent Skills" (anatomy + progressive disclosure + code execution), the **Agent Skills
  API docs overview** (the canonical 3-level token table + field constraints + where-skills-run matrix),
  and the Help-Center "What are skills?" + "Using Skills in Claude". **M12** fully authored to golden
  quality (5 topics: what a Skill is · SKILL.md anatomy · progressive disclosure & token cost [hosts the
  sim] · pre-built skills & where they run · installing/adding skills) with mental model, 5 key points,
  3 pitfalls, 3 interview Q&A (senior/senior/staff), 4 sources. Built the **5th signature interactive
  ★ Progressive Disclosure** (`ProgressiveDisclosureSim` + `progressiveDisclosure.css`): pick a task
  (fill-PDF / summarize-PDF / build-deck / general) → step through L1 metadata (always, ~100 tok/skill)
  → match → L2 read SKILL.md via bash (<5k) → L3 read only the file the task needs + run scripts (code
  never enters context, only output); a live **context bar vs a "load every folder up front" naive bar**
  with a running **saved-%**, plus an **Installed-skills stepper (4→44)** that shows fifty skills barely
  move the budget. Deterministic, bilingual, reduced-motion-gated autoplay + bar transitions, ARIA. New
  `SkillAnatomy` figure (folder tree + exploded SKILL.md: frontmatter=L1 / body=L2 / bundled files & a
  bash-run script=L3). Registered 1 sim + 1 figure in `registry.tsx`; removed the m12 stub; spliced m12
  into `MODULES` (m12 already in SIGNATURE_SIMS).
  **Correctness notes / user-rule-8 challenges & version drift caught:** (1) **UI label** — the current
  claude.ai/desktop path is **Settings > Capabilities** (Help-Center, updated today); the API doc's
  "Settings > Features" is stale. Content uses Capabilities. (2) **Plan availability disagreement** — the
  newest Help article ("Using Skills", updated today) + the API overview say custom-skill upload is
  **Pro/Max/Team/Enterprise + code execution**, but the older "What are skills?" article also lists
  **Free**. Authored the conservative paid-plan + code-execution gating; flagging the Free-vs-paid drift
  here for re-check. (3) Curriculum said pre-built skills "run on claude.ai/API/Bedrock/Foundry" — verified
  and refined to **claude.ai · Claude API · Claude Platform on AWS · Microsoft Foundry** (Code = custom
  only). (4) Fresh facts the curriculum lacked: the **Skills Directory** (partner skills — Notion/Figma/
  Atlassian — paired with their MCP connectors) and the **agentskills.io open standard** (Dec 2025);
  both woven in. **Verified (linux arm64 native bindings — `@rolldown/binding-linux-arm64-gnu` +
  `lightningcss-linux-arm64-gnu` @ matching versions — installed in native `/tmp` and reached via
  `NODE_PATH`; built into a fresh `_ci/dist_ci_*` outDir to dodge the sandbox unlink/`emptyOutDir`
  limit):** `tsc --noEmit` clean (strict · noUnusedLocals/Parameters) · `vite build` OK (**50 modules**,
  JS ≈149 kB gzip, CSS ≈7.2 kB gzip, 205 ms, relative `./assets`) · data-integrity **ALL PASS** (28
  modules · **8 authored**; m12 ★ in SIGNATURE_SIMS, 5 topics; progressive-disclosure sim + skill-anatomy
  figure resolve; **915 bilingual values** non-empty; table/compare shapes; ids/orders/seeAlso valid).
  Workspace holds **source only** — `node_modules` untouched (linux bindings live in `/tmp`); throwaway
  build + the data-integrity script consolidated into the git-ignored `_ci/` folder (sandbox can't unlink
  on the mounted FS — **safe to delete `_ci/` on your Mac**).
  **Next (S5b): Ch.13 Building your own skills; Ch.14 Plugins & marketplaces.**
- **2026-06-23 · S5b Building skills + Plugins (M13–M14)** — DONE. **Stacked on the S5a branch**
  (`s5-skills-progressive-disclosure`, which holds M12 but isn't merged to `main` yet) so Section III
  (M11–M14) builds coherently and `registry.tsx` merges without conflict. *(Branching note for the user
  below.)* Web-verified every fact first: skill authoring (`init_skill.py` scaffold; `scripts/` +
  `references/` + `assets/`; SKILL.md < ~500 lines, ToC for big refs, variant files; `${CLAUDE_SKILL_DIR}`),
  description craft (what+when, third person, ~1024 chars, deliberately **“pushy”** because models
  **under-trigger**; tune with should-/should-not near-miss prompts), testing (baseline compare in a
  **fresh session**, with vs without; the **`skill-creator`** plugin's evals/grading/benchmark/blind-A-B/
  description-tuning loop), packaging (`package_skill.py` → **`.skill`** ZIP; scopes claude.ai/Code/
  plugin/managed; open standard doesn't sync across surfaces), and plugins (a bundle = **skills + agents +
  commands + hooks + MCP** via `.claude-plugin/plugin.json`; a **marketplace** = git repo +
  `marketplace.json`; `/plugin marketplace add` → `/plugin install name@market`; the **“Will install”**
  review since v2.1.145; `claude-plugins-official` built in; Cowork installs from claude.com/plugins).
  **M13** fully authored (5 topics: basic recipe · scripts & resources · descriptions that trigger · test
  & iterate · package & share) + new **`SkillBuildPipeline`** figure (draft→bundle→describe→test→share,
  with an iterate loop), 2 SKILL.md code examples, a weak-vs-strong description **compare**, a scripts/
  refs/assets **table**, 5 key points, 3 pitfalls, 3 interview Q&A, 5 sources. **M14** fully authored
  (4 topics: what a plugin bundles · installing & marketplaces · the role plugins · building & sharing) +
  new **`PluginBundle`** figure (manifest over 5 component chips → marketplace → install → host), a
  skill-vs-plugin **compare**, a components **table**, the **exact 11** Cowork role plugins **table**, an
  install-flow table, a plugin.json tree **code** block, 5 key points, 3 pitfalls, 3 interview Q&A, 4
  sources. Registered both figures in `registry.tsx`; removed the m13/m14 stubs; spliced both into
  `MODULES`. **Correctness notes / user-rule-8:** (1) pinned the **exact 11** open-source role plugins
  from the official `anthropics/knowledge-work-plugins` repo (productivity · sales · customer-support ·
  product-management · marketing · legal · finance · data · enterprise-search · bio-research ·
  cowork-plugin-management) rather than the vague “11 role plugins”; (2) a plugin bundles **five** kinds
  of extension — added **skills** as the fifth alongside the curriculum's “subagents/commands/hooks/MCP”,
  and noted Claude Code also bundles **LSP servers**; (3) captured the modern fact that **custom commands
  merged into skills** (a `.claude/commands/x.md` and a `skills/x/SKILL.md` both make `/x`). **Verified
  (linux arm64 native bindings `@rolldown/binding-linux-arm64-gnu@1.0.3` + `lightningcss-linux-arm64-gnu@1.32.0`
  installed in `/tmp` and reached via `NODE_PATH`; built into a fresh `/tmp` outDir to dodge the sandbox
  unlink/`emptyOutDir` limit):** `tsc --noEmit` clean (strict · noUnusedLocals/Parameters) · `vite build`
  OK (**52 modules**, JS ≈168 kB gzip, CSS ≈7.18 kB gzip, 191 ms, relative `./assets`) · data-integrity
  **ALL PASS** (28 modules · 123 topics · **10 authored**; m13 5 topics, m14 4 topics; skill-build-pipeline
  + plugin-bundle figures resolve; all 6 sim refs registered; **1078 bilingual values** non-empty;
  ids/orders/seeAlso valid; SIGNATURE_SIMS intact). Workspace holds **source only** — `node_modules`
  untouched (linux bindings live in `/tmp`). *(Sandbox housekeeping: renamed a stale `.git/index.lock` →
  `.git/_index.lock.removeme` since the mounted FS blocks unlink — **safe to delete on your Mac**; git is
  unblocked.)* **Branching:** S5b sits on top of S5a — merge order should be **s5 (M12) → then s5b**, or
  simply merge **s5b** (it contains M12 + M13 + M14). **Next (S6): Ch.16 Files/outputs; Ch.17 Scheduled
  tasks (+timeline); Ch.18 Computer use (+3-tiers) — M15 already golden.**
- **2026-06-23 · S6a Cowork core — Files/outputs + Scheduled tasks (M16–M17)** — DONE. **Scoped to M16 +
  M17** per the user's request; **M18 Computer use deferred to S6b**. Web-verified every fact first against
  four canonical Help-Center articles: **Get started with Claude Cowork**, **Schedule recurring tasks in
  Cowork** (dated Apr 9 2026), **Use Claude Cowork safely**, and **Create and edit files with Claude**
  (dated Apr 29 2026). **M16 Files, folders & outputs** fully authored (4 topics: selecting/granting folders
  · read-path vs write-path / scratchpad vs your folder · deliverables & presenting files · safety
  deletes/overwrites/boundaries) with mental model, 5 key points, 3 pitfalls, 3 interview Q&A, 3 sources;
  new **`FileFlow`** figure (uploads + granted folder → agent + sandbox VM → docx/xlsx/pptx/pdf written back,
  with a 🔒 delete/overwrite gate and a lifetime legend: folder persists, sandbox & uploads temporary).
  **M17 Scheduled tasks** fully authored (4 topics: cadence vs one-off · creating a task [/schedule skill +
  Scheduled-page modal] · cadence/cron & the awake rule · managing/debugging) with mental model, 5 key
  points, 3 pitfalls, 3 interview Q&A, 3 sources. Built the **light scheduled-task timeline interactive**
  `ScheduleTimelineSim` (+ `scheduleTimeline.css`): pick a cadence (one-off · hourly · daily · weekdays ·
  weekly) → see the cron + plain-English readout → play a "now" cursor that fires each run and writes a dated
  file; a **"Computer asleep" toggle** demonstrates the verified **skip → catch-up-on-wake** rule (runs in
  the asleep band are skipped, then one catch-up fires at wake). Deterministic, bilingual,
  reduced-motion-gated autoplay/pop, ARIA. Registered 1 sim (`schedule-timeline`) + 1 figure (`file-flow`)
  in `registry.tsx`; removed the m16/m17 stubs; spliced both into `MODULES`.
  **Correctness notes / user-rule-8 challenges & version facts caught:** (1) **No cron textbox** — the
  curriculum's "17.3 Cron-style timing" implies a cron field, but the verified Cowork UI exposes **preset
  cadences only** (hourly · daily · weekly · weekdays · manual); cron is taught as the *underlying mental
  model* (what the scheduler/API use) + a cadence→cron→English mapping table + a `senior` callout, and
  `/schedule` accepts **natural-language timing**. (2) **The awake rule** (the #1 gotcha) — scheduled tasks
  run **only while the computer is awake and Claude Desktop is open**; there is **no cloud cron**; missed
  runs are skipped then caught up once on wake (shown in history). Taught in prose, a `warn` callout, and
  the sim. (3) **Deletion protection holds in both permission modes** ("Ask before acting" / "Act without
  asking") — verified and taught. (4) **30 MB/file** deliverable cap; office files come from the **pre-built
  skills** (docx/xlsx/pptx/pdf) cross-linked to M12; code-execution/file-creation is on **all plans incl.
  Free**, but **Cowork (local-folder access + scheduling) is paid-only** (Pro/Max/Team/Enterprise, Desktop
  macOS/Windows). **Verified (linux arm64 native bindings `@rolldown/binding-linux-arm64-gnu@1.0.3` +
  `lightningcss-linux-arm64-gnu@1.32.0` installed in `/tmp` and reached via `NODE_PATH`; data-integrity run
  via `node --experimental-strip-types`; built into a fresh `/tmp` outDir to dodge the sandbox
  unlink/`emptyOutDir` limit):** `tsc --noEmit` clean (strict · noUnusedLocals/Parameters) · `vite build` OK
  (**55 modules**, JS ≈182 kB gzip, CSS ≈7.58 kB gzip, 193 ms, relative `./assets`) · data-integrity
  **ALL PASS** (28 modules · **12 authored**; m16 4 topics/12 blocks · m17 4 topics/14 blocks; file-flow
  figure + schedule-timeline sim resolve; table widths == head, compare rows 3-tuples, callout tones valid;
  bilingual coverage; ids/orders/seeAlso valid; SIGNATURE_SIMS intact). Workspace holds **source only** —
  `node_modules` untouched (linux bindings live in `/tmp`); no `dist/` or git lock left on the mounted FS.
  **Next (S6b): Ch.18 Computer use (+3-tiers); then Section V (M19 onward) / S7.**
  *(Landed: committed as `feat(s6): author M16 + M17` on `s6-cowork-files-scheduled-tasks`, merged to `main` via PR #7.)*
- **2026-06-23 · S6b Cowork core — Computer use (M18)** — DONE. Built straight on `main` (after S6a's PR #7
  merge) to finish Section IV's Cowork-core trio. Web-verified every fact first against three authoritative
  pages: **Let Claude use your computer in Cowork** (Help-Center, Apr 24 2026), the **Claude Code "Desktop
  application" docs** (the canonical per-app access-tier table + "when computer use applies"), and **Use
  Claude Cowork safely**. **M18 Computer use** fully authored (4 topics: when Claude drives your screen ·
  the three tiers of acting · granting apps & access tiers · link & financial safety) with mental model,
  5 key points, 3 pitfalls, 3 interview Q&A, 3 sources. New **`ActingTiers`** figure (a precise-first
  funnel: connector → browser → computer use, widening = broader reach / less precision, with a dashed
  "sandbox ends here" line and the per-app caps note). Registered the figure in `registry.tsx`; removed the
  m18 stub; spliced m18 into `MODULES`.
  **Correctness notes / user-rule-8 challenges:** (1) **Two different "tiers"** — the curriculum's 18.2
  "3 tiers (connector→browser→computer)" and 18.3 "tiers (read/click/full)" are *distinct concepts*: the
  former is *which mechanism* Claude reaches for (precise-first ordering), the latter is *how much control*
  a granted app gets. Authored a prose distinction + separate figure (acting) and table (access) so they
  aren't conflated. (2) **Official tier names** — verified the access tiers are **View only · Click only ·
  Full control** (the "read/click/full" shorthand is informal); used the official names. View-only =
  browsers + trading platforms, Click-only = terminals/IDEs, Full = everything else; **fixed by category**.
  (3) **Availability** — computer use is a **research preview on Pro/Max only** (NOT Team/Enterprise),
  Desktop macOS/Windows, **off by default** (Settings→General; macOS also needs Accessibility + Screen
  Recording) — narrower than the rest of Cowork (which is all paid plans). (4) **No sandbox** (unlike the
  code VM) + screenshots see everything + trading/crypto blocked by default + the **cross-app link trap**
  (a link in an allowed app can open in another app you didn't grant) — all taught. **Verified (linux arm64
  native bindings via `NODE_PATH`; data-integrity via `node --experimental-strip-types`; built into a fresh
  `/tmp` outDir):** `tsc --noEmit` clean (strict · noUnusedLocals/Parameters) · `vite build` OK (**56
  modules**, JS ≈189 kB gzip, CSS ≈7.58 kB gzip, 190 ms, relative `./assets`) · data-integrity **ALL PASS**
  (28 modules · **13 authored**; Section IV M15–M18 all authored; m18 4 topics/11 blocks; acting-tiers
  figure resolves; table widths == head, compare 3-tuples, callout tones valid; bilingual; ids/seeAlso
  valid). Workspace holds **source only** — `node_modules` untouched; no `dist/` or git lock on the mounted FS.
  **Next (S7): Section V — M19 Cowork projects/connectors/plugins/mobile; M20 Claude in Chrome; M21 Excel/PowerPoint.**
- **2026-06-23 · S7 Section V — Cowork advanced + Chrome + Office (M19–M21)** — DONE. Authored all three to
  golden quality after web-verifying every fact against the Help Center: Cowork **projects** (Apr 9) ·
  **Assign tasks from anywhere / Dispatch** · **Get started with Claude in Chrome** (Apr 27) + Chrome
  **permissions** + Chrome **safety** · **Use Claude for Excel** · **Use Claude for PowerPoint** · **Work
  across Microsoft 365 apps** (May 7). **M19 Cowork projects, connectors, plugins & mobile** (4 topics) + 2
  figures (`cowork-project`, `dispatch-flow`). **M20 Claude in Chrome** (4 topics) + the **light interactive
  `browser-agent-loop`** — perceive→reason→act→observe with the *real* permission model wired in (plan +
  per-domain prompts in “Ask before acting”; protected actions always-gated in **both** modes; interactive
  Approve/Decline; step/play/pause, reduced-motion, bilingual, ARIA). **M21 Claude for Excel & PowerPoint**
  (4 topics) + figure `excel-citations` (cell-level citation provenance + cross-app strip). Registered **1
  sim + 3 figures** in `registry.tsx`; removed m19/m20/m21 stubs; spliced into `MODULES`. **Section IV now
  complete (M15–M19); Section V started (M20, M21 done; M22–M24 pending).**
  **Correctness notes / user-rule-8 challenges:** (1) **Connectors & plugins are account-level, NOT
  project-scoped** — only **Instructions + Context** are scoped to a Cowork project; corrected the
  curriculum’s “connectors in Cowork” framing. (2) **Dispatch is Pro/Max only** (narrower than Cowork = all
  paid) and **routes** dev→Claude Code / knowledge→Cowork over **one** persistent phone↔desktop thread on an
  **awake** desktop. (3) **Office agents are GA on ALL paid plans** (Pro/Max/Team/Enterprise) — the §12
  “Opus 4.6; Max/Team/Ent” note was **stale**; no model asserted; Excel has **no** data tables/macros/VBA.
  (4) **“Shared context with PowerPoint” is imprecise** — within one app Instructions+history are **separate**
  Excel↔PPT; the real shared context is the distinct opt-in **“Work across Microsoft 365 apps”** (Excel/PPT/
  Word/Outlook, **open files only**, default on Pro/Max · off Team/Enterprise). (5) **Chrome on Pro = Haiku
  4.5 only** (Max/Team/Ent pick Opus 4.7 / Sonnet 4.6 / Haiku 4.5); Chrome-only; still **beta** (contrast:
  Office agents are GA). (6) Authored to render cleanly under the tiny `Md` (no single-`*` italics; compare
  cells stay plain). **Verified** (linux arm64 bindings `@rolldown/binding-linux-arm64-gnu@1.0.3` +
  `lightningcss-linux-arm64-gnu@1.32.0` in `/tmp` via `NODE_PATH`; built into a fresh `/tmp` outDir to dodge
  the sandbox unlink/`emptyOutDir` limit): `tsc --noEmit` clean (strict · noUnusedLocals/Parameters) ·
  `vite build` OK (**61 modules**) · data-integrity **ALL PASS** (28 modules · **16 authored**; m19/m20/m21
  4 topics each; browser-agent-loop sim + cowork-project/dispatch-flow/excel-citations figures resolve; **8
  sim + 14 figure keys**; **1516 bilingual values** non-empty; table widths == head, compare 3-tuples,
  callout tones valid; ids/seeAlso valid; **SIGNATURE_SIMS intact** — m20 stays a LIGHT sim, not ★). No
  ESLint config exists; the lint gate is TypeScript strict (passed). Workspace holds **source only** —
  `node_modules` untouched. **Next (S8): M22 Claude Code essentials; M23 Sub-agents/teams/worktrees +
  ★ Sub-agent Fan-out; M24 hooks/slash commands/advanced patterns.**
- **2026-06-23 · S8 Claude Code & agentic (M22–M24)** — DONE; **all three modules in one session** per the
  user's choice. Web-verified facts first: fanned out **3 parallel research agents** (one per module) over
  the official Claude Code docs, then did my own grounding fetches of the **hooks reference**, **sub-agents
  doc**, and searches confirming the agent-teams launch, the C-compiler post and Dynamic Workflows.
  **M22 Claude Code essentials** (5 topics: two ways in + environments · models/effort/permissions ·
  CLAUDE.md the project brain · plan mode + verification · MCP in Code) + new **`CodeArchitecture`** figure,
  a permission-mode table, settings.json + `claude mcp add` code, and a meta callout (this guide *is* built
  from a CLAUDE.md). **M23 Sub-agents, agent teams & worktrees** (4 topics) + the **7th & final signature
  interactive ★ Sub-agent Fan-out** (`SubAgentFanoutSim` + `subAgentFanout.css`): Solo-vs-Fan-out toggle ×
  2–4 tasks → step through goal→split→spawn→parallel→return→merge with three live meters (wall-clock · main
  context · token cost) that teach the trade-off (fan-out buys time + a clean window, costs more tokens,
  only on **independent** work); + new **`AgentScales`** figure (sub-agents → background agents → agent
  teams). **M24 Hooks, slash commands & patterns** (4 topics) + new **`HookLifecycle`** figure, a hook-event
  table, settings.json hooks + custom slash-command code, and a patterns table. Registered **1 sim + 3
  figures** in `registry.tsx`; removed the m22/m23/m24 stubs; spliced all three into `MODULES`.
  **Correctness notes / user-rule-8 challenges & version facts:** (1) **Rejected hallucinated/over-specific
  agent claims** — a “Fable 5” Code model, a Managed-Agents “dreaming” feature, “31 hook events”, and
  fake-precision numbers (0.4%/17% classifier rates, exact patch versions). Models for Code stay the §12
  three (Opus 4.8 · Sonnet 4.6 · Haiku 4.5). **Grounded the real hook-event set** against the official hooks
  reference: SessionStart · UserPromptSubmit · PreToolUse (can block) · PostToolUse/PostToolUseFailure ·
  PermissionRequest · SubagentStart/Stop · Stop/StopFailure · PreCompact/PostCompact · SessionEnd (+ newer
  team/worktree events: TaskCreated/Completed, WorktreeCreate/Remove, TeammateIdle). (2) **Agent teams =
  Feb 5 2026 with Opus 4.6** confirmed (matches §12); verified the **parallel-Claudes C compiler** (16 Opus
  4.6 agents → a ~100k-line C compiler **written in Rust** that builds Linux 6.9 on x86/ARM/RISC-V, ~2,000
  sessions, ~$20k, coordinated via Git + a Docker container per agent + a lock-file task queue). (3) **Taught
  the verified three-scale framing** the curriculum lacked: sub-agents (one session) → **background agents**
  (`/agent-view`, many parallel sessions, no talking) → agent teams (`/agent-teams`, sessions that message +
  git-coordinate). (4) **Dynamic Workflows** (June 2 2026, research preview) confirmed: Claude writes its own
  JS **harness**, up to ~1,000 subagents, do→adversarial-review→apply loop; targets agentic laziness /
  self-preferential bias / goal drift. (5) **Custom commands ↔ Skills merged** (consistent with S5b);
  **output styles** change persona via system prompt (Explanatory/Learning + custom), not the model; kept
  **Claude Agent SDK** (renamed from Claude Code SDK) + headless `-p`. **Verified** (linux arm64 bindings
  `@rolldown/binding-linux-arm64-gnu@1.0.3` + `lightningcss-linux-arm64-gnu@1.32.0` in `/tmp` via `NODE_PATH`;
  data-integrity via `node --experimental-strip-types`; built into a fresh `/tmp` outDir to dodge the sandbox
  unlink/`emptyOutDir` limit): `tsc --noEmit` clean (strict · noUnusedLocals/Parameters) · `vite build` OK
  (**66 modules**, JS ≈805 kB / 243 kB gzip, CSS ≈44 kB / 8.06 kB gzip, 234 ms, relative `./assets`) ·
  data-integrity **ALL PASS for authored content** (28 modules · **19 authored**; **9 sim + 17 figure keys**,
  every ref resolves; m23 ★ in SIGNATURE_SIMS with the `sub-agent-fanout` block; **1708 bilingual values**
  non-empty; table widths == head, compare 3-tuples, callout tones valid; ids/orders/seeAlso valid). The only
  check “failures” are the **9 still-stub modules** (M1–M5, M25–M28) with no sources yet — expected.
  **Lazy-loading decision (user, 2026-06-23):** keep the single Vite bundle through S8/S9; introduce
  route-/sim-level **code-splitting (lazy-loading) at S10** as a polish step — the bundle is now ≈805 kB
  (243 kB gzip) and tripped Vite's >500 kB note, so it's recorded in §13 S10 so it isn't forgotten. No ESLint
  config exists; the lint gate is TypeScript strict (passed). Workspace holds **source only** — `node_modules`
  untouched; build + check artifacts live only in `/tmp` (nothing left on the mounted FS).
  **Next (S9): beginner block M1–M5** (reuses the components built across S1–S8).
- **2026-06-23 · S9 Beginner block — Foundations & first steps (M1–M5)** — DONE; **all five modules in one
  session** per the user's "same depth" instruction. Web-verified every version-sensitive fact first by
  fanning out **4 parallel research agents** (M1 models/plans/apps · M2 interface/settings · M4
  attachments/styles/voice · M5 memory/search) over the official Help Center, Privacy Center, docs and
  release notes. **Section I is now complete (M1–M5).** Authored to golden depth: **M1 What is Claude** (5
  topics: assistant+context+tools · the model family · where Claude lives · plans & access · can/can't),
  **M2 Interface & settings tour** (5: chat layout · model/effort/thinking · settings · privacy & billing ·
  organizing/Incognito), **M3 Talking to Claude** (5: what a prompt is · context · being specific ·
  iterating · beginner mistakes), **M4 Attachments, styles & voice** (4: files/images · styles · voice ·
  output formats), **M5 Memory & chat search** (4: what Memory stores · global vs project · controls ·
  import/search). Built **6 new SVG figures** (claude-mental-model, where-claude-lives, interface-map,
  prompt-flow, style-pipeline, memory-across-sessions) and registered them; no new sim (beginner block
  reuses components and cross-links the existing sims — Prompt Anatomy M6, Agent Loop M15 — via seeAlso).
  **Correctness notes / user-rule-8 challenges & version drift caught:** (1) **Chat uploads are 500 MB/file,
  up to 20 files/chat** (images ≤ 8000×8000 px) — the "30 MB" figure in §12 is correct only for **Cowork
  deliverables / Project files**, a different context; M4 teaches the 500 MB chat-upload limit and notes the
  30 MB project-file cap. (2) **Writing styles are migrating into Skills** — Concise/Explanatory/Formal
  presets are being retired, "Learning" becomes a Skill, custom styles auto-migrate (disabled by default,
  re-enable under Customize → Skills), and the styles menu will disappear; M4 teaches styles **with a
  prominent "moving to Skills" `warn` callout** + cross-link to M12 rather than presenting the menu as
  permanent. (3) **No official claude.ai keyboard-shortcut reference exists** — only the Mac quick-entry
  (double-tap Option) + Caps-Lock dictation and the composer "/" and "+" menus are documented; the curriculum's
  planned "Keyboard shortcuts" topic was **honestly reframed** (M2 t5) as "there isn't a big official sheet"
  rather than fabricating a table. (4) **Memory timeline** — Memory has existed since **Sept 2025** (paid),
  reaching **Free on 2026-03-02**; M5 says "all plans incl. Free (Free since March 2026)" without implying
  the feature itself is that new. **Memory is two spaces** (global + a separate, walled per-project memory) —
  taught explicitly. **Chat search is paid-only** and distinct from Memory (on-demand RAG retrieval vs
  always-on summary). (5) **Fable 5 / Mythos 5** exist on the developer platform (launched 2026-06-09) but
  are **API-only, never in the consumer chat picker, and currently suspended** (US-gov export directive,
  2026-06-12) — so the beginner "model family" stays the three consumer chat models (Opus 4.8 · Sonnet 4.6 ·
  Haiku 4.5); a `senior` callout notes "Anthropic also ships more models on its developer platform" without
  pinning the volatile preview models. (6) **Opus 4.8 reliable knowledge cutoff = ~January 2026** (now
  officially published) — taught in the knowledge-cutoff callout. (7) Personalization field is **"Instructions
  for Claude"** (no confirmed "What should Claude call you"); **Incognito** is the real feature name; there is
  **no "folders"** feature (organization = Projects + star). **Verified** (linux arm64 bindings
  `@rolldown/binding-linux-arm64-gnu@1.0.3` + `lightningcss-linux-arm64-gnu@1.32.0` installed in `/tmp` and
  reached via `NODE_PATH`; data-integrity via `node --experimental-strip-types`; built into a fresh `/tmp`
  outDir to dodge the sandbox unlink/`emptyOutDir` limit): `tsc --noEmit` clean (strict ·
  noUnusedLocals/Parameters) · `vite build` OK (**72 modules**, JS ≈900 kB / 270 kB gzip, CSS ≈44 kB /
  8.06 kB gzip, 248 ms, relative `./assets`) · data-integrity **ALL PASS** (28 modules · **24 authored**;
  Section I M1–M5 all authored with 5/5/5/4/4 topics; **9 sim + 23 figure keys**, every ref resolves; the 6
  new figures registered; **2060 bilingual values** non-empty; table widths == head, compare 3-tuples,
  callout tones valid; ids/orders/seeAlso valid; **SIGNATURE_SIMS intact**). No ESLint config exists; the
  lint gate is TypeScript strict (passed). Workspace holds **source only** — `node_modules` untouched; build
  + check artifacts live only in `/tmp` (nothing left on the mounted FS). *(Sandbox housekeeping: renamed the
  stale `.git/index.lock` → `.git/_index.lock.removeme` since the mounted FS blocks unlink — **safe to delete
  on your Mac**.)*
  **Next (S10): Section VI — M25 Security; M26 Choosing the right tool + ★ Tool Picker (last signature sim);
  M27 Ecosystem map; M28 Mental models + glossary; plus perf (code-splitting/lazy-loading) & bilingual QA.**
- **2026-06-23 · S10a Mastery — Security + Tool-choice + Ecosystem (M25–M27 + ★ Tool Picker)** — DONE.
  **Scope locked with user**: M25–M27 + the **last signature interactive (★ Tool Picker)** this session; **M28
  (mental-models gallery + glossary + cheat-sheet + flashcards) + perf/QA deferred to S10b** — the user asked
  for my recommendation and I argued the natural seam is *teaching* (M25–M27) vs the *revision layer* (M28 =
  study-UI + new datasets, a different build that shouldn't be rushed at a marathon's tail). Web-verified facts
  first via **2 parallel research agents** (M25 security posture; M26/M27 surface capabilities) over the Help
  Center + Anthropic engineering/research. **M25 Security** (5 topics: permissions/least-privilege · prompt
  injection · link safety & data boundaries · financial/human-in-the-loop · a practical checklist) + new
  **`TrustBoundaries`** figure (the two-condition model: an injection needs the READ gate AND the ACT gate —
  close either). **M26 Choosing the right tool** (4 topics) + the **7th & final signature sim ★ Tool Picker**
  (`ToolPickerSim` + `toolPicker.css` + new **`decide.ts`** data/scoring): answer 3 facets (what the work
  touches · autonomy · plan) → the 7 surfaces rank live (deterministic; `where` dominates ×10, autonomy
  tie-breaks, paid surfaces gated+tagged on Free); powers **both** the M26 sim block **and** the now-live
  **`#/decide`** page (new `DecidePage`, replaced the StubPage) + new **`ToolMatrix`** figure. **M27 Ecosystem
  map** (3 topics) + new **`EcosystemLayers`** figure (models → apps → context → capabilities → orchestration,
  security cross-cutting). Registered 1 sim + 3 figures in `registry.tsx`; spliced m25/m26/m27 into `MODULES`,
  removed them from `planned` (only m28 stub left). Added a **`.callout.security`** style (red boundary accent —
  it was used 17× in content but never styled; marked `/* CHANGED (S10a) */`).
  **Correctness notes / user-rule-8 challenges & drift caught:** (1) **Access-tier names belong to Claude Code
  Desktop**, not the Cowork computer-use article — the Cowork page only documents per-app allow/deny + blocked
  categories; M25 attributes *View only / Click only / Full control* to "the desktop computer-use engine" and
  cross-links M18 rather than overclaiming it's Cowork-specific (the §12 S6b framing is looser than the source).
  (2) **Injection-robustness % is model+date-specific** — the "~1% attack success" figure is **Opus 4.5, Nov
  2025 testing**; M25 cites it with that attribution + Anthropic's own "still meaningful risk; no browser agent
  is immune," and does NOT pin a number to the current flagship (the §12 "Opus 4.7 ~0.1%" could not be
  re-confirmed — flagged). (3) **Excel/PPT are GA on all paid plans** (no beta), **Sonnet 4.6 is the Free/Pro
  default**, **Free = 1 custom connector** — folded into the M26 matrix/Tool Picker gating. (4) Skipped the
  contested Auto-Mode 0.4%/17% classifier numbers (rejected as fake-precision back in S8) and taught the
  qualitative point instead. **Verified** (linux arm64 bindings `@rolldown/binding-linux-arm64-gnu@1.0.3` +
  `lightningcss-linux-arm64-gnu@1.32.0` in `/tmp` via `NODE_PATH`; data-integrity via `node
  --experimental-strip-types`; built into a fresh `/tmp` outDir to dodge the sandbox unlink/`emptyOutDir`
  limit): `tsc --noEmit` clean (strict · noUnusedLocals/Parameters) · `vite build` OK (**79 modules**, JS
  ≈986 kB / 296 kB gzip, CSS ≈46.9 kB / 8.45 kB gzip, 239 ms, relative `./assets`) · data-integrity **ALL PASS**
  (28 modules · **27 authored**; m26 ★ in SIGNATURE_SIMS with the `tool-picker` block; 10 sim + 26 figure keys,
  every ref resolves incl. trust-boundaries/tool-matrix/ecosystem-layers; **2324 bilingual values** non-empty;
  table widths == head [the check caught one 3-vs-4 Chrome row → fixed], compare 3-tuples, callout tones valid;
  Tool Picker scoring spot-checks pass — files→Cowork, code→Code, web→Chrome[gated on Free], app/free→Connector,
  expertise→Skill). No ESLint config exists; the lint gate is TypeScript strict (passed). Workspace holds
  **source only** — `node_modules` untouched; build + check artifacts live only in `/tmp`. *(Sandbox
  housekeeping: renamed the stale `.git/index.lock` → `.git/_index.lock.removeme` — mounted FS blocks unlink —
  **safe to delete on your Mac**.)*
  **Next (S10b): M28 mental-models gallery + glossary (`glossary.ts`) + cheat-sheet + flashcards; wire
  `#/mental-models` & `#/glossary`; then perf (code-splitting/lazy-loading) + bilingual QA.**

- **2026-06-24 · S10b Revision layer + perf + bilingual QA (M28 + study surfaces)** *(branch
  `s10b-revision-glossary-codesplit`)* — Completed the guide: authored the **final module M28** and built the
  whole **revision/study layer**, then did the **full S10b scope** the user chose ("Everything in S10b" via
  AskUserQuestion) — including the **code-splitting** and a **bilingual QA** sweep. **All 28 modules are now
  authored (no stubs left); the `mod()` stub-builder and the unused `Level` import were removed.**
  **M28 · Mental models, glossary & cheat-sheet** `[middle]` (4 topics: the gallery · the bilingual glossary ·
  the **one-printable-page cheat-sheet** · flashcards & self-check) — cheat-sheet built as **six recap tables**
  (consumer models + $/MTok, the three cost levers, the M26 tool-choice recap, plan-gates/limits, capability
  one-liners) + an active-recall compare + security/prompting one-liner callouts; mental model, 5 keyPoints, 3
  pitfalls, 3 interview Q&A, 4 web-verified sources. Web-re-checked the headline facts (Opus 4.8 $5/$25 · Sonnet
  4.6 $3/$15 · Haiku 4.5 $1/$5; Batch −50% / caching −90%; Fable/Mythos stay developer-platform-only) — all still
  current, matching the existing `concepts.ts`.
  **New study surfaces (the long-deferred `#/mental-models` & `#/glossary` are now live, replacing the StubPages):**
  · **`src/data/glossary.ts`** — a comprehensive bilingual term bank, **119 terms** across 10 categories
  (models/plans · prompting · context · connectors/MCP · skills/plugins · cowork · tools/code · agentic ·
  security · general), definitions EN+UA with **technical terms kept English**, each cross-linked to its
  module(s) — **covers all 28 modules**. · **`MentalModelsPage`** (`#/mental-models`) — all 28 mental models as
  per-section-tinted flip-cards with a **flashcard self-check mode** (recall → reveal → mark *known*/*again*,
  *hide-known*, **shuffle**, progress counter, **localStorage-persisted** known-set + reset), live filter, level-
  aware, ARIA (`aria-pressed`/`aria-live`) + reduced-motion-safe. · **`GlossaryPage`** (`#/glossary`) — live
  search + category chips + **A–Z grouping**, two-column on wide screens, term→module link chips. Reused the
  S1 `.mm-*` card base + `.fbtn` chips; appended a `CHANGED (S10b)` block to `global.css` (gallery/glossary
  styles + lazy-load placeholders + an **`@media print`** stylesheet so M28 prints as a clean one-pager — chrome
  hidden, surfaces lightened, tables `break-inside: avoid`). Page-specific copy uses inline `t({en,uk})` like
  `DecidePage` (nav labels already in `ui.ts`).
  **Perf — code-splitting / lazy-loading (the §13 S10 item):** rewrote `registry.tsx` so the **10 sims + 26
  figures are `React.lazy` dynamic imports** (named-export adapters), wrapped sim/figure render in `<Suspense>`
  in `Block.tsx`; **lazy-loaded the 5 route pages** in `App.tsx` behind one `<Suspense>` (shell TopBar/Sidebar/
  Footer stay eager for instant nav + search); added a **`react-vendor` manualChunk**. Result: the single
  **monolith 1,069 KB / 323.6 KB gzip → app entry 625 KB / 195.6 KB gzip** + a cacheable **react-vendor 190 KB /
  59.7 KB gzip**, and **44 JS + 11 CSS chunks** total — each sim's co-located CSS now splits into its own
  on-demand chunk, and a module page pulls only the widgets it renders. The remaining entry weight is
  **`concepts.ts` (all 28 modules' bilingual content)**, which TopBar (search) + Sidebar (nav) import eagerly —
  the documented next lever (**split module *metadata* from *bodies* + a prebuilt search index**) is left as a
  deliberate future step, exactly as §13 flags ("may need a lightweight prebuilt index"); did **not** attempt it
  to avoid breaking global search.
  **Verification (repo + scratch, linux-arm64; bindings `@rolldown/binding-linux-arm64-gnu@1.0.3` +
  `lightningcss-linux-arm64-gnu@1.32.0` in `/tmp` via `NODE_PATH`; built into fresh `/tmp` outDirs to dodge the
  sandbox unlink/`emptyOutDir` limit):** `tsc --noEmit` ✓ (strict · noUnusedLocals/Parameters — caught & fixed
  the now-unused `Level` import + `UI` import in App) · **data-integrity** ✓ (6 sections · **28 modules, 28/28
  authored** · orders 1..28 · table widths == head · compare 3-tuples · callout tones · **10 sim + 25 used
  figure keys resolve** against the new lazy registry · seeAlso valid · **glossary 119 terms unique, categories/
  module-links valid, covers all 28** · **2596 Localized pairs, all EN+UA non-empty**) · **bilingual QA** — the
  EN==UA heuristic flagged only **5 legitimately-identical** strings (UI menu paths, a pricing line, technical-
  term lists, a verbatim SKILL.md example), none from the new M28/glossary content · **render smoke** ✓
  (`react-dom/server` of `MentalModelsPage` + `GlossaryPage` inside `LangProvider` — gallery renders the
  flashcard control + M15..M28, glossary renders the MCP definition + a category label) · `vite build` ✓ (**82
  modules**, 44 JS / 11 CSS chunks).
  **Challenges / notes:** (1) **npm-prune gotcha** — installing `tsx` into the `/tmp` bindings dir with
  `--no-save` **pruned** the earlier `--no-save` rolldown/lightningcss linux bindings (npm reconciles
  node_modules against package.json), which broke the next build with `Cannot find module …binding`; fixed by
  reinstalling **all three together**. Worth noting for future sandbox sessions: install every `--no-save`
  helper in one `npm install`. (2) **`StubPage.tsx` is now orphaned** (only M-models/glossary used it) — left in
  place (harmless, reusable; sandbox can't unlink) — **safe to delete on your Mac**. (3) No scripts/`_smoke`
  files were written into the repo this session — the data-integrity + render-smoke scripts live only in `/tmp`,
  so **nothing to clean up in the repo** and no stale `.git/index.lock`.
  **Status: the teaching guide is content-complete — 28/28 modules authored, all 7 signature sims + 2 light
  interactives, 3 study surfaces (`#/mental-models`, `#/glossary`, `#/decide`) live, code-split & bilingual-QA'd.**
  **Next (S11–S12 buffer, optional): the metadata/body data-split + prebuilt search index (to shrink the 625 KB
  entry further); a final full UA proofreading pass; optional PDF/LinkedIn pack.** **Pending user:** repo is live
  (§11) — S10b appears live once committed & **merged to `main`**; locally `npm install` (darwin-arm64) +
  `npm run build`. *(Landed: committed `6ee9f14 feat(s10b): author M28 + glossary/gallery study surfaces;
  route/sim code-splitting`, merged to `main` via PR #13.)*

- **2026-06-24 · S10c Data-split — metadata/body separation + prebuilt index** *(branch
  `s10c-data-split-meta-index`; built on `main` after the PR #13 merge)* — Did the **§13-flagged "next lever"**
  the user green-lit: split the module **metadata** from the **bodies** so `concepts.ts` (~600 KB of content)
  **no longer ships in the initial bundle**. **Result: the eager entry chunk dropped 625 KB → 59 KB raw
  (195.6 → 20.0 KB gzip)**; the bodies moved into the **lazy `ModulePage` chunk** (623 KB / 193 KB gzip) that
  loads only on first module open. **First-paint payload (landing) ≈ 85 KB gzip** (index 20 + react-vendor 59 +
  EcosystemMap 0.75 + css 5.6) — down from the original ~324 KB-gzip monolith (**~74% smaller initial JS/CSS**).
  **How:** new **`scripts/genMeta.ts`** codegen reads `concepts.ts` (the content SSOT) and emits
  **`src/data/meta.json`** (the prebuilt nav/search index: per-module id/section/order/level/title/tagline/
  mentalModel/readMins/topic id+title/seeAlso/**authored** + sections + signatureSims). New typed
  **`src/data/meta.ts`** loads that JSON and re-exports `MODULES`(meta)/`SECTIONS`/`SIGNATURE_SIMS`/`modulesOf`/
  `moduleById`/`sectionById`/`prevNext`/`isAuthored` under the **same names** as `concepts.ts`, so consumers
  swapped only the import path. **Repointed every metadata consumer → `meta.ts`:** the eager shell **TopBar**
  (search), **Sidebar** (nav), **Footer** (counts), plus the lazy **EcosystemMap**, **MentalModelsPage**,
  **GlossaryPage** and **ToolPickerSim**. **`ModulePage` is now the ONLY importer of `concepts.ts`** (full
  bodies via `moduleById`+`isAuthored`) and it's lazy → `concepts.ts` rides its on-demand chunk. **npm scripts:**
  `gen:meta` (`node --experimental-strip-types --disable-warning=ExperimentalWarning scripts/genMeta.ts`) wired
  as **`prebuild`** *and* **`predev`** so the index is regenerated before every build/dev — **production never
  ships stale metadata**; `meta.json` is **committed** (like a lockfile). Global search still works (it only ever
  indexed title/tagline/topic-titles — all in meta), so no behaviour change.
  **Verification (linux-arm64; `/tmp` bindings via `NODE_PATH`):** `tsc --noEmit` ✓ (strict) · **`gen:meta`** ✓
  (28 modules · 6 sections · 7 sims; **deterministic** — re-run leaves `meta.json` byte-identical) ·
  **meta-sync check** ✓ (a new script asserts every module's order/level/section/title/tagline/mentalModel/
  topics/seeAlso/**authored** in `meta.json` matches `concepts.ts` — 0 drift) · **data-integrity** ✓ (re-run:
  ALL PASS) · **render smoke** ✓ (`MentalModelsPage` + `GlossaryPage`, now meta-backed, still render via
  `react-dom/server`) · `vite build` ✓ (**84 modules**, 44 JS + 11 CSS chunks; entry `index` **59 KB / 20 KB
  gzip**, `react-vendor` 190/59, lazy `ModulePage` 623/193, `GlossaryPage` 54/19). **Only `concepts.ts` is now
  imported by a lazy route** (verified by grep).
  **Challenges / notes:** (1) the codegen depends on Node 22's `--experimental-strip-types`; the project pins
  Node 22 (user 22.17, CI `setup-node@22`), and `--disable-warning=ExperimentalWarning` keeps build output clean
  — if a future Node drops the flag, set `gen:meta` to a tsx/esbuild runner instead. (2) `meta.json` is a
  **generated, committed artifact** — after editing module **metadata** (title/tagline/mentalModel/topics/level/
  order/seeAlso) in `concepts.ts`, it's regenerated automatically by `predev`/`prebuild`, or run `npm run
  gen:meta`; the meta-sync check catches drift. (3) authoring workflow is **unchanged** — content is still edited
  only in `src/data/concepts.ts`. (4) the Node-side codegen imports `node:fs/url/path`, which the app
  `tsconfig.json` (`types: []`, `include: ["src"]`) doesn't type — so editors flagged `TS2307 Cannot find module
  'node:fs'`. Fixed by adding **`@types/node`** (devDep) + a dedicated **`tsconfig.node.json`** (`include:
  ["scripts/**/*.ts","vite.config.ts"]`, `types: ["node"]`); `typecheck` now runs **both** projects
  (`tsc --noEmit && tsc -p tsconfig.node.json --noEmit`). The app build (`tsc && vite build`) is unchanged
  (still app-only); **run `npm install`** to pull `@types/node`. **Suggested branch `s10c-data-split-meta-index`;
  commit `perf(s10c): split module metadata (meta.json + meta.ts) from bodies; entry 625→59 KB`.**
  **Status: guide content-complete AND the documented data-split shipped — initial JS/CSS ≈85 KB gzip.**
  **Next (optional buffer): final full UA proofreading pass; optional PDF/LinkedIn pack; per-module body chunks
  (split the 623 KB `ModulePage` body chunk further) only if module-open latency ever warrants it.**

- **2026-06-25 · S11 Polish #1 — P1 fixes + M4 visual + ★ M25 Two-Gate sim** *(branch `s11-fixes-m4-m25-twogate`)* —
  First **polish/enhancement** session against `POLISH-PLAN.md` (guide is content-complete; no new modules). Shipped the
  plan's recommended first slice: **Q1 P1 fixes → wire `style-pipeline` into M4 → ★ M25 Two-Gate sim → verify.**
  **Q1 P1 fixes (all 6):** (1) **duplicate flashcard "Reveal"** — `MentalModelsPage` rendered both the full-width
  `.mm-prompt` *and* an actions-row "Reveal"; the actions row now renders only when it has a control (`!flash || isOpen`),
  so a hidden card shows the single `.mm-prompt` affordance. (2) **"27 vs 28 modules"** — dropped the ambiguous "27 modules"
  framings in M28's `mentalModel` ("the whole guide") and the t2 glossary prose ("every concept across the guide"); kept the
  factually-correct, concrete "**All 28 mental models**" callout (the gallery shows 28). (3) **`revealed` reset** — added
  `useEffect(() => setRevealed(new Set()), [query, level, seed])` so a revealed card can't carry onto a different card after
  filtering/shuffling. (4) **`aria-live` noise** — removed `aria-live="polite"` from `.mm-count` *and* `.gl-count` (they
  announced on every keystroke). (5) **storage/empty guards** — `loadKnown()` now guards with `Array.isArray` (a non-array
  stored value would otherwise make a per-char Set); `GlossaryPage` A–Z bucket uses `g.term[0]?.toUpperCase() ?? "#"`.
  (6) **glossary "Claude in Chrome"** — appended the load-bearing gotcha "**on Pro it runs Haiku 4.5 only** (Max/Team/Ent pick
  the model)", **web-verified this session** (Help-Center "Get started with Claude in Chrome": Pro = Haiku 4.5 only;
  Max/Team/Enterprise choose Opus 4.7 / Sonnet 4.6 / Haiku 4.5 — matches §12).
  **M4 visual:** wired the previously-**orphaned** `style-pipeline` figure into **M4 t2** (the "style out" pivot it depicts).
  M4 was the only zero-visual module; the figure was registered but referenced nowhere. Now **every registered figure is
  referenced** (26/26 — no orphans).
  **★ M25 Two-Gate sim** (`sims/TwoGateSim.tsx` + `twoGate.css`, registry key `two-gate`): drives the two-condition model the
  static `trust-boundaries` figure maps. **Two toggles** — **READ gate** (Untrusted ↔ Trusted source) × **ACT gate** (Broad ↔
  Least-privilege) — plus a deterministic **stepper** that walks a canonical *"email all contacts passwords.txt"* injection
  from Source → READ gate → Claude → ACT gate → Your data. The payload **lands (💥)** only when **both** gates are open
  (untrusted + broad); otherwise it **collapses (🛡)** at whichever gate you closed, and the verdict names it (READ closed = the
  text never entered; ACT closed = least privilege blocked the action). Mirrors `AgentLoopSim` (play/pause/step/back/reset,
  `prefers-reduced-motion` hides Play) + `ToolPickerSim` (ARIA radiogroups, live region); reuses the figure's colour
  vocabulary (untrusted=red, Claude=coral, trusted=green); fully bilingual; changing a gate re-arms the run. Inserted the
  `sim` block into **M25 t2** beside the figure (figure = the map, sim = drive & break it). **Decision (user-rule-8, flagged):**
  added **`m25` to `SIGNATURE_SIMS` (7 → 8)** — the codebase `signature` flag marks any module with a notable interactive, and
  `POLISH-PLAN` Q3 ranks this the **#1 highest-insight build in the guide**; the sidebar/map ★ + Footer count now read 8. The
  §6 "~6 signature sims" target is unchanged *in spirit* (M25 is the security capstone's marquee interactive).
  **Verification (repo, linux-arm64; sandbox-only `@rolldown/binding-linux-arm64-gnu@1.0.3` installed `--no-save` into the
  gitignored `node_modules`; smoke built via Vite SSR into the gitignored `scripts/ssr/`):** `tsc --noEmit` ✓ **and**
  `tsc -p tsconfig.node.json --noEmit` ✓ · **`gen:meta`** ✓ (deterministic; **28 modules · 6 sections · 8 signature sims**;
  re-run byte-identical) · **meta-sync** ✓ (committed `meta.json` matches `concepts.ts` — order/level/section/title/tagline/
  mentalModel/topics/seeAlso/authored + sections + signatureSims, 0 drift) · **data-integrity** ✓ (**28 modules · 390 blocks ·
  11 sim refs (11 registered) · 26 figure refs (26 registered) · 2466 Localized EN+UA pairs · glossary 119 terms · signature 8**;
  table widths == head, compare 3-tuples, callout tones valid, seeAlso valid, **every signature module carries a sim block** —
  catches the new m25) · **render smoke** ✓ (`react-dom/server` of `TwoGateSim` **EN+UA** + `StylePipeline` inside `LangProvider`
  — asserts Untrusted/Trusted/Broad/Least, READ/ACT, "Run the attack", passwords.txt, the lesson line, and the UA strings) ·
  `vite build` ✓ (**TwoGateSim 13.2 KB / 4.65 KB gzip + its own `twoGate.css` 2.83 KB / 0.86 KB gzip** split into on-demand
  chunks; **`StylePipeline` now builds** as a referenced chunk; **eager `index` entry unchanged at 20.18 KB gzip** — the sim
  loads only on the M25 page; `react-vendor` 59.65, `ModulePage` 623 KB / 194 KB gzip).
  **Sandbox gotchas (expected, §12):** the linux rolldown binding was missing (darwin `node_modules`) → installed
  `@rolldown/binding-linux-arm64-gnu@1.0.3` `--no-save` (additive; `package-lock.json` untouched; user runs `npm install` on
  darwin). Built into `/tmp` + `scripts/ssr/` (both gitignored) to dodge the unlink/`emptyOutDir` limit. The verify scripts live
  in `scripts/_*` (gitignored — `_meta-sync-s11.ts`, `_integrity-s11.ts`, `_smoke-s11.tsx`); **safe to delete on your Mac**.
  A **stale `.git/index.lock`** was created by an in-sandbox `git status` (unlink blocked) — **`rm -f ".git/index.lock"`
  locally before committing.** No ESLint config exists; the lint gate is TypeScript strict (passed) — all edits marked
  `// CHANGED (S11)`.
  **Session summary —** *(1) Done:* 6 P1 fixes (MentalModelsPage ×4, GlossaryPage ×2, M28 count, glossary Chrome), wired
  `style-pipeline` into M4, built the ★ M25 Two-Gate sim (signature #8). *(2) Branch* `s11-fixes-m4-m25-twogate`; *commit*
  `feat(s11): P1 fixes + M4 style-pipeline figure + ★ M25 Two-Gate injection sim`; *desc:* polish slice #1 from POLISH-PLAN —
  flashcard/glossary correctness + a11y, M4's missing visual, and the security capstone's marquee interactive (7→8 signature
  sims). *(3) Challenges/Q:* confirm the **signature-count bump 7→8** is wanted (recommended — it's the plan's #1 build); the
  rest of POLISH-PLAN remains (next slice: **M24 Hook-Lifecycle** + **M18 Acting-Tiers** figure→sim promotions, then the P2
  code fixes — wire meta-sync into `typecheck`, memoize `LangContext`, explicit `manualChunks`).
  **Pending user:** `rm -f ".git/index.lock"` → commit → `npm install` (darwin-arm64) → `npm run build`; S11 appears live once
  merged to `main`.

- **2026-06-25 · S12 Polish #2 — ★ M24 Hook-Lifecycle sim + ★ M18 Acting-Tiers Router + P2 code fixes**
  *(branch `s12-hooks-tiers`)* — Second polish slice against `POLISH-PLAN.md`: the two **figure→sim promotions** the plan ranks
  #2 and #3 (value-per-effort — each turns an existing static figure into the loop/gate interaction the module already
  describes), plus the **P2 code fixes**. Signature interactives **8 → 10**. No new modules (guide is content-complete).
  **★ M24 · Hook-Lifecycle stepper** (`sims/HooksSim.tsx`, key `hooks`, `hooks.css`): a **stepper** (mirrors `AgentLoopSim`)
  with a **Hooks ON ↔ No hooks** toggle (mirrors `TwoGateSim` — a toggle that flips the outcome). A dangerous
  `Bash(rm -rf ~/project)` rides the lifecycle (SessionStart → UserPromptSubmit → PreToolUse → PostToolUse → Stop); with the
  **block-rm deny-hook ON**, the PreToolUse hook returns `permissionDecision: deny` and the command is **blocked before it runs —
  deterministically, every run** (then Claude adapts to a scoped `rm -rf ./dist` which the hook allows; PostToolUse format/test +
  Stop audit hooks fire). With **No hooks**, there is no deterministic gate — blocking rides on the model refusing + your
  permission prompt: an **honest probabilistic baseline** (amber ⚠ "no guarantee", *not* a fake 💥 "it deleted everything").
  Play/pause/step + reduced-motion fallback (Play hidden) + ARIA live region; the command chip travels along the active node; a
  hook box hangs off the active event when one fires (echoes the figure). Inserted as a `sim` block in **M24 t1 beside the
  `hook-lifecycle` figure** (figure = the map, sim = drive & break it). **★ M18 · Acting-Tiers Router** (`sims/ActingTiersSim.tsx`,
  key `acting-tiers-router`, `actingTiersSim.css`): a **toggle-driven** router (mirrors `ToolPickerSim`, inherently
  reduced-motion-safe — no animation loop). Pick a target (Slack · internal web dashboard · native desktop app · terminal/IDE ·
  trading platform) and the panel shows **both senses of "tier" side by side**, exactly the conflation M18 t3 warns against:
  **(1) the mechanism fall-through** — Claude tries the most precise tool first (connector → browser → screen), with skipped
  tiers dimmed + a reason; **(2) the per-app access cap** (View / Click / Full, fixed by category) + a synthesis line showing how
  the cap steers work back to the precise tool (terminal = reached by screen but **Click-only**, so real shell work goes to the
  Bash tool; trading = **View-only AND blocked by default**). ARIA radiogroup + live region; bilingual. Inserted as a `sim` block
  at the **end of M18 t3** (after the access-tier table + "two settings" callout — the sim synthesizes t2's mechanisms + t3's
  access caps; the `acting-tiers` figure stays in t2). Both sims **registered** in `registry.tsx` (lazy chunks) and added to
  **`SIGNATURE_SIMS`** (`+m18 +m24` → 10); `meta.json` regenerated.
  **Decision (user-rule-8, flagged):** the **★** in the user's request signals both should be signature; the codebase `signature`
  flag marks any module with a notable interactive, and the data-integrity check **enforces** that every signature module carries
  a sim block (both now do). §6's "~6 hero sims" target is unchanged *in spirit* — these are the value-per-effort promotions the
  plan green-lit. Continues the S11 trajectory (8 → 10).
  **P2 code fixes (POLISH-PLAN Q1):** **#7 meta-sync wired into tooling** — committed **`scripts/checkMeta.ts`** (a permanent
  version of the S11 ad-hoc `_meta-sync` assertion) and appended it to the **`typecheck`** npm script (`tsc ×2 && node …
  checkMeta.ts`), so an editor/CI typecheck-only path can no longer ship a stale `meta.json` (nav/search/content divergence);
  `checkMeta.ts` is itself typechecked by `tsconfig.node.json`. **#8 LangContext memoized** — `t` is now `useCallback(…, [lang])`
  and `value` is `useMemo(…, [lang, t])`, so they're stable while `lang` is unchanged; **dropped the three
  `eslint-disable react-hooks/exhaustive-deps`** comments in `TopBar` (deps `[query, lang]` → honest `[query, t]`),
  `MentalModelsPage` and `GlossaryPage` (deps already listed `t`; now real caching instead of a per-render recompute). **#10
  explicit `manualChunks`** — `vite.config.ts` now pins only the React runtime (`react`·`react-dom`·`scheduler`) to
  `react-vendor` via a path regex, instead of lumping **all** of `node_modules` in; any future dep gets Rollup's default
  lazy-boundary chunking rather than silently joining the eager critical path. All edits marked `// CHANGED (S12)`.
  **Verification (repo, linux-arm64; the linux rolldown binding `@rolldown/binding-linux-arm64-gnu` was already present in
  `node_modules`):** `npm run typecheck` ✓ (app `tsc --noEmit` + `tsc -p tsconfig.node.json --noEmit` + the new **checkMeta gate
  → META-SYNC OK · 28 modules · 10 signature sims**) · **gen:meta deterministic** ✓ (md5 identical on re-run; the only
  `meta.json` delta vs `main` is `+m18 +m24` in the sorted `signatureSims`) · **data-integrity** (`_integrity-s11.ts`) ✓
  (**28 modules · 392 blocks · 13 sim refs (13 registered) · 26 figure refs (26 registered) · 2466 Localized pairs · glossary
  119 terms · signature 10** — all keys resolve, every signature module carries a sim block) · **render smoke** ✓ (Vite SSR of
  `HooksSim` + `ActingTiersSim` **EN + UA** inside the real `LangProvider` → asserts Hooks ON/No hooks/block-rm/PreToolUse/
  SessionStart/Play + UA «Без hooks»/«Грати»; Connector·MCP/Computer use/Slack/Mechanism/Access cap/via connector + UA «Механізм»/
  «через connector») · `vite build` ✓ (**HooksSim 14.33 KB / 5.02 KB gzip + hooks.css 2.66 KB**, **ActingTiersSim 9.13 KB /
  3.62 KB gzip + actingTiersSim.css 3.0 KB** — each split into its own on-demand chunk; **eager `index` entry unchanged at
  20.21 KB gzip**, **`react-vendor` unchanged at 59.65 KB gzip** — the explicit chunking produced the identical vendor; the two
  sims load only on their module pages).
  **Sandbox gotchas (expected, §12):** built into `/tmp/dist-s12` + the **gitignored** `scripts/_ssr-s12/` (the SSR smoke must run
  from inside the repo tree so node resolves `react` from `node_modules` — `/tmp` has none). Smoke entry `scripts/_smoke-s12.tsx`
  + the `scripts/_ssr-s12/` dir are gitignored (`scripts/_*`) — **safe to delete on your Mac**. **No stale `.git/index.lock`**
  (checked — absent). No ESLint config exists; the lint gate is TypeScript strict (passed). **POLISH-PLAN status:** Q3 #2 (M24)
  + #3 (M18) **done**; Q1 P2 #7/#8/#10 **done**. Remaining backlog highlights: Q1 P2 **#9 stable shuffle order**, P3 #11–#14;
  Q2 polish (flashcard keyboard shortcuts, section chips on the gallery, deeper global search); Q3 quick-win sims (#4 M22
  permission-rules resolver, #5 M16 read/write/scratchpad, #6 M21 cell-citation, #7 M5 memory).
  **Session summary —** *(1) Done:* ★ M24 HooksSim + ★ M18 ActingTiersSim (both figure→sim, registered, in SIGNATURE_SIMS 8→10,
  meta regenerated); P2 fixes (checkMeta in typecheck, LangContext memoized + 3 disables dropped, explicit manualChunks).
  *(2) Branch* `s12-hooks-tiers`; *commit* `feat(s12): ★ M24 hooks + ★ M18 acting-tiers sims; P2 checkMeta/memo/chunks`;
  *desc:* polish slice #2 from POLISH-PLAN — two figure→sim promotions (deterministic hook gate; mechanism-vs-access-tier router)
  + the three P2 code fixes (stale-meta typecheck gate, LangContext memoization, explicit React-only vendor chunk). *(3)
  Challenges/Q:* confirm the **signature bump 8 → 10** is wanted (recommended — the ★s were in your request and the plan ranks
  these #2/#3); next natural slice is the **P2 #9 stable-shuffle fix** + a **quick-win sim** (M22 permission-rules resolver is the
  highest-value remaining build).
  **Pending user:** commit on `s12-hooks-tiers` → `npm install` (darwin-arm64) → `npm run build`; optional cleanup
  `rm -rf scripts/_ssr-s12 scripts/_smoke-s12.tsx`; S12 appears live once merged to `main`.

- **2026-06-25 · S13 Polish #3 — P2 #9 stable-shuffle fix + ★ M22 Permission-Rules Resolver**
  *(branch `s13-shuffle-permission-resolver`)* — Third polish slice against `POLISH-PLAN.md`: the last open P2 code fix
  (#9) + the highest-value remaining new sim (Q3 #4). No new modules (guide is content-complete). Signature interactives
  **10 → 11**. **P2 #9 · stable shuffle** (`MentalModelsPage.tsx`): the flashcard deck **reshuffled the remaining cards
  whenever you marked one *known*** — `deck` re-ran Fisher–Yates over `base`, and `base` depends on `known`, so removing a
  known card changed the array length and produced a *different* permutation of the rest. Replaced the `seed:number` with a
  **fixed `order:string[]|null`** snapshot of *all* 28 module ids: `deck` now just **filters + orders `base` by that fixed
  list**, so dropping a known card leaves every remaining card in place. The reveal-reset effect dep moved `seed → order`
  (still re-hides on shuffle/reset, but **not** on mark-known, so a run stays stable); the button reads Shuffle/Reset off
  `order`. **★ M22 · Permission-Rules Resolver** (`sims/PermissionResolverSim.tsx`, key `permission-resolver`,
  `permissionResolver.css`): a **toggle-driven resolver** (mirrors `ToolPickerSim`/`ActingTiersSim` — inherently
  reduced-motion-safe, no animation loop) that makes M22's `.claude/settings.json` block pokeable. Pick one of **6 tool
  calls** (`Edit(src/api.ts)` · `Edit(README.md)` · `Bash(git push origin main)` · `Bash(rm -rf ~)` · `Read(./.env)` ·
  `Read(src/config.ts)`) × one of **4 permission modes** (default · acceptEdits · plan · bypassPermissions) and watch the
  **exact ruleset from M22's code block** resolve it **top-to-bottom deny → ask → allow → mode, first match wins**: the
  matched rule lights up, earlier buckets show "no match", later ones "not reached", and a verdict (**Allowed / Ask first /
  Blocked**) explains *what decided it* and *why*. Inserted as a `sim` block into **M22 t2 beside the settings.json code
  block** (code = the config, sim = fire calls at it). New `.prc-*` CSS; sim registered in `registry.tsx`; **m22 added to
  `SIGNATURE_SIMS`** (10 → 11); `meta.json` regenerated (only the `signatureSims` array changed — `+m22`).
  **Web-verified this session** (canonical **Claude Code permissions doc**, code.claude.com/docs/en/permissions): rules are
  scanned **deny → ask → allow, first match wins, and rule specificity does NOT change the order** (a matching ask prompts
  even when a more specific allow also matches) — confirms M22's existing "deny → ask → allow" note; **a deny blocks in
  every mode, including `bypassPermissions`**; **`bypassPermissions` skips prompts EXCEPT those forced by an explicit `ask`
  rule** (+ `rm -rf ~`/`/` circuit breakers); **`plan` is read-only** (reads + read-only shell only, no source edits);
  **`acceptEdits` auto-accepts file edits + common fs commands in the working dir**; **read-only tools (Read/Grep/Glob) need
  no approval** unless an explicit deny names them. The sim encodes exactly this: matched calls are rule-decided (mode-
  independent — deny/ask survive bypass), and the **mode only decides a call no rule matches** (the `Edit(README.md)` case
  flips Ask/Allow/Blocked/Allow across the four modes; `Read(src/config.ts)` is allowed in every mode; both contrast with
  their explicitly-ruled siblings).
  **Decision (user-rule-8, flagged):** the **★** in the user's request + `POLISH-PLAN` Q3 rank this a signature build, and
  the data-integrity check **enforces** that every signature module carries a sim block (m22 now does). §6's "~6 hero sims"
  target is unchanged *in spirit* — this continues the S11/S12 trajectory (8 → 10 → 11); the sidebar/map ★ + Footer count now
  read 11. **Confirm the bump 10 → 11 is wanted** (recommended — it's the plan's #4 top build and the marquee interactive for
  the Code module).
  **Verification (repo, linux-arm64; the linux rolldown binding `@rolldown/binding-linux-arm64-gnu` was already present in
  `node_modules`):** `npm run typecheck` ✓ (app `tsc --noEmit` + `tsc -p tsconfig.node.json --noEmit` + **checkMeta →
  META-SYNC OK · 28 modules · 11 signature sims**) · **gen:meta** ✓ (28 modules · 6 sections · 11 signature sims; the only
  `meta.json` delta vs `main` is `+m22` in `signatureSims`) · **data-integrity** (`_integrity-s11.ts`) ✓ (**28 modules · 393
  blocks · 14 sim refs (14 registered) · 26 figure refs (26 registered) · 2466 Localized pairs · glossary 119 terms ·
  signature 11** — all keys resolve, every signature module carries a sim block) · **render smoke** ✓ (Vite SSR of
  `PermissionResolverSim` **EN + UA** inside the real `LangProvider` → default = **Allowed** (allow rule), `.claude/settings.json`
  + `Bash(rm:*)`/`Bash(git push:*)` + deny→ask→allow + all 4 modes; UA `Режим permission`/`Дозволено`/`перший збіг` with call
  labels staying English; **plus `MentalModelsPage` renders with the Shuffle control** after the stable-order refactor) ·
  `vite build` ✓ (**PermissionResolverSim 11.6 KB / 3.97 KB gzip + permissionResolver.css 4.7 KB / 1.21 KB gzip** split into
  its own on-demand chunk; **eager `index` entry unchanged at 20.03 KB gzip** — the sim loads only on the M22 page).
  **Sandbox gotchas (expected, §12):** built into `/tmp/dist-s13` + the **gitignored** `scripts/_ssr-s13c/` (the SSR smoke
  must run from inside the repo tree so node resolves `react` from `node_modules`; `/tmp` has none). One SSR rebuild failed
  only because the sandbox can't `unlink` to empty an existing output dir — building to a fresh dir worked. Smoke entry
  `scripts/_smoke-s13.tsx` + the `scripts/_ssr-s13*/` dirs are gitignored (`scripts/_*`) — **safe to delete on your Mac**
  (`rm -rf scripts/_ssr-s13 scripts/_ssr-s13c scripts/_smoke-s13.tsx`). **No stale `.git/index.lock`** (avoided in-sandbox
  `git status`). No ESLint config exists; the lint gate is TypeScript strict (passed) — all edits marked `// CHANGED (S13)`.
  **Session summary —** *(1) Done:* P2 #9 stable-shuffle fix (`MentalModelsPage`); ★ M22 PermissionResolverSim (registered,
  in `SIGNATURE_SIMS` 10→11, `meta.json` regenerated); POLISH-PLAN #9 + Q3 #4 marked done. *(2) Branch*
  `s13-shuffle-permission-resolver`; *commit* `feat(s13): stable flashcard shuffle + ★ M22 permission-rules resolver`;
  *desc:* polish slice #3 from POLISH-PLAN — the last P2 code fix (deck no longer reshuffles on mark-known) and the
  highest-value remaining sim (deny→ask→allow→mode resolver over M22's exact ruleset, web-verified). *(3) Challenges/Q:*
  confirm the signature bump **10 → 11**; remaining POLISH-PLAN highlights — Q3 quick-win sims (#5 M16 read/write/scratchpad,
  #6 M21 cell-citation, #7 M5 memory), Q2 polish (flashcard keyboard shortcuts, gallery section chips, deeper global search),
  P3 #11–#14.
  **Pending user:** commit on `s13-shuffle-permission-resolver` → `npm install` (darwin-arm64) → `npm run build`; optional
  cleanup `rm -rf scripts/_ssr-s13 scripts/_ssr-s13c scripts/_smoke-s13.tsx`; S13 appears live once merged to `main`.

- **2026-06-26 · S14 Polish #4 — ★ M16 FileFlow file-lifecycle sim** *(branch `s14-m16-fileflow-sim`)* — Fourth
  polish slice against `POLISH-PLAN.md`: the Q3 #5 figure→sim promotion (the M16 read/write/scratchpad build). No new
  modules (guide is content-complete). Signature interactives **11 → 12**.
  **★ M16 · FileFlow stepper** (`sims/FileFlowSim.tsx`, key `file-flow-sim`, `fileFlowSim.css`): promotes the static
  `file-flow` figure into the task it maps. A deterministic **csv→xlsx report** walks the three places — chat **Uploads**
  (temp) · isolated **Sandbox VM** scratchpad (temp) · **Your folder** (persists): read the CSV → build in the sandbox →
  delete a stale `report-old.xlsx` (permission gate) → write `report.xlsx` → present a file card → **final frame "What
  survived the session"**. **Two toggles:** a **Destination** toggle (Your folder ↔ Scratchpad-only) flips the final
  frame — the deliverable **persists** in your granted folder, or is **wiped** with the VM (teaches "only your folder
  lasts, so that's where finished work must land"); a **Permission-mode** toggle (Ask before acting ↔ Act without asking)
  re-narrates the delete step to show the **deletion gate fires in BOTH modes**. Three-lane SVG with per-step file chips
  (idle/active/danger/gone/survived), a 🔒 gate badge on the delete step, dimmed temp lanes + ⌫ "wiped" at the end.
  Deterministic; play/pause/step + reduced-motion fallback (Play hidden); ARIA radiogroups + live region; bilingual.
  Mirrors HooksSim (a stepper whose toggle flips the outcome). Inserted as a `sim` block in **M16 t2** (after the
  three-places prose, before the read/write compare); the `file-flow` **figure stays the map in t1**. Registered lazy in
  `registry.tsx`; **m16 added to `SIGNATURE_SIMS` (11 → 12)**; `meta.json` regenerated (only `signatureSims` delta:
  `+m16`).
  **Web-verified this session** (Help Center, live re-check — all still current): **30 MB per file** deliverable cap
  ("Create and edit files with Claude"); Claude creates **docx · xlsx · pptx · pdf** via the pre-built skills + PNG/charts
  via code execution (all plans incl. Free); **deletion protection is universal** — Claude asks before permanently
  deleting *any* file in **both** permission modes, and "Act without asking" raises prompt-injection risk ("Use Claude
  Cowork safely"); **VM isolation** (a lightweight Linux VM via Apple's VZVirtualMachine), reads/writes only mounted/
  granted folders, the **scratchpad/sandbox is temporary** while the granted folder persists. Confirms the existing M16
  copy (authored S6) is accurate.
  **Decision (user-rule-8, flagged):** the **★** in the request + `POLISH-PLAN` Q3 #5 mark this a signature build, and the
  data-integrity check **enforces** that every signature module carries a sim block (m16 now does). §6's "~6 hero sims"
  target is unchanged *in spirit* — this continues the S11→S12→S13 trajectory (8 → 10 → 11 → 12); the sidebar/map ★ +
  Footer count now read 12. **Confirm the bump 11 → 12 is wanted** (recommended — it's the plan's #5 top build and M16 was
  one of the no-sim modules the plan targets).
  **Verification (repo, linux-arm64; the linux `@rolldown/binding-linux-arm64-gnu` + `lightningcss-linux-arm64-gnu`
  bindings were already present in `node_modules`; no esbuild needed — Vite 8 uses rolldown):** `tsc --noEmit` ✓ **and**
  `tsc -p tsconfig.node.json --noEmit` ✓ · **`gen:meta`** ✓ (28 modules · 6 sections · 12 signature sims; sorted
  `signatureSims` delta vs `main` = `+m16`) · **checkMeta** ✓ (META-SYNC OK · 28 modules · 12 signature sims · sections 6)
  · **data-integrity** (`_integrity-s11.ts`) ✓ (**28 modules · 394 blocks · 15 sim refs (15 registered) · 26 figure refs
  (26 registered) · 2466 Localized pairs · glossary 119 terms · signature 12** — all keys resolve, every signature module
  carries a sim block) · **render smoke** ✓ (Vite SSR of `FileFlowSim` **EN + UA** inside the real `LangProvider` →
  asserts Uploads/Sandbox VM/Your folder/Scratchpad only/Ask before acting/Act without asking/Read the input/sales.csv/
  "always ask — in both modes"/"Only your granted folder persists"; UA «Твоя тека»/«Лише scratchpad»/«Режим дозволів»/
  «Читання вхідних даних»/«в обох режимах»/«Куди потрапляє результат?») · `vite build` ✓ (**FileFlowSim 16.02 KB /
  5.37 KB gzip + fileFlowSim.css 2.82 KB** split into its own on-demand chunk; the existing `file-flow` figure chunk
  (5.35 KB) still ships for t1; **eager `index` entry unchanged at 20.22 KB gzip**, **`react-vendor` unchanged at
  59.65 KB gzip** — the sim loads only on the M16 page).
  **Sandbox gotchas (expected, §12):** built the SSR smoke into the **gitignored** `scripts/_ssr-s14/` (must run from
  inside the repo tree so node resolves `react` from `node_modules`) + the prod build into `/tmp/dist-s14`. The smoke entry
  `scripts/_smoke-s14.tsx` + `scripts/_ssr-s14/` are gitignored (`scripts/_*`); the mounted FS blocks `unlink` so the
  sandbox can't delete `scripts/_ssr-s14/` — **safe to delete on your Mac** (`rm -rf scripts/_ssr-s14 scripts/_smoke-s14.tsx`).
  **No stale `.git/index.lock`** (avoided in-sandbox `git status`). No ESLint config exists; the lint gate is TypeScript
  strict (passed) — all edits marked `// CHANGED (S14)` in `registry.tsx`/`concepts.ts`.
  **Session summary —** *(1) Done:* ★ M16 FileFlowSim (figure→sim, registered, in `SIGNATURE_SIMS` 11→12, `meta.json`
  regenerated); web-verified the 30 MB / both-modes-delete / sandbox-wiped / office-skills facts; POLISH-PLAN Q3 #5 marked
  done. *(2) Branch* `s14-m16-fileflow-sim`; *commit* `feat(s14): ★ M16 FileFlow file-lifecycle sim`; *desc:* polish slice
  #4 from POLISH-PLAN — promotes the `file-flow` figure into a deterministic uploads→sandbox→your-folder stepper with a
  Destination toggle (persist vs wiped, the "what survived the session" payoff) and a Permission-mode toggle (delete gate
  in both modes); figure stays the map in t1. *(3) Challenges/Q:* confirm the signature bump **11 → 12**; remaining
  POLISH-PLAN highlights — Q3 quick-win sims (#6 M21 cell-citation, #7 M5 memory), Q2 polish (flashcard keyboard shortcuts,
  gallery section chips, deeper global search), P3 #11–#14.
  **Pending user:** commit on `s14-m16-fileflow-sim` → `npm install` (darwin-arm64) → `npm run build`; optional cleanup
  `rm -rf scripts/_ssr-s14 scripts/_smoke-s14.tsx`; S14 appears live once merged to `main`.

- **2026-06-28 · Next planned: S15 = Wave C1 (standard parity)** *(not started)* — the family reached a shared
  Tier-1 bar (infra/CI gates **+** a test/correctness layer) after the database↔Node-js cross-port; Claude
  guide has neither half wired. The **conformance track (Waves C1–C4)** is in §13; the full gap analysis with
  effort/risk is **`_standard/CLAUDE-GUIDE-PARITY.md`**. **S15 scope = Wave C1 (infra parity):** `eslint.config.js`
  + `lint`; promote `scripts/_integrity-s11.ts` → committed `scripts/check-data.ts` + `check:data`; add `verify`;
  multi-gate `deploy.yml` + `cancel-in-progress:false`. Agent edits + verifies in a scratch copy; **owner** runs
  `npm install` + commit (`s15-wave-c1-infra-parity`) + deploy. Read CLAUDE.md fully + `_standard/CLAUDE-GUIDE-PARITY.md`
  + `_standard/GUIDE-AUTHORING-STANDARD.md` §4/§8 first.

- **2026-06-29 · S15 Wave C1 — infra parity** *(branch `s15-wave-c1-infra-parity`)* — DONE. First
  standard-conformance wave (gap analysis `_standard/CLAUDE-GUIDE-PARITY.md` #1–4); mirrors Node-js Wave 1.
  **Additive, low risk, no content changes** — the guide stays 28/28 modules / 12 signature sims. Wired the
  two missing halves of the **infra/CI** gate set (the test layer is C2). **(1) ESLint** — added
  `eslint.config.js` (flat config, the database/Node-js shape: `js.recommended` + `tseslint.recommended` +
  the classic two `react-hooks` rules + `react-refresh` + `no-unused-vars` with `^_` ignore; a second block
  gives `scripts/**/*.ts`·`vite.config.ts`·`eslint.config.js` Node globals; ignores `dist`·`dist-*`·
  `node_modules`·`scripts/ssr`·`scripts/_*`·`scripts/**/*.mjs`·`_ci`) + `"lint": "eslint ."` + the **six
  devDeps** at the peers' proven versions (`@eslint/js`^10.0.1 · `eslint`^10.5.0 · `eslint-plugin-react-hooks`
  ^7.1.1 · `eslint-plugin-react-refresh`^0.5.3 · `globals`^17.7.0 · `typescript-eslint`^8.62.0). **(2)
  check:data** — promoted the gitignored `scripts/_integrity-s11.ts` → committed **`scripts/check-data.ts`**
  (asserts unchanged: 6 sections · 28 modules · unique ids/orders 1..28 · bilingual completeness · registry
  sim/figure refs · table/compare shapes · callout tones · seeAlso · every SIGNATURE_SIMS module carries a sim ·
  glossary integrity) + `"check:data"`. *(Carries `/// <reference types="node" />` like its `genMeta`/
  `checkMeta` siblings so an editor that checks it outside `tsconfig.node.json` still resolves node types;
  the real gate is `tsc -p tsconfig.node.json` in `typecheck`, which is clean.)* **(3) verify** — `"verify": "typecheck → lint → check:data → build"`
  (room left for `test` + `smoke` in C2). **(4) CI** — `deploy.yml` upgraded from build-only to the discrete
  multi-gate order (Typecheck → Lint → Data integrity → Build) + **`cancel-in-progress: false`**. Also added
  `dist-*/` to `.gitignore` (defensive — the sandbox builds to `dist-s15`).
  **Lint finding + fix (1, the only one):** `MemoryAcrossSessions.tsx:40` — the JSX comment
  `{/* global memory store */}` begins with the keyword **`global`**, which ESLint parses as a
  `/* global … */` **config-comment directive** declaring globals `memory`+`store`, then flags them unused
  (`tsc`'s `noUnusedLocals` can't see this — it's an ESLint-only construct). Fixed by rewording so `global`
  isn't the leading token; marked `CHANGED (S15)`. One **benign warning remains** (`react-refresh/
  only-export-components` on `i18n/LangContext.tsx` — it exports the provider **and** the `useLang` hook);
  it's a `warn`, `eslint .` exits 0, and both peers ship the identical warning — left as-is (splitting the
  context is i18n restructuring, out of C1 scope).
  **Decisions (user-rule-8, flagged):** (1) **Adopted `tsx` for the three TS scripts** (`gen:meta` ·
  `check:data` · `checkMeta`) with **extensionless imports** — a follow-up after the owner hit editor `TS5097`
  (see the follow-up note below). This pulls the small **`tsx` slice of Wave C3 (gap #8)** forward (it's the
  standard's canonical script runner, §4.1/§4.6); the **TS-6 bump (gap #7) stays in C3**. `tsx` + the ESLint
  stack are the only new dep families. (2) **Did NOT bump TypeScript** (stays ^5.7.0) — Node-js guide proves
  the `eslint@10`+`typescript-eslint@8` stack runs clean on TS 5.7, so the bump is deferred to C3 as planned.
  (3) **Did not touch** the `gen:meta`/`meta.ts` split (already conformant) or start the `concepts.ts` split
  (Wave C4, owner-confirm).
  **Verification (clean linux-x64 `npm install` — 152 pkgs, 31 s — in a `/tmp` scratch copy of the repo; the
  sandbox builds to `/tmp` so the mounted FS unlink limit never bites):** `npm run typecheck` ✓ (app `tsc` +
  `tsc -p tsconfig.node.json` now also typechecks the committed `check-data.ts` + checkMeta **META-SYNC OK ·
  28 modules · 12 signature sims · sections 6**) · `npm run lint` ✓ (**0 errors, 1 benign warning**, exit 0;
  the `scripts/_*` scratch files were correctly ignored) · `npm run check:data` ✓ (**6 sections · 28 modules ·
  394 blocks · 15 sim refs (15 registered) · 26 figure refs (26 registered) · 2466 Localized pairs · glossary
  119 terms · signature 12**) · `npm run build` ✓ (eager `index` **20.23 kB gzip**, `react-vendor`
  **59.65 kB gzip**, `ModulePage` 193.99 kB gzip — all unchanged from S14; the reworded figure chunk still
  builds) · **`npm run verify` exit 0** end-to-end · `gen:meta` deterministic (regenerated `meta.json`
  **byte-identical** to the committed one — no metadata drift). Workspace holds **source only** — the build ran
  only in `/tmp`; no `dist/` or git lock written to the mounted FS; **6 files touched** (new `eslint.config.js`
  + `scripts/check-data.ts`; modified `package.json` · `.github/workflows/deploy.yml` · `.gitignore` ·
  `src/components/figures/MemoryAcrossSessions.tsx`).
  **Follow-up (same session) — editor `TS5097` → `tsx`:** the owner's IDE flagged `TS5097` on
  `check-data.ts`'s `.ts`-extension imports. Root cause: the flat (non-project-reference) tsconfig means
  WebStorm doesn't reliably route `scripts/*.ts` to `tsconfig.node.json`, so it checks them under **bare
  defaults** (no `allowImportingTsExtensions`). The combination of *both* "missing node types" *and* TS5097 is
  the tell — only bare defaults produce both. First added `/// <reference types="node" />` (matched the
  `genMeta`/`checkMeta` convention; cleared the node-type errors), but TS5097 needs the config. **Best-practice
  fix (owner chose "what you recommend"): switched all three scripts to `tsx` + extensionless imports**,
  dropping the `--experimental-strip-types --disable-warning` flags. Extensionless imports **cannot** trigger
  TS5097 in any editor, and `tsx` is the standard's canonical runner (database guide uses it verbatim).
  **Re-verified (sandbox):** `npm install` adds `tsx` (5 pkgs); `typecheck` (checkMeta via tsx) · `lint`
  (0 err/1 warn) · `check:data` (same counts) · `build` · **`verify` exit 0**; **`gen:meta` via tsx →
  `meta.json` byte-identical** to committed (no drift); a bare-default `tsc scripts/check-data.ts` now reports
  **0× TS5097**. Touched 3 more files (`scripts/genMeta.ts` · `scripts/checkMeta.ts` extensionless+tsx note) +
  `package.json` (+`tsx`@^4.22.4, 3 script cmds). **8 files total this session.**
  **Session summary —** *(1) Done:* ESLint flat config + `lint` + 6 devDeps (one lint fix: the `/* global */`
  comment-directive gotcha); promoted `_integrity-s11.ts` → committed `check-data.ts` + `check:data`; `verify`
  aggregate; multi-gate `deploy.yml` + `cancel-in-progress:false`; `.gitignore` `dist-*/`; **follow-up: moved
  the 3 TS scripts to `tsx`/extensionless imports (editor TS5097 fix)**. *(2) Branch* `s15-wave-c1-infra-parity`;
  *commit* `chore(s15): wave C1 infra parity — ESLint + check:data + verify + multi-gate CI; tsx for scripts`;
  *desc:* additive infra/CI gates to match the database + Node-js Tier-1 bar — flat ESLint config (one fix), a
  committed data-integrity check, a `verify` aggregate, and a discrete-gate Pages workflow; the **`tsx` slice of
  C3 pulled forward** (editor TS5097 fix, extensionless imports); no content/structural changes; TS-6 (rest of
  C3) + the test layer (C2) stay deferred. *(3) Challenges/Q:* none blocking (the TS5097 follow-up is resolved).
  Next wave **C2 = test parity**: port the permanent SSR/render smoke (`scripts/smoke.ts`) + extract 3–4 sim
  engines into `src/lib/*.ts` with golden tests, then fold `test` + `smoke` into `verify` + CI.
  **Pending user:** `npm install` (darwin-arm64 — pulls the 6 ESLint deps **+ `tsx`** + refreshes
  `package-lock.json`) → `npm run verify` to confirm locally → commit on `s15-wave-c1-infra-parity` → merge to
  `main` (CI now runs the multi-gate before deploy). **Landed: branch `s15-wave-c1-infra-parity` merged to
  `main` — S15 is live; the CI multi-gate (typecheck → lint → check:data → build) is now active.**

- **2026-06-30 · S16 Wave C2 — test parity** *(branch `s16-wave-c2-test-parity`)* — DONE. The second
  standard-conformance wave (parity-doc gaps #5–6); mirrors database S23 / cross-port Wave 2. **Additive, low
  risk, no content changes** — the guide stays 28/28 modules / 12 signature sims, and the eager bundle is
  byte-for-byte the S15 size. Wired the **test/correctness layer** (the half C1 left open), so Claude guide
  now holds the **full mutual Tier-1 bar** (infra/CI gates **+** render/engine tests) shared by database +
  Node-js. **No new dependencies** — everything runs on the `tsx`/React/ESLint stack S15 already added.
  **(1) SSR/render smoke** — committed **`scripts/smoke.ts`** (ported the database pattern). It server-renders,
  via `react-dom/server` inside the real `LangProvider`, in **both EN and UK**: **(A)** every **sim (15) +
  figure (26)** component, auto-discovered from `src/components/{sims,figures}/*.tsx` with a **drift guard**
  (file count == registry-key count, so a component can't be added without registering it or vice-versa);
  **(B)** the four route pages (`EcosystemMap` · `MentalModelsPage` · `GlossaryPage` · `DecidePage`); **(C)**
  the `ModulePage` header/TOC/nav for **all 28 modules**; **(D)** the eager **`<App/>` shell across 9 hash
  routes** incl. unknown/garbage (`#/m/does-not-exist`, `#/total-garbage`) to exercise the hash router +
  TopBar/Sidebar/Footer. Asserts no-throw + ≥-length + technical-term **canaries** (e.g. `bypassPermissions`,
  `.claude/settings.json`, `MTok`, `Cowork`, `PreToolUse`) + a **lang-toggle sanity check** (EN render ≠ UK).
  **233 checks.** `"smoke": "tsx --tsconfig tsconfig.json scripts/smoke.ts"`; JSX is avoided in the script
  (`createElement` only) so `tsconfig.node.json` typechecks it. **(2) Engine tests** — extracted the pure
  logic of **three** algorithmic sims into deterministic, React-free **`src/lib/*.ts`** engines, each with a
  **`scripts/test-*.ts` golden test** (standard §4.5): **`tokenBudget.ts`** (pricing/window math — 16 checks:
  window fill, cacheable-prefix billed at 10%, batch −50%, linear model pricing, truncation), **`decide.ts`**
  (Tool-Picker scoring — 16 checks: the 7 documented spot-checks files→Cowork / code→Code / web→Chrome[gated
  on Free] / app→Connector / expertise→Skill / chat→Chat / office→Office, gated math, where-dominance,
  recommend() parity) and **`permissionResolver.ts`** (deny→ask→allow→mode — 54 checks across 6 calls × 4
  modes: precedence, deny/ask survive `bypassPermissions`, read-only default, mode-decides-the-unmatched).
  **86 engine checks** under a `"test"` umbrella. The three sims were **refactored to consume the engines** —
  behaviour-preserving: `TokenBudgetSim` imports `computeBudget`; `data/decide.ts` keeps the bilingual catalog
  and **re-exports** `recommend`/`Answers`/`Ranked` from `lib/decide` so `ToolPickerSim` is untouched;
  `PermissionResolverSim` overlays bilingual copy onto the engine's structural `CALLS`/`resolve`. **(3) Wiring**
  — `package.json`: `test:token-budget` · `test:decide` · `test:permission-resolver` + a `test` umbrella +
  `smoke`; **`verify` is now `typecheck → lint → check:data → test → smoke → build`**. `deploy.yml`: added the
  **Engine tests** + **SSR/render smoke** gates in that order before Build. `tsconfig.node.json`: added
  `jsx: "react-jsx"` + the **DOM** libs (so the committed smoke + tests — which import React components —
  typecheck) and `exclude: ["scripts/_*"]` (the gitignored scratch drafts).
  **Decisions (user-rule-8, flagged):** (1) **ToolPicker's `recommend()` was already pure** (it lived in
  `src/data/decide.ts`); rather than just test it in place, I **split the math into `src/lib/decide.ts`** and
  kept the bilingual surface catalog in `data/decide.ts` (which re-exports), so **all three engines live in
  `src/lib/` per §4.5** and every consumer imports unchanged. (2) **Added `scripts/css-stub-hooks.mjs`** — a
  `.css`→empty-module loader hook, **registered from inside `smoke.ts`** via `node:module`'s `register()`.
  Necessary because Claude-guide sims **co-locate CSS** (`import "./x.css"`) which Node can't load as a module
  — the database sims don't, so its smoke needs no such hook. Registering inside the script keeps the npm
  command identical to the spec. (3) **`tsconfig.node.json` got `jsx` + DOM** — the minimal change to typecheck
  the committed smoke; this is **not** the C3 project-reference split (the config stays flat) and TS-6 stays in
  C3. (4) **Did not touch** the `gen:meta`/`meta.ts` split (conformant) or start the `concepts.ts` split (C4).
  **Verification (sandbox, linux-arm64; installed `@esbuild/linux-arm64@0.28.1` `--no-save --no-package-lock`
  so `tsx` runs — the rolldown + lightningcss linux bindings were already present; `package-lock.json`
  untouched):** **`npm run verify` exit 0 end-to-end** — `typecheck` ✓ (app `tsc` + `tsc -p tsconfig.node.json`
  now also typechecks `smoke.ts` + the three `test-*.ts` with jsx/DOM + checkMeta **META-SYNC OK · 28 modules ·
  12 signature sims**) · `lint` ✓ (**0 errors, 1 benign warning** — the same `LangContext` react-refresh warn
  both peers ship) · `check:data` ✓ (**6 sections · 28 modules · 394 blocks · 15 sim refs (15 registered) · 26
  figure refs (26 registered) · 2466 Localized pairs · glossary 119 · signature 12** — identical to S15) ·
  `test` ✓ (**86 checks** across the 3 engines) · `smoke` ✓ (**233 checks**) · `build` ✓ (eager `index`
  **20.23 kB gzip**, `react-vendor` **59.65 kB**, `ModulePage` **193.99 kB gzip** — **all identical to S15**,
  proving the engine extraction is behaviour-preserving). **`gen:meta` deterministic** (`meta.json`
  byte-identical — no metadata drift). **8 files new** (`src/lib/{tokenBudget,decide,permissionResolver}.ts`,
  `scripts/{test-token-budget,test-decide,test-permission-resolver,smoke}.ts`, `scripts/css-stub-hooks.mjs`)
  + **6 modified** (`src/components/sims/{TokenBudgetSim,PermissionResolverSim}.tsx`, `src/data/decide.ts`,
  `tsconfig.node.json`, `package.json`, `.github/workflows/deploy.yml`); all edits marked `// CHANGED (S16)`.
  **Sandbox housekeeping (§12):** built into `dist-s16/` and renamed the pre-existing `dist/` → `dist-pre-s16/`
  to dodge the unlink/`emptyOutDir` limit — **both gitignored** (`dist-*/`), **safe to delete on your Mac**
  (`rm -rf dist-s16 dist-pre-s16`). The workspace `node_modules` gained extra `@esbuild/*` platform binaries
  (`--no-save`; lock untouched) — `npm install` reconciles. No stale `.git/index.lock` (avoided in-sandbox
  `git status`).
  **Session summary —** *(1) Done:* committed SSR/render smoke (`scripts/smoke.ts`, 233 checks, EN+UK, +
  `css-stub-hooks.mjs`); 3 pure engines in `src/lib/` (token-budget · decide · permission-resolver) + 3
  `scripts/test-*.ts` golden tests (86 checks) under a `test` umbrella; refactored the 3 sims to consume them
  (behaviour-preserving); `verify` → `typecheck → lint → check:data → test → smoke → build` + matching
  multi-gate CI; `tsconfig.node.json` jsx+DOM. *(2) Branch* `s16-wave-c2-test-parity`; *commit*
  `test(s16): wave C2 test parity — SSR/render smoke + 3 sim engines with golden tests`; *desc:* additive
  test/correctness layer matching the database + Node-js Tier-1 bar — a committed render smoke (every
  sim+figure EN+UK + pages + 28 module headers + app shell), three pure `src/lib` sim engines with golden
  tests, folded into `verify` + CI; behaviour-preserving (build output identical); no content/structural
  changes; **no new dependencies**. *(3) Challenges/Q:* none blocking — the only wrinkle was the CSS-import
  loader hook (Claude sims co-locate CSS; the database's don't), solved cleanly. **After C2, Claude guide
  holds the full mutual Tier-1 bar — the recommended stopping point.**
  **Pending user:** **no `npm install` needed** (no new deps) — optionally run `npm install` to drop the
  sandbox's extra esbuild binaries; run **`npm run verify`** locally (darwin-arm64) to confirm; commit on
  `s16-wave-c2-test-parity`; merge to `main` (CI now runs typecheck → lint → check:data → test → smoke →
  build before deploy). Optional cleanup: `rm -rf dist-s16 dist-pre-s16`.

- **2026-06-30 · Next planned: S17 = Wave C3 (config modernization)** *(not started; S16 ready to land on
  `main`)* — with C2 done, Claude guide holds the **full mutual Tier-1 bar** (infra + tests) — the parity
  doc's **recommended stop**. C3–C4 are standard-alignment polish that can follow incrementally. **S17 scope
  (parity-doc gaps #7–8, #10; §13 S17):** split the flat tsconfig into **project references**
  (`tsconfig.app.json` + `tsconfig.node.json`, `build = tsc -b && vite build`); add `verbatimModuleSyntax` +
  `erasableSyntaxOnly` + `noUncheckedSideEffectImports` (forces `import type` — med risk); **bump TS 5.7 → 6**
  (Node-js proves `eslint@10`+`typescript-eslint@8` run clean on it); add `homepage`/`author`/`license` to
  `package.json`. Owner runs `npm install` (TS 6). Then **S18 = Wave C4** (the `concepts.ts` split — **owner
  confirm first**). Read CLAUDE.md fully + `_standard/CLAUDE-GUIDE-PARITY.md` gaps #7–9 + standard §4.7/§8.
