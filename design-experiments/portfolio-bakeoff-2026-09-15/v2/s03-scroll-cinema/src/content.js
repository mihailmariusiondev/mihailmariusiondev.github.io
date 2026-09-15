// All facts copied verbatim from /tmp/portfolio-design-bakeoff-20260914/_context/*.ts
// (experience.ts, caseStudies.ts, ui.ts, facts.json) and the corrected CV text.
// en/es pairs only — no invented numbers, clients, titles or dates.

export const identity = {
  name: "Marius Mihail Ion",
  role: { en: "Senior Angular / Frontend Engineer", es: "Ingeniero Frontend Sénior (Angular)" },
  location: { en: "Zaragoza, Spain", es: "Zaragoza, España" },
};

export const contact = {
  email: "mihailmariusion@gmail.com",
  linkedin: "https://linkedin.com/in/mariusdev",
  linkedinLabel: "linkedin.com/in/mariusdev",
  github: "https://github.com/mihailmariusiondev",
  githubLabel: "github.com/mihailmariusiondev",
  cvEn: "/marius-mihail-ion-cv.pdf",
  cvEs: "/marius-mihail-ion-cv-es.pdf",
};

export const hero = {
  eyebrow: { en: "A CAREER, PLAYED BACK", es: "UNA CARRERA, EN REPRODUCCIÓN" },
  titleLines: [
    { en: "MARIUS", es: "MARIUS" },
    { en: "MIHAIL ION", es: "MIHAIL ION" },
  ],
  sub: {
    en: "Software developer since 2018, specialized in Angular since 2021. Enterprise frontend for e-commerce, banking and education.",
    es: "Desarrollador de software desde 2018, especializado en Angular desde 2021. Frontend corporativo para comercio electrónico, banca y educación.",
  },
  workMode: {
    en: "Remote or hybrid from Zaragoza · Available for occasional travel · EU citizen, authorized across the EU/EEA without sponsorship",
    es: "Remoto o híbrido desde Zaragoza · Disponibilidad para viajes puntuales · Ciudadano de la UE, autorizado en toda la UE/EEE sin patrocinio",
  },
  scrollCue: { en: "SCROLL TO PLAY", es: "DESPLAZA PARA REPRODUCIR" },
};

// SCENE 01 — career timeline, from experience.ts (oldest first for the reel)
export const timeline = [
  {
    period: { en: "Jul 2018 – Nov 2018", es: "Jul 2018 – Nov 2018" },
    company: "STRATESYS",
    role: { en: "Junior Full Stack Developer", es: "Desarrollador Full Stack Junior" },
    note: { en: ".NET", es: ".NET" },
  },
  {
    period: { en: "Nov 2018 – Sep 2019", es: "Nov 2018 – Sep 2019" },
    company: "IO Digital / Query Software",
    role: { en: "Mid-Level Full Stack Developer", es: "Desarrollador Full Stack Intermedio" },
    note: { en: ".NET", es: ".NET" },
  },
  {
    period: { en: "Mar 2020 – Jun 2020", es: "Mar 2020 – Jun 2020" },
    company: "Altran",
    role: { en: "Mid-Level Full Stack Developer", es: "Desarrollador Full Stack Intermedio" },
    note: { en: ".NET", es: ".NET" },
  },
  {
    period: { en: "Jun 2020 – Sep 2021", es: "Jun 2020 – Sep 2021" },
    company: { en: "Independent Projects & Upskilling", es: "Proyectos propios y formación" },
    role: { en: "WordPress, office automation, frontend upskilling", es: "WordPress, automatización de oficina, formación frontend" },
    note: { en: "Career break", es: "Parón profesional" },
  },
  {
    period: { en: "Sep 2021 – Oct 2022", es: "Sep 2021 – Oct 2022" },
    company: "ENZO / Rent & Buy S.A.",
    role: { en: "Mid-Level Front-End Developer (Angular)", es: "Desarrollador Frontend Intermedio (Angular)" },
    note: { en: "Moved from .NET into Angular on an existing AWS serverless backend", es: "Pasó de .NET a Angular sobre un backend serverless AWS ya existente" },
  },
  {
    period: { en: "Oct 2022 – Dec 2022", es: "Oct 2022 – Dic 2022" },
    company: "CloudAPPi",
    role: { en: "Mid-Level Front-End Developer (Angular, React)", es: "Desarrollador Frontend Intermedio (Angular, React)" },
    note: { en: "Regional Government of Madrid", es: "Comunidad de Madrid" },
  },
  {
    period: { en: "Dec 2022 – Mar 2024", es: "Dic 2022 – Mar 2024" },
    company: "Vermont Solutions",
    client: "Santander",
    role: { en: "Senior Front-End Developer (Angular)", es: "Desarrollador Frontend Sénior (Angular)" },
    note: { en: "Owned ~80% of one project's frontend", es: "Responsable de ~80% del frontend de un proyecto" },
  },
  {
    period: { en: "Mar 2024 – May 2025", es: "Mar 2024 – May 2025" },
    company: "Avanade",
    client: "UNIR",
    role: { en: "Senior Front-End Analyst (Angular)", es: "Analista Frontend Sénior (Angular)" },
    note: { en: "Inspire Greatness award, Aug 2024", es: "Premio Inspire Greatness, ago. 2024" },
  },
  {
    period: { en: "May 2025 – Jul 2026", es: "May 2025 – Jul 2026" },
    company: "Decskill España",
    client: "Zara Home (Inditex)",
    role: { en: "Senior Front-End Analyst (Angular)", es: "Analista Frontend Sénior (Angular)" },
    note: { en: "Most recent role", es: "Puesto más reciente" },
  },
];

