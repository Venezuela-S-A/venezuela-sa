# Phase 2: Content Migration - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Migrar los 85 docs markdown existentes de Docusaurus a la PWA SvelteKit como un libro navegable. El ciudadano puede leer todo el plan en el tab "El Plan", buscar offline, compartir deep links a cualquier sección, y ver fuentes verificables en cada dato. Admonitions, diagramas Mermaid (SVG estático) y tablas anchas renderizan correctamente en 360px. NO incluye: features interactivos (Phase 3), capa social (Phase 4), ni experiencia dual inversor (Phase 5).

</domain>

<decisions>
## Implementation Decisions

### Estructura de lectura ("el libro")
- **D-01:** Scroll continuo por capítulo — todos los docs de un capítulo se renderizan como una sola página con scroll. El ciudadano lee como un feed, no hace tap por cada doc
- **D-02:** Navegación anterior/siguiente entre capítulos, no entre docs individuales
- **D-03:** Progress bar sutil por capítulo (porcentaje leído basado en scroll position)
- **D-04:** Tiempo estimado de lectura por capítulo visible en el landing y dentro del capítulo
- **D-05:** "Continuar leyendo" con progreso persistido en localStorage — el ciudadano retoma donde dejó
- **D-06:** Capítulos 08-pitch y 09-investors ESCONDIDOS hasta Phase 5 (Dual Experience). No aparecen en la navegación ciudadana
- **D-07:** Capítulo 10-oportunidades VISIBLE para ciudadanos — cualquiera puede enterarse de las oportunidades y plantear más

### Presentación de fuentes verificables
- **D-08:** Badge inline con nombre de organización como chip sutil junto al dato. Ej: `**303B barriles** [OPEP 2025]`. El ciudadano ve el nombre y confía sin interrumpir la lectura
- **D-09:** Colores por tipo de fuente — azul para multilaterales (FMI, BM, ONU), verde para energía (OPEP, Rystad, EIA), gris para medios (Reuters, CNBC). Señal visual de categoría
- **D-10:** Tap en badge → bottom sheet (mobile) con ficha completa: Organización + Fecha + URL clickeable. Solo quien quiere verificar profundiza
- **D-11:** Proyecciones propias: badge "Proyección VSA" con tooltip/bottom sheet que explica la metodología (ej: "Basado en USD 60/bbl × producción Rystad × tasa de ahorro")
- **D-12:** Badges agrupados por párrafo — un solo badge al final del párrafo tipo "Fuentes: OPEP, FMI, Rystad" en vez de uno por cada dato
- **D-13:** Sección colapsable "Fuentes de este capítulo" al final de cada capítulo para quien quiera la lista completa (periodistas, académicos)

### Diagramas y tablas en 360px
- **D-14:** Tablas: scroll horizontal con sombra/fade en el borde derecho como indicador de que hay más contenido. El gesto es natural para el usuario mobile (Instagram Stories)
- **D-15:** Mermaid: SVG estático renderizado en build time — cero JS de Mermaid en el cliente
- **D-16:** Diagramas complejos (flowcharts grandes, gantt): tap para expandir a pantalla completa con pinch-zoom dentro del fullscreen
- **D-17:** Pie charts y diagramas simples: inline full-width sin necesidad de expand
- **D-18:** Mini-caption debajo de cada diagrama complejo resumiendo el mensaje. Ej: "Petróleo financia → Tech diversifica → Fondo soberano protege"
- **D-19:** Tablas estrella (datos clave como parámetros en intro.md): tratamiento especial — card elevada con borde accent (emerald), destacada del flujo normal de texto
- **D-20:** xychart-beta que no rendericen como SVG: reemplazar con imagen placeholder + caption descriptivo. Phase 3 traerá los dashboards interactivos reales

### Landing del tab "El Plan"
- **D-21:** Landing tipo índice de libro visual, NO ir directo al capítulo 1. El ciudadano necesita contexto y control
- **D-22:** Hero breve arriba: "El plan completo — 7 capítulos, ~X min de lectura" + barra de progreso global si ya leyó algo
- **D-23:** Cards por capítulo: ícono + nombre + descripción de 1 línea + tiempo estimado + badge de progreso ("50% leído" o "Nuevo")
- **D-24:** "Continuar leyendo" como CTA prominente si hay progreso previo — lleva exactamente donde se quedó
- **D-25:** Barra de búsqueda siempre visible arriba del landing — el que sabe qué busca no navega capítulos, busca directo
- **D-26:** Oportunidades de Inversión (cap 10) como sección separada debajo de los 7 capítulos principales, con su propia card
- **D-27:** Glosario y Referencias como links secundarios al fondo — son herramientas de consulta, no capítulos
- **D-28:** Badge "Empieza aquí" en el capítulo Fundamentos para el usuario nuevo. Para quien ya empezó, el CTA es "Continuar leyendo"
- **D-29:** Dato gancho por capítulo — un número clave en cada card que enganche. Ej: Motor Financiero → "USD 550-750B", Ciudadanos → "7.9M en la diáspora"

