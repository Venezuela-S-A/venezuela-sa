# Requirements: Venezuela S.A. PWA Ciudadana

**Defined:** 2026-03-21
**Core Value:** Un ciudadano venezolano con un teléfono Android de gama baja puede instalar la app, leer el plan como un libro interactivo, comentar cada párrafo, simular su FCV y entender a dónde va cada dólar del petróleo — offline.

## v1 Requirements

### Foundation

- [x] **FNDN-01**: App shell con navegación por tabs inferiores persistentes (Home, Mi FCV, El Plan, Dashboards)
- [x] **FNDN-02**: PWA instalable desde el navegador con manifest y service worker
- [ ] **FNDN-03**: Funcionamiento offline — todo el contenido y datos cacheados, la app funciona sin conexión (capa social requiere conexión)
- [ ] **FNDN-04**: First Contentful Paint < 2s en conexión 3G
- [ ] **FNDN-05**: Bundle JS inicial < 200KB gzipped
- [x] **FNDN-06**: Dark mode que respeta preferencia del sistema + toggle manual
- [ ] **FNDN-07**: SvelteKit 2 + Svelte 5 como framework base con adapter-static
- [x] **FNDN-08**: Pull-to-refresh para verificar actualizaciones de datos cuando hay conexión

### Content

- [ ] **CONT-01**: Migración completa de los 50+ docs markdown existentes como páginas legibles
- [ ] **CONT-02**: Renderizado de admonitions (:::danger, :::info, :::tip, :::caution) vía remark plugins
- [ ] **CONT-03**: Mermaid diagrams renderizados como SVG estático en build time (cero JS de Mermaid en el cliente)
- [ ] **CONT-04**: Tablas markdown renderizadas con scroll horizontal en mobile
- [ ] **CONT-05**: Fuente verificable en cada dato — tooltip o footnote con organización + fecha + URL
- [ ] **CONT-06**: Deep links para cada sección y párrafo — cada elemento tiene su URL compartible
- [ ] **CONT-07**: Búsqueda full-text offline sobre todo el contenido (Pagefind o Flexsearch)
- [ ] **CONT-08**: Navegación secuencial tipo libro (anterior/siguiente) dentro de cada sección del plan

### Social

- [ ] **SOCL-01**: Comentarios a nivel de párrafo estilo Medium — usuario selecciona o toca un párrafo y puede comentar
- [ ] **SOCL-02**: Votación acuerdo/desacuerdo en cada párrafo con contador agregado visible
- [ ] **SOCL-03**: Compartir párrafo como deep link + texto citado (WhatsApp, Twitter, copiar enlace)
- [ ] **SOCL-04**: Compartir párrafo como image card con branding para redes sociales
- [ ] **SOCL-05**: Supabase como backend para comentarios y votos (anonymous sessions, sin auth obligatorio)
- [ ] **SOCL-06**: Indicador visual en párrafos con comentarios activos (badge o highlight)

### Interactive

- [ ] **INTX-01**: Calculadora FCV con 5 subcuentas (Retiro 7%, Salud 7%, Vivienda 4%, Educación 2%, Cesantía 3%) — sliders para salario y años
- [ ] **INTX-02**: Dashboard producción petrolera — línea/barra interactiva (actual vs. meta 3M bpd, timeline Rystad 15 años)
- [ ] **INTX-03**: Dashboard asignación presupuestaria — pie/donut interactivo (a dónde va cada dólar)
- [ ] **INTX-04**: Dashboard fondo soberano — área/línea interactiva (crecimiento proyectado con escenarios de precio)
- [ ] **INTX-05**: Drill-down en charts — tocar un segmento muestra el desglose detallado y la fuente del dato
- [ ] **INTX-06**: Tracker de progreso del plan — timeline visual con fases completadas/en progreso/pendientes
- [ ] **INTX-07**: Modo comparación "Venezuela hoy" vs "Venezuela en 15 años" — split o swipe con charts sincronizados

### Dual Experience

