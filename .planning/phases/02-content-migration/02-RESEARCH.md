# Phase 2: Content Migration - Research

**Researched:** 2026-03-22
**Domain:** Markdown processing pipeline, offline search, static SVG rendering, SvelteKit content architecture
**Confidence:** HIGH

## Summary

Phase 2 migrates 85 markdown documents (~27,000 lines, ~1.1MB) from the Docusaurus site into the SvelteKit PWA as a navigable book. The content contains 246 Mermaid diagrams (118 flowcharts, 82 xychart-beta, 28 gantt, 18 pie), 529 admonition blocks (:::tip, :::info, :::danger, :::caution, :::warning), and extensive tables with inline source citations. The key technical challenge is building a build-time markdown processing pipeline that renders rich content without shipping heavy client-side JS.

The recommended approach is **mdsvex 0.12.7 as the Svelte preprocessor** with a unified/remark/rehype plugin chain for admonitions, heading slugs, and table wrapping, combined with **@mermaid-js/mermaid-cli for build-time SVG rendering** of Mermaid diagrams via a custom Vite plugin, and **Pagefind 1.4 for offline search**. mdsvex 0.12.7 has confirmed Svelte 5 support (peer dependency updated, layout/file syntax working). The alternative of a pure unified pipeline without mdsvex is viable but loses the ability to embed Svelte components in markdown, which is needed for source badges, table wrappers, and diagram viewers.

**Primary recommendation:** Use mdsvex + remark-directive + remark-callout-directives for markdown processing, @mermaid-js/mermaid-cli with a caching Vite plugin for SVG diagrams, and Pagefind with custom UI for offline search. Validate mdsvex + Svelte 5 on the 5 most complex docs on day one.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Scroll continuo por capitulo -- todos los docs de un capitulo se renderizan como una sola pagina con scroll
- **D-02:** Navegacion anterior/siguiente entre capitulos, no entre docs individuales
- **D-03:** Progress bar sutil por capitulo (porcentaje leido basado en scroll position)
- **D-04:** Tiempo estimado de lectura por capitulo visible en el landing y dentro del capitulo
- **D-05:** "Continuar leyendo" con progreso persistido en localStorage
- **D-06:** Capitulos 08-pitch y 09-investors ESCONDIDOS hasta Phase 5
- **D-07:** Capitulo 10-oportunidades VISIBLE para ciudadanos
- **D-08:** Badge inline con nombre de organizacion como chip sutil junto al dato
- **D-09:** Colores por tipo de fuente -- azul multilaterales, verde energia, gris medios
- **D-10:** Tap en badge -> bottom sheet (mobile) con ficha completa
- **D-11:** Proyecciones propias: badge "Proyeccion VSA" con tooltip/bottom sheet
- **D-12:** Badges agrupados por parrafo
- **D-13:** Seccion colapsable "Fuentes de este capitulo" al final
- **D-14:** Tablas: scroll horizontal con sombra/fade en borde derecho
- **D-15:** Mermaid: SVG estatico renderizado en build time -- cero JS de Mermaid en cliente
- **D-16:** Diagramas complejos: tap para expandir a pantalla completa con pinch-zoom
- **D-17:** Pie charts y diagramas simples: inline full-width
- **D-18:** Mini-caption debajo de cada diagrama complejo
- **D-19:** Tablas estrella: card elevada con borde accent (emerald)
- **D-20:** xychart-beta que no rendericen como SVG: reemplazar con imagen placeholder + caption
- **D-21:** Landing tipo indice de libro visual, NO ir directo al capitulo 1
- **D-22:** Hero breve arriba con progreso global
- **D-23:** Cards por capitulo con icono + nombre + descripcion + tiempo + progreso
- **D-24:** "Continuar leyendo" como CTA prominente si hay progreso previo
- **D-25:** Barra de busqueda siempre visible arriba del landing
- **D-26:** Oportunidades como seccion separada debajo de los 7 capitulos principales
- **D-27:** Glosario y Referencias como links secundarios al fondo
- **D-28:** Badge "Empieza aqui" en capitulo Fundamentos para usuario nuevo
- **D-29:** Dato gancho por capitulo en cada card

### Claude's Discretion
- mdsvex vs alternativa de procesamiento markdown (debe validar compatibilidad Svelte 5)
- Cadena de plugins remark/rehype para admonitions, tablas, enlaces
- Pagefind vs Flexsearch vs otra libreria de busqueda offline
- Estrategia de routing (dinamico vs estatico, slug structure)
- Estrategia de cache del service worker para contenido markdown
- Arquitectura de componentes (Article, SourceBadge, TableWrapper, DiagramViewer, etc.)
- Approach de renderizado SVG estatico para Mermaid en build time
- Implementacion del scroll tracking para progress bar

