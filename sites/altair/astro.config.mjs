// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://altair.lat',
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,
  build: { format: 'file' },
  integrations: [
    sitemap({ filter: (page) => !page.includes('/logo-lab') }),
  ],
});
