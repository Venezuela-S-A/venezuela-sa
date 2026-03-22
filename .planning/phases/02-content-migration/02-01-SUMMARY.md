---
phase: 02-content-migration
plan: 01
subsystem: content-pipeline
tags: [mdsvex, remark, rehype, mermaid, svelte5, markdown, content-layer]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: SvelteKit project with adapter-static, Svelte 5, PWA config, service worker
provides:
  - mdsvex markdown processing pipeline with .md extension support
  - 4 remark plugins (mermaid-static, directive, callout-directives, source-badges)
  - 4 rehype plugins (slug, autolink-headings, paragraph-ids, table-wrapper)
  - Chapter definitions mapping 10 visible chapters (71 docs) from sidebars.js
  - Source type classification (5 types with CSS variable references)
  - Reading progress localStorage store with chapter tracking
  - Reading time calculator utility
  - Mermaid SVG build script with content-hash caching
affects: [02-02-chapter-routing, 02-03-search, 02-04-components, 02-05-integration]

# Tech tracking
tech-stack:
  added: [mdsvex@0.12.7, remark-directive@4.0, remark-callout-directives@5.0, rehype-slug@6.0, rehype-autolink-headings@7.1, gray-matter@4.0.3, reading-time@1.5, mermaid-cli@11.12.0, unist-util-visit@5.1]
  patterns: [remark/rehype plugin chain, content-hash SVG caching, localStorage store with derived stores]

key-files:
  created:
    - pwa/mdsvex.config.js
    - pwa/src/plugins/remark-mermaid-static.js
    - pwa/src/plugins/remark-source-badges.js
    - pwa/src/plugins/rehype-paragraph-ids.js
    - pwa/src/plugins/rehype-table-wrapper.js
    - pwa/src/lib/content/chapters.js
    - pwa/src/lib/content/sources.js
    - pwa/src/lib/stores/reading-progress.js
    - pwa/src/lib/utils/reading-time.js
    - pwa/scripts/build-mermaid.js
  modified:
    - pwa/svelte.config.js
    - pwa/package.json

key-decisions:
  - "remark-source-badges inlines classification logic instead of importing from $lib (runs at build time in Node, not SvelteKit)"
  - "Each doc belongs to exactly ONE chapter -- cross-referenced docs from sidebars.js live only in oportunidades chapter"
  - "Mermaid build script uses execSync with mmdc CLI rather than programmatic API for simplicity and reliability"

patterns-established:
  - "Remark plugin pattern: export named function returning tree transformer with unist-util-visit"
  - "Content module pattern: pure JS modules in src/lib/content/ with named exports"
  - "Store pattern: writable + derived stores with localStorage persistence following onboarding.js template"

requirements-completed: [CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-08]

# Metrics
duration: 5min
completed: 2026-03-22
---

# Phase 02 Plan 01: Markdown Pipeline + Content Data Layer Summary

**mdsvex 0.12.7 pipeline with 8 remark/rehype plugins processing .md files, chapter mapping of 71 docs across 10 visible chapters, source classification for 5 org types, and Mermaid SVG build script with content-hash caching**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-22T13:11:44Z
- **Completed:** 2026-03-22T13:17:38Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments
- mdsvex configured and integrated into svelte.config.js with .md extension support and 8-plugin chain
- 4 custom remark/rehype plugins created: mermaid-static SVG replacement, source citation badges, sequential paragraph IDs, scrollable table wrappers
- Content data layer established: 10 chapters (71 unique docs, zero duplicates), 5 source types, localStorage reading progress store
- Mermaid build script with MD5 content-hash caching and xychart-beta placeholder fallback

## Task Commits

Each task was committed atomically:

1. **Task 1: Install dependencies and configure mdsvex pipeline with remark/rehype plugins** - `bd50dc6` (feat)
2. **Task 2: Create content data layer and Mermaid build script** - `8c6036c` (feat)

## Files Created/Modified
- `pwa/mdsvex.config.js` - mdsvex configuration with 4 remark + 4 rehype plugins
- `pwa/svelte.config.js` - Updated with mdsvex preprocessor and .md extension
- `pwa/src/plugins/remark-mermaid-static.js` - Replaces mermaid code blocks with static SVG image references
- `pwa/src/plugins/remark-source-badges.js` - Parses inline source citations into badge markup
- `pwa/src/plugins/rehype-paragraph-ids.js` - Adds sequential p-N IDs to paragraphs
- `pwa/src/plugins/rehype-table-wrapper.js` - Wraps tables in scrollable containers with star-table support
- `pwa/src/lib/content/chapters.js` - 10 visible chapters + 2 hidden + 2 standalone pages
- `pwa/src/lib/content/sources.js` - 5 source types (multilateral, energy, media, academic, projection)
- `pwa/src/lib/stores/reading-progress.js` - localStorage-backed reading position store with derived lastReadChapter
- `pwa/src/lib/utils/reading-time.js` - Reading time calculator wrapping reading-time library
- `pwa/scripts/build-mermaid.js` - Pre-build Mermaid SVG renderer with caching
- `pwa/package.json` - Dependencies added, build:mermaid script integrated into build pipeline

## Decisions Made
- remark-source-badges inlines the source classification logic rather than importing from `$lib/content/sources.js`, because the plugin runs at build time in Node where SvelteKit path aliases are not available
- Each doc belongs to exactly ONE chapter per RESEARCH.md Pitfall 6 -- cross-referenced docs from sidebars.js (e.g., petroleo-gas appearing in Motor Financiero sidebar) live only in the oportunidades chapter in chapters.js
- Mermaid build script uses `execSync` with the mmdc CLI binary rather than the programmatic API for simplicity and error isolation per diagram

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Known Stubs

None - all modules export real logic with no placeholder data or TODO markers.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- mdsvex pipeline ready for chapter route rendering (Plan 02)
- chapters.js provides navigation data for landing page and chapter routes
- sources.js provides classification for SourceBadge component rendering
- reading-progress store ready for scroll tracking integration
- build:mermaid script ready for CI integration (will generate SVGs on first build)

## Self-Check: PASSED

- All 12 created files verified on disk
- Both task commits (bd50dc6, 8c6036c) found in git log
- All 12 tests pass (npx vitest run)
- mdsvex config loads with 4 remark + 4 rehype plugins
- chapters.js has 10 visible chapters, 71 unique docs, 0 duplicates
- sources.js classifies all 5 types correctly

---
*Phase: 02-content-migration*
*Completed: 2026-03-22*
