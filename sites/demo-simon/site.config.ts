/**
 * Contenido de la demo personal «Simón Arango». Persona ficticia.
 * Mundo: una inmersión. Cada sección es una profundidad; todo el texto sale de aquí.
 */

export const persona = {
  nombre: 'Simón Arango',
  nombreCorto: 'Simón',
  oficio: 'Biólogo marino e instructor de buceo',
  ciudad: 'Santa Marta',
  saludo: 'Paso más horas debajo del agua que encima. Cuido corales, enseño a bucear y los sábados pongo música en la playa.',
};

export const contacto = {
  email: 'hola@simonarango.demo',
  whatsapp: '+57 300 000 0000', // PLACEHOLDER: número ficticio de la demo
  instagram: '@simon.bajoelagua',
};

/** Las paradas del buceo: sirven de menú y de medidor de profundidad. */
export const zonas = [
  { id: 'superficie', m: 0, nombre: 'Superficie' },
  { id: 'sobre-mi', m: 10, nombre: 'Sobre mí' },
  { id: 'bitacora', m: 30, nombre: 'Bitácora' },
  { id: 'pasiones', m: 60, nombre: 'Pasiones' },
  { id: 'sonar', m: 90, nombre: 'Metas' },
  { id: 'fondo', m: 120, nombre: 'Contacto' },
];

export const sobreMi = {
  texto: [
    'Nací en Medellín, lejos del mar, y lo vi por primera vez a los 12 años. Ese día decidí que iba a vivir cerca de él. Estudié Biología en Santa Marta y nunca me fui.',
    'Hoy trabajo restaurando arrecifes de coral en el Parque Tayrona y enseño a bucear a gente que le tiene miedo al agua. Mi parte favorita es ver su cara cuando se dan cuenta de que pueden respirar allá abajo.',
  ],
  burbujas: ['Buzo desde los 15', 'Vive en Taganga', '+1.200 inmersiones', 'Habla con los peces', 'Café con panela'],
};

export const bitacora = [
  { n: 214, fecha: '2021 — hoy', lugar: 'Fundación de arrecifes, Tayrona', rol: 'Biólogo de restauración', prof: '18 m', nota: 'Sembramos más de 6.000 fragmentos de coral. El 70 % sigue vivo.' },
  { n: 132, fecha: '2018 — 2021', lugar: 'Escuela de buceo, Taganga', rol: 'Instructor de buceo', prof: '30 m', nota: 'Certifiqué a 400 buzos nuevos. Ninguno se quedó con miedo.' },
  { n: 47, fecha: '2013 — 2018', lugar: 'Universidad en Santa Marta', rol: 'Biología marina', prof: '12 m', nota: 'Tesis sobre tortugas carey. Pasé tres temporadas contándolas de noche.' },
];

export const equipo = ['Buceo técnico', 'Restauración de corales', 'Fotografía submarina', 'Primeros auxilios', 'Educación ambiental', 'Inglés y portugués'];

export const pasiones = [
  { foto: 'buceo', titulo: 'Bucear', texto: 'Mi lugar favorito: el Morro de Taganga a 25 metros, con el agua clarita.' },
  { foto: 'tortuga', titulo: 'Tortugas', texto: 'Soy voluntario en las noches de desove. Las hemos visto nacer de a cien.' },
  { foto: 'coral', titulo: 'Corales', texto: 'Los sembramos como si fueran matas. Crecen dos centímetros por año.' },
  { foto: 'dj', titulo: 'Poner música', texto: 'Los sábados en la playa: champeta, cumbia y algo de house al atardecer.' },
  { foto: 'vinilos', titulo: 'Vinilos', texto: 'Colecciono discos de salsa y música del Pacífico. Voy en 312.' },
] as const;

export const metas = [
  { meta: 'Bucear con tiburones ballena en Malpelo', estado: 'cerca', angulo: 40, dist: 0.45 },
  { meta: 'Sembrar 10.000 corales', estado: 'cerca', angulo: 130, dist: 0.7 },
  { meta: 'Grabar un documental sobre el Tayrona', estado: 'lejos', angulo: 220, dist: 0.85 },
  { meta: 'Abrir mi propia escuela de buceo', estado: 'lejos', angulo: 300, dist: 0.6 },
  { meta: 'Certificar a mi mamá (ya casi acepta)', estado: 'logrado', angulo: 260, dist: 0.3 },
] as const;

export const seo = {
  url: 'https://altair.lat/demos/simon',
  titulo: 'Simón Arango — Biólogo marino en Santa Marta (demo)',
  descripcion:
    'Bucea con Simón Arango: quién es, su bitácora de buceo, sus pasiones y sus metas en el sonar. Persona ficticia, demo de Altair Studio.',
  ogImage: '/demos/simon/og.png',
};

export const demo = { texto: 'Persona ficticia · página personal de demostración creada por Altair Studio', url: '/' };
export const creditos = 'Fotos de Unsplash (licencia Unsplash).';
