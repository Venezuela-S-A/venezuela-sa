// Venezuela S.A. — FAQ offline
// Respuestas pre-computadas para funcionar sin conexion

const FAQ = [
  {
    keywords: ["que es", "qué es", "venezuela sa", "plan", "proyecto"],
    q: "Que es Venezuela S.A.?",
    a: "Venezuela S.A. es un plan de reconstruccion nacional tratado como startup. 40 millones de venezolanos son accionistas. El petroleo financia la transicion, pero el destino es tecnologia. No es un plan de gobierno — es un modelo de negocio con rondas de financiamiento, metricas verificables y una tesis clara. Inversion total: USD 550-750B en 15 anos.",
  },
  {
    keywords: ["petroleo", "barril", "reservas", "crudo", "produccion"],
    q: "Cuanto petroleo tiene Venezuela?",
    a: "Venezuela tiene 303 mil millones de barriles en reservas (OPEP ASB 2025), las mayores del mundo. Produccion actual: 0.9-1.1M bpd. Meta: 3M bpd en 15 anos segun timeline de Rystad Energy. Inversion requerida: USD 183B. Precio base del plan: USD 60/barril. Pero el petroleo NO es el negocio — es el combustible. El destino es tecnologia.",
  },
  {
    keywords: [
      "dinero",
      "financiamiento",
      "fuente",
      "ingreso",
      "revenue",
      "plata",
    ],
    q: "De donde sale el dinero?",
    a: "El plan tiene 10 fuentes de ingreso al ano 15: 1) Petroleo USD 42.7B, 2) Fiscal (15% flat + 12% IVA) USD 40B, 3) Mineria USD 9B, 4) Turismo USD 7B, 5) Agroindustria USD 6.5B, 6) Tech/Data centers USD 6B, 7) Gas natural USD 5.5B, 8) Petroquimica USD 5B, 9) Startups USD 3B, 10) Renovables USD 1.35B. Total: ~USD 126B/ano. El petroleo baja de 95% a 33% de los ingresos.",
  },
  {
    keywords: ["fondo", "soberano", "inversion", "noruega", "ahorro"],
    q: "Que es el Fondo de Inversion Venezuela S.A.?",
    a: "Es un fondo soberano tipo Noruega. 100% del ingreso petrolero va al fondo — NO al gasto corriente. El Estado vive de impuestos (15% flat + 12% IVA), no de petroleo. El fondo tiene directorio con 4 de 7 miembros NO gubernamentales, auditorias Big 4, y dashboard publico trimestral. Meta ano 15: USD 250-400B. Solo se usa el 3-4% del rendimiento anual.",
  },
  {
    keywords: [
      "fcv",
      "fondo ciudadano",
      "cuenta",
      "cpf",
      "singapur",
      "retiro",
      "pension",
    ],
    q: "Que es el FCV (Fondo Ciudadano Venezuela)?",
    a: "Es una cuenta personal unificada tipo Singapur CPF con 5 subcuentas: Retiro 8% + Salud 7% + Vivienda 4% + Educacion 2% + Cesantia 2% = 23% de contribucion total. Cada venezolano tiene FCV desde nacimiento. Venezuela S.A. contribuye USD 150/mes por nino. Es tu plata, no del gobierno.",
  },
  {
    keywords: ["educacion", "colegio", "universidad", "voucher", "escuela"],
    q: "Como funciona la educacion?",
    a: "Sistema de voucher con puntos. Todo nino recibe voucher que cubre matricula + comedor + transporte + 1 deporte + 1 arte. Los colegios compiten como empresas privadas — el precio lo fija el mercado, el voucher tiene tope de puntos. Universidad: voucher por merito que se mantiene por esfuerzo (100 → 75 → 50 → 25 → pierde). Universidades publicas autosostenibles via I+D, patentes y spin-offs.",
  },
  {
    keywords: ["salud", "hospital", "medico", "fonasa", "seguro"],
    q: "Como funciona la salud?",
    a: "Modelo FONASA + Medisave hibrido, universal. El Estado supervisa y financia (no opera). Proveedores privados compiten por pacientes. Contribucion del 7% va a la subcuenta Salud del FCV. Cobertura universal — los servicios no son gratis, tienen precio reflejo del costo real + voucher para pobreza extrema.",
  },
  {
    keywords: ["estado", "gobierno", "ministerio", "separacion", "lean"],
    q: "Cual es el modelo de Estado?",
    a: "Estado y Venezuela S.A. son entidades SEPARADAS. El Estado regula 5 funciones: gobierno, salud (supervisa), justicia, educacion (supervisa), seguridad. Todo lo demas es privado. 34 ministerios se fusionan a 15. 2.5M empleados publicos bajan a 265K con paquetes de salida dignos. Presupuesto estatal: 15-19% del PIB (comparable a Singapur 17%).",
  },
  {
    keywords: ["corrupcion", "transparencia", "robo", "blindaje"],
    q: "Como se evita la corrupcion?",
    a: "Blindaje de 7 capas: 1) Prevencion (filtros digitales), 2) Transparencia (dashboard publico, blockchain), 3) Deteccion por IA (anomalias, grafos), 4) Denuncia con recompensa (10-30% de lo recuperado), 5) Investigacion independiente (Big 4), 6) Sancion (15-30 anos), 7) Retroalimentacion. Costo: <0.1% del gasto total. Precedentes: India ahorro USD 33B, Ucrania USD 6B.",
  },
  {
    keywords: [
      "socialismo",
      "comunismo",
      "capitalismo",
      "izquierda",
      "derecha",
    ],
    q: "Es esto socialismo?",
    a: "No. Es un modelo de startup donde los ciudadanos son accionistas — no beneficiarios de un Estado paternalista. El Estado NO es dueno de empresas. Venezuela S.A. (el holding ciudadano) es accionista en joint ventures, cobra regalias y dividendos. La educacion y salud son universales pero operadas por el sector privado con supervision. Es mas parecido a Singapur que a Cuba.",
  },
  {
    keywords: ["partido", "politica", "chavismo", "oposicion", "apartidista"],
    q: "Es esto de algun partido?",
    a: "No. El plan es 100% apartidista. Cero propaganda politica a favor o en contra de ningun politico. El plan sirve a ciudadanos, no a partidos. Se evalua con 64 perspectivas que van desde Milei (libertario) hasta Piketty (izquierda), pasando por Garry Tan (YC), Nandan Nilekani (Aadhaar), Marcos Galperin (MercadoLibre), y 58 mas.",
  },
  {
    keywords: ["baja", "cae", "petroleo cae", "diversificacion", "dependencia"],
    q: "Que pasa si baja el petroleo?",
    a: 'El plan tiene 10 fuentes de ingreso, no una. El petroleo pasa de 95% de ingresos hoy a 33% en el ano 15. Ademas, 100% del petroleo va al fondo soberano (no al gasto), asi que una caida no afecta el presupuesto estatal (que vive de impuestos). El principio #6 dice: "El petroleo es un activo depreciante. La ventana real es 10-15 anos." La diversificacion es paralela desde el dia 1.',
  },
  {
    keywords: ["participar", "ayudar", "contribuir", "colaborar", "como"],
    q: "Como puedo participar?",
    a: "1) Leer y cuestionar — cada critica informada mejora el plan (score actual 7.2/10 con 64 perspectivas). 2) Compartir con especialistas — economistas, abogados, ingenieros. 3) Aportar datos y fuentes — el plan tiene 85+ fuentes verificables, siempre se pueden mejorar. 4) La diaspora ES el angel investor — el modelo contempla inversion real desde USD 10 via bonos ciudadanos.",
  },
  {
    keywords: ["zeet", "zona", "tecnologia", "tech hub", "startup"],
    q: "Que son las ZEETs?",
    a: "5 Zonas Economicas Especiales de Tecnologia: 1) Caracas (IA, FinTech), 2) Guayana Digital (data centers junto a Guri), 3) Maracaibo (EnergyTech, IoT), 4) Valencia (hardware, robotica), 5) Margarita (digital nomads). 0% impuesto tech por 10 anos. Registro de empresa en 20 min. Expansion a 15 ciudades en anos 3-5, y todo el pais modelo Estonia en anos 5-7.",
  },
  {
    keywords: ["data center", "ia", "inteligencia artificial", "gpu", "nube"],
    q: "Data centers de IA en Venezuela?",
    a: "Venezuela tiene 17 GW hidroelectrica a <USD 0.02/kWh — 3-5x mas barata que Chile o Brasil. El plan propone un corredor de data centers en Guayana (junto a la represa de Guri). Fase 1: 50 MW (USD 300-500M). Fase 2: 200 MW. Fase 3: 500 MW-1 GW. Ingreso potencial: USD 1.2-2.6B/ano. El rio Caroni reduce costos de enfriamiento 40-60%.",
  },
  {
    keywords: ["deuda", "default", "bonos", "reestructuracion"],
    q: "Que pasa con la deuda?",
    a: "La deuda es USD 150-170B (Reuters/CNBC, dic. 2025). El plan separa deuda soberana de deuda de infraestructura. Venezuela S.A. emite bonos de infraestructura (deuda corporativa, NO soberana). La reestructuracion de deuda soberana es un proceso separado que requiere negociacion con acreedores bajo marco legal internacional.",
  },
  {
    keywords: ["diaspora", "emigrante", "retorno", "afuera", "exterior"],
    q: "Que papel tiene la diaspora?",
    a: '7.9 millones de venezolanos en el exterior (UNHCR, dic. 2025) son el "angel investor" del plan. El Pre-Seed arranca CON la diaspora, SIN necesitar gobierno: app diaspora, bonos ciudadanos desde USD 10, censo digital, bootcamps via Starlink. La diaspora trae capital, conocimiento de como funcionan otros paises, y red de contactos global.',
  },
  {
    keywords: ["timeline", "tiempo", "cuanto dura", "anos", "plazo"],
    q: "Cuanto dura el plan?",
    a: "El horizonte principal es 15 anos (alineado con Rystad Energy para llegar a 3M bpd). Pero tiene fases: Pre-Seed (arranca sin gobierno), Dias 1-100 (emergencia), Ano 1-3 (estabilizacion), Ano 3-7 (aceleracion), Ano 7-15 (transformacion). Las 4 lineas de trabajo (energia, educacion, seguridad, digital) corren en PARALELO, no secuencial.",
  },
  {
    keywords: ["realista", "utopia", "posible", "viable", "funciona"],
    q: "Es realista este plan?",
    a: 'El plan se evalua con 64 perspectivas y tiene score 7.2/10 (analistas 8.0, founders/VCs 6.9). Cada dato tiene fuente verificable. Los modelos de referencia son paises reales: Noruega (fondo soberano), Singapur (estado lean + CPF), Estonia (estado digital), Georgia (reforma policial), Chile (FONASA + vouchers educativos), Rwanda (reconstruccion post-conflicto). No es facil. Pero "dificil" no es "imposible".',
  },
  {
    keywords: ["mineria", "oro", "hierro", "arco minero", "mineral"],
    q: "Que pasa con la mineria?",
    a: "El Arco Minero del Orinoco tiene: oro (74.98M onzas), hierro (18,000M ton), bauxita (3,479M ton), coltan, diamantes, tierras raras, niquel. Ingreso potencial: USD 8-10B/ano. Prioridad: formalizar la mineria ilegal (USD 4.8B/ano sin control). Se necesita desplazar grupos armados y establecer operaciones formales con trazabilidad.",
  },
];

// Busqueda fuzzy simple por keywords
export function searchFAQ(query) {
  const normalized = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of FAQ) {
    let score = 0;
    for (const keyword of entry.keywords) {
      const normalizedKw = keyword
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      if (normalized.includes(normalizedKw)) {
        score += normalizedKw.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // Umbral minimo: al menos 3 caracteres de match
  if (bestScore >= 3 && bestMatch) {
    return bestMatch;
  }
  return null;
}

export default FAQ;
