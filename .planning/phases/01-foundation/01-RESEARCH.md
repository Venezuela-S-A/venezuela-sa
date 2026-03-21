# Phase 1: Foundation - Research

**Researched:** 2026-03-21
**Domain:** SvelteKit 2 + Svelte 5 PWA scaffold with adapter-static, offline-first app shell, dark-first theming, mobile tab navigation
**Confidence:** HIGH

## Summary

Phase 1 builds a new SvelteKit 2 + Svelte 5 application from scratch that serves as the PWA shell for Venezuela S.A. This is NOT a migration of existing Docusaurus code -- it is a greenfield scaffold that will coexist alongside the existing Docusaurus site until Phase 2 migrates the content. The app shell delivers: 4-tab bottom navigation (Home, Mi FCV, El Plan, Dashboards), PWA installability with custom install button, offline caching of the shell, dark-first theme with system preference + toggle, 3-slide onboarding, pull-to-refresh, and a strict performance budget (FCP < 2s on 3G, bundle < 200KB gzipped).

The SvelteKit ecosystem is mature for this use case. Svelte 5 with runes ($state, $derived, $effect) is stable at v5.54. SvelteKit 2 at v2.55 with adapter-static v3.0 produces fully static output deployable to Cloudflare Pages. The PWA layer uses @vite-pwa/sveltekit (v1.1.0) which handles manifest generation, service worker with Workbox precaching, and automatic registration -- avoiding the need to hand-roll service worker logic. Dark mode uses mode-watcher (v1.1.0), a Svelte 5-native library that handles localStorage persistence, system preference detection, and flash prevention.

