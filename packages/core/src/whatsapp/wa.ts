/** Deja solo dígitos: "+57 300 000 0000" → "573000000000". */
export function waNumber(telefono: string): string {
  return telefono.replace(/\D/g, '');
}

/** Enlace wa.me con mensaje precargado. */
export function waLink(telefono: string, mensaje?: string): string {
  const base = `https://wa.me/${waNumber(telefono)}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

export function igLink(usuario: string): string {
  return `https://instagram.com/${usuario.replace(/^@/, '')}`;
}

export function mailLink(email: string, asunto?: string): string {
  return asunto ? `mailto:${email}?subject=${encodeURIComponent(asunto)}` : `mailto:${email}`;
}
