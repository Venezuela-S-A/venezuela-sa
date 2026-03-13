#!/usr/bin/env bash
# ============================================================================
# evaluate.sh — Evalúa secciones del plan con múltiples IAs vía OpenRouter
#
# Uso:
#   ./skills/evaluate.sh <skill> <doc> [modelos]
#
# Ejemplos:
#   ./skills/evaluate.sh experts/oil-energy docs/07-ejecucion/el-sueno.md
#   ./skills/evaluate.sh perspectives/milei docs/02-motor-financiero/fondo-soberano.md
#   ./skills/evaluate.sh experts/macroeconomics docs/07-ejecucion/proyecciones.md "openai/gpt-5.2-pro,google/gemini-3.1-pro-preview"
#
# Requisitos:
#   export OPENROUTER_API_KEY="sk-or-..."   (obtener en https://openrouter.ai/keys)
#
# Modelos por defecto: Los más potentes de cada proveedor (marzo 2026)
# ============================================================================

set -euo pipefail

# --- Config ---
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_DIR="${PROJECT_DIR}/skills/evaluations"
API_URL="https://openrouter.ai/api/v1/chat/completions"

# Modelos de frontera — última generación de cada proveedor (marzo 2026)
DEFAULT_MODELS=(
  "openai/gpt-5.2-pro"                   # OpenAI GPT-5.2 Pro
  "anthropic/claude-opus-4.6"             # Anthropic Claude Opus 4.6
  "google/gemini-3.1-pro-preview"         # Google Gemini 3.1 Pro
  "deepseek/deepseek-v3.2-speciale"       # DeepSeek V3.2 Speciale
  "x-ai/grok-4.20-beta"                   # xAI Grok 4.20
  "qwen/qwen3.5-397b-a17b"               # Qwen 3.5 397B (MoE)
  "mistralai/mistral-large-2512"          # Mistral Large (2025-12)
)

# --- Validación ---
if [[ -z "${OPENROUTER_API_KEY:-}" ]]; then
  echo "❌ Error: OPENROUTER_API_KEY no está configurado."
  echo ""
  echo "1. Crea una cuenta en https://openrouter.ai/"
  echo "2. Obtén tu API key en https://openrouter.ai/keys"
  echo "3. Ejecuta: export OPENROUTER_API_KEY='sk-or-...'"
  echo ""
  echo "OpenRouter ofrece créditos gratis para empezar."
  exit 1
fi

