/* All bilingual copy. Facts paraphrased from _context/facts.json + DOSSIER.md only. */
window.I18N = {
  skip: { en: "Skip to main content", es: "Saltar al contenido principal" },
  siteRole: { en: "Senior Angular / Frontend Engineer", es: "Ingeniero Frontend Sénior (Angular)" },
  navObservatory: { en: "Observatory", es: "Observatorio" },
  navTimeline: { en: "Timeline", es: "Cronología" },
  navSignals: { en: "Signals", es: "Señales" },
  navCases: { en: "Case studies", es: "Casos" },
  navAbout: { en: "About", es: "Perfil" },
  navContact: { en: "Contact", es: "Contacto" },
  langSwitch: { en: "ES", es: "EN" },
  langSwitchLabel: { en: "Ver en español", es: "View in English" },

  kicker: { en: "A DATA OBSERVATORY", es: "UN OBSERVATORIO DE DATOS" },
  heroTitle: {
    en: "A frontend career since 2018, read as a dataset.",
    es: "Una carrera frontend desde 2018, leída como un conjunto de datos.",
  },
  heroLede: {
    en: "Marius Mihail Ion — Senior Angular / Frontend Engineer, based in Zaragoza, Spain. Software developer since 2018, specialized in Angular since 2021. Every chart below is built from one real, sourced number — no invented metrics, no dashboards standing in for decoration.",
    es: "Marius Mihail Ion — Ingeniero Frontend Sénior (Angular), con base en Zaragoza, España. Desarrollador de software desde 2018, especializado en Angular desde 2021. Cada gráfico de abajo se construye con un número real y verificado, sin métricas inventadas ni paneles decorativos.",
  },
  heroLocation: {
    en: "Remote or hybrid from Zaragoza · Available for occasional travel · EU citizen, authorized across the EU/EEA · Permanent or B2B",
    es: "Remoto o híbrido desde Zaragoza · Disponibilidad para viajes puntuales · Ciudadano de la UE, autorizado en toda la UE/EEE · Contrato indefinido o B2B",
  },
  ctaCvEn: { en: "Download CV (English)", es: "Descargar CV (inglés)" },
  ctaCvEs: { en: "Download CV (Spanish)", es: "Descargar CV (español)" },
  ctaContact: { en: "Contact", es: "Contactar" },
  scrollHint: { en: "Scroll to explore the data ↓", es: "Desliza para explorar los datos ↓" },

  timelineTitle: { en: "The career, as a timeline", es: "La carrera, como cronología" },
  timelineIntro: {
    en: "Nine roles since 2018, spanning a full-stack .NET start, a deliberate 15-month break for independent projects and upskilling, and Angular specialization from 2021 onward across e-commerce, banking and education.",
    es: "Nueve puestos desde 2018: un inicio full-stack en .NET, una pausa deliberada de 15 meses para proyectos propios y formación, y especialización en Angular desde 2021 en comercio electrónico, banca y educación.",
  },
  timelineSource: { en: "Source: CV role history", es: "Fuente: historial de puestos del CV" },
  timelineTableCaption: { en: "Role history table (accessible data behind the timeline chart)", es: "Tabla de historial de puestos (datos accesibles detrás de la cronología)" },
  thPeriod: { en: "Period", es: "Periodo" },
  thCompany: { en: "Company", es: "Empresa" },
  thClient: { en: "Client / context", es: "Cliente / contexto" },
  thRole: { en: "Role", es: "Puesto" },

  signalsTitle: { en: "Six signals from the work", es: "Seis señales del trabajo" },
  signalsIntro: {
    en: "Not a dashboard — an honest set of outcomes that actually happened, each traced to one role and one source.",
    es: "No es un panel de control: un conjunto honesto de resultados que sucedieron de verdad, cada uno trazado a un puesto y una fuente.",
  },

  c1Title: { en: "LLM context payload, per assistant execution", es: "Payload de contexto del LLM, por ejecución del asistente" },
  c1Big: { en: "96% smaller", es: "96% más pequeño" },
  c1Desc: {
    en: "Zara Home's AI shopping assistant (Angular frontend, real-time voice and text over WebRTC) needed its model context kept small enough to stay fast and cheap to reason over. A routing and context-stripping design cut the payload from 570 KB to 22 KB per execution.",
    es: "El asistente de compra con IA de Zara Home (frontend en Angular, voz y texto en tiempo real por WebRTC) necesitaba un contexto de modelo lo bastante pequeño para razonar rápido y barato. Un diseño de enrutado y recorte de contexto redujo el payload de 570 KB a 22 KB por ejecución.",
  },
  c1Note: {
    en: "Shipped to production behind a feature flag, as a controlled whitelist pilot — never opened to the public.",
    es: "Se llevó a producción tras un feature flag, como piloto controlado de lista blanca: nunca se abrió al público.",
  },
  c1Source: { en: "Source: CV · Decskill / Zara Home role · case study", es: "Fuente: CV · puesto en Decskill / Zara Home · caso de estudio" },

  c2Title: { en: "JavaScript bundle audit", es: "Auditoría del bundle de JavaScript" },
  c2Big: { en: "~3.4 MB identified", es: "~3.4 MB identificados" },
  c2Desc: {
    en: "Audited a 19 MB JavaScript bundle and identified approximately 3.4 MB of removable weight. Shipped two pull requests: dynamic imports for hls.js and html2canvas, lodash-es removal, and a Luxon-to-native-Date migration.",
    es: "Se auditó un bundle de JavaScript de 19 MB y se identificaron aproximadamente 3.4 MB de peso eliminable. Se entregaron dos pull requests: imports dinámicos para hls.js y html2canvas, eliminación de lodash-es y migración de Luxon a Date nativo.",
  },
  c2Source: { en: "Source: CV · Decskill / Zara Home role", es: "Fuente: CV · puesto en Decskill / Zara Home" },

  c3Title: { en: "Accessibility audit close-out", es: "Cierre de auditoría de accesibilidad" },
  c3Big: { en: "34 findings closed", es: "34 hallazgos cerrados" },
  c3Desc: {
    en: "Closed 34 findings from a formal WCAG 2.1 AA audit through 23 merged pull requests: heading hierarchy site-wide, keyboard navigation, ARIA semantics and focus management.",
    es: "Se cerraron 34 hallazgos de una auditoría formal WCAG 2.1 AA a través de 23 pull requests fusionados: jerarquía de encabezados en todo el sitio, navegación por teclado, semántica ARIA y gestión del foco.",
  },
  c3Source: { en: "Source: CV · Decskill / Zara Home role", es: "Fuente: CV · puesto en Decskill / Zara Home" },

  c4Title: { en: "Angular assessment, SkillValue", es: "Evaluación de Angular, SkillValue" },
  c4Big: { en: "Top 1.42%", es: "Top 1.42%" },
  c4Desc: {
    en: "Scored 95% on an independent Angular assessment by SkillValue (September 2022), ranking in the top 1.42% of all candidates. An exam score, not a certification.",
    es: "Obtuvo un 95% en una evaluación independiente de Angular de SkillValue (septiembre de 2022), quedando en el top 1.42% de todos los candidatos. Es una nota de examen, no una certificación.",
  },
  c4Source: { en: "Source: CV · Education & certifications", es: "Fuente: CV · Formación y certificaciones" },

  c5Title: { en: "Automated review system, self-audited", es: "Sistema de revisión automatizada, autoauditado" },
  c5Big: { en: "21 of 53 rules retired", es: "21 de 53 reglas retiradas" },
  c5Desc: {
    en: "Built a GitHub-connected review system flagging injection, authorization and secrets-management defects before merge. The first version hurt credibility, so its own output was measured against what the team actually used — 21 of 53 rules were retired for creating noise instead of value.",
    es: "Se construyó un sistema de revisión conectado a GitHub que detecta defectos de inyección, autorización y gestión de secretos antes del merge. La primera versión dañaba la credibilidad, así que se midió su propio resultado frente a lo que el equipo realmente usaba: se retiraron 21 de 53 reglas por generar ruido en lugar de valor.",
  },
  c5Note: {
    en: "A Teams CLI from the same effort merged into a shared Inditex engineering repo; a documentation MCP server was separately adopted by the Android team.",
    es: "Una CLI de Teams del mismo esfuerzo se fusionó en un repositorio de ingeniería compartido de Inditex; un servidor MCP de documentación fue adoptado por separado por el equipo de Android.",
  },
  c5Source: { en: "Source: CV · Engineering Controls case study", es: "Fuente: CV · caso de estudio de Controles de Ingeniería" },

  c6Title: { en: "Team scale, Santander banking apps", es: "Escala de equipo, apps bancarias de Santander" },
  c6Desc: {
    en: "Senior Angular reference across three concurrent banking applications. Led a team of 5 on an internal mobile banking app, and was the senior technical reference for a team of 4 on the internal real-estate portal — owning around 80% of the front-end implementation on one of these projects.",
    es: "Referente sénior de Angular en tres aplicaciones bancarias simultáneas. Lideró un equipo de 5 personas en una app bancaria interna móvil, y fue el referente técnico sénior de un equipo de 4 en el portal inmobiliario interno, asumiendo alrededor del 80% de la implementación de frontend en uno de esos proyectos.",
  },
  c6Source: { en: "Source: CV · Vermont Solutions / Santander role", es: "Fuente: CV · puesto en Vermont Solutions / Santander" },
  c6Led: { en: "Team led (mobile banking app)", es: "Equipo liderado (app bancaria móvil)" },
  c6Ref: { en: "Team senior-referenced (real-estate portal)", es: "Equipo con referencia sénior (portal inmobiliario)" },
  c6Own: { en: "Front-end ownership, one project", es: "Propiedad del frontend, un proyecto" },

  viewTable: { en: "View data table", es: "Ver tabla de datos" },
  hideTable: { en: "Hide data table", es: "Ocultar tabla de datos" },

  casesTitle: { en: "Four case studies, fully readable", es: "Cuatro casos de estudio, legibles al completo" },
  casesIntro: {
    en: "Sanitized case studies: no client source code, credentials, internal URLs or private implementation details.",
    es: "Casos de estudio saneados: sin código fuente del cliente, credenciales, URLs internas ni detalles de implementación privados.",
  },
  fieldContext: { en: "Context", es: "Contexto" },
  fieldRole: { en: "My role", es: "Mi papel" },
  fieldProblem: { en: "Frontend problem", es: "Problema de frontend" },
  fieldDecisions: { en: "Engineering decisions", es: "Decisiones de ingeniería" },
  fieldDelivery: { en: "Delivery", es: "Entrega" },
  fieldRollout: { en: "Rollout", es: "Despliegue" },
  fieldRisk: { en: "Risk control", es: "Control de riesgo" },
  fieldContractAnalysis: { en: "Contract analysis", es: "Análisis de contrato" },
  fieldDecision: { en: "Decision", es: "Decisión" },
  fieldImplementation: { en: "Implementation", es: "Implementación" },
  fieldValidation: { en: "Validation", es: "Validación" },
  fieldProblem2: { en: "Problem", es: "Problema" },
  fieldSystem: { en: "System", es: "Sistema" },
  fieldControlLoop: { en: "Control loop", es: "Bucle de control" },
  fieldAdoption: { en: "Adoption", es: "Adopción" },
  fieldOutcome: { en: "Outcome", es: "Resultado" },
  fieldDemonstrates: { en: "What this demonstrates", es: "Qué demuestra" },
  expand: { en: "Read full case study", es: "Leer caso completo" },
  collapse: { en: "Collapse", es: "Cerrar" },

  aboutTitle: { en: "About", es: "Perfil" },
  about1: {
    en: "I am a senior frontend individual contributor working on enterprise Angular products with TypeScript, RxJS, NgRx and server-side rendering.",
    es: "Soy un ingeniero frontend sénior individual, trabajando en productos Angular corporativos con TypeScript, RxJS, NgRx y renderizado del lado del servidor.",
  },
  about2: {
    en: "I am strongest where product frontend meets platform concerns: authentication migrations, API contracts, controlled rollouts, accessibility, performance and SSR.",
    es: "Soy más fuerte donde el frontend de producto se encuentra con las preocupaciones de plataforma: migraciones de autenticación, contratos de API, despliegues controlados, accesibilidad, rendimiento y SSR.",
  },
  about3: {
    en: "Earlier full-stack .NET/C# work from 2018 to 2020 gives me useful backend context without changing the direction of my career: frontend product engineering is the focus.",
    es: "Mi trabajo full-stack anterior en .NET/C# de 2018 a 2020 me da un contexto de backend útil sin cambiar la dirección de mi carrera: la ingeniería de producto frontend es el foco.",
  },
  about4: {
    en: "I also build engineering controls when they solve a delivery problem (automated review, context management and documentation search), but they remain part of the frontend system rather than a separate professional identity.",
    es: "También construyo controles de ingeniería cuando resuelven un problema de entrega (revisión automatizada, gestión de contexto y búsqueda de documentación), pero siguen siendo parte del sistema frontend, no una identidad profesional aparte.",
  },
  skillsTitle: { en: "Skills, by category", es: "Habilidades, por categoría" },
  skillsAngular: { en: "Angular & TypeScript", es: "Angular y TypeScript" },
  skillsProduct: { en: "Product frontend", es: "Frontend de producto" },
  skillsQuality: { en: "Testing & quality", es: "Testing y calidad" },
  skillsApi: { en: "APIs & delivery", es: "APIs y entrega" },
  skillsAi: { en: "AI & engineering tools", es: "IA y herramientas de ingeniería" },

  recsTitle: { en: "What colleagues say", es: "Lo que dicen los compañeros" },

  contactTitle: { en: "Contact", es: "Contacto" },
  contactLede: {
    en: "Reachable directly — email, LinkedIn or GitHub. Both CVs are one click away from anywhere on this page.",
    es: "Contacto directo: correo, LinkedIn o GitHub. Ambos CVs están a un clic desde cualquier parte de esta página.",
  },
  footerA11y: {
    en: "This site targets WCAG 2.1 AA: visible keyboard focus on every interactive element, headings in document order, AA color contrast, and motion disabled when reduced motion is set.",
    es: "Este sitio tiene como objetivo WCAG 2.1 AA: foco de teclado visible en cada elemento interactivo, encabezados en orden de documento, contraste de color AA, y animación desactivada cuando se indica movimiento reducido.",
  },
  footerBuilt: { en: "Built from scratch — static HTML, CSS and hand-rolled SVG charts. No framework.", es: "Construido desde cero: HTML, CSS y gráficos SVG hechos a mano. Sin framework." },
};
