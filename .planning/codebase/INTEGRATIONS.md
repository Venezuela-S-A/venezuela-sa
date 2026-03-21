# External Integrations

**Analysis Date:** 2026-03-21

## APIs & External Services

**AI / LLM — Online (Server-Side):**
- Groq API (`https://api.groq.com/openai/v1/chat/completions`) — Powers the online AI chat assistant
  - SDK/Client: Raw `fetch` calls inside Supabase Edge Function (`supabase/functions/ai-chat/index.ts`)
  - Model: `llama-3.3-70b-versatile`
  - Auth: `GROQ_API_KEY` stored as Supabase project secret (not in repo)
  - Entry point: `/supabase/functions/ai-chat/index.ts`

**AI / LLM — Offline (Client-Side):**
- WebLLM / MLC AI (`@mlc-ai/web-llm ^0.2.82`) — In-browser inference via WebGPU, no server required
  - Model: `Llama-3.2-1B-Instruct-q4f16_1-MLC` (~1B parameters, quantized)
  - Requires: WebGPU-capable browser
  - Implementation: `src/lib/offlineAI.js`
  - Loaded lazily via dynamic `import('@mlc-ai/web-llm')` only when user requests offline mode

**AI / LLM — Quality Gate & Evaluation:**
- OpenRouter (`https://openrouter.ai/api/v1/chat/completions`) — Routes to multiple frontier models for quality evaluation
  - Default model: `anthropic/claude-sonnet-4` (overridable via `QG_MODEL` env var)
  - Auth: `OPENROUTER_API_KEY` (env var, set in `.env` and as GitHub Actions secret)
  - Scripts: `scripts/quality-gate.sh`, `skills/evaluate.sh`
  - Used by: CI quality gate workflow (`.github/workflows/quality-gate.yml`), local AI evaluation of plan changes

## Data Storage

**Databases:**
- Supabase (PostgreSQL) — Primary data store for all interactive features
  - Connection: Hardcoded placeholder URL in `src/lib/supabase.js` (requires manual config for deploy)
  - Client: `@supabase/supabase-js ^2.99.2`, singleton via `getSupabase()` in `src/lib/supabase.js`
  - Row Level Security: Enabled on all tables; public reads, authenticated writes
  - Schema versioned via migration files:
    - `supabase/migration.sql` — Core: `profiles`, `comments`, `reactions`
    - `supabase/migration-v2-suggestions.sql` — `suggestions`, `suggestion_votes`
    - `supabase/migration-v3-analytics.sql` — `page_views` + `page_stats` view

**File Storage:**
- Not detected — no file uploads, no S3/GCS/Supabase Storage usage

**Caching:**
- None — no Redis, Memcached, or server-side cache layer
- Browser-level: Docusaurus PWA (`@docusaurus/plugin-pwa`) caches static assets for offline access

## Authentication & Identity

**Auth Provider:**
- Supabase Auth (Email/Password) — User authentication for commenting, reactions, and suggestions
  - Enabled providers: Email (configured in Supabase dashboard)
  - Implementation: `src/contexts/AuthContext.js` (React Context wrapping `supabase.auth`)
  - Methods exposed: `signIn(email, password)`, `signUp(email, password, displayName)`, `signOut()`
  - Session management: `supabase.auth.getSession()` + `supabase.auth.onAuthStateChange()` listener
  - Profile auto-creation: PostgreSQL trigger `on_auth_user_created` → `handle_new_user()` function inserts into `public.profiles`
  - Provider mounted globally: `src/theme/Root.js` wraps entire app in `<AuthProvider>`

## Monitoring & Observability

**Error Tracking:**
- None — no Sentry, Datadog, or equivalent configured

**Analytics:**
- Custom privacy-first analytics via Supabase (`page_views` table)
  - No cookies, no external tracking, no Google Analytics
  - Tracks: `page_slug`, `time_on_page`, `scroll_depth`, `referrer`, `screen_width`
  - Implementation: `src/components/AnalyticsTracker.js` (React component, renders nothing)
  - Uses `navigator.sendBeacon()` on page unload to avoid blocking navigation
  - Public stats dashboard at `/estadisticas` route (`src/pages/estadisticas.js`)
  - Data aggregated via `public.page_stats` SQL view (30-day rolling window)

**Logs:**
- None configured — errors in analytics and chat are silently swallowed (`catch {}`) to avoid breaking UX

## CI/CD & Deployment

**Hosting:**
- GitHub Pages — Static site at `https://venezuela-s-a.github.io/venezuela-sa/`
  - Organization: `Venezuela-S-A`
  - Repository: `venezuela-sa`

**CI Pipeline:**
- GitHub Actions (`.github/workflows/`)
  - `deploy.yml` — Triggered on push to `main`; runs `npm ci`, `npm run build`, deploys to GitHub Pages via `actions/deploy-pages@v4`
  - `quality-gate.yml` — Triggered on PRs touching `docs/` or `CLAUDE.md`; runs AI quality evaluation via `scripts/quality-gate.sh` then verifies build passes
- Secrets required in GitHub Actions:
  - `OPENROUTER_API_KEY` — Used by quality gate CI job

## Environment Configuration

**Required env vars:**
- `OPENROUTER_API_KEY` — AI quality gate and multi-model evaluation (`scripts/quality-gate.sh`, `skills/evaluate.sh`)
- `GROQ_API_KEY` — Groq LLM access, configured as Supabase project secret (not a local env var)
- Supabase URL + anon key — Hardcoded placeholders in `src/lib/supabase.js`; must be replaced manually for deployment

**Secrets location:**
- `.env` — Local development (never committed; listed in `.gitignore`)
- `.env.example` — Template with placeholder values (committed)
- GitHub Actions secrets — `OPENROUTER_API_KEY` for CI
- Supabase project secrets — `GROQ_API_KEY` for Edge Function

## Webhooks & Callbacks

**Incoming:**
- Supabase Edge Function endpoint — `supabase/functions/ai-chat/` serves as the AI chat backend; invoked by `AIChatWidget.js` via `supabase.functions.invoke('ai-chat', ...)`
- Handles CORS preflight (`OPTIONS`) with wildcard `Access-Control-Allow-Origin: *`

**Outgoing:**
- OpenRouter API — called by `scripts/quality-gate.sh` (curl) and `skills/evaluate.sh`
- Groq API — called by `supabase/functions/ai-chat/index.ts` (fetch)
- GitHub Issues — "Edit" links in docs open pre-filled GitHub issues (configured in `docusaurus.config.js` `editUrl` callback)

## Social & SEO

**Social Metadata:**
- Open Graph tags configured in `docusaurus.config.js` (og:description, og:image at `img/og-default.png`)
- Twitter card: `summary_large_image`, site handle: `@VenezuelaSA_`

**SEO:**
- Sitemap generated via Docusaurus preset-classic (`sitemap.xml`, weekly changefreq)
- JSON-LD structured data via `@coffeecup_tech/docusaurus-plugin-structured-data`
- Organization and WebSite schema injected at `https://venezuela-s-a.github.io/venezuela-sa/#organization`

---

*Integration audit: 2026-03-21*
