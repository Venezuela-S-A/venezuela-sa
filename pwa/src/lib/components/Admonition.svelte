<script>
  import { AlertTriangle, Info, Lightbulb } from '@lucide/svelte';

  let { type = 'info', title = '', children } = $props();

  const iconMap = {
    danger: AlertTriangle,
    caution: AlertTriangle,
    warning: AlertTriangle,
    info: Info,
    tip: Lightbulb,
  };

  const Icon = $derived(iconMap[type] || Info);
</script>

<div class="vsa-admonition vsa-admonition--{type}" role="note" aria-label="{type}: {title}">
  <div class="vsa-admonition__header">
    <Icon size={16} />
    <span class="vsa-admonition__title">{title}</span>
  </div>
  <div class="vsa-admonition__body">
    {@render children()}
  </div>
</div>

<style>
  .vsa-admonition {
    border-left: 3px solid var(--vsa-border);
    border-radius: var(--vsa-radius-sm);
    padding: var(--vsa-space-md);
    margin: var(--vsa-space-md) 0;
  }

  .vsa-admonition__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--vsa-space-xs);
    margin-bottom: var(--vsa-space-sm);
  }

  .vsa-admonition__title {
    font-size: var(--vsa-font-size-base);
    font-weight: 600;
  }

  .vsa-admonition__body {
    font-size: var(--vsa-font-size-base);
    font-weight: 400;
  }

  /* Type-specific border and background */
  .vsa-admonition--danger {
    border-left-color: var(--vsa-destructive);
    background: var(--vsa-danger-bg);
    color: var(--vsa-text-primary);
  }

  .vsa-admonition--caution {
    border-left-color: var(--vsa-warning);
    background: var(--vsa-warning-bg);
    color: var(--vsa-text-primary);
  }

  .vsa-admonition--warning {
    border-left-color: var(--vsa-warning);
    background: var(--vsa-warning-bg);
    color: var(--vsa-text-primary);
  }

  .vsa-admonition--info {
    border-left-color: var(--vsa-info);
    background: var(--vsa-info-bg);
    color: var(--vsa-text-primary);
  }

  .vsa-admonition--tip {
    border-left-color: var(--vsa-accent);
    background: var(--vsa-accent-subtle);
    color: var(--vsa-text-primary);
  }

  /* Icon color inherits from border */
  .vsa-admonition--danger .vsa-admonition__header,
  .vsa-admonition--caution .vsa-admonition__header { color: var(--vsa-destructive); }
  .vsa-admonition--danger .vsa-admonition__header { color: var(--vsa-destructive); }
  .vsa-admonition--caution .vsa-admonition__header,
  .vsa-admonition--warning .vsa-admonition__header { color: var(--vsa-warning); }
  .vsa-admonition--info .vsa-admonition__header { color: var(--vsa-info); }
  .vsa-admonition--tip .vsa-admonition__header { color: var(--vsa-accent); }
</style>
