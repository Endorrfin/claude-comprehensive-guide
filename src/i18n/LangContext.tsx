import React, { createContext, useContext, useEffect, useState } from "react";
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

  const value: LangCtx = { lang, setLang, t: (v) => (v ? v[lang] : "") };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLang must be used inside <LangProvider>");
  return c;
}
