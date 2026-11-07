/** Planes: cada precio baja del oficial al de lanzamiento y los cupos se encienden uno a uno. */
import type { Motion } from '@altair/core/motion';
import { cop } from '@altair/core/types';
import { $$, contar } from '../util';

export function planes(m: Motion) {
  if (m.reduced) return [];
  $$('[data-count-to]').forEach((el, i) => {
    contar(m, el, Number(el.dataset.countFrom), Number(el.dataset.countTo), cop, { delay: 0.5 + i * 0.12 });
  });
  m.gsap.from('[data-cupo]', { scale: 0, duration: 0.4, stagger: 0.06, ease: 'back.out(2)', delay: 0.4 });
  return [];
}
