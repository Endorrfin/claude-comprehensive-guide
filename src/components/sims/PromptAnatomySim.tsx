import React, { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import type { Localized } from "../../data/types";
import "./promptAnatomy.css";

/* ★ Prompt Anatomy — the 2nd signature interactive.
   Assemble a prompt from its parts (role · context · task · format · examples ·
   constraints) and watch a *simulated* result sharpen. Each part feeds three
   sub-scores (specificity / consistency / tone-fit); the totals pick a result
   tier. Deterministic, bilingual, reduced-motion friendly (build-up autoplay
   is hidden when the user prefers reduced motion; toggles always work). */

const L = (en: string, uk: string): Localized => ({ en, uk });

type PartKey = "role" | "context" | "task" | "examples" | "format" | "constraints";

type Part = {
  key: PartKey;
  label: Localized;
  color: string; // semantic theme token
  core?: boolean; // task is always present
  text: Localized; // the snippet it adds to the prompt
  spec: number; // contribution: specificity
  cons: number; // contribution: consistency / format-adherence
  tone: number; // contribution: tone & role fit
};

const PARTS: Record<PartKey, Part> = {
  role: {
    key: "role",
    label: L("Role", "Role"),
    color: "var(--sem-claude)",
    text: L(
      "You are a senior customer-support lead known for calm, concise replies.",
      "You are a senior customer-support lead known for calm, concise replies.",
    ),
    spec: 0,
    cons: 0,
    tone: 3,
  },
  context: {
    key: "context",
    label: L("Context", "Context"),
    color: "var(--sem-context)",
    text: L(
      "Context: Pro-plan customer, 2 years with us, double-charged after an upgrade. A warm, specific reply protects a long-term account.",
      "Context: Pro-plan customer, 2 years with us, double-charged after an upgrade. A warm, specific reply protects a long-term account.",
    ),
    spec: 2,
    cons: 0,
    tone: 1,
  },
  task: {
    key: "task",
    label: L("Task", "Task"),
    color: "var(--accent-bright)",
    core: true,
    text: L(
      "Task: Draft a reply that apologises, explains the refund, and gives next steps.",
      "Task: Draft a reply that apologises, explains the refund, and gives next steps.",
    ),
    spec: 2,
    cons: 0,
    tone: 0,
  },
  examples: {
    key: "examples",
    label: L("Examples", "Examples"),
    color: "var(--sem-ok)",
    text: L(
      "<example>\n  Hi Sam — sorry about that! I've refunded the duplicate charge (3–5 days)\n  and added a small credit for the hassle. Anything else I can fix?\n</example>",
      "<example>\n  Hi Sam — sorry about that! I've refunded the duplicate charge (3–5 days)\n  and added a small credit for the hassle. Anything else I can fix?\n</example>",
    ),
    spec: 0,
    cons: 2,
    tone: 1,
  },
  format: {
    key: "format",
    label: L("Format", "Format"),
    color: "var(--sem-agentic)",
    text: L(
      "Format: Respond inside <reply> tags, ≤120 words, warm plain prose — no bullet lists.",
      "Format: Respond inside <reply> tags, ≤120 words, warm plain prose — no bullet lists.",
    ),
    spec: 1,
    cons: 3,
    tone: 0,
  },
  constraints: {
    key: "constraints",
    label: L("Constraints", "Constraints"),
    color: "var(--sem-warn)",
    text: L(
      "Constraints: Don't admit legal fault; don't promise dates we can't meet; add a goodwill credit.",
      "Constraints: Don't admit legal fault; don't promise dates we can't meet; add a goodwill credit.",
    ),
    spec: 2,
    cons: 1,
    tone: 0,
  },
};

/* assembled-prompt order (system/role first → guardrails last) */
const ORDER: PartKey[] = ["role", "context", "task", "examples", "format", "constraints"];
/* parts that toggle (task is core), in build-up sequence */
const OPTIONAL: PartKey[] = ["role", "context", "examples", "format", "constraints"];

type Tier = { name: Localized; color: string; body: Localized };
const TIERS: Tier[] = [
  {
    name: L("Vague", "Розмито"),
    color: "var(--sem-warn)",
    body: L(
      "Here are some thoughts on replying. You could apologise and maybe offer a refund or a discount, depending on your policy. Want me to draft something specific?",
      "Ось кілька думок щодо відповіді. Можна вибачитись і, можливо, запропонувати refund чи знижку — залежно від політики. Зробити конкретну чернетку?",
    ),
  },
  {
    name: L("Getting there", "Уже ближче"),
    color: "var(--sem-agentic)",
    body: L(
      "Hi there — sorry about the trouble with your charge. We can look into a refund for the duplicate. Here's a rough draft you can adjust: \"Thanks for reaching out about the extra charge…\"",
      "Привіт — прикро через цей charge. Можемо розглянути refund за дубль. Ось чернетка, яку можна підправити: \"Thanks for reaching out about the extra charge…\"",
    ),
  },
  {
    name: L("Solid", "Надійно"),
    color: "var(--sem-tool)",
    body: L(
      "Hi Sam — I'm sorry about the double charge after your upgrade. I've started a refund for the duplicate, which lands in a few days. Thanks for being with us — happy to help if anything else looks off.",
      "Hi Sam — перепрошую за подвійний charge після апгрейду. Я запустив refund за дубль, надійде за кілька днів. Дякую, що ти з нами — радий допомогти, якщо ще щось не так.",
    ),
  },
  {
    name: L("Sharp", "Чітко"),
    color: "var(--sem-ok)",
    body: L(
      "<reply>\n  Hi Sam — I'm sorry about the double charge on your upgrade. I've refunded the\n  duplicate (you'll see it in a few days) and added a goodwill credit for the\n  hassle. Thanks for two years with us — tell me if anything still looks off and\n  I'll jump on it.\n</reply>",
      "<reply>\n  Hi Sam — перепрошую за подвійний charge при апгрейді. Я повернув дубль\n  (побачиш за кілька днів) і додав goodwill credit за незручності. Дякую за два\n  роки з нами — напиши, якщо ще щось не так, і я одразу візьмусь.\n</reply>",
    ),
  },
];

const METERS: { key: "spec" | "cons" | "tone"; label: Localized }[] = [
  { key: "spec", label: L("Specificity", "Конкретність") },
  { key: "cons", label: L("Consistency", "Стабільність") },
  { key: "tone", label: L("Tone-fit", "Тон") },
];

function bare(): Record<PartKey, boolean> {
  return { role: false, context: false, task: true, examples: false, format: false, constraints: false };
}
function full(): Record<PartKey, boolean> {
  return { role: true, context: true, task: true, examples: true, format: true, constraints: true };
}

export function PromptAnatomySim(): React.ReactElement {
  const { t } = useLang();
  const [on, setOn] = useState<Record<PartKey, boolean>>(full);
  const [building, setBuilding] = useState(false);
  const [buildStep, setBuildStep] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const sync = (): void => setReduced(mq.matches);
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  /* build-up: reveal optional parts one at a time from bare */
  useEffect(() => {
    if (!building) return;
    if (buildStep >= OPTIONAL.length) {
      setBuilding(false);
      return;
    }
    const id = window.setTimeout(() => {
      const key = OPTIONAL[buildStep];
      setOn((prev) => ({ ...prev, [key]: true }));
      setBuildStep((s) => s + 1);
    }, 1050);
    return () => window.clearTimeout(id);
  }, [building, buildStep]);

  const stop = (): void => setBuilding(false);
  const toggle = (k: PartKey): void => {
    if (PARTS[k].core) return;
    stop();
    setOn((p) => ({ ...p, [k]: !p[k] }));
  };
  const startBuild = (): void => {
    setOn(bare());
    setBuildStep(0);
    setBuilding(true);
  };

  const scores = useMemo(() => {
    let spec = 0,
      cons = 0,
      tone = 0,
      maxSpec = 0,
      maxCons = 0,
      maxTone = 0;
    for (const k of ORDER) {
      const p = PARTS[k];
      maxSpec += p.spec;
      maxCons += p.cons;
      maxTone += p.tone;
      if (on[k]) {
        spec += p.spec;
        cons += p.cons;
        tone += p.tone;
      }
    }
    const total = spec + cons + tone;
    const pct = {
      spec: Math.round((spec / maxSpec) * 100),
      cons: Math.round((cons / maxCons) * 100),
      tone: Math.round((tone / maxTone) * 100),
    };
    const tier = total <= 4 ? 0 : total <= 9 ? 1 : total <= 14 ? 2 : 3;
    return { spec, cons, tone, pct, total, tier };
  }, [on]);

  /* weakest sub-score → suggest the off part that would help most */
  const suggestion = useMemo(() => {
    const order: ("spec" | "cons" | "tone")[] = ["spec", "cons", "tone"];
    const weakest = order.sort((a, b) => scores.pct[a] - scores.pct[b])[0];
    const helper: Record<typeof weakest, PartKey[]> = {
      spec: ["context", "constraints"],
      cons: ["format", "examples"],
      tone: ["role", "context"],
    };
    const pick = helper[weakest].find((k) => !on[k]);
    return pick ? PARTS[pick].label : null;
  }, [scores, on]);

  const onCount = OPTIONAL.filter((k) => on[k]).length;
  const tier = TIERS[scores.tier];

  return (
    <div className="pa">
      {/* part toggles */}
      <div className="pa-chips" role="group" aria-label={t(L("Prompt parts", "Частини prompt"))}>
        {ORDER.map((k) => {
          const p = PARTS[k];
          const active = on[k];
          return (
            <button
              key={k}
              type="button"
              className={`pa-chip${active ? " on" : ""}${p.core ? " core" : ""}`}
              style={active ? { borderColor: p.color, boxShadow: `inset 0 0 0 1px ${p.color}` } : undefined}
              aria-pressed={active}
              disabled={p.core}
              onClick={() => toggle(k)}
              title={p.core ? t(L("Always present — a prompt needs a task", "Завжди присутній — prompt потребує task")) : undefined}
            >
              <span className="pa-dot" style={{ background: active ? p.color : "var(--tx3)" }} />
              {t(p.label)}
              {p.core ? <span className="pa-core-tag">{t(L("core", "ядро"))}</span> : null}
            </button>
          );
        })}
      </div>

      <div className="pa-grid">
        {/* assembled prompt */}
        <div className="pa-prompt" aria-live="polite">
          <div className="pa-cap">{t(L("Your prompt", "Твій prompt"))}</div>
          {ORDER.filter((k) => on[k]).map((k) => {
            const p = PARTS[k];
            return (
              <div className="pa-seg" key={k} style={{ borderLeftColor: p.color }}>
                <span className="pa-seg-label" style={{ color: p.color }}>
                  {t(p.label)}
                </span>
                <pre>{t(p.text)}</pre>
              </div>
            );
          })}
        </div>

        {/* simulated result */}
        <div className="pa-result">
          <div className="pa-cap">
            {t(L("Simulated result", "Симульований результат"))}
            <span className="pa-tier" style={{ color: tier.color, borderColor: tier.color }}>
              {t(tier.name)}
            </span>
          </div>
          <pre className="pa-answer">{t(tier.body)}</pre>

          <div className="pa-meters">
            {METERS.map((m) => (
              <div className="pa-meter" key={m.key}>
                <span className="pa-meter-label">{t(m.label)}</span>
                <span className="pa-bar">
                  <span className="pa-fill" style={{ width: `${scores.pct[m.key]}%` }} />
                </span>
                <span className="pa-pct">{scores.pct[m.key]}%</span>
              </div>
            ))}
          </div>

          <div className="pa-note">
            {onCount === 0
              ? t(L("Just a task — Claude has to guess everything else.", "Лише task — усе інше Claude має вгадувати."))
              : suggestion
                ? t(L("Weakest area → add: ", "Найслабше місце → додай: ")) + t(suggestion)
                : t(L("Fully structured — every lever is in.", "Повністю структуровано — усі важелі на місці."))}
          </div>
        </div>
      </div>

      <div className="pa-controls">
        <button className="btn" onClick={() => { stop(); setOn(bare()); }}>
          {t(L("Bare", "Голий"))}
        </button>
        <button className="btn" onClick={() => { stop(); setOn(full()); }}>
          {t(L("Full", "Повний"))}
        </button>
        {!reduced ? (
          <button className="btn primary" onClick={building ? stop : startBuild}>
            {building ? `❚❚ ${t(L("Building…", "Збираю…"))}` : `▶ ${t(L("Build up", "Зібрати"))}`}
          </button>
        ) : null}
        <span className="spacer" />
        <span className="pa-hint">{t(L("role → context → task → examples → format → constraints", "role → context → task → examples → format → constraints"))}</span>
      </div>
    </div>
  );
}
