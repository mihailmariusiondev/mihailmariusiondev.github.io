// All copy, both languages, one file by design — every fact traces to
// /tmp/portfolio-design-bakeoff-20260914/_context (DOSSIER.md is the ceiling).
// Editorial voice is original; no verbatim RETRACTED phrasing anywhere.

export type Lang = "en" | "es";

export const meta = {
  en: {
    title: "Marius Mihail Ion — The Frontend Dossier",
    description:
      "A kinetic editorial issue on Marius Mihail Ion, Senior Angular / Frontend Engineer: verified outcomes, four sanitized case studies, and a career timeline since 2018.",
  },
  es: {
    title: "Marius Mihail Ion — El Dossier de Frontend",
    description:
      "Un número editorial cinético sobre Marius Mihail Ion, Ingeniero Frontend Sénior (Angular): resultados verificados, cuatro casos sanitizados y una trayectoria desde 2018.",
  },
};

export const masthead = {
  en: {
    kicker: "Vol. I — Zaragoza Edition",
    name: "Marius Mihail Ion",
    role: "Senior Angular / Frontend Engineer",
    dek: "Enterprise frontend for e-commerce, banking and education — set, sanitized and printed for reading.",
    issue: "ISSUE №06",
    date: "September 2026",
    scrollCue: "Scroll to open the issue",
  },
  es: {
    kicker: "Vol. I — Edición Zaragoza",
    name: "Marius Mihail Ion",
    role: "Ingeniero Frontend Sénior (Angular)",
    dek: "Frontend corporativo para comercio electrónico, banca y educación — compuesto, sanitizado e impreso para leer.",
    issue: "NÚMERO №06",
    date: "Septiembre 2026",
    scrollCue: "Desplázate para abrir el número",
  },
};

export const toc = {
  en: {
    heading: "In this issue",
    items: [
      { n: "01", label: "The Numbers", href: "#numbers" },
      { n: "02", label: "Four Features", href: "#features" },
      { n: "03", label: "The Chronology", href: "#chronology" },
      { n: "04", label: "Letters", href: "#letters" },
      { n: "05", label: "Masthead & Contact", href: "#colophon" },
    ],
  },
  es: {
    heading: "En este número",
    items: [
      { n: "01", label: "Las Cifras", href: "#numbers" },
      { n: "02", label: "Cuatro Reportajes", href: "#features" },
      { n: "03", label: "La Cronología", href: "#chronology" },
      { n: "04", label: "Cartas", href: "#letters" },
      { n: "05", label: "Ficha y Contacto", href: "#colophon" },
    ],
  },
};

export const stats = {
  en: {
    heading: "Verified, not rounded",
    lede: "Every figure below is quoted exactly as audited — nothing rounded up for effect.",
    items: [
      {
        value: "570→22 KB",
        big: "96%",
        label:
          "Cut from the AI shopping assistant's LLM context payload per execution, through routing and context-stripping.",
      },
      {
        value: "Top 1.42%",
        big: "95%",
        label:
          "Score on an independent Angular assessment by SkillValue, ranking in the top 1.42% of all candidates.",
      },
      {
        value: "23 PRs",
        big: "34",
        label:
          "Accessibility findings from a formal WCAG 2.1 AA audit, closed across headings, keyboard, ARIA and focus.",
      },
      {
        value: "of 53 rules",
        big: "21",
        label:
          "Rules retired from a self-built automated review system, after measuring what the team actually used.",
      },
      {
        value: "Android team",
        big: "Adopted",
        label:
          "A documentation MCP server picked up outside its origin platform, unprompted.",
      },
    ],
  },
  es: {
    heading: "Verificado, no redondeado",
    lede: "Cada cifra se cita tal y como fue auditada, sin redondear para el efecto.",
    items: [
      {
        value: "570→22 KB",
        big: "96%",
        label:
          "Reducción del payload de contexto del LLM del asistente de compra con IA por ejecución, mediante enrutado y limpieza de contexto.",
      },
      {
        value: "1,42% superior",
        big: "95%",
        label:
          "Puntuación en una evaluación independiente de Angular de SkillValue, entre el 1,42% superior de todos los candidatos.",
      },
      {
        value: "23 PRs",
        big: "34",
        label:
          "Hallazgos de accesibilidad de una auditoría formal WCAG 2.1 AA, cerrados entre encabezados, teclado, ARIA y foco.",
      },
      {
        value: "de 53 reglas",
        big: "21",
        label:
          "Reglas retiradas de un sistema propio de revisión automatizada, tras medir lo que el equipo usaba de verdad.",
      },
      {
        value: "equipo Android",
        big: "Adoptado",
        label:
          "Un servidor MCP de documentación adoptado fuera de su plataforma de origen, sin pedirlo.",
      },
    ],
  },
};

