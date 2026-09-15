(function () {
  "use strict";
  var D = window.DOSSIER;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lang = (localStorage.getItem("dossier-lang") || "en");

  function t(obj) { return obj ? (obj[lang] != null ? obj[lang] : obj.en) : ""; }

  function setLang(l) {
    lang = l;
    localStorage.setItem("dossier-lang", l);
    document.documentElement.lang = l;
    document.title = t(D.meta.title);
    document.querySelector('meta[name="description"]').setAttribute("content", t(D.meta.description));
    document.querySelectorAll("[data-t]").forEach(function (el) {
      var key = el.getAttribute("data-t");
      if (D.ui[key] != null) el.textContent = t(D.ui[key]);
    });
    var btn = document.getElementById("langToggle");
    btn.textContent = t(D.ui.langToggle);
    btn.setAttribute("aria-label", t(D.ui.langAria));
    document.getElementById("cvLink").href = l === "es" ? "assets/marius-mihail-ion-cv-es.pdf" : "assets/marius-mihail-ion-cv.pdf";
    render();
  }

  function render() {
    renderStats();
    renderTimeline();
    renderFolders();
    renderWitnesses();
    renderProfile();
    renderContact();
  }

  function renderStats() {
    var grid = document.getElementById("statGrid");
    grid.innerHTML = "";
    D.stats.forEach(function (s, i) {
      var li = document.createElement("li");
      li.className = "pin-card";
      li.id = "pin-" + i;
      li.innerHTML =
        '<span class="tag">' + t(s.tag) + '</span>' +
        '<span class="value">' + t(s.value) + '</span>' +
        '<span class="label">' + t(s.label) + '</span>' +
        '<span class="stamp" aria-hidden="true">' + t(D.ui.verifiedStamp) + '</span>';
      grid.appendChild(li);
    });
    observeStamps();
    drawStrings();
  }

  function observeStamps() {
    var cards = document.querySelectorAll(".pin-card");
    if (reduced || !("IntersectionObserver" in window)) {
      cards.forEach(function (c) { c.classList.add("stamped"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("stamped"); io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    cards.forEach(function (c) { io.observe(c); });
  }

  function drawStrings() {
    var svg = document.querySelector(".string-svg");
    var g = document.getElementById("strings");
    g.innerHTML = "";
    if (reduced) return;
    // Draw simple decorative connecting lines between pin cards once laid out.
    requestAnimationFrame(function () {
      var boardRect = svg.closest(".board-section").getBoundingClientRect();
      var cards = document.querySelectorAll(".pin-card");
      var pts = [];
      cards.forEach(function (c) {
        var r = c.getBoundingClientRect();
        pts.push({ x: r.left - boardRect.left + r.width / 2, y: r.top - boardRect.top });
      });
      for (var i = 0; i < pts.length - 1; i++) {
        var a = pts[i], b = pts[i + 1];
        var midY = Math.min(a.y, b.y) - 30;
        var d = "M" + a.x + "," + a.y + " Q " + ((a.x + b.x) / 2) + "," + midY + " " + b.x + "," + b.y;
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        path.style.animationDelay = (i * 0.12) + "s";
        g.appendChild(path);
      }
    });
  }

  function renderTimeline() {
    var list = document.getElementById("timelineList");
    list.innerHTML = "";
    D.timeline.forEach(function (item) {
      var li = document.createElement("li");
      var client = item.client ? '<div class="tl-client">' + t(D.ui.clientLabel) + ": " + item.client + "</div>" : "";
      var role = t(item.role) ? '<div class="tl-role">' + t(item.role) + "</div>" : "";
      li.innerHTML =
        '<div class="tl-period">' + t(item.period) + '</div>' +
        '<div class="tl-company">' + t(item.company) + '</div>' +
        client + role;
      list.appendChild(li);
    });
  }

  function renderFolders() {
    var stack = document.getElementById("folderStack");
    var openStates = {};
    stack.querySelectorAll(".folder").forEach(function (f) { openStates[f.dataset.slug] = f.dataset.open; });
    stack.innerHTML = "";
    D.cases.forEach(function (c) {
      var folder = document.createElement("article");
      folder.className = "folder";
      folder.dataset.slug = c.slug;
      folder.dataset.open = openStates[c.slug] || "false";

      var tags = c.tags.map(function (pair) {
        var label = lang === "es" ? pair[1] : pair[0];
        return "<span>" + label + "</span>";
      }).join("");

      var panelId = "panel-" + c.slug;
      var fields = c.fields.map(function (f) {
        return '<div class="folder-field"><dt>' + t(f.label) + '</dt><dd>' + t(f.value) + '</dd></div>';
      }).join("");

      var confidential = c.confidential
        ? '<div class="redaction">🔒 ' + t(D.ui.sanitizedTag) + ' — ' + t(c.confidential) + '</div>'
        : '';

      folder.innerHTML =
        '<button class="folder-tab" aria-expanded="' + folder.dataset.open + '" aria-controls="' + panelId + '">' +
          '<span class="folder-eyebrow">' + t(D.ui.casesHeading) + '</span>' +
          '<h3 class="folder-title">' + t(c.title) + '</h3>' +
          '<p class="folder-summary">' + t(c.summary) + '</p>' +
          '<div class="folder-tags">' + tags + '</div>' +
        '</button>' +
        '<div class="folder-panel" id="' + panelId + '">' +
          '<div class="folder-panel-inner">' +
            '<dl>' + fields + '</dl>' +
            confidential +
            '<p class="demonstrates"><strong>' + t(D.ui.demonstratesLabel) + ':</strong> ' + t(c.demonstrates) + '</p>' +
          '</div>' +
        '</div>';

      var tab = folder.querySelector(".folder-tab");
      tab.addEventListener("click", function () {
        var isOpen = folder.dataset.open === "true";
        folder.dataset.open = isOpen ? "false" : "true";
        tab.setAttribute("aria-expanded", String(!isOpen));
      });

      stack.appendChild(folder);
    });
  }

  function renderWitnesses() {
    var grid = document.getElementById("witnessGrid");
    grid.innerHTML = "";
    D.witnesses.forEach(function (w) {
      var note = w.translated ? t(D.ui.translatedNote) : t(D.ui.publishedNote);
      var div = document.createElement("figure");
      div.className = "witness-card";
      div.innerHTML =
        '<blockquote class="witness-quote">' + t(w.quote) + '</blockquote>' +
        '<figcaption>' +
          '<div class="witness-author">' + w.author + '</div>' +
          '<div class="witness-role">' + t(w.role) + '</div>' +
          (note ? '<div class="witness-note">' + note + '</div>' : '') +
        '</figcaption>';
      grid.appendChild(div);
    });
  }

  function renderProfile() {
    var wrap = document.getElementById("profileNotes");
    wrap.innerHTML = D.profile.map(function (p) { return "<p>" + t(p) + "</p>"; }).join("");
  }

  function renderContact() {
    var list = document.getElementById("contactList");
    list.innerHTML = D.contact.map(function (c) {
      return '<li><span class="clabel">' + t(c.label) + '</span><a href="' + c.href + '">' + c.value + '</a></li>';
    }).join("");
    document.getElementById("cvLinkEn").textContent = "CV — EN (PDF)";
    document.getElementById("cvLinkEs").textContent = "CV — ES (PDF)";
  }

  document.getElementById("langToggle").addEventListener("click", function () {
    setLang(lang === "en" ? "es" : "en");
  });

  window.addEventListener("resize", function () {
    clearTimeout(window.__strTimer);
    window.__strTimer = setTimeout(drawStrings, 200);
  });

  setLang(lang);
})();
