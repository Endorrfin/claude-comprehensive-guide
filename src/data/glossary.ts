/* ===========================================================================
   Glossary — the comprehensive, bilingual term bank for the whole guide.
   One entry per concept that appears across the 28 modules. Technical TERMS
   stay in English in both languages (industry/docs/UI are English); the UA
   side carries the explanation. `modules` cross-links each term back to where
   it is taught. Rendered by GlossaryPage (#/glossary) — search + category +
   A–Z. Authored S10b.
   =========================================================================== */
import type { Localized } from "./types";

const L = (en: string, uk: string): Localized => ({ en, uk });

export type GlossaryCategory =
  | "models"
  | "prompting"
  | "context"
  | "connectors"
  | "skills"
  | "cowork"
  | "tools"
  | "agentic"
  | "security"
  | "general";

export type GlossaryTerm = {
  /** The term — stays English in both languages. */
  term: string;
  category: GlossaryCategory;
  /** Bilingual definition. */
  def: Localized;
  /** Module ids where the term is taught (cross-links). */
  modules?: string[];
};

/** Category metadata for the page's filter chips (order = display order). */
export const GLOSSARY_CATEGORIES: { id: GlossaryCategory; label: Localized }[] = [
  { id: "models", label: L("Models & plans", "Моделі та плани") },
  { id: "prompting", label: L("Prompting", "Prompting") },
  { id: "context", label: L("Context & memory", "Context і memory") },
  { id: "connectors", label: L("Connectors / MCP", "Connectors / MCP") },
  { id: "skills", label: L("Skills & plugins", "Skills і plugins") },
  { id: "cowork", label: L("Cowork", "Cowork") },
  { id: "tools", label: L("Tools & code", "Інструменти й код") },
  { id: "agentic", label: L("Agentic", "Agentic") },
  { id: "security", label: L("Security", "Безпека") },
  { id: "general", label: L("General / AI", "Загальне / AI") },
];

