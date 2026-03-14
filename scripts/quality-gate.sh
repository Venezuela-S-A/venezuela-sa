#!/usr/bin/env bash
# ============================================================
# Venezuela S.A. — Quality Gate: Evaluación de Cambios
# ============================================================
# Evalúa si un cambio propuesto es compatible con el plan.
# Umbral mínimo: 7.4/10 (score actual, no puede bajar).
#
# Uso:
#   ./scripts/quality-gate.sh                    # Evalúa staged changes
#   ./scripts/quality-gate.sh --diff "texto"     # Evalúa un diff específico
#   ./scripts/quality-gate.sh --file docs/X.md   # Evalúa un archivo específico
#
# Requiere: OPENROUTER_API_KEY en el environment
# ============================================================

set -euo pipefail

SCORE_THRESHOLD="7.4"
MODEL="${QG_MODEL:-anthropic/claude-sonnet-4}"
MAX_DIFF_LINES=500

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check API key
if [ -z "${OPENROUTER_API_KEY:-}" ]; then
  echo -e "${RED}Error: OPENROUTER_API_KEY no configurada.${NC}"
  echo "  export OPENROUTER_API_KEY='sk-or-...'"
  exit 1
fi

# Get the diff
if [ "${1:-}" = "--diff" ]; then
  DIFF="${2:-}"
elif [ "${1:-}" = "--file" ]; then
  DIFF=$(cat "${2:-}")
else
  DIFF=$(git diff --cached --no-color -- 'docs/' 'CLAUDE.md' 2>/dev/null || git diff --no-color -- 'docs/' 'CLAUDE.md' 2>/dev/null)
fi

if [ -z "$DIFF" ]; then
  echo -e "${GREEN}No hay cambios en docs/ para evaluar.${NC}"
  exit 0
fi

# Truncate if too long
DIFF_LINES=$(echo "$DIFF" | wc -l)
if [ "$DIFF_LINES" -gt "$MAX_DIFF_LINES" ]; then
  DIFF=$(echo "$DIFF" | head -n $MAX_DIFF_LINES)
  DIFF="${DIFF}\n\n[... truncado a ${MAX_DIFF_LINES} líneas de ${DIFF_LINES} totales]"
fi

echo -e "${YELLOW}🔍 Venezuela S.A. — Quality Gate (IA)${NC}"
echo "=================================="
echo -e "Modelo: ${MODEL}"
echo -e "Umbral: ${SCORE_THRESHOLD}/10"
echo -e "Líneas de diff: ${DIFF_LINES}"
echo ""

# Build the prompt
SYSTEM_PROMPT='Eres el Quality Gate del plan Venezuela S.A. Tu trabajo es evaluar si un cambio propuesto es compatible con los principios del plan y si mantiene o mejora la calidad.

PRINCIPIOS INVIOLABLES:
1. Petróleo es combustible, tech es destino
2. Precio base USD 60/barril
3. Timeline Rystad: 15 años para 3M bpd
4. Apartidista: cero propaganda
5. Estado ≠ Venezuela S.A. (separados)
6. Estado SUPERVISA, no opera (5 funciones)
7. FCV unificado: retiro 8% + salud 7% + vivienda 4% + educación 2% = 21%
8. FCV desde nacimiento (VSA USD 150/mes por niño)
9. Educación K-12: voucher con puntos (matrícula+comedor+transporte+deporte+arte)
10. Universidad: voucher por mérito (escalonado)
11. Salud: FONASA+Medisave gradual. Nadie queda fuera
12. 34→10 ministerios, 265K empleados
13. Venezuela S.A. = accionista en JVs, no dueña
14. Nada gratis — todo financiado (FCV, vouchers, tarifas)
15. Cero datos inventados. Todo con fuente

SCORE ACTUAL: 7.4/10 (20 perspectivas). NO puede bajar.

