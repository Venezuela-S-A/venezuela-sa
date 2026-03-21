# Feature Landscape

**Domain:** Mobile-first PWA for national reconstruction plan (citizens + investors)
**Researched:** 2026-03-21

## Table Stakes

Features users expect. Missing = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Bottom tab navigation (Home, Mi FCV, El Plan, Dashboards) | Fintech apps train users to expect bottom tabs. Without them it feels like a website, not an app. | Medium | SvelteKit layout with persistent tab bar. Use Bits UI Tabs or custom component. |
| Offline access to all content | Venezuelan users have intermittent connectivity. If the app breaks offline, it is useless to the primary audience. | Medium | @vite-pwa/sveltekit + Workbox precaching of all prerendered pages + JSON data. |
| Installable from browser | "Add to Home Screen" is the distribution mechanism. No app store needed. | Low | PWA manifest + service worker. @vite-pwa/sveltekit handles this automatically. |
| Markdown content rendering | 50+ existing documents are the plan's substance. Users need to read the full plan. | Medium | mdsvex for build-time, unified/remark for runtime. Preserve tables, admonitions, links. |
| FCV calculator | Citizens need to see "what is in it for me." Simulating personal subcuenta values makes the plan tangible. | High | 5 subcuentas with sliders (salary, years, contribution rates). Chart.js for projections. Real-time reactivity via Svelte $derived. |
| At least 3 interactive dashboards | Static tables from Docusaurus do not engage. Interactive charts let users explore data and build conviction. | High | Oil production (line/bar), budget allocation (pie/donut), sovereign fund growth (area/line). |
| Spanish as primary language | 40M Venezuelan citizens. Spanish is non-negotiable. | Low | Default locale. All content authored in Spanish first. |
| Fast load on 3G (<2s FCP) | Target audience has slow connections. A 5-second load = user leaves. | Medium | Bundle budget enforcement, code splitting, image optimization, prerendered HTML. |
| Source attribution on all data | "Cero datos inventados" principle. Every number must link to its source. | Low | Data JSON files include source metadata. Render as tooltips or footnotes on charts. |

## Differentiators

Features that set product apart. Not expected, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Ciudadano/Inversor toggle | Single app serves two audiences with different perspectives on the same data. Investors see English pitch; citizens see Spanish plan. | Medium | Paraglide for UI strings. Separate content routes per audience. Toggle in header switches context. |
| Plan progress tracker | Shows which phases are complete, in progress, or upcoming. Makes the plan feel alive, not just a document. | Medium | JSON data file with phase statuses. Visual timeline component. |
| Data drill-down on charts | Tap a pie slice to see breakdown. Tap a bar to see the source data and citation. Interactive, not just pretty. | High | Chart.js click handlers + detail panels. Requires careful UX for small screens. |
| Dark mode | Low-end Android screens are often OLED. Dark mode saves battery and reduces eye strain. Fintech standard. | Low | Tailwind dark: classes. CSS variables for theme. Respect system preference. |
| Share specific sections | A citizen shares "Mira la seccion de educacion" with a deep link. Viral distribution without app store. | Low | SvelteKit file-based routing = every section has a URL. PWA share target API optional. |
| Pull-to-refresh for data updates | When online, pull to check if JSON data has been updated. Familiar mobile gesture. | Low | Service worker StaleWhileRevalidate + UI indicator. |
| Comparison mode (before/after) | Show "Venezuela hoy" vs "Venezuela en 15 anios" side by side. Dramatic visual impact. | Medium | Split-screen or swipe component with synchronized charts. |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| User accounts / authentication | No personal state to save in v1. Auth adds complexity, security surface, and backend dependency. | Store calculator inputs in localStorage. No accounts until there is something to persist server-side. |
| Real-time data feeds | No live data exists yet. Simulating real-time creates false expectations. | Static JSON with clear "Datos actualizados: [fecha]" label. |
| In-app AI chat (web-llm) | Current Docusaurus has WebGPU LLM. This requires high-end hardware, contradicting the 2GB RAM target. | Remove entirely. Consider a lightweight FAQ or search instead. |
| Comments / social features | Moderation is expensive. Political content attracts trolls. Out of scope for a plan presentation tool. | Link to external community (Telegram, Discord) if needed. |
| Backend API | Premature complexity. All data is known at build time. | Static JSON files. Structure data so API migration is easy later. |
| Native app wrappers (Capacitor/Cordova) | PWA covers both platforms. Native wrappers add build complexity, app store review, and update delays. | Pure PWA. If native features are needed later (push notifications), reassess. |
| Complex animations / transitions | Heavy animation libraries (Framer Motion, GSAP) eat bundle budget and cause jank on low-end devices. | Subtle CSS transitions only. Svelte built-in transition: directives for enter/exit. Zero JS animation libraries. |
| Full offline CMS | Content management is via git. No need for in-app editing. | Update content by committing markdown files and rebuilding. |

## Feature Dependencies

```
PWA Manifest + Service Worker --> Installability --> Offline Access
Bottom Tab Navigation --> All tab content (Home, FCV, Plan, Dashboards)
Markdown Pipeline (mdsvex) --> Content Migration --> El Plan tab
JSON Data Files --> Charts --> Dashboards tab
JSON Data Files --> FCV Calculator --> Mi FCV tab
Paraglide Setup --> ES/EN Toggle --> Investor Experience
Chart.js Integration --> All Dashboards --> Drill-down Interactions
Tailwind Setup --> All UI --> Dark Mode
```

## MVP Recommendation

Prioritize (ship these first):
1. **App shell + bottom tabs + PWA install** -- This is the skeleton everything else mounts into
2. **Content migration (El Plan tab)** -- Validates the markdown pipeline with real content
3. **FCV calculator (Mi FCV tab)** -- Single most engaging feature for citizens. "What is in it for me?"
4. **One dashboard (oil production)** -- Proves the Chart.js integration and data pipeline
5. **Offline mode** -- Without this, the app fails its primary audience

Defer:
- **Investor experience (EN):** Build after Spanish experience is solid. Same data, different presentation.
- **Plan progress tracker:** Nice but not essential for v1. The plan has not started executing yet.
- **Comparison mode:** High visual impact but high complexity. Phase 2.
- **Drill-down on charts:** v1 charts can be view-only. Interactive drill-down is Phase 2.
- **Dark mode:** Low effort but not a launch blocker. Add in first post-launch sprint.

## Sources

- PROJECT.md -- Project requirements and constraints
- [PWA best practices 2025](https://senorit.de/en/blog/progressive-web-apps-guide-2025) -- MEDIUM confidence
- [Flowbite Svelte Bottom Navigation](https://flowbite-svelte.com/docs/components/bottom-navigation) -- Reference for tab component patterns
- [Chart.js Usage Guide](https://www.chartjs.org/docs/latest/getting-started/usage.html) -- HIGH confidence
