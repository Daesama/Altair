/**
 * Favicon e imagen OG de la demo Simón: un salvavidas sobre agua turquesa;
 * la OG baja del cielo al abismo con el retrato dentro del salvavidas.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const CORAL = '#ff6f59', MAR = '#0b7699', ABISMO = '#03142a', CIELO = '#9be7f2', BIO = '#7cf3e8';
const pub = new URL('../public/', import.meta.url);
const aro = (cx, cy, r, g) => {
  const seg = Array.from({ length: 8 }, (_, i) => {
    const a0 = (i * 45 * Math.PI) / 180, a1 = ((i + 1) * 45 * Math.PI) / 180;
    const p = (a, rr) => `${cx + Math.cos(a) * rr} ${cy + Math.sin(a) * rr}`;
    return `<path d="M${p(a0, r)} A${r} ${r} 0 0 1 ${p(a1, r)} L${p(a1, r - g)} A${r - g} ${r - g} 0 0 0 ${p(a0, r - g)}Z" fill="${i % 2 ? '#fff' : CORAL}"/>`;
  });
  return seg.join('');
};
const icono = (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="${MAR}"/>${aro(32, 30, 22, 9)}
  <path d="M0 52c8-5 16-5 24 0s16 5 24 0 12-4 16-2v14H0Z" fill="${BIO}" opacity=".9"/></svg>`;

await writeFile(new URL('favicon.svg', pub), icono(64));
const png = (s) => sharp(Buffer.from(icono(s))).png().toBuffer();
await writeFile(new URL('apple-touch-icon.png', pub), await png(180));
const ico = await png(32);
const h = Buffer.alloc(22);
h.writeUInt16LE(1, 2); h.writeUInt16LE(1, 4); h.writeUInt8(32, 6); h.writeUInt8(32, 7);
h.writeUInt16LE(1, 10); h.writeUInt16LE(32, 12); h.writeUInt32LE(ico.length, 14); h.writeUInt32LE(22, 18);
await writeFile(new URL('favicon.ico', pub), Buffer.concat([h, ico]));

const D = 300;
const circulo = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${D}" height="${D}"><circle cx="${D / 2}" cy="${D / 2}" r="${D / 2}"/></svg>`);
const foto = await sharp(fileURLToPath(new URL('../src/assets/fotos/retrato.jpg', import.meta.url)))
  .resize(D, D, { fit: 'cover', position: 'top' }).composite([{ input: circulo, blend: 'dest-in' }]).png().toBuffer();
const fondo = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${CIELO}"/><stop offset=".42" stop-color="${CIELO}"/><stop offset=".42" stop-color="${MAR}"/><stop offset="1" stop-color="${ABISMO}"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="1080" cy="90" r="56" fill="#ffc94a"/>
  <path d="M0 265c100-30 200-30 300 0s200 30 300 0 200-30 300 0 200 30 300 0v20H0Z" fill="${MAR}"/>
  ${aro(820, 330, 230, 64)}
  ${Array.from({ length: 14 }, (_, i) => `<circle cx="${80 + ((i * 83) % 560)}" cy="${330 + ((i * 47) % 280)}" r="${5 + (i % 4) * 4}" fill="none" stroke="#eafbff" stroke-opacity=".6" stroke-width="2"/>`).join('')}</svg>`;
await writeFile(new URL('og.png', pub), await sharp(Buffer.from(fondo)).composite([{ input: foto, left: 820 - D / 2, top: 330 - D / 2 }]).png().toBuffer());
console.log('brand: favicon, apple-touch-icon, og');