### Deferred Ideas (OUT OF SCOPE)
- Comentarios a nivel de parrafo (estilo Medium) -- Phase 4
- Votacion acuerdo/desacuerdo en parrafos -- Phase 4
- Compartir parrafo como image card para redes -- Phase 4
- FCV calculator interactivo -- Phase 3
- Dashboards interactivos reemplazando Mermaid estaticos -- Phase 3
- Experiencia inversor con capitulos 08/09 -- Phase 5
- Toggle ciudadano/inversor -- Phase 5
- Highlight de parrafos con comentarios activos -- Phase 4
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CONT-01 | Migracion completa de los 50+ docs markdown como paginas legibles | mdsvex 0.12.7 pipeline + chapter aggregation pattern; 85 files identified, grouped into 10 chapters per sidebars.js |
| CONT-02 | Renderizado de admonitions (:::danger, :::info, :::tip, :::caution) via remark plugins | remark-directive 4.0 + @microflash/remark-callout-directives 5.0 with Docusaurus-compatible aliases; 529 admonition blocks in 75 files |
| CONT-03 | Mermaid diagrams renderizados como SVG estatico en build time (cero JS de Mermaid) | @mermaid-js/mermaid-cli 11.12.0 via custom Vite plugin with file caching; 246 diagrams (118 flowchart, 82 xychart-beta, 28 gantt, 18 pie) |
| CONT-04 | Tablas markdown con scroll horizontal en mobile | rehype plugin or Svelte component wrapping `<table>` in scrollable container with fade shadow; standard pattern |
| CONT-05 | Fuente verificable en cada dato -- tooltip o footnote con organizacion + fecha + URL | Custom remark plugin to parse `[Org](URL)` patterns + SourceBadge Svelte component; color-coded by source type |
| CONT-06 | Deep links para cada seccion y parrafo | rehype-slug 6.0 for headings + custom rehype plugin for paragraph IDs; rehype-autolink-headings 7.1 for anchor links |
| CONT-07 | Busqueda full-text offline sobre todo el contenido | Pagefind 1.4 with Spanish stemming, ~100-300KB total payload, integrates with adapter-static build output |
| CONT-08 | Navegacion secuencial tipo libro (anterior/siguiente) | Chapter-level prev/next computed from chapter ordering defined in sidebars.js mapping |
</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| mdsvex | 0.12.7 | Markdown preprocessor for Svelte | Only maintained Svelte markdown preprocessor; Svelte 5 support confirmed; remark/rehype plugin chain |
| @mermaid-js/mermaid-cli | 11.12.0 | Build-time Mermaid to SVG conversion | Official CLI, supports all diagram types including xychart-beta; Puppeteer-based but reliable |
| pagefind | 1.4.0 | Static offline search indexing and client library | Build-time indexing, chunked index loading, Spanish stemming, ~100KB typical payload, zero runtime deps |
| remark-directive | 4.0.0 | Directive syntax support (:::) in markdown AST | Foundation for admonition processing; official unified ecosystem |
| @microflash/remark-callout-directives | 5.0.0 | Admonition rendering from directives | Built-in aliases for danger, info, tip, caution matching Docusaurus syntax |
| rehype-slug | 6.0.0 | Auto-generate heading IDs | Standard for deep linking; uses github-slugger algorithm |
| rehype-autolink-headings | 7.1.0 | Add anchor links to headings | Pairs with rehype-slug for shareable heading URLs |
| gray-matter | 4.0.3 | Frontmatter parsing | Extract sidebar_position, title, evaluators from YAML frontmatter |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| unified | 11.0.5 | Text processing framework | Core engine for remark/rehype pipelines |
| remark-parse | 11.0.0 | Markdown parser | Part of unified pipeline |
| remark-rehype | 11.1.2 | MDAST to HAST bridge | Part of unified pipeline |
| rehype-stringify | 10.0.1 | HAST to HTML string | Part of unified pipeline |
| reading-time | 1.5.0 | Estimate reading time from text | Chapter reading time calculation (D-04) |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| mdsvex | Pure unified pipeline (build-time HTML) | Loses Svelte component embedding in markdown; gains zero preprocessor risk. NOT recommended because SourceBadge, DiagramViewer, TableWrapper need to be Svelte components |
| mdsvex | svelte-exmarkdown | Runtime rendering, not build-time; adds client JS weight. NOT recommended |
| Pagefind | Flexsearch | Flexsearch builds index at runtime (client loads all content into memory); Pagefind indexes at build time. For 85 docs, Flexsearch index could be 500KB+. Pagefind wins for offline PWA |
| Pagefind | MiniSearch | Similar to Flexsearch -- runtime indexing, full content in memory. Not suitable for 85 large docs |
| @mermaid-js/mermaid-cli | mmdr (Rust) | 500-1000x faster but Rust binary (no npm package), less mature. NOT recommended -- mermaid-cli with caching is fast enough for 246 diagrams |
| @mermaid-js/mermaid-cli | beautiful-mermaid | NPM package, supports xychart-beta, but less mature than official CLI |
| remark-callout-directives | Custom remark plugin | Would need to hand-roll Docusaurus syntax parsing; callout-directives already handles it |

**Installation:**
```bash
cd pwa
npm install mdsvex gray-matter reading-time
npm install remark-directive @microflash/remark-callout-directives rehype-slug rehype-autolink-headings
npm install -D pagefind @mermaid-js/mermaid-cli
```

**Version verification:** All versions confirmed against npm registry on 2026-03-22.

