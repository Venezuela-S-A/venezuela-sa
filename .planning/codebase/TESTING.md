# Testing Patterns

**Analysis Date:** 2026-03-21

## Test Framework

**Runner:** None

There is no automated test suite in this codebase. No Jest, Vitest, Playwright, Cypress, or any other test runner is configured or installed. The `package.json` contains no `test` script, no test-related devDependencies, and no test configuration files exist.

**Assertion Library:** Not applicable

**Run Commands:**
```bash
# No test commands available.
# The closest equivalent to quality verification:
npm run build          # Verifies the site builds without errors (required before PR)
./scripts/quality-gate.sh  # AI-based content quality check for docs/
```

## Quality Enforcement (Substitute for Tests)

The project uses two non-automated mechanisms in place of a test suite:

**1. Build verification (`npm run build`)**
- Run via: `npm run build`
- Enforced in CI: `.github/workflows/quality-gate.yml` and `.github/workflows/deploy.yml` both run `npm ci && npm run build`
- Catches: broken Docusaurus MDX/Markdown, broken import paths, missing referenced components, invalid Mermaid syntax
- Required: PRs cannot merge if the build fails

**2. AI Quality Gate (`scripts/quality-gate.sh`)**
- Run via: `./scripts/quality-gate.sh` (requires `OPENROUTER_API_KEY`)
- Enforced in CI: `.github/workflows/quality-gate.yml` triggers on PRs touching `docs/**` or `CLAUDE.md`
- Catches: content changes that violate the 15 plan principles or would lower the 7.4/10 quality score
- Verdict types: `PASS`, `WARNING`, `FAIL`
- On `FAIL`: exits with code 1, blocking the commit/PR
- Model used: `anthropic/claude-sonnet-4` (configurable via `QG_MODEL` env var)

```bash
# Quality gate usage
./scripts/quality-gate.sh                    # Evaluate staged changes
./scripts/quality-gate.sh --diff "texto"     # Evaluate specific diff text
./scripts/quality-gate.sh --file docs/X.md  # Evaluate a specific file
```

## Test File Organization

**Location:** None — no test files exist anywhere in the codebase.

**Naming convention:** Not established.

## CI Pipeline (What Runs on PRs)

Defined in `.github/workflows/quality-gate.yml`:

1. `actions/checkout@v4` with full history
2. Extract diff of `docs/` and `CLAUDE.md` changes
3. Run `scripts/quality-gate.sh` (AI evaluation, only if diff has lines)
4. Run `npm ci && npm run build` (build verification)

Defined in `.github/workflows/deploy.yml` (runs on push to `main`):

1. Node.js 22 setup
2. `npm ci`
3. `npm run build`
4. Upload and deploy to GitHub Pages

## Coverage

**Requirements:** Not enforced (no test runner).

**Current state:** 0% automated test coverage.

## What Would Need Testing (Gap Analysis)

The following JavaScript modules contain pure logic that is directly testable but currently has no tests:

**Pure utility functions in `src/data/faq.js`:**
- `searchFAQ(question)` — keyword matching logic

**Pure utility functions in `src/data/evaluations.js`:**
- `getSpectrumAverages()`, `getTopPerspectives()`, `getBottomPerspectives()`, `getSectionSummaries()` — data aggregation

**Pure utility functions in `src/pages/sugerencias.js` and `src/components/StatsPanel.js`:**
- `slugToTitle(slug)` — string transformation
- `slugToUrl(slug)` — string transformation
- `aggregateBySlug(items)` — array aggregation

**Pure utility functions in `src/pages/simulador.js`:**
- `fmt(n, decimals)` — number formatting
- `fmtUSD(n, decimals)` — currency formatting
- `fmtNum(n)` — locale number formatting

**Supabase singleton in `src/lib/supabase.js`:**
- `isConfigured()` — configuration detection
- `getSupabase()` — singleton creation

**Edge Function logic in `supabase/functions/ai-chat/index.ts`:**
- Request parsing, error routing, CORS handling

## Component Testing Considerations

All React components depend on:
- `@docusaurus/router` (`useLocation`) — requires Docusaurus runtime
- `@supabase/supabase-js` — requires Supabase client or mock
- `../contexts/AuthContext` — requires `AuthProvider` wrapper
- Browser APIs (`navigator.onLine`, `window`, `navigator.gpu`) — require mocking

Components guard against SSR with `mounted` state pattern and `isConfigured()` checks — these guard clauses would need to be exercised in tests.

## Recommended Testing Setup (If Adding Tests)

Given the stack (Docusaurus 3, React 18, ESM), the recommended approach:

**Unit tests for pure functions:**
```bash
# Vitest is the natural choice for ESM + Docusaurus
npm install -D vitest @vitest/ui
```

```js
// vitest.config.js
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
});
```

**Example test for a pure utility (pattern to follow):**
```js
// src/data/faq.test.js
import { describe, it, expect } from 'vitest';
import { searchFAQ } from './faq';

describe('searchFAQ', () => {
  it('returns a match for known keywords', () => {
    const result = searchFAQ('que es venezuela sa');
    expect(result).not.toBeNull();
    expect(result.a).toContain('startup');
  });

  it('returns null for unknown questions', () => {
    expect(searchFAQ('zzz xyzzy foo')).toBeNull();
  });
});
```

**React component tests would require:**
```bash
npm install -D @testing-library/react @testing-library/jest-dom jsdom
```

With `vitest` configured for `jsdom` environment, plus mocks for:
- `@docusaurus/router` — mock `useLocation`
- `../lib/supabase` — mock `getSupabase`, `isConfigured`
- `../contexts/AuthContext` — provide `AuthContext.Provider` with test values

## Test Types

**Unit Tests:** Not present. Would target pure utility functions in `src/data/` and `src/pages/`.

**Integration Tests:** Not present. Would target React components with Supabase and auth mocked.

**E2E Tests:** Not present. Would require Playwright or Cypress against a running Docusaurus dev server.

---

*Testing analysis: 2026-03-21*
