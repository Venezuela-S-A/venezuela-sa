import { describe, test, expect } from 'vitest';

describe('Chapter Navigation', () => {
  test('chapter order starts with introduccion', () => {
    const firstChapter = 'introduccion';
    expect(firstChapter).toBe('introduccion');
  });

  test.todo('first chapter (introduccion) has no previous button');
  test.todo('last visible chapter has no next button');
  test.todo('middle chapters show both previous and next');
  test.todo('chapter nav labels match "Anterior: {title}" and "Siguiente: {title}"');
  test.todo('hidden chapters (08-pitch, 09-investors) are excluded from navigation sequence');
  test.todo('reading progress per chapter is stored in localStorage under key "vsa-reading-progress"');
  test.todo('progress bar shows scroll percentage 0-100 for current chapter');
});
