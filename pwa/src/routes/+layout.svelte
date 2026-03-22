<script>
  import { ModeWatcher } from 'mode-watcher';
  import { pwaInfo } from 'virtual:pwa-info';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import Header from '$lib/components/Header.svelte';
  import TabBar from '$lib/components/TabBar.svelte';
  import PullToRefresh from '$lib/components/PullToRefresh.svelte';
  import Onboarding from '$lib/components/Onboarding.svelte';
  import { hasCompletedOnboarding } from '$lib/stores/onboarding.js';
  import '../app.css';

  let { children } = $props();

  let webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');

  onMount(async () => {
    if (pwaInfo) {
      const { registerSW } = await import('virtual:pwa-register');
      registerSW({ immediate: true });
    }
  });
</script>

<svelte:head>
  {@html webManifestLink}
</svelte:head>

<ModeWatcher defaultMode="dark" lightClassNames={['light']} darkClassNames={[]} />

{#if browser && !$hasCompletedOnboarding}
  <Onboarding />
{:else}
  <div class="vsa-app">
    <PullToRefresh />
    <Header />
    <main class="vsa-main">
      {@render children()}
    </main>
    <TabBar />
  </div>
{/if}
