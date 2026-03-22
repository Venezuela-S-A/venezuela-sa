/**
 * Source type classification for inline citation badges.
 * Maps organization names to visual categories with CSS variable references.
 *
 * Per D-08/D-09: badges are color-coded by source type:
 * - Blue: multilateral organizations
 * - Green: energy sector
 * - Gray: media outlets
 * - Purple: academic/research
 * - Amber: own projections
 */

export const SOURCE_TYPES = {
  multilateral: {
    cssVar: '--vsa-source-multilateral',
    bgVar: '--vsa-source-multilateral-bg',
    orgs: ['FMI', 'IMF', 'BM', 'World Bank', 'Banco Mundial', 'ONU', 'UN', 'UNHCR', 'ACNUR', 'OECD', 'OCDE', 'BID', 'CAF', 'CEPAL'],
  },
  energy: {
    cssVar: '--vsa-source-energy',
    bgVar: '--vsa-source-energy-bg',
    orgs: ['OPEP', 'OPEC', 'Rystad', 'Rystad Energy', 'EIA', 'IEA', 'PDVSA', 'Guri'],
  },
  media: {
    cssVar: '--vsa-source-media',
    bgVar: '--vsa-source-media-bg',
    orgs: ['Reuters', 'CNBC', 'Bloomberg', 'Mongabay', 'Financial Times', 'NYT', 'New York Times', 'BBC', 'AP', 'El Pais'],
  },
  academic: {
    cssVar: '--vsa-source-academic',
    bgVar: '--vsa-source-academic-bg',
    orgs: ['AidData', 'Columbia', 'RAND', 'Harvard', 'MIT', 'Oxford', 'Brookings', 'CSIS', 'Carnegie'],
  },
  projection: {
    cssVar: '--vsa-source-projection',
    bgVar: '--vsa-source-projection-bg',
    orgs: ['Proyeccion VSA', 'Proyecciones propias', 'Venezuela S.A.'],
  },
};

/**
 * Classify a source organization name into a type category.
 * @param {string} orgName - The organization name to classify
 * @returns {string} One of: 'multilateral', 'energy', 'media', 'academic', 'projection'
 */
export function classifySource(orgName) {
  const normalized = orgName.trim();
  for (const [type, config] of Object.entries(SOURCE_TYPES)) {
    if (config.orgs.some(org => normalized.toLowerCase().includes(org.toLowerCase()))) {
      return type;
    }
  }
  return 'media'; // Default fallback for unknown sources
}
