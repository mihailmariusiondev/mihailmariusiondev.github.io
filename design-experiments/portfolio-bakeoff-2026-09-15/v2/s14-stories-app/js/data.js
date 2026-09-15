// All copy in one bilingual object: {en, es} pairs. Facts sourced from
// _context/{facts.json, DOSSIER.md, caseStudies.ts, experience.ts, ui.ts,
// RETRACTED.md}. Never edit numbers/claims here without checking those files.
window.SITE = {
  identity: {
    name: "Marius Mihail Ion",
    title: { en: "Senior Angular / Frontend Engineer", es: "Ingeniero Frontend Sénior (Angular)" },
    location: { en: "Zaragoza, Spain", es: "Zaragoza, España" },
  },

  contact: {
    email: "mihailmariusion@gmail.com",
    linkedin: "https://linkedin.com/in/mariusdev",
    github: "https://github.com/mihailmariusiondev",
    cvEn: "assets/cv-en.pdf",
    cvEs: "assets/cv-es.pdf",
  },

  hero: {
    title: { en: "Enterprise frontend for e-commerce, banking and education.", es: "Frontend corporativo para comercio electrónico, banca y educación." },
    body: {
      en: "Software developer since 2018, specialized in Angular since 2021. Tap a story below.",
      es: "Desarrollador de software desde 2018, especializado en Angular desde 2021. Toca una historia.",
    },
  },

  rolesHeading: { en: "Career timeline", es: "Trayectoria profesional" },

  sidePanel: {
    heading: { en: "At a glance", es: "De un vistazo" },
    contact: { en: "Start a conversation", es: "Iniciar conversación" },
    proofs: [
      {
        value: "570 KB → 22 KB",
        label: {
          en: "LLM context payload per execution, reduced by 96% through routing and context stripping.",
          es: "Payload de contexto del LLM por ejecución, reducido un 96% mediante enrutado y limpieza de contexto.",
        },
      },
      {
        value: "34",
        label: {
          en: "Findings closed from a formal WCAG 2.1 AA accessibility audit.",
          es: "Hallazgos cerrados de una auditoría formal de accesibilidad WCAG 2.1 AA.",
        },
      },
      {
        value: "≈3.4 MB",
        label: {
          en: "Removable weight identified in an audited 19 MB JavaScript bundle.",
          es: "Peso eliminable identificado en un paquete JavaScript auditado de 19 MB.",
        },
      },
    ],
    hint: {
      en: "This is a phone-shaped app, presented in a desktop scene — try Roles and Connect too.",
      es: "Es una app con forma de teléfono, presentada en una escena de escritorio: prueba también Trayectoria y Contacto.",
    },
  },

  ui: {
    tabStories: { en: "Stories", es: "Historias" },
    tabRoles: { en: "Roles", es: "Trayectoria" },
    tabConnect: { en: "Connect", es: "Contacto" },
    skipLink: { en: "Skip to main content", es: "Saltar al contenido principal" },
    langSwitch: { en: "ES", es: "EN" },
    langLabel: { en: "Language", es: "Idioma" },
    holdHint: { en: "Tap a side or use the controls below", es: "Toca un lado o usa los controles de abajo" },
    reducedHint: { en: "Reduced motion: use the arrows below", es: "Movimiento reducido: usa las flechas" },
    close: { en: "Close story", es: "Cerrar historia" },
    prev: { en: "Previous", es: "Anterior" },
    next: { en: "Next", es: "Siguiente" },
    dragHint: { en: "Drag or use ← →", es: "Arrastra o usa ← →" },
    downloadCv: { en: "Download CV", es: "Descargar CV" },
    cvEnLabel: { en: "CV (English)", es: "CV (inglés)" },
    cvEsLabel: { en: "CV (Spanish)", es: "CV (español)" },
    emailLabel: { en: "Email", es: "Correo electrónico" },
    linkedinLabel: { en: "LinkedIn", es: "LinkedIn" },
    githubLabel: { en: "GitHub", es: "GitHub" },
    recsHeading: { en: "What people say", es: "Lo que dicen" },
    connectHeading: { en: "Let's talk", es: "Hablemos" },
    connectLede: {
      en: "Remote or hybrid from Zaragoza. Permanent or B2B. Available for occasional travel. EU citizen, authorized to work across the EU/EEA without sponsorship.",
      es: "Remoto o híbrido desde Zaragoza. Indefinido o B2B. Disponibilidad para viajes puntuales. Ciudadano de la UE, autorizado a trabajar en toda la UE/EEE sin patrocinio.",
    },
    ringOpen: { en: "Open story", es: "Abrir historia" },
    watched: { en: "Watched", es: "Vista" },
    a11yNote: {
      en: "Targets WCAG 2.1 AA: visible focus states, ordered headings, checked contrast, motion disabled with reduced-motion.",
      es: "Cumple el objetivo WCAG 2.1 AA: foco visible, encabezados ordenados, contraste verificado, animación desactivada con movimiento reducido.",
    },
    slideOf: { en: "Slide", es: "Diapositiva" },
    recap: { heading: { en: "Verified results, in brief", es: "Resultados verificados, en breve" } },
  },

  // Stories rail. Each story = a ring in the home rail + a sequence of slides.
  // Slide kind drives the visual template in app.js: "hero" | "field" | "stat" | "outro".
  stories: [
    {
      id: "intro",
      accent: "neutral",
      ring: { en: "Intro", es: "Intro" },
      slides: [
        {
          kind: "hero",
          eyebrow: { en: "Senior Angular / Frontend Engineer", es: "Ingeniero Frontend Sénior (Angular)" },
          title: { en: "Enterprise frontend for e-commerce, banking and education.", es: "Frontend corporativo para comercio electrónico, banca y educación." },
          body: {
            en: "Software developer since 2018, specialized in Angular since 2021. I work on authentication, SSR, accessibility, performance and API integration: the points where frontend decisions carry product risk.",
            es: "Desarrollador de software desde 2018, especializado en Angular desde 2021. Trabajo en autenticación, SSR, accesibilidad, rendimiento e integración de APIs: los puntos donde las decisiones de frontend arrastran riesgo de producto.",
          },
        },
        {
          kind: "field",
          label: { en: "Domains", es: "Dominios" },
          title: { en: "Three regulated, large-scale worlds.", es: "Tres mundos regulados y de gran escala." },
          body: {
            en: "Global e-commerce at Zara Home (Inditex), banking at Santander, online education at UNIR — each with its own constraints, not a portfolio of toy apps.",
            es: "Comercio electrónico global en Zara Home (Inditex), banca en Santander, educación en línea en UNIR: cada uno con sus propias restricciones, no un portafolio de proyectos de juguete.",
          },
        },
        {
          kind: "field",
          label: { en: "Background", es: "Trayectoria" },
          title: { en: "From .NET to Angular, on purpose.", es: "De .NET a Angular, con intención." },
          body: {
            en: "Full-stack .NET/C# from 2018 to 2020, a deliberate break for independent projects and upskilling, then Angular specialization from ENZO onward (September 2021).",
            es: "Full stack en .NET/C# entre 2018 y 2020, una pausa deliberada para proyectos propios y formación, y especialización en Angular desde ENZO en adelante (septiembre de 2021).",
          },
        },
        {
          kind: "field",
          label: { en: "Where I work from", es: "Dónde trabajo" },
          title: { en: "Based in Zaragoza, Spain.", es: "Con base en Zaragoza, España." },
          body: {
            en: "EU citizen · Remote or hybrid from Zaragoza · Available for occasional travel.",
            es: "Ciudadano de la UE · Remoto o híbrido desde Zaragoza · Disponibilidad para viajes puntuales.",
          },
        },
      ],
    },
    {
      id: "realtime-shopping-assistant",
      accent: "amber",
      ring: { en: "AI Assistant", es: "Asistente IA" },
      title: { en: "Real-time Shopping Assistant", es: "Asistente de compra en tiempo real" },
      tags: ["Angular", "TypeScript", "WebRTC", "OpenAI Realtime API", "SSR", "Accessibility"],
      slides: [
        {
          kind: "hero",
          eyebrow: { en: "Case study", es: "Caso" },
          title: { en: "Real-time Shopping Assistant", es: "Asistente de compra en tiempo real" },
          body: {
            en: "A controlled whitelist pilot: a 96% smaller LLM context payload, SSR-compatible and never opened to the public.",
            es: "Un piloto controlado mediante lista blanca: un payload de contexto del LLM un 96% más pequeño, compatible con SSR y nunca abierto al público.",
          },
        },
        {
          kind: "field",
          label: { en: "Context", es: "Contexto" },
          body: {
            en: "A global, multi-market e-commerce frontend needed a conversational shopping experience with voice, text and product context.",
            es: "Un frontend de comercio electrónico global y multimercado necesitaba una experiencia de compra conversacional con voz, texto y contexto de producto.",
          },
        },
        {
          kind: "field",
          label: { en: "My role", es: "Mi papel" },
          body: {
            en: "I implemented the Angular integration as a senior individual contributor. The wider product was a team effort, with a co-lead alongside me.",
            es: "Implementé la integración en Angular como profesional sénior. El producto en su conjunto fue un trabajo de equipo, con otro responsable técnico a mi lado.",
          },
        },
        {
          kind: "field",
          label: { en: "The frontend problem", es: "El problema de frontend" },
          body: {
            en: "Manage the WebRTC lifecycle, initialize only when requested, stay safe during server rendering, keep the model context bounded, avoid tracking before the customer opened the assistant.",
            es: "Gestionar el ciclo de vida de WebRTC, inicializarse solo cuando se pedía, ser segura bajo renderizado en servidor, mantener acotado el contexto del modelo y evitar seguimiento antes de abrir el asistente.",
          },
        },
        {
          kind: "stat",
          value: "570 KB → 22 KB",
          label: { en: "LLM context payload per execution, a 96% reduction via routing and context-stripping.", es: "Payload de contexto del LLM por ejecución, una reducción del 96% mediante enrutado y limpieza de contexto." },
        },
        {
          kind: "field",
          label: { en: "Outcome", es: "Resultado" },
          body: {
            en: "The code reached production as a controlled whitelist pilot and was never opened to the public.",
            es: "El código llegó a producción como piloto controlado mediante lista blanca y nunca se abrió al público.",
          },
        },
        {
          kind: "outro",
          label: { en: "What this demonstrates", es: "Qué demuestra" },
          body: {
            en: "Angular integration work, asynchronous lifecycle management, SSR safety, accessibility, controlled rollout and measurable context design.",
            es: "Trabajo de integración en Angular, gestión de ciclos de vida asíncronos, seguridad bajo SSR, accesibilidad, despliegue controlado y diseño de contexto medible.",
          },
          confidential: {
            en: "Sanitized case study: no client source code, credentials, internal URLs or private implementation details.",
            es: "Caso sanitizado: sin código fuente del cliente, credenciales, URLs internas ni detalles privados de implementación.",
          },
        },
      ],
    },
    {
      id: "help-center-rollout",
      accent: "teal",
      ring: { en: "Help Center", es: "Centro de Ayuda" },
      title: { en: "Help Center Rollout", es: "Despliegue del Centro de Ayuda" },
      tags: ["Angular", "SSR", "Feature Flags", "Observability", "Accessibility"],
      slides: [
        {
          kind: "hero",
          eyebrow: { en: "Case study", es: "Caso" },
          title: { en: "Help Center Rollout", es: "Despliegue del Centro de Ayuda" },
          body: {
            en: "A country-by-country Help Center rollout with SSR-safe Angular integration, stable routes and accessible localized experiences.",
            es: "Un despliegue del Centro de Ayuda país por país con integración Angular compatible con SSR, rutas estables y experiencias localizadas accesibles.",
          },
        },
        {
          kind: "field",
          label: { en: "Context", es: "Contexto" },
          body: {
            en: "A new conversational Help Center rolled out market by market, with SSR-safe Angular integration, localized routes and accessibility preserved, without changing the existing entry points.",
            es: "Un nuevo Centro de Ayuda conversacional se desplegó mercado a mercado, con integración Angular compatible con SSR, rutas localizadas y accesibilidad preservada, sin cambiar los puntos de entrada existentes.",
          },
        },
        {
          kind: "field",
          label: { en: "Delivery", es: "Entrega" },
          body: {
            en: "I integrated the conversational experience into the existing Angular routes and localized entry points across markets.",
            es: "Integré la experiencia conversacional en las rutas Angular y los puntos de entrada localizados existentes en cada mercado.",
          },
        },
        {
          kind: "field",
          label: { en: "Rollout", es: "Despliegue" },
          body: {
            en: "The release expanded market by market, with SSR behavior, accessibility and route stability verified before each step.",
            es: "El lanzamiento avanzó mercado a mercado, verificando antes de cada paso el comportamiento bajo SSR, la accesibilidad y la estabilidad de las rutas.",
          },
        },
        {
          kind: "field",
          label: { en: "Risk control", es: "Control de riesgo" },
          body: {
            en: "The integration preserved existing entry points and user-facing behavior while the new experience expanded.",
            es: "La integración preservó los puntos de entrada y el comportamiento visible para el usuario mientras se ampliaba la nueva experiencia.",
          },
        },
        {
          kind: "outro",
          label: { en: "What this demonstrates", es: "Qué demuestra" },
          body: {
            en: "Angular delivery, SSR, accessibility, staged rollout and risk control across localized markets.",
            es: "Entrega Angular, SSR, accesibilidad, despliegue gradual y control de riesgo entre mercados localizados.",
          },
        },
      ],
    },
    {
      id: "passwordless-account-migration",
      accent: "violet",
      ring: { en: "Passwordless", es: "Sin contraseña" },
      title: { en: "Passwordless Account Migration", es: "Migración a autenticación sin contraseña" },
      tags: ["Angular", "Authentication", "API Contracts", "OTP", "NgRx", "Integration Testing"],
      slides: [
        {
          kind: "hero",
          eyebrow: { en: "Case study", es: "Caso" },
          title: { en: "Passwordless Account Migration", es: "Migración a autenticación sin contraseña" },
          body: {
            en: "A contract-first passwordless migration with separate password and OTP paths, delivered through incremental scope and end-to-end validation.",
            es: "Una migración sin contraseña guiada por contratos, con caminos separados para contraseña y OTP, alcance incremental y validación de extremo a extremo.",
          },
        },
        {
          kind: "field",
          label: { en: "Context", es: "Contexto" },
          body: {
            en: "The account area had to support both existing-password and passwordless users without disrupting established flows.",
            es: "El área de cuenta tenía que admitir usuarios con contraseña y sin ella sin interrumpir los flujos existentes.",
          },
        },
        {
          kind: "field",
          label: { en: "Contract analysis", es: "Análisis del contrato" },
          body: {
            en: "I mapped the UI dependencies and authentication states, driven by hasPassword, before changing the flows, then scoped the implementation around the verified contract.",
            es: "Mapeé las dependencias de la interfaz y los estados de autenticación, guiados por hasPassword, antes de cambiar los flujos, y acoté la implementación al contrato verificado.",
          },
        },
        {
          kind: "field",
          label: { en: "Implementation", es: "Implementación" },
          body: {
            en: "Separate password and OTP paths, including email change and password creation, with dependent actions gated by authentication state.",
            es: "Caminos separados para contraseña y OTP, incluido el cambio de correo y la creación de contraseña, con las acciones dependientes gobernadas por el estado de autenticación.",
          },
        },
        {
          kind: "stat",
          value: "4",
          label: { en: "Documented OTP validation scenarios, verified end-to-end in the pre-integration environment.", es: "Escenarios de validación OTP documentados, verificados de extremo a extremo en preintegración." },
        },
        {
          kind: "outro",
          label: { en: "What this demonstrates", es: "Qué demuestra" },
          body: {
            en: "Contract-first frontend integration, authentication state, scope control, backward compatibility and risk-based decision-making.",
            es: "Integración de frontend con el contrato por delante, estado de autenticación, control del alcance, retrocompatibilidad y decisiones basadas en riesgo.",
          },
        },
      ],
    },
    {
      id: "engineering-controls",
      accent: "cyan",
      ring: { en: "Eng. Controls", es: "Controles" },
      title: { en: "Engineering Controls for Frontend Delivery", es: "Controles de ingeniería para la entrega de frontend" },
      tags: ["GitHub", "Automated Review", "Prompt & Context Engineering", "MCP", "Developer Tooling"],
      slides: [
        {
          kind: "hero",
          eyebrow: { en: "Case study", es: "Caso" },
          title: { en: "Engineering Controls for Frontend Delivery", es: "Controles de ingeniería para la entrega" },
          body: {
            en: "An automated review system that measured its own noise, retired 21 of its 53 rules, and got adopted outside its origin team.",
            es: "Un sistema de revisión automatizada que midió su propio ruido, retiró 21 de sus 53 reglas y acabó adoptado fuera de su equipo de origen.",
          },
        },
        {
          kind: "field",
          label: { en: "Problem", es: "Problema" },
          body: {
            en: "Automated review can create the appearance of coverage while producing noise, duplicate feedback and rules the team does not trust.",
            es: "La revisión automatizada puede aparentar cobertura mientras produce ruido, comentarios duplicados y reglas en las que el equipo no confía.",
          },
        },
        {
          kind: "field",
          label: { en: "System", es: "Sistema" },
          body: {
            en: "A GitHub-connected review system with domain-specific checks, flagging injection, authorization and secrets-management defects before merge.",
            es: "Un sistema de revisión conectado a GitHub con comprobaciones específicas del dominio, que detectaba defectos de inyección, autorización y gestión de secretos antes de la integración.",
          },
        },
        {
          kind: "stat",
          value: "21 / 53",
          label: { en: "Rules retired after measuring real output against what the team actually used.", es: "Reglas retiradas tras medir la salida real frente a lo que el equipo usaba de verdad." },
        },
        {
          kind: "field",
          label: { en: "Adoption", es: "Adopción" },
          body: {
            en: "A Teams CLI was merged into a shared Inditex engineering repository, and a documentation MCP was adopted by the Android team.",
            es: "Una CLI de Teams se integró en un repositorio de ingeniería compartido de Inditex, y un MCP de documentación fue adoptado por el equipo de Android.",
          },
        },
        {
          kind: "outro",
          label: { en: "What this demonstrates", es: "Qué demuestra" },
          body: {
            en: "The useful signal is not that an LLM was present. It is that the automation had boundaries, measurement, rejection criteria and adoption outside its original team.",
            es: "La señal útil no es que hubiera un LLM de por medio. Es que la automatización tenía límites, medición, criterios de rechazo y adopción fuera de su equipo original.",
          },
        },
      ],
    },
    {
      id: "impact",
      accent: "rose",
      ring: { en: "Impact", es: "Impacto" },
      slides: [
        {
          kind: "hero",
          eyebrow: { en: "Verified results", es: "Resultados verificados" },
          title: { en: "Numbers I can back.", es: "Números que puedo respaldar." },
          body: { en: "Five outcomes, all traceable to a role or case study above.", es: "Cinco resultados, todos trazables a un puesto o caso anterior." },
        },
        { kind: "stat", value: "96%", label: { en: "Reduction in the AI shopping assistant's LLM context payload (570 KB to 22 KB per execution).", es: "Reducción del payload de contexto del LLM del asistente de compra (de 570 KB a 22 KB por ejecución)." } },
        { kind: "stat", value: "Top 1.42%", label: { en: "Ranking among all candidates on an independent Angular assessment by SkillValue, 95% score.", es: "Posición entre el 1,42% de los mejores candidatos en una evaluación independiente de Angular de SkillValue, 95%." } },
        { kind: "stat", value: "34", label: { en: "WCAG 2.1 AA audit findings closed through 23 merged pull requests.", es: "Hallazgos de una auditoría WCAG 2.1 AA cerrados con 23 solicitudes de cambio integradas." } },
        { kind: "stat", value: "21 of 53", label: { en: "Rules retired from my own automated review system after measuring real usage.", es: "Reglas retiradas de mi propio sistema de revisión automatizada tras medir el uso real." } },
        { kind: "stat", value: { en: "Adopted", es: "Adoptado" }, label: { en: "Internal documentation MCP tool adopted by the Android team, outside its origin platform.", es: "Herramienta interna de documentación (MCP) adoptada por el equipo de Android, fuera de su plataforma de origen." } },
      ],
    },
  ],

  // Career timeline for the swipeable role deck, most recent first.
  roles: [
    {
      period: { en: "May 2025 – Jul 2026", es: "May 2025 – Jul 2026" },
      company: "Decskill Spain",
      client: "Zara Home (Inditex)",
      role: { en: "Senior Front-End Analyst (Angular)", es: "Analista Frontend Sénior (Angular)" },
      note: { en: "AI shopping assistant, Help Center rollout, bundle audit, passwordless migration, WCAG audit.", es: "Asistente de compra con IA, despliegue del Centro de Ayuda, auditoría de bundle, migración sin contraseña, auditoría WCAG." },
    },
    {
      period: { en: "Mar 2024 – May 2025", es: "Mar 2024 – May 2025" },
      company: "Avanade",
      client: "UNIR",
      role: { en: "Senior Front-End Analyst (Angular)", es: "Analista Frontend Sénior (Angular)" },
      note: { en: "Hands-on architecture reference; introduced linting, formatting and tests to a back-office with none.", es: "Referencia técnica de arquitectura; introdujo linting, formato y tests en un back-office que no tenía ninguno." },
    },
    {
      period: { en: "Dec 2022 – Mar 2024", es: "Dic 2022 – Mar 2024" },
      company: "Vermont Solutions (Viewnext / IBM)",
      client: "Santander",
      role: { en: "Senior Front-End Developer (Angular)", es: "Desarrollador Frontend Sénior (Angular)" },
      note: { en: "Led a team of 5; senior reference for a team of 4; Chart.js dashboards; ~80% ownership on one project.", es: "Lideró un equipo de 5; referencia sénior para un equipo de 4; dashboards con Chart.js; ~80% de propiedad en un proyecto." },
    },
    {
      period: { en: "Oct 2022 – Dec 2022", es: "Oct 2022 – Dic 2022" },
      company: "CloudAPPi",
      client: { en: "Regional Government of Madrid", es: "Comunidad de Madrid" },
      role: { en: "Mid-Level Front-End Developer (Angular, React)", es: "Desarrollador Frontend Intermedio (Angular, React)" },
      note: { en: "Authentication flows on a legacy Angular 8 monolith; contributed to a React 17 project.", es: "Flujos de autenticación en un monolito heredado de Angular 8; contribuyó a un proyecto React 17." },
    },
    {
      period: { en: "Sep 2021 – Oct 2022", es: "Sep 2021 – Oct 2022" },
      company: "ENZO (Rent & Buy S.A.)",
      client: null,
      role: { en: "Mid-Level Front-End Developer (Angular)", es: "Desarrollador Frontend Intermedio (Angular)" },
      note: { en: "Moved from .NET into Angular on an existing AWS serverless stack (Lambda, Cognito, API Gateway).", es: "Pasó de .NET a Angular sobre una arquitectura AWS serverless existente (Lambda, Cognito, API Gateway)." },
    },
    {
      period: { en: "Jun 2020 – Sep 2021", es: "Jun 2020 – Sep 2021" },
      company: { en: "Independent Projects & Upskilling", es: "Proyectos propios y formación" },
      client: null,
      role: { en: "Career break", es: "Pausa profesional" },
      note: { en: "WordPress development, office automation tooling, structured frontend upskilling.", es: "Desarrollo en WordPress, automatización de ofimática, formación estructurada en frontend." },
    },
    {
      period: { en: "Mar 2020 – Jun 2020", es: "Mar 2020 – Jun 2020" },
      company: "Altran (Capgemini)",
      client: null,
      role: { en: "Mid-Level Full Stack Developer (.NET)", es: "Desarrollador Full Stack Intermedio (.NET)" },
      note: null,
    },
    {
      period: { en: "Nov 2018 – Sep 2019", es: "Nov 2018 – Sep 2019" },
      company: "IO Digital (Query Software)",
      client: null,
      role: { en: "Mid-Level Full Stack Developer (.NET)", es: "Desarrollador Full Stack Intermedio (.NET)" },
      note: null,
    },
    {
      period: { en: "Jul 2018 – Nov 2018", es: "Jul 2018 – Nov 2018" },
      company: "STRATESYS",
      client: null,
      role: { en: "Junior Full Stack Developer (.NET)", es: "Desarrollador Full Stack Junior (.NET)" },
      note: null,
    },
  ],

  recommendations: [
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
        en: "His knowledge of Angular is excellent, but what I really highlight from working with him is his willingness to help and share his experience, and his focus on good practices.",
        es: "Su conocimiento en Angular es excelente, pero lo que realmente destaco de trabajar con él es su disposición para ayudar y compartir su experiencia, y su enfoque en las buenas prácticas.",
      },
      author: "José Luis Murcia Gámez",
      role: { en: "Frontend Developer, UNIR project (Avanade)", es: "Desarrollador Frontend, proyecto UNIR (Avanade)" },
    },
  ],

  meta: {
    title: { en: "Marius Mihail Ion · Senior Angular / Frontend Engineer", es: "Marius Mihail Ion · Ingeniero Frontend Sénior (Angular)" },
    description: {
      en: "Senior Angular / Frontend Engineer for enterprise e-commerce, banking and education frontends. Explore the work as a stories app: tap through case studies, swipe the role history.",
      es: "Ingeniero Frontend Sénior (Angular) para frontends corporativos de comercio electrónico, banca y educación. Explora el trabajo como una app de historias: casos en formato historia, trayectoria deslizable.",
    },
  },
};
