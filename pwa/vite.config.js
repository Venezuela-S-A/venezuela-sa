import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      strategies: 'generateSW',
      registerType: 'autoUpdate',
      manifest: {
        name: 'Venezuela S.A.',
        short_name: 'Venezuela S.A.',
        description: '40 millones de accionistas. Un plan de reconstruccion nacional.',
        theme_color: '#09090B',
        background_color: '#09090B',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: [
          'client/**/*.{js,css,ico,png,svg,webp,woff2}',
          'prerendered/**/*.html'
        ],
        navigateFallback: '200.html'
      }
    })
  ],
  test: {
    include: ['src/**/*.test.{js,ts}', 'tests/**/*.test.{js,ts}'],
    environment: 'jsdom',
    globals: true
  }
});
