# CURRICULUM.md — Claude: The Comprehensive Guide — detailed module/topic plan

Detailed annex to `CLAUDE.md`. This is the **content map**: every Section, every Module, every
Topic, and the **visual assets** planned for each. Content is authored from this map into
`src/data/concepts.ts`. Bilingual EN/UA; technical terms stay English.

Legend for planned visuals: `[table]` `[diagram]` `[flow]` `[timeline]` `[compare]`
`[mental-model]` `[code]` `[callout]` `[gallery]` `[sim ★]` (signature interactive).

---

## A. Modularity model (Section → Module → Topic)

```
Section (6)        big thematic block (I … VI) — coloured, collapsible in the sidebar
  └─ Module (~28)  the NAVIGABLE, SKIPPABLE unit (one page) — has a level + a mental model
       └─ Topic    a focused sub-unit inside a module (variable count, 3–6 typical)
            └─ Block   prose · table · diagram · sim · mental-model · callout · compare · code
```

- A **Module** is self-contained: a user can land on it directly, finish it, and leave —
  no need to read neighbours. Every module opens with its **mental model** (one line/picture)
  and **key points**, and closes with **pitfalls** + optional **interview Q&A**.
- A **Topic** is independently **deep-linkable** (`#/m/<module>/<topic>`), so search results,
  cross-links and the sidebar can jump straight to it.
- **Skip / jump freely:** modules are not a forced sequence. Recommended order exists (the
  numbering), but the UI never blocks jumping.

## B. Navigation & UX (what the user sees)

- **Top bar:** brand · global **search** (indexes modules + topics, both languages) ·
  **level filter** (beginner / middle / senior / staff — dims modules outside the chosen level) ·
  **EN/UA toggle** · theme.
- **Left sidebar (the menu):** the 6 Sections as **collapsible groups**; under each, its modules
  with a **level badge** and a **★** if the module has a signature interactive. Current module
  highlighted; sections remember open/closed state.
