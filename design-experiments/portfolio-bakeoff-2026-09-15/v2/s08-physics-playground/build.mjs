// Build: template dist/index.html from src/data.mjs, bundle src/main.js with
// esbuild, copy static assets. No framework — see DESIGN.md for why.
import { build } from "esbuild";
import { mkdirSync, copyFileSync, writeFileSync, readdirSync, rmSync } from "node:fs";
import * as d from "./src/data.mjs";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Bilingual text node: both languages in the DOM, CSS shows one. */
function bi(field, tag = "span") {
  const en = typeof field === "string" ? field : field.en;
  const es = typeof field === "string" ? field : field.es;
  return `<${tag} class="i18n-en">${esc(en)}</${tag}><${tag} class="i18n-es">${esc(es)}</${tag}>`;
}
function biAttr(field) {
  return { en: esc(typeof field === "string" ? field : field.en), es: esc(typeof field === "string" ? field : field.es) };
}

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });

// ---- hero letters (grouped by word so wrapping never splits a word) ----
let letterIndex = 0;
const nameLetters = d.site.name.split(" ").map((word) => {
  const letters = word.split("").map((ch) => {
    const idx = letterIndex++;
    return `<span class="letter" data-body="letter" data-index="${idx}" tabindex="0" role="text">${esc(ch)}</span>`;
  }).join("");
  return `<span class="word">${letters}</span>`;
}).join("");

// ---- metrics chips ------------------------------------------------------
const metricChips = d.metrics.map((m, i) => `
  <li class="chip chip--metric" data-body="chip" data-group="metric" tabindex="0">
    <strong class="chip__value">${bi(m.value)}</strong>
    <span class="chip__label">${bi(m.label)}</span>
  </li>`).join("");

// ---- stack chips ----------------------------------------------------------
const stackBins = d.stackGroups.map((group, gi) => `
  <div class="bin" data-bin="stack-${gi}">
    <h3 class="bin__title">${bi(group.title)}</h3>
    <ul class="bin__floor" data-bin-floor="stack-${gi}">
      ${group.items.map((item, ii) => `<li class="chip chip--tech" data-body="chip" data-group="stack-${gi}" tabindex="0">${esc(item)}</li>`).join("")}
    </ul>
  </div>`).join("");

// ---- case studies -----------------------------------------------------
const caseCards = d.caseStudies.map((cs, i) => `
  <button class="card card--case" data-body="case" data-index="${i}" data-open-dialog="dialog-${cs.slug}" type="button">
    <span class="card__eyebrow">${bi({ en: "Case study", es: "Caso" })}</span>
    <h3 class="card__title">${bi(cs.title)}</h3>
    <p class="card__summary">${bi(cs.summary)}</p>
    <span class="card__tags">${cs.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</span>
    <span class="card__cue">${bi({ en: "Read the full case →", es: "Leer el caso completo →" })}</span>
  </button>`).join("");

const caseDialogs = d.caseStudies.map((cs) => `
  <dialog id="dialog-${cs.slug}" class="case-dialog" aria-labelledby="dialog-${cs.slug}-title">
    <form method="dialog" class="case-dialog__form">
      <button class="case-dialog__close" type="submit" aria-label="Close / Cerrar">×</button>
    </form>
    <h3 id="dialog-${cs.slug}-title">${bi(cs.title)}</h3>
    <p class="tag-row">${cs.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</p>
    <dl>
      ${cs.fields.map((f) => `<div class="field"><dt>${bi(f.label)}</dt><dd>${bi(f.value)}</dd></div>`).join("")}
    </dl>
    ${cs.confidential ? `<p class="case-dialog__note">${bi(cs.confidential)}</p>` : ""}
  </dialog>`).join("\n");

// ---- experience ---------------------------------------------------------
const experienceItems = d.experience.map((role, i) => `
  <li class="role">
    <span class="role__dot" data-body="dot" data-index="${i}" aria-hidden="true"></span>
    <div class="role__card">
      <p class="role__period">${esc(role.period)}</p>
      <h3 class="role__company">${bi(role.company)}${role.client ? ` <span class="role__client">· ${bi(role.client)}</span>` : ""}</h3>
      ${role.role ? `<p class="role__title">${bi(role.role)}</p>` : ""}
      ${role.bullets.length ? `<ul class="role__bullets">${role.bullets.map((b) => `<li>${bi(b)}</li>`).join("")}</ul>` : ""}
    </div>
  </li>`).join("");

