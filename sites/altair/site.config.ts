/**
 * Datos editables de altair.lat. Todo lo que diga "PLACEHOLDER" debe
 * reemplazarse antes de publicar. Ningún componente tiene datos escritos a mano:
 * todo sale de aquí.
 */
import type { Contacto, SeoBase } from '@altair/core/types';

export const marca = {
  nombre: 'Altair Studio',
  nombreCorto: 'Altair',
  ciudad: 'Bogotá, Colombia',
};

export const contacto: Contacto = {
  whatsapp: '+57 300 000 0000', // PLACEHOLDER
  email: 'hola@altair.lat', // PLACEHOLDER (verificar que el buzón exista)
  instagram: '@altair.studio', // PLACEHOLDER
  ciudad: 'Bogotá, Colombia',
};

export const seo: SeoBase = {
  url: 'https://altair.lat',
  titulo: 'Altair Studio — Páginas web para comercios en Bogotá',
  descripcion:
    'Diseñamos y desarrollamos la página web de su negocio para que lo encuentren en Google y le escriban por WhatsApp. Planes desde $650.000 de lanzamiento.',
  locale: 'es_CO',
  ogImage: '/og.png',
};

/** Cupos con precio de lanzamiento. Cambie el número a mano cuando se ocupe uno. */
export const lanzamiento = {
  cuposRestantes: 5, // PLACEHOLDER
  cuposTotales: 10, // PLACEHOLDER
};

export interface Plan {
  id: string;
  nombre: string;
  tipo: string;
  resumen: string;
  incluye: string[];
  precioOficial: number;
  /** "Desde" antes del precio oficial. */
  desde?: boolean;
  precioLanzamiento: number | null;
  mensualidad: {
    oficial: number | null;
    lanzamiento: number | null;
    nota: string;
  };
}

export const planes: Plan[] = [
  {
    id: 'esencial',
    nombre: 'Esencial',
    tipo: 'Web estática · sin backend',
    resumen: 'Para que lo encuentren en Google y le escriban por WhatsApp desde el primer día.',
    incluye: [
      'Hasta 5 secciones',
      'Catálogo o menú',
      'Botones a WhatsApp e Instagram',
      'Mapa de Google con su ubicación',
      'Horarios de atención',
      'Diseño pensado para celular',
      'SEO básico',
      'Configuración de Google Business Profile',
    ],
    precioOficial: 1_200_000,
    precioLanzamiento: 650_000,
    mensualidad: { oficial: null, lanzamiento: null, nota: 'Sin mensualidad · pago único' },
  },
  {
    id: 'negocio',
    nombre: 'Negocio',
    tipo: 'Web con backend',
    resumen: 'Para el comercio que cambia precios, productos o fotos seguido y recibe citas.',
    incluye: [
      'Todo lo de Esencial',
      'Panel para editar productos, precios y fotos',
      'Formularios que se guardan',
      'Reservas o citas',
      'Estadísticas de visitas',
    ],
    precioOficial: 2_400_000,
    precioLanzamiento: 1_500_000,
    mensualidad: {
      oficial: 150_000,
      lanzamiento: 100_000,
      nota: 'Mensualidad de lanzamiento fija por 6 meses',
    },
  },
  {
    id: 'total',
    nombre: 'Total',
    tipo: 'Backend + pagos en línea',
    resumen: 'Para vender por internet: el cliente paga en la página y a usted le llega el pedido.',
    incluye: [
      'Todo lo de Negocio',
      'Tienda con pagos en línea',
      'Gestión de pedidos',
      'Inventario',
      'Correos de confirmación',
      'Chatbot con IA (opcional)',
    ],
    precioOficial: 4_500_000,
    desde: true,
    precioLanzamiento: null,
    mensualidad: { oficial: 250_000, lanzamiento: null, nota: 'Sin precio de lanzamiento' },
  },
];

/** Qué cubre la mensualidad (planes Negocio y Total). */
export const mensualidadCubre = [
  'Monitoreo para que la página no se caiga',
  'Arreglos de errores',
  'Actualizaciones de seguridad',
  'Copias de seguridad',
  'Soporte por WhatsApp',
  'Reporte mensual de visitas y mensajes',
];

export const costosTerceros =
  'El dominio, la base de datos y otros servicios de terceros se pagan a nombre del cliente, directamente al proveedor. Así todo queda de su propiedad.';

export interface Caso {
  nombre: string;
  tipo: string;
  descripcion: string;
  url: string;
  /** Archivo en src/assets/portfolio/ generado con `pnpm shots:portfolio`. */
  captura: string;
  real: boolean;
}

export const portafolio: Caso[] = [
  {
    nombre: 'ARKE',
    tipo: 'Tienda en línea · plan Total',
    descripcion: 'Tienda de camisetas con catálogo, carrito y pagos integrados.',
    url: 'https://arkei.co',
    captura: 'arke.png',
    real: true,
  },
  {
    nombre: 'Filo Barbería & Spa',
    tipo: 'Demo · plan Esencial',
    descripcion: 'Servicios con precios, galería, reservas por WhatsApp y ubicación.',
    url: 'https://barberia.altair.lat',
    captura: 'barberia.png',
    real: false,
  },
  {
    nombre: 'La Leñera',
    tipo: 'Demo · plan Esencial',
    descripcion: 'Carta por categorías, platos destacados y reservas por WhatsApp.',
    url: 'https://restaurante.altair.lat',
    captura: 'restaurante.png',
    real: false,
  },
];

/** Datos del responsable del tratamiento (Ley 1581 de 2012) y de los términos. */
export const legal = {
  responsable: 'NOMBRE COMPLETO DEL RESPONSABLE', // PLACEHOLDER
  tipoDocumento: 'C.C.', // PLACEHOLDER (C.C. o NIT)
  documento: '000.000.000', // PLACEHOLDER
  direccion: 'Dirección de notificación, Bogotá', // PLACEHOLDER
  emailDatos: 'datos@altair.lat', // PLACEHOLDER
  fechaActualizacion: '6 de noviembre de 2026',
  revisionesIncluidas: 2, // rondas de cambios incluidas en el precio
  garantiaDias: 30,
  valorHoraAdicional: 60_000, // PLACEHOLDER
};

/** Mensajes precargados de WhatsApp. */
export const mensajes = {
  general: 'Hola, Altair. Quiero una página web para mi negocio.',
  plan: (nombre: string) => `Hola, Altair. Me interesa el plan ${nombre}. ¿Me cuentan cómo empezamos?`,
};

/**
 * Datos reales de Altair (α Aquilae). Fuente: Wikipedia, "Altair",
 * valores J2000 consultados el 6 de noviembre de 2026.
 */
export const estrella = {
  designacion: 'α Aql',
  ar: '19h 50m 47s',
  dec: '+08° 52′ 06″',
  magnitud: '0,76',
  distanciaAl: '16,73',
  espectral: 'A7 Vn',
  rotacionHoras: '7,77',
  velocidadEcuatorial: '286',
  hip: 'HIP 97649',
  hd: 'HD 187642',
};
