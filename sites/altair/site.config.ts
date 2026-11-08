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
  whatsapp: '+57 301 753 6941',
  email: 'contacto@altair.lat',
  instagram: '@altairlat',
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
    precioLanzamiento: 2_900_000,
    mensualidad: {
      oficial: 250_000,
      lanzamiento: 180_000,
      nota: 'Mensualidad de lanzamiento fija por 6 meses',
    },
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
  /** Captura de celular (375 px de ancho, 2x) del mismo script. */
  capturaMovil: string;
  real: boolean;
}

export const portafolio: Caso[] = [
  {
    nombre: 'ARKE',
    tipo: 'Tienda en línea · plan Total',
    descripcion: 'Tienda de camisetas con catálogo, carrito y pagos integrados.',
    url: 'https://arkei.co',
    captura: 'arke.png',
    capturaMovil: 'arke-movil.png',
    real: true,
  },
  {
    nombre: 'Filo Barbería & Spa',
    tipo: 'Demo · plan Esencial',
    descripcion: 'Servicios con precios, galería, reservas por WhatsApp y ubicación.',
    url: 'https://altair.lat/demos/barberia/',
    captura: 'barberia.png',
    capturaMovil: 'barberia-movil.png',
    real: false,
  },
  {
    nombre: 'La Leñera',
    tipo: 'Demo · plan Esencial',
    descripcion: 'Carta por categorías, platos destacados y reservas por WhatsApp.',
    url: 'https://altair.lat/demos/restaurante/',
    captura: 'restaurante.png',
    capturaMovil: 'restaurante-movil.png',
    real: false,
  },
];

/** Datos del responsable del tratamiento (Ley 1581 de 2012) y de los términos. */
export const legal = {
  responsable: 'Daniel Esteban Sastoque Marin',
  tipoDocumento: 'C.C.',
  documento: '1.023.377.607',
  direccion: 'Dirección de notificación, Bogotá', // PLACEHOLDER
  emailDatos: 'contacto@altair.lat',
  fechaActualizacion: '6 de noviembre de 2026',
  revisionesIncluidas: 2, // rondas de cambios incluidas en el precio
  garantiaDias: 30,
  valorHoraAdicional: 60_000, // PLACEHOLDER
};

/** Cómo trabajamos (página /proceso y bloque del inicio). */
export const proceso = [
  {
    titulo: 'Hablamos',
    texto: 'Nos cuenta de su negocio por WhatsApp o en una llamada. Elegimos juntos el plan y le enviamos el alcance por escrito.',
    detalle: 'Paga el 50 % para reservar el cupo',
  },
  {
    titulo: 'Diseñamos',
    texto: 'Con sus textos, fotos, precios y horarios armamos la página, pensada primero para el celular.',
    detalle: 'Si no tiene textos, le proponemos unos',
  },
  {
    titulo: 'Revisa',
    texto: 'Le enviamos un enlace de prueba para que la vea en su celular y nos diga qué cambiar.',
    detalle: `${legal.revisionesIncluidas} rondas de cambios incluidas`,
  },
  {
    titulo: 'Publicamos',
    texto: 'La ponemos en su dominio, la conectamos con Google y le entregamos los accesos a su nombre.',
    detalle: `Paga el 50 % restante · ${legal.garantiaDias} días de garantía`,
  },
];

export const preguntas = [
  {
    p: '¿Necesito saber de tecnología?',
    r: 'No. Usted nos envía la información de su negocio y nosotros nos encargamos del diseño, el dominio y la publicación. Le explicamos todo por WhatsApp.',
  },
  {
    p: '¿Cuánto se demora?',
    r: 'Depende del plan y de qué tan rápido tengamos sus textos y fotos. Al empezar le damos una fecha de entrega por escrito.',
  },
  {
    p: '¿Cómo se paga?',
    r: 'El 50 % al iniciar, para reservar el cupo, y el otro 50 % cuando aprueba la página, antes de publicarla en su dominio.',
  },
  {
    p: '¿Cuántos cambios puedo pedir?',
    r: `El precio incluye ${legal.revisionesIncluidas} rondas de cambios. Lo que se pida después o fuera del plan se cobra por hora, con valor acordado antes.`,
  },
  {
    p: '¿El dominio y las cuentas quedan a mi nombre?',
    r: costosTerceros,
  },
  {
    p: '¿Necesito base de datos o pasarela de pagos?',
    r: 'Con el plan Esencial no: la página es estática y los clientes le escriben por WhatsApp. El plan Negocio incluye un panel para editar y recibir reservas, y el plan Total suma pagos en línea con una pasarela a su nombre.',
  },
  {
    p: '¿Qué pasa si algo falla después de publicar?',
    r: `Tiene ${legal.garantiaDias} días de garantía para corregir errores sin costo. En los planes Negocio y Total la mensualidad cubre monitoreo, arreglos y soporte por WhatsApp.`,
  },
];

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

