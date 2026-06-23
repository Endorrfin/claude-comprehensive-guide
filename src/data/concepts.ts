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
   M8 · Artifacts — fully authored (figure: chat-artifact-panel)
   ====================================================================== */
const m8: Module = {
  id: "m8",
  section: "s2",
  order: 8,
  level: "middle",
  title: L("Artifacts", "Artifacts"),
  tagline: L(
    "When an answer is something you'll keep, edit, or run, Claude lifts it out of the chat into its own window — editable, versioned, shareable.",
    "Коли відповідь — це те, що ти збережеш, відредагуєш чи запустиш, Claude виносить її з чату в окреме вікно — редаговане, з версіями, готове ділитись.",
  ),
  readMins: 9,
  mentalModel: L(
    "The chat is the workshop; the artifact is the thing you're building — a document or app that lives beside the conversation and outlives any single turn.",
    "Чат — це майстерня; artifact — те, що ти будуєш: документ чи застосунок, який живе поруч із розмовою і переживає будь-який окремий хід.",
  ),
  topics: [
    {
      id: "t1",
      title: L("What artifacts are", "Що таке artifacts"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "An **artifact** is a substantial, self-contained piece of content that Claude opens in a **dedicated window to the right of the chat**, instead of burying it in the message stream. Claude reaches for one when the content is significant (**typically over ~15 lines**), stands on its own, and is something you'll want to **edit, iterate on, reuse, or come back to** later.\n\nThe chat is where you think out loud; the artifact is the deliverable taking shape next to it. Artifacts are available on **all plans** (Free → Enterprise) and toggle under **Settings → Capabilities**; the runnable kinds also need **Code execution and file creation** enabled.",
            "**Artifact** — це вагомий, самодостатній фрагмент контенту, який Claude відкриває в **окремому вікні праворуч від чату**, а не ховає в потоці повідомлень. Claude обирає його, коли контент значний (**зазвичай понад ~15 рядків**), самодостатній і його захочеться **редагувати, ітерувати, перевикористати чи повернутись** до нього пізніше.\n\nЧат — це де ти думаєш уголос; artifact — результат, що набуває форми поруч. Artifacts доступні на **всіх планах** (Free → Enterprise) і вмикаються в **Settings → Capabilities**; для запускних типів потрібно ще ввімкнути **Code execution and file creation**.",
          ),
        },
        { kind: "figure", fig: "chat-artifact-panel", caption: L("Significant, self-contained output moves out of the chat into its own window — with versions, code view, copy, download and publish.", "Значний самодостатній результат виходить із чату в окреме вікно — з версіями, переглядом коду, copy, download і publish.") },
        {
          kind: "compare",
          a: L("Plain chat output", "Звичайний вивід у чаті"),
          b: L("Artifact", "Artifact"),
          rows: [
            [L("Lives in", "Живе в"), L("The message stream — scrolls away", "Потоці повідомлень — губиться при прокрутці"), L("A dedicated side window", "Окремому бічному вікні")],
            [L("Editing", "Редагування"), L("Re-ask and copy-paste the new version", "Перепитай і копіюй нову версію"), L("Iterate in place; versions are kept", "Ітеруй на місці; версії зберігаються")],
            [L("Runs?", "Запускається?"), L("No — it's just text", "Ні — це лише текст"), L("HTML / React / SVG render and run", "HTML / React / SVG рендеряться й працюють")],
            [L("Sharing", "Поширення"), L("Copy the text manually", "Копіюй текст вручну"), L("One published link, view or remix", "Одне published-посилання, перегляд чи remix")],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("The \"is this an artifact?\" test", "Тест «це artifact?»"),
          md: L(
            "Significant · self-contained · reusable · roughly 15+ lines. If you'd want to keep it, edit it, or run it, it belongs in an artifact. A two-line answer does not.",
            "Значний · самодостатній · перевикористовний · приблизно 15+ рядків. Якщо це хочеться зберегти, редагувати чи запустити — місце в artifact. Відповідь у два рядки — ні.",
          ),
        },
      ],
    },
    {
      id: "t2",
      title: L("Types: documents, code, mini-apps, diagrams", "Типи: документи, код, mini-apps, діаграми"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Artifacts span a small, well-defined set of types. The first few are **content**; the last two are where artifacts become **runnable apps** you can click, not just read.",
            "Artifacts охоплюють невеликий чіткий набір типів. Перші — це **контент**; останні два — там, де artifacts стають **запускними застосунками**, які можна клікати, а не лише читати.",
          ),
        },
        {
          kind: "table",
          head: [L("Type", "Тип"), L("What it's for", "Для чого"), L("Reach for it when", "Обирай, коли")],
          rows: [
            [L("Document (Markdown / text)", "Документ (Markdown / текст)"), L("Reports, specs, posts, letters", "Звіти, специфікації, пости, листи"), L("You want prose you'll edit and export", "Потрібна проза, яку редагуватимеш і експортуватимеш")],
            [L("Code snippet", "Фрагмент коду"), L("A function, script or config", "Функція, скрипт чи config"), L("You need code to keep and copy out", "Потрібен код, щоб зберегти й скопіювати")],
            [L("Single-page HTML site", "Односторінковий HTML-сайт"), L("Landing pages, prototypes", "Лендінги, прототипи"), L("You want a self-contained page", "Потрібна самодостатня сторінка")],
            [L("Interactive React component", "Інтерактивний React-компонент"), L("Mini-apps, tools, games", "Mini-apps, інструменти, ігри"), L("State and interaction matter", "Важливі стан і взаємодія")],
            [L("SVG image", "SVG-зображення"), L("Logos, icons, illustrations", "Логотипи, іконки, ілюстрації"), L("You need crisp, editable vector art", "Потрібна чітка редаговна векторна графіка")],
            [L("Diagram / flowchart (Mermaid)", "Діаграма / flowchart (Mermaid)"), L("Architecture, flows, org charts", "Архітектура, потоки, оргсхеми"), L("A picture beats paragraphs", "Картинка краща за абзаци")],
          ],
          caption: L("Six core artifact types. HTML and React are the \"mini-app\" tiers — they execute.", "Шість основних типів artifact. HTML і React — це рівні «mini-app»: вони виконуються."),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("HTML & React artifacts are real single-file apps", "HTML- і React-artifacts — це справжні односторінкові застосунки"),
          md: L(
            "They run in a sandboxed VM (hence the **Code execution** toggle), bundle everything into one file, and can pull common libraries (charts, Tailwind utility classes, 3D). This is what turns \"a set of flashcards\" into \"a flashcard **app** that generates its own cards.\"",
            "Вони працюють у sandbox-VM (звідси перемикач **Code execution**), збирають усе в один файл і можуть підтягувати поширені бібліотеки (charts, Tailwind utility-класи, 3D). Саме це перетворює «набір flashcards» на «flashcard-**застосунок**, що сам генерує картки».",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("Inline visualizations & data analytics", "Візуалізації та аналітика"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Because the runnable tiers execute code in a sandbox, an artifact doubles as a **data-analysis surface**. Drop in a CSV or paste numbers and ask for a chart, a dashboard, or a calculator — Claude writes the code, runs it, and renders the result you can poke at. The analysis happens in the same window as the output, so you iterate on the *view*, not just the prose describing it.",
            "Оскільки запускні рівні виконують код у sandbox, artifact водночас стає **поверхнею для аналізу даних**. Кинь CSV або встав числа й попроси chart, dashboard чи калькулятор — Claude пише код, запускає його й рендерить результат, з яким можна гратись. Аналіз відбувається в тому ж вікні, що й вивід, тож ти ітеруєш *подання*, а не лише прозу про нього.",
          ),
        },
        {
          kind: "table",
          head: [L("You bring", "Ти приносиш"), L("Ask for", "Проси"), L("You get", "Отримуєш")],
          rows: [
            [L("A messy CSV", "Сирий CSV"), L("\"Chart revenue by month\"", "«Chart доходу по місяцях»"), L("An interactive chart you can restyle", "Інтерактивний chart, який можна перестилювати")],
            [L("A pile of survey rows", "Купу рядків опитування"), L("\"Build a dashboard\"", "«Збери dashboard»"), L("A filterable multi-view panel", "Панель із фільтрами й кількома видами")],
            [L("A formula in your head", "Формулу в голові"), L("\"Make a calculator\"", "«Зроби калькулятор»"), L("A live tool with inputs and outputs", "Живий інструмент із входами й виходами")],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Browse and remix, don't start blank", "Гортай і ремікси, не починай з порожнього"),
          md: L(
            "The dedicated **artifacts space** in the sidebar holds your past creations plus curated examples from Anthropic. Opening one and saying \"make it mine\" is often faster than describing a tool from scratch.",
            "Окремий **artifacts space** на бічній панелі містить твої минулі творіння плюс підбірку прикладів від Anthropic. Відкрити приклад і сказати «зроби своїм» часто швидше, ніж описувати інструмент з нуля.",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Editing, versioning & sharing", "Редагування, версії та поширення"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Iterate by just asking Claude to change the artifact; for **Markdown** you can also **edit in place** — highlight text, click *Edit with Claude*, and type the change exactly where it lives. Every change is a **version**: a selector lets you browse history and jump back, and editing an earlier chat message branches a whole new line of artifacts. If a runnable artifact throws an error, the **Try fixing with Claude** button feeds the error back for a fix.",
            "Ітеруй, просто просячи Claude змінити artifact; для **Markdown** можна також **редагувати на місці** — виділи текст, натисни *Edit with Claude* і впиши зміну саме там, де вона має бути. Кожна зміна — це **версія**: селектор дає гортати історію й вертатись назад, а редагування ранішого повідомлення гілкує цілу нову лінію artifacts. Якщо запускний artifact кидає помилку, кнопка **Try fixing with Claude** повертає помилку на виправлення.",
          ),
        },
        {
          kind: "table",
          head: [L("Action", "Дія"), L("Who", "Хто"), L("What it does", "Що робить")],
          rows: [
            [L("Publish", "Publish"), L("Free · Pro · Max", "Free · Pro · Max"), L("Public link — anyone with it can view & interact", "Публічне посилання — будь-хто з ним переглядає й взаємодіє")],
            [L("Share", "Share"), L("Team · Enterprise", "Team · Enterprise"), L("Org-only — viewers must be signed into your org", "Лише для org — глядачі мають бути в твоїй org")],
            [L("Remix", "Remix"), L("Any Claude user", "Будь-який користувач Claude"), L("Makes their own copy; your original is untouched", "Робить власну копію; твій оригінал недоторканий")],
          ],
        },
        {
          kind: "callout",
          tone: "security",
          title: L("A published link is public until you unpublish it", "Published-посилання публічне, доки не знімеш публікацію"),
          md: L(
            "The link points to the **specific version** you shared and stays live for anyone who has it until you un-publish. Don't bake secrets, tokens or private data into something you publish.",
            "Посилання вказує на **конкретну версію**, якою ти поділився, і лишається активним для всіх, хто його має, доки не знімеш публікацію. Не зашивай секрети, токени чи приватні дані в те, що публікуєш.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("An artifact is significant, self-contained output in its own window — editable, versioned, shareable.", "Artifact — це значний самодостатній вивід у власному вікні — редаговний, з версіями, готовий ділитись."),
    L("Six core types; HTML and React are runnable mini-apps, not just text.", "Шість основних типів; HTML і React — запускні mini-apps, а не лише текст."),
    L("Runnable artifacts double as a data-analysis surface — charts, dashboards, calculators.", "Запускні artifacts водночас є поверхнею для аналізу даних — charts, dashboards, калькулятори."),
    L("Every change is a version you can revisit; editing an earlier message branches new artifacts.", "Кожна зміна — це версія, до якої можна повернутись; редагування ранішого повідомлення гілкує нові artifacts."),
    L("Publish (Free/Pro/Max, public) vs Share (Team/Enterprise, org-only); others can remix a copy.", "Publish (Free/Pro/Max, публічно) vs Share (Team/Enterprise, лише org); інші можуть зробити remix-копію."),
  ],
  pitfalls: [
    { title: L("Forcing everything into an artifact", "Запихати все в artifact"), body: L("Short answers and quick back-and-forth belong in the chat. Artifacts are for things you'll keep.", "Короткі відповіді й швидкий діалог — у чаті. Artifacts — для того, що збережеш.") },
    { title: L("Publishing private data", "Публікація приватних даних"), body: L("A published link is public to anyone who has it. Strip secrets before you publish.", "Published-посилання публічне для всіх, хто його має. Прибери секрети перед публікацією.") },
    { title: L("Expecting an edit to update Claude's memory", "Очікувати, що правка змінить пам'ять Claude"), body: L("Your in-place edits don't change Claude's memory of the original content — re-state changes if a later turn must build on them.", "Твої правки на місці не змінюють пам'ять Claude про оригінал — повтори зміни, якщо наступний хід має на них спиратись.") },
  ],
  interview: [
    { q: L("When does Claude create an artifact instead of answering inline?", "Коли Claude створює artifact замість відповіді в чаті?"), a: L("When content is significant and self-contained (≈15+ lines), stands on its own, and is something you'll edit, reuse or return to — documents, code, HTML/React apps, SVG, diagrams.", "Коли контент значний і самодостатній (≈15+ рядків), тримається сам і його редагуватимеш, перевикористаєш чи повернешся — документи, код, HTML/React-застосунки, SVG, діаграми."), level: "middle" },
    { q: L("Publish vs Share — what's the difference?", "Publish vs Share — у чому різниця?"), a: L("Publish (Free/Pro/Max) creates a public link anyone can view and interact with; Share (Team/Enterprise) keeps it inside the org. Either way, other users remix their own copy rather than editing yours.", "Publish (Free/Pro/Max) робить публічне посилання для перегляду й взаємодії; Share (Team/Enterprise) лишає його в org. У будь-якому разі інші роблять власну remix-копію, а не редагують твою."), level: "middle" },
  ],
  seeAlso: ["m9", "m4", "m12", "m22"],
  sources: [
    { title: "What are artifacts and how do I use them? — Claude Help Center", url: "https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them" },
    { title: "Publish and share artifacts — Claude Help Center", url: "https://support.claude.com/en/articles/9547008-publish-and-share-artifacts" },
    { title: "Turn ideas into interactive AI-powered apps — Anthropic", url: "https://claude.com/blog/build-artifacts" },
    { title: "Use artifacts to visualize and create AI apps — Claude Help Center", url: "https://support.claude.com/en/articles/11649427-use-artifacts-to-visualize-and-create-ai-apps-without-ever-writing-a-line-of-code" },
  ],
};

/* ======================================================================
   M9 · Live Artifacts — fully authored (embedded tiny live demo)
   ====================================================================== */
const m9: Module = {
  id: "m9",
  section: "s2",
  order: 9,
  level: "senior",
  title: L("Live Artifacts", "Live Artifacts"),
  tagline: L(
    "Give an artifact memory and a connection to the world and it stops being a one-shot output — it becomes a small app you return to.",
    "Дай artifact пам'ять і зв'язок зі світом — і він перестає бути одноразовим виводом, стаючи маленьким застосунком, до якого вертаєшся.",
  ),
  readMins: 10,
  mentalModel: L(
    "A static artifact is a printout; a live artifact is a running program — it remembers state, calls the model from inside itself, and reaches your tools.",
    "Статичний artifact — це роздруківка; live artifact — програма, що працює: пам'ятає стан, викликає модель зсередини себе й дістає твої інструменти.",
  ),
  topics: [
    {
      id: "t1",
      title: L("Stateful artifacts: persistent storage", "Stateful artifacts: persistent storage"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Three upgrades turn an ordinary artifact \"live\": **persistent storage** (it remembers), a **Claude API inside** (it thinks), and **MCP connectors** (it reaches your tools). Start with memory. **Persistent storage** lets an artifact keep data **across sessions**, so you can build journals, trackers and leaderboards that are still there tomorrow.\n\nStorage comes in two flavours: **personal** (each user's data is private to them) and **shared** (everyone using the artifact sees the same data — think a team leaderboard). It's available on **Pro, Max, Team and Enterprise**, and only works on **published** artifacts — during building and testing, storage calls quietly no-op until you publish.",
            "Три апгрейди роблять звичайний artifact «live»: **persistent storage** (пам'ятає), **Claude API всередині** (думає) і **MCP connectors** (дістає твої інструменти). Почнемо з пам'яті. **Persistent storage** дозволяє artifact зберігати дані **між сесіями**, тож можна будувати журнали, трекери й leaderboards, що будуть на місці й завтра.\n\nStorage буває двох видів: **personal** (дані кожного користувача приватні) і **shared** (усі, хто користується artifact, бачать ті самі дані — як командний leaderboard). Доступно на **Pro, Max, Team і Enterprise** і працює лише на **published**-artifacts — під час побудови й тестування виклики storage тихо нічого не роблять, доки не опублікуєш.",
          ),
        },
        { kind: "figure", fig: "live-artifact-flow", caption: L("A live artifact runs on Anthropic's infrastructure and gains three powers: storage, the Claude API, and MCP connectors. Each user gets their own instance.", "Live artifact працює на інфраструктурі Anthropic і отримує три сили: storage, Claude API і MCP connectors. Кожен користувач має власний екземпляр.") },
        {
          kind: "callout",
          tone: "senior",
          title: L("\"Live Artifacts\" is a nickname, not the official name", "«Live Artifacts» — це прізвисько, а не офіційна назва"),
          md: L(
            "Anthropic doesn't ship a product called \"Live Artifacts.\" The official names are **AI-powered artifacts**, **persistent storage**, and **MCP integration** — three capabilities you can combine. We use \"live\" as a convenient umbrella for *stateful + connected* artifacts; just know the real terms when you read the docs.",
            "Anthropic не випускає продукт під назвою «Live Artifacts». Офіційні назви — **AI-powered artifacts**, **persistent storage** і **MCP integration** — три можливості, які комбінуються. Ми вживаємо «live» як зручну парасольку для *stateful + connected* artifacts; просто знай справжні терміни, коли читаєш docs.",
          ),
        },
        {
          kind: "callout",
          tone: "security",
          title: L("Shared storage is visible to other users", "Shared storage видно іншим користувачам"),
          md: L(
            "With shared storage, what one person enters, everyone sees — you'll get a confirmation dialog the first time. The creator decides which data is personal vs shared, so think before entering anything sensitive. Unpublishing an artifact **permanently deletes** all its storage.",
            "У shared storage те, що вводить одна людина, бачать усі — першого разу буде діалог підтвердження. Творець вирішує, які дані personal, а які shared, тож подумай перед введенням чутливого. Зняття публікації **назавжди видаляє** весь його storage.",
          ),
        },
      ],
    },
    {
      id: "t2",
      title: L("Connected: Claude API + MCP", "Connected: Claude API + MCP"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "The second upgrade puts **Claude itself inside the artifact**. You literally just *ask Claude to use Claude* — \"make this chatbot reply with compliments\" — and the running app can call the model through a text-based API. The magic is the plumbing it removes: the app **runs on Anthropic's infrastructure**, each visitor **authenticates with their own Claude account** and gets their **own instance**, and there are **no API keys** to manage.\n\nThe third upgrade is **MCP**: an artifact can read from and write to external tools — Asana, Google Calendar, Slack, or any custom MCP server you've connected. The first time an artifact needs a tool, you approve access; the choice persists. Both AI and MCP make the artifact *act*, not just display.",
            "Другий апгрейд кладе **самого Claude всередину artifact**. Ти буквально просто *просиш Claude використати Claude* — «хай цей chatbot відповідає компліментами» — і застосунок, що працює, може викликати модель через текстовий API. Магія — в усуненій сантехніці: застосунок **працює на інфраструктурі Anthropic**, кожен відвідувач **автентифікується власним акаунтом Claude** й отримує **власний екземпляр**, і **жодних API keys** не треба.\n\nТретій апгрейд — **MCP**: artifact може читати й писати у зовнішні інструменти — Asana, Google Calendar, Slack чи будь-який custom MCP-сервер, який ти підключив. Першого разу, коли artifact потребує інструмент, ти даєш доступ; вибір зберігається. І AI, і MCP роблять так, що artifact *діє*, а не лише показує.",
          ),
        },
        {
          kind: "code",
          lang: "text",
          code: "Build a flashcard app that lets the user pick any topic,\nthen uses Claude to generate the cards on the fly.\nSave the user's decks so they're there next time.",
          note: L(
            "One prompt, all three powers: Claude API (generate cards) + persistent storage (save decks) + a real interactive app — no keys, no deployment.",
            "Один prompt, усі три сили: Claude API (генерує картки) + persistent storage (зберігає колоди) + справжній інтерактивний застосунок — без ключів, без деплою.",
          ),
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Who pays? Each user, on their own plan", "Хто платить? Кожен користувач, зі свого плану"),
          md: L(
            "When you share an AI-powered artifact, others use it for free to you — their calls count against **their** Claude subscription, not yours. While *you* build and test, the usage is on your plan. AI-powered artifacts work on every plan incl. Free; storage and MCP need Pro or above.",
            "Коли ти ділишся AI-powered artifact, інші користуються ним безкоштовно для тебе — їхні виклики йдуть з **їхньої** підписки Claude, не з твоєї. Поки *ти* будуєш і тестуєш, витрати на твоєму плані. AI-powered artifacts працюють на кожному плані, включно з Free; storage і MCP потребують Pro чи вище.",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("Building a mini-tool you return to", "Створення mini-tool, до якого вертаєшся"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "The shift is from a **single-use** answer to a **returnable tool**. A good candidate has two things: **state worth keeping** (entries, scores, settings) and a **clear loop** you'll repeat (log, review, generate). Habit trackers, team leaderboards, study tutors, a one-page PRD maker — all small, all sticky.\n\nThe demo below is exactly that: a tiny log that **really persists to your browser** (reload the page — your entries survive) plus a **simulated** Claude call. Two of the three live powers, hands-on.",
            "Зсув — від **одноразової** відповіді до **інструмента, до якого вертаєшся**. Хороший кандидат має дві речі: **стан, який варто зберігати** (записи, бали, налаштування) і **чіткий цикл**, який повторюватимеш (записати, переглянути, згенерувати). Habit-трекери, командні leaderboards, study-тьютори, one-page PRD maker — усі маленькі, усі чіпкі.\n\nДемо нижче — саме це: крихітний лог, що **справді зберігається у твоєму браузері** (онови сторінку — записи лишаються) плюс **simulated** виклик Claude. Дві з трьох live-сил, на практиці.",
          ),
        },
        { kind: "sim", sim: "live-artifact-demo" },
      ],
    },
    {
      id: "t4",
      title: L("Limits, safety & cost", "Обмеження, безпека та вартість"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Live artifacts are **superb for prototyping and sharing**, but they have edges. Know the storage limits, the per-capability plan gates, and when to graduate a winning prototype to real infrastructure.",
            "Live artifacts **чудові для прототипування й поширення**, але мають межі. Знай ліміти storage, обмеження планів по кожній можливості та коли переводити вдалий прототип на справжню інфраструктуру.",
          ),
        },
        {
          kind: "table",
          head: [L("Capability", "Можливість"), L("Plans", "Плани"), L("Key limits", "Ключові межі")],
          rows: [
            [L("Claude API inside", "Claude API всередині"), L("Free · Pro · Max · Team · Enterprise", "Free · Pro · Max · Team · Enterprise"), L("No API keys; usage on each user's own plan", "Без API keys; витрати на плані кожного користувача")],
            [L("Persistent storage", "Persistent storage"), L("Pro · Max · Team · Enterprise", "Pro · Max · Team · Enterprise"), L("20 MB / artifact · text only · published-only", "20 MB / artifact · лише текст · лише published")],
            [L("MCP / connectors", "MCP / connectors"), L("Pro · Max · Team · Enterprise", "Pro · Max · Team · Enterprise"), L("Per-user auth; web & desktop", "Автентифікація на користувача; web і desktop")],
          ],
          caption: L("Plan gates differ by capability: the Claude API is on every plan; storage and MCP start at Pro.", "Обмеження планів різні: Claude API на кожному плані; storage і MCP — від Pro."),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Prototype here, then graduate", "Прототипуй тут, потім переходь далі"),
          md: L(
            "Artifacts are best for testing and demos. When a tool earns a real audience, you'll hit limits (text-only storage, no interleaved scripts). At that point, copy Claude's code into your editor and rebuild on proper infrastructure — Claude Code is the natural next step.",
            "Artifacts найкращі для тестів і демо. Коли інструмент здобуває реальну аудиторію, ти впрешся в межі (лише текстовий storage, немає interleaved scripts). Тоді копіюй код Claude у свій редактор і перебудуй на нормальній інфраструктурі — Claude Code тут природний наступний крок.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("Three upgrades make an artifact \"live\": persistent storage, a Claude API inside, and MCP connectors.", "Три апгрейди роблять artifact «live»: persistent storage, Claude API всередині та MCP connectors."),
    L("Storage is per-user (personal) or shared, published-only, 20 MB, text-only.", "Storage — personal або shared, лише published, 20 MB, лише текст."),
    L("AI-powered artifacts need no API keys; each user's usage hits their own plan.", "AI-powered artifacts не потребують API keys; витрати кожного — на його плані."),
    L("MCP lets an artifact read/write Asana, Calendar, Slack and custom servers, with per-user auth.", "MCP дає artifact читати/писати Asana, Calendar, Slack і custom-сервери, з автентифікацією на користувача."),
    L("Great for prototypes; graduate to real infra (Claude Code) when a tool outgrows the limits.", "Чудові для прототипів; переходь на справжню інфраструктуру (Claude Code), коли інструмент переростає межі."),
  ],
  pitfalls: [
    { title: L("Testing storage before publishing", "Тестування storage до публікації"), body: L("Storage only works on published artifacts; during development the calls silently no-op. Publish to test persistence.", "Storage працює лише на published-artifacts; під час розробки виклики тихо нічого не роблять. Опублікуй, щоб перевірити персистентність.") },
    { title: L("Putting secrets in shared storage", "Секрети в shared storage"), body: L("Shared storage is visible to every user of the artifact. Keep anything sensitive in personal storage — or out entirely.", "Shared storage видно кожному користувачу artifact. Тримай чутливе в personal storage — або взагалі поза ним.") },
    { title: L("Treating a prototype as production", "Прототип як production"), body: L("No API-key management, text-only storage, no interleaved scripts. For a real product, rebuild on proper infrastructure.", "Немає керування API-ключами, лише текстовий storage, немає interleaved scripts. Для реального продукту перебудуй на нормальній інфраструктурі.") },
  ],
  interview: [
    { q: L("What makes an artifact \"live\" vs static?", "Що робить artifact «live» на відміну від статичного?"), a: L("State and connection. Persistent storage gives it memory across sessions; the embedded Claude API lets it think; MCP lets it read/write external tools. A static artifact is a one-shot render with none of these.", "Стан і зв'язок. Persistent storage дає пам'ять між сесіями; вбудований Claude API дає мислити; MCP дає читати/писати зовнішні інструменти. Статичний artifact — одноразовий рендер без цього всього."), level: "senior" },
    { q: L("Who pays for the AI calls in a shared AI-powered artifact?", "Хто платить за AI-виклики в shared AI-powered artifact?"), a: L("Each user, on their own Claude subscription — no API keys and no cost to the creator. While you build and test, it's on your plan.", "Кожен користувач, зі своєї підписки Claude — без API keys і без витрат для творця. Поки ти будуєш і тестуєш — на твоєму плані."), level: "senior" },
    { q: L("What are the storage limits, and when do they bite?", "Які ліміти storage і коли вони даються взнаки?"), a: L("20 MB per artifact, text-only (no images/binaries), and only on published artifacts; unpublishing deletes the data. They bite when a prototype gains real users — that's the signal to move to real infrastructure.", "20 MB на artifact, лише текст (без зображень/бінарних), і лише на published; зняття публікації видаляє дані. Даються взнаки, коли прототип здобуває реальних користувачів — це сигнал переходити на справжню інфраструктуру."), level: "senior" },
  ],
  seeAlso: ["m8", "m11", "m12", "m25"],
  sources: [
    { title: "What are artifacts and how do I use them? — Claude Help Center", url: "https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them" },
    { title: "Prototype AI-Powered Apps with Claude artifacts — Anthropic", url: "https://claude.com/resources/tutorials/prototype-ai-powered-apps-with-claude-artifacts" },
    { title: "Turn ideas into interactive AI-powered apps — Anthropic", url: "https://claude.com/blog/build-artifacts" },
    { title: "Get started with custom connectors using remote MCP — Claude Help Center", url: "https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp" },
  ],
};

/* ======================================================================
   M10 · Context & token management — fully authored (★ Token Budget)
   ====================================================================== */
const m10: Module = {
  id: "m10",
  section: "s2",
  order: 10,
  level: "senior",
  title: L("Context & token management", "Управління context і токенами"),
  tagline: L(
    "Everything Claude can see at once shares one finite budget — and so does the answer. Learn what fills it, what gets cut, and how to pay less for the same context.",
    "Усе, що Claude бачить одночасно, ділить один скінченний бюджет — і відповідь теж. Дізнайся, що його заповнює, що обрізається і як платити менше за той самий контекст.",
  ),
  readMins: 12,
  mentalModel: L(
    "The context window is a finite desk. Everything Claude works with has to fit on it — including room to write the answer. Your job is to choose what's on the desk.",
    "Context window — це скінченний стіл. Усе, з чим працює Claude, має на ньому вміститися — включно з місцем, щоб написати відповідь. Твоя задача — обирати, що лежить на столі.",
  ),
  topics: [
    {
      id: "t1",
      title: L("The context window: what fills it", "Context window: що його заповнює"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "The **context window** is everything Claude can see in a single request — measured in **tokens**. One budget is shared by the **system prompt**, **project knowledge**, **skill & tool definitions**, **memory**, the **entire conversation so far**, any **attached files**, your **current message**, and — easy to forget — the **room the answer needs**. When the desk is full, something has to come off.\n\nThe size is fixed per model: **200K tokens** is standard, while **Opus 4.8 / 4.7 / 4.6** and **Sonnet 4.6** offer up to **1M tokens at standard pricing — no surcharge** (a 900K-token request bills at the same per-token rate as a 9K one). Play with the budget below: toggle blocks, grow the conversation, attach a big file, and watch it fill, truncate, and cost.",
            "**Context window** — це все, що Claude бачить в одному запиті, виміряне в **токенах**. Один бюджет ділять **system prompt**, **project knowledge**, визначення **skills і tools**, **memory**, **уся розмова дотепер**, **вкладені файли**, твоє **поточне повідомлення** і — легко забути — **місце, потрібне для відповіді**. Коли стіл повний, щось мусить піти.\n\nРозмір фіксований для моделі: **200K токенів** — стандарт, а **Opus 4.8 / 4.7 / 4.6** і **Sonnet 4.6** дають до **1M токенів за стандартною ціною — без надбавки** (запит на 900K токенів коштує за токен стільки ж, скільки на 9K). Пограйся з бюджетом нижче: перемикай блоки, нарощуй розмову, додай великий файл — і дивись, як він заповнюється, обрізається й коштує.",
          ),
        },
        { kind: "figure", fig: "context-window", caption: L("One request inside the fixed window: system, tools, knowledge, the growing conversation, your message, and reserved room for the answer. Recall is strongest at the start and end.", "Один запит у фіксованому вікні: system, tools, knowledge, зростаюча розмова, твоє повідомлення й резерв на відповідь. Recall найсильніший на початку та в кінці.") },
        { kind: "sim", sim: "token-budget" },
      ],
    },
    {
      id: "t2",
      title: L("Tokens 101", "Tokens 101"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "A **token** is a chunk of text the model processes — roughly **4 characters** or **0.75 words** in English. Both the tokens you send (**input**) and the tokens Claude writes (**output**) are counted and billed; output is the pricier side (**5× input** across the lineup). Code, non-English text, and rare words pack more tokens per character, so estimates are just that — estimates.",
            "**Token** — це шматок тексту, який обробляє модель — приблизно **4 символи** або **0.75 слова** в англійській. Рахуються й оплачуються і токени, які ти надсилаєш (**input**), і ті, що Claude пише (**output**); output дорожчий (**5× input** по всій лінійці). Код, не-англійський текст і рідкісні слова містять більше токенів на символ, тож оцінки — це лише оцінки.",
          ),
        },
        {
          kind: "table",
          head: [L("Content", "Контент"), L("Size", "Розмір"), L("≈ tokens", "≈ токенів")],
          rows: [
            [L("A short word", "Коротке слово"), L("~4 chars", "~4 символи"), L("1", "1")],
            [L("This paragraph", "Цей абзац"), L("~80 words", "~80 слів"), L("~110", "~110")],
            [L("Average web page", "Середня веб-сторінка"), L("10 kB", "10 kB"), L("~2,500", "~2,500")],
            [L("Large doc page", "Велика сторінка документа"), L("100 kB", "100 kB"), L("~25,000", "~25,000")],
            [L("Research-paper PDF", "PDF наукової статті"), L("500 kB", "500 kB"), L("~125,000", "~125,000")],
          ],
          caption: L("Rough rules of thumb (English). The API can count exactly for a given model.", "Грубі орієнтири (англійська). API може порахувати точно для конкретної моделі."),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Token counts are not model-agnostic", "Кількість токенів залежить від моделі"),
          md: L(
            "**Opus 4.7 and later use a new tokenizer** that can use **up to 35% more tokens** for the same fixed text than earlier models. So a prompt that fit comfortably before may cost more on a newer Opus — don't reuse old token estimates across model generations; count for the model you'll actually run.",
            "**Opus 4.7 і новіші використовують новий tokenizer**, який може витрачати **до 35% більше токенів** на той самий текст, ніж старіші моделі. Тож prompt, що раніше вміщувався легко, на новішому Opus може коштувати більше — не переноси старі оцінки токенів між поколіннями моделей; рахуй для тієї моделі, яку реально запускаєш.",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("Truncation: protecting the signal", "Truncation: як зберегти сигнал"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "What happens when you exceed the window depends on where you are. On the **raw API**, an over-budget request is a **hard error** — it must fit. In long **chats** and **agent** loops, context management quietly **drops or summarises the oldest turns** to make room. Either way, content can silently leave the desk.\n\nThere's a subtler effect too: recall isn't uniform across the window. Models attend most reliably to the **start and end** and can lose detail **in the middle** of a very long context (\"lost in the middle\"). So a fact buried mid-way through a 500K-token dump is the easiest thing to miss.",
            "Що станеться при перевищенні вікна, залежить від місця. На **сирому API** запит понад бюджет — це **жорстка помилка**: він мусить вміститися. У довгих **чатах** і **agent**-циклах керування контекстом тихо **відкидає чи підсумовує найстаріші ходи**, щоб звільнити місце. У будь-якому разі контент може непомітно зникнути зі столу.\n\nЄ й тонший ефект: recall нерівномірний по вікну. Моделі найнадійніше тримають **початок і кінець** і можуть втрачати деталі **в середині** дуже довгого контексту («lost in the middle»). Тож факт, закопаний посередині дампу на 500K токенів, — це найлегше, що можна пропустити.",
          ),
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Put the signal where it's seen", "Клади сигнал туди, де його видно"),
          md: L(
            "Lead with the key instruction and **repeat the ask near the end**. Reference long documents **by section** instead of pasting them whole. Summarise old turns and start a fresh chat when a thread gets long — a clean desk recalls better than a buried one.",
            "Починай із ключової інструкції й **повтори запит ближче до кінця**. Посилайся на довгі документи **за розділами**, а не вставляй цілком. Підсумовуй старі ходи й починай новий чат, коли гілка задовга — чистий стіл згадує краще за завалений.",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Cost levers: caching, batch, model choice", "Важелі вартості: caching, batch, вибір моделі"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Three levers move the bill without changing your prompt. **Model choice:** Haiku 4.5 ($1/MTok in), Sonnet 4.6 ($3), Opus 4.8 ($5) — pick the smallest that does the job. **Prompt caching:** the stable prefix (system + knowledge + tool defs) is billed at **0.1× (−90%)** on a cache hit; the first write costs **1.25×** (5-min) or **2×** (1-hour). **Batch:** asynchronous jobs that can wait up to 24h get **−50%** on both input and output. The levers **stack** — a cached batch request can land near **5%** of standard cost.",
            "Три важелі змінюють рахунок, не чіпаючи твій prompt. **Вибір моделі:** Haiku 4.5 ($1/MTok in), Sonnet 4.6 ($3), Opus 4.8 ($5) — обери найменшу, що впорається. **Prompt caching:** стабільний префікс (system + knowledge + tool defs) оплачується **0.1× (−90%)** при cache hit; перший запис коштує **1.25×** (5 хв) або **2×** (1 год). **Batch:** асинхронні задачі, що можуть чекати до 24 год, дають **−50%** на input і output. Важелі **складаються** — кешований batch-запит може коштувати близько **5%** від стандарту.",
          ),
        },
        {
          kind: "table",
          head: [L("Lever", "Важіль"), L("Effect", "Ефект"), L("Best for", "Найкраще для")],
          rows: [
            [L("Model choice", "Вибір моделі"), L("Haiku $1 · Sonnet $3 · Opus $5 / MTok in (output 5×)", "Haiku $1 · Sonnet $3 · Opus $5 / MTok in (output 5×)"), L("Match capability to the task", "Підбір можливостей під задачу")],
            [L("Prompt caching", "Prompt caching"), L("Cache hit **0.1×**; write 1.25× (5m) / 2× (1h)", "Cache hit **0.1×**; запис 1.25× (5хв) / 2× (1год)"), L("A big, stable prefix reused across calls", "Великий стабільний префікс, що повторюється")],
            [L("Batch API", "Batch API"), L("**−50%** input & output, async ≤24h", "**−50%** input і output, async ≤24год"), L("Bulk, non-urgent jobs", "Масові, нетермінові задачі")],
          ],
          caption: L("Verified against the published API pricing (2026-06-23). Caching + batch stack.", "Звірено з опублікованими цінами API (2026-06-23). Caching + batch складаються."),
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Cache the stable part, vary the rest after it", "Кешуй стабільне, змінне — після нього"),
          md: L(
            "Caching only pays off if the cached prefix is **identical** next time. Put unchanging context first (system, knowledge, tool defs), set the cache breakpoint, then add the volatile bits (the user's new question) **after** it — so each call reuses the cache instead of busting it.",
            "Caching окупається, лише якщо кешований префікс **ідентичний** наступного разу. Став незмінний контекст першим (system, knowledge, tool defs), постав cache breakpoint, а змінне (нове питання користувача) додавай **після** нього — щоб кожен виклик перевикористовував кеш, а не ламав його.",
          ),
        },
      ],
    },
    {
      id: "t5",
      title: L("Strategies: projects, skills, summaries", "Стратегії: projects, skills, summaries"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Day to day, you manage the budget by **curating the desk**, not maximising it. Right-size the model. Cache the stable prefix. Batch non-urgent bulk. Use **Projects** to wall off reusable knowledge and instructions so you don't re-paste them. Lean on **Skills** — progressive disclosure loads a skill's detail only when it's relevant, instead of stuffing everything in up front. Summarise long threads and start fresh chats. The skill is choosing the *fewest, highest-signal* tokens that get the job done.",
            "У щоденній роботі ти керуєш бюджетом, **курируючи стіл**, а не забиваючи його. Підбирай розмір моделі. Кешуй стабільний префікс. Збирай нетермінове в batch. Використовуй **Projects**, щоб відгородити перевикористовні knowledge й instructions і не вставляти їх щоразу. Спирайся на **Skills** — progressive disclosure підвантажує деталі скіла лише коли він доречний, замість запихати все наперед. Підсумовуй довгі гілки й починай нові чати. Майстерність — обрати *найменше число найсигнальніших* токенів, які виконають задачу.",
          ),
        },
        {
          kind: "compare",
          a: L("Stuff everything in", "Запхати все"),
          b: L("Curate the desk", "Курирувати стіл"),
          rows: [
            [L("Context", "Context"), L("Paste whole docs, keep every turn", "Вставляти цілі документи, тримати кожен хід"), L("Reference by section; summarise old turns", "Посилатись за розділами; підсумовувати старі ходи")],
            [L("Cost", "Вартість"), L("Pay full price for tokens it ignores", "Платити повну ціну за токени, які ігноруються"), L("Cache the prefix; batch the bulk", "Кешувати префікс; batch для масового")],
            [L("Recall", "Recall"), L("Signal lost in a huge middle", "Сигнал губиться у величезній середині"), L("Key facts kept short, at the edges", "Ключові факти короткі, по краях")],
          ],
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("A finite desk — choose what's on it", "Скінченний стіл — обирай, що на ньому"),
          md: L(
            "More context is not better context. A focused 20K-token prompt often beats a sprawling 500K one — cheaper, faster, and easier for the model to attend to. Treat the window as a budget you spend deliberately.",
            "Більше контексту — не кращий контекст. Сфокусований prompt на 20K токенів часто кращий за розлогий на 500K — дешевше, швидше й моделі легше втримати увагу. Стався до вікна як до бюджету, який витрачаєш свідомо.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("The context window is one finite token budget shared by everything — including room for the answer.", "Context window — це один скінченний бюджет токенів, спільний для всього — включно з місцем на відповідь."),
    L("200K is standard; Opus 4.8/4.7/4.6 & Sonnet 4.6 reach 1M at standard pricing (no surcharge).", "200K — стандарт; Opus 4.8/4.7/4.6 і Sonnet 4.6 дають 1M за стандартною ціною (без надбавки)."),
    L("A token ≈ 4 chars / 0.75 words; output is billed at 5× input; Opus 4.7+ tokenize ~35% heavier.", "Token ≈ 4 символи / 0.75 слова; output оплачується 5× input; Opus 4.7+ токенізують ~на 35% важче."),
    L("Overflow errors on the API and truncates oldest turns in chats; recall is weakest in the middle.", "Переповнення дає помилку на API і обрізає найстаріші ходи в чатах; recall найслабший у середині."),
    L("Three stacking cost levers: model choice, prompt caching (−90% on the prefix), batch (−50%).", "Три важелі вартості, що складаються: вибір моделі, prompt caching (−90% на префікс), batch (−50%)."),
  ],
  pitfalls: [
    { title: L("Confusing a big window with free context", "Плутати велике вікно з безкоштовним контекстом"), body: L("1M tokens still cost per token and still dilute recall. Size the context to the task, not to the window.", "1M токенів усе одно коштують за токен і розмивають recall. Підбирай контекст під задачу, а не під вікно.") },
    { title: L("Busting the cache by reordering", "Ламати кеш перестановкою"), body: L("Caching only helps if the prefix is byte-identical next call. Keep volatile content after the cache breakpoint.", "Caching допомагає, лише якщо префікс байт-в-байт ідентичний наступного разу. Тримай змінне після cache breakpoint.") },
    { title: L("Burying the instruction in the middle", "Ховати інструкцію в середині"), body: L("Mid-context detail is the easiest to miss. Lead with the ask and repeat it near the end.", "Деталь посеред контексту найлегше пропустити. Починай із запиту й повтори його ближче до кінця.") },
  ],
  interview: [
    { q: L("What all competes for the context window?", "Що саме конкурує за context window?"), a: L("System prompt, project knowledge, skill/tool definitions, memory, the full conversation, attachments, the current message, and the reserved space for the output — one shared token budget.", "System prompt, project knowledge, визначення skills/tools, memory, уся розмова, вкладення, поточне повідомлення і зарезервоване місце під output — один спільний бюджет токенів."), level: "senior" },
    { q: L("How do prompt caching and batch differ, and do they stack?", "Чим відрізняються prompt caching і batch, і чи складаються вони?"), a: L("Caching cuts the cost of a reused stable prefix to 10% (−90%) on a hit; batch gives −50% on async jobs that can wait up to 24h. They stack — a cached batch call can cost about 5% of standard.", "Caching зменшує вартість повторюваного стабільного префікса до 10% (−90%) при hit; batch дає −50% на async-задачі, що чекають до 24 год. Вони складаються — кешований batch-виклик може коштувати близько 5% стандарту."), level: "senior" },
    { q: L("What is \"lost in the middle\" and how do you mitigate it?", "Що таке «lost in the middle» і як це пом'якшити?"), a: L("Models recall the start and end of a long context more reliably than the middle. Mitigate by leading with key instructions, repeating the ask near the end, referencing docs by section, and summarising rather than pasting everything.", "Моделі надійніше згадують початок і кінець довгого контексту, ніж середину. Пом'якшуй: починай із ключових інструкцій, повторюй запит у кінці, посилайся на документи за розділами і підсумовуй замість вставляти все."), level: "staff" },
  ],
  seeAlso: ["m7", "m11", "m12", "m6"],
  sources: [
    { title: "Pricing — Claude API Docs", url: "https://platform.claude.com/docs/en/about-claude/pricing" },
    { title: "Prompt caching — Claude API Docs", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching" },
    { title: "Batch processing — Claude API Docs", url: "https://platform.claude.com/docs/en/build-with-claude/batch-processing" },
    { title: "Context windows — Claude API Docs", url: "https://platform.claude.com/docs/en/build-with-claude/context-windows" },
  ],
};

/* ======================================================================
   M11 · Connectors & MCP — fully authored (★ MCP Flow)
   ====================================================================== */
const m11: Module = {
  id: "m11",
  section: "s3",
  order: 11,
  level: "senior",
  title: L("Connectors & MCP", "Connectors і MCP"),
  tagline: L(
    "Give Claude new powers by plugging it into your apps through one open protocol — and stay in control of exactly what each connection can touch.",
    "Дай Claude нові можливості, під'єднавши його до твоїх застосунків через один відкритий протокол — і контролюй, що саме може чіпати кожне з'єднання.",
  ),
  readMins: 13,
  mentalModel: L(
    "MCP is a USB-C port for AI: one open protocol so any Claude app can plug into any tool. A connector is just an MCP server made one-click — and you decide what each plug may touch.",
    "MCP — це USB-C порт для AI: один відкритий протокол, щоб будь-який застосунок Claude під'єднувався до будь-якого інструмента. Connector — це MCP server у «один клік», і ти вирішуєш, що кожен роз'єм може чіпати.",
  ),
  topics: [
    {
      id: "t1",
      title: L("What MCP is", "Що таке MCP"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "**MCP — the Model Context Protocol** — is an open standard Anthropic introduced in **November 2024**, often called the “USB-C for AI”: one universal port so any AI app can plug into any tool. Before MCP, every app × every tool needed its own bespoke integration — an **M×N** glue problem. MCP turns that into **M+N**: build one server and every MCP-aware app can use it.\n\nThe shape is **client–server**. A **host** — a Claude app like Desktop, Code or Cowork — runs **one MCP client per server**. Each **server** exposes three primitives over **JSON-RPC**: **tools** (actions Claude can call), **resources** (data it can read) and **prompts** (reusable templates). In Claude, a **connector** is just an MCP server with a friendly install and sign-in.",
            "**MCP — Model Context Protocol** — це відкритий стандарт, представлений Anthropic у **листопаді 2024**, який часто називають «USB-C для AI»: один універсальний порт, щоб будь-який AI-застосунок під'єднувався до будь-якого інструмента. До MCP кожен застосунок × кожен інструмент потребував власної інтеграції — проблема **M×N**. MCP перетворює це на **M+N**: побудуй один server — і кожен MCP-сумісний застосунок зможе ним користуватися.\n\nФорма — **client–server**. **Host** — застосунок Claude (Desktop, Code чи Cowork) — запускає **один MCP client на кожен server**. Кожен **server** надає три примітиви через **JSON-RPC**: **tools** (дії, які викликає Claude), **resources** (дані для читання) і **prompts** (шаблони). У Claude **connector** — це просто MCP server зі зручним встановленням і входом.",
          ),
        },
        { kind: "figure", fig: "mcp-architecture", caption: L("The host runs one MCP client per server; the server is the adapter that calls the external app's API with your scoped token.", "Host запускає один MCP client на server; server — це адаптер, що викликає API застосунку з твоїм обмеженим token.") },
        {
          kind: "compare",
          a: L("Without MCP", "Без MCP"),
          b: L("With MCP", "З MCP"),
          rows: [
            [L("Integration cost", "Вартість інтеграції"), L("M×N — bespoke glue per app × tool", "M×N — окремий код на кожен застосунок × інструмент"), L("M+N — one protocol for all", "M+N — один протокол для всіх")],
            [L("Adding a tool", "Додати інструмент"), L("Write custom code in each app", "Писати окремий код у кожному застосунку"), L("Point the host at an MCP server", "Спрямувати host на MCP server")],
            [L("Portability", "Портативність"), L("Locked to one app", "Прив'язано до одного застосунку"), L("Any MCP host can use it", "Будь-який MCP host може це використати")],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("A connector is an MCP server, productized", "Connector — це MCP server у продуктовій обгортці"),
          md: L(
            "Whether you click a verified directory connector or run your own server, the protocol underneath is identical. Learn MCP once and every connector — present and future — makes sense.",
            "Чи клікаєш ти перевірений connector з directory, чи запускаєш власний server — протокол під капотом однаковий. Вивчи MCP один раз — і кожен connector, теперішній і майбутній, стане зрозумілим.",
          ),
        },
      ],
    },
    {
      id: "t2",
      title: L("The Connectors Directory", "Connectors Directory"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "The **Connectors Directory** holds **hundreds** of pre-built, **Anthropic-verified** connectors across dozens of categories, and the directory itself is available on **every plan, including Free**. They fall into two broad families: **work / productivity** (Notion, Gmail, Google Calendar & Drive, GitHub, Jira, Linear, Asana, Microsoft 365…) and **consumer / lifestyle** (Spotify, Uber, Instacart, Booking.com and more, added in **April 2026**).\n\nWhen the directory doesn't have what you need, add a **custom connector** by pointing Claude at a **remote MCP server URL** — available on Free, Pro, Max, Team and Enterprise, including in **Cowork** and **Claude Desktop**.",
            "**Connectors Directory** містить **сотні** готових, **перевірених Anthropic** конекторів у десятках категорій, і сам directory доступний на **кожному плані, включно з Free**. Вони діляться на дві великі родини: **робочі / продуктивність** (Notion, Gmail, Google Calendar і Drive, GitHub, Jira, Linear, Asana, Microsoft 365…) і **споживчі / lifestyle** (Spotify, Uber, Instacart, Booking.com та інші, додані у **квітні 2026**).\n\nКоли в directory немає потрібного, додай **custom connector**, вказавши Claude **URL віддаленого MCP server** — доступно на Free, Pro, Max, Team і Enterprise, зокрема в **Cowork** і **Claude Desktop**.",
          ),
        },
        {
          kind: "table",
          head: [L("Aspect", "Аспект"), L("Directory connector", "Directory connector"), L("Custom connector", "Custom connector")],
          rows: [
            [L("Who builds it", "Хто будує"), L("Anthropic & verified partners", "Anthropic і перевірені партнери"), L("You (or a third party)", "Ти (або третя сторона)")],
            [L("Verified", "Перевірено"), L("Yes — vetted by Anthropic", "Так — перевірено Anthropic"), L("No — an arbitrary, unverified service", "Ні — довільний, неперевірений сервіс")],
            [L("How you add it", "Як додати"), L("One click from the directory", "Один клік із directory"), L("Paste the remote MCP server URL", "Встав URL віддаленого MCP server")],
            [L("Plans", "Плани"), L("All plans, incl. Free", "Усі плани, включно з Free"), L("Free, Pro, Max, Team, Enterprise", "Free, Pro, Max, Team, Enterprise")],
          ],
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Two axes — don't conflate them", "Дві осі — не плутай їх"),
          md: L(
            "**Directory vs custom** is about **who built and vetted** the connector. **Remote vs local** (next topic) is about **where it runs and how Claude reaches it**. They're independent: a connector can be directory + remote, custom + remote, or a local stdio server you run yourself.",
            "**Directory vs custom** — про те, **хто збудував і перевірив** connector. **Remote vs local** (наступний топік) — про те, **де він працює і як Claude його дістає**. Вони незалежні: connector може бути directory + remote, custom + remote або локальним stdio-сервером, який ти запускаєш сам.",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("Remote vs local servers", "Remote vs local сервери"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "The deeper distinction is the **transport**. A **local** server runs as a **stdio** process on your own machine (configured in Claude Desktop or Claude Code): direct process I/O, **no network, no OAuth**, ideal for local files, scripts and private data — and it typically serves a single client. A **remote** server is reachable over **HTTP** (Streamable HTTP, with optional Server-Sent Events for streaming), authenticated with **OAuth**, and can serve many clients at once.\n\nThere's a crucial deployment detail for remote connectors: Claude connects to the server **from Anthropic's cloud, not from your device**. So a custom remote server must be **publicly reachable** from Anthropic's IP ranges — `localhost` won't do. If the data is local, use a local stdio server instead. Step the same request through both modes below.",
            "Глибша відмінність — це **transport**. **Локальний** server працює як **stdio**-процес на твоїй машині (налаштовується в Claude Desktop або Claude Code): прямий process I/O, **без мережі, без OAuth**, ідеально для локальних файлів, скриптів і приватних даних — і зазвичай обслуговує одного клієнта. **Віддалений** server доступний по **HTTP** (Streamable HTTP, з опційними Server-Sent Events для стрімінгу), автентифікується через **OAuth** і може обслуговувати багато клієнтів одночасно.\n\nВажлива деталь розгортання для remote: Claude під'єднується до server **із хмари Anthropic, а не з твого пристрою**. Тож custom remote server має бути **публічно доступним** з IP-діапазонів Anthropic — `localhost` не підійде. Якщо дані локальні — використай локальний stdio-сервер. Прокрути той самий запит нижче в обох режимах.",
          ),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("“Remote” ≠ “Anthropic-hosted”", "«Remote» ≠ «hosted в Anthropic»"),
          md: L(
            "Remote only means **reached over HTTP**. The server can be hosted by Anthropic, by the vendor (Notion, Google…), or by you. The common “Anthropic-hosted vs local” shorthand is imprecise — the real axis is the **transport** (stdio vs HTTP), not who owns the box.",
            "Remote означає лише **доступ по HTTP**. Server може хоститися в Anthropic, у вендора (Notion, Google…) або в тебе. Поширене скорочення «hosted в Anthropic vs local» неточне — справжня вісь це **transport** (stdio vs HTTP), а не те, чий це сервер.",
          ),
        },
        { kind: "sim", sim: "mcp-flow" },
        {
          kind: "table",
          head: [L("Aspect", "Аспект"), L("Remote (HTTP)", "Remote (HTTP)"), L("Local (stdio)", "Local (stdio)")],
          rows: [
            [L("Transport", "Transport"), L("Streamable HTTP (+ SSE)", "Streamable HTTP (+ SSE)"), L("stdio (process I/O)", "stdio (process I/O)")],
            [L("Where it runs", "Де працює"), L("A server on the internet", "Server в інтернеті"), L("A process on your machine", "Процес на твоїй машині")],
            [L("Auth", "Auth"), L("OAuth 2.1 (scoped token)", "OAuth 2.1 (обмежений token)"), L("None — local trust", "Немає — локальна довіра")],
            [L("Reached by", "Як дістається"), L("Claude, from Anthropic's cloud", "Claude, із хмари Anthropic"), L("The host process, directly", "Host-процесом, напряму")],
            [L("Best for", "Найкраще для"), L("SaaS apps, shared connectors", "SaaS-застосунки, спільні connectors"), L("Local files, scripts, private data", "Локальні файли, скрипти, приватні дані")],
          ],
        },
      ],
    },
    {
      id: "t4",
      title: L("OAuth & permission scopes", "OAuth і scopes дозволів"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Remote connectors authenticate with **OAuth 2.1** — modern, PKCE-protected (S256), no implicit grant, exact redirect-URI matching. You sign in to the **service** and grant specific **scopes**; Claude receives a **scoped access token** and **never sees your password**. Under the hood the MCP server acts as an OAuth **resource server**, while a separate **authorization server** issues the token, valid only for that server.\n\nIn the app you stay in control: enable connectors **per conversation** (the **“+”** button → **Connectors**), and use the **“Search and tools”** menu to switch off any tool you don't want Claude to invoke in this chat. Every tool or permission can be set to **Always allow**, **Needs approval**, or **Blocked** — and on Enterprise these are role-based, additive across roles, with the most-permissive grant winning.",
            "Remote-конектори автентифікуються через **OAuth 2.1** — сучасний, із захистом PKCE (S256), без implicit grant, із точним збігом redirect-URI. Ти входиш у **сервіс** і надаєш конкретні **scopes**; Claude отримує **обмежений access token** і **ніколи не бачить твій пароль**. Під капотом MCP server виступає OAuth **resource server**, а окремий **authorization server** видає token, дійсний лише для цього server.\n\nУ застосунку контроль лишається в тебе: вмикай connectors **на рівні розмови** (кнопка **«+»** → **Connectors**) і через меню **«Search and tools»** вимикай будь-який tool, який не хочеш дозволяти в цьому чаті. Кожен tool чи дозвіл можна поставити на **Always allow**, **Needs approval** або **Blocked** — а на Enterprise це ще й рольове, додається між ролями, і перемагає найдозвільніший грант.",
          ),
        },
        {
          kind: "table",
          head: [L("Permission", "Дозвіл"), L("Means", "Означає"), L("Use it for", "Використовуй для")],
          rows: [
            [L("Always allow", "Always allow"), L("Claude runs the tool without asking", "Claude виконує tool без запиту"), L("Safe reads you trust", "Безпечні читання, яким довіряєш")],
            [L("Needs approval", "Needs approval"), L("Claude pauses; you confirm each call", "Claude зупиняється; ти підтверджуєш кожен виклик"), L("Writes & destructive actions", "Записи та руйнівні дії")],
            [L("Blocked", "Blocked"), L("The tool can't be called at all", "Tool не можна викликати взагалі"), L("Anything out of scope", "Усе поза межами задачі")],
          ],
        },
        {
          kind: "callout",
          tone: "security",
          title: L("Least privilege, human-in-the-loop", "Найменші привілеї, human-in-the-loop"),
          md: L(
            "A connector can do **anything your account can**. Grant the **narrowest scope** that works, keep **write / destructive** tools on **“Needs approval”**, disable tools you don't need in this chat, and only connect services you trust. The OAuth token is scoped — make that scope small.",
            "Connector може робити **все, що може твій акаунт**. Надавай **найвужчий scope**, тримай **write / руйнівні** tools на **«Needs approval»**, вимикай непотрібні в цьому чаті tools і під'єднуй лише довірені сервіси. OAuth-token обмежений — зроби це обмеження малим.",
          ),
        },
      ],
    },
    {
      id: "t5",
      title: L("Walkthroughs — Notion · Gmail · Calendar", "Розбори — Notion · Gmail · Calendar"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Once you've seen one connector, you've seen them all — the shape repeats: **add it from the directory → OAuth sign-in → grant scopes → enable it in the chat → ask in plain language**, and Claude discovers the tools and calls them (exactly the flow you just stepped through). The differences are only in which tools each server exposes and which you should keep on a leash.",
            "Побачивши один connector, ти бачив усі — форма повторюється: **додай із directory → вхід через OAuth → надай scopes → увімкни в чаті → попроси звичайною мовою**, і Claude виявить tools і викличе їх (рівно той потік, який ти щойно прокрутив). Різниця лише в тому, які tools надає кожен server і які варто тримати на повідку.",
          ),
        },
        {
          kind: "table",
          head: [L("Connector", "Connector"), L("Claude can…", "Claude може…"), L("Safe default", "Безпечний дефолт")],
          rows: [
            [L("Notion", "Notion"), L("Search, read, create & update pages", "Шукати, читати, створювати й оновлювати сторінки"), L("Start read-only", "Почни з read-only")],
            [L("Gmail", "Gmail"), L("Search, read, draft email", "Шукати, читати, готувати чернетки"), L("Draft — you press send", "Чернетка — надсилаєш ти")],
            [L("Google Calendar", "Google Calendar"), L("List, create, update events", "Список, створення, оновлення подій"), L("Confirm each write", "Підтверджуй кожен запис")],
            [L("Google Drive", "Google Drive"), L("Search & read files", "Шукати й читати файли"), L("Read-only is plenty", "Read-only достатньо")],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("“Draft, then you send”", "«Чернетка, далі надсилаєш ти»"),
          md: L(
            "For email and messaging connectors, the safest default is to let Claude **prepare** the message and keep the **send** in your hands. Same idea for calendars and boards: let Claude assemble, you approve the write.",
            "Для пошти й месенджерів найбезпечніше — дати Claude **підготувати** повідомлення, а **надсилання** лишити собі. Та сама ідея для календарів і дошок: Claude збирає, ти підтверджуєш запис.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("MCP is an open standard (Anthropic, Nov 2024) — the “USB-C for AI” — turning M×N custom integrations into M+N.", "MCP — відкритий стандарт (Anthropic, лист. 2024) — «USB-C для AI» — перетворює M×N інтеграцій на M+N."),
    L("Client–server: a host runs one MCP client per server; servers expose tools, resources & prompts over JSON-RPC.", "Client–server: host запускає один MCP client на server; servers надають tools, resources і prompts через JSON-RPC."),
    L("Two axes: directory (verified, all plans) vs custom; remote (HTTP + OAuth, reached from Anthropic's cloud) vs local (stdio, your machine).", "Дві осі: directory (перевірені, усі плани) vs custom; remote (HTTP + OAuth, із хмари Anthropic) vs local (stdio, твоя машина)."),
    L("Remote auth is OAuth 2.1: you grant scopes, Claude gets a scoped token and never sees your password. Remote ≠ Anthropic-hosted.", "Remote-auth — це OAuth 2.1: ти надаєш scopes, Claude отримує обмежений token і не бачить пароль. Remote ≠ hosted в Anthropic."),
    L("You stay in control: enable per chat, disable tools, set Always allow / Needs approval / Blocked — and grant least privilege.", "Контроль у тебе: вмикай на чат, вимикай tools, став Always allow / Needs approval / Blocked — і давай найменші привілеї."),
  ],
  pitfalls: [
    { title: L("Confusing “remote” with “Anthropic-hosted”", "Плутати «remote» з «hosted в Anthropic»"), body: L("Remote just means reached over HTTP; the server may be the vendor's or your own. The real axis is the transport (stdio vs HTTP).", "Remote означає лише доступ по HTTP; server може бути вендорський чи твій. Справжня вісь — transport (stdio vs HTTP).") },
    { title: L("Granting broad scopes and Always-allow on writes", "Надавати широкі scopes і Always-allow на записи"), body: L("A connector inherits your account's power. Use least privilege and keep write / destructive tools on Needs approval.", "Connector успадковує можливості твого акаунта. Дотримуйся найменших привілеїв і тримай write / руйнівні tools на Needs approval.") },
    { title: L("Pointing a custom remote connector at localhost", "Спрямовувати custom remote connector на localhost"), body: L("Claude connects from Anthropic's cloud, so the server must be publicly reachable. For local data, run a local stdio server instead.", "Claude під'єднується з хмари Anthropic, тож server має бути публічно доступним. Для локальних даних запусти локальний stdio-сервер.") },
  ],
  interview: [
    { q: L("What problem does MCP solve, and how is it structured?", "Яку проблему вирішує MCP і як він структурований?"), a: L("It replaces M×N bespoke integrations with one open protocol (M+N). It's client–server: a host runs one MCP client per server, and servers expose tools, resources and prompts over JSON-RPC, so any MCP-aware app can use any server.", "Він замінює M×N окремих інтеграцій одним відкритим протоколом (M+N). Це client–server: host запускає один MCP client на server, а servers надають tools, resources і prompts через JSON-RPC, тож будь-який MCP-сумісний застосунок може використати будь-який server."), level: "senior" },
    { q: L("Remote vs local MCP servers — transport, auth and reach?", "Remote vs local MCP servers — transport, auth і доступ?"), a: L("Local = stdio process on your machine, no network, no OAuth, single client — great for local data. Remote = Streamable HTTP (+SSE), OAuth 2.1, many clients, reached by Claude from Anthropic's cloud — so it must be publicly reachable.", "Local = stdio-процес на машині, без мережі, без OAuth, один клієнт — добре для локальних даних. Remote = Streamable HTTP (+SSE), OAuth 2.1, багато клієнтів, Claude дістає його з хмари Anthropic — тож він має бути публічно доступним."), level: "senior" },
    { q: L("How does auth work for a remote connector, and what's the security model?", "Як працює auth для remote connector і яка модель безпеки?"), a: L("OAuth 2.1 with PKCE: the MCP server is a resource server, a separate authorization server issues a scoped token, and Claude never sees your password. You enable connectors per chat and set each tool to Always allow / Needs approval / Blocked. Best practice: least privilege and human-in-the-loop on writes.", "OAuth 2.1 з PKCE: MCP server — це resource server, окремий authorization server видає обмежений token, і Claude не бачить пароль. Ти вмикаєш connectors на чат і ставиш кожен tool на Always allow / Needs approval / Blocked. Найкраща практика: найменші привілеї і human-in-the-loop на записах."), level: "staff" },
  ],
  seeAlso: ["m12", "m9", "m25", "m19"],
  sources: [
    { title: "Introducing the Model Context Protocol — Anthropic", url: "https://www.anthropic.com/news/model-context-protocol" },
    { title: "Architecture overview — Model Context Protocol", url: "https://modelcontextprotocol.io/docs/learn/architecture" },
    { title: "Authorization — Model Context Protocol specification", url: "https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization" },
    { title: "Use connectors to extend Claude's capabilities — Claude Help Center", url: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities" },
    { title: "Get started with custom connectors using remote MCP — Claude Help Center", url: "https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp" },
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

  // Section II  (m6 · m7 · m8 · m9 · m10 are fully authored above)

  // Section III  (m11 is fully authored above)
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
export const MODULES: Module[] = [...planned, m6, m7, m8, m9, m10, m11, m15].sort((a, b) => a.order - b.order);

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
