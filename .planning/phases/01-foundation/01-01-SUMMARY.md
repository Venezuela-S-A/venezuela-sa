---
phase: 01-foundation
plan: 01
subsystem: ui
tags: [sveltekit, svelte5, adapter-static, mode-watcher, lucide, css-custom-properties, pwa-shell, dark-mode]

# Dependency graph
requires:
  - phase: 01-00
    provides: "Test stubs for TabBar, ThemeToggle, PullToRefresh, PWA manifest"
provides:
  - "SvelteKit 2 + Svelte 5 project scaffold in pwa/"
  - "Design system tokens (CSS custom properties) from UI-SPEC"
  - "App shell with Header, TabBar, ThemeToggle components"
  - "4-tab bottom navigation (Inicio, Mi FCV, El Plan, Dashboards)"
  - "Dark-first theming via mode-watcher with light mode toggle"
  - "Static build output via adapter-static with SPA fallback"
affects: [01-02, 01-03, 02, 03, 04, 05]

# Tech tracking
tech-stack:
  added: [svelte@5, @sveltejs/kit@2, @sveltejs/adapter-static@3, mode-watcher@1, @lucide/svelte@0.577, vitest@3, @testing-library/svelte@5, jsdom@26]
  patterns: [dark-first-css-tokens, vsa-bem-namespace, adapter-static-with-spa-fallback, mode-watcher-light-class]

key-files:
  created:
    - pwa/package.json
    - pwa/svelte.config.js
    - pwa/vite.config.js
    - pwa/src/app.html
    - pwa/src/app.css
    - pwa/src/lib/styles/tokens.css
    - pwa/src/routes/+layout.js
    - pwa/src/routes/+layout.svelte
    - pwa/src/lib/components/TabBar.svelte
    - pwa/src/lib/components/Header.svelte
    - pwa/src/lib/components/ThemeToggle.svelte
    - pwa/src/routes/+page.svelte
    - pwa/src/routes/fcv/+page.svelte
    - pwa/src/routes/plan/+page.svelte
    - pwa/src/routes/dashboards/+page.svelte
  modified: []

key-decisions:
  - "mode-watcher configured with lightClassNames=['light'] and darkClassNames=[] since tokens.css uses :root (dark) and :root.light (light override)"
  - "svelte-ignore a11y_no_noninteractive_element_to_interactive_role on TabBar nav element - valid WAI-ARIA pattern for tab navigation"
  - "@lucide/svelte pinned to ^0.577.0 (latest stable, Svelte 5 native)"
  - "serviceWorker.register: false to prevent future conflict with @vite-pwa (Plan 03)"
  - "SPA fallback via 200.html for Cloudflare Pages routing"

patterns-established:
  - "Dark-first tokens: :root = dark defaults, :root.light = light overrides"
  - "BEM with vsa- namespace: vsa-tabbar, vsa-header, vsa-theme-toggle"
  - "Design tokens consumed via var(--vsa-*) throughout all components"
  - "Tab active state via page.url.pathname from $app/state (Svelte 5 runes)"
  - "Icon filled/outline toggle: fill=currentColor+stroke=none for active, fill=none+stroke=currentColor for inactive"
  - "44px minimum touch targets for all interactive elements"

requirements-completed: [FNDN-07, FNDN-01, FNDN-06]

# Metrics
duration: 7min
completed: 2026-03-22
---

# Phase 01 Plan 01: App Shell Summary

**SvelteKit 2 + Svelte 5 app shell with 4-tab navigation, dark-first theming via mode-watcher, and complete design system tokens from UI-SPEC**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-22T02:28:15Z
- **Completed:** 2026-03-22T02:36:14Z
- **Tasks:** 2
- **Files modified:** 15

## Accomplishments
- SvelteKit project scaffold in pwa/ with adapter-static producing static HTML output and SPA fallback
- Complete design system tokens (colors, spacing, typography, radii, shadows) defined as CSS custom properties
- App shell with fixed Header (48px, app name + ThemeToggle) and fixed TabBar (56px, 4 tabs with Lucide icons)
- Dark mode default with light mode toggle via mode-watcher, persistence via localStorage
- All 4 routes prerendered: /, /fcv, /plan, /dashboards
- Wave 0 test stubs from Plan 00 all pass (4 test suites)

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold SvelteKit project with design system tokens** - `9732413` (feat)
2. **Task 2: Build TabBar, Header, ThemeToggle, and wire into root layout** - `fabd526` (feat)

