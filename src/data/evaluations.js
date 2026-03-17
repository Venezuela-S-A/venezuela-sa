// Venezuela S.A. — Datos de evaluacion de las 45 perspectivas
// Score actual: 8.0/10 (45 perspectivas)
// Fuente: skills/evaluations/

export const OVERALL_SCORE = 8.0;
export const TOTAL_PERSPECTIVES = 45;

export const SCORE_HISTORY = [
  { eval: 1, score: 6.2, perspectives: 7, label: "Eval 1" },
  { eval: 2, score: 6.8, perspectives: 14, label: "Eval 2" },
  { eval: 3, score: 7.0, perspectives: 19, label: "Eval 3" },
  { eval: 4, score: 7.4, perspectives: 21, label: "Eval 4" },
  { eval: 5, score: 7.5, perspectives: 24, label: "Eval 5" },
  { eval: 6, score: 7.7, perspectives: 28, label: "Eval 6" },
  { eval: 7, score: 7.7, perspectives: 45, label: "Eval 7" },
  { eval: 8, score: 8.0, perspectives: 45, label: "Eval 8" },
];

export const SPECTRUM_LABELS = {
  derecha: "Derecha",
  "centro-derecha": "Centro-Derecha",
  centro: "Centro",
  "centro-izquierda": "Centro-Izquierda",
  izquierda: "Izquierda",
  inversor: "Inversor/Tech",
  ejecutor: "Equipo Ejecutor",
  estrategico: "Estrategico",
  "persona-real": "Perfiles de Referencia",
};

export const SPECTRUM_COLORS = {
  derecha: "#C62828",
  "centro-derecha": "#E57373",
  centro: "#0D47A1",
  "centro-izquierda": "#7986CB",
  izquierda: "#9C27B0",
  inversor: "#F9A825",
  ejecutor: "#00897B",
  estrategico: "#607D8B",
  "persona-real": "#8D6E63",
};

export const SECTION_LABELS = {
  "motor-financiero": "Motor Financiero",
  gobernanza: "Gobernanza",
  seguridad: "Seguridad",
  transformacion: "Transformacion",
  ciudadanos: "Ciudadanos",
  infraestructura: "Infraestructura",
  "estado-digital": "Estado Digital",
  ejecucion: "Ejecucion",
  pitch: "Pitch / Inversores",
  geopolitica: "Geopolitica",
  deuda: "Deuda",
  educacion: "Educacion",
  "fondo-soberano": "Fondo Soberano",
  fiscal: "Fiscal",
  petroleo: "Petroleo",
  cuba: "Cuba",
  china: "China",
  ddr: "DDR / Reforma Policial",
  "tech-hubs": "Tech Hubs",
  diversificacion: "Diversificacion",
};

