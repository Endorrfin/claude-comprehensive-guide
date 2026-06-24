import React, { Suspense, useEffect, useState } from "react";
import { useRoute } from "./lib/hashRouter";
import { useLang } from "./i18n/LangContext";
import { TopBar } from "./components/layout/TopBar";
import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
import type { Level } from "./data/types";

// CHANGED (S10b): route pages are lazy-loaded so each becomes its own chunk;
// the shell (TopBar/Sidebar/Footer) stays eager for instant nav + search.
const EcosystemMap = React.lazy(() => import("./components/map/EcosystemMap").then((m) => ({ default: m.EcosystemMap })));
const ModulePage = React.lazy(() => import("./components/chapter/ModulePage").then((m) => ({ default: m.ModulePage })));
const MentalModelsPage = React.lazy(() => import("./components/pages/MentalModelsPage").then((m) => ({ default: m.MentalModelsPage })));
const GlossaryPage = React.lazy(() => import("./components/pages/GlossaryPage").then((m) => ({ default: m.GlossaryPage })));
const DecidePage = React.lazy(() => import("./components/pages/DecidePage").then((m) => ({ default: m.DecidePage })));

type Filter = Level | "all";

export default function App(): React.ReactElement {
  const route = useRoute();
  const { t } = useLang();
  const [level, setLevel] = useState<Filter>("all");
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    setNavOpen(false);
  }, [route]);

  const activeId = route.name === "module" ? route.id : null;

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <TopBar route={route} level={level} setLevel={setLevel} onMenuOpen={() => setNavOpen(true)} />

      {/* CHANGED (S10.5): one shell everywhere — the landing/map now keeps the
          persistent sidebar instead of rendering as a full-width hero. */}
      {(
        <div className="layout">
          <Sidebar activeId={activeId} level={level} />
          <main id="main" className="main">
            <Suspense fallback={<div className="route-loading">{t({ en: "Loading…", uk: "Завантаження…" })}</div>}>
              {route.name === "map" ? <EcosystemMap level={level} /> : null}
              {route.name === "module" ? <ModulePage id={route.id} topicId={route.topic} /> : null}
              {route.name === "mental-models" ? <MentalModelsPage level={level} /> : null}
              {route.name === "glossary" ? <GlossaryPage /> : null}
              {route.name === "decide" ? <DecidePage /> : null}
            </Suspense>
          </main>
        </div>
      )}

      {navOpen ? (
        <div className="drawer-backdrop" onClick={() => setNavOpen(false)}>
          <div
            className="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label={t({ en: "Menu", uk: "Меню" })}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-head">
              <span>{t({ en: "Menu", uk: "Меню" })}</span>
              <button className="btn" onClick={() => setNavOpen(false)} aria-label="Close menu">
                ✕
              </button>
            </div>
            <Sidebar activeId={activeId} level={level} />
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  );
}
