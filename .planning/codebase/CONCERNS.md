# Codebase Concerns

**Analysis Date:** 2026-03-21

---

## Tech Debt

**FCV Percentage Inconsistency:**
- Issue: The FCV (Fondo Ciudadano Venezuela) contribution percentages are stale in the AI-facing data files. The canonical source `docs/04-gobernanza/modelo-estado.md` uses the post-refactor values (Retiro 7%, Cesantía 3% = 23%), but the edge function system prompt, FAQ data, and simulador page still reference the old values (Retiro 8%, Cesantía 2% = 23%).
- Files:
  - `supabase/functions/ai-chat/index.ts` line 27 — `Retiro 8%, Cesantia 2%`
  - `src/data/faq.js` line 43 — `Retiro 8% + Cesantia 2%`
  - `src/pages/simulador.js` lines 828, 897–898 — `Retiro 8%, Cesantia 2%`
  - `docs/04-gobernanza/modelo-estado.md` line 325 — canonical: `Retiro 7%, Cesantía 3%` (Fase Construcción/Madurez)
- Impact: Users asking the AI chat about FCV will receive incorrect percentages. The simulador calculates retirement projections using stale figures. The FAQ offline mode gives outdated answers.
- Fix approach: Audit all three AI-facing data sources and update to match the canonical Fase Construcción/Madurez values. The `glosario.md` line 28 also still shows the old 8%/2% breakdown.

**Score Threshold Staleness:**
- Issue: `scripts/quality-gate.sh` enforces a threshold of 7.4/10 and internally claims "SCORE ACTUAL: 7.4/10 (20 perspectivas)", but `src/data/evaluations.js` shows the actual current score is 7.3/10 across 65 perspectives, and the navbar in `docusaurus.config.js` also displays 7.3.
- Files:
  - `scripts/quality-gate.sh` lines 6, 18, 83 — references 7.4 as both threshold and current score
  - `src/data/evaluations.js` line 5 — `OVERALL_SCORE = 7.3`
  - `docusaurus.config.js` line 142 — `Score 7.3 (65)`
- Impact: The quality gate prompt tells the AI evaluator that the current score is 7.4, leading it to approve changes that may actually lower the score from its true 7.3 baseline.
- Fix approach: Update the quality gate script to separate "current score" (7.3) from "minimum threshold" (e.g., 7.3). The CLAUDE.md also references 7.3 in its instructions, which is correct.

**Hardcoded `baseUrl` Across Multiple Components:**
- Issue: The GitHub Pages `baseUrl` string `/venezuela-sa/` is hardcoded in 7 separate source files rather than reading from Docusaurus config or an environment variable.
- Files:
  - `src/components/AIChatWidget.js` line 66
  - `src/components/InteractiveFooter.js` line 19
  - `src/components/AnalyticsTracker.js` line 49
  - `src/components/StatsPanel.js` lines 20–21
  - `src/pages/sugerencias.js` lines 14–15
  - `src/pages/analytics.js` line 130
- Impact: If the site is ever deployed to a different base path (e.g., custom domain with `baseUrl: "/"`), all slug-to-URL conversion will break silently.
- Fix approach: Create a shared constant in `src/lib/config.js` that reads `useDocusaurusContext().siteConfig.baseUrl`, then import it in all components.

**Forked Dependency via Patch:**
- Issue: `docusaurus-graph@2.0.0` has a required patch applied via `patch-package`. The patch (`patches/docusaurus-graph+2.0.0.patch`) only fixes whitespace/indentation differences.
- Files: `patches/docusaurus-graph+2.0.0.patch`, `package.json` (postinstall: `patch-package`)
- Impact: Every `npm install` depends on `patch-package` running successfully. If `patch-package` fails silently or the upstream package updates, the build breaks with no clear error message.
- Fix approach: Open an upstream PR for the fix. If not accepted, fork and publish under the org.

