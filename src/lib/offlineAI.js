// Venezuela S.A. — WebLLM offline AI service
// Carga un modelo pequeno en el browser via WebGPU
// Solo se descarga cuando el usuario lo solicita

const MODEL_ID = 'Llama-3.2-1B-Instruct-q4f16_1-MLC';

const SYSTEM_PROMPT = `Eres el asistente de Venezuela S.A., plan de reconstruccion nacional (40M accionistas).
Datos clave: 303B barriles petroleo, 17 GW hidroelectrica, PIB USD 82.8B, meta USD 250-550B en 15 anos.
Modelo: Estado (impuestos) separado de Venezuela S.A. (holding ciudadano, fondo soberano tipo Noruega).
10 fuentes de ingreso, petroleo baja de 95% a 33%. Tech es el destino, petroleo es combustible.
Responde en espanol, breve y con datos. Si no sabes, dilo.`;

let engine = null;
let loadingProgress = null;

export function isWebGPUAvailable() {
  return typeof navigator !== 'undefined' && 'gpu' in navigator;
}

export function isModelLoaded() {
  return engine !== null;
}

export function getLoadingProgress() {
  return loadingProgress;
}

export async function loadModel(onProgress) {
  if (engine) return engine;
  if (!isWebGPUAvailable()) {
    throw new Error('WebGPU no disponible en este navegador');
  }

  const webllm = await import('@mlc-ai/web-llm');

  engine = await webllm.CreateMLCEngine(MODEL_ID, {
    initProgressCallback: (progress) => {
      loadingProgress = progress;
      if (onProgress) onProgress(progress);
    },
  });

  return engine;
}

export async function chat(question, pageSlug) {
  if (!engine) {
    throw new Error('Modelo no cargado. Llama loadModel() primero.');
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: pageSlug
        ? `[Seccion: ${pageSlug}] ${question}`
        : question,
    },
  ];

  const reply = await engine.chat.completions.create({
    messages,
    temperature: 0.3,
    max_tokens: 512,
  });

  return reply.choices[0].message.content;
}

export async function unloadModel() {
  if (engine) {
    await engine.unload();
    engine = null;
    loadingProgress = null;
  }
}
