import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/600.css";
import "./style.css";
import {
  INTENTS,
  STARTER_CHIPS,
  OPENING,
  FALLBACK,
  CONTACT_LINKS,
  STATS,
  type Lang,
  type Intent,
  type Card,
  type L,
} from "./data";
import { matchIntent, getIntent } from "./intent";

const app = document.querySelector<HTMLDivElement>("#app")!;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lang: Lang = (localStorage.getItem("lang") as Lang) || "en";
let reading = false;
const askedIds = new Set<string>();

const T = {
  brand: { en: "Marius Mihail Ion", es: "Marius Mihail Ion" },
  role: { en: "Senior Angular / Frontend Engineer", es: "Ingeniero Frontend Sénior (Angular)" },
  tagline: {
    en: "Ask the CV — a scripted conversation, not a live AI.",
    es: "Pregúntale al CV — una conversación guionizada, no una IA en vivo.",
  },
  inputPlaceholder: { en: "Ask about a role, a metric, the shopping assistant…", es: "Pregunta sobre un puesto, una métrica, el asistente de compra…" },
  send: { en: "Send", es: "Enviar" },
  readAll: { en: "Show everything", es: "Ver todo" },
  backToChat: { en: "Back to chat", es: "Volver al chat" },
  langSwitch: { en: "ES", es: "EN" },
  langSwitchLabel: { en: "Ver esta página en español", es: "View this page in English" },
  you: { en: "You", es: "Tú" },
  marius: { en: "Marius", es: "Marius" },
  cvEn: { en: "Download CV (English)", es: "Descargar CV (inglés)" },
  cvEs: { en: "Download CV (Spanish)", es: "Descargar CV (español)" },
  moreQuestions: { en: "More to ask", es: "Más para preguntar" },
  a11yNote: {
    en: "Every interactive element has a visible keyboard focus state, live regions announce new replies, and motion backs off when reduced motion is set.",
    es: "Cada elemento interactivo tiene un estado de foco visible, las regiones activas anuncian las respuestas nuevas, y el movimiento se reduce cuando se solicita menos movimiento.",
  },
  readingIntro: {
    en: "Every scripted answer on one page, for screen readers, search, or anyone who'd rather scroll than chat.",
    es: "Todas las respuestas guionizadas en una sola página, para lectores de pantalla, búsqueda, o quien prefiera desplazarse en vez de conversar.",
  },
  heroKicker: {
    en: "Not a live AI — a scripted stand-in",
    es: "No es una IA en vivo — un sustituto guionizado",
  },
  heroLede: {
    en: "He shipped a real-time voice assistant with an actual LLM. This page isn't it: every reply below is pre-written, sourced from his verified CV.",
    es: "Él construyó un asistente de voz en tiempo real con un LLM real. Esta página no lo es: cada respuesta de abajo está preescrita, y viene de su CV verificado.",
  },
} satisfies Record<string, L<string>>;

function t<T2>(v: L<T2>): T2 {
  return v[lang];
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else node.setAttribute(k, v);
  }
  for (const c of children) node.append(c);
  return node;
}

// ---------- shell ----------

let logEl: HTMLDivElement;
let chipsEl: HTMLDivElement;
let formEl: HTMLFormElement;
let inputEl: HTMLInputElement;
let readingEl: HTMLDivElement;
let chatViewEl: HTMLDivElement;

