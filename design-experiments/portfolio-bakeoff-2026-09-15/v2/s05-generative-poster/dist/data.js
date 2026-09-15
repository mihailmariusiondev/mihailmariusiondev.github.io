// All copy, bilingual. Facts sourced from _context (facts.json / experience.ts /
// caseStudies.ts / ui.ts / cv-en.txt / cv-es.txt / RETRACTED.md). Nothing invented.
window.SITE = {
  meta: {
    en: {
      title: "Marius Mihail Ion — Senior Angular / Frontend Engineer",
      description:
        "A generative poster built from real numbers: 570→22 KB, top 1.42%, 34/23, 21/53. Senior Angular / Frontend Engineer, Zaragoza.",
    },
    es: {
      title: "Marius Mihail Ion — Ingeniero Frontend Sénior (Angular)",
      description:
        "Un póster generativo construido con cifras reales: 570→22 KB, 1,42% superior, 34/23, 21/53. Ingeniero Frontend Sénior (Angular), Zaragoza.",
    },
  },

  nav: {
    en: ["Signal", "Results", "Work", "Timeline", "Contact"],
    es: ["Señal", "Resultados", "Trabajo", "Trayectoria", "Contacto"],
  },

  hero: {
    eyebrow: { en: "Plate 00 — Signal", es: "Lámina 00 — Señal" },
    name: "Marius Mihail Ion",
    role: {
      en: "Senior Angular / Frontend Engineer",
      es: "Ingeniero Frontend Sénior (Angular)",
    },
    lede: {
      en: "Software developer since 2018, specialized in Angular since 2021. I work on authentication, SSR, accessibility, performance and API integration: the points where frontend decisions carry product risk.",
      es: "Desarrollador de software desde 2018, especializado en Angular desde 2021. Trabajo en autenticación, SSR, accesibilidad, rendimiento e integración de APIs: los puntos donde las decisiones de frontend arrastran riesgo de producto.",
    },
    location: {
      en: "Zaragoza, Spain · EU citizen · Remote or hybrid from Zaragoza · Available for occasional travel",
      es: "Zaragoza, España · Ciudadano de la UE · Remoto o híbrido desde Zaragoza · Disponibilidad para viajes puntuales",
    },
    ctaCases: { en: "View case studies", es: "Ver casos" },
    ctaCv: { en: "Download CV", es: "Descargar CV" },
    canvasCaption: {
      en: "570 nodes → 22. The AI shopping assistant's LLM context payload, drawn to scale.",
      es: "570 nodos → 22. El payload de contexto del LLM del asistente de compra con IA, a escala.",
    },
  },

  stats: {
    heading: { en: "Plate 01 — Verified results", es: "Lámina 01 — Resultados verificados" },
    lede: {
      en: "Each figure below is drawn, not typeset: the exact count from the fact sits inside the canvas.",
      es: "Cada cifra de abajo está dibujada, no solo compuesta: el recuento exacto del hecho vive dentro del lienzo.",
    },
    items: [
      {
        sketch: "shrink",
        value: { en: "570 KB → 22 KB", es: "570 KB → 22 KB" },
        sub: { en: "96% reduction", es: "Reducción del 96%" },
        label: {
          en: "Reduction in the AI shopping assistant's LLM context payload, achieved with a routing and context-stripping design",
          es: "Reducción del payload de contexto del LLM del asistente de compra con IA, lograda con un diseño de enrutado y limpieza de contexto",
        },
      },
      {
        sketch: "funnel",
        value: { en: "Top 1.42%", es: "1,42 %" },
        sub: { en: "95% score", es: "Puntuación del 95 %" },
        label: {
          en: "Ranking among all candidates on an independent Angular assessment by SkillValue",
          es: "Posición entre los mejores candidatos en una evaluación independiente de Angular de SkillValue",
        },
      },
      {
        sketch: "grid34",
        value: { en: "34 / 23", es: "34 / 23" },
        sub: { en: "findings / merged PRs", es: "hallazgos / PRs integradas" },
        label: {
          en: "Accessibility findings from a formal WCAG 2.1 AA audit closed through 23 merged pull requests: headings, keyboard, ARIA and focus",
          es: "Hallazgos de accesibilidad de una auditoría formal WCAG 2.1 AA cerrados con 23 solicitudes de cambio integradas: encabezados, teclado, ARIA y foco",
        },
      },
      {
        sketch: "prune",
        value: { en: "21 of 53", es: "21 de 53" },
        sub: { en: "rules retired", es: "reglas retiradas" },
        label: {
          en: "Rules retired from my own automated review system after measuring its real output against what the team actually used",
          es: "Reglas retiradas de mi propio sistema de revisión automatizada tras medir su salida real frente a lo que el equipo usaba de verdad",
        },
      },
      {
        sketch: "adopt",
        value: { en: "Adopted", es: "Adoptado" },
        sub: { en: "outside its origin team", es: "fuera de su equipo de origen" },
        label: {
          en: "Internal documentation tooling (an MCP server) adopted by the Android team, outside its origin platform",
          es: "Herramienta interna de documentación (un servidor MCP) adoptada por el equipo de Android, fuera de su plataforma de origen",
        },
      },
    ],
  },

  work: {
    heading: { en: "Plate 02 — Case studies", es: "Lámina 02 — Casos" },
    lede: {
      en: "The case studies document real work already completed; they are not toy projects created for recruitment.",
      es: "Los casos documentan trabajo real ya completado; no son proyectos de juguete creados para buscar empleo.",
    },
    sanitized: {
      en: "This case study is sanitized. It contains no client source code, credentials, internal URLs or private implementation details.",
      es: "Este caso está sanitizado. No contiene código fuente del cliente, credenciales, URLs internas ni detalles privados de implementación.",
    },
    demonstrates: { en: "What this demonstrates", es: "Qué demuestra" },
    items: [
      {
        slug: "realtime-shopping-assistant",
        tags: ["Angular", "TypeScript", "WebRTC", "OpenAI Realtime API", "SSR"],
        title: { en: "Real-time Shopping Assistant", es: "Asistente de compra en tiempo real" },
        summary: {
          en: "A controlled whitelist pilot: a 96% smaller LLM context payload, SSR-compatible and never opened to the public.",
          es: "Un piloto controlado mediante lista blanca: un payload de contexto del LLM un 96% más pequeño, compatible con SSR y nunca abierto al público.",
        },
        fields: [
          { l: { en: "Context", es: "Contexto" }, v: { en: "A global, multi-market e-commerce frontend needed a conversational shopping experience with voice, text and product context.", es: "Un frontend de comercio electrónico global y multimercado necesitaba una experiencia de compra conversacional con voz, texto y contexto de producto." } },
          { l: { en: "My role", es: "Mi papel" }, v: { en: "I implemented the Angular integration as a senior individual contributor. The wider product was a team effort, with a co-lead alongside me.", es: "Implementé la integración en Angular como profesional sénior. El producto en su conjunto fue un trabajo de equipo, con otro responsable técnico a mi lado." } },
          { l: { en: "The frontend problem", es: "El problema de frontend" }, v: { en: "The integration had to manage the WebRTC lifecycle, initialize only when requested, remain safe during server rendering, keep the model context bounded and avoid tracking before the customer opened the assistant.", es: "La integración tenía que gestionar el ciclo de vida de WebRTC, inicializarse solo cuando se pedía, ser segura durante el renderizado en servidor, mantener acotado el contexto del modelo y evitar cualquier seguimiento antes de que el cliente abriera el asistente." } },
          { l: { en: "Engineering decisions", es: "Decisiones de ingeniería" }, v: { en: "Lazy initialization, platform guards, a controlled feature flag and a routing and context-stripping design.", es: "Inicialización diferida, protecciones de plataforma, una feature flag controlada y un diseño de enrutado y limpieza de contexto." } },
          { l: { en: "Outcome", es: "Resultado" }, v: { en: "The code reached production as a controlled whitelist pilot and was never opened to the public. The LLM context payload fell from 570 KB to 22 KB per execution, a 96% reduction.", es: "El código llegó a producción como piloto controlado mediante lista blanca y nunca se abrió al público. El payload de contexto del LLM bajó de 570 KB a 22 KB por ejecución, una reducción del 96%." } },
          { l: { en: "What this demonstrates", es: "Qué demuestra" }, v: { en: "Angular integration work, asynchronous lifecycle management, SSR safety, accessibility, controlled rollout and measurable context design.", es: "Trabajo de integración en Angular, gestión de ciclos de vida asíncronos, seguridad bajo SSR, accesibilidad, despliegue controlado y diseño de contexto medible." } },
        ],
        sanitized: true,
      },
      {
        slug: "help-center-rollout",
        tags: ["Angular", "SSR", "Feature Flags", "Observability", "Accessibility"],
        title: { en: "Help Center Rollout", es: "Despliegue del Centro de Ayuda" },
        summary: {
          en: "A country-by-country Help Center rollout with SSR-safe Angular integration, stable routes and accessible localized experiences.",
          es: "Un despliegue del Centro de Ayuda país por país con integración Angular compatible con SSR, rutas estables y experiencias localizadas accesibles.",
        },
        fields: [
          { l: { en: "Context", es: "Contexto" }, v: { en: "A new conversational Help Center had to replace legacy shopping guides country by country without changing the existing entry points.", es: "Un nuevo Centro de Ayuda conversacional tenía que sustituir a las guías de compra heredadas país por país sin cambiar los puntos de entrada existentes." } },
          { l: { en: "Delivery", es: "Entrega" }, v: { en: "I integrated the conversational experience into the existing Angular routes and localized entry points across markets.", es: "Integré la experiencia conversacional en las rutas Angular y los puntos de entrada localizados existentes en cada mercado." } },
          { l: { en: "Rollout", es: "Despliegue" }, v: { en: "The release expanded market by market, with SSR behavior, accessibility and route stability verified before each step.", es: "El lanzamiento avanzó mercado a mercado, verificando antes de cada paso el comportamiento bajo SSR, la accesibilidad y la estabilidad de las rutas." } },
          { l: { en: "Risk control", es: "Control de riesgo" }, v: { en: "The integration preserved existing entry points and user-facing behavior while the new experience expanded.", es: "La integración preservó los puntos de entrada y el comportamiento visible para el usuario mientras se ampliaba la nueva experiencia." } },
          { l: { en: "Outcome", es: "Resultado" }, v: { en: "The Help Center rolled out country by country with stable routes, localized titles, accessibility and SSR support.", es: "El Centro de Ayuda se desplegó país por país con rutas estables, títulos localizados, accesibilidad y soporte SSR." } },
          { l: { en: "What this demonstrates", es: "Qué demuestra" }, v: { en: "Angular delivery, SSR, accessibility, staged rollout and risk control across localized markets.", es: "Entrega Angular, SSR, accesibilidad, despliegue gradual y control de riesgo entre mercados localizados." } },
        ],
      },
      {
        slug: "passwordless-account-migration",
        tags: ["Angular", "Authentication", "OTP", "NgRx", "API Contracts"],
        title: { en: "Passwordless Account Migration", es: "Migración de cuentas a autenticación sin contraseña" },
        summary: {
          en: "A contract-first passwordless migration with separate password and OTP paths, delivered through incremental scope and end-to-end validation.",
          es: "Una migración sin contraseña guiada por contratos, con caminos separados para contraseña y OTP, alcance incremental y validación de extremo a extremo.",
        },
        fields: [
          { l: { en: "Context", es: "Contexto" }, v: { en: "The account area had to support both existing-password and passwordless users without disrupting established flows.", es: "El área de cuenta tenía que admitir usuarios con contraseña y sin ella sin interrumpir los flujos existentes." } },
          { l: { en: "Contract analysis", es: "Análisis del contrato" }, v: { en: "I mapped the UI dependencies and authentication states before changing the flows, then scoped the implementation around the verified contract.", es: "Mapeé las dependencias de la interfaz y los estados de autenticación antes de cambiar los flujos, y acoté la implementación al contrato verificado." } },
          { l: { en: "Decision", es: "Decisión" }, v: { en: "I kept the migration incremental, separating password-state handling from the rest of the account experience.", es: "Mantuve la migración incremental, separando la gestión del estado de contraseña del resto de la experiencia de cuenta." } },
          { l: { en: "Implementation", es: "Implementación" }, v: { en: "The UI followed separate password and OTP paths, including email change and password creation, with dependent actions gated by authentication state.", es: "La interfaz siguió caminos separados para contraseña y OTP, incluido el cambio de email y la creación de contraseña, con las acciones dependientes gobernadas por el estado de autenticación." } },
          { l: { en: "Validation", es: "Validación" }, v: { en: "The resulting flows were validated in a pre-integration environment, including existing-password behaviour, passwordless forms, OTP email change and password creation.", es: "Los flujos resultantes se validaron en un entorno de preintegración, incluido el comportamiento con contraseña existente, los formularios sin contraseña, el cambio de correo electrónico por OTP y la creación de contraseña." } },
          { l: { en: "Outcome", es: "Resultado" }, v: { en: "The passwordless flows were delivered incrementally without disrupting existing account behavior.", es: "Los flujos sin contraseña se entregaron de forma incremental sin interrumpir el comportamiento existente del área de cuenta." } },
          { l: { en: "What this demonstrates", es: "Qué demuestra" }, v: { en: "Contract-first frontend integration, authentication state, scope control, backward compatibility and risk-based decision-making.", es: "Integración de frontend con el contrato por delante, estado de autenticación, control del alcance, retrocompatibilidad y toma de decisiones basada en riesgo." } },
        ],
      },
      {
        slug: "engineering-controls",
        tags: ["GitHub", "Automated Review", "Prompt Engineering", "MCP", "Developer Tooling"],
        title: { en: "Engineering Controls for Frontend Delivery", es: "Controles de ingeniería para la entrega de frontend" },
        summary: {
          en: "An automated review system that measured its own noise, retired 21 of its 53 rules, and got adopted outside its origin team.",
          es: "Un sistema de revisión automatizada que midió su propio ruido, retiró 21 de sus 53 reglas y acabó adoptado fuera de su equipo de origen.",
        },
        fields: [
          { l: { en: "Problem", es: "Problema" }, v: { en: "Automated review can create the appearance of coverage while producing noise, duplicate feedback and rules that the team does not trust.", es: "La revisión automatizada puede aparentar cobertura mientras produce ruido, comentarios duplicados y reglas en las que el equipo no confía." } },
          { l: { en: "System", es: "Sistema" }, v: { en: "I built a GitHub-connected review system with domain-specific checks. The system flagged injection, authorization and secrets-management defects before merge.", es: "Construí un sistema de revisión conectado a GitHub con comprobaciones específicas del dominio. El sistema detectaba defectos de inyección, autorización y gestión de secretos antes de la integración." } },
          { l: { en: "Control loop", es: "Bucle de control" }, v: { en: "The first version generated credibility problems. I measured its output and removed rules the team consistently ignored, retiring 21 of its 53 rules.", es: "La primera versión generó problemas de credibilidad. Medí su salida y eliminé las reglas que el equipo ignoraba sistemáticamente, retirando 21 de sus 53 reglas." } },
          { l: { en: "Adoption", es: "Adopción" }, v: { en: "A Teams CLI was merged into a shared Inditex engineering repository, and a documentation MCP was adopted by the Android team.", es: "Una CLI de Teams se integró en un repositorio de ingeniería compartido de Inditex, y un MCP de documentación fue adoptado por el equipo de Android." } },
          { l: { en: "What this demonstrates", es: "Qué demuestra" }, v: { en: "The useful signal is not that an LLM was present. It is that the automation had boundaries, measurement, rejection criteria and adoption outside its original team.", es: "La señal útil no es que hubiera un LLM de por medio. Es que la automatización tenía límites, medición, criterios de rechazo y adopción fuera de su equipo original." } },
        ],
      },
    ],
  },

  timeline: {
    heading: { en: "Plate 03 — Timeline", es: "Lámina 03 — Trayectoria" },
    lede: {
      en: "Bar length is real months on the job. Color is the domain: e-commerce, banking, education, full-stack. Drag or scroll to scrub.",
      es: "La longitud de la barra son los meses reales en el puesto. El color es el dominio: e-commerce, banca, educación, full stack. Arrastra o desplázate para recorrer.",
    },
    items: [
      { start: "2025-05", end: "2026-07", company: "Decskill España", client: "Zara Home (Inditex)", role: { en: "Senior Front-End Analyst (Angular)", es: "Analista Frontend Sénior (Angular)" }, domain: "ecom" },
      { start: "2024-03", end: "2025-05", company: "Avanade", client: "UNIR", role: { en: "Senior Front-End Analyst (Angular)", es: "Analista Frontend Sénior (Angular)" }, domain: "edu" },
      { start: "2022-12", end: "2024-03", company: "Vermont Solutions", client: "Santander", role: { en: "Senior Front-End Developer (Angular)", es: "Desarrollador Frontend Sénior (Angular)" }, domain: "bank" },
      { start: "2022-10", end: "2022-12", company: "CloudAPPi", client: null, role: { en: "Mid-Level Front-End Developer (Angular, React)", es: "Desarrollador Frontend Intermedio (Angular, React)" }, domain: "gov" },
      { start: "2021-09", end: "2022-10", company: "ENZO / Rent & Buy S.A.", client: null, role: { en: "Mid-Level Front-End Developer (Angular)", es: "Desarrollador Frontend Intermedio (Angular)" }, domain: "startup" },
      { start: "2020-06", end: "2021-09", company: { en: "Independent Projects & Upskilling", es: "Proyectos propios y formación" }, client: null, role: { en: "", es: "" }, domain: "indep" },
      { start: "2020-03", end: "2020-06", company: "Altran", client: null, role: { en: "Mid-Level Full Stack Developer", es: "Desarrollador Full Stack Intermedio" }, domain: "fullstack" },
      { start: "2018-11", end: "2019-09", company: "IO Digital / Query Software", client: null, role: { en: "Mid-Level Full Stack Developer", es: "Desarrollador Full Stack Intermedio" }, domain: "fullstack" },
      { start: "2018-07", end: "2018-11", company: "STRATESYS", client: null, role: { en: "Junior Full Stack Developer", es: "Desarrollador Full Stack Junior" }, domain: "fullstack" },
    ],
    domainLabel: {
      en: { ecom: "E-commerce", bank: "Banking", edu: "Education", gov: "Government", startup: "Startup", indep: "Independent", fullstack: "Full-stack" },
      es: { ecom: "E-commerce", bank: "Banca", edu: "Educación", gov: "Administración pública", startup: "Startup", indep: "Independiente", fullstack: "Full stack" },
    },
    clientLabel: { en: "Client", es: "Cliente" },
    recsHeading: { en: "Recommendations", es: "Recomendaciones" },
    recs: [
      {
        quote: { en: "His knowledge of Angular is excellent, but what I really highlight from working with him is his willingness to help and share his experience. Another aspect I value a lot about Marius is his focus on good practices. He not only applies them in his daily work, but also promotes their adoption within the team.", es: "Su conocimiento en Angular es excelente, pero lo que realmente destaco de trabajar con él es su disposición para ayudar y compartir su experiencia. Otro aspecto que valoro mucho de Marius es su enfoque en las buenas prácticas. No solo las aplica en su trabajo diario, sino que también fomenta su adopción dentro del equipo." },
        author: "José Luis Murcia Gámez",
        role: { en: "Frontend Developer, UNIR project (Avanade)", es: "Desarrollador Frontend, proyecto UNIR (Avanade)" },
        note: { en: "Translated from a recommendation published on LinkedIn", es: null },
      },
      {
        quote: { en: "Working with Marius has been a real pleasure. I especially highlight his initiative with AI tools applied to development, from which I learned a great deal working side by side with him. Any team would be more than fortunate to count on someone with his technical level and his attitude.", es: "Trabajar con Marius ha sido un verdadero placer. Destaco especialmente su iniciativa con herramientas de IA aplicadas al desarrollo, de las que aprendí muchísimo trabajando codo con codo con él. Cualquier equipo sería más que afortunado de contar con alguien con su nivel técnico y su actitud." },
        author: "Juan Pablo Romero Pereira",
        role: { en: "Frontend Developer, Zara Home (Inditex)", es: "Desarrollador Frontend, Zara Home (Inditex)" },
        note: { en: "Translated from a recommendation published on LinkedIn", es: null },
      },
      {
        quote: { en: "Marius proved to be a highly adaptable and resourceful programmer on both occasions we worked together, at Stratesys and at Avanade, where he worked as an external consultant. His ability to learn quickly and his contribution to the projects were fundamental.", es: "Marius demostró ser un programador altamente adaptable y resolutivo en ambas ocasiones que trabajamos juntos, tanto en Stratesys como en Avanade, donde trabajó como consultor externo. Su capacidad para aprender rápidamente y su contribución a los proyectos fueron fundamentales." },
        author: "José Luis Rodríguez-Campra Camberos",
        role: { en: "BAU Coordinator / Scrum Master", es: "Coordinador BAU / Scrum Master" },
        note: { en: "Translated from a recommendation published on LinkedIn", es: null },
      },
      {
        quote: { en: "Great partner, he has done a great job in his last project demonstrating that he can design and build business applications successfully.", es: "Gran compañero. Hizo un trabajo excelente en su último proyecto y demostró que puede diseñar y construir aplicaciones empresariales con éxito." },
        author: "Antonio Bermúdez Rodríguez",
        role: { en: "Developer", es: "Desarrollador" },
        note: { en: "Published on LinkedIn", es: "Traducida de una recomendación publicada en inglés en LinkedIn" },
      },
      {
        quote: { en: "Marius was a great professional to work with. We worked together at ENZO, and his work ethic is immaculate; he is very easy to work with and goes out of his way to help when you ask for guidance.", es: "Marius fue un gran profesional con el que trabajé. Trabajamos juntos en Enzo, y su ética de trabajo es inmaculada y es muy fácil trabajar con él. Se desvive cuando le pides ayuda y orientación." },
        author: "Gonzalo Rodríguez Muñoz",
        role: { en: "Full Stack Software Developer, ENZO", es: "Desarrollador Full Stack, ENZO" },
        note: { en: "Translated from a recommendation published on LinkedIn", es: null },
      },
    ],
  },

  contact: {
    heading: { en: "Plate 04 — Contact", es: "Lámina 04 — Contacto" },
    lede: {
      en: "Senior Angular / Frontend Engineer roles. Permanent or B2B, remote or hybrid from Zaragoza, available for occasional travel.",
      es: "Puestos de Ingeniero Frontend Sénior (Angular). Indefinido o B2B, en remoto o híbrido desde Zaragoza, con disponibilidad para viajes puntuales.",
    },
    travel: {
      en: "EU citizen, authorized to work across the EU/EEA without sponsorship. No relocation.",
      es: "Ciudadano de la UE, autorizado para trabajar en toda la UE/EEE sin patrocinio. Sin reubicación.",
    },
    links: [
      { label: { en: "Email", es: "Correo electrónico" }, href: "mailto:mihailmariusion@gmail.com", value: "mihailmariusion@gmail.com" },
      { label: { en: "LinkedIn", es: "LinkedIn" }, href: "https://linkedin.com/in/mariusdev", value: "linkedin.com/in/mariusdev" },
      { label: { en: "GitHub", es: "GitHub" }, href: "https://github.com/mihailmariusiondev", value: "github.com/mihailmariusiondev" },
    ],
    cvEn: "assets/marius-mihail-ion-cv.pdf",
    cvEs: "assets/marius-mihail-ion-cv-es.pdf",
    closing: {
      en: "570 → 22. 53 → 32. 1.42%. Adopted.",
      es: "570 → 22. 53 → 32. 1,42 %. Adoptado.",
    },
  },

  footer: {
    a11y: {
      en: "This site targets WCAG 2.1 AA. Motion is disabled when reduced motion is requested.",
      es: "Este sitio cumple el objetivo WCAG 2.1 AA. La animación se desactiva cuando se solicita reducir el movimiento.",
    },
    built: { en: "Built as generative canvas + vanilla JS, no framework.", es: "Construido con canvas generativo + JS puro, sin framework." },
  },
};
