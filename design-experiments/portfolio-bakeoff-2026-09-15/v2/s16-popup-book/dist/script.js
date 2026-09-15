(() => {
  "use strict";

  const PAGES = [
    { // 0 cover
      id: "cover",
      scene: "tpl-scene-cover",
      cover: true,
      en: `<div class="cover-content">
        <span class="kicker">Portfolio · Popup Book Edition</span>
        <h1>Marius Mihail Ion</h1>
        <p class="cover-role">Senior Angular / Frontend Engineer</p>
        <p class="cover-loc">Based in Zaragoza, Spain · EU citizen · Remote or hybrid from Zaragoza · Available for occasional travel</p>
        <p class="open-hint">Turn the page to begin the story &#8594;</p>
      </div>`,
      es: `<div class="cover-content">
        <span class="kicker">Portafolio · Edición Libro Pop-up</span>
        <h1>Marius Mihail Ion</h1>
        <p class="cover-role">Ingeniero Frontend Sénior (Angular)</p>
        <p class="cover-loc">Con base en Zaragoza, España · Ciudadano de la UE · Remoto o híbrido desde Zaragoza · Disponibilidad para viajes puntuales</p>
        <p class="open-hint">Pasa la página para empezar &#8594;</p>
      </div>`
    },
    { // 1 origins
      id: "origins",
      scene: "tpl-scene-origins",
      en: `<span class="kicker">Chapter 1 — Origins</span>
        <h2>From .NET to Angular</h2>
        <p class="lede">Software developer since 2018, specialized in Angular and TypeScript since 2021.</p>
        <p>A full-stack .NET/C# background (2018–2020, at STRATESYS, IO Digital / Query Software and Altran) sits underneath everything after: it is why authentication flows and API contracts get read from both sides of the wire.</p>
        <p>The move into Angular and cloud development happened at ENZO (Rent & Buy S.A.), building reusable components against an existing serverless AWS backend (Lambda, API Gateway, S3, CloudFront, SQS/SNS) with Cognito authentication — plus a stretch of independent projects and structured upskilling (2020–2021) before that.</p>`,
      es: `<span class="kicker">Capítulo 1 — Orígenes</span>
        <h2>De .NET a Angular</h2>
        <p class="lede">Desarrollador de software desde 2018, especializado en Angular y TypeScript desde 2021.</p>
        <p>Una base full stack en .NET/C# (2018–2020, en STRATESYS, IO Digital / Query Software y Altran) sostiene todo lo que vino después: por eso los flujos de autenticación y los contratos de API se leen desde ambos lados del cable.</p>
        <p>El salto a Angular y al desarrollo cloud ocurrió en ENZO (Rent &amp; Buy S.A.), construyendo componentes reutilizables sobre un backend serverless de AWS ya existente (Lambda, API Gateway, S3, CloudFront, SQS/SNS) con autenticación Cognito — precedido por un tramo de proyectos propios y formación estructurada (2020–2021).</p>`
    },
    { // 2 angular today
      id: "angular",
      scene: "tpl-scene-angular",
      en: `<span class="kicker">Chapter 2 — Angular today</span>
        <h2>Where the depth lives</h2>
        <p class="lede"><span class="stat-badge">95%</span> score, <span class="stat-badge">Top 1.42%</span> on an independent Angular assessment by SkillValue.</p>
        <p>Since 2021 the work has stayed inside Angular architecture: authentication flows, SSR safety, accessibility, performance budgets, API integration and — more recently — AI integrations at the edges the frontend controls.</p>
        <dl>
          <div class="field"><dt>Depth</dt><dd>RxJS, NgRx, standalone components, SSR, feature flags, Nx monorepos, design-system integration (Flame at Santander).</dd></div>
          <div class="field"><dt>Discipline</dt><dd>Karma/Jasmine unit testing, SonarQube, ESLint, Fortify static analysis, code review as a habit, not a gate.</dd></div>
        </dl>`,
      es: `<span class="kicker">Capítulo 2 — Angular hoy</span>
        <h2>Dónde está la profundidad</h2>
        <p class="lede"><span class="stat-badge">95%</span> de puntuación, <span class="stat-badge">Top 1,42%</span> en una evaluación independiente de Angular de SkillValue.</p>
        <p>Desde 2021 el trabajo se ha mantenido dentro de la arquitectura Angular: flujos de autenticación, seguridad SSR, accesibilidad, presupuestos de rendimiento, integración de APIs y, más recientemente, integraciones de IA en los límites que controla el frontend.</p>
        <dl>
          <div class="field"><dt>Profundidad</dt><dd>RxJS, NgRx, componentes standalone, SSR, feature flags, monorepos Nx, integración con sistemas de diseño (Flame en Santander).</dd></div>
          <div class="field"><dt>Disciplina</dt><dd>Pruebas unitarias con Karma/Jasmine, SonarQube, ESLint, análisis estático Fortify, revisión de código como hábito, no como trámite.</dd></div>
        </dl>`
    },
    { // 3 experience ladder
      id: "experience",
      scene: "tpl-scene-ladder",
      en: `<span class="kicker">Chapter 3 — The ladder</span>
        <h2>Six roles, one thread</h2>
        <ul class="rung-list">
          <li><span class="role-period">May 2025 – July 2026</span><br><span class="role-title">Senior Front-End Analyst (Angular)</span> — Decskill Spain <span class="role-client">· client Zara Home (Inditex)</span></li>
          <li><span class="role-period">March 2024 – May 2025</span><br><span class="role-title">Senior Front-End Analyst (Angular)</span> — Avanade <span class="role-client">· client UNIR</span></li>
          <li><span class="role-period">December 2022 – March 2024</span><br><span class="role-title">Senior Front-End Developer (Angular)</span> — Vermont Solutions (Viewnext / IBM) <span class="role-client">· client Santander</span></li>
          <li><span class="role-period">October – December 2022</span><br><span class="role-title">Mid-Level Front-End Developer (Angular, React)</span> — CloudAPPi <span class="role-client">· Regional Government of Madrid</span></li>
          <li><span class="role-period">September 2021 – October 2022</span><br><span class="role-title">Mid-Level Front-End Developer (Angular)</span> — ENZO (Rent &amp; Buy S.A.)</li>
          <li><span class="role-period">2018 – 2020</span><br><span class="role-title">Full Stack Developer (.NET/C#)</span> — STRATESYS, IO Digital / Query Software, Altran</li>
        </ul>`,
      es: `<span class="kicker">Capítulo 3 — La escalera</span>
        <h2>Seis roles, un mismo hilo</h2>
        <ul class="rung-list">
          <li><span class="role-period">Mayo 2025 – Julio 2026</span><br><span class="role-title">Analista Frontend Sénior (Angular)</span> — Decskill España <span class="role-client">· cliente Zara Home (Inditex)</span></li>
          <li><span class="role-period">Marzo 2024 – Mayo 2025</span><br><span class="role-title">Analista Frontend Sénior (Angular)</span> — Avanade <span class="role-client">· cliente UNIR</span></li>
          <li><span class="role-period">Diciembre 2022 – Marzo 2024</span><br><span class="role-title">Desarrollador Frontend Sénior (Angular)</span> — Vermont Solutions (Viewnext / IBM) <span class="role-client">· cliente Santander</span></li>
          <li><span class="role-period">Octubre – Diciembre 2022</span><br><span class="role-title">Desarrollador Frontend Intermedio (Angular, React)</span> — CloudAPPi <span class="role-client">· Comunidad de Madrid</span></li>
          <li><span class="role-period">Septiembre 2021 – Octubre 2022</span><br><span class="role-title">Desarrollador Frontend Intermedio (Angular)</span> — ENZO (Rent &amp; Buy S.A.)</li>
          <li><span class="role-period">2018 – 2020</span><br><span class="role-title">Desarrollador Full Stack (.NET/C#)</span> — STRATESYS, IO Digital / Query Software, Altran</li>
        </ul>`
    },
    { // 4 case study 1
      id: "case1",
      scene: "tpl-scene-case1",
      en: `<span class="kicker">Case Study — Zara Home (Inditex)</span>
        <h2>Real-time Shopping Assistant</h2>
        <div class="tag-row">${tagRow(["Angular","TypeScript","WebRTC","OpenAI Realtime API","SSR","Accessibility"])}</div>
        <p class="lede">A controlled whitelist pilot: a 96% smaller LLM context payload, SSR-compatible, never opened to the public.</p>
        <dl>
          <div class="field"><dt>Context</dt><dd>A global, multi-market e-commerce frontend needed a conversational shopping experience with voice, text and product context.</dd></div>
          <div class="field"><dt>My role</dt><dd>I implemented the Angular integration as a senior individual contributor; the wider product was a team effort with a co-lead alongside me.</dd></div>
          <div class="field"><dt>The frontend problem</dt><dd>Manage the WebRTC lifecycle, initialize only on request, stay safe under SSR, keep the model context bounded, and avoid tracking before the customer opened the assistant.</dd></div>
          <div class="field"><dt>Engineering decisions</dt><dd>Lazy initialization, platform guards, a controlled feature flag, and a routing and context-stripping design.</dd></div>
          <div class="field"><dt>Outcome</dt><dd>Reached production as a controlled whitelist pilot, never opened to the public. LLM context payload fell from 570 KB to 22 KB per execution — a 96% reduction.</dd></div>
        </dl>`,
      es: `<span class="kicker">Caso de estudio — Zara Home (Inditex)</span>
        <h2>Asistente de compra en tiempo real</h2>
        <div class="tag-row">${tagRow(["Angular","TypeScript","WebRTC","OpenAI Realtime API","SSR","Accesibilidad"])}</div>
        <p class="lede">Un piloto controlado mediante lista blanca: un payload de contexto del LLM un 96% más pequeño, compatible con SSR y nunca abierto al público.</p>
        <dl>
          <div class="field"><dt>Contexto</dt><dd>Un frontend de comercio electrónico global y multimercado necesitaba una experiencia de compra conversacional con voz, texto y contexto de producto.</dd></div>
          <div class="field"><dt>Mi papel</dt><dd>Implementé la integración en Angular como profesional sénior; el producto en conjunto fue un trabajo de equipo con otro responsable técnico a mi lado.</dd></div>
          <div class="field"><dt>El problema de frontend</dt><dd>Gestionar el ciclo de vida de WebRTC, inicializar solo bajo demanda, ser seguro en SSR, acotar el contexto del modelo y evitar cualquier seguimiento antes de abrir el asistente.</dd></div>
          <div class="field"><dt>Decisiones de ingeniería</dt><dd>Inicialización diferida, protecciones de plataforma, una feature flag controlada y un diseño de enrutado y limpieza de contexto.</dd></div>
          <div class="field"><dt>Resultado</dt><dd>Llegó a producción como piloto controlado por lista blanca, nunca abierto al público. El payload de contexto del LLM bajó de 570 KB a 22 KB por ejecución: una reducción del 96%.</dd></div>
        </dl>`
    },
    { // 5 case study 2
      id: "case2",
      scene: "tpl-scene-case2",
      en: `<span class="kicker">Case Study — Zara Home (Inditex)</span>
        <h2>Help Center Rollout</h2>
        <div class="tag-row">${tagRow(["Angular","SSR","Feature Flags","Observability","Accessibility"])}</div>
        <p class="lede">A country-by-country Help Center rollout with SSR-safe Angular integration, stable routes and accessible localized experiences.</p>
        <dl>
          <div class="field"><dt>Context</dt><dd>A new conversational Help Center rolled out country by country without changing existing entry points.</dd></div>
          <div class="field"><dt>Delivery</dt><dd>I integrated the conversational experience into the existing Angular routes and localized entry points across markets.</dd></div>
          <div class="field"><dt>Rollout</dt><dd>Expanded market by market, verifying SSR behavior, accessibility and route stability before each step.</dd></div>
          <div class="field"><dt>Outcome</dt><dd>Rolled out country by country with stable routes, localized titles, accessibility and SSR support preserved throughout.</dd></div>
        </dl>`,
      es: `<span class="kicker">Caso de estudio — Zara Home (Inditex)</span>
        <h2>Despliegue del Centro de Ayuda</h2>
        <div class="tag-row">${tagRow(["Angular","SSR","Feature flags","Observabilidad","Accesibilidad"])}</div>
        <p class="lede">Un despliegue del Centro de Ayuda país por país con integración Angular compatible con SSR, rutas estables y experiencias localizadas accesibles.</p>
        <dl>
          <div class="field"><dt>Contexto</dt><dd>Un nuevo Centro de Ayuda conversacional se desplegó país por país sin cambiar los puntos de entrada existentes.</dd></div>
          <div class="field"><dt>Entrega</dt><dd>Integré la experiencia conversacional en las rutas Angular y los puntos de entrada localizados existentes en cada mercado.</dd></div>
          <div class="field"><dt>Despliegue</dt><dd>Avanzó mercado a mercado, verificando el comportamiento bajo SSR, la accesibilidad y la estabilidad de rutas antes de cada paso.</dd></div>
          <div class="field"><dt>Resultado</dt><dd>Se desplegó país por país con rutas estables, títulos localizados, accesibilidad y soporte SSR conservados en todo el proceso.</dd></div>
        </dl>`
    },
    { // 6 case study 3
      id: "case3",
      scene: "tpl-scene-case3",
      en: `<span class="kicker">Case Study — Zara Home (Inditex)</span>
        <h2>Passwordless Account Migration</h2>
        <div class="tag-row">${tagRow(["Angular","Authentication","API Contracts","OTP","NgRx","Integration Testing"])}</div>
        <p class="lede">A contract-first passwordless migration with separate password and OTP paths, delivered through incremental scope and end-to-end validation.</p>
        <dl>
          <div class="field"><dt>Context</dt><dd>The account area had to support both existing-password and passwordless users without disrupting established flows.</dd></div>
          <div class="field"><dt>Decision</dt><dd>Kept the migration incremental, separating password-state handling (driven by <code>hasPassword</code>) from the rest of the account experience.</dd></div>
          <div class="field"><dt>Implementation</dt><dd>Separate password and OTP paths, including email change and password creation, with dependent actions gated by authentication state.</dd></div>
          <div class="field"><dt>Validation</dt><dd>Validated end-to-end on the pre-integration environment across four documented scenarios.</dd></div>
          <div class="field"><dt>Outcome</dt><dd>Delivered incrementally without disrupting existing account behavior.</dd></div>
        </dl>`,
      es: `<span class="kicker">Caso de estudio — Zara Home (Inditex)</span>
        <h2>Migración de cuentas a autenticación sin contraseña</h2>
        <div class="tag-row">${tagRow(["Angular","Autenticación","Contratos de API","OTP","NgRx","Pruebas de integración"])}</div>
        <p class="lede">Una migración sin contraseña guiada por contratos, con caminos separados para contraseña y OTP, alcance incremental y validación de extremo a extremo.</p>
        <dl>
          <div class="field"><dt>Contexto</dt><dd>El área de cuenta debía admitir usuarios con contraseña y sin ella sin interrumpir los flujos establecidos.</dd></div>
          <div class="field"><dt>Decisión</dt><dd>Mantuve la migración incremental, separando la gestión del estado de contraseña (guiada por <code>hasPassword</code>) del resto de la experiencia de cuenta.</dd></div>
          <div class="field"><dt>Implementación</dt><dd>Caminos separados para contraseña y OTP, incluido el cambio de email y la creación de contraseña, con acciones dependientes gobernadas por el estado de autenticación.</dd></div>
          <div class="field"><dt>Validación</dt><dd>Validada de extremo a extremo en el entorno de preintegración, en cuatro escenarios documentados.</dd></div>
          <div class="field"><dt>Resultado</dt><dd>Entregada de forma incremental sin interrumpir el comportamiento existente del área de cuenta.</dd></div>
        </dl>`
    },
    { // 7 case study 4
      id: "case4",
      scene: "tpl-scene-case4",
      en: `<span class="kicker">Case Study — Engineering Controls</span>
        <h2>Engineering Controls for Frontend Delivery</h2>
        <div class="tag-row">${tagRow(["GitHub","Automated Review","Prompt/Context Engineering","MCP","Developer Tooling"])}</div>
        <p class="lede">An automated review system that measured its own noise, retired 21 of its 53 rules, and got adopted outside its origin team.</p>
        <dl>
          <div class="field"><dt>Problem</dt><dd>Automated review can look like coverage while producing noise, duplicate feedback and rules the team doesn't trust.</dd></div>
          <div class="field"><dt>System</dt><dd>A GitHub-connected review system with domain-specific checks flagging injection, authorization and secrets-management defects before merge.</dd></div>
          <div class="field"><dt>Control loop</dt><dd>The first version generated credibility problems; I measured its output and retired 21 of its 53 rules that the team consistently ignored.</dd></div>
          <div class="field"><dt>Adoption</dt><dd>A Teams CLI was merged into a shared Inditex engineering repository, and a documentation MCP was adopted by the Android team.</dd></div>
        </dl>`,
      es: `<span class="kicker">Caso de estudio — Controles de ingeniería</span>
        <h2>Controles de ingeniería para la entrega de frontend</h2>
        <div class="tag-row">${tagRow(["GitHub","Revisión automatizada","Ingeniería de prompts y contexto","MCP","Herramientas de desarrollo"])}</div>
        <p class="lede">Un sistema de revisión automatizada que midió su propio ruido, retiró 21 de sus 53 reglas y acabó adoptado fuera de su equipo de origen.</p>
        <dl>
          <div class="field"><dt>Problema</dt><dd>La revisión automatizada puede aparentar cobertura mientras produce ruido, comentarios duplicados y reglas en las que el equipo no confía.</dd></div>
          <div class="field"><dt>Sistema</dt><dd>Un sistema de revisión conectado a GitHub con comprobaciones específicas del dominio que detectaba defectos de inyección, autorización y gestión de secretos antes de integrar.</dd></div>
          <div class="field"><dt>Bucle de control</dt><dd>La primera versión generó problemas de credibilidad; medí su salida y retiré 21 de sus 53 reglas que el equipo ignoraba sistemáticamente.</dd></div>
          <div class="field"><dt>Adopción</dt><dd>Una CLI de Teams se integró en un repositorio de ingeniería compartido de Inditex, y un MCP de documentación fue adoptado por el equipo de Android.</dd></div>
        </dl>`
    },
    { // 8 recommendations
      id: "quotes",
      scene: "tpl-scene-quotes",
      en: `<span class="kicker">Chapter 4 — In their words</span>
        <h2>Recommendations</h2>
        <div class="quote-list">
          <div class="quote-card"><p>"His knowledge of Angular is excellent, but what I really highlight is his willingness to help and share his experience — and his focus on good practices, which he not only applies but promotes across the team."</p><cite>José Luis Murcia Gámez — Frontend Developer, UNIR project (Avanade). Translated from LinkedIn.</cite></div>
          <div class="quote-card"><p>"Working with Marius has been a real pleasure. I especially highlight his initiative with AI tools applied to development, from which I learned a great deal working side by side with him."</p><cite>Juan Pablo Romero Pereira — Frontend Developer, Zara Home (Inditex). Translated from LinkedIn.</cite></div>
          <div class="quote-card"><p>"A highly adaptable and resourceful programmer on both occasions we worked together, at Stratesys and at Avanade. His ability to learn quickly and his contribution to the projects were fundamental."</p><cite>José Luis Rodríguez-Campra Camberos — BAU Coordinator / Scrum Master. Translated from LinkedIn.</cite></div>
        </div>`,
      es: `<span class="kicker">Capítulo 4 — En sus palabras</span>
        <h2>Recomendaciones</h2>
        <div class="quote-list">
          <div class="quote-card"><p>«Su conocimiento en Angular es excelente, pero lo que realmente destaco es su disposición para ayudar y compartir su experiencia, y su enfoque en las buenas prácticas, que no solo aplica sino que fomenta en el equipo.»</p><cite>José Luis Murcia Gámez — Desarrollador Frontend, proyecto UNIR (Avanade).</cite></div>
          <div class="quote-card"><p>«Trabajar con Marius ha sido un verdadero placer. Destaco especialmente su iniciativa con herramientas de IA aplicadas al desarrollo, de las que aprendí muchísimo trabajando codo con codo con él.»</p><cite>Juan Pablo Romero Pereira — Desarrollador Frontend, Zara Home (Inditex).</cite></div>
          <div class="quote-card"><p>«Un programador altamente adaptable y resolutivo en ambas ocasiones que trabajamos juntos, en Stratesys y en Avanade. Su capacidad para aprender rápido y su contribución a los proyectos fueron fundamentales.»</p><cite>José Luis Rodríguez-Campra Camberos — Coordinador BAU / Scrum Master. Traducida de LinkedIn.</cite></div>
        </div>`
    },
    { // 9 contact
      id: "contact",
      scene: "tpl-scene-contact",
      en: `<span class="kicker">Last page — Get in touch</span>
        <div class="photo-frame"><img src="assets/me.webp" alt="Photo of Marius Mihail Ion" width="96" height="96"></div>
        <h2>Let's talk</h2>
        <p class="lede">Remote or hybrid from Zaragoza · available for occasional travel · EU citizen, authorized to work across the EU/EEA without sponsorship · permanent or B2B.</p>
        <div class="contact-links">
          <a href="mailto:mihailmariusion@gmail.com">✉ mihailmariusion@gmail.com</a>
          <a href="https://linkedin.com/in/mariusdev" target="_blank" rel="noopener">in linkedin.com/in/mariusdev</a>
          <a href="https://github.com/mihailmariusiondev" target="_blank" rel="noopener">&lt;/&gt; github.com/mihailmariusiondev</a>
        </div>
        <div class="cv-btns">
          <a href="assets/marius-mihail-ion-cv.pdf" download>Download CV — English</a>
          <a href="assets/marius-mihail-ion-cv-es.pdf" download>Descargar CV — Español</a>
        </div>`,
      es: `<span class="kicker">Última página — Contacto</span>
        <div class="photo-frame"><img src="assets/me.webp" alt="Foto de Marius Mihail Ion" width="96" height="96"></div>
        <h2>Hablemos</h2>
        <p class="lede">Remoto o híbrido desde Zaragoza · disponibilidad para viajes puntuales · ciudadano de la UE, autorizado a trabajar en toda la UE/EEE sin patrocinio · permanente o B2B.</p>
        <div class="contact-links">
          <a href="mailto:mihailmariusion@gmail.com">✉ mihailmariusion@gmail.com</a>
          <a href="https://linkedin.com/in/mariusdev" target="_blank" rel="noopener">in linkedin.com/in/mariusdev</a>
          <a href="https://github.com/mihailmariusiondev" target="_blank" rel="noopener">&lt;/&gt; github.com/mihailmariusiondev</a>
        </div>
        <div class="cv-btns">
          <a href="assets/marius-mihail-ion-cv.pdf" download>Descargar CV — Inglés</a>
          <a href="assets/marius-mihail-ion-cv-es.pdf" download>Descargar CV — Español</a>
        </div>`
    }
  ];

  function tagRow(tags){ return tags.map(t=>`<span class="tag">${t}</span>`).join(""); }

  // ---------- Render pages ----------
  const pagesRoot = document.getElementById("pages");
  const N = PAGES.length;

  PAGES.forEach((p, i) => {
    const el = document.createElement("div");
    el.className = "page";
    el.id = "page-" + i;
    el.style.zIndex = String(N - i);
    const sceneTpl = document.getElementById(p.scene);
    const sceneHtml = sceneTpl ? sceneTpl.innerHTML : "";
    const faceClass = p.cover ? "face cover-face" : "face";
    el.innerHTML = `
      <div class="${faceClass}">
        ${p.cover ? "" : `<div class="scene">${sceneHtml}</div>`}
        <div class="content" tabindex="-1">
          <div class="en">${p.en}</div>
          <div class="es">${p.es}</div>
        </div>
      </div>
      <div class="face back"><div class="back-inner">${i + 1}</div></div>
    `;
    pagesRoot.appendChild(el);
  });

  // ---------- Progress dots ----------
  const progress = document.getElementById("progress");
  PAGES.forEach((p, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", "Chapter " + (i + 1));
    b.dataset.idx = String(i);
    b.addEventListener("click", () => jumpTo(i));
    progress.appendChild(b);
  });

  // ---------- State ----------
  let current = 0; // number of pages turned = index of top unturned page
  const pageEls = Array.from(document.querySelectorAll(".page"));
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageLabel = document.getElementById("pageLabel");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) document.body.classList.add("reduced-motion");

  function render() {
    pageEls.forEach((el, i) => {
      el.classList.remove("current");
      if (i < current) {
        el.style.transform = "rotateY(-180deg)";
        el.style.zIndex = String(i);
      } else {
        el.style.transform = "rotateY(0deg)";
        el.style.zIndex = String(N - i);
      }
    });
    if (pageEls[current]) pageEls[current].classList.add("current");
    prevBtn.disabled = current <= 0;
    nextBtn.disabled = current >= N - 1;
    pageLabel.textContent = (current + 1) + " / " + N;
    Array.from(progress.children).forEach((b, i) => {
      b.setAttribute("aria-current", i === current ? "true" : "false");
    });
  }

  function next() {
    if (current >= N - 1) return;
    current++;
    render();
    focusCurrentContent();
  }
  function prev() {
    if (current <= 0) return;
    current--;
    render();
    focusCurrentContent();
  }
  function jumpTo(i) {
    current = Math.max(0, Math.min(N - 1, i));
    render();
    focusCurrentContent();
  }
  function focusCurrentContent(){
    const c = pageEls[current] && pageEls[current].querySelector(".content");
    if (c) c.scrollTop = 0;
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  document.addEventListener("keydown", (e) => {
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
    if (e.key === "ArrowRight") { next(); e.preventDefault(); }
    else if (e.key === "ArrowLeft") { prev(); e.preventDefault(); }
    else if (e.key === "Home") { jumpTo(0); e.preventDefault(); }
    else if (e.key === "End") { jumpTo(N - 1); e.preventDefault(); }
  });

  // ---------- Drag to turn ----------
  let dragging = false, dragStartX = 0, dragPage = null, dragWidth = 1;
  const stage = document.getElementById("book");

  stage.addEventListener("pointerdown", (e) => {
    if (reduceMotion) return;
    const el = pageEls[current];
    if (!el) return;
    // ignore drags starting inside scrollable text content on desktop text selection
    dragging = true;
    dragStartX = e.clientX;
    dragPage = el;
    dragWidth = stage.getBoundingClientRect().width;
    dragPage.classList.add("dragging");
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener("pointermove", (e) => {
    if (!dragging || !dragPage) return;
    const dx = e.clientX - dragStartX;
    const deg = Math.max(-180, Math.min(0, (dx / dragWidth) * -180));
    if (dx < -4) dragPage.style.transform = `rotateY(${deg}deg)`;
  });
  function endDrag(e) {
    if (!dragging || !dragPage) return;
    dragging = false;
    dragPage.classList.remove("dragging");
    const dx = e.clientX - dragStartX;
    dragPage = null;
    if (dx < -(dragWidth * 0.28)) next(); else render();
  }
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);

  // ---------- Lang toggle ----------
  const langToggle = document.getElementById("langToggle");
  const langCur = document.getElementById("langCur");
  const langOther = document.getElementById("langOther");
  function setLang(lang) {
    const isEs = lang === "es";
    document.body.classList.toggle("lang-es", isEs);
    document.documentElement.lang = isEs ? "es" : "en";
    langCur.textContent = isEs ? "ES" : "EN";
    langOther.textContent = isEs ? "EN" : "ES";
    try { localStorage.setItem("popupbook-lang", lang); } catch (e) {}
  }
  langToggle.addEventListener("click", () => {
    setLang(document.body.classList.contains("lang-es") ? "en" : "es");
  });
  let savedLang = "en";
  try { savedLang = localStorage.getItem("popupbook-lang") || "en"; } catch (e) {}
  setLang(savedLang);

  // ---------- Dock ----------
  const dock = document.getElementById("dock");
  const dockToggle = document.getElementById("dockToggle");
  dockToggle.addEventListener("click", () => {
    const open = dock.getAttribute("data-open") === "true";
    dock.setAttribute("data-open", open ? "false" : "true");
    dockToggle.setAttribute("aria-expanded", open ? "false" : "true");
  });

  render();
})();
