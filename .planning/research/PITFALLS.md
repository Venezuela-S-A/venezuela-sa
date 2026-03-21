# Domain Pitfalls

**Domain:** PWA citizen dashboard app (Docusaurus migration, offline-first, low-end Android)
**Researched:** 2026-03-21

## Critical Pitfalls

Mistakes that cause rewrites or major issues.

### Pitfall 1: Blowing the JavaScript Budget

**What goes wrong:** Adding "just one more library" until the bundle exceeds 200 KB gzipped. Chart.js (45 KB) + a date library (20 KB) + a markdown parser (15 KB) + animation library (30 KB) + unused Chart.js plugins (20 KB) = budget blown before app code is counted.
**Why it happens:** Each library feels small in isolation. Developers optimize for DX (developer experience) not UX (user experience on 2GB RAM/3G).
**Consequences:** TTI exceeds 3 seconds on 3G. Low-end Android devices freeze during JS parsing. Users abandon before the app is interactive. The entire premise of "mobile-first for Venezuelan citizens" fails.
**Prevention:**
- Enforce a hard bundle budget in CI: `if gzip_size > 150KB for initial route, fail the build`
- Use `npx vite-bundle-visualizer` after every dependency addition
- Register Chart.js components individually (never import from `chart.js/auto`)
- No animation libraries. Use CSS transitions and Svelte built-in transitions only.
- No date libraries. Use `Intl.DateTimeFormat` (built into browsers, zero KB).
**Detection:** Lighthouse Performance score dropping below 90 on simulated 3G. Bundle analyzer showing unexpected large chunks.

### Pitfall 2: Service Worker Cache Explosion

**What goes wrong:** Precaching all 50+ prerendered HTML pages, all JS chunks, all JSON data, all images, and all icons results in a multi-MB cache that takes minutes to install on 3G. First visit becomes painfully slow as the service worker downloads everything.
**Why it happens:** The instinct is "cache everything for offline." But precaching is greedy -- it downloads everything during service worker install, blocking the user's first experience.
**Consequences:** First visit takes 30+ seconds on 3G as the service worker silently downloads 5+ MB in the background. On mobile, this drains battery and data. Users may not return for the second (fast) visit.
**Prevention:**
- Precache ONLY the app shell (layout HTML, critical JS/CSS, manifest, icons) and core JSON data files
- Use runtime caching (StaleWhileRevalidate) for individual content pages -- cache them as the user visits
- Set max precache size: aim for <1 MB total precache payload
- Use Workbox's `navigateFallback` for the app shell pattern -- offline navigation falls back to cached shell
**Detection:** Monitor service worker install time in DevTools. If install event takes >5 seconds, the precache list is too large.

### Pitfall 3: mdsvex Breaking on Svelte 5 Edge Cases

**What goes wrong:** mdsvex 0.12.x is pre-1.0 and had known Svelte 5 compatibility issues (components are no longer classes in Svelte 5). Complex markdown with embedded Svelte components or unusual syntax may fail to compile.
**Why it happens:** mdsvex was originally written for Svelte 3/4 where components were classes. Svelte 5's runes and snippet-based rendering changed the component model. The 0.12.x update addresses the main issues but edge cases may remain.
**Consequences:** Build fails for specific markdown files. Content migration stalls. Team spends days debugging preprocessor issues instead of building features.
**Prevention:**
- Test mdsvex with the 5 most complex existing markdown files FIRST before committing to full migration
- Keep a fallback plan: use unified/remark/rehype to parse markdown at build time in a custom preprocessor
- Avoid embedding complex Svelte components inside markdown. Use simple custom components (admonitions, callouts) only.
- Pin mdsvex version exactly (not ^0.12.x) and test before upgrading
**Detection:** Build errors mentioning "component", "class", or "$$" in mdsvex-processed files.

### Pitfall 4: Chart.js Memory Leaks on Mobile

