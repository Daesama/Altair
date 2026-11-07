/**
 * Interacciones con el mouse (solo lógica, sin estilos). Todas:
 * - se activan solo con puntero fino y hover real, y sin movimiento reducido;
 * - animan únicamente `transform` con gsap.quickTo;
 * - devuelven una función que limpia los listeners (para View Transitions).
 */
import type { Motion } from './init';

type Cleanup = () => void;
const noop: Cleanup = () => {};

export const finePointer = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const activo = (m: Motion) => !m.reduced && finePointer();

/** El elemento se acerca al cursor. `fuerza` 0–1 (0,3 por defecto); úselo en 1 o 2 CTA por pantalla. */
export function magnetic(m: Motion, el: HTMLElement, fuerza = 0.3): Cleanup {
  if (!activo(m)) return noop;
  const { gsap } = m;
  const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
  const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
  const mover = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    x((e.clientX - r.left - r.width / 2) * fuerza);
    y((e.clientY - r.top - r.height / 2) * fuerza);
  };
  const soltar = () => { x(0); y(0); };
  el.addEventListener('pointermove', mover);
  el.addEventListener('pointerleave', soltar);
  return () => {
    el.removeEventListener('pointermove', mover);
    el.removeEventListener('pointerleave', soltar);
    gsap.set(el, { x: 0, y: 0 });
  };
}

/**
 * Inclinación 3D siguiendo el cursor. `max` en grados (6 por defecto).
 * Los hijos con `data-depth="0.5"` se desplazan en proporción (capas con profundidad).
 */
export function tilt(m: Motion, el: HTMLElement, max = 6, zona: HTMLElement = el): Cleanup {
  if (!activo(m)) return noop;
  const { gsap } = m;
  gsap.set(el, { transformPerspective: 900, transformStyle: 'preserve-3d' });
  const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' });
  const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });
  const capas = [...el.querySelectorAll<HTMLElement>('[data-depth]')].map((c) => ({
    d: Number(c.dataset.depth) || 0.3,
    x: gsap.quickTo(c, 'x', { duration: 0.7, ease: 'power3.out' }),
    y: gsap.quickTo(c, 'y', { duration: 0.7, ease: 'power3.out' }),
  }));
  const mover = (e: PointerEvent) => {
    const r = zona.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry(px * max * 2);
    rx(-py * max * 2);
    capas.forEach((c) => { c.x(px * 40 * c.d); c.y(py * 40 * c.d); });
  };
  const soltar = () => { rx(0); ry(0); capas.forEach((c) => { c.x(0); c.y(0); }); };
  zona.addEventListener('pointermove', mover);
  zona.addEventListener('pointerleave', soltar);
  return () => {
    zona.removeEventListener('pointermove', mover);
    zona.removeEventListener('pointerleave', soltar);
  };
}

/** Capas que se mueven con el cursor dentro de `zona`. Cada capa usa su `data-depth`. */
export function parallaxPointer(m: Motion, zona: HTMLElement): Cleanup {
  if (!activo(m)) return noop;
  const { gsap } = m;
  const capas = [...zona.querySelectorAll<HTMLElement>('[data-depth]')].map((c) => ({
    d: Number(c.dataset.depth) || 0.3,
    x: gsap.quickTo(c, 'x', { duration: 0.9, ease: 'power3.out' }),
    y: gsap.quickTo(c, 'y', { duration: 0.9, ease: 'power3.out' }),
  }));
  const mover = (e: PointerEvent) => {
    const r = zona.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    capas.forEach((c) => { c.x(px * 60 * c.d); c.y(py * 60 * c.d); });
  };
  const soltar = () => capas.forEach((c) => { c.x(0); c.y(0); });
  zona.addEventListener('pointermove', mover);
  zona.addEventListener('pointerleave', soltar);
  return () => {
    zona.removeEventListener('pointermove', mover);
    zona.removeEventListener('pointerleave', soltar);
  };
}

/** Agrupa limpiezas para llamarlas juntas al cambiar de página. */
export function limpiezas() {
  const lista: Cleanup[] = [];
  return {
    add: (c: Cleanup) => { lista.push(c); return c; },
    run: () => { lista.splice(0).forEach((c) => c()); },
  };
}