// SCENE 02 — the specialization moment
export const specialization = {
  eyebrow: { en: "SCENE 02 · THE TURN", es: "ESCENA 02 · EL GIRO" },
  headline: {
    en: "September 2021. Angular becomes the specialty.",
    es: "Septiembre de 2021. Angular se convierte en la especialidad.",
  },
  body: {
    en: "Independent SkillValue assessment, September 2022: 95% score.",
    es: "Evaluación independiente de SkillValue, septiembre de 2022: puntuación del 95%.",
  },
  statValue: "Top 1.42%",
  statLabel: {
    en: "of all candidates on SkillValue's Angular assessment",
    es: "de todos los candidatos en la evaluación de Angular de SkillValue",
  },
};

// SCENE 03 — case files, from caseStudies.ts (verbatim fields)
export const caseFiles = [
  {
    code: "FILE 01",
    slug: "realtime-shopping-assistant",
    title: { en: "Real-time Shopping Assistant", es: "Asistente de compra en tiempo real" },
    tags: ["Angular", "TypeScript", "WebRTC", "OpenAI Realtime API", "SSR"],
    summary: {
      en: "A controlled whitelist pilot: a 96% smaller LLM context payload, SSR-compatible and never opened to the public.",
      es: "Un piloto controlado mediante lista blanca: un payload de contexto del LLM un 96% más pequeño, compatible con SSR y nunca abierto al público.",
    },
    metric: { count: { from: 570, to: 22, prefix: "", suffix: " KB" }, label: { en: "context payload per execution, −96%", es: "payload de contexto por ejecución, −96%" } },
    fields: [
      { label: { en: "Context", es: "Contexto" }, value: { en: "A global, multi-market e-commerce frontend needed a conversational shopping experience with voice, text and product context.", es: "Un frontend de comercio electrónico global y multimercado necesitaba una experiencia de compra conversacional con voz, texto y contexto de producto." } },
      { label: { en: "My role", es: "Mi papel" }, value: { en: "I implemented the Angular integration as a senior individual contributor. The wider product was a team effort, with a co-lead alongside me.", es: "Implementé la integración en Angular como profesional sénior. El producto en su conjunto fue un trabajo de equipo, con otro responsable técnico a mi lado." } },
      { label: { en: "The frontend problem", es: "El problema de frontend" }, value: { en: "The integration had to manage the WebRTC lifecycle, initialize only when requested, remain safe during server rendering, keep the model context bounded and avoid tracking before the customer opened the assistant.", es: "La integración tenía que gestionar el ciclo de vida de WebRTC, inicializarse solo cuando se pedía, ser segura durante el renderizado en servidor, mantener acotado el contexto del modelo y evitar cualquier seguimiento antes de que el cliente abriera el asistente." } },
      { label: { en: "Engineering decisions", es: "Decisiones de ingeniería" }, value: { en: "Lazy initialization, platform guards, a controlled feature flag and a routing and context-stripping design.", es: "Inicialización diferida, protecciones de plataforma, una feature flag controlada y un diseño de enrutado y limpieza de contexto." } },
      { label: { en: "Outcome", es: "Resultado" }, value: { en: "The code reached production as a controlled whitelist pilot and was never opened to the public. The LLM context payload fell from 570 KB to 22 KB per execution, a 96% reduction.", es: "El código llegó a producción como piloto controlado mediante lista blanca y nunca se abrió al público. El payload de contexto del LLM bajó de 570 KB a 22 KB por ejecución, una reducción del 96%." } },
      { label: { en: "What this demonstrates", es: "Qué demuestra" }, value: { en: "Angular integration work, asynchronous lifecycle management, SSR safety, accessibility, controlled rollout and measurable context design.", es: "Trabajo de integración en Angular, gestión de ciclos de vida asíncronos, seguridad bajo SSR, accesibilidad, despliegue controlado y diseño de contexto medible." } },
    ],
    confidential: { en: "This case study is sanitized. It contains no client source code, credentials, internal URLs or private implementation details.", es: "Este caso está sanitizado. No contiene código fuente del cliente, credenciales, URLs internas ni detalles privados de implementación." },
  },
  {
    code: "FILE 02",
    slug: "help-center-rollout",
    title: { en: "Help Center Rollout", es: "Despliegue del Centro de Ayuda" },
    tags: ["Angular", "SSR", "Feature Flags", "Accessibility"],
    summary: {
      en: "A conversational Help Center delivered market by market, with SSR-safe Angular integration, localized routes and accessibility preserved throughout.",
      es: "Un Centro de Ayuda conversacional entregado mercado a mercado, con integración Angular compatible con SSR, rutas localizadas y accesibilidad preservada en todo el despliegue.",
    },
    metric: { static: "MARKET × MARKET", label: { en: "staged rollout, routes and access preserved at every step", es: "despliegue por fases, rutas y accesibilidad preservadas en cada paso" } },
    fields: [
      { label: { en: "Context", es: "Contexto" }, value: { en: "A new conversational Help Center had to reach markets country by country without changing the existing entry points.", es: "Un nuevo Centro de Ayuda conversacional tenía que llegar a los mercados país por país sin cambiar los puntos de entrada existentes." } },
      { label: { en: "Delivery", es: "Entrega" }, value: { en: "I integrated the conversational experience into the existing Angular routes and localized entry points across markets.", es: "Integré la experiencia conversacional en las rutas Angular y los puntos de entrada localizados existentes en cada mercado." } },
      { label: { en: "Rollout", es: "Despliegue" }, value: { en: "The release expanded market by market, with SSR behavior, accessibility and route stability verified before each step.", es: "El lanzamiento avanzó mercado a mercado, verificando antes de cada paso el comportamiento bajo SSR, la accesibilidad y la estabilidad de las rutas." } },
      { label: { en: "Risk control", es: "Control de riesgo" }, value: { en: "The integration preserved existing entry points and user-facing behavior while the new experience expanded.", es: "La integración preservó los puntos de entrada y el comportamiento visible para el usuario mientras se ampliaba la nueva experiencia." } },
      { label: { en: "Outcome", es: "Resultado" }, value: { en: "The Help Center rolled out market by market with stable routes, localized titles, accessibility and SSR support.", es: "El Centro de Ayuda se desplegó mercado a mercado con rutas estables, títulos localizados, accesibilidad y soporte SSR." } },
      { label: { en: "What this demonstrates", es: "Qué demuestra" }, value: { en: "Angular delivery, SSR, accessibility, staged rollout and risk control across localized markets.", es: "Entrega Angular, SSR, accesibilidad, despliegue gradual y control de riesgo entre mercados localizados." } },
    ],
  },
  {
    code: "FILE 03",
    slug: "passwordless-account-migration",
    title: { en: "Passwordless Account Migration", es: "Migración de cuentas a autenticación sin contraseña" },
    tags: ["Angular", "OTP", "NgRx", "API Contracts"],
    summary: {
      en: "A contract-first passwordless migration with separate password and OTP paths, delivered through incremental scope and end-to-end validation.",
      es: "Una migración sin contraseña guiada por contratos, con caminos separados para contraseña y OTP, alcance incremental y validación de extremo a extremo.",
    },
    metric: { count: { from: 0, to: 4, prefix: "", suffix: " / 4" }, label: { en: "documented scenarios validated pre-integration", es: "escenarios documentados validados en preintegración" } },
    fields: [
      { label: { en: "Context", es: "Contexto" }, value: { en: "The account area had to support both existing-password and passwordless users without disrupting established flows.", es: "El área de cuenta tenía que admitir usuarios con contraseña y sin ella sin interrumpir los flujos existentes." } },
      { label: { en: "Contract analysis", es: "Análisis del contrato" }, value: { en: "I mapped the UI dependencies and authentication states before changing the flows, then scoped the implementation around the verified contract.", es: "Mapeé las dependencias de la interfaz y los estados de autenticación antes de cambiar los flujos, y acoté la implementación al contrato verificado." } },
      { label: { en: "Decision", es: "Decisión" }, value: { en: "I kept the migration incremental, separating password-state (hasPassword) handling from the rest of the account experience.", es: "Mantuve la migración incremental, separando la gestión del estado de contraseña (hasPassword) del resto de la experiencia de cuenta." } },
      { label: { en: "Implementation", es: "Implementación" }, value: { en: "The UI followed separate password and OTP paths, including email change and password creation, with dependent actions gated by authentication state.", es: "La interfaz siguió caminos separados para contraseña y OTP, incluido el cambio de email y la creación de contraseña, con las acciones dependientes gobernadas por el estado de autenticación." } },
      { label: { en: "Validation", es: "Validación" }, value: { en: "The resulting flows were validated in a pre-integration environment, including existing-password behaviour, passwordless forms, OTP email change and password creation, across four documented scenarios.", es: "Los flujos resultantes se validaron en un entorno de preintegración, incluido el comportamiento con contraseña existente, los formularios sin contraseña, el cambio de correo electrónico por OTP y la creación de contraseña, en cuatro escenarios documentados." } },
      { label: { en: "Outcome", es: "Resultado" }, value: { en: "The passwordless flows were delivered incrementally without disrupting existing account behavior.", es: "Los flujos sin contraseña se entregaron de forma incremental sin interrumpir el comportamiento existente del área de cuenta." } },
      { label: { en: "What this demonstrates", es: "Qué demuestra" }, value: { en: "Contract-first frontend integration, authentication state, scope control, backward compatibility and risk-based decision-making.", es: "Integración de frontend con el contrato por delante, estado de autenticación, control del alcance, retrocompatibilidad y toma de decisiones basada en riesgo." } },
    ],
  },
  {
    code: "FILE 04",
    slug: "engineering-controls",
    title: { en: "Engineering Controls for Frontend Delivery", es: "Controles de ingeniería para la entrega de frontend" },
    tags: ["GitHub", "Automated Review", "MCP", "Developer Tooling"],
    summary: {
      en: "An automated review system that measured its own noise, retired 21 of its 53 rules, and got adopted outside its origin team.",
      es: "Un sistema de revisión automatizada que midió su propio ruido, retiró 21 de sus 53 reglas y acabó adoptado fuera de su equipo de origen.",
    },
    metric: { count: { from: 53, to: 21, prefix: "", suffix: " / 53" }, label: { en: "rules retired after measuring real signal vs. noise", es: "reglas retiradas tras medir señal real frente a ruido" } },
    fields: [
      { label: { en: "Problem", es: "Problema" }, value: { en: "Automated review can create the appearance of coverage while producing noise, duplicate feedback and rules that the team does not trust.", es: "La revisión automatizada puede aparentar cobertura mientras produce ruido, comentarios duplicados y reglas en las que el equipo no confía." } },
      { label: { en: "System", es: "Sistema" }, value: { en: "I built a GitHub-connected review system with domain-specific checks. The system flagged injection, authorization and secrets-management defects before merge.", es: "Construí un sistema de revisión conectado a GitHub con comprobaciones específicas del dominio. El sistema detectaba defectos de inyección, autorización y gestión de secretos antes de la integración." } },
      { label: { en: "Control loop", es: "Bucle de control" }, value: { en: "The first version generated credibility problems. I measured its output and removed rules the team consistently ignored, retiring 21 of its 53 rules.", es: "La primera versión generó problemas de credibilidad. Medí su salida y eliminé las reglas que el equipo ignoraba sistemáticamente, retirando 21 de sus 53 reglas." } },
      { label: { en: "Adoption", es: "Adopción" }, value: { en: "A Teams CLI was merged into a shared Inditex engineering repository, and a documentation MCP was adopted by the Android team.", es: "Una CLI de Teams se integró en un repositorio de ingeniería compartido de Inditex, y un MCP de documentación fue adoptado por el equipo de Android." } },
      { label: { en: "What this demonstrates", es: "Qué demuestra" }, value: { en: "The useful signal is not that an LLM was present. It is that the automation had boundaries, measurement, rejection criteria and adoption outside its original team.", es: "La señal útil no es que hubiera un LLM de por medio. Es que la automatización tenía límites, medición, criterios de rechazo y adopción fuera de su equipo original." } },
    ],
  },
];

