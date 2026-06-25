# Polish & Enhancement Plan — Claude: The Comprehensive Guide

> Status (2026-06-25): the guide is **content-complete** — 28/28 modules authored, 10 interactive
> sims (7 signature) + ~26 figures, 3 study surfaces (`#/mental-models`, `#/glossary`, `#/decide`),
> code-split + metadata/body data-split done. This document is the **backlog for the next session(s)**:
> a prioritized list of fixes, UX polish, and new interactives, from a 3-track audit
> (content/UX/bilingual · code/a11y/perf · interactivity gaps).
>
> Convention reminder: content edited only in `src/data/*`; TS strict + ESLint-clean; new sims follow
> the deterministic / play-pause-step or toggle-driven / `prefers-reduced-motion` / ARIA / bilingual
> pattern (mirror `AgentLoopSim` for steppers, `ToolPickerSim` for toggle-driven). Each content change
> ends with the usual verify (tsc + `gen:meta`/meta-sync + data-integrity + render smoke + build).

---

## Q1 · What to fix / edit (correctness)

### P1 — fix first (verified)
1. **Flashcard duplicate "Reveal" control.** `MentalModelsPage.tsx` renders the full-width `.mm-prompt`
   "Recall it… then click to reveal" (L189) **and** a second `btn` "Reveal" (L206) — same `reveal(m.id)`.
   Remove the actions-row Reveal when hidden; keep only the prompt. *(S)*
2. **"27 vs 28 modules" inconsistency.** `concepts.ts` M28 t2 (L4152–4153) says the glossary covers
   "all **27** teaching modules", three lines after the t1 callout says "All **28** mental models" (L4132)
   and the gallery shows 28. Pick one — suggest dropping the number ("every concept across the guide"). *(S)*
3. **Flashcard `revealed` not reset on filter / level / shuffle change** (`MentalModelsPage.tsx`, `revealed`
   only clears on entering flash mode). Add `useEffect(() => setRevealed(new Set()), [query, level, seed])`
   so self-test integrity holds after filtering/shuffling. *(S)*
4. **`aria-live="polite"` on the result counts** (`MentalModelsPage.tsx:145`, `GlossaryPage.tsx:81`) makes
   a screen reader announce the number on **every keystroke** while filtering. Drop `aria-live` from the
   live count (the visible number suffices) or debounce. *(S)*
5. **localStorage / empty-string guards.** `MentalModelsPage.tsx loadKnown()` — `new Set(JSON.parse(...))`
   yields a char-Set if the stored value isn't an array; guard with `Array.isArray`. `GlossaryPage.tsx:32`
   `g.term[0]` throws on an empty term — use `g.term[0]?.toUpperCase() ?? "#"`. *(S)*
6. **Glossary "Claude in Chrome" omits "Pro = Haiku 4.5 only"** (`glossary.ts` ~L786) — the load-bearing
   gotcha M20/M26/M28 all flag. Append it. *(S)*

### P2 — should fix
7. ✅ **DONE (S12).** **Wire the meta-sync check into tooling.** The data-split's only guard against a stale committed
   `meta.json` is `prebuild`/`predev`. Commit the meta-sync assertion (currently only run ad-hoc) as
   `scripts/checkMeta.ts` and add it to `typecheck` (e.g. `... && node --experimental-strip-types
   scripts/checkMeta.ts`) so editor/CI typecheck-only paths can't ship nav/content divergence. *(S–M)*
   → committed `scripts/checkMeta.ts`; `typecheck` = `tsc ×2 && node … checkMeta.ts`.
8. ✅ **DONE (S12).** **Memoize the LangContext value.** `LangContext.tsx:27` makes a new `t` + `value` every render, so the
   `eslint-disable react-hooks/exhaustive-deps` memos in `MentalModelsPage`/`GlossaryPage`/`TopBar` give
   **zero** caching and the disable hides a real future bug. `useMemo` the value + `useCallback` `t` on
   `lang`; then list `t` honestly in deps and drop the disables. Highest-leverage code fix. *(S)*
   → `t = useCallback(…,[lang])`, `value = useMemo(…,[lang,t])`; all three disables dropped (TopBar deps → `[query, t]`).
9. ✅ **DONE (S13).** **Stable shuffle order.** `deck` re-derived from `base`, and `base` depends on `known`, so
   marking a card *known* in flash mode **reshuffled the remaining cards mid-run**. Store the shuffled id list in
   state and filter it for display instead. *(M)*
   → `MentalModelsPage`: `seed:number` → fixed `order:string[]|null` (a snapshot of all ids); `deck` filters+orders
   `base` by it; reveal-reset effect dep `seed` → `order` (still fires on shuffle/reset, not on mark-known).
