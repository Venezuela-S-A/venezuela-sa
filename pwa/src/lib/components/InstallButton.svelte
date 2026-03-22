<script>
  import { browser } from '$app/environment';
  import { Download } from '@lucide/svelte';
  import { onMount } from 'svelte';

  let deferredPrompt = $state(null);
  let isInstalled = $state(false);

  onMount(() => {
    if (!browser) return;

    // Check if already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      isInstalled = true;
      return;
    }

    function handleBeforeInstall(e) {
      e.preventDefault();
      deferredPrompt = e;
    }

    function handleAppInstalled() {
      isInstalled = true;
      deferredPrompt = null;
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  });

  async function handleInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      deferredPrompt = null;
    }
  }
</script>

{#if deferredPrompt && !isInstalled}
  <button class="vsa-install-btn" onclick={handleInstall}>
    <Download size={16} />
    <span>Instalar app</span>
  </button>
{/if}

<style>
  .vsa-install-btn {
    display: flex;
    align-items: center;
    gap: var(--vsa-space-xs);
    padding: var(--vsa-space-xs) var(--vsa-space-sm);
    background-color: var(--vsa-accent);
    color: #FFFFFF;
    border: none;
    border-radius: var(--vsa-radius-sm);
    font-size: var(--vsa-font-size-xs);
    font-weight: 600;
    cursor: pointer;
    transition: background-color 120ms ease, transform 120ms ease;
    min-height: 32px;
  }

  .vsa-install-btn:hover {
    background-color: var(--vsa-accent-hover);
  }

  .vsa-install-btn:active {
    transform: scale(0.97);
  }
</style>
