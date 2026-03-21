# Venezuela S.A. — Directriz Central

> Este archivo es el **ente rector** del proyecto. Todo agente, skill, colaborador o contribución se rige por estas directrices. Si algo contradice este archivo, este archivo gana.

## Qué es este proyecto

Un plan de reconstrucción nacional tratado como startup. 40 millones de accionistas. Petróleo como combustible, tecnología como destino. No es un plan de gobierno — es un modelo de negocio con rondas de financiamiento, métricas verificables y una tesis clara.

**Versión:** 1.0
**Idioma principal:** Español
**Idioma secundario:** Inglés (sección de inversionistas)
**Sitio:** Docusaurus v3 con Mermaid

## Los 5 principios inviolables

1. **Cero datos inventados.** Todo número tiene organización + fecha + URL. Sin excepción.
2. **Precio base USD $60/barril.** Cualquier cosa por encima es upside al fondo soberano.
3. **Timeline Rystad Energy.** 15 años para 3M bpd. No se promete menos.
4. **Petróleo es combustible, tech es destino.** El petróleo financia, no define.
5. **Apartidista.** Cero propaganda política. El plan sirve a ciudadanos, no a partidos.
6. **Petróleo es un activo depreciante.** Para 2040 solar será más barato que extraer crudo de la Faja. La ventana real es 10-15 años, no 30. Cada decisión debe asumir que el petróleo puede valer cero — se quema para salir de la atmósfera, no se vuela al espacio con fósil. La diversificación no es fase 3, es paralela desde el día 1.

## Filtro de viabilidad — Gate de contribución

**NO toda idea es válida.** Antes de aceptar cualquier propuesta, contribución o expansión del plan, debe pasar estos filtros:

### Gate 1: Consistencia con la tesis
- ¿Refuerza "petróleo = combustible, tech = destino"?
- ¿Es compatible con el modelo de Estado lean (5 funciones: gobierno, salud, justicia, educación, seguridad)?
- Si depende de más burocracia estatal → rechazar o replantear como concesión privada.

### Gate 2: Viabilidad con datos
- ¿Tiene precedente verificable? (modelo exitoso en otro país con fuente)
- ¿Los números cuadran con las proyecciones existentes?
- ¿Encaja en el presupuesto de USD 550-750B sin inflar la cifra arbitrariamente?
- Si no tiene datos → marcar como `[Requiere investigación]`, no inventar.

### Gate 3: Coherencia interna
- ¿Contradice otra sección del plan? (ej: proponer más gasto público cuando el modelo es lean)
- ¿El timeline es compatible con Rystad? (no prometer resultados en 5 años si Rystad dice 15)
- ¿Las fuentes de financiamiento están identificadas?

### Gate 4: Pragmatismo geopolítico
- ¿Asume soberanía plena sobre petróleo? → ajustar al marco de transición actual (EE.UU. controla ventas)
- ¿Ignora la realidad de la deuda de USD 150-170B?
- ¿Asume un gobierno que no existe todavía?

### Resultado del filtro
- **Pasa los 4 gates** → se acepta, se integra al plan con fuentes
- **Falla 1 gate** → se devuelve con feedback específico de qué ajustar
- **Falla 2+ gates** → se rechaza con explicación

