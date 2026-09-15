// All content sourced from /tmp/portfolio-design-bakeoff-20260914/_context.
// Numbers, names, dates and quotes are verbatim from facts.json / caseStudies.ts /
// experience.ts / ui.ts. Prose around them is rewritten for the conversational format.

export type Lang = "en" | "es";
export type L<T> = Record<Lang, T>;

export interface Chip {
  id: string;
  label: L<string>;
}

export type CardKind =
  | "stats"
  | "timeline"
  | "case"
  | "quote"
  | "cv"
  | "contact"
  | "text";

export interface StatItem {
  value: string;
  label: L<string>;
}

export interface TimelineItem {
  period: L<string>;
  company: L<string>;
  client?: string;
  role: L<string>;
}

export interface CaseField {
  label: L<string>;
  value: L<string>;
}

export interface CaseCard {
  slug: string;
  title: L<string>;
  tags: string[];
  summary: L<string>;
  fields: CaseField[];
}

export interface QuoteItem {
  quote: L<string>;
  author: string;
  role: L<string>;
}

export interface Card {
  kind: CardKind;
  text?: L<string>;
  stats?: StatItem[];
  timeline?: TimelineItem[];
  case?: CaseCard;
  quotes?: QuoteItem[];
}

export interface Answer {
  lines: L<string>[]; // spoken/typed lines, rendered in order
  cards?: Card[];
  followups?: string[]; // chip ids to suggest after this answer
}

export interface Intent {
  id: string;
  keywords: string[]; // matched against EN + ES tokens, lowercase, no accents
  chip: L<string>;
  answer: Answer;
}