## Architecture Patterns

### Recommended Project Structure
```
pwa/
├── src/
│   ├── content/                    # Symlink or copy of ../docs/ markdown files
│   │   └── (mirrors docs/ structure)
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Article.svelte           # Main article renderer (chapter aggregator)
│   │   │   ├── SourceBadge.svelte       # Inline source citation chip
│   │   │   ├── SourceSheet.svelte       # Bottom sheet for source detail
│   │   │   ├── TableWrapper.svelte      # Horizontal scroll + fade shadow wrapper
│   │   │   ├── StarTable.svelte         # Elevated card for key data tables (D-19)
│   │   │   ├── DiagramViewer.svelte     # SVG container with fullscreen expand (D-16)
│   │   │   ├── Admonition.svelte        # Styled admonition block
│   │   │   ├── ChapterNav.svelte        # Previous/Next chapter navigation
│   │   │   ├── ReadingProgress.svelte   # Progress bar (D-03)
│   │   │   ├── SearchBar.svelte         # Pagefind search UI
│   │   │   └── ChapterSources.svelte    # Collapsible chapter sources list (D-13)
│   │   ├── content/
│   │   │   ├── chapters.js              # Chapter definition (order, metadata, doc lists)
│   │   │   └── sources.js               # Source type classification (multilateral, energy, media)
│   │   ├── stores/
│   │   │   └── reading-progress.js      # localStorage-backed reading position store
│   │   └── utils/
│   │       ├── mermaid-cache.js         # Build-time SVG cache management
│   │       └── reading-time.js          # Reading time calculator
│   ├── routes/
│   │   └── plan/
│   │       ├── +page.svelte             # Book landing page (D-21 through D-29)
│   │       └── [chapter]/
│   │           ├── +page.js             # Load chapter docs (aggregated)
│   │           └── +page.svelte         # Chapter reader (continuous scroll)
│   └── plugins/
│       ├── remark-mermaid-static.js     # Replace mermaid blocks with cached SVG
│       ├── remark-source-badges.js      # Parse source citations into badge data
│       ├── rehype-paragraph-ids.js      # Auto-generate stable paragraph IDs
│       └── rehype-table-wrapper.js      # Wrap tables in scrollable container
├── static/
│   └── diagrams/                        # Cached SVG files from Mermaid build
├── scripts/
│   └── build-mermaid.js                 # Pre-build: render all Mermaid to SVG
└── mdsvex.config.js                     # mdsvex + remark/rehype pipeline config
```

### Pattern 1: Chapter Aggregation (D-01, D-02)

**What:** Each chapter route loads ALL docs in that chapter and renders them as a single continuous scroll page.
**When to use:** Always -- this is the locked decision for the book reading experience.
**Implementation approach:**

The sidebar structure in `sidebars.js` defines the chapter grouping. A `chapters.js` data module maps this to the PWA:

```javascript
// pwa/src/lib/content/chapters.js
export const chapters = [
  {
    slug: 'introduccion',
    title: 'Venezuela S.A.',
    icon: 'BookOpen',
    description: 'Plan de Reconstruccion Nacional',
    hookStat: '40M accionistas',
    docs: ['intro'],
    visible: true,
  },
  {
    slug: 'fundamentos',
    title: 'Fundamentos',
    icon: 'Building2',
    description: 'Diagnostico + Fase 0 emergencia',
    hookStat: '303B barriles',
    docs: ['01-fundamentos/tesis-central', '01-fundamentos/diagnostico', '01-fundamentos/fase-0-emergencia'],
    visible: true,
  },
  // ... 7 main chapters + oportunidades
  {
    slug: 'oportunidades',
    title: 'Oportunidades de Inversion',
    icon: 'Lightbulb',
    description: '20 sectores de inversion',
    hookStat: 'USD 550-750B',
    docs: ['10-oportunidades/data-centers-ia', ...],
    visible: true,
    isSeparateSection: true, // D-26: separate section below main chapters
  },
];

// Hidden chapters (Phase 5)
export const hiddenChapters = ['08-pitch', '09-investors'];
```

The chapter `+page.js` loads and concatenates all docs for that chapter:

```javascript
// pwa/src/routes/plan/[chapter]/+page.js
import { chapters } from '$lib/content/chapters.js';

export async function load({ params }) {
  const chapter = chapters.find(c => c.slug === params.chapter);
  if (!chapter) throw error(404);

  // Import all docs for this chapter (mdsvex preprocessed)
  const docs = await Promise.all(
    chapter.docs.map(async (docPath) => {
      const mod = await import(`../../../content/${docPath}.md`);
      return { component: mod.default, metadata: mod.metadata };
    })
  );

  return { chapter, docs };
}

export const prerender = true;
```

### Pattern 2: Build-Time Mermaid SVG Pipeline (D-15, D-20)

**What:** A pre-build script extracts all ```mermaid blocks from markdown, renders them to SVG using mermaid-cli, caches results, and a remark plugin replaces blocks with SVG references at mdsvex processing time.
**When to use:** Always -- locked decision for zero client JS.
**Implementation approach:**

Pre-build script (`scripts/build-mermaid.js`):
1. Scan all markdown files for ```mermaid blocks
2. Hash each block content (for caching)
3. For each unique block, check if SVG exists in `static/diagrams/{hash}.svg`
4. If not, render via `@mermaid-js/mermaid-cli` `run()` function
5. Write SVG to cache directory