- **Landing (`#/map`):** the clickable **Ecosystem Map** (overview → click a node → module) +
  a "start here" path + a module grid filterable by level. (Mirrors DPmap's landing.)
- **Module page:** header (title · level badge · read-mins · the mental model) → **Topic TOC**
  (jump links, sticky) → topics rendered in order, each a heading + its blocks → **key points**
  → **pitfalls** → **see also** (cross-links) → **prev / next module**. A thin **progress bar**
  tracks scroll; an optional per-module **"mark as known/done"** (localStorage) lets users prune
  what they've mastered.
- **Study surfaces:** `#/mental-models` (gallery) · `#/glossary` (bilingual) · `#/decide`
  (Tool Picker) · flashcards/quiz embedded where useful.
- **A11y:** keyboard nav, focus rings, ARIA on sims, `prefers-reduced-motion` step fallback.

## C. Data model (refined — adds Module/Topic)

```ts
type Localized = { en: string; uk: string };
type Level = 'beginner' | 'middle' | 'senior' | 'staff';

type Section = { id: string; name: Localized; accent: string; blurb: Localized };   // the 6 blocks
type Module  = {
  id: string; section: string; order: number; level: Level;
  title: Localized; tagline: Localized; readMins: number;
  mentalModel: Localized;
  topics: Topic[];                       // the variable-count sub-units
  keyPoints: Localized[];
  pitfalls: { title: Localized; body: Localized }[];
  interview?: { q: Localized; a: Localized; level?: Level }[];
  seeAlso: string[];                     // module ids
  sources: { title: string; url: string }[];
};
type Topic = { id: string; title: Localized; blocks: Block[] };
type Block =
  | { kind:'prose';   md: Localized }
  | { kind:'figure';  fig: string; caption?: Localized }
  | { kind:'sim';     sim: string }
  | { kind:'table';   head: Localized[]; rows: Localized[][]; caption?: Localized }
  | { kind:'code';    lang: string; code: string; note?: Localized }
  | { kind:'callout'; tone:'tip'|'warn'|'senior'|'security'; title: Localized; md: Localized }
  | { kind:'compare'; a: Localized; b: Localized; rows: [Localized,Localized,Localized][] };
```

---

## D. The modules

> **Build status (updated 2026-06-23, through S7).** Authored ✅ = M6–M21 (**16 / 28**). Sections **II, III
> & IV complete**; Section **V** started (M20, M21 done; **M22–M24 pending**). Sections I, VI are navigable
> skeletons (planned topics only). This file is the **seed plan**; where verification refined a topic, the
> authored content + the correction note live in `concepts.ts` and `CLAUDE.md` §14 (e.g. M19 connectors &
> plugins are **account-level, not project-scoped**; M21 "shared context" = the separate **Work across
> Microsoft 365 apps** feature, and the Office agents are **GA on all paid plans**; M20 Chrome on Pro =
> Haiku-only, with protected actions always gated).

### Section I · Foundations & first steps  `[beginner]`  — the on-ramp (skippable for pros)

**M1 · What is Claude**
- 1.1 The mental model — an assistant that reasons over a context window + uses tools
- 1.2 The model family — Opus 4.8 (flagship, adaptive thinking) · Sonnet 4.6 (balance) · Haiku 4.5 (speed)
- 1.3 Where Claude lives — web · desktop · mobile · Cowork · Code · Chrome · Excel/PowerPoint
- 1.4 Plans & access — Free / Pro / Max / Team / Enterprise (what unlocks what)
- 1.5 What Claude can & can't do — strengths, limits, knowledge cutoff, hallucination
- Visuals: `[table]` model comparison (price · context · speed · best-for) · `[diagram]` "where Claude lives" surface map · `[compare]` can / can't · `[mental-model]` assistant + context + tools

**M2 · Interface & settings tour**
- 2.1 Chat layout & the message box (model picker, tools, attachments)
- 2.2 Settings — profile, appearance, voices, language
- 2.3 Privacy, data controls & billing
- 2.4 Organizing — chats, folders/stars, search, incognito
- 2.5 Keyboard shortcuts & power moves
- Visuals: `[diagram]` annotated UI map · `[table]` settings cheat-sheet · `[table]` shortcuts · `[callout]` privacy defaults

**M3 · Talking to Claude — prompting basics**
- 3.1 What a prompt is and how Claude reads it
- 3.2 Context — what Claude knows inside one chat
- 3.3 Being specific — task, format, constraints
- 3.4 Iterating & follow-ups
- 3.5 Common beginner mistakes
- Visuals: `[diagram]` prompt → think → answer · `[compare]` vague vs specific · `[table]` quick prompt recipes · `[mental-model]` "everything lives in the window"

**M4 · Attachments, writing styles & voice**
- 4.1 Attaching files & images — what Claude can read
- 4.2 Writing styles — preset & custom
- 4.3 Voice input & talking to Claude
- 4.4 Output formats — markdown, tables, artifacts (intro)
- Visuals: `[table]` supported file types · `[diagram]` style pipeline · `[compare]` default vs custom style

**M5 · Memory & chat search**
- 5.1 What Memory is & what it stores (all plans incl. free since 2026-03)
- 5.2 Controlling memory — view / edit / forget; project vs global
- 5.3 Importing memories (e.g. from ChatGPT)
- 5.4 Finding past chats — search
- Visuals: `[diagram]` memory across sessions · `[table]` memory controls · `[callout]` privacy · `[mental-model]` "memory = durable context"

### Section II · Working smarter: prompting & the persistent workspace  `[middle → senior]`

**M6 · Prompting mastery**  ★
- 6.1 Anatomy of a great prompt — role · context · task · format · examples  ★ **Prompt Anatomy sim**
- 6.2 GCAO & structured templates
- 6.3 Patterns — few-shot, step-by-step, decomposition, self-critique
- 6.4 Constraints, output schemas & XML tags
- 6.5 Anti-patterns & debugging a prompt
- Visuals: `[sim ★]` Prompt Anatomy builder · `[table]` pattern catalog · `[compare]` weak vs strong · `[mental-model]` GCAO

**M7 · Projects**
- 7.1 What a Project is — walled context + files + instructions (all plans; 5 on free)
- 7.2 Project instructions — the system prompt you own (behaviour, not facts)
- 7.3 Project knowledge (files) & the context wall — static, window-bound; RAG auto-expands ~10× on **paid** plans (no RAG on free)
- 7.4 Skills & connectors in a project — **correction (verified 2026-06-23): NOT per-project.** Skills are **global + dynamic** (activate everywhere across Claude); connectors are **account/org-level + toggled per chat**; only **knowledge + instructions** are project-scoped. Topic teaches this distinction instead of the original "per-project" framing.
- 7.5 Project vs plain chat — when to use which
- Visuals: `[figure]` project as a walled workspace (knowledge+instructions inside the wall; skills/connectors compose in) · `[table]` project vs chat · `[compare]` project knowledge vs skills · `[callout]` knowledge limits · `[mental-model]` "a room with its own memory"

**M8 · Artifacts**
- 8.1 What artifacts are — runnable outputs in a side panel
- 8.2 Types — documents · code · HTML/React mini-apps · diagrams
- 8.3 Inline visualizations & data analytics
- 8.4 Editing, versioning & sharing
- Visuals: `[diagram]` chat ↔ artifact panel · `[table]` types & when · `[compare]` artifact vs plain output · `[gallery]` examples

**M9 · Live Artifacts**
- 9.1 Stateful artifacts — persistent storage
- 9.2 Connected artifacts — API calls to Claude + MCP
- 9.3 Building a mini-tool you return to
- 9.4 Limits, safety & cost
- Visuals: `[diagram]` live-artifact data flow · `[compare]` static vs live · `[callout]` storage/security · embedded tiny live demo

**M10 · Context & token management**  ★
- 10.1 The context window — what it is, what fills it  ★ **Token Budget sim**
- 10.2 Tokens 101 — what a token is, counting
- 10.3 What gets truncated & how to protect the signal
- 10.4 Cost levers — prompt caching (−90% cached), batch (−50%), model choice
- 10.5 Strategies — projects, skills, summaries, fresh chats
- Visuals: `[sim ★]` Token Budget · `[diagram]` window anatomy · `[table]` cost levers · `[mental-model]` "a finite desk — choose what's on it"

### Section III · Extending Claude  `[senior]`

**M11 · Connectors & MCP**  ★
- 11.1 What MCP is — the protocol, in one mental model
- 11.2 The Connectors Directory (200+) — consumer vs work connectors
- 11.3 Remote (Anthropic-hosted) vs local (stdio)  ★ **MCP Flow sim**
- 11.4 OAuth & permission scopes
- 11.5 Walkthroughs — Notion · Gmail · Google Calendar / Drive
- Visuals: `[sim ★]` MCP Request Flow (remote/local toggle) · `[diagram]` Claude ↔ server ↔ API · `[table]` remote vs local · `[callout]` scopes

**M12 · Skills — concepts & using them**  ★
- 12.1 What a Skill is — packaged, on-demand expertise
- 12.2 SKILL.md anatomy — frontmatter (name+description) · body · resources
- 12.3 Progressive disclosure & token cost  ★ **Progressive Disclosure sim**
- 12.4 Pre-built skills (pptx/xlsx/docx/pdf) & where skills run (claude.ai/API/Bedrock/Foundry)
- 12.5 Adding/installing skills (claude.ai settings · Code · API)
- Visuals: `[sim ★]` Progressive Disclosure · `[diagram]` skill anatomy · `[table]` pre-built skills · `[mental-model]` "a folder Claude opens when relevant"

**M13 · Building your own skills**
- 13.1 Authoring a basic skill (worked recipe)
- 13.2 Adding scripts & resources
- 13.3 Writing descriptions that trigger correctly
- 13.4 Testing & iterating
- 13.5 Packaging & sharing
- Visuals: `[diagram]` build pipeline · `[table]` description do/don't · `[code]` SKILL.md examples · `[callout]` testing

**M14 · Plugins & marketplaces**
- 14.1 What a plugin bundles — skills + subagents + commands + hooks + MCP
- 14.2 Installing plugins & marketplaces
- 14.3 The 11 open-source role plugins (Cowork)
- 14.4 Building & sharing a plugin
- Visuals: `[diagram]` plugin = bundle · `[table]` contents · `[compare]` skill vs plugin · `[callout]` trust/security

### Section IV · Cowork: your desktop agent  `[middle → senior]` — the product-heavy crown

**M15 · Cowork mental model & setup**  ★  **(GOLDEN — built first in S1)**
- 15.1 What Cowork is — the third tab; agent vs chat
- 15.2 The Agent Loop — think → act → observe → repeat  ★ **The Agent Loop sim**
- 15.3 Local files & the workspace folder
- 15.4 Setup & your first task
- 15.5 Cowork vs Claude Code vs plain chat
- Visuals: `[sim ★]` The Agent Loop · `[diagram]` Cowork architecture · `[compare]` agent vs chat · `[mental-model]` "an assistant working at your desk"

**M16 · Files, folders & outputs**  ✅ authored (S6a)
- 16.1 Selecting & granting folders
- 16.2 Reading vs writing — scratchpad vs your folder
- 16.3 Deliverables (docx/xlsx/pptx/pdf) & presenting files
- 16.4 Safety — deletes, overwrites, boundaries
- Visuals: `[diagram]` file flow (uploads · outputs · your folder) · `[table]` output types · `[callout]` delete/overwrite safety

**M17 · Scheduled tasks**  ✅ authored (S6a) — incl. light Schedule-Timeline interactive
- 17.1 What scheduling is — cadence vs one-off
- 17.2 Creating a recurring task — briefings, digests
- 17.3 Cron-style timing & examples
- 17.4 Managing & debugging schedules
- Visuals: `[timeline]` schedule timeline (light animation) · `[table]` cadence patterns · `[compare]` one-off vs recurring · `[mental-model]`

**M18 · Computer use**  ✅ authored (S6b)
- 18.1 When Claude drives your screen
- 18.2 The 3 tiers — connector → browser → computer use
- 18.3 Granting apps & tiers (read / click / full)
- 18.4 Link & financial safety
- Visuals: `[diagram]` 3 tiers of acting on the world (light animation) · `[table]` tier capabilities · `[callout security]` boundaries

**M19 · Cowork projects, connectors, plugins & mobile**  ✅ authored (S7) — figures: cowork-project · dispatch-flow
- 19.1 Cowork projects — persistent context for recurring work
- 19.2 Connectors in Cowork
- 19.3 Plugins & role workflows
- 19.4 Mobile & dispatch — start from your phone
- Visuals: `[diagram]` Cowork project anatomy · `[table]` when to use each · `[flow]` mobile dispatch

### Section V · Claude in your tools & code  `[middle → staff]`

**M20 · Claude in Chrome**  ✅ authored (S7) — incl. light Browser-Agent-Loop interactive
- 20.1 What the browser agent does
- 20.2 Navigate / click / fill forms / extract
- 20.3 Recording workflows
- 20.4 Scheduled web tasks; safety
- Visuals: `[diagram]` browser-agent loop · `[table]` capabilities · `[callout]` safety/permissions

**M21 · Claude for Excel & PowerPoint**  ✅ authored (S7) — figure: excel-citations
- 21.1 Excel agent — multi-tab, cell-level citations
- 21.2 Safe edits & formula dependencies
- 21.3 Pivot tables & formatting via language
- 21.4 Shared context with PowerPoint
- Visuals: `[diagram]` Excel agent · `[table]` capabilities & availability · `[compare]` manual vs agent

**M22 · Claude Code essentials**
- 22.1 Two ways to use (terminal & IDE); environments
- 22.2 Models, effort & permissions
- 22.3 CLAUDE.md — the project brain
- 22.4 Plan mode & verification
- 22.5 MCP in Code
- Visuals: `[diagram]` Code architecture · `[table]` permissions/effort · `[callout]` CLAUDE.md best practice · `[compare]` plan vs auto

**M23 · Sub-agents, agent teams & worktrees**  ★
- 23.1 Sub-agents — own context; isolation & parallelism  ★ **Sub-agent Fan-out sim**
- 23.2 Agent teams — git-coordinated (launched 2026-02)
- 23.3 Git worktrees & parallelization
- 23.4 Skills vs sub-agents — when which
- Visuals: `[sim ★]` Sub-agent Fan-out · `[diagram]` team vs solo · `[compare]` subagent vs skill · `[mental-model]` "fan out, merge back"

**M24 · Hooks, slash commands & advanced agentic patterns**
- 24.1 Hooks — gates around tool calls & lifecycle events
- 24.2 Slash commands & output styles
- 24.3 Patterns — auto-research · multi-agent consensus/debate · pipelines
- 24.4 Harnesses & orchestration
- Visuals: `[diagram]` hook lifecycle · `[table]` hook events · `[flow]` consensus/debate · `[callout]` determinism/safety

### Section VI · Mastery

**M25 · Security & safe agent use**  `[senior]`
- 25.1 Permissions & least privilege
- 25.2 Prompt injection & untrusted content
- 25.3 Link safety & data boundaries
- 25.4 Financial actions & human-in-the-loop
- 25.5 A practical safety checklist
- Visuals: `[diagram]` trust boundaries · `[table]` threat → mitigation · `[callout security]` red lines · `[mental-model]` "treat tool output as untrusted"

**M26 · Choosing the right tool**  ★  `[senior]`
- 26.1 The decision model — task → tool
- 26.2 Cowork vs Code vs Chrome vs Excel vs connector vs skill  ★ **Tool Picker**
- 26.3 Cost / speed / control trade-offs
- 26.4 Worked scenarios
- Visuals: `[sim ★]` Tool Picker · `[table]` tool matrix · `[compare]` overlaps · `[mental-model]`

**M27 · The ecosystem map**  `[senior]`
- 27.1 The layers — models → apps → context → capabilities → orchestration
- 27.2 How the pieces compose — end-to-end examples
- 27.3 The one-picture overview (the landing map, explained)
- Visuals: `[diagram ★]` interactive ecosystem map (= the landing) · `[table]` layer-by-layer · `[mental-model]` the whole picture

**M28 · Mental models gallery + glossary / cheat-sheet**  `[middle]`
- 28.1 The gallery — every mental model to recall from memory
- 28.2 Glossary — bilingual (terms stay English)
- 28.3 Cheat-sheet — one-page power reference
- 28.4 Flashcards / self-check
- Visuals: `[gallery]` all mental models · `[table]` glossary · `[study]` flashcards/quiz

---

## E. Totals & asset budget (target)

- **6 sections · 28 modules · ~120 topics.**
- **6 signature interactives ★:** Prompt Anatomy (M6) · Token Budget (M10) · MCP Flow (M11) ·
  Progressive Disclosure (M12) · The Agent Loop (M15) · Sub-agent Fan-out (M23) · Tool Picker (M26).
  *(7 listed; The Agent Loop is the golden/centerpiece. "Progressive Disclosure" is lighter; trim if needed.)*
- **Interactive Ecosystem Map** as the landing (M27).
- **Diagram-first baseline everywhere else:** ≥1 diagram + ≥1 table per module; a mental-model per module;
  opportunistic light interactives (scheduled-task timeline M17, computer-use tiers M18).
- Every module: mental model · key points · pitfalls · see-also · sources (web-verified per build).

## F. Build order (unchanged from CLAUDE.md §13)

S1 golden = **M15 Cowork + The Agent Loop** (+ scaffold, theme, nav, i18n, landing skeleton, deploy).
Then batch per CLAUDE.md roadmap. Beginner block (M1–M5) built later (S9) since it reuses components.
