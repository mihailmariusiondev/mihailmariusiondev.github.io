// All copy, EN/ES, restructured from _context data files. No invented facts.
window.SITE = {
  identity: {
    name: "Marius Mihail Ion",
    title: { en: "Senior Angular / Frontend Engineer", es: "Ingeniero Frontend Sénior (Angular)" },
    location: "Zaragoza, Spain",
  },
  contact: {
    email: "mihailmariusion@gmail.com",
    linkedin: "https://linkedin.com/in/mariusdev",
    github: "https://github.com/mihailmariusiondev",
    cv: { en: "assets/marius-mihail-ion-cv.pdf", es: "assets/marius-mihail-ion-cv-es.pdf" },
  },
  whoami: {
    en: [
      "Marius Mihail Ion — Senior Angular / Frontend Engineer.",
      "Based in Zaragoza, Spain. EU citizen, authorized across the EU/EEA, no sponsorship needed.",
      "Remote or hybrid from Zaragoza. Available for occasional travel. No relocation.",
      "Software developer since 2018, specialized in Angular since 2021.",
      "Domains: global e-commerce (Zara Home / Inditex), banking (Santander), online education (UNIR).",
      "Full-stack .NET/C# background (2018-2020) still informs how I design auth and API contracts.",
    ],
    es: [
      "Marius Mihail Ion — Ingeniero Frontend Sénior (Angular).",
      "Con base en Zaragoza, España. Ciudadano de la UE, autorizado en toda la UE/EEE, sin patrocinio.",
      "Remoto o híbrido desde Zaragoza. Disponibilidad para viajes puntuales. Sin reubicación.",
      "Desarrollador de software desde 2018, especializado en Angular desde 2021.",
      "Dominios: e-commerce global (Zara Home / Inditex), banca (Santander), educación online (UNIR).",
      "Mi base full-stack en .NET/C# (2018-2020) sigue informando cómo diseño auth y contratos de API.",
    ],
  },
  stats: [
    {
      value: "96%",
      label: {
        en: "LLM context payload cut, AI shopping assistant (570 KB -> 22 KB per execution) via routing + context-stripping",
        es: "Reducción del payload de contexto del LLM, asistente de compra IA (570 KB -> 22 KB por ejecución) vía enrutado + limpieza de contexto",
      },
      bar: 96,
    },
    {
      value: "TOP 1.42%",
      label: {
        en: "SkillValue independent Angular assessment, score 95%",
        es: "Evaluación independiente de Angular de SkillValue, puntuación 95%",
      },
      bar: 99,
    },
    {
      value: "34 / 23 PR",
      label: {
        en: "WCAG 2.1 AA audit findings closed through 23 merged pull requests",
        es: "Hallazgos de auditoría WCAG 2.1 AA cerrados con 23 pull requests integradas",
      },
      bar: 68,
    },
    {
      value: "21 / 53",
      label: {
        en: "Automated-review rules retired after measuring real output vs. team usage",
        es: "Reglas de revisión automatizada retiradas tras medir la salida real frente al uso del equipo",
      },
      bar: 40,
    },
    {
      value: "ADOPTED",
      label: {
        en: "Documentation MCP server adopted by the Android team, outside its origin platform",
        es: "Servidor MCP de documentación adoptado por el equipo de Android, fuera de su plataforma de origen",
      },
      bar: 100,
    },
  ],
  cases: [
    {
      slug: "shopping-assistant",
      title: { en: "Real-time Shopping Assistant", es: "Asistente de compra en tiempo real" },
      tags: ["Angular", "TypeScript", "WebRTC", "OpenAI Realtime API", "SSR", "Accessibility"],
      summary: {
        en: "A controlled whitelist pilot: 96% smaller LLM context payload, SSR-compatible, never opened to the public.",
        es: "Piloto controlado con lista blanca: payload de contexto del LLM 96% menor, compatible con SSR, nunca abierto al público.",
      },
      body: {
        en: [
          ["Context", "A global, multi-market e-commerce frontend needed a conversational shopping experience with voice, text and product context."],
          ["My role", "I implemented the Angular integration as a senior individual contributor. The wider product was a team effort, with a co-lead alongside me."],
          ["The frontend problem", "Manage the WebRTC lifecycle, initialize only on request, stay SSR-safe, keep model context bounded, avoid tracking before the assistant opened."],
          ["Engineering decisions", "Lazy initialization, platform guards, a controlled feature flag, and a routing and context-stripping design."],
          ["Outcome", "Reached production as a controlled whitelist pilot, never opened to the public. LLM context payload: 570 KB -> 22 KB per execution (96% reduction)."],
          ["Demonstrates", "Angular integration, async lifecycle management, SSR safety, accessibility, controlled rollout, measurable context design."],
        ],
        es: [
          ["Contexto", "Un frontend de e-commerce global y multimercado necesitaba una experiencia de compra conversacional con voz, texto y contexto de producto."],
          ["Mi papel", "Implementé la integración en Angular como profesional sénior. El producto en su conjunto fue trabajo de equipo, con otro responsable técnico junto a mí."],
          ["El problema de frontend", "Gestionar el ciclo de vida de WebRTC, inicializar solo bajo demanda, ser seguro en SSR, acotar el contexto del modelo, evitar seguimiento antes de abrir el asistente."],
          ["Decisiones de ingeniería", "Inicialización diferida, protecciones de plataforma, feature flag controlada, y un diseño de enrutado y limpieza de contexto."],
          ["Resultado", "Llegó a producción como piloto controlado con lista blanca, nunca abierto al público. Payload de contexto del LLM: 570 KB -> 22 KB por ejecución (reducción del 96%)."],
          ["Qué demuestra", "Integración Angular, gestión de ciclos de vida asíncronos, seguridad SSR, accesibilidad, despliegue controlado, diseño de contexto medible."],
        ],
      },
      note: {
        en: "Sanitized: no client source code, credentials, internal URLs or private implementation details.",
        es: "Sanitizado: sin código fuente del cliente, credenciales, URLs internas ni detalles privados.",
      },
    },
    {
      slug: "help-center",
      title: { en: "Help Center Rollout", es: "Despliegue del Centro de Ayuda" },
      tags: ["Angular", "SSR", "Feature Flags", "Observability", "Accessibility"],
      summary: {
        en: "A country-by-country Help Center rollout with SSR-safe Angular integration, stable routes and accessible localized experiences.",
        es: "Despliegue del Centro de Ayuda país por país con integración Angular compatible con SSR, rutas estables y experiencias localizadas accesibles.",
      },
      body: {
        en: [
          ["Context", "A new conversational Help Center needed a market-by-market rollout without changing the existing entry points."],
          ["Delivery", "I integrated the conversational experience into the existing Angular routes and localized entry points across markets, with SSR-safe integration and accessibility preserved throughout."],
          ["Rollout", "The release expanded market by market, with SSR behavior, accessibility and route stability verified before each step."],
          ["Risk control", "The integration preserved existing entry points and user-facing behavior while the new experience expanded."],
          ["Outcome", "The Help Center rolled out country by country with stable routes, localized titles, accessibility and SSR support."],
          ["Demonstrates", "Angular delivery, SSR, accessibility, staged rollout, risk control across localized markets."],
        ],
        es: [
          ["Contexto", "Un nuevo Centro de Ayuda conversacional necesitaba un despliegue mercado a mercado sin cambiar los puntos de entrada existentes."],
          ["Entrega", "Integré la experiencia conversacional en las rutas Angular y los puntos de entrada localizados existentes en cada mercado, con integración segura bajo SSR y accesibilidad preservada."],
          ["Despliegue", "El lanzamiento avanzó mercado a mercado, verificando antes de cada paso el comportamiento bajo SSR, la accesibilidad y la estabilidad de rutas."],
          ["Control de riesgo", "La integración preservó los puntos de entrada y el comportamiento visible para el usuario mientras se ampliaba la nueva experiencia."],
          ["Resultado", "El Centro de Ayuda se desplegó país por país con rutas estables, títulos localizados, accesibilidad y soporte SSR."],
          ["Qué demuestra", "Entrega Angular, SSR, accesibilidad, despliegue gradual, control de riesgo entre mercados localizados."],
        ],
      },
    },
    {
      slug: "passwordless",
      title: { en: "Passwordless Account Migration", es: "Migración de cuentas a autenticación sin contraseña" },
      tags: ["Angular", "Authentication", "API Contracts", "OTP", "NgRx", "Integration Testing"],
      summary: {
        en: "A contract-first passwordless migration with separate password and OTP paths, delivered incrementally with end-to-end validation.",
        es: "Migración sin contraseña guiada por contratos, con caminos separados para contraseña y OTP, entrega incremental y validación de extremo a extremo.",
      },
      body: {
        en: [
          ["Context", "The account area had to support both existing-password and passwordless users without disrupting established flows."],
          ["Contract analysis", "I mapped UI dependencies and authentication states before changing the flows, then scoped the implementation around the verified contract."],
          ["Decision", "Kept the migration incremental, separating password-state handling (hasPassword) from the rest of the account experience."],
          ["Implementation", "Separate password and OTP paths, including email change and password creation, with dependent actions gated by authentication state."],
          ["Validation", "Validated in a pre-integration environment: existing-password behaviour, passwordless forms, OTP email change, password creation."],
          ["Outcome", "Passwordless flows delivered incrementally without disrupting existing account behavior."],
          ["Demonstrates", "Contract-first frontend integration, authentication state, scope control, backward compatibility, risk-based decisions."],
        ],
        es: [
          ["Contexto", "El área de cuenta tenía que admitir usuarios con contraseña y sin ella sin interrumpir los flujos existentes."],
          ["Análisis del contrato", "Mapeé las dependencias de la interfaz y los estados de autenticación antes de cambiar los flujos, y acoté la implementación al contrato verificado."],
          ["Decisión", "Mantuve la migración incremental, separando la gestión del estado de contraseña (hasPassword) del resto de la experiencia de cuenta."],
          ["Implementación", "Caminos separados para contraseña y OTP, incluido el cambio de email y la creación de contraseña, con acciones dependientes gobernadas por el estado de autenticación."],
          ["Validación", "Validado en un entorno de preintegración: comportamiento con contraseña existente, formularios sin contraseña, cambio de email por OTP, creación de contraseña."],
          ["Resultado", "Flujos sin contraseña entregados de forma incremental sin interrumpir el comportamiento existente del área de cuenta."],
          ["Qué demuestra", "Integración con el contrato por delante, estado de autenticación, control del alcance, retrocompatibilidad, decisiones basadas en riesgo."],
        ],
      },
    },
    {
      slug: "engineering-controls",
      title: { en: "Engineering Controls for Frontend Delivery", es: "Controles de ingeniería para la entrega de frontend" },
      tags: ["GitHub", "Automated Review", "Prompt & Context Engineering", "MCP", "Developer Tooling"],
      summary: {
        en: "An automated review system that measured its own noise, retired 21 of its 53 rules, and got adopted outside its origin team.",
        es: "Sistema de revisión automatizada que midió su propio ruido, retiró 21 de sus 53 reglas y fue adoptado fuera de su equipo de origen.",
      },
      body: {
        en: [
          ["Problem", "Automated review can create the appearance of coverage while producing noise, duplicate feedback and rules the team does not trust."],
          ["System", "A GitHub-connected review system with domain-specific checks, flagging injection, authorization and secrets-management defects before merge."],
          ["Control loop", "The first version generated credibility problems. I measured its output and retired 21 of its 53 rules the team consistently ignored."],
          ["Adoption", "A Teams CLI merged into a shared Inditex engineering repository; a documentation MCP was adopted by the Android team."],
          ["Demonstrates", "The signal isn't that an LLM was present — it's that the automation had boundaries, measurement, rejection criteria and cross-team adoption."],
        ],
        es: [
          ["Problema", "La revisión automatizada puede aparentar cobertura mientras produce ruido, comentarios duplicados y reglas en las que el equipo no confía."],
          ["Sistema", "Un sistema de revisión conectado a GitHub con comprobaciones específicas del dominio, detectando defectos de inyección, autorización y gestión de secretos antes de integrar."],
          ["Bucle de control", "La primera versión generó problemas de credibilidad. Medí su salida y retiré 21 de sus 53 reglas que el equipo ignoraba sistemáticamente."],
          ["Adopción", "Una CLI de Teams se integró en un repositorio de ingeniería compartido de Inditex; un MCP de documentación fue adoptado por el equipo de Android."],
          ["Qué demuestra", "La señal no es que hubiera un LLM de por medio, sino que la automatización tenía límites, medición, criterios de rechazo y adopción entre equipos."],
        ],
      },
    },
  ],
  experience: [
    { period: { en: "May 2025 - Jul 2026", es: "May 2025 - Jul 2026" }, company: "Decskill Spain", client: "Zara Home (Inditex)", role: { en: "Senior Front-End Analyst (Angular)", es: "Analista Frontend Sénior (Angular)" } },
    { period: { en: "Mar 2024 - May 2025", es: "Mar 2024 - May 2025" }, company: "Avanade", client: "UNIR", role: { en: "Senior Front-End Analyst (Angular)", es: "Analista Frontend Sénior (Angular)" } },
    { period: { en: "Dec 2022 - Mar 2024", es: "Dic 2022 - Mar 2024" }, company: "Vermont Solutions", client: "Santander", role: { en: "Senior Front-End Developer (Angular)", es: "Desarrollador Frontend Sénior (Angular)" } },
    { period: { en: "Oct 2022 - Dec 2022", es: "Oct 2022 - Dic 2022" }, company: "CloudAPPi", client: null, role: { en: "Mid-Level Front-End Developer (Angular, React)", es: "Desarrollador Frontend Intermedio (Angular, React)" } },
    { period: { en: "Sep 2021 - Oct 2022", es: "Sep 2021 - Oct 2022" }, company: "ENZO / Rent & Buy S.A.", client: null, role: { en: "Mid-Level Front-End Developer (Angular)", es: "Desarrollador Frontend Intermedio (Angular)" } },
    { period: { en: "Jun 2020 - Sep 2021", es: "Jun 2020 - Sep 2021" }, company: { en: "Independent Projects & Upskilling", es: "Proyectos propios y formación" }, client: null, role: { en: "", es: "" } },
    { period: { en: "Mar 2020 - Jun 2020", es: "Mar 2020 - Jun 2020" }, company: "Altran", client: null, role: { en: "Mid-Level Full Stack Developer", es: "Desarrollador Full Stack Intermedio" } },
    { period: { en: "Nov 2018 - Sep 2019", es: "Nov 2018 - Sep 2019" }, company: "IO Digital / Query Software", client: null, role: { en: "Mid-Level Full Stack Developer", es: "Desarrollador Full Stack Intermedio" } },
    { period: { en: "Jul 2018 - Nov 2018", es: "Jul 2018 - Nov 2018" }, company: "STRATESYS", client: null, role: { en: "Junior Full Stack Developer", es: "Desarrollador Full Stack Junior" } },
  ],
  recommendations: [
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
        en: "Working with Marius has been a real pleasure. I especially highlight his initiative with AI tools applied to development, from which I learned a great deal working side by side with him.",
        es: "Trabajar con Marius ha sido un verdadero placer. Destaco especialmente su iniciativa con herramientas de IA aplicadas al desarrollo, de las que aprendí muchísimo trabajando codo con codo con él.",
      },
      author: "Juan Pablo Romero Pereira",
      role: { en: "Frontend Developer, Zara Home (Inditex)", es: "Desarrollador Frontend, Zara Home (Inditex)" },
    },
    {
      quote: {
        en: "Marius proved to be a highly adaptable and resourceful programmer on both occasions we worked together, at Stratesys and at Avanade. His ability to learn quickly and his contribution to the projects were fundamental.",
        es: "Marius demostró ser un programador altamente adaptable y resolutivo en ambas ocasiones que trabajamos juntos, tanto en Stratesys como en Avanade. Su capacidad para aprender rápidamente y su contribución a los proyectos fueron fundamentales.",
      },
      author: "José Luis Rodríguez-Campra Camberos",
      role: { en: "BAU Coordinator / Scrum Master", es: "Coordinador BAU / Scrum Master" },
    },
    {
      quote: {
        en: "Great partner, he has done a great job in his last project demonstrating that he can design and build business applications successfully.",
        es: "Gran compañero. Hizo un trabajo excelente en su último proyecto y demostró que puede diseñar y construir aplicaciones empresariales con éxito.",
      },
      author: "Antonio Bermúdez Rodríguez",
      role: { en: "Developer", es: "Desarrollador" },
    },
    {
      quote: {
        en: "Marius was a great professional to work with. We worked together at ENZO, and his work ethic is immaculate; he is very easy to work with and goes out of his way to help when you ask for guidance.",
        es: "Marius fue un gran profesional con el que trabajé. Trabajamos juntos en Enzo, y su ética de trabajo es inmaculada y es muy fácil trabajar con él. Se desvive cuando le pides ayuda y orientación.",
      },
      author: "Gonzalo Rodríguez Muñoz",
      role: { en: "Full Stack Software Developer, ENZO", es: "Desarrollador Full Stack, ENZO" },
    },
  ],
};
