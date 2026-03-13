# Skills — Venezuela S.A.

Directorio centralizado de skills (prompts especializados) para evaluar, expandir y criticar el plan de reconstrucción nacional.

**Formato:** Cada skill es un archivo `.md` con frontmatter YAML estándar. Compatible con cualquier IDE y LLM (Claude, GPT, Gemini, DeepSeek, Llama, Qwen, Copilot, Cursor, Windsurf, etc.).

## Uso

Cada archivo `.md` contiene instrucciones completas. Para usarlo:
1. Copia el contenido del archivo como system prompt o instrucción
2. Pasa como contexto la sección del plan que deseas evaluar
3. El skill guía al LLM para producir análisis estructurado

### Evaluación automatizada con 7 IAs (un solo comando)

```bash
export OPENROUTER_API_KEY="sk-or-..."   # https://openrouter.ai/keys
./skills/evaluate.sh perspectives/milei docs/07-ejecucion/el-sueno.md
```

Envía el skill + la sección del plan a **7 modelos de frontera en paralelo** vía [OpenRouter](https://openrouter.ai/):

| Modelo | Proveedor | ID OpenRouter |
|--------|-----------|---------------|
| GPT-5.2 Pro | OpenAI | `openai/gpt-5.2-pro` |
| Claude Opus 4.6 | Anthropic | `anthropic/claude-opus-4.6` |
| Gemini 3.1 Pro | Google | `google/gemini-3.1-pro-preview` |
| DeepSeek V3.2 Speciale | DeepSeek | `deepseek/deepseek-v3.2-speciale` |
| Grok 4.20 | xAI | `x-ai/grok-4.20-beta` |
| Qwen 3.5 397B | Alibaba | `qwen/qwen3.5-397b-a17b` |
| Mistral Large | Mistral | `mistralai/mistral-large-2512` |

Resultados en `skills/evaluations/`. Para modelos específicos:
```bash
./skills/evaluate.sh experts/oil-energy docs/07-ejecucion/el-sueno.md "openai/gpt-5.2-pro,google/gemini-3.1-pro-preview"
```

### Modo manual (sin API key)

1. Abre ChatGPT, Gemini, DeepSeek, Grok en paralelo
2. Pega el contenido del skill como system prompt
3. Pega la sección del plan como mensaje
4. Compara las respuestas

**Otras herramientas:**
- **[ChatArena / LMSYS](https://chat.lmsys.org/)**: Compara modelos side-by-side gratis
- **[OpenRouter](https://openrouter.ai/)**: API unificada para 290+ modelos
- **[LiteLLM](https://github.com/BerriAI/litellm)**: Proxy multi-API
- **[TypingMind](https://www.typingmind.com/)**: UI multi-modelo

## Estructura

```
skills/
├── experts/          # 14 analistas de dominio — evalúan viabilidad técnica
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
│   ├── financial-modeling.md       # DCF, sensibilidad, auditoría financiera
│   ├── international-models.md     # 12 países referencia comparativa
│   ├── legal-corporate.md          # VIN, OFAC, ICSID, Santiago Principles
│   └── economist-latam.md          # Dutch Disease, trampa ingreso medio
│
├── perspectives/     # 16 voces — ideológicas, tech, LATAM, macro
│   ├── milei.md                  # 🟡 Libertario radical (Argentina)
│   ├── austrian-school.md        # 🟡 Escuela Austríaca (Mises, Hayek)
│   ├── elon-musk.md              # 🟡 Tech disruptor, first principles (Tesla/SpaceX)
│   ├── juan-ramon-rallo.md       # 🟡 Liberal pragmático (España)
│   ├── marco-rubio.md            # 🔵 Secretario de Estado EE.UU. (sanciones)
│   ├── nayib-bukele.md           # 🔵 Transformación rápida (El Salvador)
│   ├── visualpolitik.md          # 🔵 Geopolítica divulgativa (YouTube)
│   ├── visualeconomik.md         # 🔵 Economía divulgativa (YouTube)
│   ├── maria-corina-machado.md   # 🔵 Líder opositora (Venezuela)
│   ├── ricardo-hausmann.md       # 🔵 Economista desarrollo (Harvard/Venezuela)
│   ├── lee-kuan-yew.md           # ⚪ Estadista pragmático (Singapur)
│   ├── daron-acemoglu.md         # ⚪ Institucionalista (MIT/Nobel)
│   ├── andres-oppenheimer.md     # ⚪ Periodista LATAM, innovación
│   ├── ray-dalio.md              # ⚪ Macro-inversor, ciclos de deuda
│   ├── joseph-stiglitz.md        # 🟠 Progresista (Columbia/Nobel)
│   ├── thomas-piketty.md         # 🔴 Desigualdad y capital (Paris)
│   ├── unicornios-latam.md       # 🟢 Panel 10 fundadores unicornios LATAM
│   ├── tech-giants.md            # 🟢 Panel 10 CEOs/CTOs Big Tech global
│   └── venture-capital.md        # 🟢 Panel 10 VCs globales (YC, Sequoia, etc.)
│
├── project/          # Control de calidad del proyecto
│   ├── venezuela-s-a.md
│   └── references/
│
├── tools/            # 10 herramientas de trabajo
│   ├── deep-research.md
│   ├── market-research.md
│   ├── search-first.md
│   ├── copywriting.md
│   ├── humanizer.md
│   ├── mermaid-diagrams.md
│   ├── translation-en.md           # Traducción ES→EN profesional
│   ├── source-verification.md      # Verificación de fuentes 5 niveles
│   ├── interactive-charts.md       # D3/Plotly/Recharts para Docusaurus
│   └── ux-design.md                # UX dual audiencia
│
└── evaluate.sh       # Script: evalúa con 7 IAs de frontera en paralelo
```

## Espectro Ideológico de las Perspectivas

```
← IZQUIERDA                     CENTRO                     DERECHA →
🔴 Piketty    🟠 Stiglitz    ⚪ Acemoglu    🟡 Rallo    🟡 Milei
                              ⚪ Lee Kuan Yew 🟡 Austríaca
                              ⚪ Oppenheimer  🟡 Musk
                              ⚪ Dalio
                              🔵 Hausmann
                              🔵 MCM
                              🔵 Rubio
                              🔵 Bukele
                              🔵 VisualPolitik
                              🔵 VisualEconomik
```

**Por qué importa tener todo el espectro:** Un plan que sobrevive las críticas de Piketty Y de Milei simultáneamente es un plan robusto. Si solo resiste un lado, tiene un flanco débil.

## Formato Estándar

```yaml
---
name: Nombre del Skill
description: Qué hace en una línea
type: expert | perspective | tool | project
domain: campo específico
version: 1.0
compatible_with: [claude, gpt, gemini, deepseek, llama, qwen]
---

# Contenido del skill en markdown
```

## Panel de Expertos

Para una evaluación completa del plan, ejecuta TODOS los skills de `experts/` contra la misma sección. Cada uno dará un veredicto independiente con este formato:

```
CLAIM: [afirmación exacta del plan]
VERDICT: ✅ Verified | ⚠️ Plausible but uncertain | ❌ Unlikely | 🔍 Needs data
EVIDENCE: [datos con fuentes]
RISK: [qué puede fallar]
RECOMMENDATION: [cómo fortalecer]
```

## Panel de Perspectivas

Para una evaluación ideológica, ejecuta TODOS los skills de `perspectives/` contra la misma sección. La clave es identificar:
- **Consensos**: Si Milei Y Stiglitz están de acuerdo, probablemente es correcto
- **Conflictos**: Donde Piketty y la Escuela Austríaca chocan, ahí está la decisión política real
- **Puntos ciegos**: Lo que NADIE menciona es lo más peligroso

## Contribuir

Para agregar un nuevo skill:
1. Crea un `.md` en la subcarpeta correcta
2. Usa el formato YAML frontmatter estándar
3. Incluye: framework de evaluación, formato de salida, tono, fuentes, y advertencia
4. Abre un PR o issue
