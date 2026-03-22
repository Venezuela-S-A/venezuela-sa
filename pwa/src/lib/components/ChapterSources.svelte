<script>
  import { ChevronDown, ChevronUp } from '@lucide/svelte';
  import { slide } from 'svelte/transition';

  let { sources = [] } = $props();

  let expanded = $state(false);
</script>

<div class="vsa-chapter-sources">
  <button
    class="vsa-chapter-sources__toggle"
    onclick={() => expanded = !expanded}
    aria-expanded={expanded}
  >
    <span>Fuentes de este capitulo ({sources.length})</span>
    {#if expanded}
      <ChevronUp size={16} />
    {:else}
      <ChevronDown size={16} />
    {/if}
  </button>
  {#if expanded}
    <div class="vsa-chapter-sources__list" transition:slide={{ duration: 200 }}>
      {#each sources as source}
        <div class="vsa-chapter-sources__item">
          <span class="vsa-chapter-sources__org">{source.organization}</span>
          {#if source.date}
            <span class="vsa-chapter-sources__date">{source.date}</span>
          {/if}
          {#if source.url}
            <a href={source.url} target="_blank" rel="noopener" class="vsa-chapter-sources__link">{source.url}</a>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .vsa-chapter-sources {
    margin-top: var(--vsa-space-2xl);
  }

  .vsa-chapter-sources__toggle {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 48px;
    padding: var(--vsa-space-sm) 0;
    border: none;
    background: none;
    color: var(--vsa-text-primary);
    font-size: var(--vsa-font-size-base);
    font-weight: 600;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .vsa-chapter-sources__toggle:focus-visible {
    outline: 2px solid var(--vsa-accent);
    outline-offset: 2px;
  }

  .vsa-chapter-sources__list {
    padding-bottom: var(--vsa-space-md);
  }

  .vsa-chapter-sources__item {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: var(--vsa-space-sm) 0;
    border-bottom: 1px solid var(--vsa-border);
  }

  .vsa-chapter-sources__item:last-child {
    border-bottom: none;
  }

  .vsa-chapter-sources__org {
    font-size: var(--vsa-font-size-base);
    color: var(--vsa-text-primary);
  }

  .vsa-chapter-sources__date {
    font-size: var(--vsa-font-size-xs);
    color: var(--vsa-text-secondary);
  }

  .vsa-chapter-sources__link {
    font-size: var(--vsa-font-size-xs);
    color: var(--vsa-accent);
    text-decoration: none;
    word-break: break-all;
  }

  .vsa-chapter-sources__link:hover {
    text-decoration: underline;
  }
</style>
