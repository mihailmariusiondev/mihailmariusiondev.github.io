import type { Localized } from "../i18n";

export interface CaseStudy {
  /** Shared across languages: the same case lives at the same slug in `/es/`. */
  slug: string;
  title: Localized<string>;
  /** Technology tags stay in English in both versions: they are proper nouns. */
  tags: string[];
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
      "Angular",
      "TypeScript",
      "WebRTC",
      "OpenAI Realtime API",
      "SSR",
      "Accessibility",
    ],
    summary: {
      en: "A controlled whitelist pilot: 96% smaller tool payloads, safe under SSR, never opened to the public.",
      es: "Un piloto controlado por whitelist: payloads de tools un 96% más pequeños, seguro bajo SSR, nunca abierto al público.",
    },
    fields: [
      {
        label: CONTEXT,
        value: {
          en: "A global, multi-market e-commerce frontend needed a conversational shopping experience with voice, text, product context and escalation to a human agent.",
          es: "Un frontend de e-commerce global y multimercado necesitaba una experiencia de compra conversacional con voz, texto, contexto de producto y escalado a un agente humano.",
        },
      },
      {
        label: { en: "My role", es: "Mi papel" },
        value: {
          en: "I implemented the Angular integration as a senior individual contributor. I was not the sole owner of the wider product.",
          es: "Implementé la integración en Angular como individual contributor senior. No era el único responsable del producto en su conjunto.",
        },
      },
      {
        label: { en: "The frontend problem", es: "El problema de frontend" },
        value: {
          en: "The integration had to manage the WebRTC lifecycle, initialize only when requested, remain safe during server rendering, keep the model context bounded and avoid tracking before the customer opened the assistant.",
          es: "La integración tenía que gestionar el ciclo de vida de WebRTC, inicializarse solo cuando se pedía, ser segura durante el renderizado en servidor, mantener acotado el contexto del modelo y evitar cualquier tracking antes de que el cliente abriera el asistente.",
        },
      },
      {
        label: { en: "Engineering decisions", es: "Decisiones de ingeniería" },
        value: {
          en: "Lazy initialization, platform guards, a controlled feature flag and a routing and context-stripping design.",
          es: "Inicialización lazy, guards de plataforma, un feature flag controlado y un diseño de enrutado y limpieza de contexto.",
        },
      },
      {
        label: OUTCOME,
        value: {
          en: "The code reached production as a controlled whitelist pilot and was never opened to the public. Tool payloads fell from 570 KB to 22 KB per execution, a 96% reduction.",
          es: "El código llegó a producción como piloto controlado por whitelist y nunca se abrió al público. Los payloads de las tools bajaron de 570 KB a 22 KB por ejecución, una reducción del 96%.",
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
      es: "Despliegue del Help Center",
    },
    tags: ["Angular", "SSR", "GrowthBook", "Feature Flags", "APM", "Accessibility"],
    summary: {
      en: "A route-level flag guard failed under SSR. Replacing it with a render-time switch fixed direct loads without breaking live observability contracts.",
      es: "Un guard de feature flag a nivel de ruta fallaba bajo SSR. Sustituirlo por un switch en tiempo de renderizado arregló las cargas directas sin romper los contratos de observabilidad en producción.",
    },
    fields: [
      {
        label: CONTEXT,
        value: {
          en: "A new conversational Help Center had to replace legacy shopping guides country by country without changing the existing entry points.",
          es: "Un nuevo Help Center conversacional tenía que sustituir a las guías de compra heredadas país por país sin cambiar los puntos de entrada existentes.",
        },
      },
      {
        label: { en: "The failure mode", es: "El fallo" },
        value: {
          en: "The first design used canMatch to select the new or legacy experience. The guard ran before GrowthBook was initialized, so direct loads and SSR selected the legacy page even when the feature was enabled. It appeared to work only after client-side navigation.",
          es: "El primer diseño usaba canMatch para elegir entre la experiencia nueva y la heredada. El guard se ejecutaba antes de que GrowthBook estuviera inicializado, así que las cargas directas y el SSR elegían la página heredada incluso con la funcionalidad activada. Solo parecía funcionar tras una navegación en cliente.",
        },
      },
      {
        label: { en: "Correction", es: "Corrección" },
        value: {
          en: "I replaced the route-level decision with a render-time switch. A later review exposed a server-to-client flash, so the component stopped committing to either variant during server rendering and selected the correct experience on the client.",
          es: "Sustituí la decisión a nivel de ruta por un switch en tiempo de renderizado. Una revisión posterior destapó un parpadeo entre servidor y cliente, así que el componente dejó de comprometerse con ninguna variante durante el renderizado en servidor y pasó a elegir la experiencia correcta en el cliente.",
        },
      },
      {
        label: { en: "Contract preservation", es: "Preservación de contratos" },
        value: {
          en: "The internal names were cleaned up while the external GrowthBook key and APM screen value remained stable. Renaming those wire values would have broken a rollout already in progress and existing observability dashboards.",
          es: "Se limpiaron los nombres internos mientras la clave externa de GrowthBook y el valor de pantalla del APM se mantenían estables. Renombrar esos valores de cara al exterior habría roto un despliegue ya en marcha y los dashboards de observabilidad existentes.",
        },
      },
      {
        label: OUTCOME,
        value: {
          en: "The Help Center could roll out country by country with correct direct-load behaviour, stable routes, localized titles and preserved analytics and APM contracts.",
          es: "El Help Center pudo desplegarse país por país con un comportamiento correcto en carga directa, rutas estables, títulos localizados y los contratos de analítica y APM intactos.",
        },
      },
      {
        label: WHAT_THIS_DEMONSTRATES,
        value: {
          en: "SSR diagnosis, feature-flag lifecycle, hydration, observability contracts and willingness to replace an incorrect first design.",
          es: "Diagnóstico de SSR, ciclo de vida de feature flags, hidratación, contratos de observabilidad y disposición a sustituir un primer diseño equivocado.",
        },
      },
    ],
  },
  {
    slug: "passwordless-account-migration",
    title: {
      en: "Passwordless Account Migration",
      es: "Migración de cuentas a passwordless",
    },
    tags: [
      "Angular",
      "Authentication",
      "API Contracts",
      "OTP",
      "NgRx",
      "Integration Testing",
    ],
    summary: {
      en: "A new auth endpoint looked like a drop-in replacement. Field-by-field contract analysis showed it wasn't, and scoped the migration accordingly.",
      es: "Un nuevo endpoint de autenticación parecía un reemplazo directo. El análisis del contrato campo por campo demostró que no lo era, y acotó la migración en consecuencia.",
    },
    fields: [
      {
        label: CONTEXT,
        value: {
          en: "The account area assumed every user had a password. A new authentication model introduced passwordless users, leaving existing forms unusable for them.",
          es: "El área de cuenta daba por hecho que todos los usuarios tenían contraseña. Un nuevo modelo de autenticación introdujo usuarios passwordless, dejando los formularios existentes inservibles para ellos.",
        },
      },
      {
        label: { en: "Contract analysis", es: "Análisis del contrato" },
        value: {
          en: "Before replacing the legacy user call, I compared the new Storefront endpoint field by field with the data contract consumed by the application. Critical account and identity information was absent.",
          es: "Antes de sustituir la llamada heredada de usuario, comparé el nuevo endpoint de Storefront campo por campo con el contrato de datos que consumía la aplicación. Faltaba información crítica de cuenta y de identidad.",
        },
      },
      {
        label: { en: "Decision", es: "Decisión" },
        value: {
          en: "Instead of treating the new endpoint as a drop-in replacement, I used it only for the password-state signal and retained the legacy data path for the remaining contract.",
          es: "En lugar de tratar el nuevo endpoint como un reemplazo directo, lo usé solo para la señal de estado de la contraseña y mantuve la vía de datos heredada para el resto del contrato.",
        },
      },
      {
        label: { en: "Implementation", es: "Implementación" },
        value: {
          en: "The UI followed separate password and OTP paths. Passwordless users could change email and add a password, while dependent functionality remained unavailable until the prerequisite existed. Failure of the new endpoint was handled fail-closed.",
          es: "La interfaz siguió caminos separados para contraseña y OTP. Los usuarios passwordless podían cambiar el email y añadir una contraseña, mientras que la funcionalidad dependiente seguía no disponible hasta que existiera el prerrequisito. El fallo del nuevo endpoint se gestionó como fail-closed.",
        },
      },
      {
        label: { en: "Validation", es: "Validación" },
        value: {
          en: "The resulting flows were validated in a pre-integration environment, including existing-password behaviour, passwordless forms, OTP email change and password creation.",
          es: "Los flujos resultantes se validaron en un entorno de preintegración, incluyendo el comportamiento con contraseña existente, los formularios passwordless, el cambio de email por OTP y la creación de contraseña.",
        },
      },
      {
        label: OUTCOME,
        value: {
          en: "The passwordless flows were delivered without pretending that a full endpoint migration was safe.",
          es: "Los flujos passwordless se entregaron sin fingir que una migración completa del endpoint fuera segura.",
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
      "GitHub",
      "Automated Review",
      "Prompt and Context Engineering",
      "MCP",
      "Developer Tooling",
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
          es: "La revisión automatizada puede aparentar cobertura mientras produce ruido, feedback duplicado y reglas en las que el equipo no confía.",
        },
      },
      {
        label: { en: "System", es: "Sistema" },
        value: {
          en: "I built a GitHub-connected review system with domain-specific checks. The system flagged injection, authorization and secrets-management defects before merge.",
          es: "Construí un sistema de revisión conectado a GitHub con comprobaciones específicas del dominio. El sistema detectaba defectos de inyección, autorización y gestión de secretos antes del merge.",
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
          es: "Una CLI de Teams se mergeó en un repositorio de ingeniería compartido de Inditex, y un MCP de documentación fue adoptado por el equipo de Android.",
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
