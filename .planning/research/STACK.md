# Technology Stack

**Project:** Venezuela S.A. PWA Ciudadana
**Researched:** 2026-03-21
**Overall Confidence:** HIGH

## Framework Decision: SvelteKit

**Recommendation: SvelteKit 2 with Svelte 5** over Next.js and Astro.

### Why SvelteKit Wins for This Use Case

| Criterion | SvelteKit | Astro | Next.js | Winner |
|-----------|-----------|-------|---------|--------|
| Bundle size (hello world) | ~1.6 KB | ~0 KB (static) | ~85 KB | Astro for static, SvelteKit for interactive |
| TTI on 3G (benchmark) | 1.5s | 0.6s (static pages) | 3.2s | Astro for content, SvelteKit for apps |
| Interactive dashboard perf | Excellent (compiled, no VDOM) | Good (islands hydrate independently) | Good (React VDOM overhead) | SvelteKit |
| Offline PWA support | First-class via @vite-pwa/sveltekit | Possible via vite-pwa/astro | Partial via next-pwa (less mature) | SvelteKit |
| App-like navigation (tabs) | Native SPA routing, transitions | MPA by default, needs workarounds | SPA routing but heavy | SvelteKit |
| Markdown rendering | mdsvex (build-time) + unified (runtime) | Native markdown support | MDX (heavy) | Astro for pure content, SvelteKit adequate |
| Static site generation | adapter-static, full prerender | Native SSG | SSG mode available | Tie |
| 2GB RAM Android perf | Best (minimal JS, no runtime) | Best for static, worse for interactive | Worst (React hydration + VDOM) | SvelteKit |
| i18n (ES/EN toggle) | Paraglide (tree-shakeable, compiler-based) | i18n via astro-i18next | next-intl (runtime, heavier) | SvelteKit |
| Developer ecosystem | Growing rapidly, Svelte 5 stable | Smaller but focused | Largest | Next.js for ecosystem, SvelteKit for DX |

**The decisive factor:** This app is 60% interactive (dashboards, calculators, sliders, drill-downs) and 40% content (markdown articles). Astro excels at content-first with sprinkled interactivity. But a fintech-like PWA with bottom tab navigation, offline-first data, and interactive calculators is fundamentally an **application**, not a content site. SvelteKit's compiled output eliminates the virtual DOM overhead that kills performance on 2GB RAM Android devices, while producing bundles 65% smaller than Next.js equivalents.

**Why NOT Astro:** Astro's islands architecture fragments interactivity. When a user navigates between tabs (Home, Mi FCV, El Plan, Dashboards), Astro's MPA model would reload the page. You could use View Transitions, but you'd be fighting the framework's content-first design to build an app-first experience. Astro + Svelte islands is a valid hybrid, but adds complexity without clear benefit when SvelteKit already handles static content well via mdsvex and adapter-static.

**Why NOT Next.js:** React's virtual DOM adds ~42 KB baseline before any application code. On a 2GB RAM Android over 3G, that's the difference between a 2s and 4s TTI. The 200KB gzipped JS budget would be consumed by React + Next.js runtime alone, leaving almost nothing for charts and interactivity. Next.js also has no first-class PWA support -- next-pwa is a community package with inconsistent maintenance.

**Confidence:** HIGH -- multiple independent benchmarks confirm SvelteKit's bundle size advantage for interactive applications. SvelteKit's PWA tooling (@vite-pwa/sveltekit) is maintained by the same team as vite-plugin-pwa (the de facto standard). Svelte 5 is stable at v5.54.0 with active releases.

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Svelte | 5.54.x | UI component framework | Compiled output = no runtime overhead. Runes API ($state, $derived, $effect) is stable. 1.6 KB baseline vs React's 42 KB. Critical for 2GB RAM target. | HIGH |
| SvelteKit | 2.55.x | Application framework | File-based routing, SSG via adapter-static, built-in service worker support, SPA-like navigation with prerender. | HIGH |
| @sveltejs/adapter-static | 3.0.x | Static site generation | Prerenders entire app to static HTML/JS/CSS. Deployable to any CDN (Vercel, Netlify, Cloudflare Pages, GitHub Pages). Zero server cost. | HIGH |
| Vite | 6.x (bundled with SvelteKit) | Build tool | Comes with SvelteKit. Fast HMR in dev, optimized Rollup builds in prod. Tree-shaking is automatic. | HIGH |
| TypeScript | 5.x | Type safety | Svelte 5 has first-class TypeScript support. Type-safe props, stores, and data loading. Catches errors at build time, critical for financial calculations (FCV). | HIGH |

