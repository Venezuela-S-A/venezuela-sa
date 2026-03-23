# Venezuela S.A. — PWA Ciudadana

## What This Is

Un libro interactivo en formato PWA mobile-first que reemplaza el sitio Docusaurus actual de Venezuela S.A. El plan se lee como un libro donde cada párrafo es comentable (estilo Medium), votable (acuerdo/desacuerdo) y compartible (deep links + image cards para redes sociales). Dashboards interactivos, simuladores y calculadoras están embebidos en el texto. Dos experiencias en una sola app vía toggle: ciudadanos venezolanos (español) e inversionistas (inglés, pitch interactivo). Supabase como backend para la capa social (comentarios, votos). Datos de dashboards en JSON/YAML estáticos. Contenido en markdown.

## Core Value

Un ciudadano venezolano con un teléfono Android de gama baja y conexión intermitente puede instalar la app, explorar el plan completo offline, simular su FCV personal y entender exactamente a dónde va cada dólar del petróleo.

## Requirements

### Validated

- [x] App shell con navegación por tabs inferiores (Home, Mi FCV, El Plan, Dashboards) — Validated in Phase 1: Foundation
- [x] PWA instalable desde el navegador con service worker — Validated in Phase 1: Foundation
- [x] Funcionamiento offline con datos cacheados — Validated in Phase 1: Foundation
- [x] Mobile-first responsive (funciona en Android gama baja) — Validated in Phase 1: Foundation
- [x] Migración completa de los 50+ docs markdown existentes como páginas legibles — Validated in Phase 2: Content Migration

### Active

- [ ] Toggle ciudadano (ES) ↔ inversor (EN) que cambia la experiencia completa
- [ ] Al menos 3 dashboards interactivos (producción petrolera, presupuesto/asignación, fondo soberano)
- [ ] Calculadora FCV interactiva (simular subcuentas: Retiro 7%, Salud 7%, Vivienda 4%, Educación 2%, Cesantía 3%)
- [ ] Datos estáticos en JSON/YAML dentro del repo (sin backend)
- [ ] Experiencia inversor en inglés con proyecciones financieras y pitch interactivo
- [ ] Charts/gráficos interactivos con filtros, sliders, drill-down
- [ ] Tracking de progreso del plan (fases, hitos, KPIs)

### Out of Scope

- App nativa (iOS/Android) — PWA cubre ambas plataformas
- CMS o panel de administración — el contenido se actualiza vía git
- Datos en tiempo real — todo es estático/proyecciones hasta que exista la infraestructura real
- Autenticación completa (registro, login) — v1 usa anonymous sessions de Supabase para comentarios/votos
- AI chatbot in-app — contradice el target de 2GB RAM

## Context

- **Codebase existente:** Docusaurus v3 con ~50+ docs markdown, gráficos Mermaid, admonitions, tablas extensas. El contenido es el activo principal — la migración debe preservar toda la información.
- **Audiencia dual:** 40M de ciudadanos venezolanos (muchos con Android gama baja, conexión 3G/intermitente) + inversionistas internacionales (desktop/mobile, esperan una experiencia tipo pitch deck).
- **Contenido híbrido:** Ensayos y análisis profundos (gobernanza, geopolítica, educación) se mantienen como markdown legible. Datos duros (producción petrolera, presupuesto, FCV, fondo soberano) se transforman en dashboards interactivos.
- **Datos existentes:** Proyecciones en tablas markdown con fuentes verificables (OPEP, Rystad, FMI, EIA). Necesitan extraerse a JSON/YAML estructurado.
- **Mermaid:** Los gráficos Mermaid actuales (pie, xychart-beta, flowchart, gantt) necesitan equivalente interactivo o coexistencia.
- **Internacionalización:** Español es idioma principal, inglés para sección de inversionistas. No es i18n completo — son dos experiencias distintas con contenido diferente.
- **Performance crítica:** La app debe funcionar en dispositivos con 2GB RAM y conexión de 1 Mbps. Bundle size y time-to-interactive son métricas prioritarias.

## Constraints

- **Markdown source of truth**: Todo el contenido debe seguir viviendo en archivos markdown editables. La app renderiza markdown, no lo reemplaza.
- **Supabase para capa social**: Comentarios, votos y analytics vía Supabase. Dashboards y contenido son estáticos (JSON/YAML). Deploy: Cloudflare Pages (estáticos) + Supabase (social).
- **Performance budget**: First Contentful Paint < 2s en 3G, bundle JS < 200KB gzipped para la carga inicial.
- **Offline-first**: Service worker cachea todo el contenido y datos. La app es funcional sin conexión.
- **Fuentes verificables**: Toda data en los dashboards debe mantener la trazabilidad a la fuente original (organización + fecha + URL), igual que en el plan actual.
- **Los 5 principios inviolables**: El contenido migrado debe mantener los principios del CLAUDE.md — cero datos inventados, precio base $60, timeline Rystad, apartidista.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Migrar de Docusaurus a PWA | Docusaurus es un generador de docs estático — no soporta dashboards interactivos, navegación app-like, ni offline robusto | — Pending |
| Datos estáticos en JSON/YAML | Sin backend por ahora, pero la estructura de datos debe permitir migrar a API cuando existan datos reales | — Pending |
| Framework frontend | SvelteKit elegido por bundles livianos, ideal para Android gama baja | SvelteKit + Vite |
| Dual experience via toggle | Una sola app con toggle es más mantenible que dos sitios separados, y permite compartir la capa de datos | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-23 after Phase 2 completion*
