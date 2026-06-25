import React, { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import { UI } from "../../i18n/ui";
import { MODULES, SECTIONS } from "../../data/meta";
import { go } from "../../lib/hashRouter";
import { cx } from "../../lib/utils";
import type { Level, Localized } from "../../data/types";

type Filter = Level | "all";
const KNOWN_KEY = "cg-mm-known";

function loadKnown(): Set<string> {
  if (typeof localStorage === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(KNOWN_KEY);
    // CHANGED (S11): guard against a non-array stored value — `new Set("abc")`
    // would otherwise yield a per-character Set rather than an empty one.
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? (parsed as string[]) : []);
  } catch {
    return new Set();
  }
}

/* The #/mental-models study surface: every module's mental model as a flip-card,
   with a flashcard self-check mode (hide → recall → reveal → mark known). The
   "known" set persists in localStorage; this is a standalone app, not a
   Claude.ai artifact, so localStorage is fine here. */
export function MentalModelsPage({ level }: { level: Filter }): React.ReactElement {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [flash, setFlash] = useState(false);
  const [hideKnown, setHideKnown] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [known, setKnown] = useState<Set<string>>(loadKnown);
  const [seed, setSeed] = useState(0); // 0 = natural order; non-zero = shuffled

  useEffect(() => {
    if (typeof localStorage === "undefined") return;
    try {
      localStorage.setItem(KNOWN_KEY, JSON.stringify([...known]));
    } catch {
      /* storage unavailable — non-fatal */
    }
  }, [known]);

  // CHANGED (S11): re-hide all cards when the working set changes (filter / level /
  // shuffle) so a revealed card can't carry over onto a different card and break
  // the self-test. `enterFlash` still clears reveals when toggling flash mode.
  useEffect(() => {
    setRevealed(new Set());
  }, [query, level, seed]);

  const sec = (sid: string): { accent: string; name: Localized } => {
    const s = SECTIONS.find((x) => x.id === sid);
    return { accent: s?.accent ?? "var(--accent)", name: s?.name ?? { en: "", uk: "" } };
  };

  const base = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = MODULES.filter((m) => level === "all" || m.level === level);
    if (q) {
      list = list.filter((m) =>
        (t(m.title) + " " + t(m.mentalModel) + " " + t(m.tagline)).toLowerCase().includes(q),
      );
    }
    if (flash && hideKnown) list = list.filter((m) => !known.has(m.id));
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, level, flash, hideKnown, known, t]);

  const deck = useMemo(() => {
    if (seed === 0) return base;
    const arr = base.slice();
    let s = seed;
    for (let i = arr.length - 1; i > 0; i--) {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      const j = s % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [base, seed]);

  const reveal = (id: string): void => setRevealed((r) => new Set(r).add(id));
  const markKnown = (id: string): void => {
    setKnown((k) => new Set(k).add(id));
    setRevealed((r) => {
      const n = new Set(r);
      n.delete(id);
      return n;
    });
  };
  const markAgain = (id: string): void => {
    setKnown((k) => {
      const n = new Set(k);
      n.delete(id);
      return n;
    });
    setRevealed((r) => {
      const n = new Set(r);
      n.delete(id);
      return n;
    });
  };
  const enterFlash = (on: boolean): void => {
    setFlash(on);
    setRevealed(new Set());
  };

  const knownCount = MODULES.filter((m) => known.has(m.id)).length;

  return (
    <div className="page mm-page">
      <h1>{t(UI.nav.mentalModels)}</h1>
      <p className="lead">
        {t({
          en: "Every module distilled to one picture to recall from memory. Browse them, or switch on flashcard mode and self-test — say each model out loud before you reveal it.",
          uk: "Кожен модуль, стиснутий до однієї картини, яку треба згадати з памʼяті. Гортай їх або ввімкни flashcard mode і перевір себе — проговори кожну model вголос, перш ніж відкрити.",
        })}
      </p>

      <div className="mm-toolbar">
        <div className="search mm-search">
          <span aria-hidden="true">⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t({ en: "Filter mental models…", uk: "Фільтр mental models…" })}
            aria-label={t({ en: "Filter mental models", uk: "Фільтр mental models" })}
          />
        </div>

        <button
          className={cx("fbtn", flash && "on")}
          aria-pressed={flash}
          onClick={() => enterFlash(!flash)}
        >
          {t({ en: "Flashcard mode", uk: "Flashcard mode" })}
        </button>

        {flash ? (
          <button
            className={cx("fbtn", hideKnown && "on")}
            aria-pressed={hideKnown}
            onClick={() => setHideKnown((h) => !h)}
          >
            {t({ en: "Hide known", uk: "Сховати known" })}
          </button>
        ) : null}

        <button className="fbtn" onClick={() => setSeed(seed === 0 ? Date.now() : 0)}>
          {seed === 0 ? t({ en: "Shuffle", uk: "Перемішати" }) : t({ en: "Reset order", uk: "Скинути порядок" })}
        </button>

        {/* CHANGED (S11): no aria-live — the count updated on every keystroke,
            spamming screen readers; the visible number suffices. */}
        <span className="mm-count">
          {flash ? (
            <>
              <b>{knownCount}</b> / {MODULES.length} {t({ en: "known", uk: "known" })}
            </>
          ) : (
            <>
              <b>{deck.length}</b> {t({ en: "models", uk: "моделей" })}
            </>
          )}
        </span>

        {flash && knownCount > 0 ? (
          <button className="mm-reset" onClick={() => setKnown(new Set())}>
            {t({ en: "Reset progress", uk: "Скинути прогрес" })}
          </button>
        ) : null}
      </div>

      {deck.length === 0 ? (
        <div className="planned">
          {flash && hideKnown
            ? t({ en: "All caught up — every card in this filter is marked known. 🎉", uk: "Усе пройдено — кожну картку в цьому фільтрі позначено known. 🎉" })
            : t({ en: "No mental models match this filter.", uk: "Жодна mental model не підходить під цей фільтр." })}
        </div>
      ) : (
        <div className="mm-grid">
          {deck.map((m) => {
            const s = sec(m.section);
            const isKnown = known.has(m.id);
            const isOpen = !flash || revealed.has(m.id);
            return (
              <div className={cx("mm-card", isKnown && "is-known")} key={m.id} style={{ borderTopColor: s.accent }}>
                <div className="mm-card-top">
                  <span className="mm-num" style={{ color: s.accent }}>{m.id.replace("m", "M")}</span>
                  <span className={cx("lvl-badge", m.level)}>{m.level}</span>
                  {isKnown ? <span className="mm-known" title={t({ en: "known", uk: "known" })}>✓</span> : null}
                </div>
                <div className="mm-head">{t(m.title)}</div>
                <div className="mm-sec" style={{ color: s.accent }}>{t(s.name)}</div>

                {isOpen ? (
                  <div className="mm-a">{t(m.mentalModel)}</div>
                ) : (
                  <button className="mm-prompt" onClick={() => reveal(m.id)}>
                    {t({ en: "Recall it… then click to reveal", uk: "Згадай… потім клікни, щоб відкрити" })}
                  </button>
                )}

                {/* CHANGED (S11): only render the actions row when it has a control.
                    When a flashcard is still hidden, the full-width .mm-prompt above
                    is the single reveal affordance — the old actions-row "Reveal"
                    button was a duplicate of it. */}
                {!flash || isOpen ? (
                  <div className="mm-actions">
                    {flash ? (
                      <>
                        <button className="btn" onClick={() => markKnown(m.id)}>
                          ✓ {t({ en: "Known", uk: "Known" })}
                        </button>
                        <button className="btn" onClick={() => markAgain(m.id)}>
                          ↻ {t({ en: "Again", uk: "Ще раз" })}
                        </button>
                      </>
                    ) : (
                      <button className="btn" onClick={() => go(`/m/${m.id}`)}>
                        {t({ en: "Open module", uk: "Відкрити модуль" })} →
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
