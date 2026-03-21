# Project Research Summary

**Project:** Venezuela S.A. PWA Ciudadana
**Domain:** Mobile-first PWA — citizen dashboard + interactive plan browser (Docusaurus migration)
**Researched:** 2026-03-21
**Confidence:** HIGH

## Executive Summary

The Venezuela S.A. PWA is a fintech-class citizen application, not a documentation site. That distinction drives every decision: the primary audience is Venezuelan citizens on 2GB RAM Android devices over 3G connections, and the app must work offline after first load. Research confirms that SvelteKit 2 with Svelte 5 is the correct framework — its compiled output eliminates the virtual DOM overhead that makes React unusable on low-end devices, its native PWA tooling is the best-maintained in the ecosystem, and its static generation via adapter-static enables zero-cost CDN hosting. The 200 KB gzipped JS budget is achievable: estimated initial load is ~87 KB, leaving headroom for the Chart.js dashboards and FCV calculator that are the core value proposition.

The recommended approach is Static-First PWA with SPA Navigation: the full app is prerendered at build time, served from Cloudflare Pages' LATAM edge network, and cached by a Workbox service worker. Data lives in JSON files bundled with the build — no backend, no API, no runtime fetching. Interactive features (FCV calculator, dashboards) use Svelte 5 runes ($state, $derived) for reactivity without a virtual DOM. This architecture means the app loads fast on first visit and works completely offline after that. The Docusaurus migration is significant but straightforward: 50+ markdown docs become prerendered routes via mdsvex, Mermaid data charts become interactive Chart.js equivalents, and admonitions require a one-time custom remark plugin.

The two critical risks that could sink the project are: (1) blowing the JS budget by adding libraries without CI enforcement — each "small" addition compounds until TTI on 3G exceeds 3 seconds and the primary audience can no longer use the app; and (2) mdsvex edge cases with Svelte 5 compatibility blocking content migration. Both are preventable with upfront discipline: a hard CI bundle size gate and testing mdsvex against the five most complex existing documents before committing to the migration path. The remaining pitfalls (Chart.js memory leaks, service worker cache size, admonition syntax migration) are well-understood and have clear prevention patterns.

---

## Key Findings

### Recommended Stack

SvelteKit 2 (v2.55.x) with Svelte 5 (v5.54.x) wins on every dimension that matters for this project: bundle size (~87 KB initial gzipped), performance on low-end devices (compiled output, no VDOM), first-class PWA support via @vite-pwa/sveltekit, and offline-first static generation via adapter-static. Chart.js 4.x provides all required chart types (bar, line, pie, doughnut) at ~45 KB gzipped when tree-shaken. Paraglide 2.15.x handles the ES/EN toggle with compiled translations — zero runtime overhead. Tailwind CSS 4.x covers styling with automatic purging. The entire stack is deployable as static files to Cloudflare Pages (free tier, LATAM edge CDN).

**Core technologies:**
- **SvelteKit 2 + Svelte 5:** Application framework + UI — compiled JS eliminates VDOM, 1.6 KB baseline vs React's 42 KB, critical for 2GB RAM target
- **@sveltejs/adapter-static:** Full static prerendering — zero server cost, CDN deployable, offline-compatible
- **@vite-pwa/sveltekit + Workbox:** PWA + offline — industry-standard service worker generation, maintained by the vite-plugin-pwa team
- **Chart.js 4.x (tree-shaken):** Data visualization — ~45 KB gzipped, canvas-based (fast on low-end), touch-optimized
- **Paraglide 2.15.x:** i18n — compiler-based, tree-shakeable translations, ES/EN toggle with zero runtime cost
- **mdsvex 0.12.x:** Build-time markdown — converts 50+ .md docs to prerendered Svelte components
- **Tailwind CSS 4.x:** Utility-first styling — purged at build time, zero runtime CSS overhead
- **TypeScript 5.x + Zod 3.x:** Type safety — build-time validation of all JSON data, catches financial calculation errors before deployment
- **Cloudflare Pages:** Hosting — free tier, LATAM PoPs (Bogota, Buenos Aires, Sao Paulo), faster CDN than GitHub Pages for target audience

### Expected Features

Research confirms a clear MVP that delivers the minimum viable citizen experience before expanding to investor features and polish.

