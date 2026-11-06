/**
 * Capturas de verificación visual con Playwright.
 *
 *   node tools/shots.mjs <url> [nombre] [--widths=375,1440] [--reduced] [--viewport]
 *
 * Recorre la página para disparar las animaciones de scroll y guarda capturas
 * de página completa en .shots/<nombre>-<ancho>.png
 * Con --viewport guarda además capturas de pantalla visible (sin página completa).
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith('--'));
if (!url) {
  console.error('Uso: node tools/shots.mjs <url> [nombre] [--widths=375,1440] [--reduced]');
  process.exit(1);
}
const nombre = args.filter((a) => !a.startsWith('--'))[1] ?? new URL(url).hostname.replace(/\W+/g, '-');
const widths = (args.find((a) => a.startsWith('--widths='))?.split('=')[1] ?? '375,1440').split(',').map(Number);
const reduced = args.includes('--reduced');
const soloViewport = args.includes('--viewport');

await mkdir('.shots', { recursive: true });
const browser = await chromium.launch();

for (const w of widths) {
  const h = w < 768 ? 812 : 900;
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: w < 768 ? 2 : 1,
    reducedMotion: reduced ? 'reduce' : 'no-preference',
    locale: 'es-CO',
  });
  const page = await ctx.newPage();
  const errores = [];
  page.on('pageerror', (e) => errores.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errores.push(m.text()));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);

  const sufijo = `${nombre}-${w}${reduced ? '-rm' : ''}`;
  await page.screenshot({ path: `.shots/${sufijo}-top.png` });

  if (!soloViewport) {
    // Recorre la página para que los ScrollTrigger con `once` se disparen.
    const alto = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < alto; y += Math.round(h * 0.6)) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(260);
    }
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    // Desfija el header para que no aparezca repetido.
    await page.screenshot({ path: `.shots/${sufijo}.png`, fullPage: true });
  }

  const desborde = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(`${sufijo}: ok${desborde > 0 ? ` · DESBORDE HORIZONTAL ${desborde}px` : ''}${errores.length ? ' · errores: ' + errores.join(' | ') : ''}`);
  await ctx.close();
}

await browser.close();