// SCENE 04 — verified results, from experience.ts `stats`
export const stats = [
  { count: { from: 0, to: 96, prefix: "", suffix: "%" }, label: { en: "LLM context payload cut (570 KB → 22 KB per execution) via routing and context-stripping design", es: "Reducción del payload de contexto del LLM (de 570 KB a 22 KB por ejecución) con un diseño de enrutado y limpieza de contexto" } },
  { static: "TOP 1.42%", label: { en: "of all candidates, SkillValue Angular assessment, 95% score", es: "de todos los candidatos, evaluación de Angular de SkillValue, puntuación 95%" } },
  { count: { from: 0, to: 34, prefix: "", suffix: " / 23 PRs" }, label: { en: "WCAG 2.1 AA findings closed through 23 merged pull requests", es: "Hallazgos WCAG 2.1 AA cerrados con 23 solicitudes de cambio integradas" } },
  { count: { from: 53, to: 21, prefix: "", suffix: " / 53" }, label: { en: "automated-review rules retired after measuring real usage", es: "Reglas de revisión automatizada retiradas tras medir su uso real" } },
  { static: { en: "ADOPTED", es: "ADOPTADO" }, label: { en: "documentation MCP taken up by the Android team, outside its origin platform", es: "MCP de documentación adoptado por el equipo de Android, fuera de su plataforma de origen" } },
];