**Must have (table stakes):**
- **Bottom tab navigation (Home, Mi FCV, El Plan, Dashboards)** — fintech apps train users to expect tabs; without them it feels like a website, not an app
- **Offline access to all content** — intermittent 3G is the baseline; if it breaks offline it fails the primary audience
- **Installable from browser (PWA)** — no app store needed; "Add to Home Screen" is the distribution mechanism
- **Markdown content rendering** — 50+ existing documents are the plan's substance
- **FCV calculator with sliders** — the "what is in it for me" feature; makes the plan tangible for citizens
- **At least 3 interactive dashboards** — oil production, budget allocation, sovereign fund growth
- **Fast load on 3G (<2s FCP)** — non-negotiable for the target audience
- **Source attribution on all data** — "cero datos inventados" principle must survive the migration to interactive format

**Should have (differentiators):**
- **Ciudadano/Inversor toggle** — single app, two audiences; investors get English pitch, citizens get Spanish plan
- **Plan progress tracker** — makes the plan feel alive, not static
- **Data drill-down on charts** — tap a bar to see source citation; builds conviction
- **Dark mode** — OLED screens, battery savings, fintech standard
- **Deep-linkable sections** — viral distribution without an app store

**Defer to v2+:**
- **Investor experience (EN full content)** — build after Spanish experience is solid
- **Comparison mode (before/after Venezuela)** — high impact, high complexity
- **Chart drill-down interactions** — v1 charts can be view-only
- **Plan progress tracker** — plan has not started executing yet
- **Dark mode** — low effort but not a launch blocker

### Architecture Approach

The architecture is Static-First PWA with SPA Navigation: SvelteKit prebuilds the entire app to static HTML/JS/CSS at build time via adapter-static, Cloudflare Pages serves it from LATAM edge nodes, and a Workbox service worker caches everything for offline use. The app shell (header + bottom tabs) is a persistent root layout that never re-renders on navigation — only the content area swaps. Data flows downward from static JSON files through typed SvelteKit load() functions to components; user interactions only modify local state ($state, $derived) with no server mutations.

**Major components:**
1. **App Shell (`+layout.svelte`)** — persistent header + bottom tabs that render once and never re-render on navigation; the foundation of the native-app feel
2. **Static Data Layer (`src/lib/data/*.json`)** — all projection data, FCV parameters, fund allocations; validated by Zod at build time; source metadata embedded alongside every value
3. **Service Worker (Workbox via @vite-pwa/sveltekit)** — precaches app shell + core data; runtime StaleWhileRevalidate for content pages; enables complete offline operation after first visit
4. **FCV Calculator** — Svelte 5 runes ($state for inputs, $derived for subcuenta calculations); zero VDOM diffing on slider updates
5. **Chart Containers** — wraps Chart.js canvas instances with onDestroy cleanup to prevent memory leaks; dynamically imported per route to keep initial bundle small
6. **Content Renderer** — mdsvex at build time for static plan docs; unified/remark at runtime only for dynamic markdown descriptions

### Critical Pitfalls

1. **JS budget explosion** — every "small" library compounds; enforce a hard CI gate (fail build if initial gzipped JS > 150 KB); never import from `chart.js/auto`; no animation libraries; no date libraries (use `Intl.DateTimeFormat`)
2. **Chart.js memory leaks on navigation** — SPA navigation does not destroy Chart instances automatically; wrap every chart in a `ChartContainer.svelte` with `onDestroy(() => chart?.destroy())`; test by navigating 20 times and checking heap in DevTools
3. **mdsvex Svelte 5 edge cases** — mdsvex 0.12.x is pre-1.0 with known Svelte 5 compatibility issues; test with the 5 most complex existing markdown files BEFORE committing to full migration; pin version exactly (no `^`)
4. **Service worker precache too large** — precaching all 50+ pages on install causes multi-MB downloads that block the first visit; precache only the app shell + critical JSON data (<1 MB total); runtime cache content pages as users visit them
5. **Admonition syntax lost in migration** — Docusaurus `:::danger`/`:::info`/`:::tip`/`:::caution` blocks are not native mdsvex syntax; write a custom remark plugin first; budget 1-2 days explicitly for this

---

## Implications for Roadmap

