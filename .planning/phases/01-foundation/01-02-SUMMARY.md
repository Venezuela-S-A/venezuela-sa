---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [svelte5, coming-soon, onboarding, pwa-install, scroll-snap, localStorage, home-hero, BEM]

# Dependency graph
requires:
  - phase: 01-01
    provides: "SvelteKit app shell with Header, TabBar, ThemeToggle, design tokens, 4-tab routing"
provides:
  - "Home page hero with flag emoji, tagline, 3-column stats card with sources, CTA to /plan"
  - "ComingSoon reusable component for tab teasers with icon, title, description, phase badge"
  - "3-slide swipeable onboarding overlay with localStorage persistence"
  - "InstallButton component with beforeinstallprompt capture and standalone detection"
  - "Mi FCV, El Plan, Dashboards tab teaser pages with correct copy and icons"
affects: [01-03, 02, 03, 04, 05]

# Tech tracking
tech-stack:
  added: []
  patterns: [scroll-snap-onboarding, localStorage-ssr-safe-store, beforeinstallprompt-pattern, coming-soon-teaser]

key-files:
  created:
    - pwa/src/lib/components/ComingSoon.svelte
    - pwa/src/lib/components/Onboarding.svelte
    - pwa/src/lib/components/InstallButton.svelte
    - pwa/src/lib/stores/onboarding.js
  modified:
    - pwa/src/routes/+page.svelte
    - pwa/src/routes/fcv/+page.svelte
    - pwa/src/routes/plan/+page.svelte
    - pwa/src/routes/dashboards/+page.svelte
    - pwa/src/lib/components/Header.svelte
    - pwa/src/routes/+layout.svelte

key-decisions:
  - "Onboarding uses CSS scroll-snap with native scrolling instead of a carousel library (0KB JS overhead)"
  - "InstallButton hidden when install is impossible (standalone mode or no beforeinstallprompt), visible when actionable per D-09"
  - "Layout gates entire app shell behind onboarding - first-time users see ONLY the onboarding, not the app underneath"

patterns-established:
  - "ComingSoon component: reusable teaser with icon prop (Lucide component), title, description, phase number"
  - "Onboarding store: writable with browser guard for SSR safety, localStorage persistence via vsa-onboarding-complete key"
  - "InstallButton: captures beforeinstallprompt event, checks standalone mode, listens for appinstalled"
  - "Scroll-snap onboarding: scroll-snap-type x mandatory + scroll-snap-align center for native-feel swiping"

requirements-completed: [FNDN-01, FNDN-02, FNDN-06]

# Metrics
duration: 2min
completed: 2026-03-22
---

# Phase 01 Plan 02: Home Content and Onboarding Summary

**Home page with hero, 3-column stats card (303B/USD60/3M bpd with sources), CTA to /plan, ComingSoon teasers for 3 tabs, 3-slide swipeable onboarding, and PWA install button**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-22T02:39:55Z
- **Completed:** 2026-03-22T02:42:30Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments
- Home page communicates Venezuela S.A. value proposition with flag emoji hero, tagline "40M accionistas. Un plan. Tu pais.", and 3 verified stats (OPEP, EIA, Rystad sources)
- ComingSoon reusable component with accent-subtle icon circle, centered layout, and "Proximamente - Fase X" badge
- 3 tab teaser pages (Mi FCV/Wallet, El Plan/BookOpen, Dashboards/BarChart3) with exact copy from UI-SPEC
- 3-slide swipeable onboarding with CSS scroll-snap, dot indicators, Saltar skip button, and Empezar CTA on last slide
- InstallButton with beforeinstallprompt capture, standalone detection, and appinstalled listener
- Layout conditionally renders onboarding OR app shell based on localStorage state

## Task Commits

Each task was committed atomically:

1. **Task 1: Build Home hero, ComingSoon component, and tab teaser pages** - `b0ee598` (feat)
2. **Task 2: Build Onboarding overlay, InstallButton, and wire into layout** - `4744a7c` (feat)

## Files Created/Modified
- `pwa/src/lib/components/ComingSoon.svelte` - Reusable teaser card with icon, title, description, phase badge
- `pwa/src/lib/components/Onboarding.svelte` - 3-slide swipeable onboarding overlay with scroll-snap
- `pwa/src/lib/components/InstallButton.svelte` - PWA install button with beforeinstallprompt API
- `pwa/src/lib/stores/onboarding.js` - localStorage-persisted onboarding completion state (SSR-safe)
- `pwa/src/routes/+page.svelte` - Home page with hero, stats card, CTA button
- `pwa/src/routes/fcv/+page.svelte` - Mi FCV tab with ComingSoon (Wallet icon, phase 3)
- `pwa/src/routes/plan/+page.svelte` - El Plan tab with ComingSoon (BookOpen icon, phase 2)
- `pwa/src/routes/dashboards/+page.svelte` - Dashboards tab with ComingSoon (BarChart3 icon, phase 3)
- `pwa/src/lib/components/Header.svelte` - Added InstallButton alongside ThemeToggle
- `pwa/src/routes/+layout.svelte` - Added onboarding gate and Onboarding component import

## Decisions Made
- **Scroll-snap over carousel library:** Used native CSS scroll-snap for onboarding slides (0KB JS overhead vs 5-15KB for a library). Only 3 slides -- CSS handles this natively.
- **Onboarding replaces app shell:** Layout renders EITHER onboarding OR the app shell (Header + main + TabBar), not onboarding overlaid on top. Cleaner first-time experience.
- **InstallButton visibility:** Button only renders when `beforeinstallprompt` has fired AND app is not in standalone mode. Per D-09: "siempre visible" means always visible when actionable, not a non-functional placeholder.
- **Preserved PWA registration:** Layout already had pwaInfo/registerSW from parallel Plan 03 execution -- merged onboarding gate without disturbing PWA setup.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Merged with concurrent Plan 03 layout changes**
- **Found during:** Task 2 (layout update)
- **Issue:** +layout.svelte had been modified by parallel Plan 03 agent adding pwaInfo/registerSW. My initial write would have overwritten those changes.
- **Fix:** Re-read the file, merged onboarding imports/gate with existing PWA setup (pwaInfo, webManifestLink, registerSW)
- **Files modified:** pwa/src/routes/+layout.svelte
- **Verification:** Build passes, both PWA registration and onboarding gate present
- **Committed in:** 4744a7c (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Merge necessary due to parallel execution. No scope creep.

## Issues Encountered
- Parallel agent (Plan 03) modified +layout.svelte between Task 1 and Task 2 of this plan. Resolved by re-reading the file and merging both sets of changes.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- App shell now has real content: Home hero communicates the value proposition, tab teasers inform users what's coming
- Onboarding educates first-time visitors about the 3 core features
- PWA install button is ready in the header (will be actionable once served over HTTPS)
- Plan 03 can add remaining PWA features (service worker, manifest)
- Phase 2 can start content migration knowing the shell is complete

## Self-Check: PASSED

All 10 files verified present. Both task commits (b0ee598, 4744a7c) verified in git log. SUMMARY.md exists.

---
*Phase: 01-foundation*
*Completed: 2026-03-22*
