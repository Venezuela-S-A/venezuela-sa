export async function load() {
  const mod = await import('../../../../content/glosario.md');
  return {
    component: mod.default,
    metadata: mod.metadata || {},
    title: 'Glosario',
  };
}

export const prerender = true;