### Rol del agente: defensor del plan
- **Claude actúa como defensor del plan.** Si una propuesta es absurda o no pasa los gates → se rechaza directamente, sin diplomacia innecesaria.
- **El score actual es 7.3/10 (65 perspectivas, todas scored). NO puede bajar.** Toda propuesta se evalúa contra este umbral.
- Las 64 perspectivas incluyen: 21 ideológicas (Milei a Piketty + Freddy Vega + Gerver Torres), 5 del equipo ejecutor (CRO deuda soberana, Legal ICSID, Negociador China, Representante FMI, Director Comms), 2 estratégicas (Estratega EE.UU.-China CSIS, Experto Seguridad/DDR), 17 perfiles de personas reales (Walker, Guzmán, Cueva, Buchheit, Figueroa, Myers, Gallagher, Werner, Valdés, Caminiti, Parra Carrillo, entre otros).
- Si la idea es buena → se integra. Si es mala → se descarta sin rodeos. Si es mediocre → se señala qué ajustar.
- El quality gate (`scripts/quality-gate.sh`) es la última línea de defensa automática.
- Toda contribución externa se evalúa contra los 4 gates, se integra con crédito (nombre + LinkedIn), y se re-evalúa con las perspectivas relevantes. Ejemplo: [Parra Carrillo](https://www.linkedin.com/in/andresparracarrillo/) — evaluado por Musk, Vega, Hausmann, VCs.
- **Datos > opiniones. Fuentes > intuición. Coherencia > novedad.**
- **El plan alcanzó 8.0 con analistas pero 7.6 con founders/VCs incluidos.** La diferencia: los builders exigen producto y equipo, no documentos. Para subir: MVP, equipo nombrado, datos de campo.

## Modelo de Estado + Venezuela S.A. (referencia rápida)

| Principio | Regla |
|-----------|-------|
| **Estado ≠ Venezuela S.A.** | Son entidades SEPARADAS. El Estado regula. Venezuela S.A. (holding de 40M ciudadanos-accionistas) hace negocios |
| El Estado vive de impuestos, no de petróleo | 15% flat + 12% IVA. Petróleo → 100% al fondo soberano administrado por Venezuela S.A. |
| El Estado NO es dueño de empresas | PDVSA, CORPOELEC, CANTV, HIDROVEN → se transfieren a Venezuela S.A. como activos del holding ciudadano |
| Venezuela S.A. es accionista, no dueña | Aporta tierra + recursos + permisos como equity en JVs. Cobra regalías y dividendos. Administra el fondo soberano |
| 5 funciones del Estado: SUPERVISA, no opera | Gobierno, salud (supervisa), justicia, educación (supervisa), seguridad. Supervisión tripartita: Estado + comunidad + usuarios |
| **Fondo Ciudadano Venezuela (FCV)** | Cuenta personal unificada tipo Singapur CPF: 5 subcuentas (Retiro 7% + Salud 7% + Vivienda 4% + Educación 2% + Cesantía 3% = 23%). FCV desde nacimiento (VSA contribuye USD 150/mes por niño). NO confundir con el Fondo de Inversión Venezuela S.A. (que es el fondo colectivo de inversión tipo Noruega) |
| Educación K-12: voucher con puntos | Todo niño recibe voucher (matrícula + comedor + transporte + 1 deporte + 1 arte). Colegios compiten como empresas privadas. Precio lo fija el mercado, voucher tiene tope de puntos |
| Educación universitaria: voucher por mérito | Se gana y mantiene por esfuerzo (100→75→50→25→pierde). VSA sigue contribuyendo durante universidad. Universidades públicas autosostenibles (I+D, patentes, spin-offs) |
| Todo lo demás es privado con supervisión | Infraestructura, telecoms, banca = concesión donde Venezuela S.A. es accionista |
| Deuda de infraestructura = corporativa | Venezuela S.A. emite bonos de infraestructura (deuda corporativa). NO deuda soberana |
| Automatizar todo lo posible | Estado digital modelo Estonia. Menos burocracia = menos corrupción |
| Reforma quirúrgica | Fusionar ministerios (34→15), retirar/capacitar/emprender, recuperar fondos desviados |
| Libertad | De vida, económica y religiosa. El Estado es plataforma, no patrón |

## Estructura del plan

```
docs/
├── intro.md                      ← Tesis central + embudo energético
├── 01-fundamentos/               ← Diagnóstico + Fase 0 emergencia
├── 02-motor-financiero/          ← Forwards, fondo, deuda, inversión, fiscal
├── 03-ciudadanos/                ← Inversión ciudadana, diáspora, retorno
├── 04-gobernanza/                ← Anticorrupción, seguridad, modelo estado
├── 05-transformacion/            ← Hubs tech, startups, diversificación, IA, educación
├── 06-realidad/                  ← Digital, servicios, infraestructura, pensiones, banca
├── 07-ejecucion/                 ← Timeline, proyecciones, riesgos, El Sueño
├── 08-pitch/                     ← Anexo inversionistas (español)
├── 09-investors/                 ← Investor annex (English)
├── referencias.md                ← 85+ fuentes verificables
└── conclusion.md

skills/                           ← Prompts especializados (formato universal)
├── experts/                      ← 14 analistas de dominio
│   ├── oil-energy.md
│   ├── macroeconomics.md
│   ├── geopolitics.md
│   ├── mining-minerals.md
│   ├── infrastructure.md
│   ├── governance-legal.md
│   ├── tourism.md
│   ├── technology.md
│   ├── agriculture.md
│   ├── finance-investment.md
│   ├── financial-modeling.md     ← DCF, sensibilidad, auditoría financiera
│   ├── international-models.md   ← 12 países referencia, marco comparativo
│   ├── legal-corporate.md        ← VIN, OFAC, ICSID, Santiago Principles
│   └── economist-latam.md        ← Dutch Disease, trampa ingreso medio, LATAM
├── perspectives/                 ← 28 voces (ideológicas + equipo + estratégicas)
│   ├── milei.md                  ← Libertario radical
│   ├── austrian-school.md        ← Escuela Austríaca (Mises, Hayek)
│   ├── juan-ramon-rallo.md       ← Liberal pragmático
│   ├── maria-corina-machado.md   ← Líder opositora venezolana
│   ├── ricardo-hausmann.md       ← Economista desarrollo (Harvard/Venezuela)
│   ├── lee-kuan-yew.md           ← Estadista pragmático (Singapur)
│   ├── daron-acemoglu.md         ← Institucionalista (MIT/Nobel)
│   ├── joseph-stiglitz.md        ← Progresista (Columbia/Nobel)
│   ├── thomas-piketty.md         ← Desigualdad y capital (Paris)
│   ├── cro-sovereign-debt.md     ← CRO reestructuración soberana
│   ├── legal-icsid.md            ← Arbitraje ICSID / derecho internacional
│   ├── china-negotiator.md       ← Negociador bilateral China-LATAM
│   ├── imf-representative.md     ← Representante FMI / multilateral
│   ├── comms-restructuring.md    ← Director comunicaciones reestructuración
│   ├── us-china-strategist.md    ← Estratega competencia EE.UU.-China
│   └── security-ddr-expert.md    ← Experto seguridad / DDR
├── project/                      ← Control de calidad + referencias
├── tools/                        ← Herramientas de trabajo (10 skills)
│   ├── deep-research.md          ← Research multi-fuente
│   ├── market-research.md        ← Análisis de mercado
│   ├── search-first.md           ← Research antes de codificar
│   ├── copywriting.md            ← Copy de marketing
│   ├── humanizer.md              ← Eliminar señales IA
│   ├── mermaid-diagrams.md       ← Gráficos Mermaid
│   ├── translation-en.md         ← Traducción ES→EN profesional
│   ├── source-verification.md    ← Verificación de fuentes 5 niveles
│   ├── interactive-charts.md     ← D3/Plotly/Recharts para Docusaurus
│   └── ux-design.md              ← UX dual audiencia (ciudadanos + inversores)
└── evaluate.sh                   ← Evalúa con 7 IAs de frontera en paralelo
```

## Datos clave (referencia rápida)

| Parámetro | Valor | Fuente |
|-----------|-------|--------|
| Reservas petroleras | 303B barriles | OPEP ASB 2025 |
| Producción actual | 0.9-1.1M bpd | OPEP/IEA 2025 |
| Inversión para 3M bpd | USD 183B / 15 años | Rystad Energy, ene. 2026 |
| PIB 2025 | USD 82.8B | FMI |
| Deuda externa | USD 150-170B | Reuters/CNBC, dic. 2025 |
| Diáspora | 7.9M personas | UNHCR, dic. 2025 |
| Precio base | **USD 60/barril** | EIA STEO, mar. 2026 |
| Hidroeléctrica | 18,000 MW (Caroní) | Mongabay 2023 |
| Fondo soberano meta (año 15) | USD 250-400B | Proyecciones propias |
| Inversión total | USD 550-750B / 15 años | Consolidado del plan |

## Estándares técnicos

### Contenido
- Tablas sobre prosa para datos. Siempre.
- Bold para números clave.
- Fuentes inline: `[Nombre](URL)`.
- Admonitions: `:::danger`, `:::info`, `:::tip`, `:::caution`.
- Gráficos Mermaid: `pie`, `xychart-beta`, `flowchart`, `gantt`.
- Fuentes preferidas 2024-2026. Pre-2023 solo para datos históricos.

### Tono
- Startup founder pitching a inversores Y ciudadanos simultáneamente.
- Datos primero, explicación después.
- Directo y honesto. Sin hedging diplomático.
- Anti-burocrático. Cero "se procederá a implementar mecanismos de articulación interinstitucional."

### Código (Docusaurus)
- Docusaurus v3, ESM (`import` no `require`)
- `markdown.format: "md"` (no MDX)
- `numberPrefixParser: false`
- `routeBasePath: "/"`
- Mermaid vía `@docusaurus/theme-mermaid`

## Git y contribuciones

- Branch: `main` protegido con ruleset (PR + 1 review)
- Admins pueden bypass para commits directos
- Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`
- Todo PR debe pasar el gate de viabilidad (arriba)
- Todo dato nuevo → actualizar `docs/referencias.md`
- Toda sección nueva → actualizar `sidebars.js`

## Skills y herramientas disponibles

### Panel de expertos (`skills/experts/`) — evaluación técnica
| Skill | Dominio |
|-------|---------|
| `oil-energy` | Petróleo, gas, hidroeléctrica, renovables |
| `macroeconomics` | PIB, fiscal, fondo soberano, deuda, dolarización |
| `geopolitics` | EE.UU., China/Rusia, transición, diáspora, sanciones |
| `mining-minerals` | Arco Minero, oro, hierro, bauxita, tierras raras |
| `infrastructure` | PPP, electricidad, telecoms, transporte, data centers |
| `governance-legal` | Reforma estatal, anticorrupción, justicia, policía |
| `tourism` | Desarrollo destino, eco-turismo, marca país |
| `technology` | Data centers, ZEETs, estado digital, startups |
| `agriculture` | Soberanía alimentaria, cacao, café, acuicultura |
| `finance-investment` | Pre-Seed, bonds, forwards, fondo soberano, sanciones |
| `financial-modeling` | DCF, sensibilidad, auditoría de cálculos, finanzas soberanas |
| `international-models` | 12 países referencia, marco comparativo, lecciones |
| `legal-corporate` | Estructura VIN, OFAC, ICSID, Santiago Principles |
| `economist-latam` | Dutch Disease, trampa ingreso medio, riesgos LATAM |

### Panel de perspectivas (`skills/perspectives/`) — evaluación ideológica
| Skill | Perspectiva | Espectro |
|-------|------------|----------|
| `milei` | Libertario radical, anti-estatismo | Derecha |
| `austrian-school` | Escuela Austríaca (Mises, Hayek, Rothbard) | Derecha |
| `elon-musk` | Tech disruptor, first principles, energía | Derecha-tech |
| `juan-ramon-rallo` | Liberal pragmático, institucionalista | Centro-derecha |
| `marco-rubio` | Secretario de Estado EE.UU., geopolítica, sanciones | Centro-derecha |
| `nayib-bukele` | Transformación rápida, security first, El Salvador | Centro-derecha |
| `visualpolitik` | Geopolítica divulgativa, modelos internacionales | Centro-liberal |
| `visualeconomik` | Economía divulgativa, datos, competitividad | Centro-liberal |
| `maria-corina-machado` | Opositora venezolana, realidad de terreno | Centro |
| `ricardo-hausmann` | Complejidad económica, Harvard/Venezuela | Centro |
| `lee-kuan-yew` | Estadista pragmático, modelo Singapur | Centro |
| `daron-acemoglu` | Instituciones inclusivas/extractivas, Nobel | Centro |
| `andres-oppenheimer` | Periodista LATAM, innovación, educación | Centro |
| `ray-dalio` | Macro-inversor, ciclos deuda, orden mundial | Centro-macro |
| `joseph-stiglitz` | Fallas de mercado, progresismo, Nobel | Centro-izquierda |
| `thomas-piketty` | Desigualdad, r>g, impuestos progresivos | Izquierda |
| `unicornios-latam` | Panel 10 fundadores de unicornios LATAM | Emprendedor |
| `tech-giants` | Panel 10 CEOs/CTOs de Big Tech global | Corporativo-tech |
| `venture-capital` | Panel 10 VCs globales (YC, Sequoia, SoftBank, etc.) | Inversor |
| `gerver-torres` | Economía Social de Mercado, ordoliberal, privatización inclusiva | Centro-pragmático |
| `freddy-vega` | EdTech, economía digital, educación como motor, Platzi | Emprendedor-tech |

### Evaluación multi-AI (`skills/evaluate.sh`)

Un solo comando envía cualquier skill + sección del plan a **7 IAs de frontera** en paralelo vía [OpenRouter](https://openrouter.ai/):

```bash
export OPENROUTER_API_KEY="sk-or-..."
./skills/evaluate.sh perspectives/milei docs/07-ejecucion/el-sueno.md
```

| Modelo | ID OpenRouter |
|--------|---------------|
| GPT-5.2 Pro | `openai/gpt-5.2-pro` |
| Claude Opus 4.6 | `anthropic/claude-opus-4.6` |
| Gemini 3.1 Pro | `google/gemini-3.1-pro-preview` |
| DeepSeek V3.2 | `deepseek/deepseek-v3.2-speciale` |
| Grok 4.20 | `x-ai/grok-4.20-beta` |
| Qwen 3.5 397B | `qwen/qwen3.5-397b-a17b` |
| Mistral Large | `mistralai/mistral-large-2512` |

Resultados en `skills/evaluations/`. Formato universal: cualquier IDE/LLM puede leer los skills.

### Investigación
- `deep-research` — Research multi-fuente
- `market-research` — Análisis de mercado y competencia
- `search-first` — Research antes de codificar

### Startup / negocio
- `startup-financial-modeling` — Proyecciones financieras
- `startup-metrics-framework` — Métricas SaaS/startup
- `startup-business-models` — Modelos de negocio
- `startup-competitive-analysis` — Análisis competitivo
- `startup-trend-prediction` — Predicción de tendencias
- `ai-startup-strategist` — Estrategia de startup IA

### Contenido y marketing
- `tiktok-marketing` — Estrategia TikTok
- `tiktok-captions` — Captions virales
- `create-promo-video` — Guiones de video promocional
- `ai-social-media-content` — Contenido para redes
- `instagram-research` — Tendencias Instagram
- `multi-platform-format-adapter` — Adaptar a múltiples plataformas
- `copywriting` — Copy de marketing
- `humanizer` — Eliminar señales de texto IA

### Técnico
- `mermaid-diagrams` — Gráficos Mermaid
- `audit-website` — Auditoría web
- `coding-standards` — Estándares de código
- `verification-loop` — Verificación de sesión

### Reglas activas (.claude/rules/)
- `git-workflow.md` — Formato de commits y PRs
- `development-workflow.md` — Pipeline de desarrollo
- `performance.md` — Optimización de modelos y contexto
- `agents.md` — Orquestación de agentes

## Qué NO hacer (anti-patterns)

- **No agregar secciones sin pasar el gate de viabilidad**
- **No cambiar el precio base** sin consenso y sin actualizar TODAS las proyecciones dependientes
- **No inventar datos** — si no hay fuente, se marca como pendiente
- **No posicionar al petróleo como el negocio** — es el combustible
- **No crear dependencia del gobierno** — el Pre-Seed arranca sin gobierno
- **No agregar burocracia** — si la solución requiere un ministerio nuevo, replantear
- **No hacer propaganda** — ni a favor ni en contra de ningún político
- **No romper el build** — `npm run build` debe pasar antes de hacer PR

<!-- GSD:project-start source:PROJECT.md -->
## Project

**Venezuela S.A. — PWA Ciudadana**

Un libro interactivo en formato PWA mobile-first que reemplaza el sitio Docusaurus actual de Venezuela S.A. El plan se lee como un libro donde cada párrafo es comentable (estilo Medium), votable (acuerdo/desacuerdo) y compartible (deep links + image cards para redes sociales). Dashboards interactivos, simuladores y calculadoras están embebidos en el texto. Dos experiencias en una sola app vía toggle: ciudadanos venezolanos (español) e inversionistas (inglés, pitch interactivo). Supabase como backend para la capa social (comentarios, votos). Datos de dashboards en JSON/YAML estáticos. Contenido en markdown.

**Core Value:** Un ciudadano venezolano con un teléfono Android de gama baja y conexión intermitente puede instalar la app, explorar el plan completo offline, simular su FCV personal y entender exactamente a dónde va cada dólar del petróleo.

### Constraints

- **Markdown source of truth**: Todo el contenido debe seguir viviendo en archivos markdown editables. La app renderiza markdown, no lo reemplaza.
- **Supabase para capa social**: Comentarios, votos y analytics vía Supabase. Dashboards y contenido son estáticos (JSON/YAML). Deploy: Cloudflare Pages (estáticos) + Supabase (social).
- **Performance budget**: First Contentful Paint < 2s en 3G, bundle JS < 200KB gzipped para la carga inicial.
- **Offline-first**: Service worker cachea todo el contenido y datos. La app es funcional sin conexión.
- **Fuentes verificables**: Toda data en los dashboards debe mantener la trazabilidad a la fuente original (organización + fecha + URL), igual que en el plan actual.
- **Los 5 principios inviolables**: El contenido migrado debe mantener los principios del CLAUDE.md — cero datos inventados, precio base $60, timeline Rystad, apartidista.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- JavaScript (ES Modules) — All frontend components, pages, and configuration (`src/`, `docusaurus.config.js`, `sidebars.js`)
- TypeScript — Supabase Edge Functions (`supabase/functions/ai-chat/index.ts`), runs on Deno
- SQL (PostgreSQL) — Database schema and migrations (`supabase/migration.sql`, `supabase/migration-v2-suggestions.sql`, `supabase/migration-v3-analytics.sql`)
- Bash — Tooling scripts (`scripts/quality-gate.sh`, `skills/evaluate.sh`)
- Markdown — Documentation corpus (`docs/`, `i18n/`, 85+ source documents)
## Runtime
- Node.js 22 (pinned in CI via `.github/workflows/deploy.yml` `node-version: 22`)
- Deno (Supabase Edge Functions runtime, no version pinned locally)
- npm
- Lockfile: `package-lock.json` present (lockfileVersion 3)
- `postinstall` script runs `patch-package` automatically
## Frameworks
- Docusaurus v3 (`@docusaurus/core ^3.0.0`) — Static site generator, content framework, routing
- React 18 (`react ^18.2.0`) — UI component layer
- MDX v3 (`@mdx-js/react ^3.0.0`) — Markdown-with-React support (configured as plain `md` format in practice)
- Not detected — no test framework configured, no test files found
- Docusaurus CLI — `npm run start` (dev), `npm run build` (production static build)
- `patch-package ^8.0.1` — Patches `docusaurus-graph` via `patches/docusaurus-graph+2.0.0.patch`
## Key Dependencies
- `@docusaurus/core ^3.0.0` — Core site framework; all routing, build, and plugin orchestration
- `@docusaurus/preset-classic ^3.0.0` — Docs, sitemap, and theme in one preset
- `@supabase/supabase-js ^2.99.2` — Database client used for auth, comments, reactions, suggestions, and analytics
- `@mlc-ai/web-llm ^0.2.82` — In-browser LLM inference via WebGPU (model: `Llama-3.2-1B-Instruct-q4f16_1-MLC`); lazy-loaded on demand
- `@docusaurus/theme-mermaid ^3.9.2` — Mermaid diagram rendering (enabled via `markdown.mermaid: true`)
- `@cmfcmf/docusaurus-search-local ^2.0.1` — Offline, bilingual (es/en) full-text search with no external service
- `@docusaurus/plugin-pwa ^3.9.2` — Progressive Web App support with offline mode
- `@docusaurus/plugin-ideal-image ^3.9.2` — Responsive image optimization
- `docusaurus-graph ^2.0.0` — Knowledge graph visualization (patched via `patches/`)
- `@coffeecup_tech/docusaurus-plugin-structured-data ^1.0.2` — JSON-LD structured data for SEO
- `prism-react-renderer ^2.1.0` — Code block syntax highlighting
## Configuration
- `.env` file present (never read — contains secrets). Template in `.env.example`
- Required variable: `OPENROUTER_API_KEY` — used by `scripts/quality-gate.sh` and `skills/evaluate.sh`
- Supabase connection is hardcoded as placeholder constants in `src/lib/supabase.js` — requires manual edit to deploy
- Groq API key (`GROQ_API_KEY`) is a Supabase secret injected at runtime into the Edge Function `supabase/functions/ai-chat/index.ts`
- `docusaurus.config.js` — Main config (ESM, `export default config`)
- `sidebars.js` — Sidebar structure for docs
- `markdown.format: "md"` — Disables MDX processing, plain Markdown only
- `numberPrefixParser: false` — File names with numeric prefixes not stripped
- `routeBasePath: "/"` — Docs serve at site root (no `/docs/` prefix)
- `baseUrl: "/venezuela-sa/"` — Deployed under GitHub Pages subpath
## Platform Requirements
- Node.js 22+
- npm (lockfile present — use `npm ci` for reproducible installs)
- WebGPU-capable browser for offline AI chat feature (`@mlc-ai/web-llm`)
- `jq` CLI tool — required by `scripts/quality-gate.sh`
- `curl` — required by `scripts/quality-gate.sh`
- `OPENROUTER_API_KEY` env var for quality gate script and AI evaluation tool
- GitHub Pages (static hosting at `https://venezuela-s-a.github.io/venezuela-sa/`)
- Supabase project (PostgreSQL + Auth + Edge Functions) for interactive features
- Groq API key configured as Supabase secret for Edge Function AI chat
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Language and Module System
## Naming Patterns
- React components: PascalCase matching the default export — `AIChatWidget.js`, `ReactionBar.js`, `StatsPanel.js`
- Context providers: PascalCase — `AuthContext.js`
- Utility/service modules: camelCase — `supabase.js`, `offlineAI.js`
- Data modules: camelCase — `evaluations.js`, `faq.js`
- Pages: camelCase matching the route — `simulador.js`, `evaluacion.js`, `sugerencias.js`
- Event handlers: `handle` prefix — `handleSend`, `handleReaction`, `handleAuth`, `handleDelete`, `handleSubmit`
- Data fetchers: `fetch` prefix — `fetchComments`, `fetchReactions`, `fetchProfile`, `fetchStats`
- Utility/pure functions: camelCase descriptive — `slugToTitle`, `slugToUrl`, `aggregateBySlug`, `formatDate`, `fmt`, `fmtUSD`, `scoreColor`, `heatColor`
- Boolean accessors: `is` prefix — `isConfigured`, `isModelLoaded`, `isWebGPUAvailable`
- State variables: camelCase noun — `[loading, setLoading]`, `[mounted, setMounted]`, `[isOpen, setIsOpen]`
- Constants (module-level, stable): SCREAMING_SNAKE_CASE — `WELCOME_MESSAGE`, `REACTIONS`, `TABS`, `MODEL_ID`, `SYSTEM_PROMPT`
- Color palettes: single-letter object — `const C = { blue: '#1565C0', ... }`
- BEM methodology with `vsa-` namespace prefix — `vsa-chat`, `vsa-chat__header`, `vsa-chat__bubble--assistant`
- Component-scoped: `vsa-reactions`, `vsa-comments`, `vsa-stats`, `vsa-share-btn`
- Components: always `export default function ComponentName`
- Named exports for data/utilities: `export const`, `export function` from data modules (`evaluations.js`)
- Context hooks: named export `export function useAuth()`
## Component Structure Pattern
## Import Organization
- `@theme/` — Docusaurus theme components
- `@theme-original/` — Docusaurus original (for swizzled components)
- `@site/src/` — project root alias (used in theme swizzle files)
- `../` — relative imports within src/
## Error Handling
## SSR Safety
## Supabase Client Pattern
- `src/lib/supabase.js` exports `getSupabase()` and `isConfigured()`
- Every component that needs Supabase calls `getSupabase()` at the top of each operation
- Components gate their render with `if (!isConfigured()) return null`
## useCallback Pattern
## Comments
- Block separators using `// ============================================================` with ALL-CAPS label for major sections in large page files (`simulador.js`, `evaluacion.js`)
- Explain non-obvious decisions inline: `// Silenciar errores — analytics no deben romper nada`
- File-level header comment for non-component files describing purpose and setup steps
- Inline `//` for strategy steps: `// 1. Online: Groq`, `// 2. FAQ cache`, etc.
## Formatting
- Single quotes for strings in `.js` files (except `simulador.js` and `evaluacion.js` which use double quotes — inconsistency)
- 2-space indentation throughout
- Trailing commas in multi-line structures
- Arrow functions for simple callbacks, `function` declarations for named handlers inside components
## Docusaurus-Specific Conventions
- Config file: `docusaurus.config.js` uses `// @ts-check` and JSDoc type annotations (`/** @type {import('@docusaurus/types').Config} */`)
- `markdown.format: "md"` (not MDX) — no JSX in `.md` files
- `numberPrefixParser: false` — doc filenames use descriptive names only
- `routeBasePath: "/"` — docs at root URL
## Quality Gate
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Docusaurus v3 generates a fully static site deployed to GitHub Pages
- Supabase provides database and auth without a custom server
- Supabase Edge Functions (Deno/TypeScript) host the only server-side logic
- The React layer adds interactive features on top of rendered Markdown content
- Offline capability is baked in: PWA service worker + WebGPU-based local LLM fallback
## Layers
- Purpose: Source of truth — the actual plan text
- Location: `docs/`
- Contains: Markdown files organized by numbered thematic chapters; no MDX
- Depends on: Docusaurus build pipeline
- Used by: Docusaurus renderer, sidebar config
- Purpose: Converts Markdown + React pages into static HTML/JS bundles
- Location: `docusaurus.config.js`, `sidebars.js`
- Contains: Plugin config, theme config, sidebar tree, i18n settings
- Depends on: Content layer + component layer
- Used by: CI/CD pipeline (`npm run build`)
- Purpose: Interactive React UI injected into the static shell
- Location: `src/components/`, `src/pages/`, `src/theme/`
- Contains: Custom components, standalone pages (simulador, estadisticas, evaluacion, sugerencias), Docusaurus theme swizzles
- Depends on: Auth context, Supabase lib, data files
- Used by: Docusaurus theme rendering
- Purpose: Global auth state shared across components
- Location: `src/contexts/AuthContext.js`
- Contains: React Context + useReducer pattern wrapping Supabase auth
- Depends on: `src/lib/supabase.js`
- Used by: `ReactionBar`, `CommentSection`, `SuggestionSection`, `StatsPanel`
- Purpose: Singleton client for Supabase; graceful no-op when unconfigured
- Location: `src/lib/supabase.js`
- Contains: `getSupabase()` (lazy singleton), `isConfigured()` guard
- Depends on: `@supabase/supabase-js`, environment-baked URL/anon key
- Used by: All interactive components and the AnalyticsTracker
- Purpose: Client-side data not requiring a database
- Location: `src/data/`
- Contains: `evaluations.js` (score history, 65 perspectives metadata), `faq.js` (FAQ for offline chat)
- Depends on: Nothing external
- Used by: `/evaluacion` page, AI chat widget offline fallback
- Purpose: Browser-native LLM for fully offline chat
- Location: `src/lib/offlineAI.js`
- Contains: WebGPU detection, `@mlc-ai/web-llm` engine management, `loadModel()`, `chat()`
- Depends on: `@mlc-ai/web-llm` (lazy dynamic import, ~700MB download on first use)
- Used by: `AIChatWidget` (tertiary fallback after Groq and FAQ)
- Purpose: Server-side AI proxy — keeps Groq API key out of the browser
- Location: `supabase/functions/ai-chat/index.ts`
- Contains: Deno `serve()` handler, Groq API call using `llama-3.3-70b-versatile`, CORS headers
- Depends on: `GROQ_API_KEY` Supabase secret
- Used by: `AIChatWidget.tryOnline()`
- Purpose: Persistent storage for user-generated content and analytics
- Location: `supabase/migration.sql`, `supabase/migration-v2-suggestions.sql`, `supabase/migration-v3-analytics.sql`
- Contains: Tables `profiles`, `comments`, `reactions`, `suggestions`, `page_views`; RLS policies on all tables
- Depends on: Supabase PostgreSQL (hosted)
- Used by: All interactive components via `getSupabase()`
## Data Flow
- No global state manager (no Redux/Zustand). Auth is the only global state, via React Context
- Component-local `useState` for all other UI state (reactions, comments, chat messages)
- Supabase is the source of truth for all persistent state
## Key Abstractions
- Purpose: Lazy Supabase client, returns `null` when unconfigured (dev without credentials)
- Examples: `src/lib/supabase.js`
- Pattern: Every component checks `isConfigured()` or nullchecks `getSupabase()` before any DB call. This makes all interactive features gracefully degrade to read-only.
- Purpose: Composites all per-page interactive widgets (reactions, suggestions, comments, share, export)
- Examples: `src/components/InteractiveFooter.js`
- Pattern: Injected into every doc page via Docusaurus layout swizzle — zero per-doc configuration needed
- Purpose: Stable identifier derived from URL pathname used as the foreign key across all user-generated content tables
- Pattern: `pathname.replace('/venezuela-sa/', '').replace(/\/$/, '') || 'home'` — computed identically in every component that touches Supabase
- Purpose: AI prompt library for domain experts and ideological perspectives used to evaluate plan sections
- Examples: `skills/experts/`, `skills/perspectives/`
- Pattern: Each skill is a standalone Markdown prompt file. `skills/evaluate.sh` and `skills/evaluate-full.sh` send any skill + doc section to multiple AI APIs in parallel via OpenRouter. Not part of the runtime site.
- Purpose: Automated guardrail that rejects git commits/PRs that would lower the plan's score below 7.4/10
- Examples: `scripts/quality-gate.sh`, `.github/workflows/quality-gate.yml`
- Pattern: Shell script calls OpenRouter API with a structured prompt, parses JSON verdict, exits non-zero on FAIL
## Entry Points
- Location: `docusaurus.config.js`
- Triggers: `npm run build` / `npm start`
- Responsibilities: Wires plugins, themes, i18n, presets, navbar, sidebar path
- Location: `src/theme/Root.js`
- Triggers: Every page load in the browser
- Responsibilities: Wraps all pages in `AuthProvider`, mounts `AnalyticsTracker` and `AIChatWidget` globally
- Location: `src/theme/DocItem/Layout/index.js`
- Triggers: Every documentation page render
- Responsibilities: Appends `InteractiveFooter` after Docusaurus's default doc layout
- Location: `sidebars.js`
- Triggers: Docusaurus build
- Responsibilities: Defines the full navigation tree; adding a new doc requires a manual entry here
- Location: `supabase/functions/ai-chat/index.ts`
- Triggers: HTTP POST from `AIChatWidget.tryOnline()` via `supabase.functions.invoke()`
- Responsibilities: CORS, Groq API proxy, error handling
## Error Handling
- `getSupabase()` returns `null` when URL contains placeholder; all callers nullcheck before use
- `AnalyticsTracker` wraps Supabase calls in `try/catch` with empty catch blocks (analytics never throw)
- `AIChatWidget` has a three-tier fallback: Groq → FAQ → WebLLM → static error message
- Edge Function returns structured `{ error }` JSON with appropriate HTTP status codes; widget surfaces these as inline error text
- `quality-gate.sh` exits 0 (allow commit) on API errors to avoid blocking contributors when the gate itself fails
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