**What goes wrong:** Creating Chart.js instances without destroying them when components unmount. On a single-page app where users navigate between tabs, each visit to Dashboards creates new chart instances. After 10 navigations, 10 chart instances exist in memory.
**Why it happens:** Chart.js uses HTML5 Canvas. Each Chart instance allocates a canvas context and internal data structures. SvelteKit's client-side navigation does not trigger page reloads, so instances persist unless explicitly destroyed.
**Consequences:** On 2GB RAM devices, memory exhaustion causes the browser tab to crash or the device to become unresponsive. The user has to force-close the browser.
**Prevention:**
```svelte
<script>
  import { onDestroy } from 'svelte';
  let chart: Chart;

  // ALWAYS destroy chart on component unmount
  onDestroy(() => {
    chart?.destroy();
  });
</script>
```
- Create a `ChartContainer.svelte` wrapper that handles creation AND destruction
- Never create charts in raw `<canvas>` elements without lifecycle management
- Test with Chrome DevTools Memory tab: navigate between tabs 20 times, check heap size stays stable
**Detection:** DevTools Memory panel showing increasing heap after repeated navigation. Performance monitor showing increasing DOM nodes.

## Moderate Pitfalls

### Pitfall 5: Markdown Table Styling Breaks on Mobile

**What goes wrong:** The existing 50+ markdown docs use extensive tables (financial data, comparisons). Default HTML table rendering overflows on 360px-wide mobile screens, creating horizontal scroll or breaking layout.
**Prevention:**
- Wrap all markdown tables in a `<div class="overflow-x-auto">` container
- Use a remark plugin or mdsvex layout component that automatically wraps tables
- For critical data tables: create dedicated Svelte components instead of markdown tables
- Test with Samsung Galaxy A03 viewport (360x800) during development

### Pitfall 6: Locale Toggle Creates Double Content Loading

**What goes wrong:** The ciudadano/inversor toggle switches between ES and EN content. If implemented naively, toggling downloads the alternate language's content even when the user never toggles. Or worse, both languages are loaded on every page.
**Prevention:**
- Paraglide compiles only the active locale's strings into the initial bundle
- Content routes are separate (`/plan/[slug]` vs `/investors/[slug]`), not dual-loaded
- The toggle navigates to the corresponding route in the other language, not swaps content in-place
- Only UI strings (navigation, labels) are dual-loaded. Content is route-specific.

### Pitfall 7: Forgetting SvelteKit's SSR During Static Generation

**What goes wrong:** Setting `ssr = false` in a layout or page, then wondering why adapter-static produces empty HTML shells. Without SSR, static generation has nothing to render.
**Prevention:**
- NEVER set `ssr = false` in any route. SSR must be enabled for prerendering to work.
- Set `export const prerender = true` in the root `+layout.ts`
- Verify build output: every HTML file in the `build/` directory should contain actual content, not empty `<div id="svelte"></div>`
- CI check: `grep -r "ssr = false" src/routes/ && echo "ERROR: ssr=false found" && exit 1`

### Pitfall 8: Admonition Syntax Migration

**What goes wrong:** Docusaurus uses `:::danger`, `:::info`, `:::tip`, `:::caution` blocks. mdsvex does not support this syntax natively. All 50+ docs use admonitions extensively. They silently fail or render as plain text.
**Prevention:**
- Write a custom remark plugin that converts `:::type` blocks to `<Admonition type="type">` components
- OR preprocess markdown files with a script that converts Docusaurus admonition syntax to mdsvex-compatible format
- Test migration with docs that use nested admonitions or admonitions inside lists
- Budget 1-2 days specifically for admonition migration

### Pitfall 9: Touchscreen Chart Interactions Conflicting with Scroll

**What goes wrong:** Chart.js canvas elements capture touch events for chart interactions (pan, zoom, tooltip). On a mobile screen where the chart is embedded in a scrollable page, touching the chart area prevents page scrolling. Users get "stuck" on charts.
**Prevention:**
- Disable Chart.js pan/zoom plugins on mobile (they require two-finger gestures which conflict with scroll)
- Use `interaction: { mode: 'nearest', intersect: true }` so tooltips only appear on direct tap
- Ensure the chart canvas has a fixed height (not 100vh) so the user can always scroll past it
- Test on actual touch devices, not just Chrome DevTools emulation

