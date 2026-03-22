<script>
  import { toggleMode, mode } from 'mode-watcher';
  import { Sun, Moon } from '@lucide/svelte';

  let currentMode = $derived(mode.current);
</script>

<button
  class="vsa-theme-toggle"
  onclick={toggleMode}
  aria-label="Cambiar tema"
  type="button"
>
  {#if currentMode === 'light'}
    <Moon size={20} />
  {:else}
    <Sun size={20} />
  {/if}
</button>

<style>
  .vsa-theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: var(--vsa-radius-full);
    color: var(--vsa-text-primary);
    transition: opacity 200ms ease;
  }

  .vsa-theme-toggle:hover {
    opacity: 0.8;
  }

  .vsa-theme-toggle:active {
    transform: scale(0.97);
  }
</style>
