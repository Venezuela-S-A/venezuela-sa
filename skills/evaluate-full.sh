#!/usr/bin/env bash
# ============================================================================
# evaluate-full.sh — Evaluacion completa del plan por 7 IAs de frontera
#
# Consolida cada seccion del plan y la envia a 7 modelos en paralelo.
# Total: 7 secciones x 7 modelos = 49 llamadas API.
#
# Uso:
#   source .env && ./skills/evaluate-full.sh
#
# Requisitos:
#   OPENROUTER_API_KEY configurado
# ============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_DIR="${PROJECT_DIR}/skills/evaluations/full-$(date +%Y%m%d_%H%M%S)"
API_URL="https://openrouter.ai/api/v1/chat/completions"
DOCS_DIR="${PROJECT_DIR}/docs"

# Modelos de frontera
MODELS=(
  "openai/gpt-5.2-pro"
  "anthropic/claude-opus-4-6"
  "google/gemini-3.1-pro-preview"
  "deepseek/deepseek-v3.2-speciale"
  "x-ai/grok-4.20-beta"
  "qwen/qwen3.5-397b-a17b"
  "mistralai/mistral-large-2512"
)

# Secciones del plan (parallel arrays for bash 3.2 compat)
SECTION_ORDER=(01-fundamentos 02-motor-financiero 03-ciudadanos 04-gobernanza 05-transformacion 06-realidad 07-ejecucion)
SECTION_DESCS=(
  "Fundamentos: Tesis Central, Diagnostico, Fase 0 Emergencia"
  "Motor Financiero: Forwards, Fondo Soberano, Deuda, Citgo, Inversion, Cashflow, Fiscal, Dutch Disease"
  "Ciudadanos y Diaspora: Inversion Ciudadana, Diaspora, Retorno, Los que se Quedaron"
  "Gobernanza: Anticorrupcion, Blindaje, Cuba, Sanciones, Seguridad, Justicia, Estado de Derecho, Modelo Estado"
  "Transformacion: Hubs Tech, Startups, Diversificacion, IA, Educacion, Capital Humano, Oportunidades"
  "Estado y Servicios: Digital, Infraestructura, ESG, Pensiones, Sistema Financiero"
  "Ejecucion: Timeline, Proyecciones, Riesgos, El Sueno, Equipo Ejecutor"
)

# --- Validacion ---
if [[ -z "${OPENROUTER_API_KEY:-}" ]]; then
  echo "Error: OPENROUTER_API_KEY no configurado. Ejecuta: source .env"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

