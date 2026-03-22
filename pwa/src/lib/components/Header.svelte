<script>
  import ThemeToggle from './ThemeToggle.svelte';
  import InstallButton from './InstallButton.svelte';
</script>

<header class="vsa-header">
  <span class="vsa-header__title">Venezuela S.A.</span>
  <div class="vsa-header__actions">
    <InstallButton />
    <ThemeToggle />
  </div>
</header>

<style>
  .vsa-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    padding: 0 var(--vsa-space-md);
    background-color: var(--vsa-bg-secondary);
    border-bottom: 1px solid var(--vsa-border);
  }

  .vsa-header__title {
    font-size: var(--vsa-font-size-base);
    font-weight: 600;
    color: var(--vsa-text-primary);
  }

  .vsa-header__actions {
    display: flex;
    align-items: center;
    gap: var(--vsa-space-sm);
  }
</style>
