// All facts sourced from the vetted CV/case-study dataset.
// Copy is rewritten in an original voice; numbers and claims are never strengthened.

export type Lang = "en" | "es";
export type L<T> = Record<Lang, T>;

export interface Role {
  period: L<string>;
  company: string;
  client: string | null;
  role: L<string>;
  bullets: L<string[]>;
}

export interface CaseStudy {
  slug: string;
  title: L<string>;
  tags: string[];
  summary: L<string>;
  fields: { label: L<string>; value: L<string> }[];
  note?: L<string>;
}

export interface Stat {
  value: string;
  label: L<string>;
}

export interface Quote {
  quote: L<string>;
  author: string;
  role: L<string>;
}

export const nav = {
  brand: "MMI",
  items: [
    { id: "hero", label: { en: "Field", es: "Campo" } },
    { id: "work", label: { en: "Work", es: "Trabajo" } },
    { id: "timeline", label: { en: "Timeline", es: "Trayectoria" } },
    { id: "signals", label: { en: "Signals", es: "Métricas" } },
    { id: "about", label: { en: "About", es: "Perfil" } },
    { id: "contact", label: { en: "Contact", es: "Contacto" } },
  ],
};

export const chrome = {
  skip: { en: "Skip to main content", es: "Saltar al contenido principal" } as L<string>,
  langLabel: { en: "Language", es: "Idioma" } as L<string>,
  scrollHint: { en: "Scroll to fly through", es: "Desplázate para volar" } as L<string>,
  downloadCv: { en: "Download CV", es: "Descargar CV" } as L<string>,
  reducedNotice: {
    en: "Motion is reduced. Showing the calm, static version of this page.",
    es: "El movimiento está reducido. Mostrando la versión estática y tranquila de esta página.",
  } as L<string>,
  noWebglNotice: {
    en: "Your browser can't render the 3D scene. Showing the full content below.",
    es: "Tu navegador no puede renderizar la escena 3D. Mostrando el contenido completo abajo.",
  } as L<string>,
};