NUM_SECTIONS=${#SECTION_ORDER[@]}
NUM_MODELS=${#MODELS[@]}
TOTAL=$((NUM_SECTIONS * NUM_MODELS))

echo ""
echo "========================================================"
echo "  Venezuela S.A. — Evaluacion Completa Multi-IA"
echo "========================================================"
echo "  Secciones: ${NUM_SECTIONS}"
echo "  Modelos: ${NUM_MODELS}"
echo "  Total llamadas: ${TOTAL}"
echo "  Output: $OUTPUT_DIR"
echo "========================================================"
echo ""

# System prompt para evaluacion completa
SYSTEM_PROMPT='Eres un panel de evaluacion experto en planes de reconstruccion nacional, desarrollo economico y gobernanza.

Evalua la siguiente seccion del plan "Venezuela S.A." — un plan de reconstruccion nacional que trata a Venezuela como una startup de 40 millones de accionistas. Petroleo como combustible, tecnologia como destino.

Contexto del plan:
- Reservas: 303B barriles, produccion actual 0.9-1.1M bpd, meta 3M bpd en 15 anos (Rystad Energy)
- Inversion total: USD 550-750B / 15 anos
- Precio base: USD 60/barril
- PIB actual: USD 82.8B, deuda USD 150-170B
- Diaspora: 7.9M personas
- Fondo soberano meta: USD 250-400B ano 15
- Score actual por panel de 19 perspectivas: 7.0/10
- 85+ fuentes verificables

Tu evaluacion debe incluir:

1. **Score (1-10)** para esta seccion con justificacion
2. **Fortalezas** (3-5 puntos concretos con referencia a datos del documento)
3. **Debilidades** (3-5 puntos con sugerencias especificas de mejora)
4. **Datos faltantes** — que datos verificables agregarian credibilidad
5. **Comparables internacionales** — que paises/casos son relevantes y si estan bien usados
6. **Viabilidad** (1-10) — que tan ejecutable es esta seccion en la realidad
7. **Recomendaciones** (3-5 acciones concretas priorizadas por impacto)
8. **Veredicto final** — 2-3 oraciones resumen

Se directo, especifico, y honesto. No halagues — critica constructivamente. Usa datos y fuentes cuando sea posible.'

# --- Funcion para consolidar seccion ---
consolidate_section() {
  local section="$1"
  local section_dir="${DOCS_DIR}/${section}"
  local content=""

  if [[ -d "$section_dir" ]]; then
    for f in "$section_dir"/*.md; do
      if [[ -f "$f" ]]; then
        local bname
        bname=$(basename "$f")
        # Skip evaluacion-perspectivas (es meta-evaluacion, no contenido)
        if [[ "$bname" == "evaluacion-perspectivas.md" ]]; then
          continue
        fi
        content="${content}
=== $(basename "$f" .md) ===

$(cat "$f")

"
      fi
    done
  fi
  echo "$content"
}

# --- Funcion para llamar a un modelo ---
call_model() {
  local model="$1"
  local section="$2"
  local section_desc="$3"
  local content_file="$4"
  local model_short
  model_short=$(echo "$model" | sed 's|.*/||')
  local output_file="${OUTPUT_DIR}/${section}_${model_short}.md"

  local content
  content=$(cat "$content_file")

  # Escapar para JSON
  local system_json
  system_json=$(printf '%s' "$SYSTEM_PROMPT" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')
  local user_content="Seccion: ${section_desc}

---

${content}"
  local user_json
  user_json=$(printf '%s' "$user_content" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')

  local response
  response=$(curl -s -w "\n%{http_code}" "$API_URL" \
    -H "Authorization: Bearer ${OPENROUTER_API_KEY}" \
    -H "Content-Type: application/json" \
    -H "HTTP-Referer: https://venezuela-s-a.github.io/venezuela-sa/" \
    -H "X-Title: Venezuela S.A. Full Evaluation" \
    -d "{
      \"model\": \"${model}\",
      \"messages\": [
        {\"role\": \"system\", \"content\": ${system_json}},
        {\"role\": \"user\", \"content\": ${user_json}}
      ],
      \"temperature\": 0.3,
      \"max_tokens\": 4096
    }" 2>/dev/null)

  local http_code
  http_code=$(echo "$response" | tail -1)
  local body
  body=$(echo "$response" | sed '$d')

  if [[ "$http_code" == "200" ]]; then
    local eval_content
    eval_content=$(echo "$body" | python3 -c "
import json, sys
data = json.load(sys.stdin)
print(data.get('choices', [{}])[0].get('message', {}).get('content', 'ERROR: No content'))
" 2>/dev/null)

    cat > "$output_file" <<EVALEOF
---
model: ${model}
section: ${section}
description: ${section_desc}
date: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
---

# Evaluacion: ${section_desc}
**Modelo:** ${model}
**Fecha:** $(date +"%Y-%m-%d %H:%M")

---

${eval_content}
EVALEOF

    echo "  [OK] ${section} x ${model_short}"
  else
    local err_msg
    err_msg=$(echo "$body" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('error',{}).get('message','HTTP ${http_code}'))" 2>/dev/null || echo "HTTP ${http_code}")
    echo "  [FAIL] ${section} x ${model_short}: ${err_msg}"
  fi
}

# --- Ejecutar por seccion ---
total_calls=0
i=0
for section in "${SECTION_ORDER[@]}"; do
  desc="${SECTION_DESCS[$i]}"
  echo "--- ${desc} ---"

  # Consolidar contenido de la seccion a un archivo temporal
  tmp_content=$(mktemp)
  consolidate_section "$section" > "$tmp_content"

  # Verificar que hay contenido
  if [[ ! -s "$tmp_content" ]]; then
    echo "  [SKIP] Sin contenido"
    rm -f "$tmp_content"
    i=$((i + 1))
    continue
  fi

  # Truncar si es muy largo (max ~30K chars para no exceder contexto)
  content_len=$(wc -c < "$tmp_content" | tr -d ' ')
  if [[ $content_len -gt 30000 ]]; then
    head -c 30000 "$tmp_content" > "${tmp_content}.trunc"
    echo "" >> "${tmp_content}.trunc"
    echo "[... TRUNCADO a 30K caracteres. Total original: ${content_len} chars ...]" >> "${tmp_content}.trunc"
    mv "${tmp_content}.trunc" "$tmp_content"
    echo "  [WARN] Contenido truncado de ${content_len} a 30K chars"
  fi

  # Lanzar 7 modelos en paralelo para esta seccion
  pids=()
  for model in "${MODELS[@]}"; do
    call_model "$model" "$section" "$desc" "$tmp_content" &
    pids+=($!)
    total_calls=$((total_calls + 1))
  done

  # Esperar que terminen todos los de esta seccion antes de la siguiente
  for pid in "${pids[@]}"; do
    wait "$pid" 2>/dev/null || true
  done

  rm -f "$tmp_content"
  echo ""
  i=$((i + 1))
done

echo "========================================================"
echo "  Evaluacion completa"
echo "  Total llamadas: ${total_calls}"
echo "  Resultados en: ${OUTPUT_DIR}/"
echo "========================================================"
echo ""

# Generar resumen
SUMMARY_FILE="${OUTPUT_DIR}/RESUMEN.md"
{
  echo "# Resumen — Evaluacion Completa Multi-IA"
  echo ""
  echo "**Fecha:** $(date +"%Y-%m-%d %H:%M")"
  echo "**Modelos:** ${NUM_MODELS}"
  echo "**Secciones:** ${NUM_SECTIONS}"
  echo ""
  echo "## Resultados por Seccion"
  echo ""

  i=0
  for section in "${SECTION_ORDER[@]}"; do
    desc="${SECTION_DESCS[$i]}"
    echo "### ${desc}"
    echo ""
    echo "| Modelo | Archivo |"
    echo "|--------|---------|"
    for model in "${MODELS[@]}"; do
      model_short=$(echo "$model" | sed 's|.*/||')
      file="${section}_${model_short}.md"
      if [[ -f "${OUTPUT_DIR}/${file}" ]]; then
        echo "| ${model} | [${file}](./${file}) |"
      else
        echo "| ${model} | FALLO |"
      fi
    done
    echo ""
    i=$((i + 1))
  done
} > "$SUMMARY_FILE"

echo "Resumen: ${SUMMARY_FILE}"
echo ""
echo "Para leer todos los resultados:"
echo "  cat ${OUTPUT_DIR}/*.md"
