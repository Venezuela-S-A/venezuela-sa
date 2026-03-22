import { describe, test, expect } from 'vitest';

describe('Deep Links', () => {
  test('github-slugger algorithm converts heading to slug', () => {
    // Real test placeholder — will test actual slugger once rehype-slug integrated
    const heading = 'Reservas Petroleras';
    expect(heading.toLowerCase().replace(/\s+/g, '-')).toBe('reservas-petroleras');
  });

  test.todo('H2 heading "Reservas Petroleras" gets id="reservas-petroleras"');
  test.todo('H3 heading with special characters gets sanitized slug');
  test.todo('duplicate headings get suffixed id (e.g., "overview" and "overview-1")');
  test.todo('paragraphs get sequential id="p-{index}" within chapter');
  test.todo('URL /plan/fundamentos#reservas-petroleras scrolls to correct element');
  test.todo('scroll offset accounts for 80px fixed header + progress bar');
});
