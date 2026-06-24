import type { Localized } from "./types";

/* Data + scoring for the ★ Tool Picker (M26, also the #/decide page).
   You answer three facets about a task; recommend() ranks the surfaces.
   `where` is the dominant signal (×10); `autonomy` is a modifier/tie-break;
   `plan` gates the paid-only surfaces (they still surface, clearly tagged).
   Deterministic and pure — no side effects. Bilingual EN/UA. */
const L = (en: string, uk: string): Localized => ({ en, uk });

export type WhereId = "chat" | "files" | "web" | "code" | "office" | "app" | "expertise";
export type AutonomyId = "reply" | "task" | "recurring";
export type PlanId = "free" | "paid";

export type FacetOption = { id: string; label: Localized; sub?: Localized };
export type Facet = { id: "where" | "autonomy" | "plan"; question: Localized; options: FacetOption[] };

export const FACETS: Facet[] = [
  {
    id: "where",
    question: L("What does the task touch?", "Чого стосується задача?"),
    options: [
      { id: "chat", label: L("A question or idea", "Питання чи ідея"), sub: L("an answer · a draft · a mini-app", "відповідь · чернетка · mini-app") },
      { id: "files", label: L("Files on my computer", "Файли на компʼютері"), sub: L("docs · data · whole folders", "документи · дані · цілі теки") },
      { id: "web", label: L("A website / the web", "Сайт / веб"), sub: L("navigate · click · extract", "навігація · клік · витяг") },
      { id: "code", label: L("A codebase", "Кодова база"), sub: L("a real repo + shell", "справжній репозиторій + shell") },
      { id: "office", label: L("Excel / PowerPoint", "Excel / PowerPoint"), sub: L("a live workbook or deck", "жива книга чи дека") },
      { id: "app", label: L("Another app", "Інший застосунок"), sub: L("Gmail · Slack · Notion · Drive", "Gmail · Slack · Notion · Drive") },
      { id: "expertise", label: L("A repeatable procedure", "Повторюваний процес"), sub: L("a format / skill to reuse", "формат / skill для повтору") },
    ],
  },
  {
    id: "autonomy",
    question: L("How much should Claude do on its own?", "Скільки Claude має робити сам?"),
    options: [
      { id: "reply", label: L("Just answer me", "Просто відповісти"), sub: L("one turn", "один хід") },
      { id: "task", label: L("Run a multi-step task", "Багатокрокова задача"), sub: L("plan → act → deliver", "план → дія → результат") },
      { id: "recurring", label: L("Repeat on a schedule", "Повторювати за розкладом"), sub: L("briefings · digests", "брифінги · дайджести") },
    ],
  },
  {
    id: "plan",
    question: L("Your plan?", "Твій план?"),
    options: [
      { id: "paid", label: L("Paid", "Платний"), sub: L("Pro · Max · Team · Enterprise", "Pro · Max · Team · Enterprise") },
      { id: "free", label: L("Free", "Free") },
    ],
  },
];

export type Surface = {
  id: string;
  name: Localized;
  module: string;
  paidOnly: boolean;
  why: Localized;
  limit: Localized;
  fit: Partial<Record<WhereId, number>>;
  autonomy: Partial<Record<AutonomyId, number>>;
};