**Supabase Internal API Property Used in sendBeacon:**
- Issue: `AnalyticsTracker.js` accesses `supabase.supabaseUrl` (an internal, undocumented property of the Supabase JS client) to construct the URL for `navigator.sendBeacon`. This property is not part of the public API and can break on any minor library update.
- Files: `src/components/AnalyticsTracker.js` line 80
- Impact: The `sendBeacon` call for final page view tracking silently fails on any Supabase client version that removes or renames this internal property.
- Fix approach: Store the Supabase URL as a separate exported constant in `src/lib/supabase.js` (it is a known configuration value, not a secret).

---

## Known Bugs

**Missing Static Assets (favicon, OG image):**
- Symptoms: Browser tab shows generic icon; social media previews show no image.
- Files: `docusaurus.config.js` references `img/favicon.ico` (line 8, 71) and `img/og-default.png` (line 164); `static/img/` contains only `.gitkeep`.
- Trigger: Every page load and every social media share.
- Workaround: None. Assets are missing from source and must be created and added to `static/img/`.

**`[Requiere investigación]` Markers in Published Docs:**
- Symptoms: 176 instances of the placeholder text `[Requiere investigación]` appear in publicly served documentation, some in high-visibility sections (geopolitics scenarios, sanctions roadmap, security data).
- Files: Concentrated in `docs/04-gobernanza/geopolitica.md` (multiple), `docs/04-gobernanza/roadmap-sanciones.md`, `docs/04-gobernanza/seguridad-fisica.md`, `docs/04-gobernanza/estrategia-china.md`, and 15+ files in `docs/10-oportunidades/`.
- Trigger: Any reader clicking those sections.
- Workaround: Mark sections as draft or use an `:::caution` admonition to indicate data is pending verification.

**AI Edge Function Has No Input Validation:**
- Symptoms: The `ai-chat` edge function in `supabase/functions/ai-chat/index.ts` destructures `question`, `pageSlug`, and `history` from `req.json()` with no type checking, length validation, or null checks on `question`.
- Files: `supabase/functions/ai-chat/index.ts` lines 82–103
- Trigger: Malformed requests or very long `question` strings forwarded to Groq.
- Workaround: None in place. Supabase free tier rate limits provide partial protection.

---

## Security Considerations

**Wildcard CORS on AI Chat Edge Function:**
- Risk: `Access-Control-Allow-Origin: "*"` in the edge function allows any domain to call the Groq proxy, consuming the project's Groq API quota from unauthorized origins.
- Files: `supabase/functions/ai-chat/index.ts` lines 10–11
- Current mitigation: The Supabase `anon` key is required in the `apikey` header, which limits abuse to anyone who has read the site's JavaScript bundle.
- Recommendations: Restrict the CORS origin to `https://venezuela-s-a.github.io`. Add a request-per-IP rate limit using Supabase's built-in throttling or a simple counter table.

**Comment Content Is Rendered as Plain Text (Good) — But No Moderation Layer:**
- Risk: Comment and suggestion content is stored and displayed without any profanity filter, spam detection, or moderation queue. The `handleDelete` function in `CommentSection.js` only allows the comment author to delete their own content. Admins have no dashboard to moderate.
- Files: `src/components/CommentSection.js` lines 57–63, `src/components/SuggestionSection.js`, `supabase/migration.sql`
- Current mitigation: RLS policies enforce that users can only delete their own rows. No admin-level delete policy is defined in the SQL migrations.
- Recommendations: Add an `is_admin` role check in a Supabase RLS policy so that a designated admin user can delete any comment. Consider a `flagged` boolean column on `comments` and `suggestions` for moderation workflow.

**Supabase Credentials Placeholder Left in Committed Code:**
- Risk: `src/lib/supabase.js` hardcodes placeholder strings `'https://TU_PROYECTO.supabase.co'` and `'TU_ANON_KEY'`. Although these are clearly placeholders, the pattern means that if a contributor fills them in and commits, real credentials end up in git history.
- Files: `src/lib/supabase.js` lines 16–17
- Current mitigation: `CONFIGURED` flag prevents runtime execution when placeholders are present. `.gitignore` does not exclude `src/lib/supabase.js`.
- Recommendations: Move credentials to `src/lib/supabase.js` reading from `process.env.REACT_APP_SUPABASE_URL` / `REACT_APP_SUPABASE_ANON_KEY`, and read from `.env` (which is already gitignored).

