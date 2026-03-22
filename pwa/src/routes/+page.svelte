<div class="vsa-home">
  <section class="vsa-home__hero">
    <span class="vsa-home__flag" style="font-size: 64px">&#x1F1FB;&#x1F1EA;</span>
    <h1 class="vsa-home__tagline">40M accionistas. Un plan. Tu pais.</h1>
  </section>

  <div class="vsa-home__stats">
    <div class="vsa-home__stat">
      <span class="vsa-home__stat-value">303B</span>
      <span class="vsa-home__stat-label">barriles en reservas</span>
      <span class="vsa-home__stat-source">OPEP ASB 2025</span>
    </div>
    <div class="vsa-home__stat">
      <span class="vsa-home__stat-value">USD 60</span>
      <span class="vsa-home__stat-label">precio base por barril</span>
      <span class="vsa-home__stat-source">EIA STEO 2026</span>
    </div>
    <div class="vsa-home__stat">
      <span class="vsa-home__stat-value">3M bpd</span>
      <span class="vsa-home__stat-label">meta en 15 anos</span>
      <span class="vsa-home__stat-source">Rystad Energy 2026</span>
    </div>
  </div>

  <a href="/plan" class="vsa-home__cta">Explorar el plan</a>
</div>

<style>
  .vsa-home {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100vh - 48px - 56px);
    padding: var(--vsa-space-lg) 0;
  }

  .vsa-home__hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--vsa-space-xl) var(--vsa-space-lg) 0;
  }

  .vsa-home__flag {
    display: block;
    line-height: 1;
  }

  .vsa-home__tagline {
    font-size: var(--vsa-font-size-2xl);
    font-weight: 600;
    color: var(--vsa-text-primary);
    text-align: center;
    padding: 0 var(--vsa-space-lg);
    margin: var(--vsa-space-md) 0 0 0;
    line-height: 1.2;
  }

  .vsa-home__stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--vsa-space-sm);
    background-color: var(--vsa-bg-card);
    border: 1px solid var(--vsa-border);
    border-radius: var(--vsa-radius-md);
    box-shadow: var(--vsa-shadow-card);
    margin: var(--vsa-space-xl) var(--vsa-space-md) 0;
    padding: var(--vsa-space-lg);
    width: calc(100% - var(--vsa-space-md) * 2);
    max-width: 480px;
    box-sizing: border-box;
  }

  .vsa-home__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--vsa-space-xs);
  }

  .vsa-home__stat-value {
    font-size: var(--vsa-font-size-2xl);
    font-weight: 600;
    color: var(--vsa-text-primary);
    line-height: 1.2;
  }

  .vsa-home__stat-label {
    font-size: var(--vsa-font-size-xs);
    font-weight: 400;
    color: var(--vsa-text-secondary);
    line-height: 1.4;
  }

  .vsa-home__stat-source {
    font-size: var(--vsa-font-size-xs);
    font-weight: 400;
    color: var(--vsa-text-secondary);
    opacity: 0.7;
    line-height: 1.4;
  }

  .vsa-home__cta {
    display: block;
    width: calc(100% - var(--vsa-space-md) * 2);
    max-width: 480px;
    margin: var(--vsa-space-lg) var(--vsa-space-md) 0;
    padding: var(--vsa-space-md);
    background-color: var(--vsa-accent);
    color: #FFFFFF;
    font-weight: 600;
    font-size: var(--vsa-font-size-base);
    border-radius: var(--vsa-radius-full);
    text-align: center;
    text-decoration: none;
    transition: background-color 120ms ease, transform 100ms ease-in-out;
    box-sizing: border-box;
  }

  .vsa-home__cta:hover {
    background-color: var(--vsa-accent-hover);
  }

  .vsa-home__cta:active {
    transform: scale(0.97);
  }
</style>