export const hero = {
  kicker: { en: "Senior Angular / Frontend Engineer", es: "Ingeniero Frontend Sénior (Angular)" } as L<string>,
  title: {
    en: "Shipping frontends that carry product risk since 2018.",
    es: "Entregando frontends que cargan con el riesgo de producto desde 2018.",
  } as L<string>,
  lede: {
    en: "Software developer since 2018, specialized in Angular since 2021. I work on authentication, SSR, accessibility, performance and API integration — the surfaces where a frontend decision becomes a product decision. This page is a flight through four sanitized case studies, a nine-role timeline and the numbers behind them.",
    es: "Desarrollador de software desde 2018, especializado en Angular desde 2021. Trabajo en autenticación, SSR, accesibilidad, rendimiento e integración de APIs: las superficies donde una decisión de frontend se convierte en una decisión de producto. Esta página es un vuelo por cuatro casos de estudio sanitizados, una trayectoria de nueve etapas y las cifras que hay detrás.",
  } as L<string>,
  location: {
    en: "Zaragoza, Spain · EU citizen · Remote or hybrid · Available for occasional travel · No relocation",
    es: "Zaragoza, España · Ciudadano UE · Remoto o híbrido · Disponibilidad para viajes puntuales · Sin reubicación",
  } as L<string>,
  cta1: { en: "Enter the field", es: "Entrar al campo" } as L<string>,
  cta2: { en: "Read as text", es: "Leer como texto" } as L<string>,
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "realtime-shopping-assistant",
    title: { en: "Real-time Shopping Assistant", es: "Asistente de compra en tiempo real" },
    tags: ["Angular", "TypeScript", "WebRTC", "OpenAI Realtime API", "SSR", "Accessibility"],
    summary: {
      en: "A controlled whitelist pilot with a 96% smaller LLM context payload — shipped to production, never opened to the public.",
      es: "Un piloto controlado mediante lista blanca con un payload de contexto del LLM un 96% más pequeño: llegó a producción, nunca se abrió al público.",
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
          en: "I implemented the Angular integration as a senior individual contributor, on a wider team effort with a co-lead alongside me.",
          es: "Implementé la integración en Angular como profesional sénior, dentro de un esfuerzo de equipo con otro responsable técnico a mi lado.",
        },
      },
      {
        label: { en: "The frontend problem", es: "El problema de frontend" },
        value: {
          en: "Manage the WebRTC lifecycle, initialize only on request, stay safe during server rendering, keep the model context bounded, and avoid any tracking before the customer opened the assistant.",
          es: "Gestionar el ciclo de vida de WebRTC, inicializar solo bajo demanda, mantenerse seguro durante el renderizado en servidor, acotar el contexto del modelo y evitar cualquier seguimiento antes de que el cliente abriera el asistente.",
        },
      },
      {
        label: { en: "Decisions", es: "Decisiones" },
        value: {
          en: "Lazy initialization, platform guards, a controlled feature flag, and a routing + context-stripping design for what reached the model.",
          es: "Inicialización diferida, protecciones de plataforma, una feature flag controlada y un diseño de enrutado y limpieza de contexto para lo que llegaba al modelo.",
        },
      },
      {
        label: { en: "Outcome", es: "Resultado" },
        value: {
          en: "Reached production as a controlled whitelist pilot, never opened to the public. LLM context payload fell from 570 KB to 22 KB per execution — a 96% reduction.",
          es: "Llegó a producción como piloto controlado mediante lista blanca, nunca abierto al público. El payload de contexto del LLM bajó de 570 KB a 22 KB por ejecución: una reducción del 96%.",
        },
      },
    ],
    note: {
      en: "Sanitized: no client source code, credentials, internal URLs or private implementation details.",
      es: "Sanitizado: sin código fuente del cliente, credenciales, URLs internas ni detalles privados de implementación.",
    },
  },
  {
    slug: "help-center-rollout",
    title: { en: "Help Center Rollout", es: "Despliegue del Centro de Ayuda" },
    tags: ["Angular", "SSR", "Feature Flags", "Accessibility"],
    summary: {
      en: "A conversational Help Center delivered market by market, SSR-safe from the first country to the last.",
      es: "Un Centro de Ayuda conversacional entregado mercado a mercado, seguro bajo SSR desde el primer país hasta el último.",
    },
    fields: [
      {
        label: { en: "Context", es: "Contexto" },
        value: {
          en: "A new conversational Help Center needed to roll out market by market without disturbing the existing entry points.",
          es: "Un nuevo Centro de Ayuda conversacional debía desplegarse mercado a mercado sin alterar los puntos de entrada existentes.",
        },
      },
      {
        label: { en: "Delivery", es: "Entrega" },
        value: {
          en: "I delivered the integration into the existing Angular routes and localized entry points across markets, with SSR-safe rendering and accessibility preserved throughout.",
          es: "Entregué la integración en las rutas Angular y los puntos de entrada localizados existentes en cada mercado, con renderizado seguro bajo SSR y accesibilidad preservada en todo el proceso.",
        },
      },
      {
        label: { en: "Rollout", es: "Despliegue" },
        value: {
          en: "The release expanded country by country, verifying SSR behavior, accessibility and route stability before each step.",
          es: "El lanzamiento se amplió país por país, verificando el comportamiento SSR, la accesibilidad y la estabilidad de las rutas antes de cada paso.",
        },
      },
      {
        label: { en: "Outcome", es: "Resultado" },
        value: {
          en: "The Help Center rolled out market by market with stable routes, localized titles, preserved accessibility and SSR support throughout.",
          es: "El Centro de Ayuda se desplegó mercado a mercado con rutas estables, títulos localizados, accesibilidad preservada y soporte SSR en todo momento.",
        },
      },
    ],
  },
  {
    slug: "passwordless-account-migration",
    title: { en: "Passwordless Account Migration", es: "Migración de cuentas sin contraseña" },
    tags: ["Angular", "Authentication", "OTP", "NgRx", "API Contracts"],
    summary: {
      en: "A contract-first migration to OTP authentication, delivered incrementally without breaking existing-password users.",
      es: "Una migración a autenticación OTP guiada por el contrato, entregada de forma incremental sin romper a los usuarios con contraseña existente.",
    },
    fields: [
      {
        label: { en: "Context", es: "Contexto" },
        value: {
          en: "The account area had to support both existing-password and passwordless users without disrupting established flows.",
          es: "El área de cuenta tenía que admitir usuarios con contraseña existente y sin contraseña, sin interrumpir los flujos ya establecidos.",
        },
      },
      {
        label: { en: "Contract analysis", es: "Análisis del contrato" },
        value: {
          en: "I mapped every UI dependency on authentication state (hasPassword) before touching a flow, then scoped implementation to what the verified contract actually supported.",
          es: "Mapeé cada dependencia de la interfaz respecto al estado de autenticación (hasPassword) antes de tocar ningún flujo, y acoté la implementación a lo que el contrato verificado realmente soportaba.",
        },
      },
      {
        label: { en: "Implementation", es: "Implementación" },
        value: {
          en: "Dual-path UX driven by hasPassword: separate password and OTP paths, including email change and password creation, with dependent actions gated by authentication state.",
          es: "UX de doble camino según hasPassword: rutas separadas de contraseña y OTP, incluyendo cambio de email y creación de contraseña, con acciones dependientes controladas por el estado de autenticación.",
        },
      },
      {
        label: { en: "Validation", es: "Validación" },
        value: {
          en: "Validated end-to-end on the pre-integration environment across four documented scenarios: existing-password behavior, passwordless forms, OTP email change and password creation.",
          es: "Validado de extremo a extremo en el entorno de preintegración en cuatro escenarios documentados: comportamiento con contraseña existente, formularios sin contraseña, cambio de email por OTP y creación de contraseña.",
        },
      },
      {
        label: { en: "Outcome", es: "Resultado" },
        value: {
          en: "Passwordless flows delivered incrementally, with existing account behavior never disrupted.",
          es: "Flujos sin contraseña entregados de forma incremental, sin interrumpir nunca el comportamiento existente de la cuenta.",
        },
      },
    ],
  },
  {
    slug: "engineering-controls",
    title: { en: "Engineering Controls for Frontend Delivery", es: "Controles de ingeniería para la entrega de frontend" },
    tags: ["GitHub", "Automated Review", "MCP", "Developer Tooling"],
    summary: {
      en: "An automated PR-review system that measured its own noise, retired 21 of 53 rules, and got adopted outside its own team.",
      es: "Un sistema de revisión automatizada de PRs que midió su propio ruido, retiró 21 de 53 reglas y fue adoptado fuera de su propio equipo.",
    },
    fields: [
      {
        label: { en: "Problem", es: "Problema" },
        value: {
          en: "Automated review can create the appearance of coverage while producing noise, duplicate feedback and rules nobody trusts.",
          es: "La revisión automatizada puede aparentar cobertura mientras produce ruido, comentarios duplicados y reglas en las que nadie confía.",
        },
      },
      {
        label: { en: "System", es: "Sistema" },
        value: {
          en: "I built a GitHub-connected review system with domain-specific checks, flagging injection, authorization and secrets-management defects before merge.",
          es: "Construí un sistema de revisión conectado a GitHub con comprobaciones específicas de dominio, que detectaba defectos de inyección, autorización y gestión de secretos antes de fusionar.",
        },
      },
      {
        label: { en: "Control loop", es: "Bucle de control" },
        value: {
          en: "The first version generated credibility problems. I measured its real output against what the team actually used, and retired 21 of its 53 rules.",
          es: "La primera versión generó problemas de credibilidad. Medí su salida real frente a lo que el equipo realmente usaba y retiré 21 de sus 53 reglas.",
        },
      },
      {
        label: { en: "Adoption", es: "Adopción" },
        value: {
          en: "A Teams CLI was merged into a shared Inditex engineering repository, and a documentation MCP server was separately adopted by the Android team.",
          es: "Una CLI de Teams se integró en un repositorio de ingeniería compartido de Inditex, y un servidor MCP de documentación fue adoptado por separado por el equipo de Android.",
        },
      },
    ],
  },
];

