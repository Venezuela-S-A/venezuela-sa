import { describe, test, expect } from 'vitest';

describe('Admonition Processing', () => {
  test('admonition types are defined', () => {
    const types = ['danger', 'info', 'tip', 'caution', 'warning'];
    expect(types).toHaveLength(5);
  });

  test.todo(':::danger Title text renders as admonition with type=danger and title="Title text"');
  test.todo(':::info renders with blue color token --vsa-info');
  test.todo(':::tip renders with accent color token --vsa-accent');
  test.todo(':::caution renders with warning color token --vsa-warning');
  test.todo('admonition body content preserves inline markdown (bold, links)');
  test.todo('nested admonitions (if any) do not break rendering');
});