### PWA & Offline

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| @vite-pwa/sveltekit | 0.6.x | PWA integration | Zero-config service worker generation via Workbox. Handles manifest, install prompt, offline caching. SvelteKit-specific integration that understands prerendered routes. | HIGH |
| Workbox (via vite-pwa) | 7.x | Service worker caching | Industry standard from Google. Precaches all static assets (HTML, JS, CSS, JSON data files). StaleWhileRevalidate for content updates. App shell loads in <100ms offline. | HIGH |

**Caching strategy for this project:**
- **Precache:** All prerendered HTML pages, JS chunks, CSS, web manifest, icons
- **Precache:** All static JSON/YAML data files (production data, FCV parameters, fund projections)
- **Runtime cache (CacheFirst):** Images and fonts
- **Runtime cache (StaleWhileRevalidate):** Markdown content pages (serve cached, update in background)

### Markdown Rendering

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| mdsvex | 0.12.x | Build-time markdown processing | Official Svelte markdown preprocessor. Converts .md/.svx files to Svelte components at build time. Supports frontmatter, syntax highlighting, custom components. Updated for Svelte 5. | MEDIUM |
| unified + remark + rehype | remark 15.x, rehype 13.x | Runtime markdown processing | For dynamically loaded markdown (e.g., fetched from JSON). Converts markdown string to HTML with full plugin ecosystem. ~15 KB total for core pipeline. | HIGH |
| remark-gfm | 4.x | GitHub Flavored Markdown | Tables, task lists, strikethrough. Essential -- the existing docs use extensive tables. | HIGH |

**Two-track markdown strategy:**
1. **Static pages** (El Plan sections, 50+ docs): Use mdsvex at build time. Each .md file becomes a prerendered route. Zero runtime cost.
2. **Dynamic content** (tooltips, data descriptions loaded from JSON): Use unified/remark/rehype at runtime. Small, tree-shakeable.

**Why NOT just mdsvex:** mdsvex runs at build time only. For content that needs to be loaded dynamically (e.g., showing different markdown descriptions based on user interaction in dashboards), you need a runtime markdown parser. Unified is the standard.

**Confidence note on mdsvex:** Version 0.12.7 was published recently with Svelte 5 updates, but it's still at 0.x. The library works and is recommended by the Svelte team, but monitor for breaking changes. Fallback: use unified/remark directly for all markdown if mdsvex becomes unstable.

### Charts & Data Visualization

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Chart.js | 4.x | Primary charting library | ~45 KB gzipped with tree-shaking (register only needed chart types). Supports bar, line, pie, doughnut, radar -- covers all dashboard needs. Touch-optimized. Canvas-based = fast on low-end devices. | HIGH |
| svelte-chartjs | 3.x | Svelte wrapper for Chart.js | Thin wrapper providing reactive Svelte components. Auto-updates charts when data changes via Svelte reactivity. | MEDIUM |

**Why Chart.js over alternatives:**

| Library | Bundle (gzip) | Touch Support | Chart Types | Verdict |
|---------|---------------|---------------|-------------|---------|
| Chart.js (tree-shaken) | ~45 KB | Yes | 8 built-in | Best balance of size, features, and ecosystem |
| uPlot | ~15 KB | Partial | Time series only | Too narrow -- no pie, radar, stacked bar |
| LayerChart | Varies (D3-based) | SVG-based | Extensive | SVG = slower rendering on low-end devices. Overkill for this use case |
| ECharts | ~300 KB | Yes | 20+ | Way too heavy for 200KB budget |
| Lightweight Charts (TradingView) | ~35 KB | Yes | Financial only | Wrong domain -- designed for candlestick/OHLC |
| Pancake | ~15 KB | Limited | Basic | Experimental, unmaintained (4 years stale) |

