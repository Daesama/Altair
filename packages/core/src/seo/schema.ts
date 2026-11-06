import type { Contacto, Horario, Ubicacion } from '../types';
import { igLink, waNumber } from '../whatsapp/wa';

interface LocalBusinessInput {
  tipo: 'LocalBusiness' | 'HairSalon' | 'BeautySalon' | 'DaySpa' | 'Restaurant' | 'ProfessionalService';
  nombre: string;
  descripcion: string;
  url: string;
  imagen: string;
  contacto: Contacto;
  ubicacion: Ubicacion;
  horarios?: Horario[];
  rangoPrecios?: string;
  extra?: Record<string, unknown>;
}

/** Construye el JSON-LD schema.org de un negocio local. */
export function localBusiness(i: LocalBusinessInput): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': i.tipo,
    name: i.nombre,
    description: i.descripcion,
    url: i.url,
    image: new URL(i.imagen, i.url).href,
    telephone: '+' + waNumber(i.contacto.whatsapp),
    email: i.contacto.email,
    sameAs: [igLink(i.contacto.instagram)],
    priceRange: i.rangoPrecios,
    address: {
      '@type': 'PostalAddress',
      streetAddress: i.ubicacion.direccion,
      addressLocality: i.ubicacion.ciudad,
      addressRegion: i.ubicacion.region,
      postalCode: i.ubicacion.codigoPostal,
      addressCountry: i.ubicacion.pais,
    },
    geo: { '@type': 'GeoCoordinates', latitude: i.ubicacion.lat, longitude: i.ubicacion.lng },
    openingHoursSpecification: i.horarios
      ?.filter((h) => h.schema)
      .map((h) => ({ '@type': 'OpeningHoursSpecification', ...h.schema })),
    ...i.extra,
  };
}