const CASE_STUDIES: CaseCard[] = [
  {
    slug: "realtime-shopping-assistant",
    title: { en: "Real-time Shopping Assistant", es: "Asistente de compra en tiempo real" },
    tags: ["Angular", "TypeScript", "WebRTC", "OpenAI Realtime API", "SSR", "Accessibility"],
    summary: {
      en: "A controlled whitelist pilot: a 96% smaller LLM context payload, SSR-compatible, never opened to the public.",
      es: "Un piloto controlado con lista blanca: un payload de contexto del LLM un 96% más pequeño, compatible con SSR, nunca abierto al público.",
    },
    fields: [
      {
        label: { en: "Context", es: "Contexto" },
        value: {
          en: "A global, multi-market e-commerce frontend needed a conversational shopping experience with voice, text and product context.",
          es: "Un frontend de comercio electrónico global y multimercado necesitaba una experiencia de compra conversacional con voz, texto y contexto de producto.",
        },
      },
      {
        label: { en: "My role", es: "Mi papel" },
        value: {
          en: "I implemented the Angular integration as a senior individual contributor. The wider product was a team effort, with a co-lead alongside me.",
          es: "Implementé la integración en Angular como profesional sénior. El producto en su conjunto fue trabajo de equipo, con otro responsable técnico junto a mí.",
        },
      },
      {
        label: { en: "The frontend problem", es: "El problema de frontend" },
        value: {
          en: "Manage the WebRTC lifecycle, initialize only on request, stay safe under server-side rendering, keep the model's context bounded, and avoid any tracking before the assistant was opened.",
          es: "Gestionar el ciclo de vida de WebRTC, inicializar solo bajo petición, ser seguro bajo SSR, mantener acotado el contexto del modelo y evitar cualquier seguimiento antes de abrir el asistente.",
        },
      },
      {
        label: { en: "Engineering decisions", es: "Decisiones de ingeniería" },
        value: {
          en: "Lazy initialization, platform guards, a controlled feature flag, and a routing-and-context-stripping design that kept the model's working set small.",
          es: "Inicialización diferida, guards de plataforma, una feature flag controlada y un diseño de enrutado y limpieza de contexto que mantuvo pequeño el conjunto de trabajo del modelo.",
        },
      },
      {
        label: { en: "Outcome", es: "Resultado" },
        value: {
          en: "Reached production as a controlled whitelist pilot, never opened publicly. LLM context payload fell from 570 KB to 22 KB per execution — a 96% reduction.",
          es: "Llegó a producción como piloto controlado con lista blanca, nunca abierto al público. El payload de contexto del LLM bajó de 570 KB a 22 KB por ejecución: una reducción del 96%.",
        },
      },
    ],
  },
  {
    slug: "help-center-rollout",
    title: { en: "Help Center Rollout", es: "Despliegue del Centro de Ayuda" },
    tags: ["Angular", "SSR", "Feature Flags", "Observability", "Accessibility"],
    summary: {
      en: "A conversational Help Center rolled out market by market, SSR-safe, with localized routes and accessibility preserved throughout.",
      es: "Un Centro de Ayuda conversacional desplegado mercado a mercado, seguro bajo SSR, con rutas localizadas y accesibilidad preservada en todo momento.",
    },
    fields: [
      {
        label: { en: "Context", es: "Contexto" },
        value: {
          en: "A new conversational Help Center needed to reach markets one at a time, without changing existing entry points.",
          es: "Un nuevo Centro de Ayuda conversacional debía llegar a los mercados de uno en uno, sin cambiar los puntos de entrada existentes.",
        },
      },
      {
        label: { en: "Delivery", es: "Entrega" },
        value: {
          en: "I integrated the conversational experience into the existing Angular routes and localized entry points across markets, with SSR-safe rendering throughout.",
          es: "Integré la experiencia conversacional en las rutas Angular y los puntos de entrada localizados existentes, con renderizado seguro bajo SSR en todo momento.",
        },
      },
      {
        label: { en: "Rollout", es: "Despliegue" },
        value: {
          en: "Expanded market by market, verifying SSR behavior, accessibility and route stability before each step.",
          es: "Se amplió mercado a mercado, verificando el comportamiento SSR, la accesibilidad y la estabilidad de rutas antes de cada paso.",
        },
      },
      {
        label: { en: "Outcome", es: "Resultado" },
        value: {
          en: "Rolled out country by country with stable routes, localized titles, accessibility and SSR support preserved.",
          es: "Se desplegó país por país con rutas estables, títulos localizados, accesibilidad y soporte SSR preservados.",
        },
      },
    ],
  },
  {
    slug: "passwordless-account-migration",
    title: { en: "Passwordless Account Migration", es: "Migración de cuentas sin contraseña" },
    tags: ["Angular", "Authentication", "API Contracts", "OTP", "NgRx", "Integration Testing"],
    summary: {
      en: "A contract-first passwordless migration: separate password and OTP paths, incremental scope, end-to-end validation.",
      es: "Una migración sin contraseña guiada por contrato: caminos separados para contraseña y OTP, alcance incremental, validación de extremo a extremo.",
    },
    fields: [
      {
        label: { en: "Context", es: "Contexto" },
        value: {
          en: "The account area had to support both existing-password and passwordless users without disrupting established flows.",
          es: "El área de cuenta debía admitir usuarios con contraseña existente y sin contraseña sin interrumpir los flujos establecidos.",
        },
      },
      {
        label: { en: "Contract analysis", es: "Análisis del contrato" },
        value: {
          en: "I mapped UI dependencies and auth states before changing anything, then scoped the implementation to the verified contract.",
          es: "Mapeé las dependencias de la interfaz y los estados de autenticación antes de cambiar nada, y acoté la implementación al contrato verificado.",
        },
      },
      {
        label: { en: "Implementation", es: "Implementación" },
        value: {
          en: "Separate password and OTP paths (email change, password creation), gated on hasPassword, with dependent actions guarded by auth state.",
          es: "Caminos separados para contraseña y OTP (cambio de email, creación de contraseña), condicionados por hasPassword, con acciones dependientes protegidas por el estado de autenticación.",
        },
      },
      {
        label: { en: "Outcome", es: "Resultado" },
        value: {
          en: "Delivered incrementally without disrupting existing account behavior, validated end-to-end across four documented scenarios in the pre-integration environment.",
          es: "Entregado de forma incremental sin interrumpir el comportamiento existente, validado de extremo a extremo en cuatro escenarios documentados en el entorno de preintegración.",
        },
      },
    ],
  },
  {
    slug: "engineering-controls",
    title: { en: "Engineering Controls for Frontend Delivery", es: "Controles de ingeniería para la entrega de frontend" },
    tags: ["GitHub", "Automated Review", "Prompt & Context Engineering", "MCP", "Developer Tooling"],
    summary: {
      en: "An automated review system that measured its own noise, retired 21 of its 53 rules, and got adopted outside its origin team.",
      es: "Un sistema de revisión automatizada que midió su propio ruido, retiró 21 de sus 53 reglas y acabó adoptado fuera de su equipo de origen.",
    },
    fields: [
      {
        label: { en: "Problem", es: "Problema" },
        value: {
          en: "Automated review can look like coverage while producing noise and untrusted rules.",
          es: "La revisión automatizada puede aparentar cobertura mientras produce ruido y reglas en las que nadie confía.",
        },
      },
      {
        label: { en: "System", es: "Sistema" },
        value: {
          en: "A GitHub-connected review system with domain-specific checks, flagging injection, authorization and secrets-management defects before merge.",
          es: "Un sistema de revisión conectado a GitHub con comprobaciones específicas del dominio, que detectaba defectos de inyección, autorización y gestión de secretos antes de integrar.",
        },
      },
      {
        label: { en: "Control loop", es: "Bucle de control" },
        value: {
          en: "The first version hurt credibility. I measured its real output and removed the rules the team ignored — retiring 21 of 53.",
          es: "La primera versión dañó la credibilidad. Medí su salida real y retiré las reglas que el equipo ignoraba: 21 de 53.",
        },
      },
      {
        label: { en: "Outcome", es: "Resultado" },
        value: {
          en: "A Teams CLI merged into a shared Inditex engineering repo; a documentation MCP adopted by the Android team, outside its origin platform.",
          es: "Una CLI de Teams integrada en un repositorio de ingeniería compartido de Inditex; un MCP de documentación adoptado por el equipo de Android, fuera de su plataforma de origen.",
        },
      },
    ],
  },
];

