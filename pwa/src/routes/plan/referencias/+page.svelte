<script>
  import Article from '$lib/components/Article.svelte';

  let { data } = $props();
</script>

<div class="vsa-chapter-reader">
  <h1 class="vsa-standalone-title">{data.title}</h1>
  <Article docs={[{ component: data.component, metadata: data.metadata }]} chapterSlug="referencias" />
</div>

<style>
  .vsa-chapter-reader {
    padding: var(--vsa-space-md);
    padding-bottom: calc(var(--vsa-space-3xl) + 64px);
  }

  .vsa-standalone-title {
    font-size: var(--vsa-font-size-2xl);
    font-weight: 600;
    color: var(--vsa-text-primary);
    padding: var(--vsa-space-3xl) 0 var(--vsa-space-lg);
    margin: 0;
  }
</style>
