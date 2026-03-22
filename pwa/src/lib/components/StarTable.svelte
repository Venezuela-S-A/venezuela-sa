<script>
  import TableWrapper from './TableWrapper.svelte';
  let { children } = $props();
</script>

<TableWrapper star={true}>
  {@render children()}
</TableWrapper>
