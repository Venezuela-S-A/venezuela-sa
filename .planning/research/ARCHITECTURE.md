# Architecture Patterns

**Domain:** Mobile-first PWA -- markdown content site + interactive dashboards
**Researched:** 2026-03-21

## Recommended Architecture

**Pattern: Static-First PWA with SPA Navigation**

The app is statically generated at build time (adapter-static), served from a CDN, and behaves like a single-page application on the client. Service workers cache everything for offline use. Data lives in JSON files bundled with the build.

```
[Build Time]
  Markdown (.md) --> mdsvex --> Prerendered HTML
  JSON data files --> Imported at build --> Embedded in routes
  Tailwind --> Purged CSS
  Svelte components --> Compiled JS (no runtime)

[CDN / Edge]
  Static HTML + JS + CSS + JSON + manifest.webmanifest

[Client (Browser)]
  Service Worker (Workbox)
    |-- Precache: HTML, JS, CSS, JSON, icons
    |-- Runtime cache: images (CacheFirst), content updates (StaleWhileRevalidate)
  App Shell
    |-- Bottom Tab Navigator (persistent layout)
    |   |-- Home (hero + summary)
    |   |-- Mi FCV (calculator + projections)
    |   |-- El Plan (markdown content browser)
    |   +-- Dashboards (interactive charts)
    |-- Header (logo + ciudadano/inversor toggle)
    +-- Locale context (ES/EN via Paraglide)
```

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| App Shell (`+layout.svelte`) | Persistent navigation, locale context, theme | All route components |
| Bottom Tabs | Tab navigation, active state, route switching | SvelteKit router |
| Header Bar | Logo, ciudadano/inversor toggle, dark mode toggle | Locale store, theme store |
| Content Renderer | Renders markdown as styled HTML | mdsvex (build-time), unified/remark (runtime) |
| Chart Container | Wraps Chart.js canvas, handles resize, touch | Data store, Chart.js |
| FCV Calculator | Sliders, inputs, subcuenta calculations | Local state ($state), Chart.js for projections |
| Data Layer | Loads and validates JSON data files | All dashboard and calculator components |
| Source Attribution | Renders source metadata (org, date, URL) | Data layer (sources.json) |
| Service Worker | Caching, offline support, update detection | Browser Cache API, Workbox |
| PWA Install Prompt | Deferred install banner | Browser beforeinstallprompt event |

### Data Flow

```
[JSON files in /src/lib/data/]
    |
    v
[Zod validation at build time]
    |
    v
[SvelteKit load() functions in +page.ts]
    |
    v
[Page components receive typed data as props]
    |
    v
[Svelte reactive state ($state, $derived)]
    |
    v
[Chart.js renders to canvas] + [HTML renders calculated values]
    |
    v
[User interaction (slider, tap chart)]
    |
    v
[$state updates --> $derived recalculates --> Chart.js updates]
```

**Key principle:** Data flows DOWN from static JSON through load functions to components. User interactions only modify local state (calculator inputs, chart filters). There is no mutation of source data.

## Patterns to Follow

### Pattern 1: Static Data with Typed Load Functions

**What:** Every route that needs data loads it via SvelteKit's `+page.ts` load function. Data is imported from JSON files and validated with Zod at build time.

**When:** Every dashboard, calculator, and data-driven page.

**Example:**
```typescript
// src/routes/dashboards/oil-production/+page.ts
import oilData from '$lib/data/oil-production.json';
import { oilProductionSchema } from '$lib/schemas/oil-production';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
  const validated = oilProductionSchema.parse(oilData);
  return { oilData: validated };
};
```

**Why:** Type safety at build time catches data errors before they reach users. The `prerender = true` flag ensures static generation. No runtime data fetching.

### Pattern 2: Reactive Calculator with $derived

**What:** FCV calculator uses Svelte 5 runes for reactive computations. User inputs ($state) flow through derived calculations ($derived) to Chart.js updates.

**When:** Any interactive calculation (FCV simulator, fund projections).

**Example:**
```typescript
// FCV Calculator component
let salary = $state(500); // USD/month
let years = $state(15);

let retiro = $derived(salary * 0.07 * 12 * years);
let salud = $derived(salary * 0.07 * 12 * years);
let vivienda = $derived(salary * 0.04 * 12 * years);
let educacion = $derived(salary * 0.02 * 12 * years);
let cesantia = $derived(salary * 0.03 * 12 * years);
let total = $derived(retiro + salud + vivienda + educacion + cesantia);
```

**Why:** Svelte 5 runes compile to direct variable assignments. No virtual DOM diffing, no store subscriptions. The compiler generates the minimal update code.

### Pattern 3: Persistent App Shell Layout

**What:** A root `+layout.svelte` renders the app shell (header + bottom tabs) that persists across route navigation. Only the content area changes.

