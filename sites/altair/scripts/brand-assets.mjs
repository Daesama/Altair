/**
 * Genera favicon.svg, favicon.ico, apple-touch-icon.png, icon-512.png y og.png
 * a partir de src/brand/logo.svg. Corre automáticamente antes de `astro build`.
 * Solo usa trazos del SVG (sin texto), así el resultado es igual en cualquier máquina.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const BG = '#07060a';
const FG = '#e9e6f2';
const ACCENT = '#7a4bff';
const LINE = '#26222f';

const root = new URL('../', import.meta.url);
const pub = new URL('public/', root);
await mkdir(pub, { recursive: true });

const raw = (await readFile(new URL('src/brand/logo.svg', root), 'utf8')).replace(/<!--[\s\S]*?-->/g, '').trim();
const viewBox = raw.match(/viewBox="([^"]+)"/)[1].split(/[\s,]+/).map(Number);
const symbolBox = (raw.match(/data-symbol="([^"]+)"/)?.[1] ?? viewBox.join(' ')).split(/[\s,]+/).map(Number);
const inner = raw.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const symbolInner = inner.replace(/<g class="wordmark"[\s\S]*?<\/g>/, '');

/** Pinta el contenido con colores fijos (currentColor → FG, .accent → ACCENT). */
const paint = (s, fg = FG) =>
  s
    .replace(/currentColor/g, fg)
    .replace(/class="accent"/g, `class="accent" fill="${ACCENT}"`)
    .replace(/(<[^>]*class="accent" fill="[^"]+"[^>]*)\sfill="none"/g, '$1')
    .replace(/(<[^>]*stroke="[^"]+"[^>]*class="accent")\sfill="[^"]+"/g, `$1 fill="none" stroke="${ACCENT}"`);

function tile(size, pad) {
  const [x, y, w, h] = symbolBox;
  const s = Math.max(w, h);
  const scale = (size - pad * 2) / s;
  const tx = pad + ((s - w) * scale) / 2 - x * scale;
  const ty = pad + ((s - h) * scale) / 2 - y * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${BG}"/>
  <g transform="translate(${tx} ${ty}) scale(${scale})" fill="${FG}">${paint(symbolInner)}</g>
</svg>`;
}

// favicon.svg (vectorial, para navegadores modernos)
await writeFile(new URL('favicon.svg', pub), tile(64, 8));

// PNGs
const png = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
await writeFile(new URL('apple-touch-icon.png', pub), await png(tile(180, 28), 180));
await writeFile(new URL('icon-512.png', pub), await png(tile(512, 80), 512));

// favicon.ico con un PNG 32×32 embebido
const ico32 = await png(tile(32, 3), 32);
const head = Buffer.alloc(22);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4);
head.writeUInt8(32, 6); head.writeUInt8(32, 7); head.writeUInt8(0, 8); head.writeUInt8(0, 9);
head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12);
head.writeUInt32LE(ico32.length, 14); head.writeUInt32LE(22, 18);
await writeFile(new URL('favicon.ico', pub), Buffer.concat([head, ico32]));

// og.png 1200×630: grilla + logo completo, sin texto rasterizado.
{
  const W = 1200, H = 630;
  const [vx, vy, vw, vh] = viewBox;
  const logoW = 720;
  const scale = logoW / vw;
  const lx = 96, ly = H - 96 - vh * scale;
  let grid = '';
  for (let i = 1; i < 12; i++) grid += `<line x1="${(W / 12) * i}" y1="0" x2="${(W / 12) * i}" y2="${H}" stroke="${LINE}" stroke-width="1"/>`;
  for (const y of [96, H - 64]) grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${LINE}" stroke-width="1"/>`;
  const og = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  ${grid}
  <rect x="${W - 96 - 16}" y="${96 - 8}" width="16" height="16" fill="${ACCENT}"/>
  <g transform="translate(${lx - vx * scale} ${ly - vy * scale}) scale(${scale})" fill="${FG}">${paint(inner)}</g>
</svg>`;
  await writeFile(new URL('og.png', pub), await sharp(Buffer.from(og)).png().toBuffer());
}

console.log('brand: favicon.svg, favicon.ico, apple-touch-icon.png, icon-512.png, og.png');
