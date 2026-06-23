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
   M6 · Prompting mastery — fully authored (★ Prompt Anatomy)
   ====================================================================== */
const m6: Module = {
  id: "m6",
  section: "s2",
  order: 6,
  level: "middle",
  title: L("Prompting mastery", "Майстерність prompting"),
  tagline: L(
    "Structure beats wishing: assemble a prompt from parts — role, context, task, format, examples — and the answer stops being a lottery.",
    "Структура краща за надію: збери prompt із частин — role, context, task, format, examples — і відповідь перестає бути лотереєю.",
  ),
  readMins: 12,
  mentalModel: L(
    "Treat Claude like a brilliant new colleague: huge skill, zero context on your task. A great prompt supplies the context, the goal, and the shape of the answer.",
    "Стався до Claude як до блискучого нового колеги: величезні навички, нуль контексту про твою задачу. Гарний prompt дає контекст, мету і форму відповіді.",
  ),
  topics: [
    {
      id: "t1",
      title: L("Anatomy of a great prompt", "Анатомія чудового prompt"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Anthropic's own guidance opens with one analogy: think of Claude as **a brilliant but new employee** who lacks context on your norms and workflows. It can do the work — but only once you say what *done* looks like. A strong prompt is built from a handful of **parts**, each with a job. You rarely need all of them at once; knowing the full kit lets you add exactly the part a weak answer is missing.\n\nThe five core parts are **role**, **context**, **task**, **format** and **examples** — plus **constraints** as guardrails. Toggle them in the builder below and watch the simulated result sharpen as structure goes in.",
            "Гайд Anthropic починається з аналогії: уявляй Claude як **блискучого, але нового співробітника**, якому бракує контексту про твої норми й процеси. Він зробить роботу — але лише коли ти скажеш, який результат вважається *готовим*. Сильний prompt складається з кількох **частин**, у кожної своя роль. Рідко потрібні всі одразу; знання повного набору дозволяє додати саме ту частину, якої бракує слабкій відповіді.\n\nП'ять основних частин — **role**, **context**, **task**, **format** і **examples** — плюс **constraints** як запобіжники. Перемикай їх у конструкторі нижче й дивись, як симульований результат стає чіткішим у міру додавання структури.",
          ),
        },
        { kind: "sim", sim: "prompt-anatomy" },
        {
          kind: "table",
          head: [L("Part", "Частина"), L("What it does", "Що робить"), L("How to write it", "Як писати")],
          rows: [
            [L("Role", "Role"), L("Sets perspective, expertise and tone", "Задає перспективу, експертизу й тон"), L("One line, usually in the system prompt — \"You are a senior …\"", "Один рядок, зазвичай у system prompt — \"You are a senior …\"")],
            [L("Context", "Context"), L("Gives the background **and the *why***", "Дає бекґраунд **і причину (*why*)**"), L("The facts Claude needs, plus the motivation — it generalises from the reason", "Факти, які потрібні Claude, плюс мотивація — він узагальнює з причини")],
            [L("Task", "Task"), L("The explicit instruction (the core)", "Явна інструкція (ядро)"), L("A specific verb and a clear outcome; numbered steps when order matters", "Конкретне дієслово й чіткий результат; нумеровані кроки, коли важливий порядок")],
            [L("Examples", "Examples"), L("Shows, not just tells (**few-shot**)", "Показує, а не лише розповідає (**few-shot**)"), L("3–5 relevant, diverse examples wrapped in `<example>` tags", "3–5 релевантних, різнопланових прикладів у тегах `<example>`")],
            [L("Format", "Format"), L("The shape of the output", "Форма виводу"), L("XML tags, length, a schema; state what TO do, not only what to avoid", "XML tags, довжина, schema; кажи що РОБИТИ, а не лише чого уникати")],
            [L("Constraints", "Constraints"), L("The guardrails", "Запобіжники"), L("Tone, length, do/don't, hard limits", "Тон, довжина, можна/не можна, жорсткі межі")],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("The golden rule", "Золоте правило"),
          md: L(
            "Show your prompt to a colleague with minimal context and ask them to follow it. If they'd be confused, Claude will be too. Most \"bad\" answers are really under-specified prompts.",
            "Покажи prompt колезі без контексту й попроси виконати. Якщо він заплутається — Claude теж. Більшість \"поганих\" відповідей — це насправді недоописані prompt.",
          ),
        },
      ],
    },
    {
      id: "t2",
      title: L("GCAO & structured templates", "GCAO і структуровані шаблони"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Facing a blank box, a **template** beats improvisation. A popular community mnemonic is **GCAO** — **Goal, Context, Action, Output** — and it maps almost one-to-one onto Anthropic's own advice: say what you want, give the background, name the action, pin down the output. Keep a few templates around for the prompts you write often.",
            "Перед порожнім полем **шаблон** кращий за імпровізацію. Популярний community-мнемонік — **GCAO** — **Goal, Context, Action, Output** — і він майже один-в-один лягає на поради Anthropic: скажи, що хочеш, дай бекґраунд, назви дію, зафіксуй вивід. Тримай кілька шаблонів для prompt, які пишеш часто.",
          ),
        },
        {
          kind: "code",
          lang: "text",
          code: "GOAL:    Draft a reply to an unhappy customer that keeps the account.\nCONTEXT: {{plan}} customer, {{tenure}} with us; issue: {{issue}}.\n         A calm, specific reply protects a long-term relationship.\nACTION:  Apologise, explain the fix, give next steps + a goodwill offer.\nOUTPUT:  Inside <reply> tags, <=120 words, warm plain prose — no bullet lists.",
          note: L(
            "The `{{double_brackets}}` are variables — the same placeholder syntax the Claude Console uses, so one template serves many inputs.",
            "`{{double_brackets}}` — це змінні; той самий синтаксис плейсхолдерів, що в Claude Console, тож один шаблон обслуговує багато входів.",
          ),
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Let the Console write the first draft", "Дай Console написати чернетку"),
          md: L(
            "In the Claude Console the **prompt generator** drafts a structured prompt from a description, **templates & variables** parameterise it with `{{variables}}`, and the **prompt improver** rewrites an existing prompt — adding chain-of-thought, XML tags and cleaner examples. A strong starting point you then trim.",
            "У Claude Console **prompt generator** робить структурований prompt з опису, **templates & variables** параметризують його через `{{variables}}`, а **prompt improver** переписує наявний prompt — додаючи chain-of-thought, XML tags і чистіші приклади. Сильний старт, який далі підрізаєш.",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("Patterns: few-shot, step-by-step, self-critique", "Патерни: few-shot, step-by-step, self-critique"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Beyond structure, a few **patterns** carry most of the weight. Reach for the one that matches where the answer is failing — inconsistent format, shallow reasoning, or factual slips.",
            "Окрім структури, основну вагу несуть кілька **патернів**. Бери той, що відповідає тому, де відповідь провалюється — нестабільний формат, поверхове міркування чи фактичні похибки.",
          ),
        },
        {
          kind: "table",
          head: [L("Pattern", "Патерн"), L("Use it when", "Коли застосовувати"), L("How", "Як")],
          rows: [
            [L("Few-shot (multishot)", "Few-shot (multishot)"), L("Output format or tone must be consistent", "Формат чи тон виводу має бути стабільним"), L("Show 3–5 diverse examples in `<example>` tags", "Покажи 3–5 різних прикладів у тегах `<example>`")],
            [L("Step-by-step / CoT", "Step-by-step / CoT"), L("The task needs multi-step reasoning", "Задача потребує багатокрокового міркування"), L("Ask Claude to reason first; separate reasoning and answer with tags", "Попроси спершу міркувати; розділи міркування й відповідь тегами")],
            [L("Decomposition / chaining", "Decomposition / chaining"), L("One prompt is doing too much", "Один prompt робить забагато"), L("Split into stages; feed each output into the next", "Розбий на етапи; передавай кожен вивід у наступний")],
            [L("Self-critique", "Self-critique"), L("Accuracy matters (code, math, facts)", "Важлива точність (код, математика, факти)"), L("\"Before you finish, verify your answer against …\"", "\"Перед завершенням звір відповідь із …\"")],
            [L("Role + context", "Role + context"), L("Tone or domain expertise is key", "Ключові тон чи доменна експертиза"), L("Set a role and supply the domain background", "Задай role і дай доменний бекґраунд")],
          ],
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Modern models think on their own", "Сучасні моделі думають самі"),
          md: L(
            "Opus 4.8 and Sonnet 4.6 use **adaptive thinking** — Claude decides *when* and *how much* to reason from the task and the `effort` setting, so you rarely need to hand-write \"think step by step\". Prefer general instructions (\"think thoroughly\", \"verify before answering\") over scripted step lists; Claude's own plan often beats a prescribed one. Manual chain-of-thought is now a **fallback** for when thinking is off.",
            "Opus 4.8 і Sonnet 4.6 використовують **adaptive thinking** — Claude сам вирішує, *коли* і *скільки* міркувати, з огляду на задачу й параметр `effort`, тож рідко треба вручну писати \"think step by step\". Обирай загальні інструкції (\"think thoroughly\", \"verify before answering\") замість прописаних кроків; план Claude часто кращий за заданий. Ручний chain-of-thought тепер — **запасний варіант**, коли thinking вимкнено.",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Constraints, schemas & XML tags", "Constraints, schemas і XML tags"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "When the **shape** of the answer matters — you'll parse it, paste it, or hand it to another step — be explicit about format. **XML tags** are Claude's most reliable structuring tool: wrap instructions, context and inputs in their own tags (`<instructions>`, `<context>`, `<input>`) so nothing bleeds together. For machine-readable output, ask for a named schema or JSON and show one example.\n\nTwo rules pay off repeatedly: **tell Claude what to do, not only what to avoid** (\"write flowing prose paragraphs\" beats \"don't use markdown\"), and **match your prompt's style to the output** — a terse prompt tends to yield a terse answer.",
            "Коли важлива **форма** відповіді — ти її парситимеш, вставлятимеш чи передаси далі — будь явним щодо формату. **XML tags** — найнадійніший інструмент структурування Claude: загортай instructions, context та inputs у власні теги (`<instructions>`, `<context>`, `<input>`), щоб нічого не змішувалось. Для машиночитного виводу проси названу schema чи JSON і покажи один приклад.\n\nДва правила окупаються постійно: **кажи Claude що робити, а не лише чого уникати** (\"write flowing prose paragraphs\" краще за \"don't use markdown\"), і **узгоджуй стиль prompt із виводом** — стислий prompt дає стислу відповідь.",
          ),
        },
        {
          kind: "code",
          lang: "xml",
          code: "<instructions>\n  Classify the support ticket and draft a one-line internal note.\n</instructions>\n\n<ticket>\n  {{ticket_text}}\n</ticket>\n\nRespond only with:\n<result>\n  <category>billing | bug | how-to | other</category>\n  <note>…</note>\n</result>",
          note: L(
            "Named tags make the output trivial to parse and hard to misread — far more robust than \"return billing, bug, how-to, or other\".",
            "Названі теги роблять вивід тривіальним для парсингу й важким для хибного прочитання — значно надійніше за \"return billing, bug, how-to, or other\".",
          ),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Prefill is gone on 4.6+ — use tags instead", "Prefill зник на 4.6+ — використовуй теги"),
          md: L(
            "Prefilling the assistant's reply to force a format is **no longer supported on Claude 4.6 and newer** (it returns a 400 error). The replacement is exactly the technique above: ask for the format explicitly and use XML output tags. Instruction-following is now strong enough that prefill is rarely missed.",
            "Prefill відповіді асистента, щоб нав'язати формат, **більше не підтримується на Claude 4.6 і новіших** (повертає помилку 400). Заміна — саме техніка вище: проси формат явно й використовуй XML output tags. Instruction-following тепер достатньо сильний, щоб prefill майже не бракувало.",
          ),
        },
      ],
    },
    {
      id: "t5",
      title: L("Anti-patterns & debugging a prompt", "Анти-патерни і дебаг prompt"),
      blocks: [
        {
          kind: "compare",
          a: L("Weak prompt", "Слабкий prompt"),
          b: L("Strong prompt", "Сильний prompt"),
          rows: [
            [L("The ask", "Запит"), L("\"Write something about our Q3 results.\"", "\"Напиши щось про наші Q3 results.\""), L("\"Draft a 150-word internal update on Q3 results for the eng team; lead with the one number that matters.\"", "\"Зроби 150-слівний внутрішній апдейт про Q3 results для eng-команди; почни з єдиної важливої цифри.\"")],
            [L("Reasoning", "Логіка"), L("Hopes Claude guesses the goal", "Сподівається, що Claude вгадає мету"), L("States goal, audience, length and the key point", "Задає мету, аудиторію, довжину й ключову думку")],
            [L("Format", "Формат"), L("Unspecified — you'll re-edit", "Не задано — доведеться переробляти"), L("Named length + audience → usable first draft", "Названі довжина + аудиторія → придатна чернетка")],
            [L("Result", "Результат"), L("Generic, hedged, off-length", "Загально, обтічно, не та довжина"), L("On-target, on-format, minimal editing", "У ціль, у формат, мінімум правок")],
          ],
        },
        {
          kind: "prose",
          md: L(
            "Debug a prompt the way you debug code: **change one lever at a time.** Start from the task, add the single part the answer is missing (a role, an example, a format tag), and re-run. If you can't tell why an answer is wrong, ask Claude to explain what it understood the task to be — the gap is usually in the prompt, not the model. The Console **prompt improver** is a fast second opinion.",
            "Дебаж prompt як код: **міняй один важіль за раз.** Почни з task, додай ту єдину частину, якої бракує відповіді (role, приклад, format-тег), і запусти знову. Якщо не зрозуміло, чому відповідь хибна — попроси Claude пояснити, як він зрозумів задачу: розрив зазвичай у prompt, а не в моделі. Console **prompt improver** — швидка друга думка.",
          ),
        },
        {
          kind: "callout",
          tone: "warn",
          title: L("Don't over-prompt modern models", "Не переобтяжуй сучасні моделі"),
          md: L(
            "Shouting \"CRITICAL: you MUST always use this tool\" made sense for older models. Opus 4.8 and Sonnet 4.6 are highly responsive to the system prompt and will **overtrigger** on that language. Use normal phrasing — \"Use this tool when …\" — and add emphasis only where you actually see a miss.",
            "Кричати \"CRITICAL: you MUST always use this tool\" мало сенс для старих моделей. Opus 4.8 і Sonnet 4.6 дуже чутливі до system prompt і на такій мові **overtrigger**. Пиши нормально — \"Use this tool when …\" — і додавай натиск лише там, де реально бачиш промах.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("A prompt is assembled from parts — role, context, task, format, examples, constraints; add the one a weak answer is missing.", "Prompt складається з частин — role, context, task, format, examples, constraints; додавай ту, якої бракує слабкій відповіді."),
    L("Give the **why**, not just the **what** — Claude generalises from your motivation.", "Давай **why**, а не лише **what** — Claude узагальнює з твоєї мотивації."),
    L("Examples (few-shot) are the most reliable way to lock output format and tone.", "Examples (few-shot) — найнадійніший спосіб зафіксувати формат і тон виводу."),
    L("XML tags are the structuring tool; say what TO do and match your prompt's style to the output.", "XML tags — інструмент структурування; кажи що РОБИТИ й узгоджуй стиль prompt із виводом."),
    L("Modern models think adaptively — prefer general instructions over scripted steps, and don't over-prompt.", "Сучасні моделі думають adaptive — обирай загальні інструкції замість прописаних кроків і не переобтяжуй."),
    L("Templates plus the Console generator/improver turn good prompts into repeatable ones.", "Шаблони плюс Console generator/improver роблять гарні prompt повторюваними."),
  ],
  pitfalls: [
    { title: L("Vague asks", "Розмиті запити"), body: L("A one-liner with no goal, audience or format forces Claude to guess — and it guesses generically. Specify the outcome.", "Однорядковий запит без мети, аудиторії й формату змушує Claude вгадувати — і він вгадує загально. Задай результат.") },
    { title: L("Negative-only instructions", "Лише заборони"), body: L("\"Don't be verbose / no markdown\" says what to avoid but not what to produce. State the positive target instead.", "\"Don't be verbose / no markdown\" каже, чого уникати, але не що видати. Натомість задай позитивну ціль.") },
    { title: L("The kitchen-sink prompt", "Prompt-смітник"), body: L("Cramming five tasks into one prompt muddies all of them. Decompose and chain instead.", "П'ять задач в одному prompt каламутять усі. Краще decompose і chain.") },
    { title: L("Over-prompting", "Over-prompting"), body: L("ALL-CAPS \"you MUST\" language overtriggers modern models. Use calm, normal instructions.", "Мова \"you MUST\" капсом призводить до overtrigger у сучасних моделей. Пиши спокійно й нормально.") },
  ],
  interview: [
    { q: L("Walk through the parts of a well-structured prompt.", "Перелічи частини добре структурованого prompt."), a: L("Role (perspective/tone), context (facts + the *why*), task (explicit instruction), examples (few-shot for format/tone), format (XML tags / schema / length), and constraints (guardrails). Not all are needed every time — you add the part a weak answer is missing.", "Role (перспектива/тон), context (факти + *why*), task (явна інструкція), examples (few-shot для формату/тону), format (XML tags / schema / довжина) і constraints (запобіжники). Не всі потрібні щоразу — додаєш ту частину, якої бракує слабкій відповіді."), level: "senior" },
    { q: L("How has adaptive thinking changed prompting?", "Як adaptive thinking змінив prompting?"), a: L("On Opus 4.8 / Sonnet 4.6 Claude decides when and how much to think from the task and the `effort` setting, so hand-written \"think step by step\" is mostly unnecessary. Prefer general instructions like \"think thoroughly\" and \"verify before answering\"; manual chain-of-thought is a fallback for when thinking is off.", "На Opus 4.8 / Sonnet 4.6 Claude сам вирішує, коли й скільки думати, з огляду на задачу й `effort`, тож ручне \"think step by step\" здебільшого зайве. Обирай загальні інструкції на кшталт \"think thoroughly\" і \"verify before answering\"; ручний chain-of-thought — запасний варіант, коли thinking вимкнено."), level: "senior" },
    { q: L("Why prefer examples over a longer description?", "Чому приклади кращі за довший опис?"), a: L("Examples (few-shot) demonstrate the exact format, tone and edge-case handling you want; 3–5 diverse, relevant examples in `<example>` tags steer output far more reliably than prose describing the same thing.", "Examples (few-shot) показують точний формат, тон і обробку крайових випадків; 3–5 різних релевантних прикладів у тегах `<example>` керують виводом надійніше, ніж проза про те саме."), level: "middle" },
  ],
  seeAlso: ["m3", "m10", "m7", "m12"],
  sources: [
    { title: "Prompting best practices — Claude Docs", url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices" },
    { title: "Prompt engineering overview — Claude Docs", url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview" },
    { title: "Console prompting tools (generator, improver, templates) — Claude Docs", url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/prompt-generator" },
    { title: "Use prompt templates and variables — Claude Docs", url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/prompt-templates-and-variables" },
  ],
};

/* ======================================================================
   M7 · Projects — fully authored
   ====================================================================== */
const m7: Module = {
  id: "m7",
  section: "s2",
  order: 7,
  level: "middle",
  title: L("Projects", "Projects"),
  tagline: L(
    "A walled workspace with its own chats, knowledge and instructions — so Claude already knows the background before you type.",
    "Огороджений workspace з власними чатами, knowledge та instructions — щоб Claude знав бекґраунд ще до твого повідомлення.",
  ),
  readMins: 9,
  mentalModel: L(
    "A Project is a room with its own memory, files and house rules: you walk in and Claude already has the context.",
    "Project — це кімната з власною пам'яттю, файлами й правилами: ти заходиш, а Claude уже має контекст.",
  ),
  topics: [
    {
      id: "t1",
      title: L("What a Project is", "Що таке Project"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "A **Project** is a self-contained workspace inside Claude with its **own chat history**, its **own knowledge base** and its **own instructions**. Everything inside a project shares that context, and nothing leaks out to your other chats. If a plain chat is a fresh notepad each time, a project is **a room with its own memory, files and house rules** — you walk in and Claude already knows the background.\n\nProjects are available on **every plan, including free** (free accounts keep up to five). They suit any body of work you return to: a client account, a codebase, a book you're writing, a recurring report.",
            "**Project** — це самодостатній workspace усередині Claude з власною **історією чатів**, власною **knowledge base** і власними **instructions**. Усе всередині project ділить цей контекст, і нічого не витікає в інші чати. Якщо звичайний чат — це щоразу новий блокнот, то project — **кімната з власною пам'яттю, файлами й правилами**: ти заходиш, а Claude уже знає бекґраунд.\n\nProjects доступні на **кожному плані, включно з free** (на free — до п'яти). Вони пасують будь-якому напряму, до якого вертаєшся: клієнтський акаунт, кодова база, книга, регулярний звіт.",
          ),
        },
        { kind: "figure", fig: "project-workspace", caption: L("A project walls off its own knowledge + instructions; skills and connectors compose in from outside.", "Project огороджує власні knowledge + instructions; skills і connectors долучаються ззовні.") },
        {
          kind: "compare",
          a: L("Plain chat", "Звичайний чат"),
          b: L("Project", "Project"),
          rows: [
            [L("Memory", "Пам'ять"), L("Starts empty every time", "Щоразу порожня"), L("Shared knowledge + instructions, always loaded", "Спільні knowledge + instructions, завжди завантажені")],
            [L("Files", "Файли"), L("Re-upload each chat", "Перезавантажуєш у кожному чаті"), L("Uploaded once to the knowledge base", "Завантажені раз у knowledge base")],
            [L("Instructions", "Instructions"), L("Re-state your preferences each time", "Щоразу повторюєш уподобання"), L("Set once, apply to every chat in the project", "Задані раз, діють у кожному чаті project")],
            [L("Best for", "Найкраще для"), L("One-off questions", "Разові питання"), L("Ongoing, context-heavy work", "Тривала робота з великим контекстом")],
          ],
        },
      ],
    },
    {
      id: "t2",
      title: L("Project instructions", "Project instructions"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "**Project instructions** are a system prompt you own. They tell Claude how to behave in *every* chat in the project — a tone, a role to adopt, formatting rules, things to always or never do. Write them the way you'd brief a new teammate on the account.\n\nThey apply only inside that project, so you can run a \"formal client-comms\" project and a \"casual brainstorm\" project side by side without their rules colliding.",
            "**Project instructions** — це system prompt, яким володієш ти. Вони кажуть Claude, як поводитись у *кожному* чаті project — тон, роль, правила форматування, що завжди чи ніколи робити. Пиши їх так, ніби вводиш нового колегу в акаунт.\n\nВони діють лише в цьому project, тож можна вести \"formal client-comms\" project і \"casual brainstorm\" project поруч — їхні правила не зіткнуться.",
          ),
        },
        {
          kind: "code",
          lang: "text",
          code: "You are our support lead for the Acme account.\n- Tone: warm, concise, no jargon.\n- Always check the knowledge base before answering; cite the file you used.\n- Never promise delivery dates; route those to the AM.\n- Default reply length: under 150 words unless asked.",
          note: L(
            "Behaviour and rules go in instructions — not facts. Facts belong in the knowledge base (next topic).",
            "Поведінка й правила — в instructions, не факти. Факти — у knowledge base (наступна тема).",
          ),
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Instructions and knowledge do different jobs", "Instructions і knowledge роблять різне"),
          md: L(
            "**Instructions** shape *how* Claude responds (tone, rules, role). **Knowledge** gives it *what* to draw on (facts, files). Keep behaviour in instructions and content in the knowledge base — mixing them bloats both.",
            "**Instructions** формують, *як* Claude відповідає (тон, правила, роль). **Knowledge** дає, *на що* спиратись (факти, файли). Тримай поведінку в instructions, а контент — у knowledge base; змішування роздуває обидва.",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("Project knowledge & the context wall", "Project knowledge і context wall"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "**Project knowledge** is the documents, code and notes you upload once so every chat can draw on them — style guides, transcripts, a codebase, past work. Think of it as **static background that's always loaded** before your message.\n\nThat \"always loaded\" part is the catch: knowledge shares the model's **context window**. A project's knowledge fits inside roughly a 200K-token window — about a 500-page book — though some models now reach far higher. This is the **context wall**: pour in more than fits and something has to give.",
            "**Project knowledge** — це документи, код і нотатки, які ти завантажуєш раз, щоб кожен чат міг ними скористатись — style guides, транскрипти, кодова база, минула робота. Уявляй це як **статичний бекґраунд, що завжди завантажений** перед твоїм повідомленням.\n\nСаме \"завжди завантажений\" і є підступ: knowledge ділить **context window** моделі. Knowledge одного project вміщується приблизно в 200K-токенне вікно — десь книга на 500 сторінок — хоча деякі моделі тепер сягають значно більше. Це **context wall**: заллєш більше, ніж влазить, — щось доведеться відкинути.",
          ),
        },
        {
          kind: "prose",
          md: L(
            "On **paid plans** (Pro, Max, Team, Enterprise) Claude clears that wall automatically. As your knowledge approaches the limit, it switches on **RAG** (Retrieval Augmented Generation): instead of loading every document, a **project knowledge search tool** retrieves only the most relevant pieces for each question, expanding effective capacity by up to **10×**. On the **free** plan there's no RAG, so keep the knowledge base lean and high-signal.",
            "На **платних планах** (Pro, Max, Team, Enterprise) Claude бере цю стіну автоматично. Коли knowledge наближається до межі, вмикається **RAG** (Retrieval Augmented Generation): замість завантажувати кожен документ, **project knowledge search tool** дістає лише найрелевантніші шматки під кожне питання, розширюючи фактичну місткість до **10×**. На **free** RAG немає, тож тримай knowledge base стислою й насиченою сигналом.",
          ),
        },
        {
          kind: "table",
          head: [L("Concept", "Поняття"), L("What it means", "Що означає"), L("Why it matters", "Чому важливо")],
          rows: [
            [L("Static knowledge", "Static knowledge"), L("Files loaded into context before each chat", "Файли, завантажені в context перед кожним чатом"), L("Fast, always-on background — but bounded by the window", "Швидкий, завжди-увімкнений бекґраунд — але обмежений вікном")],
            [L("The context wall", "Context wall"), L("The window's size limit (~200K tokens baseline)", "Межа розміру вікна (~200K токенів базово)"), L("Past it, content must be summarised or retrieved", "За нею контент треба підсумовувати чи діставати через retrieval")],
            [L("RAG mode (paid)", "RAG mode (платно)"), L("Auto-retrieval of only relevant chunks", "Автоматичний retrieval лише релевантних шматків"), L("~10× capacity without dumping everything into context", "~10× місткості без скидання всього в context")],
            [L("Free plan", "Free plan"), L("No RAG", "RAG немає"), L("Keep knowledge lean; prune what's stale", "Тримай knowledge стислою; прибирай застаріле")],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: L("Garbage in, confidently out", "Сміття на вході — впевнено на виході"),
          md: L(
            "Knowledge is loaded uncritically — outdated or contradictory files get treated as truth. Curate the base: remove stale versions, and prefer a few authoritative documents over a dump of everything.",
            "Knowledge завантажується некритично — застарілі чи суперечливі файли вважаються істиною. Курируй базу: прибирай старі версії й обирай кілька авторитетних документів замість звалища всього.",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Skills & connectors in a project", "Skills і connectors у project"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "It's tempting to think of skills and connectors as \"belonging\" to a project, but the truth is more useful. **Project knowledge is static and local** — loaded for that project's chats only. **Skills are dynamic and global**: packaged procedures that activate automatically when relevant and work **everywhere across Claude**, not just in one project. **Connectors** (MCP) are enabled at your **account or organisation** level and toggled per conversation; inside a project chat you switch on the ones that conversation needs. (On Team and Enterprise plans an Owner enables skills and connectors for the org first.)\n\nSo the honest mental model is: a project gives you persistent **context** (knowledge + instructions); **skills** add reusable know-how across all of Claude; **connectors** reach live tools when toggled on. They compose — one project chat can use knowledge, a skill and a connector at once — but only knowledge and instructions are scoped to the project.",
            "Спокусливо думати, що skills і connectors \"належать\" project, та правда корисніша. **Project knowledge статичний і локальний** — завантажується лише для чатів цього project. **Skills динамічні й глобальні**: упаковані процедури, що активуються самі, коли доречно, і працюють **усюди в Claude**, а не в одному project. **Connectors** (MCP) вмикаються на рівні **акаунта чи організації** й перемикаються в кожній розмові; у чаті project ти вмикаєш ті, що потрібні саме цій розмові. (На Team і Enterprise Owner спершу вмикає skills і connectors для організації.)\n\nОтже, чесна ментальна модель така: project дає тривкий **context** (knowledge + instructions); **skills** додають перевикористовуване вміння по всьому Claude; **connectors** дістають живі інструменти, коли ввімкнені. Вони композуються — один чат project може водночас використати knowledge, skill і connector — але лише knowledge та instructions прив'язані до project.",
          ),
        },
        {
          kind: "compare",
          a: L("Project knowledge", "Project knowledge"),
          b: L("Skills", "Skills"),
          rows: [
            [L("Scope", "Область"), L("This project only", "Лише цей project"), L("Everywhere across Claude", "Усюди в Claude")],
            [L("Loading", "Завантаження"), L("Static — always in context", "Статично — завжди в context"), L("Dynamic — activates when relevant", "Динамічно — активується за доречності")],
            [L("Holds", "Містить"), L("Your facts and files", "Твої факти й файли"), L("Reusable procedures / expertise", "Перевикористовувані процедури / експертизу")],
            [L("You manage it", "Керування"), L("Per project", "На рівні project"), L("Per account / org", "На рівні акаунта / org")],
          ],
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Why this distinction matters", "Чому це розрізнення важливе"),
          md: L(
            "If you expect a skill to live \"inside\" one project, you'll duplicate it everywhere. Author it once — it triggers wherever it's relevant. Reserve the project for the **context** that genuinely is project-specific.",
            "Якщо очікувати, що skill живе \"всередині\" одного project, ти дублюватимеш його всюди. Напиши раз — він тригериться там, де доречно. Лишай project для **context**, який справді специфічний для нього.",
          ),
        },
      ],
    },
    {
      id: "t5",
      title: L("Project vs plain chat", "Project vs звичайний чат"),
      blocks: [
        {
          kind: "table",
          head: [L("When you need…", "Коли потрібно…"), L("Use", "Обери"), L("Why", "Чому")],
          rows: [
            [L("A quick, one-off answer", "Швидку разову відповідь"), L("Plain chat", "Звичайний чат"), L("No setup; nothing to load", "Без налаштувань; нічого завантажувати")],
            [L("Repeated work on the same material", "Повторну роботу з тим самим матеріалом"), L("Project", "Project"), L("Knowledge + instructions persist", "Knowledge + instructions зберігаються")],
            [L("A consistent voice or rules across chats", "Єдиний голос чи правила в усіх чатах"), L("Project", "Project"), L("Instructions apply to every chat", "Instructions діють у кожному чаті")],
            [L("To search live tools or act on the world", "Шукати в живих інструментах чи діяти у світі"), L("Chat or project + connector", "Чат або project + connector"), L("Connectors aren't project-bound", "Connectors не прив'язані до project")],
            [L("Team knowledge sharing", "Спільне knowledge команди"), L("Project (Team/Enterprise)", "Project (Team/Enterprise)"), L("Shareable with permissions", "Можна ділитися з правами доступу")],
          ],
        },
        {
          kind: "prose",
          md: L(
            "Reach for a project the moment you notice yourself re-pasting the same background or re-stating the same preferences. The break-even is low: two or three context-heavy chats on one topic already pay for the minute it takes to set up.",
            "Бери project, щойно помічаєш, що знову вставляєш той самий бекґраунд чи повторюєш ті самі вподобання. Поріг окупності низький: два-три контекстомісткі чати на одну тему вже виправдовують хвилину налаштування.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("A project = walled workspace with its own chats, knowledge and instructions; available on every plan (5 on free).", "Project = огороджений workspace із власними чатами, knowledge та instructions; на кожному плані (5 на free)."),
    L("Instructions shape *how* Claude responds; knowledge gives it *what* to draw on — keep them separate.", "Instructions формують, *як* Claude відповідає; knowledge дає, *на що* спиратись — тримай їх окремо."),
    L("Knowledge is static background bounded by the context window — the context wall.", "Knowledge — статичний бекґраунд, обмежений context window — це context wall."),
    L("Paid plans auto-enable RAG to expand knowledge ~10×; free plans have no RAG, so stay lean.", "Платні плани вмикають RAG і розширюють knowledge ~10×; на free RAG немає, тож тримай стисло."),
    L("Skills are global and dynamic; connectors are account-level and per-chat — only knowledge + instructions are project-scoped.", "Skills глобальні й динамічні; connectors на рівні акаунта й на чат — лише knowledge + instructions прив'язані до project."),
    L("Use a project the moment you're re-pasting context or re-stating rules.", "Бери project, щойно знову вставляєш контекст чи повторюєш правила."),
  ],
  pitfalls: [
    { title: L("Dumping everything into knowledge", "Звалювання всього в knowledge"), body: L("More files isn't more signal. Past the context wall, stale or contradictory docs dilute answers. Curate.", "Більше файлів — не більше сигналу. За context wall застарілі чи суперечливі документи розмивають відповіді. Курируй.") },
    { title: L("Putting rules in knowledge (or facts in instructions)", "Правила в knowledge (чи факти в instructions)"), body: L("Behaviour belongs in instructions, content in knowledge. Mixing bloats both and weakens each.", "Поведінка — в instructions, контент — у knowledge. Змішування роздуває обидва й послаблює кожен.") },
    { title: L("Expecting skills to be project-scoped", "Очікування, що skills прив'язані до project"), body: L("Skills work everywhere and activate dynamically — author once, don't duplicate per project.", "Skills працюють усюди й активуються динамічно — напиши раз, не дублюй у кожному project.") },
    { title: L("Assuming free-plan RAG", "Припущення про RAG на free"), body: L("RAG is paid-only. On free, a too-large knowledge base silently loses fidelity at the wall.", "RAG лише на платних. На free завелика knowledge base тихо втрачає точність на стіні.") },
  ],
  interview: [
    { q: L("What's the \"context wall\" in a project and how does Claude get past it?", "Що таке \"context wall\" у project і як Claude його долає?"), a: L("Project knowledge loads into the model's context window; once it nears that limit (≈200K baseline) you hit the wall. On paid plans Claude auto-enables RAG — a project knowledge search tool retrieves only the relevant chunks per query, expanding effective capacity ~10×. Free plans have no RAG, so knowledge must stay within the window.", "Project knowledge завантажується в context window моделі; щойно воно близько до межі (≈200K базово) — упираєшся у стіну. На платних планах Claude вмикає RAG — project knowledge search tool дістає лише релевантні шматки під запит, розширюючи місткість ~10×. На free RAG немає, тож knowledge має лишатись у межах вікна."), level: "senior" },
    { q: L("Instructions vs knowledge — what goes where?", "Instructions vs knowledge — що куди?"), a: L("Instructions are the system prompt you own: tone, role, rules — *how* Claude behaves. Knowledge is the files and facts it draws on — *what* it knows. Keep behaviour in instructions and content in knowledge.", "Instructions — це твій system prompt: тон, роль, правила — *як* Claude поводиться. Knowledge — файли й факти, на які він спирається — *що* він знає. Поведінка — в instructions, контент — у knowledge."), level: "middle" },
    { q: L("Are skills and connectors scoped to a project?", "Чи прив'язані skills і connectors до project?"), a: L("No. Only knowledge and instructions are project-scoped. Skills are global and activate dynamically across all of Claude; connectors are enabled at the account/org level and toggled per conversation. They compose with a project but aren't owned by it.", "Ні. Лише knowledge та instructions прив'язані до project. Skills глобальні й активуються динамічно по всьому Claude; connectors вмикаються на рівні акаунта/org і перемикаються в кожній розмові. Вони композуються з project, але не належать йому."), level: "senior" },
  ],
  seeAlso: ["m10", "m12", "m5", "m15"],
  sources: [
    { title: "What are projects? — Claude Help Center", url: "https://support.claude.com/en/articles/9517075-what-are-projects" },
    { title: "How can I create and manage projects? — Claude Help Center", url: "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects" },
    { title: "Retrieval Augmented Generation (RAG) for projects — Claude Help Center", url: "https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects" },
    { title: "Use skills in Claude — Claude Help Center", url: "https://support.claude.com/en/articles/12512180-use-skills-in-claude" },
    { title: "Collaborate with Claude on Projects — Anthropic", url: "https://www.anthropic.com/news/projects" },
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

  // Section II  (m6 Prompting mastery + m7 Projects are fully authored below)
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
export const MODULES: Module[] = [...planned, m6, m7, m15].sort((a, b) => a.order - b.order);

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
