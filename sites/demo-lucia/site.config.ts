/**
 * Contenido de la demo personal «Lucía Peña». Persona ficticia.
 * Mundo: fanzine hecho a mano. Todo el texto de la página sale de aquí.
 */

export const persona = {
  nombre: 'Lucía Peña',
  nombreCorto: 'Lucía',
  oficio: 'Ilustradora y cinéfila',
  ciudad: 'Bogotá',
  saludo: 'Dibujo de día, veo películas de noche y tomo fotos con una cámara más vieja que yo.',
};

export const contacto = {
  email: 'hola@luciapena.demo',
  whatsapp: '+57 300 000 0000', // PLACEHOLDER: número ficticio de la demo
  instagram: '@lu.dibuja',
};

export const temas = ['Ilustración', 'Cine de los 80', 'Fotos análogas', 'Plantas raras', 'Patineta', 'Fanzines', 'Café negro'];

export const carta = {
  saludo: 'Querida persona que lee esto:',
  parrafos: [
    'Me llamo Lucía, tengo 27 años y vivo en un apartamento en La Macarena con once plantas y un gato que se llama Fellini. Ilustro libros, carteles y uno que otro tatuaje para amigos valientes.',
    'Creo que todo se puede contar con dibujos: una receta, una ruptura, un trámite en la notaría. Me gustan las cosas hechas a mano, las películas con subtítulos y las conversaciones que empiezan a las 11 p. m.',
  ],
  resaltar: ['Ilustro libros, carteles', 'hechas a mano'],
  firma: 'Lu',
};

export const ficha = [
  { k: 'Nombre', v: 'Lucía Peña' },
  { k: 'Oficio', v: 'Ilustradora' },
  { k: 'Base', v: 'La Macarena, Bogotá' },
  { k: 'Superpoder', v: 'Dibujar caras en 30 segundos' },
  { k: 'Debilidad', v: 'Las papelerías' },
];

/** Hoja de vida en forma de boletas de cine. */
export const boletas = [
  { funcion: '2023 — HOY', titulo: 'Ilustradora independiente', sala: 'Editoriales, marcas y bandas', nota: 'Más de 40 portadas y carteles. Mi favorito: el del festival de cine de la ciudad.', silla: 'A-27' },
  { funcion: '2020 — 2023', titulo: 'Directora de arte junior', sala: 'Agencia creativa, Bogotá', nota: 'Campañas para marcas de café y de bicicletas. Aprendí a presentar ideas sin temblar.', silla: 'B-12' },
  { funcion: '2016 — 2020', titulo: 'Artes Visuales', sala: 'Universidad en Bogotá', nota: 'Tesis: un fanzine sobre las salas de cine de barrio que ya cerraron.', silla: 'C-04' },
];

export const sellos = ['Ilustración digital', 'Tinta y acuarela', 'Dirección de arte', 'Serigrafía', 'Fotografía análoga', 'Inglés'];

/** Polaroids arrastrables. */
export const hobbies = [
  { foto: 'camara', titulo: 'Fotos en rollo', nota: '36 fotos, 3 buenas. Vale la pena.' },
  { foto: 'cine', titulo: 'Cine los martes', nota: 'Siempre fila 7, en el centro.' },
  { foto: 'patineta', titulo: 'Patineta', nota: 'Me caigo con estilo.' },
  { foto: 'planta', titulo: 'Plantas raras', nota: 'Esta se llama Gloria.' },
] as const;

export const metas = [
  { meta: 'Publicar mi primer fanzine', hecho: true, nota: '¡200 copias vendidas!' },
  { meta: 'Exponer en una galería de verdad', hecho: true, nota: 'Abril, en Chapinero' },
  { meta: 'Ilustrar un cartel para una película colombiana', hecho: false, nota: 'Ya escribí a tres directores' },
  { meta: 'Hacer un corto animado de 3 minutos', hecho: false, nota: 'Llevo 40 segundos' },
  { meta: 'Viajar a Japón a ver papelerías', hecho: false, nota: 'Alcancía en marcha' },
] as const;

export const favoritos = [
  { tipo: 'Película', v: 'La estrategia del caracol', forma: 'estrella' },
  { tipo: 'Canción', v: 'Ojalá, de Silvio', forma: 'circulo' },
  { tipo: 'Comida', v: 'Changua con mucho cilantro', forma: 'nube' },
  { tipo: 'Lugar', v: 'La Candelaria a las 6 a. m.', forma: 'flor' },
] as const;

export const seo = {
  url: 'https://altair.lat/demos/lucia',
  titulo: 'Lucía Peña — Ilustradora en Bogotá (demo)',
  descripcion:
    'El fanzine personal de Lucía Peña: quién es, su trayectoria en boletas de cine, sus hobbies y su lista de metas. Persona ficticia, demo de Altair Studio.',
  ogImage: '/demos/lucia/og.png',
};

export const demo = { texto: 'Persona ficticia · página personal de demostración creada por Altair Studio', url: '/' };
export const creditos = 'Fotos de Unsplash (licencia Unsplash).';
