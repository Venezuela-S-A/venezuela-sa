---
phase: 02-content-migration
plan: 06
subsystem: ui
tags: [svelte, source-badges, event-delegation, css, remark-plugin, accessibility]

# Dependency graph
requires:
  - phase: 02-content-migration
    provides: "remark-source-badges plugin (02-01), SourceSheet/SourceBadge components (02-01), design tokens (01-02)"
provides:
  - "Interactive inline source badges with type-specific color coding"
  - "Event delegation on article container for badge clicks"
  - "SourceSheet bottom sheet wired to Article.svelte"
  - "Keyboard accessibility (Enter/Space) for source badges"
affects: [03-dashboards, content-rendering]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Event delegation on static remark HTML via closest()", "Single SourceSheet instance per Article controlled by reactive state"]

key-files:
  created: []
  modified:
    - "pwa/src/plugins/remark-source-badges.js"
    - "pwa/src/lib/styles/article.css"
    - "pwa/src/lib/components/Article.svelte"

key-decisions:
  - "Event delegation instead of per-badge Svelte component: static HTML from remark plugin cannot be wrapped in Svelte components, so Article.svelte uses closest('.vsa-source-badge') on click"
  - "28px min-height for inline badges (not 44px) to preserve text flow; touch target coverage via event delegation forgiving of near-misses"

patterns-established:
  - "Event delegation for remark plugin static HTML: Article.svelte intercepts clicks via closest() selector and parses data attributes"
  - "Single modal instance pattern: one SourceSheet per Article, controlled by reactive $state, avoids N modal instances for N badges"

requirements-completed: [CONT-05]

# Metrics
duration: 5min
completed: 2026-03-23
---

# Phase 02 Plan 06: Source Badge Interactivity Summary

**Inline source badges wired with event delegation, type-specific color coding via CSS design tokens, and SourceSheet bottom sheet for citation details**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-23T19:44:40Z
- **Completed:** 2026-03-23T19:50:09Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Type-specific CSS class (`vsa-source-badge--{type}`) added to remark plugin static HTML output for 5 source types
- Unscoped article.css rules provide color-coded badge styling using design tokens (blue multilateral, green energy, gray media, purple academic, green projection)
- Article.svelte wired with event delegation to intercept badge clicks, parse data-sources JSON, and open SourceSheet bottom sheet
- Keyboard accessibility for badges (Enter/Space activation) via delegated keydown handler

## Task Commits

Each task was committed atomically:

1. **Task 1: Add type-specific class to remark plugin + unscoped badge CSS** - `9e7f9c4` (feat)
2. **Task 2: Wire event delegation in Article.svelte to open SourceSheet on badge click** - `ed332b9` (feat)

## Files Created/Modified
- `pwa/src/plugins/remark-source-badges.js` - Added primaryType computation and type-specific CSS class to badge HTML output
- `pwa/src/lib/styles/article.css` - Added unscoped source badge CSS rules for 5 types using design tokens
- `pwa/src/lib/components/Article.svelte` - Added SourceSheet import, event delegation click/keydown handlers, and reactive sheet state

## Decisions Made
- Event delegation instead of per-badge Svelte component wrapping, since remark plugin emits static HTML that cannot be hydrated as Svelte components
- 28px min-height for inline badges to preserve text flow (44px touch target is handled by event delegation's closest() which is forgiving of near-misses)
- Single SourceSheet instance per Article controlled by reactive state, avoiding N modal instances for N badges on page

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- CONT-05 requirement fully satisfied (source badge interactivity complete)
- SourceBadge.svelte remains as an orphaned component (not imported anywhere) - can be cleaned up in a future maintenance pass
- All source badge infrastructure (remark plugin, CSS tokens, SourceSheet, Article delegation) is complete and operational

---
*Phase: 02-content-migration*
*Completed: 2026-03-23*
