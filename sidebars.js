/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  planSidebar: [
    "intro",
    {
      type: "category",
      label: "🏗️ Fundamentos",
      items: [
        "01-fundamentos/tesis-central",
        "01-fundamentos/diagnostico",
        "01-fundamentos/fase-0-emergencia",
      ],
    },
    {
      type: "category",
      label: "⛽ Motor Financiero",
      items: [
        "02-motor-financiero/contratos-forward",
        "02-motor-financiero/fondo-soberano",
        "02-motor-financiero/deuda",
        "02-motor-financiero/inversion-inicial-fuentes",
        "02-motor-financiero/transicion-fiscal",
        "02-motor-financiero/enfermedad-holandesa",
      ],
    },
    {
      type: "category",
      label: "🤝 Ciudadanos y Diáspora",
      items: [
        "03-ciudadanos/inversion-ciudadana",
        "03-ciudadanos/diaspora",
        "03-ciudadanos/retorno-diaspora",
        "03-ciudadanos/los-que-se-quedaron",
      ],
    },
    {
      type: "category",
      label: "🛡️ Gobernanza y Seguridad",
      items: [
        "04-gobernanza/sistema-antifragil",
        "04-gobernanza/anticorrupcion-checklist",
        "04-gobernanza/geopolitica",
        "04-gobernanza/estado-derecho-moneda",
        "04-gobernanza/seguridad-fisica",
        "04-gobernanza/modelo-estado",
        "04-gobernanza/justicia-transicional",
      ],
    },
    {
      type: "category",
      label: "🚀 Transformación",
      items: [
        "05-transformacion/hubs-tech",
        "05-transformacion/startup-programs",
        "05-transformacion/diversificacion",
        "05-transformacion/impacto-ia",
        "05-transformacion/educacion",
        "05-transformacion/comercio-exterior",
        "05-transformacion/capital-humano",
        "05-transformacion/oportunidades-negocio",
      ],
    },
    {
      type: "category",
      label: "🏛️ Estado y Servicios",
      items: [
        "06-realidad/estado-digital",
        "06-realidad/servicios-publicos",
        "06-realidad/infraestructura-basica",
        "06-realidad/esg-ejecucion",
        "06-realidad/pensiones-seguridad-social",
        "06-realidad/sistema-financiero",
      ],
    },
    {
      type: "category",
      label: "📊 Ejecución y Proyecciones",
      items: [
        "07-ejecucion/timeline",
        "07-ejecucion/proyecciones",
        "07-ejecucion/riesgos",
        "07-ejecucion/el-sueno",
        "07-ejecucion/evaluacion-perspectivas",
      ],
    },
    {
      type: "category",
      label: "📎 Anexo: Para Inversionistas",
      items: [
        "08-pitch/resumen-ejecutivo",
        "08-pitch/business-model-canvas",
        "08-pitch/tam-sam-som",
        "08-pitch/yc-application",
        "08-pitch/pitch-deck",
      ],
    },
    {
      type: "category",
      label: "📎 Annex: For Investors",
      items: [
        "09-investors/executive-summary",
        "09-investors/business-model-canvas",
        "09-investors/tam-sam-som",
        "09-investors/yc-application",
        "09-investors/pitch-deck",
      ],
    },
    "referencias",
    "conclusion",
  ],
};

module.exports = sidebars;
