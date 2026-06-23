# PROJECT BRIEF — the ideal commission for this guide

> **What this is.** The single *upstream* instruction that, handed to a capable agent at the start,
> lets it build the whole guide with **near-zero clarification**. It complements `CLAUDE.md`:
> this BRIEF is the **input** (what I, the commissioner, want and how I want you to work); `CLAUDE.md`
> is the **living contract** the agent maintains from it. The section structure is **reusable** for
> any future deep-dive guide (just refill §1–§6 and §11).
>
> **How to read it (agent):** treat §5 (locked decisions) and §10 (decision rights) as authoritative —
> do **not** re-ask anything answered here. If something genuinely isn't covered, see §10 for whether to
> decide or ask.

---

## 0. TL;DR — the one-paragraph commission

Build a **deep, interactive, bilingual (EN/UA) web guide to Claude and its tools**, modelled on the
`_examples/node-js_comprehensive-guide` quality bar, **power-user / product-heavy**, with a short
beginner on-ramp. Vite + React + TS, static, GitHub Pages. Teach with prose **plus** diagrams, tables,
mental models and a handful of **signature interactive simulators**; diagram-first everywhere else.
Work **plan-first, one or two modules per session, quality over speed**, verify every session, and
close each session with a fixed summary. Decisions in §5 are locked — don't re-ask them.

---

## 1. Goal & why

A guide that makes a professional **understand, internalize and remember** how to use Claude like an
expert — not a feature list, but mental models + hands-on interactives. Doubles as a public portfolio
piece (GitHub Pages, possibly LinkedIn).

## 2. Audience & outcomes

- **Primary:** power users / professionals (middle → senior → staff). **Secondary:** a 3–5 module
  beginner on-ramp.
- **After reading, the user can:** pick the right Claude surface for a task; prompt well; use Projects,
  Artifacts, Memory; wire Connectors/MCP and Skills; run Cowork as an agent; reason about context/cost;
  and work safely. Every module is **independently useful** (skippable, jumpable).
- **Success = depth + learning UX + correctness**, in that order. Completeness and polish next. Speed last.

## 3. References & quality bar (what "golden" means)

- **Gold standard:** `_examples/node-js_comprehensive-guide` — data-driven chapters, hero simulators,
  verified facts. Match its depth and polish.
- **Form references:** `_examples/Design Principles & Patterns` (interactive map / landing) and
  `_examples/world-map` (bilingual Vite + Pages reference).
- **"Golden" for one module =** clear mental model + prose that teaches (not lists) + ≥1 diagram + ≥1
  table + key points + pitfalls + (optional) interview Q&A + cross-links + **verified sources**, in
  **both languages**, typechecking and building clean.

## 4. Scope

- **In:** the whole Claude product+agent surface — models, apps (web/desktop/mobile), prompting,
  Projects, Artifacts (incl. live/connected), Memory, Context/tokens, Connectors/MCP, Skills, Plugins,
  Cowork (the crown), Computer use, Chrome, Excel/PowerPoint, Claude Code, sub-agents/agent teams,
  hooks/advanced agentic, security, tool-choice, the ecosystem map, mental-models/glossary.
- **Curriculum source:** `info.txt` (3 video chapter-lists) is the **seed** — cover it, but **don't
  limit to it**; go beyond. Detailed map lives in `CURRICULUM.md`.
- **Weighting:** product/power-user heavy; Claude Code + agentic is a solid but **lighter** group.
- **Out (for now):** per-concept PDF booklet, LinkedIn asset pack — **deferred/optional**, not in the
  core build.

## 5. Locked decisions — DO NOT re-ask

| Topic | Decision |
|---|---|
| **Stack** | Vite + React 19 + TypeScript (strict). No router lib (hash router). All content static. |
| **Content model** | Single source of truth `src/data/concepts.ts`; pages render from data. `Section → Module → Topic → Block`. |
| **Language** | Bilingual **EN/UA** with a runtime toggle. **All technical terms stay English** in both; translate only explanation/analogy. Author EN first, UA second. |
| **Theme** | Claude-inspired **dark** — coral/clay accent on warm dark, cream text. Fonts **Fraunces** (display) · Inter · JetBrains Mono. |
| **Interactivity** | **Blend**: ~6 signature sims where they add insight + diagram-first baseline elsewhere. Each sim has a reduced-motion step fallback. |
| **Signature sims** | Agent Loop (M15, golden) · Prompt Anatomy (M6) · Token Budget (M10) · MCP Flow (M11) · Progressive Disclosure (M12) · Sub-agent Fan-out (M23) · Tool Picker (M26). |
| **Deploy** | GitHub Pages via Actions. Repo `claude-comprehensive-guide` @ `endorrfin` → `https://endorrfin.github.io/claude-comprehensive-guide/`. `vite base:'./'` + `.nojekyll`. |
| **Golden module** | M15 Cowork mental model + The Agent Loop (built first). |
| **Tooling** | Node 22 LTS; TS strict + `noUnusedLocals/Parameters`; build must pass. |

## 6. Constraints & non-negotiables

- **Correctness mandate.** Claude's product surface drifts and the build model's cutoff is older than
  the live date. **Web-search and verify every version-sensitive fact** (models, prices, availability,
  dates) per module; fill `sources`; never trust memory. Challenge the curriculum when verification
  contradicts it (e.g. Skills are global, not per-project).
