<script>
  import { page } from '$app/state';
  import { House, Wallet, BookOpen, BarChart3 } from '@lucide/svelte';

  const tabs = [
    { href: '/', label: 'Inicio', icon: House },
    { href: '/fcv', label: 'Mi FCV', icon: Wallet },
    { href: '/plan', label: 'El Plan', icon: BookOpen },
    { href: '/dashboards', label: 'Dashboards', icon: BarChart3 },
  ];

  function isActive(href) {
    const pathname = page.url.pathname;
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
<nav class="vsa-tabbar" role="tablist" aria-label="Navegacion principal">
  {#each tabs as tab}
    {@const active = isActive(tab.href)}
    <a
      class="vsa-tabbar__tab"
      class:vsa-tabbar__tab--active={active}
      href={tab.href}
      role="tab"
      aria-selected={active}
      aria-current={active ? 'page' : undefined}
    >
      <span class="vsa-tabbar__icon">
        <tab.icon size={24} fill={active ? 'currentColor' : 'none'} stroke={active ? 'none' : 'currentColor'} />
      </span>
      <span class="vsa-tabbar__label">{tab.label}</span>
    </a>
  {/each}
</nav>

<style>
  .vsa-tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 56px;
    background-color: var(--vsa-bg-secondary);
    border-top: 1px solid var(--vsa-border);
    padding-bottom: env(safe-area-inset-bottom, 0);
  }

  .vsa-tabbar__tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    min-width: 44px;
    min-height: 44px;
    gap: var(--vsa-space-sm);
    color: var(--vsa-text-secondary);
    text-decoration: none;
    transition: opacity 150ms ease-out, transform 150ms ease-out;
    -webkit-tap-highlight-color: transparent;
  }

  .vsa-tabbar__tab--active {
    color: var(--vsa-accent);
  }

  .vsa-tabbar__tab:active {
    transform: scale(0.97);
  }

  .vsa-tabbar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }

  .vsa-tabbar__label {
    font-size: var(--vsa-font-size-xs);
    font-weight: 400;
    line-height: 1;
  }
</style>