**When:** Always. This is the foundation of the app-like experience.

**Example:**
```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import Header from '$lib/components/Header.svelte';
  import BottomTabs from '$lib/components/BottomTabs.svelte';
  let { children } = $props();
</script>

<div class="flex flex-col h-screen">
  <Header />
  <main class="flex-1 overflow-y-auto pb-16">
    {@render children()}
  </main>
  <BottomTabs />
</div>
```

**Why:** The shell never re-renders on navigation. SvelteKit's client-side routing swaps only the `{@render children()}` content. This creates the native-app feel without page reloads.

### Pattern 4: Code-Split Chart Loading

**What:** Chart.js is only loaded when a user navigates to a route that needs charts. Use dynamic imports to keep the initial bundle small.

**When:** Dashboard and calculator routes.

**Example:**
```typescript
// Only load Chart.js when this route is visited
const { Chart, BarController, BarElement, CategoryScale, LinearScale } =
  await import('chart.js');
Chart.register(BarController, BarElement, CategoryScale, LinearScale);
```

**Why:** A user who only reads El Plan content never downloads Chart.js (~45 KB). Code splitting via dynamic import() is automatic with Vite/Rollup -- each route gets its own chunk.

### Pattern 5: Source Attribution on Every Data Point

**What:** Every number displayed in a chart or calculator links to its source (organization, date, URL). Data JSON files embed source metadata alongside values.

**When:** Every data visualization.

**Example:**
```json
{
  "oilProduction": {
    "current_bpd": 950000,
    "source": {
      "org": "OPEP",
      "date": "2025-03",
      "url": "https://www.opec.org/opec_web/en/publications/338.htm"
    }
  }
}
```

**Why:** The project's first inviolable principle is "cero datos inventados." Every number has a traceable source. Rendering it as a tooltip or footnote on charts maintains this principle in the interactive format.

### Pattern 6: Offline-First with Graceful Degradation

**What:** The service worker precaches all critical assets. The app works fully offline. When online, it checks for updates in the background.

**When:** Always active after first visit.

**Caching strategy:**
```
Precache (install time):
  - App shell HTML (all prerendered routes)
  - JS chunks
  - CSS
  - JSON data files
  - Web manifest + icons

Runtime cache:
  - Images: CacheFirst (maxAge: 30 days)
  - Content updates: StaleWhileRevalidate
```

**Why:** Venezuelan users have intermittent 3G. After first load, the app must work without any network. StaleWhileRevalidate for content means users see cached content immediately and get updates silently when online.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Client-Side Data Fetching

**What:** Using fetch() to load JSON data at runtime in the browser.
**Why bad:** Adds network dependency. Breaks offline on first visit (before service worker is active). Adds loading spinners on slow connections.
**Instead:** Import JSON data in +page.ts load functions. Data is embedded in the prerendered HTML. Available immediately, even offline on first visit (the HTML already contains it).

### Anti-Pattern 2: Global State Management Store

