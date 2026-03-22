<script>
  import SourceSheet from './SourceSheet.svelte';
  import { classifySource } from '$lib/content/sources.js';

  let { sources = [] } = $props();

  let sheetOpen = $state(false);

  const primaryType = $derived(sources.length > 0 ? classifySource(sources[0].organization) : 'media');
  const orgNames = $derived(sources.map(s => s.organization).join(', '));

  function openSheet() {
    sheetOpen = true;
  }

  function closeSheet() {
    sheetOpen = false;
  }

  function handleKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openSheet();
    }
  }
</script>

<span
  class="vsa-source-badge vsa-source-badge--{primaryType}"
  role="button"
  tabindex="0"
  aria-label="Fuente: {orgNames}. Toca para ver detalles."
  onclick={openSheet}
  onkeydown={handleKeydown}
>
  {orgNames}
</span>

<SourceSheet sources={sources} open={sheetOpen} onclose={closeSheet} />

<style>
  .vsa-source-badge {
    display: inline-flex;
    align-items: center;
    border-radius: var(--vsa-radius-full);
    padding: 2px 8px;
    min-height: 44px;
    font-size: var(--vsa-font-size-xs);
    font-weight: 500;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    line-height: 1;
    vertical-align: middle;
  }

  .vsa-source-badge:focus-visible {
    outline: 2px solid var(--vsa-accent);
    outline-offset: 2px;
  }

  .vsa-source-badge--multilateral {
    color: var(--vsa-source-multilateral);
    background: var(--vsa-source-multilateral-bg);
  }

  .vsa-source-badge--energy {
    color: var(--vsa-source-energy);
    background: var(--vsa-source-energy-bg);
  }

  .vsa-source-badge--media {
    color: var(--vsa-source-media);
    background: var(--vsa-source-media-bg);
  }

  .vsa-source-badge--academic {
    color: var(--vsa-source-academic);
    background: var(--vsa-source-academic-bg);
  }

  .vsa-source-badge--projection {
    color: var(--vsa-source-projection);
    background: var(--vsa-source-projection-bg);
  }
</style>
