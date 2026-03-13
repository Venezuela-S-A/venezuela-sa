# Contribuir a Venezuela S.A. / Contributing to Venezuela S.A.

> **Este es el repositorio oficial y centralizado del plan.** Toda contribución se hace aquí mediante Issues y Pull Requests.

---

## 🇪🇸 Español

### Cómo unirte al proyecto

1. **Abre un Issue** o comenta en un issue existente presentándote y describiendo cómo quieres contribuir
2. **Solicita acceso a la organización** — un maintainer te agregará a [Venezuela-S-A](https://github.com/Venezuela-S-A) con el rol apropiado
3. **Fork o branch** — una vez en la organización, puedes crear branches directamente o trabajar desde tu fork
4. **Abre un Pull Request** — todo cambio pasa por PR review (mínimo 1 aprobación)

:::info Nota sobre el acceso
Para mantener la calidad, los nuevos colaboradores empiezan con permisos de `triage` (pueden gestionar issues). Después de 2-3 PRs aprobados, se promueven a `write` (pueden crear branches). Los maintainers tienen `admin`.
:::

### Principios fundamentales

1. **Todo dato necesita fuente.** No se acepta ningún número sin organización + fecha + URL.
2. **Precio base: USD $60/barril.** Todas las proyecciones petroleras usan esta base ([EIA STEO, mar. 2026](https://www.eia.gov/outlooks/steo/)).
3. **Timeline: Rystad Energy.** 15 años para 3M bpd. No se promete menos.
4. **Tono directo.** Sin jerga burocrática. Datos primero, explicación después.
5. **El petróleo es combustible, tech es destino.** Cada contribución debe reforzar esta tesis.
6. **No es un plan de gobierno.** Es un plan de negocio. Tono startup, no documento oficial.
7. **Apartidista.** Cero propaganda política de cualquier bando.

### Tipos de contribución

| Tipo | Label en GitHub | Descripción | Ejemplo |
|------|----------------|-------------|---------|
| 📊 Datos | `datos` | Datos más recientes o precisos con fuente verificable | "El FMI actualizó el PIB de Venezuela a X" |
| 📝 Contenido | `contenido` | Nuevas secciones, mejoras de redacción | "Falta una sección sobre minería formal" |
| 🌐 Traducción | `traducción` | Traducción al inglés u otros idiomas | "Traduje la sección de Fondo Soberano" |
| 💻 Código | `infraestructura` | Mejoras al sitio Docusaurus, CI/CD, visualizaciones | "Agregué chart interactivo con D3" |
| 📈 Gráficos | `gráficos` | Nuevos gráficos Mermaid o mejora de existentes | "Agregué pie chart a la sección de deuda" |
| 🔍 Verificación | `verificación` | Auditoría de fuentes, cálculos, consistencia | "El dato de producción está desactualizado" |
| 🔬 Investigación | `investigación` | Análisis comparativos, modelos internacionales | "Investigación sobre el modelo CPF de Singapur" |
| 🐛 Corrección | `bug` | Errores de datos, enlaces rotos, typos | "El enlace a OPEP está roto" |

### Proceso paso a paso

#### Para reportar un error o sugerir mejoras:
1. Ve a [Issues](https://github.com/Venezuela-S-A/venezuela-sa/issues)
2. Usa el template apropiado (bug, feature, datos, etc.)
3. Incluye fuentes verificables si propones datos nuevos

#### Para contribuir código o contenido:
1. **Abre un Issue** describiendo qué quieres cambiar y por qué
2. **Fork el repo** (o crea un branch si ya eres miembro de la org)
3. **Nombra tu branch:** `feat/nombre-descriptivo`, `fix/nombre-descriptivo`, o `docs/nombre-descriptivo`
4. **Haz los cambios** siguiendo las guías de estilo
5. **Abre un Pull Request** usando el template proporcionado
6. **Espera review** — un maintainer revisará en máximo 72 horas

### Guías de estilo

#### Contenido
- **Tablas sobre prosa** para comparaciones de datos. Siempre.
- **Bold para números clave** dentro del texto.
- **Enlaces en cada fuente.** Formato: `[Nombre](URL)` inline.
- **Admonitions de Docusaurus** para información crítica:
  - `:::danger` — riesgos y advertencias
  - `:::info` — contexto y referencias
  - `:::tip` — escenarios favorables
  - `:::caution` — caveats de precio/proyección
- **Gráficos Mermaid** cuando agreguen claridad (pie, xychart-beta, flowchart, gantt).
- **Fuentes 2024-2026** preferidas. Fuentes anteriores a 2023 solo para datos históricos.

#### Código (Docusaurus)
- Docusaurus v3 con ESM (`import`, no `require`)
- Mermaid habilitado vía `@docusaurus/theme-mermaid`
- Markdown format `"md"` (no MDX) para evitar problemas de parsing
- `numberPrefixParser: false` — las carpetas usan prefijos numéricos (01-, 02-, etc.)

#### Claude Code (para colaboradores que usan IA)
El repo incluye skills y reglas en `.claude/` para que cualquier colaborador con Claude Code mantenga los estándares automáticamente:
- `.claude/rules/` — workflow, git, performance
- `.claude/skills/` — quality control, style guide, data standards
- `skill/` — skill principal de control de calidad

### Checklist para PRs

Antes de abrir un PR, verifica:

- [ ] Cada número nuevo tiene fuente con nombre + fecha + URL
- [ ] No se usa precio base diferente a USD $60 (excepto escenarios de sensibilidad)
- [ ] El timeline de producción es consistente con Rystad Energy (enero 2026)
- [ ] Las tablas se usan para comparaciones de datos
- [ ] Los enlaces internos y externos funcionan
- [ ] El contenido es accesible (un graduado de secundaria debe entender cada oración)
- [ ] Si agregaste fuentes nuevas, actualizaste `docs/referencias.md`
- [ ] Si agregaste una sección nueva, actualizaste `sidebars.js`
- [ ] Los gráficos Mermaid renderizan correctamente (probar con `npm start`)

### Qué NO se acepta

- Contenido sin fuentes verificables
- Propaganda política de cualquier bando
- Ataques personales en issues o PRs
- Datos inventados o "estimaciones propias" sin metodología
- Modificar el precio base sin consenso del equipo core
- PRs que rompan el build de Docusaurus
- Contenido que posicione al petróleo como el negocio (es el combustible)

### Roles en la organización

| Rol | Permisos | Quién |
|-----|----------|-------|
| **Maintainer** | Admin, merge PRs, gestionar org | Core team |
| **Contributor** | Push branches, crear PRs | Colaboradores activos (2+ PRs aprobados) |
| **Triage** | Gestionar issues, etiquetar | Nuevos colaboradores |
| **Reviewer** | Review PRs de su área de expertise | Especialistas invitados |

### Áreas que necesitan contribuciones

| Área | Prioridad | Skills necesarios |
|------|-----------|-------------------|
| Traducción completa al inglés | Alta | Inglés nativo/avanzado + español |
| Verificación de fuentes | Alta | Research + español/inglés |
| Gráficos interactivos (D3, Plotly) | Media | JavaScript + data viz |
| Modelos financieros detallados | Media | Finanzas + Excel/Python |
| Investigación de modelos internacionales | Media | Research + análisis comparativo |
| Diseño UX del sitio | Media | CSS + Docusaurus + React |
| Legal (estructura VIN, bonos) | Alta | Derecho corporativo/financiero internacional |
| Revisión por economistas | Alta | Economía + experiencia en LATAM |

---

## 🇬🇧 English

### How to join the project

1. **Open an Issue** or comment on an existing one, introducing yourself and how you want to contribute
2. **Request access** — a maintainer will add you to [Venezuela-S-A](https://github.com/Venezuela-S-A) with the appropriate role
3. **Fork or branch** — once in the organization, create branches directly or work from your fork
4. **Open a Pull Request** — all changes go through PR review (minimum 1 approval)

### Core principles

1. **Every number needs a source.** No data accepted without organization + date + URL.
2. **Base price: USD $60/barrel.** All oil projections use this base.
3. **Timeline: Rystad Energy.** 15 years to 3M bpd. Don't promise less.
4. **Direct tone.** No bureaucratic jargon. Data first, explanation second.
5. **Oil is fuel, tech is destination.** Every contribution must reinforce this thesis.
6. **Not a government plan.** It's a business plan. Startup tone, not government white paper.
7. **Non-partisan.** Zero political propaganda from any side.

### Process

1. Open an Issue describing what and why
2. Fork the repo (or create a branch if you're an org member)
3. Name your branch: `feat/`, `fix/`, or `docs/` + descriptive name
4. Make changes following the style guides
5. Open a PR using the template
6. Wait for review (max 72 hours)

### What is NOT accepted

- Content without verifiable sources
- Political propaganda from any side
- Personal attacks in issues or PRs
- Made-up data or "own estimates" without methodology
- Changing the base price without core team consensus
- PRs that break the Docusaurus build
- Content that positions oil as the business (it's the fuel)

### Areas needing contributions

| Area | Priority | Skills needed |
|------|----------|---------------|
| Full English translation | High | Native/advanced English + Spanish |
| Source verification | High | Research + Spanish/English |
| Interactive charts (D3, Plotly) | Medium | JavaScript + data viz |
| Detailed financial models | Medium | Finance + Excel/Python |
| International model research | Medium | Research + comparative analysis |
| Site UX design | Medium | CSS + Docusaurus + React |
| Legal (VIN structure, bonds) | High | International corporate/financial law |
| Economist review | High | Economics + LATAM experience |

---

## 📋 Templates

### Issue template (ejemplo)
```
## Qué quiero cambiar
[Descripción clara]

## Por qué
[Justificación con datos si aplica]

## Fuentes
- [Nombre](URL) — dato específico

## Sección(es) afectada(s)
- docs/XX-categoria/archivo.md
```

### PR template (ejemplo)
```
## Resumen
[1-3 bullets de qué cambia]

## Tipo de cambio
- [ ] Datos nuevos/actualizados
- [ ] Contenido nuevo
- [ ] Corrección
- [ ] Traducción
- [ ] Código/infraestructura

## Checklist
- [ ] Fuentes verificables incluidas
- [ ] Build pasa (`npm run build`)
- [ ] Enlaces funcionan
- [ ] Consistente con precio base USD $60

## Fuentes agregadas
- [Nombre](URL)
```
