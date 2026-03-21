# Architecture

**Analysis Date:** 2026-03-21

## Pattern Overview

**Overall:** Static Site Generation (SSG) with Progressive Web App + Backend-as-a-Service

**Key Characteristics:**
- Docusaurus v3 generates a fully static site deployed to GitHub Pages
- Supabase provides database and auth without a custom server
- Supabase Edge Functions (Deno/TypeScript) host the only server-side logic
- The React layer adds interactive features on top of rendered Markdown content
- Offline capability is baked in: PWA service worker + WebGPU-based local LLM fallback

## Layers

**Content Layer:**
- Purpose: Source of truth — the actual plan text
- Location: `docs/`
- Contains: Markdown files organized by numbered thematic chapters; no MDX
- Depends on: Docusaurus build pipeline
- Used by: Docusaurus renderer, sidebar config

**Build/Routing Layer:**
- Purpose: Converts Markdown + React pages into static HTML/JS bundles
- Location: `docusaurus.config.js`, `sidebars.js`
- Contains: Plugin config, theme config, sidebar tree, i18n settings
- Depends on: Content layer + component layer
- Used by: CI/CD pipeline (`npm run build`)

**Component Layer:**
- Purpose: Interactive React UI injected into the static shell
- Location: `src/components/`, `src/pages/`, `src/theme/`
- Contains: Custom components, standalone pages (simulador, estadisticas, evaluacion, sugerencias), Docusaurus theme swizzles
- Depends on: Auth context, Supabase lib, data files
- Used by: Docusaurus theme rendering

**State/Context Layer:**
- Purpose: Global auth state shared across components
- Location: `src/contexts/AuthContext.js`
- Contains: React Context + useReducer pattern wrapping Supabase auth
- Depends on: `src/lib/supabase.js`
- Used by: `ReactionBar`, `CommentSection`, `SuggestionSection`, `StatsPanel`

**Data Access Layer:**
- Purpose: Singleton client for Supabase; graceful no-op when unconfigured
- Location: `src/lib/supabase.js`
- Contains: `getSupabase()` (lazy singleton), `isConfigured()` guard
- Depends on: `@supabase/supabase-js`, environment-baked URL/anon key
- Used by: All interactive components and the AnalyticsTracker

**Static Data Layer:**
- Purpose: Client-side data not requiring a database
- Location: `src/data/`
- Contains: `evaluations.js` (score history, 65 perspectives metadata), `faq.js` (FAQ for offline chat)
- Depends on: Nothing external
- Used by: `/evaluacion` page, AI chat widget offline fallback

**Offline AI Layer:**
- Purpose: Browser-native LLM for fully offline chat
- Location: `src/lib/offlineAI.js`
- Contains: WebGPU detection, `@mlc-ai/web-llm` engine management, `loadModel()`, `chat()`
- Depends on: `@mlc-ai/web-llm` (lazy dynamic import, ~700MB download on first use)
- Used by: `AIChatWidget` (tertiary fallback after Groq and FAQ)

**Backend Layer (Edge Functions):**
- Purpose: Server-side AI proxy — keeps Groq API key out of the browser
- Location: `supabase/functions/ai-chat/index.ts`
- Contains: Deno `serve()` handler, Groq API call using `llama-3.3-70b-versatile`, CORS headers
- Depends on: `GROQ_API_KEY` Supabase secret
- Used by: `AIChatWidget.tryOnline()`

**Database Layer:**
- Purpose: Persistent storage for user-generated content and analytics
- Location: `supabase/migration.sql`, `supabase/migration-v2-suggestions.sql`, `supabase/migration-v3-analytics.sql`
- Contains: Tables `profiles`, `comments`, `reactions`, `suggestions`, `page_views`; RLS policies on all tables
- Depends on: Supabase PostgreSQL (hosted)
- Used by: All interactive components via `getSupabase()`

## Data Flow

**Chat Query (online path):**

1. User types question in `AIChatWidget` (`src/components/AIChatWidget.js`)
2. `tryOnline()` calls `supabase.functions.invoke('ai-chat', { body: { question, pageSlug, history } })`
3. Supabase Edge Function (`supabase/functions/ai-chat/index.ts`) receives request
4. Edge Function calls Groq API with `llama-3.3-70b-versatile` and a system prompt containing plan data
5. Groq returns answer; Edge Function returns `{ answer }` JSON
6. Widget appends assistant message to state

**Chat Query (offline fallback chain):**

1. `tryOnline()` fails (no connection or Groq error)
2. `tryFAQ()` searches `src/data/faq.js` with keyword matching
3. If no FAQ match: `tryWebLLM()` checks if `offlineAI` engine is loaded
4. If engine not loaded and WebGPU is available: prompt user to download ~700MB model
5. User confirms → `offlineAI.loadModel()` downloads and caches model in browser
6. `offlineAI.chat()` runs inference locally via WebGPU

**Page Reaction Flow:**

1. `InteractiveFooter` mounts on every doc page via swizzled `src/theme/DocItem/Layout/index.js`
2. `ReactionBar` reads `pageSlug` from URL, fetches reaction counts from Supabase `reactions` table
3. Authenticated user clicks reaction → upsert to `reactions` table (unique constraint per user+page+type)
4. Anonymous user: reactions display as read-only

