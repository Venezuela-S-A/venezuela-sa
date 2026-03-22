<script>
  import SearchBar from '$lib/components/SearchBar.svelte';
  import ChapterCard from '$lib/components/ChapterCard.svelte';
  import ContinueReading from '$lib/components/ContinueReading.svelte';
  import { chapters } from '$lib/content/chapters.js';
  import { readingProgress, lastReadChapter } from '$lib/stores/reading-progress.js';

  const mainChapters = chapters.filter(c => c.visible && !c.isSeparateSection);
  const separateChapters = chapters.filter(c => c.visible && c.isSeparateSection);

  // Fallback reading time per chapter (used until computed from doc metadata)
  const chapterReadingTimes = {};
  for (const ch of chapters) {
    chapterReadingTimes[ch.slug] = ch.docs.length * 5;
  }

  const totalReadingTime = $derived(
    mainChapters.reduce((sum, ch) => sum + (chapterReadingTimes[ch.slug] || 15), 0)
  );

  const hasAnyProgress = $derived(Object.keys($readingProgress).length > 0);

  const globalPercent = $derived(() => {
    const slugs = mainChapters.map(c => c.slug);
    const percents = slugs.map(s => $readingProgress[s]?.scrollPercent || 0);
    if (percents.length === 0) return 0;
    return Math.round(percents.reduce((a, b) => a + b, 0) / percents.length);
  });

  function chapterTitleFor(slug) {
    const ch = chapters.find(c => c.slug === slug);
    return ch?.title || slug;
  }
</script>

<div class="vsa-plan-landing">
  <SearchBar />

  <header class="vsa-plan-landing__hero">
    <h1>El plan completo</h1>
    <p class="vsa-plan-landing__subtitle">{mainChapters.length} capitulos, ~{totalReadingTime} min de lectura</p>
    {#if hasAnyProgress}
      <div class="vsa-plan-landing__global-progress">
        <div class="vsa-plan-landing__global-bar" style="width: {globalPercent()}%"></div>
        <span class="vsa-plan-landing__global-text">{globalPercent()}% leido</span>
      </div>
    {/if}
  </header>

  <div class="vsa-plan-landing__cta">
    {#if $lastReadChapter}
      <ContinueReading
        chapterSlug={$lastReadChapter[0]}
        chapterTitle={chapterTitleFor($lastReadChapter[0])}
        progress={$lastReadChapter[1].scrollPercent}
      />
    {:else}
      <a href="/plan/introduccion" class="vsa-continue-reading">
        <span class="vsa-continue-reading__label">Empezar a leer</span>
      </a>
    {/if}
  </div>

  <div class="vsa-plan-landing__chapters">
    {#each mainChapters as chapter}
      <ChapterCard
        slug={chapter.slug}
        title={chapter.title}
        icon={chapter.icon}
        description={chapter.description}
        hookStat={chapter.hookStat}
        readingTime={chapterReadingTimes[chapter.slug] || 15}
        progress={$readingProgress[chapter.slug]?.scrollPercent || 0}
        isStartHere={chapter.slug === 'fundamentos' && !hasAnyProgress}
      />
    {/each}
  </div>

  <!-- Oportunidades section per D-26 -->
  <div class="vsa-plan-landing__opportunities">
    <h2>Oportunidades de Inversion</h2>
    {#each separateChapters as chapter}
      <ChapterCard
        slug={chapter.slug}
        title={chapter.title}
        icon={chapter.icon}
        description={chapter.description}
        hookStat={chapter.hookStat}
        readingTime={chapterReadingTimes[chapter.slug] || 30}
        progress={$readingProgress[chapter.slug]?.scrollPercent || 0}
        isSeparateSection={true}
      />
    {/each}
  </div>

  <!-- Secondary links per D-27 -->
  <div class="vsa-plan-landing__secondary">
    <a href="/plan/glosario">Glosario</a>
    <a href="/plan/referencias">Referencias</a>
  </div>
</div>

<style>
  .vsa-plan-landing {
    padding: var(--vsa-space-md);
    padding-bottom: calc(var(--vsa-space-3xl) + 64px);
  }

  .vsa-plan-landing__hero {
    text-align: center;
    margin-bottom: var(--vsa-space-lg);
  }

  .vsa-plan-landing__hero h1 {
    font-size: 28px;
    font-weight: 600;
    color: var(--vsa-text-primary);
    margin: 0 0 var(--vsa-space-xs);
  }

  .vsa-plan-landing__subtitle {
    font-size: var(--vsa-font-size-xs);
    color: var(--vsa-text-secondary);
    margin: 0;
  }

  .vsa-plan-landing__global-progress {
    position: relative;
    height: 3px;
    background: var(--vsa-bg-secondary);
    border-radius: var(--vsa-radius-full);
    margin-top: var(--vsa-space-sm);
    overflow: hidden;
  }

  .vsa-plan-landing__global-bar {
    height: 100%;
    background: var(--vsa-accent);
    border-radius: var(--vsa-radius-full);
    transition: width 300ms ease;
  }

  .vsa-plan-landing__global-text {
    display: block;
    font-size: var(--vsa-font-size-xs);
    color: var(--vsa-text-secondary);
    text-align: center;
    margin-top: var(--vsa-space-xs);
  }

  .vsa-plan-landing__cta {
    margin-bottom: var(--vsa-space-lg);
  }

  /* Reuse ContinueReading styles for the Empezar a leer CTA */
  .vsa-plan-landing__cta :global(.vsa-continue-reading) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 48px;
    padding: var(--vsa-space-sm) var(--vsa-space-md);
    background: var(--vsa-accent);
    color: #fff;
    border-radius: var(--vsa-radius-full);
    text-decoration: none;
    text-align: center;
  }

  .vsa-plan-landing__cta :global(.vsa-continue-reading__label) {
    font-size: var(--vsa-font-size-base);
    font-weight: 600;
  }

  .vsa-plan-landing__chapters {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--vsa-space-md);
    margin-bottom: var(--vsa-space-2xl);
  }

  @media (min-width: 480px) {
    .vsa-plan-landing__chapters {
      grid-template-columns: 1fr 1fr;
    }
  }

  .vsa-plan-landing__opportunities {
    margin-bottom: var(--vsa-space-2xl);
  }

  .vsa-plan-landing__opportunities h2 {
    font-size: 20px;
    font-weight: 600;
    color: var(--vsa-text-primary);
    margin: 0 0 var(--vsa-space-md);
  }

  .vsa-plan-landing__secondary {
    display: flex;
    justify-content: center;
    gap: var(--vsa-space-lg);
    padding: var(--vsa-space-lg) 0;
  }

  .vsa-plan-landing__secondary a {
    font-size: var(--vsa-font-size-base);
    color: var(--vsa-text-secondary);
    text-decoration: none;
  }

  .vsa-plan-landing__secondary a:hover {
    color: var(--vsa-accent);
  }
</style>
