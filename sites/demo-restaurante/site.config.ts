/**
 * Datos editables de la demo «La Leñera, cocina de fogón».
 * Es un NEGOCIO FICTICIO creado por Altair Studio como demostración del plan Esencial.
 * Todo lo marcado como PLACEHOLDER es inventado.
 */
import type { Contacto, Horario, SeoBase, Ubicacion } from '@altair/core/types';

export const negocio = {
  nombre: 'La Leñera',
  subtitulo: 'Cocina de fogón',
  lema: 'Ajiaco, sancocho y carne a la leña en La Candelaria.',
};

export const contacto: Contacto = {
  whatsapp: '+57 300 000 0000', // PLACEHOLDER
  email: 'mesa@lalenera.demo', // PLACEHOLDER
  instagram: '@lalenera.demo', // PLACEHOLDER
  ciudad: 'Bogotá',
};

export const ubicacion: Ubicacion = {
  direccion: 'Carrera 0 # 00-00', // PLACEHOLDER
  barrio: 'La Candelaria',
  ciudad: 'Bogotá',
  region: 'Bogotá D.C.',
  pais: 'CO',
  lat: 4.5967, // PLACEHOLDER (zona de La Candelaria)
  lng: -74.0729,
};

export const horarios: Horario[] = [
  { dias: 'Lunes a jueves', horas: '12:00 m. – 4:00 p. m.', schema: { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '12:00', closes: '16:00' } },
  { dias: 'Viernes y sábado', horas: '12:00 m. – 10:00 p. m.', schema: { dayOfWeek: ['Friday', 'Saturday'], opens: '12:00', closes: '22:00' } },
  { dias: 'Domingo y festivos', horas: '8:00 a. m. – 5:00 p. m.', schema: { dayOfWeek: ['Sunday'], opens: '08:00', closes: '17:00' } },
];

export const especiales = [
  'Hoy: ajiaco santafereño',
  'Sobrebarriga a la leña',
  'Changua los domingos desde las 8',
  'Chocolate con queso y almojábana',
  'Postre de natas de la abuela',
];

export interface Plato {
  nombre: string;
  detalle: string;
  precio: number;
  marca?: 'casa' | 'picante' | 'compartir';
}

export const carta: { id: string; categoria: string; nota?: string; platos: Plato[] }[] = [
  {
    id: 'sopas',
    categoria: 'Sopas',
    nota: 'Se sirven con arroz blanco, aguacate y arepa.',
    platos: [
      { nombre: 'Ajiaco santafereño', detalle: 'Pollo desmechado, tres papas, guascas y mazorca. Con crema y alcaparras aparte.', precio: 32_000, marca: 'casa' },
      { nombre: 'Sancocho de gallina', detalle: 'Gallina criolla, yuca, plátano y papa, cocinado a fuego lento.', precio: 30_000 },
      { nombre: 'Changua', detalle: 'Leche, huevo, cilantro y calado. Solo domingos y festivos.', precio: 14_000 },
    ],
  },
  {
    id: 'fogon',
    categoria: 'Del fogón',
    nota: 'Todo pasa por la leña. Acompañado de papa criolla y ensalada.',
    platos: [
      { nombre: 'Sobrebarriga a la leña', detalle: 'Ocho horas de cocción, terminada en la brasa.', precio: 38_000, marca: 'casa' },
      { nombre: 'Carne a la leña', detalle: 'Corte de res asado, arroz, rábano y limón.', precio: 39_000 },
      { nombre: 'Pollo campesino', detalle: 'Medio pollo adobado con hierbas y asado en la leña.', precio: 34_000 },
      { nombre: 'Lomo de cerdo', detalle: 'Con hogao y maduro asado.', precio: 36_000 },
      { nombre: 'Trucha al ajillo', detalle: 'Trucha entera, ajo, mantequilla y patacón.', precio: 39_000 },
    ],
  },
  {
    id: 'picar',
    categoria: 'Para picar',
    platos: [
      { nombre: 'Picada leñera', detalle: 'Chorizo, morcilla, chicharrón, patacón, yuca, papa criolla y ají. Para dos.', precio: 58_000, marca: 'compartir' },
      { nombre: 'Empanadas', detalle: 'Cuatro empanadas de carne con ají de la casa.', precio: 14_000, marca: 'picante' },
      { nombre: 'Arepas con hogao', detalle: 'Arepa de maíz asada, hogao y quesito.', precio: 12_000 },
      { nombre: 'Patacón con guacamole', detalle: 'Plátano verde aplastado y frito.', precio: 11_000 },
    ],
  },
  {
    id: 'dulces',
    categoria: 'Dulces',
    platos: [
      { nombre: 'Postre de natas', detalle: 'Receta de la abuela, con uvas pasas.', precio: 12_000, marca: 'casa' },
      { nombre: 'Brevas con arequipe', detalle: 'Con queso campesino.', precio: 11_000 },
      { nombre: 'Cuajada con melao', detalle: 'Cuajada fresca y melao de panela.', precio: 10_000 },
    ],
  },
  {
    id: 'bebidas',
    categoria: 'Bebidas',
    platos: [
      { nombre: 'Limonada de panela', detalle: 'Panela, limón y hielo.', precio: 8_000 },
      { nombre: 'Jugo natural', detalle: 'Lulo, mora o maracuyá. En agua o en leche.', precio: 9_000 },
      { nombre: 'Chocolate santafereño', detalle: 'Con queso y almojábana.', precio: 12_000 },
      { nombre: 'Aguapanela con limón', detalle: 'Caliente o fría.', precio: 5_000 },
      { nombre: 'Tinto', detalle: 'Café colombiano de olla.', precio: 3_500 },
    ],
  },
];

