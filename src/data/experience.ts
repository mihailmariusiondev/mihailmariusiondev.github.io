import type { Localized } from "../i18n";

export interface ExperienceEntry {
  period: Localized<string>;
  company: string;
  client?: string;
  /** Job titles stay in English in both versions: they are the industry term. */
  role: string;
}

export const experience: ExperienceEntry[] = [
  {
    // Decskill is the current role. No end date, in either language.
    period: { en: "May 2025 – Present", es: "Mayo 2025 – Presente" },
    company: "Decskill España",
    client: "Zara Home (Inditex)",
    role: "Senior Front-End Analyst (Angular)",
  },
  {
    period: { en: "March 2024 – May 2025", es: "Marzo 2024 – Mayo 2025" },
    company: "Avanade",
    client: "UNIR",
    role: "Senior Front-End Analyst (Angular)",
  },
  {
    period: {
      en: "December 2022 – March 2024",
      es: "Diciembre 2022 – Marzo 2024",
    },
    company: "Vermont Solutions",
    client: "Santander",
    role: "Senior Front-End Developer (Angular)",
  },
  {
    period: {
      en: "October 2022 – December 2022",
      es: "Octubre 2022 – Diciembre 2022",
    },
    company: "CloudAPPi",
    role: "Mid-Level Front-End Developer (Angular, React)",
  },
  {
    period: {
      en: "September 2021 – October 2022",
      es: "Septiembre 2021 – Octubre 2022",
    },
    company: "ENZO / Rent & Buy S.A.",
    role: "Mid-Level Front-End Developer (Angular)",
  },
  {
    period: { en: "June 2020 – September 2021", es: "Junio 2020 – Septiembre 2021" },
    company: "Independent Projects & Upskilling",
    role: "",
  },
  {
    period: { en: "March 2020 – June 2020", es: "Marzo 2020 – Junio 2020" },
    company: "Altran",
    role: "Mid-Level Full Stack Developer",
  },
  {
    period: {
      en: "November 2018 – September 2019",
      es: "Noviembre 2018 – Septiembre 2019",
    },
    company: "IO Digital / Query Software",
    role: "Mid-Level Full Stack Developer",
  },
  {
    period: { en: "July 2018 – November 2018", es: "Julio 2018 – Noviembre 2018" },
    company: "STRATESYS",
    role: "Junior Full Stack Developer",
  },
];

export interface Recommendation {
  /**
   * The English quote is a translation; the Spanish one is the LITERAL text the
   * author published on LinkedIn, cut to the same fragment. Antonio Bermúdez
   * wrote his in English, so both languages carry the same original words.
   */
  quote: Localized<string>;
  author: string;
  role: Localized<string>;
  /**
   * The "translated from LinkedIn" disclaimer only applies to the English side
   * of a Spanish original. `null` renders nothing.
   */
  note: Localized<string | null>;
}

const TRANSLATED_NOTE: Localized<string | null> = {
  en: "Translated from a recommendation published on LinkedIn",
  es: null,
};

