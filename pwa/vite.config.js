import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.test.{js,ts}', 'tests/**/*.test.{js,ts}'],
    environment: 'jsdom',
    globals: true
  }
});