**Chart.js tree-shaking is critical:** Import ONLY what you use. Never import from `chart.js/auto`. Register individual components:
```typescript
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
```

This reduces Chart.js from ~65 KB to ~45 KB gzipped. For the 3-4 chart types this app needs (bar, line, pie, doughnut), that's the sweet spot.

### Internationalization (ES/EN Toggle)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| @inlang/paraglide-js | 2.15.x | Compiler-based i18n | Official SvelteKit i18n solution. Compiles translations to tree-shakeable JS functions = up to 70% smaller i18n bundles vs runtime libraries. Works with SSG. | HIGH |

**Why Paraglide over alternatives:**
- **svelte-i18n:** Runtime-based, loads all translations upfront. Adds ~8 KB + all translation strings to initial bundle.
- **typesafe-i18n:** Good but less ecosystem integration with SvelteKit.
- **Paraglide:** Compiler approach means only used translations ship. For ES/EN toggle where most users see only Spanish, this saves significant bytes. IDE autocomplete, type-safe message keys.

**Note:** This is NOT full i18n. The project has two distinct experiences (ciudadano ES vs. inversor EN) with different content. Paraglide handles the shared UI strings (navigation, labels, buttons). The content itself lives in separate markdown files per language.

### UI Components & Styling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Tailwind CSS | 4.x | Utility-first CSS | Purges unused styles at build time. Zero runtime JS. Mobile-first by default. The `sm:`, `md:` breakpoints align with mobile-first design. | HIGH |
| Bits UI | latest | Headless accessible components | Built on Melt UI for Svelte 5. Provides tabs, dialogs, sliders, dropdowns with zero styling overhead. Accessible by default (ARIA). | MEDIUM |

**Why NOT a full UI kit (Flowbite Svelte, Skeleton UI, etc.):**
Every pre-styled component adds CSS and JS weight. For a performance-constrained PWA, headless components (Bits UI) + Tailwind gives full control over bundle size. You style only what you need.

**Why NOT CSS-in-JS:** Svelte has built-in scoped styles (`<style>` blocks). Combined with Tailwind for utilities, there's zero need for styled-components, emotion, or similar runtime CSS solutions.

### Data Layer

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Static JSON files | N/A | Data source | All projection data, FCV parameters, fund allocations, oil production stats live as `.json` files in `/src/lib/data/`. No backend, no API, no runtime data fetching. | HIGH |
| YAML (optional) | N/A | Human-readable data authoring | Some data (like plan phases, KPIs) may be easier to author in YAML. Converted to JSON at build time via a Vite plugin or prebuild script. | LOW |
| Zod | 3.x | Data validation | Validates JSON data shapes at build time. Catches malformed data before it reaches dashboards. Type inference for TypeScript. ~13 KB. | MEDIUM |

**Data architecture:**
```
src/lib/data/
  oil-production.json      # Rystad projections, OPEC data
  budget-allocation.json   # Revenue distribution model
  fcv-parameters.json      # FCV subcuenta rates and formulas
  sovereign-fund.json      # Fund growth projections
  plan-phases.json         # Timeline, milestones, KPIs
  sources.json             # Source metadata (org, date, URL) for traceability
```

Each data file includes a `sources` field mapping every number to its provenance. This preserves the "cero datos inventados" principle.

### Dev Tooling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Vitest | 3.x | Unit/integration testing | Vite-native test runner. Shares Vite config with SvelteKit. Fast, watch mode, coverage. | HIGH |
| Playwright | 1.x | E2E testing | Tests on real Chromium (PWA install, offline mode, service worker). Lighthouse CI integration for performance budgets. | HIGH |
| svelte-check | latest | Type checking | Validates Svelte + TypeScript. Catches template errors. Run in CI. | HIGH |
| ESLint + Prettier | latest | Code quality | Standard. Svelte ESLint plugin included in SvelteKit scaffolding. | HIGH |

