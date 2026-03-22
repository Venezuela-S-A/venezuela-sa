import readingTime from 'reading-time';

/**
 * Calculate estimated reading time for a text block.
 * Uses standard 200 wpm for Spanish text.
 * @param {string} text - Raw text content (markdown stripped)
 * @returns {number} Estimated reading time in minutes (rounded up)
 */
export function calculateReadingTime(text) {
  const result = readingTime(text);
  return Math.ceil(result.minutes);
}