The remark plugin replaces mermaid code blocks with image references:
```javascript
// pwa/src/plugins/remark-mermaid-static.js
import { visit } from 'unist-util-visit';
import crypto from 'crypto';

export function remarkMermaidStatic() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'mermaid') return;
      const hash = crypto.createHash('md5').update(node.value).digest('hex');
      const svgPath = `/diagrams/${hash}.svg`;
      // Replace code block with image node
      parent.children[index] = {
        type: 'html',
        value: `<figure class="vsa-diagram" data-diagram-type="${detectType(node.value)}"><img src="${svgPath}" alt="Diagram" loading="lazy" /><figcaption></figcaption></figure>`
      };
    });
  };
}
```

**Build time estimate:** 246 diagrams * ~2-3s per diagram (mermaid-cli with Puppeteer) = ~8-12 minutes for first build. With caching, subsequent builds only render changed diagrams (~5-10 seconds typical).

**xychart-beta handling (D-20):** mermaid-cli 11.12.0 supports xychart-beta SVG output. Test all 82 xychart-beta diagrams in a validation pass. Any that fail get replaced with a descriptive placeholder `<div>` with caption per D-20.

### Pattern 3: Admonition Processing

**What:** Transform Docusaurus `:::type Title` syntax into styled HTML via remark plugins.
**When to use:** Always -- 529 admonition blocks across 75 files.
**Implementation approach:**

The existing Docusaurus admonition syntax is:
```markdown
:::danger Title text here
Content paragraph
:::
```

remark-directive parses this into a directive AST node. remark-callout-directives transforms it into HTML with built-in aliases:
- `danger` -> `deter` callout type
- `info` -> `note` callout type
- `tip` -> `commend` callout type
- `caution` -> `deter` callout type (same as danger)
- `warning` -> `warn` callout type

**Critical detail:** The Docusaurus syntax puts the title on the same line as the directive type (`:::tip Title`), not as a separate attribute. remark-callout-directives handles this pattern because it reads the text after the directive keyword as the title. Verify this works with the exact syntax used in the docs.

