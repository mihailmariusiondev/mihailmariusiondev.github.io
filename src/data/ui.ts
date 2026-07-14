/**
 * Every string of page chrome and prose that is not case-study or experience
 * data. Same rule as the data files: both languages on the same object, so the
 * Spanish version can never lose a string without failing `astro check`.
 */
import type { Localized } from "../i18n";

export interface NavItem {
  /** Site-root path, without locale prefix. Localized at render time. */
  href: string;
  label: Localized<string>;
  /** Icon key in SiteNav. Stable across languages. */
  icon: "home" | "work" | "experience" | "about" | "contact";
  /** Current-page match against the locale-stripped path. */
  match: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: { en: "Home", es: "Inicio" }, icon: "home", match: "/" },
  {
    href: "/case-studies/",
    label: { en: "Work", es: "Trabajo" },
    icon: "work",
    match: "/case-studies",
  },
  {
    href: "/experience/",
    label: { en: "Experience", es: "Experiencia" },
    icon: "experience",
    match: "/experience",
  },
  {
    href: "/about/",
    label: { en: "About", es: "Perfil" },
    icon: "about",
    match: "/about",
  },
  {
    href: "/contact/",
    label: { en: "Contact", es: "Contacto" },
    icon: "contact",
    match: "/contact",
  },
];

