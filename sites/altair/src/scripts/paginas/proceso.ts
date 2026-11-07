/** Proceso: la línea de pasos se dibuja en orden; las respuestas aparecen al abrirlas. */
import type { Motion } from '@altair/core/motion';
import { $$ } from '../util';

export function proceso(m: Motion) {
  const { gsap } = m;
  const limpiar: Array<() => void> = [];
  if (m.reduced) return limpiar;

  gsap.from('[data-linea]', { scaleX: 0, duration: 0.7, ease: 'power2.inOut', delay: 0.5, stagger: 0.3 });
  gsap.from('[data-paso-n]', { scale: 0.4, opacity: 0, duration: 0.6, ease: 'back.out(2)', delay: 0.35, stagger: 0.3 });

  $$<HTMLDetailsElement>('[data-faq]').forEach((d) => {
    const r = d.querySelector('[data-faq-r]');
    const abrir = () => {
      if (d.open && r) gsap.fromTo(r, { y: -6, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' });
    };
    d.addEventListener('toggle', abrir);
    limpiar.push(() => d.removeEventListener('toggle', abrir));
  });
  return limpiar;
}
