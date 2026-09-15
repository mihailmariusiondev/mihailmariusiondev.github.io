# Review v2 — 16 portfolios "wow" bake-off

Metodología: lectura de BRIEF-v2.md, TERRITORIES.md, RETRACTED.md, DOSSIER.md; lectura de
`DESIGN.md`/`NOTES.md` de los 16; inspección visual de `_review/final/sNN-*-desktop.png` y
`-mobile.png` (primer viewport, WebGL activo) más 2-4 capturas de `qa/` por sitio (secciones
posteriores, ES, reduced-motion); lectura de `_review/final.tsv` (Lighthouse mobile secuencial,
consola, chequeo CV); `grep` directo sobre `dist/` de los 16 para verificar frases retractadas,
"Tech Lead", conteos de años de experiencia, "native/C2", "certification", "Nx@Inditex",
"130 markets", "relocat*". No se usó agent-browser; no hizo falta capturar nada adicional con
puppeteer porque `_review/final/` y `qa/` ya cubrían lo pedido.

## Hallazgo de verdad más importante (antes de la tabla)

Grep automatizado sobre los 16 `dist/` no encontró ninguna de las frases retractadas
("catalog of backend tools", "replaced legacy guides", "Mateo", "international agricultural
client"), ni "Tech Lead", ni "sole owner", ni "native English/C2", ni "Nx" atado a Inditex, ni
"130 markets" para el shopping assistant. Todos manejan bien "No relocation" (como hecho, no como
disposición a mudarse).

Pero sí hay **dos violaciones directas de la regla "no years-of-experience counts"**:

- **s10-data-observatory**: titular hero literal `"Eight years of frontend work, read as a
  dataset."` (`index.html`, `js/i18n.js`), con su espejo ES `"Ocho años..."`. Es exactamente el
  patrón prohibido por el brief ("No years-of-experience counts... the career has real gaps and a
  15-month break, so a rounded year count is indefensible").
- **s15-boot-terminal**: la secuencia de arranque EN muestra `"MEM: 8y EXPERIENCE"` (`main.js:28`).
  Curiosamente la versión ES sí lo hace bien (`"MEM: EXPERIENCIA DESDE 2018"`), así que es un bug
  de paridad EN/ES además de una violación de la regla.

Ambos son bloqueantes de shipping tal cual están: son fáciles de arreglar (una línea de copy cada
uno) pero, siguiendo el criterio "verdad" del brief, bajan la nota de esos dos sitios.

## Tabla comparativa (1–10)

Total ponderado = wow×0.25 + craft×0.2 + usability×0.2 + originality×0.15 + truth×0.1 +
a11y_perf×0.05 + maintainability×0.05.

| # | Site | Wow | Original. | Craft | Usability | Truth | A11y/Perf | Mantenib. | Total | Bloqueantes |
|---|------|----|----|----|----|----|----|----|----|----|
| s01 | webgl-world | 9 | 8 | 8 | 7 | 10 | 4 | 6 | **7.65** | TBT 4.09 s, CLS 0.315 (perf=49) en móvil; pesado (three+bloom) |
| s02 | desktop-os | 9 | 10 | 9 | 8 | 10 | 9 | 8 | **8.90** | ninguno grave; mobile-launcher algo vacío en el primer toque |
| s03 | scroll-cinema | 8 | 7 | 8 | 6 | 10 | 7 | 6 | **7.55** | TBT 1.06 s; navegación lineal larga antes de llegar a contacto |
| s04 | playable-career | 6 | 7 | 5 | 8 | 10 | 8 | 7 | **6.85** | arte muy plano/genérico (blobs), poco "wow" visual pese al buen "skip" |
| s05 | generative-poster | 7 | 8 | 7 | 6 | 10 | 3 | 9 | **6.85** | LCP 9.4 s, perf=31; visual fuerte pero rendimiento flojo |
| s06 | kinetic-magazine | 8 | 8 | 9 | 6 | 10 | 6 | 7 | **7.75** | LCP 5.6 s; hero sin CTA visible en el primer pliegue |
| s07 | conversation | 7 | 9 | 7 | 8 | 10 | 7 | 7 | **7.60** | TBT 1.71 s; mensaje inicial se corta en móvil ("Software develo...") |
| s08 | physics-playground | 8 | 9 | 8 | 6 | 10 | 8 | 6 | **7.85** | contenido real oculto tras física opcional; requiere revisar craft-floor |
| s09 | infinite-canvas | 7 | 8 | 7 | 5 | 10 | 8 | 6 | **6.95** | paneo/zoom no trivial para un reclutador con prisa; TBT 1.99 s |
| s10 | data-observatory | 6 | 7 | 7 | 8 | **2** | 7 | 7 | **6.15** | **"Eight/Ocho years" — violación de verdad**; LCP 7.6 s |
| s11 | exhibition | 7 | 8 | 6 | 6 | 10 | 9 | 7 | **7.30** | instalaciones muy abstractas (óvalo con luz) — poca conexión con el hecho real |
| s12 | sequencer | 7 | 9 | 7 | 6 | 10 | 8 | 6 | **7.30** | LCP 8.1 s, perf=30; metáfora exige explicación |
| s13 | case-file | 8 | 9 | 8 | 7 | 10 | 9 | 7 | **8.10** | ninguno grave; tono noir puede sentirse "gimmick" para banca/RRHH conservador |
| s14 | stories-app | 8 | 8 | 8 | 8 | 10 | 9 | 7 | **8.20** | ninguno grave; en desktop es un móvil simulado, puede sentirse pequeño |
| s15 | boot-terminal | 7 | 8 | 7 | 7 | **4** | 8 | 7 | **6.90** | **"8y EXPERIENCE" en boot EN** — violación de verdad, falta de paridad ES |
| s16 | popup-book | 5 | 6 | 6 | 6 | 10 | 4 | 9 | **5.90** | LCP 7.5 s, TBT 7.25 s (peor de los 16); primer viewport muy vacío/plano |

Notas de a11y/perf: todos "console: clean" y accesibilidad Lighthouse ≥95 salvo s01 (100 pero con
CLS altísimo) — la columna combina el a11y-score con el perf-score visto en `final.tsv`
(promediado, penalizando fuerte cuando hay LCP>7s o TBT>1s).

## Ranking completo 1–16

1. **s02 desktop-os** — único concepto que no es "una página con skin": un sistema operativo
   real con ventanas arrastrables, dock, command palette; perf=82/CLS=0.002 con 16 KB de JS.
2. **s14 stories-app** — historias tipo Instagram, gestos nativos, gran usabilidad (10 s test
   pasa fácil), perf=86.
3. **s13 case-file** — mundo noir coherente, tipografía y textura reales (no imágenes de stock),
   perf=89, sin bloqueantes de verdad.
4. **s08 physics-playground** — delight genuino (arrastrar/lanzar), pero el contenido "serio"
   compite con el juguete; perf=59.
5. **s01 webgl-world** — el más espectacular en el primer segundo, pero CLS 0.315 y TBT 4 s en
   móvil son síntomas reales de descontrol de rendimiento, no solo ruido de Lighthouse.
6. **s06 kinetic-magazine** — tipografía variable con mucho oficio; LCP alto (5.6 s) por fuentes.
7. **s07 conversation** — original y honesto sobre "no es una IA real"; usabilidad alta, pero
   TBT 1.71 s y el primer mensaje se corta en móvil.
8. **s03 scroll-cinema** — coreografía GSAP impecable, pero exige mucho scroll antes de dar los
   datos de contacto (usabilidad "10 s" no se cumple igual de bien que en s02/s13/s14).
9. **s12 sequencer** — metáfora original y con oficio, pero perf=30 y requiere aprender el
   lenguaje del secuenciador antes de leer nada.
10. **s11 exhibition** — buena tipografía "wall text", pero las instalaciones son formas
    abstractas (óvalo, blob) que no conectan visualmente con el hecho que representan.
11. **s09 infinite-canvas** — concepto interesante para un ingeniero pero exige exploración; un
    reclutador con prisa se pierde antes de encontrar CV/contacto.
12. **s15 boot-terminal** — buena estética CRT, pero el bug de "8y EXPERIENCE" en EN (falta en ES)
    es un problema de verdad Y de paridad de idiomas.
13. **s04 playable-career** — buena idea (skip-to-read siempre visible) pero el arte del juego es
    plano y genérico, no transmite "craft" pese al esfuerzo funcional.
14. **s10 data-observatory** — visual y dato honesto en los charts, pero el titular incumple la
    regla explícita de no usar conteos de años ("Eight years..."), y es lento (LCP 7.6 s).
15. **s05 generative-poster** — dirección de arte suiza fuerte, pero LCP 9.4 s y perf=31 son los
    peores números de rendimiento real del lote (aparte de s16).
16. **s16 popup-book** — el concepto más "cute" pero el menos "wow": primer viewport muy vacío,
    y el peor rendimiento del lote (TBT 7.25 s, perf=29).

## Top 3 — detalle

**1. s02-desktop-os ("Strata OS")**
- Por qué gana: es el único de los 16 que no se puede describir como "página + skin distinto": es
  un sistema interactivo real (ventanas, dock, `Cmd+K`, apps = secciones del CV). Cumple el brief
  al pie de la letra ("Not a scroll page with a skin"). Rendimiento excelente para lo ambicioso del
  concepto (perf=82, CLS=0.002, solo 16 KB JS reportados). Consola limpia, sin violaciones de verdad.
- Qué arreglar antes de publicar: la vista "launcher" de móvil (`s02-desktop-os-mobile.png`) es una
  grid de iconos sobre fondo casi vacío en el primer segundo — el "wow" tarda un toque más en
  aparecer que en desktop; conviene un estado inicial con una ventana ya abierta o una animación de
  boot más presente en móvil. Verificar foco de teclado dentro de ventanas arrastrables (drag +
  a11y suelen chocar).

**2. s14-stories-app**
- Por qué destaca: resuelve mejor que nadie el objetivo de "nombre, rol, 2-3 resultados, CV y
  contacto en 10 s" — el patrón de stories es familiar, el bottom sheet de contacto es inmediato,
  y en escritorio lo presenta dentro de una escena de teléfono en vez de estirar el layout mobile
  (`s14-stories-app-desktop.png`). perf=86, sin bloqueantes de verdad.
- Qué arreglar: en desktop, "un teléfono en el centro con fondo decorativo" ocupa mucho espacio en
  blanco a los lados — se siente pequeño en pantallas grandes de reclutador/1440px; vale la pena un
  segundo elemento (p. ej. resumen de resultados fijo a la derecha, que de hecho ya existe pero
  compite visualmente poco con el "hueco" del fondo).

**3. s13-case-file**
- Por qué destaca: compromiso total con un mundo (dossier noir, hilo rojo, sello "OPEN FILE",
  tipografía de máquina de escribir) sin caer en imágenes de stock; craft visible en detalles
  (post-it torcido, textura de corcho). perf=89, sin violaciones de verdad detectadas.
- Qué arreglar: el tono "expediente policial" sobre un ingeniero frontend puede leerse como un
  chiste que no aterriza para un lead de ingeniería más conservador (banca/Santander); conviene
  suavizar el copy de las etiquetas ("Case No.", "Subject") para que no compita con la seriedad de
  los datos reales (96%, 34 hallazgos WCAG, etc.).

## Los 5 problemas más graves transversales al lote

1. **Dos violaciones directas de la regla de "no years-of-experience"**: s10 ("Eight/Ocho years of
   frontend work") y s15 ("8y EXPERIENCE" en el boot EN, ausente en ES). Es exactamente el patrón
   que el brief prohíbe explícitamente y por la razón correcta (huecos reales de carrera). Hay que
   corregir antes de publicar cualquiera de los dos.
2. **Rendimiento móvil real, no solo ruido de Lighthouse**: s16 (TBT 7.25 s, perf=29), s05 (LCP
   9.4 s, perf=31), s12 (LCP 8.1 s, perf=30), s10 (LCP 7.6 s) y s01 (CLS 0.315, TBT 4.09 s) están
   muy por debajo de un first-paint razonable para un recruiter en móvil con LinkedIn — el brief
   pide "wow beats a perfect Lighthouse score" pero varios de estos números indican bloqueo real de
   interacción, no solo una puntuación baja.
3. **Metáforas que exigen aprendizaje antes de dar información**: s09 (canvas infinito), s12
   (secuenciador) y, en menor medida, s03 (scroll cinematográfico largo) hacen que "nombre, rol,
   2-3 resultados, CV, contacto en 10 s" dependa de que el visitante entienda primero la
   interacción. Ninguno rompe el criterio de forma catastrófica, pero todos añaden fricción que
   s02/s13/s14 no tienen.
4. **Craft desigual del "arte hecho a medida"**: donde el concepto exige ilustración original
   (s04 "career run", s11 "instalaciones de museo"), el resultado visual es más plano/genérico
   (formas geométricas simples, un óvalo con luz) que en los sitios tipográficos/de sistema
   (s02, s06, s13), lo que diluye el "wow" pese a que la idea de fondo es buena.
5. **Paridad EN/ES no siempre verificada línea por línea**: el bug de s15 (ES corrige lo que EN
   hace mal) muestra que las capturas de QA en inglés no garantizan que el español esté libre de
   los mismos errores, y viceversa — vale la pena un grep de verdad por *ambos* idiomas en cada
   sitio, no solo en el idioma por defecto.

## Recomendación

**Ganador: s02-desktop-os.** Es el que más se acerca al objetivo del brief ("this person builds
exceptional interfaces", no "esta persona hizo un sitio bonito"): demuestra arquitectura de UI real
(estado de ventanas, gestión de foco, command palette) además de dirección de arte, con el mejor
balance wow/craft/usabilidad/rendimiento del lote y cero problemas de verdad.

**Ideas de otros sitios que vale la pena fusionar en el ganador:**
- **De s14**: el patrón de "bottom sheet de contacto" inmediato y el resumen "at a glance" con las
  5 métricas clave siempre a un tap — Strata OS podría abrir con una mini-ventana de resultados ya
  visible en el primer segundo en vez de requerir abrir `Cases.app`.
- **De s13**: el nivel de detalle textural (sombras de papel, chinchetas, hilo) como referencia de
  "hasta dónde llevar el detalle" en los iconos y ventanas del OS.
- **De s07**: el mensaje explícito "no es una IA real" aplicado como principio general de honestidad
  de interfaz — Strata OS podría anunciar más claramente en el primer segundo que "esto es un SO de
  mentira, cada app son datos reales de mi CV", igual de bien resuelto que el conversation-bot.
- **De s01**: la textura de fondo (estrellas, glow) como posible salvapantallas/space del launcher
  móvil de Strata OS, resolviendo la queja de "mobile launcher vacío" del punto 1.

## Post-review fixes by the orchestrator (2026-09-15)
- s10: hero "Eight years of frontend work…" -> "A frontend career since 2018, read as a dataset." (ES: "Una carrera
  frontend desde 2018, leída como un conjunto de datos."), source + dist.
- s15: boot line EN "MEM: 8y EXPERIENCE" -> "MEM: SINCE-2018" (ES already "EXPERIENCIA DESDE 2018"), source + dist.
- Re-grep: 0 years-of-experience counts in both. The two truth blockers above are resolved.

## s02 after Codex polish (re-verified 2026-09-15 01:00, machine load ~3)
- OK: HTTP 200 via Tailscale, styles.css/app.js 200, 0 retracted claims, corrected CV, console clean, a11y/bp/seo 100.
- Mobile: fixed. First viewport is now a profile card (name, role, 96% / 34 WCAG / Top 1.42%, Download CV + Contact) above the launcher.
- REGRESSION desktop 1440x900: all six app windows open at once, overlapping; Mail.app and Files.app are clipped past the right edge.
- REGRESSION perf: 82 -> 42 / 47 (two runs), TBT 2.3-2.5 s, main thread 9.6 s (app.js 4.7 s + document style/layout 4.8 s),
  consistent with rendering every window on load. Screenshots: final/s02-desktop-os-polish-{desktop,mobile}.png.
