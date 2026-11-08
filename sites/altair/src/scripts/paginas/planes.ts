/** Planes: cada precio baja del oficial al de lanzamiento y los cupos se encienden uno a uno. */
import type { Motion } from '@altair/core/motion';
import { cop } from '@altair/core/types';
import { $$, contar } from '../util';

export function planes(m: Motion) {
  if (m.reduced) return [];
  $$('[data-count-to]').forEach((el, i) => {
    // Los precios de arriba cuentan al cargar; el de la página personal, al llegar a él.
    const abajo = el.closest('#personales');
    contar(m, el, Number(el.dataset.countFrom), Number(el.dataset.countTo), cop,
      abajo ? { scrollTrigger: { trigger: el, start: 'top 85%', once: true } } : { delay: 0.5 + i * 0.12 });
  });
  m.gsap.from('[data-cupo]', { scale: 0, duration: 0.4, stagger: 0.06, ease: 'back.out(2)', delay: 0.4 });
  return [];
}
