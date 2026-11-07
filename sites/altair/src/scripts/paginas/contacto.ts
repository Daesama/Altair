/**
 * Contacto: el visitante elige qué le interesa y el mensaje de WhatsApp se
 * arma solo (se ve en la burbuja y queda en el enlace).
 */
import type { Motion } from '@altair/core/motion';
import { waLink } from '@altair/core/whatsapp';
import { contacto as datos, mensajes } from '../../../site.config';
import { $, $$ } from '../util';

export function contacto(m: Motion) {
  const { gsap } = m;
  const limpiar: Array<() => void> = [];
  const burbuja = $('[data-msg]');
  const enlaces = $$<HTMLAnchorElement>('[data-msg-link]');
  const opciones = $$<HTMLInputElement>('[data-opcion]');
  const escritura = { n: 0 };

  const pintar = () => {
    const sel = opciones.find((o) => o.checked)?.value ?? '';
    const texto = sel ? mensajes.plan(sel) : mensajes.general;
    enlaces.forEach((a) => (a.href = waLink(datos.whatsapp, texto)));
    if (!burbuja) return;
    if (m.reduced) { burbuja.textContent = texto; return; }
    gsap.killTweensOf(escritura);
    escritura.n = 0;
    gsap.fromTo(burbuja, { scale: 0.96 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
    gsap.to(escritura, {
      n: texto.length,
      duration: Math.min(1.2, texto.length * 0.018),
      ease: 'none',
      onUpdate: () => { burbuja.textContent = texto.slice(0, Math.round(escritura.n)); },
    });
  };
  opciones.forEach((o) => {
    o.addEventListener('change', pintar);
    limpiar.push(() => o.removeEventListener('change', pintar));
  });
  return limpiar;
}
