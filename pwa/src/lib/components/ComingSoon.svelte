<script>
  let { icon: Icon, title, description, phase } = $props();
</script>

<div class="vsa-coming-soon">
  <div class="vsa-coming-soon__icon-wrap">
    <Icon size={48} />
  </div>
  <h2 class="vsa-coming-soon__title">{title}</h2>
  <p class="vsa-coming-soon__desc">{description}</p>
  <span class="vsa-coming-soon__badge">Proximamente - Fase {phase}</span>
</div>

<style>
  .vsa-coming-soon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 48px - 56px);
    padding: var(--vsa-space-md);
    text-align: center;
  }

  .vsa-coming-soon__icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: var(--vsa-accent-subtle);
    color: var(--vsa-accent);
  }

  .vsa-coming-soon__title {
    font-size: var(--vsa-font-size-lg);
    font-weight: 600;
    color: var(--vsa-text-primary);
    margin: var(--vsa-space-md) 0 0 0;
  }

  .vsa-coming-soon__desc {
    font-size: var(--vsa-font-size-base);
    font-weight: 400;
    color: var(--vsa-text-secondary);
    margin: var(--vsa-space-sm) 0 0 0;
    max-width: 280px;
    text-align: center;
  }

  .vsa-coming-soon__badge {
    display: inline-block;
    font-size: var(--vsa-font-size-xs);
    background-color: var(--vsa-accent-subtle);
    color: var(--vsa-accent);
    border-radius: var(--vsa-radius-sm);
    padding: var(--vsa-space-xs) var(--vsa-space-sm);
    margin-top: var(--vsa-space-md);
  }
</style>