---

## Performance Bottlenecks

**WebLLM Bundle (~700MB model download) Included in Main Bundle:**
- Problem: `@mlc-ai/web-llm@^0.2.82` is a production dependency. Even though the model is loaded lazily via dynamic `import()` in `offlineAI.js`, the WebLLM runtime itself is included in the production bundle, adding significant weight to the initial JavaScript parsed by all users regardless of whether they ever use offline AI.
- Files: `src/lib/offlineAI.js`, `package.json` line 34
- Cause: Listed as a regular `dependency`, not a dev dependency, and no bundle-splitting is configured for this path.
- Improvement path: Move the dynamic import to be truly code-split (Docusaurus supports this via `React.lazy`). The `@mlc-ai/web-llm` bundle adds ~5–10MB to the main JS bundle.

**StatsPanel Fetches All Reactions/Comments Without Pagination:**
- Problem: `StatsPanel.js` fetches every row from `reactions` and `comments` tables with no `limit` clause, then aggregates client-side.
- Files: `src/components/StatsPanel.js` lines 36–46
- Cause: No server-side aggregation; the `page_stats` view only covers `page_views`, not reactions or comments.
- Improvement path: Create a Supabase view or RPC function that returns pre-aggregated top-10 slugs, replacing the full-table scans. Critical once reaction/comment counts grow beyond a few hundred rows.

**`docusaurus-graph.json` Committed to Static and Regenerated on Every Build:**
- Problem: `static/docusaurus-graph.json` (23KB) is committed to the repo and regenerated by the `docusaurus-graph` plugin on every build. This creates constant diffs in git, inflates repo history, and can cause merge conflicts.
- Files: `static/docusaurus-graph.json` (tracked in git, modified in current working tree per git status)
- Cause: The patched plugin writes to `static/` during dev mode (not just build mode), so it regenerates on every `npm start`.
- Improvement path: Add `static/docusaurus-graph.json` to `.gitignore`. The plugin regenerates it at build time, so CI will always produce a fresh copy.

---

## Fragile Areas

**`AnalyticsTracker` Module-Level Mutable State:**
- Files: `src/components/AnalyticsTracker.js` lines 9–11
- Why fragile: `entryTime`, `maxScroll`, and `currentSlug` are module-level globals. In concurrent React 18 rendering or Strict Mode, the component can mount/unmount multiple times, corrupting these values and causing incorrect analytics events to fire.
- Safe modification: Move state inside a `useRef` within the component, or use a singleton class with proper initialization guards.
- Test coverage: Zero automated tests for this component.

**`AIChatWidget` Mode State Machine Is Implicit:**
- Files: `src/components/AIChatWidget.js`
- Why fragile: The `mode` state can be `'online'`, `'faq'`, `'webllm'`, `'loading-model'`, or `'offer-webllm'`, but transitions between these states are scattered across multiple async handlers with no explicit state machine. The `offer-webllm` mode is set inside `handleSend` but never reset except by user clicking "No, seguir con FAQ", meaning if the user sends another question while in `offer-webllm` mode, the UI is inconsistent.
- Safe modification: Introduce an explicit transition function with guarded transitions before adding new modes.
- Test coverage: None.

**Quality Gate Script Fails Open on API Errors:**
- Files: `scripts/quality-gate.sh` lines 125–135
- Why fragile: If the OpenRouter API returns a non-200 status or an empty response, the script exits 0 (success), allowing the commit through without evaluation. This means any API outage completely bypasses the quality gate.
- Safe modification: Consider logging the skip reason to a file and posting it as a PR comment via the GitHub Actions workflow so reviewers know the gate was not evaluated. Do not silently exit 0.
- Test coverage: None for the script itself.

---

## Scaling Limits

**Supabase Free Tier:**
- Current capacity: 500MB database, 5GB bandwidth, 500K edge function invocations/month.
- Limit: At scale (1K+ daily active users), the `page_views` table will exceed 500MB within months (each row is ~200 bytes; 1K views/day = 73K rows/month).
- Scaling path: Move to Supabase Pro ($25/month) or implement a `page_views` rollup job that aggregates and truncates old rows weekly.

