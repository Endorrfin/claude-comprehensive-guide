import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Lang, Localized } from "../data/types";

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Resolve a Localized value to the active language. */
  t: (v: Localized) => string;
};

const Ctx = createContext<LangCtx | null>(null);
const STORAGE_KEY = "cg-lang";

function initialLang(): Lang {
  if (typeof localStorage === "undefined") return "en";
  return localStorage.getItem(STORAGE_KEY) === "uk" ? "uk" : "en";
}

export function LangProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
    if (typeof localStorage !== "undefined") localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  // CHANGED (S12): memoize t + value so they're stable while lang is unchanged.
  // Previously a new t/value every render gave consumers' useMemo(…, [t]) zero
  // caching (and forced the exhaustive-deps disables). Now t changes only when
  // lang does, so the search/gallery/glossary memos actually cache.
  const t = useCallback((v: Localized) => (v ? v[lang] : ""), [lang]);
  const value = useMemo<LangCtx>(() => ({ lang, setLang, t }), [lang, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLang must be used inside <LangProvider>");
  return c;
}
