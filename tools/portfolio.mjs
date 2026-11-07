/**
 * Capturas reales para el portafolio de altair.lat:
 * - <caso>.png: escritorio 1440×900, parte superior.
 * - <caso>-movil.png: celular en ventana de 375×1400 (2x), para el
 *   marco de celular que hace scroll al pasar el mouse.
 *   node tools/portfolio.mjs [urlBarberia] [urlRestaurante]
 * Por defecto toma las demos de las vistas previas locales.
 */
import { chromium } from 'playwright';

const [barberia = 'http://localhost:4322/', restaurante = 'http://localhost:4323/'] = process.argv.slice(2);
const destino = 'sites/altair/src/assets/portfolio/';
const casos = [
  { url: 'https://arkei.co', archivo: 'arke' },
  { url: barberia, archivo: 'barberia' },
  { url: restaurante, archivo: 'restaurante' },
];

const browser = await chromium.launch();
for (const c of casos) {
  for (const movil of [false, true]) {
    const ctx = await browser.newContext({
      viewport: movil ? { width: 375, height: 1400 } : { width: 1440, height: 900 },
      deviceScaleFactor: movil ? 2 : 1,
      isMobile: movil,
      hasTouch: movil,
      locale: 'es-CO',
    });
    // Oculta los avisos de datos de las demos para que no tapen la captura.
    await ctx.addInitScript(() => {
      try { localStorage.setItem('consent:aviso-datos', '1'); } catch {}
    });
    const page = await ctx.newPage();
    await page.goto(c.url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);
    // Ventana alta en vez de fullPage: fullPage repite las barras fijas al coser la imagen.
    await page.screenshot({ path: `${destino}${c.archivo}${movil ? '-movil' : ''}.png` });
    console.log('ok', c.archivo, movil ? 'móvil' : 'escritorio');
    await ctx.close();
  }
}
await browser.close();
