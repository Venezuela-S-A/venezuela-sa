<script>
  import { ModeWatcher } from 'mode-watcher';
  import Header from '$lib/components/Header.svelte';
  import TabBar from '$lib/components/TabBar.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<ModeWatcher defaultMode="dark" lightClassNames={['light']} darkClassNames={[]} />

<div class="vsa-app">
  <Header />
  <main class="vsa-main">
    {@render children()}
  </main>
  <TabBar />
</div>
