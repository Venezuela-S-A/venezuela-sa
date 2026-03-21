# Coding Conventions

**Analysis Date:** 2026-03-21

## Language and Module System

All source code uses plain JavaScript (`.js`) with React. No TypeScript in `src/` (TypeScript only appears in `supabase/functions/ai-chat/index.ts` — a Deno Edge Function). The Docusaurus config uses `// @ts-check` annotation for type hints without compilation.

Module system: ESM throughout. `import`/`export` only — no `require`.

## Naming Patterns

**Files:**
- React components: PascalCase matching the default export — `AIChatWidget.js`, `ReactionBar.js`, `StatsPanel.js`
- Context providers: PascalCase — `AuthContext.js`
- Utility/service modules: camelCase — `supabase.js`, `offlineAI.js`
- Data modules: camelCase — `evaluations.js`, `faq.js`
- Pages: camelCase matching the route — `simulador.js`, `evaluacion.js`, `sugerencias.js`

**Functions:**
- Event handlers: `handle` prefix — `handleSend`, `handleReaction`, `handleAuth`, `handleDelete`, `handleSubmit`
- Data fetchers: `fetch` prefix — `fetchComments`, `fetchReactions`, `fetchProfile`, `fetchStats`
- Utility/pure functions: camelCase descriptive — `slugToTitle`, `slugToUrl`, `aggregateBySlug`, `formatDate`, `fmt`, `fmtUSD`, `scoreColor`, `heatColor`
- Boolean accessors: `is` prefix — `isConfigured`, `isModelLoaded`, `isWebGPUAvailable`

**Variables and state:**
- State variables: camelCase noun — `[loading, setLoading]`, `[mounted, setMounted]`, `[isOpen, setIsOpen]`
- Constants (module-level, stable): SCREAMING_SNAKE_CASE — `WELCOME_MESSAGE`, `REACTIONS`, `TABS`, `MODEL_ID`, `SYSTEM_PROMPT`
- Color palettes: single-letter object — `const C = { blue: '#1565C0', ... }`

**CSS classes:**
- BEM methodology with `vsa-` namespace prefix — `vsa-chat`, `vsa-chat__header`, `vsa-chat__bubble--assistant`
- Component-scoped: `vsa-reactions`, `vsa-comments`, `vsa-stats`, `vsa-share-btn`

**Exports:**
- Components: always `export default function ComponentName`
- Named exports for data/utilities: `export const`, `export function` from data modules (`evaluations.js`)
- Context hooks: named export `export function useAuth()`

## Component Structure Pattern

Components follow a consistent internal order:

1. Module-level constants (SCREAMING_SNAKE_CASE)
2. Helper/utility functions (outside component, pure)
3. Component function with `useState`/`useRef`/`useCallback` hooks
4. `useEffect` hooks
5. Guard clause early returns (SSR safety, `isConfigured()` check)
6. Derived values / local computation
7. Event handler functions (inside component body)
8. JSX return

Example from `ReactionBar.js`:
```js
const REACTIONS = [...];              // module constant

export default function ReactionBar({ pageSlug }) {
  const { user } = useAuth();
  const [counts, setCounts] = useState({});
  // ...

  const fetchReactions = useCallback(async () => { ... }, [pageSlug, user]);

  useEffect(() => { fetchReactions(); }, [fetchReactions]);

  async function handleReaction(type) { ... }

  if (!isConfigured()) return null;  // guard clause near bottom of logic

  return (...);
}
```

## Import Organization

**Order:**
1. React (and React hooks) — `import React, { useState, useEffect } from 'react'`
2. Docusaurus framework — `import Layout from '@theme/Layout'`, `import { useLocation } from '@docusaurus/router'`
3. Internal lib/services — `import { getSupabase, isConfigured } from '../lib/supabase'`
4. Internal contexts — `import { useAuth } from '../contexts/AuthContext'`
5. Internal components — `import ReactionBar from './ReactionBar'`
6. Internal data — `import { PERSPECTIVES } from '../data/evaluations'`

