import { visit } from "unist-util-visit";

/**
 * Source organization classification map.
 * Inlined here because this plugin runs at build time in Node,
 * where $lib/ aliases are not available.
 */
const SOURCE_ORGS = {
  multilateral: [
    "FMI",
    "IMF",
    "BM",
    "World Bank",
    "Banco Mundial",
    "ONU",
    "UN",
    "UNHCR",
    "ACNUR",
    "OECD",
    "OCDE",
    "BID",
    "CAF",
    "CEPAL",
  ],
  energy: [
    "OPEP",
    "OPEC",
    "Rystad",
    "Rystad Energy",
    "EIA",
    "IEA",
    "PDVSA",
    "Guri",
  ],
  media: [
    "Reuters",
    "CNBC",
    "Bloomberg",
    "Mongabay",
    "Financial Times",
    "NYT",
    "New York Times",
    "BBC",
    "AP",
    "El Pais",
  ],
  academic: [
    "AidData",
    "Columbia",
    "RAND",
    "Harvard",
    "MIT",
    "Oxford",
    "Brookings",
    "CSIS",
    "Carnegie",
  ],
  projection: ["Proyeccion VSA", "Proyecciones propias", "Venezuela S.A."],
};

function classifyByOrg(orgName) {
  const normalized = orgName.trim().toLowerCase();
  for (const [type, orgs] of Object.entries(SOURCE_ORGS)) {
    if (orgs.some((org) => normalized.includes(org.toLowerCase()))) {
      return type;
    }
  }
  return "media"; // Default fallback for unknown sources
}

/**
 * Remark plugin that parses inline source citations (links to known organizations)
 * and appends source badge HTML markup for each paragraph containing sources.
 */
export function remarkSourceBadges() {
  return (tree) => {
    visit(tree, "paragraph", (node, index, parent) => {
      const sources = [];

      // Find link nodes whose text matches known source organizations
      visit(node, "link", (linkNode) => {
        const linkText = linkNode.children
          .filter((c) => c.type === "text")
          .map((c) => c.value)
          .join("");

        if (!linkText) return;

        const type = classifyByOrg(linkText);
        // Only add if the org is recognized (classifyByOrg returns a specific type, or 'media' as default)
        sources.push({
          organization: linkText,
          url: linkNode.url,
          type,
        });
      });

      if (sources.length === 0) return;

      const orgNames = sources.map((s) => s.organization).join(", ");
      // Escape curly braces as HTML entities so mdsvex does not interpret them
      // as Svelte template expressions, then also escape single quotes for the attribute.
      const sourcesJson = JSON.stringify(sources)
        .replace(/\{/g, "&#123;")
        .replace(/\}/g, "&#125;")
        .replace(/'/g, "&#39;");

      const badgeNode = {
        type: "html",
        value: `<span class="vsa-source-badge" role="button" tabindex="0" aria-label="Fuente: ${orgNames}. Toca para ver detalles." data-sources='${sourcesJson}'>${orgNames}</span>`,
      };

      // Append badge node as sibling after the paragraph
      parent.children.splice(index + 1, 0, badgeNode);
    });
  };
}
