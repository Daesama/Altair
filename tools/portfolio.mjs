/**
 * Capturas reales para el portafolio de altair.lat (1440×900, parte superior).
 *   node tools/portfolio.mjs [urlBarberia] [urlRestaurante]
 * Por defecto toma las demos de las vistas previas locales.
 */
import { chromium } from 'playwright';

const [barberia = 'http://localhost:4322/', restaurante = 'http://localhost:4323/'] = process.argv.slice(2);
const destino = 'sites/altair/src/assets/portfolio/';
const casos = [
  { url: 'https://arkei.co', archivo: 'arke.png' },
  { url: barberia, archivo: 'barberia.png' },
  { url: restaurante, archivo: 'restaurante.png' },
];

const browser = await chromium.launch();
for (const c of casos) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'es-CO' });
  // Oculta los avisos de datos de las demos para que no tapen la captura.
  await ctx.addInitScript(() => {
    try { localStorage.setItem('consent:aviso-datos', '1'); } catch {}
  });
  const page = await ctx.newPage();
  await page.goto(c.url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3500);
  await page.screenshot({ path: destino + c.archivo });
  console.log('ok', c.archivo);
  await ctx.close();
}
await browser.close();