**Path aliases used:**
- `@theme/` — Docusaurus theme components
- `@theme-original/` — Docusaurus original (for swizzled components)
- `@site/src/` — project root alias (used in theme swizzle files)
- `../` — relative imports within src/

## Error Handling

**Pattern: silent fail for analytics, surface error in UI for user-facing operations.**

Analytics errors are silenced explicitly:
```js
try {
  await supabase.from('page_views').insert({ ... });
} catch {
  // Silenciar errores — analytics no deben romper nada
}
```

User-facing operations use `error` state + conditional render:
```js
const [error, setError] = useState('');
// ...
try { ... } catch (err) {
  setError(err.message || 'Error inesperado');
} finally {
  setLoading(false);
}
// In JSX:
{error && <div className="vsa-chat__error">{error}</div>}
```

Supabase calls consistently check for null client before proceeding:
```js
const supabase = getSupabase();
if (!supabase) {
  setLoading(false);
  return;
}
```

API errors from Supabase functions are checked at two levels:
```js
const { data, error: fnError } = await supabase.functions.invoke('ai-chat', { ... });
if (fnError) throw fnError;
if (data?.error) throw new Error(data.error);
```

**Edge Function (Deno/TypeScript):** errors return JSON responses with HTTP status codes. Never throws unhandled — outer `try/catch` always returns `500` with JSON error body.

## SSR Safety

All components that access browser APIs guard with a `mounted` state pattern:
```js
const [mounted, setMounted] = useState(false);
useEffect(() => { setMounted(true); }, []);
if (!mounted) return null;
```

Direct `window`/`navigator` access checks `typeof window !== 'undefined'` before use.

## Supabase Client Pattern

The client is a singleton obtained through `getSupabase()` — never imported directly:
- `src/lib/supabase.js` exports `getSupabase()` and `isConfigured()`
- Every component that needs Supabase calls `getSupabase()` at the top of each operation
- Components gate their render with `if (!isConfigured()) return null`

## useCallback Pattern

Data-fetching functions that are passed to `useEffect` are always wrapped in `useCallback` to prevent infinite re-render loops:
```js
const fetchReactions = useCallback(async () => { ... }, [pageSlug, user]);
useEffect(() => { fetchReactions(); }, [fetchReactions]);
```

## Comments

**When to comment:**
- Block separators using `// ============================================================` with ALL-CAPS label for major sections in large page files (`simulador.js`, `evaluacion.js`)
- Explain non-obvious decisions inline: `// Silenciar errores — analytics no deben romper nada`
- File-level header comment for non-component files describing purpose and setup steps
- Inline `//` for strategy steps: `// 1. Online: Groq`, `// 2. FAQ cache`, etc.

No JSDoc/TSDoc used in source files.

## Formatting

No ESLint or Prettier config files present in the repository. Formatting is manually consistent:
- Single quotes for strings in `.js` files (except `simulador.js` and `evaluacion.js` which use double quotes — inconsistency)
- 2-space indentation throughout
- Trailing commas in multi-line structures
- Arrow functions for simple callbacks, `function` declarations for named handlers inside components

## Docusaurus-Specific Conventions

- Config file: `docusaurus.config.js` uses `// @ts-check` and JSDoc type annotations (`/** @type {import('@docusaurus/types').Config} */`)
- `markdown.format: "md"` (not MDX) — no JSX in `.md` files
- `numberPrefixParser: false` — doc filenames use descriptive names only
- `routeBasePath: "/"` — docs at root URL

## Quality Gate

The `scripts/quality-gate.sh` script is the automated content quality enforcement layer. It evaluates doc changes against 15 plan principles via AI (OpenRouter API) before allowing commits. It runs as a GitHub Actions check on all PRs touching `docs/` or `CLAUDE.md`.

---

*Convention analysis: 2026-03-21*