export const PERSPECTIVES = [
  // --- Derecha ---
  {
    id: "milei",
    name: "Javier Milei",
    spectrum: "derecha",
    score: 6.2,
    tag: "Libertario radical",
    type: "ideological",
    skillFile: "perspectives/milei.md",
    sections: ["motor-financiero", "gobernanza", "fiscal", "fondo-soberano"],
    topValuation: "Vouchers, Estado minimo",
    mainCritique: "FCV obligatorio = coercion",
  },
  {
    id: "austrian",
    name: "Escuela Austriaca",
    spectrum: "derecha",
    score: 6.5,
    tag: "Mises/Hayek/Rothbard",
    type: "ideological",
    skillFile: "perspectives/austrian-school.md",
    sections: ["motor-financiero", "gobernanza", "fiscal", "fondo-soberano"],
    topValuation: "Competencia escolar, flat tax",
    mainCritique: "Porcentajes fijos = planificador central",
  },
  {
    id: "elon-musk",
    name: "Elon Musk",
    spectrum: "derecha",
    score: 7.0,
    tag: "Tech disruptor",
    type: "ideological",
    skillFile: "perspectives/elon-musk.md",
    sections: [
      "estado-digital",
      "tech-hubs",
      "infraestructura",
      "transformacion",
    ],
    topValuation: "FCV como app, digital-first",
    mainCritique: "Ministerio digital insuficiente",
  },

  // --- Centro-Derecha ---
  {
    id: "rallo",
    name: "Juan Ramon Rallo",
    spectrum: "centro-derecha",
    score: 7.5,
    tag: "Liberal pragmatico",
    type: "ideological",
    skillFile: "perspectives/juan-ramon-rallo.md",
    sections: ["motor-financiero", "gobernanza", "fiscal", "deuda"],
    topValuation: "Secuencia honesta",
    mainCritique: "Ratio 1:151 agresivo",
  },
  {
    id: "rubio",
    name: "Marco Rubio",
    spectrum: "centro-derecha",
    score: 7.0,
    tag: "Geopolitica EE.UU.",
    type: "ideological",
    skillFile: "perspectives/marco-rubio.md",
    sections: ["geopolitica", "seguridad", "petroleo", "cuba"],
    topValuation: "Separacion petroleo/Estado",
    mainCritique: "Asume Estado que no existe",
  },
  {
    id: "bukele",
    name: "Nayib Bukele",
    spectrum: "centro-derecha",
    score: 7.4,
    tag: "Transformacion rapida",
    type: "ideological",
    skillFile: "perspectives/nayib-bukele.md",
    sections: ["gobernanza", "seguridad", "ddr", "estado-digital"],
    topValuation: "34 a 10 ministerios",
    mainCritique: "Demasiado gradual, 90 dias impacto",
  },

  // --- Centro ---
  {
    id: "hausmann",
    name: "Ricardo Hausmann",
    spectrum: "centro",
    score: 7.5,
    tag: "Harvard/Venezuela",
    type: "ideological",
    skillFile: "perspectives/ricardo-hausmann.md",
    sections: [
      "motor-financiero",
      "diversificacion",
      "transformacion",
      "fondo-soberano",
    ],
    topValuation: "FCV = capacidades",
    mainCritique: "Falta mapa complejidad economica",
  },
  {
    id: "lky",
    name: "Lee Kuan Yew",
    spectrum: "centro",
    score: 8.2,
    tag: "Estadista pragmatico",
    type: "ideological",
    skillFile: "perspectives/lee-kuan-yew.md",
    sections: ["gobernanza", "fondo-soberano", "ciudadanos", "ejecucion"],
    topValuation: '"Reconozco mi CPF"',
    mainCritique: '"Encuentren el equipo, 8 personas, ya"',
  },
  {
    id: "mcm",
    name: "Maria Corina Machado",
    spectrum: "centro",
    score: 7.8,
    tag: "Opositora venezolana",
    type: "ideological",
    skillFile: "perspectives/maria-corina-machado.md",
    sections: ["seguridad", "ciudadanos", "gobernanza", "ejecucion"],
    topValuation: "FCV = dignidad",
    mainCritique: "Sin seguridad primero, sin plan",
  },
  {
    id: "gerver",
    name: "Gerver Torres",
    spectrum: "centro",
    score: 8.5,
    tag: "Economia Social de Mercado",
    type: "ideological",
    skillFile: "perspectives/gerver-torres.md",
    sections: [
      "gobernanza",
      "motor-financiero",
      "ciudadanos",
      "fondo-soberano",
    ],
    topValuation: "Superior a su propio libro",
    mainCritique: "Falta antimonopolio",
  },
  {
    id: "acemoglu",
    name: "Daron Acemoglu",
    spectrum: "centro",
    score: 7.5,
    tag: "Institucionalista MIT/Nobel",
    type: "ideological",
    skillFile: "perspectives/daron-acemoglu.md",
    sections: ["gobernanza", "motor-financiero", "transformacion", "ejecucion"],
    topValuation: "Instituciones inclusivas",
    mainCritique: "Implementacion sin coalicion",
  },
  {
    id: "oppenheimer",
    name: "Andres Oppenheimer",
    spectrum: "centro",
    score: 8.5,
    tag: "Periodista LATAM",
    type: "ideological",
    skillFile: "perspectives/andres-oppenheimer.md",
    sections: ["educacion", "transformacion", "tech-hubs", "ciudadanos"],
    topValuation: "Narrativa mas poderosa que lei",
    mainCritique: "Falta alma — historias reales",
  },
  {
    id: "dalio",
    name: "Ray Dalio",
    spectrum: "centro",
    score: 8.0,
    tag: "Macro-inversor",
    type: "ideological",
    skillFile: "perspectives/ray-dalio.md",
    sections: ["motor-financiero", "deuda", "fondo-soberano", "ejecucion"],
    topValuation: "Anti-ciclo populista",
    mainCritique: "Vincular reduccion a trigger empleo",
  },

  // --- Centro-Liberal ---
  {
    id: "visualpolitik",
    name: "VisualPolitik",
    spectrum: "centro",
    score: 8.5,
    tag: "Geopolitica divulgativa",
    type: "ideological",
    skillFile: "perspectives/visualpolitik.md",
    sections: ["geopolitica", "gobernanza", "petroleo", "seguridad"],
    topValuation: "Singapur tropicalizado",
    mainCritique: "Plan B si digital falla",
  },
  {
    id: "visualeconomik",
    name: "VisualEconomik",
    spectrum: "centro",
    score: 8.0,
    tag: "Economia divulgativa",
    type: "ideological",
    skillFile: "perspectives/visualeconomik.md",
    sections: [
      "motor-financiero",
      "fiscal",
      "diversificacion",
      "transformacion",
    ],
    topValuation: "Los numeros cuadran",
    mainCritique: "Cashflow primeros 36 meses falta",
  },

  // --- Centro-Izquierda / Izquierda ---
  {
    id: "stiglitz",
    name: "Joseph Stiglitz",
    spectrum: "centro-izquierda",
    score: 7.5,
    tag: "Nobel/Columbia",
    type: "ideological",
    skillFile: "perspectives/joseph-stiglitz.md",
    sections: ["motor-financiero", "ciudadanos", "fiscal", "fondo-soberano"],
    topValuation: "FCV from birth = New Deal",
    mainCritique: "Flat tax regresivo",
  },
  {
    id: "piketty",
    name: "Thomas Piketty",
    spectrum: "izquierda",
    score: 6.5,
    tag: "Desigualdad r>g",
    type: "ideological",
    skillFile: "perspectives/thomas-piketty.md",
    sections: ["motor-financiero", "ciudadanos", "fiscal", "fondo-soberano"],
    topValuation: "FCV igualitario",
    mainCritique: "Flat tax = cancer distributivo",
  },

  // --- Inversor/Tech ---
  {
    id: "tech-giants",
    name: "Tech Giants",
    spectrum: "inversor",
    score: 6.5,
    tag: "Panel 10 CEOs/CTOs",
    type: "investor",
    skillFile: "perspectives/tech-giants.md",
    sections: [
      "tech-hubs",
      "estado-digital",
      "infraestructura",
      "transformacion",
    ],
    topValuation: "Estado digital habilita inversion",
    mainCritique: "Falta ley datos, cables submarinos",
  },
  {
    id: "unicornios",
    name: "Unicornios LATAM",
    spectrum: "inversor",
    score: 7.5,
    tag: "Panel 10 fundadores",
    type: "investor",
    skillFile: "perspectives/unicornios-latam.md",
    sections: ["tech-hubs", "transformacion", "ciudadanos", "educacion"],
    topValuation: "Voucher = mercado miles millones",
    mainCritique: "Falta monotributo informales",
  },
  {
    id: "vcs",
    name: "Venture Capital",
    spectrum: "inversor",
    score: 7.3,
    tag: "Panel 10 VCs globales",
    type: "investor",
    skillFile: "perspectives/venture-capital.md",
    sections: ["pitch", "motor-financiero", "tech-hubs", "fondo-soberano"],
    topValuation: "FCV fintech USD 10-20B",
    mainCritique: "Separar FCV como entidad tech",
  },
  {
    id: "freddy-vega",
    name: "Freddy Vega",
    spectrum: "inversor",
    score: 7.5,
    tag: "EdTech/Platzi",
    type: "investor",
    skillFile: "perspectives/freddy-vega.md",
    sections: ["educacion", "tech-hubs", "transformacion", "estado-digital"],
    topValuation: "Educacion digital = motor",
    mainCritique: "Gap talento ML",
  },

  // --- Equipo Ejecutor ---
  {
    id: "cro",
    name: "CRO Deuda Soberana",
    spectrum: "ejecutor",
    score: 7.5,
    tag: "Reestructuracion",
    type: "executive",
    skillFile: "perspectives/cro-sovereign-debt.md",
    sections: ["deuda", "motor-financiero", "fiscal", "fondo-soberano"],
    topValuation: "Fiscal rating 7.5",
    mainCritique: "Forwards sobredimensionados",
  },
  {
    id: "legal-icsid",
    name: "Legal ICSID",
    spectrum: "ejecutor",
    score: 8.0,
    tag: "Arbitraje internacional",
    type: "executive",
    skillFile: "perspectives/legal-icsid.md",
    sections: ["deuda", "gobernanza", "geopolitica", "motor-financiero"],
    topValuation: "Fondo 8.0",
    mainCritique: "USD 10-20B laudos sin estrategia",
  },
  {
    id: "china",
    name: "Negociador China",
    spectrum: "ejecutor",
    score: 8.5,
    tag: "BRI/CDB bilateral",
    type: "executive",
    skillFile: "perspectives/china-negotiator.md",
    sections: ["china", "deuda", "geopolitica", "motor-financiero"],
    topValuation: "Cuba section 7.0",
    mainCritique: "No hay seccion China dedicada",
  },
  {
    id: "imf",
    name: "Representante FMI",
    spectrum: "ejecutor",
    score: 7.0,
    tag: "Multilateral/EFF",
    type: "executive",
    skillFile: "perspectives/imf-representative.md",
    sections: ["deuda", "fiscal", "motor-financiero", "fondo-soberano"],
    topValuation: "Fiscal 7.0",
    mainCritique: "Falta secuencia SMP a EFF",
  },
  {
    id: "comms",
    name: "Director Comms",
    spectrum: "ejecutor",
    score: 7.0,
    tag: "Crisis communications",
    type: "executive",
    skillFile: "perspectives/comms-restructuring.md",
    sections: ["pitch", "ejecucion", "ciudadanos", "gobernanza"],
    topValuation: "Intro 8.0",
    mainCritique: "Pitch deck 6.5",
  },

  // --- Estrategico ---
  {
    id: "us-china",
    name: "Estratega EE.UU.-China",
    spectrum: "estrategico",
    score: 7.5,
    tag: "CSIS competencia",
    type: "strategic",
    skillFile: "perspectives/us-china-strategist.md",
    sections: ["geopolitica", "china", "petroleo", "seguridad"],
    topValuation: "Alineamiento geopolitico",
    mainCritique: "Riesgo dependencia unipolar",
  },
  {
    id: "security-ddr",
    name: "Experto Seguridad/DDR",
    spectrum: "estrategico",
    score: 7.4,
    tag: "DDR post-conflicto",
    type: "strategic",
    skillFile: "perspectives/security-ddr-expert.md",
    sections: ["seguridad", "ddr", "gobernanza", "ejecucion"],
    topValuation: "Georgia model aplicable",
    mainCritique: "Costear 3 opciones desplazados",
  },

  // --- Perfiles de Referencia (persona-real) ---
  {
    id: "david-martinez",
    name: "David Martinez",
    spectrum: "persona-real",
    score: null,
    tag: "CRO / Distressed Debt",
    type: "person-reference",
    skillFile: "perspectives/david-martinez.md",
    sections: ["deuda", "motor-financiero"],
    topValuation: null,
    mainCritique: null,
  },
  {
    id: "martin-guzman",
    name: "Martin Guzman",
    spectrum: "persona-real",
    score: null,
    tag: "Deuda Soberana Argentina",
    type: "person-reference",
    skillFile: "perspectives/martin-guzman.md",
    sections: ["deuda", "motor-financiero", "fiscal"],
    topValuation: null,
    mainCritique: null,
  },
  {
    id: "simon-cueva",
    name: "Simon Cueva",
    spectrum: "persona-real",
    score: null,
    tag: "Reestructuracion Ecuador",
    type: "person-reference",
    skillFile: "perspectives/simon-cueva.md",
    sections: ["deuda", "motor-financiero"],
    topValuation: null,
    mainCritique: null,
  },
  {
    id: "mark-walker",
    name: "Mark Walker",
    spectrum: "persona-real",
    score: null,
    tag: "Venezuela Playbook Author",
    type: "person-reference",
    skillFile: "perspectives/mark-walker.md",
    sections: ["deuda", "geopolitica", "petroleo"],
    topValuation: null,
    mainCritique: null,
  },
  {
    id: "richard-martinez",
    name: "Richard Martinez",
    spectrum: "persona-real",
    score: null,
    tag: "Ecuador Finance / A&M",
    type: "person-reference",
    skillFile: "perspectives/richard-martinez.md",
    sections: ["deuda", "fiscal", "motor-financiero"],
    topValuation: null,
    mainCritique: null,
  },
  {
    id: "lee-buchheit",
    name: "Lee Buchheit",
    spectrum: "persona-real",
    score: null,
    tag: "CACs Inventor / Sovereign Debt",
    type: "person-reference",
    skillFile: "perspectives/lee-buchheit.md",
    sections: ["deuda", "gobernanza"],
    topValuation: null,
    mainCritique: null,
  },
  {
    id: "kenneth-figueroa",
    name: "Kenneth Figueroa",
    spectrum: "persona-real",
    score: null,
    tag: "Venezuela ICSID Defense",
    type: "person-reference",
    skillFile: "perspectives/kenneth-figueroa.md",
    sections: ["deuda", "gobernanza", "geopolitica"],
    topValuation: null,
    mainCritique: null,
  },
  {
    id: "ian-clark",
    name: "Ian Clark",
    spectrum: "persona-real",
    score: null,
    tag: "White & Case Sovereign",
    type: "person-reference",
    skillFile: "perspectives/ian-clark.md",
    sections: ["deuda", "gobernanza"],
    topValuation: null,
    mainCritique: null,
  },
  {
    id: "anna-gelpern",
    name: "Anna Gelpern",
    spectrum: "persona-real",
    score: null,
    tag: "Sovereign Debt Academic",
    type: "person-reference",
    skillFile: "perspectives/anna-gelpern.md",
    sections: ["deuda", "gobernanza", "fiscal"],
    topValuation: null,
    mainCritique: null,
  },
  {
    id: "margaret-myers",
    name: "Margaret Myers",
    spectrum: "persona-real",
    score: null,
    tag: "China-LATAM Finance",
    type: "person-reference",
    skillFile: "perspectives/margaret-myers.md",
    sections: ["china", "deuda", "geopolitica"],
    topValuation: null,
    mainCritique: null,
  },
  {
    id: "kevin-gallagher",
    name: "Kevin Gallagher",
    spectrum: "persona-real",
    score: null,
    tag: "China Triangle / BU",
    type: "person-reference",
    skillFile: "perspectives/kevin-gallagher.md",
    sections: ["china", "deuda", "geopolitica"],
    topValuation: null,
    mainCritique: null,
  },
  {
    id: "rebecca-ray",
    name: "Rebecca Ray",
    spectrum: "persona-real",
    score: null,
    tag: "China-LAC Data",
    type: "person-reference",
    skillFile: "perspectives/rebecca-ray.md",
    sections: ["china", "deuda"],
    topValuation: null,
    mainCritique: null,
  },
  {
    id: "alejandro-werner",
    name: "Alejandro Werner",
    spectrum: "persona-real",
    score: null,
    tag: "Ex-IMF WHD Director",
    type: "person-reference",
    skillFile: "perspectives/alejandro-werner.md",
    sections: ["deuda", "fiscal", "motor-financiero"],
    topValuation: null,
    mainCritique: null,
  },
  {
    id: "rodrigo-valdes",
    name: "Rodrigo Valdes",
    spectrum: "persona-real",
    score: null,
    tag: "IMF WHD Director",
    type: "person-reference",
    skillFile: "perspectives/rodrigo-valdes.md",
    sections: ["deuda", "fiscal", "motor-financiero"],
    topValuation: null,
    mainCritique: null,
  },
  {
    id: "paul-caminiti",
    name: "Paul Caminiti",
    spectrum: "persona-real",
    score: null,
    tag: "Restructuring Comms",
    type: "person-reference",
    skillFile: "perspectives/paul-caminiti.md",
    sections: ["pitch", "ejecucion", "ciudadanos"],
    topValuation: null,
    mainCritique: null,
  },
  {
    id: "kakha-bendukidze",
    name: "Kakha Bendukidze",
    spectrum: "persona-real",
    score: null,
    tag: "Georgia 2004 Reform",
    type: "person-reference",
    skillFile: "perspectives/kakha-bendukidze.md",
    sections: ["gobernanza", "estado-digital", "transformacion"],
    topValuation: null,
    mainCritique: null,
  },
  {
    id: "andres-parra-carrillo",
    name: "Andres Parra Carrillo",
    spectrum: "persona-real",
    score: null,
    tag: "Tech / Guri / FCV Fintech",
    type: "person-reference",
    skillFile: "perspectives/andres-parra-carrillo.md",
    sections: ["estado-digital", "infraestructura", "tech-hubs", "ciudadanos"],
    topValuation: null,
    mainCritique: null,
  },
];