Based on the feature dependency graph from FEATURES.md and the architecture patterns from ARCHITECTURE.md, the work has a clear sequential dependency structure. The app shell and PWA foundation must come first because everything mounts into it. Content migration must be validated before committing to mdsvex for all 50+ documents. The FCV calculator and dashboards can proceed in parallel once the data layer pattern is established. The investor experience is a safe v1.1 addition that does not block the citizen experience.

### Phase 1: Foundation — App Shell, PWA, Routing

**Rationale:** Everything else mounts into the app shell. The bottom tab navigation, service worker registration, PWA manifest, and SvelteKit routing must exist before any content or feature can be built. This phase also establishes the Tailwind + TypeScript + Paraglide baseline that all subsequent work depends on.
**Delivers:** Installable PWA with empty tabs, offline shell, ES locale baseline
**Addresses features:** Installable from browser, bottom tab navigation, fast load (performance budget enforcement starts here)
**Avoids:** Pitfall 7 (SSR disabled blocking static generation), Pitfall 10 (missing PWA icons), Pitfall 2 (SW precache — establish budget from day one)
**Research flag:** Standard patterns — well-documented SvelteKit + vite-pwa setup, no deeper research needed

### Phase 2: Content Migration — El Plan Tab

**Rationale:** The most content-rich and most fragile phase. mdsvex compatibility with Svelte 5 is a pre-1.0 risk that must be validated early. The admonition remark plugin, table overflow handling, and Mermaid diagram strategy must be solved here before 50+ documents are migrated. Doing this before dashboards means failures surface when the cost of pivoting is still low.
**Delivers:** All 50+ plan documents accessible as prerendered routes, searchable, offline-readable
**Addresses features:** Markdown content rendering, deep-linkable sections, source attribution
**Avoids:** Pitfall 3 (mdsvex Svelte 5 edge cases), Pitfall 5 (table overflow on mobile), Pitfall 8 (admonition syntax), Pitfall 12 (Mermaid diagrams lost)
**Research flag:** Needs validation — test mdsvex with the 5 most complex existing docs on day one of this phase; fallback plan (unified/remark custom preprocessor) must be ready before committing to mdsvex for all 50+ files

### Phase 3: FCV Calculator — Mi FCV Tab

**Rationale:** The highest-value citizen feature. Once the data layer pattern is established (JSON → Zod → load() → component), the FCV calculator adds Svelte 5 runes reactivity and Chart.js integration. This phase is relatively self-contained and has well-understood patterns. It also proves the full data pipeline before dashboards depend on it.
**Delivers:** Interactive FCV subcuenta calculator with sliders, projections chart, source attribution on all parameters
**Addresses features:** FCV calculator (primary table stakes feature), source attribution
**Uses stack:** Svelte 5 $state + $derived runes, Chart.js (line chart for projections), Zod-validated fcv-parameters.json, Bits UI Slider
**Avoids:** Pitfall 4 (Chart.js memory leaks — ChartContainer with onDestroy), Pitfall 1 (bundle budget — verify Chart.js is code-split, only loaded on /fcv route)
**Research flag:** Standard patterns — Svelte 5 runes + Chart.js integration is well-documented; no deeper research needed

### Phase 4: Dashboards — Dashboards Tab

**Rationale:** The three dashboards (oil production, budget allocation, sovereign fund) share the same Chart.js + JSON data pattern established in Phase 3. The main additional concerns are mobile touch conflicts with scroll and ensuring Chart.js remains code-split per route. Build all three dashboards in this phase to share the chart abstraction components (BarChart, LineChart, PieChart, ChartContainer).
**Delivers:** Three interactive dashboards with source attribution, touch-optimized, offline-functional
**Addresses features:** Interactive dashboards, source attribution on every data point
**Uses stack:** Chart.js (bar, line, pie, doughnut), Zod-validated JSON data files, ChartContainer abstraction
**Avoids:** Pitfall 4 (memory leaks — all charts go through ChartContainer with onDestroy), Pitfall 9 (touch scroll conflict — fixed-height charts, disabled pan/zoom), Pitfall 1 (bundle budget — Chart.js dynamically imported per dashboard route)
**Research flag:** Standard patterns — Chart.js on SvelteKit is well-documented; touch conflict handling needs testing on a real device, not the Chrome emulator

### Phase 5: Offline Hardening + Performance Validation

