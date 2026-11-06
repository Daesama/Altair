// Corta una captura larga en tramos para revisarla: node tools/crop.mjs <png> [alto]
import sharp from 'sharp';
const [src, alto = '1600'] = process.argv.slice(2);
const img = sharp(src);
const { width, height } = await img.metadata();
const h = Number(alto);
for (let y = 0, i = 0; y < height; y += h, i++) {
  await sharp(src).extract({ left: 0, top: y, width, height: Math.min(h, height - y) }).toFile(src.replace('.png', `.part${i}.png`));
}
console.log(Math.ceil(height / h), 'tramos');
