(function () {
  "use strict";

  var DATA = window.SITE;
  var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reduced = mq.matches;

  var lang = "en";
  var history = [];
  var histIndex = -1;

  var els = {
    shell: document.getElementById("crt-shell"),
    bootScreen: document.getElementById("boot-screen"),
    bootLog: document.getElementById("boot-log"),
    body: document.getElementById("terminal-body"),
    output: document.getElementById("output"),
    form: document.getElementById("cmd-form"),
    input: document.getElementById("terminal-input"),
    langBtn: document.getElementById("lang-toggle"),
    palette: document.querySelector(".palette"),
  };

  var STR = {
    en: {
      bootLines: [
        "MARIUS-OS v2.6.0  (Angular Frontend Build)",
        "BIOS: ZARAGOZA-ES  CPU: SR-ENGINEER  MEM: SINCE-2018",
        "Loading identity module............ OK",
        "Loading case studies (4)............ OK",
        "Loading experience timeline (9 roles) OK",
        "Loading recommendations (5)......... OK",
        "Verifying facts against source....... PASS",
        "",
        "Boot complete.",
      ],
      welcome: [
        "Welcome. This terminal is Marius Mihail Ion's portfolio.",
        "Type " + '"help"' + " to see every command, or use the buttons below.",
        "",
      ],
      unknown: function (c) { return 'command not found: "' + c + '". type "help" for a list.'; },
      langSwitched: "Language set to English.",
      cvLine: "Opening CV (PDF, opens in a new tab)...",
      helpTitle: "AVAILABLE COMMANDS",
      help: [
        ["help", "show this list"],
        ["whoami", "identity, location, work model"],
        ["stats", "verified results, rendered as bar charts"],
        ["cases", "list the 4 case studies"],
        ["open <case>", "read one case study, e.g. open shopping-assistant"],
        ["experience", "career timeline, 2018 to present"],
        ["recommendations", "quotes from people who worked with me"],
        ["cv", "download the CV (PDF, EN/ES)"],
        ["contact", "email, LinkedIn, GitHub"],
        ["lang es|en", "switch language"],
        ["clear", "clear the screen"],
      ],
      caseListTitle: "CASE STUDIES — type 'open <name>'",
      caseNotFound: function (s) { return 'no case study named "' + s + '". type "cases" to list them.'; },
      expTitle: "EXPERIENCE — since 2018",
      recTitle: "RECOMMENDATIONS",
      statsTitle: "VERIFIED RESULTS",
      contactTitle: "CONTACT",
    },
    es: {
      bootLines: [
        "MARIUS-OS v2.6.0  (Compilación Frontend Angular)",
        "BIOS: ZARAGOZA-ES  CPU: INGENIERO-SR  MEM: EXPERIENCIA DESDE 2018",
        "Cargando módulo de identidad........ OK",
        "Cargando casos de estudio (4)........ OK",
        "Cargando trayectoria (9 puestos)..... OK",
        "Cargando recomendaciones (5)......... OK",
        "Verificando hechos contra la fuente.. PASS",
        "",
        "Arranque completo.",
      ],
      welcome: [
        "Bienvenido/a. Este terminal es el portfolio de Marius Mihail Ion.",
        'Escribe "help" para ver todos los comandos, o usa los botones de abajo.',
        "",
      ],
      unknown: function (c) { return 'comando no encontrado: "' + c + '". escribe "help" para ver la lista.'; },
      langSwitched: "Idioma establecido en español.",
      cvLine: "Abriendo el CV (PDF, en una pestaña nueva)...",
      helpTitle: "COMANDOS DISPONIBLES",
      help: [
        ["help", "muestra esta lista"],
        ["whoami", "identidad, ubicación, modelo de trabajo"],
        ["stats", "resultados verificados, en gráficos de barras"],
        ["cases", "lista los 4 casos de estudio"],
        ["open <caso>", "lee un caso, ej. open shopping-assistant"],
        ["experience", "trayectoria profesional, desde 2018"],
        ["recommendations", "citas de personas que trabajaron conmigo"],
        ["cv", "descarga el CV (PDF, EN/ES)"],
        ["contact", "email, LinkedIn, GitHub"],
        ["lang es|en", "cambia el idioma"],
        ["clear", "limpia la pantalla"],
      ],
      caseListTitle: "CASOS DE ESTUDIO — escribe 'open <nombre>'",
      caseNotFound: function (s) { return 'no existe un caso llamado "' + s + '". escribe "cases" para listarlos.'; },
      expTitle: "EXPERIENCIA — desde 2018",
      recTitle: "RECOMENDACIONES",
      statsTitle: "RESULTADOS VERIFICADOS",
      contactTitle: "CONTACTO",
    },
  };

  function tr(loc) { return typeof loc === "string" ? loc : loc[lang]; }

  function print(text, cls) {
    var p = document.createElement("p");
    p.className = "line" + (cls ? " " + cls : "");
    p.innerHTML = text;
    els.output.appendChild(p);
    els.output.scrollTop = els.output.scrollHeight;
    return p;
  }

  function printLines(lines, cls) {
    lines.forEach(function (l) { print(l, cls); });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ---- typewriter, skipped entirely under reduced motion ----
  function typeOut(el, text, speed, done) {
    if (reduced) { el.textContent = text; if (done) done(); return; }
    var i = 0;
    (function step() {
      el.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) {
        setTimeout(step, speed);
      } else if (done) {
        done();
      }
    })();
  }

  // ---------------- Boot sequence ----------------
  function runBoot(cb) {
    var lines = STR[lang].bootLines;
    if (reduced) {
      els.bootLog.textContent = lines.join("\n");
      finishBoot(cb);
      return;
    }
    var i = 0;
    function nextLine() {
      if (i >= lines.length) { finishBoot(cb); return; }
      var lineEl = document.createElement("div");
      els.bootLog.appendChild(lineEl);
      typeOut(lineEl, lines[i], 8, function () {
        i++;
        setTimeout(nextLine, 90);
      });
    }
    nextLine();
  }

  var booted = false;
  function finishBoot(cb) {
    if (booted) return;
    booted = true;
    els.bootScreen.hidden = true;
    els.bootScreen.setAttribute("aria-hidden", "true");
    els.body.hidden = false;
    if (cb) cb();
  }

  function skipBoot() {
    if (booted) return;
    els.bootLog.textContent = STR[lang].bootLines.join("\n");
    finishBoot(function () { showWelcome(); });
  }

  function showWelcome() {
    printLines(STR[lang].welcome, "dim");
  }

  // ---------------- Commands ----------------
  function cmdHelp() {
    print(STR[lang].helpTitle, "heading");
    STR[lang].help.forEach(function (row) {
      print(escapeHtml(row[0].padEnd ? row[0] : row[0]) + "  —  " + escapeHtml(row[1]));
    });
  }

  function cmdWhoami() {
    printLines(DATA.whoami[lang]);
  }

  function barLine(label, value, pct) {
    var width = 24;
    var filled = Math.round((pct / 100) * width);
    var bar = "[" + "#".repeat(filled) + "-".repeat(width - filled) + "]";
    var row = document.createElement("div");
    row.className = "bar-row";
    row.innerHTML =
      '<p class="line"><span class="bar-fill">' + escapeHtml(bar) + "</span> " +
      '<strong>' + escapeHtml(value) + "</strong></p>" +
      '<p class="line dim bar-label">' + escapeHtml(label) + "</p>";
    els.output.appendChild(row);
  }

  function cmdStats() {
    print(STR[lang].statsTitle, "heading");
    DATA.stats.forEach(function (s) {
      barLine(s.label[lang], s.value, s.bar);
    });
  }

  function cmdCases() {
    print(STR[lang].caseListTitle, "heading");
    DATA.cases.forEach(function (c) {
      print("<strong>" + escapeHtml(c.slug) + "</strong> — " + escapeHtml(tr(c.title)));
      print(escapeHtml(tr(c.summary)), "dim");
    });
  }

  function cmdOpen(arg) {
    var c = DATA.cases.find(function (x) { return x.slug === arg; });
    if (!c) { print(STR[lang].caseNotFound(arg), "err"); return; }
    print(tr(c.title).toUpperCase(), "heading");
    print(c.tags.join(" · "), "dim");
    var wrap = document.createElement("div");
    wrap.className = "case-block";
    c.body[lang].forEach(function (pair) {
      var h = document.createElement("p");
      h.className = "line amber";
      h.textContent = pair[0] + ":";
      wrap.appendChild(h);
      var b = document.createElement("p");
      b.className = "line";
      b.textContent = pair[1];
      wrap.appendChild(b);
    });
    els.output.appendChild(wrap);
    if (c.note) print(tr(c.note), "dim");
  }

  function cmdExperience() {
    print(STR[lang].expTitle, "heading");
    DATA.experience.forEach(function (e) {
      var company = typeof e.company === "string" ? e.company : e.company[lang];
      var role = e.role[lang];
      var period = e.period[lang];
      var line = period + "  " + company + (e.client ? " · " + e.client : "");
      print("<strong>" + escapeHtml(line) + "</strong>");
      if (role) print(escapeHtml(role), "dim");
    });
  }

  function cmdRecommendations() {
    print(STR[lang].recTitle, "heading");
    DATA.recommendations.forEach(function (r) {
      print('"' + escapeHtml(r.quote[lang]) + '"');
      print("— " + escapeHtml(r.author) + ", " + escapeHtml(r.role[lang]), "dim amber");
    });
  }

  function cmdCv() {
    print(STR[lang].cvLine, "dim");
    var href = DATA.contact.cv[lang];
    var a = document.createElement("a");
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = href;
    var p = document.createElement("p");
    p.className = "line";
    p.appendChild(a);
    els.output.appendChild(p);
    window.open(href, "_blank", "noopener");
  }

  function cmdContact() {
    print(STR[lang].contactTitle, "heading");
    print('email: <a href="mailto:' + DATA.contact.email + '">' + DATA.contact.email + "</a>");
    print('linkedin: <a href="' + DATA.contact.linkedin + '" target="_blank" rel="noopener">' + DATA.contact.linkedin + "</a>");
    print('github: <a href="' + DATA.contact.github + '" target="_blank" rel="noopener">' + DATA.contact.github + "</a>");
  }

  function cmdLang(target) {
    if (target !== "en" && target !== "es") {
      print(lang === "en" ? "usage: lang es|en" : "uso: lang es|en", "err");
      return;
    }
    lang = target;
    els.langBtn.textContent = lang === "en" ? "ES" : "EN";
    document.documentElement.lang = lang;
    print(STR[lang].langSwitched, "amber");
  }

  function cmdClear() {
    els.output.innerHTML = "";
  }

  var COMMANDS = [
    "help", "whoami", "stats", "cases", "open", "experience",
    "recommendations", "cv", "contact", "lang", "clear",
  ];

  function runCommand(raw) {
    var trimmed = raw.trim();
    if (!trimmed) return;
    print(escapeHtml(trimmed), "echo");
    history.push(trimmed);
    histIndex = history.length;

    var parts = trimmed.split(/\s+/);
    var cmd = parts[0].toLowerCase();
    var arg = parts.slice(1).join(" ").toLowerCase();

    switch (cmd) {
      case "help": cmdHelp(); break;
      case "whoami": cmdWhoami(); break;
      case "stats": cmdStats(); break;
      case "cases": cmdCases(); break;
      case "open": arg ? cmdOpen(arg) : cmdCases(); break;
      case "experience": cmdExperience(); break;
      case "recommendations": case "recs": cmdRecommendations(); break;
      case "cv": cmdCv(); break;
      case "contact": cmdContact(); break;
      case "lang": cmdLang(arg); break;
      case "clear": case "cls": cmdClear(); break;
      default: print(STR[lang].unknown(cmd), "err");
    }
  }

  // ---------------- Input wiring ----------------
  els.form.addEventListener("submit", function (e) {
    e.preventDefault();
    var val = els.input.value;
    els.input.value = "";
    runCommand(val);
  });

  els.input.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      e.preventDefault();
      var val = els.input.value.trim().toLowerCase();
      if (!val) return;
      var match = COMMANDS.find(function (c) { return c.indexOf(val) === 0; });
      if (match) els.input.value = match + " ";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIndex > 0) { histIndex--; els.input.value = history[histIndex]; }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex < history.length - 1) { histIndex++; els.input.value = history[histIndex]; }
      else { histIndex = history.length; els.input.value = ""; }
    }
  });

  els.palette.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-cmd]");
    if (!btn) return;
    runCommand(btn.getAttribute("data-cmd"));
    els.input.focus();
  });

  els.langBtn.addEventListener("click", function () {
    cmdLang(lang === "en" ? "es" : "en");
  });

  // ---------------- Boot trigger ----------------
  function boot() {
    document.documentElement.lang = lang;
    runBoot(showWelcome);
  }

  els.bootScreen.addEventListener("click", skipBoot);
  window.addEventListener("keydown", function () {
    if (!booted) skipBoot();
  }, { once: false });

  boot();

  mq.addEventListener && mq.addEventListener("change", function (e) {
    reduced = e.matches;
    if (window.__crtShader) window.__crtShader.setReducedMotion(reduced);
  });

  window.addEventListener("load", function () {
    els.input.focus();
  });
})();
