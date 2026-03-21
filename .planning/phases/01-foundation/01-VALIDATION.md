---
phase: 01
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
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
| 01-01-01 | 01 | 1 | FNDN-07 | smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 1 | FNDN-01 | unit | `npx vitest run src/lib/components/__tests__/TabBar.test.js` | ❌ W0 | ⬜ pending |
| 01-01-03 | 01 | 1 | FNDN-06 | unit | `npx vitest run src/lib/components/__tests__/ThemeToggle.test.js` | ❌ W0 | ⬜ pending |
| 01-02-01 | 02 | 2 | FNDN-02 | unit | `npx vitest run tests/pwa-manifest.test.js` | ❌ W0 | ⬜ pending |
| 01-02-02 | 02 | 2 | FNDN-05 | smoke | `node scripts/check-bundle-size.js` | ❌ W0 | ⬜ pending |
| 01-02-03 | 02 | 2 | FNDN-08 | unit | `npx vitest run src/lib/components/__tests__/PullToRefresh.test.js` | ❌ W0 | ⬜ pending |
| 01-02-04 | 02 | 2 | FNDN-03 | manual | Lighthouse audit > PWA section | N/A | ⬜ pending |
| 01-02-05 | 02 | 2 | FNDN-04 | manual | Lighthouse throttled 3G audit | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `npm install -D vitest @testing-library/svelte jsdom` — test framework install
- [ ] Vitest config in `vite.config.js` — test environment setup
- [ ] `src/lib/components/__tests__/TabBar.test.js` — stubs for FNDN-01
- [ ] `src/lib/components/__tests__/ThemeToggle.test.js` — stubs for FNDN-06
- [ ] `tests/pwa-manifest.test.js` — stubs for FNDN-02
- [ ] `scripts/check-bundle-size.js` — stubs for FNDN-05
- [ ] `src/lib/components/__tests__/PullToRefresh.test.js` — stubs for FNDN-08

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Service worker precaches build assets | FNDN-03 | SW not testable in unit tests | Lighthouse audit > PWA section. Check "Current page responds with a 200 when offline" |
| FCP < 2s on 3G | FNDN-04 | Requires Lighthouse throttling simulation | `npx lighthouse http://localhost:4173 --throttling-method=simulate --output=json` — check FCP < 2000ms |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