const TIMELINE: TimelineItem[] = [
  { period: { en: "May 2025 – July 2026", es: "Mayo 2025 – Julio 2026" }, company: { en: "Decskill Spain", es: "Decskill España" }, client: "Zara Home (Inditex)", role: { en: "Senior Front-End Analyst (Angular)", es: "Analista Frontend Sénior (Angular)" } },
  { period: { en: "March 2024 – May 2025", es: "Marzo 2024 – Mayo 2025" }, company: { en: "Avanade", es: "Avanade" }, client: "UNIR", role: { en: "Senior Front-End Analyst (Angular)", es: "Analista Frontend Sénior (Angular)" } },
  { period: { en: "December 2022 – March 2024", es: "Diciembre 2022 – Marzo 2024" }, company: { en: "Vermont Solutions (Viewnext / IBM)", es: "Vermont Solutions (Viewnext / IBM)" }, client: "Santander", role: { en: "Senior Front-End Developer (Angular)", es: "Desarrollador Frontend Sénior (Angular)" } },
  { period: { en: "October – December 2022", es: "Octubre – Diciembre 2022" }, company: { en: "CloudAPPi", es: "CloudAPPi" }, client: "Regional Government of Madrid", role: { en: "Mid-Level Front-End Developer (Angular, React)", es: "Desarrollador Frontend Intermedio (Angular, React)" } },
  { period: { en: "September 2021 – October 2022", es: "Septiembre 2021 – Octubre 2022" }, company: { en: "ENZO (Rent & Buy S.A.)", es: "ENZO (Rent & Buy S.A.)" }, role: { en: "Mid-Level Front-End Developer (Angular)", es: "Desarrollador Frontend Intermedio (Angular)" } },
  { period: { en: "June 2020 – September 2021", es: "Junio 2020 – Septiembre 2021" }, company: { en: "Independent Projects & Upskilling", es: "Proyectos propios y formación" }, role: { en: "Career break: WordPress, office automation, frontend upskilling", es: "Paréntesis: WordPress, automatización ofimática, formación frontend" } },
  { period: { en: "March – June 2020", es: "Marzo – Junio 2020" }, company: { en: "Altran (Capgemini)", es: "Altran (Capgemini)" }, role: { en: "Mid-Level Full Stack Developer (.NET)", es: "Desarrollador Full Stack Intermedio (.NET)" } },
  { period: { en: "November 2018 – September 2019", es: "Noviembre 2018 – Septiembre 2019" }, company: { en: "IO Digital (Query Software)", es: "IO Digital (Query Software)" }, role: { en: "Mid-Level Full Stack Developer (.NET)", es: "Desarrollador Full Stack Intermedio (.NET)" } },
  { period: { en: "July – November 2018", es: "Julio – Noviembre 2018" }, company: { en: "STRATESYS", es: "STRATESYS" }, role: { en: "Junior Full Stack Developer (.NET)", es: "Desarrollador Full Stack Junior (.NET)" } },
];

