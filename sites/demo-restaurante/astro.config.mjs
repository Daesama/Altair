// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://restaurante.altair.lat',
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,
  build: { format: 'file' },
  integrations: [
    sitemap(),
  ],
});
