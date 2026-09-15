(function () {
  const I18N = window.I18N, DATA = window.DATA;
  let lang = localStorage.getItem("lang") || (navigator.language || "en").slice(0, 2);
  if (lang !== "en" && lang !== "es") lang = "en";

  function t(key) {
    const e = I18N[key];
    if (!e) return key;
    return e[lang] || e.en;
  }

  function applyI18n() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach((node) => {
      node.innerHTML = t(node.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
      node.setAttribute("aria-label", t(node.getAttribute("data-i18n-aria-label")));
    });
    document.title = lang === "es"
      ? "Marius Mihail Ion · Observatorio de Datos — Ingeniero Frontend Sénior (Angular)"
      : "Marius Mihail Ion · Data Observatory — Senior Angular / Frontend Engineer";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", lang === "es"
      ? "Un observatorio de datos interactivo sobre la carrera de Marius Mihail Ion: cronología, señales de ingeniería y casos de estudio, cada número con su fuente."
      : "An interactive data observatory of Marius Mihail Ion's career: timeline, engineering signals and case studies, every number sourced.");
    const langBtn = document.getElementById("lang-toggle");
    if (langBtn) langBtn.textContent = t("langSwitch");
    const cvEn = document.getElementById("cv-en-link");
    const cvEs = document.getElementById("cv-es-link");
    if (cvEn) cvEn.textContent = t("ctaCvEn");
    if (cvEs) cvEs.textContent = t("ctaCvEs");
    renderDynamic();
  }

  // ---- Dynamic content: timeline table, case studies, recs, skills ----
  function renderTimelineTable() {
    const tbody = document.getElementById("timeline-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    DATA.roles.forEach((r) => {
      const tr = document.createElement("tr");
      const company = typeof r.company === "string" ? r.company : r.company[lang];
      tr.innerHTML = `<td>${r.period[lang]}</td><td>${company}</td><td>${r.client[lang]}</td><td>${r.role[lang]}</td>`;
      tbody.appendChild(tr);
    });
  }

  function renderLegend() {
    const legend = document.getElementById("timeline-legend");
    if (!legend) return;
    const seen = new Set();
    legend.innerHTML = "";
    DATA.roles.forEach((r) => {
      if (seen.has(r.domain)) return;
      seen.add(r.domain);
      const item = document.createElement("span");
      item.className = "legend-item";
      const label = DATA.domainLabels[r.domain][lang];
      item.innerHTML = `<span class="legend-swatch" style="background:${window.CHART_DOMAIN_COLOR[r.domain]}"></span>${label}`;
      legend.appendChild(item);
    });
  }

  function renderCases() {
    const list = document.getElementById("case-list");
    if (!list) return;
    list.innerHTML = "";
    DATA.caseStudies.forEach((cs) => {
      const details = document.createElement("details");
      details.className = "case-card reveal";
      const summary = document.createElement("summary");
      summary.innerHTML = `
        <div>
          <h3>${cs.title[lang]}</h3>
          <p class="case-summary-text">${cs.summary[lang]}</p>
          <div class="case-tags">${cs.tags.map((tg) => `<span class="tag">${tg}</span>`).join("")}</div>
        </div>
        <span class="case-toggle">${t("expand")}</span>`;
      details.appendChild(summary);
      const body = document.createElement("dl");
      body.className = "case-body";
      cs.fields.forEach(([labelKey, val]) => {
        const div = document.createElement("div");
        div.className = "case-field";
        div.innerHTML = `<dt>${t(labelKey)}</dt><dd>${val[lang]}</dd>`;
        body.appendChild(div);
      });
      details.appendChild(body);
      details.addEventListener("toggle", () => {
        details.querySelector(".case-toggle").textContent = details.open ? t("collapse") : t("expand");
      });
      list.appendChild(details);
      observeReveal(details);
    });
  }

  function renderRecs() {
    const grid = document.getElementById("rec-grid");
    if (!grid) return;
    grid.innerHTML = "";
    DATA.recommendations.forEach((r) => {
      const card = document.createElement("figure");
      card.className = "rec-card reveal";
      card.innerHTML = `<blockquote>&ldquo;${r.quote[lang]}&rdquo;</blockquote><figcaption><footer><strong>${r.author}</strong><br>${r.role[lang]}</footer></figcaption>`;
      grid.appendChild(card);
      observeReveal(card);
    });
  }

  function renderSkills() {
    const map = [
      ["skillsAngular", DATA.skills.angular],
      ["skillsProduct", DATA.skills.product],
      ["skillsQuality", DATA.skills.quality],
      ["skillsApi", DATA.skills.api],
      ["skillsAi", DATA.skills.ai],
    ];
    const container = document.getElementById("skills-container");
    if (!container) return;
    container.innerHTML = "";
    map.forEach(([labelKey, items]) => {
      const block = document.createElement("div");
      block.className = "skills-block";
      block.innerHTML = `<h3>${t(labelKey)}</h3><div class="skill-pills">${items.map((i) => `<span class="skill-pill">${i}</span>`).join("")}</div>`;
      container.appendChild(block);
    });
  }

  function renderCharts() {
    const timelineSvg = document.getElementById("timeline-svg");
    if (timelineSvg) window.renderTimeline(timelineSvg, DATA.roles, lang);

    const c1 = document.getElementById("chart-payload");
    if (c1) window.renderBeforeAfter(c1, 570, 22, lang === "es" ? "Antes · 570 KB" : "Before · 570 KB", lang === "es" ? "Después · 22 KB" : "After · 22 KB");

    const c2 = document.getElementById("chart-bundle");
    if (c2) window.renderStackedBar(c2, 19, 3.4, lang === "es" ? "19 MB auditados" : "19 MB audited", lang === "es" ? "~3.4 MB identificados" : "~3.4 MB identified");

    const c3 = document.getElementById("chart-wcag");
    if (c3) window.renderProportion(c3, 34, 34, lang === "es" ? "34 de 34 hallazgos cerrados (23 PRs)" : "34 of 34 findings closed (23 PRs)");

    const c4 = document.getElementById("chart-gauge");
    if (c4) window.renderGauge(c4, 95, "95%", lang === "es" ? "95% de puntuación, top 1.42%" : "95% score, top 1.42%");

    const c5 = document.getElementById("chart-review");
    if (c5) window.renderProportion(c5, 21, 53, lang === "es" ? "21 de 53 reglas retiradas" : "21 of 53 rules retired");

    const c6 = document.getElementById("chart-team");
    if (c6) window.renderGroupedBars(c6, [
      { label: t("c6Led") + " — 5", value: 5, max: 5, color: "#5eead4" },
      { label: t("c6Ref") + " — 4", value: 4, max: 5, color: "#f6b93b" },
      { label: t("c6Own") + " — ~80%", value: 80, max: 100, color: "#7dd3fc" },
    ]);
  }

  function renderDynamic() {
    renderTimelineTable();
    renderLegend();
    renderCases();
    renderRecs();
    renderSkills();
    renderCharts();
  }

  // ---- Reveal on scroll (respects reduced motion via CSS) ----
  let io;
  function observeReveal(node) {
    if (!("IntersectionObserver" in window)) { node.classList.add("is-visible"); return; }
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
    }
    io.observe(node);
  }
  function initReveal() {
    document.querySelectorAll(".reveal").forEach(observeReveal);
  }

  // ---- Table toggles ----
  function initTableToggles() {
    document.querySelectorAll(".data-table-toggle").forEach((btn) => {
      const targetId = btn.getAttribute("aria-controls");
      const target = document.getElementById(targetId);
      if (!target) return;
      btn.addEventListener("click", () => {
        const open = target.hasAttribute("hidden");
        if (open) target.removeAttribute("hidden"); else target.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", String(open));
        btn.textContent = open ? t("hideTable") : t("viewTable");
      });
    });
  }

  // ---- Scroll progress bar ----
  function initProgress() {
    const bar = document.getElementById("progress-bar");
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      bar.style.width = Math.min(100, Math.max(0, scrolled * 100)) + "%";
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---- Language toggle ----
  function initLang() {
    const btn = document.getElementById("lang-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      lang = lang === "en" ? "es" : "en";
      localStorage.setItem("lang", lang);
      applyI18n();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyI18n();
    initReveal();
    initTableToggles();
    initProgress();
    initLang();
  });
})();
