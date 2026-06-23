import React, { useEffect, useState } from "react";
import { useRoute } from "./lib/hashRouter";
import { useLang } from "./i18n/LangContext";
import { UI } from "./i18n/ui";
import { TopBar } from "./components/layout/TopBar";
import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
import { EcosystemMap } from "./components/map/EcosystemMap";
import { ModulePage } from "./components/chapter/ModulePage";
import { StubPage } from "./components/pages/StubPage";
import type { Level } from "./data/types";

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

      {route.name === "map" ? (
        <main id="main" style={{ flex: 1 }}>
          <EcosystemMap level={level} />
        </main>
      ) : (
        <div className="layout">
          <Sidebar activeId={activeId} level={level} />
          <main id="main" className="main">
            {route.name === "module" ? <ModulePage id={route.id} topicId={route.topic} /> : null}
            {route.name === "mental-models" ? (
              <StubPage
                title={UI.nav.mentalModels}
                note={{
                  en: "The gallery of mental models to recall from memory — built in a later session.",
                  uk: "Галерея mental models для запамʼятовування — у наступній сесії.",
                }}
              />
            ) : null}
            {route.name === "glossary" ? (
              <StubPage
                title={UI.nav.glossary}
                note={{
                  en: "A bilingual glossary; technical terms stay English — built in a later session.",
                  uk: "Двомовний глосарій; технічні терміни лишаються English — у наступній сесії.",
                }}
              />
            ) : null}
            {route.name === "decide" ? (
              <StubPage
                title={UI.nav.decide}
                note={{
                  en: "The Tool Picker decision widget — built in a later session.",
                  uk: "Tool Picker — інтерактивний вибір інструмента — у наступній сесії.",
                }}
              />
            ) : null}
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