export interface Feature {
  folio: string;
  eyebrow: string;
  title: string;
  standfirst: string;
  pullquote: string;
  body: string[];
  tags: string[];
  outcome: string;
}

export const features: { en: Feature[]; es: Feature[] } = {
  en: [
    {
      folio: "Feature 01",
      eyebrow: "Zara Home (Inditex) · Angular, WebRTC, OpenAI Realtime API",
      title: "The Assistant That Shrank Itself",
      standfirst:
        "A real-time voice and text shopping assistant needed a frontend that could hold a live model conversation without ever leaking a byte more than it had to.",
      pullquote:
        "The engineering wasn't the feature list. It was the discipline to keep the model's context small.",
      body: [
        "A global, multi-market e-commerce frontend needed a conversational shopping experience with voice, text and product context. I implemented the Angular integration as a senior individual contributor — the wider product was a team effort, with a co-lead alongside me.",
        "The frontend problem was the WebRTC lifecycle itself: initialize only on request, stay safe under server-side rendering, keep the model's context bounded, and track nothing before the assistant actually opened. The fix was lazy initialization, platform guards, a controlled feature flag, and a routing and context-stripping design applied to every payload before it reached the model.",
        "It reached production behind a feature flag, visible only to a whitelist — a controlled pilot, never opened to the public.",
      ],
      tags: ["Angular", "TypeScript", "WebRTC", "OpenAI Realtime API", "SSR", "Accessibility"],
      outcome: "LLM context payload: 570 KB → 22 KB per execution (96%).",
    },
    {
      folio: "Feature 02",
      eyebrow: "Zara Home (Inditex) · Angular, SSR, Feature Flags",
      title: "One Help Center, Market by Market",
      standfirst:
        "A conversational Help Center had to earn its way into every market without breaking a single existing route.",
      pullquote:
        "Nothing shipped to a new market until SSR, accessibility and routing had already been proven in the last one.",
      body: [
        "A new conversational Help Center rolled out country by country, without changing the entry points customers already knew. I integrated the conversational experience into the existing Angular routes and localized entry points across markets.",
        "The rollout expanded market by market, with SSR behavior, accessibility and route stability verified before each step — existing entry points and user-facing behavior stayed intact while the new experience grew underneath them.",
        "The result: stable routes, localized titles, accessibility and SSR support, market after market.",
      ],
      tags: ["Angular", "SSR", "Feature Flags", "Observability", "Accessibility"],
      outcome: "Rolled out country by country with zero broken entry points.",
    },
    {
      folio: "Feature 03",
      eyebrow: "Zara Home (Inditex) · Angular, NgRx, OTP",
      title: "Two Doors, One Account",
      standfirst:
        "The account area had to serve customers with a password and customers without one, at the same time, without either noticing the seam.",
      pullquote:
        "Map the contract before you touch the flow — then build only what the contract can prove.",
      body: [
        "The account area had to support both existing-password and passwordless users without disrupting flows already in production. Before changing anything, I mapped every UI dependency and authentication state, then scoped the implementation to what that contract actually supported.",
        "The migration stayed deliberately incremental: separate password and OTP paths for email change and password creation, with every dependent action gated by authentication state — never a single flow trying to do both.",
        "Everything was validated end-to-end in a pre-integration environment: existing-password behavior, passwordless forms, OTP email change and password creation, across four documented scenarios.",
      ],
      tags: ["Angular", "Authentication", "API Contracts", "OTP", "NgRx", "Integration Testing"],
      outcome: "Delivered incrementally, with zero disruption to existing account behavior.",
    },
    {
      folio: "Feature 04",
      eyebrow: "Personal Tooling · GitHub, MCP, Automated Review",
      title: "The Reviewer That Reviewed Itself",
      standfirst:
        "An automated PR-review system can look like coverage while it's actually noise. So he audited his own tool the way he'd audit anyone else's.",
      pullquote:
        "The signal was never that an LLM was watching the pull requests. It was that the tool had limits, and got measured against them.",
      body: [
        "A GitHub-connected review system flagged injection, authorization and secrets-management defects before merge, with domain-specific checks across the codebase.",
        "Its first version hurt credibility more than it helped — so it got measured like anything else in production: real output against what the team actually used, rule by rule.",
        "21 of its 53 rules were retired for creating noise instead of value. What survived was trusted enough that a companion Teams CLI merged into a shared Inditex engineering repository, and a documentation MCP server was adopted by the Android team — outside the platform it was built for.",
      ],
      tags: ["GitHub", "Automated Review", "Prompt & Context Engineering", "MCP", "Developer Tooling"],
      outcome: "21 of 53 rules retired after measurement; adopted outside its origin team.",
    },
  ],
  es: [
    {
      folio: "Reportaje 01",
      eyebrow: "Zara Home (Inditex) · Angular, WebRTC, OpenAI Realtime API",
      title: "El Asistente Que Se Encogió a Sí Mismo",
      standfirst:
        "Un asistente de compra por voz y texto en tiempo real necesitaba un frontend capaz de sostener una conversación en vivo con un modelo sin filtrar ni un byte de más.",
      pullquote:
        "La ingeniería no era la lista de funciones. Era la disciplina de mantener pequeño el contexto del modelo.",
      body: [
        "Un frontend de comercio electrónico global y multimercado necesitaba una experiencia de compra conversacional con voz, texto y contexto de producto. Implementé la integración en Angular como profesional sénior; el producto en su conjunto fue un trabajo de equipo, con otro responsable técnico a mi lado.",
        "El problema de frontend era el propio ciclo de vida de WebRTC: inicializarse solo cuando se pedía, ser seguro bajo renderizado en servidor, mantener acotado el contexto del modelo y no rastrear nada antes de que el asistente se abriera de verdad. La solución fue inicialización diferida, protecciones de plataforma, una feature flag controlada y un diseño de enrutado y limpieza de contexto aplicado a cada payload antes de llegar al modelo.",
        "Llegó a producción tras una feature flag, visible solo para una lista blanca: un piloto controlado, nunca abierto al público.",
      ],
      tags: ["Angular", "TypeScript", "WebRTC", "OpenAI Realtime API", "SSR", "Accesibilidad"],
      outcome: "Payload de contexto del LLM: 570 KB → 22 KB por ejecución (96%).",
    },
    {
      folio: "Reportaje 02",
      eyebrow: "Zara Home (Inditex) · Angular, SSR, Feature Flags",
      title: "Un Centro de Ayuda, Mercado a Mercado",
      standfirst:
        "Un Centro de Ayuda conversacional tenía que ganarse su lugar en cada mercado sin romper ni una ruta existente.",
      pullquote:
        "Nada llegaba a un mercado nuevo hasta que el SSR, la accesibilidad y el enrutado ya se habían probado en el anterior.",
      body: [
        "Un nuevo Centro de Ayuda conversacional se desplegó país por país, sin cambiar los puntos de entrada que los clientes ya conocían. Integré la experiencia conversacional en las rutas Angular y los puntos de entrada localizados existentes en cada mercado.",
        "El lanzamiento avanzó mercado a mercado, verificando antes de cada paso el comportamiento bajo SSR, la accesibilidad y la estabilidad de las rutas: los puntos de entrada y el comportamiento visible para el usuario se mantuvieron intactos mientras la nueva experiencia crecía debajo.",
        "El resultado: rutas estables, títulos localizados, accesibilidad y soporte SSR, mercado tras mercado.",
      ],
      tags: ["Angular", "SSR", "Feature flags", "Observabilidad", "Accesibilidad"],
      outcome: "Desplegado país por país sin romper ningún punto de entrada.",
    },
    {
      folio: "Reportaje 03",
      eyebrow: "Zara Home (Inditex) · Angular, NgRx, OTP",
      title: "Dos Puertas, Una Cuenta",
      standfirst:
        "El área de cuenta tenía que atender a clientes con contraseña y sin ella, al mismo tiempo, sin que ninguno notara la costura.",
      pullquote:
        "Mapea el contrato antes de tocar el flujo; construye solo lo que el contrato puede demostrar.",
      body: [
        "El área de cuenta tenía que admitir usuarios con contraseña y sin ella sin interrumpir los flujos ya en producción. Antes de cambiar nada, mapeé todas las dependencias de la interfaz y los estados de autenticación, y acoté la implementación a lo que ese contrato realmente respaldaba.",
        "La migración se mantuvo deliberadamente incremental: caminos separados de contraseña y OTP para el cambio de correo y la creación de contraseña, con cada acción dependiente gobernada por el estado de autenticación, nunca un único flujo intentando hacer ambas cosas.",
        "Todo se validó de extremo a extremo en un entorno de preintegración: comportamiento con contraseña existente, formularios sin contraseña, cambio de correo por OTP y creación de contraseña, en cuatro escenarios documentados.",
      ],
      tags: ["Angular", "Autenticación", "Contratos de API", "OTP", "NgRx", "Pruebas de integración"],
      outcome: "Entregado de forma incremental, sin interrumpir el comportamiento existente.",
    },
    {
      folio: "Reportaje 04",
      eyebrow: "Herramienta personal · GitHub, MCP, Revisión automatizada",
      title: "El Revisor Que Se Revisó a Sí Mismo",
      standfirst:
        "Un sistema automatizado de revisión de PRs puede aparentar cobertura mientras solo genera ruido. Así que auditó su propia herramienta como auditaría cualquier otra.",
      pullquote:
        "La señal nunca fue que un LLM vigilara los pull requests. Fue que la herramienta tenía límites, y se midió contra ellos.",
      body: [
        "Un sistema de revisión conectado a GitHub detectaba defectos de inyección, autorización y gestión de secretos antes de la integración, con comprobaciones específicas del dominio en toda la base de código.",
        "Su primera versión dañó más la credibilidad de lo que ayudó, así que se midió como cualquier otra cosa en producción: la salida real frente a lo que el equipo usaba de verdad, regla por regla.",
        "21 de sus 53 reglas se retiraron por generar ruido en lugar de valor. Lo que sobrevivió inspiró suficiente confianza como para que una CLI de Teams acompañante se integrara en un repositorio de ingeniería compartido de Inditex, y un servidor MCP de documentación fuera adoptado por el equipo de Android, fuera de la plataforma para la que se construyó.",
      ],
      tags: ["GitHub", "Revisión automatizada", "Ingeniería de prompts y contexto", "MCP", "Herramientas de desarrollo"],
      outcome: "21 de 53 reglas retiradas tras medición; adoptado fuera de su equipo de origen.",
    },
  ],
};

