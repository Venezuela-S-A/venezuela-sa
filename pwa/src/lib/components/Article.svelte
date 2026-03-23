<script>
  import '$lib/styles/article.css';
  import { browser } from '$app/environment';
  import SourceSheet from './SourceSheet.svelte';

  let { docs = [], chapterSlug = '' } = $props();

  let sheetSources = $state([]);
  let sheetOpen = $state(false);
  let articleEl = $state(null);

  function handleArticleClick(e) {
    const badge = e.target.closest('.vsa-source-badge');
    if (!badge) return;

    const raw = badge.getAttribute('data-sources');
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        sheetSources = parsed;
        sheetOpen = true;
      }
    } catch (err) {
      // Malformed data-sources — silently ignore, ChapterSources fallback exists
    }
  }

  function handleArticleKeydown(e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const badge = e.target.closest('.vsa-source-badge');
    if (!badge) return;
    e.preventDefault();
    handleArticleClick({ target: badge });
  }

  function closeSheet() {
    sheetOpen = false;
    sheetSources = [];
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<article
  class="vsa-article"
  bind:this={articleEl}
  onclick={handleArticleClick}
  onkeydown={handleArticleKeydown}
>
  {#each docs as doc, i}
    <section class="vsa-article__section" id="doc-{i}">
      <svelte:component this={doc.component} />
    </section>
  {/each}
</article>

<SourceSheet sources={sheetSources} open={sheetOpen} onclose={closeSheet} />