**Primary recommendation:** Use SvelteKit's built-in project structure with `@vite-pwa/sveltekit` for PWA, `mode-watcher` for theming, `@lucide/svelte` for icons, and vanilla CSS custom properties for the design system. Keep dependencies minimal -- the shell should ship under 50KB gzipped JS before any content or dashboard code.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Cada tab muestra un teaser con proposito -- icono + frase que explica que hara esa seccion + badge sutil "Proximamente - Fase X"
- **D-02:** Home tab muestra hero con logo/bandera, tagline ("40M accionistas. Un plan. Tu pais."), card con 3 datos clave (303B bbl, USD 60 base, 15 anos -> 3M bpd) y CTA "Explorar el plan"
- **D-03:** CTA del Home lleva al tab El Plan (aunque sea teaser). Navegacion consistente desde el dia 1
- **D-04:** Mi FCV, El Plan, Dashboards muestran icono + descripcion de lo que vendra + badge "Proximamente - Fase X"
- **D-05:** Paleta de colores nueva -- redisenar desde cero. NO conservar los colores Docusaurus (#0D47A1, #F9A825). Claude disena la paleta con estetica app nativa moderna (referencia: Revolut, Nubank, Cash App)
- **D-06:** Estilo app nativa moderna: cards elevadas con sombra, bordes redondeados (12-16px), bottom sheets para acciones, transiciones suaves, colores de acento vibrantes, iconos filled
- **D-07:** Tipografia system fonts -- cero fonts externos. -apple-system, Segoe UI, Roboto. Maximo rendimiento, 0 KB extra
- **D-08:** Dark-first -- dark mode es el default. Light mode disponible. Toggle manual + respeta preferencia del sistema. Justificacion: ahorro de bateria en AMOLED (comun en Android gama baja venezolano)
- **D-09:** Boton fijo "Instalar app" en header o footer, siempre visible, nunca interrumpe. Sin banner modal ni popup. El usuario instala cuando quiera
- **D-10:** Splash screen branded -- logo + nombre + colores. Generado por el OS desde manifest.json (background_color, theme_color, icons)
- **D-11:** Onboarding de 3 slides swipeables solo la primera vez: (1) "40 millones de accionistas", (2) "Explora, simula, opina", (3) "Funciona sin internet" + boton "Empezar". Skippable

### Claude's Discretion
- Paleta de colores exacta (con constraint: app nativa moderna, dark-first, NO colores de bandera)
- Iconografia (set de iconos: Lucide, Phosphor, Heroicons -- lo que mejor se ajuste al estilo)
- Espaciado y sizing del sistema de diseno
- Animaciones/transiciones CSS (solo CSS transitions, nada pesado)
- Estructura de carpetas SvelteKit
- Service worker strategy (precache vs runtime cache)
- Implementacion del pull-to-refresh

### Deferred Ideas (OUT OF SCOPE)
- Content migration (50+ markdown docs) -- Phase 2
- FCV calculator and dashboards -- Phase 3
- Social layer (comments, votes, sharing) -- Phase 4
- Dual experience toggle (ciudadano/inversor) -- Phase 5
- Logo/brand design beyond colors -- separate effort, use flag emoji as placeholder
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FNDN-01 | App shell con navegacion por tabs inferiores persistentes (Home, Mi FCV, El Plan, Dashboards) | SvelteKit layout system with persistent `+layout.svelte` wrapping tab routes. CSS position:fixed bottom bar with `<a>` elements using SvelteKit `$page.url.pathname` for active state |
| FNDN-02 | PWA instalable desde el navegador con manifest y service worker | `@vite-pwa/sveltekit` generates manifest.webmanifest + Workbox service worker. Custom install button via `beforeinstallprompt` API |
| FNDN-03 | Funcionamiento offline -- todo el contenido y datos cacheados | Workbox precache strategy via `@vite-pwa/sveltekit` caches all build assets and prerendered pages. Shell loads from cache on offline |
| FNDN-04 | First Contentful Paint < 2s en conexion 3G | Svelte 5 produces tiny bundles. System fonts (0 KB extra). No external CSS frameworks. Prerendered HTML via adapter-static. Lighthouse CI gate |
| FNDN-05 | Bundle JS inicial < 200KB gzipped | Minimal dependencies: SvelteKit runtime (~15KB), mode-watcher (~2KB), lucide icons (tree-shaken ~1KB per icon). Total well under budget |
| FNDN-06 | Dark mode que respeta preferencia del sistema + toggle manual | `mode-watcher` v1.1.0 handles system preference detection, localStorage persistence, flash prevention, and `.dark`/`.light` class application |
| FNDN-07 | SvelteKit 2 + Svelte 5 como framework base con adapter-static | SvelteKit 2.55 + Svelte 5.54 + adapter-static 3.0.10. Fully static output to `build/` directory. Deploy to Cloudflare Pages |
| FNDN-08 | Pull-to-refresh para verificar actualizaciones de datos cuando hay conexion | Custom touch gesture handler (~30 lines) using `touchstart`/`touchmove`/`touchend` + `overscroll-behavior-y: contain` CSS. Triggers SW update check via `registration.update()` |
</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| svelte | 5.54.1 | UI framework with runes reactivity | Smallest bundle output of any major framework. Runes ($state, $derived, $effect) are the stable API |
| @sveltejs/kit | 2.55.0 | Full-stack framework with file-based routing | Official meta-framework. Layouts, prerendering, service worker support built-in |
| @sveltejs/adapter-static | 3.0.10 | Static site generation adapter | Produces pure static files for Cloudflare Pages. No server runtime needed |
| @sveltejs/vite-plugin-svelte | 7.0.0 | Vite integration for Svelte | Required by SvelteKit. Handles Svelte compilation in Vite pipeline |
| vite | 8.0.1 | Build tool and dev server | SvelteKit's build engine. HMR, bundling, code splitting |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @vite-pwa/sveltekit | 1.1.0 | PWA manifest + service worker generation | Always -- handles manifest.webmanifest, Workbox SW, auto-registration |
| mode-watcher | 1.1.0 | Dark/light mode management | Always -- system preference detection, localStorage, flash prevention |
| @lucide/svelte | 0.577.0 | Icon library (Svelte 5 native) | Tab icons, UI elements. Tree-shakeable, ~1KB per icon |
| svelte-check | 4.4.5 | Type checking and diagnostics | Dev/CI -- validates Svelte components and TypeScript |
| vitest | 4.1.0 | Unit/component testing | Testing -- fast Vite-native test runner |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @vite-pwa/sveltekit | SvelteKit built-in SW ($service-worker) | Built-in is simpler but lacks manifest generation, Workbox strategies, and auto-update prompts. @vite-pwa handles the full PWA lifecycle |
| mode-watcher | svelte-themes or manual CSS | svelte-themes is newer with less adoption. Manual implementation misses edge cases (flash prevention, SSR safety). mode-watcher is battle-tested |
| @lucide/svelte | Phosphor Icons, Heroicons | Lucide has the largest icon set (1500+), official Svelte 5 package (@lucide/svelte), and consistent filled+outline style. Phosphor is good but no official Svelte 5 package |
| Vanilla CSS | Tailwind CSS | Tailwind adds ~10-30KB to bundle and a build step. Vanilla CSS custom properties achieve the same theming with zero overhead. For a performance-critical app targeting gama baja devices, zero-overhead wins |
| No carousel library | embla-carousel-svelte, Swiper | For 3 onboarding slides, a custom CSS scroll-snap implementation is lighter than any library (~0 KB JS vs 5-15KB). Only 3 slides with dots -- CSS handles this natively |

**Installation:**
```bash
npm create svelte@latest venezuela-sa-pwa
cd venezuela-sa-pwa
npm install
npm install -D @sveltejs/adapter-static @vite-pwa/sveltekit mode-watcher @lucide/svelte svelte-check vitest
```

**Version verification:** All versions verified against npm registry on 2026-03-21. Svelte 5.54.1 (latest), SvelteKit 2.55.0 (latest), adapter-static 3.0.10 (latest), @vite-pwa/sveltekit 1.1.0 (released 2025-11-27), mode-watcher 1.1.0 (released 2025-06-28).

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app.html                    # HTML template with %sveltekit.head% and %sveltekit.body%
├── app.css                     # Global CSS: design tokens, reset, typography, utilities
├── service-worker.js           # (Managed by @vite-pwa -- do NOT create manually)
├── lib/
│   ├── components/
│   │   ├── TabBar.svelte       # Bottom tab navigation (persistent)
│   │   ├── InstallButton.svelte # PWA install button (beforeinstallprompt)
│   │   ├── Onboarding.svelte   # 3-slide swipeable onboarding (first time only)
│   │   ├── PullToRefresh.svelte # Pull-to-refresh gesture handler
│   │   ├── ThemeToggle.svelte  # Dark/light mode toggle
│   │   └── ComingSoon.svelte   # Reusable teaser card for empty tabs
│   ├── stores/
│   │   └── onboarding.js       # localStorage-persisted onboarding completion state
│   └── styles/
│       ├── tokens.css          # CSS custom properties (colors, spacing, radii, shadows)
│       └── animations.css      # CSS transitions and keyframes
├── routes/
│   ├── +layout.svelte          # Root layout: ModeWatcher, TabBar, InstallButton, Onboarding gate
│   ├── +layout.js              # export const prerender = true; export const ssr = true;
│   ├── +page.svelte            # Home tab (hero, tagline, 3 datos clave, CTA)
│   ├── fcv/
│   │   └── +page.svelte        # Mi FCV tab (teaser/coming soon)
│   ├── plan/
│   │   └── +page.svelte        # El Plan tab (teaser/coming soon)
│   └── dashboards/
│       └── +page.svelte        # Dashboards tab (teaser/coming soon)
└── static/
    ├── icons/                  # PWA icons (192x192, 512x512, maskable)
    ├── favicon.ico             # Favicon
    └── _headers                # Cloudflare Pages custom headers (cache-control)
```

### Pattern 1: Root Layout with Persistent Tab Shell

**What:** The root `+layout.svelte` wraps all routes with the tab bar, install button, mode watcher, and onboarding gate. Tabs are `<a>` links that SvelteKit handles as client-side navigation.
**When to use:** Always -- this is the app shell pattern.
**Example:**
```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import { ModeWatcher } from 'mode-watcher';
  import { pwaInfo } from 'virtual:pwa-info';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import TabBar from '$lib/components/TabBar.svelte';
  import InstallButton from '$lib/components/InstallButton.svelte';
  import Onboarding from '$lib/components/Onboarding.svelte';
  import { hasCompletedOnboarding } from '$lib/stores/onboarding.js';

  let { children } = $props();

  let webManifestLink = $derived(
    pwaInfo ? pwaInfo.webManifest.linkTag : ''
  );

  onMount(async () => {
    if (pwaInfo) {
      const { registerSW } = await import('virtual:pwa-register');
      registerSW({ immediate: true });
    }
  });
</script>

<ModeWatcher defaultMode="dark" />

<svelte:head>
  {@html webManifestLink}
</svelte:head>

{#if browser && !$hasCompletedOnboarding}
  <Onboarding />
{:else}
  <div class="vsa-app">
    <header class="vsa-header">
      <InstallButton />
    </header>
    <main class="vsa-main">
      {@render children()}
    </main>
    <TabBar />
  </div>
{/if}
```
Source: [SvelteKit docs - Layouts](https://svelte.dev/docs/kit/routing#layout), [@vite-pwa/sveltekit docs](https://vite-pwa-org.netlify.app/frameworks/sveltekit)

### Pattern 2: CSS Custom Properties Design System (Dark-First)

**What:** All colors, spacing, and visual tokens defined as CSS custom properties on `:root` with `.dark` as default. The `.light` class overrides.
**When to use:** All styling throughout the app.
**Example:**
```css
/* src/lib/styles/tokens.css */
:root {
  /* Base tokens -- dark-first (AMOLED friendly) */
  --vsa-bg-primary: #0A0A0A;
  --vsa-bg-secondary: #141414;
  --vsa-bg-card: #1C1C1E;
  --vsa-text-primary: #F5F5F7;
  --vsa-text-secondary: #8E8E93;
  --vsa-accent: #00D9A6;         /* Vibrant teal -- modern fintech feel */
  --vsa-accent-hover: #00F0B8;
  --vsa-border: rgba(255,255,255,0.08);
  --vsa-shadow: 0 2px 8px rgba(0,0,0,0.4);

  /* Spacing scale (4px base) */
  --vsa-space-xs: 4px;
  --vsa-space-sm: 8px;
  --vsa-space-md: 16px;
  --vsa-space-lg: 24px;
  --vsa-space-xl: 32px;
  --vsa-space-2xl: 48px;

  /* Border radius */
  --vsa-radius-sm: 8px;
  --vsa-radius-md: 12px;
  --vsa-radius-lg: 16px;
  --vsa-radius-full: 9999px;

  /* Typography */
  --vsa-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  --vsa-font-size-xs: 0.75rem;
  --vsa-font-size-sm: 0.875rem;
  --vsa-font-size-base: 1rem;
  --vsa-font-size-lg: 1.125rem;
  --vsa-font-size-xl: 1.25rem;
  --vsa-font-size-2xl: 1.5rem;
  --vsa-font-size-3xl: 2rem;

  color-scheme: dark;
}

/* Light mode overrides */
.light {
  --vsa-bg-primary: #FFFFFF;
  --vsa-bg-secondary: #F5F5F7;
  --vsa-bg-card: #FFFFFF;
  --vsa-text-primary: #1C1C1E;
  --vsa-text-secondary: #6E6E73;
  --vsa-accent: #00B386;
  --vsa-accent-hover: #009E76;
  --vsa-border: rgba(0,0,0,0.08);
  --vsa-shadow: 0 2px 8px rgba(0,0,0,0.08);

  color-scheme: light;
}
```
Source: [Svelte 5 theming with vanilla CSS](https://www.davesnider.com/posts/svelte-theme), [mode-watcher](https://github.com/svecosystem/mode-watcher)

### Pattern 3: PWA Install Button via beforeinstallprompt

**What:** A non-intrusive install button that appears when the browser fires `beforeinstallprompt`. Saves the event and calls `prompt()` on user click.
**When to use:** Always visible in header, but only functional when browser supports PWA install.
**Example:**
```svelte
<!-- src/lib/components/InstallButton.svelte -->
<script>
  import { browser } from '$app/environment';
  import { Download } from '@lucide/svelte';

  let deferredPrompt = $state(null);
  let isInstalled = $state(false);

  if (browser) {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
    });

    window.addEventListener('appinstalled', () => {
      isInstalled = true;
      deferredPrompt = null;
    });

    // Check if already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      isInstalled = true;
    }
  }

  function handleInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        deferredPrompt = null;
      });
    }
  }
