/**
 * Favicon e imagen OG de la demo Juliana: monograma «JO» trazado con líneas finas
 * dentro de un marco, como el rótulo de un plano; la OG pone el retrato en grises
 * sobre papel hueso con la retícula.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HUESO = '#f2eee6', TINTA = '#1c1b18', PINO = '#2f4237';
const pub = new URL('../public/', import.meta.url);
const JO = (t = '') => `<path d="M24 18v19a6 6 0 0 1-12 0" ${t}/><circle cx="40" cy="31" r="10" ${t}/>`;
const icono = (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${HUESO}"/><rect x="5" y="5" width="54" height="54" fill="none" stroke="${TINTA}" stroke-width="2"/>
  <g fill="none" stroke="${PINO}" stroke-width="4" stroke-linecap="square">${JO()}</g></svg>`;

await writeFile(new URL('favicon.svg', pub), icono(64));
const png = (s) => sharp(Buffer.from(icono(s))).png().toBuffer();
await writeFile(new URL('apple-touch-icon.png', pub), await png(180));
const ico = await png(32);
const h = Buffer.alloc(22);
h.writeUInt16LE(1, 2); h.writeUInt16LE(1, 4); h.writeUInt8(32, 6); h.writeUInt8(32, 7);
h.writeUInt16LE(1, 10); h.writeUInt16LE(32, 12); h.writeUInt32LE(ico.length, 14); h.writeUInt32LE(22, 18);
await writeFile(new URL('favicon.ico', pub), Buffer.concat([h, ico]));

const foto = await sharp(fileURLToPath(new URL('../src/assets/fotos/retrato.jpg', import.meta.url)))
  .resize(400, 500, { fit: 'cover', position: 'top' }).grayscale().linear(1.05, 0).toBuffer();
const lineas = Array.from({ length: 13 }, (_, i) => `<line x1="${60 + i * 90}" y1="0" x2="${60 + i * 90}" y2="630" stroke="${TINTA}" stroke-opacity=".06"/>`).join('');
const fondo = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${HUESO}"/>${lineas}
  <g transform="translate(80 150) scale(4)" fill="none" stroke="${PINO}" stroke-width="2.2" stroke-linecap="square">${JO()}</g>
  <rect x="80" y="430" width="560" height="1" fill="${TINTA}"/>
  <rect x="80" y="470" width="560" height="60" fill="none" stroke="${TINTA}"/>
  <line x1="200" y1="470" x2="200" y2="530" stroke="${TINTA}"/><line x1="360" y1="470" x2="360" y2="530" stroke="${TINTA}"/><line x1="500" y1="470" x2="500" y2="530" stroke="${TINTA}"/>
  <rect x="716" y="56" width="428" height="528" fill="none" stroke="${TINTA}"/></svg>`;
await writeFile(new URL('og.png', pub), await sharp(Buffer.from(fondo)).composite([{ input: foto, left: 730, top: 70 }]).png().toBuffer());
console.log('brand: favicon, apple-touch-icon, og');