function renderShell() {
  app.innerHTML = "";
  document.documentElement.lang = lang;

  const header = el(
    "header",
    { class: "site-header" },
    el(
      "div",
      { class: "brand" },
      el("span", { class: "brand-photo", role: "img", "aria-label": t({ en: "Portrait of Marius Mihail Ion", es: "Retrato de Marius Mihail Ion" }) }),
      el(
        "div",
        {},
        el("p", { class: "brand-name" }, t(T.brand)),
        el("p", { class: "brand-role" }, t(T.role))
      )
    ),
    el(
      "div",
      { class: "header-actions" },
      el(
        "button",
        { class: "pill-btn", type: "button", id: "reading-toggle", "aria-pressed": String(reading) },
        t(reading ? T.backToChat : T.readAll)
      ),
      el(
        "button",
        { class: "pill-btn lang-btn", type: "button", id: "lang-toggle", "aria-label": t(T.langSwitchLabel) },
        t(T.langSwitch)
      )
    )
  );

  const hero = el(
    "section",
    { class: "hero", "aria-label": t(T.heroKicker) },
    el("p", { class: "hero-kicker" }, "// " + t(T.heroKicker)),
    el("h1", { class: "hero-lede" }, t(T.heroLede)),
    el(
      "div",
      { class: "hero-stats", role: "list" },
      ...STATS.map((s) => {
        const valueEl = el("p", { class: "hero-stat-value" });
        const item = el("div", { class: "hero-stat", role: "listitem" }, valueEl, el("p", { class: "hero-stat-label" }, t(s.label)));
        statValue(valueEl, s.value);
        return item;
      })
    )
  );

  chatViewEl = el("div", { class: "chat-view" });
  logEl = el("div", { class: "chat-log", role: "log", "aria-live": "polite", "aria-label": t(T.marius) + " " + t(T.tagline) });
  chipsEl = el("div", { class: "chips", role: "group", "aria-label": t(T.moreQuestions) });
  inputEl = el("input", {
    class: "chat-input",
    type: "text",
    name: "q",
    placeholder: t(T.inputPlaceholder),
    "aria-label": t(T.inputPlaceholder),
    autocomplete: "off",
  }) as HTMLInputElement;
  formEl = el(
    "form",
    { class: "composer" },
    inputEl,
    el("button", { class: "send-btn", type: "submit" }, t(T.send))
  );
  chatViewEl.append(logEl, chipsEl, formEl);

  readingEl = el("div", { class: "reading-view" });
  readingEl.hidden = true;

  const footer = el(
    "footer",
    { class: "site-footer" },
    el(
      "div",
      { class: "footer-links" },
      ...CONTACT_LINKS.map((c) =>
        el("a", { href: c.href, class: "footer-link" }, t(c.label) + ": " + c.value)
      ),
      el("a", { href: "/cv-en.pdf", class: "footer-link", download: "" }, t(T.cvEn)),
      el("a", { href: "/cv-es.pdf", class: "footer-link", download: "" }, t(T.cvEs))
    ),
    el("p", { class: "footer-a11y" }, t(T.a11yNote))
  );

  app.append(header, hero, chatViewEl, readingEl, footer);

  document.querySelector("#reading-toggle")!.addEventListener("click", () => {
    reading = !reading;
    renderShell();
    if (!reading) restartConversation();
    else renderReadingView();
  });
  document.querySelector("#lang-toggle")!.addEventListener("click", () => {
    lang = lang === "en" ? "es" : "en";
    localStorage.setItem("lang", lang);
    askedIds.clear();
    renderShell();
    if (reading) renderReadingView();
    else restartConversation();
  });
  formEl.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const value = inputEl.value.trim();
    if (!value) return;
    inputEl.value = "";
    handleUserInput(value);
  });

  chatViewEl.hidden = reading;
  readingEl.hidden = !reading;
  hero.hidden = reading;
}

// ---------- chat rendering ----------

function scrollToEnd() {
  logEl.scrollTop = logEl.scrollHeight;
}

function addUserMessage(text: string) {
  const msg = el("div", { class: "msg msg-user" }, el("p", {}, text));
  logEl.append(msg);
  scrollToEnd();
}

function typeLine(target: HTMLElement, text: string): Promise<void> {
  if (reduceMotion) {
    target.textContent = text;
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    let i = 0;
    const step = () => {
      i += Math.max(1, Math.round(text.length / 60));
      target.textContent = text.slice(0, i);
      if (i < text.length) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
}

async function addBotAnswer(intent: Intent) {
  const bubble = el("div", { class: "msg msg-bot" });
  const label = el("p", { class: "msg-author" }, t(T.marius));
  bubble.append(label);
  logEl.append(bubble);
  scrollToEnd();

  for (const lineL of intent.answer.lines) {
    const p = el("p", { class: "msg-line" });
    bubble.append(p);
    await typeLine(p, t(lineL));
    scrollToEnd();
  }

  if (intent.answer.cards) {
    for (const card of intent.answer.cards) {
      bubble.append(renderCard(card));
    }
    scrollToEnd();
  }

  renderChips(intent.answer.followups ?? STARTER_CHIPS);
}

function renderChips(ids: string[]) {
  chipsEl.innerHTML = "";
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id) || askedIds.has(id)) continue;
    seen.add(id);
    const intent = getIntent(id);
    if (!intent) continue;
    const btn = el("button", { class: "chip", type: "button" }, t(intent.chip));
    btn.addEventListener("click", () => handleChip(intent));
    chipsEl.append(btn);
  }
  if (!chipsEl.children.length) {
    // everything asked from this thread: fall back to the full starter set
    for (const id of STARTER_CHIPS) {
      if (askedIds.has(id)) continue;
      const intent = getIntent(id)!;
      const btn = el("button", { class: "chip", type: "button" }, t(intent.chip));
      btn.addEventListener("click", () => handleChip(intent));
      chipsEl.append(btn);
    }
  }
}

function handleChip(intent: Intent) {
  addUserMessage(t(intent.chip));
  askedIds.add(intent.id);
  addBotAnswer(intent);
}

function handleUserInput(text: string) {
  addUserMessage(text);
  const intent = matchIntent(text);
  if (intent) {
    askedIds.add(intent.id);
    addBotAnswer(intent);
  } else {
    const bubble = el(
      "div",
      { class: "msg msg-bot msg-fallback" },
      el("p", { class: "msg-author" }, t(T.marius)),
      el("p", { class: "msg-line" }, t(FALLBACK))
    );
    logEl.append(bubble);
    scrollToEnd();
    renderChips(STARTER_CHIPS);
  }
}

