/** Datos de contacto y negocio comunes a los tres sitios. */
export interface Contacto {
  /** Número en formato internacional legible, p. ej. "+57 300 000 0000". */
  whatsapp: string;
  email: string;
  /** Usuario de Instagram con @. */
  instagram: string;
  ciudad: string;
  direccion?: string;
}

export interface Horario {
  /** Texto visible, p. ej. "Lunes a viernes". */
  dias: string;
  /** Texto visible, p. ej. "9:00 a. m. – 7:00 p. m." */
  horas: string;
  /** Especificación schema.org opcional para LocalBusiness. */
  schema?: { dayOfWeek: string[]; opens: string; closes: string };
}

export interface Ubicacion {
  direccion: string;
  barrio: string;
  ciudad: string;
  region: string;
  codigoPostal?: string;
  pais: string;
  lat: number;
  lng: number;
}

export interface SeoBase {
  /** URL absoluta del sitio, sin barra final. */
  url: string;
  titulo: string;
  descripcion: string;
  locale: string;
  /** Ruta pública de la imagen Open Graph (1200×630). */
  ogImage: string;
}

/** Formatea pesos colombianos sin decimales: 650000 → "$650.000". */
export function cop(valor: number): string {
  return '$' + valor.toLocaleString('es-CO', { maximumFractionDigits: 0 });
}
