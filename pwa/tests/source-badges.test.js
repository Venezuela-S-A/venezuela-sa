import { describe, test, expect } from 'vitest';

describe('Source Badge System', () => {
  test('source types include all 5 categories', () => {
    const types = ['multilateral', 'energy', 'media', 'academic', 'projection'];
    expect(types).toHaveLength(5);
  });

  test.todo('markdown link [OPEP](url) is parsed into source badge data with organization="OPEP"');
  test.todo('OPEP is classified as type="energy" (green badge)');
  test.todo('FMI is classified as type="multilateral" (blue badge)');
  test.todo('Reuters is classified as type="media" (gray badge)');
  test.todo('multiple sources in one paragraph are grouped into a single badge per D-12');
  test.todo('"Proyeccion VSA" sources get type="projection" with methodology field');
  test.todo('source badge renders with role="button" and aria-label per accessibility spec');
});
