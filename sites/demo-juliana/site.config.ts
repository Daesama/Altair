/**
 * Contenido de la demo personal «Juliana Ortega». Persona ficticia.
 * Mundo: la monografía de una arquitecta. Sobrio, editorial, con detalles de plano.
 * Los libros son reales; las reseñas son de la persona ficticia.
 */

export const persona = {
  nombre: 'Juliana Ortega',
  nombreCorto: 'Juliana',
  oficio: 'Arquitecta y urbanista',
  ciudad: 'Bogotá',
  tesis: 'Diseño espacios públicos donde la gente quiere quedarse.',
  intro: 'Doce años proyectando plazas, bibliotecas y vivienda en ciudades colombianas. Socia fundadora de Taller Ortega y profesora de proyectos urbanos.',
};

export const contacto = {
  email: 'juliana@tallerortega.demo',
  whatsapp: '+57 300 000 0000', // PLACEHOLDER: número ficticio de la demo
  linkedin: 'https://www.linkedin.com/',
  estudio: 'Taller Ortega · Chapinero, Bogotá',
};

/** Rótulo de plano de la portada. */
export const rotulo = [
  { k: 'Proyecto', v: 'Hoja de vida' },
  { k: 'Autora', v: 'Juliana Ortega' },
  { k: 'Lugar', v: 'Bogotá, CO' },
  { k: 'Escala', v: '1 : 1' },
  { k: 'Revisión', v: 'Nov. 2026' },
];

export const perfil = {
  parrafos: [
    'Estudié arquitectura porque me gustaban los edificios y terminé dedicada a lo que pasa entre ellos: las aceras, las plazas, las esquinas donde alguien se sienta a esperar. Creo que una ciudad se mide por cómo trata a quien camina despacio.',
    'En Taller Ortega trabajamos con alcaldías, fundaciones y constructoras. Cada proyecto empieza igual: semanas en el lugar, hablando con quienes lo usan, antes de dibujar una sola línea.',
  ],
  notas: [
    'Magíster en Diseño Urbano, Universidad Politécnica de Cataluña.',
    'Premio de la Bienal Colombiana de Arquitectura, categoría espacio público.',
  ],
  cifras: [
    { n: '12', t: 'años de práctica' },
    { n: '38', t: 'proyectos construidos' },
    { n: '140.000', t: 'm² de espacio público' },
  ],
};

export const proyectos = [
  {
    foto: 'centro-cultural', titulo: 'Centro Cultural El Retiro', lugar: 'Usaquén, Bogotá', anio: '2024',
    area: '4.200 m²', rol: 'Arquitecta principal', estado: 'Construido',
    texto: 'Un edificio que se abre a la plaza: la planta baja es pública y el teatro se ve desde la calle. Lo visitan 1.500 personas por semana.',
  },
  {
    foto: 'vivienda', titulo: 'Vivienda Los Almendros', lugar: 'Bosa, Bogotá', anio: '2022',
    area: '18.600 m²', rol: 'Directora de diseño', estado: 'Construido',
    texto: '320 apartamentos de vivienda social con patios compartidos y balcones que dan sombra. Ningún apartamento sin ventilación cruzada.',
  },
  {
    foto: 'casa', titulo: 'Casa del Árbol', lugar: 'La Calera, Cundinamarca', anio: '2025',
    area: '310 m²', rol: 'Arquitecta', estado: 'Construido',
    texto: 'Una casa organizada alrededor de un cedro de sesenta años. No se cortó ninguna rama; la casa se dobló para no tocarlo.',
  },
];

/** Trayectoria: se dibuja como la barra de escala de un plano. */
export const trayectoria = {
  desde: 2012,
  hasta: 2026,
  hitos: [
    { anio: 2012, titulo: 'Arquitecta', lugar: 'Universidad Nacional de Colombia', tipo: 'estudio' },
    { anio: 2014, titulo: 'Arquitecta de proyectos', lugar: 'Oficina de espacio público, Medellín', tipo: 'trabajo' },
    { anio: 2017, titulo: 'Magíster en Diseño Urbano', lugar: 'UPC, Barcelona', tipo: 'estudio' },
    { anio: 2019, titulo: 'Funda Taller Ortega', lugar: 'Bogotá', tipo: 'trabajo' },
    { anio: 2021, titulo: 'Profesora de proyectos urbanos', lugar: 'Universidad de los Andes', tipo: 'docencia' },
    { anio: 2024, titulo: 'Premio Bienal de Arquitectura', lugar: 'Espacio público', tipo: 'premio' },
  ],
};

