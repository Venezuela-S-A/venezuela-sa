# Codebase Structure

**Analysis Date:** 2026-03-21

## Directory Layout

```
venezuela-sa/
├── docs/                        # Plan content — Markdown source files
│   ├── intro.md                 # Entry point / thesis
│   ├── glosario.md              # Glossary
│   ├── referencias.md           # 85+ verified sources
│   ├── conclusion.md            # Closing chapter
│   ├── 01-fundamentos/          # Foundations: diagnosis, emergency phase
│   ├── 02-motor-financiero/     # Financial engine: oil, fund, debt
│   ├── 03-ciudadanos/           # Citizens & diaspora
│   ├── 04-gobernanza/           # Governance, security, geopolitics
│   ├── 05-transformacion/       # Tech hubs, education, startups
│   ├── 06-realidad/             # Digital state, infrastructure, pensions
│   ├── 07-ejecucion/            # Timeline, projections, risks, KPIs
│   ├── 08-pitch/                # Investor annex (Spanish)
│   ├── 09-investors/            # Investor annex (English)
│   ├── 10-oportunidades/        # Investment opportunity deep-dives (20 sectors)
│   └── research/                # Research scratch files
├── src/                         # React source — interactive layer
│   ├── components/              # Reusable UI components
│   ├── contexts/                # React Context providers
│   ├── css/                     # Global styles
│   ├── data/                    # Client-side static data files
│   ├── lib/                     # Service clients (Supabase, offline AI)
│   ├── pages/                   # Standalone Docusaurus pages
│   └── theme/                   # Docusaurus theme swizzles
├── supabase/                    # Backend config and migrations
│   ├── functions/ai-chat/       # Edge Function: Groq AI proxy
│   ├── migration.sql            # Initial schema (profiles, comments, reactions)
│   ├── migration-v2-suggestions.sql  # Suggestions table
│   └── migration-v3-analytics.sql   # page_views table
├── skills/                      # AI prompt library (not deployed to site)
│   ├── experts/                 # 14 domain expert prompts
│   ├── perspectives/            # 65 ideological/persona prompts
│   ├── tools/                   # Utility prompts (research, translation, etc.)
│   ├── project/                 # Project-management prompts + references
│   ├── evaluations/             # Saved evaluation outputs
│   ├── evaluate.sh              # Multi-AI evaluation runner (7 models)
│   └── evaluate-full.sh         # Extended evaluation runner
├── scripts/
│   └── quality-gate.sh          # AI-powered commit quality checker
├── static/                      # Static assets served as-is
│   ├── img/                     # Images and OG graphics
│   ├── manifest.json            # PWA manifest
│   └── docusaurus-graph.json    # Knowledge graph data for docusaurus-graph plugin
├── content/                     # Supplementary content (TikTok series, etc.)
├── i18n/                        # Internationalization overrides
│   └── en/                      # English translations of docs
├── patches/                     # patch-package patches for npm packages
│   └── docusaurus-graph+2.0.0.patch
├── .github/
│   └── workflows/
│       ├── deploy.yml           # Build + deploy to GitHub Pages on push to main
│       └── quality-gate.yml     # AI quality gate on PRs touching docs/
├── .planning/codebase/          # GSD analysis documents (this directory)
├── docusaurus.config.js         # Docusaurus configuration (plugins, themes, navbar)
├── sidebars.js                  # Sidebar navigation tree (manual, not auto-generated)
├── package.json                 # Dependencies and build scripts
├── CLAUDE.md                    # Project rules for AI agents (inviolable)
└── skills-lock.json             # Skills version lock file
```

## Directory Purposes

**`docs/`:**
- Purpose: All plan content as Markdown. This is the core deliverable.
- Contains: `.md` files only — no MDX, no JSX
- Key files: `docs/intro.md` (entry), `docs/referencias.md` (sources), `docs/glosario.md` (glossary)
- Naming: `kebab-case.md`. Numeric prefix on directories (`01-fundamentos`) is cosmetic — `numberPrefixParser: false` in Docusaurus config means prefixes are not stripped from URLs.

**`docs/10-oportunidades/`:**
- Purpose: Investment opportunity deep-dives, each covering one economic sector
- Contains: 20 large Markdown files (28–45KB each), cross-referenced in the sidebar alongside other sections

**`src/components/`:**
- Purpose: Interactive React components appended to pages; none replace core content rendering
- Key files:
  - `AIChatWidget.js` — floating chat button + panel (Groq → FAQ → WebLLM fallback chain)
  - `InteractiveFooter.js` — compositor that injects reactions, suggestions, comments into every doc page
  - `ReactionBar.js` — emoji reactions per page (requires Supabase auth)
  - `CommentSection.js` — threaded comments per page
  - `SuggestionSection.js` — plan improvement suggestions
  - `ShareButton.js`, `ExportButton.js` — sharing utilities
  - `AnalyticsTracker.js` — headless scroll/time tracker (renders null)
  - `StatsPanel.js` — reads `page_views` for `/estadisticas` page

**`src/contexts/`:**
- Purpose: Global React state
- Key files: `AuthContext.js` — provides `{ user, profile, loading, signIn, signUp, signOut }` via `useAuth()` hook

**`src/lib/`:**
- Purpose: Service client singletons
- Key files:
  - `supabase.js` — `getSupabase()` lazy singleton + `isConfigured()` guard
  - `offlineAI.js` — WebGPU/WebLLM engine management for offline chat (`Llama-3.2-1B`)

**`src/data/`:**
- Purpose: Static data not requiring a database call
- Key files:
  - `evaluations.js` — score history, 65 perspective metadata, spectrum colors
  - `faq.js` — FAQ entries for offline chat keyword matching

**`src/pages/`:**
- Purpose: Standalone pages accessible from the navbar (not part of the docs sidebar)
- Key files:
  - `simulador.js` — interactive financial model with sliders (oil price, production, investment allocation)
  - `estadisticas.js` — participation stats (powered by `StatsPanel`)
  - `evaluacion.js` — score history and perspective breakdown
  - `sugerencias.js` — global suggestions feed
  - `analytics.js` — detailed analytics dashboard

**`src/theme/`:**
- Purpose: Docusaurus component swizzles (overrides of built-in theme components)
- Key files:
  - `Root.js` — wraps entire app: `AuthProvider` + global `AnalyticsTracker` + global `AIChatWidget`
  - `DocItem/Layout/index.js` — appends `InteractiveFooter` to every documentation page

**`supabase/`:**
- Purpose: All backend configuration — schema and server-side logic
- Key files:
  - `migration.sql` — base schema; run once in Supabase SQL Editor to bootstrap
  - `functions/ai-chat/index.ts` — only server-side code; Deno-based Groq proxy

**`skills/`:**
- Purpose: AI prompt library for plan analysis and evaluation. Not part of the built website.
- Contains: `experts/` (14 domain prompts), `perspectives/` (65 persona prompts), `tools/` (utility prompts)
- Pattern: Each skill is a standalone `.md` file consumed by `evaluate.sh` or manually by AI agents

**`scripts/`:**
- Purpose: Developer tooling
- Key files: `quality-gate.sh` — evaluates git diffs against plan principles via OpenRouter API; called by CI and manually

**`static/`:**
- Purpose: Files served verbatim under the site root
- Key files: `manifest.json` (PWA), `docusaurus-graph.json` (knowledge graph), `img/` (OG images, favicon)

## Key File Locations

**Entry Points:**
- `docusaurus.config.js`: Docusaurus build configuration
- `src/theme/Root.js`: Browser app shell entry (auth + global widgets)
- `src/theme/DocItem/Layout/index.js`: Per-doc interactive injection point
- `docs/intro.md`: First page users see (`routeBasePath: "/"`)

**Configuration:**
- `docusaurus.config.js`: All plugin/theme/i18n/navbar config
- `sidebars.js`: Complete sidebar navigation tree — must be updated when adding docs
- `package.json`: Build scripts (`start`, `build`, `deploy`)
- `CLAUDE.md`: Project governance rules for AI agents

**Core Logic:**
- `src/lib/supabase.js`: Database access point
- `src/contexts/AuthContext.js`: Auth state management
- `src/components/AIChatWidget.js`: Chat widget with 3-tier AI fallback
- `supabase/functions/ai-chat/index.ts`: Server-side Groq proxy
- `scripts/quality-gate.sh`: Plan integrity enforcement

**Database:**
- `supabase/migration.sql`: Base schema (run first)
- `supabase/migration-v2-suggestions.sql`: Suggestions table (run second)
- `supabase/migration-v3-analytics.sql`: Analytics table (run third)

