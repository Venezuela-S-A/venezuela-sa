<script>
  import { Maximize2, X } from '@lucide/svelte';

  let { src = '', caption = '', type = '', complexity = 'simple' } = $props();

  let dialogEl = $state(null);

  function openFullscreen() {
    dialogEl?.showModal();
  }

  function closeFullscreen() {
    dialogEl?.close();
  }
</script>

<figure class="vsa-diagram" data-diagram-type={type}>
  <div class="vsa-diagram__container">
    <img src={src} alt={caption || 'Diagrama'} loading="lazy" class="vsa-diagram__img" />
    {#if complexity === 'complex'}
      <button
        class="vsa-diagram__expand"
        aria-label="Ampliar diagrama"
        onclick={openFullscreen}
      >
        <Maximize2 size={20} />
      </button>
    {/if}
  </div>
  {#if caption}
    <figcaption class="vsa-diagram__caption">{caption}</figcaption>
  {/if}
</figure>

<dialog bind:this={dialogEl} class="vsa-diagram__fullscreen">
  <button class="vsa-diagram__fullscreen-close" aria-label="Cerrar" onclick={closeFullscreen}>
    <X size={24} />
  </button>
  <div class="vsa-diagram__fullscreen-content" style="touch-action: pinch-zoom;">
    <img src={src} alt={caption || 'Diagrama'} />
  </div>
</dialog>

<style>
  .vsa-diagram {
    margin: var(--vsa-space-md) 0;
    max-width: 100%;
  }

  .vsa-diagram__container {
    position: relative;
  }

  .vsa-diagram__img {
    width: 100%;
    max-width: 100%;
    height: auto;
    display: block;
  }

  .vsa-diagram__expand {
    position: absolute;
    top: var(--vsa-space-sm);
    right: var(--vsa-space-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: var(--vsa-radius-sm);
    background: rgba(0, 0, 0, 0.5);
    color: #FAFAFA;
    cursor: pointer;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
    opacity: 0.8;
    transition: opacity 150ms ease-out;
  }

  .vsa-diagram__expand:hover {
    opacity: 1;
  }

  .vsa-diagram__caption {
    font-size: var(--vsa-font-size-xs);
    font-style: italic;
    color: var(--vsa-text-secondary);
    margin-top: var(--vsa-space-sm);
    text-align: center;
  }

  /* Fullscreen dialog */
  .vsa-diagram__fullscreen {
    position: fixed;
    inset: 0;
    margin: 0;
    max-width: 100vw;
    max-height: 100vh;
    width: 100vw;
    height: 100vh;
    border: none;
    background: var(--vsa-bg-primary);
    padding: 0;
    opacity: 1;
    transition: opacity 150ms ease-out;
  }

  .vsa-diagram__fullscreen::backdrop {
    background: rgba(0, 0, 0, 0.9);
  }

  .vsa-diagram__fullscreen-close {
    position: fixed;
    top: var(--vsa-space-md);
    right: var(--vsa-space-md);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: var(--vsa-radius-sm);
    background: rgba(0, 0, 0, 0.5);
    color: #FAFAFA;
    cursor: pointer;
    padding: 0;
    z-index: 10;
    -webkit-tap-highlight-color: transparent;
  }

  .vsa-diagram__fullscreen-content {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--vsa-space-lg);
  }

  .vsa-diagram__fullscreen-content img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
</style>
