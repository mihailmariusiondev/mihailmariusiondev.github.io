# Revisión bake-off de diseño — portfolio (16 conceptos)

Metodología: lectura de BRIEF.md/PRODUCT.md/_base/src/data/*.ts, grep de dist/ en las 16 carpetas
(frases prohibidas, wording "96%"/570→22 KB, bytes JS/CSS, sitemap/robots/canonical/hreflang/
JSON-LD/404 noindex), `linkcheck.py` en cada dist, lectura de DESIGN.md/NOTES.md, inspección de
capturas qa/*.png (desktop+mobile) y sesiones agent-browser en vivo (c3, c5, c8, c11, c15, c16:
sin errores de consola en ninguna; capturas live confirmaron o corrigieron lo visto en qa/).

## Tabla (1-10)

| # | Concepto | Impacto | Distinción | Precisión | A11y | SEO | Mantenibilidad | Bloqueadores |
|---|---|---|---|---|---|---|---|---|
| c1 | Signal Path | 8 | 8 | 9 | 9 | 9 | 9 | Ninguno detectado |
| c2 | Component Specimen | 7 | 8 | 9 | 9 | 9 | 9 | Ninguno detectado |
| c3 | Kinetic Editorial | 9 | 8 | 9 | 8 | 9 | 9 | Verificar contraste del display type gigante en AA numéricamente |
| c4 | Release Notes | 8 | 9 | 9 | 9 | 9 | 9 | Ninguno detectado |
| c5 | Context Field | 9 | 9 | 9 | 8 | 9 | 6 | Bundle JS más pesado del lote (~466 KB, three.js); en polish activo (fallback WebGL) |
| c6 | Focus Order | 6 | 7 | 9 | 7 | 9 | 9 | Recuadro azul recortado/mal posicionado sobre "Verified results" en captura qa (posible glitch de animación de foco congelada) |
| c7 | Mudéjar Grid | 8 | 9 | 9 | 9 | 9 | 9 | Ninguno detectado |
| c8 | Spatial Deck | 3 | 5 | 9 | 4 | 9 | 9 | **Render en vivo roto**: solo la 1ª tarjeta de caso pinta (texto casi invisible, bajo contraste), luego ~2000px de vacío antes del footer; DESIGN.md sigue sin existir en el momento de la revisión |
| c9 | Wire to Hi-fi | 6 | 7 | 9 | 9 | 9 | 9 | La idea (wireframe→hi-fi) no se ve en el primer pantallazo; el "wow" depende de hacer scroll |
| c10 | Night Instrument | 6 | 6 | 9 | 9 | 9 | 9 | Concepto más fino que el resto: reskin oscuro con acentos, poca idea estructural propia |
| c11 | Plain Fast | 7 | 8 | 9 | 8 | 9 | 8 | El widget de "cargó en Xms" midió 5762ms y 13014ms en dos pasadas reales — un sitio cuyo tema es "la velocidad es la identidad" mostrando segundos reales es un riesgo serio si un reclutador lo ve en mala red |
| c12 | Case Diagrams | 6 | 7 | 9 | 9 | 9 | 9 | Agente se detuvo antes de escribir DESIGN.md (reconstruido por el orquestador); el hero es idéntico al base, el concepto vive solo en la sección de casos |
| c13 | Atlas Map | 7 | 8 | 9 | 9 | 9 | 9 | Ninguno detectado |
| c14 | Paper Layers | 6 | 7 | 9 | 8 | 9 | 9 | Build de 25 min con caja de tiempo declarada; menor profundidad de acabado que el resto |
| c15 | Liquid Glass | 8 | 7 | 9 | 8 | 9 | 8 | Tercer concepto oscuro del lote (solapa con c5/c10), diluye su distinción |
| c16 | Scroll Film | 8 | 8 | 9 | 8 | 9 | 8 | JS más pesado tras c5 (~116 KB, GSAP); justificado y con fallback sin-JS/reduced-motion bien resuelto |

Precisión: en los 16 dist/ no aparece ninguna frase prohibida ("Tech Lead", "sole owner", "built
from scratch", "tool payload", "relocat...") y el wording "570 KB → 22 KB / 96%" está presente y
correcto en todos. sitemap.xml = 18 URLs, robots.txt presente, 404 noindex, canonical/hreflang
en-es-x-default/JSON-LD Person presentes en los 16. `linkcheck.py`: 0 enlaces rotos en los 16
(c5 dio "0 pages" en la primera pasada por estar reconstruyéndose en vivo; en la repetición, 19
páginas, 0 rotos). Ningún concepto añade dependencias salvo c5 (three.js) y c16 (gsap), ambas
justificadas en DESIGN.md.

## Top 5

1. **c1 Signal Path** — la idea (diagrama de señal osciloscopio) es la más coherente con la
   identidad Angular/RxJS del propio Marius, ejecutada sin JS, sin bugs, con DESIGN.md completo.
2. **c7 Mudéjar Grid** — motivo geométrico propio (lacería de 8 puntas) genuinamente distinto,
   nunca decorativo/tópico, cero JS, acabado limpio en las 19 rutas.
3. **c4 Release Notes** — convierte el propio vocabulario de trabajo de Marius (feature flags,
   rollout por mercado) en el sistema visual; badges de estado con palabras estrictamente
   veraces, no inventadas.
4. **c5 Context Field** — el "wow" más alto del lote: literalmente demuestra en vivo la métrica
   estrella (570 KB→22 KB) como campo de tokens WebGL; penaliza en mantenibilidad por su peso
   de bundle y por seguir en pulido técnico.
5. **c3 Kinetic Editorial** — el mayor impacto tipográfico puro, lectura de reclutador en <3s
   clarísima, cero JS.

## Los 3 problemas más graves del bake-off

1. **c8 Spatial Deck está roto en vivo ahora mismo**: solo una tarjeta de caso renderiza (con
   texto de contraste casi nulo), sigue ~2000px de espacio vacío antes del footer, y no tiene
   DESIGN.md pese a la ventana de pulido. Es el único concepto con un fallo funcional observable,
   no solo estético.
2. **c11 Plain Fast expone su propio talón de Aquiles**: el lector de rendimiento en vivo (API
   Performance del navegador del visitante) mostró 5.7s y 13s de carga en pruebas reales — un
   sitio cuya tesis es "la velocidad es la identidad" arriesga verse peor que cualquier otro
   concepto si un reclutador real lo abre en una red mala. Falta un suelo/caveat en el copy.
3. **Convergencia y dilución del "wow en 3 s"**: 3 conceptos (c5, c10, c15) llegaron
   independientemente al mismo lenguaje ("oscuro + un acento vivo + lecturas en mono"), y en al
   menos 7 conceptos (c8, c9, c10, c11, c12, c13, c14) el primer *viewport* es visualmente casi
   idéntico al sitio base — mismo titular, misma foto a dos columnas — con la idea distintiva
   escondida más abajo del fold. El brief pedía la idea memorable en los primeros 3 segundos, y
   en más de un tercio del lote esa idea no está ahí.

## Recomendación

**Ganador: c1 Signal Path.** Es el que mejor casa "idea propia y memorable" con "cero riesgo
técnico": ejecución completa, sin JS, sin bugs observados, DESIGN.md sólido, y la metáfora
(trazas de señal que se resuelven en hechos verificados) es la más alineada con el perfil real de
un ingeniero Angular/RxJS senior — no es una moda visual genérica.

**Ideas de otros conceptos que merece la pena fusionar en el ganador:**
- De **c4**: el vocabulario de badges de estado (pilot / rolling out / validated / adopted) para
  las tarjetas de casos — encaja perfectamente con el lenguaje "readout" de c1 y añade
  información real sin inventar nada.
- De **c7**: el motivo geométrico paramétrico como textura de fondo de baja opacidad (6-10%) para
  dar variación visual a c1 sin competir con el contenido.
- De **c5**: la demostración en vivo de la métrica LLM 570→22 KB como micro-interacción puntual
  (no todo el hero en WebGL) una vez resuelto el peso de bundle — el "muéstralo, no lo cuentes"
  es el hallazgo más fuerte del lote.
- De **c13**: el patrón de línea de metro para la página de experiencia, como alternativa más
  legible al timeline vertical estándar.
- De **c11**: la disciplina de "cero fuentes web, cero dependencias, static-first" como estándar
  de mantenibilidad para todo el sitio final (sin el widget de tiempo de carga en vivo, que es el
  propio problema #2 de esta lista).
