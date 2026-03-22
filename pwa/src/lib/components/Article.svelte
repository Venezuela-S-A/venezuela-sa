<script>
  import '$lib/styles/article.css';

  let { docs = [], chapterSlug = '' } = $props();
</script>

<article class="vsa-article">
  {#each docs as doc, i}
    <section class="vsa-article__section" id="doc-{i}">
      <svelte:component this={doc.component} />
    </section>
  {/each}
</article>