if [[ $# -lt 2 ]]; then
  echo "Uso: $0 <skill> <doc> [modelos]"
  echo ""
  echo "  <skill>   Ruta relativa al skill (ej: experts/oil-energy)"
  echo "  <doc>     Ruta al documento a evaluar (ej: docs/07-ejecucion/el-sueno.md)"
  echo "  [modelos] Opcional: modelos separados por coma"
  echo ""
  echo "Ejemplos:"
  echo "  $0 experts/oil-energy docs/07-ejecucion/el-sueno.md"
  echo "  $0 perspectives/milei docs/02-motor-financiero/fondo-soberano.md"
  echo "  $0 experts/macroeconomics docs/07-ejecucion/proyecciones.md 'openai/gpt-4o,google/gemini-2.5-pro-preview'"
  exit 1
fi

# --- Parsear argumentos ---
SKILL_NAME="$1"
DOC_PATH="$2"

# Resolver rutas
SKILL_FILE="${SCRIPT_DIR}/${SKILL_NAME}.md"
if [[ ! -f "$SKILL_FILE" ]]; then
  SKILL_FILE="${SCRIPT_DIR}/${SKILL_NAME}"
  if [[ ! -f "$SKILL_FILE" ]]; then
    echo "❌ Skill no encontrado: ${SKILL_NAME}"
    echo "   Buscado en: ${SCRIPT_DIR}/${SKILL_NAME}.md"
    echo ""
    echo "Skills disponibles:"
    find "$SCRIPT_DIR" -name "*.md" -not -name "README.md" | sed "s|${SCRIPT_DIR}/||" | sed 's|\.md$||' | sort
    exit 1
  fi
fi

DOC_FILE="${PROJECT_DIR}/${DOC_PATH}"
if [[ ! -f "$DOC_FILE" ]]; then
  echo "❌ Documento no encontrado: ${DOC_PATH}"
  exit 1
fi

# Modelos
if [[ -n "${3:-}" ]]; then
  IFS=',' read -ra MODELS <<< "$3"
else
  MODELS=("${DEFAULT_MODELS[@]}")
fi

# --- Preparar contenido ---
SKILL_CONTENT=$(cat "$SKILL_FILE")
DOC_CONTENT=$(cat "$DOC_FILE")
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
SKILL_SHORT=$(basename "$SKILL_NAME")
DOC_SHORT=$(basename "$DOC_PATH" .md)

mkdir -p "$OUTPUT_DIR"

echo "╔══════════════════════════════════════════════════════════╗"
echo "║  Venezuela S.A. — Evaluación Multi-IA                   ║"
echo "╠══════════════════════════════════════════════════════════╣"
echo "║  Skill: $(printf '%-47s' "$SKILL_NAME") ║"
echo "║  Doc:   $(printf '%-47s' "$DOC_PATH") ║"
echo "║  Models: ${#MODELS[@]}                                            ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# --- Función para llamar a un modelo ---
call_model() {
  local model="$1"
  local model_short=$(echo "$model" | sed 's|.*/||')
  local output_file="${OUTPUT_DIR}/${TIMESTAMP}_${SKILL_SHORT}_${DOC_SHORT}_${model_short}.md"

  echo "⏳ Enviando a ${model}..."

  # Escapar contenido para JSON
  local system_json=$(printf '%s' "$SKILL_CONTENT" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')
  local user_json=$(printf '%s' "Evalúa la siguiente sección del plan Venezuela S.A. usando tu framework de análisis completo. Sé específico, usa datos, y da veredictos claros.

---

${DOC_CONTENT}" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')

  local response
  response=$(curl -s -w "\n%{http_code}" "$API_URL" \
    -H "Authorization: Bearer ${OPENROUTER_API_KEY}" \
    -H "Content-Type: application/json" \
    -H "HTTP-Referer: https://venezuela-s-a.github.io/venezuela-sa/" \
    -H "X-Title: Venezuela S.A. Plan Evaluation" \
    -d "{
      \"model\": \"${model}\",
      \"messages\": [
        {\"role\": \"system\", \"content\": ${system_json}},
        {\"role\": \"user\", \"content\": ${user_json}}
      ],
      \"temperature\": 0.3,
      \"max_tokens\": 4096
    }" 2>/dev/null)

  local http_code=$(echo "$response" | tail -1)
  local body=$(echo "$response" | sed '$d')

  if [[ "$http_code" == "200" ]]; then
    local content
    content=$(echo "$body" | python3 -c "
import json, sys
data = json.load(sys.stdin)
print(data.get('choices', [{}])[0].get('message', {}).get('content', 'ERROR: No content'))
" 2>/dev/null)

    # Guardar resultado
    cat > "$output_file" <<EVALEOF
---
model: ${model}
skill: ${SKILL_NAME}
document: ${DOC_PATH}
date: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
---

# Evaluación: ${SKILL_SHORT} → ${DOC_SHORT}
**Modelo:** ${model}
**Fecha:** $(date +"%Y-%m-%d %H:%M")

---

${content}
EVALEOF

    echo "✅ ${model_short} → ${output_file}"
  else
    echo "❌ ${model_short} — HTTP ${http_code}"
    echo "   $(echo "$body" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('error',{}).get('message','Unknown error'))" 2>/dev/null || echo "$body" | head -3)"
  fi
}

# --- Ejecutar en paralelo ---
echo "🚀 Evaluando con ${#MODELS[@]} modelos en paralelo..."
echo ""

pids=()
for model in "${MODELS[@]}"; do
  call_model "$model" &
  pids+=($!)
done

# Esperar todos
for pid in "${pids[@]}"; do
  wait "$pid" 2>/dev/null || true
done

echo ""
echo "════════════════════════════════════════════════════════════"
echo "📁 Resultados guardados en: skills/evaluations/"
echo ""
ls -1 "${OUTPUT_DIR}/${TIMESTAMP}_${SKILL_SHORT}_${DOC_SHORT}_"*.md 2>/dev/null | while read f; do
  echo "   $(basename "$f")"
done
echo ""
echo "Para comparar resultados:"
echo "   cat skills/evaluations/${TIMESTAMP}_${SKILL_SHORT}_${DOC_SHORT}_*.md"
echo "════════════════════════════════════════════════════════════"
