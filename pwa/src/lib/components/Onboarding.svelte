<script>
  import { completeOnboarding } from '$lib/stores/onboarding.js';

  let currentSlide = $state(0);
  let slidesEl = $state(null);

  const slides = [
    {
      icon: '\u{1F1FB}\u{1F1EA}',
      title: '40 millones de accionistas',
      body: 'Un plan de reconstruccion donde cada venezolano es dueno'
    },
    {
      icon: '\u{1F4CA}',
      title: 'Explora, simula, opina',
      body: 'Dashboards interactivos, calculadora FCV, comenta cada parrafo'
    },
    {
      icon: '\u{1F4F6}',
      title: 'Funciona sin internet',
      body: 'Instala la app y accede al plan completo offline'
    }
  ];

  function handleScroll(e) {
    const target = e.target;
    if (target.clientWidth > 0) {
      currentSlide = Math.round(target.scrollLeft / target.clientWidth);
    }
  }
</script>

<div class="vsa-onboarding">
  <button class="vsa-onboarding__skip" onclick={completeOnboarding}>
    Saltar
  </button>

  <div class="vsa-onboarding__slides" bind:this={slidesEl} onscroll={handleScroll}>
    {#each slides as slide, i}
      <div class="vsa-onboarding__slide" role="tabpanel">
        <span class="vsa-onboarding__icon">{slide.icon}</span>
        <h2 class="vsa-onboarding__title">{slide.title}</h2>
        <p class="vsa-onboarding__body">{slide.body}</p>
      </div>
    {/each}
  </div>

  <div class="vsa-onboarding__dots">
    {#each slides as _, i}
      <span
        class="vsa-onboarding__dot"
        class:active={currentSlide === i}
      ></span>
    {/each}
  </div>

  {#if currentSlide === 2}
    <button class="vsa-onboarding__start" onclick={completeOnboarding}>
      Empezar
    </button>
  {/if}
</div>

<style>
  .vsa-onboarding {
    position: fixed;
    inset: 0;
    z-index: 200;
    display: flex;
    flex-direction: column;
    background-color: var(--vsa-bg-primary);
  }

  .vsa-onboarding__skip {
    position: absolute;
    top: var(--vsa-space-md);
    right: var(--vsa-space-md);
    z-index: 201;
    background: none;
    border: none;
    font-size: var(--vsa-font-size-xs);
    color: var(--vsa-text-secondary);
    cursor: pointer;
    padding: var(--vsa-space-sm);
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .vsa-onboarding__slides {
    flex: 1;
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .vsa-onboarding__slides::-webkit-scrollbar {
    display: none;
  }

  .vsa-onboarding__slide {
    flex: 0 0 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--vsa-space-lg);
    scroll-snap-align: center;
  }

  .vsa-onboarding__icon {
    font-size: 48px;
    line-height: 1;
    margin-top: var(--vsa-space-2xl);
  }

  .vsa-onboarding__title {
    font-size: var(--vsa-font-size-lg);
    font-weight: 600;
    color: var(--vsa-text-primary);
    margin: var(--vsa-space-lg) 0 0 0;
  }

  .vsa-onboarding__body {
    font-size: var(--vsa-font-size-base);
    font-weight: 400;
    color: var(--vsa-text-secondary);
    margin: var(--vsa-space-sm) 0 0 0;
    max-width: 300px;
  }

  .vsa-onboarding__dots {
    display: flex;
    justify-content: center;
    gap: var(--vsa-space-sm);
    padding: var(--vsa-space-lg) 0;
  }

  .vsa-onboarding__dot {
    width: 8px;
    height: 8px;
    border-radius: var(--vsa-radius-full);
    background-color: var(--vsa-text-secondary);
    opacity: 0.3;
    transition: opacity 200ms ease, background-color 200ms ease;
  }

  .vsa-onboarding__dot.active {
    background-color: var(--vsa-accent);
    opacity: 1;
  }

  .vsa-onboarding__start {
    display: block;
    width: calc(100% - var(--vsa-space-md) * 2);
    margin: 0 var(--vsa-space-md) var(--vsa-space-lg);
    padding: var(--vsa-space-md);
    background-color: var(--vsa-accent);
    color: #FFFFFF;
    font-weight: 600;
    font-size: var(--vsa-font-size-base);
    border: none;
    border-radius: var(--vsa-radius-full);
    cursor: pointer;
    transition: background-color 120ms ease, transform 100ms ease-in-out;
  }

  .vsa-onboarding__start:hover {
    background-color: var(--vsa-accent-hover);
  }

  .vsa-onboarding__start:active {
    transform: scale(0.97);
  }
</style>
