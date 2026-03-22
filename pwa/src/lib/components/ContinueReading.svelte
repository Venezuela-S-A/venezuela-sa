<script>
  let {
    chapterSlug = '',
    chapterTitle = '',
    progress = 0,
  } = $props();
</script>

<a href="/plan/{chapterSlug}" class="vsa-continue-reading">
  <span class="vsa-continue-reading__label">Continuar leyendo</span>
  <span class="vsa-continue-reading__detail">{chapterTitle} - {progress}% leido</span>
</a>

<style>
  .vsa-continue-reading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 48px;
    padding: var(--vsa-space-sm) var(--vsa-space-md);
    background: var(--vsa-accent);
    color: #fff;
    border-radius: var(--vsa-radius-full);
    text-decoration: none;
    text-align: center;
    -webkit-tap-highlight-color: transparent;
    transition: opacity 120ms ease;
  }

  .vsa-continue-reading:active {
    opacity: 0.9;
  }

  .vsa-continue-reading__label {
    font-size: var(--vsa-font-size-base);
    font-weight: 600;
  }

  .vsa-continue-reading__detail {
    font-size: var(--vsa-font-size-xs);
    opacity: 0.85;
  }
</style>