// ---- recommendations ------------------------------------------------------
const recCards = d.recommendations.map((r, i) => `
  <li class="card card--rec" data-body="rec" data-index="${i}" tabindex="0">
    <p class="rec__quote">“${bi(r.quote)}”</p>
    <p class="rec__author">${esc(r.author)} <span class="rec__role">— ${bi(r.role)}</span></p>
  </li>`).join("");

const html = `<!doctype html>
<html lang="en" data-lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${biAttr(d.site.title).en}</title>
<meta name="description" content="${biAttr(d.site.description).en}">
<link rel="canonical" href="https://mihailmariusiondev.github.io/">
<meta property="og:type" content="website">
<meta property="og:title" content="${biAttr(d.site.title).en}">
<meta property="og:description" content="${biAttr(d.site.description).en}">
<meta property="og:image" content="/me.webp">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/styles.css">
<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org", "@type": "Person",
  name: d.site.name, jobTitle: d.site.role.en, url: "https://mihailmariusiondev.github.io/",
  email: "mailto:" + d.contact.email, sameAs: [d.contact.linkedin, d.contact.github],
  address: { "@type": "PostalAddress", addressLocality: "Zaragoza", addressCountry: "ES" },
})}</script>
</head>
<body>
<a class="skip-link" href="#main">${bi(d.nav.skip)}</a>
<header class="site-header">
  <a class="site-header__name" href="#top">${esc(d.site.name)}</a>
  <nav class="site-header__nav" aria-label="Primary">
    <a href="#cases">${bi(d.nav.cases)}</a>
    <a href="#stack">${bi(d.nav.stack)}</a>
    <a href="#experience">${bi(d.nav.experience)}</a>
    <a href="#contact">${bi(d.nav.contact)}</a>
  </nav>
  <div class="site-header__controls">
    <button id="motion-toggle" type="button" aria-pressed="true">
      <span class="on">${bi(d.nav.motionOn)}</span>
      <span class="off" hidden>${bi(d.nav.motionOff)}</span>
    </button>
    <button id="lang-toggle" type="button" aria-label="${biAttr({en:"Ver en español",es:"View in English"}).en}">${esc(d.nav.lang.en)}</button>
    <a href="/marius-mihail-ion-cv.pdf" class="cta cta--ghost" id="cv-link" download>${bi(d.hero.ctaCv)}</a>
  </div>
</header>

<main id="main">
  <section id="top" class="hero" data-physics-zone="hero">
    <p class="hero__eyebrow">${bi(d.hero.eyebrow)}</p>
    <h1 class="hero__name" data-bin="hero" aria-label="${esc(d.site.name)}">${nameLetters}</h1>
    <p class="hero__role">${bi(d.site.role)}</p>
    <p class="hero__lede">${bi(d.hero.lede)}</p>
    <p class="hero__location">${bi(d.hero.location)}</p>
    <div class="hero__ctas">
      <a class="cta cta--primary" href="#cases">${bi(d.hero.ctaCases)}</a>
      <a class="cta cta--ghost" href="/marius-mihail-ion-cv.pdf" download>${bi(d.hero.ctaCv)} (EN)</a>
      <a class="cta cta--ghost" href="/marius-mihail-ion-cv-es.pdf" download>${bi(d.hero.ctaCv)} (ES)</a>
    </div>
    <p class="hero__hint">${bi(d.hero.hint)}</p>
    <img class="hero__photo" src="/me.webp" width="96" height="96" alt="${biAttr(d.hero.photoAlt).en}" loading="eager">
  </section>

  <section id="compression" class="compression" aria-labelledby="compression-title">
    <h2 id="compression-title">${bi(d.compression.heading)}</h2>
    <p class="section-lede">${bi(d.compression.lede)}</p>
    <div class="compressor" data-compressor>
      <div class="compressor__jaw compressor__jaw--left" aria-hidden="true"></div>
      <div class="compressor__jaw compressor__jaw--right" aria-hidden="true"></div>
      <div class="compressor__block" data-compressor-block>${esc(d.compression.before)}</div>
    </div>
    <p class="compressor__result" data-compressor-result data-after="${esc(d.compression.after)}" hidden>${bi(d.compression.result)}</p>
    <button class="cta cta--ghost" type="button" data-compressor-replay>${bi(d.compression.replay)}</button>
    <p class="section-note">${bi(d.compression.caption)}</p>
    <ul class="metrics" data-bin="metrics">${metricChips}</ul>
  </section>

  <section id="cases" class="cases" aria-labelledby="cases-title" data-physics-zone="cases">
    <h2 id="cases-title">${bi({ en: "Case studies that fall into place", es: "Casos que caen en su sitio" })}</h2>
    <p class="section-lede">${bi({ en: "Four real, sanitized pieces of enterprise work. Let them land, then open any one for the full read.", es: "Cuatro piezas reales de trabajo corporativo, sanitizadas. Déjalas caer y abre cualquiera para leerla entera." })}</p>
    <div class="cases__grid" data-bin="cases">${caseCards}</div>
  </section>
  ${caseDialogs}

  <section id="stack" class="stack" aria-labelledby="stack-title" data-physics-zone="stack">
    <h2 id="stack-title">${bi({ en: "Throw the stack around", es: "Lanza la pila de tecnologías" })}</h2>
    <p class="section-lede">${bi({ en: "Every chip is a real body with weight and friction. Grab one, throw it, watch it settle on the others.", es: "Cada chip es un cuerpo real con peso y fricción. Agarra uno, lánzalo, mira cómo se posa sobre los demás." })}</p>
    <div class="stack__bins">${stackBins}</div>
  </section>

  <section id="experience" class="experience" aria-labelledby="experience-title">
    <h2 id="experience-title">${bi({ en: "A verified career timeline", es: "Una trayectoria profesional verificada" })}</h2>
    <ol class="experience__list" data-bin="experience-dots">${experienceItems}</ol>
  </section>

  <section id="recommendations" class="recommendations" aria-labelledby="recs-title" data-physics-zone="recs">
    <h2 id="recs-title">${bi({ en: "Toss around what people said", es: "Lanza lo que dijeron de él" })}</h2>
    <ul class="recommendations__grid" data-bin="recs">${recCards}</ul>
  </section>

  <section id="contact" class="contact" aria-labelledby="contact-title" data-physics-zone="contact">
    <h2 id="contact-title">${bi(d.contact.heading)}</h2>
    <p class="section-lede">${bi(d.contact.lede)}</p>
    <ul class="contact__dock" data-bin="contact">
      <li class="chip chip--contact" data-body="chip" data-group="contact" tabindex="0"><a href="mailto:${d.contact.email}">${d.contact.email}</a></li>
      <li class="chip chip--contact" data-body="chip" data-group="contact" tabindex="0"><a href="${d.contact.linkedin}" rel="me noopener" target="_blank">LinkedIn ↗</a></li>
      <li class="chip chip--contact" data-body="chip" data-group="contact" tabindex="0"><a href="${d.contact.github}" rel="me noopener" target="_blank">GitHub ↗</a></li>
      <li class="chip chip--contact" data-body="chip" data-group="contact" tabindex="0"><a href="/marius-mihail-ion-cv.pdf" download>CV (EN)</a></li>
      <li class="chip chip--contact" data-body="chip" data-group="contact" tabindex="0"><a href="/marius-mihail-ion-cv-es.pdf" download>CV (ES)</a></li>
    </ul>
  </section>
</main>

<footer class="site-footer">
  <p>${bi(d.footer.a11y)}</p>
  <p>${bi(d.footer.built)} · <button id="lang-toggle-2" type="button">${esc(d.nav.lang.en)}</button></p>
</footer>

<script type="module" src="/main.js"></script>
</body>
</html>`;

writeFileSync("dist/index.html", html);

// copy static assets
for (const f of readdirSync("public")) copyFileSync(`public/${f}`, `dist/${f}`);
copyFileSync("src/styles.css", "dist/styles.css");

await build({
  entryPoints: ["src/main.js"],
  bundle: true,
  minify: true,
  outfile: "dist/main.js",
  format: "esm",
  target: "es2019",
  logLevel: "info",
});

console.log("build done");
