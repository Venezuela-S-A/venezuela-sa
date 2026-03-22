<script>
  import { ModeWatcher } from 'mode-watcher';
  import { pwaInfo } from 'virtual:pwa-info';
  import { onMount } from 'svelte';
  import Header from '$lib/components/Header.svelte';
  import TabBar from '$lib/components/TabBar.svelte';
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

<div class="vsa-app">
  <Header />
  <main class="vsa-main">
    {@render children()}
  </main>
  <TabBar />
</div>