## Files Created/Modified
- `pwa/package.json` - SvelteKit project config with all dependencies
- `pwa/svelte.config.js` - adapter-static, SW register disabled, SPA fallback
- `pwa/vite.config.js` - SvelteKit + Vitest config (no SvelteKitPWA yet)
- `pwa/src/app.html` - HTML template with lang="es" and viewport-fit=cover
- `pwa/src/app.css` - CSS reset, layout helpers, tokens import
- `pwa/src/lib/styles/tokens.css` - Design system tokens (dark/light mode)
- `pwa/src/routes/+layout.js` - prerender=true, ssr=true
- `pwa/src/routes/+layout.svelte` - Root layout with ModeWatcher, Header, TabBar
- `pwa/src/lib/components/TabBar.svelte` - Bottom tab navigation (4 tabs, Lucide icons, ARIA)
- `pwa/src/lib/components/Header.svelte` - Fixed header with app name and ThemeToggle
- `pwa/src/lib/components/ThemeToggle.svelte` - Dark/light mode toggle (Sun/Moon icons)
- `pwa/src/routes/+page.svelte` - Home placeholder
- `pwa/src/routes/fcv/+page.svelte` - Mi FCV placeholder
- `pwa/src/routes/plan/+page.svelte` - El Plan placeholder
- `pwa/src/routes/dashboards/+page.svelte` - Dashboards placeholder

## Decisions Made
- **mode-watcher class config:** Configured `lightClassNames=['light']` and `darkClassNames=[]` because tokens.css defines `:root` as dark (default) and `:root.light` as light override. mode-watcher's default (`darkClassNames=['dark']`) would add an unnecessary class since `:root` is already dark.
- **TabBar a11y suppression:** Suppressed Svelte's `a11y_no_noninteractive_element_to_interactive_role` warning on `<nav role="tablist">`. This is a valid WAI-ARIA pattern per the plan's spec and WCAG guidelines. `<nav>` is the appropriate semantic element for tab navigation.
- **Lucide version:** Pinned to `^0.577.0` (latest stable release with native Svelte 5 support). The `^0.400.0` range initially specified in the plan didn't exist on npm.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed @lucide/svelte version range**
- **Found during:** Task 1 (npm install)
- **Issue:** Plan specified `^0.400.0` but @lucide/svelte starts at 0.571.0 on npm. No version matched.
- **Fix:** Changed to `^0.577.0` (latest stable, confirmed Svelte 5 native per RESEARCH.md)
- **Files modified:** pwa/package.json
- **Verification:** npm install succeeds, build passes
- **Committed in:** 9732413 (Task 1 commit)

**2. [Rule 3 - Blocking] Suppressed a11y warning on TabBar nav element**
- **Found during:** Task 2 (build)
- **Issue:** Svelte compiler warns that `<nav>` cannot have `role="tablist"` (non-interactive to interactive). Plan requires `role="tablist"` on the tab bar.
- **Fix:** Added `<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->` comment. This is a valid WAI-ARIA usage.
- **Files modified:** pwa/src/lib/components/TabBar.svelte
- **Verification:** Build passes with no warnings
- **Committed in:** fabd526 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both fixes necessary to complete tasks. No scope creep.

## Issues Encountered
- `create-svelte` CLI deprecated in favor of `sv create` which didn't work via npx. Resolved by manually scaffolding the SvelteKit project from scratch using the exact file contents specified in the plan. This is a valid approach since SvelteKit projects are just config files + source code.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- App shell is complete and builds to static output in `pwa/build/`
- Plan 02 can add Home hero content, ComingSoon teasers, InstallButton, and Onboarding
- Plan 03 can add @vite-pwa/sveltekit for PWA manifest and service worker
- The `serviceWorker.register: false` config is ready to be replaced when @vite-pwa is added

## Self-Check: PASSED

All 15 created files verified present. Both task commits (9732413, fabd526) verified in git log. SUMMARY.md exists.

---
*Phase: 01-foundation*
*Completed: 2026-03-22*
