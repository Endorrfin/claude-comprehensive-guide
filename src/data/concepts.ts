import type { Localized, Level, Module, Section } from "./types";

/* Single source of truth. Pages render from this data. Bilingual EN/UA;
   technical terms stay English in both. M15 is fully authored (the golden
   module); the rest carry their planned topics (bilingual titles) so the whole
   curriculum is navigable now and fills in session by session. */

const L = (en: string, uk: string): Localized => ({ en, uk });

/** Module ids that will carry a signature interactive (sidebar / map ★). */
export const SIGNATURE_SIMS = new Set<string>(["m6", "m10", "m11", "m12", "m15", "m23", "m26"]);

export const SECTIONS: Section[] = [
  {
    id: "s1",
    name: L("Foundations & first steps", "Основи та перші кроки"),
    accent: "var(--grp-1)",
    blurb: L("The beginner on-ramp — what Claude is and how to talk to it.", "Вступ для новачків — що таке Claude і як з ним працювати."),
  },
  {
    id: "s2",
    name: L("Prompting & the persistent workspace", "Prompting і персистентний workspace"),
    accent: "var(--grp-2)",
    blurb: L("Prompt well; make Projects, Artifacts and Memory work for you.", "Пиши якісні prompt; зроби Projects, Artifacts і Memory корисними."),
  },
  {
    id: "s3",
    name: L("Extending Claude", "Розширення Claude"),
    accent: "var(--grp-3)",
    blurb: L("Connectors/MCP, Skills and Plugins — give Claude new powers.", "Connectors/MCP, Skills і Plugins — нові можливості для Claude."),
  },
  {
    id: "s4",
    name: L("Cowork — your desktop agent", "Cowork — твій desktop-агент"),
    accent: "var(--grp-4)",
    blurb: L("The product-heavy crown: Claude that works your files for you.", "Серце продуктової частини: Claude, що працює з твоїми файлами."),
  },
  {
    id: "s5",
    name: L("Claude in your tools & code", "Claude у твоїх інструментах і коді"),
    accent: "var(--grp-5)",
    blurb: L("Chrome, Excel/PowerPoint, Claude Code and agentic engineering.", "Chrome, Excel/PowerPoint, Claude Code та agentic engineering."),
  },
  {
    id: "s6",
    name: L("Mastery", "Майстерність"),
    accent: "var(--grp-6)",
    blurb: L("Security, choosing the right tool, and the whole picture.", "Безпека, вибір інструмента і повна картина."),
  },
];

/* ---- compact builder for planned (stub) modules -------------------------- */
function mod(
  id: string,
  section: string,
  order: number,
  level: Level,
  title: Localized,
  tagline: Localized,
  mentalModel: Localized,
  readMins: number,
  topics: [string, string][],
  seeAlso: string[] = [],
): Module {
  return {
    id,
    section,
    order,
    level,
    title,
    tagline,
    readMins,
    mentalModel,
    topics: topics.map((p, i) => ({ id: `t${i + 1}`, title: L(p[0], p[1]), blocks: [] })),
    keyPoints: [],
    pitfalls: [],
    seeAlso,
    sources: [],
  };
}

/* ======================================================================
   M15 · Cowork mental model & setup  — GOLDEN MODULE (fully authored)
   ====================================================================== */
