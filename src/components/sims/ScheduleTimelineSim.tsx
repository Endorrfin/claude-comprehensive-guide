import React, { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import type { Localized } from "../../data/types";
import "./scheduleTimeline.css";

/* Scheduled-task timeline — a light interactive for M17.
   Pick a cadence (one-off · hourly · daily · weekdays · weekly), see the
   underlying cron and a plain-English description, then play a "now" cursor
   across the timeline and watch each run fire and write a dated file.
   Toggle "Computer asleep" to demonstrate the real rule (verified 2026-06-23):
   tasks only run while your computer is awake and Claude Desktop is open —
   runs that land in the asleep window are SKIPPED, then caught up on wake.
   Deterministic; bilingual; reduced-motion drops the autoplay only. */

const L = (en: string, uk: string): Localized => ({ en, uk });

type CKey = "once" | "hourly" | "daily" | "weekdays" | "weekly";
type Fire = { pos: number; label: Localized; slug: string };

const DAYS: Localized[] = [
  L("Mon", "Пн"), L("Tue", "Вт"), L("Wed", "Ср"), L("Thu", "Чт"), L("Fri", "Пт"), L("Sat", "Сб"), L("Sun", "Нд"),
];

const CADENCES: { key: CKey; label: Localized; cron: Localized; english: Localized }[] = [
  { key: "once", label: L("One-off", "Одноразово"), cron: L("fireAt — runs once", "fireAt — один раз"), english: L("Run a single time at a future moment, then done.", "Запуск один раз у майбутній момент — і все.") },
  { key: "hourly", label: L("Hourly", "Щогодини"), cron: L("0 * * * *", "0 * * * *"), english: L("At minute 0 of every hour.", "На 0-й хвилині кожної години.") },
  { key: "daily", label: L("Daily", "Щодня"), cron: L("0 7 * * *", "0 7 * * *"), english: L("Every day at 07:00.", "Щодня о 07:00.") },
  { key: "weekdays", label: L("Weekdays", "По буднях"), cron: L("0 7 * * 1-5", "0 7 * * 1-5"), english: L("Mon–Fri at 07:00 (skips the weekend).", "Пн–Пт о 07:00 (без вихідних).") },
  { key: "weekly", label: L("Weekly", "Щотижня"), cron: L("0 7 * * 1", "0 7 * * 1"), english: L("Every Monday at 07:00.", "Щопонеділка о 07:00.") },
];

/* Asleep window on the 0..1 axis (≈ overnight). */
const SLEEP_A = 0.44;
const SLEEP_B = 0.6;
const inSleep = (pos: number): boolean => pos >= SLEEP_A && pos <= SLEEP_B;

function buildFires(c: CKey): Fire[] {
  if (c === "once") return [{ pos: 0.5, label: L("Tue · 09:00", "Вт · 09:00"), slug: "once" }];
  if (c === "weekly")
    return [
      { pos: 0.27, label: L("Mon · wk 1", "Пн · тижд. 1"), slug: "wk1" },
      { pos: 0.78, label: L("Mon · wk 2", "Пн · тижд. 2"), slug: "wk2" },
    ];
  if (c === "hourly")
    return Array.from({ length: 8 }, (_, i) => {
      const hh = 9 + i;
      return { pos: (i + 0.5) / 8, label: L(`${hh}:00`, `${hh}:00`), slug: `${hh}00` };
    });
  const n = c === "weekdays" ? 5 : 7;
  return Array.from({ length: n }, (_, i) => ({ pos: (i + 0.5) / n, label: DAYS[i], slug: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"][i] }));
}

const X0 = 44;
const X1 = 676;
const px = (pos: number): number => X0 + pos * (X1 - X0);

export function ScheduleTimelineSim(): React.ReactElement {
  const { t } = useLang();
  const [cad, setCad] = useState<CKey>("daily");
  const [asleep, setAsleep] = useState(false);
  const [now, setNow] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  const fires = useMemo(() => buildFires(cad), [cad]);
  const meta = CADENCES.find((c) => c.key === cad)!;
  const skipped = asleep ? fires.filter((f) => inSleep(f.pos)) : [];
  const hasCatchup = asleep && skipped.length > 0;

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (): void => setReduced(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  // reset the cursor whenever the scenario changes
  useEffect(() => {
    setPlaying(false);
    setNow(reduced ? 1 : 0);
  }, [cad, asleep, reduced]);

  useEffect(() => {
    if (!playing) return;
    if (now >= 1) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setNow((x) => Math.min(1, +(x + 0.02).toFixed(3))), 70);
    return () => window.clearTimeout(id);
  }, [playing, now]);

  // event log up to `now`, in time order, with skip + catch-up handling
  type LogRow = { key: string; tone: "ran" | "skip" | "catch"; label: Localized; file: Localized };
  const log: LogRow[] = [];
  for (const f of fires) {
    if (now < f.pos) continue;
    if (asleep && inSleep(f.pos)) {
      log.push({ key: f.slug, tone: "skip", label: f.label, file: L("skipped — computer asleep", "пропущено — компʼютер спав") });
    } else {
      log.push({ key: f.slug, tone: "ran", label: f.label, file: L(`briefing-${f.slug}.md written`, `briefing-${f.slug}.md записано`) });
    }
  }
  if (hasCatchup && now >= SLEEP_B) {
    log.push({ key: "catch", tone: "catch", label: L("On wake", "При пробудженні"), file: L(`caught up ${skipped.length} run(s)`, `надолужено ${skipped.length} запуск(ів)`) });
  }

  const ranCount = log.filter((r) => r.tone === "ran").length;
  const nowX = px(Math.min(now, 1));

  return (
    <div className="st">
      {/* cadence selector */}
      <div className="st-seg" role="group" aria-label={t(L("Cadence", "Періодичність"))}>
        {CADENCES.map((c) => (
          <button key={c.key} className={cad === c.key ? "on" : ""} aria-pressed={cad === c.key} onClick={() => setCad(c.key)}>
            {t(c.label)}
          </button>
        ))}
      </div>

      {/* cron + english readout */}
      <div className="st-readout">
        <span className="st-cron">{t(meta.cron)}</span>
        <span className="st-english">{t(meta.english)}</span>
        <button className={`st-lever${asleep ? " on" : ""}`} aria-pressed={asleep} onClick={() => setAsleep((v) => !v)}>
          <span className="st-lever-dot" style={{ background: asleep ? "var(--sem-warn)" : "var(--tx3)" }} />
          {t(L("Computer asleep", "Компʼютер спить"))}
        </button>
      </div>

      {/* the timeline */}
      <svg className="st-stage" viewBox="0 0 720 132" role="img" aria-label={t(L("Timeline of scheduled runs; a moving cursor fires each run.", "Таймлайн запланованих запусків; курсор запускає кожен.") )} style={{ fontFamily: "var(--font-body)" }}>
        {/* asleep band */}
        {asleep ? (
          <g>
            <rect x={px(SLEEP_A)} y={26} width={px(SLEEP_B) - px(SLEEP_A)} height={64} fill="var(--sem-warn)" opacity={0.12} />
            <line x1={px(SLEEP_A)} y1={26} x2={px(SLEEP_A)} y2={90} stroke="var(--sem-warn)" strokeWidth={1} strokeDasharray="3 3" />
            <line x1={px(SLEEP_B)} y1={26} x2={px(SLEEP_B)} y2={90} stroke="var(--sem-warn)" strokeWidth={1} strokeDasharray="3 3" />
            <text x={(px(SLEEP_A) + px(SLEEP_B)) / 2} y={20} textAnchor="middle" fontSize={10} fill="var(--sem-warn)" style={{ fontFamily: "var(--font-mono)" }}>{t(L("asleep / app closed", "сон / застосунок закрито"))}</text>
          </g>
        ) : null}

        {/* baseline */}
        <line x1={X0} y1={66} x2={X1} y2={66} stroke="var(--line2)" strokeWidth={1.5} />
        <text x={X0} y={112} fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>now</text>
        <text x={X1} y={112} textAnchor="end" fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>→ time</text>

        {/* catch-up marker */}
        {hasCatchup ? (
          <g opacity={now >= SLEEP_B ? 1 : 0.3}>
            <path d={`M ${px(SLEEP_B)} 52 q 14 -22 28 0`} fill="none" stroke="var(--sem-ok)" strokeWidth={1.4} strokeDasharray="3 2" />
            <circle cx={px(SLEEP_B) + 28} cy={52} r={6} fill="var(--sem-ok)" />
            <text x={px(SLEEP_B) + 28} y={38} textAnchor="middle" fontSize={9.5} fill="var(--sem-ok)" style={{ fontFamily: "var(--font-mono)" }}>{t(L("catch-up", "надолуження"))}</text>
          </g>
        ) : null}

        {/* fire markers */}
        {fires.map((f) => {
          const fired = now >= f.pos;
          const skip = asleep && inSleep(f.pos);
          const color = skip ? "var(--tx3)" : fired ? "var(--sem-ok)" : "var(--sem-agentic)";
          return (
            <g key={f.slug} className={fired && !skip ? "st-fire" : ""}>
              <line x1={px(f.pos)} y1={56} x2={px(f.pos)} y2={66} stroke={color} strokeWidth={1.4} />
              <circle cx={px(f.pos)} cy={50} r={fired ? 6 : 5} fill={skip ? "var(--surface)" : color} stroke={color} strokeWidth={1.6} />
              {skip ? <text x={px(f.pos)} y={54} textAnchor="middle" fontSize={9} fill="var(--sem-warn)">✕</text> : null}
              <text x={px(f.pos)} y={84} textAnchor="middle" fontSize={9.5} fill={fired ? "var(--tx2)" : "var(--tx3)"} style={{ fontFamily: "var(--font-mono)" }}>{t(f.label)}</text>
            </g>
          );
        })}

        {/* now cursor */}
        <line x1={nowX} y1={30} x2={nowX} y2={92} stroke="var(--accent)" strokeWidth={1.8} />
        <circle cx={nowX} cy={30} r={4.5} fill="var(--accent)" />
      </svg>

      {/* controls */}
      <div className="st-controls">
        <button className="btn" onClick={() => { setPlaying(false); setNow(0); }} disabled={now === 0 && !playing}>↺ {t(L("Reset", "Скинути"))}</button>
        {!reduced ? (
          <button className="btn primary" onClick={() => { if (now >= 1) setNow(0); setPlaying((p) => !p); }}>
            {playing ? `❚❚ ${t(L("Pause", "Пауза"))}` : `▶ ${t(L("Play", "Грати"))}`}
          </button>
        ) : null}
        <button className="btn" onClick={() => { setPlaying(false); setNow(1); }} disabled={now >= 1}>{t(L("Run to end", "До кінця"))} →</button>
        <span className="st-spacer" />
        <span className="st-count">{ranCount} {t(L("run(s) fired", "запуск(ів)"))}{hasCatchup ? ` · ${skipped.length} ${t(L("skipped", "пропущено"))}` : ""}</span>
      </div>

      {/* run log */}
      <div className="st-log" aria-live="polite">
        {log.length === 0 ? (
          <div className="st-log-empty">{t(L("Press Play — each run writes a dated file to your folder.", "Натисни Play — кожен запуск пише датований файл у твою теку."))}</div>
        ) : (
          log.map((r, i) => (
            <div className="st-log-row" key={`${r.key}-${i}`}>
              <span className={`st-dot ${r.tone}`} />
              <span className="st-log-when">{t(r.label)}</span>
              <span className={`st-log-file ${r.tone}`}>{t(r.file)}</span>
            </div>
          ))
        )}
      </div>

      {/* insight */}
      <div className="st-note">
        {asleep
          ? t(L(
              "Runs that fall while the computer is asleep or Claude Desktop is closed are skipped — then run once automatically on wake, and the skip shows in the task's history.",
              "Запуски, що випадають на сон компʼютера або закритий Claude Desktop, пропускаються — потім один раз автоматично виконуються при пробудженні, а пропуск видно в історії задачі.",
            ))
          : cad === "once"
            ? t(L(
                "A one-off uses fireAt — a single future run. Everything else uses a cron-style cadence that repeats.",
                "Одноразова використовує fireAt — один майбутній запуск. Решта — cron-подібна періодичність, що повторюється.",
              ))
            : t(L(
                "Each tick is one run in its own Cowork session, using the connectors, skills and plugins you've set up.",
                "Кожна позначка — окремий запуск у власній сесії Cowork, з твоїми connectors, skills і plugins.",
              ))}
      </div>
    </div>
  );
}