### Deployment

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Cloudflare Pages | N/A | Static hosting | Free tier generous (unlimited bandwidth, 500 builds/month). Edge CDN = fast globally. Better for LATAM users than GitHub Pages. Free custom domain + SSL. | MEDIUM |
| GitHub Pages | N/A | Fallback hosting | Already used for Docusaurus site. Free. Slower CDN, no edge functions, but works. | HIGH |

**Why Cloudflare Pages over GitHub Pages:** Cloudflare's edge network has PoPs in Bogota, Sao Paulo, Buenos Aires, Santiago -- much closer to Venezuelan users than GitHub Pages' limited CDN. For 3G users, CDN proximity matters. Free tier is sufficient for static sites.

**Why NOT Vercel/Netlify:** Both work fine. Cloudflare Pages has the best free tier for bandwidth and the most LATAM edge locations. If the team is already comfortable with Vercel or Netlify, either works -- the output is static files.

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | SvelteKit | Astro | MPA architecture fights app-like navigation. Islands fragment interactivity. Better for blogs/docs, not fintech PWAs. |
| Framework | SvelteKit | Next.js | React runtime + VDOM = 85 KB baseline. TTI on 3G ~3.2s. PWA support is community-maintained (next-pwa). Overkill for static data app. |
| Framework | SvelteKit | Qwik | Resumability is innovative but ecosystem is immature. Svelte 5 community is 10x larger. |
| Charts | Chart.js | ECharts | 300 KB gzipped. Would consume entire JS budget alone. |
| Charts | Chart.js | D3.js | Low-level, no built-in chart types. Requires 3-5x more code for same result. SVG rendering slower on low-end devices. |
| Charts | Chart.js | Recharts | React-only. Not applicable to SvelteKit. |
| i18n | Paraglide | svelte-i18n | Runtime-based = larger bundles. Loads all translations upfront. |
| CSS | Tailwind | Plain CSS/Svelte styles | Tailwind's purge + utility classes = faster development for mobile-first responsive layouts. |
| PWA | @vite-pwa/sveltekit | Custom service worker | Workbox via vite-pwa is battle-tested. Writing custom SW is error-prone and time-consuming. |
| Hosting | Cloudflare Pages | AWS S3 + CloudFront | More complex setup, similar performance, higher cost for equivalent. |

---

## Performance Budget

| Metric | Target | Rationale |
|--------|--------|-----------|
| First Contentful Paint (3G) | < 2.0s | PROJECT.md constraint |
| Time to Interactive (3G) | < 3.0s | Usable on 2GB RAM Android |
| Initial JS bundle (gzipped) | < 150 KB | Leave 50 KB headroom under 200 KB budget |
| Total JS (all routes, gzipped) | < 400 KB | Includes chart library, all pages |
| Largest Contentful Paint | < 2.5s | Core Web Vitals "Good" threshold |
| Cumulative Layout Shift | < 0.1 | No layout jank on slow connections |

**Estimated bundle breakdown (gzipped):**

| Component | Estimated Size | Notes |
|-----------|---------------|-------|
| Svelte runtime | ~2 KB | Compiled away, minimal runtime |
| SvelteKit router | ~8 KB | Client-side navigation |
| Chart.js (tree-shaken) | ~45 KB | 4 chart types: bar, line, pie, doughnut |
| Paraglide i18n | ~2 KB | Compiled translations |
| Tailwind CSS | ~10 KB | Purged, only used utilities |
| Bits UI (used components) | ~5 KB | Only tabs, slider, dialog |
| App code (initial route) | ~15 KB | Home tab + shell |
| **Initial load total** | **~87 KB** | Well under 150 KB target |

Additional route chunks loaded on navigation:
| Route | Estimated Size | Notes |
|-------|---------------|-------|
| Mi FCV (calculator) | ~25 KB | Chart + calculation logic |
| El Plan (markdown content) | ~5 KB per page | Prerendered HTML, minimal JS |
| Dashboards | ~35 KB | Charts + interactive controls |

---

## Installation

