// All copy is original phrasing written for this site. All facts, numbers,
// employers, dates and technologies are sourced from /tmp/.../_context
// (facts.json, cv-en/es.txt, PRODUCT.md, RETRACTED.md). Nothing invented.

export const site = {
  name: "Marius Mihail Ion",
  role: { en: "Senior Angular / Frontend Engineer", es: "Ingeniero Frontend Sénior (Angular)" },
  title: {
    en: "Marius Mihail Ion — Senior Angular / Frontend Engineer",
    es: "Marius Mihail Ion — Ingeniero Frontend Sénior (Angular)",
  },
  description: {
    en: "A tactile physics playground: drag, throw and stack the technologies, outcomes and case studies behind a Senior Angular engineer's career.",
    es: "Un playground físico y táctil: arrastra, lanza y apila las tecnologías, resultados y casos de un ingeniero Frontend Sénior en Angular.",
  },
};

export const nav = {
  cases: { en: "Case studies", es: "Casos" },
  stack: { en: "Stack", es: "Tecnologías" },
  experience: { en: "Experience", es: "Experiencia" },
  contact: { en: "Contact", es: "Contacto" },
  motionOn: { en: "Motion: on", es: "Movimiento: activo" },
  motionOff: { en: "Motion: off", es: "Movimiento: pausado" },
  lang: { en: "ES", es: "EN" },
  skip: { en: "Skip to main content", es: "Saltar al contenido principal" },
};

export const hero = {
  eyebrow: {
    en: "Drag it. Throw it. It still spells the truth.",
    es: "Arrástralo. Lánzalo. Sigue diciendo la verdad.",
  },
  lede: {
    en: "Software developer since 2018, specialized in Angular since 2021. I ship the parts of a product where frontend decisions carry real risk: authentication, SSR, accessibility, performance and API integration.",
    es: "Desarrollador de software desde 2018, especializado en Angular desde 2021. Construyo las partes de un producto donde las decisiones de frontend cargan riesgo real: autenticación, SSR, accesibilidad, rendimiento e integración de APIs.",
  },
  location: {
    en: "Zaragoza, Spain · EU citizen, authorized across the EU/EEA · Remote or hybrid from Zaragoza · Available for occasional travel · No relocation",
    es: "Zaragoza, España · Ciudadano de la UE, autorizado en toda la UE/EEE · Remoto o híbrido desde Zaragoza · Disponibilidad para viajes puntuales · Sin reubicación",
  },
  ctaCases: { en: "Drop into the case studies", es: "Cae en los casos" },
  ctaCv: { en: "Download CV", es: "Descargar CV" },
  photoAlt: { en: "Portrait of Marius Mihail Ion", es: "Retrato de Marius Mihail Ion" },
  hint: {
    en: "Everything with a dashed outline is a physical body — grab it with your mouse or finger.",
    es: "Todo lo que tiene un borde discontinuo es un cuerpo físico: agárralo con el ratón o el dedo.",
  },
};

export const compression = {
  heading: { en: "One number, compressed on stage", es: "Un número, comprimido en escena" },
  lede: {
    en: "The AI shopping assistant's LLM context payload dropped from 570 KB to 22 KB per execution — a routing and context-stripping design, not a bigger machine. Press play and watch the block get squeezed.",
    es: "El payload de contexto del LLM del asistente de compra bajó de 570 KB a 22 KB por ejecución: un diseño de enrutado y limpieza de contexto, no una máquina más grande. Dale a reproducir y mira cómo se comprime el bloque.",
  },
  before: "570 KB",
  after: "22 KB",
  result: { en: "96% smaller, per execution", es: "96% más pequeño, por ejecución" },
  replay: { en: "Compress again", es: "Comprimir otra vez" },
  caption: {
    en: "Pilot detail: the assistant reached production behind a feature flag, visible only to a whitelist. It was never opened to the public.",
    es: "Detalle del piloto: el asistente llegó a producción tras una feature flag, visible solo para una lista blanca. Nunca se abrió al público.",
  },
};

