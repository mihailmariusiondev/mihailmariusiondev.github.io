import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import {
  timeline,
  caseFiles,
  stats,
  recommendations,
  ui,
} from "./content.js";

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const html = document.documentElement;

/* ---------------- language toggle ---------------- */
const langToggle = document.getElementById("lang-toggle");
function setLang(lang) {
  html.setAttribute("lang", lang);
  html.setAttribute("data-lang", lang);
  // accessible name must contain the visible button label (ES/EN) to satisfy
  // the label/content name-match rule, so prefix it rather than replace it
  const nextLabel = lang === "en" ? "ES" : "EN";
  const nextAria = lang === "en" ? ui.langSwitchAria.en : ui.langSwitchAria.es;
  langToggle.setAttribute("aria-label", `${nextLabel} — ${nextAria}`);
  document.querySelectorAll("img[data-alt-es]").forEach((img) => {
    img.alt = lang === "es" ? img.dataset.altEs : "Portrait of Marius Mihail Ion";
  });
}
langToggle.addEventListener("click", () => {
  setLang(html.getAttribute("data-lang") === "en" ? "es" : "en");
});

function bi(node) {
  const en = document.createElement("span");
  en.dataset.lang = "en";
  en.textContent = node.en;
  const es = document.createElement("span");
  es.dataset.lang = "es";
  es.textContent = node.es;
  const frag = document.createDocumentFragment();
  frag.append(en, es);
  return frag;
}

/* ---------------- render: reel (scene 01) ---------------- */
const reelTrack = document.getElementById("reel-track");
timeline.forEach((item) => {
  const li = document.createElement("li");
  li.className = "reel-card";
  const period = document.createElement("span");
  period.className = "reel-period";
  period.append(bi(item.period));
  const company = document.createElement("p");
  company.className = "reel-company";
  company.textContent = typeof item.company === "string" ? item.company : item.company.en;
  if (typeof item.company !== "string") {
    company.textContent = "";
    company.append(bi(item.company));
  }
  li.append(period, company);
  if (item.client) {
    const client = document.createElement("p");
    client.className = "reel-client";
    client.textContent = item.client;
    li.append(client);
  }
  const role = document.createElement("p");
  role.className = "reel-role";
  role.append(bi(item.role));
  li.append(role);
  const note = document.createElement("p");
  note.className = "reel-note";
  note.append(bi(item.note));
  li.append(note);
  reelTrack.append(li);
});

/* ---------------- render: case files (scene 03) ---------------- */
const caseList = document.getElementById("case-list");
const caseDialog = document.getElementById("case-dialog");
const caseDialogBody = document.getElementById("case-dialog-body");

function renderMetric(metric) {
  if (metric.count) {
    const span = document.createElement("span");
    span.className = "count-target";
    span.dataset.from = metric.count.from;
    span.dataset.to = metric.count.to;
    span.dataset.prefix = metric.count.prefix || "";
    span.dataset.suffix = metric.count.suffix || "";
    span.textContent = `${metric.count.prefix || ""}${metric.count.from}${metric.count.suffix || ""}`;
    return span;
  }
  const span = document.createElement("span");
  if (typeof metric.static === "string") span.textContent = metric.static;
  else span.append(bi(metric.static));
  return span;
}

caseFiles.forEach((cs, i) => {
  const card = document.createElement("article");
  card.className = "case-card";
  card.id = `case-${cs.slug}`;

  const code = document.createElement("span");
  code.className = "case-code";
  code.textContent = cs.code;

  const title = document.createElement("h3");
  title.className = "case-title";
  title.append(bi(cs.title));

  const summary = document.createElement("p");
  summary.className = "case-summary";
  summary.append(bi(cs.summary));

  const tags = document.createElement("ul");
  tags.className = "case-tags";
  cs.tags.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    tags.append(li);
  });

  const metricRow = document.createElement("div");
  metricRow.className = "case-metric-row";
  const metricValue = document.createElement("span");
  metricValue.className = "case-metric-value";
  metricValue.append(renderMetric(cs.metric));
  const metricLabel = document.createElement("span");
  metricLabel.className = "case-metric-label";
  metricLabel.append(bi(cs.metric.label));
  metricRow.append(metricValue, metricLabel);

  const openBtn = document.createElement("button");
  openBtn.type = "button";
  openBtn.className = "case-open-btn";
  openBtn.append(bi(ui.caseFileOpen));
  openBtn.addEventListener("click", () => openCaseFile(cs));

  card.append(code, title, summary, tags, metricRow, openBtn);
  caseList.append(card);
});

function openCaseFile(cs) {
  caseDialogBody.replaceChildren();
  const title = document.createElement("h3");
  title.className = "case-title";
  title.append(bi(cs.title));
  caseDialogBody.append(title);
  cs.fields.forEach((f) => {
    const wrap = document.createElement("div");
    wrap.className = "dlg-field";
    const label = document.createElement("span");
    label.className = "dlg-field-label";
    label.append(bi(f.label));
    const value = document.createElement("p");
    value.className = "dlg-field-value";
    value.append(bi(f.value));
    wrap.append(label, value);
    caseDialogBody.append(wrap);
  });
  if (cs.confidential) {
    const p = document.createElement("p");
    p.className = "dlg-confidential";
    p.append(bi(cs.confidential));
    caseDialogBody.append(p);
  }
  caseDialog.showModal();
}
document.getElementById("case-dialog-close").addEventListener("click", () => caseDialog.close());
caseDialog.addEventListener("click", (e) => {
  if (e.target === caseDialog) caseDialog.close();
});

