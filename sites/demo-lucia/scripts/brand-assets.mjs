/**
 * Favicon e imagen OG de la demo Lucía: las letras «LU» trazadas a mano sobre
 * un círculo rosa; la OG pega el retrato en duotono sobre papel con cinta.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROSA = '#ff4fa0', TINTA = '#141414', PAPEL = '#f3ede2', AMARILLO = '#ffd23f', AZUL = '#2f4bff';
const pub = new URL('../public/', import.meta.url);
const LU = 'M15 18v28h12M33 18v18a8 8 0 0 0 16 0V18';
const icono = (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="30" fill="${ROSA}" stroke="${TINTA}" stroke-width="3"/>
  <path d="${LU}" fill="none" stroke="${TINTA}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

await writeFile(new URL('favicon.svg', pub), icono(64));
const png = (s) => sharp(Buffer.from(icono(s))).png().toBuffer();
await writeFile(new URL('apple-touch-icon.png', pub), await png(180));
const ico = await png(32);
const h = Buffer.alloc(22);
h.writeUInt16LE(1, 2); h.writeUInt16LE(1, 4); h.writeUInt8(32, 6); h.writeUInt8(32, 7);
h.writeUInt16LE(1, 10); h.writeUInt16LE(32, 12); h.writeUInt32LE(ico.length, 14); h.writeUInt32LE(22, 18);
await writeFile(new URL('favicon.ico', pub), Buffer.concat([h, ico]));

const gris = await sharp(fileURLToPath(new URL('../src/assets/fotos/retrato.jpg', import.meta.url)))
  .resize(420, 520, { fit: 'cover', position: 'top' }).grayscale().linear(1.25, -20).toBuffer();
const foto = await sharp({ create: { width: 420, height: 520, channels: 3, background: ROSA } })
  .composite([{ input: gris, blend: 'multiply' }]).png().toBuffer();
const fondo = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${PAPEL}"/>
  <rect x="690" y="40" width="460" height="560" fill="#fffdf8" stroke="${TINTA}" stroke-width="5" transform="rotate(3 920 320)"/>
  <g transform="rotate(-4 300 200)"><rect x="70" y="120" width="300" height="130" fill="${AMARILLO}" stroke="${TINTA}" stroke-width="5"/><path d="${LU}" transform="translate(110 124) scale(2.2)" fill="none" stroke="${TINTA}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>
  <rect x="80" y="320" width="420" height="40" fill="${AZUL}" transform="rotate(2 290 340)"/>
  <rect x="80" y="390" width="320" height="40" fill="${ROSA}" transform="rotate(-2 240 410)"/>
  <rect x="760" y="20" width="150" height="40" fill="${AMARILLO}" opacity=".8" transform="rotate(-10 835 40)"/></svg>`;
await writeFile(new URL('og.png', pub), await sharp(Buffer.from(fondo))
  .composite([{ input: foto, left: 710, top: 58 }]).png().toBuffer());
console.log('brand: favicon, apple-touch-icon, og');
