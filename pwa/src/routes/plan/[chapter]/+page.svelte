<script>
  import { browser } from '$app/environment';
  import Article from '$lib/components/Article.svelte';
  import ReadingProgress from '$lib/components/ReadingProgress.svelte';
  import ChapterHeader from '$lib/components/ChapterHeader.svelte';
  import ChapterNav from '$lib/components/ChapterNav.svelte';
  import ChapterSources from '$lib/components/ChapterSources.svelte';
  import { updateChapterProgress, readingProgress } from '$lib/stores/reading-progress.js';

  let { data } = $props();
  let scrollPercent = $state(0);
  let ticking = $state(false);

  // Scroll tracking per D-03
  function trackScroll() {
    if (!browser) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    scrollPercent = Math.round((window.scrollY / docHeight) * 100);
    updateChapterProgress(data.chapter.slug, scrollPercent / 100, window.scrollY);
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        trackScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Deep link scroll per UI-SPEC: scroll to hash with 80px offset
  $effect(() => {
    if (!browser) return;

    window.addEventListener('scroll', onScroll, { passive: true });

    // Handle hash-based deep linking
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          const y = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'instant' });
          target.focus();
        }, 100);
      }
    }

    // Resume reading position per D-05
    const progress = $readingProgress[data.chapter.slug];
    if (progress && !window.location.hash) {
      window.scrollTo({ top: progress.lastScrollY, behavior: 'instant' });
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });
</script>

<ReadingProgress percent={scrollPercent} />

<div class="vsa-chapter-reader" style="overscroll-behavior-y: contain;">
  <ChapterHeader title={data.chapter.title} readingTime={data.readingTime} />

  <Article docs={data.docs} chapterSlug={data.chapter.slug} />

  <!-- Collapsible chapter sources at bottom per D-13 -->
  {#if data.docs.some(d => d.metadata.sources?.length)}
    <ChapterSources sources={data.docs.flatMap(d => d.metadata.sources || [])} />
  {/if}

  <ChapterNav
    prevChapter={data.prevChapter}
    nextChapter={data.nextChapter}
  />
</div>

<style>
  .vsa-chapter-reader {
    padding: var(--vsa-space-md);
    padding-bottom: calc(var(--vsa-space-3xl) + 64px);
    max-width: 100%;
  }
</style>