export const roles: Role[] = [
  {
    period: { en: "May 2025 – Jul 2026", es: "May 2025 – Jul 2026" },
    company: "Decskill Spain",
    client: "Zara Home (Inditex)",
    role: { en: "Senior Front-End Analyst (Angular)", es: "Analista Frontend Sénior (Angular)" },
    bullets: {
      en: [
        "Built the Angular frontend of an AI shopping assistant: real-time voice and text over WebRTC, released as a controlled pilot.",
        "Reduced LLM context payload from 570 KB to 22 KB per execution (96%) via routing and context stripping.",
        "Delivered a conversational Help Center market by market, SSR-safe with localized routes and accessibility preserved.",
        "Audited a 19 MB JS bundle, identified ~3.4 MB of removable weight; shipped dynamic imports (hls.js, html2canvas), lodash-es removal, Luxon → native Date.",
        "Delivered the passwordless (OTP) account migration; closed 34 WCAG 2.1 AA findings via 23 merged PRs.",
      ],
      es: [
        "Construí el frontend Angular de un asistente de compra con IA: voz y texto en tiempo real sobre WebRTC, publicado como piloto controlado.",
        "Reduje el payload de contexto del LLM de 570 KB a 22 KB por ejecución (96%) mediante enrutado y limpieza de contexto.",
        "Entregué un Centro de Ayuda conversacional mercado a mercado, seguro bajo SSR con rutas localizadas y accesibilidad preservada.",
        "Auditué un bundle JS de 19 MB e identifiqué ~3,4 MB de peso eliminable; entregué imports dinámicos (hls.js, html2canvas), eliminación de lodash-es y migración de Luxon a Date nativo.",
        "Entregué la migración de cuentas a OTP sin contraseña; cerré 34 hallazgos WCAG 2.1 AA con 23 PRs integrados.",
      ],
    },
  },
  {
    period: { en: "Mar 2024 – May 2025", es: "Mar 2024 – May 2025" },
    company: "Avanade",
    client: "UNIR",
    role: { en: "Senior Front-End Analyst (Angular)", es: "Analista Frontend Sénior (Angular)" },
    bullets: {
      en: [
        "Hands-on frontend technical reference: guided Angular architecture, component design and code-quality decisions across the team.",
        "Defined the core architecture: authentication flows, admin UI, centralized permissions and navigation.",
        "Refactored the Admissions module inside an Nx monorepo, removing circular dependencies and centralizing permissions logic.",
        "Introduced linting, formatting and unit testing to a back-office that had none, plus review protocols and quality gates.",
        "Mentored the team on Angular practices; received an Inspire Greatness award (August 2024).",
      ],
      es: [
        "Referencia técnica frontend: guié la arquitectura Angular, el diseño de componentes y las decisiones de calidad de código en el equipo.",
        "Definí la arquitectura principal: flujos de autenticación, UI de administración, permisos centralizados y navegación.",
        "Refactoricé el módulo de Admisiones dentro de un monorepo Nx, eliminando dependencias circulares y centralizando la lógica de permisos.",
        "Introduje linting, formateo y pruebas unitarias en un back-office que no tenía ninguno, además de protocolos de revisión.",
        "Mentoricé al equipo en prácticas Angular; recibí un premio Inspire Greatness (agosto 2024).",
      ],
    },
  },
  {
    period: { en: "Dec 2022 – Mar 2024", es: "Dic 2022 – Mar 2024" },
    company: "Vermont Solutions (Viewnext / IBM)",
    client: "Santander",
    role: { en: "Senior Front-End Developer (Angular)", es: "Desarrollador Frontend Sénior (Angular)" },
    bullets: {
      en: [
        "Senior Angular reference across three concurrent banking applications, leading delivery with backend, design and Scrum teams.",
        "Led a team of 5 on an internal mobile banking app; senior technical reference for a team of 4 on the internal real-estate portal.",
        "Built a transaction-monitoring dashboard with Chart.js and gesture interactions with HammerJS; owned ~80% of one project's frontend.",
        "Implemented Figma designs on Santander's Flame design system, with NgDarwin security/logging libraries, Storybook and Nexus.",
        "Kept quality high with Karma/Jasmine unit testing and SonarQube/ESLint/Fortify static analysis.",
      ],
      es: [
        "Referencia Angular sénior en tres aplicaciones bancarias simultáneas, liderando la entrega con backend, diseño y equipos Scrum.",
        "Lideré un equipo de 5 en una app bancaria móvil interna; referencia técnica sénior de un equipo de 4 en el portal inmobiliario interno.",
        "Construí un dashboard de monitorización de transacciones con Chart.js e interacciones gestuales con HammerJS; ~80% del frontend de un proyecto.",
        "Implementé diseños de Figma sobre el sistema de diseño Flame de Santander, con librerías de seguridad NgDarwin, Storybook y Nexus.",
        "Mantuve la calidad alta con pruebas unitarias Karma/Jasmine y análisis estático SonarQube/ESLint/Fortify.",
      ],
    },
  },
  {
    period: { en: "Oct – Dec 2022", es: "Oct – Dic 2022" },
    company: "CloudAPPi",
    client: "Regional Government of Madrid",
    role: { en: "Mid-Level Front-End Developer (Angular, React)", es: "Desarrollador Frontend Intermedio (Angular, React)" },
    bullets: {
      en: [
        "Built authentication flows and incremental improvements on Madrid Digital, a legacy Angular 8 monolith (Angular Material, RxJS).",
        "Also contributed to a React 17 project (Redux Toolkit, Material UI).",
      ],
      es: [
        "Construí flujos de autenticación y mejoras incrementales en Madrid Digital, un monolito Angular 8 heredado (Angular Material, RxJS).",
        "También contribuí a un proyecto React 17 (Redux Toolkit, Material UI).",
      ],
    },
  },
  {
    period: { en: "Sep 2021 – Oct 2022", es: "Sep 2021 – Oct 2022" },
    company: "ENZO (Rent & Buy S.A.)",
    client: null,
    role: { en: "Mid-Level Front-End Developer (Angular)", es: "Desarrollador Frontend Intermedio (Angular)" },
    bullets: {
      en: [
        "Moved from .NET into Angular frontend development on an existing AWS serverless architecture (Lambda, API Gateway, S3, CloudFront, SQS/SNS).",
        "Built reusable Angular components and authentication flows with AWS Cognito.",
        "Onboarded new team members on architecture and Angular practices; joined English-language client meetings.",
      ],
      es: [
        "Pasé de .NET al desarrollo frontend en Angular sobre una arquitectura serverless de AWS ya existente (Lambda, API Gateway, S3, CloudFront, SQS/SNS).",
        "Construí componentes Angular reutilizables y flujos de autenticación con AWS Cognito.",
        "Incorporé a nuevos miembros del equipo en arquitectura y prácticas Angular; participé en reuniones con cliente en inglés.",
      ],
    },
  },
  {
    period: { en: "Jun 2020 – Sep 2021", es: "Jun 2020 – Sep 2021" },
    company: "Independent Projects & Upskilling",
    client: null,
    role: { en: "", es: "" },
    bullets: {
      en: ["A deliberate 15-month break: WordPress development, office automation tooling, and structured frontend upskilling ahead of the move into Angular."],
      es: ["Una pausa deliberada de 15 meses: desarrollo en WordPress, herramientas de automatización de oficina y formación frontend estructurada antes del paso a Angular."],
    },
  },
  {
    period: { en: "Mar – Jun 2020", es: "Mar – Jun 2020" },
    company: "Altran (Capgemini)",
    client: null,
    role: { en: "Mid-Level Full Stack Developer (.NET)", es: "Desarrollador Full Stack Intermedio (.NET)" },
    bullets: { en: [], es: [] },
  },
  {
    period: { en: "Nov 2018 – Sep 2019", es: "Nov 2018 – Sep 2019" },
    company: "IO Digital (Query Software)",
    client: null,
    role: { en: "Mid-Level Full Stack Developer (.NET)", es: "Desarrollador Full Stack Intermedio (.NET)" },
    bullets: { en: [], es: [] },
  },
  {
    period: { en: "Jul – Nov 2018", es: "Jul – Nov 2018" },
    company: "STRATESYS",
    client: null,
    role: { en: "Junior Full Stack Developer (.NET)", es: "Desarrollador Full Stack Junior (.NET)" },
    bullets: { en: [], es: [] },
  },
];

