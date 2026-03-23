# Roadmap: Venezuela S.A. PWA Ciudadana

## Overview

Migration from Docusaurus to a SvelteKit PWA that delivers Venezuela S.A. as an interactive book: installable, offline-first, mobile-first. The journey starts with the app shell and PWA foundation (everything mounts into it), moves to content migration (validate mdsvex early, migrate 50+ docs), adds interactive features (FCV calculator + dashboards sharing the same Chart.js data pipeline), layers on social features (Supabase-powered paragraph comments, voting, sharing), and finishes with the dual citizen/investor experience toggle. Each phase delivers a complete, verifiable capability.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - App shell, PWA install, offline caching, performance budget, SvelteKit scaffold (completed 2026-03-22)
- [ ] **Phase 2: Content Migration** - 50+ markdown docs rendered as navigable book with search, deep links, source attribution
- [ ] **Phase 3: Interactive Features** - FCV calculator, 3 dashboards, plan tracker, comparison mode — all Chart.js on static JSON
- [ ] **Phase 4: Social Layer** - Paragraph-level comments, voting, sharing (deep links + image cards) via Supabase
- [ ] **Phase 5: Dual Experience** - Ciudadano/inversor toggle, English investor pitch, shared data layer

## Phase Details

### Phase 1: Foundation
**Goal**: A citizen can install the app from their browser, see the tab navigation, and use the shell offline on a low-end Android device
**Depends on**: Nothing (first phase)
**Requirements**: FNDN-01, FNDN-02, FNDN-03, FNDN-04, FNDN-05, FNDN-06, FNDN-07, FNDN-08
**Success Criteria** (what must be TRUE):
  1. User can install the app to their home screen from Chrome on Android and it launches as a standalone app
  2. User sees persistent bottom tabs (Home, Mi FCV, El Plan, Dashboards) and can navigate between them
  3. User can turn off network (airplane mode) and the app shell still loads and navigates
  4. First Contentful Paint is under 2 seconds on a simulated 3G connection (Lighthouse audit)
  5. Initial JS bundle is under 200KB gzipped (CI gate enforced)
**Plans**: 4 plans

Plans:
- [x] 01-00-PLAN.md — Wave 0: test stub scaffolding (TabBar, ThemeToggle, PullToRefresh, PWA manifest)
- [x] 01-01-PLAN.md — SvelteKit scaffold, design system tokens, app shell with tabs + header + theme toggle
- [x] 01-02-PLAN.md — Home hero content, tab teasers (ComingSoon), onboarding overlay, install button
- [x] 01-03-PLAN.md — PWA config (@vite-pwa), service worker, pull-to-refresh, bundle size CI gate

### Phase 2: Content Migration
**Goal**: A citizen can read the entire plan as a book — every existing Docusaurus page is accessible, searchable offline, and navigable sequentially
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, CONT-08
**Success Criteria** (what must be TRUE):
  1. User can browse all 50+ plan documents within the El Plan tab, with previous/next navigation between sections
  2. User can search any term across all content and get results while offline (Pagefind or Flexsearch)
  3. User can share a direct URL to any section or paragraph and the recipient lands on that exact content
  4. Admonitions (danger, info, tip, caution), Mermaid diagrams (as static SVG), and wide tables (horizontal scroll) render correctly on a 360px-wide screen
  5. Every data point shows its source (organization + date + URL) via tooltip or footnote
**Plans**: 6 plans

Plans:
- [x] 02-00-PLAN.md — Wave 0: test stub scaffolding for all 8 CONT requirements
- [x] 02-01-PLAN.md — mdsvex pipeline, remark/rehype plugins, Mermaid build script, content data layer (chapters, sources, reading progress)
- [x] 02-02-PLAN.md — Content rendering components (Article, Admonition, SourceBadge, TableWrapper, DiagramViewer, ReadingProgress, ChapterHeader, ChapterSources)
- [x] 02-03-PLAN.md — Book landing page, chapter reader route, chapter navigation, Pagefind search, service worker update
- [x] 02-04-PLAN.md — Full build validation + human verification checkpoint
- [x] 02-05-PLAN.md — Gap closure: admonition visual distinction (callout CSS + alias collision fix)

### Phase 3: Interactive Features
**Goal**: A citizen can simulate their personal FCV, explore national dashboards, and track the plan's progress — all powered by static JSON data with verifiable sources
**Depends on**: Phase 2
**Requirements**: INTX-01, INTX-02, INTX-03, INTX-04, INTX-05, INTX-06, INTX-07
**Success Criteria** (what must be TRUE):
  1. User can open Mi FCV, adjust salary and years via sliders, and see their 5 subcuenta projections update in real time (Retiro 7%, Salud 7%, Vivienda 4%, Educacion 2%, Cesantia 3%)
  2. User can view 3 interactive dashboards (oil production timeline, budget allocation pie, sovereign fund growth) with touch-friendly interactions on mobile
  3. User can tap any chart segment or data point and see the detailed breakdown plus source citation (organization + date + URL)
  4. User can see a visual timeline tracker showing plan phases as completed/in-progress/pending
  5. User can compare "Venezuela hoy" vs "Venezuela en 15 anos" via split or swipe view with synchronized charts
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD

### Phase 4: Social Layer
**Goal**: A citizen can engage with any paragraph of the plan — comment on it, vote agreement/disagreement, and share it to WhatsApp or Twitter
**Depends on**: Phase 2
**Requirements**: SOCL-01, SOCL-02, SOCL-03, SOCL-04, SOCL-05, SOCL-06
**Success Criteria** (what must be TRUE):
  1. User can tap any paragraph in the plan and leave a comment (anonymous via Supabase, no login required)
  2. User can vote agree/disagree on any paragraph and see the aggregated count from other users
  3. User can share a specific paragraph as a deep link with quoted text to WhatsApp, Twitter, or copy to clipboard
  4. User can share a paragraph as a branded image card suitable for posting on social media
  5. User can see which paragraphs have active comments via a visual indicator (badge or highlight)
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

### Phase 5: Dual Experience
**Goal**: An international investor can toggle to an English experience with financial projections and an interactive pitch, while sharing the same underlying data as the citizen view
**Depends on**: Phase 3
**Requirements**: DUAL-01, DUAL-02, DUAL-03, DUAL-04
**Success Criteria** (what must be TRUE):
  1. User can toggle between ciudadano (ES) and inversor (EN) from any screen and the entire experience switches language and presentation
  2. Citizen experience shows Spanish narrative, personal impact dashboards, and FCV calculator
  3. Investor experience shows English content with financial projections, return metrics, and an interactive pitch deck
  4. Both experiences draw from the same underlying JSON data files — a data update propagates to both views automatically
**Plans**: TBD

Plans:
- [ ] 05-01: TBD
- [ ] 05-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

Note: Phase 3 and Phase 4 both depend on Phase 2 (not on each other). They could execute in parallel, but sequential execution is recommended to manage complexity.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 4/4 | Complete    | 2026-03-22 |
| 2. Content Migration | 5/6 | In progress | - |
| 3. Interactive Features | 0/? | Not started | - |
| 4. Social Layer | 0/? | Not started | - |
| 5. Dual Experience | 0/? | Not started | - |
