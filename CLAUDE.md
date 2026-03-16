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
- **El score actual es 7.4/10 (21 perspectivas). NO puede bajar.** Toda propuesta se evalúa contra este umbral.
- Si la idea es buena → se integra. Si es mala → se descarta sin rodeos. Si es mediocre → se señala qué ajustar.
- El quality gate (`scripts/quality-gate.sh`) es la última línea de defensa automática.
- **Datos > opiniones. Fuentes > intuición. Coherencia > novedad.**

## Modelo de Estado + Venezuela S.A. (referencia rápida)

| Principio | Regla |
|-----------|-------|
| **Estado ≠ Venezuela S.A.** | Son entidades SEPARADAS. El Estado regula. Venezuela S.A. (holding de 40M ciudadanos-accionistas) hace negocios |
| El Estado vive de impuestos, no de petróleo | 15% flat + 12% IVA. Petróleo → 100% al fondo soberano administrado por Venezuela S.A. |
| El Estado NO es dueño de empresas | PDVSA, CORPOELEC, CANTV, HIDROVEN → se transfieren a Venezuela S.A. como activos del holding ciudadano |
| Venezuela S.A. es accionista, no dueña | Aporta tierra + recursos + permisos como equity en JVs. Cobra regalías y dividendos. Administra el fondo soberano |
| 5 funciones del Estado: SUPERVISA, no opera | Gobierno, salud (supervisa), justicia, educación (supervisa), seguridad. Supervisión tripartita: Estado + comunidad + usuarios |
| **Fondo Ciudadano Venezuela (FCV)** | Cuenta personal unificada tipo Singapur CPF: 5 subcuentas (Retiro 8% + Salud 7% + Vivienda 4% + Educación 2% + Cesantía 2% = 23%). FCV desde nacimiento (VSA contribuye USD 150/mes por niño). NO confundir con el Fondo de Inversión Venezuela S.A. (que es el fondo colectivo de inversión tipo Noruega) |
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
├── perspectives/                 ← 9 voces ideológicas (todo el espectro)
│   ├── milei.md                  ← Libertario radical
│   ├── austrian-school.md        ← Escuela Austríaca (Mises, Hayek)
│   ├── juan-ramon-rallo.md       ← Liberal pragmático
│   ├── maria-corina-machado.md   ← Líder opositora venezolana
│   ├── ricardo-hausmann.md       ← Economista desarrollo (Harvard/Venezuela)
│   ├── lee-kuan-yew.md           ← Estadista pragmático (Singapur)
│   ├── daron-acemoglu.md         ← Institucionalista (MIT/Nobel)
│   ├── joseph-stiglitz.md        ← Progresista (Columbia/Nobel)
│   └── thomas-piketty.md         ← Desigualdad y capital (Paris)
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
