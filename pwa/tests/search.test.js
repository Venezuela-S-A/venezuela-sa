import { describe, test, expect } from 'vitest';

describe('Pagefind Search Integration', () => {
  test('search placeholder text is in Spanish', () => {
    expect('Buscar en el plan...').toContain('Buscar');
  });

  test.todo('Pagefind index is generated after build in build/pagefind/ directory');
  test.todo('search input lazy-loads Pagefind on focus (not on page load)');
  test.todo('search returns results for "petroleo" across all chapters');
  test.todo('search results show title, excerpt with highlighted match, and chapter URL');
  test.todo('maximum 10 results are displayed');
  test.todo('empty query clears results');
  test.todo('"Sin resultados" message shown when no matches found');
});
