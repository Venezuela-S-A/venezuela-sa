export async function load() {
  const mod = await import("../../../content/referencias.md");
  return {
    component: mod.default,
    metadata: mod.metadata || {},
    title: "Referencias",
  };
}

export const prerender = true;
