import type { Localized, Module, Section } from "./types";

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
   M16 · Files, folders & outputs — fully authored (figure: FileFlow)
   ====================================================================== */
const m16: Module = {
  id: "m16",
  section: "s4",
  order: 16,
  level: "middle",
  title: L("Files, folders & outputs", "Файли, теки та outputs"),
  tagline: L(
    "Cowork's real power is files: it reads the folder you grant, builds in a throwaway sandbox, and writes finished deliverables back — with a permission gate on anything destructive.",
    "Справжня сила Cowork — це файли: він читає надану теку, працює в одноразовому sandbox і записує готові результати назад — із дозвільним gate на будь-що руйнівне.",
  ),
  readMins: 9,
  mentalModel: L(
    "Three places, one that lasts: chat uploads and the sandbox are scratch — only the folder you grant persists, so that's where finished work lands.",
    "Три місця, одне залишається: chat-uploads і sandbox — чернетка; зберігається лише надана тека, тож саме туди потрапляє готова робота.",
  ),
  topics: [
    {
      id: "t1",
      title: L("Selecting & granting folders", "Вибір і надання тек"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "You point Cowork at a **folder** on your computer, and it can read and write **only** the folders you connect. The rule of thumb is least privilege: grant the **narrowest** folder that gets the job done — a dedicated working folder, not your whole home directory.\n\nTwo layers of standing context shape every run. **Global instructions** (Settings → Cowork) carry your role, tone and output preferences into *every* session. **Folder instructions** add project-specific context whenever you select a given folder — and Claude can update them itself as it learns the project. Code and shell commands run inside an **isolated VM**, and network access follows the egress settings you've configured.",
            "Ти вказуєш Cowork **теку** на компʼютері, і він читає й пише **лише** ті теки, які ти підключив. Правило — least privilege: надавай **найвужчу** теку, якої достатньо — окрему робочу теку, а не всю домашню директорію.\n\nДва шари постійного контексту впливають на кожен запуск. **Global instructions** (Settings → Cowork) переносять твою роль, тон і формат виводу в *кожну* сесію. **Folder instructions** додають контекст конкретного проєкту, коли ти обираєш певну теку — і Claude може сам їх оновлювати, пізнаючи проєкт. Код і shell-команди виконуються в **ізольованій VM**, а доступ до мережі слідує налаштованим egress-правилам.",
          ),
        },
        { kind: "figure", fig: "file-flow", caption: L("Cowork reads your granted folder and chat uploads, builds in a temporary sandbox VM, and writes deliverables back to your folder — pausing at a delete/overwrite gate. Only your folder persists.", "Cowork читає надану теку й chat-uploads, працює в тимчасовій sandbox VM і пише результати назад у твою теку — зупиняючись на gate видалення/перезапису. Зберігається лише твоя тека.") },
        {
          kind: "callout",
          tone: "security",
          title: L("Use a dedicated working folder", "Використовуй окрему робочу теку"),
          md: L(
            "Because Claude can **read, write and permanently delete** files in a folder you grant, create a dedicated folder for it and keep backups. Don't point it at financial documents, credentials or personal records.",
            "Оскільки Claude може **читати, писати й остаточно видаляти** файли в наданій теці, створи для нього окрему теку й тримай резервні копії. Не давай доступ до фінансових документів, облікових даних чи особистих записів.",
          ),
        },
      ],
    },
    {
      id: "t2",
      title: L("Reading vs writing — scratchpad vs your folder", "Читання vs запис — scratchpad vs твоя тека"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Three places matter, and only one lasts. **Uploads** are files you attach in chat — scoped to the conversation. The **sandbox / scratchpad** is the isolated VM on your computer where Claude runs code and stages intermediate work — temporary, wiped after the task. **Your folder** is the one that persists: it's where deliverables land.\n\nSo the *read path* pulls your granted folder and uploads into context, and the *write path* sends Claude's output to disk (and surfaces file cards in chat).",
            "Важать три місця, і залишається лише одне. **Uploads** — файли, які ти додаєш у чат, у межах розмови. **Sandbox / scratchpad** — ізольована VM на твоєму компʼютері, де Claude запускає код і робить проміжну роботу — тимчасово, очищується після задачі. **Твоя тека** — те, що зберігається: саме сюди потрапляють результати.\n\nОтже, *read path* тягне надану теку й uploads у context, а *write path* надсилає вивід Claude на диск (і показує file-картки в чаті).",
          ),
        },
        {
          kind: "compare",
          a: L("Read path", "Read path"),
          b: L("Write path", "Write path"),
          rows: [
            [L("What moves", "Що рухається"), L("Files → Claude's context", "Файли → context Claude"), L("Claude's output → disk", "Вивід Claude → диск")],
            [L("Source / target", "Джерело / ціль"), L("Granted folder + chat uploads", "Надана тека + chat-uploads"), L("Granted folder (+ file cards in chat)", "Надана тека (+ file-картки в чаті)")],
            [L("Permission", "Дозвіл"), L("Allowed for folders you connect", "Дозволено для підключених тек"), L("Allowed; delete / overwrite asks first", "Дозволено; видалення / перезапис питає")],
            [L("Persists?", "Зберігається?"), L("Uploads temporary; folder stays", "Uploads тимчасові; тека лишається"), L("Yes — that's the deliverable", "Так — це і є результат")],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Output not where you expected?", "Результат не там, де очікував?"),
          md: L(
            "Check the **output location Claude named** in its summary, and that you granted the right folder. Deliverables go to your folder; the sandbox is wiped — nothing there survives the task.",
            "Перевір **локацію виводу, яку назвав Claude** у підсумку, і що ти надав правильну теку. Результати йдуть у твою теку; sandbox очищується — там нічого не переживає задачу.",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("Deliverables & presenting files", "Результати та показ файлів"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Cowork produces **real office files**, not just chat text — driven by the pre-built skills you met in M12 (docx · xlsx · pptx · pdf). That means Excel with *working* formulas (VLOOKUP, conditional formatting, multiple tabs), PowerPoint decks from rough notes, Word reports, PDFs, plus PNG charts and analysis over CSV/TSV data. The max size is **30 MB per file** (a larger PDF can be processed in the computing environment without loading it into the context window).\n\nFinished files are written to your folder and surfaced as **file cards** in chat; you can also save straight to Google Drive. For Markdown drafts, **Edit with Claude** lets you highlight text, click, and type the change in place.",
            "Cowork створює **справжні офісні файли**, а не лише текст у чаті — за допомогою вбудованих skills із M12 (docx · xlsx · pptx · pdf). Це Excel із *робочими* формулами (VLOOKUP, conditional formatting, кілька вкладок), PowerPoint-колоди з чернеток, Word-звіти, PDF, а також PNG-графіки й аналіз CSV/TSV. Максимум — **30 MB на файл** (більший PDF можна обробити в computing environment, не завантажуючи в context window).\n\nГотові файли пишуться в твою теку й показуються як **file-картки** в чаті; також можна зберегти прямо в Google Drive. Для Markdown-чернеток **Edit with Claude** дає виділити текст, клікнути й вписати зміну на місці.",
          ),
        },
        {
          kind: "table",
          head: [L("Output", "Результат"), L("Engine / skill", "Engine / skill"), L("Good for", "Для чого")],
          rows: [
            [L(".xlsx", ".xlsx"), L("xlsx skill", "xlsx skill"), L("Models with live formulas, multi-tab, pivots", "Моделі з живими формулами, кілька вкладок, pivots")],
            [L(".pptx", ".pptx"), L("pptx skill", "pptx skill"), L("Decks from notes or transcripts", "Колоди з нотаток чи транскриптів")],
            [L(".docx", ".docx"), L("docx skill", "docx skill"), L("Reports, memos, letters", "Звіти, меморандуми, листи")],
            [L(".pdf", ".pdf"), L("pdf skill", "pdf skill"), L("Extract / fill / merge, polished print", "Витяг / заповнення / злиття, чистий друк")],
            [L(".png / charts", ".png / графіки"), L("Code execution", "Code execution"), L("Data viz from CSV/TSV", "Візуалізація з CSV/TSV")],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Specific in, polished out", "Конкретика на вході — якість на виході"),
          md: L(
            "State the structure, content and formatting you want (\"three tabs: raw, summary, chart; bold totals\"). Vague asks need a round of refinement; a precise deliverable spec usually lands first try.",
            "Опиши структуру, зміст і форматування (\"три вкладки: raw, summary, chart; жирні підсумки\"). Розмиті запити потребують доопрацювання; точна специфікація результату зазвичай влучає з першого разу.",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Safety — deletes, overwrites, boundaries", "Безпека — видалення, перезапис, межі"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Cowork takes **real actions** on your files, so it ships with guardrails. **Deletion protection** is the hard one: Claude must get your explicit permission before permanently deleting *any* file — you see a prompt and click **Allow** — and this holds in **both** permission modes. Beyond deletes, you choose how much to supervise with the mode selector, and you should review planned actions before allowing them, especially on sensitive files.\n\nFor **overwrites**, Claude writes into your folder; to protect originals, ask it to write new filenames or a dedicated `/output` subfolder rather than overwriting in place. That's a habit, not a hard gate — so make it explicit in your prompt.",
            "Cowork виконує **реальні дії** з твоїми файлами, тож має запобіжники. **Deletion protection** — найжорсткіший: Claude мусить отримати твій явний дозвіл перед остаточним видаленням *будь-якого* файлу — ти бачиш запит і тиснеш **Allow** — і це діє в **обох** режимах дозволів. Окрім видалень, ти обираєш рівень контролю перемикачем режиму й маєш переглядати заплановані дії перед підтвердженням, особливо для чутливих файлів.\n\nЩодо **перезапису**: Claude пише у твою теку; щоб захистити оригінали, проси писати нові імена файлів або окрему теку `/output`, а не перезаписувати на місці. Це звичка, а не жорсткий gate — тож вказуй це явно в prompt.",
          ),
        },
        {
          kind: "compare",
          a: L("Ask before acting", "Ask before acting"),
          b: L("Act without asking", "Act without asking"),
          rows: [
            [L("Approvals", "Підтвердження"), L("Pauses for each action", "Пауза перед кожною дією"), L("Runs without pausing", "Працює без пауз")],
            [L("Best when", "Найкраще коли"), L("New tools, unfamiliar files", "Нові tools, незнайомі файли"), L("Actively supervising trusted work", "Активний нагляд за довіреною роботою")],
            [L("Prompt-injection exposure", "Ризик prompt-injection"), L("Lower — you can stop it", "Нижчий — можна зупинити"), L("Higher — no mid-task checkpoint", "Вищий — немає контрольної точки")],
            [L("Deleting files", "Видалення файлів"), L("Always asks", "Завжди питає"), L("Still always asks", "Все одно завжди питає")],
          ],
        },
        {
          kind: "callout",
          tone: "security",
          title: L("The red lines", "Червоні лінії"),
          md: L(
            "Deletes always ask — in every mode. You remain responsible for actions Claude takes on your behalf, so keep sensitive documents out of granted folders and prefer **Ask before acting** for anything consequential.",
            "Видалення завжди питає — у будь-якому режимі. Ти відповідаєш за дії, які Claude робить від твого імені, тож тримай чутливі документи поза наданими теками й обирай **Ask before acting** для всього важливого.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("Cowork reads and writes only the folders you grant — scope to the narrowest one.", "Cowork читає й пише лише надані теки — обирай найвужчу."),
    L("Three places; only your folder persists. Uploads and the sandbox are temporary.", "Три місця; зберігається лише твоя тека. Uploads і sandbox — тимчасові."),
    L("It produces real deliverables (docx/xlsx/pptx/pdf, charts) via skills — max 30 MB/file.", "Він створює справжні результати (docx/xlsx/pptx/pdf, графіки) через skills — макс. 30 MB/файл."),
    L("Deletes always require your explicit approval — in both permission modes.", "Видалення завжди потребує явного дозволу — в обох режимах."),
    L("Two standing-context layers: Global instructions (all sessions) + Folder instructions (per folder).", "Два шари постійного контексту: Global instructions (усі сесії) + Folder instructions (на теку)."),
  ],
  pitfalls: [
    { title: L("Granting your whole home folder", "Надання всієї домашньої теки"), body: L("Least privilege: use a dedicated working folder plus backups, not broad access to everything.", "Least privilege: окрема робоча тека плюс резервні копії, а не широкий доступ до всього.") },
    { title: L("Hunting for outputs in the wrong place", "Пошук результатів не там"), body: L("Deliverables land in your folder, not the sandbox — check the location Claude named in its summary.", "Результати — у твоїй теці, не в sandbox — дивись локацію, яку Claude назвав у підсумку.") },
    { title: L("\"Act without asking\" on untrusted content", "\"Act without asking\" з недовіреним контентом"), body: L("It removes your chance to stop a prompt-injection mid-task. Reserve it for trusted files you're watching.", "Це прибирає шанс зупинити prompt-injection під час задачі. Лишай його для довірених файлів під наглядом.") },
  ],
  interview: [
    { q: L("Where do Cowork's outputs go, and what's temporary?", "Куди йдуть результати Cowork і що тимчасове?"), a: L("Deliverables persist in the folder you granted; chat uploads and the isolated sandbox/VM are temporary scratch that's wiped after the task.", "Результати зберігаються в наданій теці; chat-uploads і ізольована sandbox/VM — тимчасова чернетка, що очищується після задачі."), level: "middle" },
    { q: L("How does Cowork shrink the blast radius of an autonomous file agent?", "Як Cowork зменшує радіус ураження автономного файлового агента?"), a: L("Least-privilege folder grants (it reads/writes only connected folders), code in an isolated VM, a hard deletion-approval gate in both modes, and a permission mode that can gate every write for oversight.", "Least-privilege надання тек (читає/пише лише підключені), код в ізольованій VM, жорсткий gate підтвердження видалень в обох режимах і режим дозволів, що може гейтити кожен запис для нагляду."), level: "senior" },
    { q: L("When is \"Act without asking\" appropriate?", "Коли доречний \"Act without asking\"?"), a: L("Only when actively supervising, with trusted files, sites and tools, and able to stop immediately — because it raises prompt-injection risk by removing the mid-task checkpoint.", "Лише за активного нагляду, з довіреними файлами, сайтами й tools, і можливістю миттєво зупинити — бо він підвищує ризик prompt-injection, прибираючи контрольну точку."), level: "senior" },
  ],
  seeAlso: ["m15", "m17", "m12", "m25"],
  sources: [
    { title: "Get started with Claude Cowork — Help Center", url: "https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork" },
    { title: "Use Claude Cowork safely — Help Center", url: "https://support.claude.com/en/articles/13364135-use-claude-cowork-safely" },
    { title: "Create and edit files with Claude — Help Center", url: "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" },
  ],
};

/* ======================================================================
   M17 · Scheduled tasks — fully authored (sim: ScheduleTimeline)
   ====================================================================== */
const m17: Module = {
  id: "m17",
  section: "s4",
  order: 17,
  level: "middle",
  title: L("Scheduled tasks", "Заплановані задачі"),
  tagline: L(
    "Describe a job once; Claude runs it on your cadence — a morning briefing, a weekly report — and leaves the finished file waiting for you.",
    "Опиши задачу один раз; Claude виконує її за твоїм розкладом — ранковий briefing, тижневий звіт — і лишає готовий файл на тебе.",
  ),
  readMins: 9,
  mentalModel: L(
    "A standing order, not a reminder: each run is a fresh Cowork session that does the work and writes the output — but only while your machine is awake and Desktop is open.",
    "Постійне доручення, а не нагадування: кожен запуск — нова сесія Cowork, що робить роботу й пише результат — але лише поки компʼютер увімкнений і Desktop відкритий.",
  ),
  topics: [
    {
      id: "t1",
      title: L("What scheduling is — cadence vs one-off", "Що таке планування — cadence vs одноразово"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Scheduled tasks let you **delegate recurring work**. You write the prompt once; Claude saves it as the task's instructions and runs it automatically on the cadence you choose — or on demand. Each run is its **own Cowork session** with access to the same connectors, skills and plugins.\n\nThere are two shapes. A **one-off** runs once at a future moment (a `fireAt` timestamp), then it's done. A **recurring** task repeats on a cadence. Scheduling is on paid plans (Pro · Max · Team · Enterprise) in Claude Desktop. Play the timeline below to see the shapes — and what happens when the computer sleeps.",
            "Заплановані задачі дають **делегувати періодичну роботу**. Ти пишеш prompt один раз; Claude зберігає його як інструкції задачі й запускає автоматично за обраним розкладом — або на вимогу. Кожен запуск — **окрема сесія Cowork** з тими ж connectors, skills і plugins.\n\nЄ дві форми. **Одноразова** виконується один раз у майбутній момент (мітка `fireAt`), і на цьому все. **Періодична** повторюється за cadence. Планування доступне на платних планах (Pro · Max · Team · Enterprise) у Claude Desktop. Запусти таймлайн нижче, щоб побачити форми — і що стається, коли компʼютер засинає.",
          ),
        },
        { kind: "sim", sim: "schedule-timeline" },
        {
          kind: "compare",
          a: L("One-off", "Одноразово"),
          b: L("Recurring", "Періодично"),
          rows: [
            [L("Runs", "Запуск"), L("Once, at a set time", "Один раз, у заданий час"), L("Repeatedly, on a cadence", "Повторно, за cadence")],
            [L("Mechanism", "Механізм"), L("fireAt (a future timestamp)", "fireAt (майбутня мітка часу)"), L("A cron-style schedule", "Cron-подібний розклад")],
            [L("Good for", "Для чого"), L("A reminder, a one-time fetch", "Нагадування, разове отримання"), L("Briefings, digests, reports, monitoring", "Briefings, дайджести, звіти, моніторинг")],
            [L("After it fires", "Після спрацювання"), L("Done — it's gone", "Готово — зникає"), L("Waits for the next tick", "Чекає на наступний tick")],
          ],
        },
      ],
    },
    {
      id: "t2",
      title: L("Creating a recurring task", "Створення періодичної задачі"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "There are two ways to create one. The **`/schedule` skill**: in any task, type `/schedule`; Claude may ask a few multiple-choice questions, then shows you the **task name, the schedule, and what it does** to confirm with **Schedule**. Or the **Scheduled page**: click *Scheduled* in the left sidebar → *+ New task* and fill the modal.\n\nGood scheduled prompts name a **deliverable** and write it to a file, so every run leaves something behind — a briefing, a digest, a refreshed report.",
            "Створити можна двома шляхами. **Skill `/schedule`**: у будь-якій задачі введи `/schedule`; Claude може поставити кілька питань із вибором відповіді, а потім покаже **назву задачі, розклад і що вона робить** для підтвердження кнопкою **Schedule**. Або **сторінка Scheduled**: клікни *Scheduled* у лівій панелі → *+ New task* і заповни модалку.\n\nГарні заплановані prompt називають **результат** і пишуть його у файл, щоб кожен запуск щось лишав — briefing, дайджест, оновлений звіт.",
          ),
        },
        {
          kind: "table",
          head: [L("Field", "Поле"), L("What to put", "Що вказати")],
          rows: [
            [L("Task name", "Task name"), L("A short label", "Коротка назва")],
            [L("Description", "Description"), L("What the task is for", "Для чого задача")],
            [L("Prompt", "Prompt"), L("The instructions — type \"/\" to add Skills & plugins", "Інструкції — введи \"/\", щоб додати Skills і plugins")],
            [L("Frequency", "Frequency"), L("hourly · daily · weekly · weekdays · manual", "hourly · daily · weekly · weekdays · manual")],
            [L("Model", "Model"), L("Optional — trade speed vs depth", "Опційно — баланс швидкість/глибина")],
            [L("Folder", "Folder"), L("Optional — where Claude works and writes", "Опційно — де Claude працює й пише")],
          ],
        },
        {
          kind: "code",
          lang: "text",
          code: "Every weekday at 7am: read my Google Calendar for today,\nsummarise meetings and prep needed, scan Slack for unread\nmentions, and write a short briefing to briefing-{date}.md.",
          note: L(
            "A strong scheduled prompt = a clear cadence + a concrete deliverable written to a dated file.",
            "Сильний запланований prompt = чіткий cadence + конкретний результат у датований файл.",
          ),
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Use {date} / {week} placeholders", "Використовуй плейсхолдери {date} / {week}"),
          md: L(
            "Put `{date}` or `{week}` in the output filename — e.g. `briefing-{date}.md` — and each run writes a uniquely named file instead of overwriting the last one.",
            "Додай `{date}` чи `{week}` в імʼя файлу — напр. `briefing-{date}.md` — і кожен запуск пише унікальний файл, а не перезаписує попередній.",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("Cadence, cron & the awake rule", "Cadence, cron і правило про пробудження"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "The Scheduled-task modal exposes **preset cadences** — hourly, daily, weekly, on weekdays, or manual — not a raw cron box. Behind them sits a cron-style schedule, and the `/schedule` skill also reads **natural-language timing** (\"every weekday at 7am\") and compiles it. Knowing the mapping helps you reason about *when* a task fires.\n\nThen the rule that trips everyone up: scheduled tasks **only run while your computer is awake and Claude Desktop is open**. There is no cloud cron. A run that lands while you're asleep or the app is closed is **skipped**, then runs **once** automatically when you wake or reopen — and the skip is recorded in the task's history.",
            "Модалка задачі показує **готові cadence** — hourly, daily, weekly, weekdays або manual — а не сире поле cron. За ними стоїть cron-подібний розклад, а skill `/schedule` ще й читає **таймінг природною мовою** (\"every weekday at 7am\") і компілює його. Знання відповідності допомагає міркувати, *коли* задача спрацює.\n\nІ правило, на якому всі спотикаються: заплановані задачі **виконуються лише поки компʼютер увімкнений і Claude Desktop відкритий**. Хмарного cron немає. Запуск, що випав на сон чи закритий застосунок, **пропускається**, а потім **один раз** автоматично виконується при пробудженні/відкритті — і пропуск фіксується в історії задачі.",
          ),
        },
        {
          kind: "table",
          head: [L("Cadence", "Cadence"), L("Cron-style", "Cron-стиль"), L("Plain English", "Простими словами")],
          rows: [
            [L("Hourly", "Hourly"), L("0 * * * *", "0 * * * *"), L("Top of every hour", "На початку кожної години")],
            [L("Daily", "Daily"), L("0 7 * * *", "0 7 * * *"), L("Every day at 07:00", "Щодня о 07:00")],
            [L("Weekdays", "Weekdays"), L("0 7 * * 1-5", "0 7 * * 1-5"), L("Mon–Fri at 07:00", "Пн–Пт о 07:00")],
            [L("Weekly", "Weekly"), L("0 7 * * 1", "0 7 * * 1"), L("Every Monday at 07:00", "Щопонеділка о 07:00")],
            [L("One-off", "One-off"), L("fireAt", "fireAt"), L("Once, at a set time", "Один раз, у заданий час")],
          ],
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("No cron textbox — presets + natural language", "Без поля cron — пресети + природна мова"),
          md: L(
            "Cowork's UI doesn't take an arbitrary cron expression; it offers the presets above. Treat cron as the **mental model** (and what the underlying scheduler / API use). To get a specific time or weekday, pick the closest preset or describe it to `/schedule` in words.",
            "UI Cowork не приймає довільний cron-вираз; він пропонує пресети вище. Сприймай cron як **ментальну модель** (і те, що використовує внутрішній планувальник / API). Щоб задати конкретний час чи день, обери найближчий пресет або опиши це `/schedule` словами.",
          ),
        },
        {
          kind: "callout",
          tone: "warn",
          title: L("Awake + open, or it waits", "Увімкнено + відкрито, інакше чекає"),
          md: L(
            "Don't rely on overnight or away-from-keyboard runs landing on time. If the Mac is asleep or Desktop is closed, the run is skipped and caught up on wake — fine for a daily briefing, not for time-critical alerts.",
            "Не покладайся на нічні запуски чи запуски без тебе вчасно. Якщо Mac спить або Desktop закритий — запуск пропускається й надолужується при пробудженні: ок для щоденного briefing, не для критичних за часом сповіщень.",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Managing & debugging schedules", "Керування та дебаг розкладів"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "The **Scheduled** page in the left sidebar is mission control. From there you can see every task, review **upcoming and past runs**, open a task to **edit** its instructions or cadence, **Pause** / **Resume** it, **Delete** it, or **Run on demand**.\n\nDebugging is mostly reading the history: open a run's session to see exactly what it did; check past runs for **skips** (asleep / app closed); and confirm the task's folder and connectors are still granted — a revoked connector or moved folder is the usual cause of an empty or failed run.",
            "Сторінка **Scheduled** у лівій панелі — центр керування. Звідти видно кожну задачу, можна переглянути **майбутні й минулі запуски**, відкрити задачу, щоб **редагувати** інструкції чи cadence, **Pause** / **Resume**, **Delete** або **Run on demand**.\n\nДебаг — це здебільшого читання історії: відкрий сесію запуску, щоб побачити, що саме він зробив; перевір минулі запуски на **пропуски** (сон / закритий застосунок); і підтверди, що тека й connectors задачі досі надані — відкликаний connector чи переміщена тека — звична причина порожнього чи невдалого запуску.",
          ),
        },
        {
          kind: "table",
          head: [L("Action", "Дія"), L("What it does", "Що робить")],
          rows: [
            [L("View runs", "View runs"), L("Inspect upcoming + past runs and their outputs", "Переглянути майбутні + минулі запуски та їх результати")],
            [L("Edit", "Edit"), L("Change the prompt, cadence, model or folder", "Змінити prompt, cadence, модель чи теку")],
            [L("Pause / Resume", "Pause / Resume"), L("Stop the schedule without deleting it", "Зупинити розклад, не видаляючи")],
            [L("Run on demand", "Run on demand"), L("Fire it now, outside the schedule", "Запустити зараз, поза розкладом")],
            [L("Delete", "Delete"), L("Remove the task entirely", "Повністю видалити задачу")],
          ],
        },
        {
          kind: "callout",
          tone: "security",
          title: L("Unattended means extra caution", "Без нагляду — особлива обережність"),
          md: L(
            "Because a schedule runs without you watching, start with low-risk read/summarise tasks. Avoid scheduling sensitive-data access or consequential actions (sending messages, purchases, anything hard to undo), review outputs after each run, and pause tasks you're not using.",
            "Оскільки розклад працює без нагляду, починай із низькоризикових задач читання/підсумків. Уникай планування доступу до чутливих даних чи важливих дій (надсилання повідомлень, покупки, важко скасовуване), перевіряй результати після кожного запуску й став на паузу те, чим не користуєшся.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("Write the prompt once; Claude runs it on your cadence, each run a fresh Cowork session.", "Пиши prompt один раз; Claude виконує за cadence, кожен запуск — нова сесія Cowork."),
    L("One-off (fireAt) vs recurring (cron-style) — pick the shape that fits the job.", "Одноразово (fireAt) vs періодично (cron-стиль) — обери форму під задачу."),
    L("The UI exposes preset cadences (hourly/daily/weekly/weekdays/manual), not raw cron.", "UI показує готові cadence (hourly/daily/weekly/weekdays/manual), не сирий cron."),
    L("Tasks run only while the computer is awake and Desktop is open; missed runs catch up on wake.", "Задачі йдуть лише поки компʼютер увімкнений і Desktop відкритий; пропущені надолужуються при пробудженні."),
    L("Manage it all from the Scheduled page: edit, pause, run-now, and review past runs.", "Керуй усім зі сторінки Scheduled: редагуй, став на паузу, запускай зараз і дивись минулі запуски."),
  ],
  pitfalls: [
    { title: L("Expecting runs while asleep or closed", "Очікування запусків під час сну/закриття"), body: L("There's no cloud cron — missed runs are skipped and caught up on wake, not executed in the background.", "Хмарного cron немає — пропущені запуски надолужуються при пробудженні, а не йдуть у фоні.") },
    { title: L("Overwriting each run's output", "Перезапис результату щоразу"), body: L("Without a {date}/{week} placeholder in the filename, every run clobbers the previous file.", "Без плейсхолдера {date}/{week} в імені кожен запуск затирає попередній файл.") },
    { title: L("Scheduling risky actions", "Планування ризикових дій"), body: L("Unattended automation shouldn't send messages, make purchases, or touch sensitive files — keep schedules low-stakes.", "Автоматизація без нагляду не має надсилати повідомлення, робити покупки чи чіпати чутливі файли — тримай розклади низькоризиковими.") },
  ],
  interview: [
    { q: L("One-off vs recurring scheduled task — how do they differ?", "Одноразова vs періодична задача — у чому різниця?"), a: L("A one-off fires once at a future timestamp (fireAt) and is done; a recurring task repeats on a cron-style cadence — briefings, digests, monitoring.", "Одноразова спрацьовує раз у майбутній момент (fireAt) і завершується; періодична повторюється за cron-cadence — briefings, дайджести, моніторинг."), level: "middle" },
    { q: L("A user's daily 6am briefing didn't run overnight — why, and what happens next?", "Щоденний briefing о 6:00 не запустився вночі — чому і що далі?"), a: L("Scheduled tasks only run while the machine is awake and Desktop is open; an overnight run is skipped, then runs once automatically on wake, and the skip shows in the task's history. It is not a cloud cron.", "Заплановані задачі йдуть лише поки компʼютер увімкнений і Desktop відкритий; нічний запуск пропускається, потім один раз автоматично виконується при пробудженні, а пропуск видно в історії. Це не хмарний cron."), level: "senior" },
    { q: L("What's a safe default for unattended scheduled tasks?", "Який безпечний дефолт для задач без нагляду?"), a: L("Low-risk read/summarise work, no sensitive-data access or consequential actions, dated output files, reviewed after each run, and paused when unused.", "Низькоризикова робота читання/підсумків, без доступу до чутливих даних і важливих дій, датовані файли, перевірка після кожного запуску й пауза, коли не потрібно."), level: "senior" },
  ],
  seeAlso: ["m15", "m16", "m25", "m11"],
  sources: [
    { title: "Schedule recurring tasks in Claude Cowork — Help Center", url: "https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork" },
    { title: "Get started with Claude Cowork — Help Center", url: "https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork" },
    { title: "Use Claude Cowork safely — Help Center", url: "https://support.claude.com/en/articles/13364135-use-claude-cowork-safely" },
  ],
};

/* ======================================================================
   M18 · Computer use — fully authored (figure: ActingTiers)
   ====================================================================== */
const m18: Module = {
  id: "m18",
  section: "s4",
  order: 18,
  level: "senior",
  title: L("Computer use", "Computer use"),
  tagline: L(
    "When no connector or browser tool fits, Claude takes the slow, powerful path: it looks at your screen and clicks, types and navigates apps directly — asking permission for every app.",
    "Коли немає connector чи browser-tool, Claude обирає повільний, але потужний шлях: дивиться на екран і клікає, друкує й керує застосунками напряму — питаючи дозвіл для кожного застосунку.",
  ),
  readMins: 9,
  mentalModel: L(
    "The tool of last resort: connector first, browser next, screen control only for what nothing else can reach — because driving the screen has no sandbox.",
    "Інструмент останнього шансу: спершу connector, потім browser, а керування екраном — лише для того, що інакше не дістати — бо керування екраном не має sandbox.",
  ),
  topics: [
    {
      id: "t1",
      title: L("When Claude drives your screen", "Коли Claude керує екраном"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Sometimes the job has **no connector and no browser tool** — a native desktop app, a mobile simulator, a hardware control panel, an internal dashboard with no API. **Computer use** is Claude's answer: it takes screenshots to see your screen and then clicks, types and navigates the app directly, the way you would.\n\nIt is a **research preview on Pro and Max** (not Team/Enterprise), in Claude Desktop on macOS and Windows, and it is **off by default**. You turn it on in **Settings → General** (under *Desktop app*); on macOS you also grant **Accessibility** and **Screen Recording**. Your desktop must stay awake and the app open for it to work.",
            "Іноді в задачі **немає ні connector, ні browser-tool** — нативний десктоп-застосунок, мобільний симулятор, панель керування залізом, внутрішній dashboard без API. **Computer use** — відповідь Claude: він робить скриншоти, щоб бачити екран, і далі клікає, друкує й керує застосунком напряму, як ти.\n\nЦе **research preview на Pro і Max** (не Team/Enterprise), у Claude Desktop на macOS і Windows, і **вимкнено за замовчуванням**. Вмикається в **Settings → General** (розділ *Desktop app*); на macOS ще треба надати **Accessibility** і **Screen Recording**. Десктоп має лишатися увімкненим, а застосунок — відкритим.",
          ),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Research preview — Pro/Max, opt-in", "Research preview — Pro/Max, лише за згодою"),
          md: L(
            "Because it's early and powerful, computer use ships off by default and is gated to Pro/Max on Desktop. Treat it as experimental: it makes mistakes on complex multi-step workflows and is slower than any dedicated tool.",
            "Оскільки це ще рання й потужна можливість, computer use вимкнено за замовчуванням і доступно лише на Pro/Max у Desktop. Сприймай як експериментальне: воно помиляється на складних багатокрокових сценаріях і повільніше за будь-який спеціальний tool.",
          ),
        },
      ],
    },
    {
      id: "t2",
      title: L("The three tiers of acting", "Три рівні дій"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Cowork always reaches for the **most precise tool first** and only falls through when nothing better fits. That's three tiers: **(1) a connector / MCP** if one exists (Gmail, Drive, Slack — seconds, and bounded by its OAuth scopes); **(2) the browser** via Claude in Chrome for web work with no connector; **(3) computer use** — driving the screen — for everything else. Pulling Slack through its connector takes seconds; navigating Slack through the screen takes much longer and breaks more easily.",
            "Cowork завжди тягнеться до **найточнішого tool першим** і падає нижче, лише коли нічого кращого немає. Це три рівні: **(1) connector / MCP**, якщо є (Gmail, Drive, Slack — секунди, обмежено OAuth-scopes); **(2) browser** через Claude in Chrome для веб-роботи без connector; **(3) computer use** — керування екраном — для решти. Витягти Slack через connector — секунди; навігувати Slack через екран — значно довше й крихкіше.",
          ),
        },
        { kind: "figure", fig: "acting-tiers", caption: L("Most precise first: a connector, then the browser, then screen control. Reach widens and precision drops downward; the sandbox ends below tier 2.", "Найточніше першим: connector, потім browser, потім керування екраном. Донизу зростає охоплення й падає точність; sandbox закінчується під рівнем 2.") },
        {
          kind: "callout",
          tone: "tip",
          title: L("Connect your busy tools", "Підключай часто вживані інструменти"),
          md: L(
            "If you find Claude driving an app through the screen often, add a connector for it. The connector path is faster, more reliable, and safer — screen control is the fallback, not the goal.",
            "Якщо Claude часто керує застосунком через екран — додай для нього connector. Шлях через connector швидший, надійніший і безпечніший — керування екраном це запасний варіант, а не мета.",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("Granting apps & access tiers", "Надання застосунків і рівні доступу"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "The first time Claude needs an app, a prompt appears — **Allow for this session** or **Deny** (approvals last the session, or **30 minutes** in phone-dispatched sessions). Broad-reach apps like a terminal, Finder/File Explorer or System Settings show an **extra warning** so you know what you're granting.\n\nCrucially, the prompt also shows a **per-app access tier**, fixed by the app's category and not changeable. Don't confuse these two senses of \"tier\": the **three tiers of acting** above are *which mechanism* Claude uses; the **access tiers** below are *how much control* a granted app gets under computer use.",
            "Коли Claude вперше потребує застосунок, зʼявляється запит — **Allow for this session** або **Deny** (дозвіл діє сесію, або **30 хвилин** у сесіях, запущених із телефону). Застосунки широкого впливу — термінал, Finder/File Explorer чи System Settings — показують **додаткове попередження**, щоб ти розумів, що надаєш.\n\nВажливо: запит також показує **per-app access tier**, зафіксований категорією застосунку й незмінний. Не плутай два значення слова «tier»: **три рівні дій** вище — це *який механізм* використовує Claude; **access tiers** нижче — це *скільки контролю* отримує наданий застосунок під computer use.",
          ),
        },
        {
          kind: "table",
          head: [L("Access tier", "Access tier"), L("What Claude can do", "Що Claude може"), L("Applies to", "Застосовується до")],
          rows: [
            [L("View only", "View only"), L("See the app in screenshots — no clicks or typing", "Бачити застосунок у скриншотах — без кліків і друку"), L("Browsers, trading platforms", "Браузери, торгові платформи")],
            [L("Click only", "Click only"), L("Click and scroll, but not type or use shortcuts", "Клік і скрол, але без друку й шорткатів"), L("Terminals, IDEs", "Термінали, IDE")],
            [L("Full control", "Full control"), L("Click, type, drag and use keyboard shortcuts", "Клік, друк, drag і клавіатурні шорткати"), L("Everything else", "Усе інше")],
          ],
          caption: L("Tiers are fixed by app category — they steer Claude back to the dedicated tool (Chrome for the browser, the shell for a terminal).", "Рівні зафіксовані категорією — вони повертають Claude до спеціального tool (Chrome для браузера, shell для термінала)."),
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Two settings worth knowing", "Два налаштування, які варто знати"),
          md: L(
            "**Denied apps** is a blocklist — listed apps are rejected without a prompt. **Unhide apps when Claude finishes** hides your other windows while Claude works so it touches only the approved app, then restores them.",
            "**Denied apps** — це blocklist: застосунки зі списку відхиляються без запиту. **Unhide apps when Claude finishes** ховає інші вікна, поки Claude працює, щоб він чіпав лише дозволений застосунок, а потім повертає їх.",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Link & financial safety", "Безпека посилань і фінансів"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Computer use has **no sandbox** between Claude and your apps — unlike code, which runs in the VM. Claude sees whatever is on screen via screenshots, so **close sensitive apps and files first**. Some categories — investment/trading platforms, cryptocurrency — are **blocked by default**, and Claude is trained to avoid moving money, entering sensitive data, or scraping faces. These guardrails are **not absolute**: don't rely on them instead of blocking apps.\n\nWatch the **cross-app link trap**: clicking a link inside an allowed app can open it in another app (e.g. a browser) even if you never granted that app — Claude can be prevented from *seeing* that window, but the link still opens. And remember: **you remain responsible** for every action Claude takes on your behalf.",
            "Computer use **не має sandbox** між Claude і застосунками — на відміну від коду, що йде у VM. Claude бачить усе на екрані через скриншоти, тож **спершу закрий чутливі застосунки й файли**. Деякі категорії — інвестиційні/торгові платформи, криптовалюта — **заблоковані за замовчуванням**, і Claude навчений уникати переказів грошей, введення чутливих даних і збору облич. Ці запобіжники **не абсолютні**: не покладайся на них замість блокування застосунків.\n\nСтережися **пастки міжзастосункових посилань**: клік по посиланню в дозволеному застосунку може відкрити його в іншому (напр. браузері), навіть якщо ти його не надавав — Claude можна не дати *бачити* те вікно, але посилання все одно відкриється. І памʼятай: **ти відповідаєш** за кожну дію, яку Claude робить від твого імені.",
          ),
        },
        {
          kind: "table",
          head: [L("Risk", "Ризик"), L("Built-in guard", "Вбудований захист"), L("Your move", "Твоя дія")],
          rows: [
            [L("Sensitive data on screen", "Чутливі дані на екрані"), L("Trained to avoid entering it", "Навчений не вводити"), L("Close the app/file before starting", "Закрий застосунок/файл до старту")],
            [L("Money / trading", "Гроші / торгівля"), L("Trading & crypto apps blocked by default", "Trading і crypto заблоковані за замовчуванням"), L("Never grant banking/finance apps", "Не надавай банківські/фінансові застосунки")],
            [L("Prompt injection from screen", "Prompt injection з екрана"), L("Action review scans for it; you can stop anytime", "Action review сканує; можна зупинити будь-коли"), L("Supervise; use specific prompts", "Наглядай; пиши конкретні prompt")],
            [L("Cross-app link opening", "Відкриття посилань між застосунками"), L("Chrome window can be hidden from Claude", "Вікно Chrome можна сховати від Claude"), L("Expect links to open; avoid risky apps", "Очікуй, що посилання відкриються; уникай ризикових застосунків")],
          ],
        },
        {
          kind: "callout",
          tone: "security",
          title: L("The red lines", "Червоні лінії"),
          md: L(
            "Don't use computer use for healthcare, finance, legal contracts, or apps holding other people's personal data. Block sensitive apps, start with low-stakes research/organising tasks, and watch the screen — especially early.",
            "Не використовуй computer use для healthcare, фінансів, юридичних договорів чи застосунків із чужими персональними даними. Блокуй чутливі застосунки, починай із низькоризикових задач (дослідження/впорядкування) і стеж за екраном — особливо спочатку.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("Computer use is the tool of last resort: connector → browser → screen, most precise first.", "Computer use — інструмент останнього шансу: connector → browser → екран, найточніше першим."),
    L("It's a Pro/Max research preview on macOS/Windows Desktop, off by default (needs Accessibility + Screen Recording on macOS).", "Це research preview на Pro/Max у Desktop macOS/Windows, вимкнено за замовчуванням (на macOS треба Accessibility + Screen Recording)."),
    L("Every app needs explicit per-app permission; sensitive apps (trading/crypto) are blocked by default.", "Кожен застосунок потребує явного дозволу; чутливі (trading/crypto) заблоковані за замовчуванням."),
    L("Access tiers are fixed by category: browsers View-only, terminals/IDEs Click-only, everything else Full control.", "Access tiers зафіксовані категорією: браузери View-only, термінали/IDE Click-only, решта Full control."),
    L("No sandbox — Claude sees your screen via screenshots and acts directly; close or block sensitive apps.", "Без sandbox — Claude бачить екран через скриншоти й діє напряму; закривай або блокуй чутливі застосунки."),
  ],
  pitfalls: [
    { title: L("Using it when a connector exists", "Використання, коли є connector"), body: L("Screen control is slower and more error-prone — connect the tool instead and let Claude use the precise path.", "Керування екраном повільніше й помилковіше — краще підключи connector і дай Claude точний шлях.") },
    { title: L("Granting broad-reach apps blindly", "Сліпе надання застосунків широкого впливу"), body: L("Terminals, Finder and System Settings carry an extra warning for a reason — read it before allowing.", "Термінали, Finder і System Settings мають додаткове попередження не дарма — прочитай перед дозволом.") },
    { title: L("Trusting the guardrails as a substitute", "Довіра до запобіжників як до заміни"), body: L("Trained avoidance isn't absolute — block sensitive apps and supervise rather than relying on training alone.", "Навчене уникання не абсолютне — блокуй чутливі застосунки й наглядай, а не покладайся лише на тренування.") },
  ],
  interview: [
    { q: L("Why is computer use the \"last resort\"?", "Чому computer use — «останній шанс»?"), a: L("It's the broadest and slowest path and has no sandbox, so Claude uses the most precise tool first — a connector, then the browser — and reserves screen control for what nothing else can reach (native apps, simulators, hardware).", "Це найширший і найповільніший шлях без sandbox, тож Claude використовує найточніший tool першим — connector, потім browser — і лишає керування екраном для того, що інакше не дістати (нативні застосунки, симулятори, залізо)."), level: "senior" },
    { q: L("What are the per-app access tiers, and why do they exist?", "Які є per-app access tiers і навіщо вони?"), a: L("View only (browsers, trading platforms — screenshots only), Click only (terminals/IDEs — click+scroll, no typing), Full control (everything else). Fixed by category, they steer Claude back to the dedicated tool and cap the blast radius of screen control.", "View only (браузери, торгові платформи — лише скриншоти), Click only (термінали/IDE — клік+скрол, без друку), Full control (решта). Зафіксовані категорією, вони повертають Claude до спеціального tool і обмежують радіус ураження."), level: "senior" },
    { q: L("What's risky about a scheduled task that uses computer use unattended?", "Чим ризикована запланована задача з computer use без нагляду?"), a: L("No sandbox + nobody watching + screenshots of whatever's on screen + cross-app link opening + prompt injection from screen content. Keep computer use out of unattended schedules, block sensitive apps, and supervise it live.", "Без sandbox + без нагляду + скриншоти всього на екрані + відкриття посилань між застосунками + prompt injection з екрана. Тримай computer use поза автономними розкладами, блокуй чутливі застосунки й наглядай наживо."), level: "senior" },
  ],
  seeAlso: ["m15", "m17", "m20", "m25"],
  sources: [
    { title: "Let Claude use your computer in Cowork — Help Center", url: "https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork" },
    { title: "Desktop application (computer use & access tiers) — Claude Code Docs", url: "https://code.claude.com/docs/en/desktop" },
    { title: "Use Claude Cowork safely — Help Center", url: "https://support.claude.com/en/articles/13364135-use-claude-cowork-safely" },
  ],
};

/* ======================================================================
   M19 · Cowork projects, connectors, plugins & mobile — fully authored (S7)
   ====================================================================== */
const m19: Module = {
  id: "m19",
  section: "s4",
  order: 19,
  level: "senior",
  title: L("Cowork projects, connectors, plugins & mobile", "Cowork projects, connectors, plugins і mobile"),
  tagline: L(
    "Turn one-off Cowork tasks into a standing workspace: a project that keeps files, instructions, schedules and memory — powered by your account connectors and plugins, and reachable from your phone.",
    "Перетвори разові Cowork-задачі на постійний workspace: project, що тримає файли, instructions, розклади й memory — на основі твоїх акаунтних connectors і plugins, і доступний навіть із телефону.",
  ),
  readMins: 8,
  mentalModel: L(
    "A Cowork project is a folder with a memory; your connectors and plugins plug in from the account level; Dispatch is one phone-to-desktop thread that routes each task to the right agent.",
    "Cowork project — це папка з памʼяттю; твої connectors і plugins під'єднуються з рівня акаунта; Dispatch — це один thread «телефон↔десктоп», що скеровує кожну задачу до потрібного агента.",
  ),
  topics: [
    {
      id: "t1",
      title: L("Cowork projects — persistent context for recurring work", "Cowork projects — персистентний context для повторюваної роботи"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "A plain Cowork task starts cold every time. A **project** groups related tasks into one workspace that keeps its own **files, instructions, scheduled tasks, context and memory** — so Claude stops re-learning your setup on every run. If you use **Projects** in Claude chat, Cowork projects feel similar, but they live **locally on your desktop** and are built around the tasks you run through Cowork.\n\nFind **Projects** in the left panel and click **+** to create one three ways: **Start from scratch** (a new folder with instructions and files), **Import from a Claude project** (pull the files and instructions out of a chat project — one at a time, no bulk import), or **Use an existing folder** on your computer (point Claude at a folder you already have). You then name it, choose where on disk it lives, and add instructions.",
            "Звичайна Cowork-задача щоразу стартує «з нуля». **Project** групує повʼязані задачі в один workspace, що тримає власні **файли, instructions, scheduled tasks, context і memory** — тож Claude не вивчає твоє оточення наново при кожному запуску. Якщо ти користуєшся **Projects** у чаті Claude, Cowork projects схожі, але живуть **локально на десктопі** і побудовані навколо задач, які ти виконуєш через Cowork.\n\nЗнайди **Projects** у лівій панелі й тисни **+**, щоб створити трьома способами: **Start from scratch** (нова папка з instructions і файлами), **Import from a Claude project** (витягти файли й instructions із chat-project — по одному, без bulk-імпорту), або **Use an existing folder** на компʼютері (вказати Claude на наявну папку). Далі даєш назву, обираєш місце на диску й додаєш instructions.",
          ),
        },
        { kind: "figure", fig: "cowork-project", caption: L("A Cowork project is a local folder that wraps four project-scoped pieces — Instructions, Scheduled tasks, Context, Memory — while account-level connectors and plugins plug in from outside.", "Cowork project — це локальна папка, що огортає чотири project-scoped частини — Instructions, Scheduled tasks, Context, Memory — тоді як акаунтні connectors і plugins під'єднуються ззовні.") },
        {
          kind: "table",
          head: [L("Project piece", "Частина проєкту"), L("What it does", "Що робить"), L("Scope", "Scope")],
          rows: [
            [L("Instructions", "Instructions"), L("Tone, formatting and rules Claude follows for **every** task in the project", "Тон, форматування й правила, яких Claude дотримується для **кожної** задачі проєкту"), L("Project", "Project")],
            [L("Scheduled tasks", "Scheduled tasks"), L("Recurring tasks that belong to this project (a morning brief, a weekly update)", "Повторювані задачі цього проєкту (ранковий бриф, щотижневе оновлення)"), L("Project", "Project")],
            [L("Context", "Context"), L("A local folder, a linked chat project, or a pasted URL Claude can reference", "Локальна папка, повʼязаний chat-project або вставлений URL для довідки"), L("Project", "Project")],
            [L("Memory", "Memory"), L("Claude remembers what it learned working inside the project", "Claude памʼятає, що дізнався, працюючи в проєкті"), L("Project only — not shared", "Лише project — не спільне")],
          ],
          caption: L("Only these four are project-scoped. Connectors, plugins and skills come from the account level (next topic).", "Лише ці чотири — project-scoped. Connectors, plugins і skills приходять з рівня акаунта (наступний топік)."),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Project memory is walled, and projects are local-only", "Memory проєкту ізольована, а проєкти лише локальні"),
          md: L(
            "Memory is **scoped to the project** — what Claude learns in one project doesn't leak into another. Projects are **desktop-only and stored locally**: there's **no cloud sync**, and on **Team/Enterprise** Cowork projects **can't be shared**. **Archiving** only removes the project's metadata from the UI — your files and folders on disk are untouched.",
            "Memory **прив'язана до проєкту** — що Claude вивчив в одному, не протікає в інший. Проєкти **лише на десктопі й зберігаються локально**: **немає cloud sync**, а на **Team/Enterprise** Cowork projects **не можна шарити**. **Archiving** лише прибирає метадані проєкту з UI — твої файли й папки на диску лишаються недоторканими.",
          ),
        },
      ],
    },
    {
      id: "t2",
      title: L("Connectors in Cowork", "Connectors у Cowork"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Cowork doesn't have its own connector system. The **MCP connectors you configured once on your account** — Gmail, Drive, Slack, a custom remote MCP — are simply **available to Cowork tasks**, the same way they're available in chat. They're **account- or org-level**, not bound to a project, and Claude reaches for them per task. That's a deliberate split worth internalizing: the **only** project-scoped things are **Instructions** and **Context** (the folder / linked project / URL you attach). Everything else — connectors, plugins, skills — composes in from outside.",
            "У Cowork немає власної системи connectors. **MCP connectors, які ти налаштував один раз на акаунті** — Gmail, Drive, Slack, кастомний remote MCP — просто **доступні Cowork-задачам**, так само як у чаті. Вони **рівня акаунта/організації**, не привʼязані до проєкту, і Claude звертається до них під задачу. Це свідомий поділ, який варто засвоїти: **єдине** project-scoped — це **Instructions** і **Context** (папка / повʼязаний проєкт / URL, які ти додаєш). Усе інше — connectors, plugins, skills — під'єднується ззовні.",
          ),
        },
        {
          kind: "compare",
          a: L("Project-scoped", "Project-scoped"),
          b: L("Account / org-level", "Рівень акаунта / організації"),
          rows: [
            [L("Set where", "Де налаштовується"), L("Inside the project", "Усередині проєкту"), L("Once, in Settings", "Один раз, у Settings")],
            [L("What", "Що"), L("Instructions; Context = folder, linked chat project, or URL", "Instructions; Context = папка, повʼязаний chat-project або URL"), L("MCP connectors, installed plugins, enabled skills", "MCP connectors, встановлені plugins, увімкнені skills")],
            [L("Reach", "Охоплення"), L("Only this project's tasks", "Лише задачі цього проєкту"), L("Every Cowork task, and other Claude surfaces", "Кожна Cowork-задача й інші поверхні Claude")],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Reuse, don't duplicate", "Перевикористовуй, не дублюй"),
          md: L(
            "Because connectors are account-level, you set up Gmail or a custom MCP **once** and it works in every project and chat. Put project-specific facts in **Context** and project behaviour in **Instructions** — not in a connector. See **Connectors & MCP** (M11) for how the connection and OAuth scopes actually work.",
            "Оскільки connectors рівня акаунта, ти налаштовуєш Gmail чи кастомний MCP **один раз** — і це працює в кожному проєкті й чаті. Project-специфічні факти клади в **Context**, а поведінку проєкту — в **Instructions**, не в connector. Див. **Connectors & MCP** (M11), як саме працюють підключення й OAuth scopes.",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("Plugins & role workflows", "Plugins і рольові процеси"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "A **plugin** is a bundle — **skills + subagents + commands + hooks + MCP servers** packaged together and installed in one step. Like connectors, plugins are **installed once** and then available across your Cowork tasks; they aren't project-scoped. Cowork ships **11 open-source role plugins** (productivity, sales, customer-support, product-management, marketing, legal, finance, data, enterprise-search, bio-research, and the cowork-plugin-management helper). Installing one is how you give Cowork a **ready-made role workflow**: the marketing plugin brings marketing skills and subagents; the finance plugin brings finance ones.",
            "**Plugin** — це bundle: **skills + subagents + commands + hooks + MCP servers**, спаковані разом і встановлені одним кроком. Як і connectors, plugins **встановлюються один раз** і далі доступні в усіх Cowork-задачах; вони не project-scoped. Cowork постачає **11 open-source рольових plugins** (productivity, sales, customer-support, product-management, marketing, legal, finance, data, enterprise-search, bio-research і помічник cowork-plugin-management). Встановлення одного — це спосіб дати Cowork **готовий рольовий workflow**: marketing-plugin приносить marketing-skills і subagents; finance-plugin — фінансові.",
          ),
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Install once, match it to your role", "Встанови раз, підбери під свою роль"),
          md: L(
            "Browse and install plugins from **claude.com/plugins** (or a custom marketplace). Pick the one or two role plugins that match what you actually do, rather than installing everything — each adds skills and subagents Claude may consider. Authoring and trust details live in **Plugins & marketplaces** (M14).",
            "Переглядай і встановлюй plugins на **claude.com/plugins** (або у власному marketplace). Обери один-два рольові plugins під те, що ти реально робиш, а не став усе — кожен додає skills і subagents, які Claude може враховувати. Деталі авторства й довіри — у **Plugins & marketplaces** (M14).",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Mobile & dispatch — start from your phone", "Mobile і dispatch — запуск із телефону"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "**Dispatch** gives you **one continuous conversation** with Claude that you reach from your phone or your desktop. Text it a task like you'd message a coworker, go do something else, and come back to finished work. The job runs **on your computer** — with your local files, connectors, plugins, and your apps through computer use — and Claude **messages you the result** plus a push notification when it's done or needs your go-ahead.\n\nThe clever part: Dispatch **routes** each task to the right agent. Development work spins up a **Claude Code** session; knowledge work spins up a **Cowork** session — and both appear in their own sidebars. It's a **single persistent thread** that keeps context across tasks, so you can hand off from phone to desktop without re-explaining.",
            "**Dispatch** дає **одну безперервну розмову** з Claude, доступну з телефону чи десктопа. Напиши задачу, як написав би колезі, займися іншим — і повернись до готової роботи. Задача виконується **на твоєму компʼютері** — з локальними файлами, connectors, plugins і застосунками через computer use — а Claude **надсилає тобі результат** і push-сповіщення, коли готово або потрібен твій дозвіл.\n\nХитрість: Dispatch **скеровує** кожну задачу до потрібного агента. Розробка піднімає сесію **Claude Code**; knowledge work — сесію **Cowork**, і обидві зʼявляються у власних sidebars. Це **один персистентний thread**, що тримає context між задачами, тож можна передати справу з телефону на десктоп без повторних пояснень.",
          ),
        },
        { kind: "figure", fig: "dispatch-flow", caption: L("One thread, two devices: a task texted from your phone runs on your awake desktop, is routed to Claude Code or Cowork, and the result comes back to the same thread.", "Один thread, два пристрої: задача з телефону виконується на ввімкненому десктопі, скеровується до Claude Code або Cowork, і результат повертається в той самий thread.") },
        {
          kind: "table",
          head: [L("Requirement", "Вимога"), L("Detail", "Деталь")],
          rows: [
            [L("Plan", "План"), L("**Pro or Max** — narrower than Cowork itself, which is all paid plans", "**Pro або Max** — вужче, ніж сам Cowork, доступний усім платним планам")],
            [L("Apps", "Застосунки"), L("Latest **Claude Desktop** (macOS / Windows x64) **and** the latest **Claude mobile app**", "Найновіший **Claude Desktop** (macOS / Windows x64) **і** найновіший **Claude mobile app**")],
            [L("Desktop state", "Стан десктопа"), L("Computer **awake** and the app **open** — work runs on your machine, not in the cloud", "Компʼютер **увімкнений**, застосунок **відкритий** — робота йде на твоїй машині, не в хмарі")],
            [L("Network", "Мережа"), L("Active internet on **both** phone and desktop", "Активний інтернет на **обох** — телефоні й десктопі")],
            [L("Threads", "Threads"), L("One continuous thread — you can't start or manage multiple", "Один безперервний thread — не можна створити чи вести кілька")],
          ],
        },
        {
          kind: "callout",
          tone: "security",
          title: L("A phone message can move real files — trust the whole chain", "Повідомлення з телефону може рухати реальні файли — довіряй усьому ланцюгу"),
          md: L(
            "Dispatch hands a mobile agent remote control of a desktop agent. A message from your phone can trigger **real actions** on your computer — reading, moving or deleting local files, hitting connected services, driving your browser, and using desktop apps via **computer use** (which has **no sandbox** and uses **30-minute** approvals in phone-started sessions). Before enabling it: trust every app and service in the chain, know what's reachable, and know how to revoke access. Keep computer-use-heavy work off **unattended** phone tasks.",
            "Dispatch віддає мобільному агенту віддалене керування десктопним агентом. Повідомлення з телефону може запустити **реальні дії** на компʼютері — читання, переміщення чи видалення локальних файлів, звернення до підключених сервісів, керування браузером і застосунками через **computer use** (який **не має sandbox** і використовує **30-хвилинні** дозволи в сесіях, запущених із телефону). Перш ніж вмикати: довіряй кожному застосунку й сервісу в ланцюгу, знай, що доступне, і вмій відкликати доступ. Тримай задачі з активним computer use подалі від **автономних** мобільних запусків.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("A Cowork project is a local workspace grouping related tasks with their own files, instructions, scheduled tasks, context and memory — created from scratch, an existing folder, or an imported chat project.", "Cowork project — це локальний workspace, що групує повʼязані задачі з власними файлами, instructions, scheduled tasks, context і memory — створюється з нуля, з наявної папки або імпортом chat-project."),
    L("Project memory is walled per project; projects are desktop-only, stored locally with no cloud sync, and can't be shared on Team/Enterprise.", "Memory проєкту ізольована; проєкти лише на десктопі, зберігаються локально без cloud sync і не шаряться на Team/Enterprise."),
    L("Connectors and plugins are account/org-level, not project-scoped — only Instructions and Context are scoped to a project.", "Connectors і plugins рівня акаунта/організації, не project-scoped — лише Instructions і Context прив'язані до проєкту."),
    L("Plugins bundle skills + subagents + commands + hooks + MCP; the 11 open-source role plugins give Cowork ready-made role workflows (install from claude.com/plugins).", "Plugins пакують skills + subagents + commands + hooks + MCP; 11 open-source рольових plugins дають Cowork готові рольові workflows (встановлення з claude.com/plugins)."),
    L("Dispatch is one continuous phone↔desktop thread (Pro/Max only) that routes each task to Claude Code or Cowork on your awake desktop and messages you the result.", "Dispatch — один безперервний thread «телефон↔десктоп» (лише Pro/Max), що скеровує задачу до Claude Code чи Cowork на ввімкненому десктопі й надсилає результат."),
  ],
  pitfalls: [
    { title: L("Expecting project memory to be global", "Очікувати, що memory проєкту глобальна"), body: L("Memory is per-project by design — facts you need everywhere belong in global Memory or in Instructions, not locked inside one project.", "Memory за задумом прив'язана до проєкту — факти, потрібні всюди, мають жити в глобальній Memory чи в Instructions, а не замкнені в одному проєкті.") },
    { title: L("Thinking connectors live inside a project", "Думати, що connectors живуть у проєкті"), body: L("Connectors and plugins are account-level; only Instructions and Context (folder / linked project / URL) are project-scoped. Configure connectors once in Settings.", "Connectors і plugins рівня акаунта; лише Instructions і Context (папка / повʼязаний проєкт / URL) project-scoped. Налаштовуй connectors раз у Settings.") },
    { title: L("Assuming Dispatch runs with the laptop asleep", "Гадати, що Dispatch працює зі сплячим ноутбуком"), body: L("There's no cloud runner — the desktop must be awake with the app open. If it sleeps, the task waits. Plan around that for time-sensitive mobile tasks.", "Немає хмарного раннера — десктоп має бути ввімкнений із відкритим застосунком. Якщо засне, задача чекає. Враховуй це для термінових мобільних задач.") },
  ],
  interview: [
    { q: L("How is a Cowork project different from a chat Project?", "Чим Cowork project відрізняється від chat Project?"), a: L("A Cowork project lives locally on your desktop and is built around the tasks and files you run through Cowork. It adds project-scoped scheduled tasks, folder/URL/linked-project context, and project memory. You can import a chat project to seed it, but there's no cloud sync and no sharing on Team/Enterprise.", "Cowork project живе локально на десктопі й побудований навколо задач і файлів, які ти ганяєш через Cowork. Він додає project-scoped scheduled tasks, context із папки/URL/повʼязаного проєкту й project memory. Можна імпортувати chat-project як основу, але немає cloud sync і шарингу на Team/Enterprise.", ), level: "senior" },
    { q: L("Where do connectors and plugins live relative to a Cowork project?", "Де живуть connectors і plugins відносно Cowork project?"), a: L("At the account/org level, not inside the project. You configure a connector or install a plugin once and it's available to every Cowork task (and other surfaces). Only Instructions and Context are project-scoped — so don't expect project A's connector setup to differ from project B's.", "На рівні акаунта/організації, не в проєкті. Connector налаштовується, а plugin встановлюється один раз — і доступні кожній Cowork-задачі (та іншим поверхням). Лише Instructions і Context project-scoped — тож не чекай, що налаштування connector у проєкті A відрізнятиметься від проєкту B.", ), level: "senior" },
    { q: L("What's the trust model of Dispatch, and why does it matter?", "Яка модель довіри в Dispatch і чому це важливо?"), a: L("Dispatch chains a mobile agent to a desktop agent: a phone message can trigger real local actions — reading/moving/deleting files, hitting connectors, driving the browser, and computer use with no sandbox (30-minute approvals). So you must trust every link in the chain, know what's reachable, and be able to revoke access — and keep computer-use-heavy work off unattended phone tasks.", "Dispatch зчіплює мобільного агента з десктопним: повідомлення з телефону може запустити реальні локальні дії — читання/переміщення/видалення файлів, звернення до connectors, керування браузером і computer use без sandbox (30-хвилинні дозволи). Тож треба довіряти кожній ланці, знати, що досяжне, і вміти відкликати доступ — і тримати важкий computer use подалі від автономних мобільних задач.", ), level: "staff" },
  ],
  seeAlso: ["m15", "m7", "m14", "m17"],
  sources: [
    { title: "Organize your tasks with projects in Claude Cowork — Help Center", url: "https://support.claude.com/en/articles/14116274-organize-your-tasks-with-projects-in-claude-cowork" },
    { title: "Assign tasks from anywhere in Claude Cowork — Help Center", url: "https://support.claude.com/en/articles/13947068-assign-tasks-from-anywhere-in-claude-cowork" },
    { title: "Use Claude Cowork safely — Help Center", url: "https://support.claude.com/en/articles/13364135-use-claude-cowork-safely" },
  ],
};

/* ======================================================================
   M20 · Claude in Chrome — fully authored (S7, + light Browser-Agent Loop)
   ====================================================================== */
const m20: Module = {
  id: "m20",
  section: "s5",
  order: 20,
  level: "middle",
  title: L("Claude in Chrome", "Claude in Chrome"),
  tagline: L(
    "A browser extension that works the web in a side panel: it reads the page via screenshots, clicks, types and fills forms — asking per site and before anything irreversible.",
    "Розширення браузера, що працює з вебом у бічній панелі: читає сторінку через скриншоти, клікає, друкує й заповнює форми — питаючи per-site і перед будь-чим незворотним.",
  ),
  readMins: 7,
  mentalModel: L(
    "An agent in a side panel: it sees only the active tab (via screenshots), acts through the browser like you would, and stops to ask per site and before anything irreversible.",
    "Агент у бічній панелі: бачить лише активну вкладку (через скриншоти), діє через браузер, як ти, і спиняється спитати per-site і перед будь-чим незворотним.",
  ),
  topics: [
    {
      id: "t1",
      title: L("What the browser agent is", "Що таке browser-agent"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "**Claude in Chrome** is a browser **extension**: Claude reads, clicks and navigates websites alongside you in a **side panel** that stays open while you browse. It **sees what you see** — it takes screenshots of the **active tab** and reads the page text — and acts by running JavaScript to click buttons, type and fill forms.\n\nIt's in **beta on all paid plans** (Pro, Max, Team, Enterprise) and runs in **Google Chrome only** — not other Chromium browsers, not mobile. Install it from the Chrome Web Store, pin it, and grant the browser permissions it needs.",
            "**Claude in Chrome** — це **розширення** браузера: Claude читає, клікає й навігує сайтами поруч із тобою в **бічній панелі**, що лишається відкритою під час перегляду. Він **бачить те, що бачиш ти** — робить скриншоти **активної вкладки** й читає текст сторінки — і діє, виконуючи JavaScript, щоб клікати, друкувати й заповнювати форми.\n\nЦе **beta на всіх платних планах** (Pro, Max, Team, Enterprise) і працює **лише в Google Chrome** — не в інших Chromium-браузерах і не на мобільному. Встанови з Chrome Web Store, закріпи й надай потрібні дозволи браузера.",
          ),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Beta, Chrome-only — and the model depends on your plan", "Beta, лише Chrome — і модель залежить від плану"),
          md: L(
            "On **Pro**, Claude in Chrome runs on **Haiku 4.5** only. On **Max / Team / Enterprise** you pick the model per task — **Opus 4.7** (max reasoning), **Sonnet 4.6** (complex multi-step) or **Haiku 4.5** (speed). It's still beta, so favour simple, supervised tasks over long autonomous workflows.",
            "На **Pro** Claude in Chrome працює лише на **Haiku 4.5**. На **Max / Team / Enterprise** ти обираєш модель під задачу — **Opus 4.7** (максимум міркування), **Sonnet 4.6** (складні багатокрокові) чи **Haiku 4.5** (швидкість). Це ще beta, тож надавай перевагу простим задачам під наглядом, а не довгим автономним workflows.",
          ),
        },
      ],
    },
    {
      id: "t2",
      title: L("The loop: navigate, click, fill, extract", "Цикл: навігація, клік, форми, extract"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Like every Claude agent, the browser agent runs a loop: **perceive** (screenshot + read the DOM) → **reason** (plan the next action) → **act** (navigate, click, type, extract) → **observe** the result → repeat until the goal is met. Step through it below and watch where it stops to ask.\n\nTwo things make it fast in practice: it has **built-in knowledge of popular sites** (Slack, Google Calendar, Gmail, Google Docs, GitHub), so high-level commands like \"schedule a meeting\" or \"update the doc\" work without step-by-step directions; and a **tab group** — drag tabs into Claude's group and it can read and synthesise across all of them at once, and keep working in the background while you switch tabs (as long as Chrome stays open).",
            "Як кожен агент Claude, browser-agent крутить цикл: **perceive** (скриншот + читання DOM) → **reason** (план наступної дії) → **act** (навігація, клік, друк, extract) → **observe** результат → повтор до досягнення мети. Прокрокуй нижче й поглянь, де він спиняється спитати.\n\nДва чинники роблять його швидким на практиці: **вбудоване знання популярних сайтів** (Slack, Google Calendar, Gmail, Google Docs, GitHub) — тож команди верхнього рівня на кшталт «schedule a meeting» чи «update the doc» працюють без покрокових інструкцій; і **tab group** — перетягни вкладки в групу Claude, і він читає й синтезує по всіх одразу, а також працює у фоні, поки ти перемикаєш вкладки (доки Chrome відкритий).",
          ),
        },
        { kind: "sim", sim: "browser-agent-loop" },
        {
          kind: "table",
          head: [L("Capability", "Можливість"), L("What it means", "Що означає")],
          rows: [
            [L("Navigate", "Навігація"), L("Open URLs and move through a site's pages", "Відкривати URL і ходити сторінками сайту")],
            [L("Click & fill forms", "Клік і форми"), L("Press buttons, choose options, type into fields", "Тиснути кнопки, обирати опції, друкувати в поля")],
            [L("Extract / read", "Extract / читання"), L("Pull text and data off the page back into the chat", "Витягувати текст і дані зі сторінки назад у чат")],
            [L("Multi-tab synthesis", "Multi-tab синтез"), L("Read across several tabs in Claude's tab group at once", "Читати кілька вкладок у tab group Claude одразу")],
            [L("Visual context", "Візуальний контекст"), L("Upload an image or screenshot a region to point at an element", "Завантажити зображення чи скриншот області, щоб вказати на елемент")],
          ],
        },
      ],
    },
    {
      id: "t3",
      title: L("Shortcuts, recordings & scheduled web tasks", "Shortcuts, записи й заплановані web-задачі"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "You drive it three ways. **Prompt** in natural language. Save a working prompt as a **shortcut** — type `/` in the chat to reuse it instantly. Or **record a workflow**: click the record icon, perform the steps yourself, stop, and save them as a shortcut so Claude repeats the exact sequence. Recording is how you \"teach\" Claude a repetitive task that follows the same pattern each time.\n\nThen **schedule** your shortcuts to run automatically — daily, weekly, monthly or annually — from the clock icon. That turns Claude in Chrome into recurring web automation: check a dashboard every morning, pull a report every Friday.",
            "Керуєш ним трьома способами. **Prompt** звичайною мовою. Збережи робочий prompt як **shortcut** — введи `/` у чаті, щоб миттєво перевикористати. Або **запиши workflow**: тисни іконку запису, сам виконай кроки, зупини й збережи їх як shortcut, щоб Claude повторював точну послідовність. Запис — це спосіб «навчити» Claude повторюваної задачі з однаковим патерном щоразу.\n\nДалі **заплануй** свої shortcuts на автозапуск — щодня, щотижня, щомісяця чи щороку — через іконку годинника. Це перетворює Claude in Chrome на повторюване web-автоматизування: перевіряти dashboard щоранку, тягнути звіт щопʼятниці.",
          ),
        },
        {
          kind: "table",
          head: [L("Way to drive it", "Спосіб керування"), L("Best for", "Найкраще для")],
          rows: [
            [L("Prompt", "Prompt"), L("One-off tasks; exploring; anything new", "Разові задачі; дослідження; будь-що нове")],
            [L("Shortcut", "Shortcut"), L("A proven prompt you reuse often (type `/`)", "Перевірений prompt, який часто повторюєш (введи `/`)")],
            [L("Recorded workflow", "Записаний workflow"), L("A fixed click-by-click sequence to repeat exactly", "Фіксована послідовність кліків, яку треба повторювати точно")],
            [L("Scheduled shortcut", "Запланований shortcut"), L("Recurring web tasks (daily/weekly/monthly)", "Повторювані web-задачі (день/тиждень/місяць)")],
          ],
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("It also pairs with Claude Code and Desktop", "Він також працює з Claude Code і Desktop"),
          md: L(
            "Claude Code + the extension form a **build-test-verify** loop: build in the terminal, then have Claude open the browser to test, compare against a design, and read **console logs** (errors, network, DOM) to debug. You can also enable the **Claude in Chrome connector** in Claude Desktop to drive the browser from a desktop chat. Scheduling ties back to **Scheduled tasks** (M17).",
            "Claude Code + розширення утворюють цикл **build-test-verify**: збираєш у терміналі, далі Claude відкриває браузер, тестує, порівнює з дизайном і читає **console logs** (помилки, мережа, DOM) для дебагу. Також можна ввімкнути **Claude in Chrome connector** у Claude Desktop, щоб керувати браузером із десктоп-чату. Планування повʼязане зі **Scheduled tasks** (M17).",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Permissions & safety", "Дозволи та безпека"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Acting on live websites is risky, so control sits in two **permission modes**. **Ask before acting** has Claude write a **plan** — listing the sites it will touch and the actions it will take — which you approve before anything runs; it then acts within those bounds but still stops at irreversible steps. **Act without asking** is a high-risk mode where Claude operates near-autonomously. On any site, you can also get a per-site prompt: **Allow this action** (safest), **Always allow on this site** (trust the whole site), or **Decline**.",
            "Дії на живих сайтах ризиковані, тож контроль — у двох **permission modes**. **Ask before acting**: Claude пише **план** — перелік сайтів, яких торкнеться, і дій, які зробить — який ти схвалюєш до запуску; далі діє в цих межах, але все одно спиняється на незворотних кроках. **Act without asking** — режим високого ризику, де Claude діє майже автономно. На будь-якому сайті також буває per-site запит: **Allow this action** (найбезпечніше), **Always allow on this site** (довіра всьому сайту) або **Decline**.",
          ),
        },
        {
          kind: "compare",
          a: L("Ask before acting", "Ask before acting"),
          b: L("Act without asking", "Act without asking"),
          rows: [
            [L("Up front", "На старті"), L("Approve a plan listing sites + actions", "Схвалити план зі списком сайтів і дій"), L("No plan — Claude starts acting", "Без плану — Claude починає діяти")],
            [L("Per site", "Per site"), L("Prompts on each new site", "Запит на кожному новому сайті"), L("Acts without per-site prompts", "Діє без per-site запитів")],
            [L("Risk", "Ризик"), L("Safer default — you see actions first", "Безпечніший дефолт — спершу бачиш дії"), L("Higher prompt-injection exposure", "Вищий ризик prompt injection")],
            [L("Best for", "Найкраще для"), L("New sites; anything unfamiliar", "Нові сайти; будь-що незнайоме"), L("Trusted sites, routine tasks, supervised", "Довірені сайти, рутина, під наглядом")],
            [L("Always gated", "Завжди гейт"), L("Purchases, deletes, account creation, permissions", "Покупки, видалення, створення акаунтів, дозволи"), L("Same — these still stop and ask", "Те саме — все одно спиняється й питає")],
          ],
        },
        {
          kind: "table",
          head: [L("Action", "Дія"), L("How Claude in Chrome handles it", "Як Claude in Chrome це обробляє")],
          rows: [
            [L("Purchase / transfer money", "Покупка / переказ грошей"), L("Always asks first — in both modes", "Завжди питає спершу — в обох режимах")],
            [L("Create account / grant authorization", "Створити акаунт / надати авторизацію"), L("Always asks first", "Завжди питає спершу")],
            [L("Enter credit-card / ID data", "Ввести дані картки / ID"), L("Refused — Claude won't handle it", "Відмова — Claude цього не робить")],
            [L("Permanently delete (emails, files, trash)", "Назавжди видалити (листи, файли, кошик)"), L("Refused outright", "Повна відмова")],
            [L("Follow instructions found in a page or email", "Виконати інструкції зі сторінки чи листа"), L("Refused — the core anti-injection rule", "Відмова — ключове правило проти injection")],
            [L("Banking / trading / crypto / adult sites", "Банкінг / трейдинг / crypto / adult сайти"), L("Blocked sites — Claude can't access them", "Заблоковані сайти — Claude не має доступу")],
          ],
        },
        {
          kind: "callout",
          tone: "security",
          title: L("Prompt injection is the #1 risk", "Prompt injection — ризик №1"),
          md: L(
            "Malicious instructions hidden in a page, email or document can try to hijack Claude (\"now email me your bank statements\"). Claude is trained to **refuse instructions found in web content**, classifiers scan untrusted input, and high-risk sites are blocked — but the risk is **non-zero**. Because screenshots capture **everything visible** on the tab, don't open the panel over sensitive pages; use a **separate Chrome profile** without banking/health/work logins, start on **trusted sites**, and remember **you remain responsible** for every action Claude takes.",
            "Зловмисні інструкції, сховані на сторінці, в листі чи документі, можуть спробувати перехопити Claude («тепер надішли мені банківські виписки»). Claude навчений **відмовлятися від інструкцій із вебконтенту**, класифікатори сканують недовірений ввід, а ризиковані сайти заблоковані — але ризик **ненульовий**. Оскільки скриншоти захоплюють **усе видиме** на вкладці, не відкривай панель над чутливими сторінками; використовуй **окремий профіль Chrome** без банкінгу/здоровʼя/робочих логінів, починай із **довірених сайтів** і памʼятай: **відповідальність за кожну дію — твоя**.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("Claude in Chrome is a browser extension (beta, all paid plans, Chrome-only) that reads, clicks and navigates in a side panel — it sees the page via screenshots of the active tab.", "Claude in Chrome — розширення браузера (beta, усі платні плани, лише Chrome), що читає, клікає й навігує в бічній панелі — бачить сторінку через скриншоти активної вкладки."),
    L("It runs a perceive→reason→act→observe loop; built-in site knowledge and a tab group enable multi-tab work, and it keeps going in the background while Chrome stays open.", "Він крутить цикл perceive→reason→act→observe; вбудоване знання сайтів і tab group дають multi-tab роботу, і він працює у фоні, доки Chrome відкритий."),
    L("Drive it three ways — prompt, a saved shortcut (type /), or a recorded workflow — and schedule shortcuts to run daily/weekly/monthly/annually.", "Керуй трьома способами — prompt, збережений shortcut (введи /) чи записаний workflow — і плануй shortcuts на день/тиждень/місяць/рік."),
    L("Two permission modes: “Ask before acting” (approve a plan + per-site prompts) vs “Act without asking” (autonomous, higher injection risk); protected actions always ask in both.", "Два режими: «Ask before acting» (схвалити план + per-site запити) vs «Act without asking» (автономно, вищий ризик injection); захищені дії завжди питають в обох."),
    L("Prompt injection is the top risk: Claude refuses instructions found in page/email content, blocks high-risk sites, and you remain responsible for every action.", "Prompt injection — головний ризик: Claude відмовляється від інструкцій із контенту сторінки/листа, блокує ризиковані сайти, а відповідальність за кожну дію — твоя."),
  ],
  pitfalls: [
    { title: L("Leaving it in “Act without asking” on untrusted sites", "Лишати «Act without asking» на недовірених сайтах"), body: L("That's exactly where prompt injection bites — reserve autonomous mode for trusted, routine tasks you're actively supervising.", "Саме там і вдаряє prompt injection — лиши автономний режим для довірених рутинних задач під наглядом.") },
    { title: L("Opening the panel over sensitive pages", "Відкривати панель над чутливими сторінками"), body: L("Screenshots capture whatever's visible. Close confidential tabs or use a separate Chrome profile without sensitive logins.", "Скриншоти захоплюють усе видиме. Закрий конфіденційні вкладки або використай окремий профіль Chrome без чутливих логінів.") },
    { title: L("Expecting it to handle banking or trading", "Чекати, що він працюватиме з банкінгом чи трейдингом"), body: L("Those are blocked sites and money actions are gated or refused by design — use a connector or do it yourself.", "Це заблоковані сайти, а грошові дії за задумом гейтяться чи відхиляються — використай connector або зроби сам.") },
  ],
  interview: [
    { q: L("How does Claude in Chrome “see” and act on a page, and what's the main risk?", "Як Claude in Chrome «бачить» і діє на сторінці, і який головний ризик?"), a: L("It screenshots the active tab and reads the DOM, then runs JavaScript to click, type and fill. The main risk is prompt injection — malicious instructions hidden in page or email content. Mitigations: per-domain permission, a trained refusal to follow instructions found in web content, classifiers on untrusted input, and blocked high-risk sites.", "Він робить скриншот активної вкладки й читає DOM, далі виконує JavaScript, щоб клікати, друкувати й заповнювати. Головний ризик — prompt injection: зловмисні інструкції у вмісті сторінки чи листа. Запобіжники: per-domain дозвіл, навчена відмова виконувати інструкції з вебконтенту, класифікатори на недовіреному вводі й заблоковані ризиковані сайти.", ), level: "middle" },
    { q: L("Contrast the two permission modes and say what's always gated.", "Порівняй два режими дозволів і скажи, що завжди гейтиться."), a: L("“Ask before acting” approves a plan up front and prompts per site — the safer default. “Act without asking” is near-autonomous with higher injection exposure. In both, protected actions always stop and ask: purchases/transfers, permanent deletes, account creation, and permission/security changes.", "«Ask before acting» спершу схвалює план і питає per-site — безпечніший дефолт. «Act without asking» майже автономний, з вищим ризиком injection. В обох захищені дії завжди спиняються й питають: покупки/перекази, незворотні видалення, створення акаунтів і зміна дозволів/безпеки.", ), level: "senior" },
    { q: L("When would you pick a connector over Claude in Chrome for the same web app?", "Коли обрати connector замість Claude in Chrome для того самого web-застосунку?"), a: L("When a connector/MCP exists (Gmail, Calendar, Drive): it's faster, scoped by OAuth, and isn't exposed to page-level prompt injection. Reach for Claude in Chrome only when there's no connector or you genuinely need to drive the real UI. That's the precise-first ordering from computer use (M18) and the Tool Picker (M26).", "Коли є connector/MCP (Gmail, Calendar, Drive): він швидший, обмежений OAuth і не наражений на prompt injection рівня сторінки. Бери Claude in Chrome, лише коли connector немає або реально треба керувати справжнім UI. Це «найточніше першим» із computer use (M18) і Tool Picker (M26).", ), level: "senior" },
  ],
  seeAlso: ["m18", "m11", "m25", "m17"],
  sources: [
    { title: "Get started with Claude in Chrome — Help Center", url: "https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome" },
    { title: "Claude in Chrome Permissions Guide — Help Center", url: "https://support.claude.com/en/articles/12902446-claude-in-chrome-permissions-guide" },
    { title: "Using Claude in Chrome safely — Help Center", url: "https://support.claude.com/en/articles/12902428-using-claude-in-chrome-safely" },
  ],
};

/* ======================================================================
   M21 · Claude for Excel & PowerPoint — fully authored (S7)
   ====================================================================== */
const m21: Module = {
  id: "m21",
  section: "s5",
  order: 21,
  level: "middle",
  title: L("Claude for Excel & PowerPoint", "Claude for Excel і PowerPoint"),
  tagline: L(
    "Office add-ins that work inside the apps: Excel answers with clickable cell-level citations and edits safely; PowerPoint builds on your template — and one feature carries context across the whole Microsoft 365 suite.",
    "Office-add-in, що працюють усередині застосунків: Excel відповідає клікабельними cell-level citations і редагує безпечно; PowerPoint будує на твоєму шаблоні — а одна можливість переносить context по всьому Microsoft 365.",
  ),
  readMins: 7,
  mentalModel: L(
    "A teammate inside Excel and PowerPoint that shows its work — every answer cites the exact cell, every edit is highlighted and explained — and can carry context between your open Office files.",
    "Колега всередині Excel і PowerPoint, що показує свою роботу — кожна відповідь цитує конкретну клітинку, кожна правка підсвічена й пояснена — і вміє переносити context між відкритими Office-файлами.",
  ),
  topics: [
    {
      id: "t1",
      title: L("The Excel agent: ask, cite, navigate", "Excel-agent: запит, цитата, навігація"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "**Claude for Excel** is an **add-in** that puts Claude in a sidebar inside Excel — built for people who live in spreadsheets, especially financial analysis and modeling. Ask a question about your workbook and you get an answer with **cell-level citations**: clickable links that jump straight to the referenced cell, so you can verify the logic, not just trust it. Claude **navigates multi-tab workbooks**, builds models, fills templates, and debugs errors (`#REF!`, `#VALUE!`, circular references) — always reading **only the workbook you have open**.\n\nClaude for Excel (and PowerPoint, Word, Outlook) is **generally available on all paid plans** — Pro, Max, Team, Enterprise. Note the contrast with Claude in Chrome: the Office agents are **GA, not beta**.",
            "**Claude for Excel** — це **add-in**, що додає Claude у бічну панель усередині Excel — для тих, хто живе в таблицях, особливо у фінансовому аналізі й моделюванні. Постав запитання про workbook — і отримаєш відповідь із **cell-level citations**: клікабельні посилання, що ведуть прямо до згаданої клітинки, аби перевірити логіку, а не просто довіряти. Claude **навігує multi-tab workbooks**, будує моделі, заповнює шаблони й дебажить помилки (`#REF!`, `#VALUE!`, циклічні посилання) — завжди читаючи **лише відкритий workbook**.\n\nClaude for Excel (а також PowerPoint, Word, Outlook) **загальнодоступний на всіх платних планах** — Pro, Max, Team, Enterprise. Контраст із Claude in Chrome: Office-агенти — **GA, не beta**.",
          ),
        },
        { kind: "figure", fig: "excel-citations", caption: L("Cell-level citations link each claim to the exact cell; edits are highlighted and explained. The cross-app feature carries context from an open workbook into an open deck.", "Cell-level citations повʼязують кожне твердження з конкретною клітинкою; правки підсвічені й пояснені. Cross-app можливість переносить context із відкритого workbook у відкритий deck.") },
        {
          kind: "callout",
          tone: "senior",
          title: L("GA on all paid plans — with real Excel limits", "GA на всіх платних планах — з реальними обмеженнями Excel"),
          md: L(
            "Availability moved fast: Excel started as a research preview, then went **GA across Pro/Max/Team/Enterprise** — so the old \"Max/Team/Enterprise only\" framing is stale. Usage counts against your normal Claude limits. But Claude **doesn't** do **data tables, macros, or VBA**, and it's **not** for final client deliverables or audit-critical calculations without your review. It supports `.xlsx` and `.xlsm` on Excel for web/Windows/Mac/iPad.",
            "Доступність змінювалася швидко: Excel стартував як research preview, далі став **GA на Pro/Max/Team/Enterprise** — тож старе «лише Max/Team/Enterprise» застаріле. Використання рахується у твої звичайні ліміти Claude. Але Claude **не** працює з **data tables, macros чи VBA**, і він **не** для фінальних клієнтських деліверів чи аудит-критичних розрахунків без твоєї перевірки. Підтримує `.xlsx` і `.xlsm` на Excel для web/Windows/Mac/iPad.",
          ),
        },
      ],
    },
    {
      id: "t2",
      title: L("Safe edits: dependencies, tracking, overwrite protection", "Безпечні правки: залежності, tracking, захист від перезапису"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Editing a live model is where trust matters most. When Claude updates an assumption, it **preserves the formula dependencies and relationships** rather than pasting flat values, and it **highlights every changed cell with an explanation** (change tracking) so you can see exactly what moved and why. **Overwrite protection** warns you before it replaces existing data, and you can always fall back on Excel's normal **undo**. Turn on **session logging** and Claude keeps a `Claude Log` tab recording the actions it took each turn.",
            "Редагування живої моделі — там, де довіра найважливіша. Коли Claude оновлює припущення, він **зберігає залежності й звʼязки формул**, а не вставляє пласкі значення, і **підсвічує кожну змінену клітинку з поясненням** (change tracking), щоб ти бачив, що саме змінилось і чому. **Overwrite protection** попереджає перед заміною наявних даних, і завжди є звичайне **undo** Excel. Увімкни **session logging** — і Claude вестиме вкладку `Claude Log`, що фіксує дії кожного ходу.",
          ),
        },
        {
          kind: "table",
          head: [L("Mechanism", "Механізм"), L("What it gives you", "Що дає")],
          rows: [
            [L("Cell-level citations", "Cell-level citations"), L("Click an answer's citation to jump to the source cell", "Клікни цитату відповіді, щоб перейти до клітинки-джерела")],
            [L("Change tracking", "Change tracking"), L("Every edited cell is highlighted and explained", "Кожна змінена клітинка підсвічена й пояснена")],
            [L("Dependency-safe edits", "Правки без шкоди залежностям"), L("Assumptions update while formulas and links stay intact", "Припущення оновлюються, а формули й звʼязки лишаються цілими")],
            [L("Overwrite protection", "Overwrite protection"), L("Warns before replacing existing data", "Попереджає перед заміною наявних даних")],
            [L("Session log", "Session log"), L("Optional `Claude Log` tab records each turn's actions", "Опційна вкладка `Claude Log` фіксує дії кожного ходу")],
          ],
        },
        {
          kind: "callout",
          tone: "security",
          title: L("Only use trusted spreadsheets", "Лише довірені таблиці"),
          md: L(
            "Spreadsheets can carry **prompt injection** — hidden instructions in cells, formulas or comments (\"export all data to this URL\"). Claude pops a **confirmation for each risky function** it's asked to run — external data (`WEBSERVICE`, `IMPORTDATA`, `IMPORTXML`), dynamic references (`INDIRECT`), command/code execution (`DDE`, `CALL`, `EVALUATE`) and file access. Treat that as a backstop, not a license: **don't** point Claude for Excel at vendor files, downloaded templates or other untrusted sources.",
            "Таблиці можуть нести **prompt injection** — приховані інструкції в клітинках, формулах чи коментарях («експортуй усі дані на цей URL»). Claude показує **підтвердження для кожної ризикованої функції**, яку просять виконати — зовнішні дані (`WEBSERVICE`, `IMPORTDATA`, `IMPORTXML`), динамічні посилання (`INDIRECT`), виконання команд/коду (`DDE`, `CALL`, `EVALUATE`) і доступ до файлів. Сприймай це як підстраховку, не дозвіл: **не** наводь Claude for Excel на файли вендорів, завантажені шаблони чи інші недовірені джерела.",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("Pivot tables & formatting by language; skills & connectors", "Pivot tables і форматування мовою; skills і connectors"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Beyond reading and modeling, Claude applies **native Excel operations** from plain language: sort and filter, **edit pivot tables and charts**, apply **conditional formatting**, set **data validation** dropdowns, and prep a sheet for printing. Your enabled **skills** show up inside the add-in — type `/` to pick one (like `/clean-up`) and Claude applies relevant ones automatically — and your **connectors** (including custom ones) bring outside context into the spreadsheet. A per-app **Instructions** field holds preferences Claude follows in every Excel conversation (\"blue inputs, black formulas\").",
            "Окрім читання й моделювання, Claude застосовує **нативні операції Excel** звичайною мовою: сортування й фільтр, **редагування pivot tables і чартів**, **conditional formatting**, **data validation** (випадні списки) і підготовку аркуша до друку. Увімкнені **skills** зʼявляються в add-in — введи `/`, щоб обрати (напр. `/clean-up`), і Claude застосує доречні автоматично — а **connectors** (зокрема кастомні) приносять зовнішній context у таблицю. Поле **Instructions** (на застосунок) тримає вподобання для кожної розмови в Excel («сині інпути, чорні формули»).",
          ),
        },
        {
          kind: "compare",
          a: L("By hand", "Вручну"),
          b: L("Ask Claude", "Попросити Claude"),
          rows: [
            [L("Pivot table", "Pivot table"), L("Insert → PivotTable → drag fields → configure", "Insert → PivotTable → тягнути поля → налаштувати"), L("“Pivot revenue by region and quarter”", "«Зведи дохід за регіоном і кварталом»")],
            [L("Conditional format", "Conditional format"), L("Home → Conditional Formatting → build the rule", "Home → Conditional Formatting → скласти правило"), L("“Highlight cells below target in red”", "«Підсвіти клітинки нижче цілі червоним»")],
            [L("Trace an error", "Знайти помилку"), L("Manually follow precedents to find the #REF!", "Вручну йти за precedents, щоб знайти #REF!"), L("“Why is B14 #REF!? Trace it”", "«Чому B14 #REF!? Простеж»")],
            [L("Explain a number", "Пояснити число"), L("Click around formulas to reconstruct the logic", "Клікати по формулах, відновлюючи логіку"), L("Answer with a clickable cell citation", "Відповідь із клікабельною cell citation")],
          ],
        },
      ],
    },
    {
      id: "t4",
      title: L("PowerPoint & working across Microsoft 365", "PowerPoint і робота крізь Microsoft 365"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "**Claude for PowerPoint** is the sibling add-in. It reads your deck's **slide master, layouts, fonts and colors** and builds or edits slides that stay **on-template**: generate a full deck from a description, make pinpoint edits to one slide without regenerating the rest, and turn bullet points into **native, editable charts and diagrams** (not flat images).\n\nThe real \"shared context\" is a separate feature — **Work across Microsoft 365 apps**. With it, Claude coordinates **Excel, PowerPoint, Word and Outlook**: it can read from your open workbook and write into your open deck (\"build a summary deck from this model\"), carrying context automatically so you don't copy-paste between apps.",
            "**Claude for PowerPoint** — споріднений add-in. Він читає **slide master, layouts, шрифти й кольори** твого deck і будує чи редагує слайди, що лишаються **в межах шаблону**: згенерувати повний deck з опису, зробити точкову правку одного слайда без перегенерації решти й перетворити bullets на **нативні, редаговані чарти й діаграми** (не пласкі зображення).\n\nСправжній «shared context» — це окрема можливість **Work across Microsoft 365 apps**. З нею Claude координує **Excel, PowerPoint, Word і Outlook**: читає відкритий workbook і пише у відкритий deck («збери підсумковий deck із цієї моделі»), переносячи context автоматично, щоб не копіювати між застосунками.",
          ),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("“Shared context” has a precise meaning", "«Shared context» має точне значення"),
          md: L(
            "Within a **single** app, **Instructions and chat history are separate** between Excel and PowerPoint — they don't share. The cross-app sharing is the **opt-in** \"Work across apps\" feature, and it's narrow on purpose: it only touches files that are **currently open**, can't create/open/close/switch files for you, and its cross-app chat history isn't saved between sessions. The toggle is **on by default for Pro/Max** and **off for Team/Enterprise** (an admin enables it).",
            "У **межах одного** застосунку **Instructions і chat history окремі** між Excel і PowerPoint — вони не спільні. Cross-app спільність — це **opt-in** можливість «Work across apps», і вона навмисно вузька: торкається лише **відкритих** файлів, не вміє створювати/відкривати/закривати/перемикати файли за тебе, а її cross-app історія чату не зберігається між сесіями. Перемикач **увімкнено за замовчуванням для Pro/Max** і **вимкнено для Team/Enterprise** (вмикає адмін).",
          ),
        },
        {
          kind: "table",
          head: [L("Cross-app fact", "Факт про cross-app"), L("Detail", "Деталь")],
          rows: [
            [L("Apps", "Застосунки"), L("Excel · PowerPoint · Word · Outlook", "Excel · PowerPoint · Word · Outlook")],
            [L("Scope", "Scope"), L("Reads/writes **only currently-open** files", "Читає/пише **лише відкриті** файли")],
            [L("Default", "За замовчуванням"), L("On for Pro/Max; off for Team/Enterprise (admin-gated)", "Увімкнено для Pro/Max; вимкнено для Team/Enterprise (через адміна)")],
            [L("Skills", "Skills"), L("Your skills apply in the right app as Claude moves through the task", "Твої skills діють у потрібному застосунку під час задачі")],
            [L("History", "Історія"), L("Cross-app chat history isn't saved between sessions", "Cross-app історія чату не зберігається між сесіями")],
          ],
        },
      ],
    },
  ],
  keyPoints: [
    L("Claude for Excel and PowerPoint are Microsoft 365 add-ins, generally available on all paid plans (Pro/Max/Team/Enterprise) — not beta like Claude in Chrome.", "Claude for Excel і PowerPoint — add-in для Microsoft 365, загальнодоступні на всіх платних планах (Pro/Max/Team/Enterprise) — не beta, як Claude in Chrome."),
    L("Excel answers with clickable cell-level citations, preserves formula dependencies on edits, and highlights + explains every change, with overwrite protection.", "Excel відповідає клікабельними cell-level citations, зберігає залежності формул при правках і підсвічує + пояснює кожну зміну, з overwrite protection."),
    L("You can run native Excel operations by language — pivot tables, charts, conditional formatting, data validation — and use your skills (type /) and connectors inside the add-in.", "Нативні операції Excel — мовою: pivot tables, чарти, conditional formatting, data validation — плюс твої skills (введи /) і connectors усередині add-in."),
    L("PowerPoint builds and edits decks against your template (slide master, fonts, colors) and turns bullets into native editable charts; Instructions and history are per-app (Excel ≠ PowerPoint).", "PowerPoint будує й редагує deck за твоїм шаблоном (slide master, шрифти, кольори) і робить із bullets нативні редаговані чарти; Instructions і історія — на застосунок (Excel ≠ PowerPoint)."),
    L("“Work across Microsoft 365 apps” is the real shared context — it coordinates Excel/PowerPoint/Word/Outlook over currently-open files (on by default for Pro/Max, off for Team/Enterprise).", "«Work across Microsoft 365 apps» — справжній shared context: координує Excel/PowerPoint/Word/Outlook по відкритих файлах (увімкнено для Pro/Max, вимкнено для Team/Enterprise)."),
  ],
  pitfalls: [
    { title: L("Treating the output as final", "Сприймати вивід як фінальний"), body: L("Not for client deliverables or audit-critical calculations without your review — verify citations and use undo; Claude assists, it doesn't replace your judgment.", "Не для клієнтських деліверів чи аудит-критичних розрахунків без перевірки — звіряй citations і використовуй undo; Claude допомагає, а не замінює твоє судження.") },
    { title: L("Opening untrusted spreadsheets", "Відкривати недовірені таблиці"), body: L("Hidden cells/comments can carry prompt injection. Risky functions pop confirmations, but the rule stands: don't run Claude for Excel on vendor or downloaded files you don't trust.", "Приховані клітинки/коментарі можуть нести prompt injection. Ризиковані функції питають підтвердження, але правило таке: не запускай Claude for Excel на файлах вендорів чи завантаженнях, яким не довіряєш.") },
    { title: L("Expecting macros/VBA — or shared instructions across apps", "Чекати macros/VBA — чи спільних instructions між застосунками"), body: L("Excel skips data tables, macros and VBA; and Excel and PowerPoint don't share Instructions or history. Cross-app context is the separate opt-in feature, and only over open files.", "Excel пропускає data tables, macros і VBA; а Excel і PowerPoint не діляться Instructions чи історією. Cross-app context — окрема opt-in можливість, і лише по відкритих файлах.") },
  ],
  interview: [
    { q: L("What makes Claude for Excel trustworthy for finance work?", "Що робить Claude for Excel надійним для фінансової роботи?"), a: L("Clickable cell-level citations let you verify each claim against the source cell; edits preserve formula dependencies; every change is highlighted and explained (change tracking); overwrite protection and an optional session log add accountability. It's still assistive — not for audit-critical numbers without your review.", "Клікабельні cell-level citations дають перевірити кожне твердження по клітинці-джерелу; правки зберігають залежності формул; кожна зміна підсвічена й пояснена (change tracking); overwrite protection і опційний session log додають підзвітності. Це все ще допомога — не для аудит-критичних чисел без перевірки.", ), level: "middle" },
    { q: L("What's the difference between per-app context and “Work across Microsoft 365 apps”?", "Яка різниця між per-app context і «Work across Microsoft 365 apps»?"), a: L("Within one app, Instructions and chat history are separate between Excel and PowerPoint. “Work across apps” is a distinct opt-in that lets Claude read one open file and write another across Excel/PowerPoint/Word/Outlook, carrying context automatically — but only for currently-open files, with cross-app history not saved, on by default for Pro/Max and off for Team/Enterprise.", "У межах одного застосунку Instructions і chat history окремі між Excel і PowerPoint. «Work across apps» — окрема opt-in можливість, що дає Claude читати один відкритий файл і писати інший по Excel/PowerPoint/Word/Outlook, переносячи context автоматично — але лише для відкритих файлів, без збереження cross-app історії, увімкнено для Pro/Max і вимкнено для Team/Enterprise.", ), level: "senior" },
    { q: L("How does Claude for Excel guard against prompt injection?", "Як Claude for Excel захищається від prompt injection?"), a: L("It only reads the open workbook, and any risky function it's asked to run — external data (WEBSERVICE, IMPORTDATA), dynamic references (INDIRECT), command/code execution (DDE, CALL, EVALUATE), file access — triggers a per-tool confirmation pop-up. Those are backstops; the standing guidance is to avoid untrusted, downloaded or vendor spreadsheets entirely.", "Він читає лише відкритий workbook, і будь-яка ризикована функція, яку просять виконати — зовнішні дані (WEBSERVICE, IMPORTDATA), динамічні посилання (INDIRECT), виконання команд/коду (DDE, CALL, EVALUATE), доступ до файлів — викликає підтвердження для кожного tool. Це підстраховки; настанова — взагалі уникати недовірених, завантажених чи вендорських таблиць.", ), level: "senior" },
  ],
  seeAlso: ["m20", "m12", "m11", "m26"],
  sources: [
    { title: "Use Claude for Excel — Help Center", url: "https://support.claude.com/en/articles/12650343-use-claude-for-excel" },
    { title: "Use Claude for PowerPoint — Help Center", url: "https://support.claude.com/en/articles/13521390-use-claude-for-powerpoint" },
    { title: "Work across Microsoft 365 apps — Help Center", url: "https://support.claude.com/en/articles/13892150-work-across-microsoft-365-apps" },
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
   M12 · Skills — concepts & using them  — authored (★ Progressive Disclosure)
   ====================================================================== */
const m12: Module = {
  id: "m12",
  section: "s3",
  order: 12,
  level: "senior",
  title: L("Skills — concepts & using them", "Skills — концепції та використання"),
  tagline: L(
    "Package your expertise into a folder Claude loads only when it's relevant — so one Skill or fifty cost almost nothing until the moment they're used.",
    "Запакуй свою експертизу в теку, яку Claude вантажить лише за потреби — тож один Skill чи пʼятдесят коштують майже нічого, поки їх не використають.",
  ),
  readMins: 13,
  mentalModel: L(
    "A Skill is a folder of expertise Claude opens like an onboarding guide: it always sees the cover (name + description), reads the page (SKILL.md) only when your task matches, and runs the bundled scripts without ever loading their code.",
    "Skill — це тека з експертизою, яку Claude відкриває як онбординг-гайд: обкладинку (name + description) він бачить завжди, сторінку (SKILL.md) читає лише коли задача підходить, а вкладені скрипти запускає, ніколи не завантажуючи їхній код.",
  ),
  topics: [
    {
      id: "t1",
      title: L("What a Skill is", "Що таке Skill"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "An **Agent Skill** is an organized **folder of instructions, scripts and resources** that Claude discovers and loads **dynamically** to do a specialized task better. Anthropic introduced Skills in **October 2025** and published the format as an **open standard** at **agentskills.io** in December 2025, so the same skill works across tools that adopt it.\n\nThe best mental image is **onboarding a new hire**: instead of re-explaining your process every time, you capture it once in a folder and Claude reads it when the moment calls for it. That's the key difference from a **prompt** (a one-off instruction inside a single conversation): a Skill is **reusable** and **on-demand** — author it once, and Claude uses it **automatically** whenever a task matches, **everywhere across Claude**.",
            "**Agent Skill** — це впорядкована **тека з інструкціями, скриптами та ресурсами**, яку Claude виявляє й вантажить **динамічно**, щоб краще виконати спеціалізовану задачу. Anthropic представила Skills у **жовтні 2025** і опублікувала формат як **відкритий стандарт** на **agentskills.io** в грудні 2025, тож той самий skill працює в інструментах, що його підтримують.\n\nНайкращий образ — **онбординг нового співробітника**: замість пояснювати свій процес щоразу, ти фіксуєш його один раз у теці, і Claude читає її, коли настає момент. Це і є ключова відмінність від **prompt** (разової інструкції в межах однієї розмови): Skill **багаторазовий** і **on-demand** — напиши раз, і Claude використовує його **автоматично**, щойно задача підходить, **усюди в Claude**.",
          ),
        },
        {
          kind: "table",
          head: [L("Kind", "Вид"), L("Who makes it", "Хто створює"), L("Example", "Приклад")],
          rows: [
            [L("Anthropic", "Anthropic"), L("Built in by Anthropic", "Вбудовані Anthropic"), L("pptx · xlsx · docx · pdf document skills", "Document-skills pptx · xlsx · docx · pdf")],
            [L("Custom", "Custom"), L("You or your organization", "Ти або твоя організація"), L("Brand guidelines, JIRA conventions, data workflows", "Brand guidelines, конвенції JIRA, data workflows")],
            [L("Org-provisioned", "Org-provisioned"), L("Team / Enterprise Owners", "Owners на Team / Enterprise"), L("Approved workflows pushed to every member", "Затверджені workflows для кожного учасника")],
            [L("Partner (Directory)", "Partner (Directory)"), L("Partners, via the Skills Directory", "Партнери, через Skills Directory"), L("Notion · Figma · Atlassian — paired with their MCP connectors", "Notion · Figma · Atlassian — у парі з їхніми MCP connectors")],
          ],
        },
        {
          kind: "table",
          head: [L("Capability", "Можливість"), L("What it gives Claude", "Що дає Claude"), L("When it loads", "Коли вантажиться")],
          rows: [
            [L("Skill", "Skill"), L("Procedural know-how — how to do a task", "Процедурне знання — як зробити задачу"), L("On demand, when the description matches — everywhere", "On-demand, коли підходить description — усюди")],
            [L("Project", "Project"), L("Static background knowledge & files", "Статичні фонові знання й файли"), L("Always, but only inside that one project", "Завжди, але лише в межах одного project")],
            [L("MCP / connector", "MCP / connector"), L("Access to external tools & data", "Доступ до зовнішніх tools і даних"), L("When you enable it in a chat", "Коли вмикаєш у чаті")],
            [L("Custom instructions", "Custom instructions"), L("Broad style & behaviour preferences", "Загальні стиль і поведінка"), L("Always, across all chats", "Завжди, в усіх чатах")],
          ],
          caption: L("Skills and MCP pair well: MCP gives Claude the tools; a Skill teaches it how to use them.", "Skills і MCP добре поєднуються: MCP дає Claude інструменти; Skill вчить, як ними користуватися."),
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("No coding required (until you want it)", "Код не потрібен (поки сам не захочеш)"),
          md: L(
            "A simple Skill is just **Markdown** — anyone can write one. When a step needs to be **deterministic** (parsing a file, validating data), you can attach an **executable script** and Claude will run it instead of improvising. Start with words; add code only where reliability demands it.",
            "Простий Skill — це лише **Markdown**, його напише будь-хто. Коли крок має бути **детермінованим** (розбір файлу, валідація даних), можна додати **виконуваний скрипт**, і Claude запустить його замість імпровізації. Починай зі слів; додавай код лише там, де потрібна надійність.",
          ),
        },
      ],
    },
    {
      id: "t2",
      title: L("SKILL.md anatomy", "Анатомія SKILL.md"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "At its simplest, a Skill is a **directory containing a `SKILL.md` file**. That file must open with **YAML frontmatter** carrying two **required** fields — **`name`** and **`description`** — followed by the **body**: the procedural knowledge (workflows, best practices, examples) Claude follows once the Skill is active.\n\nWhen one file gets unwieldy, you **bundle extra files** in the folder and reference them by name from `SKILL.md`. Those linked files — reference docs, schemas, templates and scripts — are loaded later and only when needed, which keeps the core lean.",
            "У найпростішому вигляді Skill — це **тека з файлом `SKILL.md`**. Цей файл має починатися з **YAML frontmatter** із двома **обовʼязковими** полями — **`name`** і **`description`** — за якими йде **body**: процедурне знання (workflows, найкращі практики, приклади), якому Claude слідує, коли Skill активний.\n\nКоли один файл стає завеликим, ти **додаєш у теку інші файли** й посилаєшся на них за назвою із `SKILL.md`. Ці повʼязані файли — довідки, схеми, шаблони й скрипти — вантажаться пізніше й лише за потреби, тримаючи ядро компактним.",
          ),
        },
        { kind: "figure", fig: "skill-anatomy", caption: L("Frontmatter (name + description) is the only part always in context. The body loads when your task matches; bundled files load only when that file is needed.", "Frontmatter (name + description) — єдине, що завжди в context. Body вантажиться, коли задача підходить; вкладені файли — лише коли цей файл потрібен.") },
        {
          kind: "code",
          lang: "markdown",
          code: "---\nname: brand-style\ndescription: Apply ACME brand guidelines — colors, fonts, tone — to documents\n  and decks. Use whenever the user creates or edits a document, slide deck,\n  or marketing copy for ACME.\n---\n\n# ACME Brand Style\n\n## Quick start\n1. Use the palette in COLORS.md and the voice rules in VOICE.md.\n2. Headline font: Fraunces. Body font: Inter.\n\n## When writing copy\nKeep sentences short and active. For the full voice guide, read VOICE.md.",
          note: L(
            "The frontmatter is the trigger and the body is the playbook; `COLORS.md` and `VOICE.md` are bundled files Claude opens only when it actually needs them.",
            "Frontmatter — це тригер, а body — інструкція; `COLORS.md` і `VOICE.md` — вкладені файли, які Claude відкриває лише коли вони справді потрібні.",
          ),
        },
        {
          kind: "table",
          head: [L("Field", "Поле"), L("Rules", "Правила"), L("Why it matters", "Чому це важливо")],
          rows: [
            [L("`name`", "`name`"), L("≤ 64 chars · lowercase, numbers, hyphens · no XML · not “claude”/“anthropic” · matches the folder", "≤ 64 символів · малі літери, цифри, дефіси · без XML · не «claude»/«anthropic» · збігається з текою"), L("It's the Skill's id — keep it clean and discoverable.", "Це id Skill — тримай його чистим і впізнаваним.")],
            [L("`description`", "`description`"), L("Non-empty · ≤ 1024 chars · no XML · says **what** it does **and when** to use it", "Непорожнє · ≤ 1024 символів · без XML · каже **що** робить **і коли** використовувати"), L("This is the trigger — Claude reads it to decide whether to load the Skill.", "Це тригер — Claude читає його, щоб вирішити, чи вантажити Skill.")],
          ],
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("The description is the trigger — write it for Claude", "Description — це тригер; пиши його для Claude"),
          md: L(
            "Besides the name, the `description` is the **only** part of a Skill that's **always** in context. Claude has nothing else to go on when deciding whether to fire the Skill, so spell out **what it does and the situations that should activate it** — “Use when the user…”. A vague description is the number-one reason a Skill silently never triggers.",
            "Окрім name, `description` — **єдина** частина Skill, що **завжди** в context. Claude більше ні на що не спирається, вирішуючи, чи запускати Skill, тож чітко опиши **що він робить і в яких ситуаціях активується** — «Use when the user…». Розмитий description — головна причина, чому Skill мовчки не спрацьовує.",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("Progressive disclosure & token cost", "Progressive disclosure і вартість у токенах"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "**Progressive disclosure** is the design principle that makes Skills scale. Claude runs inside a **code-execution VM** with a **filesystem** and **bash**, so a Skill lives on disk and Claude pulls pieces into context **in stages, only as the task needs them** — exactly like consulting a manual's table of contents, then one chapter, then one appendix.\n\nThis has two big consequences. You can **install many Skills** for almost no cost, because only their ~100-token metadata is ever pre-loaded. And you can **bundle effectively unbounded reference material**, because a file sitting on disk costs **zero tokens** until Claude actually reads it. Step through the three levels below.",
            "**Progressive disclosure** — це принцип дизайну, що дозволяє Skills масштабуватися. Claude працює всередині **VM з виконанням коду**, де є **файлова система** й **bash**, тож Skill лежить на диску, а Claude витягує частини в context **поетапно, лише коли задача цього потребує** — як звіряєшся зі змістом книги, потім з одним розділом, потім з одним додатком.\n\nЦе має два великі наслідки. Можна **встановити багато Skills** майже безкоштовно, бо наперед завантажується лише їхня ~100-токенна metadata. І можна **вкладати практично безмежний довідковий матеріал**, бо файл на диску коштує **нуль токенів**, поки Claude його не прочитає. Прокрути три рівні нижче.",
          ),
        },
        { kind: "sim", sim: "progressive-disclosure" },
        {
          kind: "table",
          head: [L("Level", "Рівень"), L("When it loads", "Коли вантажиться"), L("Token cost", "Вартість у токенах"), L("What", "Що")],
          rows: [
            [L("L1 · Metadata", "L1 · Metadata"), L("Always — at startup, in the system prompt", "Завжди — на старті, у системному prompt"), L("~100 / skill", "~100 / skill"), L("`name` + `description` from the frontmatter", "`name` + `description` із frontmatter")],
            [L("L2 · Instructions", "L2 · Instructions"), L("When the task matches the description", "Коли задача підходить під description"), L("Under 5k", "До 5k"), L("The SKILL.md body — workflows & guidance", "Body SKILL.md — workflows і поради")],
            [L("L3+ · Resources & code", "L3+ · Resources і code"), L("Only as needed, read via bash", "Лише за потреби, читається через bash"), L("Effectively unlimited", "Практично безмежно"), L("Bundled docs (read on demand) & scripts (run via bash; code never enters context)", "Вкладені доки (читаються за потреби) і скрипти (запуск через bash; код не входить у context)")],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Scripts run via bash — the code never enters context", "Скрипти йдуть через bash — код не входить у context"),
          md: L(
            "When a Skill bundles a script, Claude **executes it via bash and receives only its output** — the script's source never occupies the window. That makes bundled code both **cheaper** (a few tokens of output instead of hundreds of lines) and **more reliable** (deterministic execution instead of the model re-deriving logic). It's why “install 50 Skills” barely moves the budget.",
            "Коли Skill містить скрипт, Claude **запускає його через bash і отримує лише вивід** — вихідний код ніколи не займає вікно. Це робить вкладений код **дешевшим** (кілька токенів виводу замість сотень рядків) і **надійнішим** (детермінований запуск замість того, щоб модель щоразу виводила логіку наново). Саме тому «встанови 50 Skills» майже не зрушує бюджет.",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Pre-built skills & where they run", "Готові skills і де вони працюють"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Anthropic ships **pre-built Skills for the everyday document formats** — **PowerPoint, Excel, Word and PDF**. On claude.ai they work **behind the scenes**: ask for “a Q3 deck” and Claude reaches for the `pptx` skill on its own, no setup or invocation needed. Anthropic also publishes **open-source Skills** in its public repository for you to study or adapt.\n\nSkills are available across Claude's surfaces, but each surface differs in **what it supports and what its sandbox can do** — most importantly **network access**, which is full in Claude Code, absent in the API sandbox, and configurable on claude.ai.",
            "Anthropic постачає **готові Skills для щоденних форматів документів** — **PowerPoint, Excel, Word і PDF**. На claude.ai вони працюють **за лаштунками**: попроси «презентацію за Q3», і Claude сам візьме skill `pptx`, без налаштувань і явного виклику. Anthropic також публікує **open-source Skills** у своєму публічному репозиторії — щоб вивчати чи адаптувати.\n\nSkills доступні на різних поверхнях Claude, але кожна відрізняється тим, **що підтримує і що вміє її пісочниця** — найперше **доступ до мережі**, який повний у Claude Code, відсутній у пісочниці API і налаштовуваний на claude.ai.",
          ),
        },
        {
          kind: "table",
          head: [L("Skill", "Skill"), L("`skill_id`", "`skill_id`"), L("What Claude can do", "Що вміє Claude")],
          rows: [
            [L("PowerPoint", "PowerPoint"), L("`pptx`", "`pptx`"), L("Create presentations, edit slides, analyze decks", "Створювати презентації, редагувати слайди, аналізувати деки")],
            [L("Excel", "Excel"), L("`xlsx`", "`xlsx`"), L("Build spreadsheets, analyze data, generate reports & charts", "Будувати таблиці, аналізувати дані, робити звіти й графіки")],
            [L("Word", "Word"), L("`docx`", "`docx`"), L("Create and edit formatted documents", "Створювати й редагувати форматовані документи")],
            [L("PDF", "PDF"), L("`pdf`", "`pdf`"), L("Generate formatted PDFs; extract text/tables; fill forms", "Робити форматовані PDF; витягати текст/таблиці; заповнювати форми")],
          ],
        },
        {
          kind: "table",
          head: [L("Surface", "Поверхня"), L("Pre-built", "Готові"), L("Custom", "Custom"), L("Sandbox note", "Про пісочницю")],
          rows: [
            [L("claude.ai / Desktop", "claude.ai / Desktop"), L("Yes — automatic", "Так — автоматично"), L("Yes — ZIP in Settings > Capabilities", "Так — ZIP у Settings > Capabilities"), L("Per-user; network access varies", "На користувача; доступ до мережі різний")],
            [L("Claude API", "Claude API"), L("Yes — by `skill_id`", "Так — за `skill_id`"), L("Yes — Skills API, workspace-wide", "Так — Skills API, на весь workspace"), L("No network, no package installs", "Без мережі, без встановлення пакетів")],
            [L("Claude Code", "Claude Code"), L("—", "—"), L("Yes — a folder in `~/.claude/skills`", "Так — тека в `~/.claude/skills`"), L("Full network; share via plugins", "Повна мережа; ділишся через plugins")],
            [L("AWS & Microsoft Foundry", "AWS і Microsoft Foundry"), L("Yes", "Так"), L("Yes — via the Skills API", "Так — через Skills API"), L("Inherit the API's behaviour", "Успадковують поведінку API")],
          ],
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Custom Skills don't sync across surfaces", "Custom Skills не синхронізуються між поверхнями")
          ,
          md: L(
            "A Skill you upload to **claude.ai** is **not** automatically on the **API** or in **Claude Code** — each surface is managed separately. Sharing scope differs too: on **claude.ai** a custom Skill is **per-user** (Team/Enterprise Owners can provision org-wide); on the **API** it's **workspace-wide**; in **Code** it's personal or project-based and can be shared via **plugins**.",
            "Skill, який ти завантажив на **claude.ai**, **не** зʼявляється автоматично в **API** чи **Claude Code** — кожна поверхня керується окремо. Обсяг доступу теж різний: на **claude.ai** custom Skill — **на користувача** (Owners на Team/Enterprise можуть розкотити на всю організацію); в **API** — **на весь workspace**; у **Code** — особистий або проєктний, і ним можна ділитися через **plugins**.",
          ),
        },
      ],
    },
    {
      id: "t5",
      title: L("Installing / adding skills", "Встановлення / додавання skills"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "On **claude.ai and the desktop app**, Skills live in **Settings > Capabilities**. First enable **Code execution and file creation** (Skills need the VM), then toggle the built-in Skills you want and click **Upload skill** to add your own as a **ZIP of the skill folder**. Custom upload is available on **Pro, Max, Team and Enterprise** plans. You can also pull partner Skills from the **Skills Directory** via the **“+” → Browse skills**: download the package (usually from GitHub) and upload the ZIP.\n\nThe other surfaces install differently — a **filesystem folder** in Claude Code, or an **API upload** keyed by `skill_id` — but the authoring format is identical, which is the whole point of the open standard.",
            "На **claude.ai і в десктоп-застосунку** Skills живуть у **Settings > Capabilities**. Спершу увімкни **Code execution and file creation** (Skills потребують VM), потім перемкни потрібні вбудовані Skills і натисни **Upload skill**, щоб додати свій як **ZIP теки skill**. Завантаження custom доступне на планах **Pro, Max, Team і Enterprise**. Можна також узяти партнерські Skills зі **Skills Directory** через **«+» → Browse skills**: завантаж пакет (зазвичай із GitHub) і залий ZIP.\n\nІнші поверхні встановлюють інакше — **тека у файловій системі** в Claude Code або **завантаження через API** за `skill_id` — але формат авторингу однаковий, і в цьому весь сенс відкритого стандарту.",
          ),
        },
        {
          kind: "table",
          head: [L("Surface", "Поверхня"), L("How to add a custom Skill", "Як додати custom Skill")],
          rows: [
            [L("claude.ai / Desktop", "claude.ai / Desktop"), L("Settings > Capabilities → enable code execution → **Upload skill** (ZIP of the folder)", "Settings > Capabilities → увімкни code execution → **Upload skill** (ZIP теки)")],
            [L("Skills Directory", "Skills Directory"), L("“+” → Browse skills → download the package → upload the ZIP", "«+» → Browse skills → завантаж пакет → залий ZIP")],
            [L("Claude Code", "Claude Code"), L("Drop a folder with SKILL.md in `~/.claude/skills/` (personal) or `.claude/skills/` (project)", "Поклади теку з SKILL.md у `~/.claude/skills/` (особисто) чи `.claude/skills/` (проєкт)")],
            [L("Claude API", "Claude API"), L("Upload via the `/v1/skills` endpoints, then reference its `skill_id`", "Залий через `/v1/skills`, потім посилайся на `skill_id`")],
          ],
        },
        {
          kind: "callout",
          tone: "security",
          title: L("Treat a Skill like installing software", "Стався до Skill як до встановлення ПЗ"),
          md: L(
            "A Skill ships **instructions and runnable code**, so a malicious one can drive Claude to **exfiltrate data** or **misuse tools** — the main risks are **prompt injection** and **data leakage**. Install Skills **only from sources you trust** (yourself or Anthropic). Before using an unfamiliar Skill, **read every bundled file**, watch for **unexpected network calls** or instructions that fetch untrusted content, and check what access Claude will have when it runs.",
            "Skill постачає **інструкції й виконуваний код**, тож зловмисний може змусити Claude **викрасти дані** чи **зловжити tools** — головні ризики це **prompt injection** і **витік даних**. Встановлюй Skills **лише з довірених джерел** (свої або від Anthropic). Перш ніж використати незнайомий Skill, **прочитай кожен вкладений файл**, шукай **несподівані мережеві виклики** чи інструкції, що тягнуть недовірений контент, і перевір, який доступ матиме Claude під час запуску.",
          ),
        },
        {
          kind: "callout",
          tone: "warn",
          title: L("If a Skill won't trigger or won't upload", "Якщо Skill не спрацьовує або не завантажується"),
          md: L(
            "**Not triggering?** Confirm it's toggled **on**, make the `description` clearly state **when** to use it, or just ask explicitly (“use my brand-style skill”). **Upload failing?** The usual culprits: the **folder name doesn't match the skill name**, a **missing `SKILL.md`**, **invalid characters** in name/description, or a **ZIP over the size limit**. And remember the Skills section only appears once **code execution** is enabled.",
            "**Не тригериться?** Переконайся, що він **увімкнений**, зроби так, щоб `description` чітко казав **коли** використовувати, або попроси явно («use my brand-style skill»). **Не завантажується?** Звичні причини: **назва теки не збігається з назвою skill**, **відсутній `SKILL.md`**, **недопустимі символи** в name/description або **ZIP перевищує ліміт**. І памʼятай: секція Skills зʼявляється лише коли ввімкнено **code execution**.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("A Skill is a folder (a SKILL.md plus optional scripts & resources) of procedural expertise Claude loads dynamically — author once, used automatically, and it works everywhere across Claude.", "Skill — це тека (SKILL.md плюс опційні скрипти й ресурси) з процедурною експертизою, яку Claude вантажить динамічно — напиши раз, використовується автоматично, і працює всюди в Claude."),
    L("SKILL.md opens with YAML frontmatter: name (≤64 chars, lowercase/hyphens, not “claude”/“anthropic”) + description (≤1024 chars, what it does AND when). The description is the trigger.", "SKILL.md починається з YAML frontmatter: name (≤64 символів, малі/дефіси, не «claude»/«anthropic») + description (≤1024 символів, що робить І коли). Description — це тригер."),
    L("Progressive disclosure loads in three levels: L1 metadata always (~100 tok/skill), L2 the SKILL.md body only when triggered (<5k tok), L3 bundled files & scripts only as needed (effectively unlimited).", "Progressive disclosure вантажить у три рівні: L1 metadata завжди (~100 ток/skill), L2 body SKILL.md лише коли тригериться (<5k ток), L3 вкладені файли й скрипти лише за потреби (практично безмежно)."),
    L("Claude reads files via bash in a code-execution VM, so script code never enters context (only its output) and unused files cost zero — fifty installed Skills are nearly as cheap as one.", "Claude читає файли через bash у VM з виконанням коду, тож код скрипта не входить у context (лише вивід), а невикористані файли коштують нуль — пʼятдесят встановлених Skills майже такі ж дешеві, як один."),
    L("Pre-built pptx/xlsx/docx/pdf Skills work automatically; add your own in Settings > Capabilities (ZIP) on paid plans with code execution. Custom Skills don't sync across surfaces and should come only from trusted sources.", "Готові pptx/xlsx/docx/pdf Skills працюють автоматично; свої додавай у Settings > Capabilities (ZIP) на платних планах із code execution. Custom Skills не синхронізуються між поверхнями і мають бути лише з довірених джерел."),
  ],
  pitfalls: [
    { title: L("A vague description, so the Skill never fires", "Розмитий description — Skill не спрацьовує"), body: L("Claude decides purely from name + description. If it doesn't say what the Skill does AND the situations that should activate it, Claude won't trigger it. Be specific and test with varied prompts.", "Claude вирішує лише за name + description. Якщо там не сказано, що Skill робить І в яких ситуаціях активується, Claude його не запустить. Будь конкретним і тестуй різними запитами.") },
    { title: L("Treating a Skill like a Project or a prompt", "Плутати Skill із Project чи prompt"), body: L("A Project holds static, always-loaded knowledge for one project; a prompt is a one-off instruction. A Skill is a reusable, on-demand procedure that loads only when relevant and works everywhere. Put facts in a Project, procedures in a Skill.", "Project тримає статичні, завжди завантажені знання для одного проєкту; prompt — разова інструкція. Skill — багаторазова процедура on-demand, що вантажиться лише за потреби й працює всюди. Факти — у Project, процедури — у Skill.") },
    { title: L("Installing Skills from untrusted sources", "Встановлення Skills із недовірених джерел"), body: L("A Skill ships instructions and runnable code, so a malicious one can exfiltrate data or misuse tools via prompt injection. Audit every bundled file before use and install only from sources you trust.", "Skill постачає інструкції й виконуваний код, тож зловмисний може викрасти дані чи зловжити tools через prompt injection. Перевіряй кожен вкладений файл перед використанням і став лише з довірених джерел.") },
  ],
  interview: [
    { q: L("What is an Agent Skill, and how does it differ from a prompt or a Project?", "Що таке Agent Skill і чим він відрізняється від prompt чи Project?"), a: L("A Skill is a folder (SKILL.md + optional scripts/resources) of procedural expertise Claude discovers and loads on demand. A prompt is a one-off, conversation-level instruction; a Project supplies static background knowledge that's always loaded inside that project. A Skill is reusable, loads only when its description matches the task, and works everywhere across Claude — create once, used automatically.", "Skill — це тека (SKILL.md + опційні скрипти/ресурси) з процедурною експертизою, яку Claude виявляє й вантажить on-demand. Prompt — разова інструкція в межах розмови; Project дає статичні фонові знання, завжди завантажені в цьому проєкті. Skill багаторазовий, вантажиться лише коли його description підходить під задачу, і працює всюди в Claude — створи раз, використовується автоматично."), level: "senior" },
    { q: L("Explain progressive disclosure and why it matters for token cost.", "Поясни progressive disclosure і чому це важливо для вартості в токенах."), a: L("Skills load in three levels: name+description metadata always in the system prompt (~100 tok/skill), the SKILL.md body only when the task triggers it (<5k tok), and bundled files/scripts only as needed (effectively unlimited). Because Claude reads files via bash in a code-execution VM, unused content costs zero tokens and script code never enters context — only its output. So you can install many Skills and bundle huge references without bloating the window.", "Skills вантажаться у три рівні: metadata name+description завжди в системному prompt (~100 ток/skill), body SKILL.md лише коли задача його тригерить (<5k ток), а вкладені файли/скрипти — лише за потреби (практично безмежно). Оскільки Claude читає файли через bash у VM з виконанням коду, невикористаний контент коштує нуль токенів, а код скрипта не входить у context — лише його вивід. Тож можна встановити багато Skills і вкласти величезні довідки, не роздуваючи вікно."), level: "senior" },
    { q: L("You're rolling Skills out to a team and securing them — what do you watch for?", "Ти розгортаєш Skills для команди й убезпечуєш їх — на що звертаєш увагу?"), a: L("Triggering: every Skill's description must state what it does and when to use it; test with varied prompts. Distribution: on Team/Enterprise, Owners provision Skills org-wide in Admin > Capabilities; otherwise custom Skills are per-user and don't sync across surfaces (claude.ai, API and Code are separate). Security: Skills run instructions + code, so audit untrusted ones for unexpected network calls or tool misuse (prompt injection, data exfiltration), install only from trusted sources, and remember the sandbox's network access varies by surface.", "Тригер: description кожного Skill має казати, що він робить і коли використовувати; тестуй різними запитами. Поширення: на Team/Enterprise Owners розкочують Skills на всю організацію в Admin > Capabilities; інакше custom Skills — на користувача й не синхронізуються між поверхнями (claude.ai, API і Code окремі). Безпека: Skills виконують інструкції + код, тож перевіряй недовірені на несподівані мережеві виклики чи зловживання tools (prompt injection, витік даних), став лише з довірених джерел і памʼятай, що доступ пісочниці до мережі різниться за поверхнею."), level: "staff" },
  ],
  seeAlso: ["m13", "m14", "m10", "m11", "m7"],
  sources: [
    { title: "Equipping agents for the real world with Agent Skills — Anthropic Engineering", url: "https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills" },
    { title: "Agent Skills — Claude Docs (overview)", url: "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview" },
    { title: "What are skills? — Claude Help Center", url: "https://support.claude.com/en/articles/12512176-what-are-skills" },
    { title: "Using Skills in Claude — Claude Help Center", url: "https://support.claude.com/en/articles/12512180-use-skills-in-claude" },
  ],
};

/* ======================================================================
   M13 · Building your own skills  — authored
   ====================================================================== */
const m13: Module = {
  id: "m13",
  section: "s3",
  order: 13,
  level: "senior",
  title: L("Building your own skills", "Створення власних skills"),
  tagline: L(
    "Turn a workflow you keep re-explaining into a folder Claude loads on its own — then prove it works by running real tasks with and without it.",
    "Перетвори процес, який щоразу пояснюєш заново, на теку, яку Claude вантажить сам — і доведи, що вона працює, прогнавши реальні задачі з нею і без неї.",
  ),
  readMins: 12,
  mentalModel: L(
    "Authoring a Skill is writing a runbook for a sharp colleague: state plainly when to reach for it and what to do, push the heavy detail into files they open only when needed, and trust it only after it passes real tasks in a fresh session.",
    "Створити Skill — це написати runbook для тямущого колеги: чітко скажи, коли його брати і що робити, винеси важкі деталі у файли, які відкривають лише за потреби, і довіряй йому лише після того, як він пройде реальні задачі в новій сесії.",
  ),
  topics: [
    {
      id: "t1",
      title: L("Author a basic skill (the recipe)", "Створення базового skill (рецепт)"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "The smallest possible Skill is **a folder with one `SKILL.md` file**: YAML frontmatter carrying the two required fields — **`name`** and **`description`** — and a Markdown **body** of plain instructions. No code is required; you can write a useful Skill in five minutes.\n\nReach for a Skill the moment you notice a **repeated pattern**: you keep pasting the same checklist or multi-step procedure into chat, or a section of your project instructions has quietly grown from a *fact* into a *procedure*. Because a Skill's body loads **only when it's used**, moving that procedure into a Skill keeps it out of every prompt until the task actually calls for it.\n\nThe fastest way to start clean is the **`skill-creator`** Skill: its `init_skill.py` script scaffolds the whole folder — a `SKILL.md` template with valid frontmatter plus empty `scripts/`, `references/` and `assets/` directories — so you fill in content instead of boilerplate.",
            "Найменший можливий Skill — це **тека з одним файлом `SKILL.md`**: YAML frontmatter із двома обовʼязковими полями — **`name`** і **`description`** — та Markdown-**body** зі звичайними інструкціями. Код не потрібен; корисний Skill пишеться за пʼять хвилин.\n\nБери Skill, щойно помітив **повторюваний патерн**: раз у раз вставляєш той самий чеклист чи багатокроковий процес у чат, або секція інструкцій проєкту тихо переросла з *факту* в *процедуру*. Оскільки body Skill вантажиться **лише коли використовується**, винесення цієї процедури у Skill тримає її поза кожним prompt, поки задача справді її не покличе.\n\nНайшвидший чистий старт — Skill **`skill-creator`**: його скрипт `init_skill.py` створює всю теку — шаблон `SKILL.md` із валідним frontmatter плюс порожні теки `scripts/`, `references/` і `assets/` — тож ти наповнюєш зміст, а не boilerplate.",
          ),
        },
        { kind: "figure", fig: "skill-build-pipeline", caption: L("Five stages, not one shot: draft the SKILL.md, bundle supporting files, write the trigger, test in a fresh session, then share — looping back from real results.", "Пʼять етапів, а не один постріл: напиши SKILL.md, додай допоміжні файли, склади тригер, протестуй у новій сесії, тоді поділись — повертаючись від реальних результатів.") },
        {
          kind: "code",
          lang: "markdown",
          code: "---\nname: conventional-commits\ndescription: Write a Conventional Commits message from the staged diff. Use\n  whenever the user asks for a commit message, says they're about to commit, or\n  wants a changelog entry — even if they don't say \"conventional commits\".\n---\n\n# Conventional Commits\n\n## Steps\n1. Read the staged diff.\n2. Choose a type: feat, fix, docs, refactor, perf, test, chore.\n3. Write `type(scope): summary` in the imperative mood, under 72 chars.\n4. Add a body only if the change needs context; put issue refs in a footer.\n\n## Example\nInput: added JWT auth to the login route\nOutput: feat(auth): add JWT authentication to login route",
          note: L(
            "A complete, useful Skill in a dozen lines: the frontmatter is the trigger, the body is the playbook. Prefer the imperative mood and a worked example over long prose.",
            "Повноцінний корисний Skill у десяток рядків: frontmatter — тригер, body — інструкція. Обирай наказовий спосіб і робочий приклад замість довгих абзаців.",
          ),
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Build a Skill, not a longer prompt", "Будуй Skill, а не довший prompt"),
          md: L(
            "If you've pasted the same instructions twice, that's the signal. A prompt helps **this** chat; a Skill helps **every** chat, loads only when relevant, and lives in version control where your team can improve it.",
            "Якщо ти вставив ті самі інструкції двічі — це сигнал. Prompt допомагає **цьому** чату; Skill допомагає **кожному**, вантажиться лише за потреби й живе в системі контролю версій, де команда може його покращувати.",
          ),
        },
      ],
    },
    {
      id: "t2",
      title: L("Add scripts & resources", "Додавання scripts і resources"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "When the body outgrows one screen, or a step has to be **exact**, split the work into **bundled files** and reference them from `SKILL.md`. The convention has three folders, each with a distinct job — and each pulled into context **only when that file is actually needed**, which is progressive disclosure working for *you* as the author.\n\nTwo rules of thumb keep a Skill fast: keep **`SKILL.md` under ~500 lines** (when it nears that, add a layer of hierarchy and point Claude to the right file), and open any reference file over ~300 lines with a **table of contents**. If a Skill spans variants (AWS / GCP / Azure), give each its own file under `references/` so Claude reads only the one that matters.",
            "Коли body переростає один екран або крок має бути **точним**, розбий роботу на **вкладені файли** й посилайся на них із `SKILL.md`. Конвенція має три теки, кожна зі своєю роллю — і кожна тягнеться в context **лише коли цей файл справді потрібен**; це progressive disclosure, що працює на *тебе* як автора.\n\nДва правила тримають Skill швидким: тримай **`SKILL.md` до ~500 рядків** (коли наближається — додай рівень ієрархії й вкажи Claude потрібний файл), а будь-який reference-файл понад ~300 рядків відкривай **змістом (table of contents)**. Якщо Skill охоплює варіанти (AWS / GCP / Azure), дай кожному окремий файл у `references/`, щоб Claude читав лише потрібний.",
          ),
        },
        {
          kind: "table",
          head: [L("Folder", "Тека"), L("Holds", "Містить"), L("Loaded", "Вантажиться")],
          rows: [
            [L("`scripts/`", "`scripts/`"), L("Executable code for deterministic / repetitive steps", "Виконуваний код для детермінованих / повторюваних кроків"), L("Run via bash — only the output enters context, never the code", "Запуск через bash — у context іде лише вивід, не код")],
            [L("`references/`", "`references/`"), L("Docs Claude reads as needed — API specs, schemas, long guides", "Доки, які Claude читає за потреби — API-специфікації, схеми, довгі гайди"), L("Read on demand, when SKILL.md points to it", "За потреби, коли SKILL.md на це вказує")],
            [L("`assets/`", "`assets/`"), L("Files used in the output — templates, fonts, icons, boilerplate", "Файли для результату — шаблони, шрифти, іконки, boilerplate"), L("Used by scripts / copied into deliverables", "Використовуються скриптами / копіюються в результати")],
          ],
        },
        {
          kind: "code",
          lang: "markdown",
          code: "---\nname: weekly-report\ndescription: Build the team's weekly status report. Use when the user asks for\n  the weekly report, a status update, or a sprint summary.\n---\n\n# Weekly Report\n\n1. Gather merged PRs and closed issues for the last 7 days.\n2. Fill the template, then render it:\n\n   `python3 ${CLAUDE_SKILL_DIR}/scripts/build_report.py`\n\nFor the section order and tone rules, read references/STYLE.md.",
          note: L(
            "Reference files by name with a one-line “when to read it”, and call scripts with `${CLAUDE_SKILL_DIR}` so the path resolves wherever the Skill is installed (personal, project or plugin).",
            "Посилайся на файли за назвою з одним рядком “коли читати”, а скрипти викликай через `${CLAUDE_SKILL_DIR}`, щоб шлях працював, де б Skill не був встановлений (personal, project чи plugin).",
          ),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Bundle a script when you catch Claude re-deriving it", "Додавай скрипт, коли Claude виводить логіку щоразу заново"),
          md: L(
            "If several runs of a task all end with Claude writing a similar `build_x.py`, that's a strong signal to **write it once** and put it in `scripts/`. Deterministic execution is cheaper (a few tokens of output vs. hundreds of regenerated lines) and more reliable than the model re-deriving logic each time.",
            "Якщо кілька прогонів задачі щоразу закінчуються тим, що Claude пише схожий `build_x.py`, це сильний сигнал **написати його раз** і покласти в `scripts/`. Детермінований запуск дешевший (кілька токенів виводу проти сотень рядків щоразу) і надійніший, ніж модель, що виводить логіку наново.",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("Write a description that triggers", "Description, що тригериться"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Besides the name, the **`description` is the only part of your Skill Claude sees by default** — it's the line Claude reads to decide whether to load the Skill at all. So it's the single highest-leverage thing you write. Pack in **what the Skill does *and* the concrete situations that should fire it**, in the **third person**, within the **~1024-character** budget, key use case first.\n\nThe non-obvious part: today's models tend to **under-trigger** Skills — they skip them when they'd help. The fix is to write the description a little **“pushy”**, naming the triggers explicitly: *“Use whenever the user mentions X, Y or Z, even if they don't ask for it by name.”* One caveat from how triggering works — Claude only consults a Skill for tasks it **can't trivially handle alone**, so a one-step request may not fire a Skill no matter how perfect the description.",
            "Окрім name, **`description` — єдина частина Skill, яку Claude бачить за замовчуванням** — це рядок, який Claude читає, щоб вирішити, чи взагалі вантажити Skill. Тож це найважливіше, що ти пишеш. Вклади **що Skill робить *і* конкретні ситуації, що мають його запустити**, у **третій особі**, в межах **~1024 символів**, ключовий кейс — першим.\n\nНеочевидне: сучасні моделі схильні **недотригерювати** Skills — пропускають їх там, де вони б допомогли. Лік — писати description трохи **“напористо”**, прямо називаючи тригери: *“Use whenever the user mentions X, Y чи Z, навіть якщо не просить цього прямо.”* Застереження з механіки тригера — Claude звертається до Skill лише для задач, які **не може легко зробити сам**, тож однокроковий запит може не запустити Skill, хоч би яким ідеальним був description.",
          ),
        },
        {
          kind: "compare",
          a: L("Weak description", "Слабкий description"),
          b: L("Strong description", "Сильний description"),
          rows: [
            [L("The line", "Сам рядок"), L("“Formats data.”", "“Formats data.”"), L("“Cleans & reshapes messy CSV/Excel exports… Use whenever the user uploads a spreadsheet or mentions cleaning, pivoting or reformatting tabular data.”", "“Cleans & reshapes messy CSV/Excel exports… Use whenever the user uploads a spreadsheet or mentions cleaning, pivoting or reformatting tabular data.”")],
            [L("Says when?", "Каже коли?"), L("No — only a vague “what”", "Ні — лише розмите “що”"), L("Yes — names the situations and keywords", "Так — називає ситуації й ключові слова")],
            [L("Result", "Результат"), L("Silently never fires", "Мовчки не спрацьовує"), L("Fires on the cases you meant", "Спрацьовує там, де ти задумав")],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: L("Tune both ways: should-trigger and should-not", "Налаштовуй у два боки: should-trigger і should-not"),
          md: L(
            "Over-correcting makes a Skill fire on everything. Test it against a set of **should-trigger** prompts *and* **near-miss should-not-trigger** prompts — queries that share keywords but need something else. The near-misses are what catch an over-eager description.",
            "Перебір змушує Skill спрацьовувати на все. Тестуй його набором **should-trigger** prompt *і* **близьких should-not-trigger** — запитів, що мають спільні ключові слова, але потребують іншого. Саме близькі промахи ловлять надто жадібний description.",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Test & iterate", "Тестування та ітерації"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Seeing a Skill trigger tells you Claude **found** it — not that it **worked**. Measure two things separately: does it **trigger on the prompts it should** (and stay quiet on the near-misses), and is the **output right** when it does fire. The method for both is a **baseline comparison**: take a few realistic prompts and run each in a **fresh session** once with the Skill and once with it disabled, then compare. A fresh session is essential — leftover context from authoring masks the gaps in your written instructions.\n\nThe **`skill-creator`** plugin automates this loop in Claude Code (`/plugin install skill-creator@claude-plugins-official`): it stores test prompts in `evals/evals.json`, runs each in an isolated subagent, grades assertions with evidence, and aggregates a **benchmark** of pass-rate, time and tokens for *with-skill vs without* — so you can see whether the Skill earns its overhead. It can also run a blind A/B between two versions and auto-tune the description.",
            "Те, що Skill спрацював, каже, що Claude його **знайшов** — а не що він **спрацював як треба**. Міряй дві речі окремо: чи **тригериться на потрібних prompt** (і мовчить на близьких промахах) і чи **правильний вивід**, коли спрацьовує. Метод для обох — **baseline-порівняння**: візьми кілька реалістичних prompt і прожени кожен у **новій сесії** раз зі Skill і раз із вимкненим, тоді порівняй. Нова сесія критична — залишковий контекст з авторингу маскує прогалини в інструкціях.\n\nPlugin **`skill-creator`** автоматизує цей цикл у Claude Code (`/plugin install skill-creator@claude-plugins-official`): зберігає тест-prompt у `evals/evals.json`, виконує кожен в ізольованому subagent, оцінює assertions з доказами й агрегує **benchmark** із pass-rate, часу й токенів для *зі Skill vs без* — тож видно, чи Skill виправдовує накладні витрати. Він також робить сліпе A/B між версіями й автоналаштовує description.",
          ),
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Always test in a fresh session", "Завжди тестуй у новій сесії"),
          md: L(
            "The chat where you wrote the Skill already “knows” everything you meant — so it will succeed even if the instructions are incomplete. Open a clean session (or a subagent) so you're testing the Skill, not your memory of it.",
            "Чат, де ти писав Skill, уже “знає” все, що ти мав на увазі — тож він упорається навіть із неповними інструкціями. Відкрий чисту сесію (чи subagent), щоб тестувати Skill, а не свою памʼять про нього.",
          ),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Iterate by explaining the why, not piling on MUSTs", "Ітеруй, пояснюючи «чому», а не нагромаджуючи MUST"),
          md: L(
            "When a result is off, resist hard-coding a fix for that one example. Generalize from the feedback, keep the body lean, and **explain the reasoning** behind an instruction — capitalised ALWAYS/NEVER are a yellow flag. A model that understands *why* follows the intent into cases the examples never covered.",
            "Коли результат не той, не вшивай фікс під цей один приклад. Узагальни з фідбеку, тримай body компактним і **пояснюй причину** інструкції — великими літерами ALWAYS/NEVER це жовтий прапорець. Модель, що розуміє *чому*, тримається задуму й у кейсах, яких приклади не покривали.",
          ),
        },
      ],
    },
    {
      id: "t5",
      title: L("Package & share", "Пакування та поширення"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "A finished Skill is just a folder, so sharing it means **getting that folder to your audience** — and the right channel depends on who that is. To hand one to a person, package it as a **`.skill` file** (a ZIP of the folder; `skill-creator`'s `package_skill.py` builds it) and they install it. To ship many at once, or to bundle Skills with sub-agents, commands and connectors, put a `skills/` directory inside a **plugin** (next module). For a whole org, push Skills through **managed settings**.\n\nThe authoring format is the same **open standard** everywhere (`agentskills.io`), but the **install path differs per surface** and **custom Skills don't sync across surfaces** — a Skill you upload to claude.ai is not automatically on the API or in Claude Code.",
            "Готовий Skill — це просто тека, тож поділитися ним означає **доставити цю теку аудиторії** — а канал залежить від того, хто вона. Щоб дати одній людині, запакуй у **`.skill`-файл** (ZIP теки; його будує `package_skill.py` зі `skill-creator`), і вона його встановить. Щоб віддати багато одразу або зібрати Skills із sub-agents, commands і connectors — поклади теку `skills/` у **plugin** (наступний модуль). Для всієї організації — розкочуй Skills через **managed settings**.\n\nФормат авторингу всюди один — **відкритий стандарт** (`agentskills.io`), але **шлях встановлення різний на кожній поверхні**, і **custom Skills не синхронізуються між поверхнями** — Skill, залитий на claude.ai, не зʼявляється автоматично в API чи Claude Code.",
          ),
        },
        {
          kind: "table",
          head: [L("Audience", "Аудиторія"), L("Channel", "Канал"), L("How", "Як")],
          rows: [
            [L("One person", "Одна людина"), L("`.skill` file (ZIP)", "`.skill`-файл (ZIP)"), L("Package the folder; they upload it in Settings > Capabilities", "Запакуй теку; вони заливають у Settings > Capabilities")],
            [L("A project / repo", "Проєкт / repo"), L("Committed folder", "Закомічена тека"), L("Commit `.claude/skills/<name>/` to version control", "Закоміть `.claude/skills/<name>/` у систему контролю версій")],
            [L("A role / toolkit", "Роль / набір"), L("Plugin", "Plugin"), L("A `skills/` dir in a plugin, shared via a marketplace → M14", "Тека `skills/` у plugin, поширюється через marketplace → M14")],
            [L("A whole org", "Уся організація"), L("Managed settings", "Managed settings"), L("Team / Enterprise Owners provision Skills org-wide", "Owners на Team / Enterprise розкочують Skills на всю організацію")],
          ],
        },
        {
          kind: "callout",
          tone: "security",
          title: L("Principle of lack of surprise", "Принцип відсутності несподіванок"),
          md: L(
            "A Skill ships **instructions and runnable code**, so its behaviour must match what its description promises — no hidden actions, no malware, no exploit code, no data exfiltration. Author honestly; and on the consuming side **audit any Skill from an untrusted source** before enabling it — read every bundled file and watch for unexpected network calls.",
            "Skill постачає **інструкції й виконуваний код**, тож його поведінка має збігатися з обіцянкою в description — без прихованих дій, malware, exploit-коду чи витоку даних. Пиши чесно; а з боку споживача **перевіряй будь-який Skill із недовіреного джерела** перед увімкненням — прочитай кожен вкладений файл і пильнуй несподівані мережеві виклики.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("A Skill is just a folder with a SKILL.md — required name + description plus a Markdown body. Build one the moment you're repeating instructions; skill-creator's init_skill.py scaffolds it.", "Skill — це просто тека з SKILL.md — обовʼязкові name + description плюс Markdown-body. Створюй його, щойно повторюєш інструкції; init_skill.py зі skill-creator робить каркас."),
    L("Push detail into bundled files referenced from SKILL.md: scripts/ (run via bash — code never enters context), references/ (read on demand), assets/ (used in output). Keep SKILL.md under ~500 lines.", "Виноси деталі у вкладені файли, на які посилається SKILL.md: scripts/ (запуск через bash — код не входить у context), references/ (читаються за потреби), assets/ (для результату). Тримай SKILL.md до ~500 рядків."),
    L("The description is the trigger and your highest-leverage line: what it does AND when to use it, third person, ~1024 chars, key use first — and a little “pushy”, because models under-trigger.", "Description — це тригер і твій найважливіший рядок: що робить І коли використовувати, у третій особі, ~1024 символи, ключовий кейс перший — і трохи “напористо”, бо моделі недотригерюють."),
    L("Prove it with a baseline comparison in a fresh session (with vs without). Measure triggering and output quality separately; the skill-creator plugin automates evals, grading, benchmarks and description tuning.", "Доведи baseline-порівнянням у новій сесії (зі Skill і без). Міряй тригер і якість виводу окремо; plugin skill-creator автоматизує evals, оцінювання, benchmark і тюнінг description."),
    L("Share by audience: a .skill ZIP for one person, a committed .claude/skills/ folder for a repo, a plugin's skills/ dir for a toolkit, managed settings for an org. Same open standard, but custom Skills don't sync across surfaces — and must not surprise the user.", "Поширюй за аудиторією: .skill (ZIP) для однієї людини, закомічена тека .claude/skills/ для repo, тека skills/ у plugin для набору, managed settings для організації. Стандарт один, але custom Skills не синхронізуються між поверхнями — і не мають дивувати користувача."),
  ],
  pitfalls: [
    { title: L("A vague description, so the Skill never fires", "Розмитий description — Skill не спрацьовує"), body: L("Claude decides from name + description alone. If it doesn't name what the Skill does and the situations that should trigger it, the Skill stays silent. Be specific, lean a bit pushy, and test should- and should-not-trigger prompts.", "Claude вирішує лише за name + description. Якщо там не названо, що Skill робить і в яких ситуаціях тригериться, він мовчить. Будь конкретним, пиши трохи напористо й тестуй should- і should-not-trigger prompt.") },
    { title: L("Stuffing everything into SKILL.md", "Запихати все в SKILL.md"), body: L("A bloated body is slow, costly and hard to follow. Keep SKILL.md lean, move long docs to references/, deterministic logic to scripts/, and reference them with a one-line “when to read it”.", "Роздутий body повільний, дорогий і важкий для виконання. Тримай SKILL.md компактним, довгі доки винось у references/, детерміновану логіку — у scripts/, і посилайся на них одним рядком “коли читати”.") },
    { title: L("“Works in the chat I wrote it in”", "“Працює в чаті, де я його писав”"), body: L("Testing a Skill in the same session you authored it hides missing instructions — that chat already knows what you meant. Always validate in a fresh session, ideally with the Skill vs without it.", "Тестувати Skill у тій самій сесії, де ти його писав, ховає відсутні інструкції — той чат уже знає, що ти мав на увазі. Завжди перевіряй у новій сесії, бажано зі Skill і без нього.") },
  ],
  interview: [
    { q: L("How do you author a Skill, and what's the minimum it needs?", "Як створити Skill і що йому потрібно щонайменше?"), a: L("A Skill is a folder containing SKILL.md: YAML frontmatter with a required name and description, then a Markdown body of instructions — no code required. Build one when you keep repeating a procedure; skill-creator's init_skill.py scaffolds the folder with scripts/, references/ and assets/. The body loads only when the Skill triggers, so it costs nothing until used.", "Skill — це тека з SKILL.md: YAML frontmatter з обовʼязковими name і description, далі Markdown-body з інструкціями — код не потрібен. Створюй, коли повторюєш процедуру; init_skill.py зі skill-creator робить каркас із scripts/, references/ і assets/. Body вантажиться лише коли Skill тригериться, тож до використання він нічого не коштує."), level: "senior" },
    { q: L("How do you write a description that triggers reliably without over-triggering?", "Як написати description, що надійно тригериться без перебору?"), a: L("Put what the Skill does AND the concrete situations that should fire it, in third person, within ~1024 chars, key use first. Because models under-trigger, make it a little pushy and name the keywords/contexts explicitly. Then tune both directions with should-trigger and near-miss should-not-trigger prompts so it doesn't fire on everything. And remember Claude won't consult a Skill for trivial one-step tasks regardless of the description.", "Вкажи що Skill робить І конкретні ситуації, що мають його запустити, у третій особі, у межах ~1024 символів, ключовий кейс першим. Бо моделі недотригерюють — пиши трохи напористо й прямо називай ключові слова/контексти. Тоді налаштуй у два боки should-trigger і близькими should-not-trigger prompt, щоб не спрацьовував на все. І памʼятай: для тривіальних однокрокових задач Claude не звернеться до Skill, хоч би яким був description."), level: "senior" },
    { q: L("How do you know a Skill actually helps, and how do you ship it to a team?", "Як зрозуміти, що Skill справді допомагає, і як віддати його команді?"), a: L("Use a baseline comparison in fresh sessions: run realistic prompts with the Skill and with it disabled, and measure triggering and output quality separately. The skill-creator plugin automates it — evals.json, isolated subagent runs, graded assertions, and a benchmark of pass-rate/time/tokens with vs without, plus blind A/B and description tuning. To ship: package as a .skill, bundle into a plugin's skills/ dir, or provision via managed settings for an org. Mind that custom Skills don't sync across claude.ai, API and Code, and audit anything untrusted (lack of surprise).", "Baseline-порівняння у нових сесіях: прожени реалістичні prompt зі Skill і з вимкненим, і міряй тригер та якість виводу окремо. Plugin skill-creator це автоматизує — evals.json, ізольовані subagent-прогони, оцінені assertions і benchmark із pass-rate/часу/токенів для зі Skill vs без, плюс сліпе A/B і тюнінг description. Щоб віддати: запакуй у .skill, поклади в теку skills/ plugin або розкоти через managed settings для організації. Памʼятай, що custom Skills не синхронізуються між claude.ai, API і Code, і перевіряй усе недовірене (lack of surprise)."), level: "staff" },
  ],
  seeAlso: ["m12", "m14", "m11", "m24"],
  sources: [
    { title: "Equipping agents for the real world with Agent Skills — Anthropic Engineering", url: "https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills" },
    { title: "Skill authoring best practices — Claude Docs", url: "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices" },
    { title: "Extend Claude with skills — Claude Code Docs", url: "https://code.claude.com/docs/en/skills" },
    { title: "skill-creator — anthropics/skills (GitHub)", url: "https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md" },
    { title: "How to create custom skills — Claude Help Center", url: "https://support.claude.com/en/articles/12512198-how-to-create-custom-skills" },
  ],
};

/* ======================================================================
   M14 · Plugins & marketplaces  — authored
   ====================================================================== */
const m14: Module = {
  id: "m14",
  section: "s3",
  order: 14,
  level: "senior",
  title: L("Plugins & marketplaces", "Plugins і marketplaces"),
  tagline: L(
    "Bundle the skills, commands, sub-agents, hooks and connectors for a whole job into one install — and distribute them through a marketplace.",
    "Зведи skills, commands, sub-agents, hooks і connectors для цілої ролі в одну інсталяцію — і поширюй їх через marketplace.",
  ),
  readMins: 10,
  mentalModel: L(
    "A plugin is a “role in a box”: one folder, defined by a plugin.json manifest, that bundles many extensions at once. A marketplace is the app store — a git repo — you install it from.",
    "Plugin — це “роль у коробці”: одна тека, описана маніфестом plugin.json, що зводить багато розширень разом. Marketplace — це застосунковий магазин (git repo), звідки ти його ставиш.",
  ),
  topics: [
    {
      id: "t1",
      title: L("What a plugin bundles", "Що містить plugin"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Where a Skill teaches one procedure, a **plugin packages a whole capability set into a single install**. One plugin can carry up to five kinds of extension at once: **skills**, **sub-agents**, **slash commands**, **hooks** and **MCP connectors** (Claude Code adds LSP servers too). The folder is defined by a **`.claude-plugin/plugin.json`** manifest plus component directories — `skills/`, `agents/`, `commands/`, `hooks/` and an `.mcp.json`. For Cowork's role plugins it's all **file-based — Markdown and JSON, with no code or build step**.",
            "Якщо Skill учить однієї процедури, то **plugin пакує цілий набір можливостей в одну інсталяцію**. Один plugin може нести до пʼяти видів розширень одразу: **skills**, **sub-agents**, **slash commands**, **hooks** і **MCP connectors** (у Claude Code ще й LSP-сервери). Теку описує маніфест **`.claude-plugin/plugin.json`** плюс теки компонентів — `skills/`, `agents/`, `commands/`, `hooks/` і `.mcp.json`. Для рольових plugins у Cowork усе **на файлах — Markdown і JSON, без коду чи build-кроку**.",
          ),
        },
        { kind: "figure", fig: "plugin-bundle", caption: L("One plugin, one install: a plugin.json manifest over a bundle of skills, sub-agents, commands, hooks and MCP connectors — added from a marketplace and activated in Cowork or Claude Code.", "Один plugin, одна інсталяція: маніфест plugin.json над набором skills, sub-agents, commands, hooks і MCP connectors — додається з marketplace й активується в Cowork чи Claude Code.") },
        {
          kind: "compare",
          a: L("A Skill", "Skill"),
          b: L("A plugin", "Plugin"),
          rows: [
            [L("Scope", "Обсяг"), L("One procedure / capability", "Одна процедура / можливість"), L("A bundle of many extensions", "Набір багатьох розширень")],
            [L("Contains", "Містить"), L("SKILL.md + optional files", "SKILL.md + опційні файли"), L("skills + agents + commands + hooks + MCP", "skills + agents + commands + hooks + MCP")],
            [L("Defined by", "Описується"), L("The SKILL.md frontmatter", "Frontmatter у SKILL.md"), L("A plugin.json manifest + component dirs", "Маніфест plugin.json + теки компонентів")],
            [L("Best for", "Найкраще для"), L("Teaching one task", "Навчити однієї задачі"), L("Equipping a whole role or toolkit", "Оснастити цілу роль чи набір")],
          ],
        },
        {
          kind: "table",
          head: [L("Component", "Компонент"), L("What it adds", "Що додає"), L("How it's used", "Як використовується")],
          rows: [
            [L("`skills/`", "`skills/`"), L("Domain know-how", "Доменне знання"), L("Claude loads it automatically when relevant", "Claude вантажить автоматично за потреби")],
            [L("`agents/`", "`agents/`"), L("Sub-agents", "Sub-agents"), L("Delegated, isolated work in their own context", "Делегована, ізольована робота у власному context")],
            [L("`commands/`", "`commands/`"), L("Slash commands", "Slash commands"), L("You invoke them, e.g. `/sales:call-prep`", "Викликаєш ти, напр. `/sales:call-prep`")],
            [L("`hooks/`", "`hooks/`"), L("Event scripts", "Скрипти на події"), L("Run on tool calls & lifecycle events", "Запускаються на викликах tools і подіях життєвого циклу")],
            [L("`.mcp.json`", "`.mcp.json`"), L("MCP connectors", "MCP connectors"), L("Wire Claude to external tools & data", "Підʼєднують Claude до зовнішніх tools і даних")],
          ],
        },
      ],
    },
    {
      id: "t2",
      title: L("Installing plugins & marketplaces", "Встановлення plugins і marketplaces"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "A **marketplace** is simply a **git repo that catalogs plugins**, described by a `marketplace.json`. You **add** the marketplace once, then **install** plugins from it. In **Claude Code**: `/plugin marketplace add owner/repo`, then `/plugin install name@marketplace`; the official **`claude-plugins-official`** marketplace is available automatically. In **Cowork**, browse and install from **claude.com/plugins**.\n\nSince **v2.1.145** the installer shows a **“Will install”** summary — every command, sub-agent, skill, hook and MCP server the plugin adds — so you review exactly what you're getting **before** trusting it. After install, `/reload-plugins` activates it in the current session, and slash commands arrive **namespaced** by plugin (`/sales:call-prep`, `/data:write-query`).",
            "**Marketplace** — це просто **git repo, що каталогізує plugins**, описаний файлом `marketplace.json`. Ти один раз **додаєш** marketplace, потім **ставиш** із нього plugins. У **Claude Code**: `/plugin marketplace add owner/repo`, далі `/plugin install name@marketplace`; офіційний **`claude-plugins-official`** доступний автоматично. У **Cowork** — переглядай і став із **claude.com/plugins**.\n\nЗ **v2.1.145** інсталятор показує зведення **“Will install”** — кожну command, sub-agent, skill, hook і MCP server, які додає plugin — тож ти бачиш, що саме отримуєш, **перш ніж** довіряти. Після встановлення `/reload-plugins` активує його в поточній сесії, а slash commands приходять із **namespace** за plugin (`/sales:call-prep`, `/data:write-query`).",
          ),
        },
        {
          kind: "table",
          head: [L("Step", "Крок"), L("Claude Code", "Claude Code"), L("Cowork", "Cowork")],
          rows: [
            [L("Add a marketplace", "Додати marketplace"), L("`/plugin marketplace add owner/repo`", "`/plugin marketplace add owner/repo`"), L("Built-in catalog at claude.com/plugins", "Вбудований каталог на claude.com/plugins")],
            [L("Install a plugin", "Встановити plugin"), L("`/plugin install name@market`", "`/plugin install name@market`"), L("Click Install from the catalog", "Натиснути Install у каталозі")],
            [L("Review first", "Спершу переглянь"), L("The “Will install” list", "Список “Will install”"), L("The plugin's listed contents", "Перелічений вміст plugin")],
            [L("Activate", "Активувати"), L("`/reload-plugins` (in-session)", "`/reload-plugins` (у сесії)"), L("Automatic", "Автоматично")],
          ],
        },
        {
          kind: "callout",
          tone: "security",
          title: L("A plugin runs code on your behalf", "Plugin виконує код від твого імені"),
          md: L(
            "Hooks fire on events, MCP servers get tool access, and skills can run scripts — so a plugin is **executable trust**, not just text. Review the **“Will install”** list, prefer **verified or official marketplaces**, and treat an unknown third-party plugin the way you'd treat installing unvetted software.",
            "Hooks спрацьовують на події, MCP servers отримують доступ до tools, а skills можуть запускати скрипти — тож plugin це **виконувана довіра**, а не просто текст. Переглядай список **“Will install”**, надавай перевагу **перевіреним чи офіційним marketplaces** і стався до незнайомого стороннього plugin, як до встановлення неперевіреного ПЗ.",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("The role plugins (Cowork)", "Рольові plugins (Cowork)"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Anthropic open-sourced **11 role plugins** for Cowork (they also run in Claude Code) in the **`knowledge-work-plugins`** repository. Each bundles the skills, slash commands, sub-agents and connectors for one **job function**, as a strong **generic starting point** you then **customize for your company** — swap the connectors in `.mcp.json` for your tool stack, drop your terminology and processes into the skill files, and adjust the workflows to how your team actually works. Install them from Cowork, browse them on GitHub, or use the **`cowork-plugin-management`** plugin to build your own.",
            "Anthropic відкрила код **11 рольових plugins** для Cowork (вони працюють і в Claude Code) у репозиторії **`knowledge-work-plugins`**. Кожен зводить skills, slash commands, sub-agents і connectors для однієї **робочої функції** як міцну **загальну відправну точку**, яку ти потім **підлаштовуєш під свою компанію** — заміни connectors у `.mcp.json` на свій стек, додай свою термінологію й процеси у файли skills і підправ workflows під те, як реально працює команда. Став їх із Cowork, дивись на GitHub або будуй власні через plugin **`cowork-plugin-management`**.",
          ),
        },
        {
          kind: "table",
          head: [L("Plugin", "Plugin"), L("What it helps with", "З чим допомагає")],
          rows: [
            [L("`productivity`", "`productivity`"), L("Tasks, calendars, daily workflows, personal context", "Задачі, календарі, щоденні workflows, персональний контекст")],
            [L("`sales`", "`sales`"), L("Research prospects, prep calls, review pipeline, draft outreach, battlecards", "Дослідження лідів, підготовка дзвінків, pipeline, outreach, battlecards")],
            [L("`customer-support`", "`customer-support`"), L("Triage tickets, draft replies, package escalations, write KB articles", "Тріаж тікетів, чернетки відповідей, ескалації, статті в KB")],
            [L("`product-management`", "`product-management`"), L("Specs, roadmaps, user research, stakeholder updates, competitive tracking", "Специфікації, roadmaps, user research, апдейти стейкхолдерам, конкуренти")],
            [L("`marketing`", "`marketing`"), L("Draft content, plan campaigns, enforce brand voice, competitor briefs, reporting", "Контент, кампанії, brand voice, брифи по конкурентах, звітність")],
            [L("`legal`", "`legal`"), L("Review contracts, triage NDAs, compliance, risk, templated responses", "Контракти, тріаж NDA, compliance, ризики, шаблонні відповіді")],
            [L("`finance`", "`finance`"), L("Journal entries, reconciliation, statements, variance analysis, close", "Проводки, звірки, звіти, аналіз відхилень, закриття періоду")],
            [L("`data`", "`data`"), L("Write SQL, run statistical analysis, build dashboards, validate results", "SQL, статаналіз, дашборди, валідація результатів")],
            [L("`enterprise-search`", "`enterprise-search`"), L("One query across email, chat, docs and wikis", "Один запит по пошті, чатах, доках і wiki")],
            [L("`bio-research`", "`bio-research`"), L("Literature search, genomics analysis, target prioritization", "Пошук літератури, genomics-аналіз, пріоритизація таргетів")],
            [L("`cowork-plugin-management`", "`cowork-plugin-management`"), L("Create & customize plugins for your org's tools and workflows", "Створення й кастомізація plugins під інструменти й workflows організації")],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Make them yours", "Зроби їх своїми"),
          md: L(
            "The role plugins are **generic starting points**, not turnkey products. The real value appears once you customize: point `.mcp.json` at your actual tools, add your company's terminology and processes to the skill files, and bake your workflows into the commands. That context then applies in every relevant interaction.",
            "Рольові plugins — це **загальні відправні точки**, а не готові продукти. Справжня користь зʼявляється після кастомізації: спрямуй `.mcp.json` на свої реальні інструменти, додай термінологію й процеси компанії у файли skills і вший свої workflows у commands. Цей контекст потім застосовується в кожній доречній взаємодії.",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Building & sharing a plugin", "Створення та поширення plugin"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Building one mirrors the structure you install: create the folder, add a **`.claude-plugin/plugin.json`** manifest (name, version…), and drop your components into `skills/`, `agents/`, `commands/`, `hooks/` and `.mcp.json`. To **distribute**, host the folder in a **git repo**; to make that repo a marketplace others can `add`, include a **`.claude-plugin/marketplace.json`** that catalogs your plugins. Because the role plugins are *just Markdown and JSON*, the workflow is literally **fork, edit, PR** — and in Cowork the `cowork-plugin-management` plugin scaffolds it for you.",
            "Створення дзеркалить структуру встановлення: зроби теку, додай маніфест **`.claude-plugin/plugin.json`** (name, version…) і поклади компоненти в `skills/`, `agents/`, `commands/`, `hooks/` і `.mcp.json`. Щоб **поширювати**, розмісти теку в **git repo**; щоб зробити цей repo marketplace, який інші можуть `add`, додай **`.claude-plugin/marketplace.json`** із каталогом твоїх plugins. Оскільки рольові plugins — це *лише Markdown і JSON*, процес буквально **fork, edit, PR** — а в Cowork plugin `cowork-plugin-management` зробить каркас за тебе.",
          ),
        },
        {
          kind: "code",
          lang: "text",
          code: "my-team-plugin/\n├── .claude-plugin/\n│   ├── plugin.json        # { \"name\": \"my-team\", \"version\": \"0.1.0\" }\n│   └── marketplace.json   # catalog — only if this repo is a marketplace\n├── skills/                # domain know-how Claude uses automatically\n├── commands/              # /my-team:* slash commands you invoke\n├── agents/                # sub-agents\n├── hooks/                 # scripts run on tool & lifecycle events\n└── .mcp.json              # connectors to your tools",
          note: L(
            "A plugin is just files. The manifest names it; the component folders are picked up by convention; one repo can host many plugins and double as their marketplace.",
            "Plugin — це просто файли. Маніфест дає назву; теки компонентів підхоплюються за конвенцією; один repo може містити багато plugins і бути їхнім marketplace.",
          ),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Standardize a team with a company marketplace", "Стандартизуй команду через корпоративний marketplace"),
          md: L(
            "To get consistent outcomes across a team, publish your plugins in **one git repo as a marketplace** (or push them via **managed settings**). Everyone adds it once and installs the same role plugins, so your tools, terminology and workflows are baked into every relevant interaction — less time enforcing process, more time improving it.",
            "Щоб мати узгоджені результати в команді, публікуй свої plugins в **одному git repo як marketplace** (або розкочуй через **managed settings**). Кожен додає його раз і ставить ті самі рольові plugins, тож твої інструменти, термінологія й workflows вшиті в кожну доречну взаємодію — менше часу на контроль процесу, більше на його покращення.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("A plugin bundles many extensions — skills + sub-agents + slash commands + hooks + MCP connectors — into one installable folder defined by a .claude-plugin/plugin.json manifest.", "Plugin зводить багато розширень — skills + sub-agents + slash commands + hooks + MCP connectors — в одну тeку для встановлення, описану маніфестом .claude-plugin/plugin.json."),
    L("A marketplace is a git repo that catalogs plugins (marketplace.json). Add it, then install: /plugin marketplace add owner/repo → /plugin install name@market; the official marketplace is built in, and Cowork installs from claude.com/plugins.", "Marketplace — це git repo, що каталогізує plugins (marketplace.json). Додай, потім встанови: /plugin marketplace add owner/repo → /plugin install name@market; офіційний marketplace вбудований, а Cowork ставить із claude.com/plugins."),
    L("Since v2.1.145 the installer shows a “Will install” list of every command/agent/skill/hook/MCP — review it before trusting, because a plugin runs code on your behalf.", "З v2.1.145 інсталятор показує список “Will install” кожної command/agent/skill/hook/MCP — переглянь перед довірою, бо plugin виконує код від твого імені."),
    L("Anthropic open-sourced 11 Cowork role plugins (knowledge-work-plugins): productivity, sales, customer-support, product-management, marketing, legal, finance, data, enterprise-search, bio-research, cowork-plugin-management — generic starts you customize per company.", "Anthropic відкрила 11 рольових plugins для Cowork (knowledge-work-plugins): productivity, sales, customer-support, product-management, marketing, legal, finance, data, enterprise-search, bio-research, cowork-plugin-management — загальні старти, які кастомізуєш під компанію."),
    L("Build your own by adding plugin.json + component dirs and hosting in git; turn the repo into a marketplace with marketplace.json. Role plugins are just Markdown + JSON — fork, edit, PR.", "Будуй власні, додавши plugin.json + теки компонентів і розмістивши в git; зроби repo marketplace через marketplace.json. Рольові plugins — це лише Markdown + JSON — fork, edit, PR."),
  ],
  pitfalls: [
    { title: L("Installing a plugin without reading what it bundles", "Ставити plugin, не читаючи, що він містить"), body: L("A plugin can add hooks (run on events), MCP servers (tool access) and skills (run scripts). Review the “Will install” summary and install only from marketplaces you trust — it's running code on your behalf.", "Plugin може додати hooks (запуск на події), MCP servers (доступ до tools) і skills (запуск скриптів). Переглянь зведення “Will install” і став лише з довірених marketplaces — це виконання коду від твого імені.") },
    { title: L("Confusing a skill with a plugin", "Плутати skill із plugin"), body: L("A skill is one procedure; a plugin is a bundle, often many skills plus commands, sub-agents, hooks and connectors. Ship a single procedure as a skill; ship a role or toolkit as a plugin.", "Skill — це одна процедура; plugin — це набір, часто багато skills плюс commands, sub-agents, hooks і connectors. Одну процедуру віддавай як skill; роль чи набір — як plugin.") },
    { title: L("Treating the role plugins as turnkey", "Сприймати рольові plugins як готові «під ключ»"), body: L("They're generic starting points. The value comes from customizing: point .mcp.json at your tools and add your company's terminology and workflows to the skill files.", "Це загальні відправні точки. Користь — у кастомізації: спрямуй .mcp.json на свої інструменти й додай термінологію та workflows компанії у файли skills.") },
  ],
  interview: [
    { q: L("What does a plugin bundle, and how is it structured?", "Що містить plugin і як він влаштований?"), a: L("A plugin packages several kinds of extension into one install: skills, sub-agents, slash commands, hooks and MCP connectors. It's a folder with a .claude-plugin/plugin.json manifest plus component directories — skills/, agents/, commands/, hooks/ and an .mcp.json. Where a skill is one procedure, a plugin equips a whole role.", "Plugin пакує кілька видів розширень в одну інсталяцію: skills, sub-agents, slash commands, hooks і MCP connectors. Це тека з маніфестом .claude-plugin/plugin.json плюс теки компонентів — skills/, agents/, commands/, hooks/ і .mcp.json. Якщо skill — це одна процедура, то plugin оснащує цілу роль."), level: "senior" },
    { q: L("How do marketplaces and installation work, and how do you vet a plugin?", "Як працюють marketplaces і встановлення, і як перевірити plugin?"), a: L("A marketplace is a git repo cataloging plugins via marketplace.json. You add it (/plugin marketplace add owner/repo) then install (/plugin install name@market); the official marketplace is built in and Cowork installs from claude.com/plugins. Vet with the “Will install” list — it shows every command, agent, skill, hook and MCP server added — and only install from trusted marketplaces, since hooks, MCP and skill scripts run code.", "Marketplace — це git repo, що каталогізує plugins через marketplace.json. Додаєш (/plugin marketplace add owner/repo), потім ставиш (/plugin install name@market); офіційний marketplace вбудований, а Cowork ставить із claude.com/plugins. Перевіряй списком “Will install” — він показує кожну command, agent, skill, hook і MCP server — і став лише з довірених marketplaces, бо hooks, MCP і скрипти skills виконують код."), level: "senior" },
    { q: L("Skill vs connector vs plugin — when each, and how would you standardize a team?", "Skill vs connector vs plugin — коли що і як стандартизувати команду?"), a: L("A skill teaches one procedure; a connector (MCP) wires in one external tool or data source; a plugin bundles both plus commands, sub-agents and hooks for a whole role. For a single repeatable task, ship a skill. To give Claude access to a tool, add a connector. To equip a role or standardize a team, build a plugin and distribute it through a company marketplace (or managed settings) — Anthropic's 11 knowledge-work plugins are a customizable starting point.", "Skill учить однієї процедури; connector (MCP) підʼєднує один зовнішній інструмент чи джерело даних; plugin зводить обидва плюс commands, sub-agents і hooks для цілої ролі. Для однієї повторюваної задачі — skill. Щоб дати Claude доступ до інструмента — connector. Щоб оснастити роль чи стандартизувати команду — збудуй plugin і поширюй через корпоративний marketplace (чи managed settings); 11 knowledge-work plugins від Anthropic — кастомізовна відправна точка."), level: "staff" },
  ],
  seeAlso: ["m13", "m11", "m24", "m19"],
  sources: [
    { title: "Plugins — Claude Code Docs", url: "https://code.claude.com/docs/en/plugins" },
    { title: "Discover and install prebuilt plugins through marketplaces — Claude Code Docs", url: "https://code.claude.com/docs/en/discover-plugins" },
    { title: "Plugins reference — Claude Code Docs", url: "https://code.claude.com/docs/en/plugins-reference" },
    { title: "Knowledge Work Plugins — anthropics/knowledge-work-plugins (GitHub)", url: "https://github.com/anthropics/knowledge-work-plugins" },
  ],
};

/* ======================================================================
   Planned modules (topics carry over from CURRICULUM.md; bodies fill in)
   ====================================================================== */
const planned: Module[] = [
  // Section I  (m1 · m2 · m3 · m4 · m5 are fully authored below)

  // Section II  (m6 · m7 · m8 · m9 · m10 are fully authored above)

  // Section III  (m11 · m12 · m13 · m14 are fully authored above)

  // Section IV (m15–m19 are fully authored above)

  // Section V (m20 · m21 are fully authored above; m22 · m23 · m24 authored below)

  // Section VI — m25 · m26 · m27 · m28 all fully authored below (S10a · S10b).
  // Every module is authored now; `planned` is intentionally empty.
];

/* ======================================================================
   M22 · Claude Code essentials — fully authored (S8)
   ====================================================================== */
const m22: Module = {
  id: "m22",
  section: "s5",
  order: 22,
  level: "senior",
  title: L("Claude Code essentials", "Claude Code: основи"),
  tagline: L(
    "The same coding agent in your terminal, IDE and CI — running the agent loop over your real repo, with CLAUDE.md for its brain and permissions for its leash.",
    "Той самий кодувальний agent у терміналі, IDE і CI — виконує agent loop над твоїм справжнім репозиторієм, із CLAUDE.md за мозок і permissions за повідець.",
  ),
  readMins: 9,
  mentalModel: L(
    "Cowork’s engineer sibling: one agent, three doorways (terminal · IDE · CI) working your actual files and shell — not a sandbox — so CLAUDE.md steers it and permissions contain it.",
    "Інженерний родич Cowork: один agent, троє дверей (terminal · IDE · CI), що працює з твоїми реальними файлами й shell — не в пісочниці — тож CLAUDE.md ним керує, а permissions його стримують.",
  ),
  topics: [
    {
      id: "t1",
      title: L("Two ways in, and where it runs", "Два входи і де воно працює"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "**Claude Code** is the same agent as Cowork, built for engineers and living where you code. It has two front doors — the **terminal** (`claude` inside any repo) and **IDE extensions** (VS Code and JetBrains, with inline diffs and a quick-launch shortcut) — plus two more ways to run: **headless** (`claude -p` for a one-shot prompt) for scripts, and **CI** via the official GitHub Actions (`anthropics/claude-code-action`) to triage issues and open PRs. The crucial difference from Cowork: Code runs in **your real shell with your real permissions** — it edits files, runs `npm test`, and commits. That power is exactly why the permission system matters.",
            "**Claude Code** — це той самий agent, що й Cowork, але для інженерів і там, де ти кодиш. Має двоє парадних дверей — **terminal** (`claude` у будь-якому репозиторії) та **IDE-розширення** (VS Code і JetBrains, з inline-diff і швидким запуском) — плюс ще два способи запуску: **headless** (`claude -p` для одноразового prompt) для скриптів і **CI** через офіційний GitHub Actions (`anthropics/claude-code-action`) для тріажу issues й відкриття PR. Ключова відмінність від Cowork: Code працює у **твоєму справжньому shell із твоїми справжніми правами** — редагує файли, запускає `npm test`, робить commit. Саме через цю силу й важлива система permissions.",
          ),
        },
        { kind: "figure", fig: "code-architecture", caption: L("One agent reached through three surfaces, working your real repo and shell, steered by four levers: CLAUDE.md, permissions, model+effort and tools.", "Один agent через три поверхні, що працює з твоїм реальним репо й shell, керований чотирма важелями: CLAUDE.md, permissions, model+effort і tools.") },
        {
          kind: "table",
          head: [L("Surface", "Поверхня"), L("How you start", "Як запустити"), L("Best for", "Найкраще для")],
          rows: [
            [L("Terminal", "Terminal"), L("claude, in a repo", "claude, у репо"), L("Interactive coding, day to day", "Інтерактивне кодування щодня")],
            [L("IDE extension", "IDE-розширення"), L("VS Code / JetBrains plugin", "Плагін VS Code / JetBrains"), L("Inline diffs, editor context", "Inline-diff, контекст редактора")],
            [L("Headless", "Headless"), L("claude -p for one prompt", "claude -p на один prompt"), L("Scripts, pre-commit, pipelines", "Скрипти, pre-commit, пайплайни")],
            [L("CI", "CI"), L("GitHub Actions", "GitHub Actions"), L("Issue triage, automated PRs", "Тріаж issues, автоматичні PR")],
          ],
        },
      ],
    },
    {
      id: "t2",
      title: L("Models, effort & permissions", "Моделі, effort і permissions"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Three levers shape each session. **Model**: switch with `/model` — **Sonnet 4.6** is the balanced default for everyday coding, **Opus 4.8** for the hardest reasoning and big refactors, **Haiku 4.5** for fast, cheap, high-volume work. **Effort / thinking** is **adaptive** — Claude decides how hard to think; you can nudge harder problems with words like “think” or “ultrathink”, but don’t sprinkle them everywhere. **Permissions** are the leash: risky actions are gated unless you’ve allowed them.",
            "Три важелі формують кожну сесію. **Model**: перемикай через `/model` — **Sonnet 4.6** збалансований дефолт на щодень, **Opus 4.8** для найскладнішого мислення й великих рефакторів, **Haiku 4.5** для швидкої, дешевої, обʼємної роботи. **Effort / thinking** — **адаптивний**: Claude сам вирішує, наскільки думати; складніше можна підштовхнути словами на кшталт «think» чи «ultrathink», але не всюди. **Permissions** — повідець: ризиковані дії під воротами, поки ти їх не дозволив.",
          ),
        },
        {
          kind: "table",
          head: [L("Permission mode", "Режим permission"), L("What it does", "Що робить"), L("Use when", "Коли")],
          rows: [
            [L("Default (ask)", "Default (ask)"), L("Prompts on first use of each tool", "Питає при першому використанні кожного tool"), L("Normal, interactive work", "Звичайна інтерактивна робота")],
            [L("Accept edits", "Accept edits"), L("Auto-approves file edits in the working dir", "Авто-схвалює правки файлів у робочій теці"), L("Fast iteration, low-risk edits", "Швидкі ітерації, низький ризик")],
            [L("Plan mode", "Plan mode"), L("Read-only: research and propose, no changes", "Лише читання: дослідити й запропонувати, без змін"), L("Unfamiliar or risky changes", "Незнайомі чи ризиковані зміни")],
            [L("Auto Mode", "Auto Mode"), L("Auto-approves with a safety classifier watching", "Авто-схвалює, поки стежить safety-класифікатор"), L("Fewer prompts (research preview)", "Менше запитів (research preview)")],
            [L("Bypass", "Bypass"), L("Skips prompts except hard blocks", "Пропускає запити, крім жорстких блоків"), L("Sandboxes / CI you fully trust", "Пісочниці / CI, яким повністю довіряєш")],
          ],
        },
        {
          kind: "code",
          lang: "json",
          code: "// .claude/settings.json — rules run deny -> ask -> allow, first match wins\n{\n  \"permissions\": {\n    \"allow\": [\"Bash(npm run test:*)\", \"Edit(src/**)\"],\n    \"ask\":   [\"Bash(git push:*)\"],\n    \"deny\":  [\"Read(./.env)\", \"Bash(rm:*)\"]\n  }\n}",
          note: L("Tool-scoped rules; a deny always wins over an allow.", "Правила привʼязані до tool; deny завжди перемагає allow."),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Auto Mode reduces prompts, not risk", "Auto Mode зменшує запити, не ризик"),
          md: L(
            "**Auto Mode** is a research preview: a Sonnet-based **safety classifier** inspects each action and auto-approves the routine ones, so you’re interrupted far less. It is a *permission* convenience, not an intelligence upgrade — it still runs real commands in your shell, and it can be wrong. On unfamiliar or production repos, prefer **plan mode** and review the diff. Treat `bypass` as “I own this sandbox”, never as “Claude is safe now”.",
            "**Auto Mode** — research preview: **safety-класифікатор** на базі Sonnet перевіряє кожну дію й авто-схвалює рутинні, тож тебе перебивають значно рідше. Це зручність permission, а не апгрейд інтелекту — він усе одно виконує справжні команди у твоєму shell і може помилятись. На незнайомих чи продакшн-репо обирай **plan mode** і дивись diff. Сприймай `bypass` як «це моя пісочниця», ніколи як «тепер Claude безпечний».",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("CLAUDE.md — the project brain", "CLAUDE.md — мозок проєкту"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "`CLAUDE.md` is a Markdown file Claude reads at the **start of every session** — your standing instructions, not a knowledge dump. The **project** `CLAUDE.md` (committed to the repo) carries conventions, key commands, architecture notes and do/don’t rules so the whole team shares one brain; your personal **`~/.claude/CLAUDE.md`** applies across all your projects; an enterprise **managed** policy can sit above both. `CLAUDE.local.md` is **deprecated** — pull extra files in with **`@path` imports** instead. In a monorepo, files above the working dir load at launch and subfolder files load on demand. `/init` scaffolds one, `/memory` edits it, and starting a message with `#` appends a memory mid-session.",
            "`CLAUDE.md` — Markdown-файл, який Claude читає на **початку кожної сесії** — твої постійні інструкції, а не звалище фактів. **Проєктний** `CLAUDE.md` (у репозиторії) несе конвенції, ключові команди, нотатки про архітектуру й правила do/don’t, щоб уся команда мала спільний мозок; твій особистий **`~/.claude/CLAUDE.md`** діє в усіх проєктах; корпоративна **managed**-політика може стояти над обома. `CLAUDE.local.md` **застарів** — підтягуй додаткові файли через **`@path`-імпорти**. У monorepo файли над робочою текою вантажаться на старті, а файли підтек — на вимогу. `/init` створює його, `/memory` редагує, а повідомлення, що починається з `#`, додає memory посеред сесії.",
          ),
        },
        {
          kind: "code",
          lang: "markdown",
          code: "# CLAUDE.md  (project root, committed)\n\n## Commands\n- build: npm run build      - test: npm test\n\n## Conventions\n- TypeScript strict; ESLint must pass before commit.\n- Never edit generated files in /dist.\n\n@docs/architecture.md   <- pull in extra context on demand",
          note: L("Behaviour and pointers — keep stale facts out; every line costs context each session.", "Поведінка й вказівники — без застарілих фактів; кожен рядок коштує context щосесії."),
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("You’re looking at one right now", "Ти просто зараз дивишся на один"),
          md: L(
            "This guide is built by Claude from a `CLAUDE.md` in its own repo — the **source of truth** holding the mission, stack decisions, the content model, and a per-session progress log. That is exactly the pattern: a living project brain Claude re-reads every session so it stays consistent across many sittings.",
            "Цей гайд Claude будує з `CLAUDE.md` у власному репозиторії — **джерела істини** з місією, рішеннями по стеку, моделлю контенту й логом прогресу по сесіях. Це і є патерн: живий мозок проєкту, який Claude перечитує щосесії, щоб лишатися послідовним протягом багатьох підходів.",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Plan mode & verification", "Plan mode і верифікація"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "By default Claude edits and runs as it goes. **Plan mode** flips it **read-only**: Claude explores the codebase and proposes a plan **without changing anything**, and you approve before a single edit. Cycle into it with **Shift+Tab**. Reach for it on unfamiliar code, big refactors, or anything risky — a cheap way to catch a wrong approach before it writes 30 files. Plan mode pairs with **verification**: don’t accept “it compiled”. Have Claude run the tests and typecheck, **read the diff**, or spin up a sub-agent to review the change (M23). The agent loop is fast; your job is to gate it at the right moments.",
            "За замовчуванням Claude редагує й запускає на ходу. **Plan mode** робить його **read-only**: Claude досліджує код і пропонує план, **нічого не змінюючи**, а ти схвалюєш до першої правки. Увійти — **Shift+Tab**. Бери його на незнайомому коді, великих рефакторах чи будь-чому ризикованому — дешевий спосіб упіймати хибний підхід, перш ніж він напише 30 файлів. Plan mode працює в парі з **верифікацією**: не приймай «воно скомпілювалось». Хай Claude прожене тести й typecheck, **прочитає diff** або підніме sub-agent для рев’ю зміни (M23). Agent loop швидкий; твоя робота — ставити ворота в потрібні моменти.",
          ),
        },
        {
          kind: "compare",
          a: L("Plan mode", "Plan mode"),
          b: L("Accept-edits / Auto", "Accept-edits / Auto"),
          rows: [
            [L("Control", "Контроль"), L("Read-only until you approve a plan", "Лише читання, поки не схвалиш план"), L("Edits as it goes", "Редагує на ходу")],
            [L("Best for", "Найкраще для"), L("Unfamiliar, risky, large changes", "Незнайомі, ризиковані, великі зміни"), L("Trusted, low-risk iteration", "Довірені ітерації, низький ризик")],
            [L("Trade-off", "Компроміс"), L("Slower, but bad approaches caught early", "Повільніше, але хибний підхід ловиш рано"), L("Faster, but mistakes land in files", "Швидше, але помилки лягають у файли")],
          ],
        },
      ],
    },
    {
      id: "t5",
      title: L("MCP in Code", "MCP у Code"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Code speaks **MCP** just like the Claude apps (M11). Add a server with `claude mcp add <name> --scope local|project|user`: a **project**-scoped server lives in a committed `.mcp.json` so your whole team gets it, **user** scope is personal across projects, **local** is just you in this repo. Transports are **stdio** (a local process) or **HTTP/SSE** (remote). MCP tools appear as **`mcp__<server>__<tool>`** and obey the same permission rules; a server’s prompts become slash commands (`/mcp__server__prompt`) and its resources are referenced with `@server:…`. `/mcp` shows status and handles OAuth.",
            "Code говорить **MCP** так само, як застосунки Claude (M11). Додай сервер через `claude mcp add <name> --scope local|project|user`: сервер зі scope **project** живе у закоміченому `.mcp.json`, тож його отримує вся команда, **user** — особистий у всіх проєктах, **local** — лише ти в цьому репо. Транспорти — **stdio** (локальний процес) або **HTTP/SSE** (віддалено). MCP-tools зʼявляються як **`mcp__<server>__<tool>`** і підкоряються тим самим permission-правилам; prompts сервера стають slash-командами (`/mcp__server__prompt`), а його resources згадуються через `@server:…`. `/mcp` показує статус і веде OAuth.",
          ),
        },
        {
          kind: "code",
          lang: "bash",
          code: "# add a project server (committed to .mcp.json, shared with the team)\nclaude mcp add github --scope project\n\n# a personal server across all your repos\nclaude mcp add linear --scope user\n\n# inspect status / run OAuth\n/mcp",
          note: L("Project scope shares the server via git; user scope is yours everywhere.", "Project-scope ділить сервер через git; user-scope — твій усюди."),
        },
      ],
    },
  ],
  keyPoints: [
    L("Same agent, three surfaces (terminal · IDE · CI/headless); it runs in your real shell with your permissions — not a sandbox like Cowork.", "Той самий agent, три поверхні (terminal · IDE · CI/headless); працює у твоєму справжньому shell із твоїми правами — не в пісочниці, як Cowork."),
    L("Pick the model for the job: Sonnet 4.6 is the balanced default, Opus 4.8 for the hardest reasoning, Haiku 4.5 for speed; thinking effort is adaptive.", "Обирай модель під задачу: Sonnet 4.6 — збалансований дефолт, Opus 4.8 — найскладніше мислення, Haiku 4.5 — швидкість; effort мислення адаптивний."),
    L("Permissions are allow/ask/deny rules plus modes (default, accept-edits, plan, bypass); rules run deny -> ask -> allow, first match wins; Auto Mode reduces prompts, not risk.", "Permissions — правила allow/ask/deny плюс режими (default, accept-edits, plan, bypass); правила йдуть deny -> ask -> allow, перший збіг виграє; Auto Mode зменшує запити, не ризик."),
    L("CLAUDE.md is the project brain: committed project file + personal ~/.claude + managed; @imports replace the deprecated CLAUDE.local.md; keep it behaviour, not stale facts.", "CLAUDE.md — мозок проєкту: закомічений проєктний файл + особистий ~/.claude + managed; @imports замінюють застарілий CLAUDE.local.md; тримай поведінку, не застарілі факти."),
    L("Plan mode keeps Claude read-only until you approve a plan; always verify (tests, diff, sub-agent review). MCP works in Code via claude mcp add and mcp__server__tool.", "Plan mode тримає Claude read-only, поки не схвалиш план; завжди верифікуй (тести, diff, рев’ю sub-agent). MCP працює в Code через claude mcp add і mcp__server__tool."),
  ],
  pitfalls: [
    { title: L("Treating bypass / Auto as safe autonomy", "Сприймати bypass / Auto як безпечну автономність"), body: L("They reduce prompts, not consequences — Claude runs real commands in your real shell. Use plan mode and review diffs on anything you don’t fully trust.", "Вони зменшують запити, не наслідки — Claude виконує справжні команди у твоєму справжньому shell. Використовуй plan mode і дивись diff на всьому, чому не довіряєш повністю.") },
    { title: L("A bloated CLAUDE.md", "Роздутий CLAUDE.md"), body: L("Dumping facts, secrets or long docs that go stale — it’s instructions, and every line is re-read (and re-paid in context) each session. Keep it lean; use @imports for the rest.", "Звалище фактів, секретів чи довгих доків, що застарівають — це інструкції, і кожен рядок перечитується (і знову оплачується в context) щосесії. Тримай стисло; решту — через @imports.") },
    { title: L("Skipping verification", "Пропускати верифікацію"), body: L("Accepting edits without running tests or reading the diff. “It compiled” is not “it’s correct” — gate the loop with tests, a diff read, or a review sub-agent.", "Приймати правки без тестів чи читання diff. «Воно скомпілювалось» — це не «воно правильне» — став ворота: тести, читання diff або sub-agent для рев’ю.") },
  ],
  interview: [
    { q: L("When should you reach for plan mode instead of just letting Claude edit?", "Коли брати plan mode замість того, щоб дати Claude редагувати?"), a: L("On unfamiliar code, large refactors, or anything risky. Plan mode keeps Claude read-only — it researches and proposes a plan you approve before any edit — so you catch a wrong approach before it touches 30 files. For small, well-understood changes in a repo you trust, accept-edits is faster. The deciding question is blast radius, not difficulty.", "На незнайомому коді, великих рефакторах чи будь-чому ризикованому. Plan mode тримає Claude read-only — він досліджує й пропонує план, який ти схвалюєш до правок — тож ловиш хибний підхід, перш ніж він торкнеться 30 файлів. Для малих зрозумілих змін у довіреному репо accept-edits швидший. Вирішальне питання — радіус ураження, не складність."), level: "senior" },
    { q: L("How do project and user CLAUDE.md interact, and what belongs in each?", "Як взаємодіють проєктний і користувацький CLAUDE.md і що в кожному?"), a: L("Project CLAUDE.md is committed and shared — repo conventions, key commands, architecture, do/don’t. User ~/.claude/CLAUDE.md is personal across all your projects — your preferences. A managed/enterprise policy can sit above both. Use @imports to pull in extra files; CLAUDE.local.md is deprecated. Keep all of it behaviour and pointers, not stale facts — every line costs context each session.", "Проєктний CLAUDE.md закомічений і спільний — конвенції репо, ключові команди, архітектура, do/don’t. Користувацький ~/.claude/CLAUDE.md особистий у всіх проєктах — твої вподобання. Managed/enterprise-політика може стояти над обома. Використовуй @imports для додаткових файлів; CLAUDE.local.md застарів. Тримай усе як поведінку й вказівники, не застарілі факти — кожен рядок коштує context щосесії."), level: "senior" },
    { q: L("What’s the real difference between Cowork and Claude Code?", "Яка справжня різниця між Cowork і Claude Code?"), a: L("Same agent, different surface and guardrails. Cowork is for non-engineers, runs code in an isolated VM, and works the folders you grant. Claude Code is for engineers, runs in your real shell and repo with your real permissions, and is governed by CLAUDE.md plus a permission ruleset. Code is more powerful and more dangerous — which is why permissions and plan mode matter.", "Той самий agent, інша поверхня й запобіжники. Cowork для не-інженерів, виконує код в ізольованій VM і працює з теками, які ти надав. Claude Code для інженерів, працює у твоєму справжньому shell і репо з твоїми правами, керований CLAUDE.md плюс набором permission-правил. Code потужніший і небезпечніший — тому й важливі permissions та plan mode."), level: "senior" },
  ],
  seeAlso: ["m15", "m23", "m11", "m25", "m26"],
  sources: [
    { title: "Claude Code overview — Claude Code Docs", url: "https://code.claude.com/docs/en/overview" },
    { title: "Configure permissions — Claude Code Docs", url: "https://code.claude.com/docs/en/permissions" },
    { title: "Manage Claude’s memory (CLAUDE.md) — Claude Code Docs", url: "https://code.claude.com/docs/en/memory" },
    { title: "Connect to MCP servers — Claude Code Docs", url: "https://code.claude.com/docs/en/mcp" },
    { title: "Claude Code GitHub Actions — Claude Code Docs", url: "https://code.claude.com/docs/en/github-actions" },
  ],
};

/* ======================================================================
   M23 · Sub-agents, agent teams & worktrees — fully authored (★ Sub-agent Fan-out, S8)
   ====================================================================== */
const m23: Module = {
  id: "m23",
  section: "s5",
  order: 23,
  level: "staff",
  title: L("Sub-agents, agent teams & worktrees", "Sub-agents, agent teams і worktrees"),
  tagline: L(
    "Fan out into agents with their own context, then merge what comes back — from a single summary-returning sub-agent to a git-coordinated team building in parallel.",
    "Розгалужуйся в агентів із власним context і зливай те, що повертається — від одного sub-agent, що віддає summary, до git-координованої команди, яка будує паралельно.",
  ),
  readMins: 10,
  mentalModel: L(
    "One Claude can become many: a sub-agent does a noisy side-quest in its own window and hands back a summary; scale that up and you get parallel sessions, then a git-coordinated team. Fan out, merge back.",
    "Один Claude може стати багатьма: sub-agent робить галасливий побічний квест у власному вікні й повертає summary; масштабуй це — і маєш паралельні сесії, далі git-координовану команду. Розгалузити, злити назад.",
  ),
  topics: [
    {
      id: "t1",
      title: L("Sub-agents: own context, isolation, parallelism", "Sub-agents: власний context, ізоляція, паралелізм"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "A **sub-agent** is a fresh Claude you hand a side-quest to. It runs in its **own context window** with its own system prompt, tool access and permissions, does the noisy work — reading dozens of files, long searches — and returns **only a summary**. The raw material never lands in your main conversation. That buys three things at once: a **clean main context** (exploration stays out of your window), **enforced constraints** (give a “researcher” read-only tools), and **parallelism** — spawn several on independent tasks and they run together. Define reusable ones as Markdown in `.claude/agents/`.",
            "**Sub-agent** — це свіжий Claude, якому ти даєш побічний квест. Він працює у **власному context window** зі своїм system prompt, доступом до tools і правами, робить галасливу роботу — читає десятки файлів, довгі пошуки — і повертає **лише summary**. Сирий матеріал так і не потрапляє в головну розмову. Це дає три речі заразом: **чистий головний context** (дослідження поза твоїм вікном), **примусові обмеження** (дай «досліднику» лише read-only tools) і **паралелізм** — запусти кількох на незалежних задачах, і вони йдуть разом. Багаторазові описуй як Markdown у `.claude/agents/`.",
          ),
        },
        { kind: "sim", sim: "sub-agent-fanout" },
        {
          kind: "code",
          lang: "markdown",
          code: "# .claude/agents/security-reviewer.md\n---\nname: security-reviewer\ndescription: Reviews diffs for security issues. Use after writing auth or input-handling code.\ntools: Read, Grep, Glob          # omit to inherit all; here, read-only by design\nmodel: sonnet                    # or: opus | haiku | inherit\n---\nYou are a security reviewer. Inspect the change for injection, authz gaps and\nsecret leaks. Return findings as a short, prioritized list — nothing else.",
          note: L("Frontmatter (name · description · tools · model) decides when Claude delegates and what the sub-agent may touch.", "Frontmatter (name · description · tools · model) вирішує, коли Claude делегує і чого sub-agent може торкатись."),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Fan-out trades tokens for time — only on independent work", "Fan-out міняє токени на час — лише на незалежній роботі"),
          md: L(
            "Parallel sub-agents finish in about the time of the **slowest** task instead of the **sum** — a big wall-clock win. But each sub-agent re-pays its own context overhead, so you spend **more tokens** (more money). And the win only exists when tasks are **independent**: a dependent chain (B needs A’s output) gets the cost with none of the speed-up. Reach for fan-out when work splits cleanly; keep it sequential when it doesn’t.",
            "Паралельні sub-agents завершуються приблизно за час **найповільнішої** задачі, а не за **суму** — велика перемога по wall-clock. Але кожен sub-agent наново платить за свій context, тож витрачаєш **більше токенів** (більше грошей). І виграш є лише коли задачі **незалежні**: ланцюг із залежністю (B потребує результат A) дає вартість без прискорення. Бери fan-out, коли робота чисто ділиться; лишай послідовним, коли ні.",
          ),
        },
      ],
    },
    {
      id: "t2",
      title: L("Three scales: sub-agents → background → teams", "Три масштаби: sub-agents → background → teams"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "“More than one Claude” comes in three scales. **Sub-agents** live inside **one session** (above). **Background agents** are many **independent sessions** running in parallel that you watch from one place — they don’t talk to each other. **Agent teams** are sessions that **do** talk: a **lead** decomposes the job into a shared **task list**, teammates **claim** tasks, each works in its own context (often its own git worktree), they **message** each other, and a finished task **auto-unblocks** the ones that depend on it. Agent teams are **git-coordinated** and launched **Feb 5, 2026 with Opus 4.6** — still experimental, behind a flag.",
            "«Більш ніж один Claude» буває у трьох масштабах. **Sub-agents** живуть усередині **однієї сесії** (вище). **Background agents** — це багато **незалежних сесій** паралельно, за якими ти стежиш з одного місця — вони не спілкуються між собою. **Agent teams** — сесії, що **таки** спілкуються: **lead** розбиває задачу на спільний **task list**, тіммейти **беруть** задачі, кожен працює у власному context (часто у власному git worktree), вони **обмінюються повідомленнями**, а завершена задача **авторозблоковує** залежні. Agent teams **git-координовані** й вийшли **5 лютого 2026 з Opus 4.6** — досі експериментальні, за прапорцем.",
          ),
        },
        { kind: "figure", fig: "agent-scales", caption: L("From isolated sub-agents in one session, to many parallel sessions watched from one place, to a team whose sessions message each other and coordinate over git.", "Від ізольованих sub-agents в одній сесії, до багатьох паралельних сесій з одного місця, до команди, чиї сесії листуються й координуються через git.") },
        {
          kind: "table",
          head: [L("Scale", "Масштаб"), L("What it is", "Що це"), L("Coordination", "Координація")],
          rows: [
            [L("Sub-agents", "Sub-agents"), L("Workers inside one session", "Воркери всередині однієї сесії"), L("Parent spawns, waits, merges summaries", "Батько спавнить, чекає, зливає summaries")],
            [L("Background agents", "Background agents"), L("Many independent sessions in parallel", "Багато незалежних сесій паралельно"), L("Watched from one place; no talking", "Спостереження з одного місця; без спілкування")],
            [L("Agent teams", "Agent teams"), L("Sessions that message each other", "Сесії, що листуються"), L("Shared task list + git worktrees; auto-unblock", "Спільний task list + git worktrees; авторозблок")],
          ],
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Proof of scale: a C compiler by a team of Claudes", "Доказ масштабу: C-компілятор від команди Claude"),
          md: L(
            "To stress-test agent teams, Anthropic had a team of **16 Opus 4.6 agents** write a roughly **100,000-line C compiler** (in Rust) that builds the **Linux 6.9** kernel on x86, ARM and RISC-V — coordinating over about **2,000 sessions** via Git, a **lock-file task queue**, and a **Docker container per agent**, mostly hands-off after setup. The lesson isn’t “fire 16 agents at everything” — it’s that with the right coordination substrate (git + tasks + isolation), parallel agents can sustain a genuinely large project.",
            "Щоб навантажити agent teams, Anthropic доручила команді з **16 агентів Opus 4.6** написати приблизно **100 000-рядковий C-компілятор** (на Rust), що збирає ядро **Linux 6.9** на x86, ARM і RISC-V — координуючись близько **2000 сесій** через Git, **lock-file чергу задач** і **Docker-контейнер на агента**, здебільшого без рук після налаштування. Урок не «кидай 16 агентів на все» — а що з правильним підґрунтям координації (git + задачі + ізоляція) паралельні агенти витягують справді великий проєкт.",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("Git worktrees & parallelization", "Git worktrees і паралелізація"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "How do parallel agents avoid trashing each other’s files? **Git worktrees.** `git worktree add` gives each agent its own working directory **and branch**, backed by the same repository history — so edits never collide on disk. Claude Code can place sub-agent or teammate work in worktrees automatically (the `isolation: worktree` option; by default under `.claude/worktrees/`), and merge the branches at the end.",
            "Як паралельні агенти не псують файли одне одного? **Git worktrees.** `git worktree add` дає кожному агенту власну робочу теку **й гілку** на спільній історії репозиторію — тож правки не стикаються на диску. Claude Code вміє автоматично класти роботу sub-agent чи тіммейта у worktrees (опція `isolation: worktree`; за замовчуванням у `.claude/worktrees/`) і зливати гілки в кінці.",
          ),
        },
        {
          kind: "code",
          lang: "bash",
          code: "# give each agent its own branch + directory on the same repo\ngit worktree add ../feature-auth feature-auth\ngit worktree add ../feature-api  feature-api\n# ...agents work in parallel, then you merge the branches and test the RESULT",
          note: L("Same .git history, separate working dirs — no file collisions while they run.", "Спільна історія .git, окремі робочі теки — без зіткнень файлів під час роботи."),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Worktrees solve file collisions — not logic or runtime ones", "Worktrees розвʼязують зіткнення файлів — не логіки чи runtime"),
          md: L(
            "This is the staff-level trap. Worktrees stop two agents from overwriting the **same file**, but two branches can each merge **cleanly** and still produce **broken code** (a semantic conflict — both changed the same function’s assumptions). And agents still share **runtime** state: ports, databases, caches, env. So: decompose by **domain** (not by overlapping files), **merge early and often**, run agents in isolated environments where it matters, and **run the full test suite on the merged result** — a green per-branch build proves nothing about the whole.",
            "Це пастка рівня staff. Worktrees не дають двом агентам перезаписати **той самий файл**, але дві гілки можуть кожна злитися **чисто** й усе одно дати **зламаний код** (семантичний конфлікт — обидва змінили припущення тієї самої функції). І агенти все ще ділять **runtime**: порти, бази, кеші, env. Тож: розбивай за **доменом** (а не за перетином файлів), **зливай рано й часто**, запускай агентів в ізольованих середовищах, де це важливо, і **ганяй увесь набір тестів на злитому результаті** — зелена збірка по гілці нічого не доводить про ціле.",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Skills vs sub-agents — when which", "Skills vs sub-agents — що коли"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Both extend Claude, but in opposite ways. A **Skill** loads packaged expertise into the **same** context and is **auto-invoked** when its description matches — passive, cheap, portable across surfaces, ideal for “do this specific thing well” (fill a PDF, follow our PR checklist). A **sub-agent** runs in a **separate** context you **explicitly delegate** to — active, isolatable, parallelizable, costlier, ideal for “go do a big, noisy job and report back”. They compose: a sub-agent can use skills inside its own window.",
            "Обидва розширюють Claude, але протилежно. **Skill** вантажить запаковану експертизу в **той самий** context і **авто-викликається**, коли збігається опис — пасивний, дешевий, портативний між поверхнями, ідеальний для «зроби цю конкретну річ добре» (заповнити PDF, пройти наш PR-чеклист). **Sub-agent** працює в **окремому** context, якому ти **явно делегуєш** — активний, ізольовний, паралелізовний, дорожчий, ідеальний для «піди зроби велику галасливу роботу й відзвітуй». Вони поєднуються: sub-agent може користуватись skills у власному вікні.",
          ),
        },
        {
          kind: "compare",
          a: L("Skill", "Skill"),
          b: L("Sub-agent", "Sub-agent"),
          rows: [
            [L("Context", "Context"), L("Same window as the conversation", "Те саме вікно, що й розмова"), L("Its own separate window", "Власне окреме вікно")],
            [L("Invocation", "Виклик"), L("Auto, when the description matches", "Авто, коли збігається опис"), L("Explicit delegation", "Явне делегування")],
            [L("Parallel?", "Паралельно?"), L("No — runs inline", "Ні — виконується inline"), L("Yes — many at once", "Так — багато водночас")],
            [L("Cost", "Вартість"), L("Cheap, no extra context", "Дешево, без зайвого context"), L("Higher, its own context", "Вище, власний context")],
            [L("Best for", "Найкраще для"), L("Reusable “do X well”", "Багаторазове «зроби X добре»"), L("Big, noisy, isolatable jobs", "Великі, галасливі, ізольовні задачі")],
          ],
        },
      ],
    },
  ],
  keyPoints: [
    L("A sub-agent runs in its own context window and returns only a summary — preserving your main context, enforcing tool limits, and enabling parallel work.", "Sub-agent працює у власному context window і повертає лише summary — береже головний context, примушує ліміти tools і вмикає паралельну роботу."),
    L("Fan-out trades tokens for time: N parallel sub-agents finish in about the slowest task’s time but cost N separate contexts — and only when the tasks are independent.", "Fan-out міняє токени на час: N паралельних sub-agents завершуються за час найповільнішої задачі, але коштують N окремих context — і лише коли задачі незалежні."),
    L("Three scales: sub-agents (one session) → background agents (many parallel sessions, no talking) → agent teams (sessions that message and git-coordinate).", "Три масштаби: sub-agents (одна сесія) → background agents (багато паралельних сесій, без спілкування) → agent teams (сесії, що листуються й git-координуються)."),
    L("Agent teams (git-coordinated; launched Feb 5 2026 with Opus 4.6, experimental) use a shared task list + worktrees; dependencies auto-unblock as tasks complete.", "Agent teams (git-координовані; вийшли 5 лютого 2026 з Opus 4.6, експериментальні) мають спільний task list + worktrees; залежності авторозблоковуються в міру завершення."),
    L("Worktrees solve file collisions, not semantic or runtime ones — decompose by domain and test the merged result. Skill = same context, auto-invoked; sub-agent = separate context, explicit delegation.", "Worktrees розвʼязують зіткнення файлів, не семантичні чи runtime — розбивай за доменом і тестуй злите. Skill = той самий context, авто-виклик; sub-agent = окремий context, явне делегування."),
  ],
  pitfalls: [
    { title: L("“Parallelize everything”", "«Паралелити все»"), body: L("Fan-out multiplies token cost and gives zero speed-up on dependent task chains. Reserve it for genuinely independent work; keep dependent steps sequential.", "Fan-out множить вартість у токенах і не дає прискорення на ланцюгах із залежностями. Лиши його для справді незалежної роботи; залежні кроки тримай послідовними.") },
    { title: L("Trusting a clean merge", "Довіряти чистому merge"), body: L("Worktrees prevent file clashes, but two branches can merge into broken logic, and runtime state (ports, DB, cache) is shared. Test the merged whole, not just each branch.", "Worktrees не дають зіткнень файлів, але дві гілки можуть злитися в зламану логіку, а runtime (порти, БД, кеш) — спільний. Тестуй злите ціле, а не лише кожну гілку.") },
    { title: L("Skill where a sub-agent fits (or vice versa)", "Skill там, де треба sub-agent (і навпаки)"), body: L("A recurring, in-context “do X well” is a Skill; a noisy, isolatable, parallel job is a sub-agent. Picking the wrong one wastes context or money.", "Повторюване «зроби X добре» в межах context — це Skill; галаслива, ізольовна, паралельна задача — sub-agent. Хибний вибір марнує context або гроші.") },
  ],
  interview: [
    { q: L("Why does a sub-agent “save context” if it still does the work?", "Чому sub-agent «економить context», якщо все одно робить роботу?"), a: L("Because the work and all its raw material live in the sub-agent’s own window; only a compact summary returns to the parent, so your main context stays small and on-task. The cost moves elsewhere — each sub-agent re-pays its own base context, so you spend more tokens. That’s the trade: money for a clean window and parallelism.", "Бо робота і весь сирий матеріал живуть у власному вікні sub-agent; до батька повертається лише стислий summary, тож головний context лишається малим і по суті. Вартість зміщується — кожен sub-agent наново платить за свій базовий context, тож токенів більше. Це і є компроміс: гроші за чисте вікно й паралелізм."), level: "staff" },
    { q: L("When do agent teams beat plain sub-agents?", "Коли agent teams кращі за звичайні sub-agents?"), a: L("When the job is large, long-running, and splits into interdependent pieces that benefit from coordination. Teammates share a task list, message each other, work on separate git worktrees, and finished tasks auto-unblock their dependents. Sub-agents can’t talk or coordinate beyond what the parent passes in and merges — they’re for bounded, independent side-quests.", "Коли задача велика, тривала й ділиться на взаємозалежні частини, яким корисна координація. Тіммейти ділять task list, листуються, працюють на окремих git worktrees, а завершені задачі авторозблоковують залежні. Sub-agents не можуть спілкуватись чи координуватись поза тим, що передає й зливає батько — вони для обмежених незалежних квестів."), level: "staff" },
    { q: L("A worktree merge is clean — are you safe to ship?", "Merge worktree чистий — можна релізити?"), a: L("No. Worktrees only prevent file-level collisions. Two agents can edit the same function’s assumptions on separate branches and merge into logically broken code, and they share runtime state — ports, databases, caches. Decompose by domain, merge early, and run the full test suite on the merged result; a green per-branch build proves nothing about the whole.", "Ні. Worktrees запобігають лише зіткненням на рівні файлів. Два агенти можуть змінити припущення тієї самої функції на різних гілках і злитися в логічно зламаний код, а ще ділять runtime — порти, бази, кеші. Розбивай за доменом, зливай рано й ганяй увесь набір тестів на злитому результаті; зелена збірка по гілці нічого не доводить про ціле."), level: "staff" },
  ],
  seeAlso: ["m22", "m24", "m12", "m10"],
  sources: [
    { title: "Create custom subagents — Claude Code Docs", url: "https://code.claude.com/docs/en/sub-agents" },
    { title: "Orchestrate teams of Claude Code sessions (agent teams) — Claude Code Docs", url: "https://code.claude.com/docs/en/agent-teams" },
    { title: "Run parallel sessions with git worktrees — Claude Code Docs", url: "https://code.claude.com/docs/en/worktrees" },
    { title: "Claude Opus 4.6 (agent teams launch) — Anthropic", url: "https://www.anthropic.com/news/claude-opus-4-6" },
    { title: "Building a C compiler with a team of parallel Claudes — Anthropic Engineering", url: "https://www.anthropic.com/engineering/building-c-compiler" },
  ],
};

/* ======================================================================
   M24 · Hooks, slash commands & advanced agentic patterns — fully authored (S8)
   ====================================================================== */
const m24: Module = {
  id: "m24",
  section: "s5",
  order: 24,
  level: "staff",
  title: L("Hooks, slash commands & advanced agentic patterns", "Hooks, slash commands і просунуті agentic-патерни"),
  tagline: L(
    "Hooks are deterministic gates around the loop; slash commands are shortcuts into it; patterns and harnesses are how you orchestrate it at scale.",
    "Hooks — детерміновані ворота навколо циклу; slash commands — скорочення в нього; патерни й harnesses — як ти оркеструєш його в масштабі.",
  ),
  readMins: 10,
  mentalModel: L(
    "The agent loop is probabilistic; hooks make chosen moments guaranteed, commands make them fast, and a harness is the program that runs the whole loop for you.",
    "Agent loop імовірнісний; hooks роблять обрані моменти гарантованими, commands — швидкими, а harness — це програма, що крутить увесь цикл за тебе.",
  ),
  topics: [
    {
      id: "t1",
      title: L("Hooks: deterministic gates around the loop", "Hooks: детерміновані ворота навколо циклу"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "The model is probabilistic; sometimes you need a **guarantee**. A **hook** is a shell command (or HTTP endpoint, MCP tool, or even a mini-agent) that Claude Code runs **automatically** at a fixed point in its lifecycle — so the behaviour happens **every time**, not just when the model remembers. The pivotal event is **PreToolUse**: your hook sees the tool and its input and can **block** the call by returning a deny decision — refuse `rm -rf`, refuse reading `.env`. The others **observe** or **inject**: **PostToolUse** to auto-format/lint/test after every edit, **SessionStart** to load project rules, **Stop**/**SubagentStop** to notify or log.",
            "Модель імовірнісна; іноді потрібна **гарантія**. **Hook** — це shell-команда (або HTTP-endpoint, MCP-tool чи навіть міні-агент), яку Claude Code запускає **автоматично** у фіксованій точці життєвого циклу — тож поведінка настає **щоразу**, а не коли модель згадає. Ключова подія — **PreToolUse**: твій hook бачить tool і його вхід і може **заблокувати** виклик, повернувши deny-рішення — відмовити `rm -rf`, відмовити читанню `.env`. Інші **спостерігають** чи **інжектять**: **PostToolUse** — авто-format/lint/test після кожної правки, **SessionStart** — завантажити правила проєкту, **Stop**/**SubagentStop** — сповістити чи залогувати.",
          ),
        },
        { kind: "figure", fig: "hook-lifecycle", caption: L("Hooks hang off lifecycle events. PreToolUse can block a call; PostToolUse, SessionStart and Stop observe or inject — and they run deterministically, not when the model remembers.", "Hooks висять на подіях циклу. PreToolUse може блокувати виклик; PostToolUse, SessionStart і Stop спостерігають чи інжектять — і працюють детерміновано, а не коли модель згадає.") },
        {
          kind: "table",
          head: [L("Event", "Подія"), L("Fires", "Спрацьовує"), L("Typical hook", "Типовий hook")],
          rows: [
            [L("SessionStart", "SessionStart"), L("Session begins or resumes", "Сесія починається/відновлюється"), L("Inject rules, set up env", "Інжект правил, налаштування env")],
            [L("UserPromptSubmit", "UserPromptSubmit"), L("You send a prompt", "Ти надсилаєш prompt"), L("Add context, validate input", "Додати context, валідувати вхід")],
            [L("PreToolUse", "PreToolUse"), L("Before a tool runs — can block", "Перед запуском tool — може блокувати"), L("Refuse rm -rf, protect secrets", "Відмовити rm -rf, берегти секрети")],
            [L("PostToolUse", "PostToolUse"), L("After a tool succeeds", "Після успіху tool"), L("Format, lint, run tests", "Format, lint, тести")],
            [L("SubagentStop", "SubagentStop"), L("A sub-agent finishes", "Sub-agent завершує"), L("Collect results, log", "Зібрати результати, лог")],
            [L("Stop / SessionEnd", "Stop / SessionEnd"), L("Turn ends / session ends", "Хід завершено / сесія завершена"), L("Notify, audit, clean up", "Сповістити, аудит, прибирання")],
          ],
        },
        {
          kind: "code",
          lang: "json",
          code: "// .claude/settings.json — block destructive Bash, format after edits\n{\n  \"hooks\": {\n    \"PreToolUse\": [{ \"matcher\": \"Bash\",\n      \"hooks\": [{ \"type\": \"command\", \"command\": \".claude/hooks/block-rm.sh\" }] }],\n    \"PostToolUse\": [{ \"matcher\": \"Edit|Write\",\n      \"hooks\": [{ \"type\": \"command\", \"command\": \".claude/hooks/format.sh\" }] }]\n  }\n}",
          note: L("A command hook reads the event JSON on stdin; to block, it returns a permissionDecision of “deny”. Handler types: command · http · mcp_tool · prompt · agent.", "Command-hook читає JSON події зі stdin; щоб заблокувати, повертає permissionDecision «deny». Типи: command · http · mcp_tool · prompt · agent."),
        },
        {
          kind: "callout",
          tone: "security",
          title: L("A hook is code execution — trust it like one", "Hook — це виконання коду — і довіра відповідна"),
          md: L(
            "Hooks run as **shell commands with your full user permissions**, the moment they’re registered. A malicious hook in a repo you cloned is arbitrary code on your machine — **review hooks before enabling**, especially from plugins or shared settings. Enterprises can restrict to managed, vetted hooks. The flip side is the feature’s strength: because a hook always runs, it’s the right tool for a hard guarantee (block this, always test that) — not a place for judgement that needs the model.",
            "Hooks виконуються як **shell-команди з твоїми повними правами користувача** з моменту реєстрації. Зловмисний hook у склонованому репо — це довільний код на твоїй машині — **переглядай hooks перед увімкненням**, надто з плагінів чи спільних налаштувань. Підприємства можуть обмежитись керованими, перевіреними hooks. Зворотний бік — і сила фічі: оскільки hook завжди виконується, це правильний інструмент для жорсткої гарантії (заблокуй це, завжди тестуй те) — а не місце для суджень, що потребують моделі.",
          ),
        },
      ],
    },
    {
      id: "t2",
      title: L("Slash commands & output styles", "Slash commands і output styles"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "**Slash commands** are shortcuts into the loop. Built-ins include `/model`, `/init`, `/memory`, `/permissions`, `/mcp`, `/agents`, `/hooks`, `/clear`. You add your own as Markdown — and crucially **custom commands and Skills have merged**: a `.claude/commands/deploy.md` and a `.claude/skills/deploy/SKILL.md` both create `/deploy`. Commands take `$ARGUMENTS`, can run `!`-prefixed bash and pull in `@`-files, and use frontmatter (`allowed-tools`, `argument-hint`). **Output styles** swap the agent’s persona through its system prompt — built-ins like **Explanatory** and **Learning**, plus custom ones in `.claude/output-styles/`; they change tone and behaviour, **not** the model or its cost.",
            "**Slash commands** — скорочення в цикл. Вбудовані: `/model`, `/init`, `/memory`, `/permissions`, `/mcp`, `/agents`, `/hooks`, `/clear`. Свої додаєш як Markdown — і важливо: **custom commands і Skills злилися**: `.claude/commands/deploy.md` і `.claude/skills/deploy/SKILL.md` обидва створюють `/deploy`. Команди беруть `$ARGUMENTS`, можуть запускати bash із префіксом `!` і підтягувати `@`-файли, мають frontmatter (`allowed-tools`, `argument-hint`). **Output styles** міняють персону агента через system prompt — вбудовані як **Explanatory** і **Learning**, плюс власні у `.claude/output-styles/`; вони змінюють тон і поведінку, **а не** модель чи її вартість.",
          ),
        },
        {
          kind: "code",
          lang: "markdown",
          code: "# .claude/commands/review.md   ->   invoke as:  /review src/auth\n---\ndescription: Review the given path for bugs and security issues\nargument-hint: <path>\nallowed-tools: Read, Grep, Bash(git diff:*)\n---\nReview $ARGUMENTS. Here is the current diff:\n!git diff\nFocus on correctness and security; return a prioritized list.",
          note: L("$ARGUMENTS injects the path; ! runs bash; @ inlines a file. The same file placed as a skill makes the same /review command.", "$ARGUMENTS вставляє шлях; ! запускає bash; @ вставляє файл. Той самий файл як skill дає ту саму команду /review."),
        },
      ],
    },
    {
      id: "t3",
      title: L("Patterns: fan-out, pipeline, consensus, research", "Патерни: fan-out, pipeline, consensus, research"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "The same primitives — sub-agents, hooks, commands — compose into repeatable **patterns**. The art is matching the pattern to the shape of the problem: independent work fans out, sequential work pipelines, judgement-heavy work debates, and open questions get researched in parallel.",
            "Ті самі примітиви — sub-agents, hooks, commands — складаються у повторювані **патерни**. Мистецтво — підібрати патерн до форми задачі: незалежна робота розгалужується, послідовна йде конвеєром, оцінкова — дебатує, а відкриті питання досліджуються паралельно.",
          ),
        },
        {
          kind: "table",
          head: [L("Pattern", "Патерн"), L("For", "Для"), L("Built from", "З чого")],
          rows: [
            [L("Fan-out / scatter-gather", "Fan-out / scatter-gather"), L("Independent subtasks at once", "Незалежні підзадачі водночас"), L("Parallel sub-agents, then merge", "Паралельні sub-agents, потім злиття")],
            [L("Pipeline", "Pipeline"), L("Sequential stages", "Послідовні етапи"), L("lint, fix, test, commit — hook-gated", "lint, fix, test, commit — через hooks")],
            [L("Consensus / debate", "Consensus / debate"), L("Hard judgement calls", "Складні оцінкові рішення"), L("N personas or models, plus a judge", "N персон чи моделей, плюс суддя")],
            [L("Auto-research", "Auto-research"), L("Open questions", "Відкриті питання"), L("Parallel research agents, synthesized", "Паралельні дослідники, синтез")],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("You’ve already met these", "Ти вже їх бачив"),
          md: L(
            "The **fan-out** pattern is exactly M23’s Sub-agent Fan-out sim. **Auto-research** is how a deep-research skill works — split a question into sub-questions, research them in parallel, then synthesize and cross-check. **Consensus** counters a single model’s blind spots by making it argue with itself (or another model) before a judge decides.",
            "Патерн **fan-out** — це і є сим Sub-agent Fan-out із M23. **Auto-research** — так працює deep-research skill: поділи питання на під-питання, дослідь паралельно, потім синтезуй і перехрести. **Consensus** долає сліпі плями однієї моделі, змушуючи її сперечатися із собою (чи з іншою моделлю) перед рішенням судді.",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Harnesses & orchestration", "Harnesses і оркестрація"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "A **harness** is the software **around** the model — the loop that splits work, spawns agents, hands out tools, verifies output, picks which model does which step, and decides when the job is done. Claude Code ships one harness tuned for coding; **Dynamic Workflows** (research preview, June 2 2026) let Claude **write its own** harness on the fly — a JavaScript orchestration script that can run **up to ~1,000 sub-agents** with a do-work → adversarial-review → apply loop, built to fight **agentic laziness**, **self-preferential bias** (a model trusting its own output) and **goal drift** on huge tasks. For programmatic control you drop to the **Claude Agent SDK** (the renamed Claude Code SDK) and **headless mode** (`claude -p`) to embed the agent in scripts, CI and your own products.",
            "**Harness** — це програма **навколо** моделі — цикл, що ділить роботу, спавнить агентів, роздає tools, перевіряє вивід, обирає, яка модель робить який крок, і вирішує, коли роботу завершено. Claude Code постачає один harness, налаштований під код; **Dynamic Workflows** (research preview, 2 червня 2026) дають Claude **писати власний** harness на льоту — JavaScript-скрипт оркестрації, що може запускати **до ~1000 sub-agents** із циклом зробити → змагальне рев’ю → застосувати, створений долати **agentic laziness**, **self-preferential bias** (модель довіряє власному виводу) і **goal drift** на величезних задачах. Для програмного контролю спускаєшся до **Claude Agent SDK** (перейменований Claude Code SDK) і **headless** (`claude -p`), щоб вбудувати агента у скрипти, CI і власні продукти.",
          ),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Determinism vs autonomy — pick per task", "Детермінізм vs автономність — обирай під задачу"),
          md: L(
            "Hooks and pipelines make behaviour **guaranteed and auditable**; harnesses and dynamic workflows make it **scalable but non-deterministic** — Claude writes a different harness each run. For anything with an exact-output contract (a release, a migration), wrap generated orchestration in **tests and review gates**. Use dynamic workflows for exploration and breadth; use hooks for the lines you never want crossed.",
            "Hooks і pipelines роблять поведінку **гарантованою й аудитованою**; harnesses і dynamic workflows — **масштабованою, але недетермінованою**: Claude пише інший harness щоразу. Для будь-чого з контрактом точного виводу (реліз, міграція) обгортай згенеровану оркестрацію **тестами й воротами рев’ю**. Бери dynamic workflows для дослідження й широти; hooks — для меж, які ніколи не можна переходити.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("Hooks are deterministic actions on lifecycle events; PreToolUse can block a tool call, PostToolUse/SessionStart/Stop observe or inject — guaranteed behaviour, not “if the model remembers”.", "Hooks — детерміновані дії на подіях циклу; PreToolUse може блокувати виклик tool, PostToolUse/SessionStart/Stop спостерігають чи інжектять — гарантована поведінка, а не «якщо модель згадає»."),
    L("Configure hooks in settings.json (event → matcher → handler); handler types are command, http, mcp_tool, prompt, agent; a command hook returns a “deny” decision to block.", "Налаштовуй hooks у settings.json (подія → matcher → handler); типи: command, http, mcp_tool, prompt, agent; command-hook повертає рішення «deny», щоб заблокувати."),
    L("Slash commands are shortcuts; custom commands and Skills have merged (.claude/commands/x.md or skills/x/SKILL.md both make /x); output styles change persona via the system prompt, not the model.", "Slash commands — скорочення; custom commands і Skills злилися (.claude/commands/x.md чи skills/x/SKILL.md обидва дають /x); output styles міняють персону через system prompt, не модель."),
    L("Patterns compose sub-agents + hooks + commands: fan-out, pipeline, consensus/debate, auto-research — match the pattern to the problem’s shape.", "Патерни складають sub-agents + hooks + commands: fan-out, pipeline, consensus/debate, auto-research — підбирай патерн під форму задачі."),
    L("A harness is the orchestration around the model; Dynamic Workflows (June 2026, research preview) let Claude write its own JS harness (up to ~1,000 sub-agents); the Claude Agent SDK + headless -p give programmatic control.", "Harness — це оркестрація навколо моделі; Dynamic Workflows (червень 2026, research preview) дають Claude писати власний JS-harness (до ~1000 sub-agents); Claude Agent SDK + headless -p дають програмний контроль."),
  ],
  pitfalls: [
    { title: L("Using a hook where a prompt belongs (or vice versa)", "Hook там, де треба prompt (і навпаки)"), body: L("Hooks are for guarantees — block, format, test. Don’t encode model judgement in a hook; and don’t rely on the model to “always” lint — that’s a hook’s job.", "Hooks — для гарантій: заблокувати, відформатувати, протестувати. Не закладай у hook судження моделі; і не покладайся на модель, що вона «завжди» лінтить — це робота hook.") },
    { title: L("Untrusted hooks and commands", "Недовірені hooks і commands"), body: L("A hook or command file in a cloned repo runs with your permissions — arbitrary code execution. Review before enabling; orgs can lock to managed hooks.", "Файл hook чи command у склонованому репо виконується з твоїми правами — довільне виконання коду. Переглянь перед увімкненням; організації можуть обмежитись керованими hooks.") },
    { title: L("Treating harnesses as deterministic", "Вважати harnesses детермінованими"), body: L("Dynamic workflows write a new harness each run. For exact-output work, gate generated orchestration with tests; don’t assume two runs produce the same plan.", "Dynamic workflows пишуть новий harness щоразу. Для роботи з точним виводом став ворота-тести на згенеровану оркестрацію; не вважай, що два запуски дадуть той самий план.") },
  ],
  interview: [
    { q: L("Hook or CLAUDE.md instruction — when do you use each?", "Hook чи інструкція в CLAUDE.md — коли що?"), a: L("CLAUDE.md asks the model to behave a certain way — probabilistic, and it can be ignored under load. A hook makes it happen — deterministic, every time. Use CLAUDE.md for guidance and preferences; use a PreToolUse/PostToolUse hook for hard guarantees: block dangerous commands, always format and test. If “sometimes” isn’t acceptable, it’s a hook.", "CLAUDE.md просить модель поводитись певним чином — імовірнісно, і під навантаженням може ігноруватись. Hook робить це — детерміновано, щоразу. Бери CLAUDE.md для настанов і вподобань; PreToolUse/PostToolUse-hook — для жорстких гарантій: блокувати небезпечні команди, завжди форматувати й тестувати. Якщо «іноді» неприйнятно — це hook."), level: "staff" },
    { q: L("How would you make sure Claude can never run a destructive command?", "Як гарантувати, що Claude ніколи не виконає руйнівну команду?"), a: L("Belt and suspenders, both deterministic: a deny permission rule (e.g. Bash(rm:*)) plus a PreToolUse hook matching Bash that inspects the command and returns a “deny” decision. Neither relies on the model choosing well, and the hook can encode arbitrary logic the rule can’t.", "Подвійний запобіжник, обидва детерміновані: deny-правило permission (напр. Bash(rm:*)) плюс PreToolUse-hook на Bash, що перевіряє команду й повертає рішення «deny». Жоден не покладається на вдалий вибір моделі, а hook може закодувати довільну логіку, яку правило не може."), level: "staff" },
    { q: L("What do Dynamic Workflows solve over plain sub-agent fan-out?", "Що Dynamic Workflows розвʼязують поверх звичайного fan-out?"), a: L("At large scale a fixed harness plus manual fan-out hits agentic laziness, self-preferential verification, and goal drift. Dynamic workflows let Claude generate a task-specific harness — a JS orchestrator that can coordinate up to ~1,000 sub-agents with built-in adversarial review and an apply loop — trading determinism for scale. You gate the output with tests when correctness is contractual.", "На великому масштабі фіксований harness плюс ручний fan-out натикається на agentic laziness, самопреференційну перевірку й goal drift. Dynamic workflows дають Claude згенерувати harness під задачу — JS-оркестратор, що координує до ~1000 sub-agents із вбудованим змагальним рев’ю й циклом застосування — міняючи детермінізм на масштаб. Вивід ставиш під ворота-тести, коли коректність контрактна."), level: "staff" },
  ],
  seeAlso: ["m23", "m22", "m25", "m13"],
  sources: [
    { title: "Hooks reference — Claude Code Docs", url: "https://code.claude.com/docs/en/hooks" },
    { title: "Automate actions with hooks — Claude Code Docs", url: "https://code.claude.com/docs/en/hooks-guide" },
    { title: "Slash commands — Claude Code Docs", url: "https://code.claude.com/docs/en/slash-commands" },
    { title: "Output styles — Claude Code Docs", url: "https://code.claude.com/docs/en/output-styles" },
    { title: "A harness for every task: dynamic workflows in Claude Code — Claude", url: "https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code" },
  ],
};

/* ======================================================================
   M25 · Security & safe agent use — fully authored (S10a)
   ====================================================================== */
const m25: Module = {
  id: "m25",
  section: "s6",
  order: 25,
  level: "senior",
  title: L("Security & safe agent use", "Безпека та безпечне використання агентів"),
  tagline: L(
    "An agent reads from an untrusted world and acts on your trusted one — security is keeping those two facts from meeting in a way that hurts you.",
    "Agent читає з недовіреного світу і діє у твоєму довіреному — безпека в тому, щоб ці два факти не зустрілися так, що зашкодять тобі.",
  ),
  readMins: 9,
  mentalModel: L(
    "Treat everything the agent reads from outside as untrusted, and give it the least power that still does the job — an attack needs both to land.",
    "Стався до всього, що agent читає ззовні, як до недовіреного, і давай йому найменше прав, яких вистачає для задачі — атаці потрібні обидва, щоб спрацювати.",
  ),
  topics: [
    {
      id: "t1",
      title: L("Permissions & least privilege", "Дозволи та least privilege"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Every agent surface ships with a permission model, and they share one shape: a choice between **asking first** and **acting freely**, plus hard gates that never open without you. In Cowork and Claude in Chrome the two modes are **Ask before acting** (Claude pauses for approval) and **Act without asking** (it runs to the end). Anthropic is explicit that **Act without asking** raises your exposure — use it only when you are supervising, on trusted files and sites, and able to stop Claude.",
            "Кожна поверхня-agent має модель дозволів, і всі вони однієї форми: вибір між **спитати спершу** і **діяти вільно**, плюс жорсткі gate, що не відкриваються без тебе. У Cowork і Claude in Chrome два режими — **Ask before acting** (Claude робить паузу для підтвердження) і **Act without asking** (працює до кінця). Anthropic прямо каже: **Act without asking** підвищує ризик — вмикай лише коли наглядаєш, на довірених файлах і сайтах, і можеш зупинити Claude.",
          ),
        },
        {
          kind: "compare",
          a: L("Ask before acting", "Ask before acting"),
          b: L("Act without asking", "Act without asking"),
          rows: [
            [L("Posture", "Поведінка"), L("Pauses for approval before each action", "Пауза для підтвердження перед кожною дією"), L("Runs to the end without pausing", "Працює до кінця без пауз")],
            [L("Best for", "Найкраще для"), L("The open web, others’ content, money, anything irreversible", "Відкритий веб, чужий контент, гроші, будь-що незворотне"), L("Trusted files & sites, tedious reversible work you watch", "Довірені файли й сайти, рутинна зворотна робота під наглядом")],
            [L("Injection risk", "Ризик injection"), L("Lower — you gate each step", "Нижчий — ти контролюєш кожен крок"), L("Higher — Anthropic flags it explicitly", "Вищий — Anthropic прямо попереджає")],
            [L("Always-ask gates", "Завжди-питати gate"), L("Delete · purchase · credentials · permissions", "Видалення · покупка · креденшели · дозволи"), L("Same gates still hold", "Ті самі gate лишаються")],
          ],
        },
        {
          kind: "prose",
          md: L(
            "Underneath the mode, surfaces separate **read tools** (see content — read an inbox, take a screenshot) from **write tools** (change the world — send an invite, delete a file, run a command). Write tools get the scrutiny. And some actions are gated in **both** modes: Cowork requires an explicit **Allow** before permanently deleting any file; Claude in Chrome always asks before purchases, permanent deletion, creating accounts, or changing permission settings — even with **Always allow** on a site.",
            "Під режимом поверхні розрізняють **read tools** (бачити контент — прочитати інбокс, зробити скриншот) і **write tools** (міняти світ — надіслати запрошення, видалити файл, виконати команду). Саме write tools під пильним наглядом. А деякі дії під gate в **обох** режимах: Cowork вимагає явного **Allow** перед остаточним видаленням будь-якого файлу; Claude in Chrome завжди питає перед покупками, остаточним видаленням, створенням акаунтів чи зміною налаштувань дозволів — навіть із **Always allow** на сайті.",
          ),
        },
        {
          kind: "callout",
          tone: "security",
          title: L("Red lines that hold in every mode", "Червоні лінії, що тримаються в усіх режимах"),
          md: L(
            "Financial transactions, permanent deletion, credential entry, and changing security settings always require you — in both **Ask** and **Act** modes. Never design a workflow that assumes they will be automated away.",
            "Фінансові транзакції, остаточне видалення, введення креденшелів і зміна налаштувань безпеки завжди потребують тебе — і в **Ask**, і в **Act**. Ніколи не будуй workflow, який припускає, що вони стануть автоматичними.",
          ),
        },
        {
          kind: "prose",
          md: L(
            "**Least privilege** is the through-line: grant the *smallest* scope that still does the job. A dedicated working folder, not your home directory. The OAuth scopes a connector actually needs, not all of them. View-only where viewing is enough. The desktop computer-use engine documents this as fixed **access tiers** by app category — **browsers and trading platforms are View only, terminals and IDEs are Click only, everything else is Full control** — caps you cannot widen (see M18).",
            "**Least privilege** — наскрізна ідея: давай *найменший* scope, якого вистачає. Окрема робоча тека, а не домашня директорія. Лише ті OAuth-scope, які connector справді потребує, а не всі. View-only там, де досить перегляду. Десктопний движок computer use фіксує це як **access tiers** за категорією застосунку — **браузери й трейдингові платформи = View only, термінали та IDE = Click only, решта = Full control** — межі, які не можна розширити (див. M18).",
          ),
        },
        {
          kind: "table",
          head: [L("Control", "Контроль"), L("What it means", "Що це означає"), L("Example", "Приклад")],
          rows: [
            [L("Two modes", "Два режими"), L("Ask before acting vs Act without asking", "Ask before acting vs Act without asking"), L("Pause per step, or run autonomously", "Пауза на крок, або автономний запуск")],
            [L("Read vs write tools", "Read vs write tools"), L("Seeing content vs changing the world", "Бачити контент vs міняти світ"), L("Read an inbox vs send an email", "Прочитати інбокс vs надіслати лист")],
            [L("Always-ask gates", "Завжди-питати gate"), L("Actions never automated, in either mode", "Дії, що ніколи не автоматичні, у будь-якому режимі"), L("Permanent delete · purchase · credentials", "Остаточне видалення · покупка · креденшели")],
            [L("Access tiers", "Access tiers"), L("Per-app caps fixed by category (desktop computer use)", "Межі на застосунок за категорією (desktop computer use)"), L("Browsers = View only · terminals/IDEs = Click only", "Браузери = View only · термінали/IDE = Click only")],
            [L("Least privilege", "Least privilege"), L("Grant the smallest scope that works", "Давай найменший робочий scope"), L("A dedicated folder, not your home dir", "Окрема тека, а не домашня директорія")],
          ],
        },
      ],
    },
    {
      id: "t2",
      title: L("Prompt injection & untrusted content", "Prompt injection і недовірений контент"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "The signature risk of an agent isn’t that it turns evil — it’s that it stays **helpful to whoever it’s reading**. When Claude reads a web page, an email, or a tool’s output, that text sits *outside your trust boundary* and may be **crafted by an attacker** to hijack the agent. That is **prompt injection**: instructions smuggled into content, dressed up as data.",
            "Головний ризик agent — не в тому, що він стає злим, а в тому, що він лишається **корисним тому, кого читає**. Коли Claude читає веб-сторінку, лист чи вивід інструмента, цей текст лежить *поза твоєю межею довіри* і може бути **створений зловмисником**, щоб перехопити agent. Це **prompt injection**: інструкції, протягнуті в контент під виглядом даних.",
          ),
        },
        { kind: "figure", fig: "trust-boundaries", caption: L("An injection only harms you if it crosses both gates: Claude reads attacker-controlled text AND can act on your data. Close either gate and it fails.", "Injection шкодить лише якщо проходить обидва gate: Claude читає контрольований атакою текст І може діяти з твоїми даними. Закрий будь-який gate — і атака провалюється.") },
        {
          kind: "prose",
          md: L(
            "The useful part: an injection only hurts you if **two** things are both true — Claude can **read** the attacker’s text **and** can **act** in a way that compromises you. Break either link and the attack collapses. That’s why *untrusted input + powerful action* is the dangerous pairing, and why least privilege (closing the act side) and trusted sources (closing the read side) are the whole game.",
            "Корисна частина: injection шкодить лише якщо **обидва** факти правдиві — Claude може **прочитати** текст атаки **і** може **діяти** так, що шкодить тобі. Розірви будь-яку ланку — і атака розсипається. Тому *недовірений ввід + потужна дія* — небезпечна пара, і тому least privilege (закриває бік дії) і довірені джерела (закривають бік читання) — це вся суть.",
          ),
        },
        {
          kind: "prose",
          md: L(
            "Anthropic defends this in layers: the model is **trained** to refuse instructions embedded in content even when they look authoritative or urgent; **classifiers** scan untrusted content entering the window for hidden text and manipulation; and constant red-teaming (internal and public challenges) keeps probing. Claude in Chrome lists **completing instructions from emails or web content** as a flatly prohibited action, and computer use runs extra on-screen injection scanners.",
            "Anthropic захищається шарами: модель **навчена** відмовлятися від інструкцій, вшитих у контент, навіть коли вони мають авторитетний чи терміновий вигляд; **класифікатори** сканують недовірений контент, що входить у вікно, на прихований текст і маніпуляції; і постійний red-teaming (внутрішні й публічні челенджі) усе пробує на міцність. Claude in Chrome відносить **виконання інструкцій із листів чи веб-контенту** до прямо заборонених дій, а computer use запускає додаткові сканери injection на екрані.",
          ),
        },
        {
          kind: "callout",
          tone: "warn",
          title: L("Defenses lower the odds; they don’t zero them", "Захист знижує шанси, але не до нуля"),
          md: L(
            "Anthropic’s own figure: against an adaptive attacker, current browser defenses cut attack success to about **1%** (Claude Opus 4.5, Nov 2025 testing) — and they stress it is *still meaningful risk; no browser agent is immune*. You are the last layer: watch what the agent reads and where it goes.",
            "Цифра від самої Anthropic: проти адаптивного атакувальника поточний захист браузера знижує успіх атаки до приблизно **1%** (Claude Opus 4.5, тестування лист. 2025) — і вони наголошують: це *все ще суттєвий ризик; жоден браузерний agent не є невразливим*. Ти — останній шар: стеж, що agent читає і куди йде.",
          ),
        },
        {
          kind: "prose",
          md: L(
            "Practical tells that an injection is in progress: the agent visits a site you never asked for, suddenly wants a write or permission the task didn’t need, or announces an urgent new instruction it just discovered. Stop it and inspect.",
            "Практичні ознаки, що injection триває: agent заходить на сайт, якого ти не просив, раптом хоче write чи дозвіл, не потрібний задачі, або оголошує термінову нову інструкцію, яку «щойно знайшов». Зупини й перевір.",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("Link safety & data boundaries", "Безпека посилань і межі даних"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Two boundaries to hold: which **links** the agent follows, and which **data** it can reach. Both are about closing the read and act sides before an attacker can use them.",
            "Дві межі, які треба тримати: яким **посиланням** agent іде і яких **даних** він дістає. Обидві — про закриття боку читання й боку дії, перш ніж атакувальник ними скористається.",
          ),
        },
        {
          kind: "prose",
          md: L(
            "**Links:** treat links in emails, messages, and unknown documents as suspicious by default — that’s exactly where injected instructions hide. See the full URL before following it. Claude in Chrome hard-blocks whole categories — **banking, investment/trading platforms, crypto exchanges, adult content, and pirated-content sites** — and admits the blocklist is incomplete. Beware the **cross-app link trap**: a link clicked in your mail app can open in Chrome even if you never granted Chrome — the link opens even when Claude can’t see the result.",
            "**Посилання:** стався до посилань у листах, повідомленнях і незнайомих документах як до підозрілих за замовчуванням — саме там ховаються вшиті інструкції. Дивись повний URL, перш ніж іти. Claude in Chrome жорстко блокує цілі категорії — **банкінг, інвестиційні/трейдингові платформи, крипто-біржі, контент 18+ і піратські сайти** — і визнає, що блок-лист неповний. Стережися **cross-app link trap**: посилання, клікнуте в поштовому застосунку, може відкритися в Chrome, навіть якщо ти не давав доступ до Chrome — посилання відкриється, навіть коли Claude не бачить результат.",
          ),
        },
        {
          kind: "prose",
          md: L(
            "**Data:** Cowork reaches only the **folders you grant** (use a dedicated one, keep backups), and its **network access is restricted by default** — web fetch runs server-side, limited to search results and URLs you’ve shared. Memory deliberately **excludes passwords, financial, and health details**. Computer use has **no sandbox** and screenshots see whatever is on screen — close sensitive apps first and never grant banking, health, or government apps. Connectors inherit **only the permissions you already have** and use OAuth tokens **scoped to you**; review the scopes and deny anything unnecessary.",
            "**Дані:** Cowork дістає лише **надані теки** (виділи окрему, тримай бекапи), а **доступ до мережі обмежений за замовчуванням** — web fetch працює на сервері, обмежений результатами пошуку й URL, якими ти поділився. Memory свідомо **виключає паролі, фінансові й медичні дані**. Computer use **без sandbox**, і скриншоти бачать усе на екрані — закрий чутливі застосунки заздалегідь і ніколи не давай доступ до банкінгу, здоровʼя чи держпослуг. Connectors успадковують **лише наявні в тебе права** й використовують OAuth-токени, **обмежені тобою**; переглянь scope і відмов у зайвому.",
          ),
        },
        {
          kind: "table",
          head: [L("Boundary", "Межа"), L("The rule", "Правило"), L("Your move", "Твій крок")],
          rows: [
            [L("Local files", "Локальні файли"), L("Cowork reaches only folders you grant", "Cowork дістає лише надані теки"), L("Use a dedicated working folder; keep backups", "Виділи робочу теку; тримай бекапи")],
            [L("Network egress", "Вихід у мережу"), L("Restricted by default; web fetch is server-side", "Обмежений за замовчуванням; web fetch на сервері"), L("Extend only to sites you trust", "Розширюй лише на довірені сайти")],
            [L("Memory", "Memory"), L("Excludes passwords, financial & health data", "Виключає паролі, фінанси й медичні дані"), L("Review and edit what’s stored", "Переглядай і редагуй збережене")],
            [L("Computer-use screen", "Екран computer use"), L("No sandbox; screenshots see everything", "Без sandbox; скриншоти бачать усе"), L("Close sensitive apps before granting", "Закрий чутливі застосунки перед доступом")],
            [L("Connector scopes", "Scope конекторів"), L("Inherits your perms; OAuth scoped to you", "Успадковує твої права; OAuth обмежений тобою"), L("Review scopes; deny the unnecessary", "Переглянь scope; відмов у зайвому")],
            [L("Local MCP & plugins", "Локальні MCP і plugins"), L("Run with full local permissions", "Працюють із повними локальними правами"), L("Vet the source before installing", "Перевір джерело перед встановленням")],
          ],
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Containment over trust", "Контейнмент важливіший за довіру"),
          md: L(
            "Anthropic’s framing: *supervise what the agent is able to do* — sandboxes, VMs, egress limits, scoped grants — not only what it does. The **Connectors Directory is a listing, not a security audit**, and local MCP servers and plugins run with full local permissions, like any program you install. The strongest control is the access you never grant.",
            "Формулювання Anthropic: *наглядай за тим, що agent здатний зробити* — sandbox, VM, ліміти egress, обмежені гранти — а не лише за тим, що він робить. **Connectors Directory — це каталог, а не аудит безпеки**, а локальні MCP-сервери й plugins працюють із повними локальними правами, як будь-яка встановлена програма. Найсильніший контроль — це доступ, який ти ніколи не давав.",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Financial actions & human-in-the-loop", "Фінансові дії та human-in-the-loop"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Money is the one place to be absolute: **never let an agent execute a trade, move funds, or place an order on your behalf.** Anthropic builds this in — Claude in Chrome flatly **prohibits executing financial trades or investment transactions** (and giving investment advice); computer use **blocks investment/trading platforms and crypto apps by default**; purchases and transfers always require your explicit approval in **both** permission modes. But the training guardrails *aren’t absolute* — Anthropic itself says don’t rely on them instead of simply **not granting** access to sensitive financial apps.",
            "Гроші — єдине місце, де треба бути категоричним: **ніколи не дозволяй agent виконати угоду, переказати кошти чи розмістити ордер за тебе.** Anthropic вбудовує це — Claude in Chrome прямо **забороняє виконання фінансових угод чи інвестиційних транзакцій** (і надання інвестпорад); computer use **блокує інвестиційні/трейдингові платформи й крипто-застосунки за замовчуванням**; покупки й перекази завжди потребують твого явного дозволу в **обох** режимах. Але навчені guardrails *не абсолютні* — Anthropic сама каже: не покладайся на них замість того, щоб просто **не давати** доступ до чутливих фінансових застосунків.",
          ),
        },
        {
          kind: "callout",
          tone: "security",
          title: L("You remain responsible", "Відповідальність лишається на тобі"),
          md: L(
            "Across every surface Anthropic is clear: you own the outcome of what the agent does, including any purchase or transaction. Keep a human in the loop on anything irreversible — money, deletion, sending, publishing.",
            "На кожній поверхні Anthropic чітко каже: ти відповідаєш за результат дій agent, включно з будь-якою покупкою чи транзакцією. Тримай людину в циклі на будь-чому незворотному — гроші, видалення, надсилання, публікація.",
          ),
        },
        {
          kind: "prose",
          md: L(
            "The safe pattern is **propose-then-confirm**: let the agent draft the order, fill the form, prepare the transfer — and you press the final button. You keep the judgment; it keeps the typing.",
            "Безпечний патерн — **запропонуй, потім підтвердь**: нехай agent складе ордер, заповнить форму, підготує переказ — а фінальну кнопку тиснеш ти. Рішення лишається за тобою; набір — за ним.",
          ),
        },
      ],
    },
    {
      id: "t5",
      title: L("A practical safety checklist", "Практичний чеклист безпеки"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Putting it together — a checklist you can actually run before and during agent work. Each line closes a read gate, an act gate, or both.",
            "Збираємо разом — чеклист, який реально пройти до і під час роботи agent. Кожен рядок закриває gate читання, gate дії або обидва.",
          ),
        },
        {
          kind: "table",
          head: [L("Do this", "Зроби це"), L("Because", "Бо")],
          rows: [
            [L("Work in a dedicated folder with backups", "Працюй в окремій теці з бекапами"), L("Limits the blast radius if something goes wrong", "Обмежує радіус ураження, якщо щось піде не так")],
            [L("Grant the least scope (folders, OAuth, view-only)", "Давай найменший scope (теки, OAuth, view-only)"), L("Closes the act side of injection", "Закриває бік дії injection")],
            [L("Stay on trusted files & sites", "Лишайся на довірених файлах і сайтах"), L("Closes the read side of injection", "Закриває бік читання injection")],
            [L("Supervise ‘Act without asking’", "Наглядай за ‘Act without asking’"), L("Autonomy raises exposure", "Автономність підвищує ризик")],
            [L("Close sensitive apps before computer use", "Закрий чутливі застосунки перед computer use"), L("Screenshots have no sandbox", "Скриншоти не мають sandbox")],
            [L("Verify links before following them", "Перевіряй посилання перед переходом"), L("Links carry injected instructions", "Посилання несуть вшиті інструкції")],
            [L("Keep money & health out of reach", "Тримай гроші й здоровʼя поза досяжністю"), L("Guardrails aren’t absolute", "Guardrails не абсолютні")],
            [L("Vet plugins/MCP and their permissions", "Перевіряй plugins/MCP та їхні дозволи"), L("Local ones run with full local rights", "Локальні працюють із повними правами")],
            [L("Orgs: use admin controls", "Організації: використовуй адмін-контролі"), L("Org settings → Capabilities, Chrome allow/blocklists, OpenTelemetry", "Org settings → Capabilities, Chrome allow/blocklists, OpenTelemetry")],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Match the leash to the task", "Підбирай повідець під задачу"),
          md: L(
            "Tedious, reversible work on trusted data → loosen up (Act without asking). Anything reaching the open web, other people’s content, or money → tighten (Ask before acting, and supervise).",
            "Рутинна, зворотна робота з довіреними даними → послаб (Act without asking). Будь-що, що дістає відкритий веб, чужий контент чи гроші → затягни (Ask before acting, і наглядай).",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("An agent reads from an untrusted world and acts on your trusted one — prompt injection needs **both**; least privilege + trusted sources break the link.", "Agent читає з недовіреного світу й діє у твоєму довіреному — prompt injection потребує **обох**; least privilege + довірені джерела рвуть ланцюг."),
    L("Two modes everywhere — Ask before acting vs Act without asking; some gates (delete, purchase, credentials, permissions) hold in **both**.", "Два режими всюди — Ask before acting vs Act without asking; деякі gate (видалення, покупка, креденшели, дозволи) тримаються в **обох**."),
    L("Defenses (training, classifiers, red-teaming) lower injection odds to low-but-nonzero (~1%, Opus 4.5) — you are the last layer.", "Захист (навчання, класифікатори, red-teaming) знижує шанси injection до низьких-але-ненульових (~1%, Opus 4.5) — ти останній шар."),
    L("Data boundaries are your strongest control: granted folders only, restricted egress, scoped OAuth, no sandbox for computer use, local MCP/plugins run with full rights.", "Межі даних — твій найсильніший контроль: лише надані теки, обмежений egress, scoped OAuth, без sandbox для computer use, локальні MCP/plugins з повними правами."),
    L("Never let an agent move money — propose-then-confirm; you remain responsible for every action it takes.", "Ніколи не давай agent рухати гроші — запропонуй-потім-підтвердь; ти відповідаєш за кожну його дію."),
  ],
  pitfalls: [
    { title: L("Running ‘Act without asking’ everywhere", "Скрізь ‘Act without asking’"), body: L("Convenient until the agent reads a poisoned page; reserve it for trusted, reversible, supervised work.", "Зручно, доки agent не прочитає отруєну сторінку; лиши це для довіреної, зворотної роботи під наглядом.") },
    { title: L("Trusting the Directory as a security check", "Довіряти Directory як перевірці безпеки"), body: L("It’s a listing, not an audit; vet connectors/plugins and their scopes yourself — local ones run with full local rights.", "Це каталог, а не аудит; перевіряй connectors/plugins і їхні scope сам — локальні працюють із повними правами.") },
    { title: L("Assuming guardrails are absolute", "Вважати guardrails абсолютними"), body: L("Model-level blocks on trades and deletes are best-effort, not guarantees; the real control is the access you never grant.", "Блоки на рівні моделі для угод і видалень — best-effort, не гарантія; справжній контроль — доступ, який ти не дав.") },
  ],
  interview: [
    { q: L("Why is ‘untrusted input + powerful action’ the dangerous combination, and how do you defuse it?", "Чому ‘недовірений ввід + потужна дія’ — небезпечна комбінація, і як її знешкодити?"), a: L("An injection only lands if the agent can both read attacker text and act harmfully. Defuse it by closing one side: trusted sources + classifiers close reading; least privilege + human-in-the-loop close acting.", "Injection спрацьовує лише якщо agent може і прочитати текст атаки, і шкідливо діяти. Знешкодь, закривши один бік: довірені джерела + класифікатори закривають читання; least privilege + human-in-the-loop закривають дію."), level: "senior" },
    { q: L("A teammate wants Claude in Chrome on ‘Act without asking’ to scrape a public forum into a sheet daily. Risk? What would you change?", "Колега хоче Claude in Chrome на ‘Act without asking’ щодня збирати публічний форум у таблицю. Ризик? Що змінив би?"), a: L("User-generated content is a prime injection vector and autonomous mode maximizes exposure. Switch to Ask before acting, restrict to the specific domains, keep it away from anything sensitive, and review each run’s history.", "Користувацький контент — головний вектор injection, а автономний режим максимізує ризик. Перемкни на Ask before acting, обмеж конкретними доменами, тримай подалі від чутливого й переглядай історію кожного запуску."), level: "senior" },
    { q: L("How do you reason about connector vs plugin/MCP trust?", "Як міркувати про довіру до connector vs plugin/MCP?"), a: L("The Directory is a listing, not an audit. A remote connector inherits only your permissions and uses OAuth scoped to you — review and deny scopes. A local MCP server or plugin runs with full local permissions, so vet the source and prefer the least scope.", "Directory — каталог, не аудит. Remote connector успадковує лише твої права й використовує OAuth, обмежений тобою — переглядай і відмовляй у scope. Локальний MCP-сервер чи plugin працює з повними локальними правами, тож перевіряй джерело й обирай найменший scope."), level: "staff" },
  ],
  seeAlso: ["m11", "m18", "m20", "m26"],
  sources: [
    { title: "Use Claude Cowork safely — Help Center", url: "https://support.claude.com/en/articles/13364135-use-claude-cowork-safely" },
    { title: "Let Claude use your computer in Cowork — Help Center", url: "https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork" },
    { title: "Claude in Chrome Permissions Guide — Help Center", url: "https://support.claude.com/en/articles/12902446-claude-in-chrome-permissions-guide" },
    { title: "Using Claude in Chrome safely — Help Center", url: "https://support.claude.com/en/articles/12902428-using-claude-in-chrome-safely" },
    { title: "Mitigating the risk of prompt injections in browser use — Anthropic", url: "https://www.anthropic.com/research/prompt-injection-defenses" },
    { title: "How we contain Claude across products — Anthropic", url: "https://www.anthropic.com/engineering/how-we-contain-claude" },
  ],
};

/* ======================================================================
   M26 · Choosing the right tool — fully authored (S10a) · ★ Tool Picker
   ====================================================================== */
const m26: Module = {
  id: "m26",
  section: "s6",
  order: 26,
  level: "senior",
  title: L("Choosing the right tool", "Вибір правильного інструмента"),
  tagline: L(
    "Same model, many doorways. The skill is matching the task to the surface — and knowing when two of them overlap.",
    "Та сама модель, багато дверей. Майстерність — підібрати поверхню під задачу і знати, де дві з них перетинаються.",
  ),
  readMins: 8,
  mentalModel: L(
    "One model family, many surfaces. Pick by what the work touches and how much autonomy it needs; reach for the most precise tool that covers the job.",
    "Одна сімʼя моделей, багато поверхонь. Обирай за тим, чого торкається робота і скільки автономії треба; бери найточніший інструмент, що покриває задачу.",
  ),
  topics: [
    {
      id: "t1",
      title: L("The decision model: task → tool", "Модель рішення: задача → інструмент"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "By now you’ve met every surface. The meta-skill is choosing among them fast. Three questions decide almost every case: **what does the work touch?** (your words, your files, the web, a codebase, Office, another app, or a reusable procedure), **how much autonomy does it need?** (one reply, a multi-step task, or a recurring job), and **what plan are you on?** (several surfaces are paid-only). Answer those and the surface is usually obvious.",
            "До цього моменту ти зустрів кожну поверхню. Мета-навичка — швидко обирати між ними. Три питання вирішують майже все: **чого торкається робота?** (твої слова, твої файли, веб, кодова база, Office, інший застосунок чи повторюваний процес), **скільки автономії треба?** (одна відповідь, багатокрокова задача чи повторюване завдання), і **на якому ти плані?** (кілька поверхонь лише платні). Відповідай — і поверхня зазвичай очевидна.",
          ),
        },
        { kind: "figure", fig: "tool-matrix", caption: L("The surfaces placed by what the work touches (your words → apps & web → files & systems) and how much autonomy it needs (one reply → an agent).", "Поверхні розміщені за тим, чого торкається робота (твої слова → застосунки й веб → файли й системи) і скільки автономії треба (одна відповідь → agent).") },
        {
          kind: "prose",
          md: L(
            "A heuristic from the security chapter applies here too: **reach for the most precise tool that covers the job.** A connector beats the browser beats computer use; a Skill you wrote beats re-explaining a procedure every time. Precision is faster, cheaper, and safer.",
            "Евристика з розділу про безпеку працює й тут: **бери найточніший інструмент, що покриває задачу.** Connector кращий за браузер, браузер — за computer use; написаний тобою Skill кращий за повторне пояснення процесу щоразу. Точність — швидше, дешевше й безпечніше.",
          ),
        },
      ],
    },
    {
      id: "t2",
      title: L("The tools compared", "Порівняння інструментів"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Here is the whole field on one page — then an interactive way to pick.",
            "Ось усе поле на одній сторінці — а далі інтерактивний спосіб обрати.",
          ),
        },
        {
          kind: "table",
          head: [L("Surface", "Поверхня"), L("Best for", "Найкраще для"), L("Key limit", "Головне обмеження"), L("Plan", "План")],
          rows: [
            [L("Chat + Artifacts", "Chat + Artifacts"), L("A one-off answer, draft, chart or mini-app", "Разова відповідь, чернетка, графік чи mini-app"), L("No reach into your files/apps unless you add them", "Не дістає файлів/застосунків, доки не додаси"), L("All (incl. Free)", "Усі (вкл. Free)")],
            [L("Cowork", "Cowork"), L("Multi-step work on local files; deliverables; schedules", "Багатокрокова робота з локальними файлами; результати; розклади"), L("Desktop only; folders you grant; app must stay open", "Лише desktop; надані теки; застосунок має бути відкритий"), L("Paid", "Платний")],
            [L("Claude Code", "Claude Code"), L("Software in a real repo + shell", "Код у реальному репо + shell"), L("Runs your real environment, not a sandbox", "Працює у твоєму реальному середовищі, не sandbox"), L("Paid", "Платний")],
            [L("Claude in Chrome", "Claude in Chrome"), L("Web actions on sites with no connector", "Дії в вебі на сайтах без connector"), L("Beta, Chrome only; Pro = Haiku 4.5", "Beta, лише Chrome; Pro = Haiku 4.5"), L("Paid", "Платний")],
            [L("Excel / PowerPoint", "Excel / PowerPoint"), L("Editing the open workbook or deck in place", "Редагування відкритої книги чи деки на місці"), L("Microsoft 365 only; no macros/VBA", "Лише Microsoft 365; без macros/VBA"), L("Paid", "Платний")],
            [L("Connector / MCP", "Connector / MCP"), L("Live, permissioned data & actions in another app", "Живі дані й дії з дозволами в іншому застосунку"), L("Brings data in — doesn’t run procedures; Free = 1 custom", "Приносить дані — не виконує процедур; Free = 1 custom"), L("All (Free limited)", "Усі (Free обмежено)")],
            [L("Skill", "Skill"), L("A reusable procedure or output format", "Повторюваний процес чи формат виводу"), L("Know-how, not an integration — pair with a connector", "Експертиза, не інтеграція — поєднай із connector"), L("All (incl. Free)", "Усі (вкл. Free)")],
          ],
        },
        { kind: "sim", sim: "tool-picker" },
        {
          kind: "prose",
          md: L(
            "The picker ranks by the same logic: *what it touches* dominates, autonomy breaks ties, and your plan gates the paid surfaces — they still appear, clearly tagged, so you can see what an upgrade buys.",
            "Picker ранжує за тією ж логікою: *чого торкається* — головне, автономія розводить нічиї, а твій план обмежує платні поверхні — вони все одно зʼявляються з позначкою, щоб ти бачив, що дає апгрейд.",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("Cost / speed / control trade-offs", "Баланс вартість / швидкість / контроль"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Once you’ve picked a surface, three more levers tune it. **Model:** Opus 4.8 for hard reasoning and agentic coding, Sonnet 4.6 for the balanced default (it’s the default on Free and Pro), Haiku 4.5 for speed and volume. **Cost:** prompt caching cuts cached input ~90% and Batch ~50% — lean on them for repeat or bulk work (see M10). **Control:** a sandbox (Cowork’s code VM, an Artifact) is safer for untrusted or experimental work; your real shell (Claude Code) is more powerful but unforgiving.",
            "Коли поверхню обрано, її налаштовують три важелі. **Модель:** Opus 4.8 для складних міркувань і agentic coding, Sonnet 4.6 — збалансований дефолт (за замовчуванням на Free і Pro), Haiku 4.5 — швидкість і обсяг. **Вартість:** prompt caching зрізає кешований ввід на ~90%, Batch — на ~50%; спирайся на них для повторюваної чи масової роботи (див. M10). **Контроль:** sandbox (code-VM Cowork, Artifact) безпечніший для недовіреної чи експериментальної роботи; твій реальний shell (Claude Code) потужніший, але невибачливий.",
          ),
        },
        {
          kind: "compare",
          a: L("Sandboxed surface", "Поверхня в sandbox"),
          b: L("Real-environment surface", "Поверхня в реальному середовищі"),
          rows: [
            [L("Examples", "Приклади"), L("Cowork code VM · an Artifact", "Code-VM Cowork · Artifact"), L("Claude Code in your shell", "Claude Code у твоєму shell")],
            [L("Power", "Потужність"), L("Bounded — isolated from your system", "Обмежена — ізольована від системи"), L("Full — your real files, tools, commands", "Повна — твої реальні файли, інструменти, команди")],
            [L("Blast radius", "Радіус ураження"), L("Small — contained by the sandbox", "Малий — стримується sandbox"), L("Large — guarded only by permissions", "Великий — захищений лише permissions")],
            [L("Use when", "Коли використовувати"), L("Untrusted input, experiments, deliverables", "Недовірений ввід, експерименти, результати"), L("Trusted repo work you’re ready to supervise", "Довірена робота з репо під наглядом")],
          ],
        },
        {
          kind: "prose",
          md: L(
            "More autonomy isn’t free either: it trades your oversight for speed, and (with sub-agents or teams) trades tokens for wall-clock time. Match the leash to the stakes.",
            "Більше автономії теж не безкоштовне: вона міняє твій нагляд на швидкість, а (із sub-agents чи teams) — токени на час. Підбирай повідець під ставки.",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Worked scenarios", "Розібрані сценарії"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Seven quick calls to calibrate the model in your head.",
            "Сім швидких рішень, щоб відкалібрувати модель у голові.",
          ),
        },
        {
          kind: "table",
          head: [L("Task", "Задача"), L("Best surface", "Найкраща поверхня"), L("Why", "Чому")],
          rows: [
            [L("Turn this messy CSV in my Downloads into a clean report", "Перетвори цей CSV у Downloads на чистий звіт"), L("Cowork", "Cowork"), L("Local files, multi-step, a deliverable", "Локальні файли, багато кроків, результат")],
            [L("Draft a function and explain the approach", "Напиши функцію й поясни підхід"), L("Chat + Artifacts", "Chat + Artifacts"), L("A reply plus runnable code, nothing on disk", "Відповідь і код, що запускається, нічого на диску")],
            [L("Refactor this module and run the tests", "Зроби рефактор модуля й запусти тести"), L("Claude Code", "Claude Code"), L("A real repo and shell", "Реальний репозиторій і shell")],
            [L("Update the Q3 model, keep formulas intact", "Онови модель Q3, не ламаючи формули"), L("Claude for Excel", "Claude for Excel"), L("The open workbook, dependency-safe", "Відкрита книга, безпечно для залежностей")],
            [L("Every morning, summarize my unread Gmail", "Щоранку підсумовуй непрочитаний Gmail"), L("Connector + scheduled task", "Connector + scheduled task"), L("Data via the connector, cadence via the schedule", "Дані через connector, періодичність через розклад")],
            [L("Fill this form on a vendor site with no API", "Заповни форму на сайті без API"), L("Claude in Chrome", "Claude in Chrome"), L("Web work where no connector exists", "Робота в вебі, де немає connector")],
            [L("Apply our brand format to every deck I make", "Застосовуй наш формат до кожної деки"), L("Skill", "Skill"), L("A reusable procedure, loaded when relevant", "Повторюваний процес, що вантажиться за потреби")],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("When two overlap, prefer precision + the smallest blast radius", "Коли дві перетинаються — обирай точність + найменший радіус"),
          md: L(
            "Pulling Slack messages → a connector, not the browser. A one-off chart → an Artifact, not Cowork. Editing a live workbook → the Excel add-in, not a regenerated file. The narrower tool is usually the right one.",
            "Дістати повідомлення Slack → connector, не браузер. Разовий графік → Artifact, не Cowork. Редагувати живу книгу → Excel add-in, не перегенерований файл. Вужчий інструмент зазвичай і є правильним.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("Three questions pick the surface: what the work touches · how much autonomy · your plan.", "Три питання обирають поверхню: чого торкається робота · скільки автономії · твій план."),
    L("Reach for the most precise tool that covers the job (connector > browser > computer use; a Skill > re-explaining).", "Бери найточніший інструмент, що покриває задачу (connector > браузер > computer use; Skill > повторне пояснення)."),
    L("Files & deliverables → Cowork; a real repo → Claude Code; the web with no API → Chrome; Office in place → Excel/PPT; another app’s data → a connector; a reusable procedure → a Skill; a one-off answer → Chat + Artifacts.", "Файли й результати → Cowork; реальне репо → Claude Code; веб без API → Chrome; Office на місці → Excel/PPT; дані іншого застосунку → connector; повторюваний процес → Skill; разова відповідь → Chat + Artifacts."),
    L("Recurring work = a connector (or surface) for the data + a schedule for the cadence.", "Повторювана робота = connector (чи поверхня) для даних + розклад для періодичності."),
    L("Several surfaces are paid-only; on Free, Chat + Artifacts (incl. file creation) and web connectors carry most of the load.", "Кілька поверхонь лише платні; на Free Chat + Artifacts (вкл. створення файлів) і web connectors тягнуть основне."),
  ],
  pitfalls: [
    { title: L("Reaching for the browser (or computer use) when a connector exists", "Хапатися за браузер (чи computer use), коли є connector"), body: L("Slower, broader, riskier — use the precise tool; fall through to the browser only when no connector covers the app.", "Повільніше, ширше, ризикованіше — бери точний інструмент; переходь до браузера лише коли жоден connector не покриває застосунок.") },
    { title: L("Using Cowork for a one-off answer, or Chat for work in your files", "Cowork для разової відповіді, або Chat для роботи у файлах"), body: L("Match the medium: a quick answer or mini-app is Chat + Artifacts; multi-step work on your files is Cowork.", "Підбирай середовище: швидка відповідь чи mini-app — Chat + Artifacts; багатокрокова робота з файлами — Cowork.") },
    { title: L("Forgetting plan gates", "Забути про обмеження плану"), body: L("Cowork, Code, Chrome and the Office add-ins are paid; check availability before recommending one to a Free user.", "Cowork, Code, Chrome і Office-add-ins платні; перевір доступність, перш ніж радити їх користувачу Free.") },
  ],
  interview: [
    { q: L("Cowork vs Claude Code — same engine; when each?", "Cowork vs Claude Code — той самий движок; коли який?"), a: L("Both run the agent loop. Claude Code works your real repo and shell (software engineering, real commits); Cowork works folders you grant in a sandbox (knowledge work, deliverables, schedules) with no terminal.", "Обидва виконують agent loop. Claude Code працює з твоїм реальним репо й shell (інженерія, реальні commit); Cowork працює з наданими теками в sandbox (knowledge work, результати, розклади) без терміналу."), level: "senior" },
    { q: L("A connector and Claude in Chrome can both read Gmail. Which, and why?", "І connector, і Claude in Chrome можуть читати Gmail. Який і чому?"), a: L("The connector — it’s API-precise, scope-bounded, faster, and a smaller injection surface. The browser is the fallback only when no connector exists for the app.", "Connector — він точний на рівні API, обмежений scope, швидший і з меншою поверхнею injection. Браузер — резерв лише коли для застосунку немає connector."), level: "senior" },
    { q: L("Where do Skills fit against connectors?", "Як Skills співвідносяться з connectors?"), a: L("They’re orthogonal: a Skill is reusable know-how or a format Claude runs in its VM; a connector is live access to an external app. Compose them — a Skill that formats the data a connector fetched.", "Вони ортогональні: Skill — це повторювана експертиза чи формат, який Claude виконує у своїй VM; connector — живий доступ до зовнішнього застосунку. Поєднуй їх — Skill форматує дані, які дістав connector."), level: "senior" },
  ],
  seeAlso: ["m15", "m22", "m11", "m27"],
  sources: [
    { title: "Models overview — Claude Platform docs", url: "https://platform.claude.com/docs/en/about-claude/models/overview" },
    { title: "Get started with Claude Cowork — Help Center", url: "https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork" },
    { title: "Claude Code — Anthropic", url: "https://claude.com/product/claude-code" },
    { title: "Get started with Claude in Chrome — Help Center", url: "https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome" },
    { title: "Use connectors to extend Claude’s capabilities — Help Center", url: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities" },
  ],
};

/* ======================================================================
   M27 · The ecosystem map — fully authored (S10a)
   ====================================================================== */
const m27: Module = {
  id: "m27",
  section: "s6",
  order: 27,
  level: "senior",
  title: L("The ecosystem map", "Мапа екосистеми"),
  tagline: L(
    "Five layers, one picture — how models, surfaces, context, capabilities and orchestration compose into everything in this guide.",
    "Пʼять шарів, одна картина — як моделі, поверхні, context, можливості й оркестрація складаються в усе з цього гайду.",
  ),
  readMins: 7,
  mentalModel: L(
    "One model family, reached through many surfaces, grounded by context, extended by capabilities, scaled by orchestration — wrapped in security.",
    "Одна сімʼя моделей, доступна через багато поверхонь, заземлена context, розширена можливостями, масштабована оркестрацією — і загорнута в безпеку.",
  ),
  topics: [
    {
      id: "t1",
      title: L("The layers", "Шари"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Everything in this guide stacks into five layers. At the bottom, the **models** — Opus 4.8, Sonnet 4.6, Haiku 4.5 — the raw intelligence. You reach them through **apps / surfaces** — Chat, Cowork, Claude Code, Claude in Chrome, the Office add-ins. What makes the answers *yours* is **context** — the window, Projects, Memory. What lets Claude *do* things is **capabilities** — Connectors/MCP, Skills, Artifacts, computer use. And what makes it *scale* is **orchestration** — sub-agents, agent teams, hooks, scheduled tasks.",
            "Усе в цьому гайді складається в пʼять шарів. Внизу — **моделі** (Opus 4.8, Sonnet 4.6, Haiku 4.5), сирий інтелект. Ти дістаєш їх через **застосунки / поверхні** — Chat, Cowork, Claude Code, Claude in Chrome, Office-add-ins. Те, що робить відповіді *твоїми*, — **context** (вікно, Projects, Memory). Те, що дозволяє Claude *діяти*, — **можливості** (Connectors/MCP, Skills, Artifacts, computer use). А те, що дає *масштаб*, — **оркестрація** (sub-agents, agent teams, hooks, scheduled tasks).",
          ),
        },
        { kind: "figure", fig: "ecosystem-layers", caption: L("A request flows up the stack: a model, reached through a surface, grounded by context, extended by capabilities, scaled by orchestration.", "Запит іде вгору стеком: модель, доступна через поверхню, заземлена context, розширена можливостями, масштабована оркестрацією.") },
        {
          kind: "table",
          head: [L("Layer", "Шар"), L("What it is", "Що це"), L("Examples", "Приклади"), L("In this guide", "У гайді")],
          rows: [
            [L("Models", "Моделі"), L("The raw intelligence", "Сирий інтелект"), L("Opus 4.8 · Sonnet 4.6 · Haiku 4.5", "Opus 4.8 · Sonnet 4.6 · Haiku 4.5"), L("M1", "M1")],
            [L("Apps / surfaces", "Застосунки / поверхні"), L("Where you meet the model", "Де ти зустрічаєш модель"), L("Chat · Cowork · Code · Chrome · Office", "Chat · Cowork · Code · Chrome · Office"), L("M2 · M15 · M20–M22", "M2 · M15 · M20–M22")],
            [L("Context", "Context"), L("What grounds the answer in your world", "Що заземлює відповідь у твоєму світі"), L("Context window · Projects · Memory", "Context window · Projects · Memory"), L("M5 · M7 · M10", "M5 · M7 · M10")],
            [L("Capabilities", "Можливості"), L("What lets Claude act & extend", "Що дозволяє Claude діяти й розширюватися"), L("Connectors/MCP · Skills · Artifacts · computer use", "Connectors/MCP · Skills · Artifacts · computer use"), L("M8 · M11 · M12 · M18", "M8 · M11 · M12 · M18")],
            [L("Orchestration", "Оркестрація"), L("What scales one agent into many", "Що масштабує один agent у багато"), L("Sub-agents · teams · hooks · schedules", "Sub-agents · teams · hooks · розклади"), L("M17 · M23 · M24", "M17 · M23 · M24")],
          ],
        },
      ],
    },
    {
      id: "t2",
      title: L("How the pieces compose", "Як складаються частини"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "The layers aren’t a menu you pick one item from — every real task threads through several. Trace three.",
            "Шари — не меню, з якого береш один пункт: кожна реальна задача проходить крізь кілька. Простежимо три.",
          ),
        },
        {
          kind: "prose",
          md: L(
            "**“Summarize my unread email every morning.”** Orchestration (a scheduled task) wakes Cowork (surface), which calls the Gmail connector (capability) over Sonnet (model, chosen for cost), grounded by your project instructions (context), and writes a digest file. Five layers, one sentence.",
            "**«Щоранку підсумовуй непрочитану пошту.»** Оркестрація (scheduled task) будить Cowork (поверхня), що викликає Gmail-connector (можливість) поверх Sonnet (модель, обрана за вартість), заземлена твоїми project-інструкціями (context), і пише файл-дайджест. Пʼять шарів, одне речення.",
          ),
        },
        {
          kind: "prose",
          md: L(
            "**“Understand this unfamiliar repo, then fix the failing test.”** Claude Code (surface) on Opus (model) fans out **sub-agents** (orchestration) to map the codebase into a clean context (capability + context), then edits your real files and runs tests behind permissions — security cutting across all of it.",
            "**«Розберись у незнайомому репо, потім полагодь зламаний тест.»** Claude Code (поверхня) на Opus (модель) розгалужує **sub-agents** (оркестрація), щоб скласти карту коду в чистий context (можливість + context), потім редагує твої реальні файли й запускає тести під permissions — і безпека пронизує все це.",
          ),
        },
        {
          kind: "prose",
          md: L(
            "**“Build me a budget I can keep using.”** Chat (surface) emits a **live Artifact** (capability) that holds state and calls a connector — context persists inside the artifact, and no other layers are needed. Small task, two layers.",
            "**«Зроби бюджет, яким я зможу користуватися далі.»** Chat (поверхня) видає **live Artifact** (можливість), що тримає стан і викликає connector — context живе всередині artifact, інші шари не потрібні. Мала задача, два шари.",
          ),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Security is the layer that wraps the rest", "Безпека — шар, що загортає решту"),
          md: L(
            "It isn’t a row in the stack — it cuts across all of them: permissions on surfaces, scopes on capabilities, trust boundaries on context. Read every composition through it (see M25).",
            "Це не рядок у стеку — вона пронизує всі: permissions на поверхнях, scope на можливостях, межі довіри на context. Читай кожну композицію крізь неї (див. M25).",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("The one-picture overview", "Огляд однією картиною"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "The landing **Ecosystem Map** is this same picture, made clickable — each node opens the module that explains it. Use it two ways: top-down (start from the model and follow a task outward) or by jumping straight to whichever node you need.",
            "Стартова **Ecosystem Map** — це та сама картина, але клікабельна: кожен вузол відкриває модуль, що його пояснює. Користуйся двома способами: згори вниз (почни з моделі й веди задачу назовні) або стрибай одразу до потрібного вузла.",
          ),
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Open the interactive map", "Відкрий інтерактивну мапу"),
          md: L(
            "The clickable overview lives at **[the Map](#/map)** — the same five layers, as a navigable picture you can start any session from.",
            "Клікабельний огляд — на **[Мапі](#/map)** — ті самі пʼять шарів як навігована картина, з якої можна почати будь-яку сесію.",
          ),
        },
        {
          kind: "prose",
          md: L(
            "If you remember one thing from this guide, remember the shape: **one model family, many surfaces, grounded by context, extended by capabilities, scaled by orchestration, wrapped in security.** Everything else is detail you can look up.",
            "Якщо запамʼятати з гайду одне — запамʼятай форму: **одна сімʼя моделей, багато поверхонь, заземлена context, розширена можливостями, масштабована оркестрацією, загорнута в безпеку.** Решта — деталі, які можна подивитися.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("Five layers: models → apps/surfaces → context → capabilities → orchestration — with security cutting across all of them.", "Пʼять шарів: моделі → застосунки/поверхні → context → можливості → оркестрація — і безпека пронизує всі."),
    L("Models are the engine; surfaces are the doorways — same intelligence, different reach.", "Моделі — двигун; поверхні — двері: той самий інтелект, різний доступ."),
    L("Context (window/Projects/Memory) makes answers yours; capabilities (connectors/skills/artifacts/computer use) let Claude act.", "Context (вікно/Projects/Memory) робить відповіді твоїми; можливості (connectors/skills/artifacts/computer use) дають Claude діяти."),
    L("Orchestration (sub-agents/teams/hooks/schedules) scales one agent into many.", "Оркестрація (sub-agents/teams/hooks/розклади) масштабує один agent у багато."),
    L("Every real task threads several layers — the skill is composing them.", "Кожна реальна задача проходить кілька шарів — майстерність у тому, щоб їх скомпонувати."),
  ],
  pitfalls: [
    { title: L("Treating surfaces as different ‘Claudes’", "Сприймати поверхні як різні ‘Claude’"), body: L("It’s one model family behind every door — Chat, Cowork, Code and Chrome differ in reach and context, not in who’s answering.", "За кожними дверима — одна сімʼя моделей; Chat, Cowork, Code і Chrome різняться доступом і context, а не тим, хто відповідає.") },
    { title: L("Confusing capabilities with context", "Плутати можливості з context"), body: L("A connector fetches (capability); Memory and Projects retain (context). One reaches out, the other remembers.", "Connector дістає (можливість); Memory і Projects утримують (context). Один тягнеться назовні, інший памʼятає.") },
    { title: L("Reaching for orchestration too early", "Хапатися за оркестрацію зарано"), body: L("Most tasks are one surface plus one capability; fan out to sub-agents or teams only when the work is genuinely parallel.", "Більшість задач — одна поверхня плюс одна можливість; розгалужуйся в sub-agents чи teams лише коли робота справді паралельна.") },
  ],
  interview: [
    { q: L("Lay out the Claude stack in layers.", "Розклади стек Claude по шарах."), a: L("Models (Opus/Sonnet/Haiku) → apps/surfaces (Chat, Cowork, Code, Chrome, Office) → context (window, Projects, Memory) → capabilities (connectors/MCP, Skills, Artifacts, computer use) → orchestration (sub-agents, teams, hooks, schedules), with security cutting across all of them.", "Моделі (Opus/Sonnet/Haiku) → застосунки/поверхні (Chat, Cowork, Code, Chrome, Office) → context (вікно, Projects, Memory) → можливості (connectors/MCP, Skills, Artifacts, computer use) → оркестрація (sub-agents, teams, hooks, розклади), і безпека пронизує всі."), level: "senior" },
    { q: L("Where’s the line between context and capabilities?", "Де межа між context і можливостями?"), a: L("Context grounds — the window, Projects and Memory hold what Claude knows. Capabilities extend — connectors, skills, artifacts and computer use are what Claude can do. Knowing vs doing.", "Context заземлює — вікно, Projects і Memory тримають те, що Claude знає. Можливості розширюють — connectors, skills, artifacts і computer use — це те, що Claude може робити. Знати vs діяти."), level: "senior" },
    { q: L("Walk a recurring briefing through the stack.", "Проведи повторюваний брифінг крізь стек."), a: L("A schedule (orchestration) triggers Cowork (surface) on Sonnet (model); it calls a connector (capability) for the data, grounded by project instructions (context), and writes a file — security gating the connector’s scope and the file write.", "Розклад (оркестрація) запускає Cowork (поверхня) на Sonnet (модель); він викликає connector (можливість) за даними, заземлений project-інструкціями (context), і пише файл — безпека контролює scope конектора й запис файлу."), level: "senior" },
  ],
  seeAlso: ["m1", "m26", "m25", "m28"],
  sources: [
    { title: "Models overview — Claude Platform docs", url: "https://platform.claude.com/docs/en/about-claude/models/overview" },
    { title: "Get started with Claude Cowork — Help Center", url: "https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork" },
    { title: "Use connectors to extend Claude’s capabilities — Help Center", url: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities" },
    { title: "Claude Code — Anthropic", url: "https://claude.com/product/claude-code" },
  ],
};

/* ======================================================================
   M28 · Mental models, glossary & cheat-sheet — fully authored (S10b)
   The revision layer that closes the guide: how to recall the pictures,
   look up the terms, and carry one printable page. Cross-links the three
   study surfaces (#/mental-models, #/glossary, #/decide).
   ====================================================================== */
const m28: Module = {
  id: "m28",
  section: "s6",
  order: 28,
  level: "middle",
  title: L("Mental models, glossary & cheat-sheet", "Mental models, глосарій і cheat-sheet"),
  tagline: L(
    "The revision layer — recall the pictures, look up the terms, and carry one printable page.",
    "Шар повторення — згадай картини, знайди терміни і носи одну друковану сторінку.",
  ),
  readMins: 8,
  mentalModel: L(
    "Don’t re-read 27 modules — recall the picture, and look up only the detail you’re missing.",
    "Не перечитуй 27 модулів — згадай картину, а деталь, якої бракує, просто подивись.",
  ),
  topics: [
    {
      id: "t1",
      title: L("The mental models gallery", "Галерея mental models"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Every module in this guide opens with one **mental model** — a single line or picture meant to be recalled from memory, not looked up. This module gathers all of them in one place so you can revise the whole guide in minutes: glance at a title, try to **say its mental model out loud before you flip the card**, then check yourself. That retrieval — recall first, verify second — is what moves a fact from “I’ve read it” to “I know it”.",
            "Кожен модуль гайду відкривається одним **mental model** — рядком або картиною, які треба згадати з памʼяті, а не дивитися. Цей модуль збирає всі їх в одному місці, щоб повторити весь гайд за хвилини: глянь на назву, спробуй **проговорити mental model вголос, перш ніж перевернути картку**, а тоді перевір себе. Саме це пригадування — спершу згадати, потім звірити — переводить факт зі стану «я це читав» у «я це знаю».",
          ),
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Open the gallery", "Відкрий галерею"),
          md: L(
            "All 28 mental models live at **[Mental models](#/mental-models)** as flip-cards. Turn on **flashcard mode** to hide the answers and self-test; mark each one *known* and the deck shrinks to just what you still miss.",
            "Усі 28 mental models — на **[Mental models](#/mental-models)** у вигляді flip-карток. Увімкни **flashcard mode**, щоб сховати відповіді й перевірити себе; познач кожну як *known*, і колода скоротиться до того, що ще не вивчено.",
          ),
        },
        {
          kind: "prose",
          md: L(
            "If you remember one shape from the whole guide, remember the ecosystem (M27): **one model family, reached through many surfaces, grounded by context, extended by capabilities, scaled by orchestration — wrapped in security.** Every other mental model hangs off that skeleton.",
            "Якщо запамʼятати з усього гайду одну форму — запамʼятай екосистему (M27): **одна сімʼя моделей, доступна через багато поверхонь, заземлена context, розширена можливостями, масштабована оркестрацією — і загорнута в безпеку.** Усі інші mental models тримаються на цьому скелеті.",
          ),
        },
      ],
    },
    {
      id: "t2",
      title: L("The glossary — bilingual", "Глосарій — двомовний"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "The guide spans a lot of vocabulary — *token*, *context window*, *MCP*, *connector*, *skill*, *artifact*, *sub-agent*, *prompt injection*, *progressive disclosure*. The glossary is the fast lookup: a comprehensive, searchable term bank covering every concept across all 27 teaching modules, each definition written in **both EN and UA**, each term linked back to the module where it’s taught.",
            "Гайд охоплює багато термінів — *token*, *context window*, *MCP*, *connector*, *skill*, *artifact*, *sub-agent*, *prompt injection*, *progressive disclosure*. Глосарій — це швидкий пошук: вичерпний термінологічний банк із пошуком, що покриває кожне поняття з усіх 27 навчальних модулів; кожне визначення — **і EN, і UA**, кожен термін веде назад до модуля, де його пояснено.",
          ),
        },
        {
          kind: "callout",
          tone: "senior",
          title: L("Why the terms stay English", "Чому терміни лишаються English"),
          md: L(
            "Across the whole guide the **technical terms stay in English in both languages** — *token*, *MCP*, *connector*, *prompt*, *context window*. That’s deliberate: the industry, the docs and the product UI are all English, so translating the terms would only add a second name to learn. UA carries the *explanation*; English carries the *term*.",
            "У всьому гайді **технічні терміни лишаються English в обох мовах** — *token*, *MCP*, *connector*, *prompt*, *context window*. Це навмисно: індустрія, докси й UI продукту — англійською, тож переклад термінів лише додав би другу назву для запамʼятовування. UA несе *пояснення*; English несе *термін*.",
          ),
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Open the glossary", "Відкрий глосарій"),
          md: L(
            "Search or browse by category at **[Glossary](#/glossary)** — type a few letters to filter live, or jump by group (Models & plans · Prompting · Context · Connectors/MCP · Skills & plugins · Cowork · Tools & code · Agentic · Security).",
            "Шукай або гортай за категорією на **[Glossary](#/glossary)** — введи кілька літер для живого фільтра або стрибни за групою (Models & plans · Prompting · Context · Connectors/MCP · Skills & plugins · Cowork · Tools & code · Agentic · Security).",
          ),
        },
      ],
    },
    {
      id: "t3",
      title: L("The cheat-sheet — one printable page", "Cheat-sheet — одна друкована сторінка"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Everything you reach for most, on one page. Print this module (your browser’s **Print** lays it out as a clean one-pager) and keep it next to the keyboard. Every block is a recap of a full module — follow the **M-links** when you want the depth.",
            "Усе, чим користуєшся найчастіше, на одній сторінці. Роздрукуй цей модуль (**Print** у браузері складе його в охайну сторінку) і тримай біля клавіатури. Кожен блок — це конспект цілого модуля; коли треба глибина, йди за **M-лінками**.",
          ),
        },
        {
          kind: "table",
          head: [L("Model", "Модель"), L("Best for", "Найкраще для"), L("Context", "Context"), L("$ / MTok (in · out)", "$ / MTok (in · out)")],
          rows: [
            [L("**Opus 4.8**", "**Opus 4.8**"), L("Hard reasoning, code, agents", "Складні міркування, код, agents"), L("1M (flat-rate)", "1M (flat-rate)"), L("$5 · $25", "$5 · $25")],
            [L("**Sonnet 4.6**", "**Sonnet 4.6**"), L("The everyday default — best balance", "Щоденний default — найкращий баланс"), L("1M (flat-rate)", "1M (flat-rate)"), L("$3 · $15", "$3 · $15")],
            [L("**Haiku 4.5**", "**Haiku 4.5**"), L("Speed & volume, cheap classification", "Швидкість і обсяг, дешева класифікація"), L("200K", "200K"), L("$1 · $5", "$1 · $5")],
          ],
          caption: L("The consumer chat lineup (M1). Output ≈ 5× input. The developer platform also ships more models. Re-check prices — they drift.", "Лінійка для chat (M1). Output ≈ 5× input. На developer-платформі є й інші моделі. Перевіряй ціни — вони змінюються."),
        },
        {
          kind: "table",
          head: [L("Cost lever", "Важіль вартості"), L("Effect", "Ефект"), L("When", "Коли")],
          rows: [
            [L("Prompt caching", "Prompt caching"), L("Cached input −90% (writes 1.25× / 2×)", "Кешований input −90% (запис 1.25× / 2×)"), L("Stable, reused prefixes (system/knowledge)", "Стабільні, повторювані префікси (system/knowledge)")],
            [L("Batch API", "Batch API"), L("−50% on everything; stacks with caching", "−50% на все; складається з caching"), L("Non-urgent, large jobs", "Несрочні великі задачі")],
            [L("1M context", "1M context"), L("Flat-rate on Opus 4.8/4.7 & Sonnet 4.6", "Flat-rate на Opus 4.8/4.7 і Sonnet 4.6"), L("Big repos/docs — but curate, don’t dump (M10)", "Великі репо/докси — але курируй, не звалюй (M10)")],
          ],
          caption: L("The three cost levers from M10. The cheapest token is the one you don’t send.", "Три важелі вартості з M10. Найдешевший token — той, який ти не надіслав."),
        },
        {
          kind: "table",
          head: [L("Reach for…", "Бери…"), L("When the work touches…", "Коли робота про…"), L("Module", "Модуль")],
          rows: [
            [L("Chat + Artifacts", "Chat + Artifacts"), L("Thinking, drafting, a self-contained mini-app", "Думання, чернетки, самодостатній mini-app"), L("M8 · M9", "M8 · M9")],
            [L("Cowork", "Cowork"), L("Your local files & folders, on the desktop", "Твої локальні файли й теки на десктопі"), L("M15–M19", "M15–M19")],
            [L("Claude Code", "Claude Code"), L("A codebase, the terminal, agentic engineering", "Кодова база, термінал, agentic engineering"), L("M22–M24", "M22–M24")],
            [L("Claude in Chrome", "Claude in Chrome"), L("The live web — a site with no API", "Живий веб — сайт без API"), L("M20", "M20")],
            [L("Excel / PowerPoint", "Excel / PowerPoint"), L("A spreadsheet or deck, with citations", "Таблиця чи презентація, з цитуваннями"), L("M21", "M21")],
            [L("A Connector (MCP)", "Connector (MCP)"), L("One app’s data — Gmail, Notion, Drive", "Дані одного застосунку — Gmail, Notion, Drive"), L("M11", "M11")],
            [L("A Skill", "Skill"), L("Repeatable expertise or an output format", "Повторювана експертиза чи формат виводу"), L("M12 · M13", "M12 · M13")],
          ],
          caption: L("The tool-choice recap (M26). Not sure? The interactive [Tool picker](#/decide) ranks them for your task.", "Конспект вибору інструмента (M26). Не певен? Інтерактивний [Tool picker](#/decide) оцінить їх під твою задачу."),
        },
        {
          kind: "table",
          head: [L("Surface / feature", "Поверхня / фіча"), L("Plan & availability", "План і доступність"), L("Key limit", "Ключове обмеження")],
          rows: [
            [L("Chat uploads", "Chat-завантаження"), L("All plans", "Усі плани"), L("500 MB/file · 20 files/chat", "500 MB/файл · 20 файлів/chat")],
            [L("Cowork", "Cowork"), L("Paid plans (Pro/Max/Team/Ent), Desktop", "Платні плани (Pro/Max/Team/Ent), Desktop"), L("Deliverables 30 MB/file; file-creation on all plans", "Deliverables 30 MB/файл; створення файлів — усі плани")],
            [L("Computer use", "Computer use"), L("Research preview — **Pro/Max only**, off by default", "Research preview — **лише Pro/Max**, off за замовч."), L("No sandbox; trading/crypto blocked", "Без sandbox; трейдинг/крипто заблоковані")],
            [L("Claude in Chrome", "Claude in Chrome"), L("Beta, all paid plans, Chrome-only", "Beta, усі платні плани, лише Chrome"), L("Pro = Haiku 4.5 only", "Pro = лише Haiku 4.5")],
            [L("Excel / PowerPoint", "Excel / PowerPoint"), L("GA on all paid plans (M365 add-ins)", "GA на всіх платних планах (M365 add-ins)"), L("Excel: no macros/VBA", "Excel: без macros/VBA")],
            [L("Memory", "Memory"), L("All plans incl. Free (since Mar 2026)", "Усі плани, включно з Free (з берез. 2026)"), L("Global + a walled per-project space", "Глобальна + ізольована per-project")],
            [L("Connectors", "Connectors"), L("Hundreds in the directory, all plans", "Сотні в directory, усі плани"), L("Free = 1 custom connector", "Free = 1 custom connector")],
          ],
          caption: L("Plan gates & limits that bite most often. Availability drifts — when in doubt, check the in-app plan page.", "Гейти планів і ліміти, що чіпляють найчастіше. Доступність змінюється — у разі сумніву дивись сторінку плану в застосунку."),
        },
        {
          kind: "table",
          head: [L("Capability", "Можливість"), L("One-line model", "Модель одним рядком"), L("Module", "Модуль")],
          rows: [
            [L("Connectors / MCP", "Connectors / MCP"), L("Open protocol; **remote** (HTTP) vs **local** (stdio); OAuth scopes; writes pause for approval", "Відкритий протокол; **remote** (HTTP) vs **local** (stdio); OAuth scopes; запис чекає підтвердження"), L("M11", "M11")],
            [L("Skills", "Skills"), L("SKILL.md: frontmatter (L1) → body (L2) → bundled files (L3); progressive disclosure keeps context cheap", "SKILL.md: frontmatter (L1) → тіло (L2) → файли (L3); progressive disclosure тримає context дешевим"), L("M12 · M13", "M12 · M13")],
            [L("Plugins", "Plugins"), L("A bundle = skills + sub-agents + commands + hooks + MCP, shipped via a marketplace", "Бандл = skills + sub-agents + commands + hooks + MCP, через marketplace"), L("M14", "M14")],
            [L("Artifacts", "Artifacts"), L("A standalone output; **live** = persistent storage + Claude API + MCP", "Самостійний вивід; **live** = persistent storage + Claude API + MCP"), L("M8 · M9", "M8 · M9")],
          ],
          caption: L("The four ways Claude’s reach is extended (Section III + Artifacts).", "Чотири способи розширити можливості Claude (Секція III + Artifacts)."),
        },
        {
          kind: "callout",
          tone: "security",
          title: L("Security in one line", "Безпека одним рядком"),
          md: L(
            "An attack needs **two gates**: untrusted content has to get *in* (the read gate) **and** Claude has to be able to *act* on it (the act gate). Close either and the injection dies. Least privilege on every connector; protected actions (purchase, delete, account changes) always ask. (M25)",
            "Атаці потрібні **два гейти**: недовірений контент має *потрапити* (read-гейт) **і** Claude має змогти *діяти* (act-гейт). Закрий будь-який — і injection гине. Least privilege на кожному connector; захищені дії (купівля, видалення, зміна акаунта) завжди питають. (M25)",
          ),
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("Prompting in one line", "Prompting одним рядком"),
          md: L(
            "Be specific; give role + context + task + format; show an example or two; let modern models think on their own (don’t hand-write “think step by step”); then iterate on the gap. (M6)",
            "Будь конкретним; дай role + context + task + format; покажи приклад-два; дай сучасним моделям думати самим (не пиши вручну «think step by step»); потім ітеруй по різниці. (M6)",
          ),
        },
      ],
    },
    {
      id: "t4",
      title: L("Flashcards & self-check", "Flashcards і самоперевірка"),
      blocks: [
        {
          kind: "prose",
          md: L(
            "Reading is recognition; recall is what sticks. The gallery’s **flashcard mode** hides each answer so you have to produce it from memory before checking — the single most effective study move there is. Mark a card *known* and it drops out of the deck, so each pass is shorter and targets exactly what you still miss.",
            "Читання — це впізнавання; памʼять будує саме пригадування. **Flashcard mode** у галереї ховає відповідь, тож ти маєш видати її з памʼяті, перш ніж перевірити — це найефективніший навчальний прийом. Познач картку як *known* — і вона випадає з колоди, тож кожен прохід коротший і б’є саме по тому, що ще не вивчено.",
          ),
        },
        {
          kind: "compare",
          a: L("Passive re-reading", "Пасивне перечитування"),
          b: L("Active recall (flashcards)", "Активне пригадування (flashcards)"),
          rows: [
            [L("Effort", "Зусилля"), L("Feels easy, fluent", "Здається легким, плавним"), L("Feels harder — that’s the point", "Здається важчим — у цьому й сенс")],
            [L("What it trains", "Що тренує"), L("Recognising the words again", "Впізнавання тих самих слів"), L("Producing the answer from memory", "Видачу відповіді з памʼяті")],
            [L("Retention", "Утримання"), L("Fades fast", "Швидко згасає"), L("Sticks — strongest when spaced over days", "Тримається — найкраще, коли рознести на дні")],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: L("A 10-minute revision loop", "10-хвилинна петля повторення"),
          md: L(
            "Open **[Mental models](#/mental-models)**, switch on flashcard mode, and go section by section: say the model out loud, flip, mark *known* or *again*. Anything you miss, follow its module link and re-skim just that. Come back tomorrow — spacing it across a few days beats one long cram.",
            "Відкрий **[Mental models](#/mental-models)**, увімкни flashcard mode і йди секція за секцією: проговори model вголос, переверни, познач *known* або *again*. Що пропустив — іди за лінком модуля й перечитай лише його. Повернись завтра: розтягнути на кілька днів краще, ніж одне довге зубріння.",
          ),
        },
      ],
    },
  ],
  keyPoints: [
    L("Revise by **retrieval**: recall each mental model before flipping the card — recognition isn’t knowledge.", "Повторюй **пригадуванням**: згадай кожен mental model до перевертання картки — впізнавання ≠ знання."),
    L("The glossary is the fast lookup — comprehensive, bilingual, terms stay English, each linked to its module.", "Глосарій — швидкий пошук: вичерпний, двомовний, терміни English, кожен лінкований до модуля."),
    L("The cheat-sheet is one printable page: models & prices, cost levers, tool-choice, plan gates, capability one-liners.", "Cheat-sheet — одна друкована сторінка: моделі й ціни, важелі вартості, вибір інструмента, гейти планів, можливості одним рядком."),
    L("If you keep one shape: one model family → surfaces → context → capabilities → orchestration, wrapped in security.", "Якщо тримати одну форму: одна сімʼя моделей → поверхні → context → можливості → оркестрація, загорнуті в безпеку."),
    L("Product facts drift — treat the cheat-sheet numbers as “re-check before you quote them”.", "Факти про продукт змінюються — числа cheat-sheet вважай за «перевір, перш ніж цитувати»."),
  ],
  pitfalls: [
    { title: L("Re-reading instead of recalling", "Перечитувати замість пригадувати"), body: L("Skimming the modules again feels productive but mostly builds familiarity. Force the answer out first (flashcard mode), then verify.", "Перечитування модулів здається продуктивним, але здебільшого будує лише знайомість. Спершу витисни відповідь (flashcard mode), потім звір.") },
    { title: L("Trusting a memorised number", "Довіряти завченому числу"), body: L("Prices, plan gates and limits move. The cheat-sheet is a starting point, not a citation — confirm version-sensitive facts before you rely on them.", "Ціни, гейти планів і ліміти змінюються. Cheat-sheet — відправна точка, не цитата: підтверджуй версійно-залежні факти, перш ніж покладатися.") },
    { title: L("Memorising surfaces, missing the shape", "Завчити поверхні, проґавити форму"), body: L("Names of features fade; the five-layer shape (and the security wrap) is the load-bearing model that lets you place any new feature.", "Назви фіч згасають; пʼятишарова форма (і безпекова обгортка) — несуча модель, що дозволяє розмістити будь-яку нову фічу.") },
  ],
  interview: [
    { q: L("What’s the most effective way to revise this material?", "Який найефективніший спосіб повторити цей матеріал?"), a: L("Active recall over re-reading: for each module, produce its mental model from memory before checking, mark what you know, and re-study only the gaps — ideally spaced across several days rather than one cram.", "Активне пригадування замість перечитування: для кожного модуля видай його mental model з памʼяті до перевірки, познач відоме й перевчи лише прогалини — краще рознести на кілька днів, ніж одне зубріння."), level: "beginner" },
    { q: L("Why keep technical terms in English in the Ukrainian text?", "Чому лишати технічні терміни English в українському тексті?"), a: L("The industry, the docs and the product UI are all English. Translating the term just adds a second name to learn; the precision lives in the English term, so UA carries the explanation while the term stays canonical.", "Індустрія, докси й UI — англійською. Переклад терміна лише додає другу назву; точність живе в англійському терміні, тож UA несе пояснення, а термін лишається канонічним."), level: "middle" },
    { q: L("Recall the whole guide in one sentence.", "Згадай весь гайд одним реченням."), a: L("One model family (Opus/Sonnet/Haiku), reached through many surfaces (Chat, Cowork, Code, Chrome, Office), grounded by context (window, Projects, Memory), extended by capabilities (connectors/MCP, Skills, Artifacts, computer use), scaled by orchestration (sub-agents, teams, hooks, schedules) — wrapped in security throughout.", "Одна сімʼя моделей (Opus/Sonnet/Haiku), доступна через багато поверхонь (Chat, Cowork, Code, Chrome, Office), заземлена context (вікно, Projects, Memory), розширена можливостями (connectors/MCP, Skills, Artifacts, computer use), масштабована оркестрацією (sub-agents, teams, hooks, розклади) — і скрізь загорнута в безпеку."), level: "senior" },
  ],
  seeAlso: ["m27", "m26", "m1", "m6"],
  sources: [
    { title: "Pricing — Claude Platform docs", url: "https://platform.claude.com/docs/en/about-claude/pricing" },
    { title: "Models overview — Claude Platform docs", url: "https://platform.claude.com/docs/en/about-claude/models/overview" },
    { title: "Get started with Claude Cowork — Help Center", url: "https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork" },
    { title: "Make the most of Claude Memory — Help Center", url: "https://support.claude.com/en/articles/11023659-understanding-claude-s-memory" },
  ],
};

/* ======================================================================
   SECTION I · Foundations & first steps (beginner on-ramp) — authored S9.
   Web-verified 2026-06-23: model lineup & plans, surfaces, the interface,
   attachments (chat uploads 500 MB/file · 20/chat), styles→Skills migration,
   voice mode, Memory (all plans incl. Free since 2026-03) & chat search (paid).
   ====================================================================== */
const m1: Module = {
  id: "m1",
  section: "s1",
  order: 1,
  level: "beginner",
  title: L("What is Claude", "Що таке Claude"),
  tagline: L(
    "An AI assistant you talk to in plain language — it reasons over what's in front of it and, when given tools, gets real work done.",
    "AI-асистент, з яким говориш звичайною мовою — він міркує над тим, що перед ним, а з інструментами виконує реальну роботу.",
  ),
  readMins: 7,
  mentalModel: L(
    "Claude reads everything in its context window, reasons, and (when you allow it) uses tools to act — assistant + context + tools.",
    "Claude читає все у своєму context window, міркує і (коли дозволяєш) користується інструментами, щоб діяти — асистент + context + інструменти.",
  ),
  topics: [
    {
      id: "t1",
      title: L("The mental model: assistant + context + tools", "Ментальна модель: асистент + context + інструменти"),
      blocks: [
        { kind: "prose", md: L(
          "**Claude** is an AI assistant made by Anthropic. You talk to it in plain language and it writes, explains, analyzes and reasons with you. The one picture to keep: Claude reads everything currently in its **context window** — your message, attached files, the conversation so far, your instructions and memory — reasons over it, and replies. Give it **tools** (web search, file access, connectors) and it can also *act*: look things up, read and write files, drive other apps. Everything else in this guide builds on those three pieces.",
          "**Claude** — це AI-асистент від Anthropic. Ти говориш із ним звичайною мовою, а він пише, пояснює, аналізує й міркує разом з тобою. Головна картина: Claude читає все, що зараз у його **context window** — твоє повідомлення, прикріплені файли, попередню розмову, твої інструкції та memory — міркує над цим і відповідає. Дай йому **інструменти** (web search, доступ до файлів, connectors) — і він зможе ще й *діяти*: шукати, читати й писати файли, керувати застосунками. Усе інше в цьому гайді будується на цих трьох частинах.",
        ) },
        { kind: "figure", fig: "claude-mental-model", caption: L("Claude reasons over its context window and, with tools, acts on the world — then answers.", "Claude міркує над своїм context window і, маючи інструменти, діє у світі — а тоді відповідає.") },
        { kind: "callout", tone: "tip", title: L("It only knows what's in the window", "Він знає лише те, що у вікні"), md: L(
          "Claude has no hidden access to your computer, accounts or the live internet. If it should know something, put it in the chat — attach the file, paste the text, or connect a tool.",
          "У Claude немає прихованого доступу до твого компʼютера, акаунтів чи живого інтернету. Якщо він має щось знати — поклади це в чат: прикріпи файл, встав текст або під'єднай інструмент.",
        ) },
      ],
    },
    {
      id: "t2",
      title: L("The model family: Opus, Sonnet, Haiku", "Сімейство моделей: Opus, Sonnet, Haiku"),
      blocks: [
        { kind: "prose", md: L(
          "\"Claude\" is a **family** of models that trade speed for depth. Three are selectable in the apps: **Haiku** (fastest, lightest), **Sonnet** (the balanced default), and **Opus** (the most capable, for hard reasoning and long agentic work). They work the same way; you just pick the one that fits the job. Today the flagship is **Opus 4.8**, the balanced model is **Sonnet 4.6**, and the fast one is **Haiku 4.5**.",
          "\"Claude\" — це **сімейство** моделей, що балансують швидкість і глибину. У застосунках доступні три: **Haiku** (найшвидша, найлегша), **Sonnet** (збалансована за замовчуванням) і **Opus** (найпотужніша, для складних міркувань і довгих agentic-задач). Працюють вони однаково; ти просто обираєш потрібну. Сьогодні флагман — **Opus 4.8**, збалансована — **Sonnet 4.6**, швидка — **Haiku 4.5**.",
        ) },
        { kind: "table",
          head: [L("Model", "Модель"), L("Best for", "Найкраще для"), L("Context window", "Context window"), L("Cost / speed", "Вартість / швидкість")],
          rows: [
            [L("Opus 4.8", "Opus 4.8"), L("Hard reasoning, long agentic tasks, coding", "Складні міркування, довгі agentic-задачі, код"), L("1M tokens", "1M токенів"), L("Most capable · slowest · priciest", "Найпотужніша · найповільніша · найдорожча")],
            [L("Sonnet 4.6", "Sonnet 4.6"), L("The everyday default — speed + smarts", "Щоденний дефолт — швидкість + розум"), L("1M tokens", "1M токенів"), L("Balanced", "Збалансована")],
            [L("Haiku 4.5", "Haiku 4.5"), L("Quick answers, summaries, high volume", "Швидкі відповіді, підсумки, великі обсяги"), L("200K tokens", "200K токенів"), L("Fastest · cheapest", "Найшвидша · найдешевша")],
          ],
          caption: L("In the apps you just pick a model; the cost/limits are handled by your plan (M10 covers tokens & cost). Verified Jun 2026.", "У застосунках ти просто обираєш модель; вартість/ліміти залежать від плану (M10 — про токени й вартість). Перевірено: червень 2026."),
        },
        { kind: "callout", tone: "senior", title: L("Knowledge cutoff", "Межа знань (knowledge cutoff)"), md: L(
          "Each model is trained up to a date and has no built-in knowledge after it (Opus 4.8 is reliable through about **January 2026**). For anything more recent, Claude must **web-search**. Anthropic also ships more models on its developer platform — the three above are what you select in the chat apps.",
          "Кожна модель навчена до певної дати й не має вбудованих знань після неї (Opus 4.8 надійна приблизно до **січня 2026**). Для свіжішого Claude мусить робити **web-search**. Anthropic випускає й інші моделі на платформі для розробників — але в чат-застосунках ти обираєш саме ці три.",
        ) },
      ],
    },
    {
      id: "t3",
      title: L("Where Claude lives", "Де живе Claude"),
      blocks: [
        { kind: "prose", md: L(
          "You reach Claude in many places, all powered by the same models. The **apps** — web (claude.ai), **desktop** (macOS/Windows) and **mobile** (iOS/Android) — are the chat experience. Beyond chat, the same Claude shows up as an **agent** inside your tools: **Cowork** (a desktop agent that works your files), **Claude Code** (coding in the terminal/IDE), **Claude in Chrome** (a browser agent), and **Claude for Excel & PowerPoint** (Microsoft 365 add-ins). This guide covers them all — start with the apps.",
          "Дістатися Claude можна в багатьох місцях, і всі вони працюють на тих самих моделях. **Застосунки** — web (claude.ai), **desktop** (macOS/Windows) і **mobile** (iOS/Android) — це чат. Поза чатом той самий Claude зʼявляється як **agent** у твоїх інструментах: **Cowork** (desktop-агент, що працює з файлами), **Claude Code** (код у терміналі/IDE), **Claude in Chrome** (агент у браузері) та **Claude for Excel & PowerPoint** (add-ins для Microsoft 365). Гайд охоплює все — почни із застосунків.",
        ) },
        { kind: "figure", fig: "where-claude-lives", caption: L("One family of models powers the chat apps and the agentic surfaces in your tools.", "Одне сімейство моделей живить чат-застосунки й agentic-поверхні у твоїх інструментах.") },
        { kind: "callout", tone: "tip", title: L("One account, many surfaces", "Один акаунт, багато поверхонь"), md: L(
          "Your plan and settings follow you across web, desktop and mobile. The agentic surfaces (Cowork, Code, Chrome, Office) are mostly on **paid** plans — the next topic.",
          "Твій план і налаштування переходять разом із тобою між web, desktop і mobile. Agentic-поверхні (Cowork, Code, Chrome, Office) переважно на **платних** планах — про це далі.",
        ) },
      ],
    },
    {
      id: "t4",
      title: L("Plans & access", "Плани та доступ"),
      blocks: [
        { kind: "prose", md: L(
          "Claude has a free tier plus paid plans that raise your usage limits and unlock models and features. **Free** gives you the apps with Haiku and Sonnet, web search and Memory. **Pro** adds Opus, much higher limits, and the agentic surfaces (Cowork, Claude Code). **Max** multiplies limits further (two tiers). **Team** and **Enterprise** add seats, admin controls and collaboration. Everything in this beginner block works on **Free**.",
          "У Claude є безкоштовний рівень і платні плани, що піднімають ліміти та відкривають моделі й функції. **Free** дає застосунки з Haiku і Sonnet, web search і Memory. **Pro** додає Opus, значно вищі ліміти та agentic-поверхні (Cowork, Claude Code). **Max** множить ліміти ще більше (два рівні). **Team** і **Enterprise** додають місця, адмін-контролі та співпрацю. Усе в цьому блоці для новачків працює на **Free**.",
        ) },
        { kind: "table",
          head: [L("Plan", "План"), L("Roughly", "Приблизно"), L("What you get", "Що отримуєш")],
          rows: [
            [L("Free", "Free"), L("$0", "$0"), L("Apps with Haiku + Sonnet, web search, Memory, 5 projects", "Застосунки з Haiku + Sonnet, web search, Memory, 5 projects")],
            [L("Pro", "Pro"), L("~$20 / mo", "~$20 / міс"), L("Adds Opus, ~5× usage, Projects, Cowork, Claude Code", "Додає Opus, ~5× ліміту, Projects, Cowork, Claude Code")],
            [L("Max", "Max"), L("~$100 or ~$200 / mo", "~$100 або ~$200 / міс"), L("5× or 20× Pro usage, priority access to new models", "5× або 20× ліміту Pro, пріоритетний доступ до нових моделей")],
            [L("Team", "Team"), L("from ~$25 / seat / mo", "від ~$25 / місце / міс"), L("Pro features for a team + admin & collaboration", "Можливості Pro для команди + адмін і співпраця")],
            [L("Enterprise", "Enterprise"), L("Custom", "За домовленістю"), L("Org-wide security, SSO, advanced controls", "Безпека рівня організації, SSO, розширені контролі")],
          ],
          caption: L("Prices and limits change — check claude.com/pricing for today's numbers. Verified Jun 2026.", "Ціни й ліміти змінюються — актуальні цифри на claude.com/pricing. Перевірено: червень 2026."),
        },
        { kind: "callout", tone: "tip", title: L("Don't overthink the plan", "Не переускладнюй вибір плану"), md: L(
          "Start Free. Upgrade to **Pro** when you hit usage limits or want **Opus** and the agentic tools (Cowork, Code). You can change or cancel anytime in Settings → Billing.",
          "Почни з Free. Переходь на **Pro**, коли впираєшся в ліміти або хочеш **Opus** та agentic-інструменти (Cowork, Code). Змінити чи скасувати — будь-коли в Settings → Billing.",
        ) },
      ],
    },
    {
      id: "t5",
      title: L("What Claude can & can't do", "Що Claude вміє і чого ні"),
      blocks: [
        { kind: "prose", md: L(
          "Claude is strong at language-shaped work: writing and editing, explaining and tutoring, summarizing long material, analyzing data and documents, reasoning through problems, and reading images (vision). With tools it can search the web, run code, and work your files. **What it can't do:** it knows nothing that isn't in its context or training — no live access to your accounts, files or the internet unless you connect a tool or attach the material. It can also be **confidently wrong** (hallucinate), especially on facts, numbers and anything after its knowledge cutoff. Verify what matters.",
          "Claude сильний у роботі з мовою: писати й редагувати, пояснювати й навчати, підсумовувати довгі матеріали, аналізувати дані й документи, міркувати над задачами та читати зображення (vision). З інструментами він шукає в інтернеті, запускає код і працює з файлами. **Чого він не вміє:** він не знає нічого поза своїм context чи навчанням — немає живого доступу до акаунтів, файлів чи інтернету, поки ти не під'єднаєш інструмент або не прикріпиш матеріал. Він також може **впевнено помилятися** (hallucinate), особливо щодо фактів, чисел і всього після knowledge cutoff. Перевіряй важливе.",
        ) },
        { kind: "compare",
          a: L("Claude is great at", "Claude чудовий у"),
          b: L("Be careful with", "Будь обережним із"),
          rows: [
            [L("Task type", "Тип задачі"), L("Writing, summarizing, explaining, brainstorming", "Письмо, підсумки, пояснення, brainstorming"), L("Exact facts/figures with no source", "Точні факти/цифри без джерела")],
            [L("Knowledge", "Знання"), L("Reasoning over what you give it", "Міркування над тим, що ти даєш"), L("Anything recent — needs web search", "Усе свіже — потрібен web search")],
            [L("Math / logic", "Математика / логіка"), L("Step-by-step reasoning", "Покрокові міркування"), L("Silent arithmetic — ask it to show work / use code", "Мовчазна арифметика — проси показати роботу / код")],
            [L("Output", "Результат"), L("Drafts you refine", "Чернетки, які ти доопрацьовуєш"), L("Treating first output as final truth", "Сприйняття першого виводу як істини")],
          ],
        },
        { kind: "callout", tone: "senior", title: L("Trust, but verify", "Довіряй, але перевіряй"), md: L(
          "When Claude searches, it can cite sources — ask for them. For high-stakes facts, math or code, have it show its reasoning or run code, then check. A confident tone is not evidence (more in M25).",
          "Коли Claude шукає, він може наводити джерела — проси їх. Для важливих фактів, математики чи коду нехай покаже міркування або запустить код, а тоді перевір. Впевнений тон — не доказ (детальніше в M25).",
        ) },
      ],
    },
  ],
  keyPoints: [
    L("Claude is an assistant that reasons over its context window and can use tools to act.", "Claude — асистент, що міркує над context window і вміє діяти інструментами."),
    L("It only knows what's in its context or training — attach material or connect a tool for the rest.", "Він знає лише те, що в його context чи навчанні — для решти прикріпи матеріал або під'єднай інструмент."),
    L("Three models in the apps: Opus 4.8 (most capable), Sonnet 4.6 (balanced default), Haiku 4.5 (fastest).", "Три моделі в застосунках: Opus 4.8 (найпотужніша), Sonnet 4.6 (збалансований дефолт), Haiku 4.5 (найшвидша)."),
    L("Same Claude, many surfaces: web/desktop/mobile apps + Cowork, Code, Chrome, Excel/PowerPoint.", "Той самий Claude, багато поверхонь: web/desktop/mobile + Cowork, Code, Chrome, Excel/PowerPoint."),
    L("Start Free; Pro adds Opus and the agentic tools. Claude can be confidently wrong — verify what matters.", "Почни з Free; Pro додає Opus і agentic-інструменти. Claude може впевнено помилятися — перевіряй важливе."),
  ],
  pitfalls: [
    { title: L("Expecting live knowledge", "Очікувати живих знань"), body: L("\"What's today's price of X?\" with no web search gives stale or invented answers — enable search or attach the data.", "\"Яка сьогодні ціна X?\" без web search дає застарілі або вигадані відповіді — увімкни пошук або прикріпи дані.") },
    { title: L("Assuming it can see your files or screen", "Думати, що він бачить твої файли чи екран"), body: L("It can't until you attach files or grant a tool (Cowork / a connector). No attachment, no access.", "Не бачить, поки не прикріпиш файли або не даси інструмент (Cowork / connector). Немає вкладення — немає доступу.") },
    { title: L("Trusting confident answers on facts/numbers", "Довіряти впевненим відповідям щодо фактів/чисел"), body: L("Ask for sources or have it run code; verify high-stakes claims before acting on them.", "Проси джерела або запуск коду; перевіряй важливі твердження, перш ніж діяти.") },
  ],
  interview: [
    { q: L("In one sentence, what is Claude?", "Одним реченням: що таке Claude?"), a: L("An AI assistant that reasons over the content in its context window and, when given tools, can act in the world — search, run code, use your files.", "AI-асистент, що міркує над вмістом свого context window і, маючи інструменти, може діяти у світі — шукати, запускати код, працювати з файлами."), level: "beginner" },
    { q: L("Why does Claude sometimes not know recent events?", "Чому Claude іноді не знає свіжих подій?"), a: L("Its knowledge comes from training data up to a cutoff date plus whatever is in the chat; for anything newer it must web-search.", "Його знання — це навчальні дані до дати cutoff плюс те, що в чаті; для свіжішого він мусить робити web-search."), level: "beginner" },
    { q: L("How do you choose between Opus, Sonnet and Haiku?", "Як обрати між Opus, Sonnet і Haiku?"), a: L("Match depth vs speed/cost: Haiku for quick and cheap, Sonnet as the balanced default, Opus for hard reasoning or long agentic tasks.", "Балансуй глибину проти швидкості/ціни: Haiku — швидко й дешево, Sonnet — збалансований дефолт, Opus — складні міркування чи довгі agentic-задачі."), level: "middle" },
  ],
  seeAlso: ["m2", "m3", "m27"],
  sources: [
    { title: "Models overview — Claude Docs", url: "https://docs.claude.com/en/docs/about-claude/models/overview" },
    { title: "Choosing the right Claude model — Claude", url: "https://claude.com/resources/tutorials/choosing-the-right-claude-model" },
    { title: "Pricing — Claude", url: "https://claude.com/pricing" },
    { title: "What is the Pro plan? — Help Center", url: "https://support.claude.com/en/articles/8325606-what-is-the-pro-plan" },
    { title: "Introducing Claude Opus 4.8 — Anthropic", url: "https://www.anthropic.com/news/claude-opus-4-8" },
  ],
};

const m2: Module = {
  id: "m2",
  section: "s1",
  order: 2,
  level: "beginner",
  title: L("Interface & settings tour", "Інтерфейс і огляд налаштувань"),
  tagline: L(
    "A quick tour so nothing in the Claude UI is a mystery — the message box, the model menu, and the settings that matter.",
    "Швидкий тур, щоб у UI Claude не лишилось загадок — поле вводу, меню моделі та налаштування, що мають значення.",
  ),
  readMins: 7,
  mentalModel: L(
    "Two places to know: the chat (composer + sidebar) where you work, and Settings where you shape how Claude behaves and what it remembers.",
    "Два місця, які варто знати: чат (composer + sidebar), де ти працюєш, і Settings, де ти формуєш поведінку Claude і те, що він памʼятає.",
  ),
  topics: [
    {
      id: "t1",
      title: L("Chat layout & the message box", "Розкладка чату й поле вводу"),
      blocks: [
        { kind: "prose", md: L(
          "The app has a **sidebar** on the left (new chat, recent chats, **Projects**, search) and the **chat** on the right. The thing to master is the **message box (composer)**: type your prompt, then use the **\"+\" button** (or type **\"/\"**) to add files, turn on **Research**, pick a **style**, and more. Next to **send** is the **model menu** for choosing the model and how hard it thinks; a **voice** icon lets you talk instead of type.",
          "Зліва — **sidebar** (новий чат, недавні чати, **Projects**, пошук), справа — **чат**. Опанувати варто **поле вводу (composer)**: введи prompt, а тоді кнопкою **\"+\"** (або символом **\"/\"**) додай файли, увімкни **Research**, обери **style** тощо. Поруч із **send** — **меню моделі** для вибору моделі та глибини мислення; іконка **voice** дозволяє говорити замість друку.",
        ) },
        { kind: "figure", fig: "interface-map", caption: L("The composer is the cockpit: the +/\"/\" menu, the model menu, voice, and send — beside a sidebar of chats and Projects.", "Composer — це кабіна пілота: меню +/\"/\", меню моделі, voice і send — поруч із sidebar чатів і Projects.") },
        { kind: "table",
          head: [L("Control", "Елемент"), L("Where", "Де"), L("What it does", "Що робить")],
          rows: [
            [L("+ / \"/\"", "+ / \"/\""), L("Left of the composer", "Зліва в composer"), L("Add files, Research, styles, tools", "Додати файли, Research, styles, tools")],
            [L("Model menu", "Меню моделі"), L("By the send button", "Біля кнопки send"), L("Pick model + effort + thinking", "Обрати модель + effort + thinking")],
            [L("Voice", "Voice"), L("In the chat window", "У вікні чату"), L("Talk to Claude (voice mode)", "Говорити з Claude (voice mode)")],
            [L("Sidebar", "Sidebar"), L("Left edge", "Лівий край"), L("New chat, recents, Projects, search", "Новий чат, недавні, Projects, пошук")],
          ],
        },
      ],
    },
    {
      id: "t2",
      title: L("Choosing model, effort & thinking", "Вибір моделі, effort і thinking"),
      blocks: [
        { kind: "prose", md: L(
          "One menu controls three related things: **which model** answers (Opus / Sonnet / Haiku, M1), the **effort** level (how much work it puts in — Low / Medium / High / Max on capable models), and **extended thinking** (whether it reasons step-by-step before answering). More effort and thinking mean better answers on hard problems, but slower and costlier ones. For everyday questions the defaults are fine; raise them for hard reasoning.",
          "Одне меню керує трьома повʼязаними речами: **яка модель** відповідає (Opus / Sonnet / Haiku, M1), рівень **effort** (скільки зусиль — Low / Medium / High / Max на потужних моделях) і **extended thinking** (чи міркує покроково перед відповіддю). Більше effort і thinking — кращі відповіді на складних задачах, але повільніші й дорожчі. Для щоденних питань вистачає дефолтів; піднімай їх для складних міркувань.",
        ) },
        { kind: "callout", tone: "tip", title: L("Pick the smallest model that nails the task", "Обирай найменшу модель, що впорається"), md: L(
          "Sonnet handles most things fast; switch to **Opus** for hard reasoning or long agentic work, and drop to **Haiku** for quick or bulk tasks (more on cost in M10).",
          "Sonnet швидко тягне більшість задач; перемикайся на **Opus** для складних міркувань чи довгих agentic-задач і на **Haiku** для швидких або масових (про вартість — M10).",
        ) },
      ],
    },
    {
      id: "t3",
      title: L("Settings: profile, appearance, voice, language", "Settings: профіль, вигляд, voice, мова"),
      blocks: [
        { kind: "prose", md: L(
          "Open **Settings** from your initials in the lower-left. The ones beginners care about: **Instructions for Claude** (account-wide custom instructions — tell it your role, preferences and how to respond, once, for every chat); **Appearance** (Light / Match System / Dark, plus a dyslexic-friendly font); **Voice** (Settings → General → Voice settings); and **Language** (the interface is available in about 11 languages, independent of the language you chat in).",
          "Відкрий **Settings** через свої ініціали внизу зліва. Що важливо новачку: **Instructions for Claude** (інструкції на весь акаунт — вкажи роль, уподобання й бажаний стиль відповіді один раз для всіх чатів); **Appearance** (Light / Match System / Dark та шрифт для дислексії); **Voice** (Settings → General → Voice settings); і **Language** (інтерфейс ~11 мовами, незалежно від мови спілкування).",
        ) },
        { kind: "table",
          head: [L("Setting", "Налаштування"), L("Where", "Де"), L("Why you'd touch it", "Навіщо чіпати")],
          rows: [
            [L("Instructions for Claude", "Instructions for Claude"), L("Settings → Profile", "Settings → Profile"), L("Set role/preferences once for all chats", "Задати роль/уподобання раз для всіх чатів")],
            [L("Appearance", "Appearance"), L("Settings → Appearance", "Settings → Appearance"), L("Light/dark, dyslexic-friendly font", "Світла/темна тема, шрифт для дислексії")],
            [L("Voice", "Voice"), L("Settings → General", "Settings → General"), L("Choose a voice & mode for voice mode", "Обрати голос і режим для voice mode")],
            [L("Language", "Language"), L("Settings → Language", "Settings → Language"), L("Change the interface language", "Змінити мову інтерфейсу")],
          ],
        },
        { kind: "callout", tone: "tip", title: L("\"Instructions for Claude\" is the highest-leverage setting", "\"Instructions for Claude\" — найвпливовіше налаштування"), md: L(
          "One sentence about who you are and how you like answers (\"I'm a backend dev; be concise; show code\") improves every future chat — set it once instead of re-typing it each time (more in M3 / M6).",
          "Одне речення про те, хто ти і які відповіді любиш (\"I'm a backend dev; be concise; show code\"), покращує кожен наступний чат — задай раз замість повторювати щоразу (детальніше в M3 / M6).",
        ) },
      ],
    },
    {
      id: "t4",
      title: L("Privacy, data controls & billing", "Приватність, дані та білінг"),
      blocks: [
        { kind: "prose", md: L(
          "Two settings matter most. **Help Improve Claude** (Settings → Privacy) controls whether your chats are used to train future models — it's your choice, and that choice also affects how long chats are retained (longer if you allow training, about **30 days** if you don't). **Billing** (Settings → Billing) is where you upgrade, switch monthly/annual, or cancel. Deleting a conversation removes it from your history right away.",
          "Найважливіші — два налаштування. **Help Improve Claude** (Settings → Privacy) визначає, чи використовуються твої чати для навчання майбутніх моделей — це твій вибір, і він також впливає на термін зберігання чатів (довше, якщо дозволяєш навчання, близько **30 днів**, якщо ні). **Billing** (Settings → Billing) — де оновлюєш план, перемикаєш місяць/рік або скасовуєш. Видалення розмови одразу прибирає її з історії.",
        ) },
        { kind: "callout", tone: "security", title: L("Know your data choice", "Знай свій вибір щодо даних"), md: L(
          "Review **Settings → Privacy** and set \"Help Improve Claude\" to match your comfort. For a one-off sensitive chat, use an **Incognito chat** (next topic) — it isn't saved, remembered, or used for training (more in M5 / M25).",
          "Переглянь **Settings → Privacy** і встанови \"Help Improve Claude\" під свій комфорт. Для разової чутливої розмови використай **Incognito chat** (наступна тема) — він не зберігається, не запамʼятовується і не йде на навчання (детальніше в M5 / M25).",
        ) },
      ],
    },
    {
      id: "t5",
      title: L("Organizing chats, Incognito & getting around", "Організація чатів, Incognito та навігація"),
      blocks: [
        { kind: "prose", md: L(
          "Recent chats live in the sidebar; **Projects** (M7) group related chats with shared instructions and files, and you can **star** a Project to pin it. On paid plans, **chat search** lets Claude find and reference past conversations. For a private, throwaway session, start an **Incognito chat** (the ghost icon) — it's excluded from history, Memory, search and training. On the Mac desktop app, **double-tap Option** opens a quick-entry box from any app.",
          "Недавні чати — у sidebar; **Projects** (M7) групують повʼязані чати зі спільними інструкціями й файлами, а Project можна **star**, щоб закріпити. На платних планах **chat search** дає Claude знаходити й цитувати минулі розмови. Для приватної одноразової сесії відкрий **Incognito chat** (іконка-привид) — він поза історією, Memory, пошуком і навчанням. У desktop-застосунку на Mac **подвійне натискання Option** відкриває швидкий ввід із будь-якого застосунку.",
        ) },
        { kind: "compare",
          a: L("Regular chat", "Звичайний чат"),
          b: L("Incognito chat", "Incognito chat"),
          rows: [
            [L("Saved to history", "Зберігається в історії"), L("Yes", "Так"), L("No", "Ні")],
            [L("Used by Memory & search", "Використовується Memory і пошуком"), L("Yes", "Так"), L("No — excluded", "Ні — виключено")],
            [L("Used to train models", "Йде на навчання моделей"), L("Only if you allow it", "Лише якщо дозволиш"), L("Never", "Ніколи")],
            [L("Best for", "Найкраще для"), L("Everyday work you'll revisit", "Щоденна робота, до якої повернешся"), L("One-off or sensitive questions", "Разові чи чутливі питання")],
          ],
        },
        { kind: "callout", tone: "tip", title: L("There isn't a big official shortcut sheet", "Великого офіційного списку гарячих клавіш немає"), md: L(
          "The reliable power moves: **\"/\"** and **\"+\"** in the composer, and on **Mac desktop**, double-tap **Option** for quick entry and **Caps Lock** for dictation.",
          "Надійні прийоми: **\"/\"** і **\"+\"** у composer, а на **Mac desktop** — подвійне **Option** для швидкого вводу та **Caps Lock** для диктування.",
        ) },
      ],
    },
  ],
  keyPoints: [
    L("The composer is the cockpit: +/\"/\" adds files, Research and styles; the model menu sets model + effort + thinking.", "Composer — кабіна пілота: +/\"/\" додає файли, Research і styles; меню моделі задає модель + effort + thinking."),
    L("Open Settings from your initials (lower-left). \"Instructions for Claude\" shapes every chat.", "Settings — через ініціали внизу зліва. \"Instructions for Claude\" впливає на кожен чат."),
    L("Appearance (light/dark, dyslexic font), Voice and Language all live under Settings.", "Appearance (світла/темна, шрифт для дислексії), Voice і Language — усі в Settings."),
    L("\"Help Improve Claude\" (Settings → Privacy) is your training/retention choice; Billing is where you upgrade/cancel.", "\"Help Improve Claude\" (Settings → Privacy) — твій вибір навчання/зберігання; Billing — оновлення/скасування."),
    L("Incognito chats (ghost icon) are excluded from history, Memory, search and training.", "Incognito chats (іконка-привид) поза історією, Memory, пошуком і навчанням."),
  ],
  pitfalls: [
    { title: L("Re-typing your context every chat", "Повторювати свій контекст щочату"), body: L("Set \"Instructions for Claude\" once instead — it applies to every conversation automatically.", "Натомість задай \"Instructions for Claude\" один раз — воно діє в кожній розмові автоматично.") },
    { title: L("Not knowing your privacy choice", "Не знати свій вибір приватності"), body: L("Check Settings → Privacy so you're comfortable with how chats are trained on and retained.", "Перевір Settings → Privacy, щоб бути впевненим у тому, як чати йдуть на навчання і скільки зберігаються.") },
    { title: L("Expecting a rich keyboard-shortcut set", "Очікувати багато гарячих клавіш"), body: L("Only a few are official — the slash/plus menus and (Mac desktop) quick entry / dictation.", "Офіційних мало — меню slash/plus і (Mac desktop) швидкий ввід / диктування.") },
  ],
  interview: [
    { q: L("Where do you set preferences that should apply to every chat?", "Де задати уподобання, що діють у кожному чаті?"), a: L("Settings → \"Instructions for Claude\" (account-wide). Per-project behavior goes in a Project's instructions instead.", "Settings → \"Instructions for Claude\" (на весь акаунт). Поведінку для конкретного проєкту задають в інструкціях Project."), level: "beginner" },
    { q: L("What does an Incognito chat skip?", "Що пропускає Incognito chat?"), a: L("It isn't saved to history, isn't used by Memory or chat search, and isn't used for training (it's still briefly retained for safety).", "Він не зберігається в історії, не використовується Memory чи chat search і не йде на навчання (та коротко зберігається для безпеки)."), level: "beginner" },
    { q: L("What three things does the model menu control?", "Якими трьома речами керує меню моделі?"), a: L("The model, the effort level, and extended thinking.", "Модель, рівень effort і extended thinking."), level: "middle" },
  ],
  seeAlso: ["m1", "m3", "m5"],
  sources: [
    { title: "Get started with Claude — Help Center", url: "https://support.claude.com/en/articles/8114491-get-started-with-claude" },
    { title: "Change the model, effort, and thinking settings — Help Center", url: "https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings" },
    { title: "Customizing your appearance settings — Help Center", url: "https://support.claude.com/en/articles/8887527-customizing-your-appearance-settings" },
    { title: "How do I change my model improvement privacy settings? — Privacy Center", url: "https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings" },
    { title: "Using incognito chats — Help Center", url: "https://support.claude.com/en/articles/12260368-using-incognito-chats" },
  ],
};

const m3: Module = {
  id: "m3",
  section: "s1",
  order: 3,
  level: "beginner",
  title: L("Talking to Claude — prompting basics", "Спілкування з Claude — основи prompting"),
  tagline: L(
    "How a request becomes a result — say what you want, give the context, and iterate.",
    "Як запит стає результатом — скажи, що хочеш, дай context і ітеруй.",
  ),
  readMins: 7,
  mentalModel: L(
    "Everything Claude knows in a chat lives in its context window — so a good prompt puts the right things in the window and says clearly what to do with them.",
    "Усе, що Claude знає в чаті, лежить у його context window — тож хороший prompt кладе у вікно потрібне й чітко каже, що з цим робити.",
  ),
  topics: [
    {
      id: "t1",
      title: L("What a prompt is & how Claude reads it", "Що таке prompt і як Claude його читає"),
      blocks: [
        { kind: "prose", md: L(
          "A **prompt** is just your message. Claude reads it together with everything else currently in the chat — earlier messages, attached files, your instructions, and memory — and produces the most useful continuation. There's no hidden knowledge of your situation: if it matters, it has to be in the window. So prompting well is mostly *putting the right information in front of Claude and stating the goal clearly.*",
          "**Prompt** — це просто твоє повідомлення. Claude читає його разом з усім іншим, що зараз у чаті — попередні повідомлення, прикріплені файли, твої інструкції та memory — і дає найкорисніше продовження. Прихованого знання про твою ситуацію немає: якщо щось важливе, воно має бути у вікні. Тож добре prompt-ити — це здебільшого *покласти перед Claude потрібну інформацію й чітко сформулювати мету.*",
        ) },
        { kind: "figure", fig: "prompt-flow", caption: L("Your prompt plus the context in the window go into Claude; it reasons and answers; you iterate with follow-ups.", "Твій prompt разом із context у вікні йдуть у Claude; він міркує й відповідає; ти ітеруєш уточненнями.") },
      ],
    },
    {
      id: "t2",
      title: L("Context: what Claude knows in a chat", "Context: що Claude знає в чаті"),
      blocks: [
        { kind: "prose", md: L(
          "\"Context\" is everything Claude can currently see: the conversation so far, files you've attached, your account **Instructions for Claude**, project knowledge (M7), and **Memory** (M5). It does **not** include things you only said in *other* chats (unless Memory or chat search bring them in), your files (unless attached), or the live internet (unless it searches). When in doubt, paste or attach the material.",
          "\"Context\" — це все, що Claude зараз бачить: попередню розмову, прикріплені файли, твої **Instructions for Claude**, knowledge проєкту (M7) і **Memory** (M5). Він **не** включає те, що ти казав лише в *інших* чатах (хіба що Memory чи chat search це підтягнуть), твої файли (поки не прикріпиш) чи живий інтернет (поки не пошукає). Сумніваєшся — встав або прикріпи матеріал.",
        ) },
        { kind: "callout", tone: "tip", title: L("A new chat starts almost empty", "Новий чат починається майже порожнім"), md: L(
          "Want a clean slate? Start a new chat. Want continuity? Stay in the same chat, or rely on Memory / Projects to carry context forward (more in M5, M10).",
          "Хочеш чистий аркуш? Почни новий чат. Хочеш безперервність? Лишайся в тому ж чаті або поклади перенесення контексту на Memory / Projects (детальніше в M5, M10).",
        ) },
      ],
    },
    {
      id: "t3",
      title: L("Being specific: task, format, constraints", "Конкретика: задача, формат, обмеження"),
      blocks: [
        { kind: "prose", md: L(
          "Vague prompts get generic answers. Three levers fix that: state the **task** (\"summarize\", \"rewrite\", \"find bugs\"), the **format** you want (\"a 5-bullet list\", \"a table\", \"JSON\"), and any **constraints** (\"under 200 words\", \"for a non-technical reader\", \"only using the attached data\"). You don't need magic words — just be the clear, specific manager Claude can follow.",
          "Розмиті prompt дають загальні відповіді. Три важелі це виправляють: назви **task** (\"summarize\", \"rewrite\", \"find bugs\"), бажаний **format** (\"список із 5 пунктів\", \"таблиця\", \"JSON\") і будь-які **constraints** (\"до 200 слів\", \"для нетехнічного читача\", \"тільки за прикріпленими даними\"). Магічні слова не потрібні — будь чітким, конкретним керівником, за яким Claude може йти.",
        ) },
        { kind: "compare",
          a: L("Vague prompt", "Розмитий prompt"),
          b: L("Specific prompt", "Конкретний prompt"),
          rows: [
            [L("Ask", "Запит"), L("\"Tell me about this CSV\"", "\"Розкажи про цей CSV\""), L("\"Summarize the top 3 trends in this CSV as bullets, for execs\"", "\"Підсумуй 3 головні тренди цього CSV пунктами, для керівництва\"")],
            [L("Format", "Формат"), L("Unspecified", "Не задано"), L("Bullets, ≤120 words", "Пункти, ≤120 слів")],
            [L("Result", "Результат"), L("Generic, may miss the point", "Загальний, може промазати"), L("On-target, usable as-is", "Влучний, придатний як є")],
          ],
        },
        { kind: "table",
          head: [L("What you want", "Що хочеш"), L("Add to your prompt", "Додай у prompt")],
          rows: [
            [L("A specific shape", "Конкретну форму"), L("\"Reply as a table with columns X, Y, Z\"", "\"Відповідай таблицею зі стовпцями X, Y, Z\"")],
            [L("The right audience", "Потрібну аудиторію"), L("\"Explain for a beginner / for my CFO\"", "\"Поясни для новачка / для мого CFO\"")],
            [L("Tighter output", "Стисліший вивід"), L("\"Keep it under 150 words\"", "\"Тримай у межах 150 слів\"")],
            [L("A grounded answer", "Обґрунтовану відповідь"), L("\"Use only the attached file\" / \"Search the web and cite sources\"", "\"Лише за прикріпленим файлом\" / \"Пошукай в інтернеті й наведи джерела\"")],
          ],
        },
      ],
    },
    {
      id: "t4",
      title: L("Iterating & follow-ups", "Ітерації та уточнення"),
      blocks: [
        { kind: "prose", md: L(
          "Treat it as a conversation, not a slot machine. If the first answer isn't right, **say what to change** — \"shorter\", \"more formal\", \"focus on section 2\", \"you misread the date\". Claude keeps the context, so follow-ups refine rather than restart. Iterating in small steps beats trying to write one perfect mega-prompt.",
          "Сприймай це як розмову, а не гральний автомат. Якщо перша відповідь не та — **скажи, що змінити**: \"коротше\", \"формальніше\", \"зосередься на розділі 2\", \"ти неправильно прочитав дату\". Claude тримає context, тож уточнення доопрацьовують, а не починають з нуля. Малі кроки кращі за спробу написати один ідеальний мега-prompt.",
        ) },
        { kind: "callout", tone: "tip", title: L("Steer, don't start over", "Скеровуй, а не починай заново"), md: L(
          "A quick \"good, but make it concise and add a code example\" usually beats rewriting the whole prompt. For a genuinely different direction, start a new chat so old context doesn't tag along.",
          "Швидке \"добре, але зроби стисліше й додай приклад коду\" зазвичай краще за переписування всього prompt. Для справді іншого напрямку відкрий новий чат, щоб старий context не тягнувся.",
        ) },
      ],
    },
    {
      id: "t5",
      title: L("Common beginner mistakes", "Типові помилки новачків"),
      blocks: [
        { kind: "prose", md: L(
          "The usual traps: asking for recent facts without turning on web search; assuming Claude can see a file or screen you never attached; burying the actual question under paragraphs of backstory; and accepting a confident answer without checking. The fix is the same move each time — put the right context in, state the goal, and verify what matters.",
          "Звичні пастки: питати свіжі факти без увімкненого web search; думати, що Claude бачить файл чи екран, який ти не прикріпив; ховати справжнє питання під абзацами передісторії; приймати впевнену відповідь без перевірки. Виправлення щоразу однакове — поклади потрібний context, сформулюй мету й перевір важливе.",
        ) },
        { kind: "callout", tone: "warn", title: L("When accuracy counts", "Коли важлива точність"), md: L(
          "For facts, numbers or code, ask Claude to cite sources, show its reasoning, or run code — then check. A confident tone is not evidence (more in M1, M25).",
          "Для фактів, чисел чи коду проси Claude навести джерела, показати міркування або запустити код — а тоді перевір. Впевнений тон — не доказ (детальніше в M1, M25).",
        ) },
      ],
    },
  ],
  keyPoints: [
    L("A prompt is read together with everything in the context window — put what matters in front of Claude.", "Prompt читається разом з усім у context window — поклади перед Claude те, що важливо."),
    L("Be specific: state the task, the format, and the constraints.", "Будь конкретним: назви task, format і constraints."),
    L("A new chat starts nearly empty; the same chat (or Memory/Projects) carries context forward.", "Новий чат майже порожній; той самий чат (або Memory/Projects) переносить context далі."),
    L("Iterate with small follow-ups instead of restarting.", "Ітеруй малими уточненнями замість почати заново."),
    L("Verify facts, numbers and code — confidence isn't correctness.", "Перевіряй факти, числа й код — впевненість не дорівнює правильності."),
  ],
  pitfalls: [
    { title: L("Asking about recent events without web search", "Питати про свіжі події без web search"), body: L("You get stale or invented answers — enable search or attach the data.", "Отримаєш застарілі чи вигадані відповіді — увімкни пошук або прикріпи дані.") },
    { title: L("Referring to \"the file/the screen\" you never attached", "Згадувати \"файл/екран\", який не прикріпив"), body: L("Claude can't see it. Attach it, or it's not in the context.", "Claude його не бачить. Прикріпи — інакше його немає в context.") },
    { title: L("One giant prompt with the question buried", "Один велетенський prompt із захованим питанням"), body: L("Lead with the goal, then add the context — don't make Claude dig for the ask.", "Спершу мета, потім context — не змушуй Claude шукати суть запиту.") },
  ],
  interview: [
    { q: L("Why does being specific about format help so much?", "Чому конкретика щодо формату так допомагає?"), a: L("It removes guesswork — Claude optimizes for exactly what you asked, so naming the shape (table, bullets, word count) and audience yields usable output the first time.", "Вона прибирає здогадки — Claude оптимізує саме під твій запит, тож названа форма (таблиця, пункти, ліміт слів) і аудиторія дають придатний результат з першого разу."), level: "beginner" },
    { q: L("What's the fastest way to fix an answer that's close but off?", "Який найшвидший спосіб виправити майже правильну відповідь?"), a: L("A targeted follow-up in the same chat (\"make it concise, fix the date\") — the context is retained, so it refines instead of restarting.", "Точкове уточнення в тому ж чаті (\"зроби стисліше, виправ дату\") — context зберігається, тож відбувається доопрацювання, а не рестарт."), level: "beginner" },
    { q: L("When should you start a new chat instead of following up?", "Коли краще почати новий чат замість уточнення?"), a: L("When you want a clean context for an unrelated task — to avoid old messages biasing the answer and to save context budget.", "Коли потрібен чистий context для незвʼязаної задачі — щоб старі повідомлення не зміщували відповідь і щоб зекономити context budget."), level: "middle" },
  ],
  seeAlso: ["m6", "m1", "m5"],
  sources: [
    { title: "Get started with Claude — Help Center", url: "https://support.claude.com/en/articles/8114491-get-started-with-claude" },
    { title: "Prompt engineering overview — Claude Docs", url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview" },
    { title: "Be clear and direct — Claude Docs", url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct" },
  ],
};

const m4: Module = {
  id: "m4",
  section: "s1",
  order: 4,
  level: "beginner",
  title: L("Attachments, writing styles & voice", "Вкладення, writing styles і голос"),
  tagline: L(
    "Bring your material in — files, images and your voice — and shape the voice that comes out.",
    "Принось свій матеріал — файли, зображення й голос — і формуй голос на виході.",
  ),
  readMins: 7,
  mentalModel: L(
    "Inputs in (files, images, voice), style out — you control both what Claude sees and how it sounds.",
    "Входи (файли, зображення, голос), стиль на виході — ти керуєш і тим, що Claude бачить, і тим, як він звучить.",
  ),
  topics: [
    {
      id: "t1",
      title: L("Attaching files & images", "Додавання файлів і зображень"),
      blocks: [
        { kind: "prose", md: L(
          "Use the **\"+\"** in the composer to attach files and images, drag them into the chat, or paste an image. Claude reads documents (PDF, DOCX, TXT, CSV, HTML, JSON, and more) and images (PNG, JPG, GIF, WebP). For PDFs under ~100 pages it reads both the **text and the visuals** (charts, layout). Chat uploads are generous — up to **500 MB per file, 20 files per chat**. One caveat: for non-PDF documents Claude extracts **text only**, so images embedded inside a DOCX won't be seen.",
          "Кнопкою **\"+\"** у composer прикріпляй файли й зображення, перетягуй їх у чат або вставляй картинку. Claude читає документи (PDF, DOCX, TXT, CSV, HTML, JSON та інші) і зображення (PNG, JPG, GIF, WebP). Для PDF до ~100 сторінок він читає і **текст, і візуальне** (графіки, верстку). Ліміти chat uploads щедрі — до **500 MB на файл, 20 файлів на чат**. Нюанс: з не-PDF документів Claude дістає **лише текст**, тож зображення всередині DOCX він не побачить.",
        ) },
        { kind: "table",
          head: [L("You attach", "Ти прикріпляєш"), L("Claude reads", "Claude читає"), L("Good for", "Для чого")],
          rows: [
            [L("PDF (<100 pp)", "PDF (<100 стор.)"), L("Text + visuals", "Текст + візуальне"), L("Reports, papers, scanned layouts", "Звіти, статті, скани з версткою")],
            [L("DOCX / TXT / HTML", "DOCX / TXT / HTML"), L("Text only", "Лише текст"), L("Drafts, notes, articles", "Чернетки, нотатки, статті")],
            [L("CSV / JSON", "CSV / JSON"), L("The data", "Дані"), L("Analysis, summaries, charts", "Аналіз, підсумки, графіки")],
            [L("Images (PNG/JPG/…)", "Зображення (PNG/JPG/…)"), L("The picture (vision)", "Картинку (vision)"), L("Screenshots, diagrams, photos", "Скриншоти, діаграми, фото")],
          ],
          caption: L("Chat uploads: up to 500 MB/file, 20 files/chat. Project files are capped at 30 MB each. Verified Jun 2026.", "Chat uploads: до 500 MB/файл, 20 файлів/чат. Файли в Project обмежені 30 MB кожен. Перевірено: червень 2026."),
        },
        { kind: "callout", tone: "tip", title: L("Attach, don't describe", "Прикріплюй, а не описуй"), md: L(
          "If your question is about a document or screenshot, attach it instead of retyping it. Claude answers from what it can actually see.",
          "Якщо питання про документ чи скриншот — прикріпи його, а не передруковуй. Claude відповідає з того, що справді бачить.",
        ) },
      ],
    },
    {
      id: "t2",
      title: L("Writing styles: preset & custom", "Writing styles: готові та власні"),
      blocks: [
        { kind: "prose", md: L(
          "**Styles** change how Claude writes without you re-asking each time. Presets include **Normal**, **Concise**, **Formal** and **Explanatory**; you can also create a **custom style** by uploading samples of your writing or describing the voice you want. Pick a style from the composer's tools menu.",
          "**Styles** змінюють те, як Claude пише, без повторних прохань щоразу. Серед готових — **Normal**, **Concise**, **Formal** і **Explanatory**; можна створити й **власний style**, завантаживши зразки свого письма або описавши потрібний голос. Обирай style у меню інструментів composer.",
        ) },
        { kind: "callout", tone: "warn", title: L("Styles are moving to Skills", "Styles переходять у Skills"), md: L(
          "Anthropic is migrating writing styles into **Skills** (M12). The Concise/Explanatory/Formal presets are being retired, \"Learning\" becomes a Skill, and custom styles migrate automatically (disabled by default — re-enable under Customize → Skills). Expect the styles menu to disappear over time; the capability lives on as Skills.",
          "Anthropic переносить writing styles у **Skills** (M12). Готові Concise/Explanatory/Formal згортають, \"Learning\" стає Skill, а власні styles мігрують автоматично (вимкнені за замовчуванням — увімкни в Customize → Skills). З часом меню styles зникне; сама можливість лишиться як Skills.",
        ) },
        { kind: "compare",
          a: L("Default voice", "Голос за замовчуванням"),
          b: L("Custom style", "Власний style"),
          rows: [
            [L("Setup", "Налаштування"), L("None — works out of the box", "Жодного — працює одразу"), L("Upload samples or describe once", "Завантаж зразки або опиши один раз")],
            [L("Best for", "Найкраще для"), L("General use", "Загального вжитку"), L("Your brand / personal voice, repeatedly", "Твій бренд / особистий голос, постійно")],
            [L("Where it's heading", "Куди рухається"), L("Stays", "Лишається"), L("Becomes a Skill you enable", "Стає Skill, який вмикаєш")],
          ],
        },
      ],
    },
    {
      id: "t3",
      title: L("Voice input & talking to Claude", "Голосовий ввід і розмова з Claude"),
      blocks: [
        { kind: "prose", md: L(
          "You can **talk** to Claude instead of typing. **Voice mode** (the sound-wave icon) is a two-way spoken conversation — it's in beta on **all plans**, on web, iOS and Android. There's a small preset selection of voices, two modes (**hands-free** and **push-to-talk**), and multilingual input. Voice conversations count toward your usage and are saved as transcripts.",
          "Із Claude можна **говорити** замість друку. **Voice mode** (іконка звукової хвилі) — це двостороння голосова розмова; вона в beta на **всіх планах**, на web, iOS та Android. Є невеликий набір готових голосів, два режими (**hands-free** і **push-to-talk**) та багатомовний ввід. Голосові розмови враховуються в ліміт і зберігаються як транскрипти.",
        ) },
        { kind: "callout", tone: "tip", title: L("Two different things", "Дві різні речі"), md: L(
          "Voice mode (a spoken conversation) is not the same as dictation (speech turned into text you can edit). On Mac desktop, Caps Lock toggles dictation.",
          "Voice mode (голосова розмова) — це не те саме, що dictation (мовлення, перетворене на текст, який можна редагувати). На Mac desktop dictation вмикає Caps Lock.",
        ) },
      ],
    },
    {
      id: "t4",
      title: L("Output formats: markdown, tables & artifacts", "Формати виводу: markdown, таблиці та artifacts"),
      blocks: [
        { kind: "prose", md: L(
          "By default Claude replies in **Markdown** — headings, **bold**, lists, tables and code blocks all render nicely. When the output is substantial or meant to be used on its own — a document, a code file, an HTML/React mini-app, an SVG or a diagram — Claude puts it in an **Artifact**: a side panel you can view, edit, version and share. Artifacts are available on all plans (a quick intro here; M8 goes deep).",
          "За замовчуванням Claude відповідає у **Markdown** — заголовки, **жирний**, списки, таблиці та блоки коду гарно відображаються. Коли вивід великий або призначений для окремого використання — документ, файл коду, HTML/React міні-застосунок, SVG чи діаграма — Claude кладе його в **Artifact**: бічну панель, яку можна переглядати, редагувати, версіонувати й ділитися. Artifacts доступні на всіх планах (тут короткий вступ; деталі — M8).",
        ) },
        { kind: "table",
          head: [L("Output", "Вивід"), L("Looks like", "Має вигляд"), L("Covered in", "Розкрито в")],
          rows: [
            [L("Inline Markdown", "Inline Markdown"), L("Formatted text, tables, code", "Форматований текст, таблиці, код"), L("This module", "Цей модуль")],
            [L("Artifact — document / code", "Artifact — документ / код"), L("Editable side panel", "Редагована бічна панель"), L("M8 Artifacts", "M8 Artifacts")],
            [L("Artifact — app / diagram", "Artifact — застосунок / діаграма"), L("Runnable HTML/React, SVG", "Робочий HTML/React, SVG"), L("M8 / M9", "M8 / M9")],
          ],
        },
        { kind: "callout", tone: "tip", title: L("Ask for the shape you want", "Проси потрібну форму"), md: L(
          "\"Reply as a table\", \"give me a one-file HTML page\", \"put the essay in an artifact\" — naming the format gets you the right container.",
          "\"Відповідай таблицею\", \"дай односторінковий HTML\", \"поклади есе в artifact\" — названий формат дає правильний контейнер.",
        ) },
      ],
    },
  ],
  keyPoints: [
    L("Attach files/images with \"+\", drag, or paste; Claude reads many doc types and sees images.", "Прикріпляй файли/зображення через \"+\", перетягуванням або вставкою; Claude читає багато типів і бачить зображення."),
    L("Chat uploads: up to 500 MB/file, 20 files/chat; non-PDF docs are read as text only.", "Chat uploads: до 500 MB/файл, 20 файлів/чат; не-PDF документи читаються лише як текст."),
    L("Styles shape Claude's voice (Normal/Concise/Formal/Explanatory + custom) — and are migrating into Skills.", "Styles формують голос Claude (Normal/Concise/Formal/Explanatory + власні) — і переходять у Skills."),
    L("Voice mode (beta, all plans) is a spoken conversation; dictation is just speech-to-text.", "Voice mode (beta, усі плани) — голосова розмова; dictation — лише мовлення в текст."),
    L("Default output is Markdown; substantial/standalone output becomes an editable Artifact.", "Дефолтний вивід — Markdown; великий/окремий вивід стає редагованим Artifact."),
  ],
  pitfalls: [
    { title: L("Describing a document instead of attaching it", "Описувати документ замість прикріпити"), body: L("Attach it so Claude reads the real thing rather than your paraphrase.", "Прикріпи, щоб Claude читав оригінал, а не твій переказ.") },
    { title: L("Expecting embedded images in a DOCX to be read", "Очікувати, що зображення в DOCX прочитаються"), body: L("Only PDFs (and standalone image files) are seen visually; other docs are text-extracted.", "Візуально читаються лише PDF (і окремі файли-зображення); інші документи — лише текст.") },
    { title: L("Building habits on the styles menu", "Будувати звички навколо меню styles"), body: L("It's being replaced by Skills — learn Skills (M12) so your setup survives the migration.", "Його замінюють Skills — вивчи Skills (M12), щоб твоє налаштування пережило міграцію.") },
  ],
  interview: [
    { q: L("How does Claude read a PDF vs a DOCX?", "Як Claude читає PDF проти DOCX?"), a: L("PDFs under ~100 pages are read with text + visuals; non-PDF docs like DOCX are text-extracted only (embedded images aren't seen).", "PDF до ~100 сторінок читаються з текстом + візуальним; не-PDF як DOCX — лише текст (вбудовані зображення не видно)."), level: "beginner" },
    { q: L("What's happening to writing styles?", "Що відбувається з writing styles?"), a: L("They're being folded into Skills — presets like Concise/Explanatory/Formal are retiring and custom styles migrate (disabled by default), so the capability continues as Skills.", "Їх згортають у Skills — готові Concise/Explanatory/Formal зникають, а власні мігрують (вимкнені за замовчуванням), тож можливість лишається як Skills."), level: "middle" },
    { q: L("When does a response become an Artifact instead of inline text?", "Коли відповідь стає Artifact, а не inline-текстом?"), a: L("When it's substantial and self-contained — a document, code file, mini-app or diagram — so you can view, edit, version and reuse it in a side panel.", "Коли вона велика й самодостатня — документ, файл коду, міні-застосунок чи діаграма — щоб переглядати, редагувати, версіонувати й повторно використовувати в бічній панелі."), level: "beginner" },
  ],
  seeAlso: ["m3", "m8", "m12"],
  sources: [
    { title: "Upload files to Claude — Help Center", url: "https://support.claude.com/en/articles/8241126-upload-files-to-claude" },
    { title: "Configure and use styles — Help Center", url: "https://support.claude.com/en/articles/10181068-configure-and-use-styles" },
    { title: "Use voice mode — Help Center", url: "https://support.claude.com/en/articles/11101966-use-voice-mode" },
    { title: "What are artifacts and how do I use them? — Help Center", url: "https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them" },
  ],
};

const m5: Module = {
  id: "m5",
  section: "s1",
  order: 5,
  level: "beginner",
  title: L("Memory & chat search", "Memory і пошук чатів"),
  tagline: L(
    "How Claude carries context across chats — what Memory stores, how to control it, and how to find past conversations.",
    "Як Claude переносить context між чатами — що зберігає Memory, як ним керувати і як знаходити минулі розмови.",
  ),
  readMins: 7,
  mentalModel: L(
    "Memory = a durable summary that survives across chats (which you can edit); chat search = pulling a specific past conversation back in on demand.",
    "Memory = тривкий підсумок, що живе між чатами (його можна редагувати); chat search = підтягування конкретної минулої розмови на вимогу.",
  ),
  topics: [
    {
      id: "t1",
      title: L("What Memory is & what it stores", "Що таке Memory і що він зберігає"),
      blocks: [
        { kind: "prose", md: L(
          "By default each new chat starts fresh. **Memory** changes that: Claude keeps a running **summary** of what it's learned about your work — your role and projects, how you like to communicate, your technical and coding preferences — and feeds it into every new (non-project) chat. The summary refreshes about every 24 hours. Memory is available on **all plans including Free** (Free since March 2026).",
          "За замовчуванням кожен новий чат починається з чистого аркуша. **Memory** це змінює: Claude веде живий **підсумок** того, що дізнався про твою роботу — твою роль і проєкти, як ти любиш спілкуватися, твої технічні та code-уподобання — і подає його в кожен новий (не-project) чат. Підсумок оновлюється приблизно щодоби. Memory доступний на **всіх планах, включно з Free** (на Free — з березня 2026).",
        ) },
        { kind: "figure", fig: "memory-across-sessions", caption: L("Separate chats over time read from and write to a durable Memory; each Project keeps its own walled memory.", "Окремі чати в часі читають із Memory й пишуть у нього; кожен Project тримає власну ізольовану memory.") },
        { kind: "callout", tone: "tip", title: L("Work context, not your diary", "Робочий контекст, а не щоденник"), md: L(
          "Memory focuses on work-related details (role, projects, preferences). It's designed to make you repeat yourself less — not to store everything about you.",
          "Memory зосереджений на робочих деталях (роль, проєкти, уподобання). Він створений, щоб ти менше повторювався — а не щоб зберігати про тебе все.",
        ) },
      ],
    },
    {
      id: "t2",
      title: L("Global vs project memory", "Global проти project memory"),
      blocks: [
        { kind: "prose", md: L(
          "There are really two memory spaces. Your **global** memory summarizes all your ordinary chats. Each **Project** (M7) has its **own separate** memory, so a client project's context stays out of your other work. Project chats don't feed the global summary, and the global summary doesn't leak into a project.",
          "Насправді є два простори memory. **Global** memory підсумовує всі твої звичайні чати. Кожен **Project** (M7) має **власну окрему** memory, тож контекст клієнтського проєкту не потрапляє в іншу твою роботу. Project-чати не живлять global-підсумок, а global-підсумок не протікає в проєкт.",
        ) },
        { kind: "compare",
          a: L("Global memory", "Global memory"),
          b: L("Project memory", "Project memory"),
          rows: [
            [L("Covers", "Охоплює"), L("Your non-project chats", "Твої не-project чати"), L("One project's chats", "Чати одного проєкту")],
            [L("Isolation", "Ізоляція"), L("Shared across general chats", "Спільна для загальних чатів"), L("Walled to that project", "Замкнена в межах проєкту")],
            [L("Use it for", "Використовуй для"), L("Your ongoing preferences", "Твої постійні уподобання"), L("Keeping a project's context separate", "Тримати контекст проєкту окремо")],
          ],
        },
      ],
    },
    {
      id: "t3",
      title: L("Controlling memory: view, edit, forget", "Керування memory: перегляд, редагування, forget"),
      blocks: [
        { kind: "prose", md: L(
          "You're in control. In **Settings → Capabilities → \"View and edit memory\"** you see everything Claude remembers and can change it. You can also just **tell Claude in chat** what to remember or correct — and that applies to your next chat immediately. Two off-switches: **Pause** (keep what's there but stop using and adding) and **Reset** (permanently delete all memories, including project memories).",
          "Контроль за тобою. У **Settings → Capabilities → \"View and edit memory\"** видно все, що Claude памʼятає, і це можна змінити. Можна й просто **сказати Claude у чаті**, що запамʼятати чи виправити — і це застосується до наступного чату одразу. Два вимикачі: **Pause** (лишити наявне, але не використовувати й не додавати) і **Reset** (остаточно видалити всю memory, включно з project memory).",
        ) },
        { kind: "table",
          head: [L("Action", "Дія"), L("Where", "Де"), L("Effect", "Ефект")],
          rows: [
            [L("View / edit", "Перегляд / редагування"), L("Settings → Capabilities → View and edit memory", "Settings → Capabilities → View and edit memory"), L("See & change what Claude knows", "Бачити й міняти те, що Claude знає")],
            [L("Add in chat", "Додати в чаті"), L("Tell Claude \"remember that…\"", "Сказати Claude \"запамʼятай, що…\""), L("Applies to your next chat", "Діє з наступного чату")],
            [L("Pause", "Pause"), L("Memory toggle", "Перемикач memory"), L("Keeps memory but stops using/updating it", "Лишає memory, але не використовує й не оновлює")],
            [L("Reset", "Reset"), L("Memory toggle", "Перемикач memory"), L("Permanently deletes all (incl. project) memory", "Остаточно видаляє всю (включно з project) memory")],
          ],
        },
        { kind: "callout", tone: "security", title: L("Incognito skips memory", "Incognito оминає memory"), md: L(
          "An Incognito chat (M2) isn't used by memory or saved to history, and won't draw on existing memory. Use it when you don't want a conversation to shape what Claude remembers.",
          "Incognito chat (M2) не використовується memory й не зберігається в історії та не спирається на наявну memory. Використовуй, коли не хочеш, щоб розмова впливала на те, що Claude памʼятає.",
        ) },
      ],
    },
    {
      id: "t4",
      title: L("Importing memories & finding past chats", "Імпорт memories та пошук минулих чатів"),
      blocks: [
        { kind: "prose", md: L(
          "Moving from another assistant? **Memory import** (Settings → Capabilities → Memory → Start import) lets you paste your exported memories from tools like ChatGPT or Gemini; it's experimental and available on Free/Pro/Max/Team. Separately, **chat search** lets Claude **search and reference your past conversations** on demand (\"what did we decide about X?\") — it uses retrieval behind the scenes and is on **paid plans**, on by default.",
          "Переходиш з іншого асистента? **Memory import** (Settings → Capabilities → Memory → Start import) дозволяє вставити експортовані memories з інструментів на кшталт ChatGPT чи Gemini; це експериментально й доступно на Free/Pro/Max/Team. Окремо **chat search** дає Claude **шукати й цитувати твої минулі розмови** на вимогу (\"що ми вирішили про X?\") — під капотом це retrieval, на **платних планах**, увімкнено за замовчуванням.",
        ) },
        { kind: "compare",
          a: L("Memory", "Memory"),
          b: L("Chat search", "Chat search"),
          rows: [
            [L("How it works", "Як працює"), L("Always-on summary injected into new chats", "Завжди увімкнений підсумок у нових чатах"), L("On-demand retrieval when you ask", "Retrieval на вимогу, коли просиш")],
            [L("You see", "Ти бачиш"), L("An editable summary", "Редагований підсумок"), L("Citations to the original chats", "Цитати на оригінальні чати")],
            [L("Plans", "Плани"), L("All plans incl. Free", "Усі плани, включно з Free"), L("Paid plans (Pro/Max/Team/Enterprise)", "Платні плани (Pro/Max/Team/Enterprise)")],
            [L("Best for", "Найкраще для"), L("Standing preferences & context", "Постійні уподобання й контекст"), L("Pulling back a specific past discussion", "Повернути конкретне минуле обговорення")],
          ],
        },
        { kind: "callout", tone: "tip", title: L("They work together", "Вони працюють разом"), md: L(
          "Memory keeps the gist always-on; chat search fetches the details when you ask. Both skip Incognito chats.",
          "Memory тримає суть завжди напоготові; chat search дістає деталі, коли просиш. Обидва оминають Incognito chats.",
        ) },
      ],
    },
  ],
  keyPoints: [
    L("Memory is a running, editable summary of your work context, fed into every new non-project chat (~24h refresh).", "Memory — живий редагований підсумок твого робочого контексту, що подається в кожен новий не-project чат (оновлення ~24 год)."),
    L("Available on all plans incl. Free; global memory and per-project memory are separate spaces.", "Доступний на всіх планах, включно з Free; global memory і per-project memory — окремі простори."),
    L("Control it in Settings → Capabilities (view/edit), or just tell Claude in chat; Pause or Reset to stop/wipe.", "Керуй у Settings → Capabilities (перегляд/редагування) або просто скажи в чаті; Pause чи Reset, щоб спинити/стерти."),
    L("Memory import (experimental) brings memories from other assistants; chat search (paid) retrieves past chats on demand.", "Memory import (експеримент) переносить memories з інших асистентів; chat search (платно) дістає минулі чати на вимогу."),
    L("Incognito chats are excluded from both Memory and chat search.", "Incognito chats виключені і з Memory, і з chat search."),
  ],
  pitfalls: [
    { title: L("Assuming Claude remembers another chat by default", "Думати, що Claude памʼятає інший чат за замовчуванням"), body: L("Without Memory or chat search, each chat is independent — it won't recall other conversations on its own.", "Без Memory чи chat search кожен чат незалежний — він не згадає інші розмови сам по собі.") },
    { title: L("Forgetting Memory is editable", "Забувати, що Memory редагований"), body: L("Wrong or stale facts persist until you fix or reset them — check \"View and edit memory\" now and then.", "Хибні чи застарілі факти лишаються, поки не виправиш чи не скинеш — заглядай у \"View and edit memory\" час від часу.") },
    { title: L("Expecting chat search on Free", "Очікувати chat search на Free"), body: L("Chat search is a paid feature; on Free you still get Memory (the always-on summary).", "Chat search — платна функція; на Free лишається Memory (завжди увімкнений підсумок).") },
  ],
  interview: [
    { q: L("How do Memory and chat search differ?", "Чим відрізняються Memory і chat search?"), a: L("Memory is an always-on, editable summary injected into new chats; chat search is on-demand retrieval of specific past conversations (paid plans), shown with citations.", "Memory — завжди увімкнений редагований підсумок у нових чатах; chat search — retrieval конкретних минулих розмов на вимогу (платні плани), з цитатами."), level: "beginner" },
    { q: L("How do you correct something Claude \"knows\" about you?", "Як виправити те, що Claude \"знає\" про тебе?"), a: L("Edit it in Settings → Capabilities → View and edit memory, or just tell Claude in chat — the change applies to your next conversation.", "Виправ у Settings → Capabilities → View and edit memory або просто скажи в чаті — зміна діє з наступної розмови."), level: "beginner" },
    { q: L("Why might a project's context not show up in your other chats?", "Чому контекст проєкту може не зʼявлятися в інших чатах?"), a: L("Projects have a separate, walled memory space; project chats don't feed global memory and vice versa.", "Projects мають окремий ізольований простір memory; project-чати не живлять global memory і навпаки."), level: "middle" },
  ],
  seeAlso: ["m7", "m2", "m10"],
  sources: [
    { title: "Use Claude's chat search and memory to build on previous context — Help Center", url: "https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context" },
    { title: "Import and export your memory from Claude — Help Center", url: "https://support.claude.com/en/articles/12123587-import-and-export-your-memory-from-claude" },
    { title: "Using incognito chats — Help Center", url: "https://support.claude.com/en/articles/12260368-using-incognito-chats" },
    { title: "Release notes — Help Center", url: "https://support.claude.com/en/articles/12138966-release-notes" },
  ],
};


/* ---- assembled, ordered, and indexed ------------------------------------ */
export const MODULES: Module[] = [...planned, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16, m17, m18, m19, m20, m21, m22, m23, m24, m25, m26, m27, m28].sort((a, b) => a.order - b.order);

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
