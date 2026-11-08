// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Se publica dentro de altair.lat, en /demos/lucia/ (ver tools/build-web.mjs).
export default defineConfig({
  site: 'https://altair.lat',
  base: '/demos/lucia/',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  build: { format: 'directory' },
  integrations: [
    sitemap(),
  ],
});