export const SURFACES: Surface[] = [
  {
    id: "chat",
    name: L("Chat + Artifacts", "Chat + Artifacts"),
    module: "m8",
    paidOnly: false,
    why: L("One conversation: ask, get an answer, and let Claude build a document, chart or interactive Artifact inline — nothing to install.", "Одна розмова: запитай, отримай відповідь, і нехай Claude побудує документ, графік чи інтерактивний Artifact одразу — нічого не встановлюючи."),
    limit: L("No reach into your local files or other apps unless you upload or connect them; not for unattended multi-step work.", "Не дістає твоїх локальних файлів чи інших застосунків, доки ти їх не завантажиш/підключиш; не для автономної багатокрокової роботи."),
    fit: { chat: 10, expertise: 2, office: 2, files: 1, app: 1 },
    autonomy: { reply: 4, task: 1, recurring: -4 },
  },
  {
    id: "cowork",
    name: L("Cowork", "Cowork"),
    module: "m15",
    paidOnly: true,
    why: L("The desktop agent: it reads and writes a folder you grant, runs code in a sandbox, uses your connectors, and can run on a schedule — your files, end to end.", "Desktop-агент: читає й пише в наданій теці, виконує код у sandbox, користується твоїми connectors і може працювати за розкладом — твої файли від початку до кінця."),
    limit: L("Paid plans, desktop only; works on folders you grant; the app must stay open and awake for scheduled runs.", "Платні плани, лише desktop; працює з наданими теками; застосунок має бути відкритий і не в сні для запусків за розкладом."),
    fit: { files: 10, app: 6, office: 3, web: 3, expertise: 2, chat: 1 },
    autonomy: { task: 4, recurring: 5, reply: -3 },
  },
  {
    id: "code",
    name: L("Claude Code", "Claude Code"),
    module: "m22",
    paidOnly: true,
    why: L("The coding agent in your real terminal, IDE and CI — it edits your actual repo, runs tests and commits, steered by CLAUDE.md and held by permissions.", "Кодувальний агент у твоєму справжньому terminal, IDE і CI — редагує реальний репозиторій, запускає тести й робить commit, керований CLAUDE.md і стримуваний permissions."),
    limit: L("For software in a real repo; runs in your real shell, not a sandbox — so the permission model matters.", "Для коду в реальному репозиторії; працює у твоєму справжньому shell, не в sandbox — тож модель permissions важлива."),
    fit: { code: 10, files: 2 },
    autonomy: { task: 4, recurring: 2, reply: -1 },
  },
  {
    id: "chrome",
    name: L("Claude in Chrome", "Claude in Chrome"),
    module: "m20",
    paidOnly: true,
    why: L("The browser agent: when a site has no connector, it navigates, clicks, fills forms and extracts — and can replay recorded workflows on a schedule.", "Browser-агент: коли в сайту немає connector, він навігує, клікає, заповнює форми й витягує дані — і може відтворювати записані workflows за розкладом."),
    limit: L("Beta, Chrome only; on Pro it runs Haiku 4.5; blocked on banking/trading/crypto sites; a larger prompt-injection surface than connectors.", "Beta, лише Chrome; на Pro працює Haiku 4.5; заблокований на банкінг/трейдинг/крипто; більша поверхня prompt-injection, ніж у connectors."),
    fit: { web: 10, app: 4 },
    autonomy: { task: 4, recurring: 3, reply: -1 },
  },
  {
    id: "office",
    name: L("Claude for Excel / PowerPoint", "Claude for Excel / PowerPoint"),
    module: "m21",
    paidOnly: true,
    why: L("Microsoft 365 add-ins that work the open workbook or deck in place — cell-level citations, dependency-safe formulas, native editable charts.", "Add-ins для Microsoft 365, що працюють із відкритою книгою чи декою на місці — цитати на рівні клітинок, безпечні для залежностей формули, нативні редаговані діаграми."),
    limit: L("Paid plans; Microsoft 365 only; no macros, VBA or data tables; reads only the file you have open.", "Платні плани; лише Microsoft 365; без macros, VBA чи data tables; читає лише відкритий файл."),
    fit: { office: 10, files: 2 },
    autonomy: { task: 3, reply: 1 },
  },
  {
    id: "connector",
    name: L("Connector / MCP", "Connector / MCP"),
    module: "m11",
    paidOnly: false,
    why: L("A connector gives Claude live, permissioned access to another app — pull data or take actions in Gmail, Drive, Slack, Notion, Linear and more.", "Connector дає Claude живий доступ із дозволами до іншого застосунку — діставати дані чи виконувати дії в Gmail, Drive, Slack, Notion, Linear тощо."),
    limit: L("You authenticate via OAuth (scoped to you); Free is limited to one custom connector; it brings data in — it doesn't run procedures (pair it with a Skill).", "Авторизуєшся через OAuth (scope лише твій); Free обмежений одним custom connector; він приносить дані — не виконує процедури (поєднай зі Skill)."),
    fit: { app: 10, chat: 3, web: 2, files: 1 },
    autonomy: { reply: 3, task: 3, recurring: 1 },
  },
  {
    id: "skill",
    name: L("Skill", "Skill"),
    module: "m12",
    paidOnly: false,
    why: L("A Skill packages a repeatable procedure or output format (a SKILL.md + scripts) that Claude loads only when relevant — author it once, reuse it everywhere.", "Skill пакує повторюваний процес чи формат виводу (SKILL.md + скрипти), який Claude вантажить лише за потреби — напиши раз, використовуй усюди."),
    limit: L("It's know-how, not an integration — it doesn't reach external apps on its own; pair it with a connector for live data.", "Це експертиза, не інтеграція — сам не дістає зовнішніх застосунків; поєднай із connector для живих даних."),
    fit: { expertise: 10, office: 3, files: 2, chat: 1 },
    autonomy: { reply: 2, task: 3, recurring: 1 },
  },
];

export type Answers = { where: WhereId; autonomy: AutonomyId; plan: PlanId };
export type Ranked = { surface: Surface; score: number; gated: boolean };

/** Rank the surfaces for a set of answers. `where` dominates; `autonomy`
   modifies; paid-only surfaces on a Free plan are penalised and flagged. */
export function recommend(a: Answers): Ranked[] {
  return SURFACES.map((s) => {
    const base = (s.fit[a.where] ?? 0) * 10 + (s.autonomy[a.autonomy] ?? 0);
    const gated = a.plan === "free" && s.paidOnly;
    const score = gated ? base * 0.34 : base;
    return { surface: s, score, gated };
  })
    .filter((r) => r.score > 0)
    .sort((x, y) => y.score - x.score);
}