```bash
# Create project
npx sv create venezuela-pwa
# Select: SvelteKit, TypeScript, Tailwind CSS, mdsvex, Paraglide

# Core dependencies
npm install chart.js svelte-chartjs
npm install bits-ui
npm install zod

# PWA
npm install -D @vite-pwa/sveltekit

# Markdown runtime processing (for dynamic content)
npm install unified remark-parse remark-gfm remark-rehype rehype-stringify rehype-sanitize

# Dev dependencies
npm install -D vitest @testing-library/svelte
npm install -D playwright @playwright/test
npm install -D svelte-check
```

---

## Migration Path from Docusaurus

| Current (Docusaurus) | Target (SvelteKit) | Strategy |
|----------------------|-------------------|----------|
| `docs/*.md` (50+ files) | `src/routes/plan/[slug]/+page.svelte` | mdsvex preprocesses .md files at build time. Each doc becomes a prerendered route. |
| Mermaid diagrams | Chart.js interactive charts | Replace static Mermaid pie/bar/gantt with interactive Chart.js equivalents. Keep Mermaid for flowcharts via mermaid-svelte or similar. |
| Admonitions (`:::danger`) | Custom Svelte components | Create `<Admonition type="danger">` component. mdsvex supports custom components in markdown. |
| `sidebars.js` | SvelteKit file-based routing + JSON nav config | Navigation driven by data file, not sidebar config. Bottom tabs for top-level, nested navigation within sections. |
| `@docusaurus/plugin-pwa` | `@vite-pwa/sveltekit` | Better offline support, more control over caching strategies. |
| `@supabase/supabase-js` | Remove (v1 is static only) | No backend in v1. Supabase can be re-added when live data is needed. |
| `@mlc-ai/web-llm` | Remove (out of scope for v1) | WebGPU LLM requires high-end hardware. Contradicts low-end Android target. |
| `docusaurus-graph` | Custom knowledge graph (if needed) | Low priority. Build custom lightweight version with D3-force if needed later. |
| `i18n/` directory | Paraglide messages + separate route content | Paraglide for UI strings. Separate markdown files for ES/EN content. |

---

## Sources

- [Svelte npm (v5.54.0)](https://www.npmjs.com/package/svelte) -- HIGH confidence
- [SvelteKit npm (v2.55.0)](https://www.npmjs.com/package/@sveltejs/kit) -- HIGH confidence
- [@sveltejs/adapter-static npm (v3.0.10)](https://www.npmjs.com/package/@sveltejs/adapter-static) -- HIGH confidence
- [Svelte 5 Runes](https://svelte.dev/blog/svelte-5-is-alive) -- HIGH confidence
- [mdsvex Svelte CLI Docs](https://svelte.dev/docs/cli/mdsvex) -- HIGH confidence
- [Paraglide JS Svelte CLI Docs](https://svelte.dev/docs/cli/paraglide) -- HIGH confidence
- [@inlang/paraglide-js npm (v2.15.0)](https://www.npmjs.com/package/@inlang/paraglide-js) -- HIGH confidence
- [vite-pwa/sveltekit GitHub](https://github.com/vite-pwa/sveltekit) -- HIGH confidence
- [Chart.js Integration Docs](https://www.chartjs.org/docs/latest/getting-started/integration.html) -- HIGH confidence
- [Bits UI](https://bits-ui.com/) -- MEDIUM confidence
- [Flowbite Svelte Bottom Navigation](https://flowbite-svelte.com/docs/components/bottom-navigation) -- reference only
- [BuilderIO Framework Benchmarks](https://github.com/BuilderIO/framework-benchmarks) -- MEDIUM confidence
- [Nuxt vs Next.js vs Astro vs SvelteKit 2026 Comparison](https://www.nunuqs.com/blog/nuxt-vs-next-js-vs-astro-vs-sveltekit-2026-frontend-framework-showdown) -- MEDIUM confidence
- [SvelteKit vs Next.js 16 Benchmarks](https://dev.to/saqibshahdev/sveltekit-vs-nextjs-16-2026-performance-benchmarks-21pj) -- LOW confidence (community benchmark)
- [Workbox web.dev](https://web.dev/learn/pwa/workbox) -- HIGH confidence
