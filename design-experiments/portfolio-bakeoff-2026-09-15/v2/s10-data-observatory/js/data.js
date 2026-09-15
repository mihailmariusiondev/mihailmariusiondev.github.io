/* Structured facts: roles + case studies + recommendations. EN/ES pairs. Source: _context/facts.json */
window.DATA = {
  roles: [
    {
      start: 2025.33, end: 2026.5, // May 2025 - July 2026
      period: { en: "May 2025 – July 2026", es: "Mayo 2025 – julio 2026" },
      company: "Decskill Spain",
      client: { en: "Zara Home (Inditex)", es: "Zara Home (Inditex)" },
      role: { en: "Senior Front-End Analyst (Angular)", es: "Analista Sénior Front-End (Angular)" },
      domain: "ecommerce",
    },
    {
      start: 2024.16, end: 2025.33, // Mar 2024 - May 2025
      period: { en: "March 2024 – May 2025", es: "Marzo 2024 – mayo 2025" },
      company: "Avanade",
      client: { en: "UNIR", es: "UNIR" },
      role: { en: "Senior Front-End Analyst (Angular)", es: "Analista Sénior Front-End (Angular)" },
      domain: "education",
    },
    {
      start: 2022.92, end: 2024.16, // Dec 2022 - Mar 2024
      period: { en: "December 2022 – March 2024", es: "Diciembre 2022 – marzo 2024" },
      company: "Vermont Solutions (Viewnext / IBM)",
      client: { en: "Santander", es: "Santander" },
      role: { en: "Senior Front-End Developer (Angular)", es: "Desarrollador Sénior Front-End (Angular)" },
      domain: "banking",
    },
    {
      start: 2022.75, end: 2022.92, // Oct-Dec 2022
      period: { en: "October – December 2022", es: "Octubre – diciembre 2022" },
      company: "CloudAPPi",
      client: { en: "Regional Government of Madrid", es: "Comunidad de Madrid" },
      role: { en: "Mid-Level Front-End Developer (Angular, React)", es: "Desarrollador Front-End (Angular, React)" },
      domain: "public",
    },
    {
      start: 2021.67, end: 2022.75, // Sep 2021 - Oct 2022
      period: { en: "September 2021 – October 2022", es: "Septiembre 2021 – octubre 2022" },
      company: "ENZO (Rent & Buy S.A.)",
      client: { en: "Unspecified client, AWS serverless stack", es: "Cliente no especificado, stack AWS serverless" },
      role: { en: "Mid-Level Front-End Developer (Angular)", es: "Desarrollador Front-End (Angular)" },
      domain: "other",
    },
    {
      start: 2020.42, end: 2021.67, // Jun 2020 - Sep 2021
      period: { en: "June 2020 – September 2021", es: "Junio 2020 – septiembre 2021" },
      company: { en: "Independent Projects & Upskilling", es: "Proyectos independientes y formación" },
      client: { en: "Career break: WordPress, office automation, frontend upskilling", es: "Pausa profesional: WordPress, automatización de oficina, formación frontend" },
      role: { en: "—", es: "—" },
      domain: "break",
    },
    {
      start: 2020.17, end: 2020.42, // Mar-Jun 2020
      period: { en: "March – June 2020", es: "Marzo – junio 2020" },
      company: "Altran (Capgemini)",
      client: { en: "—", es: "—" },
      role: { en: "Mid-Level Full Stack Developer (.NET)", es: "Desarrollador Full Stack (.NET)" },
      domain: "dotnet",
    },
    {
      start: 2018.83, end: 2019.67, // Nov 2018 - Sep 2019
      period: { en: "November 2018 – September 2019", es: "Noviembre 2018 – septiembre 2019" },
      company: "IO Digital (Query Software)",
      client: { en: "—", es: "—" },
      role: { en: "Mid-Level Full Stack Developer (.NET)", es: "Desarrollador Full Stack (.NET)" },
      domain: "dotnet",
    },
    {
      start: 2018.5, end: 2018.83, // Jul-Nov 2018
      period: { en: "July – November 2018", es: "Julio – noviembre 2018" },
      company: "STRATESYS",
      client: { en: "—", es: "—" },
      role: { en: "Junior Full Stack Developer (.NET)", es: "Desarrollador Junior Full Stack (.NET)" },
      domain: "dotnet",
    },
  ],

  domainLabels: {
    ecommerce: { en: "E-commerce", es: "Comercio electrónico" },
    education: { en: "Education", es: "Educación" },
    banking: { en: "Banking", es: "Banca" },
    public: { en: "Public sector", es: "Sector público" },
    other: { en: "Other", es: "Otro" },
    break: { en: "Break / upskilling", es: "Pausa / formación" },
    dotnet: { en: ".NET full-stack", es: "Full-stack .NET" },
  },

  caseStudies: [
    {
      slug: "realtime-shopping-assistant",
      title: { en: "Real-time Shopping Assistant", es: "Asistente de compra en tiempo real" },
      tags: ["Angular", "TypeScript", "WebRTC", "OpenAI Realtime API", "SSR", "Accessibility"],
      summary: {
        en: "A controlled whitelist pilot: a 96% smaller LLM context payload, SSR-compatible, never opened to the public.",
        es: "Un piloto controlado de lista blanca: un payload de contexto del LLM 96% más pequeño, compatible con SSR, nunca abierto al público.",
      },
      fields: [
        ["fieldContext", { en: "A global, multi-market e-commerce frontend needed a conversational shopping experience with voice, text and product context.", es: "Un frontend de comercio electrónico global y multimercado necesitaba una experiencia de compra conversacional con voz, texto y contexto de producto." }],
        ["fieldRole", { en: "I implemented the Angular integration as a senior individual contributor. The wider product was a team effort, with a co-lead alongside me.", es: "Implementé la integración de Angular como colaborador individual sénior. El producto más amplio fue un esfuerzo de equipo, con un colíder junto a mí." }],
        ["fieldProblem", { en: "Manage the WebRTC lifecycle, initialize only on request, stay SSR-safe, keep the model context bounded, and avoid tracking before the assistant opened.", es: "Gestionar el ciclo de vida de WebRTC, inicializar solo bajo demanda, mantenerse seguro en SSR, acotar el contexto del modelo y evitar el seguimiento antes de abrir el asistente." }],
        ["fieldDecisions", { en: "Lazy initialization, platform guards, a controlled feature flag, and a routing and context-stripping design.", es: "Inicialización perezosa, guardas de plataforma, un feature flag controlado y un diseño de enrutado y recorte de contexto." }],
        ["fieldOutcome", { en: "Reached production as a controlled whitelist pilot, never opened publicly. LLM context payload fell from 570 KB to 22 KB per execution (96% reduction).", es: "Llegó a producción como piloto controlado de lista blanca, nunca abierto públicamente. El payload de contexto del LLM cayó de 570 KB a 22 KB por ejecución (96% de reducción)." }],
        ["fieldDemonstrates", { en: "Angular integration, async lifecycle management, SSR safety, accessibility, controlled rollout, measurable context design.", es: "Integración de Angular, gestión de ciclo de vida asíncrono, seguridad SSR, accesibilidad, despliegue controlado, diseño de contexto medible." }],
      ],
    },
    {
      slug: "help-center-rollout",
      title: { en: "Help Center Rollout", es: "Despliegue del Centro de Ayuda" },
      tags: ["Angular", "SSR", "Feature Flags", "Observability", "Accessibility"],
      summary: {
        en: "A country-by-country Help Center rollout with SSR-safe Angular integration, stable routes and accessible localized experiences.",
        es: "Un despliegue del Centro de Ayuda país a país, con integración de Angular segura en SSR, rutas estables y experiencias localizadas y accesibles.",
      },
      fields: [
        ["fieldContext", { en: "A new conversational Help Center rolled out country by country without changing existing entry points.", es: "Un nuevo Centro de Ayuda conversacional se desplegó país a país sin cambiar los puntos de entrada existentes." }],
        ["fieldDelivery", { en: "Integrated the conversational experience into existing Angular routes and localized entry points across markets.", es: "Integré la experiencia conversacional en las rutas de Angular existentes y en los puntos de entrada localizados en varios mercados." }],
        ["fieldRollout", { en: "Expanded market by market, with SSR behavior, accessibility and route stability verified before each step.", es: "Se expandió mercado a mercado, verificando el comportamiento SSR, la accesibilidad y la estabilidad de rutas antes de cada paso." }],
        ["fieldRisk", { en: "Preserved existing entry points and user-facing behavior while the new experience expanded.", es: "Se preservaron los puntos de entrada existentes y el comportamiento de cara al usuario mientras se expandía la nueva experiencia." }],
        ["fieldOutcome", { en: "Rolled out country by country with stable routes, localized titles, accessibility and SSR support.", es: "Se desplegó país a país con rutas estables, títulos localizados, accesibilidad y soporte SSR." }],
        ["fieldDemonstrates", { en: "Angular delivery, SSR, accessibility, staged rollout, risk control across localized markets.", es: "Entrega en Angular, SSR, accesibilidad, despliegue por etapas, control de riesgo en mercados localizados." }],
      ],
    },
    {
      slug: "passwordless-account-migration",
      title: { en: "Passwordless Account Migration", es: "Migración de cuentas sin contraseña" },
      tags: ["Angular", "Authentication", "API Contracts", "OTP", "NgRx", "Integration Testing"],
      summary: {
        en: "A contract-first passwordless migration with separate password and OTP paths, delivered through incremental scope and end-to-end validation.",
        es: "Una migración sin contraseña centrada en el contrato, con rutas separadas de contraseña y OTP, entregada con alcance incremental y validación de extremo a extremo.",
      },
      fields: [
        ["fieldContext", { en: "The account area had to support existing-password and passwordless users without disrupting established flows.", es: "El área de cuenta debía dar soporte a usuarios con contraseña existente y sin contraseña sin interrumpir los flujos establecidos." }],
        ["fieldContractAnalysis", { en: "Mapped UI dependencies and auth states before changing flows, scoped implementation to the verified contract.", es: "Mapeé las dependencias de la UI y los estados de autenticación antes de cambiar los flujos, y acoté la implementación al contrato verificado." }],
        ["fieldDecision", { en: "Kept the migration incremental, separating password-state handling from the rest of the account experience.", es: "Mantuve la migración incremental, separando la gestión del estado de contraseña del resto de la experiencia de cuenta." }],
        ["fieldImplementation", { en: "Separate password and OTP paths (email change, password creation), with dependent actions gated by auth state, driven by hasPassword.", es: "Rutas separadas de contraseña y OTP (cambio de correo, creación de contraseña), con acciones dependientes controladas por el estado de autenticación, guiadas por hasPassword." }],
        ["fieldValidation", { en: "Validated in a pre-integration environment across four documented scenarios: existing-password behavior, passwordless forms, OTP email change, password creation.", es: "Validado en un entorno de preintegración en cuatro escenarios documentados: comportamiento con contraseña existente, formularios sin contraseña, cambio de correo por OTP, creación de contraseña." }],
        ["fieldOutcome", { en: "Delivered incrementally without disrupting existing account behavior.", es: "Se entregó de forma incremental sin interrumpir el comportamiento existente de la cuenta." }],
        ["fieldDemonstrates", { en: "Contract-first frontend integration, auth state, scope control, backward compatibility, risk-based decision-making.", es: "Integración frontend centrada en el contrato, estado de autenticación, control de alcance, compatibilidad retroactiva, decisiones basadas en riesgo." }],
      ],
    },
    {
      slug: "engineering-controls",
      title: { en: "Engineering Controls for Frontend Delivery", es: "Controles de ingeniería para la entrega frontend" },
      tags: ["GitHub", "Automated Review", "Prompt & Context Engineering", "MCP", "Developer Tooling"],
      summary: {
        en: "An automated review system that measured its own noise, retired 21 of its 53 rules, and got adopted outside its origin team.",
        es: "Un sistema de revisión automatizada que midió su propio ruido, retiró 21 de sus 53 reglas y fue adoptado fuera de su equipo de origen.",
      },
      fields: [
        ["fieldProblem2", { en: "Automated review can look like coverage while producing noise and untrusted rules.", es: "La revisión automatizada puede parecer cobertura mientras produce ruido y reglas poco fiables." }],
        ["fieldSystem", { en: "A GitHub-connected review system with domain-specific checks, flagging injection, authorization and secrets-management defects before merge.", es: "Un sistema de revisión conectado a GitHub con comprobaciones específicas de dominio, que detecta defectos de inyección, autorización y gestión de secretos antes del merge." }],
        ["fieldControlLoop", { en: "The first version hurt credibility; measured output and removed ignored rules, retiring 21 of 53.", es: "La primera versión dañó la credibilidad; se midió el resultado y se eliminaron las reglas ignoradas, retirando 21 de 53." }],
        ["fieldAdoption", { en: "A Teams CLI merged into a shared Inditex engineering repo; a documentation MCP adopted by the Android team.", es: "Una CLI de Teams se fusionó en un repositorio de ingeniería compartido de Inditex; un MCP de documentación fue adoptado por el equipo de Android." }],
        ["fieldDemonstrates", { en: "The signal isn't \"an LLM was present\" — it's that the automation had boundaries, measurement, rejection criteria, and adoption outside its origin team.", es: "La señal no es «había un LLM presente»: es que la automatización tenía límites, medición, criterios de rechazo y adopción fuera de su equipo de origen." }],
      ],
    },
  ],

  recommendations: [
    {
      quote: {
        en: "His knowledge of Angular is excellent, but what I really highlight from working with him is his willingness to help and share his experience. Another aspect I value a lot about Marius is his focus on good practices. He not only applies them in his daily work, but also promotes their adoption within the team, organizing meetings when necessary and aligning everyone around building quality, maintainable and scalable software.",
        es: "Su conocimiento de Angular es excelente, pero lo que realmente destaco de trabajar con él es su disposición a ayudar y compartir su experiencia. Otro aspecto que valoro mucho de Marius es su enfoque en las buenas prácticas. No solo las aplica en su trabajo diario, sino que también promueve su adopción en el equipo, organizando reuniones cuando es necesario y alineando a todos en la construcción de software de calidad, mantenible y escalable.",
      },
      author: "José Luis Murcia Gámez",
      role: { en: "Frontend Developer, UNIR project (Avanade)", es: "Desarrollador Frontend, proyecto UNIR (Avanade)" },
    },
    {
      quote: {
        en: "Working with Marius has been a real pleasure. I especially highlight his initiative with AI tools applied to development, from which I learned a great deal working side by side with him. Any team would be more than fortunate to count on someone with his technical level and his attitude.",
        es: "Trabajar con Marius ha sido un verdadero placer. Destaco especialmente su iniciativa con herramientas de IA aplicadas al desarrollo, de las que aprendí mucho trabajando codo con codo con él. Cualquier equipo tendría mucha suerte de contar con alguien con su nivel técnico y su actitud.",
      },
      author: "Juan Pablo Romero Pereira",
      role: { en: "Frontend Developer, Zara Home (Inditex)", es: "Desarrollador Frontend, Zara Home (Inditex)" },
    },
    {
      quote: {
        en: "Marius proved to be a highly adaptable and resourceful programmer on both occasions we worked together, at Stratesys and at Avanade (consultancy/service provider for Proeduca), where he worked as an external consultant. His ability to learn quickly and his contribution to the projects were fundamental. I highly recommend him for his professionalism and technical skills.",
        es: "Marius demostró ser un programador muy adaptable y resolutivo en las dos ocasiones en que trabajamos juntos, en Stratesys y en Avanade (consultora/proveedora de servicios para Proeduca), donde trabajó como consultor externo. Su capacidad de aprendizaje rápido y su contribución a los proyectos fueron fundamentales. Lo recomiendo encarecidamente por su profesionalidad y habilidades técnicas.",
      },
      author: "José Luis Rodríguez-Campra Camberos",
      role: { en: "BAU Coordinator / Scrum Master", es: "Coordinador BAU / Scrum Master" },
    },
    {
      quote: {
        en: "Great partner, he has done a great job in his last project demonstrating that he can design and build business applications successfully.",
        es: "Gran compañero, ha hecho un gran trabajo en su último proyecto demostrando que puede diseñar y construir aplicaciones empresariales con éxito.",
      },
      author: "Antonio Bermúdez Rodríguez",
      role: { en: "Developer", es: "Desarrollador" },
    },
    {
      quote: {
        en: "Marius was a great professional to work with. We worked together at ENZO, and his work ethic is immaculate; he is very easy to work with and goes out of his way to help when you ask for guidance.",
        es: "Marius fue un gran profesional con el que trabajar. Trabajamos juntos en ENZO, y su ética de trabajo es impecable; es muy fácil trabajar con él y se esfuerza por ayudar cuando le pides orientación.",
      },
      author: "Gonzalo Rodríguez Muñoz",
      role: { en: "Full Stack Software Developer, ENZO", es: "Desarrollador Full Stack, ENZO" },
    },
  ],

  skills: {
    angular: ["Angular 8–20", "Signals", "Standalone Components", "SSR", "Lazy loading", "RxJS", "NgRx", "Angular Material/CDK", "Feature flags"],
    product: ["JavaScript", "HTML5", "CSS/SCSS", "React 17", "Responsive design", "Design systems", "WCAG 2.1 AA", "i18n (Transloco)", "Web performance"],
    quality: ["Jest", "Karma/Jasmine", "SonarQube/SonarCloud", "ESLint", "Prettier", "PR review"],
    api: ["REST", "OpenAPI/Swagger", "OAuth 2.0", "JWT", "HTTP interceptors", "WebRTC", "AWS (Lambda, Cognito, API GW, S3)", "GitHub Actions", "Figma", "Agile/Scrum"],
    ai: ["OpenAI Realtime API", "WebRTC", "LLM integrations", "Prompt & context engineering", "MCP tooling"],
  },
};