export const recommendations: Recommendation[] = [
  {
    quote: {
      en: "His knowledge of Angular is excellent, but what I really highlight from working with him is his willingness to help and share his experience. Another aspect I value a lot about Marius is his focus on good practices. He not only applies them in his daily work, but also promotes their adoption within the team, organizing meetings when necessary and aligning everyone around building quality, maintainable and scalable software.",
      // Literal fragment of the LinkedIn original. The sentence about "las
      // buenas prácticas" is kept because the next one ("No solo LAS aplica")
      // refers back to it: cutting it leaves a dangling pronoun in Spanish and
      // drops the content the English version carries ("applies good practices").
      es: "Su conocimiento en Angular es excelente, pero lo que realmente destaco de trabajar con él es su disposición para ayudar y compartir su experiencia. Otro aspecto que valoro mucho de Marius es su enfoque en las buenas prácticas. No solo las aplica en su trabajo diario, sino que también fomenta su adopción dentro del equipo, organizando reuniones cuando es necesario y alineando a todos en la construcción de software de calidad, mantenible y escalable.",
    },
    author: "José Luis Murcia Gámez",
    role: {
      en: "Frontend Developer, UNIR project (Avanade)",
      es: "Frontend Developer, proyecto UNIR (Avanade)",
    },
    note: TRANSLATED_NOTE,
  },
  {
    quote: {
      en: "Working with Marius has been a real pleasure. I especially highlight his initiative with AI tools applied to development, from which I learned a great deal working side by side with him. Any team would be more than fortunate to count on someone with his technical level and his attitude.",
      es: "Trabajar con Marius ha sido un verdadero placer. Destaco especialmente su iniciativa con herramientas de IA aplicadas al desarrollo, de las que aprendí muchísimo trabajando codo con codo con él. Cualquier equipo sería más que afortunado de contar con alguien con su nivel técnico y su actitud.",
    },
    author: "Juan Pablo Romero Pereira",
    role: {
      en: "Frontend Developer, Zara Home (Inditex)",
      es: "Frontend Developer, Zara Home (Inditex)",
    },
    note: TRANSLATED_NOTE,
  },
  {
    quote: {
      en: "Marius proved to be a highly adaptable and resourceful programmer on both occasions we worked together, at Stratesys and at Avanade (consultancy/service provider for Proeduca), where he worked as an external consultant. His ability to learn quickly and his contribution to the projects were fundamental. I highly recommend him for his professionalism and technical skills.",
      es: "Marius demostró ser un programador altamente adaptable y resolutivo en ambas ocasiones que trabajamos juntos, tanto en Stratesys como en Avanade (consultora/proveedora de servicios para Proeduca), donde trabajó como consultor externo. Su capacidad para aprender rápidamente y su contribución a los proyectos fueron fundamentales. Lo recomiendo ampliamente por su profesionalismo y habilidades técnicas.",
    },
    author: "José Luis Rodríguez-Campra Camberos",
    role: {
      en: "BAU Coordinator / Scrum Master",
      es: "Coordinador BAU / Scrum Master",
    },
    note: TRANSLATED_NOTE,
  },
  {
    // Written in English by its author: the same words in both versions, and no
    // "translated from" marker on either side.
    quote: {
      en: "Great partner, he has done a great job in his last project demonstrating that he can design and build business applications successfully.",
      es: "Great partner, he has done a great job in his last project demonstrating that he can design and build business applications successfully.",
    },
    author: "Antonio Bermúdez Rodríguez",
    role: { en: "Developer", es: "Developer" },
    note: {
      en: "Published on LinkedIn",
      es: "Publicada en LinkedIn (original en inglés)",
    },
  },
  {
    quote: {
      en: "Marius was a great professional to work with. We worked together at ENZO, and his work ethic is immaculate; he is very easy to work with and goes out of his way to help when you ask for guidance.",
      es: "Marius fue un gran profesional con el que trabajé. Trabajamos juntos en Enzo, y su ética de trabajo es inmaculada y es muy fácil trabajar con él. Se desvive cuando le pides ayuda y orientación.",
    },
    author: "Gonzalo Rodríguez Muñoz",
    role: {
      en: "Full Stack Software Developer, ENZO",
      es: "Desarrollador full stack, ENZO",
    },
    note: TRANSLATED_NOTE,
  },
];

export interface Stat {
  /** Figures are identical in both languages: never rounded, never adapted. */
  value: Localized<string>;
  label: Localized<string>;
}

export const stats: Stat[] = [
  {
    value: { en: "96%", es: "96%" },
    label: {
      en: "Reduction in the AI shopping assistant's tool payloads (570 KB to 22 KB per execution), achieved with a routing and context-stripping design",
      es: "Reducción de los payloads de las tools del asistente de compra con IA (de 570 KB a 22 KB por ejecución), lograda con un diseño de enrutado y limpieza de contexto",
    },
  },
  {
    value: { en: "Top 1.42%", es: "Top 1.42%" },
    label: {
      en: "Ranking among all candidates on an independent Angular assessment by SkillValue, with a 95% score",
      es: "Puesto entre todos los candidatos en una evaluación independiente de Angular de SkillValue, con una puntuación del 95%",
    },
  },
  {
    value: { en: "34", es: "34" },
    label: {
      en: "Accessibility findings from a formal WCAG 2.1 AA audit closed through 23 merged pull requests: headings, keyboard, ARIA and focus",
      es: "Hallazgos de accesibilidad de una auditoría formal WCAG 2.1 AA cerrados con 23 pull requests mergeadas: encabezados, teclado, ARIA y foco",
    },
  },
  {
    value: { en: "21 of 53", es: "21 de 53" },
    label: {
      en: "Rules retired from my own automated review system after measuring its real output against what the team actually used",
      es: "Reglas retiradas de mi propio sistema de revisión automatizada tras medir su salida real frente a lo que el equipo usaba de verdad",
    },
  },
  {
    value: { en: "Adopted", es: "Adoptado" },
    label: {
      en: "Internal documentation tooling (an MCP server) adopted by the Android team, outside its origin platform",
      es: "Herramienta interna de documentación (un servidor MCP) adoptada por el equipo de Android, fuera de su plataforma de origen",
    },
  },
];
