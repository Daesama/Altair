/**
 * Arma altair.lat completo en sites/altair/dist:
 * construye los tres sitios y copia cada demo en dist/demos/<nombre>/.
 *   pnpm build:web
 * Para agregar una demo o la página de un cliente: créela en sites/, ponga
 * `base: '/demos/<nombre>/'` en su astro.config.mjs y agréguela a la lista.
 */
import { execSync } from 'node:child_process';
import { cpSync, existsSync, rmSync } from 'node:fs';

const demos = [
  { paquete: 'demo-barberia', ruta: 'barberia' },
  { paquete: 'demo-restaurante', ruta: 'restaurante' },
];

execSync('pnpm -r --filter "./sites/*" build', { stdio: 'inherit' });

for (const d of demos) {
  const origen = `sites/${d.paquete}/dist`;
  const destino = `sites/altair/dist/demos/${d.ruta}`;
  if (!existsSync(origen)) throw new Error(`No se encontró ${origen}`);
  rmSync(destino, { recursive: true, force: true });
  cpSync(origen, destino, { recursive: true });
  console.log(`✓ ${d.paquete} → altair.lat/demos/${d.ruta}/`);
}
