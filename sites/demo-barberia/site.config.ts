/**
 * Datos editables de la demo «Filo Barbería & Spa».
 * Es un NEGOCIO FICTICIO creado por Altair Studio como demostración del plan Esencial.
 * Todo lo marcado como PLACEHOLDER es inventado y debe reemplazarse si la demo
 * se convierte en el sitio de un cliente real.
 */
import type { Contacto, Horario, SeoBase, Ubicacion } from '@altair/core/types';

export const negocio = {
  nombre: 'Filo Barbería & Spa',
  nombreCorto: 'Filo',
  lema: 'Corte, navaja y una hora para usted.',
  edicion: 'Nº 07', // detalle editorial del encabezado
};

export const contacto: Contacto = {
  whatsapp: '+57 300 000 0000', // PLACEHOLDER
  email: 'hola@filo.demo', // PLACEHOLDER
  instagram: '@filo.demo', // PLACEHOLDER
  ciudad: 'Bogotá',
};

export const ubicacion: Ubicacion = {
  direccion: 'Calle 00 # 0-00', // PLACEHOLDER
  barrio: 'Chapinero Alto',
  ciudad: 'Bogotá',
  region: 'Bogotá D.C.',
  pais: 'CO',
  lat: 4.6486, // PLACEHOLDER (zona de Chapinero Alto)
  lng: -74.0602,
};

export const horarios: Horario[] = [
  { dias: 'Martes a viernes', horas: '10:00 a. m. – 8:00 p. m.', schema: { dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '20:00' } },
  { dias: 'Sábado', horas: '9:00 a. m. – 7:00 p. m.', schema: { dayOfWeek: ['Saturday'], opens: '09:00', closes: '19:00' } },
  { dias: 'Domingo', horas: '10:00 a. m. – 3:00 p. m.', schema: { dayOfWeek: ['Sunday'], opens: '10:00', closes: '15:00' } },
  { dias: 'Lunes', horas: 'Cerrado' },
];

export interface Servicio {
  nombre: string;
  detalle: string;
  minutos: number;
  precio: number;
}

export const servicios: { categoria: string; nota: string; items: Servicio[] }[] = [
  {
    categoria: 'Barbería',
    nota: 'Todos los cortes incluyen lavado y peinado.',
    items: [
      { nombre: 'Corte clásico', detalle: 'Tijera y máquina, a su medida', minutos: 45, precio: 45_000 },
      { nombre: 'Corte y barba', detalle: 'Corte completo y perfilado de barba', minutos: 70, precio: 65_000 },
      { nombre: 'Afeitado con navaja', detalle: 'Toalla caliente, espuma y bálsamo', minutos: 40, precio: 40_000 },
      { nombre: 'Perfilado de barba', detalle: 'Diseño, recorte y aceite', minutos: 25, precio: 25_000 },
      { nombre: 'Corte infantil', detalle: 'Menores de 12 años', minutos: 30, precio: 35_000 },
    ],
  },
  {
    categoria: 'Spa',
    nota: 'En la sala del fondo, con luz baja y sin afán.',
    items: [
      { nombre: 'Limpieza facial', detalle: 'Vapor, extracción y mascarilla', minutos: 50, precio: 70_000 },
      { nombre: 'Masaje de cuello y hombros', detalle: 'Aceite tibio, presión media', minutos: 30, precio: 55_000 },
      { nombre: 'Exfoliación facial', detalle: 'Piel lista para el afeitado', minutos: 25, precio: 40_000 },
      { nombre: 'Manicure', detalle: 'Limpieza, corte y lima', minutos: 35, precio: 30_000 },
    ],
  },
];

export const ritual = {
  nombre: 'El ritual Filo',
  detalle: 'Corte, afeitado con navaja, limpieza facial y un café de origen.',
  minutos: 120,
  precio: 140_000,
};

export const seo: SeoBase = {
  url: 'https://barberia.altair.lat',
  titulo: 'Filo Barbería & Spa — Chapinero Alto, Bogotá (demo)',
  descripcion:
    'Corte clásico, afeitado con navaja y spa en Chapinero Alto. Precios, horarios y reservas por WhatsApp. Sitio de demostración creado por Altair Studio.',
  locale: 'es_CO',
  ogImage: '/og.png',
};

export const demo = {
  texto: 'Sitio de demostración creado por Altair Studio',
  url: 'https://altair.lat',
};

export const mensajes = {
  general: 'Hola, Filo. Quiero reservar una cita.',
  reserva: (servicio: string, dia: string, hora: string) =>
    `Hola, Filo. Quiero reservar: ${servicio}. ${dia ? `Día: ${dia}.` : ''} ${hora ? `Hora: ${hora}.` : ''}`.replace(/\s+/g, ' ').trim(),
};

/** Créditos de las fotos (Unsplash License). */
export const creditos = [
  { foto: 'silla-ventana', autor: 'Ten', url: 'https://unsplash.com/photos/vintage-barber-chair-bathed-in-sunlight-near-doorway-4y50IXfnaIo' },
  { foto: 'afeitado', autor: 'Allef Vinicius', url: 'https://unsplash.com/photos/man-sitting-on-barbers-chair-IvQeAVeJULw' },
  { foto: 'salon', autor: 'Jason Leung', url: 'https://unsplash.com/photos/salon-interior-with-lighted-pendant-lamps-2seUdPQNy_I' },
  { foto: 'sillas-ladrillo', autor: 'Nathon Oski', url: 'https://unsplash.com/photos/black-leather-barber-chair-near-brown-brick-wall-EW_rqoSdDes' },
  { foto: 'tijera', autor: 'Nate Johnston', url: 'https://unsplash.com/photos/a-man-cutting-another-mans-hair-with-a-pair-of-scissors-tgPrIYnW3g4' },
  { foto: 'barba', autor: 'Antonio Reynoso', url: 'https://unsplash.com/photos/barber-shaves-mans-beard-with-straight-razor-1Ig9rw7aC5g' },
];
