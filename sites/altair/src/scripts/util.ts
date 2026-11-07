import type { Motion } from '@altair/core/motion';

export const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
export const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

/** Cuenta de `desde` a `hasta` cambiando el texto (precios: del oficial al de lanzamiento). */
export function contar(m: Motion, el: HTMLElement, desde: number, hasta: number, formato: (n: number) => string, extra: gsap.TweenVars = {}) {
  const o = { v: desde };
  el.textContent = formato(desde);
  return m.gsap.to(o, {
    v: hasta,
    duration: 1.4,
    ease: 'power3.out',
    onUpdate: () => { el.textContent = formato(Math.round(o.v / 1000) * 1000); },
    ...extra,
  });
}