const STATS: StatItem[] = [
  { value: "96%", label: { en: "LLM context payload cut, 570 KB → 22 KB per execution, via routing and context-stripping.", es: "Reducción del payload de contexto del LLM, de 570 KB a 22 KB por ejecución, con enrutado y limpieza de contexto." } },
  { value: "Top 1.42%", label: { en: "Ranking on an independent Angular assessment by SkillValue, 95% score.", es: "Posición en una evaluación independiente de Angular de SkillValue, con un 95% de puntuación." } },
  { value: "34", label: { en: "WCAG 2.1 AA findings closed through 23 merged pull requests.", es: "Hallazgos WCAG 2.1 AA cerrados mediante 23 pull requests integrados." } },
  { value: "21 of 53", label: { en: "Automated-review rules retired after measuring what the team actually used.", es: "Reglas de revisión automatizada retiradas tras medir lo que el equipo realmente usaba." } },
];

const QUOTES: QuoteItem[] = [
  {
    quote: {
      en: "His knowledge of Angular is excellent, but what I really highlight from working with him is his willingness to help and share his experience. He not only applies good practices in his daily work, but also promotes their adoption within the team.",
      es: "Su conocimiento en Angular es excelente, pero lo que realmente destaco de trabajar con él es su disposición para ayudar y compartir su experiencia. No solo aplica las buenas prácticas en su trabajo diario, sino que también fomenta su adopción dentro del equipo.",
    },
    author: "José Luis Murcia Gámez",
    role: { en: "Frontend Developer, UNIR project (Avanade)", es: "Desarrollador Frontend, proyecto UNIR (Avanade)" },
  },
  {
    quote: {
      en: "Working with Marius has been a real pleasure. I especially highlight his initiative with AI tools applied to development, from which I learned a great deal working side by side with him. Any team would be more than fortunate to count on someone with his technical level and his attitude.",
      es: "Trabajar con Marius ha sido un verdadero placer. Destaco especialmente su iniciativa con herramientas de IA aplicadas al desarrollo, de las que aprendí muchísimo trabajando codo con codo con él.",
    },
    author: "Juan Pablo Romero Pereira",
    role: { en: "Frontend Developer, Zara Home (Inditex)", es: "Desarrollador Frontend, Zara Home (Inditex)" },
  },
  {
    quote: {
      en: "Marius proved to be a highly adaptable and resourceful programmer on both occasions we worked together. His ability to learn quickly and his contribution to the projects were fundamental.",
      es: "Marius demostró ser un programador altamente adaptable y resolutivo en ambas ocasiones que trabajamos juntos. Su capacidad para aprender rápidamente y su contribución a los proyectos fueron fundamentales.",
    },
    author: "José Luis Rodríguez-Campra Camberos",
    role: { en: "BAU Coordinator / Scrum Master", es: "Coordinador BAU / Scrum Master" },
  },
  {
    quote: {
      en: "Great partner — he has done a great job in his last project, demonstrating that he can design and build business applications successfully.",
      es: "Gran compañero: hizo un trabajo excelente en su último proyecto y demostró que puede diseñar y construir aplicaciones empresariales con éxito.",
    },
    author: "Antonio Bermúdez Rodríguez",
    role: { en: "Developer", es: "Desarrollador" },
  },
  {
    quote: {
      en: "Marius was a great professional to work with. His work ethic is immaculate; he is very easy to work with and goes out of his way to help when you ask for guidance.",
      es: "Marius fue un gran profesional con el que trabajé. Su ética de trabajo es inmaculada, es muy fácil trabajar con él y se desvive cuando le pides ayuda y orientación.",
    },
    author: "Gonzalo Rodríguez Muñoz",
    role: { en: "Full Stack Software Developer, ENZO", es: "Desarrollador Full Stack, ENZO" },
  },
];