export interface TimelineEntry {
  period: string;
  company: string;
  client?: string;
  role: string;
}

export const timeline: { en: TimelineEntry[]; es: TimelineEntry[] } = {
  en: [
    { period: "May 2025 – Jul 2026", company: "Decskill Spain", client: "Zara Home (Inditex)", role: "Senior Front-End Analyst (Angular)" },
    { period: "Mar 2024 – May 2025", company: "Avanade", client: "UNIR", role: "Senior Front-End Analyst (Angular)" },
    { period: "Dec 2022 – Mar 2024", company: "Vermont Solutions (Viewnext / IBM)", client: "Santander", role: "Senior Front-End Developer (Angular)" },
    { period: "Oct 2022 – Dec 2022", company: "CloudAPPi", client: "Regional Government of Madrid", role: "Mid-Level Front-End Developer (Angular, React)" },
    { period: "Sep 2021 – Oct 2022", company: "ENZO (Rent & Buy S.A.)", role: "Mid-Level Front-End Developer (Angular)" },
    { period: "Jun 2020 – Sep 2021", company: "Independent Projects & Upskilling", role: "WordPress, office automation, frontend upskilling" },
    { period: "Mar 2020 – Jun 2020", company: "Altran (Capgemini)", role: "Mid-Level Full Stack Developer (.NET)" },
    { period: "Nov 2018 – Sep 2019", company: "IO Digital (Query Software)", role: "Mid-Level Full Stack Developer (.NET)" },
    { period: "Jul 2018 – Nov 2018", company: "STRATESYS", role: "Junior Full Stack Developer (.NET)" },
  ],
  es: [
    { period: "May 2025 – Jul 2026", company: "Decskill España", client: "Zara Home (Inditex)", role: "Analista Frontend Sénior (Angular)" },
    { period: "Mar 2024 – May 2025", company: "Avanade", client: "UNIR", role: "Analista Frontend Sénior (Angular)" },
    { period: "Dic 2022 – Mar 2024", company: "Vermont Solutions (Viewnext / IBM)", client: "Santander", role: "Desarrollador Frontend Sénior (Angular)" },
    { period: "Oct 2022 – Dic 2022", company: "CloudAPPi", client: "Comunidad de Madrid", role: "Desarrollador Frontend Intermedio (Angular, React)" },
    { period: "Sep 2021 – Oct 2022", company: "ENZO (Rent & Buy S.A.)", role: "Desarrollador Frontend Intermedio (Angular)" },
    { period: "Jun 2020 – Sep 2021", company: "Proyectos propios y formación", role: "WordPress, automatización de oficina, formación frontend" },
    { period: "Mar 2020 – Jun 2020", company: "Altran (Capgemini)", role: "Desarrollador Full Stack Intermedio (.NET)" },
    { period: "Nov 2018 – Sep 2019", company: "IO Digital (Query Software)", role: "Desarrollador Full Stack Intermedio (.NET)" },
    { period: "Jul 2018 – Nov 2018", company: "STRATESYS", role: "Desarrollador Full Stack Junior (.NET)" },
  ],
};

