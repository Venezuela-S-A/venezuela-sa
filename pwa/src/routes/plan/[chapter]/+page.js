import { chapters } from "$lib/content/chapters.js";
import { error } from "@sveltejs/kit";

// Eagerly resolve all .md content files so Vite can handle nested paths
// (dynamic import variables only work one directory deep)
const contentModules = import.meta.glob("../../../content/**/*.md");

export async function load({ params }) {
  const chapterIndex = chapters.findIndex((c) => c.slug === params.chapter);
  if (chapterIndex === -1) throw error(404, "Capitulo no encontrado");

  const chapter = chapters[chapterIndex];

  // Load all docs for this chapter (mdsvex preprocessed .md files)
  const docs = await Promise.all(
    chapter.docs.map(async (docPath) => {
      try {
        const key = `../../../content/${docPath}.md`;
        const loader = contentModules[key];
        if (!loader) {
          console.error(`No content module found for: ${docPath}`);
          return null;
        }
        const mod = await loader();
        return {
          component: mod.default,
          metadata: mod.metadata || {},
        };
      } catch (e) {
        console.error(`Failed to load doc: ${docPath}`, e);
        return null;
      }
    }),
  );

  const validDocs = docs.filter(Boolean);

  // Sum reading times from doc metadata, fallback 5 min per doc
  const totalReadingTime = validDocs.reduce((sum, doc) => {
    return sum + (doc.metadata.readingTime || 5);
  }, 0);

  // Prev/next chapters (only visible, per D-06)
  const visibleChapters = chapters.filter((c) => c.visible);
  const visibleIndex = visibleChapters.findIndex(
    (c) => c.slug === params.chapter,
  );
  const prevChapter =
    visibleIndex > 0 ? visibleChapters[visibleIndex - 1] : null;
  const nextChapter =
    visibleIndex < visibleChapters.length - 1
      ? visibleChapters[visibleIndex + 1]
      : null;

  return {
    chapter,
    docs: validDocs,
    readingTime: totalReadingTime,
    prevChapter,
    nextChapter,
  };
}

export const prerender = true;