/** Estantería: libros reales, reseña breve de la persona. Colores de tela sobrios. */
export const libros = [
  { titulo: 'Muerte y vida de las grandes ciudades', autor: 'Jane Jacobs', anio: 2013, tema: 'Ciudad', tela: 'vino', alto: 96, nota: 'El libro que me cambió la carrera. Me enseñó a mirar la acera antes que el edificio.' },
  { titulo: 'Ciudades para la gente', autor: 'Jan Gehl', anio: 2015, tema: 'Ciudad', tela: 'pino', alto: 88, nota: 'Lo tengo subrayado entero. Medir cuánta gente se queda en una plaza es medir si funciona.' },
  { titulo: 'Los ojos de la piel', autor: 'Juhani Pallasmaa', anio: 2016, tema: 'Arquitectura', tela: 'arena', alto: 78, nota: 'La arquitectura también se toca, se escucha y se huele. Lo releo antes de cada proyecto.' },
  { titulo: 'Pensar la arquitectura', autor: 'Peter Zumthor', anio: 2017, tema: 'Arquitectura', tela: 'grafito', alto: 74, nota: 'Corto y lento. Habla de materiales como si fueran personas.' },
  { titulo: 'Elogio de la sombra', autor: 'Junichirō Tanizaki', anio: 2018, tema: 'Arquitectura', tela: 'tinta', alto: 70, nota: 'Me convenció de que la luz perfecta no existe: lo bonito también está en la penumbra.' },
  { titulo: 'Las ciudades invisibles', autor: 'Italo Calvino', anio: 2019, tema: 'Literatura', tela: 'mostaza', alto: 84, nota: 'Ninguna ciudad es una sola. Se lo regalo a cada estudiante que termina conmigo.' },
  { titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 2010, tema: 'Literatura', tela: 'vino', alto: 92, nota: 'Macondo es el mejor plan urbano jamás escrito: crece, se inunda, se olvida.' },
  { titulo: 'El olvido que seremos', autor: 'Héctor Abad Faciolince', anio: 2021, tema: 'Literatura', tela: 'pino', alto: 82, nota: 'Medellín contada desde una casa. Me recordó por qué hago lo que hago.' },
  { titulo: 'Aprendiendo de Las Vegas', autor: 'Robert Venturi y Denise Scott Brown', anio: 2014, tema: 'Arquitectura', tela: 'arena', alto: 100, nota: 'Me enseñó a no despreciar la ciudad que la gente construye sin arquitectos.' },
  { titulo: 'La imagen de la ciudad', autor: 'Kevin Lynch', anio: 2012, tema: 'Ciudad', tela: 'grafito', alto: 86, nota: 'Bordes, sendas, nodos, hitos. Mi primer vocabulario para leer una ciudad.' },
] as const;

export const principios = [
  { n: '01', t: 'Primero el lugar', d: 'Antes de dibujar paso semanas en el sitio: a qué hora llega la sombra, por dónde cruza la gente, dónde se sientan los vendedores.' },
  { n: '02', t: 'Con quien lo va a usar', d: 'Cada proyecto tiene talleres con vecinos. No para validar una idea, sino para encontrarla.' },
  { n: '03', t: 'Que dure y que envejezca bien', d: 'Materiales locales, mantenimiento sencillo y espacios que aguanten usos que todavía no imaginamos.' },
];

export const reconocimientos = [
  { anio: '2024', t: 'Premio Bienal Colombiana de Arquitectura', d: 'Espacio público · Centro Cultural El Retiro' },
  { anio: '2023', t: 'Jurado, Concurso Nacional de Vivienda Social', d: 'Sociedad Colombiana de Arquitectos' },
  { anio: '2022', t: 'Charla «La ciudad que camina despacio»', d: 'Foro Urbano, Medellín' },
  { anio: '2020', t: 'Mención de honor, Premio Corona Pro Hábitat', d: 'Vivienda Los Almendros' },
];

export const seo = {
  url: 'https://altair.lat/demos/juliana',
  titulo: 'Juliana Ortega — Arquitecta y urbanista en Bogotá (demo)',
  descripcion:
    'Juliana Ortega, arquitecta y urbanista: proyectos, trayectoria, los libros que la formaron y cómo trabaja. Persona ficticia, demo de Altair Studio.',
  ogImage: '/demos/juliana/og.png',
};

export const demo = { texto: 'Persona ficticia · página personal de demostración creada por Altair Studio', url: '/' };
export const creditos = 'Fotos de Unsplash (licencia Unsplash).';
