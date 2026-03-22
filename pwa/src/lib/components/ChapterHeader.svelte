<script>
  import { Clock } from '@lucide/svelte';

  let { title = '', readingTime = 0 } = $props();
</script>

<header class="vsa-chapter-header">
  <h1 class="vsa-chapter-header__title">{title}</h1>
  <div class="vsa-chapter-header__meta">
    <Clock size={12} />
    <span>{readingTime} min de lectura</span>
  </div>
  <hr class="vsa-chapter-header__separator" />
</header>

<style>
  .vsa-chapter-header {
    margin-bottom: var(--vsa-space-lg);
  }

  .vsa-chapter-header__title {
    font-size: var(--vsa-font-size-2xl);
    font-weight: 600;
    line-height: 1.2;
    color: var(--vsa-text-primary);
    margin: 0 0 var(--vsa-space-sm);
  }

  .vsa-chapter-header__meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--vsa-space-xs);
    font-size: var(--vsa-font-size-xs);
    color: var(--vsa-text-secondary);
  }

  .vsa-chapter-header__separator {
    border: none;
    border-top: 1px solid var(--vsa-border);
    margin: var(--vsa-space-lg) 0 0;
  }
</style>
