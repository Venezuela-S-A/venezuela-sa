<script>
  let { star = false, children } = $props();

  let wrapperEl = $state(null);
  let showFade = $state(false);

  $effect(() => {
    if (!wrapperEl) return;

    function checkScroll() {
      const { scrollWidth, clientWidth, scrollLeft } = wrapperEl;
      showFade = scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth - 1;
    }

    checkScroll();
    wrapperEl.addEventListener('scroll', checkScroll, { passive: true });

    // Re-check on resize
    const observer = new ResizeObserver(checkScroll);
    observer.observe(wrapperEl);

    return () => {
      wrapperEl.removeEventListener('scroll', checkScroll);
      observer.disconnect();
    };
  });
</script>

<div
  class={star ? 'vsa-star-table' : 'vsa-table-wrapper'}
  class:vsa-table-wrapper--fade={showFade && !star}
  class:vsa-star-table--fade={showFade && star}
  role="region"
  aria-label="Tabla con scroll horizontal"
  tabindex="0"
  bind:this={wrapperEl}
>
  {@render children()}
</div>

<style>
  .vsa-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    margin: var(--vsa-space-md) 0;
  }

  .vsa-table-wrapper:focus-visible {
    outline: 2px solid var(--vsa-accent);
    outline-offset: 2px;
  }

  /* Fade shadow indicator for scrollable content */
  .vsa-table-wrapper--fade::after,
  .vsa-star-table--fade::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 32px;
    background: linear-gradient(to right, transparent, var(--vsa-bg-primary));
    pointer-events: none;
  }

  /* Table children styles */
  .vsa-table-wrapper :global(table) {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--vsa-font-size-base);
  }

  .vsa-table-wrapper :global(th) {
    font-size: var(--vsa-font-size-xs);
    font-weight: 600;
    color: var(--vsa-text-secondary);
    text-align: left;
    padding: var(--vsa-space-sm) var(--vsa-space-md);
    white-space: nowrap;
  }

  .vsa-table-wrapper :global(td) {
    padding: var(--vsa-space-sm) var(--vsa-space-md);
    border-top: 1px solid var(--vsa-border);
  }

  /* Star table — elevated card treatment */
  .vsa-star-table {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    background: var(--vsa-bg-card);
    box-shadow: var(--vsa-shadow-elevated);
    border-radius: var(--vsa-radius-md);
    border-left: 3px solid var(--vsa-accent);
    padding: var(--vsa-space-md);
    margin: var(--vsa-space-md) 0;
  }

  .vsa-star-table:focus-visible {
    outline: 2px solid var(--vsa-accent);
    outline-offset: 2px;
  }

  .vsa-star-table :global(table) {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--vsa-font-size-base);
  }

  .vsa-star-table :global(th) {
    font-size: var(--vsa-font-size-xs);
    font-weight: 600;
    color: var(--vsa-text-secondary);
    text-align: left;
    padding: var(--vsa-space-sm) var(--vsa-space-md);
    white-space: nowrap;
  }

  .vsa-star-table :global(td) {
    padding: var(--vsa-space-sm) var(--vsa-space-md);
    border-top: 1px solid var(--vsa-border);
  }

  .vsa-star-table--fade::after {
    background: linear-gradient(to right, transparent, var(--vsa-bg-card));
  }
</style>