// SCENE 05 — recommendations, from experience.ts `recommendations`
export const recommendations = [
  {
    quote: {
      en: "His knowledge of Angular is excellent, but what I really highlight from working with him is his willingness to help and share his experience. He not only applies good practices in his daily work, but also promotes their adoption within the team, organizing meetings when necessary and aligning everyone around building quality, maintainable and scalable software.",
      es: "Su conocimiento en Angular es excelente, pero lo que realmente destaco de trabajar con él es su disposición para ayudar y compartir su experiencia. No solo aplica las buenas prácticas en su trabajo diario, sino que también fomenta su adopción dentro del equipo, organizando reuniones cuando es necesario y alineando a todos en la construcción de software de calidad, mantenible y escalable.",
    },
    author: "José Luis Murcia Gámez",
    role: { en: "Frontend Developer, UNIR project (Avanade)", es: "Desarrollador Frontend, proyecto UNIR (Avanade)" },
    translated: { en: true, es: false },
  },
  {
    quote: {
      en: "Working with Marius has been a real pleasure. I especially highlight his initiative with AI tools applied to development, from which I learned a great deal working side by side with him. Any team would be more than fortunate to count on someone with his technical level and his attitude.",
      es: "Trabajar con Marius ha sido un verdadero placer. Destaco especialmente su iniciativa con herramientas de IA aplicadas al desarrollo, de las que aprendí muchísimo trabajando codo con codo con él. Cualquier equipo sería más que afortunado de contar con alguien con su nivel técnico y su actitud.",
    },
    author: "Juan Pablo Romero Pereira",
    role: { en: "Frontend Developer, Zara Home (Inditex)", es: "Desarrollador Frontend, Zara Home (Inditex)" },
    translated: { en: true, es: false },
  },
  {
    quote: {
      en: "Marius proved to be a highly adaptable and resourceful programmer on both occasions we worked together, at Stratesys and at Avanade (consultancy for Proeduca), where he worked as an external consultant. His ability to learn quickly and his contribution to the projects were fundamental. I highly recommend him for his professionalism and technical skills.",
      es: "Marius demostró ser un programador altamente adaptable y resolutivo en ambas ocasiones que trabajamos juntos, tanto en Stratesys como en Avanade (consultora/proveedora de servicios para Proeduca), donde trabajó como consultor externo. Su capacidad para aprender rápidamente y su contribución a los proyectos fueron fundamentales. Lo recomiendo ampliamente por su profesionalismo y habilidades técnicas.",
    },
    author: "José Luis Rodríguez-Campra Camberos",
    role: { en: "BAU Coordinator / Scrum Master", es: "Coordinador BAU / Scrum Master" },
    translated: { en: true, es: false },
  },
  {
    quote: {
      en: "Great partner, he has done a great job in his last project demonstrating that he can design and build business applications successfully.",
      es: "Gran compañero. Hizo un trabajo excelente en su último proyecto y demostró que puede diseñar y construir aplicaciones empresariales con éxito.",
    },
    author: "Antonio Bermúdez Rodríguez",
    role: { en: "Developer", es: "Desarrollador" },
    translated: { en: false, es: true },
  },
  {
    quote: {
      en: "Marius was a great professional to work with. We worked together at ENZO, and his work ethic is immaculate; he is very easy to work with and goes out of his way to help when you ask for guidance.",
      es: "Marius fue un gran profesional con el que trabajé. Trabajamos juntos en Enzo, y su ética de trabajo es inmaculada y es muy fácil trabajar con él. Se desvive cuando le pides ayuda y orientación.",
    },
    author: "Gonzalo Rodríguez Muñoz",
    role: { en: "Full Stack Software Developer, ENZO", es: "Desarrollador Full Stack, ENZO" },
    translated: { en: true, es: false },
  },
];