export const metrics = [
  {
    value: "Top 1.42%",
    label: {
      en: "SkillValue Angular assessment score of 95%, Sept. 2022",
      es: "Evaluación de Angular de SkillValue, 95%, sept. 2022",
    },
  },
  {
    value: "34 → 23",
    label: {
      en: "WCAG 2.1 AA findings closed via 23 merged pull requests",
      es: "Hallazgos WCAG 2.1 AA cerrados en 23 pull requests",
    },
  },
  {
    value: "21 / 53",
    label: {
      en: "Automated-review rules retired after measuring real usage",
      es: "Reglas de revisión automática retiradas tras medir su uso real",
    },
  },
  {
    value: { en: "Adopted", es: "Adoptado" },
    label: {
      en: "A documentation MCP tool, picked up by the Android team",
      es: "Un MCP de documentación, adoptado por el equipo de Android",
    },
  },
];

export const stackGroups = [
  {
    title: { en: "Angular & TypeScript", es: "Angular y TypeScript" },
    items: [
      "Angular 8–20", "Signals", "Standalone Components", "SSR", "Lazy loading",
      "RxJS", "NgRx", "Angular Material / CDK", "Feature flags",
    ],
  },
  {
    title: { en: "Product frontend", es: "Frontend de producto" },
    items: [
      "JavaScript", "HTML5", "CSS / SCSS", "React 17", "Responsive design",
      "Design systems", "WCAG 2.1 AA", "Transloco i18n", "Web performance",
    ],
  },
  {
    title: { en: "Testing & quality", es: "Testing y calidad" },
    items: ["Jest", "Karma / Jasmine", "SonarQube", "ESLint", "Prettier"],
  },
  {
    title: { en: "APIs & delivery", es: "APIs y entrega" },
    items: [
      "REST", "OpenAPI / Swagger", "OAuth 2.0", "JWT", "HTTP interceptors",
      "WebRTC", "AWS (Lambda, Cognito, S3)", "GitHub Actions",
    ],
  },
  {
    title: { en: "AI & tooling", es: "IA y herramientas" },
    items: ["OpenAI Realtime API", "Prompt & context engineering", "MCP tooling"],
  },
];

const sanitized = {
  en: "Sanitized: no client source code, credentials, internal URLs or private implementation detail.",
  es: "Sanitizado: sin código fuente del cliente, credenciales, URLs internas ni detalle privado de implementación.",
};