10. ✅ **DONE (S12).** **`vite.config.ts` manualChunks lumps ALL `node_modules` into `react-vendor`.** Fine today (only
    react/react-dom) but any future dep silently joins the eager critical path. Make it explicit:
    `if (id.includes('react')) return 'react-vendor'`. *(S)*
    → pins only `react`·`react-dom`·`scheduler` via a path regex; everything else gets default lazy chunking. Vendor chunk unchanged (59.65 KB gzip).

### P3 — nice-to-have
11. Dead CSS `.mm-q` / `.mm-hidden` (`global.css` ~L1011–1027) — superseded by `.mm-a`/`.mm-prompt`. Delete. *(S)*
12. `type Filter = Level | "all"` duplicated in 4 files (App/TopBar/Sidebar/MentalModelsPage) — export once
    from `lib/utils.ts`. *(S)*
13. Codegen Node-flag fragility: add `"engines": { "node": ">=22.6" }` + `.nvmrc` so `--experimental-strip-types`
    can't fail cryptically on a different Node. *(S)*
14. Glossary content polish: "1M context" drop the temporal "now" (matches the cheat-sheet's no-pin tone);
    "writing styles" note the menu is going away; consider terms `effort`, `Incognito`, an `Artifact types`
    one-liner (small coverage gaps vs M2/M4/M8). *(S)*

---

## Q2 · Polish / clarity / convenience

- **Flashcard keyboard shortcuts** — space = reveal, k = known, a = again, → = next. Big DX win for a study tool. *(M)*
- **Section grouping on the gallery.** M28 t4 promises a "go **section by section**" loop, but the page has
  only a level filter + free-text search — no section affordance. Add section chips (reuse `.fbtn` + section
  accents) **or** soften the M28 callout copy. *(S–M)*
- **Deeper global search.** TopBar search indexes only title/tagline/topic-titles, so body-only terms
  (e.g. "HNSW", "fsync", "RAG") and glossary terms return nothing though they exist. Extend `genMeta.ts` to
  emit a small per-module keyword index (keyPoints + that module's glossary terms) into `meta.json`; optionally
  merge glossary hits into the search dropdown. Matches the documented "prebuilt search index" intent and keeps
  bodies out of the eager bundle. *(M)*
- **Glossary ↔ module cross-linking both ways.** Module pages don't link prose terms to `#/glossary`; the
  per-term `id`s already exist (`gl-<term>`) — add a hover "#" anchor + (optionally) a `#/glossary#gl-term`
  deep-link route, and consider auto-linking a few key terms from module prose. *(M)*
- **Print cheat-sheet truly one page.** `@media print` sets `break-inside: avoid` on `.data`, so a wide table
  overflows the page edge. Add `@media print { table.data { table-layout: fixed; font-size: 9px } .tbl-wrap {
  overflow: visible } }` and relax `break-inside` on tables. Verify M28 prints clean. *(S)*
- **Warm the glossary empty state** to match the gallery's "All caught up… 🎉". *(S)*
- **Responsive:** raise the 2-col glossary breakpoint 900 → 1000px (avoids a cramped column next to the
  hidden-sidebar band); on phones turn the 11 category chips into a `<select>` or a horizontal-scroll row. *(S)*

---

## Q3 · Where to add interactive sims / emulation / illustration (ranked)

> Inventory: **18 modules have NO sim** (M1–M5, M7, M8, M13, M14, M16, M18, M19, M21, M22, M24, M25, M27, M28).
> The agent/rule/gate-heavy modules (Sections IV–V + the M25 capstone) are exactly where interactivity teaches
> best and are currently static. M4 is the only module with **zero** visual.

**Top builds (highest learning value):**
1. **★ Prompt-Injection / Two-Gate sim — M25 Security** *(M)* — toggle the **READ gate** (trusted↔untrusted
   source) and **ACT gate** (least-privilege↔broad perms); watch an injected "email all contacts" attack
   **land or collapse**, proving "needs BOTH gates → break either". The single highest-insight idea in the
   guide; currently only the static `trust-boundaries` figure. **#1 overall.**
2. ✅ **DONE (S12).** **★ Hook Lifecycle stepper — M24** *(M, figure→sim promotion)* — step UserPromptSubmit→PreToolUse→
   PostToolUse→Stop; toggle a `block-rm` deny-hook and watch a dangerous `rm -rf` get **blocked pre-exec** vs a
   "no hooks" probabilistic baseline. Promotes the existing `hook-lifecycle` figure; pairs with AgentLoopSim.
   → `sims/HooksSim.tsx` (key `hooks`), M24 t1 beside the figure; signature.
3. ✅ **DONE (S12).** **★ Acting-Tiers Router — M18 Computer use** *(S–M, figure→sim)* — pick a target (Slack / web form / native
   app / terminal / trading); see which of the 3 mechanisms (connector→browser→screen) Claude falls through to
   **and** the per-app access tier (View/Click/Full). Resolves the module's own "don't conflate the two tiers"
   warning. Quick + high value.
   → `sims/ActingTiersSim.tsx` (key `acting-tiers-router`), M18 t3; signature.
4. ✅ **DONE (S13).** **★ Permission-Rules Resolver — M22 Claude Code** *(M)* — allow/ask/deny rules +
   permission-mode selector; fire `Edit(...)`, `Bash(rm -rf)`, `Read(.env)` and watch **deny→ask→allow
   first-match-wins** resolve. → `sims/PermissionResolverSim.tsx` (key `permission-resolver`), M22 t2 beside the
   settings.json block; signature (10 → 11). Web-verified the precedence + mode facts against the canonical
   Claude Code permissions doc (deny survives bypass; explicit ask survives bypass; plan is read-only; read-only
   tools need no approval; mode decides only unmatched calls).
5. **Read/Write/Scratchpad sim — M16** *(M)* — 3 lanes (uploads · sandbox VM · granted folder); run a task,
   watch the scratchpad get **wiped** while the deliverable persists; delete hits the permission gate.

**Quick wins (S / S–M, toggle-driven):**
6. **Cell-Citation provenance — M21** *(S–M)* — click a citation chip → highlight source cells + the formula;
   toggle a dependency-safe edit. Promotes `excel-citations`.
7. **Memory across-sessions stepper — M5** *(S)* — timeline of chats; Global vs walled-Project memory;
   Incognito reads/writes nothing.
8. **Context-Wall & RAG — M7** *(M)* — knowledge fills toward the wall; Free truncates, Paid flips to RAG.
   **Scope tightly to RAG** to avoid overlap with M10's Token-Budget sim; cross-link.
9. **Effort/thinking trade-off micro-widget — M2** *(S)* — on-ramp to M10.
10. **Wire the orphaned `style-pipeline` figure into M4** *(trivial)* — `style-pipeline` is registered but
    **referenced nowhere**, and M4 is the only zero-visual module. One `figure` block fixes both. **Do first.**

**Single best ROI:** M25 two-gate (raw value) · M24 hooks + M18 tiers (value-per-effort, both promote existing
figures into the loop/gate interaction the module already describes).

---

## Q4 · Other recommendations

- **Don't per-module split the 623 KB `ModulePage` body chunk now** — it loads once on first module open then
  caches; 28 dynamic imports would add round-trips and complicate search for no real gain. If latency ever
  bites, split `concepts.ts` per *section* behind the existing lazy boundary. (Recorded as a deliberate "no".)
- **Treat `meta.json` like a lockfile** — already committed + regenerated by `prebuild`/`predev`; just wire the
  sync check (Q1-7) so it can't silently drift.
- **Consider a tiny `useDebounce`** for the two search inputs (also fixes the aria-live noise).
- A **global "keyboard shortcuts" help** (`?`) once the flashcard shortcuts land.

---

## Q5 · Which model for this work

- **Opus** — for the **audit-driven judgment work and the new signature sims** (M25 two-gate, M24 hooks, M22
  resolver): novel stateful-React design, subtle a11y/UX, bilingual factual care, and the architecture-level
  calls. Quality-over-speed (the project's stated cadence) favors Opus here.
- **Sonnet** — for the **mechanical bulk**: the P1/P3 small fixes, dead-code removal, wiring `style-pipeline`
  into M4, glossary one-liners, and the *toggle-driven quick-win sims* (M21 cell-citation, M5 memory) once the
  pattern is set. Fast + cost-effective, and the conventions are well-established.
- **Haiku** — only trivial chores (renames, formatting); not for this.

**Recommended split (mirrors the guide's own M26 Tool-Picker logic — hard/novel → Opus, volume → Sonnet):**
do the audit + design + the 2–3 hero sims (M25 → M24 → M18) **on Opus**, then hand the small fixes and the
quick-win sims to **Sonnet**. If you'd rather not switch models, run the whole session on **Opus** — it's the
safer single choice for the interactive builds and the bilingual correctness bar.

**Suggested first next-session slice:** Q1 P1 fixes (fast, satisfying) → wire `style-pipeline` into M4 →
**★ M25 two-gate sim** (the marquee add) → verify. That ships visible quality + the single biggest learning win.
