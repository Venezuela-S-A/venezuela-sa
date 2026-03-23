---
phase: 02-content-migration
plan: 05
subsystem: ui
tags: [css, remark, mdsvex, admonitions, callouts, svelte]

requires:
  - phase: 02-content-migration/02
    provides: "mdsvex pipeline with remark plugins, article.css typography"
provides:
  - "Callout CSS rules for 4 admonition types (danger/caution/info/tip)"
  - "Custom remark-callouts plugin that transforms Docusaurus-style directives within mdsvex"
  - "Alias mapping: danger->deter(red), caution->warn(amber), info->note(blue), tip->commend(green)"
affects: [content-migration, pwa-ui]

tech-stack:
  added: []
  patterns:
    - "Custom remark AST plugin for mdsvex instead of remark-directive (micromark incompatibility)"
    - "serializeBlock/serializeInline for MDAST-to-HTML in remark plugins"

key-files:
  created:
    - pwa/src/plugins/remark-callouts.js
  modified:
    - pwa/src/lib/styles/article.css
    - pwa/mdsvex.config.js

key-decisions:
  - "Replaced remark-directive + remark-callout-directives with custom remark-callouts plugin because remark-directive micromark extensions are incompatible with mdsvex's internal parser"
  - "Plugin handles single-paragraph and multi-node spanning callouts (tables, lists inside directives)"

patterns-established:
  - "remark-callouts: custom AST-level plugin for mdsvex directive handling"
  - "findAndStripClosing: recursive pattern for detecting closing markers embedded in nested nodes"

requirements-completed: [CONT-04]

duration: 29min
completed: 2026-03-23
---

# Phase 02 Plan 05: Admonition Visual Distinction Summary

**Custom remark-callouts plugin replacing broken remark-directive pipeline, with CSS rules for 4 distinct admonition types (red/amber/blue/green) using design tokens**

## Performance

- **Duration:** 29 min
- **Started:** 2026-03-23T16:57:11Z
- **Completed:** 2026-03-23T17:26:00Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- All 4 admonition types (:::danger, :::caution, :::info, :::tip) render with distinct colors and SVG icons
- Custom remark-callouts.js plugin handles Docusaurus-style directives within mdsvex's incompatible parser
- Zero remaining raw `:::` directives in built HTML across all 10+ chapter pages
- CSS rules use existing design tokens (destructive/warning/info/accent) for both dark and light modes

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix alias collision and add callout CSS rules** - `cced8f2` (fix) — CSS rules added, caution alias fixed
2. **Task 1: Replace broken pipeline with custom plugin** - `f2962d6` (fix) — remark-callouts plugin replacing remark-directive

**Plan metadata:** (pending)

## Files Created/Modified
- `pwa/src/plugins/remark-callouts.js` — Custom remark plugin that transforms :::type directives into callout HTML at the AST level, handling single-paragraph, multi-node (tables/lists), and embedded-closing patterns
- `pwa/src/lib/styles/article.css` — Added CSS rules for .callout base, .callout-deter (red), .callout-warn (amber), .callout-note (blue), .callout-commend (green) using design tokens
- `pwa/mdsvex.config.js` — Replaced remark-directive + remark-callout-directives with remarkCallouts plugin

## Decisions Made
- **Replaced remark-directive pipeline entirely:** remark-directive registers micromark extensions via `this.data()` on the unified processor, but mdsvex bundles its own internal unified instance and applies remarkPlugins only as AST transforms after parsing. The micromark extensions never run, so container directives are never parsed. The only viable approach was a custom remark plugin that detects `:::type` patterns in already-parsed text nodes.
- **Handled 3 callout content patterns:** Single-paragraph (body is plain text), multi-node with paragraph closing (body contains tables/code blocks/lists between opening and closing paragraphs), and embedded-closing (closing `:::` is inside a list item or table cell).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] remark-directive incompatible with mdsvex parser**
- **Found during:** Task 1 (after CSS rules were added)
- **Issue:** remark-directive requires micromark extensions registered at parse time via `this.data().micromarkExtensions`, but mdsvex uses its own bundled parser. The extensions never run, so `:::danger` is parsed as plain text, not a `containerDirective` node. The CSS rules had no HTML elements to style.
- **Fix:** Created `pwa/src/plugins/remark-callouts.js` — a custom remark AST plugin that finds `:::type` text patterns in paragraph nodes and transforms them into `<aside class="callout callout-{type}">` HTML nodes. Handles single-paragraph, multi-node spanning (tables/lists between opening/closing), and embedded closing markers.
- **Files modified:** `pwa/src/plugins/remark-callouts.js` (created), `pwa/mdsvex.config.js` (replaced plugin chain)
- **Verification:** Build passes, all 4 callout types present in rendered HTML, zero raw directives remaining
- **Committed in:** f2962d6

---

**Total deviations:** 1 auto-fixed (Rule 3 - blocking)
**Impact on plan:** The plan assumed remark-callout-directives was generating HTML but lacked CSS. The actual root cause was deeper: the entire remark-directive pipeline doesn't work with mdsvex. The fix required creating a custom plugin but achieved the same outcome specified in the plan.

## Issues Encountered
- The debug diagnosis document (`.planning/debug/admonition-visual-distinction.md`) incorrectly stated "remark-directive IS in the plugin chain and produces containerDirective nodes; parsing is correct." This was false — remark-directive's micromark extensions are never applied by mdsvex's internal parser. The diagnosis was misleading but the CSS gap it identified was real.

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all admonition types are fully styled and rendering correctly.

## Next Phase Readiness
- UAT Test 3 (admonition visual distinction) is resolved
- All content migration gaps are closed
- Phase 02 is ready for completion

## Self-Check: PASSED

- FOUND: pwa/src/plugins/remark-callouts.js
- FOUND: pwa/src/lib/styles/article.css
- FOUND: pwa/mdsvex.config.js
- FOUND: commit cced8f2
- FOUND: commit f2962d6

---
*Phase: 02-content-migration*
*Completed: 2026-03-23*