**Analytics Flow:**

1. `AnalyticsTracker` component (rendered in `src/theme/Root.js`) listens to route changes
2. On route change: sends previous page's `{ page_slug, time_on_page, scroll_depth }` to Supabase `page_views`
3. On `beforeunload`: uses `navigator.sendBeacon()` to send final pageview without blocking
4. `/estadisticas` page reads aggregated data from `page_views` via `StatsPanel`

**Auth Flow:**

1. `AuthProvider` in `src/theme/Root.js` wraps entire app
2. On mount: calls `supabase.auth.getSession()` to rehydrate session from localStorage
3. `supabase.auth.onAuthStateChange()` subscription keeps React state in sync
4. Profile fetched from `profiles` table on sign-in
5. `useAuth()` hook exposes `{ user, profile, loading, signIn, signUp, signOut }` to all components

**State Management:**
- No global state manager (no Redux/Zustand). Auth is the only global state, via React Context
- Component-local `useState` for all other UI state (reactions, comments, chat messages)
- Supabase is the source of truth for all persistent state

## Key Abstractions

**`getSupabase()` singleton:**
- Purpose: Lazy Supabase client, returns `null` when unconfigured (dev without credentials)
- Examples: `src/lib/supabase.js`
- Pattern: Every component checks `isConfigured()` or nullchecks `getSupabase()` before any DB call. This makes all interactive features gracefully degrade to read-only.

**`InteractiveFooter`:**
- Purpose: Composites all per-page interactive widgets (reactions, suggestions, comments, share, export)
- Examples: `src/components/InteractiveFooter.js`
- Pattern: Injected into every doc page via Docusaurus layout swizzle — zero per-doc configuration needed

**`pageSlug`:**
- Purpose: Stable identifier derived from URL pathname used as the foreign key across all user-generated content tables
- Pattern: `pathname.replace('/venezuela-sa/', '').replace(/\/$/, '') || 'home'` — computed identically in every component that touches Supabase

**Skills system:**
- Purpose: AI prompt library for domain experts and ideological perspectives used to evaluate plan sections
- Examples: `skills/experts/`, `skills/perspectives/`
- Pattern: Each skill is a standalone Markdown prompt file. `skills/evaluate.sh` and `skills/evaluate-full.sh` send any skill + doc section to multiple AI APIs in parallel via OpenRouter. Not part of the runtime site.

**Quality Gate:**
- Purpose: Automated guardrail that rejects git commits/PRs that would lower the plan's score below 7.4/10
- Examples: `scripts/quality-gate.sh`, `.github/workflows/quality-gate.yml`
- Pattern: Shell script calls OpenRouter API with a structured prompt, parses JSON verdict, exits non-zero on FAIL

## Entry Points

**Docusaurus build entry:**
- Location: `docusaurus.config.js`
- Triggers: `npm run build` / `npm start`
- Responsibilities: Wires plugins, themes, i18n, presets, navbar, sidebar path

**App shell entry (runtime):**
- Location: `src/theme/Root.js`
- Triggers: Every page load in the browser
- Responsibilities: Wraps all pages in `AuthProvider`, mounts `AnalyticsTracker` and `AIChatWidget` globally

**Per-doc interactive injection:**
- Location: `src/theme/DocItem/Layout/index.js`
- Triggers: Every documentation page render
- Responsibilities: Appends `InteractiveFooter` after Docusaurus's default doc layout

**Sidebar definition:**
- Location: `sidebars.js`
- Triggers: Docusaurus build
- Responsibilities: Defines the full navigation tree; adding a new doc requires a manual entry here

**Edge Function entry:**
- Location: `supabase/functions/ai-chat/index.ts`
- Triggers: HTTP POST from `AIChatWidget.tryOnline()` via `supabase.functions.invoke()`
- Responsibilities: CORS, Groq API proxy, error handling

## Error Handling

**Strategy:** Silent degradation — no feature should break the page if Supabase or AI is unavailable

**Patterns:**
- `getSupabase()` returns `null` when URL contains placeholder; all callers nullcheck before use
- `AnalyticsTracker` wraps Supabase calls in `try/catch` with empty catch blocks (analytics never throw)
- `AIChatWidget` has a three-tier fallback: Groq → FAQ → WebLLM → static error message
- Edge Function returns structured `{ error }` JSON with appropriate HTTP status codes; widget surfaces these as inline error text
- `quality-gate.sh` exits 0 (allow commit) on API errors to avoid blocking contributors when the gate itself fails

## Cross-Cutting Concerns

**Logging:** No structured logging. Browser `console` only; analytics errors are swallowed silently.

**Validation:** Input validation is database-level only (PostgreSQL `check` constraints on `content` length, `reaction_type` enum). No client-side schema validation library.

**Authentication:** Supabase Email auth. All interactive write operations require `user` from `useAuth()`. Anonymous users get read-only views. RLS enforces this at the DB level independently of the UI.

**Internationalization:** Docusaurus i18n with `es` (default) and `en` locales. `i18n/en/` contains translated doc files. Locale switcher in navbar. The React components are Spanish-only and not translated.

**PWA:** `@docusaurus/plugin-pwa` generates service worker and `static/manifest.json`. Offline mode is activated when app is installed or in standalone mode.

---

*Architecture analysis: 2026-03-21*
