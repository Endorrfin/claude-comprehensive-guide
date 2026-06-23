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

> **Progress (2026-06-23): S0–S7 ✅ done** — 16 / 28 modules authored (M6–M21); Sections **II, III & IV
> complete**, Section **V** started (M20, M21 done; M22–M24 pending). 6 of 7 signature sims built (Agent
> Loop, Prompt Anatomy, Token Budget, MCP Flow, Progressive Disclosure; ★ Sub-agent Fan-out still to come
> in S8) + 2 light interactives (Schedule-Timeline M17, Browser-Agent-Loop M20). **Next: S8 — M22 Claude
> Code essentials, M23 Sub-agents/teams + ★ Sub-agent Fan-out, M24 hooks/slash/patterns.** Beginner block
> (M1–M5) still slated for S9.

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
