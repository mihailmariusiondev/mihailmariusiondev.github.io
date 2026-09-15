import type { Lang } from "./content";
import {
  nav,
  chrome,
  hero,
  caseStudies,
  roles,
  stats,
  quotes,
  about,
  contact,
} from "./content";

const STORAGE_KEY = "mmi-lang";
let lang: Lang = (localStorage.getItem(STORAGE_KEY) as Lang) || "en";

const $ = <T extends Element = Element>(sel: string) => document.querySelector(sel) as T;

function setText(id: string, value: string) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function renderChrome() {
  document.documentElement.lang = lang;
  ($("#skip-link") as HTMLElement).textContent = chrome.skip[lang];
  ($("#lang-toggle") as HTMLElement).textContent = lang === "en" ? "ES" : "EN";
  ($("#lang-toggle") as HTMLElement).setAttribute(
    "aria-label",
    lang === "en" ? "Ver en español" : "View in English"
  );
  ($("#cv-link") as HTMLAnchorElement).href = lang === "en" ? contact.cvEn : contact.cvEs;
  ($("#cv-link") as HTMLAnchorElement).textContent = chrome.downloadCv[lang];
  ($("#scroll-hint") as HTMLElement).textContent = chrome.scrollHint[lang];

  const navEl = document.getElementById("chapter-nav")!;
  navEl.innerHTML = "";
  nav.items.forEach((item) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = item.label[lang];
    btn.dataset.target = item.id;
    btn.addEventListener("click", () => {
      document.getElementById(item.id)?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    });
    navEl.appendChild(btn);
  });
}

function renderHero() {
  setText("hero-kicker", hero.kicker[lang]);
  setText("hero-title", hero.title[lang]);
  setText("hero-lede", hero.lede[lang]);
  setText("hero-location", hero.location[lang]);
  setText("hero-cta1", hero.cta1[lang]);
  setText("hero-cta2", hero.cta2[lang]);
}

function renderCaseStudies() {
  const grid = document.getElementById("case-studies")!;
  grid.innerHTML = "";
  caseStudies.forEach((cs) => {
    const card = document.createElement("article");
    card.className = "case-card";
    const tagsHtml = cs.tags.map((t) => `<span>${t}</span>`).join("");
    const fieldsHtml = cs.fields
      .map((f) => `<dt>${f.label[lang]}</dt><dd>${f.value[lang]}</dd>`)
      .join("");
    card.innerHTML = `
      <h3>${cs.title[lang]}</h3>
      <p class="summary">${cs.summary[lang]}</p>
      <div class="tags">${tagsHtml}</div>
      <details>
        <summary>${lang === "en" ? "Read the full case" : "Leer el caso completo"}</summary>
        <dl>${fieldsHtml}</dl>
        ${cs.note ? `<p class="note">${cs.note[lang]}</p>` : ""}
      </details>
    `;
    grid.appendChild(card);
  });
}

function renderRoles() {
  const list = document.getElementById("role-list")!;
  list.innerHTML = "";
  roles.forEach((r) => {
    const li = document.createElement("li");
    li.className = "role-item";
    const bullets = r.bullets[lang];
    li.innerHTML = `
      <span class="role-period">${r.period[lang]}</span>
      <h3>${r.role[lang] ? r.role[lang] + " — " : ""}${r.company}</h3>
      ${r.client ? `<span class="role-client">${r.client}</span>` : ""}
      ${bullets.length ? `<ul>${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>` : ""}
    `;
    list.appendChild(li);
  });
}

function renderStats() {
  const grid = document.getElementById("stat-grid")!;
  grid.innerHTML = "";
  stats.forEach((s) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<span class="value">${s.value}</span><span class="label">${s.label[lang]}</span>`;
    grid.appendChild(card);
  });
}

function renderAbout() {
  setText("about-heading", about.heading[lang]);
  const body = document.getElementById("about-body")!;
  body.innerHTML = about.body[lang].map((p) => `<p>${p}</p>`).join("");
  const quotesEl = document.getElementById("quotes")!;
  quotesEl.innerHTML = quotes
    .map(
      (q) => `
      <blockquote class="quote">
        <p>“${q.quote[lang]}”</p>
        <cite>${q.author} — ${q.role[lang]}</cite>
      </blockquote>`
    )
    .join("");
}

function renderContact() {
  setText("contact-heading", contact.heading[lang]);
  setText("contact-body", contact.body[lang]);
  const links = document.getElementById("contact-links")!;
  links.innerHTML = `
    <a href="mailto:${contact.email}">Email</a>
    <a href="${contact.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
    <a href="${contact.github}" target="_blank" rel="noopener">GitHub</a>
    <a href="${contact.cvEn}" download>CV (EN)</a>
    <a href="${contact.cvEs}" download>CV (ES)</a>
  `;
}

function renderAll() {
  renderChrome();
  renderHero();
  renderCaseStudies();
  renderRoles();
  renderStats();
  renderAbout();
  renderContact();
  updateActiveNav();
}

document.getElementById("lang-toggle")?.addEventListener("click", () => {
  lang = lang === "en" ? "es" : "en";
  localStorage.setItem(STORAGE_KEY, lang);
  renderAll();
});

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

function updateActiveNav() {
  const sections = Array.from(document.querySelectorAll<HTMLElement>(".panel"));
  const scrollMid = window.scrollY + window.innerHeight * 0.4;
  let activeId = sections[0]?.id;
  for (const s of sections) {
    if (s.offsetTop <= scrollMid) activeId = s.id;
  }
  document.querySelectorAll("#chapter-nav button").forEach((btn) => {
    btn.classList.toggle("active", (btn as HTMLElement).dataset.target === activeId);
  });
}

function scrollProgress() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  return max > 0 ? window.scrollY / max : 0;
}

renderAll();

const reduced = prefersReducedMotion();
const webgl = hasWebGL();

if (reduced) {
  const notice = document.getElementById("notice")!;
  notice.hidden = false;
  notice.textContent = chrome.reducedNotice[lang];
}
if (!webgl && !reduced) {
  const notice = document.getElementById("notice")!;
  notice.hidden = false;
  notice.textContent = chrome.noWebglNotice[lang];
}

const canvas = document.getElementById("scene") as HTMLCanvasElement;
const fallbackBg = document.getElementById("fallback-bg")!;

if (reduced || !webgl) {
  canvas.remove();
  fallbackBg.classList.add("active");
} else {
  // Lazy-load three.js after first paint / idle so the initial HTML+CSS paints instantly.
  const mountScene = () => {
    import("./scene").then(({ World }) => {
      const mobile = window.matchMedia("(max-width: 760px)").matches || window.innerWidth < 760;
      const world = new World(canvas, mobile);
      world.start();
      window.addEventListener(
        "scroll",
        () => {
          world.setProgress(scrollProgress());
          updateActiveNav();
        },
        { passive: true }
      );
      world.setProgress(scrollProgress());
    });
  };
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(mountScene, { timeout: 1200 });
  } else {
    setTimeout(mountScene, 200);
  }
}

window.addEventListener(
  "scroll",
  () => {
    updateActiveNav();
    const hint = document.getElementById("scroll-hint")!;
    if (window.scrollY > 80) hint.classList.add("hidden");
    else hint.classList.remove("hidden");
  },
  { passive: true }
);