export const stats: Stat[] = [
  {
    value: "96%",
    label: {
      en: "LLM context payload reduced (570 KB → 22 KB per execution) via routing and context stripping",
      es: "Reducción del payload de contexto del LLM (570 KB → 22 KB por ejecución) mediante enrutado y limpieza de contexto",
    },
  },
  {
    value: "Top 1.42%",
    label: {
      en: "Ranking on an independent Angular assessment by SkillValue, 95% score (Sep 2022)",
      es: "Posición en una evaluación independiente de Angular de SkillValue, 95% de puntuación (sep 2022)",
    },
  },
  {
    value: "34",
    label: {
      en: "WCAG 2.1 AA findings closed through 23 merged pull requests",
      es: "Hallazgos WCAG 2.1 AA cerrados mediante 23 pull requests integrados",
    },
  },
  {
    value: "21 / 53",
    label: {
      en: "Rules retired from his own automated review system after measuring real usage",
      es: "Reglas retiradas de su propio sistema de revisión automatizada tras medir el uso real",
    },
  },
  {
    value: "Adopted",
    label: {
      en: "Documentation MCP server adopted by the Android team, outside its origin platform",
      es: "Servidor MCP de documentación adoptado por el equipo de Android, fuera de su plataforma de origen",
    },
  },
];