**Groq Free Tier for AI Chat:**
- Current capacity: Groq free tier limits vary (~14,400 requests/day for Llama 3.3 70B as of early 2026).
- Limit: A viral moment (e.g., social media pickup) could exhaust the daily quota, returning errors to all chat users.
- Scaling path: Add a per-session request counter (using `sessionStorage`) to limit users to N queries before showing a "quota exceeded" fallback to FAQ mode.

---

## Dependencies at Risk

**`docusaurus-graph@2.0.0` (Patched):**
- Risk: The package requires a local patch to function. It is not actively maintained (last release was version 2.0.0). The patch only handles indentation but may fail if the upstream file changes structure.
- Impact: Build breaks on `npm install` without `patch-package` running first; silent failure if patch no longer applies cleanly.
- Migration plan: Evaluate replacing with the built-in Docusaurus graph or a self-hosted script that generates the JSON from the docs directory.

**`@mlc-ai/web-llm@^0.2.82`:**
- Risk: WebLLM is evolving rapidly; minor version bumps can change the `CreateMLCEngine` API or model ID formats.
- Impact: Offline AI stops working; errors surface only when a user attempts to load the model.
- Migration plan: Pin to an exact version (`0.2.82`) and test before upgrading. Document the upgrade process in a comment in `src/lib/offlineAI.js`.

**`document.execCommand('copy')` (Deprecated):**
- Risk: `ShareButton.js` line 24 uses `document.execCommand('copy')` as a clipboard fallback, which is deprecated and has been removed in some browsers.
- Impact: Copy-to-clipboard silently fails in browsers that have dropped `execCommand`.
- Migration plan: Replace the fallback with the Clipboard API wrapped in a `try/catch`, which is now supported in all modern browsers.

---

## Missing Critical Features

**No Admin Moderation Interface:**
- Problem: Comments and suggestions go live immediately with no review queue. No admin can delete, hide, or flag content from the UI. The only deletion mechanism is the author's own delete button.
- Blocks: Safe public launch of comments/suggestions features; risk of spam or inappropriate content.

**English Translation Not Implemented:**
- Problem: Docusaurus is configured for two locales (`es` and `en`), and the locale dropdown appears in the navbar. The `i18n/en/` directory exists but contains only empty plugin config stubs. Clicking "English" on the live site will return 404s for all content pages.
- Files: `docusaurus.config.js` lines 16–23, `i18n/en/` directory
- Blocks: Investor section (`docs/09-investors/`) serves its English content, but the locale switcher is misleading for the entire rest of the site.

**No Test Suite:**
- Problem: Zero automated tests exist for any React component or utility function. The only automated quality check is the AI-powered quality gate (which evaluates content changes, not code correctness).
- Blocks: Safe refactoring of components like `AIChatWidget`, `AnalyticsTracker`, and `simulador.js` (the largest file at ~550 lines).

---

## Test Coverage Gaps

**All Interactive Components (0% coverage):**
- What's not tested: `AIChatWidget`, `CommentSection`, `ReactionBar`, `SuggestionSection`, `StatsPanel`, `AnalyticsTracker`, `InteractiveFooter`, `simulador.js`, `evaluacion.js`
- Files: All files in `src/components/` and `src/pages/`
- Risk: Any change to the Supabase schema, auth flow, or component props can silently break the interactive layer with no automated signal.
- Priority: High

**Supabase Edge Function (0% coverage):**
- What's not tested: Input validation paths, Groq API error handling, CORS headers, malformed JSON body
- Files: `supabase/functions/ai-chat/index.ts`
- Risk: A Groq API contract change or error format change breaks the chat silently until a user reports it.
- Priority: High

**Quality Gate Script (0% coverage):**
- What's not tested: API failure paths, FAIL verdict enforcement, WARNING verdict logic, diff truncation
- Files: `scripts/quality-gate.sh`
- Risk: The gate could be silently bypassed on any API error. There is no integration test confirming the script actually blocks a bad commit.
- Priority: Medium

---

*Concerns audit: 2026-03-21*
