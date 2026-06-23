import React, { useMemo, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import { UI } from "../../i18n/ui";
import { go, type Route } from "../../lib/hashRouter";
import { MODULES } from "../../data/concepts";
import { LEVELS, cx } from "../../lib/utils";
import type { Level } from "../../data/types";

type Filter = Level | "all";

export function TopBar({
  route,
  level,
  setLevel,
  onMenuOpen,
}: {
  route: Route;
  level: Filter;
  setLevel: (l: Filter) => void;
  onMenuOpen: () => void;
}): React.ReactElement {
  const { lang, setLang, t } = useLang();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const hits: { id: string; title: string; tag: string }[] = [];
    for (const m of MODULES) {
      const title = t(m.title);
      const hay = (title + " " + t(m.tagline) + " " + m.topics.map((tp) => t(tp.title)).join(" ")).toLowerCase();
      if (hay.includes(q)) hits.push({ id: m.id, title, tag: t(m.tagline) });
      if (hits.length >= 6) break;
    }
    return hits;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, lang]);

  const open = (id: string): void => {
    setQuery("");
    go(`/m/${id}`);
  };

  const navItem = (to: string, on: boolean, label: string): React.ReactElement => (
    <a href={`#${to}`} className={cx(on && "on")}>{label}</a>
  );

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="nav-toggle" onClick={onMenuOpen} aria-label="Open menu">☰</button>

        <button className="brand" onClick={() => go("/map")} aria-label="Home">
          <svg className="logo" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="14" fill="var(--s2)" />
            <g stroke="var(--accent)" strokeWidth="6.5" strokeLinecap="round">
              <line x1="32" y1="13" x2="32" y2="51" />
              <line x1="15.6" y1="22.5" x2="48.4" y2="41.5" />
              <line x1="48.4" y1="22.5" x2="15.6" y2="41.5" />
            </g>
          </svg>
          <span className="brand-text">
            <span className="brand-title"><b>Claude</b></span>
            <span className="brand-sub">{t(UI.brandSub)}</span>
          </span>
        </button>

        <nav className="nav">
          {navItem("/map", route.name === "map", t(UI.nav.map))}
          {navItem("/mental-models", route.name === "mental-models", t(UI.nav.mentalModels))}
          {navItem("/glossary", route.name === "glossary", t(UI.nav.glossary))}
          {navItem("/decide", route.name === "decide", t(UI.nav.decide))}
        </nav>

        <div className="tb-right">
          <div className="segl" role="group" aria-label={t(UI.level)}>
            <span className="lbl">{t(UI.level)}</span>
            <button className={cx("seg", level === "all" && "on")} onClick={() => setLevel("all")}>{t(UI.levelAll)}</button>
            {LEVELS.map((lv) => (
              <button key={lv} className={cx("seg", level === lv && "on")} onClick={() => setLevel(lv)}>{lv}</button>
            ))}
          </div>

          <div className="search-wrap" style={{ position: "relative" }}>
            <div className="search">
              <span aria-hidden="true">⌕</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t(UI.searchPlaceholder)}
                aria-label={t(UI.searchPlaceholder)}
              />
            </div>
            {results.length > 0 ? (
              <ul className="search-results">
                {results.map((r) => (
                  <li key={r.id}>
                    <button onClick={() => open(r.id)}>
                      <span className="sr-title">{r.title}</span>
                      <span className="sr-tag">{r.tag}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="lang" role="group" aria-label="Language">
            <button className={cx(lang === "en" && "on")} onClick={() => setLang("en")}>EN</button>
            <button className={cx(lang === "uk" && "on")} onClick={() => setLang("uk")}>UA</button>
          </div>
        </div>
      </div>
    </header>
  );
}
