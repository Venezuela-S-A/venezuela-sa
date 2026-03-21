# Phase 1: Foundation - Context

**Gathered:** 2026-03-21
**Status:** Ready for planning

<domain>
## Phase Boundary

App shell con navegacion por tabs, PWA instalable, funcionamiento offline y performance budget. SvelteKit 2 + Svelte 5 scaffold con adapter-static. El usuario puede instalar la app desde el navegador, ver la navegacion por tabs (Home, Mi FCV, El Plan, Dashboards) y usar el shell offline en un Android gama baja. No hay contenido real ni dashboards — solo el shell funcional.

</domain>

<decisions>
## Implementation Decisions

### Empty states de tabs
- **D-01:** Cada tab muestra un teaser con proposito — icono + frase que explica que hara esa seccion + badge sutil "Proximamente - Fase X"
- **D-02:** Home tab muestra hero con logo/bandera, tagline ("40M accionistas. Un plan. Tu pais."), card con 3 datos clave (303B bbl, USD 60 base, 15 anos → 3M bpd) y CTA "Explorar el plan"
- **D-03:** CTA del Home lleva al tab El Plan (aunque sea teaser). Navegacion consistente desde el dia 1
- **D-04:** Mi FCV, El Plan, Dashboards muestran icono + descripcion de lo que vendra + badge "Proximamente - Fase X"

### Identidad visual
- **D-05:** Paleta de colores nueva — redisenar desde cero. NO conservar los colores Docusaurus (#0D47A1, #F9A825). Claude diseña la paleta con estetica app nativa moderna (referencia: Revolut, Nubank, Cash App)
- **D-06:** Estilo app nativa moderna: cards elevadas con sombra, bordes redondeados (12-16px), bottom sheets para acciones, transiciones suaves, colores de acento vibrantes, iconos filled
- **D-07:** Tipografia system fonts — cero fonts externos. -apple-system, Segoe UI, Roboto. Maximo rendimiento, 0 KB extra
- **D-08:** Dark-first — dark mode es el default. Light mode disponible. Toggle manual + respeta preferencia del sistema. Justificacion: ahorro de bateria en AMOLED (comun en Android gama baja venezolano)

### Onboarding e instalacion PWA
- **D-09:** Boton fijo "Instalar app" en header o footer, siempre visible, nunca interrumpe. Sin banner modal ni popup. El usuario instala cuando quiera
- **D-10:** Splash screen branded — logo + nombre + colores. Generado por el OS desde manifest.json (background_color, theme_color, icons)
- **D-11:** Onboarding de 3 slides swipeables solo la primera vez: (1) "40 millones de accionistas", (2) "Explora, simula, opina", (3) "Funciona sin internet" + boton "Empezar". Skippable

### Claude's Discretion
- Paleta de colores exacta (con constraint: app nativa moderna, dark-first, NO colores de bandera)
- Iconografia (set de iconos: Lucide, Phosphor, Heroicons — lo que mejor se ajuste al estilo)
- Espaciado y sizing del sistema de diseno
- Animaciones/transiciones CSS (solo CSS transitions, nada pesado)
- Estructura de carpetas SvelteKit
- Service worker strategy (precache vs runtime cache)
- Implementacion del pull-to-refresh

</decisions>

<specifics>
## Specific Ideas

- "Se siente como Revolut/Nubank/Cash App" — app financiera moderna, no sitio web
- Dark-first porque los Android gama baja en Venezuela son AMOLED y ahorran bateria
- Los 3 datos clave del Home son los mismos del CLAUDE.md: 303B bbl (OPEP), USD 60 base (EIA), 15 anos → 3M bpd (Rystad)
- El onboarding establece las 3 proposiciones de valor: comunidad (40M), interactividad (explora/simula/opina), offline

</specifics>

<canonical_refs>
## Canonical References

### Project definition
- `.planning/PROJECT.md` — Core value, constraints (Supabase, Cloudflare Pages, performance budget, offline-first, markdown source of truth)
- `.planning/REQUIREMENTS.md` — FNDN-01 through FNDN-08 (all Phase 1 requirements with acceptance criteria)
- `.planning/ROADMAP.md` §Phase 1 — Goal, dependencies, success criteria

### Existing assets to migrate/reference
- `static/manifest.json` — Current PWA manifest (name, colors, scope — needs update for new paleta)
- `docusaurus.config.js` — Current config (reference for baseUrl, i18n, plugin setup — NOT to replicate)
- `src/css/custom.css` — Current 43KB CSS (reference for component naming BEM `vsa-*` — paleta will change)

### Performance constraints
- `.planning/REQUIREMENTS.md` §FNDN-04 — FCP < 2s on 3G
- `.planning/REQUIREMENTS.md` §FNDN-05 — Bundle JS < 200KB gzipped

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `static/manifest.json`: PWA manifest structure exists — update colors/icons for new identity, keep name/scope
- `src/lib/supabase.js`: Singleton client pattern (`getSupabase()` / `isConfigured()`) is framework-agnostic, portable to SvelteKit with minimal changes
- `docs/`: 85 markdown files are the content source of truth — Phase 1 doesn't render them but the file structure informs route design

### Established Patterns
- BEM with `vsa-` namespace (`vsa-chat`, `vsa-reactions`) — carry forward to SvelteKit components
- CSS custom properties (`--vsa-*`) — new paleta, same pattern for theming
- Graceful degradation when Supabase unconfigured — same pattern in SvelteKit

### Integration Points
- Cloudflare Pages deployment (new, replacing GitHub Pages)
- Supabase client connection (Phase 4, but scaffold the lib now)
- Markdown file structure in `docs/` (Phase 2 consumes, but route design in Phase 1 must anticipate)

</code_context>

<deferred>
## Deferred Ideas

- Content migration (50+ markdown docs) — Phase 2
- FCV calculator and dashboards — Phase 3
- Social layer (comments, votes, sharing) — Phase 4
- Dual experience toggle (ciudadano/inversor) — Phase 5
- Logo/brand design beyond colors — separate effort, use flag emoji as placeholder

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-21*