/* ---------------- render: stats (scene 04) ---------------- */
const statsGrid = document.getElementById("stats-grid");
stats.forEach((s) => {
  const card = document.createElement("div");
  card.className = "stat-card";
  const value = document.createElement("span");
  value.className = "stat-value";
  value.append(renderMetric(s));
  const label = document.createElement("p");
  label.className = "stat-label";
  label.append(bi(s.label));
  card.append(value, label);
  statsGrid.append(card);
});

/* ---------------- render: transmissions (scene 05) ---------------- */
const transmitTrack = document.getElementById("transmit-track");
recommendations.forEach((r) => {
  const card = document.createElement("blockquote");
  card.className = "transmit-card";
  const quote = document.createElement("p");
  quote.className = "transmit-quote";
  quote.append(bi(r.quote));
  const author = document.createElement("p");
  author.className = "transmit-author";
  author.textContent = r.author;
  const role = document.createElement("p");
  role.className = "transmit-role";
  role.append(bi(r.role));
  card.append(quote, author, role);
  if (r.translated.en) {
    const note = document.createElement("p");
    note.className = "transmit-note";
    const en = document.createElement("span");
    en.dataset.lang = "en";
    en.textContent = ui.translatedNote.en;
    note.append(en);
    card.append(note);
  }
  transmitTrack.append(card);
});

/* ---------------- timecode readout ---------------- */
const scenes = Array.from(document.querySelectorAll(".scene"));
const timecodeScene = document.getElementById("timecode-scene");
const timecodeFill = document.getElementById("timecode-fill");

ScrollTrigger.create({
  start: 0,
  end: () => document.body.scrollHeight - window.innerHeight,
  onUpdate: (self) => {
    timecodeFill.style.width = `${(self.progress * 100).toFixed(1)}%`;
  },
});
scenes.forEach((scene) => {
  ScrollTrigger.create({
    trigger: scene,
    start: "top center",
    end: "bottom center",
    onToggle: (self) => {
      if (self.isActive) timecodeScene.textContent = scene.dataset.sceneName;
    },
  });
});

/* ---------------- count-up numbers ---------------- */
document.querySelectorAll(".count-target").forEach((el) => {
  const from = Number(el.dataset.from);
  const to = Number(el.dataset.to);
  const prefix = el.dataset.prefix;
  const suffix = el.dataset.suffix;
  const proxy = { n: from };
  gsap.to(proxy, {
    n: to,
    duration: reduceMotion ? 0.01 : 1.6,
    ease: "power2.out",
    snap: { n: 1 },
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
      once: true,
    },
    onUpdate: () => {
      el.textContent = `${prefix}${proxy.n}${suffix}`;
    },
  });
});

/* ---------------- split-text reveals ---------------- */
if (!reduceMotion) {
  document.querySelectorAll("[data-split-word]").forEach((el) => {
    // SplitText puts the full text back as aria-label on `el` for screen
    // readers; a plain <span> has no role that accepts aria-label, so give
    // it the (widely supported) text role rather than dropping the label.
    el.setAttribute("role", "text");
    const split = new SplitText(el, { type: "words,chars", wordsClass: "sw", charsClass: "sc" });
    gsap.set(split.chars, { yPercent: 110, opacity: 0 });
    gsap.to(split.chars, {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power4.out",
      stagger: 0.02,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });
  gsap.utils.toArray(".eyebrow, .scene-code, .hero-mode, .scene-heading, .case-card, .stat-card, .end-body, .end-links, .end-cvs, .turn-stat").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 24,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });
  });
} else {
  document.querySelectorAll("[data-split-word], .scene-heading, .case-card, .stat-card").forEach((el) => {
    el.style.opacity = 1;
  });
}

/* ---------------- lenis + horizontal reels (desktop, motion-on only) ---------------- */
let lenis;
if (!reduceMotion) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.on("scroll", ScrollTrigger.update);
}

const mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: "(min-width: 821px) and (prefers-reduced-motion: no-preference)",
    isMobile: "(max-width: 820px), (prefers-reduced-motion: reduce)",
  },
  (context) => {
    const { isDesktop } = context.conditions;

    if (isDesktop) {
      // CSS `position: sticky` handles the pin visually; ScrollTrigger only
      // drives the horizontal scrub and sizes the outer track's scroll room
      // to exactly match the required travel distance (avoids GSAP's
      // auto pin-spacer under-measuring inside a flex-centered ancestor).
      [reelTrack, transmitTrack].forEach((track) => {
        const outer = track.closest(".reel-pin, .transmit-pin");
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);
        const setOuterHeight = () => {
          outer.style.height = `calc(100vh + ${distance()}px)`;
        };
        setOuterHeight();
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            invalidateOnRefresh: true,
            onRefreshInit: setOuterHeight,
          },
        });
      });

      gsap.to(".turn-stat-value", {
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".scene-turn", start: "top 60%", toggleActions: "play none none none" },
      });

      return () => {
        [reelTrack, transmitTrack].forEach((track) => {
          track.closest(".reel-pin, .transmit-pin").style.height = "";
        });
      };
    }

    return () => {};
  }
);

/* initial clip state for mask reveal (desktop only, avoids invisible text if JS is slow) */
gsap.set(".turn-stat-value", { clipPath: "inset(0 100% 0 0)" });
if (reduceMotion) gsap.set(".turn-stat-value", { clipPath: "inset(0 0% 0 0)" });

ScrollTrigger.refresh();

// fonts and late image loads reflow the page after the first refresh; resync
// pinned scroll-distance calculations once everything has actually settled.
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}
window.addEventListener("load", () => ScrollTrigger.refresh());
