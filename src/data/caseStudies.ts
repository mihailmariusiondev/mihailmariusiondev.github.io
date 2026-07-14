import type { Localized } from "../i18n";

export interface CaseStudy {
  /** Shared across languages: the same case lives at the same slug in `/es/`. */
  slug: string;
  title: Localized<string>;
  /** Technology names stay unchanged; descriptive tags are localized. */
  tags: Localized<string>[];
  summary: Localized<string>;
  fields: { label: Localized<string>; value: Localized<string> }[];
  confidential?: Localized<string>;
}

const SANITIZED: Localized<string> = {
  en: "This case study is sanitized. It contains no client source code, credentials, internal URLs or private implementation details.",
  es: "Este caso está sanitizado. No contiene código fuente del cliente, credenciales, URLs internas ni detalles privados de implementación.",
};

const WHAT_THIS_DEMONSTRATES: Localized<string> = {
  en: "What this demonstrates",
  es: "Qué demuestra",
};

const CONTEXT: Localized<string> = { en: "Context", es: "Contexto" };
const OUTCOME: Localized<string> = { en: "Outcome", es: "Resultado" };

export const caseStudies: CaseStudy[] = [
  {
    slug: "realtime-shopping-assistant",
    title: {
      en: "Real-time Shopping Assistant",
      es: "Asistente de compra en tiempo real",
    },
    tags: [
      { en: "Angular", es: "Angular" },
      { en: "TypeScript", es: "TypeScript" },
      { en: "WebRTC", es: "WebRTC" },
      { en: "OpenAI Realtime API", es: "OpenAI Realtime API" },
      { en: "SSR", es: "SSR" },
      { en: "Accessibility", es: "Accesibilidad" },
    ],
    summary: {
      en: "A controlled whitelist pilot: 96% smaller tool payloads, safe under SSR, never opened to the public.",
      es: "Un piloto controlado mediante lista blanca: cargas útiles de herramientas un 96% más pequeñas, seguro bajo SSR y nunca abierto al público.",
    },
    fields: [
      {
        label: CONTEXT,
        value: {
          en: "A global, multi-market e-commerce frontend needed a conversational shopping experience with voice, text, product context and escalation to a human agent.",
          es: "Un frontend de comercio electrónico global y multimercado necesitaba una experiencia de compra conversacional con voz, texto, contexto de producto y escalado a un agente humano.",
        },
      },
      {
        label: { en: "My role", es: "Mi papel" },
        value: {
          en: "I implemented the Angular integration as a senior individual contributor. The wider product was a team effort, with a co-lead alongside me.",
          es: "Implementé la integración en Angular como profesional sénior. El producto en su conjunto fue un trabajo de equipo, con otro responsable técnico a mi lado.",
        },
      },
      {
        label: { en: "The frontend problem", es: "El problema de frontend" },
        value: {
          en: "The integration had to manage the WebRTC lifecycle, initialize only when requested, remain safe during server rendering, keep the model context bounded and avoid tracking before the customer opened the assistant.",
          es: "La integración tenía que gestionar el ciclo de vida de WebRTC, inicializarse solo cuando se pedía, ser segura durante el renderizado en servidor, mantener acotado el contexto del modelo y evitar cualquier seguimiento antes de que el cliente abriera el asistente.",
        },
      },
      {
        label: { en: "Engineering decisions", es: "Decisiones de ingeniería" },
        value: {
          en: "Lazy initialization, platform guards, a controlled feature flag and a routing and context-stripping design.",
          es: "Inicialización diferida, protecciones de plataforma, un indicador de funcionalidad controlado y un diseño de enrutado y limpieza de contexto.",
        },
      },
      {
        label: OUTCOME,
        value: {
          en: "The code reached production as a controlled whitelist pilot and was never opened to the public. Tool payloads fell from 570 KB to 22 KB per execution, a 96% reduction.",
          es: "El código llegó a producción como piloto controlado mediante lista blanca y nunca se abrió al público. Las cargas útiles de las herramientas bajaron de 570 KB a 22 KB por ejecución, una reducción del 96%.",
        },
      },
      {
        label: WHAT_THIS_DEMONSTRATES,
        value: {
          en: "Angular integration work, asynchronous lifecycle management, SSR safety, accessibility, controlled rollout and measurable context design.",
          es: "Trabajo de integración en Angular, gestión de ciclos de vida asíncronos, seguridad bajo SSR, accesibilidad, despliegue controlado y diseño de contexto medible.",
        },
      },
    ],
    confidential: SANITIZED,
  },
  {
    slug: "help-center-rollout",
    title: {
      en: "Help Center Rollout",
      es: "Despliegue del Centro de Ayuda",
    },
    tags: [
      { en: "Angular", es: "Angular" },
      { en: "SSR", es: "SSR" },
      { en: "Feature Flags", es: "Indicadores de funcionalidad" },
      { en: "Observability", es: "Observabilidad" },
      { en: "Accessibility", es: "Accesibilidad" },
    ],
    summary: {
      en: "A country-by-country Help Center rollout with SSR-safe Angular integration, stable routes and accessible localized experiences.",
      es: "Un despliegue del Centro de Ayuda país por país con integración Angular segura bajo SSR, rutas estables y experiencias localizadas accesibles.",
    },
    fields: [
      {
        label: CONTEXT,
        value: {
          en: "A new conversational Help Center had to replace legacy shopping guides country by country without changing the existing entry points.",
          es: "Un nuevo Centro de Ayuda conversacional tenía que sustituir a las guías de compra heredadas país por país sin cambiar los puntos de entrada existentes.",
        },
      },
      {
        label: { en: "Delivery", es: "Entrega" },
        value: {
          en: "I integrated the conversational experience into the existing Angular routes and localized entry points across markets.",
          es: "Integré la experiencia conversacional en las rutas Angular y los puntos de entrada localizados existentes en cada mercado.",
        },
      },
      {
        label: { en: "Rollout", es: "Despliegue" },
        value: {
          en: "The release expanded market by market, with SSR behavior, accessibility and route stability verified before each step.",
          es: "El lanzamiento avanzó mercado a mercado, verificando antes de cada paso el comportamiento bajo SSR, la accesibilidad y la estabilidad de las rutas.",
        },
      },
      {
        label: { en: "Risk control", es: "Control de riesgo" },
        value: {
          en: "The integration preserved existing entry points and user-facing behavior while the new experience expanded.",
          es: "La integración preservó los puntos de entrada y el comportamiento visible para el usuario mientras se ampliaba la nueva experiencia.",
        },
      },
      {
        label: OUTCOME,
        value: {
          en: "The Help Center rolled out country by country with stable routes, localized titles, accessibility and SSR support.",
          es: "El Centro de Ayuda se desplegó país por país con rutas estables, títulos localizados, accesibilidad y soporte SSR.",
        },
      },
      {
        label: WHAT_THIS_DEMONSTRATES,
        value: {
          en: "Angular delivery, SSR, accessibility, staged rollout and risk control across localized markets.",
          es: "Entrega Angular, SSR, accesibilidad, despliegue gradual y control de riesgo entre mercados localizados.",
        },
      },
    ],
  },
  {
    slug: "passwordless-account-migration",
    title: {
      en: "Passwordless Account Migration",
      es: "Migración de cuentas a autenticación sin contraseña",
    },
    tags: [
      { en: "Angular", es: "Angular" },
      { en: "Authentication", es: "Autenticación" },
      { en: "API Contracts", es: "Contratos de API" },
      { en: "OTP", es: "OTP" },
      { en: "NgRx", es: "NgRx" },
      { en: "Integration Testing", es: "Pruebas de integración" },
    ],
    summary: {
      en: "A contract-first passwordless migration with separate password and OTP paths, delivered through incremental scope and end-to-end validation.",
      es: "Una migración sin contraseña guiada por contratos, con caminos separados para contraseña y OTP, alcance incremental y validación de extremo a extremo.",
    },
    fields: [
      {
        label: CONTEXT,
        value: {
          en: "The account area had to support both existing-password and passwordless users without disrupting established flows.",
          es: "El área de cuenta tenía que admitir usuarios con contraseña y sin ella sin interrumpir los flujos existentes.",
        },
      },
      {
        label: { en: "Contract analysis", es: "Análisis del contrato" },
        value: {
          en: "I mapped the UI dependencies and authentication states before changing the flows, then scoped the implementation around the verified contract.",
          es: "Mapeé las dependencias de la interfaz y los estados de autenticación antes de cambiar los flujos, y acoté la implementación al contrato verificado.",
        },
      },
      {
        label: { en: "Decision", es: "Decisión" },
        value: {
          en: "I kept the migration incremental, separating password-state handling from the rest of the account experience.",
          es: "Mantuve la migración incremental, separando la gestión del estado de contraseña del resto de la experiencia de cuenta.",
        },
      },
      {
        label: { en: "Implementation", es: "Implementación" },
        value: {
          en: "The UI followed separate password and OTP paths, including email change and password creation, with dependent actions gated by authentication state.",
          es: "La interfaz siguió caminos separados para contraseña y OTP, incluido el cambio de email y la creación de contraseña, con las acciones dependientes gobernadas por el estado de autenticación.",
        },
      },
      {
        label: { en: "Validation", es: "Validación" },
        value: {
          en: "The resulting flows were validated in a pre-integration environment, including existing-password behaviour, passwordless forms, OTP email change and password creation.",
          es: "Los flujos resultantes se validaron en un entorno de preintegración, incluido el comportamiento con contraseña existente, los formularios sin contraseña, el cambio de correo electrónico por OTP y la creación de contraseña.",
        },
      },
      {
        label: OUTCOME,
        value: {
          en: "The passwordless flows were delivered incrementally without disrupting existing account behavior.",
          es: "Los flujos sin contraseña se entregaron de forma incremental sin interrumpir el comportamiento existente del área de cuenta.",
        },
      },
      {
        label: WHAT_THIS_DEMONSTRATES,
        value: {
          en: "Contract-first frontend integration, authentication state, scope control, backward compatibility and risk-based decision-making.",
          es: "Integración de frontend con el contrato por delante, estado de autenticación, control del alcance, retrocompatibilidad y toma de decisiones basada en riesgo.",
        },
      },
    ],
  },
  {
    slug: "engineering-controls",
    title: {
      en: "Engineering Controls for Frontend Delivery",
      es: "Controles de ingeniería para la entrega de frontend",
    },
    tags: [
      { en: "GitHub", es: "GitHub" },
      { en: "Automated Review", es: "Revisión automatizada" },
      { en: "Prompt and Context Engineering", es: "Ingeniería de instrucciones y contexto" },
      { en: "MCP", es: "MCP" },
      { en: "Developer Tooling", es: "Herramientas de desarrollo" },
    ],
    summary: {
      en: "An automated review system that measured its own noise, retired 21 of its 53 rules, and got adopted outside its origin team.",
      es: "Un sistema de revisión automatizada que midió su propio ruido, retiró 21 de sus 53 reglas y acabó adoptado fuera de su equipo de origen.",
    },
    fields: [
      {
        label: { en: "Problem", es: "Problema" },
        value: {
          en: "Automated review can create the appearance of coverage while producing noise, duplicate feedback and rules that the team does not trust.",
          es: "La revisión automatizada puede aparentar cobertura mientras produce ruido, comentarios duplicados y reglas en las que el equipo no confía.",
        },
      },
      {
        label: { en: "System", es: "Sistema" },
        value: {
          en: "I built a GitHub-connected review system with domain-specific checks. The system flagged injection, authorization and secrets-management defects before merge.",
          es: "Construí un sistema de revisión conectado a GitHub con comprobaciones específicas del dominio. El sistema detectaba defectos de inyección, autorización y gestión de secretos antes de la integración.",
        },
      },
      {
        label: { en: "Control loop", es: "Bucle de control" },
        value: {
          en: "The first version generated credibility problems. I measured its output and removed rules the team consistently ignored, retiring 21 of its 53 rules.",
          es: "La primera versión generó problemas de credibilidad. Medí su salida y eliminé las reglas que el equipo ignoraba sistemáticamente, retirando 21 de sus 53 reglas.",
        },
      },
      {
        label: { en: "Adoption", es: "Adopción" },
        value: {
          en: "A Teams CLI was merged into a shared Inditex engineering repository, and a documentation MCP was adopted by the Android team.",
          es: "Una CLI de Teams se integró en un repositorio de ingeniería compartido de Inditex, y un MCP de documentación fue adoptado por el equipo de Android.",
        },
      },
      {
        label: WHAT_THIS_DEMONSTRATES,
        value: {
          en: "The useful signal is not that an LLM was present. It is that the automation had boundaries, measurement, rejection criteria and adoption outside its original team.",
          es: "La señal útil no es que hubiera un LLM de por medio. Es que la automatización tenía límites, medición, criterios de rechazo y adopción fuera de su equipo original.",
        },
      },
    ],
  },
];