**Styling:** Admonition Svelte component uses design tokens:
- danger/caution: `--vsa-destructive` (#EF4444)
- info: blue variant (add `--vsa-info: #3B82F6` token)
- tip: `--vsa-accent` (#10B981 emerald)
- warning: amber variant (add `--vsa-warning: #F59E0B` token)

### Pattern 4: Source Badge System (D-08 through D-13)

**What:** Parse inline source citations from markdown and render as colored badge chips.
**When to use:** Always -- core to the plan's credibility ("25 years of invented numbers").
**Implementation approach:**

Source citation formats found in the docs:
1. Markdown links with org name: `[OPEP ASB 2025](https://www.opec.org/...)`
2. Inline parenthetical: `(Rystad Energy, ene. 2026)`
3. Table cells with links: `[FMI](https://www.imf.org)`
4. Blockquote sources: `> Fuentes: [AidData](...); [Columbia CGEP](...)`

The source badge system has two layers:
- **Build-time remark plugin:** Extracts source data from markdown links, classifies by type (multilateral/energy/media), annotates paragraphs with source metadata
- **Runtime Svelte components:** SourceBadge (inline chip), SourceSheet (bottom sheet detail), ChapterSources (collapsible list)

Source classification:
```javascript
// pwa/src/lib/content/sources.js
export const SOURCE_TYPES = {
  multilateral: {
    color: 'blue', // --vsa-source-multilateral
    orgs: ['FMI', 'IMF', 'BM', 'World Bank', 'ONU', 'UN', 'UNHCR', 'OECD', 'OCDE'],
  },
  energy: {
    color: 'green', // --vsa-source-energy
    orgs: ['OPEP', 'OPEC', 'Rystad', 'EIA', 'IEA', 'Guri'],
  },
  media: {
    color: 'gray', // --vsa-source-media
    orgs: ['Reuters', 'CNBC', 'Bloomberg', 'Mongabay'],
  },
  academic: {
    color: 'purple', // --vsa-source-academic
    orgs: ['AidData', 'Columbia', 'RAND', 'Harvard'],
  },
  projection: {
    color: 'emerald', // --vsa-accent
    orgs: ['Proyeccion VSA', 'Proyecciones propias'],
  },
};
```

### Pattern 5: Reading Progress Store (D-03, D-05, D-24)

**What:** localStorage-backed store tracking scroll position per chapter with "Continue reading" functionality.
**When to use:** Always -- follows the established pattern from `pwa/src/lib/stores/onboarding.js`.
**Implementation approach:**

```javascript
// pwa/src/lib/stores/reading-progress.js
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'vsa-reading-progress';

const initial = browser
  ? JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  : {};

export const readingProgress = writable(initial);

// { chapterSlug: { scrollPercent: 0.45, lastVisited: timestamp, lastScrollY: 1234 } }

readingProgress.subscribe(value => {
  if (browser) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }
});

export const lastReadChapter = derived(readingProgress, ($progress) => {
  return Object.entries($progress)
    .sort(([, a], [, b]) => b.lastVisited - a.lastVisited)[0];
});
```

Scroll tracking uses IntersectionObserver for section-level tracking + requestAnimationFrame-throttled scroll listener for fine-grained percentage:

```javascript
// In chapter page component
let scrollPercent = $state(0);

function trackScroll() {
  if (!browser) return;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollPercent = Math.min(1, window.scrollY / docHeight);
}

// Throttle with rAF
let ticking = false;
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => { trackScroll(); ticking = false; });
    ticking = true;
  }
}
```

### Anti-Patterns to Avoid

- **Importing all 85 docs at once:** Each chapter loads only its own docs. Total content is ~1.1MB of markdown; loading everything would blow the memory budget on low-end devices.
- **Client-side Mermaid rendering:** The mermaid library is ~2MB. Zero client JS for diagrams is a hard requirement (D-15).
- **Runtime search indexing:** Flexsearch/MiniSearch would require loading all content text into client memory. Use Pagefind's build-time indexing instead.
- **Storing rendered HTML in localStorage:** Only store scroll position and chapter slug. The rendered content lives in pre-rendered HTML files cached by the service worker.
- **Using mdsvex to process .svelte files:** Known bug (issue #685). Only use mdsvex for `.md` files. Set `extensions: ['.md']` in mdsvex config.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Markdown to HTML | Custom parser | mdsvex + unified pipeline | 85 files, 27K lines, complex syntax (admonitions, tables, mermaid, frontmatter) |
| Admonition parsing | Regex-based ::: parser | remark-directive + remark-callout-directives | Docusaurus syntax has edge cases (nested, multiline titles, inline formatting) |
| Heading IDs | Manual slug generation | rehype-slug (github-slugger) | Consistent with GitHub's algorithm, handles duplicates, unicode-safe |
| Full-text search | Custom inverted index | Pagefind | Build-time indexing, chunked loading, Spanish stemming, WebAssembly search engine |
| Mermaid SVG rendering | Canvas-based renderer | @mermaid-js/mermaid-cli | Puppeteer ensures pixel-perfect SVG output identical to browser rendering |
| Reading time estimation | Word count / 200 | reading-time library | Handles CJK, code blocks, images; well-tested |
| Scroll progress | Manual scroll math | IntersectionObserver + rAF | Browser-native, performant on low-end devices |

**Key insight:** The markdown processing pipeline is where 80% of the complexity lives. Getting the remark/rehype plugin chain right is the make-or-break of this phase. Once the pipeline works for the 5 most complex docs, it works for all 85.

## Common Pitfalls

### Pitfall 1: mdsvex + Svelte 5 Incompatibility
**What goes wrong:** mdsvex 0.12.x has had multiple issues with Svelte 5: custom component replacement failing, preprocessing .svelte files causing errors, layout issues.
**Why it happens:** mdsvex internals were designed for Svelte 3/4 class-based components. Svelte 5 uses `render()` function and runes.
**How to avoid:** (1) Set `extensions: ['.md']` only -- never include `.svelte`. (2) Validate on 5 most complex docs on day one per STATE.md blocker. (3) Test mdsvex layouts with Svelte 5 runes syntax. (4) Have fallback plan: pure unified pipeline rendering to HTML strings, rendered via `{@html}`.
**Warning signs:** Build errors mentioning "cannot convert undefined to object", "render is not a function", or layout components not receiving props.

### Pitfall 2: Mermaid Build Time Explosion
**What goes wrong:** 246 diagrams * 2-3s each = 8-12 minutes. CI builds become painfully slow.
**Why it happens:** mermaid-cli launches a headless Chromium per render (actually reuses browser instance with batch mode, but still ~2s per diagram).
**How to avoid:** (1) Content-hash based caching -- only re-render changed diagrams. (2) Run mermaid pre-build as a separate npm script that can be skipped in dev. (3) Cache SVGs in `static/diagrams/` and commit them to git (they're build artifacts but stable). (4) In dev mode, show a placeholder div instead of pre-rendering.
**Warning signs:** Build taking > 2 minutes when no content changed.

### Pitfall 3: xychart-beta SVG Rendering Failures
**What goes wrong:** 82 xychart-beta diagrams may not all render cleanly as SVG. xychart-beta is still evolving in Mermaid.
**Why it happens:** xychart-beta uses browser-backed rasterization for some elements (connecting lines in line charts).
**How to avoid:** (1) Run a validation pass on ALL 82 xychart-beta diagrams before starting implementation. (2) Per D-20, any that fail get a descriptive placeholder image + caption. (3) Log failed diagrams for Phase 3 interactive dashboard replacement.
**Warning signs:** SVG output missing lines, empty chart areas, or oversized dimensions.

### Pitfall 4: Admonition Syntax Mismatch
**What goes wrong:** remark-callout-directives doesn't parse the exact Docusaurus title syntax.
**Why it happens:** Docusaurus uses `:::tip Title text` (title on same line). Some remark plugins expect `:::tip[Title text]` (bracket syntax) or separate title line.
**How to avoid:** (1) Test with the exact syntax from the docs (sample: `:::danger El riesgo #1`, `:::caution Fechas ilustrativas`). (2) If callout-directives doesn't match, write a small remark plugin that transforms Docusaurus syntax to directive syntax before processing.
**Warning signs:** Admonitions rendering as plain text or missing titles.

### Pitfall 5: Bundle Size Budget Exceeded
**What goes wrong:** Adding mdsvex + Pagefind + remark plugins pushes bundle beyond 200KB gzipped.
**Why it happens:** mdsvex is a preprocessor (build-time only, no client JS). Pagefind client is ~6-10KB JS + ~20-50KB WASM. Remark plugins are build-time only. The risk is in the Svelte components (Article, SourceBadge, DiagramViewer, etc.).
**How to avoid:** (1) All remark/rehype plugins are build-time only -- zero client JS. (2) Pagefind client loaded dynamically on search focus. (3) DiagramViewer uses native `<dialog>` for fullscreen (no modal library). (4) Monitor with existing `pwa/scripts/check-bundle-size.js` after each plan.
**Warning signs:** Bundle check failing after adding content components. Current budget: 97KB used of 200KB.

### Pitfall 6: Cross-Referenced Docs in Multiple Chapters
**What goes wrong:** The sidebar has docs from `10-oportunidades/` appearing inside chapters like "Motor Financiero" and "Gobernanza".
**Why it happens:** `sidebars.js` cross-references docs into multiple categories.
**How to avoid:** (1) In the PWA's chapter model, each doc belongs to exactly ONE chapter. Cross-references become internal links. (2) Use the canonical chapter assignment from the `chapters.js` module. (3) The 10-oportunidades chapter is a separate section (D-26) that aggregates all 20 investment opportunity docs.
**Warning signs:** Duplicate content rendering, broken navigation links.

### Pitfall 7: Service Worker Not Caching Rendered Content
**What goes wrong:** User opens app, reads some chapters, goes offline -- chapters they haven't visited are unavailable.
**Why it happens:** Current Workbox config (`generateSW`) precaches app shell but not all pre-rendered pages.
**How to avoid:** (1) With adapter-static, ALL pages are pre-rendered HTML. Add `prerendered/**/*.html` to Workbox globPatterns (already in config). (2) Pagefind index files (`pagefind/**`) must also be cached. (3) SVG diagram files (`diagrams/*.svg`) must be cached. Update Workbox config to include these patterns.
**Warning signs:** 404 errors when navigating offline to unvisited chapters.

## Code Examples

### mdsvex Configuration

```javascript
// pwa/mdsvex.config.js
import remarkDirective from 'remark-directive';
import remarkCalloutDirectives from '@microflash/remark-callout-directives';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { remarkMermaidStatic } from './src/plugins/remark-mermaid-static.js';
import { remarkSourceBadges } from './src/plugins/remark-source-badges.js';
import { rehypeParagraphIds } from './src/plugins/rehype-paragraph-ids.js';
import { rehypeTableWrapper } from './src/plugins/rehype-table-wrapper.js';

const config = {
  extensions: ['.md'],
  remarkPlugins: [
    remarkMermaidStatic,        // Replace mermaid blocks with cached SVGs (must run first)
    remarkDirective,            // Parse ::: directive syntax
    [remarkCalloutDirectives, {
      aliases: {
        danger: 'deter',
        info: 'note',
        tip: 'commend',
        caution: 'deter',
        warning: 'warn',
      }
    }],
    remarkSourceBadges,         // Extract and annotate source citations
  ],
  rehypePlugins: [
    rehypeSlug,                 // Add IDs to headings
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    rehypeParagraphIds,         // Add IDs to paragraphs for deep linking
    rehypeTableWrapper,         // Wrap tables in scrollable containers
  ],
  smartypants: {
    dashes: 'oldschool',       // Convert -- to em dash
  },
};

export default config;
```

### SvelteKit Config Integration

```javascript
// pwa/svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    vitePreprocess(),
    mdsvex(mdsvexConfig),
  ],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '200.html',
      precompress: true,
      strict: true
    }),
    serviceWorker: { register: false },
    paths: { base: '' }
  }
};

export default config;
```

### Pagefind Integration in Build Script

```json
// package.json scripts
{
  "scripts": {
    "build:mermaid": "node scripts/build-mermaid.js",
    "build:site": "vite build",
    "build:search": "pagefind --site build --glob '**/*.html'",
    "build": "npm run build:mermaid && npm run build:site && npm run build:search",
    "dev": "vite dev"
  }
}
```

### Pagefind Search Component (Lazy-Loaded)

```svelte
<!-- pwa/src/lib/components/SearchBar.svelte -->
<script>
  let query = $state('');
  let results = $state([]);
  let pagefind = $state(null);

  async function initPagefind() {
    if (pagefind) return;
    pagefind = await import(/* @vite-ignore */ '/pagefind/pagefind.js');
    await pagefind.init();
  }

  async function search() {
    if (!pagefind) await initPagefind();
    if (!query.trim()) { results = []; return; }
    const response = await pagefind.search(query);
    results = await Promise.all(response.results.slice(0, 10).map(r => r.data()));
  }
</script>

<div class="vsa-search">
  <input
    type="search"
    placeholder="Buscar en el plan..."
    bind:value={query}
    onfocus={initPagefind}
    oninput={search}
    class="vsa-search__input"
  />
  {#if results.length > 0}
    <ul class="vsa-search__results">
      {#each results as result}
        <li>
          <a href={result.url}>{result.meta?.title || result.url}</a>
          <p>{@html result.excerpt}</p>
        </li>
      {/each}
    </ul>
  {/if}
</div>
```

### Workbox Config Update for Content Caching

```javascript
// Update in vite.config.js SvelteKitPWA config
workbox: {
  globPatterns: [
    'client/**/*.{js,css,ico,png,svg,webp,woff2}',
    'prerendered/**/*.html',
    'diagrams/**/*.svg',        // Mermaid SVGs
    'pagefind/**/*.{js,wasm,pf_meta,pf_index,pf_fragment}',  // Search index
  ],
  navigateFallback: '200.html'
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| mdsvex 0.11.x (Svelte 3/4 only) | mdsvex 0.12.7 (Svelte 5 support) | 2025-2026 | Peer deps updated, layouts work with runes |
| Client-side Mermaid.js (~2MB) | Build-time SVG via mermaid-cli | Standard practice | Zero client JS for diagrams |
| Lunr.js / Elasticlunr | Pagefind (build-time indexing) | 2023+ | Chunk-loaded index, WASM search, language support |
| remark-admonitions (Docusaurus-specific) | remark-directive + callout plugins | 2024+ | Standard directive syntax, framework-agnostic |
| Flexsearch (runtime indexing) | Pagefind (static indexing) | For static sites | No need to load all content into client memory |

**Deprecated/outdated:**
- `remark-admonitions` v1.x: Docusaurus-specific, not maintained for general use
- `mermaid-cli` < v10: Used Playwright; v11+ uses Puppeteer with chrome-headless-shell

## Open Questions

1. **Exact Docusaurus admonition title syntax compatibility with remark-callout-directives**
   - What we know: callout-directives reads text after directive keyword as title. Docusaurus uses `:::tip Title text` format.
   - What's unclear: Whether multiline title content or inline markdown (bold, links) in titles is handled correctly.
   - Recommendation: Test with 10 real admonitions from the docs in Wave 0 validation. If syntax doesn't match, write a 20-line remark transform that normalizes Docusaurus syntax to standard directive syntax.

2. **xychart-beta SVG quality from mermaid-cli**
   - What we know: mermaid-cli 11.12.0 supports xychart-beta. Some xychart-beta line charts use browser-backed rasterization.
   - What's unclear: How many of the 82 xychart-beta diagrams will render cleanly as SVG.
   - Recommendation: Run a full validation pass on all 82 before implementation begins. Track pass/fail count. D-20 provides the fallback.

3. **Chapter sizes and scroll performance on low-end devices**
   - What we know: Some chapters are massive. The 10-oportunidades chapter has 20 docs totaling ~696KB of markdown. Chapter 04-gobernanza has 11 docs.
   - What's unclear: Whether rendering 10+ large docs as a single scroll page causes jank on a 2GB RAM Android.
   - Recommendation: Test the largest chapter on a throttled device. If jank, consider lazy-loading docs within a chapter using IntersectionObserver (show next doc when user scrolls to bottom of current).

4. **Pagefind index size for 85 docs in Spanish**
   - What we know: Pagefind claims ~100KB for most sites, up to 300KB for 10,000 pages. The docs are 85 files but very content-rich (27K lines).
   - What's unclear: Exact index size after build. Spanish stemming adds overhead.
   - Recommendation: Measure after first build. If > 150KB, configure Pagefind to exclude less relevant sections (references, glossary source links).

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.x |
| Config file | `pwa/vite.config.js` (test section) |
| Quick run command | `cd pwa && npx vitest run` |
| Full suite command | `cd pwa && npx vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | All 85 docs render without errors | integration | `cd pwa && npx vitest run tests/content-render.test.js -x` | Wave 0 |
| CONT-02 | Admonitions render with correct type/title | unit | `cd pwa && npx vitest run tests/admonitions.test.js -x` | Wave 0 |
| CONT-03 | Mermaid blocks replaced with SVG references | unit | `cd pwa && npx vitest run tests/mermaid-static.test.js -x` | Wave 0 |
| CONT-04 | Tables wrapped in scrollable container | unit | `cd pwa && npx vitest run tests/table-wrapper.test.js -x` | Wave 0 |
| CONT-05 | Source citations parsed and classified | unit | `cd pwa && npx vitest run tests/source-badges.test.js -x` | Wave 0 |
| CONT-06 | Headings and paragraphs have stable IDs | unit | `cd pwa && npx vitest run tests/deep-links.test.js -x` | Wave 0 |
| CONT-07 | Pagefind index generated and searchable | integration | `cd pwa && npx vitest run tests/search.test.js -x` | Wave 0 |
| CONT-08 | Chapter prev/next navigation correct | unit | `cd pwa && npx vitest run tests/chapter-nav.test.js -x` | Wave 0 |

### Sampling Rate
- **Per task commit:** `cd pwa && npx vitest run`
- **Per wave merge:** `cd pwa && npx vitest run && npm run build`
- **Phase gate:** Full suite green + `npm run build` succeeds + `npm run check:bundle` passes

### Wave 0 Gaps
- [ ] `pwa/tests/content-render.test.js` -- validates all 85 docs render via mdsvex
- [ ] `pwa/tests/admonitions.test.js` -- tests remark-callout-directives with Docusaurus syntax
- [ ] `pwa/tests/mermaid-static.test.js` -- tests mermaid block replacement with SVG paths
- [ ] `pwa/tests/table-wrapper.test.js` -- tests rehype table wrapper output
- [ ] `pwa/tests/source-badges.test.js` -- tests source citation parsing and classification
- [ ] `pwa/tests/deep-links.test.js` -- tests heading and paragraph ID generation
- [ ] `pwa/tests/search.test.js` -- tests Pagefind index generation (post-build)
- [ ] `pwa/tests/chapter-nav.test.js` -- tests chapter ordering and prev/next logic

## Sources

### Primary (HIGH confidence)
- [mdsvex GitHub - Svelte 5 support issue #555](https://github.com/pngwn/MDsveX/issues/555) - Svelte 5 compatibility status, closed as completed
- [mdsvex official docs](https://mdsvex.pngwn.io/docs) - Configuration, remarkPlugins, rehypePlugins
- [Pagefind official docs](https://pagefind.app/) - Bundle size claims, multilingual support, API
- [Pagefind multilingual docs](https://pagefind.app/docs/multilingual/) - Spanish stemming confirmed
- [Pagefind SvelteKit integration guide](https://gebna.gg/blog/pagefind-sveltekit) - Step-by-step integration pattern
- [@mermaid-js/mermaid-cli GitHub](https://github.com/mermaid-js/mermaid-cli) - Node.js API, batch rendering
- [remark-directive GitHub](https://github.com/remarkjs/remark-directive) - Directive syntax support
- [@microflash/remark-callout-directives GitHub](https://github.com/Microflash/remark-callout-directives) - Built-in aliases for Docusaurus types
- [rehype-slug GitHub](https://github.com/rehypejs/rehype-slug) - Heading ID generation
- npm registry (2026-03-22) - All package versions verified

### Secondary (MEDIUM confidence)
- [SvelteKit blog without mdsvex](https://gebna.gg/blog/blog-from-scratch-using-sveltekit) - Alternative unified pipeline approach
- [mdsvex GitHub discussions #691](https://github.com/pngwn/MDsveX/discussions/691) - Custom components Svelte 4/5 issues
- [mmdr Rust renderer](https://medium.com/@trivajay259/mmdr-the-rust-powered-mermaid-renderer-that-makes-your-docs-fly-500-1000-faster-b4c6485d1639) - Alternative to mermaid-cli (not recommended for this project)
- [svelte-scroll-tracker](https://github.com/AsafAgranat/svelte-scroll-tracker) - Svelte 5 scroll progress pattern

### Tertiary (LOW confidence)
- mermaid-cli build time estimates (~2-3s per diagram) - based on community reports, not benchmarked on this project's diagrams
- Pagefind exact client JS size (~6-10KB JS + WASM) - not officially documented, inferred from "100-300KB total payload" claims

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all packages verified on npm, mdsvex Svelte 5 support confirmed via GitHub issue, Pagefind well-documented
- Architecture: HIGH - patterns follow established SvelteKit static site + mdsvex conventions; chapter aggregation is novel but straightforward
- Pitfalls: HIGH - mdsvex Svelte 5 risk documented in STATE.md; mermaid build time is well-known; xychart-beta risk identified with fallback (D-20)
- Source badge system: MEDIUM - custom remark plugin needed; source citation format in docs is varied; needs prototype validation
- Pagefind bundle impact: MEDIUM - official docs say ~100KB for most sites but 85 content-rich Spanish docs may be larger

**Research date:** 2026-03-22
**Valid until:** 2026-04-22 (stable ecosystem, mdsvex pre-1.0 status warrants monthly recheck)

---

### Content Inventory Summary

| Metric | Count |
|--------|-------|
| Total markdown files | 85 |
| Total lines | ~27,000 |
| Total file size | ~1.6MB |
| Mermaid diagrams | 246 (118 flowchart, 82 xychart-beta, 28 gantt, 18 pie) |
| Admonition blocks | 529 (150 tip, 136 info, 124 danger, 117 caution, 2 warning) |
| Files with admonitions | 75 of 85 |
| Files with Mermaid | 68 of 85 |
| Chapters (visible) | 10 (7 main + intro + oportunidades + conclusion/glosario/refs) |
| Chapters (hidden, Phase 5) | 2 (08-pitch, 09-investors) |
| Largest chapter (by file size) | 10-oportunidades (~696KB, 20 files) |