export const CONTACT_LINKS = [
  { label: { en: "Email", es: "Correo" } as L<string>, href: "mailto:mihailmariusion@gmail.com", value: "mihailmariusion@gmail.com" },
  { label: { en: "LinkedIn", es: "LinkedIn" } as L<string>, href: "https://linkedin.com/in/mariusdev", value: "linkedin.com/in/mariusdev" },
  { label: { en: "GitHub", es: "GitHub" } as L<string>, href: "https://github.com/mihailmariusiondev", value: "github.com/mihailmariusiondev" },
];

function findCase(slug: string): CaseCard {
  return CASE_STUDIES.find((c) => c.slug === slug)!;
}

export const INTENTS: Intent[] = [
  {
    id: "intro",
    keywords: ["who are you", "quien eres", "quién eres", "about you", "sobre ti", "introduce", "presentate", "preséntate"],
    chip: { en: "Who are you?", es: "¿Quién eres?" },
    answer: {
      lines: [
        {
          en: "Marius Mihail Ion — Senior Angular / Frontend Engineer, based in Zaragoza, Spain.",
          es: "Marius Mihail Ion — Ingeniero Frontend Sénior (Angular), con base en Zaragoza, España.",
        },
        {
          en: "Software developer since 2018, specialized in Angular and TypeScript since 2021. I've built products for global e-commerce (Zara Home), banking (Santander) and online education (UNIR).",
          es: "Desarrollador de software desde 2018, especializado en Angular y TypeScript desde 2021. He construido productos para comercio electrónico global (Zara Home), banca (Santander) y educación en línea (UNIR).",
        },
        {
          en: "My full-stack .NET/C# background from 2018–2020 still helps when I design authentication flows and API contracts today.",
          es: "Mi base full stack en .NET/C# de 2018–2020 todavía me ayuda hoy al diseñar flujos de autenticación y contratos de API.",
        },
      ],
      followups: ["work-model", "stats", "case-shopping"],
    },
  },
  {
    id: "work-model",
    keywords: ["remote", "relocat", "travel", "hybrid", "remoto", "reubica", "mudanza", "viaje", "hibrido", "híbrido", "availab", "disponib", "visa", "sponsor"],
    chip: { en: "Remote? Relocation?", es: "¿Remoto? ¿Reubicación?" },
    answer: {
      lines: [
        {
          en: "Remote or hybrid from Zaragoza, available for occasional travel. EU citizen, authorized to work across the EU/EEA without sponsorship.",
          es: "Remoto o híbrido desde Zaragoza, con disponibilidad para viajes puntuales. Ciudadano de la UE, autorizado para trabajar en toda la UE/EEE sin patrocinio.",
        },
        {
          en: "I'm not relocating internationally. Open to permanent or B2B roles.",
          es: "No contemplo una reubicación internacional. Abierto a puestos indefinidos o B2B.",
        },
      ],
      cards: [{ kind: "contact" }],
      followups: ["contact", "intro"],
    },
  },
  {
    id: "case-shopping",
    keywords: ["shopping assistant", "asistente de compra", "voice", "voz", "webrtc", "realtime", "tiempo real", "openai", "context payload", "570", "22 kb", "96%", "llm"],
    chip: { en: "Tell me about the AI shopping assistant", es: "Háblame del asistente de compra con IA" },
    answer: {
      lines: [
        {
          en: "At Zara Home I built the Angular integration for a real-time voice-and-text shopping assistant, wired to backend tools over WebRTC.",
          es: "En Zara Home construí la integración Angular de un asistente de compra en tiempo real por voz y texto, conectado a herramientas del backend vía WebRTC.",
        },
        {
          en: "It shipped to production behind a feature flag, as a controlled pilot for a whitelist — never opened to the public. The hard part was keeping the model's context small: I cut the payload from 570 KB to 22 KB per execution, a 96% reduction, through routing and context-stripping.",
          es: "Llegó a producción tras una feature flag, como piloto controlado para una lista blanca, nunca abierto al público. Lo difícil fue mantener pequeño el contexto del modelo: reduje el payload de 570 KB a 22 KB por ejecución, un 96%, mediante enrutado y limpieza de contexto.",
        },
        {
          en: "It was a team effort with a co-lead alongside me — I owned the Angular side: WebRTC lifecycle, lazy init, SSR safety, accessibility.",
          es: "Fue un trabajo de equipo con otro responsable técnico junto a mí: yo me encargué del lado Angular — ciclo de vida de WebRTC, inicialización diferida, seguridad SSR, accesibilidad.",
        },
      ],
      cards: [{ kind: "case", case: findCase("realtime-shopping-assistant") }],
      followups: ["case-helpcenter", "case-otp"],
    },
  },
  {
    id: "case-helpcenter",
    keywords: ["help center", "centro de ayuda", "rollout", "despliegue", "market by market", "mercado a mercado"],
    chip: { en: "What about the Help Center rollout?", es: "¿Y el despliegue del Centro de Ayuda?" },
    answer: {
      lines: [
        {
          en: "A conversational Help Center that had to reach markets one at a time without breaking existing entry points.",
          es: "Un Centro de Ayuda conversacional que debía llegar a los mercados de uno en uno sin romper los puntos de entrada existentes.",
        },
        {
          en: "I integrated it into the existing Angular routes, then verified SSR behavior, accessibility and route stability before every single market expansion.",
          es: "Lo integré en las rutas Angular existentes, y verifiqué el comportamiento SSR, la accesibilidad y la estabilidad de rutas antes de cada ampliación de mercado.",
        },
      ],
      cards: [{ kind: "case", case: findCase("help-center-rollout") }],
      followups: ["case-otp", "case-controls"],
    },
  },
  {
    id: "case-otp",
    keywords: ["passwordless", "sin contrasena", "sin contraseña", "otp", "authentication", "autenticacion", "autenticación", "migration", "migracion", "migración", "haspassword"],
    chip: { en: "How did the passwordless migration go?", es: "¿Cómo fue la migración sin contraseña?" },
    answer: {
      lines: [
        {
          en: "The account area had to support existing-password and passwordless users at the same time, without breaking either flow.",
          es: "El área de cuenta debía soportar usuarios con contraseña existente y sin contraseña a la vez, sin romper ninguno de los dos flujos.",
        },
        {
          en: "I mapped every UI dependency on auth state before touching anything, then kept the migration incremental: separate password and OTP paths, gated on hasPassword, validated across four documented scenarios.",
          es: "Mapeé todas las dependencias de la interfaz sobre el estado de autenticación antes de tocar nada, y mantuve la migración incremental: caminos separados de contraseña y OTP, condicionados por hasPassword, validados en cuatro escenarios documentados.",
        },
      ],
      cards: [{ kind: "case", case: findCase("passwordless-account-migration") }],
      followups: ["case-controls", "accessibility"],
    },
  },
  {
    id: "case-controls",
    keywords: ["automated review", "revision automatizada", "revisión automatizada", "mcp", "engineering controls", "controles de ingenieria", "controles de ingeniería", "tooling", "prompt", "android team", "github bot"],
    chip: { en: "You built engineering tooling too?", es: "¿También construiste herramientas de ingeniería?" },
    answer: {
      lines: [
        {
          en: "Yes — a GitHub-connected automated review system with domain-specific checks: injection, authorization, secrets-management defects, flagged before merge.",
          es: "Sí — un sistema de revisión automatizada conectado a GitHub con comprobaciones específicas: defectos de inyección, autorización y gestión de secretos, detectados antes de integrar.",
        },
        {
          en: "The first version hurt credibility, so I treated it like any other system: measured what the team actually used, and retired 21 of its 53 rules. A documentation MCP from the same effort got adopted by the Android team.",
          es: "La primera versión dañó la credibilidad, así que la traté como cualquier otro sistema: medí lo que el equipo realmente usaba y retiré 21 de sus 53 reglas. Un MCP de documentación del mismo esfuerzo fue adoptado por el equipo de Android.",
        },
      ],
      cards: [{ kind: "case", case: findCase("engineering-controls") }],
      followups: ["stats", "skills"],
    },
  },
  {
    id: "accessibility",
    keywords: ["accessib", "accesib", "wcag", "aria", "keyboard", "teclado", "screen reader", "lector de pantalla"],
    chip: { en: "What's your accessibility work?", es: "¿Qué trabajo de accesibilidad has hecho?" },
    answer: {
      lines: [
        {
          en: "At Zara Home, I closed 34 findings from a formal WCAG 2.1 AA audit — heading hierarchy, keyboard navigation, ARIA semantics, focus management — through 23 merged pull requests.",
          es: "En Zara Home cerré 34 hallazgos de una auditoría formal WCAG 2.1 AA — jerarquía de encabezados, navegación por teclado, semántica ARIA, gestión de foco — mediante 23 pull requests integrados.",
        },
        {
          en: "I don't claim the whole site is WCAG-compliant — just this: 34 real findings, closed and merged.",
          es: "No afirmo que todo el sitio cumpla WCAG — solo esto: 34 hallazgos reales, cerrados e integrados.",
        },
      ],
      cards: [{ kind: "stats", stats: [STATS[2]] }],
      followups: ["stats", "case-shopping"],
    },
  },
  {
    id: "stats",
    keywords: ["metrics", "metricas", "métricas", "numbers", "numeros", "números", "results", "resultados", "impact", "impacto", "achievements", "logros"],
    chip: { en: "Show me the numbers", es: "Muéstrame los números" },
    answer: {
      lines: [
        {
          en: "Four numbers I can stand behind, from three different companies.",
          es: "Cuatro números que puedo defender, de tres empresas distintas.",
        },
      ],
      cards: [{ kind: "stats", stats: STATS }],
      followups: ["case-shopping", "recs"],
    },
  },
  {
    id: "skills",
    keywords: ["skills", "habilidades", "tech stack", "tecnologias", "tecnologías", "tools", "herramientas", "angular version", "typescript", "rxjs", "ngrx", "ssr", "signals"],
    chip: { en: "What's your tech stack?", es: "¿Cuál es tu stack tecnológico?" },
    answer: {
      lines: [
        {
          en: "Angular 8 through 20: Signals, standalone components, SSR, lazy loading, RxJS, NgRx, Angular Material/CDK, feature flags.",
          es: "Angular 8 a 20: Signals, componentes standalone, SSR, lazy loading, RxJS, NgRx, Angular Material/CDK, feature flags.",
        },
        {
          en: "Around that: TypeScript, SCSS, design systems, WCAG 2.1 AA, i18n (Transloco), Jest/Karma/Jasmine, SonarQube, REST/OpenAPI, OAuth2/JWT, WebRTC, AWS serverless (Lambda, Cognito, API Gateway), and some React 17 from a past project.",
          es: "Alrededor: TypeScript, SCSS, sistemas de diseño, WCAG 2.1 AA, i18n (Transloco), Jest/Karma/Jasmine, SonarQube, REST/OpenAPI, OAuth2/JWT, WebRTC, AWS serverless (Lambda, Cognito, API Gateway), y algo de React 17 de un proyecto anterior.",
        },
      ],
      followups: ["skillvalue", "dotnet"],
    },
  },
  {
    id: "skillvalue",
    keywords: ["skillvalue", "assessment", "evaluacion", "evaluación", "certification", "certificacion", "certificación", "1.42", "test", "exam", "examen"],
    chip: { en: "Any independent Angular assessment?", es: "¿Alguna evaluación independiente de Angular?" },
    answer: {
      lines: [
        {
          en: "September 2022: an independent Angular assessment by SkillValue, 95% score, top 1.42% of all candidates. Not a certification — an exam score, and I keep it labelled that way.",
          es: "Septiembre 2022: una evaluación independiente de Angular de SkillValue, 95% de puntuación, entre el 1,42% mejor de todos los candidatos. No es una certificación, es una nota de examen, y la etiqueto así.",
        },
      ],
      cards: [{ kind: "stats", stats: [STATS[1]] }],
      followups: ["skills", "stats"],
    },
  },
  {
    id: "dotnet",
    keywords: ["net", ".net", "c#", "csharp", "full stack", "full-stack", "before angular", "antes de angular", "backend"],
    chip: { en: "What did you do before Angular?", es: "¿Qué hacías antes de Angular?" },
    answer: {
      lines: [
        {
          en: "Full-stack .NET/C# from 2018 to 2020 — STRATESYS, IO Digital, Altran. Then a 15-month break for independent projects and upskilling (WordPress, office automation).",
          es: "Full stack .NET/C# de 2018 a 2020 — STRATESYS, IO Digital, Altran. Después, un paréntesis de 15 meses para proyectos propios y formación (WordPress, automatización ofimática).",
        },
        {
          en: "Angular specialization started at ENZO in September 2021, and it's been the focus since. That backend base still helps when I design auth flows and API contracts today.",
          es: "La especialización en Angular empezó en ENZO en septiembre de 2021, y es el foco desde entonces. Esa base de backend todavía me ayuda hoy al diseñar flujos de autenticación y contratos de API.",
        },
      ],
      followups: ["timeline", "intro"],
    },
  },
  {
    id: "timeline",
    keywords: ["timeline", "trayectoria", "experience", "experiencia", "history", "historial", "career", "carrera", "companies", "empresas", "santander", "unir", "zara", "enzo", "cloudappi", "decskill", "avanade"],
    chip: { en: "Walk me through your career", es: "Repasa tu trayectoria" },
    answer: {
      lines: [
        {
          en: "Nine roles since 2018, three enterprise clients: Zara Home (Inditex), Santander, UNIR.",
          es: "Nueve puestos desde 2018, tres clientes corporativos: Zara Home (Inditex), Santander, UNIR.",
        },
      ],
      cards: [{ kind: "timeline", timeline: TIMELINE }],
      followups: ["recs", "cv"],
    },
  },
  {
    id: "recs",
    keywords: ["recommend", "recomend", "testimonial", "review", "colleague", "colega", "compañero", "reference", "referencia"],
    chip: { en: "What do colleagues say?", es: "¿Qué dicen tus compañeros?" },
    answer: {
      lines: [
        {
          en: "Five people I worked with, in their own words.",
          es: "Cinco personas con las que trabajé, en sus propias palabras.",
        },
      ],
      cards: [{ kind: "quote", quotes: QUOTES }],
      followups: ["cv", "contact"],
    },
  },
  {
    id: "cv",
    keywords: ["cv", "resume", "curriculum", "currículum", "download", "descargar", "pdf"],
    chip: { en: "Send me the CV", es: "Envíame el CV" },
    answer: {
      lines: [
        {
          en: "Both PDFs, two pages each, English and Spanish.",
          es: "Ambos PDF, dos páginas cada uno, en inglés y en español.",
        },
      ],
      cards: [{ kind: "cv" }],
      followups: ["contact", "recs"],
    },
  },
  {
    id: "contact",
    keywords: ["contact", "contacto", "email", "correo", "linkedin", "github", "hire", "contratar", "reach", "phone", "telefono", "teléfono"],
    chip: { en: "How do I reach you?", es: "¿Cómo te contacto?" },
    answer: {
      lines: [
        {
          en: "Email, LinkedIn or GitHub — all below.",
          es: "Correo, LinkedIn o GitHub — todo abajo.",
        },
      ],
      cards: [{ kind: "contact" }],
      followups: ["work-model", "cv"],
    },
  },
  {
    id: "languages",
    keywords: ["languages", "idiomas", "spanish", "espanol", "español", "romanian", "rumano", "english level", "nivel de ingles", "nivel de inglés"],
    chip: { en: "What languages do you speak?", es: "¿Qué idiomas hablas?" },
    answer: {
      lines: [
        {
          en: "Spanish and Romanian, both native. English at a professional working proficiency.",
          es: "Español y rumano, ambos nativos. Inglés con un nivel profesional de trabajo.",
        },
      ],
      followups: ["intro", "work-model"],
    },
  },
];

export const FALLBACK: L<string> = {
  en: "I don't have a scripted answer for that — everything I do have is in these chips, or the CV below covers the rest.",
  es: "No tengo una respuesta preparada para eso. Todo lo que sí tengo está en estos chips, o el CV de abajo cubre el resto.",
};

export const OPENING: L<string[]> = {
  en: [
    "Hi — I'm a scripted stand-in for Marius Mihail Ion, built from his verified CV. No live AI here, just his own words, organized.",
    "Ask me something, or tap a chip.",
  ],
  es: [
    "Hola — soy un sustituto guionizado de Marius Mihail Ion, construido a partir de su CV verificado. Sin IA en vivo, solo sus propias palabras, organizadas.",
    "Pregúntame algo, o toca un chip.",
  ],
};

export const STARTER_CHIPS = ["intro", "case-shopping", "stats", "timeline", "cv"];

export { CASE_STUDIES, TIMELINE, STATS, QUOTES };
