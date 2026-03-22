import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'vsa-reading-progress';

// Structure: { [chapterSlug]: { scrollPercent: 45, lastVisited: timestamp, lastScrollY: 1234 } }
const initial = browser
  ? JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  : {};

export const readingProgress = writable(initial);

readingProgress.subscribe(value => {
  if (browser) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }
});

/**
 * Derived store returning the most recently visited chapter as [slug, data] tuple.
 * Returns null if no reading history exists.
 */
export const lastReadChapter = derived(readingProgress, ($progress) => {
  const entries = Object.entries($progress);
  if (entries.length === 0) return null;
  return entries.sort(([, a], [, b]) => b.lastVisited - a.lastVisited)[0];
});

/**
 * Update reading progress for a specific chapter.
 * @param {string} chapterSlug - The chapter slug to update
 * @param {number} scrollPercent - Scroll position as decimal (0.0 to 1.0)
 * @param {number} scrollY - Raw scroll Y position in pixels
 */
export function updateChapterProgress(chapterSlug, scrollPercent, scrollY) {
  readingProgress.update(current => ({
    ...current,
    [chapterSlug]: {
      scrollPercent: Math.round(scrollPercent * 100),
      lastVisited: Date.now(),
      lastScrollY: scrollY,
    },
  }));
}
