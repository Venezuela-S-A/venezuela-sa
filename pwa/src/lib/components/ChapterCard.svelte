<script>
  import {
    BookOpen, Building2, Banknote, Users, Shield,
    Rocket, Zap, CalendarCheck, Flag, Lightbulb, Clock
  } from '@lucide/svelte';

  const iconMap = {
    BookOpen, Building2, Banknote, Users, Shield,
    Rocket, Zap, CalendarCheck, Flag, Lightbulb,
  };

  let {
    slug = '',
    title = '',
    icon = 'BookOpen',
    description = '',
    hookStat = '',
    readingTime = 0,
    progress = 0,
    isStartHere = false,
    isSeparateSection = false,
  } = $props();

  const IconComponent = $derived(iconMap[icon] || BookOpen);
</script>

<a
  href="/plan/{slug}"
  class="vsa-chapter-card"
  class:vsa-chapter-card--in-progress={progress > 0 && progress < 100}
  class:vsa-chapter-card--separate={isSeparateSection}
>
  <div class="vsa-chapter-card__header">
    <IconComponent size={24} class="vsa-chapter-card__icon" />
    <span class="vsa-chapter-card__title">{title}</span>
    <span
      class="vsa-chapter-card__badge"
      class:vsa-chapter-card__badge--start={isStartHere}
      class:vsa-chapter-card__badge--progress={progress > 0 && !isStartHere}
    >
      {#if isStartHere}
        Empieza aqui
      {:else if progress > 0}
        {progress}% leido
      {:else}
        Nuevo
      {/if}
    </span>
  </div>
  <p class="vsa-chapter-card__description">{description}</p>
  <div class="vsa-chapter-card__footer">
    <span class="vsa-chapter-card__stat">{hookStat}</span>
    <span class="vsa-chapter-card__time">
      <Clock size={12} />
      {readingTime} min
    </span>
  </div>
</a>

<style>
  .vsa-chapter-card {
    display: block;
    background: var(--vsa-bg-card);
    border-radius: var(--vsa-radius-md);
    box-shadow: var(--vsa-shadow-card);
    padding: var(--vsa-space-md);
    text-decoration: none;
    color: inherit;
    transition: transform 100ms ease-in-out;
    -webkit-tap-highlight-color: transparent;
  }

  .vsa-chapter-card:active {
    transform: scale(0.98);
  }

  .vsa-chapter-card__header {
    display: flex;
    align-items: center;
    gap: var(--vsa-space-sm);
    margin-bottom: var(--vsa-space-sm);
  }

  .vsa-chapter-card__header :global(svg) {
    color: var(--vsa-accent);
    flex-shrink: 0;
  }

  .vsa-chapter-card__title {
    font-size: 20px;
    font-weight: 600;
    color: var(--vsa-text-primary);
    flex: 1;
    min-width: 0;
  }

  .vsa-chapter-card__badge {
    flex-shrink: 0;
    font-size: var(--vsa-font-size-xs);
    padding: 2px 8px;
    border-radius: var(--vsa-radius-full);
    background: var(--vsa-accent-subtle);
    color: var(--vsa-text-secondary);
  }

  .vsa-chapter-card__badge--start {
    background: var(--vsa-accent);
    color: #fff;
  }

  .vsa-chapter-card__badge--progress {
    background: var(--vsa-accent-subtle);
    color: var(--vsa-accent);
  }

  .vsa-chapter-card__description {
    font-size: var(--vsa-font-size-base);
    color: var(--vsa-text-secondary);
    margin: 0 0 var(--vsa-space-sm);
    line-height: 1.4;
  }

  .vsa-chapter-card__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .vsa-chapter-card__stat {
    font-size: 28px;
    font-weight: 600;
    color: var(--vsa-accent);
  }

  .vsa-chapter-card__time {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: var(--vsa-font-size-xs);
    color: var(--vsa-text-secondary);
  }
</style>