export interface Letter {
  quote: string;
  author: string;
  role: string;
  note?: string;
}

export const letters: { en: Letter[]; es: Letter[] } = {
  en: [
    {
      quote:
        "His knowledge of Angular is excellent, but what I really highlight from working with him is his willingness to help and share his experience. He not only applies good practices in his daily work, but promotes their adoption within the team, organizing meetings when necessary and aligning everyone around building quality, maintainable and scalable software.",
      author: "José Luis Murcia Gámez",
      role: "Frontend Developer, UNIR project (Avanade)",
      note: "Translated from a recommendation published on LinkedIn",
    },
    {
      quote:
        "Working with Marius has been a real pleasure. I especially highlight his initiative with AI tools applied to development, from which I learned a great deal working side by side with him. Any team would be more than fortunate to count on someone with his technical level and his attitude.",
      author: "Juan Pablo Romero Pereira",
      role: "Frontend Developer, Zara Home (Inditex)",
      note: "Translated from a recommendation published on LinkedIn",
    },
    {
      quote:
        "Marius proved to be a highly adaptable and resourceful programmer on both occasions we worked together, at Stratesys and at Avanade, where he worked as an external consultant. His ability to learn quickly and his contribution to the projects were fundamental.",
      author: "José Luis Rodríguez-Campra Camberos",
      role: "BAU Coordinator / Scrum Master",
      note: "Translated from a recommendation published on LinkedIn",
    },
    {
      quote:
        "Great partner, he has done a great job in his last project demonstrating that he can design and build business applications successfully.",
      author: "Antonio Bermúdez Rodríguez",
      role: "Developer",
      note: "Published on LinkedIn",
    },
    {
      quote:
        "Marius was a great professional to work with. We worked together at ENZO, and his work ethic is immaculate; he is very easy to work with and goes out of his way to help when you ask for guidance.",
      author: "Gonzalo Rodríguez Muñoz",
      role: "Full Stack Software Developer, ENZO",
      note: "Translated from a recommendation published on LinkedIn",
    },
  ],
  es: [
    {
      quote:
        "Su conocimiento en Angular es excelente, pero lo que realmente destaco de trabajar con él es su disposición para ayudar y compartir su experiencia. No solo aplica las buenas prácticas en su trabajo diario, sino que también fomenta su adopción dentro del equipo, organizando reuniones cuando es necesario y alineando a todos en la construcción de software de calidad, mantenible y escalable.",
      author: "José Luis Murcia Gámez",
      role: "Desarrollador Frontend, proyecto UNIR (Avanade)",
    },
    {
      quote:
        "Trabajar con Marius ha sido un verdadero placer. Destaco especialmente su iniciativa con herramientas de IA aplicadas al desarrollo, de las que aprendí muchísimo trabajando codo con codo con él. Cualquier equipo sería más que afortunado de contar con alguien con su nivel técnico y su actitud.",
      author: "Juan Pablo Romero Pereira",
      role: "Desarrollador Frontend, Zara Home (Inditex)",
    },
    {
      quote:
        "Marius demostró ser un programador altamente adaptable y resolutivo en ambas ocasiones que trabajamos juntos, tanto en Stratesys como en Avanade, donde trabajó como consultor externo. Su capacidad para aprender rápidamente y su contribución a los proyectos fueron fundamentales.",
      author: "José Luis Rodríguez-Campra Camberos",
      role: "Coordinador BAU / Scrum Master",
    },
    {
      quote:
        "Gran compañero. Hizo un trabajo excelente en su último proyecto y demostró que puede diseñar y construir aplicaciones empresariales con éxito.",
      author: "Antonio Bermúdez Rodríguez",
      role: "Desarrollador",
      note: "Traducida de una recomendación publicada en inglés en LinkedIn",
    },
    {
      quote:
        "Marius fue un gran profesional con el que trabajé. Trabajamos juntos en ENZO, y su ética de trabajo es inmaculada; es muy fácil trabajar con él y se desvive cuando le pides ayuda y orientación.",
      author: "Gonzalo Rodríguez Muñoz",
      role: "Desarrollador Full Stack, ENZO",
    },
  ],
};