- **Content only in `src/data/*`** — never hand-edit rendered output.
- **Accessibility:** keyboard nav, focus rings, ARIA on sims, `prefers-reduced-motion` fallback,
  contrast-checked palette.
- **Bilingual integrity:** every human-readable string is `Localized {en;uk}`; no missing language.
- **Security framing** throughout (least privilege, untrusted tool output, link/financial safety).
- **Sandbox gotchas:** Linux sandbox blocks `unlink` (don't run git against the live repo from it;
  build/verify in a scratch copy; user runs `npm install` locally for darwin-arm64 binaries). Exclude
  `_examples/` and `info.txt` from git/deploy.

## 7. Deliverables

- **The web guide** (primary). **`README.md`** (overview + live link + commands).
- **`CLAUDE.md`** kept current (source of truth + status log). **`CURRICULUM.md`** kept current.
- Deferred/optional: PDF booklet, LinkedIn pack.

## 8. Working agreement (how I want you to work)

- **Plan → approve → build.** Big steps get a plan I sign off on before implementation.
- **Cadence:** 1–2 modules per session, **golden quality**; speed is not a priority.
- **Verify every session:** `tsc --noEmit` clean + `vite build` OK + a data-integrity check + fact
  spot-check. High-stakes facts double-checked.
- **The 8 working rules:** (1) specific solutions, not generic; (2) brief "why", not lectures;
  (3) describe change + why **before** doing it; (4) mark in-code edits `// CHANGED:`; (5) lint-aware;
  (6) reliability/security/best-practice first; (7) ask when unclear; (8) don't just agree — challenge
  wrong/partial reasoning with questions.
- **Branch/commit:** branch `sN-short-topic`; concise imperative commit messages.
- **Session summary (every session):** (1) what was done; (2) branch + commit + short description;
  (3) challenges/questions.

## 9. Definition of Done

- **Per module:** all topics authored EN+UA; mental model, key points, pitfalls, see-also, sources;
  any planned diagrams/tables/sim present; typecheck + build clean; facts verified & cited.
- **Per session:** the above for the session's modules + verification run + summary delivered +
  `CLAUDE.md` status log updated.
- **Project:** all ~28 modules authored; 6 signature sims + ecosystem map; global search, glossary,
  mental-models gallery; bilingual QA; deployed and live.

## 10. Decision rights (so you don't stall on small things)

- **Decide yourself:** component structure & naming; micro-UX & copy wording; which diagram type;
  colors *within* the locked palette; ordering of blocks within a module; how to phrase a mental model;
  test/verification details.
- **Ask me first:** changing scope (adding/dropping modules); changing stack, theme, or language
  policy; anything that changes the published URL or breaks the data contract; spending real money or
  taking destructive/irreversible actions; product facts that web search can't resolve.

## 11. Clarifying questions — the checklist (with this project's answers)

> Reusable question set. Answers below are this project's; for a new guide, re-answer §11 + refill §1–§6.

- **Who's the reader / what should they do after?** → power users; outcomes in §2.
- **Personal / public / portfolio?** → mastery + public (Pages, maybe LinkedIn).
- **Success metric?** → depth > learning-UX > correctness > completeness > polish > speed.
- **Topic boundaries; in/out?** → §4.
- **Curriculum source; seed vs cover-all?** → `info.txt` seed; go beyond; `CURRICULUM.md` is the map.
- **Weighting?** → product-heavy; Code/agentic lighter.
- **Depth per concept?** → deep-dive (mental model + interactive/diagram + verified facts).
- **Fact freshness?** → web-verify version-sensitive facts per module.
- **Format?** → static web app on GitHub Pages.
- **Interactivity ambition?** → signature sims + diagram-first blend (§5).
- **Language(s) + rules?** → bilingual EN/UA; terms stay English (§5).
- **Theme/brand?** → Claude-dark + Fraunces (§5).
- **A11y/perf?** → §6.
- **Stack? Hosting? Repo?** → §5.
- **Reuse patterns?** → yes — mirror the Node guide architecture and components.
- **Cadence; speed vs quality?** → 1–2 modules/session; quality first.
- **Plan-first vs iterative?** → plan → approve → build.
- **Verification / DoD?** → §8, §9.
- **Conventions; where content is edited?** → `src/data/*` only; §8.
- **Decision rights?** → §10.
- **Session report format?** → §8 (3-part summary).
- **Hard constraints / environment?** → §6 (sandbox, Node 22, exclude `_examples`).
- **Quality exemplar?** → the Node guide (§3).

## 12. How to start a session (bootstrap ritual)

1. Read `CLAUDE.md` fully, then the relevant `CURRICULUM.md` section(s), then the existing
   `src/components/*` + `src/data/concepts.ts` patterns.
2. Confirm the session's target modules (from the roadmap) and restate the plan briefly.
3. Build to the golden bar; **web-verify** every version-sensitive fact and fill `sources`.
4. Verify: `tsc` + `vite build` + data-integrity check (in a scratch copy; don't touch the live `.git`).
5. Update the `CLAUDE.md` status log and deliver the 3-part session summary.