**What:** Using a centralized store (like Redux, Pinia, or even Svelte's legacy stores) for all application state.
**Why bad:** Overkill for a static data app. Adds bundle weight and complexity. Most state is route-local (calculator inputs, chart filters).
**Instead:** Use Svelte 5 $state for local component state. Use +page.ts load functions for data. Use Svelte context for cross-component state within a route (e.g., shared filter between multiple charts on a dashboard).

### Anti-Pattern 3: Importing chart.js/auto

**What:** `import Chart from 'chart.js/auto'` which registers all chart types, scales, and plugins.
**Why bad:** Disables tree-shaking entirely. Ships ~65 KB instead of ~45 KB. On a 200 KB budget, this wastes 20 KB (10% of total budget).
**Instead:** Always register individual components: `import { Chart, BarController, ... } from 'chart.js'; Chart.register(...)`.

### Anti-Pattern 4: Full Page Transitions/Animations

**What:** Using page transition animations (fade, slide) between routes.
**Why bad:** On low-end Android with 2GB RAM, JavaScript animations cause jank and make the app feel slow. CSS transitions are cheaper but still add perceived latency.
**Instead:** Instant route swaps. The app shell persists; only content changes. If any transition is needed, use CSS `opacity` transition (GPU-accelerated) with max 150ms duration.

### Anti-Pattern 5: Runtime Markdown Parsing for Static Content

**What:** Parsing markdown strings at runtime using unified/remark for content that is known at build time.
**Why bad:** Parsing markdown is CPU-intensive. On a 2GB RAM device, parsing 50+ documents at runtime causes jank and delays.
**Instead:** Use mdsvex to parse ALL static markdown at build time. Reserve runtime markdown parsing ONLY for dynamic content (e.g., descriptions loaded from JSON based on user interaction).

### Anti-Pattern 6: Eager Loading All Routes

**What:** Prefetching or preloading all route chunks on initial load.
**Why bad:** On 3G, this competes with the user's current interaction for bandwidth. Loading dashboard JS while the user is reading El Plan wastes their limited connection.
**Instead:** Let SvelteKit handle prefetching naturally (on hover/focus). Do not use `data-sveltekit-preload-data="hover"` on tab navigation -- only prefetch the active route.

## Scalability Considerations

| Concern | At Launch (100 users) | At 10K users | At 100K users |
|---------|----------------------|--------------|---------------|
| Hosting | Cloudflare Pages free tier | Same -- static files scale infinitely on CDN | Same |
| Build time | <30s for 50 routes | Same -- prerender is embarrassingly parallel | Same |
| Bundle size | ~87 KB initial | Same -- static, no server | Same |
| Data updates | Commit JSON + rebuild + deploy (~2 min) | Same | Consider CI/CD with staging preview |
| Content growth | 50 routes prerendered | 100 routes -- precache list grows, may need selective strategy | 200+ routes -- switch to runtime caching for less-visited content |
| Search | Client-side text search over prerendered content | May need lightweight search index (FlexSearch ~6 KB) | FlexSearch with worker thread |
| Analytics | None in v1 | Cloudflare Web Analytics (free, no JS) | Same |

## Directory Structure

```
venezuela-pwa/
  src/
    lib/
      components/
        Header.svelte
        BottomTabs.svelte
        charts/
          BarChart.svelte        # Wraps Chart.js bar
          LineChart.svelte       # Wraps Chart.js line
          PieChart.svelte        # Wraps Chart.js pie/doughnut
          ChartContainer.svelte  # Resize observer, loading state
        content/
          Admonition.svelte      # danger, info, tip, caution
          SourceBadge.svelte     # Shows source org + date
          TableOfContents.svelte # Generated from markdown headings
        calculator/
          FcvCalculator.svelte   # Main calculator component
          SubcuentaSlider.svelte # Individual subcuenta slider
        ui/
          Tabs.svelte            # Bits UI tabs wrapper
          Slider.svelte          # Bits UI slider wrapper
          Dialog.svelte          # Bits UI dialog wrapper
      data/
        oil-production.json
        budget-allocation.json
        fcv-parameters.json
        sovereign-fund.json
        plan-phases.json
        sources.json
      schemas/
        oil-production.ts        # Zod schemas
        budget-allocation.ts
        fcv-parameters.ts
        sovereign-fund.ts
      i18n/
        messages/
          es.json
          en.json
      utils/
        format.ts               # Number formatting, currency
        markdown.ts             # Runtime markdown processing (unified)
    routes/
      +layout.svelte            # App shell (header + tabs)
      +page.svelte              # Home tab
      fcv/
        +page.svelte            # Mi FCV calculator
        +page.ts                # Load FCV parameters
      plan/
        +layout.svelte          # Plan section layout (sidebar/list)
        [slug]/
          +page.svelte          # Individual markdown page
          +page.ts              # Load markdown content
      dashboards/
        +page.svelte            # Dashboard index
        oil-production/
          +page.svelte          # Oil production dashboard
          +page.ts              # Load oil data
        budget/
          +page.svelte          # Budget allocation dashboard
          +page.ts              # Load budget data
        sovereign-fund/
          +page.svelte          # Sovereign fund dashboard
          +page.ts              # Load fund data
      investors/
        +layout.svelte          # Investor-specific layout (EN)
        +page.svelte            # Investor landing
        [slug]/
          +page.svelte          # Investor content pages
  static/
    icons/                      # PWA icons (multiple sizes)
    favicon.ico
  content/
    plan/                       # Markdown files (migrated from docs/)
      01-fundamentos/
      02-motor-financiero/
      ...
    investors/                  # English markdown for investors
  svelte.config.js
  vite.config.ts
  tailwind.config.ts
```

## Sources

- [SvelteKit Static Site Generation Docs](https://svelte.dev/docs/kit/adapter-static) -- HIGH confidence
- [SvelteKit Service Workers Docs](https://kit.svelte.dev/docs/service-workers) -- HIGH confidence
- [Workbox Precaching](https://developer.chrome.com/docs/workbox/modules/workbox-precaching) -- HIGH confidence
- [Vite PWA SvelteKit Framework Guide](https://vite-pwa-org.netlify.app/frameworks/sveltekit) -- HIGH confidence
- [Chart.js Tree-Shaking](https://www.chartjs.org/docs/latest/getting-started/integration.html) -- HIGH confidence
- [Svelte 5 Runes](https://svelte.dev/blog/svelte-5-is-alive) -- HIGH confidence
- [BuilderIO Framework Benchmarks](https://github.com/BuilderIO/framework-benchmarks) -- MEDIUM confidence
