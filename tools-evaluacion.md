# Herramientas por Evaluar

Herramientas externas que podrían ser útiles para el proyecto. No están instaladas — se evalúan antes de integrar.

## Investigación

| Herramienta | Qué hace | Pros | Contras | URL |
|-------------|----------|------|---------|-----|
| GPT Researcher | Agente autónomo que genera reportes de 2,000+ palabras con 20+ fuentes verificadas. Busca en web, analiza documentos locales, cita inline. | Automatiza búsqueda de fuentes (alineado con "cero datos inventados"); modo deep research recursivo; exporta PDF/Word; se puede usar como MCP server o librería Python | Requiere Tavily + OpenAI API keys; dependencias pesadas (LangChain, LangGraph); riesgo de generar datos que *parecen* verificados sin serlo | https://github.com/assafelovic/gpt-researcher |

## Evaluación / Comparación de IAs

| Herramienta | Qué hace | Pros | Contras | URL |
|-------------|----------|------|---------|-----|
| OpenRouter | API unificada para 290+ modelos (GPT, Claude, Gemini, DeepSeek, etc.) | Ya integrado en `evaluate.sh`; un solo API key; precios competitivos | Dependencia de tercero; latencia variable por modelo | https://openrouter.ai/ |
| ChatArena / LMSYS | Comparación side-by-side de modelos gratis | Gratis; bueno para evaluación manual rápida | No automatizable; sin API | https://chat.lmsys.org/ |
| LiteLLM | Proxy multi-API con `batch_completion_models` | Open source; soporta todos los providers; Python nativo | Requiere configurar cada API key por separado | https://github.com/BerriAI/litellm |

## Criterios de evaluación

Antes de integrar cualquier herramienta, debe pasar:

1. **Necesidad real** — ¿Resuelve algo que no podemos hacer con lo que ya tenemos?
2. **Costo** — ¿API keys adicionales? ¿Cuánto por uso?
3. **Complejidad** — ¿Agrega dependencias pesadas al proyecto?
4. **Confiabilidad** — ¿Los datos generados son verificables o parecen verificados sin serlo?
5. **Integración** — ¿Se puede usar como herramienta externa sin contaminar el repo?