export const seo: SeoBase = {
  url: 'https://restaurante.altair.lat',
  titulo: 'La Leñera, cocina de fogón — La Candelaria, Bogotá (demo)',
  descripcion:
    'Ajiaco, sancocho y carne a la leña en La Candelaria. Carta con precios, horarios y reservas por WhatsApp. Sitio de demostración creado por Altair Studio.',
  locale: 'es_CO',
  ogImage: '/og.png',
};

export const demo = {
  texto: 'Sitio de demostración creado por Altair Studio',
  url: 'https://altair.lat',
};

export const mensajes = {
  general: 'Hola, La Leñera. Quiero reservar una mesa.',
  reserva: (personas: string, dia: string, hora: string) =>
    `Hola, La Leñera. Quiero reservar una mesa para ${personas}. ${dia ? `Día: ${dia}.` : ''} ${hora ? `Hora: ${hora.replace(/\.$/, '')}.` : ''}`.replace(/\s+/g, ' ').trim(),
};

/** Créditos de las fotos (Unsplash License). */
export const creditos = [
  { foto: 'sopas-barro', autor: 'Marlon Alves', url: 'https://unsplash.com/photos/brown-ceramic-bowl-with-soup-vqlTh8QG0_c' },
  { foto: 'picada', autor: 'Alfredo Burgos', url: 'https://unsplash.com/photos/a-wooden-platter-filled-with-different-types-of-food-DCZppbF_yFo' },
  { foto: 'carne', autor: "César O'neill", url: 'https://unsplash.com/photos/grilled-meat-rice-radish-and-lime-on-a-wooden-table-a1ATPwkaCtQ' },
  { foto: 'empanadas', autor: 'Ana Beatriz', url: 'https://unsplash.com/photos/golden-brown-empanadas-arranged-on-a-white-plate-7ntwSjz8HZE' },
  { foto: 'arepas-hogao', autor: 'Alexandra Tran', url: 'https://unsplash.com/photos/a-white-plate-topped-with-food-next-to-a-bowl-of-salsa-OyQLPk4qbDo' },
  { foto: 'arepas-plancha', autor: 'Pardon Thibault', url: 'https://unsplash.com/photos/someone-is-cooking-flatbreads-on-a-griddle-dF_J4TZ8M8E' },
  { foto: 'plaza', autor: 'Aleksandr Galichkin', url: 'https://unsplash.com/photos/a-vibrant-market-stall-overflowing-with-fresh-fruits-XUrP-NrGIfA' },
];