</script>

{#if !isInstalled && deferredPrompt}
  <button class="vsa-install-btn" onclick={handleInstall}>
    <Download size={16} />
    <span>Instalar app</span>
  </button>
{/if}
```
Source: [MDN beforeinstallprompt](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeinstallprompt_event), [web.dev PWA installation](https://web.dev/learn/pwa/installation-prompt)

### Pattern 4: Onboarding with CSS Scroll-Snap (No Library)

**What:** 3 swipeable slides using CSS `scroll-snap-type` and `scroll-snap-align`. Zero JS library needed. Completion stored in localStorage.
**When to use:** First visit only.
**Example:**
```svelte
<!-- src/lib/components/Onboarding.svelte -->
<script>
  import { hasCompletedOnboarding, completeOnboarding } from '$lib/stores/onboarding.js';

  const slides = [
    { icon: '🇻🇪', title: '40 millones de accionistas', text: 'Un plan de reconstruccion donde cada venezolano es dueno' },
    { icon: '📊', title: 'Explora, simula, opina', text: 'Dashboards interactivos, calculadora FCV, comenta cada parrafo' },
    { icon: '📶', title: 'Funciona sin internet', text: 'Instala la app y accede al plan completo offline' }
  ];

  let currentSlide = $state(0);

  function handleScroll(e) {
    const index = Math.round(e.target.scrollLeft / e.target.clientWidth);
    currentSlide = index;
  }
</script>

<div class="vsa-onboarding">
  <button class="vsa-onboarding__skip" onclick={completeOnboarding}>Saltar</button>

  <div class="vsa-onboarding__slides" onscroll={handleScroll}>
    {#each slides as slide, i}
      <div class="vsa-onboarding__slide">
        <span class="vsa-onboarding__icon">{slide.icon}</span>
        <h2>{slide.title}</h2>
        <p>{slide.text}</p>
      </div>
    {/each}
  </div>

  <div class="vsa-onboarding__dots">
    {#each slides as _, i}
      <span class="vsa-onboarding__dot" class:active={currentSlide === i}></span>
    {/each}
  </div>

  {#if currentSlide === slides.length - 1}
    <button class="vsa-onboarding__start" onclick={completeOnboarding}>Empezar</button>
  {/if}
</div>

<style>
  .vsa-onboarding__slides {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .vsa-onboarding__slide {
    flex: 0 0 100%;
    scroll-snap-align: center;
  }
</style>
```

### Pattern 5: localStorage Store with SSR Safety

**What:** A Svelte 5 store backed by localStorage that gracefully handles SSR (where localStorage doesn't exist).
**When to use:** Onboarding completion state, user preferences.
**Example:**
```javascript
// src/lib/stores/onboarding.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'vsa-onboarding-complete';

const initialValue = browser
  ? localStorage.getItem(STORAGE_KEY) === 'true'
  : false;

export const hasCompletedOnboarding = writable(initialValue);

export function completeOnboarding() {
  hasCompletedOnboarding.set(true);
  if (browser) {
    localStorage.setItem(STORAGE_KEY, 'true');
  }
}
```
Source: [SvelteKit $app/environment](https://svelte.dev/docs/kit/$app-environment)

### Anti-Patterns to Avoid

- **Setting `ssr: false` in root layout:** This produces empty HTML shells during prerender, breaking adapter-static and killing SEO/FCP. Always keep `ssr: true` (default). Guard browser-only code with `import { browser } from '$app/environment'`
- **Using `window` or `document` at module level:** Breaks SSR/prerendering. Always wrap in `onMount`, `$effect`, or `if (browser)` checks
- **Importing entire icon libraries:** `import * from '@lucide/svelte'` bundles ALL icons. Always import individual icons: `import { Home } from '@lucide/svelte'`
- **Creating `src/service-worker.js` when using @vite-pwa:** The plugin generates its own. Creating one manually causes conflicts. Disable SvelteKit's SW registration in config
- **Using `fallback: 'index.html'` with adapter-static:** Creates conflict with the prerendered homepage. Use `fallback: '200.html'` for SPA fallback on Cloudflare Pages
- **Heavy CSS animation libraries (GSAP, Framer Motion):** Violates the 200KB budget and janks on 2GB RAM devices. Use CSS transitions only

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| PWA manifest generation | Custom manifest.json + registration script | `@vite-pwa/sveltekit` | Handles manifest, icons, service worker registration, update prompts, workbox config. Manual approach misses offline update lifecycle |
| Service worker caching | Custom fetch event handler | `@vite-pwa/sveltekit` with Workbox precache | Workbox handles cache versioning, cleanup, precache manifest generation, and runtime caching strategies. Hand-rolled SWs have cache invalidation bugs |
| Dark mode management | Custom prefers-color-scheme listener + localStorage | `mode-watcher` | Handles flash prevention (inline script in HTML), SSR safety, system preference tracking, and provides reactive stores. Manual implementation always has the FOUC bug on first load |
| Onboarding carousel | Install embla-carousel or swiper.js | CSS `scroll-snap-type: x mandatory` | 3 slides don't justify 5-15KB of carousel JS. CSS scroll-snap provides native touch behavior with zero JS weight |
| Icon rendering | SVG sprite sheet or inline SVGs | `@lucide/svelte` | Tree-shakeable, Svelte 5 native components, consistent styling API, 1500+ icons. Manual SVGs are unmaintainable at scale |
| CSS design tokens | Tailwind / CSS-in-JS | Vanilla CSS custom properties | Zero runtime cost, native browser support, works with Svelte's scoped styles. Tailwind adds build complexity and 10-30KB to bundle |

**Key insight:** Every library added to the bundle MUST justify its weight against the 200KB gzipped budget. The shell itself should target < 50KB to leave room for Phase 2-5 features.

## Common Pitfalls

### Pitfall 1: Empty Shell from `ssr: false`
**What goes wrong:** Setting `export const ssr = false` in the root layout causes adapter-static to output empty HTML with only a `<div id="svelte"></div>`. FCP becomes the time to download + parse + execute JS, easily exceeding 2s on 3G.
**Why it happens:** Developers think "static site = no SSR" but adapter-static NEEDS SSR to prerender HTML content at build time.
**How to avoid:** Keep `ssr: true` (the default). Set `export const prerender = true` in root `+layout.js`. Use `browser` import for runtime-only code.
**Warning signs:** Lighthouse shows blank page during FCP measurement. View-source shows empty `<body>`.

### Pitfall 2: Service Worker Conflicts Between SvelteKit and @vite-pwa
**What goes wrong:** Both SvelteKit's built-in SW support and @vite-pwa try to register a service worker, causing double-registration or the wrong SW being active.
**Why it happens:** SvelteKit auto-registers any `src/service-worker.js` file. @vite-pwa generates its own.
**How to avoid:** Disable SvelteKit's SW registration in `svelte.config.js`: `kit: { serviceWorker: { register: false } }`. Do NOT create `src/service-worker.js`. Let @vite-pwa own the entire SW lifecycle.
**Warning signs:** Console shows two service workers registered. Cache not being invalidated on deploy.

### Pitfall 3: FOUC (Flash of Unstyled Content) on Theme Load
**What goes wrong:** Page renders in light mode briefly before switching to dark mode (or vice versa), causing a visible flash.
**Why it happens:** CSS is applied before JavaScript reads the theme preference from localStorage.
**How to avoid:** `mode-watcher` injects a blocking inline script in `<head>` that applies the `.dark` or `.light` class before any paint. Ensure `<ModeWatcher>` is placed in root layout.
**Warning signs:** Brief white flash on page load when dark mode is preferred.

### Pitfall 4: localStorage Access During SSR/Prerender
**What goes wrong:** Build fails with `ReferenceError: localStorage is not defined`.
**Why it happens:** Code accessing `localStorage` runs during SSR prerendering where no DOM exists.
**How to avoid:** Always guard with `import { browser } from '$app/environment'`. Never access `window`, `document`, or `localStorage` at module top-level without the guard.
**Warning signs:** Build failure mentioning `localStorage` or `window` not defined.

### Pitfall 5: @vite-pwa Output Directory Mismatch with adapter-static
**What goes wrong:** PWA manifest and service worker files end up in `.svelte-kit/output/` but adapter-static outputs to `build/`. The deployed site has no SW.
**Why it happens:** @vite-pwa generates files before adapter-static copies them. Without proper config, files don't make it to the final output.
**How to avoid:** Ensure `@vite-pwa/sveltekit` `kit.outDir` matches SvelteKit's output directory. The plugin handles this automatically when using the `SvelteKitPWA` wrapper (not raw `VitePWA`).
**Warning signs:** `manifest.webmanifest` returns 404 in production. Service worker not registering.

### Pitfall 6: Bundle Size Creep from Dynamic Imports
**What goes wrong:** What starts as a small shell grows past 200KB as imports accumulate.
**Why it happens:** Each Svelte component, even small ones, adds to the bundle. Icon imports without tree-shaking add the full library.
**How to avoid:** Use named imports for icons (`import { Home } from '@lucide/svelte'`). Check bundle size with `npx vite-bundle-visualizer` after each PR. Set up a CI check that fails if `build/_app/immutable/entry/start-*.js` exceeds threshold.
**Warning signs:** `npm run build` output shows JS assets growing. Lighthouse performance score dropping.

### Pitfall 7: Cloudflare Pages SPA Routing Fails on Refresh
**What goes wrong:** User navigates to `/plan`, refreshes page, gets 404.
**Why it happens:** Cloudflare Pages serves static files. `/plan` has no `plan.html` file if not prerendered.
**How to avoid:** With adapter-static, set `fallback: '200.html'` AND prerender all known routes via `export const prerender = true` in root layout. Cloudflare Pages automatically uses 200.html as SPA fallback when no matching file exists.
**Warning signs:** Refresh on any non-root route returns 404 or blank page.

## Code Examples

### SvelteKit Configuration (svelte.config.js)

```javascript
// Source: SvelteKit docs + adapter-static docs
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '200.html',
      precompress: true,
      strict: true
    }),
    serviceWorker: {
      register: false  // @vite-pwa handles registration
    },
    paths: {
      base: ''  // Root deploy on Cloudflare Pages (no subpath)
    }
  }
};

export default config;
```

### Vite Configuration (vite.config.js)

```javascript
// Source: @vite-pwa/sveltekit docs
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      strategies: 'generateSW',
      registerType: 'autoUpdate',
      manifest: {
        name: 'Venezuela S.A.',
        short_name: 'Venezuela S.A.',
        description: '40 millones de accionistas. Un plan de reconstruccion nacional.',
        theme_color: '#0A0A0A',
        background_color: '#0A0A0A',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: [
          'client/**/*.{js,css,ico,png,svg,webp,woff2}',
          'prerendered/**/*.html'
        ],
        navigateFallback: '200.html'
      }
    })
  ]
});
```

### Root Layout Page Options (+layout.js)

```javascript
// src/routes/+layout.js
// Source: SvelteKit adapter-static docs
export const prerender = true;
export const ssr = true;  // Explicit -- this is the default but documenting intent
```

### Tab Bar Component

```svelte
<!-- src/lib/components/TabBar.svelte -->
<script>
  import { page } from '$app/state';
  import { Home, Calculator, BookOpen, BarChart3 } from '@lucide/svelte';

  const tabs = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/fcv', label: 'Mi FCV', icon: Calculator },
    { href: '/plan', label: 'El Plan', icon: BookOpen },
    { href: '/dashboards', label: 'Dashboards', icon: BarChart3 }
  ];

  let currentPath = $derived(page.url.pathname);
