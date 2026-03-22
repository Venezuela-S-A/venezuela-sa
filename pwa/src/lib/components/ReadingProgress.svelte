<script>
  let { percent = 0 } = $props();
</script>

<div
  class="vsa-reading-progress"
  role="progressbar"
  aria-valuenow={percent}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Progreso de lectura"
>
  <div class="vsa-reading-progress__fill" style="width: {percent}%"></div>
</div>

<style>
  .vsa-reading-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 3px;
    background: var(--vsa-bg-secondary);
    pointer-events: none;
  }

  .vsa-reading-progress__fill {
    height: 3px;
    background: var(--vsa-accent);
    transition: width 100ms linear;
    will-change: width;
  }
</style>
