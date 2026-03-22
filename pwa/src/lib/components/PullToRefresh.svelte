<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  let pulling = $state(false);
  let pullDistance = $state(0);
  let refreshing = $state(false);
  let startY = 0;
  const threshold = 80;

  function handleTouchStart(e) {
    if (window.scrollY === 0) {
      startY = e.touches[0].clientY;
      pulling = true;
    }
  }

  function handleTouchMove(e) {
    if (!pulling) return;
    const delta = e.touches[0].clientY - startY;
    if (delta > 0) {
      pullDistance = Math.min(delta * 0.5, threshold * 1.5);
    }
  }

  async function handleTouchEnd() {
    if (pullDistance >= threshold) {
      refreshing = true;
      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg) await reg.update();
      }
      await new Promise(r => setTimeout(r, 1000));
      refreshing = false;
    }
    pulling = false;
    pullDistance = 0;
  }

  onMount(() => {
    if (!browser) return;

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  });
</script>

{#if browser && (pullDistance > 0 || refreshing)}
  <div
    class="vsa-pull-refresh"
    style="transform: translateY({pullDistance - 40}px); opacity: {refreshing ? 1 : Math.min(pullDistance / threshold, 1)}"
  >
    <span class="vsa-pull-refresh__spinner" class:vsa-pull-refresh__spinner--active={refreshing}></span>
  </div>
{/if}

<style>
  .vsa-pull-refresh {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    pointer-events: none;
    transition: transform 200ms ease-out, opacity 200ms ease-out;
  }

  .vsa-pull-refresh__spinner {
    display: block;
    width: 24px;
    height: 24px;
    border: 2px solid var(--vsa-accent);
    border-top-color: transparent;
    border-radius: 50%;
  }

  .vsa-pull-refresh__spinner--active {
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
