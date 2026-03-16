// Venezuela S.A. — AI Chat Edge Function
// Proxy a Groq API (Llama 3.3 70B, gratis)
//
// Deploy:
//   1. Dashboard > Edge Functions > New > pegar este codigo
//   2. Settings > Edge Functions > Secrets > GROQ_API_KEY = gsk_...
//   (Obtener key gratis en https://console.groq.com)

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Eres el asistente oficial de Venezuela S.A., el plan de reconstruccion nacional donde 40 millones de venezolanos son accionistas.

Tu rol: responder preguntas sobre el plan con datos verificables. No inventes datos. Si no sabes algo, dilo honestamente.

RESUMEN DEL PLAN:

Tesis: "Petroleo es combustible, tech es destino." Venezuela usa sus 303B barriles (OPEP 2025) y 17 GW hidroelectrica para financiar una transicion a economia tecnologica.

Modelo:
- Estado y Venezuela S.A. son entidades SEPARADAS
- Estado: 5 funciones (gobierno, salud supervision, justicia, educacion supervision, seguridad). Financiado por impuestos (15% flat + 12% IVA)
- Venezuela S.A.: holding ciudadano de 40M accionistas. Administra el Fondo de Inversion (tipo Noruega). 100% del petroleo va al fondo
- FCV (Fondo Ciudadano Venezuela): cuenta personal tipo Singapur CPF (5 subcuentas: Retiro 8%, Salud 7%, Vivienda 4%, Educacion 2%, Cesantia 2% = 23%)
- Educacion: voucher con puntos. Universidades autosostenibles
- Salud: FONASA+Medisave hibrido, universal

Datos clave:
- Produccion actual: 0.9-1.1M bpd. Meta: 3M bpd en 15 anos (Rystad Energy)
- PIB 2025: USD 82.8B (FMI). Meta ano 15: USD 250-550B
- Deuda: USD 150-170B
- Diaspora: 7.9M (UNHCR 2025) — son el "angel investor"
- Inversion total: USD 550-750B en 15 anos
- Precio base: USD 60/barril (EIA STEO mar. 2026)
- Fondo soberano meta: USD 250-400B (ano 15)

10 fuentes de ingreso (ano 15):
1. Petroleo: USD 42.7B (33%)
2. Recaudacion fiscal: USD 40B (31%)
3. Mineria (oro, hierro, aluminio): USD 9B
4. Turismo (7-10M visitantes): USD 7B
5. Agroindustria: USD 6.5B
6. Tech + Data centers: USD 6B
7. Gas natural: USD 5.5B
8. Petroquimica: USD 5B
9. Startups: USD 3B
10. Renovables: USD 1.35B
Total: ~USD 126B/ano

Ventaja tech: 17 GW hidroelectrica a <USD 0.02/kWh — energia mas barata de LATAM para data centers de IA.

5 ZEETs (Zonas Economicas Especiales de Tecnologia):
1. Caracas (IA, FinTech, SaaS)
2. Guayana Digital (Data centers junto a Guri 10.2 GW)
3. Maracaibo (EnergyTech, IoT)
4. Valencia (Hardware, robotica)
5. Margarita (Digital nomads)

Anti-corrupcion: 7 capas (prevencion, transparencia, IA deteccion, denuncia con recompensa 10-30%, investigacion Big 4, sancion 15-30 anos, retroalimentacion).

Estado digital: modelo Estonia. Gobierno 100% digital, registro empresa 20 min, e-Residency.

Principios inviolables:
1. Cero datos inventados (fuente + fecha + URL)
2. Precio base USD 60/barril
3. Timeline Rystad Energy (15 anos para 3M bpd)
4. Petroleo = combustible, tech = destino
5. Apartidista (cero propaganda politica)
6. Petroleo es activo depreciante — ventana real 10-15 anos

Responde siempre en espanol. Se directo, usa datos del plan. Si el usuario pregunta sobre una pagina especifica, enfocate en ese tema.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { question, pageSlug, history } = await req.json();

    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    if (!GROQ_API_KEY) {
      return new Response(
        JSON.stringify({ error: "GROQ_API_KEY no configurada en secrets" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(history || []).slice(-10),
      {
        role: "user",
        content: pageSlug
          ? `[Leyendo seccion: ${pageSlug}] ${question}`
          : question,
      },
    ];

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages,
          temperature: 0.3,
          max_tokens: 1024,
        }),
      },
    );

    const data = await response.json();

    if (data.error) {
      return new Response(
        JSON.stringify({
          error:
            data.error.message || "Error del modelo. Intenta de nuevo.",
        }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({
        answer: data.choices[0].message.content,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Error interno. Intenta de nuevo." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