</script>

<nav class="vsa-tabbar" role="tablist">
  {#each tabs as tab}
    {@const isActive = tab.href === '/'
      ? currentPath === '/'
      : currentPath.startsWith(tab.href)}
    <a
      href={tab.href}
      class="vsa-tabbar__tab"
      class:active={isActive}
      role="tab"
      aria-selected={isActive}
    >
      <tab.icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
      <span class="vsa-tabbar__label">{tab.label}</span>
    </a>
  {/each}
</nav>

<style>
  .vsa-tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 56px;
    background: var(--vsa-bg-secondary);
    border-top: 1px solid var(--vsa-border);
    padding-bottom: env(safe-area-inset-bottom, 0);
    z-index: 100;
  }

  .vsa-tabbar__tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    text-decoration: none;
    color: var(--vsa-text-secondary);
    font-size: var(--vsa-font-size-xs);
    transition: color 0.2s ease;
  }

  .vsa-tabbar__tab.active {
    color: var(--vsa-accent);
  }
</style>
```

### Pull-to-Refresh Component

```svelte
<!-- src/lib/components/PullToRefresh.svelte -->
<script>
  import { browser } from '$app/environment';

  let pulling = $state(false);
  let pullDistance = $state(0);
  let refreshing = $state(false);
  let startY = 0;
  const threshold = 80;

  function handleTouchStart(e) {
    if (window.scrollY === 0) {
      startY = e.touches[0].clientY;
      pulling = true;
    }
  }

  function handleTouchMove(e) {
    if (!pulling) return;
    const delta = e.touches[0].clientY - startY;
    if (delta > 0) {
      pullDistance = Math.min(delta * 0.5, threshold * 1.5);
    }
  }

  async function handleTouchEnd() {
    if (pullDistance >= threshold) {
      refreshing = true;
      // Check for SW update
      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg) await reg.update();
      }
      // Small delay for visual feedback
      await new Promise(r => setTimeout(r, 800));
      refreshing = false;
    }
    pulling = false;
    pullDistance = 0;
  }
