import type { Localized } from "../data/types";

/** UI chrome strings (EN/UA). Technical terms stay in English in both languages. */
export const UI = {
  brandTitle: { en: "Claude", uk: "Claude" },
  brandSub: { en: "The Comprehensive Guide", uk: "Вичерпний гайд" },
  searchPlaceholder: { en: "Search modules & topics…", uk: "Пошук модулів і topics…" },
  level: { en: "Level", uk: "Рівень" },
  levelAll: { en: "all", uk: "усі" },
  nav: {
    map: { en: "Map", uk: "Мапа" },
    mentalModels: { en: "Mental models", uk: "Mental models" },
    glossary: { en: "Glossary", uk: "Глосарій" },
    decide: { en: "Tool picker", uk: "Tool picker" },
  },
  heroTitle: { en: "Master Claude and its tools", uk: "Опануй Claude та його інструменти" },
  heroLead: {
    en: "A deep, interactive, bilingual field guide — from first steps to power-user mastery of Cowork, Artifacts, Projects, Connectors/MCP, Skills and agentic workflows.",
    uk: "Глибокий інтерактивний двомовний гайд — від перших кроків до power-user майстерності: Cowork, Artifacts, Projects, Connectors/MCP, Skills та agentic workflows.",
  },
  statSections: { en: "sections", uk: "секцій" },
  statModules: { en: "modules", uk: "модулів" },
  statTopics: { en: "topics", uk: "topics" },
  statSims: { en: "interactive sims", uk: "інтерактивів" },
  topicsInModule: { en: "Topics in this module", uk: "Topics у цьому модулі" },
  mentalModel: { en: "Mental model", uk: "Mental model" },
  keyPoints: { en: "Key points", uk: "Ключові тези" },
  pitfalls: { en: "Pitfalls", uk: "Підводні камені" },
  interview: { en: "Interview questions", uk: "Співбесіда" },
  seeAlso: { en: "See also", uk: "Дивись також" },
  sources: { en: "Sources", uk: "Джерела" },
  prev: { en: "Previous", uk: "Назад" },
  next: { en: "Next", uk: "Далі" },
  planned: {
    en: "Planned for an upcoming session — this module is part of the roadmap.",
    uk: "Заплановано на наступну сесію — модуль є в roadmap.",
  },
  comingSoon: { en: "Coming soon", uk: "Незабаром" },
  readMins: { en: "min read", uk: "хв читання" },
  builtBy: { en: "Senior Fullstack Engineer", uk: "Senior Fullstack Engineer" },
} satisfies Record<string, unknown>;

export type UiKey = keyof typeof UI;
export const _localizedGuard: Localized = { en: "", uk: "" };
