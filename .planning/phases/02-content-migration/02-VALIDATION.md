---
phase: 2
slug: content-migration
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-22
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.x |
| **Config file** | `pwa/vite.config.js` (test section) |
| **Quick run command** | `cd pwa && npx vitest run` |
| **Full suite command** | `cd pwa && npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `cd pwa && npx vitest run`
- **After every plan wave:** Run `cd pwa && npx vitest run && npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-00-01 | 00 | 0 | CONT-01 | integration | `cd pwa && npx vitest run tests/content-render.test.js` | ❌ W0 | ⬜ pending |
| 02-00-02 | 00 | 0 | CONT-02 | unit | `cd pwa && npx vitest run tests/admonitions.test.js` | ❌ W0 | ⬜ pending |
| 02-00-03 | 00 | 0 | CONT-03 | unit | `cd pwa && npx vitest run tests/mermaid-static.test.js` | ❌ W0 | ⬜ pending |
| 02-00-04 | 00 | 0 | CONT-04 | unit | `cd pwa && npx vitest run tests/table-wrapper.test.js` | ❌ W0 | ⬜ pending |
| 02-00-05 | 00 | 0 | CONT-05 | unit | `cd pwa && npx vitest run tests/source-badges.test.js` | ❌ W0 | ⬜ pending |
| 02-00-06 | 00 | 0 | CONT-06 | unit | `cd pwa && npx vitest run tests/deep-links.test.js` | ❌ W0 | ⬜ pending |
| 02-00-07 | 00 | 0 | CONT-07 | integration | `cd pwa && npx vitest run tests/search.test.js` | ❌ W0 | ⬜ pending |
| 02-00-08 | 00 | 0 | CONT-08 | unit | `cd pwa && npx vitest run tests/chapter-nav.test.js` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `pwa/tests/content-render.test.js` — stubs for CONT-01 (all 85 docs render)
- [ ] `pwa/tests/admonitions.test.js` — stubs for CONT-02 (admonition type/title parsing)
- [ ] `pwa/tests/mermaid-static.test.js` — stubs for CONT-03 (mermaid block → SVG replacement)
- [ ] `pwa/tests/table-wrapper.test.js` — stubs for CONT-04 (horizontal scroll wrapper)
- [ ] `pwa/tests/source-badges.test.js` — stubs for CONT-05 (source citation parsing + classification)
- [ ] `pwa/tests/deep-links.test.js` — stubs for CONT-06 (heading + paragraph ID generation)
- [ ] `pwa/tests/search.test.js` — stubs for CONT-07 (Pagefind index generation)
- [ ] `pwa/tests/chapter-nav.test.js` — stubs for CONT-08 (chapter ordering + prev/next)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Mermaid SVG renders correctly on 360px | CONT-03 | Visual rendering quality | Open 5 sample diagrams on Chrome DevTools mobile (360px), verify readability |
| Source badge bottom sheet UX | CONT-05 | Touch interaction | Tap badge on mobile, verify bottom sheet shows org + date + URL |
| Scroll reading progress accuracy | CONT-08 | Scroll position tracking | Read chapter, close app, reopen — verify "Continue reading" lands within 1 screen of exit point |
| Admonition visual styling | CONT-02 | Visual correctness | Compare rendered admonitions against design tokens (danger=red, info=blue, tip=green, caution=yellow) |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