</script>

<svelte:document
  ontouchstart={handleTouchStart}
  ontouchmove={handleTouchMove}
  ontouchend={handleTouchEnd}
/>

{#if pullDistance > 0 || refreshing}
  <div class="vsa-ptr" style="height: {pullDistance}px">
    {#if refreshing}
      <span class="vsa-ptr__spinner"></span>
    {:else}
      <span class="vsa-ptr__arrow" style="transform: rotate({pullDistance >= threshold ? 180 : 0}deg)">
        ↓
      </span>
    {/if}
  </div>
{/if}

<style>
  .vsa-ptr {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: height 0.2s ease;
  }
</style>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Svelte 4 reactive `let` + `$:` | Svelte 5 runes: `$state`, `$derived`, `$effect` | Oct 2024 (Svelte 5.0) | All new code uses runes. Old syntax still works but is legacy |
| SvelteKit `$page` store (`$page.url`) | SvelteKit `page` from `$app/state` (runes-based) | SvelteKit 2.12+ | Use `page.url.pathname` instead of `$page.url.pathname` |
| `onMount` for all side effects | `$effect` rune for reactive side effects | Svelte 5.0 | `onMount` still valid for one-time setup. `$effect` for reactive tracking |
| `export let prop` | `let { prop } = $props()` | Svelte 5.0 | All components use `$props()` destructuring |
| Workbox CLI / manual SW | @vite-pwa/sveltekit with automatic config | 2024-2025 | Zero-config PWA with SvelteKit integration |
| Custom theme toggle with CSS media query | mode-watcher library | 2024 | Handles all edge cases including FOUC, SSR, system tracking |
| `{#slot}` default content | `{@render children()}` | Svelte 5.0 | Snippets replace slots. Use `let { children } = $props()` |

**Deprecated/outdated:**
- `$:` reactive declarations -- replaced by `$derived` and `$effect`
- `export let` for component props -- replaced by `$props()` rune
- `{#slot}` syntax -- replaced by snippets (`{@render}`)
- `beforeUpdate`/`afterUpdate` lifecycle -- replaced by `$effect.pre` and `$effect`
- `createEventDispatcher` -- replaced by callback props
- `$$props` and `$$restProps` -- replaced by `$props()` spread

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.0 |
| Config file | `vite.config.js` (vitest reads from vite config) or `vitest.config.js` -- needs creation in Wave 0 |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FNDN-01 | Tab bar renders 4 tabs with correct hrefs | unit | `npx vitest run src/lib/components/__tests__/TabBar.test.js -x` | Wave 0 |
| FNDN-02 | PWA manifest has correct name, icons, display mode | unit | `npx vitest run tests/pwa-manifest.test.js -x` | Wave 0 |
| FNDN-03 | Service worker precaches build assets | smoke | Manual: Lighthouse audit > PWA section | manual-only -- SW not testable in unit tests |
| FNDN-04 | FCP < 2s on 3G | e2e | `npx lighthouse http://localhost:4173 --throttling-method=simulate --output=json` | Wave 0 (script) |
| FNDN-05 | Bundle JS < 200KB gzipped | smoke | `node scripts/check-bundle-size.js` | Wave 0 |
| FNDN-06 | Dark/light mode toggle works | unit | `npx vitest run src/lib/components/__tests__/ThemeToggle.test.js -x` | Wave 0 |
| FNDN-07 | Build succeeds with adapter-static | smoke | `npm run build` | Exists (package.json build script) |
| FNDN-08 | Pull-to-refresh triggers SW update check | unit | `npx vitest run src/lib/components/__tests__/PullToRefresh.test.js -x` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run` + `npm run build`
- **Per wave merge:** Full suite + Lighthouse audit + bundle size check
- **Phase gate:** All tests green + Lighthouse PWA badge + bundle < 200KB gzipped

### Wave 0 Gaps
- [ ] `vitest.config.js` or vitest config in `vite.config.js` -- test environment setup
- [ ] `src/lib/components/__tests__/TabBar.test.js` -- covers FNDN-01
- [ ] `tests/pwa-manifest.test.js` -- covers FNDN-02 (validate manifest JSON)
- [ ] `scripts/check-bundle-size.js` -- covers FNDN-05 (parse build output, assert < 200KB)
- [ ] `src/lib/components/__tests__/ThemeToggle.test.js` -- covers FNDN-06
- [ ] `src/lib/components/__tests__/PullToRefresh.test.js` -- covers FNDN-08
- [ ] Vitest + @testing-library/svelte install: `npm install -D vitest @testing-library/svelte jsdom`

## Open Questions

1. **Coexistence strategy with existing Docusaurus site**
   - What we know: The new SvelteKit app will eventually replace Docusaurus. During Phase 1, both could exist in the same repo.
   - What's unclear: Should they share the repo root (separate `package.json` files) or should the SvelteKit app be in a subdirectory?
   - Recommendation: Create the SvelteKit app at the repo root with a new `package.json`. Rename existing Docusaurus `package.json` to `package.docusaurus.json` for reference. The Docusaurus site can continue to be served from GitHub Pages at its current URL while the SvelteKit PWA deploys to Cloudflare Pages at a new URL.

2. **PWA icon assets**
   - What we know: Need 192x192, 512x512, and maskable variants. Current favicon.ico exists but is basic.
   - What's unclear: What the final icon design will be (deferred to separate effort per CONTEXT.md).
   - Recommendation: Use a placeholder icon (Venezuelan flag emoji rendered as PNG, or a simple "VSA" text mark) for Phase 1. Replace in a future phase when brand design is done.

3. **Base URL for Cloudflare Pages**
   - What we know: Current Docusaurus deploys to `https://venezuela-s-a.github.io/venezuela-sa/` with `baseUrl: '/venezuela-sa/'`. New deployment targets Cloudflare Pages.
   - What's unclear: Custom domain or Cloudflare Pages default URL.
   - Recommendation: Deploy to root (`/`) on Cloudflare Pages. Set `paths.base: ''` in SvelteKit config. This simplifies routing and avoids the `baseUrl` complexities that plague the current Docusaurus setup.

## Sources

### Primary (HIGH confidence)
- [SvelteKit Official Docs - Service Workers](https://svelte.dev/docs/kit/service-workers) -- complete service worker API, $service-worker module
- [SvelteKit Official Docs - adapter-static](https://svelte.dev/docs/kit/adapter-static) -- configuration, fallback, prerender options
- [SvelteKit Official Docs - Project Structure](https://svelte.dev/docs/kit/project-structure) -- canonical directory layout
- [@vite-pwa/sveltekit docs](https://vite-pwa-org.netlify.app/frameworks/sveltekit) -- complete PWA integration guide with SvelteKit
- [mode-watcher GitHub](https://github.com/svecosystem/mode-watcher) -- API, Svelte 5 compatibility, v1.1.0
- [MDN - beforeinstallprompt](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeinstallprompt_event) -- PWA install button API
- [npm registry](https://npmjs.com) -- all package versions verified 2026-03-21

### Secondary (MEDIUM confidence)
- [Svelte 5 theming with vanilla CSS](https://www.davesnider.com/posts/svelte-theme) -- CSS custom properties pattern with mode-watcher
- [SvelteKit Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/) -- deployment configuration
- [Lucide Icons for Svelte](https://lucide.dev/guide/packages/lucide-svelte) -- @lucide/svelte Svelte 5 package

### Tertiary (LOW confidence)
- Pull-to-refresh implementation -- custom pattern based on web standards, no SvelteKit-specific library exists. The pattern is straightforward but should be validated on real low-end Android devices.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All packages verified on npm, versions confirmed, Svelte 5 compatibility documented
- Architecture: HIGH -- SvelteKit project structure is well-documented, patterns follow official docs
- PWA integration: HIGH -- @vite-pwa/sveltekit v1.1.0 explicitly supports SvelteKit 2, published Nov 2025
- Pitfalls: HIGH -- Drawn from official docs, GitHub issues, and community experience
- Dark mode: HIGH -- mode-watcher v1.1.0 uses Svelte 5 syntax in its own docs, confirmed compatible
- Pull-to-refresh: MEDIUM -- Custom implementation, no established SvelteKit-specific solution exists
- Onboarding carousel: HIGH -- CSS scroll-snap is a web standard, no library dependency

**Research date:** 2026-03-21
**Valid until:** 2026-04-21 (30 days -- stable ecosystem, unlikely to change significantly)
