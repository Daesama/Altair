/**
 * Construye las demos y las copia dentro de altair.lat, en dist/demos/<nombre>/.
 * Corre solo al final de `pnpm --filter altair build` (y de `pnpm build:web`),
 * así Cloudflare publica todo junto con el comando de build de siempre.
 * Para agregar una demo o la página de un cliente: créela en sites/, ponga
 * `base: '/demos/<nombre>/'` en su astro.config.mjs y agréguela a la lista.
 */
import { execSync } from 'node:child_process';
import { cpSync, existsSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('../', import.meta.url));

const demos = [
  { paquete: 'demo-barberia', ruta: 'barberia' },
  { paquete: 'demo-restaurante', ruta: 'restaurante' },
];

const filtros = demos.map((d) => `--filter ${d.paquete}`).join(' ');
execSync(`pnpm ${filtros} build`, { stdio: 'inherit', cwd: raiz });

for (const d of demos) {
  const origen = `${raiz}sites/${d.paquete}/dist`;
  const destino = `${raiz}sites/altair/dist/demos/${d.ruta}`;
  if (!existsSync(origen)) throw new Error(`No se encontró ${origen}`);
  rmSync(destino, { recursive: true, force: true });
  cpSync(origen, destino, { recursive: true });
  console.log(`✓ ${d.paquete} → altair.lat/demos/${d.ruta}/`);
}