export const caseStudies = [
  {
    slug: "shopping-assistant",
    title: { en: "Real-time shopping assistant", es: "Asistente de compra en tiempo real" },
    tags: ["Angular", "TypeScript", "WebRTC", "OpenAI Realtime API", "SSR"],
    summary: {
      en: "A voice-and-text shopping assistant, released as a controlled whitelist pilot with a 96% smaller context payload.",
      es: "Un asistente de compra por voz y texto, publicado como piloto controlado con un payload de contexto 96% más pequeño.",
    },
    fields: [
      {
        label: { en: "Context", es: "Contexto" },
        value: {
          en: "A global, multi-market e-commerce frontend wanted a conversational shopping experience with voice, text and product context.",
          es: "Un frontend de e-commerce global y multimercado quería una experiencia de compra conversacional con voz, texto y contexto de producto.",
        },
      },
      {
        label: { en: "My role", es: "Mi papel" },
        value: {
          en: "I built the Angular integration as a senior individual contributor, on a team with a co-lead alongside me.",
          es: "Construí la integración en Angular como profesional sénior, en un equipo con otro responsable técnico junto a mí.",
        },
      },
      {
        label: { en: "The hard part", es: "La parte difícil" },
        value: {
          en: "Managing the WebRTC lifecycle, initializing only on request, staying safe under server rendering, keeping the model context bounded, and not tracking anyone before they opened the assistant.",
          es: "Gestionar el ciclo de vida de WebRTC, inicializar solo bajo demanda, ser seguro en el renderizado en servidor, acotar el contexto del modelo y no rastrear a nadie antes de abrir el asistente.",
        },
      },
      {
        label: { en: "Decisions", es: "Decisiones" },
        value: {
          en: "Lazy initialization, platform guards, a controlled feature flag, and a routing-and-stripping design for what actually reached the model.",
          es: "Inicialización diferida, guardas de plataforma, una feature flag controlada, y un diseño de enrutado y recorte de lo que realmente llegaba al modelo.",
        },
      },
      {
        label: { en: "Outcome", es: "Resultado" },
        value: {
          en: "Shipped to production as a controlled whitelist pilot, never opened to the public. Context payload: 570 KB → 22 KB per execution (96% smaller).",
          es: "Llegó a producción como piloto controlado con lista blanca, nunca abierto al público. Payload de contexto: 570 KB → 22 KB por ejecución (96% menos).",
        },
      },
    ],
    confidential: sanitized,
  },
  {
    slug: "help-center",
    title: { en: "Help Center rollout", es: "Despliegue del Centro de Ayuda" },
    tags: ["Angular", "SSR", "Feature flags", "Accessibility"],
    summary: {
      en: "A conversational Help Center, rolled out market by market with SSR, localized routes and accessibility held constant.",
      es: "Un Centro de Ayuda conversacional, desplegado mercado a mercado con SSR, rutas localizadas y accesibilidad constante.",
    },
    fields: [
      {
        label: { en: "Context", es: "Contexto" },
        value: {
          en: "A new conversational Help Center needed to expand market by market without disturbing the existing entry points.",
          es: "Un nuevo Centro de Ayuda conversacional debía expandirse mercado a mercado sin alterar los puntos de entrada existentes.",
        },
      },
      {
        label: { en: "Delivery", es: "Entrega" },
        value: {
          en: "I integrated the conversational experience into the existing Angular routes and localized entry points across markets.",
          es: "Integré la experiencia conversacional en las rutas Angular y los puntos de entrada localizados ya existentes en cada mercado.",
        },
      },
      {
        label: { en: "Rollout discipline", es: "Disciplina de despliegue" },
        value: {
          en: "SSR behavior, accessibility and route stability were verified before every country went live, one step at a time.",
          es: "El comportamiento SSR, la accesibilidad y la estabilidad de rutas se verificaron antes de cada país, un paso cada vez.",
        },
      },
      {
        label: { en: "Outcome", es: "Resultado" },
        value: {
          en: "Rolled out country by country with stable routes, localized titles, accessibility and SSR support intact throughout.",
          es: "Desplegado país por país con rutas estables, títulos localizados, accesibilidad y soporte SSR intactos en todo momento.",
        },
      },
    ],
  },
  {
    slug: "passwordless",
    title: { en: "Passwordless account migration", es: "Migración a autenticación sin contraseña" },
    tags: ["Angular", "OTP", "NgRx", "Integration testing"],
    summary: {
      en: "A contract-first migration to OTP authentication, kept incremental and validated end to end before it touched real accounts.",
      es: "Una migración a autenticación por OTP guiada por contrato, incremental y validada de extremo a extremo antes de tocar cuentas reales.",
    },
    fields: [
      {
        label: { en: "Context", es: "Contexto" },
        value: {
          en: "The account area had to serve existing-password users and passwordless users at once, without breaking either flow.",
          es: "El área de cuenta debía servir a usuarios con contraseña y sin ella a la vez, sin romper ninguno de los dos flujos.",
        },
      },
      {
        label: { en: "Contract first", es: "El contrato primero" },
        value: {
          en: "I mapped every UI dependency on authentication state before touching a single flow, then scoped implementation to what that contract actually supported.",
          es: "Mapeé cada dependencia de la interfaz con el estado de autenticación antes de tocar un solo flujo, y acoté la implementación a lo que ese contrato realmente soportaba.",
        },
      },
      {
        label: { en: "Implementation", es: "Implementación" },
        value: {
          en: "Separate password and OTP paths, including email change and password creation, with dependent actions gated by the hasPassword state.",
          es: "Caminos separados para contraseña y OTP, incluidos el cambio de correo y la creación de contraseña, con acciones dependientes bloqueadas por el estado hasPassword.",
        },
      },
      {
        label: { en: "Validation", es: "Validación" },
        value: {
          en: "Validated end to end on a pre-integration environment across four documented scenarios: existing password, passwordless forms, OTP email change and password creation.",
          es: "Validado de extremo a extremo en preintegración a través de cuatro escenarios documentados: contraseña existente, formularios sin contraseña, cambio de correo por OTP y creación de contraseña.",
        },
      },
      {
        label: { en: "Outcome", es: "Resultado" },
        value: {
          en: "The passwordless flows shipped incrementally, with existing account behavior never disrupted.",
          es: "Los flujos sin contraseña se entregaron de forma incremental, sin interrumpir nunca el comportamiento existente de la cuenta.",
        },
      },
    ],
  },
  {
    slug: "engineering-controls",
    title: { en: "Engineering controls for frontend delivery", es: "Controles de ingeniería para la entrega" },
    tags: ["GitHub", "Automated review", "MCP", "Developer tooling"],
    summary: {
      en: "A GitHub-connected review system that measured its own noise, cut itself down, and got adopted outside its own team.",
      es: "Un sistema de revisión conectado a GitHub que midió su propio ruido, se recortó a sí mismo y fue adoptado fuera de su equipo.",
    },
    fields: [
      {
        label: { en: "Problem", es: "Problema" },
        value: {
          en: "Automated review can look like coverage while producing noise, duplicate feedback and rules nobody trusts.",
          es: "La revisión automática puede parecer cobertura mientras produce ruido, comentarios duplicados y reglas en las que nadie confía.",
        },
      },
      {
        label: { en: "System", es: "Sistema" },
        value: {
          en: "I built a GitHub-connected review system with domain-specific checks, flagging injection, authorization and secrets-management defects before merge.",
          es: "Construí un sistema de revisión conectado a GitHub con comprobaciones específicas del dominio, detectando defectos de inyección, autorización y gestión de secretos antes de fusionar.",
        },
      },
      {
        label: { en: "The self-audit", es: "La autoauditoría" },
        value: {
          en: "The first version hurt its own credibility. I measured what the team actually used against what it proposed, and retired 21 of its 53 rules.",
          es: "La primera versión dañó su propia credibilidad. Medí lo que el equipo realmente usaba frente a lo que proponía, y retiré 21 de sus 53 reglas.",
        },
      },
      {
        label: { en: "Adoption", es: "Adopción" },
        value: {
          en: "A Teams CLI merged into a shared Inditex engineering repository; a documentation MCP was separately adopted by the Android team.",
          es: "Una CLI de Teams se integró en un repositorio de ingeniería compartido de Inditex; un MCP de documentación fue adoptado por separado por el equipo de Android.",
        },
      },
    ],
  },
];