async function restartConversation() {
  askedIds.clear();
  logEl.innerHTML = "";
  const bubble = el(
    "div",
    { class: "msg msg-bot" },
    el("p", { class: "msg-author" }, t(T.marius))
  );
  logEl.append(bubble);
  for (const lineText of t(OPENING)) {
    const p = el("p", { class: "msg-line" });
    bubble.append(p);
    await typeLine(p, lineText);
  }
  // Orchestrated opener: a recruiter's most common first question, asked and
  // answered immediately, so the first viewport shows a real exchange instead
  // of an empty log waiting on user input.
  const opener = getIntent("intro")!;
  addUserMessage(t({ en: "So, who are you?", es: "Bueno, ¿quién eres?" }));
  askedIds.add(opener.id);
  await addBotAnswer(opener);
  inputEl.placeholder = t(T.inputPlaceholder);
}

// ---------- cards ----------

function statValue(el2: HTMLElement, value: string) {
  if (reduceMotion || !/^\d/.test(value)) {
    el2.textContent = value;
    return;
  }
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    el2.textContent = value;
    return;
  }
  const target = parseFloat(match[1]);
  const suffix = match[2];
  const duration = 900;
  const start = performance.now();
  function frame(now: number) {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    const current = target * eased;
    const display = Number.isInteger(target) ? Math.round(current).toString() : current.toFixed(1);
    el2.textContent = display + suffix;
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function renderCard(card: Card): HTMLElement {
  switch (card.kind) {
    case "stats": {
      const grid = el("div", { class: "card card-stats" });
      for (const s of card.stats!) {
        const valueEl = el("p", { class: "stat-value" });
        const item = el("div", { class: "stat-item" }, valueEl, el("p", { class: "stat-label" }, t(s.label)));
        grid.append(item);
        statValue(valueEl, s.value);
      }
      return grid;
    }
    case "timeline": {
      const list = el("ol", { class: "card card-timeline" });
      for (const item of card.timeline!) {
        const li = el(
          "li",
          { class: "timeline-item" },
          el("p", { class: "timeline-period" }, t(item.period)),
          el(
            "p",
            { class: "timeline-role" },
            t(item.role),
            item.client ? el("span", { class: "timeline-client" }, " · " + item.client) : ""
          ),
          el("p", { class: "timeline-company" }, t(item.company))
        );
        list.append(li);
      }
      return list;
    }
    case "case": {
      const cs = card.case!;
      const details = el("details", { class: "card card-case" });
      const summary = el(
        "summary",
        {},
        el("p", { class: "case-title" }, t(cs.title)),
        el("p", { class: "case-summary" }, t(cs.summary)),
        el("div", { class: "case-tags" }, ...cs.tags.map((tag) => el("span", { class: "tag" }, tag)))
      );
      details.append(summary);
      const body = el("dl", { class: "case-body" });
      for (const f of cs.fields) {
        body.append(el("dt", {}, t(f.label)), el("dd", {}, t(f.value)));
      }
      details.append(body);
      return details;
    }
    case "quote": {
      const wrap = el("div", { class: "card card-quotes" });
      for (const q of card.quotes!) {
        wrap.append(
          el(
            "figure",
            { class: "quote-item" },
            el("blockquote", {}, "“" + t(q.quote) + "”"),
            el("figcaption", {}, q.author + " — " + t(q.role))
          )
        );
      }
      return wrap;
    }
    case "cv": {
      return el(
        "div",
        { class: "card card-cv" },
        el("a", { class: "cv-btn", href: "/cv-en.pdf", download: "" }, t(T.cvEn)),
        el("a", { class: "cv-btn", href: "/cv-es.pdf", download: "" }, t(T.cvEs))
      );
    }
    case "contact": {
      const wrap = el("div", { class: "card card-contact" });
      for (const c of CONTACT_LINKS) {
        wrap.append(el("a", { class: "contact-link", href: c.href }, t(c.label) + ": " + c.value));
      }
      return wrap;
    }
    default:
      return el("p", {}, card.text ? t(card.text) : "");
  }
}

// ---------- reading view ----------

function renderReadingView() {
  readingEl.innerHTML = "";
  readingEl.append(
    el("h1", {}, t(T.brand)),
    el("p", { class: "reading-intro" }, t(T.readingIntro))
  );
  for (const intent of INTENTS) {
    const section = el("section", { class: "reading-section" }, el("h2", {}, t(intent.chip)));
    for (const line of intent.answer.lines) section.append(el("p", {}, t(line)));
    if (intent.answer.cards) {
      for (const card of intent.answer.cards) section.append(renderCard(card));
    }
    readingEl.append(section);
  }
}

// ---------- boot ----------

renderShell();
restartConversation();
