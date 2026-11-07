/**
 * Movimiento de La Leñera: rápido y con rebote, como un letrero que se cuelga.
 * - Letrero: las letras caen y rebotan; el sello de precio entra girando.
 * - Cinta de especiales: corre sin parar (se detiene al pasar el cursor).
 * - Platos: caen como sellos sobre la mesa al llegar.
 * - Carta: la pestaña de la categoría visible se marca sola.
 */
import type { Motion } from '@altair/core/motion';
import { revealText } from '@altair/core/reveal';

const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

export function runPage(motion: Motion): void {
  const { gsap, ScrollTrigger, reduced } = motion;

  // Pestañas activas de la carta (también con movimiento reducido: es navegación, no adorno).
  const tabs = new Map($$<HTMLAnchorElement>('[data-tab]').map((a) => [a.dataset.tab!, a]));
  const marcar = (id: string) => tabs.forEach((a, k) => a.setAttribute('aria-current', String(k === id)));
  $$('[data-cat]').forEach((cat) => {
    ScrollTrigger.create({
      trigger: cat,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (st) => st.isActive && marcar(cat.dataset.cat!),
    });
  });
  marcar([...tabs.keys()][0]);

  if (reduced) return;

  // Letrero
  const titulo = document.querySelector('[data-hero-title]');
  if (titulo) revealText(motion, titulo, { tipo: 'chars', scroll: false, delay: 0.1, duracion: 0.7, stagger: 0.04, ease: 'back.out(2.2)' });
  gsap.timeline({ defaults: { ease: 'back.out(1.8)' } })
    .to('.letrero-sec .cinta', { opacity: 1, duration: 0.3 }, 0)
    .from('.letrero-sec .cinta', { rotate: -16, scale: 0.6, duration: 0.6 }, 0)
    .fromTo('.letrero-sec [data-in]:not(.cinta)', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, 0.45)
    .from('[data-hero-foto] .hero-marco', { rotate: 10, y: 40, opacity: 0, duration: 0.8 }, 0.2)
    .from('[data-sello]', { scale: 0, rotate: -120, duration: 0.7 }, 0.75);

  // Cinta de especiales: avanza una mitad (dos copias iguales) y vuelve a empezar.
  const track = document.querySelector<HTMLElement>('[data-marquee]');
  if (track) {
    const loop = gsap.to(track, { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });
    track.addEventListener('pointerenter', () => loop.timeScale(0.2));
    track.addEventListener('pointerleave', () => loop.timeScale(1));
  }

  // Platos: caen como sellos
  $$('[data-plato]').forEach((p, i) => {
    gsap.from(p, {
      scale: 1.25, rotate: i % 2 ? 8 : -8, opacity: 0, duration: 0.55, ease: 'back.out(1.6)',
      scrollTrigger: { trigger: p, start: 'top 82%', once: true },
    });
  });

  // Fotos de la plaza
  $$('[data-polaroid]').forEach((f, i) => {
    gsap.from(f, {
      y: 80, rotate: i ? 14 : -12, opacity: 0, duration: 0.8, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: f, start: 'top 88%', once: true },
    });
  });

  // Filas de la carta
  $$('.cat').forEach((cat) => {
    gsap.from($$('.fila', cat), {
      opacity: 0, x: -14, duration: 0.4, stagger: 0.05, ease: 'power2.out',
      scrollTrigger: { trigger: cat, start: 'top 80%', once: true },
    });
  });
}