export const finale = {
  eyebrow: { en: "END CARD", es: "CARTA FINAL" },
  headline: { en: "Let's build the next scene.", es: "Construyamos la próxima escena." },
  body: {
    en: "Senior Angular / Frontend Engineer roles. Permanent or B2B, remote or hybrid from Zaragoza, available for occasional travel.",
    es: "Puestos de Ingeniero Frontend Sénior (Angular). Indefinido o B2B, en remoto o híbrido desde Zaragoza, con disponibilidad para viajes puntuales.",
  },
};

export const a11yNote = {
  en: "This site targets WCAG 2.1 AA. Motion is reduced automatically when your system requests it.",
  es: "Este sitio tiene como objetivo WCAG 2.1 AA. La animación se reduce automáticamente cuando tu sistema lo solicita.",
};

export const ui = {
  dockCases: { en: "Case files", es: "Casos" },
  dockCv: { en: "CV", es: "CV" },
  caseFileOpen: { en: "Open full file", es: "Abrir archivo completo" },
  caseFileClose: { en: "Close", es: "Cerrar" },
  translatedNote: { en: "Translated from a recommendation published on LinkedIn", es: "Traducida de una recomendación publicada en inglés en LinkedIn" },
  langSwitchAria: { en: "Ver esta página en español", es: "View this page in English" },
};