export const experience = [
  {
    period: "May 2025 – July 2026",
    company: "Decskill Spain",
    client: "Zara Home (Inditex)",
    role: { en: "Senior Front-End Analyst (Angular)", es: "Analista Front-End Sénior (Angular)" },
    bullets: [
      {
        en: "Angular frontend for a real-time voice-and-text shopping assistant over WebRTC, shipped as a controlled pilot behind a feature flag.",
        es: "Frontend Angular para un asistente de compra en tiempo real por voz y texto sobre WebRTC, publicado como piloto controlado tras una feature flag.",
      },
      {
        en: "Cut the LLM context payload from 570 KB to 22 KB per execution (96%) via routing and context stripping.",
        es: "Redujo el payload de contexto del LLM de 570 KB a 22 KB por ejecución (96%) mediante enrutado y recorte de contexto.",
      },
      {
        en: "Rolled out a conversational Help Center market by market, SSR-safe, with localized routes and accessibility preserved.",
        es: "Desplegó un Centro de Ayuda conversacional mercado a mercado, seguro en SSR, con rutas localizadas y accesibilidad preservada.",
      },
      {
        en: "Audited a 19 MB bundle, found ~3.4 MB of removable weight, shipped dynamic imports for hls.js/html2canvas plus a lodash-es and Luxon cleanup.",
        es: "Auditó un bundle de 19 MB, encontró ~3.4 MB de peso eliminable, y publicó imports dinámicos para hls.js/html2canvas más una limpieza de lodash-es y Luxon.",
      },
      {
        en: "Delivered the passwordless (OTP) account migration, validated across four documented scenarios.",
        es: "Entregó la migración de cuenta sin contraseña (OTP), validada en cuatro escenarios documentados.",
      },
      {
        en: "Closed 34 WCAG 2.1 AA findings via 23 merged pull requests: headings, keyboard, ARIA, focus.",
        es: "Cerró 34 hallazgos WCAG 2.1 AA en 23 pull requests: encabezados, teclado, ARIA, foco.",
      },
    ],
  },
  {
    period: "March 2024 – May 2025",
    company: "Avanade",
    client: "UNIR",
    role: { en: "Senior Front-End Analyst (Angular)", es: "Analista Front-End Sénior (Angular)" },
    bullets: [
      {
        en: "Hands-on frontend technical reference for architecture, component design and code quality.",
        es: "Referencia técnica de frontend para arquitectura, diseño de componentes y calidad de código.",
      },
      {
        en: "Defined authentication flows, admin UI, centralized permissions and navigation for an administrative back-office.",
        es: "Definió flujos de autenticación, UI de administración, permisos centralizados y navegación para un back-office administrativo.",
      },
      {
        en: "Refactored the Admissions module inside an Nx monorepo, removing circular dependencies and centralizing permission logic.",
        es: "Refactorizó el módulo de Admisiones en un monorepo Nx, eliminando dependencias circulares y centralizando la lógica de permisos.",
      },
      {
        en: "Introduced linting, formatting and unit testing to a back-office that had none, plus review protocols.",
        es: "Introdujo linting, formateo y tests unitarios en un back-office que no tenía ninguno, más protocolos de revisión.",
      },
      {
        en: "Mentored the team on Angular practices; received an Inspire Greatness award (August 2024).",
        es: "Mentorizó al equipo en prácticas de Angular; recibió un premio Inspire Greatness (agosto 2024).",
      },
    ],
  },
  {
    period: "December 2022 – March 2024",
    company: "Vermont Solutions (Viewnext / IBM)",
    client: "Santander",
    role: { en: "Senior Front-End Developer (Angular)", es: "Desarrollador Front-End Sénior (Angular)" },
    bullets: [
      {
        en: "Senior Angular reference across three concurrent banking applications, coordinating with backend, design and Scrum teams.",
        es: "Referencia sénior de Angular en tres aplicaciones bancarias simultáneas, coordinando con backend, diseño y Scrum.",
      },
      {
        en: "Led a team of 5 on an internal mobile banking app, and was senior reference for a team of 4 on Santander's real-estate portal.",
        es: "Lideró un equipo de 5 en una app bancaria móvil interna, y fue referente sénior de un equipo de 4 en el portal inmobiliario de Santander.",
      },
      {
        en: "Built a transaction-monitoring dashboard with Chart.js and HammerJS gesture interactions; owned ~80% of one project's frontend.",
        es: "Construyó un panel de monitorización de transacciones con Chart.js y gestos HammerJS; asumió ~80% del frontend de un proyecto.",
      },
      {
        en: "Implemented Figma designs on Santander's internal platform: Flame design system, NgDarwin, Storybook, Nexus.",
        es: "Implementó diseños de Figma en la plataforma interna de Santander: sistema de diseño Flame, NgDarwin, Storybook, Nexus.",
      },
      {
        en: "Systematic unit testing (Karma/Jasmine) and static analysis (SonarQube, ESLint, Fortify), paying down technical debt.",
        es: "Testing unitario sistemático (Karma/Jasmine) y análisis estático (SonarQube, ESLint, Fortify), reduciendo deuda técnica.",
      },
    ],
  },
  {
    period: "October – December 2022",
    company: "CloudAPPi",
    client: { en: "Regional Government of Madrid", es: "Comunidad de Madrid" },
    role: { en: "Mid-Level Front-End Developer (Angular, React)", es: "Desarrollador Front-End Semi-Sénior (Angular, React)" },
    bullets: [
      {
        en: "Authentication flows and incremental improvements on Madrid Digital, a legacy Angular 8 monolith.",
        es: "Flujos de autenticación y mejoras incrementales sobre Madrid Digital, un monolito heredado en Angular 8.",
      },
      {
        en: "Contributed to a parallel React 17 / Redux Toolkit / Material UI project.",
        es: "Contribuyó a un proyecto paralelo en React 17 / Redux Toolkit / Material UI.",
      },
    ],
  },
  {
    period: "September 2021 – October 2022",
    company: "ENZO (Rent & Buy S.A.)",
    client: null,
    role: { en: "Mid-Level Front-End Developer (Angular)", es: "Desarrollador Front-End Semi-Sénior (Angular)" },
    bullets: [
      {
        en: "Moved from .NET into Angular here: built reusable components against an existing AWS serverless backend (Lambda, API Gateway, S3, CloudFront, SQS/SNS) with Cognito authentication.",
        es: "Aquí pasó de .NET a Angular: construyó componentes reutilizables sobre un backend serverless de AWS ya existente (Lambda, API Gateway, S3, CloudFront, SQS/SNS) con autenticación Cognito.",
      },
      {
        en: "Onboarded new teammates on the architecture and joined English-language client meetings.",
        es: "Incorporó a nuevos compañeros en la arquitectura y participó en reuniones con cliente en inglés.",
      },
    ],
  },
  {
    period: "June 2020 – September 2021",
    company: { en: "Independent projects & upskilling", es: "Proyectos independientes y formación" },
    client: null,
    role: null,
    bullets: [
      {
        en: "A deliberate 15-month break: WordPress development, office-automation tooling, structured frontend upskilling.",
        es: "Una pausa deliberada de 15 meses: desarrollo en WordPress, herramientas de automatización de oficina, formación estructurada en frontend.",
      },
    ],
  },
  {
    period: "March – June 2020",
    company: "Altran (Capgemini)",
    client: null,
    role: { en: "Mid-Level Full Stack Developer (.NET)", es: "Desarrollador Full Stack Semi-Sénior (.NET)" },
    bullets: [],
  },
  {
    period: "November 2018 – September 2019",
    company: "IO Digital (Query Software)",
    client: null,
    role: { en: "Mid-Level Full Stack Developer (.NET)", es: "Desarrollador Full Stack Semi-Sénior (.NET)" },
    bullets: [],
  },
  {
    period: "July – November 2018",
    company: "STRATESYS",
    client: null,
    role: { en: "Junior Full Stack Developer (.NET)", es: "Desarrollador Full Stack Junior (.NET)" },
    bullets: [],
  },
];

