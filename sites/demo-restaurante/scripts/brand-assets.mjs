/**
 * Favicon e imagen OG de la demo La Leñera: un sello dentado (como las etiquetas
 * pintadas de plaza) con una «L» gruesa. Todo con trazos, sin texto rasterizado.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const AJI = '#d7261e', MAIZ = '#f4b41a', TINTA = '#1a1410', PAPEL = '#fbf3e4';
const pub = new URL('../public/', import.meta.url);

/** Sello dentado de `n` puntas centrado en (c, c). */
export function sello(c, rOut, rIn, n = 18) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? rIn : rOut;
    const a = (Math.PI * i) / n - Math.PI / 2;
    pts.push(`${(c + r * Math.cos(a)).toFixed(2)} ${(c + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join('L')}Z`;
}
const L = 'M22 16h9v24h12v8H22z';

const icono = (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${AJI}"/>
  <path d="${sello(32, 29, 25.5)}" fill="${MAIZ}"/>
  <path d="${L}" fill="${TINTA}" transform="translate(-0.5 0)"/></svg>`;

await writeFile(new URL('favicon.svg', pub), icono(64));
const png = (s) => sharp(Buffer.from(icono(s))).resize(s, s).png().toBuffer();
await writeFile(new URL('apple-touch-icon.png', pub), await png(180));
const ico = await png(32);
const h = Buffer.alloc(22);
h.writeUInt16LE(1, 2); h.writeUInt16LE(1, 4); h.writeUInt8(32, 6); h.writeUInt8(32, 7);
h.writeUInt16LE(1, 10); h.writeUInt16LE(32, 12); h.writeUInt32LE(ico.length, 14); h.writeUInt32LE(22, 18);
await writeFile(new URL('favicon.ico', pub), Buffer.concat([h, ico]));

const foto = await sharp(fileURLToPath(new URL('../src/assets/fotos/picada.jpg', import.meta.url)))
  .resize(700, 630, { fit: 'cover' }).jpeg({ quality: 82 }).toBuffer();
const panel = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${AJI}"/>
  <rect x="24" y="24" width="452" height="582" fill="none" stroke="${PAPEL}" stroke-width="6"/>
  <g transform="translate(58 123) scale(6)"><path d="${sello(32, 29, 25.5)}" fill="${MAIZ}"/><path d="${L}" fill="${TINTA}"/></g>
  <rect x="500" y="0" width="700" height="630" fill="${TINTA}"/></svg>`;
await writeFile(new URL('og.png', pub), await sharp(Buffer.from(panel))
  .composite([{ input: foto, left: 500, top: 0 }]).png().toBuffer());
console.log('brand: favicon, apple-touch-icon, og');