RESPONDE EN EXACTAMENTE ESTE FORMATO JSON:
{
  "compatible": true/false,
  "score_impact": "+0.X" o "-0.X" o "0" (estimación),
  "verdict": "PASS" o "FAIL" o "WARNING",
  "reason": "Explicación concisa en 1-2 oraciones",
  "violations": ["lista de principios violados, si hay"],
  "suggestions": ["mejoras sugeridas, si hay"]
}'

USER_PROMPT="Evalúa este cambio propuesto al plan Venezuela S.A.:

\`\`\`diff
${DIFF}
\`\`\`

¿Es compatible con los 15 principios? ¿Mantiene o mejora el score de 7.4/10?"

# Call the API
RESPONSE=$(curl -s -w "\n%{http_code}" "https://openrouter.ai/api/v1/chat/completions" \
  -H "Authorization: Bearer ${OPENROUTER_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "$(jq -n \
    --arg model "$MODEL" \
    --arg system "$SYSTEM_PROMPT" \
    --arg user "$USER_PROMPT" \
    '{
      model: $model,
      messages: [
        {role: "system", content: $system},
        {role: "user", content: $user}
      ],
      max_tokens: 1024,
      temperature: 0.1,
      response_format: {type: "json_object"}
    }')")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" != "200" ]; then
  echo -e "${YELLOW}⚠ API error (HTTP ${HTTP_CODE}). Permitiendo commit sin evaluación IA.${NC}"
  exit 0
fi

# Parse response
CONTENT=$(echo "$BODY" | jq -r '.choices[0].message.content // empty')
if [ -z "$CONTENT" ]; then
  echo -e "${YELLOW}⚠ Respuesta vacía. Permitiendo commit sin evaluación IA.${NC}"
  exit 0
fi

VERDICT=$(echo "$CONTENT" | jq -r '.verdict // "UNKNOWN"')
COMPATIBLE=$(echo "$CONTENT" | jq -r '.compatible // "unknown"')
SCORE_IMPACT=$(echo "$CONTENT" | jq -r '.score_impact // "0"')
REASON=$(echo "$CONTENT" | jq -r '.reason // "Sin razón"')
VIOLATIONS=$(echo "$CONTENT" | jq -r '.violations // [] | join(", ")')
SUGGESTIONS=$(echo "$CONTENT" | jq -r '.suggestions // [] | join("; ")')

# Display results
case "$VERDICT" in
  "PASS")
    echo -e "${GREEN}✅ PASS — Compatible con el plan${NC}"
    echo -e "   Impacto estimado: ${SCORE_IMPACT}"
    echo -e "   Razón: ${REASON}"
    [ -n "$SUGGESTIONS" ] && echo -e "   💡 Sugerencias: ${SUGGESTIONS}"
    exit 0
    ;;
  "WARNING")
    echo -e "${YELLOW}⚠️  WARNING — Compatible con reservas${NC}"
    echo -e "   Impacto estimado: ${SCORE_IMPACT}"
    echo -e "   Razón: ${REASON}"
    [ -n "$VIOLATIONS" ] && echo -e "   ⚠ Tensiones: ${VIOLATIONS}"
    [ -n "$SUGGESTIONS" ] && echo -e "   💡 Sugerencias: ${SUGGESTIONS}"
    exit 0
    ;;
  "FAIL")
    echo -e "${RED}❌ FAIL — Incompatible con el plan${NC}"
    echo -e "   Impacto estimado: ${SCORE_IMPACT}"
    echo -e "   Razón: ${REASON}"
    [ -n "$VIOLATIONS" ] && echo -e "   🚫 Violaciones: ${VIOLATIONS}"
    [ -n "$SUGGESTIONS" ] && echo -e "   💡 Cómo corregir: ${SUGGESTIONS}"
    echo ""
    echo -e "${RED}El cambio viola principios del plan o bajaría el score de ${SCORE_THRESHOLD}/10.${NC}"
    echo -e "Ajusta el cambio y vuelve a intentar."
    exit 1
    ;;
  *)
    echo -e "${YELLOW}⚠ Resultado no determinante: ${VERDICT}${NC}"
    echo -e "   ${REASON}"
    exit 0
    ;;
esac
