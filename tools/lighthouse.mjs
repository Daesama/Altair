/**
 * Lighthouse en móvil (configuración por defecto: Moto G Power simulado, red 4G lenta).
 *   node tools/lighthouse.mjs <url> [<url> ...]
 * Usa el Chromium de Playwright y guarda los informes HTML en .lighthouse/
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';

const urls = process.argv.slice(2);
if (!urls.length) {
  console.error('Uso: node tools/lighthouse.mjs <url> [<url> ...]');
  process.exit(1);
}
await mkdir('.lighthouse', { recursive: true });

const chrome = await chromeLauncher.launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ['--headless=new', '--no-sandbox'],
});

let fallo = false;
for (const url of urls) {
  const r = await lighthouse(url, {
    port: chrome.port,
    output: 'html',
    logLevel: 'error',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });
  const c = r.lhr.categories;
  const a = r.lhr.audits;
  const s = (k) => Math.round(c[k].score * 100);
  const fila = {
    url,
    Performance: s('performance'),
    Accessibility: s('accessibility'),
    'Best Practices': s('best-practices'),
    SEO: s('seo'),
    LCP: a['largest-contentful-paint'].displayValue,
    CLS: a['cumulative-layout-shift'].displayValue,
    TBT: a['total-blocking-time'].displayValue,
  };
  console.log(JSON.stringify(fila));
  if ([fila.Performance, fila.Accessibility, fila['Best Practices'], fila.SEO].some((v) => v < 90)) {
    fallo = true;
    for (const [id, au] of Object.entries(a)) {
      if (au.score !== null && au.score < 0.9 && au.scoreDisplayMode !== 'informative' && au.scoreDisplayMode !== 'notApplicable' && au.scoreDisplayMode !== 'manual') {
        console.log(`   - ${id}: ${au.title}${au.displayValue ? ' (' + au.displayValue + ')' : ''}`);
      }
    }
  }
  await writeFile(`.lighthouse/${new URL(url).port || 'site'}.html`, r.report);
}
await chrome.kill();
process.exit(fallo ? 1 : 0);