export const ui = {
  siteRole: {
    en: "Senior Angular / Frontend Engineer",
    es: "Senior Angular / Frontend Engineer",
  },
  skipLink: {
    en: "Skip to main content",
    es: "Saltar al contenido principal",
  },
  navPrimary: { en: "Primary", es: "Principal" },
  navPrimaryBottom: {
    en: "Primary, bottom bar",
    es: "Principal, barra inferior",
  },
  languageSwitcherLabel: { en: "Language", es: "Idioma" },
  /** Aria-label on the link that leads to the other language. */
  languageSwitchTo: {
    en: "Ver esta página en español",
    es: "View this page in English",
  },
  /** Visible text on that same link: always written in the target language. */
  languageSwitchText: { en: "ES", es: "EN" },

  footerA11yTitle: {
    en: "Accessibility statement:",
    es: "Declaración de accesibilidad:",
  },
  footerA11yBody: {
    en: "this site targets WCAG 2.1 AA. Every interactive element has a visible keyboard focus state, headings are structured in document order, color contrast is checked against the AA thresholds, and motion is disabled when",
    es: "este sitio cumple el objetivo WCAG 2.1 AA. Cada elemento interactivo tiene un estado de foco de teclado visible, los encabezados siguen el orden del documento, el contraste de color se comprueba contra los umbrales AA, y la animación se desactiva cuando",
  },
  footerA11yReport: {
    en: "is set. Report an issue:",
    es: "está activo. Informa de un problema:",
  },
  footerBuilt: {
    en: "Built with Astro",
    es: "Hecho con Astro",
  },

  // Home
  homeTitle: {
    en: "Marius Mihail Ion · Senior Angular / Frontend Engineer",
    es: "Marius Mihail Ion · Senior Angular / Frontend Engineer",
  },
  homeDescription: {
    en: "Senior Angular / Frontend Engineer for enterprise e-commerce and product frontend. TypeScript, RxJS, NgRx, SSR, accessibility and API integration.",
    es: "Senior Angular / Frontend Engineer para e-commerce corporativo y frontend de producto. TypeScript, RxJS, NgRx, SSR, accesibilidad e integración de APIs.",
  },
  homeOgTitle: {
    en: "Marius Mihail Ion · Angular Frontend Case Studies",
    es: "Marius Mihail Ion · Casos de frontend en Angular",
  },
  homeOgDescription: {
    en: "Enterprise Angular work across authentication, SSR, accessibility, performance and controlled product rollouts.",
    es: "Trabajo corporativo en Angular sobre autenticación, SSR, accesibilidad, rendimiento y despliegues de producto controlados.",
  },
  heroPhotoAlt: {
    en: "Portrait of Marius Mihail Ion",
    es: "Retrato de Marius Mihail Ion",
  },
  heroTitle: {
    en: "Enterprise frontend for e-commerce, banking and education.",
    es: "Frontend corporativo para e-commerce, banca y educación.",
  },
  heroLede: {
    en: "Software developer since 2018, specialized in Angular since 2021. I work on authentication, SSR, accessibility, performance and API integration: the points where frontend decisions carry product risk.",
    es: "Desarrollador de software desde 2018, especializado en Angular desde 2021. Trabajo en autenticación, SSR, accesibilidad, rendimiento e integración de APIs: los puntos donde las decisiones de frontend arrastran riesgo de producto.",
  },
  heroCtaCases: { en: "View case studies", es: "Ver casos" },
  heroCtaCv: { en: "Download CV", es: "Descargar CV" },
  heroLocation: {
    en: "Based in Zaragoza, Spain · EU citizen · Remote international · Open to relocation anywhere in the EU",
    es: "Con base en Zaragoza, España · Ciudadano de la UE · Remoto internacional · Abierto a reubicación en cualquier país de la UE",
  },
  statsHeading: { en: "Verified results", es: "Resultados verificados" },
  workTitle: { en: "Case studies", es: "Casos" },
  workLede: {
    en: "Sanitized write-ups of real enterprise work. Each one names the problem, the decision made under constraint, and what was delivered or validated.",
    es: "Descripciones sanitizadas de trabajo corporativo real. Cada una nombra el problema, la decisión tomada bajo restricciones y lo que se entregó o se validó.",
  },

  // Case studies
  casesTitle: {
    en: "Case Studies · Marius Mihail Ion",
    es: "Casos · Marius Mihail Ion",
  },
  casesDescription: {
    en: "Sanitized case studies of enterprise Angular work: real-time voice assistant, SSR feature-flag rollout, passwordless authentication migration and engineering controls.",
    es: "Casos sanitizados de trabajo corporativo en Angular: asistente de voz en tiempo real, despliegue con feature flags bajo SSR, migración de autenticación passwordless y controles de ingeniería.",
  },
  casesEyebrow: { en: "Case studies", es: "Casos" },
  casesHeading: {
    en: "Real work, sanitized for public reading.",
    es: "Trabajo real, sanitizado para lectura pública.",
  },
  casesLede: {
    en: "The case studies document real work already completed; they are not toy projects created for recruitment.",
    es: "Los casos documentan trabajo real ya completado; no son proyectos de juguete creados para buscar empleo.",
  },
  casesAriaLabel: { en: "Case studies", es: "Casos" },
  cardEyebrow: { en: "Case study", es: "Caso" },
  cardCue: { en: "Read the case study", es: "Leer el caso" },
  tagsLabel: { en: "Technologies", es: "Tecnologías" },
  breadcrumbLabel: { en: "Breadcrumb", es: "Migas de pan" },
  caseNavLabel: {
    en: "Case study navigation",
    es: "Navegación de casos",
  },
  caseNavAll: { en: "All case studies", es: "Todos los casos" },

  // Experience
  experienceTitle: {
    en: "Experience · Marius Mihail Ion",
    es: "Experiencia · Marius Mihail Ion",
  },
  experienceDescription: {
    en: "Career timeline: Decskill / Zara Home, Avanade / UNIR, Vermont Solutions / Santander and earlier front-end and full-stack roles since 2018.",
    es: "Trayectoria profesional: Decskill / Zara Home, Avanade / UNIR, Vermont Solutions / Santander y puestos anteriores de front-end y full-stack desde 2018.",
  },
  experienceEyebrow: { en: "Experience", es: "Experiencia" },
  experienceHeading: {
    en: "Verified career timeline.",
    es: "Trayectoria profesional verificada.",
  },
  timelineLabel: { en: "Career timeline", es: "Trayectoria profesional" },
  timelineClient: { en: "Client:", es: "Cliente:" },
  recsHeading: { en: "Recommendations", es: "Recomendaciones" },

  // About
  aboutTitle: { en: "About · Marius Mihail Ion", es: "Perfil · Marius Mihail Ion" },
  aboutDescription: {
    en: "Senior frontend individual contributor working on enterprise Angular products: authentication migrations, API contracts, controlled rollouts, accessibility, performance and SSR.",
    es: "Individual contributor senior de frontend en productos corporativos de Angular: migraciones de autenticación, contratos de API, despliegues controlados, accesibilidad, rendimiento y SSR.",
  },
  aboutEyebrow: { en: "Profile", es: "Perfil" },
  aboutHeading: { en: "About", es: "Perfil" },
  aboutAriaLabel: { en: "Profile", es: "Perfil" },

  // Contact
  contactTitle: {
    en: "Contact · Marius Mihail Ion",
    es: "Contacto · Marius Mihail Ion",
  },
  contactDescription: {
    en: "Senior Angular / Frontend Engineer roles for remote international teams, including the UK, Switzerland and the US. Open to relocation anywhere in the EU.",
    es: "Puestos de Senior Angular / Frontend Engineer para equipos internacionales en remoto, incluidos Reino Unido, Suiza y Estados Unidos. Abierto a reubicación en cualquier país de la UE.",
  },
  contactEyebrow: { en: "Contact", es: "Contacto" },
  contactHeading: {
    en: "Senior Angular / Frontend Engineer roles",
    es: "Puestos de Senior Angular / Frontend Engineer",
  },
  contactLede: {
    en: "Remote international teams, including the UK, Switzerland and the US.",
    es: "Equipos internacionales en remoto, incluidos Reino Unido, Suiza y Estados Unidos.",
  },
  contactRelocation: {
    en: "Open to relocation anywhere in the EU.",
    es: "Abierto a reubicación en cualquier país de la UE.",
  },
  contactAriaLabel: { en: "Contact details", es: "Datos de contacto" },
} satisfies Record<string, Localized<string>>;