**Rationale:** Offline behavior and performance must be validated against real conditions before launch. This phase audits the service worker precache list (target <1 MB), runs Lighthouse on simulated 3G, tests every route offline on a real low-end Android device, and enforces the CI bundle size gate. Issues discovered here are cheap to fix; discovered post-launch they require emergency releases.
**Delivers:** Verified offline functionality on every route, CI bundle gate passing, Lighthouse score >90 on 3G simulation
**Addresses features:** Offline access to all content, fast load on 3G (<2s FCP)
**Avoids:** Pitfall 1 (bundle explosion — CI gate enforcement), Pitfall 2 (SW cache explosion — audit precache list), Pitfall 11 (JSON data not precached)
**Research flag:** Standard patterns — Workbox and Lighthouse CI are well-documented; this is a validation phase, not a research phase

### Phase 6: Investor Experience + ES/EN Toggle

**Rationale:** The investor experience (English content, inversor toggle) can be built safely after the citizen experience is solid. Separate routes (`/investors/[slug]`) avoid the double-content-loading pitfall. Paraglide compiles only the active locale's UI strings. This phase is lower risk because it follows established patterns from Phase 2 (content migration).
**Delivers:** English investor content accessible, ciudadano/inversor toggle functional, Paraglide EN locale active
**Addresses features:** Ciudadano/Inversor toggle (differentiator)
**Avoids:** Pitfall 6 (locale toggle double-loading — separate routes, not inline swap)
**Research flag:** Standard patterns — Paraglide + SvelteKit i18n is well-documented; content authoring in English is the main effort

### Phase Ordering Rationale

- **Shell before content:** Every feature mounts into the app shell; routing and PWA manifest must be validated before content is added
- **Content before dashboards:** mdsvex compatibility risk must surface early; the fallback (unified/remark preprocessor) is cheaper to implement at Phase 2 than at Phase 4
- **Calculator before dashboards:** FCV calculator proves the full data pipeline (JSON → Zod → load() → $state/$derived → Chart.js) at smaller scale; dashboards then reuse that pattern
- **Hardening before investor experience:** Performance and offline validation on the citizen experience (the primary audience) takes priority; investor experience is lower traffic, lower stakes
- **Investor last:** It does not block launch for the primary audience; it is a safe parallel or sequential addition

### Research Flags

Phases needing deeper research during planning:
- **Phase 2 (Content Migration):** mdsvex 0.12.x Svelte 5 compatibility is a pre-1.0 risk. On day one of planning this phase, run mdsvex against the 5 most complex existing docs (those with nested admonitions, embedded components, and extensive tables). If more than 1 fails, switch to the unified/remark custom preprocessor fallback before planning the full migration.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** SvelteKit + vite-pwa setup is fully documented with official guides and the vite-pwa/sveltekit framework integration guide
- **Phase 3 (FCV Calculator):** Svelte 5 runes + Chart.js is a common pattern with good documentation
- **Phase 4 (Dashboards):** Follows the same pattern established in Phase 3; Chart.js touch handling is documented
- **Phase 5 (Offline Hardening):** Workbox and Lighthouse CI are well-documented; this is a validation phase, not a research phase
- **Phase 6 (Investor Experience):** Follows the content migration pattern from Phase 2 with Paraglide on top

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All core libraries verified against official npm/docs sources. SvelteKit 2.55.0 and Svelte 5.54.0 are stable releases with active maintenance. Paraglide 2.15.0 is the official SvelteKit i18n solution. Only mdsvex is MEDIUM (pre-1.0). |
| Features | HIGH | Feature list derived from project constraints (PROJECT.md) + established fintech PWA patterns. Table stakes are unambiguous. Differentiators validated against the dual-audience requirement. |
| Architecture | HIGH | Static-First PWA is the dominant pattern for content-heavy, offline-first apps with known data. All patterns (load functions, runes reactivity, ChartContainer lifecycle) are well-documented with official sources. |
| Pitfalls | HIGH | All critical pitfalls sourced from official documentation (Chart.js API docs, Workbox precaching guide, mdsvex GitHub issues, SvelteKit adapter-static docs). Not inferred — confirmed from primary sources. |

**Overall confidence:** HIGH

### Gaps to Address