### Claude's Discretion
- mdsvex vs alternativa de procesamiento markdown (debe validar compatibilidad Svelte 5)
- Cadena de plugins remark/rehype para admonitions, tablas, enlaces
- Pagefind vs Flexsearch vs otra librería de búsqueda offline
- Estrategia de routing (dinámico vs estático, slug structure)
- Estrategia de cache del service worker para contenido markdown
- Arquitectura de componentes (Article, SourceBadge, TableWrapper, DiagramViewer, etc.)
- Approach de renderizado SVG estático para Mermaid en build time
- Implementación del scroll tracking para progress bar

</decisions>

<specifics>
## Specific Ideas

- "25 años de cifras inventadas" — las fuentes verificables son señal de confianza, no decoración académica. El nombre de la organización (OPEP, FMI) es más poderoso que un URL para el ciudadano promedio
- Scroll continuo por capítulo porque el venezolano lee como feed (Instagram, WhatsApp), no como libro académico con páginas
- Dato gancho por capítulo en el landing — el número engancha antes de entrar a leer. Como un headline de TikTok pero con data real
- "Continuar leyendo" porque la conexión es intermitente — el ciudadano lee 10 minutos en el metro, cierra, retoma mañana
- Tablas estrella con tratamiento especial porque los datos clave del plan (303B bbl, USD 60, 3M bpd) son los que convencen — no pueden perderse en una tabla genérica
- Capítulo 10 (Oportunidades) visible para ciudadanos: "así cualquiera se entera de las oportunidades y puede plantear más"

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase requirements
- `.planning/REQUIREMENTS.md` §CONT-01 through CONT-08 — All 8 content migration requirements with acceptance criteria
- `.planning/ROADMAP.md` §Phase 2 — Goal, dependencies, success criteria (5 criteria)

### Prior phase decisions
- `.planning/phases/01-foundation/01-CONTEXT.md` — Design tokens (dark-first, emerald accent, system fonts), component patterns (Header, TabBar, ComingSoon), PWA setup, BEM vsa-* namespace

### Content source
- `docs/` — 85 markdown files organized in 7 chapters + pitch + investors + oportunidades + glosario + referencias + conclusion
- `sidebars.js` — Current Docusaurus sidebar tree (chapter structure, doc ordering, category labels)
- `i18n/en/docusaurus-plugin-content-docs/current/` — English translations (Phase 5, but structure informs route design)

### Existing interactive components (reference for future phases, NOT for migration)
- `src/components/InteractiveFooter.js` — React component pattern for per-page widgets (reactions, comments, share)
- `src/data/evaluations.js` — 65 perspectives metadata, score history
- `src/pages/simulador.js` — FCV calculator (Phase 3 reference)

### Performance constraints
- `.planning/REQUIREMENTS.md` §FNDN-04 — FCP < 2s on 3G (must maintain after adding content)
- `.planning/REQUIREMENTS.md` §FNDN-05 — Bundle JS < 200KB gzipped (must maintain)
- `.planning/STATE.md` §Blockers — mdsvex 0.12.x Svelte 5 compatibility risk (pre-1.0, validate day one)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `pwa/src/lib/styles/tokens.css`: Complete design system tokens (colors, spacing, typography, border-radius). Content components use these directly
- `pwa/src/lib/components/ComingSoon.svelte`: Pattern for placeholder states — replace /plan ComingSoon with actual content
- `pwa/src/lib/stores/onboarding.js`: localStorage persistence pattern — reuse for reading progress store
- `pwa/src/routes/plan/+page.svelte`: Placeholder route that becomes the El Plan landing page

### Established Patterns
- BEM with `vsa-` namespace: New components follow `vsa-article`, `vsa-source-badge`, `vsa-table-wrapper`, etc.
- Dark-first CSS tokens: All new components use `var(--vsa-*)` tokens, light mode via `:root.light` overrides
- Lucide icons: Already installed (`@lucide/svelte`), use for chapter icons in landing cards
- mode-watcher: Theme system already wired, content components inherit
- System fonts: Zero external font loading, content inherits from app.css

### Integration Points
- `/plan` route: Currently ComingSoon placeholder — becomes the book landing + chapter routes
- TabBar: "El Plan" tab already links to `/plan` — no navigation changes needed
- Workbox service worker: Currently caches app shell — must extend to cache rendered content for offline
- Home CTA "Explorar el plan": Already links to `/plan` — will land on the new book index
- Bundle size CI gate: `pwa/scripts/check-bundle-size.js` — monitor after adding markdown processing + search library

</code_context>

<deferred>
## Deferred Ideas

- Comentarios a nivel de párrafo (estilo Medium) — Phase 4 (Social Layer)
- Votación acuerdo/desacuerdo en párrafos — Phase 4
- Compartir párrafo como image card para redes — Phase 4
- FCV calculator interactivo — Phase 3 (Interactive Features)
- Dashboards interactivos reemplazando Mermaid estáticos — Phase 3
- Experiencia inversor con capítulos 08/09 — Phase 5 (Dual Experience)
- Toggle ciudadano/inversor — Phase 5
- Highlight de párrafos con comentarios activos — Phase 4

</deferred>

---

*Phase: 02-content-migration*
*Context gathered: 2026-03-22*
