---
phase: 01
slug: foundation
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-21
---

# Phase 01 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.0 |
| **Config file** | vite.config.js (vitest reads from vite config) — Wave 0 installs |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run && npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green + Lighthouse PWA audit
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-00-01 | 00 | 0 | FNDN-01,02,06,08 | scaffold | `ls pwa/src/lib/components/__tests__/*.test.js pwa/tests/*.test.js` | N/A | ⬜ pending |
| 01-01-01 | 01 | 1 | FNDN-07 | smoke | `npm run build` | N/A | ⬜ pending |
| 01-01-02 | 01 | 1 | FNDN-01,06 | unit | `npx vitest run --reporter=verbose` | ✅ W0 | ⬜ pending |
| 01-02-01 | 02 | 2 | FNDN-01 | grep+build | `grep -q vsa-coming-soon ... && npm run build` | ✅ W0 | ⬜ pending |
| 01-02-02 | 02 | 2 | FNDN-02,06 | grep+build | `grep -q beforeinstallprompt ... && npm run build` | ✅ W0 | ⬜ pending |
| 01-03-01 | 03 | 2 | FNDN-02,03 | grep+build | `grep -q SvelteKitPWA ... && npm run build && ls build/manifest.webmanifest` | ✅ W0 | ⬜ pending |
| 01-03-02 | 03 | 2 | FNDN-05,08 | script | `npm run build && node scripts/check-bundle-size.js` | ✅ W0 | ⬜ pending |
| 01-03-03 | 03 | 2 | FNDN-04 | manual | Lighthouse throttled 3G audit | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Plan: 01-00-PLAN.md

- [x] `pwa/src/lib/components/__tests__/TabBar.test.js` — stubs for FNDN-01
- [x] `pwa/src/lib/components/__tests__/ThemeToggle.test.js` — stubs for FNDN-06
- [x] `pwa/tests/pwa-manifest.test.js` — stubs for FNDN-02
- [x] `pwa/src/lib/components/__tests__/PullToRefresh.test.js` — stubs for FNDN-08

Test framework (vitest, @testing-library/svelte, jsdom) installed in Plan 01-01 Task 1.
Vitest config in `vite.config.js` created in Plan 01-01 Task 1.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Service worker precaches build assets | FNDN-03 | SW not testable in unit tests | Lighthouse audit > PWA section. Check "Current page responds with a 200 when offline" |
| FCP < 2s on 3G | FNDN-04 | Requires Lighthouse throttling simulation | `npx lighthouse http://localhost:4173 --throttling-method=simulate --output=json` — check FCP < 2000ms. Bundle size CI gate (FNDN-05, 200KB gzipped) serves as automated proxy. |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (01-00-PLAN.md created)
- [x] No watch-mode flags
- [x] Feedback latency < 10s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved
