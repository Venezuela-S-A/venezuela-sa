# Technology Stack

**Analysis Date:** 2026-03-21

## Languages

**Primary:**
- JavaScript (ES Modules) — All frontend components, pages, and configuration (`src/`, `docusaurus.config.js`, `sidebars.js`)
- TypeScript — Supabase Edge Functions (`supabase/functions/ai-chat/index.ts`), runs on Deno
- SQL (PostgreSQL) — Database schema and migrations (`supabase/migration.sql`, `supabase/migration-v2-suggestions.sql`, `supabase/migration-v3-analytics.sql`)

**Secondary:**
- Bash — Tooling scripts (`scripts/quality-gate.sh`, `skills/evaluate.sh`)
- Markdown — Documentation corpus (`docs/`, `i18n/`, 85+ source documents)

## Runtime

**Environment:**
- Node.js 22 (pinned in CI via `.github/workflows/deploy.yml` `node-version: 22`)
- Deno (Supabase Edge Functions runtime, no version pinned locally)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present (lockfileVersion 3)
- `postinstall` script runs `patch-package` automatically

## Frameworks

**Core:**
- Docusaurus v3 (`@docusaurus/core ^3.0.0`) — Static site generator, content framework, routing
- React 18 (`react ^18.2.0`) — UI component layer
- MDX v3 (`@mdx-js/react ^3.0.0`) — Markdown-with-React support (configured as plain `md` format in practice)

**Testing:**
- Not detected — no test framework configured, no test files found

**Build/Dev:**
- Docusaurus CLI — `npm run start` (dev), `npm run build` (production static build)
- `patch-package ^8.0.1` — Patches `docusaurus-graph` via `patches/docusaurus-graph+2.0.0.patch`

## Key Dependencies

**Critical:**
- `@docusaurus/core ^3.0.0` — Core site framework; all routing, build, and plugin orchestration
- `@docusaurus/preset-classic ^3.0.0` — Docs, sitemap, and theme in one preset
- `@supabase/supabase-js ^2.99.2` — Database client used for auth, comments, reactions, suggestions, and analytics
- `@mlc-ai/web-llm ^0.2.82` — In-browser LLM inference via WebGPU (model: `Llama-3.2-1B-Instruct-q4f16_1-MLC`); lazy-loaded on demand

**Infrastructure:**
- `@docusaurus/theme-mermaid ^3.9.2` — Mermaid diagram rendering (enabled via `markdown.mermaid: true`)
- `@cmfcmf/docusaurus-search-local ^2.0.1` — Offline, bilingual (es/en) full-text search with no external service
- `@docusaurus/plugin-pwa ^3.9.2` — Progressive Web App support with offline mode
- `@docusaurus/plugin-ideal-image ^3.9.2` — Responsive image optimization
- `docusaurus-graph ^2.0.0` — Knowledge graph visualization (patched via `patches/`)
- `@coffeecup_tech/docusaurus-plugin-structured-data ^1.0.2` — JSON-LD structured data for SEO
- `prism-react-renderer ^2.1.0` — Code block syntax highlighting

## Configuration

**Environment:**
- `.env` file present (never read — contains secrets). Template in `.env.example`
- Required variable: `OPENROUTER_API_KEY` — used by `scripts/quality-gate.sh` and `skills/evaluate.sh`
- Supabase connection is hardcoded as placeholder constants in `src/lib/supabase.js` — requires manual edit to deploy
- Groq API key (`GROQ_API_KEY`) is a Supabase secret injected at runtime into the Edge Function `supabase/functions/ai-chat/index.ts`

**Build:**
- `docusaurus.config.js` — Main config (ESM, `export default config`)
- `sidebars.js` — Sidebar structure for docs
- `markdown.format: "md"` — Disables MDX processing, plain Markdown only
- `numberPrefixParser: false` — File names with numeric prefixes not stripped
- `routeBasePath: "/"` — Docs serve at site root (no `/docs/` prefix)
- `baseUrl: "/venezuela-sa/"` — Deployed under GitHub Pages subpath

## Platform Requirements

**Development:**
- Node.js 22+
- npm (lockfile present — use `npm ci` for reproducible installs)
- WebGPU-capable browser for offline AI chat feature (`@mlc-ai/web-llm`)
- `jq` CLI tool — required by `scripts/quality-gate.sh`
- `curl` — required by `scripts/quality-gate.sh`
- `OPENROUTER_API_KEY` env var for quality gate script and AI evaluation tool

**Production:**
- GitHub Pages (static hosting at `https://venezuela-s-a.github.io/venezuela-sa/`)
- Supabase project (PostgreSQL + Auth + Edge Functions) for interactive features
- Groq API key configured as Supabase secret for Edge Function AI chat

---

*Stack analysis: 2026-03-21*