/* ───── Páginas personales (línea en prueba, ver /personal) ───── */

export const personal = {
  precio: 400_000, // precio con descuento
  precioOficial: 600_000, // precio de antes, se muestra tachado
  renovacionAnual: 120_000, // PLACEHOLDER: dominio + cambios menores
  entregaDias: 7,
  rondasCambios: 2,
  incluye: [
    'Hasta 6 secciones: de nuestras ideas o las que usted invente',
    'Un diseño propio, con el estilo, los colores y el movimiento que le guste',
    'Dominio a su nombre el primer año (sunombre.com o .co)',
    'Se ve bien en celular y aparece en Google con su nombre',
    '2 rondas de cambios incluidas',
    'Botones a su correo, WhatsApp y redes',
  ],
  /** Ejemplos de secciones propias: muestran que la lista de ideas no es cerrada. */
  seccionesPropias: ['Mis recetas', 'Mi mascota', 'Mi banda', 'Mapa de mis viajes', 'Mi blog', 'Mis tatuajes', 'Mi colección', 'Lo que estoy aprendiendo'],
  secciones: [
    { t: 'Sobre mí', d: 'Quién es, de dónde viene y qué le mueve. Con su foto y su forma de hablar.' },
    { t: 'Hoja de vida', d: 'Experiencia, estudios y habilidades, más fácil de leer que un PDF.' },
    { t: 'Hobbies', d: 'Lo que hace cuando no trabaja: música, deporte, arte, viajes, cocina…' },
    { t: 'Metas', d: 'Lo que quiere lograr este año y los que vienen, con su avance.' },
    { t: 'Favoritos', d: 'Libros, canciones, lugares y películas que lo definen.' },
  ],
  /** Ejemplo profesional: va primero en /personal. */
  destacado: {
    titulo: 'Monografía', estilo: 'profesional', nombre: 'Juliana Ortega',
    descripcion: 'arquitecta y urbanista. Su página se lee como un libro bien impreso: capítulos numerados, láminas de proyectos, una trayectoria dibujada como barra de escala y la estantería de los libros que la formaron.',
    detalles: ['Sobria y elegante', 'Proyectos con ficha técnica', 'Libros que he leído'],
    cta: 'Abrir la monografía', url: '/demos/juliana/',
  },
  demos: [
    {
      mundo: 'papel', titulo: 'Fanzine', estilo: 'hecho a mano', nombre: 'Lucía Peña',
      descripcion: 'ilustradora. Su página es un fanzine de papel con cinta, sellos y stickers que se pueden arrastrar.',
      detalles: ['Stickers que se lanzan', 'Hoja de vida en boletas de cine', 'Metas tachadas a mano'],
      pie: 'lucía, versión web (se puede tocar)', cta: 'Entrar al fanzine', url: '/demos/lucia/',
    },
    {
      mundo: 'mar', titulo: 'Inmersión', estilo: 'scroll que bucea', nombre: 'Simón Arango',
      descripcion: 'biólogo marino. Su página es un buceo: el agua se oscurece al bajar y un profundímetro cuenta los metros.',
      detalles: ['Del cielo al abismo', 'Bitácora de buceo', 'Metas en un sonar'],
      pie: '', cta: 'Bajar al océano', url: '/demos/simon/',
    },
  ],
  pasos: [
    { t: 'Nos cuenta de usted', d: 'Llena un formulario corto con sus textos, fotos y gustos. Si prefiere, lo hacemos en una llamada.' },
    { t: 'Le mostramos la página', d: 'En unos días le enviamos un enlace privado para verla en su celular y pedir cambios.' },
    { t: 'La publicamos', d: 'Con su dominio, lista para poner en su hoja de vida, su LinkedIn o su Instagram.' },
  ],
  mensaje: 'Hola, Altair. Quiero mi página personal. ¿Me cuentan cómo empezamos?',
};
