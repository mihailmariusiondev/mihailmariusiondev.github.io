/* Skip mode: fast, fully readable portfolio. Also owns the shared modal. */
(function () {
  const S = window.SITE;

  function L(field, lang) {
    if (field == null) return "";
    if (typeof field === "string") return field;
    return field[lang] ?? field.en ?? "";
  }

  window.PORTFOLIO = { L };

  function renderStats(lang) {
    const grid = document.getElementById("stats-grid");
    const zoneD = S.zones.find((z) => z.stats);
    grid.innerHTML = "";
    (zoneD.stats || []).forEach((s) => {
      const card = document.createElement("div");
      card.className = "stat-card";
      card.innerHTML = `<div class="value">${L(s.value, lang)}</div><div class="label">${L(s.label, lang)}</div>`;
      grid.appendChild(card);
    });
  }

  function renderCases(lang) {
    const grid = document.getElementById("case-grid");
    grid.innerHTML = "";
    Object.entries(S.caseStudies).forEach(([slug, cs]) => {
      const btn = document.createElement("button");
      btn.className = "case-card";
      btn.type = "button";
      btn.innerHTML = `<h3>${L(cs.title, lang)}</h3><p>${L(cs.summary, lang)}</p>`;
      btn.addEventListener("click", () => window.openCaseModal(slug, lang));
      grid.appendChild(btn);
    });
  }

  function renderTimeline(lang) {
    const el = document.getElementById("timeline");
    el.innerHTML = "";
    const allRoles = [];
    S.zones.forEach((z) => z.roles.forEach((r) => allRoles.push(r)));
    // Most recent first for the fast read.
    allRoles
      .slice()
      .reverse()
      .forEach((r) => {
        const item = document.createElement("div");
        item.className = "timeline-item";
        item.innerHTML = `<div class="period">${L(r.period, lang)}</div><div class="company">${r.company}</div><div class="role">${L(r.role, lang)}</div>`;
        el.appendChild(item);
      });
  }

  function renderRecs(lang) {
    const el = document.getElementById("recs-grid");
    el.innerHTML = "";
    S.zones.forEach((z) => {
      z.npcs.forEach((n) => {
        const card = document.createElement("div");
        card.className = "rec-card";
        card.innerHTML = `<p class="quote">&ldquo;${L(n.quote, lang)}&rdquo;</p><div class="author">${n.name}</div><div class="authrole">${L(n.roleLabel, lang)}</div>`;
        el.appendChild(card);
      });
    });
  }

  function renderStaticText(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (S.ui[key]) node.textContent = L(S.ui[key], lang);
      else if (S[key]) node.textContent = L(S[key], lang);
    });
    document.querySelectorAll("[data-i18n-label]").forEach((node) => {
      const key = node.getAttribute("data-i18n-label");
      const val = L(S.ui[key], lang);
      if (val) {
        // Icon-only buttons (e.g. the modal's ×) keep their glyph; only update aria-label.
        if (node.dataset.iconOnly === undefined) node.textContent = val;
        node.setAttribute("aria-label", val);
      }
    });
    document.getElementById("reduced-motion-note").textContent = L(S.ui.reducedMotionNote, lang);
    document.getElementById("cv-link").href = S.cv[lang];
    document.getElementById("cv-link-2").href = S.cv[lang];
  }

  window.renderPortfolio = function renderPortfolio(lang) {
    renderStaticText(lang);
    renderStats(lang);
    renderCases(lang);
    renderTimeline(lang);
    renderRecs(lang);
  };

  // ---- Shared modal ----
  const backdrop = document.getElementById("modal-backdrop");
  const body = document.getElementById("modal-body");
  const closeBtn = document.getElementById("modal-close");
  let lastFocused = null;

  function openModal(html) {
    body.innerHTML = html;
    backdrop.classList.add("open");
    lastFocused = document.activeElement;
    closeBtn.focus();
    document.addEventListener("keydown", onKeydown);
  }
  function closeModal() {
    backdrop.classList.remove("open");
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused) lastFocused.focus();
  }
  function onKeydown(e) {
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") {
      const focusables = body.parentElement.querySelectorAll("button, a[href]");
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });
  window.closeModal = closeModal;

  window.openCaseModal = function (slug, lang) {
    const cs = S.caseStudies[slug];
    const tags = cs.tags.map((t) => `<span class="tag">${t}</span>`).join("");
    const confidential = cs.confidential
      ? `<p class="note">${L(cs.confidential, lang)}</p>`
      : "";
    openModal(`
      <div class="eyebrow">${lang === "es" ? "Caso" : "Case study"}</div>
      <h2 id="modal-title">${L(cs.title, lang)}</h2>
      <div class="tags">${tags}</div>
      <p>${L(cs.summary, lang)}</p>
      <div class="field-label">${lang === "es" ? "Resultado" : "Outcome"}</div>
      <p class="field-value">${L(cs.outcome, lang)}</p>
      ${confidential}
    `);
  };

  window.openNpcModal = function (npc, lang) {
    const note = npc.note && L(npc.note, lang) ? `<p class="note">${L(npc.note, lang)}</p>` : "";
    openModal(`
      <div class="eyebrow">${lang === "es" ? "Recomendación" : "Recommendation"}</div>
      <h2 id="modal-title">${npc.name}</h2>
      <p class="note">${L(npc.roleLabel, lang)}</p>
      <p class="quote">&ldquo;${L(npc.quote, lang)}&rdquo;</p>
      ${note}
    `);
  };

  window.openStatModal = function (stat, lang) {
    openModal(`
      <div class="eyebrow">${lang === "es" ? "Resultado verificado" : "Verified result"}</div>
      <h2 id="modal-title">${L(stat.value, lang)}</h2>
      <p>${L(stat.label, lang)}</p>
    `);
  };
})();