export const about = {
  en: {
    eyebrow: "Masthead",
    heading: "Who writes this issue",
    paragraphs: [
      "I'm a senior frontend individual contributor working on enterprise Angular products: TypeScript, RxJS, NgRx and server-side rendering.",
      "I'm strongest where product frontend meets platform concerns — authentication migrations, API contracts, controlled rollouts, accessibility, performance and SSR.",
      "Full-stack .NET/C# work from 2018 to 2020 gives me useful backend context, without changing the direction of my career: frontend product engineering is the focus, specialized in Angular since 2021.",
      "I also build engineering controls when they solve a delivery problem — automated review, context management, documentation search — but they stay part of the frontend system, not a separate identity.",
    ],
    facts: [
      "Based in Zaragoza, Spain",
      "EU citizen, authorized across the EU/EEA without sponsorship",
      "Remote or hybrid from Zaragoza",
      "Available for occasional travel · no relocation",
      "Permanent or B2B",
    ],
  },
  es: {
    eyebrow: "Ficha técnica",
    heading: "Quién firma este número",
    paragraphs: [
      "Soy un profesional sénior de frontend que trabaja en productos corporativos de Angular: TypeScript, RxJS, NgRx y renderizado en servidor.",
      "Donde más aporto es allí donde el frontend de producto se cruza con la plataforma: migraciones de autenticación, contratos de API, despliegues controlados, accesibilidad, rendimiento y SSR.",
      "El trabajo previo full stack en .NET/C# entre 2018 y 2020 me da un contexto útil de servidor, sin cambiar la dirección de mi carrera: el foco es la ingeniería de producto en frontend, especializado en Angular desde 2021.",
      "También construyo controles de ingeniería cuando resuelven un problema de entrega — revisión automatizada, gestión de contexto, búsqueda en documentación — pero siguen siendo parte del sistema de frontend, no una identidad aparte.",
    ],
    facts: [
      "Con base en Zaragoza, España",
      "Ciudadano de la UE, autorizado en toda la UE/EEE sin patrocinio",
      "Remoto o híbrido desde Zaragoza",
      "Disponibilidad para viajes puntuales · sin traslado",
      "Indefinido o B2B",
    ],
  },
};