export const GLOSSARY: GlossaryTerm[] = [
  /* ---- Models & plans ---------------------------------------------------- */
  {
    term: "Claude",
    category: "models",
    def: L(
      "Anthropic’s family of AI assistants, reached through many surfaces — Chat, Cowork, Claude Code, Claude in Chrome and the Office add-ins.",
      "Сімʼя AI-асистентів від Anthropic, доступна через багато поверхонь — Chat, Cowork, Claude Code, Claude in Chrome та Office-add-ins.",
    ),
    modules: ["m1", "m27"],
  },
  {
    term: "Anthropic",
    category: "models",
    def: L("The company that builds Claude and the Claude API/Platform.", "Компанія, що створює Claude і Claude API/Platform."),
    modules: ["m1"],
  },
  {
    term: "model family",
    category: "models",
    def: L(
      "The set of models you choose from — Opus (most capable), Sonnet (balanced), Haiku (fastest). Same family behind every surface; you pick the trade-off.",
      "Набір моделей на вибір — Opus (найпотужніша), Sonnet (баланс), Haiku (найшвидша). За кожною поверхнею — та сама сімʼя; ти обираєш компроміс.",
    ),
    modules: ["m1", "m27"],
  },
  {
    term: "Opus 4.8",
    category: "models",
    def: L(
      "The flagship model — strongest at hard reasoning, code and long agentic work. Uses adaptive thinking; priced $5/$25 per MTok (in/out).",
      "Флагманська модель — найсильніша в складних міркуваннях, коді й довгій agentic-роботі. Adaptive thinking; ціна $5/$25 за MTok (in/out).",
    ),
    modules: ["m1"],
  },
  {
    term: "Sonnet 4.6",
    category: "models",
    def: L(
      "The balanced everyday default — strong quality at lower cost/latency than Opus. $3/$15 per MTok; the Free/Pro chat default.",
      "Збалансований щоденний default — висока якість за нижчу ціну/латентність, ніж Opus. $3/$15 за MTok; default у chat на Free/Pro.",
    ),
    modules: ["m1"],
  },
  {
    term: "Haiku 4.5",
    category: "models",
    def: L(
      "The fastest, cheapest model — for speed, volume and simple classification. $1/$5 per MTok; 200K context.",
      "Найшвидша й найдешевша модель — для швидкості, обсягу й простої класифікації. $1/$5 за MTok; context 200K.",
    ),
    modules: ["m1"],
  },
  {
    term: "adaptive thinking",
    category: "models",
    def: L(
      "Modern Claude models decide how much to reason for the task on their own, so you rarely need to hand-write “think step by step”.",
      "Сучасні моделі Claude самі вирішують, скільки міркувати над задачею, тож рідко треба вручну писати «think step by step».",
    ),
    modules: ["m1", "m6"],
  },
  {
    term: "extended thinking",
    category: "models",
    def: L(
      "A mode where the model reasons at length before answering — useful for hard problems; it spends more output tokens on reasoning.",
      "Режим, де модель довго міркує перед відповіддю — корисно для складних задач; витрачає більше output-токенів на міркування.",
    ),
    modules: ["m2", "m6"],
  },
  {
    term: "knowledge cutoff",
    category: "models",
    def: L(
      "The date after which a model has no built-in knowledge; for fresh facts it must search or be given context. Opus 4.8’s reliable cutoff is ~January 2026.",
      "Дата, після якої модель не має вбудованих знань; для свіжих фактів вона має шукати або отримати context. Надійний cutoff Opus 4.8 — приблизно січень 2026.",
    ),
    modules: ["m1"],
  },
  {
    term: "token",
    category: "models",
    def: L(
      "The unit a model reads and writes — roughly ¾ of a word (~4 characters) in English. Billing, context limits and speed are all measured in tokens.",
      "Одиниця, яку модель читає й пише — приблизно ¾ слова (~4 символи) англійською. Білінг, ліміти context і швидкість міряються в токенах.",
    ),
    modules: ["m10"],
  },
  {
    term: "MTok",
    category: "models",
    def: L("“Per million tokens” — the unit API prices are quoted in (e.g. $3/$15 per MTok = input/output).", "«За мільйон токенів» — одиниця цін API (напр. $3/$15 за MTok = input/output)."),
    modules: ["m10"],
  },
  {
    term: "prompt caching",
    category: "models",
    def: L(
      "Reusing a stable prompt prefix (system text, knowledge) so repeated calls read it at ~10% of the price (−90%); cache writes cost a little more (1.25×/2×).",
      "Повторне використання стабільного префікса prompt (system-текст, knowledge), щоб повторні виклики читали його за ~10% ціни (−90%); запис у кеш коштує трохи більше (1.25×/2×).",
    ),
    modules: ["m10"],
  },
  {
    term: "Batch API",
    category: "models",
    def: L(
      "Submitting many requests for asynchronous processing at −50% cost; stacks with prompt caching. Best for non-urgent, large jobs.",
      "Надсилання багатьох запитів для асинхронної обробки за −50% вартості; складається з prompt caching. Найкраще для несрочних великих задач.",
    ),
    modules: ["m10"],
  },
  {
    term: "1M context",
    category: "models",
    def: L(
      "A one-million-token context window (Opus 4.8/4.7 & Sonnet 4.6), now flat-rate. Lets you fit big repos/docs — but curate, don’t dump.",
      "Вікно context на мільйон токенів (Opus 4.8/4.7 і Sonnet 4.6), тепер flat-rate. Дозволяє вмістити великі репо/докси — але курируй, не звалюй.",
    ),
    modules: ["m10"],
  },
  {
    term: "plans (Free / Pro / Max / Team / Enterprise)",
    category: "models",
    def: L(
      "Claude’s subscription tiers. Many features gate by plan: Cowork & chat-search are paid; Memory & code-execution reach Free; computer use is Pro/Max preview.",
      "Рівні підписки Claude. Багато фіч залежать від плану: Cowork і chat-search — платні; Memory та code-execution — і на Free; computer use — preview на Pro/Max.",
    ),
    modules: ["m1", "m26"],
  },
  {
    term: "Claude API / Claude Platform",
    category: "models",
    def: L(
      "The developer interface to Claude — call models programmatically, with tools, caching, batch and Skills. Also available on AWS and Microsoft Foundry.",
      "Інтерфейс розробника до Claude — викликати моделі програмно, з tools, caching, batch і Skills. Також доступний на AWS і Microsoft Foundry.",
    ),
    modules: ["m1", "m12"],
  },
  {
    term: "multimodal",
    category: "models",
    def: L(
      "Able to take more than text as input — Claude reads images, PDFs and documents alongside your prompt.",
      "Здатність приймати на вхід не лише текст — Claude читає зображення, PDF і документи разом із prompt.",
    ),
    modules: ["m4"],
  },

  /* ---- Prompting --------------------------------------------------------- */
  {
    term: "prompt",
    category: "prompting",
    def: L(
      "The instruction you give Claude. Its clarity, context and structure largely determine the quality of the answer.",
      "Інструкція, яку ти даєш Claude. Її чіткість, context і структура великою мірою визначають якість відповіді.",
    ),
    modules: ["m3", "m6"],
  },
  {
    term: "system prompt",
    category: "prompting",
    def: L(
      "Standing instructions that frame the whole conversation (role, rules, format) — separate from each user message.",
      "Постійні інструкції, що обрамлюють усю розмову (роль, правила, формат) — окремо від кожного повідомлення користувача.",
    ),
    modules: ["m6"],
  },
  {
    term: "prompt engineering",
    category: "prompting",
    def: L(
      "The craft of writing prompts that reliably get good results — being specific, giving context, structuring the request and showing examples.",
      "Майстерність писати prompt, що надійно дають гарний результат — конкретність, context, структура запиту й приклади.",
    ),
    modules: ["m6"],
  },
  {
    term: "GCAO",
    category: "prompting",
    def: L(
      "A prompt template — Goal, Context, Audience, Output — a quick checklist to make a request specific and complete.",
      "Шаблон prompt — Goal, Context, Audience, Output — швидкий чекліст, щоб зробити запит конкретним і повним.",
    ),
    modules: ["m6"],
  },
  {
    term: "few-shot / examples",
    category: "prompting",
    def: L(
      "Including a few worked examples in the prompt so Claude matches the pattern — usually the highest-leverage way to shape output.",
      "Включення кількох готових прикладів у prompt, щоб Claude повторив патерн — зазвичай найдієвіший спосіб задати форму виводу.",
    ),
    modules: ["m6"],
  },
  {
    term: "chain-of-thought (CoT)",
    category: "prompting",
    def: L(
      "Asking the model to reason step by step before answering. With adaptive thinking you rarely write it by hand — the model does it when needed.",
      "Прохання до моделі міркувати крок за кроком перед відповіддю. З adaptive thinking рідко пишеш це вручну — модель робить це за потреби.",
    ),
    modules: ["m6"],
  },
  {
    term: "self-critique",
    category: "prompting",
    def: L(
      "A pattern where the model reviews and improves its own draft — “critique this, then rewrite” — to catch errors before the final answer.",
      "Патерн, де модель перевіряє й покращує власну чернетку — «розкритикуй це, потім перепиши» — щоб зловити помилки до фінальної відповіді.",
    ),
    modules: ["m6"],
  },
  {
    term: "XML tags",
    category: "prompting",
    def: L(
      "Wrapping parts of a prompt/output in tags (e.g. <context>…</context>) to keep structure unambiguous — the recommended way to request structured output on 4.6+.",
      "Загортання частин prompt/виводу в теги (напр. <context>…</context>) для однозначної структури — рекомендований спосіб просити структурований вивід на 4.6+.",
    ),
    modules: ["m6"],
  },
  {
    term: "output schema",
    category: "prompting",
    def: L(
      "A required shape for the answer (JSON keys, fields, format) so the result is machine-readable and consistent.",
      "Обовʼязкова форма відповіді (ключі JSON, поля, формат), щоб результат був машиночитним і стабільним.",
    ),
    modules: ["m6"],
  },
  {
    term: "prefill",
    category: "prompting",
    def: L(
      "Starting the assistant’s reply for it to steer format. Deprecated on Claude 4.6+ — use XML output tags instead.",
      "Початок відповіді асистента, щоб задати формат. Застаріло на Claude 4.6+ — натомість використовуй XML output-теги.",
    ),
    modules: ["m6"],
  },
  {
    term: "hallucination",
    category: "prompting",
    def: L(
      "When a model states something false with confidence. Reduce it by grounding in provided context/sources and asking for citations.",
      "Коли модель упевнено стверджує хибне. Зменшується заземленням у наданому context/джерелах і проханням про цитати.",
    ),
    modules: ["m3", "m6"],
  },
  {
    term: "over-prompting",
    category: "prompting",
    def: L(
      "Piling on rules and caveats until the model over-triggers or gets confused. Modern models need less hand-holding, not more.",
      "Нагромадження правил і застережень, доки модель не починає перебільшувати чи плутатися. Сучасним моделям треба менше опіки, а не більше.",
    ),
    modules: ["m6"],
  },

  /* ---- Context & memory -------------------------------------------------- */
  {
    term: "context window",
    category: "context",
    def: L(
      "The fixed budget of tokens a model can “see” at once — system prompt + history + attachments + the reserved answer. Overflow gets truncated.",
      "Фіксований бюджет токенів, які модель «бачить» одночасно — system prompt + історія + attachments + зарезервована відповідь. Надлишок обрізається.",
    ),
    modules: ["m10"],
  },
  {
    term: "token budget",
    category: "context",
    def: L(
      "How the context window is spent across system text, knowledge, memory, conversation and the reserved output — the thing you manage to control cost and quality.",
      "Як витрачається вікно context між system-текстом, knowledge, memory, розмовою й зарезервованим виводом — те, чим керуєш заради вартості та якості.",
    ),
    modules: ["m10"],
  },
  {
    term: "truncation",
    category: "context",
    def: L(
      "Dropping content that no longer fits the context window — usually the oldest turns. What’s cut is no longer “known” to the model.",
      "Викидання контенту, що вже не вміщається у вікно context — зазвичай найстаріших реплік. Те, що зрізане, модель уже не «знає».",
    ),
    modules: ["m10"],
  },
  {
    term: "lost in the middle",
    category: "context",
    def: L(
      "The tendency for models to recall the start and end of a long context better than the middle — so put the critical bits at the edges.",
      "Схильність моделей краще пригадувати початок і кінець довгого context, ніж середину — тож клади критичне по краях.",
    ),
    modules: ["m10"],
  },
  {
    term: "Projects",
    category: "context",
    def: L(
      "A reusable workspace that walls off instructions + knowledge for a body of work, so every chat in it starts grounded.",
      "Багаторазовий workspace, що відгороджує instructions + knowledge для напряму роботи, тож кожен chat у ньому стартує заземленим.",
    ),
    modules: ["m7"],
  },
  {
    term: "project knowledge",
    category: "context",
    def: L(
      "Files and text attached to a Project that Claude can draw on across all its chats — retrieved as needed rather than always fully loaded.",
      "Файли й текст, прикріплені до Project, на які Claude спирається в усіх його chat — дістаються за потреби, а не завжди повністю завантажені.",
    ),
    modules: ["m7"],
  },
  {
    term: "context wall",
    category: "context",
    def: L(
      "The boundary of a Project — its instructions and knowledge stay inside; other projects/chats don’t see them.",
      "Межа Project — його instructions і knowledge лишаються всередині; інші проєкти/chat їх не бачать.",
    ),
    modules: ["m7"],
  },
  {
    term: "Memory",
    category: "context",
    def: L(
      "Claude’s persistent recall of facts about you across chats. Two spaces: a global memory and a walled per-project memory. All plans incl. Free (since Mar 2026).",
      "Постійне пригадування Claude фактів про тебе між chat. Два простори: глобальна memory й ізольована per-project. Усі плани, включно з Free (з берез. 2026).",
    ),
    modules: ["m5"],
  },
  {
    term: "RAG (retrieval-augmented generation)",
    category: "context",
    def: L(
      "Fetching only the relevant pieces of a large knowledge base and feeding them into the prompt at answer time — how Project knowledge and chat search work.",
      "Діставання лише релевантних шматків великої бази знань і подача їх у prompt під час відповіді — так працюють Project knowledge і chat search.",
    ),
    modules: ["m7", "m5"],
  },
  {
    term: "chat search",
    category: "context",
    def: L(
      "On-demand retrieval across your past conversations to pull a relevant answer back into the current chat. Paid plans; distinct from always-on Memory.",
      "Пошук на вимогу по минулих розмовах, щоб витягнути релевантну відповідь у поточний chat. Платні плани; відрізняється від завжди-увімкненої Memory.",
    ),
    modules: ["m5"],
  },
  {
    term: "attachments",
    category: "context",
    def: L(
      "Files, images and PDFs added to a chat as input. Chat uploads allow up to 500 MB/file and 20 files per chat.",
      "Файли, зображення й PDF, додані в chat як вхід. Chat-завантаження — до 500 MB/файл і 20 файлів на chat.",
    ),
    modules: ["m4"],
  },
  {
    term: "writing styles",
    category: "context",
    def: L(
      "Presets/custom styles that shape Claude’s tone and format. They are migrating into Skills — presets are being retired and custom styles auto-migrate.",
      "Пресети/кастомні стилі, що задають тон і формат Claude. Вони переходять у Skills — пресети згортають, а кастомні стилі мігрують автоматично.",
    ),
    modules: ["m4"],
  },
  {
    term: "voice",
    category: "context",
    def: L(
      "Talking to Claude by speaking instead of typing, with dictation/voice modes in the apps.",
      "Спілкування з Claude голосом замість набору, з режимами диктування/voice у застосунках.",
    ),
    modules: ["m4"],
  },

  /* ---- Connectors / MCP -------------------------------------------------- */
  {
    term: "MCP (Model Context Protocol)",
    category: "connectors",
    def: L(
      "The open protocol that lets Claude talk to external tools and data through a standard interface — the plumbing behind every connector.",
      "Відкритий протокол, що дозволяє Claude спілкуватися із зовнішніми tools і даними через стандартний інтерфейс — основа кожного connector.",
    ),
    modules: ["m11"],
  },
  {
    term: "connector",
    category: "connectors",
    def: L(
      "A packaged MCP integration to a specific app (Gmail, Notion, Drive, Calendar) that you connect once and Claude can then use.",
      "Готова MCP-інтеграція до конкретного застосунку (Gmail, Notion, Drive, Calendar), яку підключаєш один раз, і далі Claude може нею користуватися.",
    ),
    modules: ["m11"],
  },
  {
    term: "Connectors Directory",
    category: "connectors",
    def: L(
      "The in-app catalogue of ready-made connectors (hundreds, across plans incl. Free) — distinct from building a custom connector.",
      "Внутрішній каталог готових connectors (сотні, на планах включно з Free) — на відміну від створення custom connector.",
    ),
    modules: ["m11"],
  },
  {
    term: "MCP server",
    category: "connectors",
    def: L(
      "The program that exposes tools to Claude over MCP. It may be the vendor’s or your own; reached remotely (HTTP) or locally (stdio).",
      "Програма, що віддає tools для Claude через MCP. Може бути вендорською або твоєю; доступна віддалено (HTTP) чи локально (stdio).",
    ),
    modules: ["m11"],
  },
  {
    term: "remote MCP server",
    category: "connectors",
    def: L(
      "An MCP server reached over HTTP. “Remote” means the transport, not the owner — it isn’t necessarily Anthropic-hosted.",
      "MCP-сервер, доступний через HTTP. «Remote» — про транспорт, а не власника: це не обовʼязково хостинг Anthropic.",
    ),
    modules: ["m11"],
  },
  {
    term: "local MCP server",
    category: "connectors",
    def: L(
      "An MCP server running on your machine, reached over stdio — good for local tools and private data that never leaves the device.",
      "MCP-сервер, що працює на твоїй машині, доступний через stdio — добре для локальних tools і приватних даних, що не покидають пристрій.",
    ),
    modules: ["m11"],
  },
  {
    term: "stdio transport",
    category: "connectors",
    def: L("The local transport for MCP — Claude talks to a server process over standard input/output on the same machine.", "Локальний транспорт MCP — Claude говорить із процесом-сервером через стандартний ввід/вивід на тій самій машині."),
    modules: ["m11"],
  },
  {
    term: "tools/list",
    category: "connectors",
    def: L(
      "The MCP discovery step where Claude asks a server which tools it offers, before choosing one to call.",
      "Крок виявлення в MCP, де Claude питає сервер, які tools він пропонує, перш ніж обрати один для виклику.",
    ),
    modules: ["m11"],
  },
  {
    term: "tool call",
    category: "connectors",
    def: L(
      "Claude invoking an external function (via MCP/connector) with arguments, then folding the result back into its context to continue.",
      "Виклик Claude зовнішньої функції (через MCP/connector) з аргументами, з поверненням результату назад у context для продовження.",
    ),
    modules: ["m11", "m15"],
  },
  {
    term: "OAuth",
    category: "connectors",
    def: L(
      "The consent flow that grants a connector scoped access to your account without sharing your password — you approve on first connect.",
      "Потік згоди, що дає connector обмежений (scoped) доступ до акаунта без передачі пароля — підтверджуєш під час першого підключення.",
    ),
    modules: ["m11"],
  },
  {
    term: "scope",
    category: "connectors",
    def: L(
      "The specific permissions a connector is granted (e.g. read-only mail). Least privilege = grant the narrowest scope that works.",
      "Конкретні дозволи, надані connector (напр. лише читання пошти). Least privilege = найвужчий scope, що працює.",
    ),
    modules: ["m11", "m25"],
  },
  {
    term: "custom connector",
    category: "connectors",
    def: L(
      "Your own MCP integration (not from the directory) added via a remote MCP URL. Free includes one custom connector.",
      "Власна MCP-інтеграція (не з directory), додана через URL remote MCP. Free включає один custom connector.",
    ),
    modules: ["m11"],
  },

  /* ---- Skills & plugins -------------------------------------------------- */
  {
    term: "Skill",
    category: "skills",
    def: L(
      "A packaged bit of expertise or output format Claude can load on demand — a folder with a SKILL.md plus optional scripts/resources.",
      "Запакований шматок експертизи чи формату виводу, який Claude вантажить за потреби — тека з SKILL.md та опційними scripts/resources.",
    ),
    modules: ["m12", "m13"],
  },
  {
    term: "SKILL.md",
    category: "skills",
    def: L(
      "A skill’s entry file: YAML frontmatter (name + description) read at the metadata level, then a Markdown body with the instructions.",
      "Вхідний файл skill: YAML-frontmatter (name + description), що читається на рівні метаданих, далі Markdown-тіло з інструкціями.",
    ),
    modules: ["m12", "m13"],
  },
  {
    term: "frontmatter",
    category: "skills",
    def: L(
      "The YAML header of SKILL.md (name, description). It is the always-loaded Level-1 metadata that lets Claude decide whether the skill is relevant.",
      "YAML-заголовок SKILL.md (name, description). Це завжди-завантажені метадані Level-1, за якими Claude вирішує, чи skill доречний.",
    ),
    modules: ["m12", "m13"],
  },
  {
    term: "progressive disclosure",
    category: "skills",
    def: L(
      "Loading a skill in levels — L1 metadata always, L2 the SKILL.md body on a match, L3 bundled files only when needed — so many skills cost almost no context until used.",
      "Завантаження skill рівнями — L1 метадані завжди, L2 тіло SKILL.md за збігом, L3 файли лише за потреби — тож багато skills майже не коштують context до використання.",
    ),
    modules: ["m12"],
  },
  {
    term: "pre-built skills",
    category: "skills",
    def: L(
      "Anthropic-provided skills for common outputs — docx, xlsx, pptx, pdf — that Cowork and the apps use to create files.",
      "Готові skills від Anthropic для типових виводів — docx, xlsx, pptx, pdf — якими Cowork і застосунки створюють файли.",
    ),
    modules: ["m12", "m16"],
  },
  {
    term: "code execution",
    category: "skills",
    def: L(
      "Running scripts in a sandbox so a skill’s logic produces output without that code entering the context window. Enables file creation across plans incl. Free.",
      "Запуск скриптів у sandbox, щоб логіка skill давала вивід, а сам код не потрапляв у вікно context. Уможливлює створення файлів на планах включно з Free.",
    ),
    modules: ["m12", "m16"],
  },
  {
    term: "plugin",
    category: "skills",
    def: L(
      "A shareable bundle of extensions — skills + sub-agents + slash commands + hooks + MCP servers — installed as one unit via a marketplace.",
      "Бандл розширень для поширення — skills + sub-agents + slash-команди + hooks + MCP-сервери — встановлюється як одне ціле через marketplace.",
    ),
    modules: ["m14"],
  },
  {
    term: "marketplace",
    category: "skills",
    def: L(
      "A git repo with a marketplace.json that lists installable plugins; add the marketplace, then install a plugin from it.",
      "Git-репозиторій із marketplace.json, що перелічує plugins для встановлення; додаєш marketplace, потім ставиш із нього plugin.",
    ),
    modules: ["m14"],
  },
  {
    term: "role plugins",
    category: "skills",
    def: L(
      "Anthropic’s open-source bundles tailored to job roles (productivity, sales, support, finance, data…), installed in Cowork to match how you work.",
      "Опенсорсні бандли Anthropic під робочі ролі (productivity, sales, support, finance, data…), встановлювані в Cowork під твій спосіб роботи.",
    ),
    modules: ["m14"],
  },
  {
    term: "slash command",
    category: "skills",
    def: L(
      "A “/name” shortcut that triggers a saved instruction or skill. Custom commands and skills have merged — a command is a tiny skill.",
      "Скорочення «/name», що запускає збережену інструкцію чи skill. Custom-команди та skills злилися — команда це маленький skill.",
    ),
    modules: ["m14", "m24"],
  },

  /* ---- Cowork ------------------------------------------------------------ */
  {
    term: "Cowork",
    category: "cowork",
    def: L(
      "Claude’s desktop agent (a tab in Claude Desktop) that reads and writes files in folders you grant, runs code in a sandbox, schedules tasks and uses connectors. Paid plans.",
      "Десктоп-агент Claude (вкладка в Claude Desktop), що читає й пише файли в наданих теках, запускає код у sandbox, планує задачі й користується connectors. Платні плани.",
    ),
    modules: ["m15", "m16"],
  },
  {
    term: "agent loop",
    category: "cowork",
    def: L(
      "The cycle behind every agent: prompt → think → tool call → observe result → think → … → answer. The mental model for Cowork and Code.",
      "Цикл за кожним agent: prompt → думати → tool call → спостерегти результат → думати → … → відповідь. Ментальна модель Cowork і Code.",
    ),
    modules: ["m15"],
  },
  {
    term: "scratchpad / sandbox VM",
    category: "cowork",
    def: L(
      "The isolated Linux environment where Cowork runs code. Temporary working space — separate from your folder, which persists.",
      "Ізольоване Linux-середовище, де Cowork виконує код. Тимчасовий робочий простір — окремий від твоєї теки, що зберігається.",
    ),
    modules: ["m15", "m16"],
  },
  {
    term: "granted folder",
    category: "cowork",
    def: L(
      "A folder you explicitly give Cowork access to read/write. Claude works only inside the folders you grant.",
      "Тека, до якої ти явно даєш Cowork доступ на читання/запис. Claude працює лише в наданих теках.",
    ),
    modules: ["m16"],
  },
  {
    term: "deliverable",
    category: "cowork",
    def: L(
      "A finished file Cowork creates for you (docx/xlsx/pptx/pdf, etc.) via the pre-built skills — up to 30 MB per file.",
      "Готовий файл, який Cowork створює для тебе (docx/xlsx/pptx/pdf тощо) через pre-built skills — до 30 MB на файл.",
    ),
    modules: ["m16"],
  },
  {
    term: "scheduled task",
    category: "cowork",
    def: L(
      "Work Cowork runs automatically on a cadence (or once at a future time) — briefings, digests, checks. Created via /schedule or the Scheduled page.",
      "Робота, яку Cowork виконує автоматично за розкладом (або одноразово в майбутньому) — брифінги, дайджести, перевірки. Через /schedule або сторінку Scheduled.",
    ),
    modules: ["m17"],
  },
  {
    term: "the awake rule",
    category: "cowork",
    def: L(
      "Scheduled tasks run only while the computer is awake and Claude Desktop is open — there is no cloud cron. Missed runs skip, then catch up once on wake.",
      "Scheduled tasks виконуються лише поки компʼютер увімкнений і Claude Desktop відкритий — хмарного cron немає. Пропущені запуски скіпаються, потім один раз наздоганяють після пробудження.",
    ),
    modules: ["m17"],
  },
  {
    term: "computer use",
    category: "cowork",
    def: L(
      "Letting Claude drive your screen — move the mouse, type, click — for native apps with no connector or API. Research preview, Pro/Max only, off by default.",
      "Дозвіл Claude керувати екраном — рухати мишею, друкувати, клікати — для нативних застосунків без connector чи API. Research preview, лише Pro/Max, off за замовчуванням.",
    ),
    modules: ["m18"],
  },
  {
    term: "the three tiers of acting",
    category: "cowork",
    def: L(
      "Precise-first ordering of how Claude acts: connector → browser (Claude in Chrome) → computer use (the screen). Use the most precise mechanism that can do the job.",
      "Порядок дій Claude від найточнішого: connector → browser (Claude in Chrome) → computer use (екран). Бери найточніший механізм, що впорається.",
    ),
    modules: ["m18"],
  },
  {
    term: "access tiers (View only / Click only / Full control)",
    category: "cowork",
    def: L(
      "How much control a granted app gets, fixed by category: browsers = View only, terminals/IDEs = Click only, everything else = Full control.",
      "Скільки контролю отримує наданий застосунок, фіксовано за категорією: браузери = View only, термінали/IDE = Click only, решта = Full control.",
    ),
    modules: ["m18", "m25"],
  },
  {
    term: "Cowork project",
    category: "cowork",
    def: L(
      "A local Cowork workspace — Instructions + Scheduled tasks + Context + project memory. Desktop-only; only Instructions and Context are project-scoped (connectors/plugins are account-level).",
      "Локальний workspace Cowork — Instructions + Scheduled tasks + Context + project-memory. Лише десктоп; до проєкту привʼязані тільки Instructions і Context (connectors/plugins — рівня акаунта).",
    ),
    modules: ["m19"],
  },
  {
    term: "Dispatch",
    category: "cowork",
    def: L(
      "One continuous phone↔desktop thread that routes a request to Claude Code (dev) or Cowork (knowledge) on an awake desktop and messages the result back. Pro/Max only.",
      "Один безперервний потік телефон↔десктоп, що маршрутизує запит до Claude Code (dev) чи Cowork (knowledge) на ввімкненому десктопі й надсилає результат назад. Лише Pro/Max.",
    ),
    modules: ["m19"],
  },
  {
    term: "permission mode (Ask before acting / Act without asking)",
    category: "cowork",
    def: L(
      "How much Claude checks with you before acting. Even in “Act without asking”, protected actions (like deletes) still require explicit approval.",
      "Наскільки Claude питає тебе перед дією. Навіть у «Act without asking» захищені дії (як видалення) все одно потребують явного підтвердження.",
    ),
    modules: ["m16", "m18"],
  },
  {
    term: "deletion protection",
    category: "cowork",
    def: L(
      "Cowork’s hard gate: permanently deleting any file needs your explicit Allow — and this holds in both permission modes.",
      "Жорсткий гейт Cowork: остаточне видалення будь-якого файлу потребує явного Allow — і це діє в обох permission modes.",
    ),
    modules: ["m16"],
  },

  /* ---- Tools & code ------------------------------------------------------ */
  {
    term: "Artifact",
    category: "tools",
    def: L(
      "A standalone output Claude builds in a side panel — a document, chart, or a working mini-app (HTML/React) you can run and iterate on.",
      "Самостійний вивід, який Claude будує в бічній панелі — документ, графік чи робочий mini-app (HTML/React), який можна запускати й покращувати.",
    ),
    modules: ["m8"],
  },
  {
    term: "live Artifact",
    category: "tools",
    def: L(
      "An artifact with extra powers — persistent storage, Claude API calls and MCP — so it becomes a small tool you return to, not a one-off.",
      "Artifact із додатковими можливостями — persistent storage, виклики Claude API та MCP — тож стає маленьким інструментом, до якого вертаєшся, а не одноразовим.",
    ),
    modules: ["m9"],
  },
  {
    term: "persistent storage",
    category: "tools",
    def: L(
      "Storage inside a live artifact that survives reloads, so the mini-app remembers state between visits.",
      "Сховище всередині live artifact, що переживає перезавантаження, тож mini-app памʼятає стан між візитами.",
    ),
    modules: ["m9"],
  },
  {
    term: "Claude in Chrome",
    category: "tools",
    def: L(
      "A browser-extension agent that reads the active tab (screenshot + DOM) and navigates, clicks, types and extracts. Beta, all paid plans, Chrome-only.",
      "Agent-розширення браузера, що читає активну вкладку (скриншот + DOM) і навігує, клікає, друкує та витягує дані. Beta, усі платні плани, лише Chrome.",
    ),
    modules: ["m20"],
  },
  {
    term: "recorded workflow",
    category: "tools",
    def: L(
      "A saved sequence of browser steps Claude in Chrome can replay — a reusable, even scheduled, web task.",
      "Збережена послідовність кроків у браузері, яку Claude in Chrome може відтворити — багаторазова, навіть запланована, веб-задача.",
    ),
    modules: ["m20"],
  },
  {
    term: "Claude for Excel / PowerPoint",
    category: "tools",
    def: L(
      "Microsoft 365 add-ins where Claude edits spreadsheets and decks in place — dependency-safe, with clickable cell-level citations. GA on all paid plans.",
      "Add-ins для Microsoft 365, де Claude редагує таблиці й презентації на місці — безпечно щодо залежностей, із клікабельними cell-level citations. GA на всіх платних планах.",
    ),
    modules: ["m21"],
  },
  {
    term: "cell-level citation",
    category: "tools",
    def: L(
      "In Claude for Excel, a clickable link from a value back to the exact source cell it came from — provenance you can audit.",
      "У Claude for Excel — клікабельне посилання від значення до точної клітинки-джерела, з якої воно взялося — походження, яке можна перевірити.",
    ),
    modules: ["m21"],
  },
  {
    term: "Claude Code",
    category: "tools",
    def: L(
      "The command-line/IDE agent for software work — reads a codebase, edits files, runs tests under permissions, and is driven by a CLAUDE.md.",
      "Агент у командному рядку/IDE для роботи з кодом — читає кодову базу, редагує файли, запускає тести під permissions і керується CLAUDE.md.",
    ),
    modules: ["m22"],
  },
  {
    term: "CLAUDE.md",
    category: "tools",
    def: L(
      "A project brief Claude Code reads first — conventions, architecture, rules — so the agent shares your project’s context. (This guide is built from one.)",
      "Бриф проєкту, який Claude Code читає першим — конвенції, архітектура, правила — щоб agent поділяв context твого проєкту. (Цей гайд зроблено з такого.)",
    ),
    modules: ["m22"],
  },
  {
    term: "plan mode",
    category: "tools",
    def: L(
      "A mode where Claude Code proposes a plan and waits for your approval before editing anything — read-only until you say go.",
      "Режим, де Claude Code пропонує план і чекає твого схвалення перед будь-якими правками — лише читання, доки не даси старт.",
    ),
    modules: ["m22"],
  },
  {
    term: "Auto Mode",
    category: "tools",
    def: L(
      "Claude Code running with a safety classifier so it can act more autonomously while still guarding against risky operations.",
      "Робота Claude Code із safety-класифікатором, щоб діяти автономніше, водночас стримуючи ризиковані операції.",
    ),
    modules: ["m22", "m24"],
  },
  {
    term: "output styles",
    category: "tools",
    def: L(
      "Personas in Claude Code (Explanatory, Learning, custom) that change the system prompt and tone — not the model.",
      "Персони в Claude Code (Explanatory, Learning, кастомні), що змінюють system prompt і тон — а не модель.",
    ),
    modules: ["m24"],
  },
  {
    term: "Claude Agent SDK",
    category: "tools",
    def: L(
      "The toolkit (renamed from Claude Code SDK) for building your own agents on the same loop, including headless (-p) runs.",
      "Набір (перейменований із Claude Code SDK) для створення власних agents на тому ж циклі, включно з headless (-p) запусками.",
    ),
    modules: ["m24"],
  },

  /* ---- Agentic ----------------------------------------------------------- */
  {
    term: "agent",
    category: "agentic",
    def: L(
      "An LLM that doesn’t just answer but acts — runs the loop of thinking, calling tools, observing results and continuing toward a goal.",
      "LLM, що не лише відповідає, а діє — крутить цикл: думає, викликає tools, спостерігає результати й рухається до мети.",
    ),
    modules: ["m15", "m23"],
  },
  {
    term: "sub-agent",
    category: "agentic",
    def: L(
      "A child agent spawned with its own fresh context to do a slice of work in parallel, returning a result the main agent merges.",
      "Дочірній agent зі своїм чистим context для частини роботи паралельно; повертає результат, який головний agent зливає.",
    ),
    modules: ["m23"],
  },
  {
    term: "agent team",
    category: "agentic",
    def: L(
      "Multiple Claude sessions that coordinate via git (each in its own worktree) — they message and divide work, beyond simple sub-agent fan-out.",
      "Кілька сесій Claude, що координуються через git (кожна у власному worktree) — спілкуються й ділять роботу, ширше за простий sub-agent fan-out.",
    ),
    modules: ["m23"],
  },
  {
    term: "worktree",
    category: "agentic",
    def: L(
      "A separate working copy of a git repo so parallel agents edit without colliding, then merge.",
      "Окрема робоча копія git-репо, щоб паралельні agents редагували без зіткнень, а потім зливали.",
    ),
    modules: ["m23"],
  },
  {
    term: "fan-out",
    category: "agentic",
    def: L(
      "Splitting a task across several sub-agents at once. Buys wall-clock time and a clean main context, but costs more tokens — use it for genuinely parallel work.",
      "Розщеплення задачі на кілька sub-agents одночасно. Купує час і чистий головний context, але коштує більше токенів — для справді паралельної роботи.",
    ),
    modules: ["m23"],
  },
  {
    term: "orchestration",
    category: "agentic",
    def: L(
      "Coordinating many agents/steps — sub-agents, teams, hooks, scheduled tasks — the layer that scales one agent into many.",
      "Координація багатьох agents/кроків — sub-agents, teams, hooks, scheduled tasks — шар, що масштабує один agent у багато.",
    ),
    modules: ["m23", "m27"],
  },
  {
    term: "Task tool",
    category: "agentic",
    def: L(
      "The mechanism by which a main agent launches a sub-agent with its own context for a defined task.",
      "Механізм, яким головний agent запускає sub-agent із власним context під визначену задачу.",
    ),
    modules: ["m23"],
  },
  {
    term: "hook",
    category: "agentic",
    def: L(
      "A script that fires on a lifecycle event (e.g. PreToolUse, PostToolUse, SessionStart) to validate, block or automate steps in the agent loop.",
      "Скрипт, що спрацьовує на події життєвого циклу (напр. PreToolUse, PostToolUse, SessionStart), щоб валідувати, блокувати чи автоматизувати кроки в agent loop.",
    ),
    modules: ["m24"],
  },
  {
    term: "Dynamic Workflows",
    category: "agentic",
    def: L(
      "A research-preview pattern where Claude writes its own JavaScript harness to coordinate up to ~1,000 subagents in a do→review→apply loop.",
      "Патерн research-preview, де Claude пише власний JavaScript-harness, щоб координувати до ~1000 subagents у циклі do→review→apply.",
    ),
    modules: ["m24"],
  },
  {
    term: "harness",
    category: "agentic",
    def: L(
      "The surrounding code/loop that drives an agent — feeds it prompts, runs its tool calls and decides when it’s done.",
      "Обгортковий код/цикл, що керує agent — подає prompts, виконує його tool calls і вирішує, коли завершено.",
    ),
    modules: ["m24"],
  },

  /* ---- Security ---------------------------------------------------------- */
  {
    term: "prompt injection",
    category: "security",
    def: L(
      "An attack where instructions hidden in content Claude reads (a web page, email, file) try to hijack its behaviour. The core agent-security risk.",
      "Атака, де інструкції, сховані в контенті, який читає Claude (вебсторінка, лист, файл), намагаються перехопити його поведінку. Головний ризик agent-безпеки.",
    ),
    modules: ["m25"],
  },
  {
    term: "indirect prompt injection",
    category: "security",
    def: L(
      "Prompt injection delivered through third-party content the agent fetches (not typed by the user) — the most common real-world vector.",
      "Prompt injection через сторонній контент, який agent дістає (не введений користувачем) — найпоширеніший реальний вектор.",
    ),
    modules: ["m25"],
  },
  {
    term: "the two-gate model",
    category: "security",
    def: L(
      "An injection needs both gates: untrusted content must get in (read gate) AND Claude must be able to act on it (act gate). Close either and the attack fails.",
      "Injection потребує обох гейтів: недовірений контент має потрапити (read-гейт) І Claude має змогти діяти (act-гейт). Закрий будь-який — і атака провалюється.",
    ),
    modules: ["m25"],
  },
  {
    term: "least privilege",
    category: "security",
    def: L(
      "Granting the narrowest access that still does the job — read-only over read-write, one folder over the whole disk, one scope over many.",
      "Надання найвужчого доступу, що все ще виконує задачу — read-only замість read-write, одна тека замість усього диска, один scope замість багатьох.",
    ),
    modules: ["m25"],
  },
  {
    term: "protected actions",
    category: "security",
    def: L(
      "High-impact operations (purchases, deletions, account/permission changes) that always require explicit approval, in every permission mode.",
      "Операції з високим впливом (купівлі, видалення, зміни акаунта/permissions), що завжди потребують явного підтвердження, у будь-якому permission mode.",
    ),
    modules: ["m25", "m20"],
  },
  {
    term: "human-in-the-loop",
    category: "security",
    def: L(
      "Keeping a person’s approval on consequential steps so the agent proposes and you decide — especially for writes and financial actions.",
      "Збереження підтвердження людини на важливих кроках: agent пропонує, ти вирішуєш — особливо для записів і фінансових дій.",
    ),
    modules: ["m25"],
  },
  {
    term: "trust boundary",
    category: "security",
    def: L(
      "The line between content Claude can trust (your instructions) and content it can’t (fetched pages, emails). Cross it carefully — that’s where injections live.",
      "Межа між контентом, якому Claude може довіряти (твої інструкції), і тим, якому ні (дістані сторінки, листи). Перетинай обережно — саме там живуть injections.",
    ),
    modules: ["m25", "m11"],
  },
  {
    term: "link safety",
    category: "security",
    def: L(
      "Treating links in emails/messages/documents as suspicious by default — verify the real destination before following, never auto-act on an unknown URL.",
      "Ставлення до посилань у листах/повідомленнях/документах як до підозрілих за замовчуванням — перевір справжню адресу перед переходом, ніколи не дій авто-режимом на невідомий URL.",
    ),
    modules: ["m25", "m18"],
  },
  {
    term: "blocked sites / categories",
    category: "security",
    def: L(
      "Domains agents refuse by policy (banking, trading, crypto, adult, piracy) — and the trading/crypto block that’s on by default in computer use.",
      "Домени, які agents відхиляють за політикою (банкінг, трейдинг, крипто, дорослий контент, піратство) — і блок трейдингу/крипто, увімкнений за замовчуванням у computer use.",
    ),
    modules: ["m25", "m20"],
  },

  /* ---- General / AI ------------------------------------------------------ */
  {
    term: "LLM (large language model)",
    category: "general",
    def: L(
      "The kind of AI Claude is — trained on text to predict and generate language, and (when wrapped in an agent loop) to use tools.",
      "Тип AI, яким є Claude — навчений на тексті передбачати й генерувати мову, а (в обгортці agent loop) користуватися tools.",
    ),
    modules: ["m1"],
  },
  {
    term: "inference",
    category: "general",
    def: L(
      "Running the model to produce an answer — what you pay for in input/output tokens each time you send a prompt.",
      "Запуск моделі для отримання відповіді — те, за що платиш у input/output токенах щоразу, коли надсилаєш prompt.",
    ),
    modules: ["m10"],
  },
  {
    term: "API",
    category: "general",
    def: L(
      "An application programming interface — a defined way for software to talk to a service. Connectors give Claude an app’s API; the Claude API gives your code Claude.",
      "Інтерфейс програмування застосунків — визначений спосіб, яким ПЗ говорить із сервісом. Connectors дають Claude API застосунку; Claude API дає твоєму коду Claude.",
    ),
    modules: ["m1", "m11"],
  },
  {
    term: "JSON",
    category: "general",
    def: L(
      "A simple, structured text format for data. Often the requested output schema when you need a machine-readable answer.",
      "Простий структурований текстовий формат для даних. Часто — бажана output schema, коли потрібна машиночитна відповідь.",
    ),
    modules: ["m6"],
  },
  {
    term: "GA (general availability)",
    category: "general",
    def: L(
      "A feature released to everyone on eligible plans (not beta/preview) — e.g. Claude for Excel/PowerPoint is GA on all paid plans.",
      "Фіча, випущена для всіх на придатних планах (не beta/preview) — напр. Claude for Excel/PowerPoint у GA на всіх платних планах.",
    ),
    modules: ["m21"],
  },
  {
    term: "research preview",
    category: "general",
    def: L(
      "An early, limited release to learn from real use — gated to some plans and often off by default (e.g. computer use, Pro/Max).",
      "Ранній обмежений реліз, щоб учитися з реального використання — доступний лише на частині планів і часто off за замовчуванням (напр. computer use, Pro/Max).",
    ),
    modules: ["m18"],
  },
  {
    term: "beta",
    category: "general",
    def: L(
      "A feature that works but is still being refined — e.g. Claude in Chrome is in beta (contrast: the Office add-ins are GA).",
      "Фіча, що працює, але ще доопрацьовується — напр. Claude in Chrome у beta (на відміну: Office-add-ins у GA).",
    ),
    modules: ["m20"],
  },
  {
    term: "mental model",
    category: "general",
    def: L(
      "The one line or picture a module wants you to keep — a compact image of how something works that you recall from memory instead of looking up.",
      "Один рядок або картина, які модуль хоче лишити в тебе — компактний образ того, як щось працює, який ти згадуєш з памʼяті, а не дивишся.",
    ),
    modules: ["m28", "m27"],
  },
  {
    term: "active recall (flashcards)",
    category: "general",
    def: L(
      "Producing an answer from memory before checking it — the study method behind the gallery’s flashcard mode, and far stickier than re-reading.",
      "Видача відповіді з памʼяті до перевірки — навчальний метод за flashcard-режимом галереї, набагато тривкіший за перечитування.",
    ),
    modules: ["m28"],
  },
];

/** Lookup by term (case-insensitive). */
export function glossaryByTerm(term: string): GlossaryTerm | undefined {
  const q = term.trim().toLowerCase();
  return GLOSSARY.find((g) => g.term.toLowerCase() === q);
}