- **mdsvex Svelte 5 compatibility under real conditions:** The library is pre-1.0 and has known issues. The gap is not whether it works (it does for basic cases) but whether it handles the specific syntax patterns in the existing 50+ Venezuela S.A. documents (nested admonitions, Mermaid code blocks, frontmatter edge cases). Validate in Phase 2 day one before full migration.
- **Real-device performance baseline:** All performance estimates are based on Lighthouse simulated 3G and framework benchmarks (MEDIUM confidence sources). Actual performance on a Samsung Galaxy A03 or equivalent 2GB RAM device may differ. Establish a real-device test rig in Phase 5 and back-reference to Phase 3/4 if issues surface.
- **Bits UI Svelte 5 stability:** Listed as MEDIUM confidence in STACK.md. Built on Melt UI for Svelte 5 and actively maintained, but younger than alternatives. Fallback: build accessible Tab and Slider components directly using WAI-ARIA patterns from Bits UI docs.
- **Cloudflare Pages LATAM latency:** CDN proximity estimates are based on Cloudflare's public network map, not measured latency to Venezuelan ISPs. If real-world latency is higher than expected, consider Cloudflare Workers for HTML streaming — but only if measurements confirm a problem.
- **Supabase re-integration path:** v1 removes Supabase entirely. JSON data files should be structured so that migrating to a live API in v2 is a load-function change, not a component rewrite. Document the migration contract during Phase 3 (data layer establishment).

---

## Sources

### Primary (HIGH confidence)
- [Svelte npm v5.54.0](https://www.npmjs.com/package/svelte) — framework version and stability
- [SvelteKit npm v2.55.0](https://www.npmjs.com/package/@sveltejs/kit) — framework version
- [@sveltejs/adapter-static npm v3.0.10](https://www.npmjs.com/package/@sveltejs/adapter-static) — static generation
- [SvelteKit Static Site Generation Docs](https://svelte.dev/docs/kit/adapter-static) — SSR requirement for prerendering
- [SvelteKit Service Workers Docs](https://kit.svelte.dev/docs/service-workers) — service worker patterns
- [Svelte 5 Runes](https://svelte.dev/blog/svelte-5-is-alive) — $state, $derived API stability
- [mdsvex Svelte CLI Docs](https://svelte.dev/docs/cli/mdsvex) — official integration
- [Paraglide JS Svelte CLI Docs](https://svelte.dev/docs/cli/paraglide) — official i18n integration
- [@inlang/paraglide-js npm v2.15.0](https://www.npmjs.com/package/@inlang/paraglide-js) — version confirmation
- [vite-pwa/sveltekit GitHub](https://github.com/vite-pwa/sveltekit) — PWA integration
- [Vite PWA SvelteKit Framework Guide](https://vite-pwa-org.netlify.app/frameworks/sveltekit) — caching strategy patterns
- [Chart.js Integration Docs](https://www.chartjs.org/docs/latest/getting-started/integration.html) — tree-shaking guide
- [Chart.js Memory Management](https://www.chartjs.org/docs/latest/developers/api.html) — onDestroy pattern
- [Chart.js Touch Interaction](https://www.chartjs.org/docs/latest/configuration/interactions.html) — mobile touch config
- [Workbox Precaching Guide](https://developer.chrome.com/docs/workbox/modules/workbox-precaching) — precache vs runtime cache strategy
- [mdsvex Svelte 5 Issue #555](https://github.com/pngwn/MDsveX/issues/555) — known compatibility issues
- [SvelteKit adapter-static SSR requirement](https://svelte.dev/docs/kit/adapter-static) — never set ssr=false

### Secondary (MEDIUM confidence)
- [BuilderIO Framework Benchmarks](https://github.com/BuilderIO/framework-benchmarks) — bundle size comparisons
- [Nuxt vs Next.js vs Astro vs SvelteKit 2026 Comparison](https://www.nunuqs.com/blog/nuxt-vs-next-js-vs-astro-vs-sveltekit-2026-frontend-framework-showdown) — framework selection rationale
- [Bits UI](https://bits-ui.com/) — headless component library
- [PWA best practices 2025](https://senorit.de/en/blog/progressive-web-apps-guide-2025) — PWA patterns

### Tertiary (LOW confidence)
- [SvelteKit vs Next.js 16 Benchmarks](https://dev.to/saqibshahdev/sveltekit-vs-nextjs-16-2026-performance-benchmarks-21pj) — community benchmark, directionally correct but unverified methodology
- YAML data authoring — low priority, not validated against actual team workflow

---

*Research completed: 2026-03-21*
*Ready for roadmap: yes*