export const contact = {
  en: {
    eyebrow: "Back Page",
    heading: "Get in touch",
    lede: "Senior Angular / Frontend Engineer roles. Remote or hybrid from Zaragoza, permanent or B2B.",
    cvLabel: "Download CV",
    cvEn: "English PDF",
    cvEs: "Spanish PDF",
    links: [
      { label: "Email", href: "mailto:mihailmariusion@gmail.com", value: "mihailmariusion@gmail.com" },
      { label: "LinkedIn", href: "https://linkedin.com/in/mariusdev", value: "linkedin.com/in/mariusdev" },
      { label: "GitHub", href: "https://github.com/mihailmariusiondev", value: "github.com/mihailmariusiondev" },
    ],
    a11y:
      "This issue targets WCAG 2.1 AA: visible keyboard focus on every interactive element, headings in document order, AA color contrast, and motion disabled when reduced motion is set.",
    colophon:
      "Set in Fraunces Variable and Space Grotesk Variable, self-hosted. Built with Astro, GSAP and no tracking.",
  },
  es: {
    eyebrow: "Contraportada",
    heading: "Hablemos",
    lede: "Puestos de Ingeniero Frontend Sénior (Angular). Remoto o híbrido desde Zaragoza, indefinido o B2B.",
    cvLabel: "Descargar CV",
    cvEn: "PDF en inglés",
    cvEs: "PDF en español",
    links: [
      { label: "Correo", href: "mailto:mihailmariusion@gmail.com", value: "mihailmariusion@gmail.com" },
      { label: "LinkedIn", href: "https://linkedin.com/in/mariusdev", value: "linkedin.com/in/mariusdev" },
      { label: "GitHub", href: "https://github.com/mihailmariusiondev", value: "github.com/mihailmariusiondev" },
    ],
    a11y:
      "Este número tiene como objetivo WCAG 2.1 AA: foco de teclado visible en cada elemento interactivo, encabezados en orden de documento, contraste de color AA, y animación desactivada cuando se activa la reducción de movimiento.",
    colophon:
      "Compuesto con Fraunces Variable y Space Grotesk Variable, autoalojadas. Construido con Astro, GSAP y sin rastreo.",
  },
};

export const nav = {
  en: { switchTo: "ES", switchLabel: "View this page in Spanish", skip: "Skip to main content" },
  es: { switchTo: "EN", switchLabel: "Ver esta página en inglés", skip: "Saltar al contenido principal" },
};
