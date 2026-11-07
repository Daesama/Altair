/**
 * Portafolio: la captura de celular hace scroll dentro del marco.
 * Con mouse, al pasar sobre el caso; en pantallas táctiles, al ritmo del scroll.
 */
import type { Motion } from '@altair/core/motion';
import { finePointer, tilt } from '@altair/core/pointer';
import { $, $$ } from '../util';

export function portafolio(m: Motion) {
  const { gsap } = m;
  const limpiar: Array<() => void> = [];
  if (m.reduced) return limpiar;
  const mouse = finePointer();

  $$('[data-caso]').forEach((caso) => {
    const marco = $('[data-pantalla]', caso);
    const img = marco ? $('img', marco) : null;
    const escena = $('[data-escena]', caso);
    if (escena) limpiar.push(tilt(m, escena, 4, caso));
    if (!marco || !img) return;
    const recorrido = () => -Math.max(0, img.offsetHeight - marco.offsetHeight);

    if (!mouse) {
      gsap.fromTo(img, { y: 0 }, {
        y: recorrido, ease: 'none',
        scrollTrigger: { trigger: caso, start: 'top 75%', end: 'bottom 25%', scrub: 0.6, invalidateOnRefresh: true },
      });
      return;
    }
    const entrar = () => gsap.to(img, { y: recorrido(), duration: 5, ease: 'power1.inOut', overwrite: true });
    const salir = () => gsap.to(img, { y: 0, duration: 1.2, ease: 'power3.out', overwrite: true });
    caso.addEventListener('pointerenter', entrar);
    caso.addEventListener('pointerleave', salir);
    limpiar.push(() => {
      caso.removeEventListener('pointerenter', entrar);
      caso.removeEventListener('pointerleave', salir);
    });
  });
  return limpiar;
}
