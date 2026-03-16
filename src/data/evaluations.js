// Venezuela S.A. — Datos de evaluacion de las 28 perspectivas
// Score actual: 7.7/10 (28 perspectivas)
// Fuente: skills/evaluations/

export const OVERALL_SCORE = 7.7;
export const TOTAL_PERSPECTIVES = 28;

export const SPECTRUM_LABELS = {
  derecha: 'Derecha',
  'centro-derecha': 'Centro-Derecha',
  centro: 'Centro',
  'centro-izquierda': 'Centro-Izquierda',
  izquierda: 'Izquierda',
  inversor: 'Inversor/Tech',
  ejecutor: 'Equipo Ejecutor',
  estrategico: 'Estrategico',
};

export const PERSPECTIVES = [
  // --- Derecha ---
  { id: 'milei', name: 'Javier Milei', spectrum: 'derecha', score: 6.0, tag: 'Libertario radical', topValuation: 'Vouchers, Estado minimo', mainCritique: 'FCV obligatorio = coercion' },
  { id: 'austrian', name: 'Escuela Austriaca', spectrum: 'derecha', score: 6.5, tag: 'Mises/Hayek/Rothbard', topValuation: 'Competencia escolar, flat tax', mainCritique: 'Porcentajes fijos = planificador central' },
  { id: 'elon-musk', name: 'Elon Musk', spectrum: 'derecha', score: 7.0, tag: 'Tech disruptor', topValuation: 'FCV como app, digital-first', mainCritique: 'Ministerio digital insuficiente' },

  // --- Centro-Derecha ---
  { id: 'rallo', name: 'Juan Ramon Rallo', spectrum: 'centro-derecha', score: 7.5, tag: 'Liberal pragmatico', topValuation: 'Secuencia honesta', mainCritique: 'Ratio 1:151 agresivo' },
  { id: 'rubio', name: 'Marco Rubio', spectrum: 'centro-derecha', score: 7.0, tag: 'Geopolitica EE.UU.', topValuation: 'Separacion petroleo/Estado', mainCritique: 'Asume Estado que no existe' },
  { id: 'bukele', name: 'Nayib Bukele', spectrum: 'centro-derecha', score: 7.0, tag: 'Transformacion rapida', topValuation: '34 a 10 ministerios', mainCritique: 'Demasiado gradual, 90 dias impacto' },

  // --- Centro ---
  { id: 'hausmann', name: 'Ricardo Hausmann', spectrum: 'centro', score: 7.5, tag: 'Harvard/Venezuela', topValuation: 'FCV = capacidades', mainCritique: 'Falta mapa complejidad economica' },
  { id: 'lky', name: 'Lee Kuan Yew', spectrum: 'centro', score: 8.0, tag: 'Estadista pragmatico', topValuation: '"Reconozco mi CPF"', mainCritique: '"Encuentren el equipo, 8 personas, ya"' },
  { id: 'mcm', name: 'Maria Corina Machado', spectrum: 'centro', score: 7.5, tag: 'Opositora venezolana', topValuation: 'FCV = dignidad', mainCritique: 'Sin seguridad primero, sin plan' },
  { id: 'gerver', name: 'Gerver Torres', spectrum: 'centro', score: 8.5, tag: 'Economia Social de Mercado', topValuation: 'Superior a su propio libro', mainCritique: 'Falta antimonopolio' },
  { id: 'acemoglu', name: 'Daron Acemoglu', spectrum: 'centro', score: 7.5, tag: 'Institucionalista MIT/Nobel', topValuation: 'Instituciones inclusivas', mainCritique: 'Implementacion sin coalicion' },
  { id: 'oppenheimer', name: 'Andres Oppenheimer', spectrum: 'centro', score: 8.5, tag: 'Periodista LATAM', topValuation: 'Narrativa mas poderosa que lei', mainCritique: 'Falta alma — historias reales' },
  { id: 'dalio', name: 'Ray Dalio', spectrum: 'centro', score: 8.0, tag: 'Macro-inversor', topValuation: 'Anti-ciclo populista', mainCritique: 'Vincular reduccion a trigger empleo' },

  // --- Centro-Liberal ---
  { id: 'visualpolitik', name: 'VisualPolitik', spectrum: 'centro', score: 8.5, tag: 'Geopolitica divulgativa', topValuation: 'Singapur tropicalizado', mainCritique: 'Plan B si digital falla' },
  { id: 'visualeconomik', name: 'VisualEconomik', spectrum: 'centro', score: 8.0, tag: 'Economia divulgativa', topValuation: 'Los numeros cuadran', mainCritique: 'Cashflow primeros 36 meses falta' },

  // --- Centro-Izquierda / Izquierda ---
  { id: 'stiglitz', name: 'Joseph Stiglitz', spectrum: 'centro-izquierda', score: 7.5, tag: 'Nobel/Columbia', topValuation: 'FCV from birth = New Deal', mainCritique: 'Flat tax regresivo' },
  { id: 'piketty', name: 'Thomas Piketty', spectrum: 'izquierda', score: 6.5, tag: 'Desigualdad r>g', topValuation: 'FCV igualitario', mainCritique: 'Flat tax = cancer distributivo' },

  // --- Inversor/Tech ---
  { id: 'tech-giants', name: 'Tech Giants', spectrum: 'inversor', score: 6.5, tag: 'Panel 10 CEOs/CTOs', topValuation: 'Estado digital habilita inversion', mainCritique: 'Falta ley datos, cables submarinos' },
  { id: 'unicornios', name: 'Unicornios LATAM', spectrum: 'inversor', score: 7.5, tag: 'Panel 10 fundadores', topValuation: 'Voucher = mercado miles millones', mainCritique: 'Falta monotributo informales' },
  { id: 'vcs', name: 'Venture Capital', spectrum: 'inversor', score: 7.0, tag: 'Panel 10 VCs globales', topValuation: 'FCV fintech USD 10-20B', mainCritique: 'Separar FCV como entidad tech' },
  { id: 'freddy-vega', name: 'Freddy Vega', spectrum: 'inversor', score: 7.0, tag: 'EdTech/Platzi', topValuation: 'Educacion digital = motor', mainCritique: 'Gap talento ML' },

  // --- Equipo Ejecutor ---
  { id: 'cro', name: 'CRO Deuda Soberana', spectrum: 'ejecutor', score: 6.5, tag: 'Reestructuracion', topValuation: 'Fiscal rating 7.5', mainCritique: 'Forwards sobredimensionados' },
  { id: 'legal-icsid', name: 'Legal ICSID', spectrum: 'ejecutor', score: 7.2, tag: 'Arbitraje internacional', topValuation: 'Fondo 8.0', mainCritique: 'USD 10-20B laudos sin estrategia' },
  { id: 'china', name: 'Negociador China', spectrum: 'ejecutor', score: 5.0, tag: 'BRI/CDB bilateral', topValuation: 'Cuba section 7.0', mainCritique: 'No hay seccion China dedicada' },
  { id: 'imf', name: 'Representante FMI', spectrum: 'ejecutor', score: 6.5, tag: 'Multilateral/EFF', topValuation: 'Fiscal 7.0', mainCritique: 'Falta secuencia SMP a EFF' },
  { id: 'comms', name: 'Director Comms', spectrum: 'ejecutor', score: 7.0, tag: 'Crisis communications', topValuation: 'Intro 8.0', mainCritique: 'Pitch deck 6.5' },

  // --- Estrategico ---
  { id: 'us-china', name: 'Estratega EE.UU.-China', spectrum: 'estrategico', score: 7.0, tag: 'CSIS competencia', topValuation: 'Alineamiento geopolitico', mainCritique: 'Riesgo dependencia unipolar' },
  { id: 'security-ddr', name: 'Experto Seguridad/DDR', spectrum: 'estrategico', score: 7.0, tag: 'DDR post-conflicto', topValuation: 'Georgia model aplicable', mainCritique: 'Costear 3 opciones desplazados' },
];

// Scores por espectro
export function getSpectrumAverages() {
  const groups = {};
  PERSPECTIVES.forEach((p) => {
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

// Top y bottom
export function getTopPerspectives(n = 5) {
  return [...PERSPECTIVES].sort((a, b) => b.score - a.score).slice(0, n);
}

export function getBottomPerspectives(n = 5) {
  return [...PERSPECTIVES].sort((a, b) => a.score - b.score).slice(0, n);
}
