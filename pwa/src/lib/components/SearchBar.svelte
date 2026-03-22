<script>
  import { browser } from '$app/environment';

  let query = $state('');
  let results = $state([]);
  let pagefind = $state(null);
  let debounceTimer = $state(null);

  async function initPagefind() {
    if (pagefind || !browser) return;
    try {
      pagefind = await import(/* @vite-ignore */ '/pagefind/pagefind.js');
      await pagefind.init();
    } catch (e) {
      console.error('Pagefind not available (run build first):', e);
    }
  }

  function search() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      if (!pagefind || !query.trim()) {
        results = [];
        return;
      }
      try {
        const searchResult = await pagefind.search(query);
        const resolved = await Promise.all(
          searchResult.results.slice(0, 10).map(r => r.data())
        );
        results = resolved;
      } catch (e) {
        console.error('Search error:', e);
        results = [];
      }
    }, 200);
  }
</script>

<div class="vsa-search" role="search">
  <input
    type="search"
    placeholder="Buscar en el plan..."
    bind:value={query}
    onfocus={initPagefind}
    oninput={search}
    class="vsa-search__input"
    aria-label="Buscar en el plan"
  />
  {#if results.length > 0}
    <ul class="vsa-search__results" role="listbox" aria-live="polite">
      {#each results as result}
        <li class="vsa-search__result">
          <a href={result.url}>
            <span class="vsa-search__result-title">{result.meta?.title || result.url}</span>
            <p class="vsa-search__result-excerpt">{@html result.excerpt}</p>
            <span class="vsa-search__result-url">{result.url}</span>
          </a>
        </li>
      {/each}
    </ul>
  {:else if query.trim().length > 0 && pagefind}
    <div class="vsa-search__empty">
      <p class="vsa-search__empty-heading">Sin resultados</p>
      <p class="vsa-search__empty-body">Intenta con otros terminos o navega por los capitulos.</p>
    </div>
  {/if}
</div>

<style>
  .vsa-search {
    position: relative;
    margin-bottom: var(--vsa-space-lg);
  }

  .vsa-search__input {
    width: 100%;
    height: 48px;
    padding: 0 var(--vsa-space-md);
    background: var(--vsa-bg-card);
    border: 1px solid var(--vsa-border);
    border-radius: var(--vsa-radius-md);
    color: var(--vsa-text-primary);
    font-size: var(--vsa-font-size-base);
    outline: none;
    box-sizing: border-box;
    -webkit-appearance: none;
  }

  .vsa-search__input::placeholder {
    color: var(--vsa-text-secondary);
  }

  .vsa-search__input:focus {
    border-color: var(--vsa-accent);
  }

  .vsa-search__results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 50;
    list-style: none;
    margin: var(--vsa-space-xs) 0 0;
    padding: 0;
    background: var(--vsa-bg-card);
    border: 1px solid var(--vsa-border);
    border-radius: var(--vsa-radius-md);
    box-shadow: var(--vsa-shadow-elevated);
    max-height: 60vh;
    overflow-y: auto;
    animation: vsa-search-appear 150ms ease-out;
  }

  @keyframes vsa-search-appear {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .vsa-search__result {
    border-bottom: 1px solid var(--vsa-border);
  }

  .vsa-search__result:last-child {
    border-bottom: none;
  }

  .vsa-search__result a {
    display: block;
    padding: 12px var(--vsa-space-md);
    text-decoration: none;
    color: inherit;
  }

  .vsa-search__result a:hover {
    background: var(--vsa-bg-secondary);
  }

  .vsa-search__result-title {
    display: block;
    font-size: var(--vsa-font-size-base);
    font-weight: 600;
    color: var(--vsa-text-primary);
    margin-bottom: 4px;
  }

  .vsa-search__result-excerpt {
    font-size: var(--vsa-font-size-base);
    color: var(--vsa-text-secondary);
    margin: 0 0 4px;
    line-height: 1.4;
  }

  .vsa-search__result-excerpt :global(mark) {
    background: none;
    color: var(--vsa-accent);
    font-weight: 600;
  }

  .vsa-search__result-url {
    display: block;
    font-size: var(--vsa-font-size-xs);
    color: var(--vsa-text-secondary);
    word-break: break-all;
  }

  .vsa-search__empty {
    padding: var(--vsa-space-lg) var(--vsa-space-md);
    text-align: center;
  }

  .vsa-search__empty-heading {
    font-size: var(--vsa-font-size-base);
    font-weight: 600;
    color: var(--vsa-text-primary);
    margin: 0 0 var(--vsa-space-xs);
  }

  .vsa-search__empty-body {
    font-size: var(--vsa-font-size-sm);
    color: var(--vsa-text-secondary);
    margin: 0;
  }
</style>
