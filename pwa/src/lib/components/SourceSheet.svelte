<script>
  import { X } from '@lucide/svelte';

  let { sources = [], open = false, onclose } = $props();

  let dialogEl = $state(null);

  $effect(() => {
    if (!dialogEl) return;
    if (open && !dialogEl.open) {
      dialogEl.showModal();
    } else if (!open && dialogEl.open) {
      dialogEl.close();
    }
  });

  function handleDialogClose() {
    if (onclose) onclose();
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  class="vsa-source-sheet"
  bind:this={dialogEl}
  onclose={handleDialogClose}
  onclick={(e) => { if (e.target === dialogEl) onclose?.(); }}
  onkeydown={(e) => { if (e.key === 'Escape') onclose?.(); }}
>
  <div class="vsa-source-sheet__handle"></div>
  <button class="vsa-source-sheet__close" aria-label="Cerrar" onclick={onclose}>
    <X size={20} />
  </button>
  <div class="vsa-source-sheet__content">
    {#each sources as source}
      <div class="vsa-source-sheet__source">
        <p class="vsa-source-sheet__org">{source.organization}</p>
        {#if source.date}
          <p class="vsa-source-sheet__date">Fecha: {source.date}</p>
        {/if}
        {#if source.url}
          <a href={source.url} target="_blank" rel="noopener" class="vsa-source-sheet__link">Ver fuente original</a>
        {/if}
        {#if source.methodology}
          <p class="vsa-source-sheet__methodology">Basado en {source.methodology}</p>
        {/if}
      </div>
    {/each}
  </div>
</dialog>

<style>
  .vsa-source-sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    margin: 0;
    max-width: 100%;
    width: 100%;
    max-height: 70vh;
    border: none;
    border-radius: var(--vsa-radius-lg) var(--vsa-radius-lg) 0 0;
    background: var(--vsa-bg-card);
    padding: var(--vsa-space-lg);
    color: var(--vsa-text-primary);
    transform: translateY(0);
    transition: transform 200ms ease-out;
  }

  .vsa-source-sheet::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }

  .vsa-source-sheet__handle {
    width: 36px;
    height: 4px;
    border-radius: 2px;
    background: var(--vsa-text-secondary);
    opacity: 0.3;
    margin: 0 auto var(--vsa-space-md);
  }

  .vsa-source-sheet__close {
    position: absolute;
    top: var(--vsa-space-md);
    right: var(--vsa-space-md);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: none;
    background: none;
    color: var(--vsa-text-secondary);
    cursor: pointer;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }

  .vsa-source-sheet__close:hover {
    color: var(--vsa-text-primary);
  }

  .vsa-source-sheet__content {
    overflow-y: auto;
    max-height: calc(70vh - 80px);
  }

  .vsa-source-sheet__source {
    padding: var(--vsa-space-md) 0;
    border-bottom: 1px solid var(--vsa-border);
  }

  .vsa-source-sheet__source:last-child {
    border-bottom: none;
  }

  .vsa-source-sheet__org {
    font-size: var(--vsa-font-size-lg);
    font-weight: 600;
    margin: 0 0 var(--vsa-space-xs);
  }

  .vsa-source-sheet__date {
    font-size: var(--vsa-font-size-xs);
    color: var(--vsa-text-secondary);
    margin: 0 0 var(--vsa-space-xs);
  }

  .vsa-source-sheet__link {
    font-size: var(--vsa-font-size-base);
    color: var(--vsa-accent);
    text-decoration: none;
    display: inline-block;
    margin: var(--vsa-space-xs) 0;
  }

  .vsa-source-sheet__link:hover {
    text-decoration: underline;
  }

  .vsa-source-sheet__methodology {
    font-size: var(--vsa-font-size-xs);
    color: var(--vsa-text-secondary);
    font-style: italic;
    margin: var(--vsa-space-xs) 0 0;
  }
</style>