// Scores por espectro (solo perspectivas con score)
export function getSpectrumAverages() {
  const groups = {};
  PERSPECTIVES.forEach((p) => {
    if (p.score === null) return;
    if (!groups[p.spectrum]) groups[p.spectrum] = [];
    groups[p.spectrum].push(p.score);
  });
  return Object.entries(groups).map(([spectrum, scores]) => ({
    spectrum,
    label: SPECTRUM_LABELS[spectrum] || spectrum,
    avg: +(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1),
    count: scores.length,
  }));
}

// Top y bottom (solo perspectivas con score)
export function getTopPerspectives(n = 5) {
  return [...PERSPECTIVES]
    .filter((p) => p.score !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}

export function getBottomPerspectives(n = 5) {
  return [...PERSPECTIVES]
    .filter((p) => p.score !== null)
    .sort((a, b) => a.score - b.score)
    .slice(0, n);
}

// Perspectivas que evaluan una seccion dada
export function getSectionEvaluators(sectionName) {
  return PERSPECTIVES.filter(
    (p) => p.sections && p.sections.includes(sectionName),
  );
}

// Obtener todas las secciones con sus evaluadores y promedio
export function getSectionSummaries() {
  const sectionMap = {};
  PERSPECTIVES.forEach((p) => {
    if (!p.sections) return;
    p.sections.forEach((sec) => {
      if (!sectionMap[sec]) sectionMap[sec] = [];
      sectionMap[sec].push(p);
    });
  });
  return Object.entries(sectionMap)
    .map(([section, perspectives]) => {
      const scored = perspectives.filter((p) => p.score !== null);
      const avg =
        scored.length > 0
          ? +(scored.reduce((a, b) => a + b.score, 0) / scored.length).toFixed(
              1,
            )
          : null;
      return {
        section,
        label: SECTION_LABELS[section] || section,
        perspectives,
        scoredCount: scored.length,
        totalCount: perspectives.length,
        avg,
      };
    })
    .sort((a, b) => (b.avg || 0) - (a.avg || 0));
}

// Tipos de perspectiva
export const TYPE_LABELS = {
  ideological: "Ideologica",
  investor: "Inversor",
  executive: "Ejecutor",
  strategic: "Estrategico",
  "person-reference": "Perfil de Referencia",
};