export const recommendations = [
  {
    quote: {
      en: "His knowledge of Angular is excellent, but what I really highlight from working with him is his willingness to help and share his experience. He applies good practices and promotes their adoption within the team, aligning everyone around building quality, maintainable and scalable software.",
      es: "Su conocimiento de Angular es excelente, pero lo que más destaco de trabajar con él es su disposición a ayudar y compartir su experiencia. Aplica buenas prácticas y promueve su adopción en el equipo, alineando a todos en torno a construir software de calidad, mantenible y escalable.",
    },
    author: "José Luis Murcia Gámez",
    role: { en: "Frontend Developer, UNIR project (Avanade)", es: "Desarrollador Frontend, proyecto UNIR (Avanade)" },
  },
  {
    quote: {
      en: "Working with Marius has been a real pleasure. I especially highlight his initiative with AI tools applied to development, from which I learned a great deal. Any team would be more than fortunate to count on someone with his technical level and his attitude.",
      es: "Trabajar con Marius ha sido un verdadero placer. Destaco especialmente su iniciativa con herramientas de IA aplicadas al desarrollo, de las que aprendí muchísimo. Cualquier equipo sería muy afortunado de contar con alguien con su nivel técnico y su actitud.",
    },
    author: "Juan Pablo Romero Pereira",
    role: { en: "Frontend Developer, Zara Home (Inditex)", es: "Desarrollador Frontend, Zara Home (Inditex)" },
  },
  {
    quote: {
      en: "Marius proved to be a highly adaptable and resourceful programmer on both occasions we worked together, at Stratesys and at Avanade. His ability to learn quickly and his contribution to the projects were fundamental.",
      es: "Marius demostró ser un programador muy adaptable e ingenioso en las dos ocasiones en que trabajamos juntos, en Stratesys y en Avanade. Su capacidad de aprendizaje rápido y su contribución a los proyectos fueron fundamentales.",
    },
    author: "José Luis Rodríguez-Campra Camberos",
    role: { en: "BAU Coordinator / Scrum Master", es: "Coordinador BAU / Scrum Master" },
  },
  {
    quote: {
      en: "Great partner, he has done a great job in his last project demonstrating that he can design and build business applications successfully.",
      es: "Gran compañero, ha hecho un gran trabajo en su último proyecto demostrando que puede diseñar y construir aplicaciones de negocio con éxito.",
    },
    author: "Antonio Bermúdez Rodríguez",
    role: { en: "Developer", es: "Desarrollador" },
  },
  {
    quote: {
      en: "Marius was a great professional to work with. His work ethic is immaculate; he is very easy to work with and goes out of his way to help when you ask for guidance.",
      es: "Marius fue un gran profesional con quien trabajar. Su ética de trabajo es impecable; es muy fácil trabajar con él y se esfuerza por ayudar cuando le pides orientación.",
    },
    author: "Gonzalo Rodríguez Muñoz",
    role: { en: "Full Stack Software Developer, ENZO", es: "Desarrollador Full Stack, ENZO" },
  },
];

export const contact = {
  heading: { en: "Grab a way to reach me", es: "Agarra una forma de contactarme" },
  lede: {
    en: "Permanent or B2B, remote or hybrid from Zaragoza. Available for occasional travel.",
    es: "Indefinido o B2B, remoto o híbrido desde Zaragoza. Disponibilidad para viajes puntuales.",
  },
  email: "mihailmariusion@gmail.com",
  linkedin: "https://linkedin.com/in/mariusdev",
  github: "https://github.com/mihailmariusiondev",
};

export const footer = {
  a11y: {
    en: "This site targets WCAG 2.1 AA. Every physical body is also plain, focusable, readable content — the playground is a layer on top, never a requirement.",
    es: "Este sitio busca cumplir WCAG 2.1 AA. Cada cuerpo físico es también contenido plano, enfocable y legible: el playground es una capa encima, nunca un requisito.",
  },
  built: { en: "Built with vanilla JS, Matter.js and a lot of restitution tuning.", es: "Hecho con JS puro, Matter.js y mucho ajuste de restitución." },
};