## Minor Pitfalls

### Pitfall 10: Missing PWA Icons at All Required Sizes

**What goes wrong:** PWA manifest requires icons at multiple sizes (192x192, 512x512 minimum, plus maskable variants). Missing sizes cause install prompts to fail on specific devices or the app icon to appear blurry.
**Prevention:**
- Use @vite-pwa/assets-generator to generate all sizes from a single source SVG
- Include maskable icons (safe zone padding) for Android adaptive icons
- Test install on actual Android device, not just Lighthouse

### Pitfall 11: JSON Data Files Not Included in Precache

**What goes wrong:** The service worker precaches HTML, JS, and CSS but forgets the JSON data files in `src/lib/data/`. Since data is imported at build time and embedded in JS chunks, this may not be an issue. But if any data is loaded dynamically (e.g., for lazy-loaded dashboard routes), the JSON fetch fails offline.
**Prevention:**
- Import all data statically in +page.ts load functions (data gets embedded in JS chunks, precached automatically)
- If dynamic JSON loading is needed, add `*.json` to Workbox's globPatterns for precaching
- Test offline mode on every route after clearing cache

### Pitfall 12: Mermaid Diagrams Lost in Migration

**What goes wrong:** The existing Docusaurus site uses Mermaid for flowcharts, gantt charts, and pie charts. mdsvex does not include Mermaid rendering. These diagrams silently disappear or render as code blocks.
**Prevention:**
- Audit all Mermaid diagrams before migration. Categorize: data visualizations (replace with Chart.js) vs. conceptual diagrams (keep as Mermaid or replace with SVG)
- For data visualizations: extract the data into JSON and build Chart.js equivalents
- For conceptual diagrams: use a lightweight Mermaid renderer or pre-render to SVG at build time
- Do NOT ship the full Mermaid library (~2 MB) to the client

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| App Shell Setup | PWA manifest misconfiguration preventing install | Test install on Android + Chrome desktop early |
| Content Migration | Admonition syntax not working in mdsvex | Write custom remark plugin first, test with complex docs |
| Content Migration | Tables overflowing on mobile | Add overflow-x-auto wrapper via remark plugin |
| Content Migration | Mermaid diagrams lost | Audit and categorize all Mermaid usage before starting |
| Dashboard Build | Chart.js bundle too large | Register only used components, verify with bundle analyzer |
| Dashboard Build | Chart memory leaks on navigation | ChartContainer wrapper with onDestroy cleanup |
| Dashboard Build | Touch scroll conflicts with chart canvas | Fixed-height charts, disable pan/zoom on mobile |
| Offline/Performance | Service worker precache too large | Budget <1 MB for precache, runtime cache the rest |
| Offline/Performance | First visit slow due to SW install | Defer SW registration until after page is interactive |
| i18n Setup | Double content loading on toggle | Separate routes per language, not inline toggle |
| i18n Setup | Paraglide compile errors | Pin version, test with simple messages first |

## Sources

- [Chart.js Memory Management](https://www.chartjs.org/docs/latest/developers/api.html) -- HIGH confidence (official docs)
- [Workbox Precaching Guide](https://developer.chrome.com/docs/workbox/modules/workbox-precaching) -- HIGH confidence
- [mdsvex Svelte 5 Issue #555](https://github.com/pngwn/MDsveX/issues/555) -- HIGH confidence (primary source)
- [SvelteKit adapter-static SSR requirement](https://svelte.dev/docs/kit/adapter-static) -- HIGH confidence
- [Vite PWA generateSW](https://vite-pwa-org.netlify.app/workbox/generate-sw) -- HIGH confidence
- [Chart.js Touch Interaction](https://www.chartjs.org/docs/latest/configuration/interactions.html) -- HIGH confidence