export const quotes: Quote[] = [
  {
    quote: {
      en: "His knowledge of Angular is excellent, but what I really highlight is his willingness to help and share his experience. He applies good practices daily and promotes their adoption within the team.",
      es: "Su conocimiento en Angular es excelente, pero lo que realmente destaco de trabajar con él es su disposición para ayudar y compartir su experiencia. No solo aplica las buenas prácticas, también fomenta su adopción dentro del equipo.",
    },
    author: "José Luis Murcia Gámez",
    role: { en: "Frontend Developer, UNIR project (Avanade)", es: "Desarrollador Frontend, proyecto UNIR (Avanade)" },
  },
  {
    quote: {
      en: "Working with Marius has been a real pleasure. I especially highlight his initiative with AI tools applied to development, from which I learned a great deal working side by side with him.",
      es: "Trabajar con Marius ha sido un verdadero placer. Destaco especialmente su iniciativa con herramientas de IA aplicadas al desarrollo, de las que aprendí muchísimo trabajando codo con codo con él.",
    },
    author: "Juan Pablo Romero Pereira",
    role: { en: "Frontend Developer, Zara Home (Inditex)", es: "Desarrollador Frontend, Zara Home (Inditex)" },
  },
];

export const about = {
  heading: { en: "Background", es: "Perfil" } as L<string>,
  body: {
    en: [
      "Software developer since 2018, specialized in Angular and TypeScript since 2021. I've built products for global e-commerce (Zara Home), banking (Santander) and online education (UNIR).",
      "My full-stack .NET/C# background (2018–2020) shapes how I think about authentication and API contracts — I design frontend flows knowing what the backend contract has to guarantee.",
      "Higher Technician in Multi-platform Applications Development, Joyfe College, Madrid (2017–2018). Green Software for Practitioners certificate, Linux Foundation + Green Software Foundation (2025). Spanish and Romanian native; English at professional working proficiency.",
    ],
    es: [
      "Desarrollador de software desde 2018, especializado en Angular y TypeScript desde 2021. He construido productos para comercio electrónico global (Zara Home), banca (Santander) y educación en línea (UNIR).",
      "Mi base full stack en .NET/C# (2018–2020) da forma a cómo pienso la autenticación y los contratos de API: diseño flujos de frontend sabiendo lo que el contrato del backend tiene que garantizar.",
      "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma, Joyfe College, Madrid (2017–2018). Certificado Green Software for Practitioners, Linux Foundation + Green Software Foundation (2025). Español y rumano nativos; inglés con dominio profesional de trabajo.",
    ],
  } as L<string[]>,
};

export const contact = {
  heading: { en: "Get in touch", es: "Contacto" } as L<string>,
  body: {
    en: "Remote or hybrid from Zaragoza, available for occasional travel. EU citizen, authorized to work across the EU/EEA without sponsorship. No relocation.",
    es: "Remoto o híbrido desde Zaragoza, con disponibilidad para viajes puntuales. Ciudadano de la UE, autorizado a trabajar en la UE/EEE sin patrocinio. Sin reubicación.",
  } as L<string>,
  email: "mihailmariusion@gmail.com",
  linkedin: "https://linkedin.com/in/mariusdev",
  github: "https://github.com/mihailmariusiondev",
  cvEn: "./assets/marius-mihail-ion-cv.pdf",
  cvEs: "./assets/marius-mihail-ion-cv-es.pdf",
};