**Styling:**
- `src/css/custom.css`: All custom CSS; Docusaurus CSS variables overridden here. BEM-style `.vsa-*` prefix for custom components.

## Naming Conventions

**Files:**
- Docs: `kebab-case.md` (e.g., `contratos-forward.md`, `fase-0-emergencia.md`)
- React components: `PascalCase.js` (e.g., `ReactionBar.js`, `AIChatWidget.js`)
- React pages: `camelCase.js` (e.g., `simulador.js`, `estadisticas.js`)
- Data files: `camelCase.js` (e.g., `evaluations.js`, `faq.js`)
- Scripts: `kebab-case.sh` (e.g., `quality-gate.sh`)
- Skills prompts: `kebab-case.md` (e.g., `oil-energy.md`, `venture-capital.md`)

**Directories:**
- Docs chapters: `NN-tema/` with two-digit numeric prefix (e.g., `01-fundamentos/`, `10-oportunidades/`)
- src subdirs: lowercase single word (e.g., `components/`, `contexts/`, `lib/`, `data/`)
- Skills: lowercase kebab (e.g., `experts/`, `perspectives/`, `tools/`)

**CSS Classes:**
- Custom component classes: `.vsa-` prefix with BEM-style modifiers (e.g., `.vsa-chat`, `.vsa-chat__header`, `.vsa-chat__bubble--assistant`)

**Supabase Tables:**
- snake_case (e.g., `page_views`, `reaction_type`, `page_slug`)

## Where to Add New Code

**New plan section (doc):**
- Add `.md` file to the appropriate `docs/NN-theme/` directory
- Add the doc ID to `sidebars.js` under the correct category
- Add any sources to `docs/referencias.md`
- Run `npm run build` to verify no broken links

**New investment opportunity section:**
- Add `.md` file to `docs/10-oportunidades/`
- Add the doc ID to `sidebars.js` under the "Oportunidades de Inversión" category

**New standalone page (navbar item):**
- Add `ComponentName.js` to `src/pages/`
- Add navbar item to `themeConfig.navbar.items` in `docusaurus.config.js`

**New interactive component:**
- Add `ComponentName.js` to `src/components/`
- If per-doc: compose into `InteractiveFooter.js`
- If global: mount in `src/theme/Root.js`
- If it needs auth: use `useAuth()` from `src/contexts/AuthContext.js`
- If it needs Supabase: import `getSupabase`, `isConfigured` from `src/lib/supabase.js`; always guard with `isConfigured()` check

**New Supabase table:**
- Write a new `supabase/migration-vN-description.sql` file
- Apply RLS policies following the pattern in `supabase/migration.sql` (public select, auth-gated insert/update/delete)

**New skill prompt:**
- Add `skill-name.md` to the appropriate `skills/` subdirectory (`experts/`, `perspectives/`, or `tools/`)
- Update `skills-lock.json` if the skills registry is tracked

**New utility/shared helper:**
- Shared service clients: `src/lib/`
- Pure data constants: `src/data/`
- Do not create a `src/utils/` — no such pattern exists in this codebase

## Special Directories

**`.planning/`:**
- Purpose: GSD planning documents (codebase analysis, phase plans)
- Generated: By GSD map-codebase command
- Committed: Yes

**`skills/evaluations/`:**
- Purpose: Saved outputs from `evaluate.sh` and `evaluate-full.sh` runs
- Generated: By evaluation scripts
- Committed: Yes (historical record of plan scoring)

**`build/`:**
- Purpose: Docusaurus static build output
- Generated: By `npm run build`
- Committed: No (in `.gitignore`)

**`.docusaurus/`:**
- Purpose: Docusaurus dev server cache
- Generated: By `npm start`
- Committed: No

**`patches/`:**
- Purpose: `patch-package` patches applied post-install to fix upstream npm package bugs
- Generated: By `npx patch-package`
- Committed: Yes (applied automatically via `postinstall` script)

**`.claude/`, `.agents/`, `.kiro/`, `.windsurf/`, `.junie/`, `.kilocode/`, `.roo/`, `.trae/`:**
- Purpose: IDE/AI agent configuration directories for multiple AI coding tools
- Generated: By respective tools
- Committed: Yes (enables consistent AI agent behavior across team members)

---

*Structure analysis: 2026-03-21*
