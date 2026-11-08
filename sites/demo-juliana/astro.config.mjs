// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Se publica dentro de altair.lat, en /demos/juliana/ (ver tools/build-web.mjs).
export default defineConfig({
  site: 'https://altair.lat',
  base: '/demos/juliana/',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  build: { format: 'directory' },
  integrations: [
    sitemap(),
  ],
});