- [ ] **DUAL-01**: Toggle ciudadano (ES) ↔ inversor (EN) accesible desde cualquier pantalla
- [ ] **DUAL-02**: Experiencia ciudadano: español, narrativa del plan, dashboards de impacto personal, FCV
- [ ] **DUAL-03**: Experiencia inversor: inglés, proyecciones financieras, pitch deck interactivo, métricas de retorno
- [ ] **DUAL-04**: Contenido compartido subyacente — mismos datos JSON, diferente presentación

## v2 Requirements

### Social Avanzado

- **SOCL-07**: Autenticación completa (email, OAuth) para perfiles persistentes
- **SOCL-08**: Hilos de discusión en comentarios (responder a comentarios)
- **SOCL-09**: Moderación de comentarios (reportar, ocultar, ban)
- **SOCL-10**: Notificaciones cuando alguien responde a tu comentario

### Data en Vivo

- **DATA-01**: API backend para datos en tiempo real (producción actual, fondo real)
- **DATA-02**: Conexión a datos gubernamentales abiertos cuando existan
- **DATA-03**: Historial de cambios en datos (diff entre versiones)

### Avanzado

- **ADVN-01**: Simulador escenarios macro ("¿qué pasa si el barril baja a $40?")
- **ADVN-02**: Vista simplificada para baja alfabetización
- **ADVN-03**: Push notifications para actualizaciones del plan

## Out of Scope

| Feature | Reason |
|---------|--------|
| App nativa (iOS/Android) | PWA cubre ambas plataformas sin app store |
| CMS / panel de administración | Contenido se actualiza vía git commits |
| AI chatbot in-app | Requiere hardware que contradice target 2GB RAM |
| Datos en tiempo real (v1) | No existen datos reales todavía — todo es proyecciones |
| Auth completa (v1) | Anonymous sessions de Supabase son suficientes para v1 |
| Backend custom | Supabase cubre la capa social; datos son estáticos |
| Video embebido | Bandwidth en Venezuela no lo soporta de forma confiable |
| Animaciones pesadas (GSAP, Framer) | Janky en gama baja — solo CSS transitions |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FNDN-01 | Phase 1 | Complete |
| FNDN-02 | Phase 1 | Complete |
| FNDN-03 | Phase 1 | Pending |
| FNDN-04 | Phase 1 | Pending |
| FNDN-05 | Phase 1 | Pending |
| FNDN-06 | Phase 1 | Complete |
| FNDN-07 | Phase 1 | Pending |
| FNDN-08 | Phase 1 | Complete |
| CONT-01 | Phase 2 | Pending |
| CONT-02 | Phase 2 | Pending |
| CONT-03 | Phase 2 | Pending |
| CONT-04 | Phase 2 | Pending |
| CONT-05 | Phase 2 | Pending |
| CONT-06 | Phase 2 | Pending |
| CONT-07 | Phase 2 | Pending |
| CONT-08 | Phase 2 | Pending |
| SOCL-01 | Phase 4 | Pending |
| SOCL-02 | Phase 4 | Pending |
| SOCL-03 | Phase 4 | Pending |
| SOCL-04 | Phase 4 | Pending |
| SOCL-05 | Phase 4 | Pending |
| SOCL-06 | Phase 4 | Pending |
| INTX-01 | Phase 3 | Pending |
| INTX-02 | Phase 3 | Pending |
| INTX-03 | Phase 3 | Pending |
| INTX-04 | Phase 3 | Pending |
| INTX-05 | Phase 3 | Pending |
| INTX-06 | Phase 3 | Pending |
| INTX-07 | Phase 3 | Pending |
| DUAL-01 | Phase 5 | Pending |
| DUAL-02 | Phase 5 | Pending |
| DUAL-03 | Phase 5 | Pending |
| DUAL-04 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 33 total
- Mapped to phases: 33
- Unmapped: 0

---
*Requirements defined: 2026-03-21*
*Last updated: 2026-03-21 after roadmap creation*
