<script>
  import { ChevronLeft, ChevronRight } from '@lucide/svelte';

  let { prevChapter = null, nextChapter = null } = $props();
</script>

<nav class="vsa-chapter-nav" aria-label="Capitulos">
  {#if prevChapter}
    <a href="/plan/{prevChapter.slug}" class="vsa-chapter-nav__prev">
      <ChevronLeft size={20} />
      <div class="vsa-chapter-nav__text">
        <span class="vsa-chapter-nav__label">Anterior</span>
        <span class="vsa-chapter-nav__title">{prevChapter.title}</span>
      </div>
    </a>
  {:else}
    <div></div>
  {/if}
  {#if nextChapter}
    <a href="/plan/{nextChapter.slug}" class="vsa-chapter-nav__next">
      <div class="vsa-chapter-nav__text">
        <span class="vsa-chapter-nav__label">Siguiente</span>
        <span class="vsa-chapter-nav__title">{nextChapter.title}</span>
      </div>
      <ChevronRight size={20} />
    </a>
  {:else}
    <div></div>
  {/if}
</nav>

<style>
  .vsa-chapter-nav {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    background: var(--vsa-bg-secondary);
    border-top: 1px solid var(--vsa-border);
    padding: var(--vsa-space-md);
    min-height: 56px;
    margin-top: var(--vsa-space-2xl);
    border-radius: var(--vsa-radius-md);
  }

  .vsa-chapter-nav__prev,
  .vsa-chapter-nav__next {
    display: flex;
    align-items: center;
    gap: var(--vsa-space-sm);
    text-decoration: none;
    color: var(--vsa-text-primary);
    min-width: 0;
    max-width: 50%;
    padding: var(--vsa-space-xs) var(--vsa-space-sm);
    border-radius: var(--vsa-radius-sm);
    transition: background-color 120ms ease;
    -webkit-tap-highlight-color: transparent;
  }

  .vsa-chapter-nav__prev:hover,
  .vsa-chapter-nav__next:hover {
    background: var(--vsa-bg-card);
  }

  .vsa-chapter-nav__prev:active,
  .vsa-chapter-nav__next:active {
    background: var(--vsa-bg-card);
  }

  .vsa-chapter-nav__next {
    margin-left: auto;
    text-align: right;
  }

  .vsa-chapter-nav__text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .vsa-chapter-nav__label {
    font-size: var(--vsa-font-size-xs);
    color: var(--vsa-text-secondary);
  }

  .vsa-chapter-nav__title {
    font-size: var(--vsa-font-size-base);
    color: var(--vsa-text-primary);
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
