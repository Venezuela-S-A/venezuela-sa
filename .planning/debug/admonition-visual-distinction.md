---
status: diagnosed
trigger: "admonition blocks (:::danger, :::info, :::tip, :::caution) all look the same in Phase 2 content migration PWA"
created: 2026-03-23T00:00:00Z
updated: 2026-03-23T00:00:00Z
symptoms_prefilled: true
goal: find_root_cause_only
---

## Current Focus

hypothesis: CONFIRMED — Admonition.svelte component is never used; remark-callout-directives outputs
  raw HTML <aside class="callout callout-{type}"> elements with no CSS defined for those classes;
  plus the alias mapping collapses danger+caution to the same callout type ("deter")
test: traced full pipeline: markdown → remark-directive → remark-callout-directives → raw HTML aside
  element → rendered in Article.svelte with no callout CSS applied
expecting: n/a — root cause confirmed
next_action: return diagnosis

## Symptoms

expected: :::danger, :::info, :::tip, :::caution each render with distinct colors and icons
actual: all admonition blocks look visually identical — no distinction between types
errors: []
reproduction: view any doc page in the PWA that contains admonition blocks of different types
started: Phase 2 content migration

## Eliminated

- hypothesis: Admonition.svelte component receives wrong `type` prop
  evidence: Admonition.svelte is never imported or referenced anywhere in the codebase outside its own file
  timestamp: 2026-03-23

- hypothesis: CSS tokens are missing for admonition types
  evidence: tokens.css defines --vsa-info, --vsa-info-bg, --vsa-warning, --vsa-warning-bg, --vsa-danger-bg,
    --vsa-destructive, --vsa-accent, --vsa-accent-subtle — all required tokens exist in both dark and light
    mode. Token definitions are NOT the problem.
  timestamp: 2026-03-23

- hypothesis: remark-directive fails to parse :::directive syntax
  evidence: remark-directive IS in the plugin chain (mdsvex.config.js line 17) and produces
    containerDirective nodes; remark-callout-directives then processes them — parsing is correct
  timestamp: 2026-03-23

## Evidence

- timestamp: 2026-03-23
  checked: Admonition.svelte imports across entire pwa/src directory
  found: zero import statements; the component is only self-referential
  implication: Admonition.svelte is dead code — it is never mounted during rendering

- timestamp: 2026-03-23
  checked: remark-callout-directives/src/index.js output shape
  found: plugin transforms containerDirective nodes into <aside class="callout callout-{calloutType}">
    using hast h() element, NOT a Svelte component. The output is raw HTML.
  implication: rendered HTML uses callout-deter, callout-note, callout-commend, callout-warn CSS classes

- timestamp: 2026-03-23
  checked: mdsvex.config.js aliases block
  found: danger → "deter", caution → "deter", info → "note", tip → "commend", warning → "warn"
  implication: both :::danger and :::caution map to the same callout type "deter" and get identical
    class callout-deter, compounding the visual sameness

- timestamp: 2026-03-23
  checked: pwa/src/lib/styles/article.css and tokens.css for callout-* CSS rules
  found: zero CSS rules for .callout, .callout-deter, .callout-note, .callout-commend, .callout-warn
  implication: the raw <aside class="callout callout-deter"> elements rendered in the DOM have
    NO styling whatsoever — no border, no background, no color. All types look identical (unstyled).

- timestamp: 2026-03-23
  checked: Admonition.svelte scoped styles
  found: full type-specific styles defined (vsa-admonition--danger, --caution, --warning, --info, --tip)
    using correct design tokens from tokens.css
  implication: the CSS is correct and complete but is scoped to Svelte component internals;
    since the component is never used, these styles never reach the DOM

- timestamp: 2026-03-23
  checked: Article.svelte rendering pipeline
  found: Article renders markdown via <svelte:component this={doc.component} /> — mdsvex preprocessed
    component. No custom component mapping for directives. No layout with components prop.
  implication: there is no hook to redirect callout directive output through Admonition.svelte

## Resolution

root_cause: Admonition.svelte exists but is never connected to the rendering pipeline.
  remark-callout-directives outputs raw <aside class="callout callout-{type}"> HTML elements,
  but no CSS is defined for these class names anywhere. Additionally, the aliases in mdsvex.config.js
  map both :::danger and :::caution to the same "deter" type, so even if CSS were added,
  those two types would still be visually identical.
fix: (not applied — diagnose-only mode)
verification:
files_changed: []