const m15: Module = {
  id: "m15",
  section: "s4",
  order: 15,
  level: "middle",
  title: L("Cowork mental model & setup", "Cowork: ментальна модель і налаштування"),
  tagline: L(
    "The third tab in Claude Desktop, where Claude stops chatting and starts working — on your files, with your tools.",
    "Третя вкладка в Claude Desktop, де Claude перестає лише відповідати і починає працювати — з твоїми файлами та інструментами.",
  ),
  readMins: 8,
  mentalModel: L(
    "An assistant working at your desk: it thinks, acts with a tool, observes the result, and repeats — until the job is done.",
    "Асистент, що працює за твоїм столом: думає, діє інструментом, дивиться на результат і повторює — поки задачу не виконано.",
  ),
  topics: [
    {
      id: "t1",
      title: L("What Cowork is", "Що таке Cowork"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "**Cowork** is the third tab in Claude Desktop, next to Chat and Projects. In Chat, Claude answers in one turn. In Cowork, Claude is an **agent**: it plans, calls tools, reads and writes files in a folder you grant, runs code in a sandbox, can browse, and ships finished work back — even while you do something else. It is *Claude Code's power aimed at knowledge work* — no terminal required.",
            "**Cowork** — це третя вкладка в Claude Desktop, поруч із Chat і Projects. У Chat Claude відповідає за один хід. У Cowork Claude — це **agent**: він планує, викликає інструменти, читає й пише файли в наданій теці, запускає код у sandbox, може browse і повертає готовий результат — навіть поки ти зайнятий іншим. Це *потужність Claude Code, спрямована на knowledge work* — без терміналу.",
          ),
        },
        { kind: "figure", fig: "cowork-architecture", caption: L("Cowork sits in Claude Desktop and reaches your files, a sandbox, connectors and (optionally) your screen.", "Cowork живе в Claude Desktop і дістає твої файли, sandbox, connectors і (за потреби) екран.") },
        {
          kind: "compare",
          a: L("Chat", "Chat"),
          b: L("Cowork (agent)", "Cowork (agent)"),
          rows: [
            [L("Interaction", "Взаємодія"), L("One question → one answer", "Одне питання → одна відповідь"), L("A goal → many autonomous steps", "Мета → багато автономних кроків")],
            [L("Tools", "Інструменти"), L("Limited / on request", "Обмежено / за запитом"), L("Files, shell, connectors, computer use", "Файли, shell, connectors, computer use")],
            [L("Your files", "Твої файли"), L("Manual upload", "Ручне завантаження"), L("Reads & writes a folder you grant", "Читає й пише в наданій теці")],
            [L("Best for", "Найкраще для"), L("Quick answers, drafts", "Швидкі відповіді, чернетки"), L("Multi-step tasks, real deliverables", "Багатокрокові задачі, реальні результати")],
          ],
        },
      ],
    },
    {
      id: "t2",
      title: L("The Agent Loop", "The Agent Loop"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Everything Cowork (and Claude Code) does is one loop: **think → act → observe → repeat**, ending in an answer. Claude plans a step, calls a tool, reads the result, and decides what to do next — over and over until the goal is met. Step through one real task below.",
            "Усе, що робить Cowork (і Claude Code), — це один цикл: **think → act → observe → repeat**, що завершується відповіддю. Claude планує крок, викликає tool, читає результат і вирішує, що далі — і так доки мету не досягнуто. Прокрокуй реальну задачу нижче.",
          ),
        },
        { kind: "sim", sim: "agent-loop" },
        {
          kind: "callout",
          tone: "tip",
          title: L("The loop is the whole mental model", "Цикл — це вся ментальна модель"),
          md: L(
            "If you remember one thing about agents, remember this loop. It explains tool calls, why agents pause for permission, where latency and token cost come from, and where things can go wrong.",
            "Якщо запамʼятати одне про агентів — запамʼятай цей цикл. Він пояснює tool calls, паузи на дозвіл, звідки latency й вартість у токенах, і де можливі помилки.",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("Local files & the workspace folder", "Локальні файли та робоча тека"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "You grant Cowork a **folder**. It reads those files and writes new ones back. Three places matter — and only your folder persists.",
            "Ти надаєш Cowork **теку**. Він читає ці файли й записує нові. Важать три місця — і лише твоя тека зберігається.",
          ),
        },
        {
          kind: "table",
          head: [L("Place", "Місце"), L("What it is", "Що це"), L("Lifetime", "Час життя")],
          rows: [
            [L("Uploads", "Uploads"), L("Files you attach to the chat", "Файли, які ти додаєш у чат"), L("The conversation", "Розмова")],
            [L("Scratchpad / outputs", "Scratchpad / outputs"), L("Where Claude builds intermediate work", "Де Claude робить проміжну роботу"), L("Temporary", "Тимчасово")],
            [L("Your folder", "Твоя тека"), L("The folder you selected on your computer", "Тека, яку ти обрав на компʼютері"), L("Persists — deliverables land here", "Зберігається — сюди потрапляє результат")],
          ],
        },
        {
          kind: "callout",
          tone: "security",
          title: L("You decide what it can touch", "Ти вирішуєш, до чого є доступ"),
          md: L(
            "Cowork only sees folders you explicitly grant, and asks before deleting. Grant the **narrowest** folder that gets the job done.",
            "Cowork бачить лише явно надані теки й питає перед видаленням. Надавай **найвужчу** теку, якої достатньо для задачі.",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Setup & your first task", "Налаштування і перша задача"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Get going in five steps: **1)** install Claude Desktop; **2)** open the **Cowork** tab; **3)** select a folder to work in; **4)** describe a *goal and a deliverable*, not a single click; **5)** watch the loop, approve tools when asked, and collect the result.",
            "Старт за пʼять кроків: **1)** встанови Claude Desktop; **2)** відкрий вкладку **Cowork**; **3)** обери робочу теку; **4)** опиши *мету й результат*, а не один клік; **5)** дивись на цикл, підтверджуй tools за запитом і забирай результат.",
          ),
        },
        {
          kind: "code",
          lang: "text",
          code: "Read every .pdf in /reports, summarise each in 3 bullets,\nthen write a combined one-pager to summary.md.\nUse a table for the per-report bullets.",
          note: L(
            "A good Cowork prompt states a goal and the desired deliverable — not click-by-click steps.",
            "Гарний Cowork-prompt описує мету й бажаний результат — не покрокові кліки.",
          ),
        },
      ],
    },
    {
      id: "t5",
      title: L("Cowork vs Claude Code vs plain chat", "Cowork vs Claude Code vs звичайний chat"),
      blocks: [
        {
          kind: "table",
          head: [L("When you need", "Коли потрібно"), L("Reach for", "Обери"), L("Why", "Чому")],
          rows: [
            [L("A quick answer or draft", "Швидку відповідь чи чернетку"), L("Chat", "Chat"), L("Fastest; no setup", "Найшвидше; без налаштувань")],
            [L("Files, docs, recurring office work", "Файли, документи, рутинну роботу"), L("Cowork", "Cowork"), L("Local files + scheduled tasks, no terminal", "Локальні файли + scheduled tasks, без терміналу")],
            [L("Codebases, git, dev workflows", "Кодові бази, git, dev-процеси"), L("Claude Code", "Claude Code"), L("Terminal/IDE, subagents, agent teams", "Terminal/IDE, subagents, agent teams")],
          ],
        },
        {
          kind: "prose",
          md: L(
            "Same engine, different surface. Cowork is the agent for knowledge work; Claude Code is the agent for engineering. You will meet Claude Code in Section V.",
            "Один engine, різні поверхні. Cowork — agent для knowledge work; Claude Code — agent для інженерії. Claude Code зустрінемо в Секції V.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("Cowork is the agent tab: it acts on your files, not just answers.", "Cowork — це вкладка-agent: він діє з твоїми файлами, а не лише відповідає."),
    L("The agent loop — think → act → observe → repeat — is the core mental model.", "Agent loop — think → act → observe → repeat — головна ментальна модель."),
    L("It works on a folder you grant; deliverables persist there.", "Він працює з наданою текою; результати зберігаються саме там."),
    L("Describe goals and deliverables, not click-by-click steps.", "Описуй мету й результат, а не покрокові кліки."),
    L("Same engine as Claude Code, aimed at knowledge work — no terminal.", "Той самий engine, що Claude Code, але для knowledge work — без терміналу."),
  ],
  pitfalls: [
    { title: L("Treating it like chat", "Ставлення як до chat"), body: L("Asking for one step wastes the agent. Give it a goal with a clear finish line.", "Прохання про один крок марнує agent. Дай мету з чітким фінішем.") },
    { title: L("Granting your whole home folder", "Надання всієї домашньої теки"), body: L("Scope the folder. Least privilege keeps an autonomous agent safe.", "Обмеж теку. Least privilege тримає автономний agent у безпеці.") },
    { title: L("Walking away on risky actions", "Відхід під час ризикових дій"), body: L("For deletes, sends or money, stay in the loop and approve those yourself.", "Для видалень, надсилань чи грошей — лишайся в циклі й підтверджуй сам.") },
  ],
  interview: [
    { q: L("What is the agent loop, and why does it matter?", "Що таке agent loop і чому він важливий?"), a: L("Think → act (tool) → observe → repeat → answer. It is the shared mechanism behind Cowork and Claude Code; it explains tool use, permission pauses, latency and token cost.", "Think → act (tool) → observe → repeat → answer. Це спільний механізм Cowork і Claude Code; він пояснює tool use, паузи на дозвіл, latency й вартість токенів."), level: "senior" },
    { q: L("When would you pick Cowork over Claude Code?", "Коли обрати Cowork замість Claude Code?"), a: L("For file- and document-centric knowledge work that doesn't need a terminal or git — briefings, spreadsheets, reports, recurring tasks.", "Для роботи з файлами й документами без терміналу та git — briefings, таблиці, звіти, рутинні задачі."), level: "middle" },
  ],
  seeAlso: ["m16", "m17", "m18", "m22", "m26"],
  sources: [
    { title: "Claude Cowork — Anthropic", url: "https://www.anthropic.com/product/claude-cowork" },
    { title: "Get started with Claude Cowork — Help Center", url: "https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork" },
    { title: "Let Claude use your computer in Cowork", url: "https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork" },
  ],
};

/* ======================================================================
   Planned modules (topics carry over from CURRICULUM.md; bodies fill in)
   ====================================================================== */
const planned: Module[] = [
  // Section I
  mod("m1", "s1", 1, "beginner",
    L("What is Claude", "Що таке Claude"),
    L("Models, plans, apps, and what Claude can and can't do.", "Моделі, плани, застосунки і що Claude вміє та чого ні."),
    L("An assistant that reasons over a context window and can use tools.", "Асистент, що міркує в межах context window і вміє користуватись інструментами."),
    6,
    [
      ["The mental model: assistant + context + tools", "Ментальна модель: асистент + context + інструменти"],
      ["The model family: Opus, Sonnet, Haiku", "Сімейство моделей: Opus, Sonnet, Haiku"],
      ["Where Claude lives: web, desktop, mobile, Code, Chrome", "Де живе Claude: web, desktop, mobile, Code, Chrome"],
      ["Plans & access", "Плани та доступ"],
      ["What Claude can and can't do", "Що Claude вміє і чого не вміє"],
    ], ["m2", "m3", "m27"]),
  mod("m2", "s1", 2, "beginner",
    L("Interface & settings tour", "Інтерфейс і огляд налаштувань"),
    L("Know where every lever is before you pull it.", "Знай, де кожен важіль, перш ніж його тягнути."),
    L("A short tour so nothing in the UI is a mystery.", "Короткий тур, щоб у UI не лишилось загадок."),
    7,
    [
      ["Chat layout & the message box", "Розкладка чату й поле вводу"],
      ["Settings: profile, appearance, voices", "Налаштування: профіль, вигляд, voices"],
      ["Privacy, data controls & billing", "Приватність, дані та білінг"],
      ["Organizing chats & incognito", "Організація чатів та incognito"],
      ["Keyboard shortcuts", "Гарячі клавіші"],
    ], ["m1", "m3"]),
  mod("m3", "s1", 3, "beginner",
    L("Talking to Claude — prompting basics", "Спілкування з Claude — основи prompting"),
    L("How requests become results.", "Як запити перетворюються на результат."),
    L("Everything Claude knows in a chat lives in its context — say what matters.", "Усе, що Claude знає в чаті, лежить у context — кажи головне."),
    7,
    [
      ["What a prompt is and how Claude reads it", "Що таке prompt і як Claude його читає"],
      ["Context: what Claude knows in a chat", "Context: що Claude знає в чаті"],
      ["Being specific: task, format, constraints", "Конкретика: задача, формат, обмеження"],
      ["Iterating & follow-ups", "Ітерації та уточнення"],
      ["Common beginner mistakes", "Типові помилки новачків"],
    ], ["m6", "m1"]),
  mod("m4", "s1", 4, "beginner",
    L("Attachments, writing styles & voice", "Вкладення, writing styles і голос"),
    L("Bring your material in; shape the voice out.", "Принось свій матеріал; форматуй голос на виході."),
    L("Inputs in (files, images, voice), style out.", "Входи (файли, зображення, голос), стиль на виході."),
    6,
    [
      ["Attaching files & images", "Додавання файлів і зображень"],
      ["Writing styles: preset & custom", "Writing styles: готові та власні"],
      ["Voice input & talking to Claude", "Голосовий ввід і розмова з Claude"],
      ["Output formats", "Формати виводу"],
    ], ["m3", "m8"]),
  mod("m5", "s1", 5, "beginner",
    L("Memory & chat search", "Memory і пошук чатів"),
    L("What Memory stores, how to control it, and finding past chats.", "Що зберігає Memory, як ним керувати і як знайти старі чати."),
    L("Memory is durable context that survives across chats.", "Memory — це тривкий context, що живе між чатами."),
    6,
    [
      ["What Memory is & what it stores", "Що таке Memory і що він зберігає"],
      ["Controlling memory: view, edit, forget", "Керування memory: перегляд, редагування, forget"],
      ["Importing memories", "Імпорт memories"],
      ["Finding past chats", "Пошук минулих чатів"],
    ], ["m7", "m2"]),

  // Section II
  mod("m6", "s2", 6, "middle",
    L("Prompting mastery", "Майстерність prompting"),
    L("Patterns, structured prompts and the anatomy of a great prompt.", "Патерни, структуровані prompt і анатомія чудового prompt."),
    L("Structure beats wishing — role, context, task, format, examples.", "Структура краща за сподівання — role, context, task, format, examples."),
    10,
    [
      ["Anatomy of a great prompt", "Анатомія чудового prompt"],
      ["GCAO & structured templates", "GCAO і структуровані шаблони"],
      ["Patterns: few-shot, step-by-step, self-critique", "Патерни: few-shot, step-by-step, self-critique"],
      ["Constraints, schemas & XML tags", "Обмеження, schemas і XML tags"],
      ["Anti-patterns & debugging a prompt", "Анти-патерни і дебаг prompt"],
    ], ["m3", "m10", "m7"]),
  mod("m7", "s2", 7, "middle",
    L("Projects", "Projects"),
    L("Instructions, knowledge and a context wall around a body of work.", "Інструкції, knowledge і context wall навколо напряму роботи."),
    L("A Project is a room with its own memory, files and rules.", "Project — це кімната з власною памʼяттю, файлами і правилами."),
    8,
    [
      ["What a Project is", "Що таке Project"],
      ["Project instructions", "Інструкції Project"],
      ["Project knowledge & the context wall", "Knowledge і context wall"],
      ["Per-project skills & connectors", "Skills і connectors на рівні project"],
      ["Project vs plain chat", "Project vs звичайний chat"],
    ], ["m10", "m12", "m15"]),
  mod("m8", "s2", 8, "middle",
    L("Artifacts", "Artifacts"),
    L("Mini-apps, inline visualizations and data analytics in a side panel.", "Mini-apps, візуалізації та аналітика в бічній панелі."),
    L("Artifacts are runnable outputs you can see and use, not just text.", "Artifacts — це робочі результати, які видно й можна використати, не лише текст."),
    8,
    [
      ["What artifacts are", "Що таке artifacts"],
      ["Types: documents, code, mini-apps, diagrams", "Типи: документи, код, mini-apps, діаграми"],
      ["Inline visualizations & analytics", "Візуалізації та аналітика"],
      ["Editing, versioning & sharing", "Редагування, версії та поширення"],
    ], ["m9", "m4"]),
  mod("m9", "s2", 9, "senior",
    L("Live Artifacts", "Live Artifacts"),
    L("Stateful, connected artifacts: persistent storage, API calls, MCP.", "Stateful, підключені artifacts: persistent storage, API calls, MCP."),
    L("A Live Artifact is a small app that remembers state and talks to the world.", "Live Artifact — це маленький застосунок, що памʼятає стан і спілкується зі світом."),
    8,
    [
      ["Stateful artifacts (persistent storage)", "Stateful artifacts (persistent storage)"],
      ["Connected: API calls + MCP", "Підключені: API calls + MCP"],
      ["Building a mini-tool you return to", "Створення mini-tool, до якого вертаєшся"],
      ["Limits, safety & cost", "Обмеження, безпека та вартість"],
    ], ["m8", "m11"]),
  mod("m10", "s2", 10, "senior",
    L("Context & token management", "Управління context і токенами"),
    L("The context window, what fills it, and the cost levers.", "Context window, що його заповнює, і важелі вартості."),
    L("A finite desk — choose what's on it.", "Скінченний стіл — обирай, що на ньому лежить."),
    9,
    [
      ["The context window: what fills it", "Context window: що його заповнює"],
      ["Tokens 101", "Tokens 101"],
      ["Truncation: protecting the signal", "Truncation: як зберегти сигнал"],
      ["Cost levers: caching, batch, model choice", "Важелі вартості: caching, batch, вибір моделі"],
      ["Strategies: projects, skills, summaries", "Стратегії: projects, skills, summaries"],
    ], ["m7", "m11", "m6"]),

  // Section III
  mod("m11", "s3", 11, "senior",
    L("Connectors & MCP", "Connectors і MCP"),
    L("The directory, remote vs local, OAuth, and the big connectors.", "Directory, remote vs local, OAuth і ключові connectors."),
    L("MCP is a universal adapter between Claude and your apps.", "MCP — це універсальний адаптер між Claude і твоїми застосунками."),
    9,
    [
      ["What MCP is", "Що таке MCP"],
      ["The Connectors Directory", "Connectors Directory"],
      ["Remote vs local servers", "Remote vs local сервери"],
      ["OAuth & permission scopes", "OAuth і scopes дозволів"],
      ["Notion, Gmail, Google Calendar", "Notion, Gmail, Google Calendar"],
    ], ["m12", "m9", "m25"]),
  mod("m12", "s3", 12, "senior",
    L("Skills — concepts & using them", "Skills — концепції та використання"),
    L("SKILL.md anatomy, pre-built skills and progressive disclosure.", "Анатомія SKILL.md, готові skills і progressive disclosure."),
    L("A Skill is a folder of expertise Claude opens only when relevant.", "Skill — це тека з експертизою, яку Claude відкриває лише за потреби."),
    9,
    [
      ["What a Skill is", "Що таке Skill"],
      ["SKILL.md anatomy", "Анатомія SKILL.md"],
      ["Progressive disclosure & token cost", "Progressive disclosure і вартість у токенах"],
      ["Pre-built skills & where they run", "Готові skills і де вони працюють"],
      ["Installing / adding skills", "Встановлення / додавання skills"],
    ], ["m13", "m14", "m10"]),
  mod("m13", "s3", 13, "senior",
    L("Building your own skills", "Створення власних skills"),
    L("Authoring basic → advanced, scripts, resources and testing.", "Створення від базових до просунутих: scripts, resources, тестування."),
    L("Author once, trigger forever — if the description fires.", "Напиши раз, спрацьовує завжди — якщо description тригериться."),
    9,
    [
      ["Authoring a basic skill", "Створення базового skill"],
      ["Adding scripts & resources", "Додавання scripts і resources"],
      ["Descriptions that trigger correctly", "Descriptions, що правильно тригеряться"],
      ["Testing & iterating", "Тестування та ітерації"],
      ["Packaging & sharing", "Пакування та поширення"],
    ], ["m12", "m14"]),
  mod("m14", "s3", 14, "senior",
    L("Plugins & marketplaces", "Plugins і marketplaces"),
    L("Bundles of skills, subagents, commands, hooks and MCP.", "Набори skills, subagents, commands, hooks і MCP."),
    L("A plugin bundles many extensions into one install.", "Plugin зводить багато розширень в одну інсталяцію."),
    7,
    [
      ["What a plugin bundles", "Що містить plugin"],
      ["Installing plugins & marketplaces", "Встановлення plugins і marketplaces"],
      ["The role plugins", "Рольові plugins"],
      ["Building & sharing a plugin", "Створення та поширення plugin"],
    ], ["m12", "m13"]),

  // Section IV (m15 authored above)
  mod("m16", "s4", 16, "middle",
    L("Files, folders & outputs", "Файли, теки та outputs"),
    L("Selecting folders, reading/writing, and producing deliverables.", "Вибір тек, читання/запис і створення результатів."),
    L("Grant the narrowest folder; deliverables land there.", "Надавай найвужчу теку; результати потрапляють туди."),
    7,
    [
      ["Selecting & granting folders", "Вибір і надання тек"],
      ["Reading vs writing; scratchpad vs your folder", "Читання vs запис; scratchpad vs твоя тека"],
      ["Deliverables (docx/xlsx/pptx/pdf)", "Результати (docx/xlsx/pptx/pdf)"],
      ["Safety: deletes, overwrites, boundaries", "Безпека: видалення, перезапис, межі"],
    ], ["m15", "m17"]),
  mod("m17", "s4", 17, "middle",
    L("Scheduled tasks", "Заплановані задачі"),
    L("Recurring work, briefings, and cadence vs one-off.", "Періодична робота, briefings, cadence vs одноразово."),
    L("Turn a one-off into a cadence.", "Перетвори одноразове на регулярне."),
    6,
    [
      ["Cadence vs one-off", "Cadence vs одноразово"],
      ["Creating a recurring task", "Створення періодичної задачі"],
      ["Cron-style timing & examples", "Cron-таймінг і приклади"],
      ["Managing & debugging schedules", "Керування та дебаг розкладів"],
    ], ["m15", "m19"]),
  mod("m18", "s4", 18, "senior",
    L("Computer use", "Computer use"),
    L("When Claude drives your screen; the three tiers of acting.", "Коли Claude керує екраном; три рівні дій."),
    L("Three tiers of acting on the world: connector → browser → screen.", "Три рівні дій у світі: connector → browser → екран."),
    7,
    [
      ["When Claude drives your screen", "Коли Claude керує екраном"],
      ["The 3 tiers: connector → browser → computer", "3 рівні: connector → browser → computer"],
      ["Granting apps & tiers", "Надання застосунків і рівнів"],
      ["Link & financial safety", "Безпека посилань і фінансів"],
    ], ["m15", "m20", "m25"]),
  mod("m19", "s4", 19, "senior",
    L("Cowork projects, connectors, plugins & mobile", "Cowork projects, connectors, plugins і mobile"),
    L("Persistent context, connectors and plugins — startable from your phone.", "Персистентний context, connectors і plugins — запуск навіть із телефону."),
    L("Persistent context + connectors + plugins, startable from your phone.", "Персистентний context + connectors + plugins, із запуском із телефону."),
    7,
    [
      ["Cowork projects", "Cowork projects"],
      ["Connectors in Cowork", "Connectors у Cowork"],
      ["Plugins & role workflows", "Plugins і рольові процеси"],
      ["Mobile & dispatch", "Mobile і dispatch"],
    ], ["m15", "m7", "m14"]),

  // Section V
  mod("m20", "s5", 20, "middle",
    L("Claude in Chrome", "Claude in Chrome"),
    L("The browser agent: navigate, click, fill forms, record workflows.", "Browser-agent: навігація, кліки, форми, запис workflows."),
    L("A browser agent that sees, clicks and types for you.", "Browser-agent, що бачить, клікає і друкує за тебе."),
    6,
    [
      ["What the browser agent does", "Що робить browser-agent"],
      ["Navigate / click / fill forms / extract", "Навігація / кліки / форми / extract"],
      ["Recording workflows", "Запис workflows"],
      ["Scheduled web tasks; safety", "Заплановані web-задачі; безпека"],
    ], ["m18", "m25"]),
  mod("m21", "s5", 21, "middle",
    L("Claude for Excel & PowerPoint", "Claude for Excel і PowerPoint"),
    L("Office agents with cell-level citations and shared context.", "Office-агенти з cell-level citations і shared context."),
    L("Spreadsheet & slide work with citations and shared context.", "Робота з таблицями й слайдами з citations і shared context."),
    6,
    [
      ["Excel agent: multi-tab, cell-level citations", "Excel-agent: multi-tab, cell-level citations"],
      ["Safe edits & formula dependencies", "Безпечні правки й залежності формул"],
      ["Pivot tables & formatting via language", "Pivot tables і форматування мовою"],
      ["Shared context with PowerPoint", "Shared context із PowerPoint"],
    ], ["m8", "m20"]),
  mod("m22", "s5", 22, "senior",
    L("Claude Code essentials", "Claude Code: основи"),
    L("Environments, models, effort, permissions, CLAUDE.md, plan mode.", "Середовища, моделі, effort, дозволи, CLAUDE.md, plan mode."),
    L("The same agent in your terminal and IDE, governed by CLAUDE.md.", "Той самий agent у терміналі та IDE, керований CLAUDE.md."),
    9,
    [
      ["Two ways to use; environments", "Два способи; середовища"],
      ["Models, effort & permissions", "Моделі, effort і дозволи"],
      ["CLAUDE.md — the project brain", "CLAUDE.md — мозок проєкту"],
      ["Plan mode & verification", "Plan mode і верифікація"],
      ["MCP in Code", "MCP у Code"],
    ], ["m15", "m23", "m24"]),
  mod("m23", "s5", 23, "staff",
    L("Sub-agents, agent teams & worktrees", "Sub-agents, agent teams і worktrees"),
    L("Parallelization and orchestration of many agents.", "Паралелізація та оркестрація багатьох агентів."),
    L("Fan out into parallel agents with their own context; merge back.", "Розгалужуйся в паралельні агенти з власним context; зливай назад."),
    9,
    [
      ["Sub-agents: own context, isolation", "Sub-agents: власний context, ізоляція"],
      ["Agent teams (git-coordinated)", "Agent teams (координація через git)"],
      ["Git worktrees & parallelization", "Git worktrees і паралелізація"],
      ["Skills vs sub-agents", "Skills vs sub-agents"],
    ], ["m22", "m24", "m12"]),
  mod("m24", "s5", 24, "staff",
    L("Hooks, slash commands & advanced agentic patterns", "Hooks, slash commands і просунуті agentic-патерни"),
    L("Auto-research, multi-agent consensus, pipelines and harnesses.", "Auto-research, multi-agent consensus, pipelines і harnesses."),
    L("Gates, shortcuts and orchestration around the loop.", "Ворота, скорочення й оркестрація навколо циклу."),
    9,
    [
      ["Hooks: gates around tool calls & events", "Hooks: ворота навколо tool calls і подій"],
      ["Slash commands & output styles", "Slash commands і output styles"],
      ["Auto-research, consensus, pipelines", "Auto-research, consensus, pipelines"],
      ["Harnesses & orchestration", "Harnesses і оркестрація"],
    ], ["m23", "m22"]),

  // Section VI
  mod("m25", "s6", 25, "senior",
    L("Security & safe agent use", "Безпека та безпечне використання агентів"),
    L("Permissions, prompt injection, link safety, financial actions.", "Дозволи, prompt injection, безпека посилань, фінансові дії."),
    L("Treat tool output as untrusted; grant least privilege.", "Стався до виводу інструментів як до недовіреного; давай least privilege."),
    8,
    [
      ["Permissions & least privilege", "Дозволи та least privilege"],
      ["Prompt injection & untrusted content", "Prompt injection і недовірений контент"],
      ["Link safety & data boundaries", "Безпека посилань і межі даних"],
      ["Financial actions & human-in-the-loop", "Фінансові дії та human-in-the-loop"],
      ["A practical safety checklist", "Практичний чеклист безпеки"],
    ], ["m11", "m18", "m26"]),
  mod("m26", "s6", 26, "senior",
    L("Choosing the right tool", "Вибір правильного інструмента"),
    L("Decision guides: Cowork vs Code vs Chrome vs Excel vs connector vs skill.", "Гайди вибору: Cowork vs Code vs Chrome vs Excel vs connector vs skill."),
    L("Match the task to the surface.", "Підбирай поверхню під задачу."),
    7,
    [
      ["The decision model: task → tool", "Модель рішення: задача → інструмент"],
      ["The tools compared", "Порівняння інструментів"],
      ["Cost / speed / control trade-offs", "Баланс вартість / швидкість / контроль"],
      ["Worked scenarios", "Розібрані сценарії"],
    ], ["m15", "m22", "m27"]),
  mod("m27", "s6", 27, "senior",
    L("The ecosystem map", "Мапа екосистеми"),
    L("How it all composes: models → apps → context → capabilities → orchestration.", "Як усе складається: моделі → застосунки → context → можливості → оркестрація."),
    L("Models → apps → context → capabilities → orchestration.", "Моделі → застосунки → context → можливості → оркестрація."),
    7,
    [
      ["The layers", "Шари"],
      ["How the pieces compose", "Як складаються частини"],
      ["The one-picture overview", "Огляд однією картиною"],
    ], ["m1", "m26", "m28"]),
  mod("m28", "s6", 28, "middle",
    L("Mental models gallery + glossary", "Галерея mental models + глосарій"),
    L("The pictures and terms to recall from memory.", "Картини й терміни, які треба памʼятати."),
    L("The pictures and terms to recall from memory.", "Картини й терміни, які треба памʼятати з памʼяті."),
    6,
    [
      ["The mental models gallery", "Галерея mental models"],
      ["Glossary (bilingual)", "Глосарій (двомовний)"],
      ["Cheat-sheet", "Cheat-sheet"],
      ["Flashcards / self-check", "Flashcards / самоперевірка"],
    ], ["m27"]),
];

/* ---- assembled, ordered, and indexed ------------------------------------ */
export const MODULES: Module[] = [...planned, m15].sort((a, b) => a.order - b.order);

export function sectionById(id: string): Section | undefined {
  return SECTIONS.find((s) => s.id === id);
}
export function moduleById(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}
export function modulesOf(sectionId: string): Module[] {
  return MODULES.filter((m) => m.section === sectionId);
}
export function prevNext(id: string): { prev?: Module; next?: Module } {
  const i = MODULES.findIndex((m) => m.id === id);
  if (i === -1) return {};
  return { prev: MODULES[i - 1], next: MODULES[i + 1] };
}
/** A module is "authored" (vs a planned stub) once any topic has content blocks. */
export function isAuthored(m: Module): boolean {
  return m.topics.some((t) => t.blocks.length > 0);
}
