/**
 * Movimiento de Lucía: nervioso, físico y hecho a mano. Nada se desliza suave:
 * - Las letras del nombre caen como recortes y rebotan al pegarse.
 * - Stickers y polaroids se arrastran y se lanzan (con inercia); al soltarlos giran un poco.
 * - Los sellos se estampan de golpe; los chulos y tachones se dibujan a mano.
 * - El resaltador amarillo pasa por las frases clave de la carta.
 * Con movimiento reducido no corre nada: todo queda quieto y legible.
 */
import type { Motion } from '@altair/core/motion';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

export function runPage(motion: Motion): void {
  const { gsap, reduced } = motion;
  if (reduced) return;
  gsap.registerPlugin(Draggable, InertiaPlugin, DrawSVGPlugin);

  // Portada: recortes que caen y se pegan
  gsap.from('[data-letra]', {
    y: -120, rotate: () => gsap.utils.random(-40, 40), opacity: 0,
    duration: 0.7, ease: 'back.out(2.2)', stagger: { each: 0.06, from: 'random' }, delay: 0.1,
  });
  gsap.to('.hero [data-up]', { opacity: 1, duration: 0.01, stagger: 0.12, delay: 0.5 });
  gsap.from('.hero [data-up]', { y: 30, rotate: () => gsap.utils.random(-6, 6), duration: 0.6, ease: 'back.out(1.8)', stagger: 0.12, delay: 0.5 });
  gsap.from('[data-sticker]', { scale: 0, rotate: -90, duration: 0.6, ease: 'back.out(2.5)', stagger: 0.1, delay: 1 });

  // Letras que tiemblan al pasar el mouse
  $$('[data-letra]').forEach((l) => {
    const r = parseFloat(l.style.getPropertyValue('--r')) || 0;
    l.addEventListener('pointerenter', () => {
      gsap.to(l, { keyframes: { rotate: [r - 12, r + 9, r - 5, r] }, duration: 0.36, ease: 'steps(4)', overwrite: true });
    });
  });

  // Arrastrar y lanzar
  const soltar = (el: HTMLElement) => gsap.to(el, { rotate: gsap.utils.random(-14, 14), duration: 0.4, ease: 'back.out(3)' });
  const arrastrables = (sel: string, bounds: string | HTMLElement) => Draggable.create(sel, {
    bounds, inertia: true, edgeResistance: 0.75, zIndexBoost: true,
    onPress() { gsap.to(this.target, { scale: 1.08, duration: 0.15 }); },
    onRelease() { gsap.to(this.target, { scale: 1, duration: 0.25 }); soltar(this.target); },
  });
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) arrastrables('[data-sticker]', hero);

  gsap.matchMedia().add('(min-width: 900px) and (pointer: fine)', () => {
    const mesa = document.querySelector<HTMLElement>('[data-mesa]');
    if (!mesa) return;
    // Las fotos caen sobre la mesa
    gsap.from('[data-polaroid]', {
      y: -260, rotate: () => gsap.utils.random(-50, 50), opacity: 0, duration: 0.9, ease: 'bounce.out', stagger: 0.15,
      scrollTrigger: { trigger: mesa, start: 'top 75%', once: true },
    });
    const d = arrastrables('[data-polaroid]', mesa);
    return () => d.forEach((x) => x.kill());
  });

  // Resaltador
  $$('[data-marca]').forEach((m) => {
    gsap.fromTo(m, { '--m': '0%' }, { '--m': '100%', duration: 0.9, ease: 'power2.inOut', scrollTrigger: { trigger: m, start: 'top 85%', once: true } });
  });

  // Sellos que se estampan
  $$('[data-slam]').forEach((s) => {
    gsap.from(s, { scale: 2.6, opacity: 0, duration: 0.35, ease: 'power4.in', scrollTrigger: { trigger: s, start: 'top 88%', once: true },
      onComplete: () => { gsap.fromTo(s, { x: -3 }, { x: 0, duration: 0.25, ease: 'elastic.out(4, 0.3)' }); } });
  });

  // Boletas: salen de la taquilla una por una
  gsap.from('[data-boleta]', {
    x: (i) => (i % 2 ? 200 : -200), rotate: (i) => (i % 2 ? 12 : -12), opacity: 0, duration: 0.8, ease: 'back.out(1.4)', stagger: 0.18,
    scrollTrigger: { trigger: '.boletas', start: 'top 78%', once: true },
  });

  // Chulos y tachones dibujados a mano
  $$('[data-meta]').forEach((m, i) => {
    const trazos = $$<SVGPathElement>('[data-trazo]', m);
    const tl = gsap.timeline({ scrollTrigger: { trigger: m, start: 'top 85%', once: true }, delay: i * 0.08 });
    tl.from(m, { x: -24, opacity: 0, duration: 0.4, ease: 'power2.out' });
    if (trazos.length) tl.from(trazos, { drawSVG: '0%', duration: 0.4, ease: 'power1.inOut' });
    const tache = m.querySelector('[data-tache]');
    if (tache) tl.fromTo(tache, { '--t': '0%' }, { '--t': '100%', duration: 0.5, ease: 'power1.in' });
  });

  // Resto de bloques: entran de lado, con giro
  $$('[data-up]').filter((el) => !el.closest('.hero')).forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 60 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.6)',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
  gsap.from('.fav', { scale: 0, rotate: 180, duration: 0.6, ease: 'back.out(1.8)', stagger: 0.1, scrollTrigger: { trigger: '.favs', start: 'top 82%', once: true } });
}
