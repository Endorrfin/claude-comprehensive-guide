import React, { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import type { Localized } from "../../data/types";
import "./fileFlowSim.css";

/* ★ FileFlow — the deterministic file-lifecycle stepper (M16). Promotes the
   static `file-flow` figure into the task it describes: a csv→xlsx report walks
   through the three places — chat Uploads, the isolated Sandbox VM scratchpad,
   and Your granted folder — and the final frame asks "what survived the
   session". A Destination toggle (Your folder ↔ Scratchpad only) flips whether
   the deliverable persists or is wiped with the VM; a Permission-mode toggle
   shows the delete gate firing in BOTH modes. Deterministic; play/pause/step;
   reduced-motion-safe; ARIA live region; bilingual. Mirrors HooksSim (a stepper
   whose toggle flips the outcome). */
const L = (en: string, uk: string): Localized => ({ en, uk });

type Dest = "folder" | "scratch";
type Mode = "ask" | "auto";
type Place = "uploads" | "sandbox" | "folder";
type ChipState = "idle" | "active" | "danger" | "gone" | "survived";
type Chip = { name: string; state: ChipState };
type Step = {
  active: Place | "gate";
  label: Localized;
  detail: Localized;
  uploads: Chip[];
  sandbox: Chip[];
  folder: Chip[];
  gate?: boolean;
  end?: boolean;
};

const CSV = "sales.csv";
const PY = "build.py";
const SUM = "summary.tmp";
const OLD = "report-old.xlsx";
const OUT = "report.xlsx";

const c = (name: string, state: ChipState): Chip => ({ name, state });

/* Fixed lanes, top → bottom (mirrors the file-flow figure's three places). */
const LANES: { id: Place; label: Localized; sub: Localized; color: string; y: number; h: number }[] = [
  { id: "uploads", label: L("Uploads", "Uploads"), sub: L("chat · temp", "chat · temp"), color: "var(--sem-tool)", y: 14, h: 52 },
  { id: "sandbox", label: L("Sandbox VM", "Sandbox VM"), sub: L("scratchpad · temp", "scratchpad · temp"), color: "var(--sem-ok)", y: 76, h: 58 },
  { id: "folder", label: L("Your folder", "Твоя тека"), sub: L("granted · persists", "надано · зберігається"), color: "var(--sem-context)", y: 144, h: 70 },
];
const LANE_COLOR: Record<Place, string> = { uploads: "var(--sem-tool)", sandbox: "var(--sem-ok)", folder: "var(--sem-context)" };

/** The one task, six frames. Destination flips the deliverable's fate; mode
    re-narrates the delete gate, which fires either way. */
function buildSteps(dest: Dest, mode: Mode): Step[] {
  const toFolder = dest === "folder";
  return [
    {
      active: "uploads",
      label: L("Read the input", "Читання вхідних даних"),
      detail: L(
        "sales.csv comes in as a chat upload, and Claude reads it into context — the read path. Your granted folder already holds a stale report-old.xlsx.",
        "sales.csv приходить як chat-upload, і Claude читає його в context — це read path. Твоя надана тека вже містить застарілий report-old.xlsx.",
      ),
      uploads: [c(CSV, "active")],
      sandbox: [],
      folder: [c(OLD, "idle")],
    },
    {
      active: "sandbox",
      label: L("Build in the sandbox", "Збірка в sandbox"),
      detail: L(
        "Claude runs code in the isolated sandbox VM: it parses the CSV and computes the summary. Every file here is scratch — temporary, wiped after the task.",
        "Claude виконує код в ізольованій sandbox VM: парсить CSV і рахує підсумок. Усі файли тут — чернетка: тимчасові, стираються після задачі.",
      ),
      uploads: [c(CSV, "idle")],
      sandbox: [c(PY, "active"), c(CSV, "active"), c(SUM, "active")],
      folder: [c(OLD, "idle")],
    },
    {
      active: "gate",
      gate: true,
      label:
        mode === "ask"
          ? L("Delete the stale report — it asks", "Видалити застарілий звіт — питає")
          : L("Delete the stale report — it STILL asks", "Видалити застарілий звіт — ВСЕ ОДНО питає"),
      detail:
        mode === "ask"
          ? L(
              "Before writing, Claude removes the old report-old.xlsx. In Ask-before-acting it pauses for each action — and deletes always show a prompt. You click Allow.",
              "Перед записом Claude прибирає старий report-old.xlsx. У Ask-before-acting він робить паузу на кожну дію — а видалення завжди показує запит. Ти тиснеш Allow.",
            )
          : L(
              "You chose Act-without-asking, so Claude runs without pausing — except deleting a file ALWAYS asks. The deletion gate holds in both modes. You click Allow.",
              "Ти обрав Act-without-asking, тож Claude працює без пауз — окрім видалення файлу, яке ЗАВЖДИ питає. Gate видалення діє в обох режимах. Ти тиснеш Allow.",
            ),
      uploads: [c(CSV, "idle")],
      sandbox: [c(PY, "idle"), c(CSV, "idle"), c(SUM, "idle")],
      folder: [c(OLD, "danger")],
    },
    {
      active: toFolder ? "folder" : "sandbox",
      label: L("Write the deliverable", "Запис результату"),
      detail: toFolder
        ? L(
            "Claude writes report.xlsx via the xlsx skill — into your granted folder, with live formulas and multiple tabs. Deliverables cap at 30 MB per file.",
            "Claude пише report.xlsx через xlsx skill — у твою надану теку, з живими формулами й кількома вкладками. Результати — до 30 MB на файл.",
          )
        : L(
            "Here the result is only staged in the scratchpad — never written out to your folder. (Real Cowork writes to your granted folder; this branch shows why that matters.)",
            "Тут результат лише лишається в scratchpad — його не записують у твою теку. (Справжній Cowork пише в надану теку; ця гілка показує, чому це важливо.)",
          ),
      uploads: [c(CSV, "idle")],
      sandbox: toFolder
        ? [c(PY, "idle"), c(CSV, "idle"), c(SUM, "idle")]
        : [c(PY, "idle"), c(CSV, "idle"), c(SUM, "idle"), c(OUT, "active")],
      folder: toFolder ? [c(OUT, "active")] : [],
    },
    {
      active: toFolder ? "folder" : "sandbox",
      label: L("Present it in chat", "Показ у чаті"),
      detail: L(
        "A file card appears in chat (present_files) so you can open report.xlsx — wherever it was written.",
        "У чаті зʼявляється file-картка (present_files), щоб відкрити report.xlsx — там, де його записали.",
      ),
      uploads: [c(CSV, "idle")],
      sandbox: toFolder
        ? [c(PY, "idle"), c(CSV, "idle"), c(SUM, "idle")]
        : [c(PY, "idle"), c(CSV, "idle"), c(SUM, "idle"), c(OUT, "idle")],
      folder: toFolder ? [c(OUT, "idle")] : [],
    },
    {
      active: "folder",
      end: true,
      label: L("What survived the session", "Що пережило сесію"),
      detail: toFolder
        ? L(
            "The session ends: the sandbox VM and the chat uploads are wiped. report.xlsx survived — because it lives in your granted folder.",
            "Сесія завершується: sandbox VM і chat-uploads стираються. report.xlsx вижив — бо лежить у твоїй наданій теці.",
          )
        : L(
            "The session ends: the sandbox VM is wiped — and report.xlsx went with it. Nothing survived. Only your granted folder persists, so that's where finished work must land.",
            "Сесія завершується: sandbox VM стирається — а з нею і report.xlsx. Не вижило нічого. Зберігається лише надана тека, тож саме туди має потрапляти готова робота.",
          ),
      uploads: [c(CSV, "gone")],
      sandbox: toFolder
        ? [c(PY, "gone"), c(CSV, "gone"), c(SUM, "gone")]
        : [c(PY, "gone"), c(CSV, "gone"), c(SUM, "gone"), c(OUT, "gone")],
      folder: toFolder ? [c(OUT, "survived")] : [],
    },
  ];
}

export function FileFlowSim(): React.ReactElement {
  const { t } = useLang();
  const [dest, setDest] = useState<Dest>("folder");
  const [mode, setMode] = useState<Mode>("ask");
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  const steps = useMemo(() => buildSteps(dest, mode), [dest, mode]);
  const cur = steps[Math.min(i, steps.length - 1)];
  const atEnd = i >= steps.length - 1;
  const toFolder = dest === "folder";
  const activePlace: Place = cur.active === "gate" ? "folder" : cur.active;

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (): void => setReduced(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  // Flipping either toggle re-arms the run from the start.
  useEffect(() => {
    setPlaying(false);
    setI(0);
  }, [dest, mode]);

  useEffect(() => {
    if (!playing) return;
    if (i >= steps.length - 1) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setI((x) => Math.min(x + 1, steps.length - 1)), 1500);
    return () => window.clearTimeout(id);
  }, [playing, i, steps.length]);

  const verdict = toFolder
    ? {
        cls: "safe",
        title: L("report.xlsx survived 🛡", "report.xlsx вижив 🛡"),
        body: L(
          "It was written to your granted folder, the one place that persists. The sandbox VM and chat uploads were wiped with the session.",
          "Його записали в надану теку — єдине місце, що зберігається. Sandbox VM і chat-uploads стерлися разом із сесією.",
        ),
      }
    : {
        cls: "risk",
        title: L("Nothing survived ⚠", "Нічого не вижило ⚠"),
        body: L(
          "report.xlsx only lived in the scratchpad, so it was wiped with the VM. Deliverables must be written to your granted folder — the only place that lasts.",
          "report.xlsx існував лише в scratchpad, тож стерся разом із VM. Результати треба писати в надану теку — це єдине, що лишається.",
        ),
      };

  const stepChipLabel: Localized =
    cur.active === "gate"
      ? L("🔒 delete gate", "🔒 delete gate")
      : cur.active === "uploads"
        ? L("Uploads", "Uploads")
        : cur.active === "sandbox"
          ? L("Sandbox", "Sandbox")
          : L("Your folder", "Твоя тека");
  const stepChipColor = cur.active === "gate" ? "var(--sem-warn)" : LANE_COLOR[activePlace];

  const renderChip = (chip: Chip, x: number, y: number, laneColor: string): React.ReactElement => {
    const W = 84,
      H = 22;
    let fill = "var(--code-bg)",
      stroke = laneColor,
      sw = 1.2,
      txc = "var(--tx2)",
      op = 1;
    if (chip.state === "active") {
      fill = "var(--s2)";
      sw = 2;
      txc = "var(--tx)";
    } else if (chip.state === "danger") {
      fill = "rgba(248,113,113,0.14)";
      stroke = "var(--sem-warn)";
      sw = 1.8;
      txc = "var(--tx)";
    } else if (chip.state === "survived") {
      fill = "rgba(108,194,74,0.16)";
      stroke = "var(--sem-ok)";
      sw = 2.2;
      txc = "var(--tx)";
    } else if (chip.state === "gone") {
      stroke = "var(--line2)";
      txc = "var(--tx3)";
      op = 0.4;
    }
    const glyph = chip.state === "survived" ? "✓ " : "";
    return (
      <g key={chip.name + x} opacity={op} style={{ transition: reduced ? "none" : "opacity 0.3s ease" }}>
        <rect x={x} y={y} width={W} height={H} rx={6} fill={fill} stroke={stroke} strokeWidth={sw} />
        <text x={x + W / 2} y={y + 15} textAnchor="middle" fontSize={10.5} fill={txc} style={{ fontFamily: "var(--font-mono)" }}>
          {glyph}
          {chip.name}
        </text>
        {chip.state === "gone" ? <line x1={x + 6} y1={y + H / 2} x2={x + W - 6} y2={y + H / 2} stroke="var(--tx3)" strokeWidth={1.3} /> : null}
      </g>
    );
  };

  return (
    <div className="ffs">
      <div className="ffs-toggles">
        <div className="ffs-toggle-wrap">
          <div className="ffs-q">{t(L("Where does the deliverable land?", "Куди потрапляє результат?"))}</div>
          <div className="ffs-opts" role="radiogroup" aria-label={t(L("Destination", "Призначення"))}>
            <button className={toFolder ? "ffs-opt on ok" : "ffs-opt"} role="radio" aria-checked={toFolder} onClick={() => setDest("folder")}>
              <span className="ffs-opt-l">{t(L("Your folder", "Твоя тека"))}</span>
              <span className="ffs-opt-s">{t(L("granted · persists", "надано · зберігається"))}</span>
            </button>
            <button className={!toFolder ? "ffs-opt on danger" : "ffs-opt"} role="radio" aria-checked={!toFolder} onClick={() => setDest("scratch")}>
              <span className="ffs-opt-l">{t(L("Scratchpad only", "Лише scratchpad"))}</span>
              <span className="ffs-opt-s">{t(L("temp · wiped", "тимчасово · стерто"))}</span>
            </button>
          </div>
        </div>

        <div className="ffs-toggle-wrap">
          <div className="ffs-q">{t(L("Permission mode", "Режим дозволів"))}</div>
          <div className="ffs-opts" role="radiogroup" aria-label={t(L("Permission mode", "Режим дозволів"))}>
            <button className={mode === "ask" ? "ffs-opt on ok" : "ffs-opt"} role="radio" aria-checked={mode === "ask"} onClick={() => setMode("ask")}>
              <span className="ffs-opt-l">{t(L("Ask before acting", "Ask before acting"))}</span>
              <span className="ffs-opt-s">{t(L("pauses each action", "пауза на кожну дію"))}</span>
            </button>
            <button className={mode === "auto" ? "ffs-opt on danger" : "ffs-opt"} role="radio" aria-checked={mode === "auto"} onClick={() => setMode("auto")}>
              <span className="ffs-opt-l">{t(L("Act without asking", "Act without asking"))}</span>
              <span className="ffs-opt-s">{t(L("deletes still ask", "видалення все одно питає"))}</span>
            </button>
          </div>
        </div>
      </div>

      <svg
        className="ffs-stage"
        viewBox="0 0 760 246"
        role="img"
        aria-label={t(
          L(
            "Three lanes: chat Uploads (temporary), the isolated Sandbox VM scratchpad (temporary), and Your granted folder (persists). A csv→xlsx report is read, built in the sandbox, a stale file is deleted behind a permission gate, the deliverable is written, and the final frame shows what survives once the session is wiped.",
            "Три доріжки: chat Uploads (тимчасово), ізольована Sandbox VM scratchpad (тимчасово) і твоя надана тека (зберігається). Звіт csv→xlsx читається, збирається в sandbox, застарілий файл видаляється за permission gate, результат записується, а фінальний кадр показує, що виживає після стирання сесії.",
          ),
        )}
        style={{ fontFamily: "var(--font-body)" }}
      >
        {LANES.map((lane) => {
          const on = activePlace === lane.id;
          const chips = lane.id === "uploads" ? cur.uploads : lane.id === "sandbox" ? cur.sandbox : cur.folder;
          const temp = lane.id !== "folder";
          const chipY = lane.y + lane.h / 2 - 11;
          return (
            <g key={lane.id} opacity={on ? 1 : 0.86} style={{ transition: reduced ? "none" : "opacity 0.3s ease" }}>
              <rect
                x={12}
                y={lane.y}
                width={736}
                height={lane.h}
                rx={11}
                fill={on ? "var(--s2)" : "var(--surface)"}
                stroke={lane.color}
                strokeWidth={lane.id === "folder" ? (on ? 2.6 : 2) : on ? 2.4 : 1.3}
              />
              <text
                x={26}
                y={lane.y + 24}
                fontSize={lane.id === "folder" ? 13 : 12.5}
                fontWeight={700}
                fill={lane.id === "folder" ? "var(--sem-context)" : "var(--tx)"}
                style={{ fontFamily: "var(--font-head)" }}
              >
                {t(lane.label)}
              </text>
              <text x={26} y={lane.y + 40} fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>
                {t(lane.sub)}
              </text>
              {cur.end && temp ? (
                <text x={150} y={lane.y + 24} fontSize={10.5} fontWeight={700} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>
                  ⌫ {t(L("wiped", "стерто"))}
                </text>
              ) : null}
              {chips.map((chip, idx) => renderChip(chip, 188 + idx * 92, chipY, lane.color))}
            </g>
          );
        })}

        {cur.gate ? (
          <g>
            <rect x={372} y={160} width={364} height={38} rx={9} fill="var(--bg)" stroke="var(--sem-warn)" strokeWidth={1.8} />
            <text x={554} y={178} textAnchor="middle" fontSize={11.5} fontWeight={700} fill="var(--sem-warn)">
              🔒 {t(L("Delete asks — Allow?", "Видалення питає — Allow?"))}
            </text>
            <text x={554} y={192} textAnchor="middle" fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>
              {t(L("fires in both permission modes", "спрацьовує в обох режимах"))}
            </text>
          </g>
        ) : null}

        <text x={380} y={234} textAnchor="middle" fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>
          {t(L("only your granted folder persists — uploads and the sandbox are scratch", "зберігається лише надана тека — uploads і sandbox це чернетка"))}
        </text>
      </svg>

      <div className="ffs-grid">
        <div className="ffs-panel">
          <span className="ffs-step-no">
            {t(L("Step", "Крок"))} {i + 1} / {steps.length}
          </span>
          <div>
            <span className="ffs-chip" style={{ background: stepChipColor }}>{t(stepChipLabel)}</span>
          </div>
          <div className="ffs-label">{t(cur.label)}</div>
          <div className="ffs-detail" aria-live="polite">{t(cur.detail)}</div>
        </div>
        <div className={`ffs-verdict ${atEnd ? verdict.cls : "pending"}`} aria-live="polite">
          {atEnd ? (
            <>
              <div className="ffs-verdict-t">{t(verdict.title)}</div>
              <div className="ffs-verdict-b">{t(verdict.body)}</div>
            </>
          ) : (
            <div className="ffs-verdict-b">
              <div>
                {t(L("Destination", "Призначення"))}:{" "}
                <b className={toFolder ? "ok" : "danger"}>{toFolder ? t(L("your folder", "твоя тека")) : t(L("scratchpad", "scratchpad"))}</b>
              </div>
              <div>
                {t(L("Deletes", "Видалення"))}: <b className="ok">{t(L("always ask — in both modes", "завжди питають — в обох режимах"))}</b>
              </div>
              <div className="ffs-verdict-run">{t(L("Step to the end to see what survives.", "Дійди до кінця, щоб побачити, що виживе."))}</div>
            </div>
          )}
        </div>
      </div>

      <div className="ffs-controls">
        <button className="btn" onClick={() => { setPlaying(false); setI(0); }} disabled={i === 0 && !playing}>
          ↺ {t(L("Reset", "Скинути"))}
        </button>
        <button className="btn" onClick={() => { setPlaying(false); setI((x) => Math.max(0, x - 1)); }} disabled={i === 0}>
          ← {t(L("Back", "Назад"))}
        </button>
        {!reduced ? (
          <button className="btn primary" onClick={() => { if (atEnd) setI(0); setPlaying((p) => !p); }}>
            {playing ? `❚❚ ${t(L("Pause", "Пауза"))}` : `▶ ${t(L("Play", "Грати"))}`}
          </button>
        ) : null}
        <button className="btn" onClick={() => { setPlaying(false); setI((x) => Math.min(steps.length - 1, x + 1)); }} disabled={atEnd}>
          {t(L("Step", "Крок"))} →
        </button>
        <span className="spacer" />
        <span className="ffs-hint">{t(L("the deliverable only lasts if it lands in your folder", "результат лишається, лише якщо потрапив у твою теку"))}</span>
      </div>

      <div className="ffs-foot">
        {t(
          L(
            "Only your granted folder persists — the sandbox and chat uploads are scratch. Write finished work to your folder; and remember, deletes always ask, in both permission modes.",
            "Зберігається лише надана тека — sandbox і chat-uploads це чернетка. Пиши готову роботу у свою теку; і памʼятай: видалення завжди питає, в обох режимах дозволів.",
          ),
        )}
      </div>
    </div>
  );
}
