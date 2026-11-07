/**
 * Favicon e imagen OG de la demo Filo. El monograma «F» es un trazo propio
 * (sin texto rasterizado) y la OG usa la foto principal.
 */
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const VINO = '#5a1a1f', CREMA = '#f3e9d7', LATON = '#b8893b';
const pub = new URL('../public/', import.meta.url);
const F = 'M18 12h29v13h-3.2c-.8-4.6-3-6.4-7.6-6.4H29v12.2h5.6c3 0 4.3-1.4 4.7-4.4h3.1v15h-3.1c-.4-3.1-1.7-4.5-4.7-4.5H29v10.6c0 2.4 1.2 3.4 4.4 3.6V54H18v-2.9c2.6-.3 3.6-1.3 3.6-3.6V18.5c0-2.3-1-3.3-3.6-3.6z';
const icono = (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${VINO}"/><path d="${F}" fill="${CREMA}"/><rect x="18" y="57" width="29" height="1.6" fill="${LATON}"/></svg>`;

await writeFile(new URL('favicon.svg', pub), icono(64));
const png = (s) => sharp(Buffer.from(icono(s))).png().toBuffer();
await writeFile(new URL('apple-touch-icon.png', pub), await png(180));
const ico = await png(32);
const h = Buffer.alloc(22);
h.writeUInt16LE(1, 2); h.writeUInt16LE(1, 4); h.writeUInt8(32, 6); h.writeUInt8(32, 7);
h.writeUInt16LE(1, 10); h.writeUInt16LE(32, 12); h.writeUInt32LE(ico.length, 14); h.writeUInt32LE(22, 18);
await writeFile(new URL('favicon.ico', pub), Buffer.concat([h, ico]));

const foto = await sharp(new URL('../src/assets/fotos/silla-ventana.jpg', import.meta.url).pathname.replace(/^\/(\w:)/, '$1'))
  .resize(720, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 82 }).toBuffer();
const panel = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="630">
  <rect width="480" height="630" fill="${VINO}"/>
  <rect x="48" y="48" width="384" height="1.5" fill="${LATON}"/><rect x="48" y="580" width="384" height="1.5" fill="${LATON}"/>
  <g transform="translate(96 160) scale(4.6)"><path d="${F}" fill="${CREMA}"/></g></svg>`;
await writeFile(new URL('og.png', pub), await sharp({ create: { width: 1200, height: 630, channels: 3, background: VINO } })
  .composite([{ input: Buffer.from(panel), left: 0, top: 0 }, { input: foto, left: 480, top: 0 }]).png().toBuffer());
console.log('brand: favicon, apple-touch-icon, og');
