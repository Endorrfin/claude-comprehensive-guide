import React, { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import type { Localized } from "../../data/types";
import "./progressiveDisclosure.css";

/* ★ Progressive Disclosure — the 5th signature interactive.
   Skills load in three levels on demand, so the context window only ever holds
   what the current task needs:
     L1 metadata (name + description) — always in the system prompt (~100 tok/skill)
     L2 SKILL.md body — read via bash only when the task matches (<5k tok)
     L3 bundled files & scripts — read only the file the task needs; scripts run
        via bash so their CODE never enters context, only their output.
   Pick a task, step through, and compare the running context against the naive
   "paste every skill's whole folder up front" baseline. Deterministic; bilingual;
   reduced-motion drops the autoplay + width transitions. Token sizes are
   illustrative but follow the published model (L1 ~100, L2 <5k, L3 unbounded). */

const L = (en: string, uk: string): Localized => ({ en, uk });

type FileKind = "doc" | "script";
type SkillFile = { name: string; kind: FileKind; size: number; output?: number };
type CatSkill = { id: string; name: string; meta: number; body: number; files: SkillFile[] };

const SYSTEM = 1500;
const USER = 60;
const GENERIC_NAIVE = 100 + 2500 + 4000 + 900; // a typical skill's whole folder ≈ 7,500 tok

const CATALOG: CatSkill[] = [
  { id: "pdf", name: "pdf", meta: 100, body: 2200, files: [
    { name: "FORMS.md", kind: "doc", size: 1800 },
    { name: "REFERENCE.md", kind: "doc", size: 3400 },
    { name: "fill_form.py", kind: "script", size: 900, output: 120 },
  ] },
  { id: "pptx", name: "pptx", meta: 100, body: 2600, files: [
    { name: "LAYOUTS.md", kind: "doc", size: 2400 },
    { name: "build_deck.py", kind: "script", size: 1100, output: 140 },
  ] },
  { id: "xlsx", name: "xlsx", meta: 100, body: 2400, files: [
    { name: "FORMULAS.md", kind: "doc", size: 3000 },
    { name: "pivot.py", kind: "script", size: 800, output: 110 },
  ] },
  { id: "brand", name: "brand-style", meta: 100, body: 1500, files: [
    { name: "COLORS.md", kind: "doc", size: 800 },
    { name: "VOICE.md", kind: "doc", size: 1100 },
  ] },
];

type Task = {
  id: string; label: Localized; skill: string | null;
  reads: string[]; runs: string[]; answer: Localized;
};

const TASKS: Task[] = [
  { id: "fillpdf", label: L("Fill a PDF form", "Заповнити PDF-форму"), skill: "pdf",
    reads: ["FORMS.md"], runs: ["fill_form.py"],
    answer: L("Form filled and saved — Claude read FORMS.md and ran fill_form.py.", "Форму заповнено й збережено — Claude прочитав FORMS.md і запустив fill_form.py.") },
  { id: "sumpdf", label: L("Summarize a PDF", "Підсумувати PDF"), skill: "pdf",
    reads: [], runs: [],
    answer: L("Summary delivered — form filling wasn't needed, so FORMS.md stayed on disk.", "Підсумок готовий — заповнення форми не потрібне, тож FORMS.md лишився на диску.") },
  { id: "deck", label: L("Build a slide deck", "Зробити презентацію"), skill: "pptx",
    reads: ["LAYOUTS.md"], runs: ["build_deck.py"],
    answer: L("Deck built — Claude used LAYOUTS.md and ran build_deck.py via bash.", "Презентацію зібрано — Claude використав LAYOUTS.md і запустив build_deck.py через bash.") },
  { id: "chat", label: L("General question", "Загальне питання"), skill: null,
    reads: [], runs: [],
    answer: L("Answered from the base model — no skill matched, so nothing extra loaded.", "Відповідь від базової моделі — жоден skill не підійшов, тож нічого не завантажено.") },
];

const COLORS = {
  sys: "var(--tx3)",
  meta: "var(--sem-context)",
  user: "var(--accent-deep)",
  body: "var(--sem-claude)",
  doc: "var(--sem-tool)",
  script: "var(--sem-agentic)",
};

type Seg = { key: string; label: Localized; tokens: number; color: string };
type Frame = { title: Localized; detail: Localized; bash?: string; segs: Seg[] };

function build(task: Task, extra: number): { frames: Frame[]; naive: number } {
  const installed = CATALOG.length + extra;
  const metaTokens = 100 * installed;
  const skill = task.skill ? CATALOG.find((s) => s.id === task.skill) ?? null : null;

  const segSys: Seg = { key: "sys", label: L("system prompt", "системний prompt"), tokens: SYSTEM, color: COLORS.sys };
  const segMeta: Seg = { key: "meta", label: L(`metadata · ${installed} skills`, `metadata · ${installed} skills`), tokens: metaTokens, color: COLORS.meta };
  const segUser: Seg = { key: "user", label: L("your message", "твоє повідомлення"), tokens: USER, color: COLORS.user };

  const naiveNamed = CATALOG.reduce((sum, s) => sum + s.meta + s.body + s.files.reduce((a, f) => a + f.size, 0), 0);
  const naive = SYSTEM + USER + naiveNamed + extra * GENERIC_NAIVE;

  const frames: Frame[] = [];

  frames.push({
    title: L("Installed — idle", "Встановлено — спокій"),
    detail: L(
      `Every installed skill's name + description sits in the system prompt — about 100 tokens each, ${metaTokens} tokens for ${installed} skills. Every SKILL.md body and bundled file is still on disk, costing nothing.`,
      `Назва + description кожного встановленого skill лежить у системному prompt — приблизно 100 токенів кожен, ${metaTokens} токенів на ${installed} skills. Усі body SKILL.md і вкладені файли поки на диску й нічого не коштують.`,
    ),
    segs: [segSys, segMeta],
  });

  frames.push({
    title: L("Your task arrives", "Надходить задача"),
    detail: skill
      ? L(`Claude scans the metadata and matches your request to the “${skill.name}” skill's description.`, `Claude переглядає metadata й зіставляє запит із description skill «${skill.name}».`)
      : L("Claude scans the metadata — no skill's description matches, so none is loaded.", "Claude переглядає metadata — жоден description не підходить, тож нічого не вантажиться."),
    segs: [segSys, segMeta, segUser],
  });

  if (skill) {
    const segBody: Seg = { key: "body", label: L(`${skill.name} SKILL.md`, `${skill.name} SKILL.md`), tokens: skill.body, color: COLORS.body };

    frames.push({
      title: L("Level 2 · read SKILL.md", "Рівень 2 · читання SKILL.md"),
      detail: L(
        `Your request matched, so Claude reads the body of ${skill.name}/SKILL.md from the filesystem — only now do its instructions enter the context window.`,
        `Запит підійшов, тож Claude читає body ${skill.name}/SKILL.md з файлової системи — лише тепер його інструкції потрапляють у context window.`,
      ),
      bash: `read ${skill.name}/SKILL.md`,
      segs: [segSys, segMeta, segUser, segBody],
    });

    const docs = task.reads.map((n) => skill.files.find((f) => f.name === n)).filter((f): f is SkillFile => !!f);
    const runs = task.runs.map((n) => skill.files.find((f) => f.name === n)).filter((f): f is SkillFile => !!f);
    const l3segs: Seg[] = [];
    for (const d of docs) l3segs.push({ key: `doc-${d.name}`, label: L(d.name, d.name), tokens: d.size, color: COLORS.doc });
    for (const r of runs) l3segs.push({ key: `out-${r.name}`, label: L(`${r.name} → output`, `${r.name} → output`), tokens: r.output ?? 100, color: COLORS.script });
    const unread = skill.files.filter((f) => !task.reads.includes(f.name) && !task.runs.includes(f.name));
    const firstRun = runs[0];

    frames.push({
      title: L("Level 3 · only what's needed", "Рівень 3 · лише потрібне"),
      detail:
        l3segs.length === 0
          ? L(
              `Nothing else is needed, so every bundled file stays on disk — ${skill.files.map((f) => f.name).join(", ")} are never read. Same skill, far less context.`,
              `Більше нічого не треба, тож усі вкладені файли лишаються на диску — ${skill.files.map((f) => f.name).join(", ")} не читаються. Той самий skill, набагато менше context.`,
            )
          : L(
              `Claude reads only ${docs.map((d) => d.name).join(", ") || "—"}${firstRun ? ` and runs ${runs.map((r) => r.name).join(", ")} via bash — the code never enters context, only its ~${firstRun.output} token output` : ""}.${unread.length ? ` ${unread.map((u) => u.name).join(", ")} stays on disk.` : ""}`,
              `Claude читає лише ${docs.map((d) => d.name).join(", ") || "—"}${firstRun ? ` і запускає ${runs.map((r) => r.name).join(", ")} через bash — код не входить у context, лише ~${firstRun.output} токенів виводу` : ""}.${unread.length ? ` ${unread.map((u) => u.name).join(", ")} лишається на диску.` : ""}`,
            ),
      bash: runs.length ? `run ${runs.map((r) => r.name).join(" && ")}` : docs.length ? `read ${docs.map((d) => d.name).join(", ")}` : undefined,
      segs: [segSys, segMeta, segUser, segBody, ...l3segs],
    });

    frames.push({ title: L("Answer", "Відповідь"), detail: task.answer, segs: [segSys, segMeta, segUser, segBody, ...l3segs] });
  } else {
    frames.push({ title: L("Answer", "Відповідь"), detail: task.answer, segs: [segSys, segMeta, segUser] });
  }

  return { frames, naive };
}

export function ProgressiveDisclosureSim(): React.ReactElement {
  const { t } = useLang();
  const [taskId, setTaskId] = useState<string>("fillpdf");
  const [extra, setExtra] = useState(0);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  const task = useMemo(() => TASKS.find((x) => x.id === taskId) ?? TASKS[0], [taskId]);
  const { frames, naive } = useMemo(() => build(task, extra), [task, extra]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (): void => setReduced(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (i >= frames.length - 1) { setPlaying(false); return; }
    const id = window.setTimeout(() => setI((x) => Math.min(x + 1, frames.length - 1)), 1600);
    return () => window.clearTimeout(id);
  }, [playing, i, frames.length]);

  const restart = (next: () => void): void => { setPlaying(false); setI(0); next(); };

  const cur = frames[Math.min(i, frames.length - 1)];
  const atEnd = i >= frames.length - 1;
  const curTotal = cur.segs.reduce((a, s) => a + s.tokens, 0);
  const savedPct = Math.round(((naive - curTotal) / naive) * 100);
  const has = (k: string): boolean => cur.segs.some((s) => s.key === k);
  const fmt = (n: number): string => n.toLocaleString("en-US");

  return (
    <div className="pd">
      {/* toolbar */}
      <div className="pd-toolbar">
        <div className="pd-seg" role="group" aria-label={t(L("Task", "Задача"))}>
          {TASKS.map((x) => (
            <button key={x.id} className={taskId === x.id ? "on" : ""} aria-pressed={taskId === x.id} onClick={() => restart(() => setTaskId(x.id))}>{t(x.label)}</button>
          ))}
        </div>
        <span className="pd-spacer" />
        <span className="pd-stepctl" aria-label={t(L("Installed skills", "Встановлені skills"))}>
          {t(L("Installed", "Встановлено"))}:
          <button onClick={() => restart(() => setExtra((e) => Math.max(0, e - 4)))} disabled={extra === 0} aria-label={t(L("fewer skills", "менше skills"))}>−</button>
          <b>{CATALOG.length + extra}</b>
          <button onClick={() => restart(() => setExtra((e) => Math.min(40, e + 4)))} disabled={extra >= 40} aria-label={t(L("more skills", "більше skills"))}>+</button>
        </span>
      </div>

      {/* the two bars */}
      <div className="pd-bars" role="img" aria-label={t(L("Context usage with progressive disclosure versus loading every skill up front.", "Використання context із progressive disclosure проти завантаження всіх skills наперед."))}>
        <div className="pd-bar-row">
          <div className="pd-bar-label">{t(L("Progressive", "Progressive"))}<small>{t(L("loads on demand", "вантажить за потреби"))}</small></div>
          <div className="pd-track">
            {cur.segs.map((s) => (
              <div key={s.key} className="pd-fill" style={{ width: `${(s.tokens / naive) * 100}%`, background: s.color }} title={`${t(s.label)} · ${fmt(s.tokens)}`}>
                <span>{(s.tokens / naive) > 0.08 ? t(s.label) : ""}</span>
              </div>
            ))}
          </div>
          <div className="pd-bar-num">{fmt(curTotal)}<small>{t(L("tokens", "токенів"))}</small></div>
        </div>
        <div className="pd-bar-row">
          <div className="pd-bar-label">{t(L("Naive", "Наївно"))}<small>{t(L("load everything", "завантажити все"))}</small></div>
          <div className="pd-track naive">
            <div className="pd-fill" style={{ width: "100%", background: "var(--tx3)" }}><span>{t(L("every skill's whole folder", "уся тека кожного skill"))}</span></div>
          </div>
          <div className="pd-bar-num">{fmt(naive)}<small>{t(L("tokens", "токенів"))}</small></div>
        </div>
      </div>

      <div className="pd-legend">
        <span><i className="pd-dot" style={{ background: COLORS.sys }} />{t(L("system", "system"))}</span>
        <span><i className="pd-dot" style={{ background: COLORS.meta }} />{t(L("L1 metadata", "L1 metadata"))}</span>
        <span><i className="pd-dot" style={{ background: COLORS.user }} />{t(L("message", "повідомлення"))}</span>
        <span><i className="pd-dot" style={{ background: COLORS.body }} />{t(L("L2 SKILL.md body", "L2 body SKILL.md"))}</span>
        <span><i className="pd-dot" style={{ background: COLORS.doc }} />{t(L("L3 bundled file", "L3 вкладений файл"))}</span>
        <span><i className="pd-dot" style={{ background: COLORS.script }} />{t(L("L3 script output", "L3 вивід скрипта"))}</span>
        <span className="pd-saved">↓ {savedPct}% {t(L("saved", "заощаджено"))}</span>
      </div>

      {/* shelf of skills on disk */}
      <div className="pd-shelf">
        {CATALOG.map((s) => {
          const active = task.skill === s.id && i >= 1;
          return (
            <div key={s.id} className={active ? "pd-skill active" : "pd-skill"}>
              <div className="pd-skill-name">{s.name}/</div>
              <div className="pd-part lit"><i className="pd-dot" style={{ background: COLORS.meta }} />{t(L("metadata · L1", "metadata · L1"))}</div>
              <div className={active && has("body") ? "pd-part lit" : "pd-part"}><i className="pd-dot" style={{ background: COLORS.body }} />SKILL.md · L2</div>
              {s.files.map((f) => {
                const lit = active && (has(`doc-${f.name}`) || has(`out-${f.name}`));
                return (
                  <div key={f.name} className={lit ? "pd-part lit" : "pd-part"}>
                    <i className="pd-dot" style={{ background: f.kind === "script" ? COLORS.script : COLORS.doc }} />
                    {f.name}{f.kind === "script" ? " · bash" : " · L3"}
                  </div>
                );
              })}
            </div>
          );
        })}
        {extra > 0 ? (
          <div className="pd-skill pd-extra">
            <b>+{extra}</b>
            {t(L("more skills — metadata only", "ще skills — лише metadata"))}
          </div>
        ) : null}
      </div>

      {/* detail + log */}
      <div className="pd-grid">
        <div className="pd-panel" aria-live="polite">
          <span className="pd-step-no">{t(L("Step", "Крок"))} {i + 1} / {frames.length}</span>
          <div className="pd-label">{t(cur.title)}</div>
          <div className="pd-detail">{t(cur.detail)}</div>
          {cur.bash ? <div className="pd-bash">bash: {cur.bash}</div> : null}
        </div>
        <div className="pd-log">
          {frames.slice(0, i + 1).map((f, idx) => (
            <div className="pd-log-row" key={idx}>
              <span className="ph">{idx + 1}</span>
              <span>{t(f.title)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* controls */}
      <div className="pd-controls">
        <button className="btn" onClick={() => { setPlaying(false); setI(0); }} disabled={i === 0 && !playing}>↺ {t(L("Reset", "Скинути"))}</button>
        <button className="btn" onClick={() => { setPlaying(false); setI((x) => Math.max(0, x - 1)); }} disabled={i === 0}>← {t(L("Back", "Назад"))}</button>
        {!reduced ? (
          <button className="btn primary" onClick={() => { if (atEnd) setI(0); setPlaying((p) => !p); }}>
            {playing ? `❚❚ ${t(L("Pause", "Пауза"))}` : `▶ ${t(L("Play", "Грати"))}`}
          </button>
        ) : null}
        <button className="btn" onClick={() => { setPlaying(false); setI((x) => Math.min(frames.length - 1, x + 1)); }} disabled={atEnd}>{t(L("Step", "Крок"))} →</button>
        <span className="pd-spacer" />
        <span className="pd-hint">{t(L("startup → match → SKILL.md → only what's needed", "startup → match → SKILL.md → лише потрібне"))}</span>
      </div>
    </div>
  );
}