/** The About page body. Same paragraph count in both languages, by contract. */
export const aboutParagraphs: Localized<string>[] = [
  {
    en: "I am a senior frontend individual contributor working on enterprise Angular products with TypeScript, RxJS, NgRx and server-side rendering.",
    es: "Soy un individual contributor senior de frontend que trabaja en productos corporativos de Angular con TypeScript, RxJS, NgRx y renderizado en servidor.",
  },
  {
    en: "I am strongest where product frontend meets platform concerns: authentication migrations, API contracts, controlled rollouts, accessibility, performance and SSR.",
    es: "Donde más aporto es allí donde el frontend de producto se cruza con la plataforma: migraciones de autenticación, contratos de API, despliegues controlados, accesibilidad, rendimiento y SSR.",
  },
  {
    en: "Earlier full-stack .NET/C# work from 2018 to 2020 gives me useful backend context without changing the direction of my career: frontend product engineering is the focus.",
    es: "El trabajo previo de full-stack en .NET/C# entre 2018 y 2020 me da un contexto útil de backend sin cambiar la dirección de mi carrera: el foco es la ingeniería de producto en frontend.",
  },
  {
    en: "I also build engineering controls when they solve a delivery problem (automated review, context management and documentation search) but they remain part of the frontend system rather than a separate professional identity.",
    es: "También construyo controles de ingeniería cuando resuelven un problema de entrega (revisión automatizada, gestión de contexto y búsqueda en documentación), pero siguen siendo parte del sistema de frontend, no una identidad profesional aparte.",
  },
];

/** Contact links. Labels localized, values identical (they are addresses). */
export const contactLinks = [
  {
    label: { en: "Email", es: "Email" },
    href: "mailto:mihailmariusion@gmail.com",
    value: "mihailmariusion@gmail.com",
  },
  {
    label: { en: "LinkedIn", es: "LinkedIn" },
    href: "https://linkedin.com/in/mariusdev",
    value: "linkedin.com/in/mariusdev",
  },
  {
    label: { en: "GitHub", es: "GitHub" },
    href: "https://github.com/mihailmariusiondev",
    value: "github.com/mihailmariusiondev",
  },
];
