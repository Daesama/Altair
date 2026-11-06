/**
 * Coreografía de altair.lat. Cada animación tiene un propósito:
 * - Entrada del hero: la grilla se dibuja y luego aparece el mensaje, en orden de lectura.
 * - Precios: el número baja del precio oficial al de lanzamiento (muestra el descuento).
 * - Cupos: la barra se llena para hacer visible cuántos quedan.
 * - Planes y casos: entran al llegar, para separar un bloque del siguiente.
 * Solo se animan transform y opacity (los contadores cambian texto).
 */
import type { Motion } from '@altair/core/motion';
import { revealText } from '@altair/core/reveal';
import { cop } from '@altair/core/types';

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

function contar(motion: Motion, el: HTMLElement, desde: number, hasta: number, formato: (n: number) => string, extra: gsap.TweenVars = {}) {
  const o = { v: desde };
  return motion.gsap.to(o, {
    v: hasta,
    duration: 1.4,
    ease: 'power3.out',
    onUpdate: () => { el.textContent = formato(Math.round(o.v)); },
    ...extra,
  });
}

export function runPage(motion: Motion): void {
  const { gsap, reduced } = motion;
  if (reduced) return;

  // ── Hero ─────────────────────────────────────────────
  const hero = $('.hero');
  if (hero) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const titulo = $('[data-hero-title]', hero);
    if (titulo) revealText(motion, titulo, { scroll: false, delay: 0.25, duracion: 1, stagger: 0.09 });

    tl.from('[data-gridline]', { scaleY: 0, duration: 1.1, stagger: 0.035, ease: 'expo.out' }, 0)
      .to('.hdr', { opacity: 1, duration: 0.5 }, 0.1)
      .from('.hdr', { yPercent: -100, duration: 0.6 }, 0.1)
      .to('.hero-top', { opacity: 1, duration: 0.5 }, 0.2);

    // Carta estelar: líneas que salen de su estrella, luego los puntos, al final Altair.
    const chart = $('.hero-star', hero);
    if (chart) {
      tl.to(chart, { opacity: 1, duration: 0.3 }, 0.5);
      $$<SVGLineElement>('[data-chart-line]', chart).forEach((l, i) => {
        tl.from(l, {
          scale: 0,
          svgOrigin: `${l.getAttribute('x1')} ${l.getAttribute('y1')}`,
          duration: 0.6,
          ease: 'power2.inOut',
        }, 0.6 + i * 0.07);
      });
      tl.from($$('[data-chart-star]', chart), { opacity: 0, duration: 0.4, stagger: 0.04 }, 0.6)
        .from('[data-chart-alfa]', { opacity: 0, scale: 1.8, transformOrigin: '50% 50%', duration: 0.8, ease: 'expo.out' }, 1.15)
        .from($$('.hero-dl > div', chart), { opacity: 0, x: -8, duration: 0.4, stagger: 0.06 }, 1.1);
    }

    tl.fromTo($$('.hero-lead, .hero-cta', hero), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.7)
      .fromTo($$('.hero-facts li', hero), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.9);

    const n = $('.hero-facts [data-count]', hero);
    if (n) tl.add(contar(motion, n, 0, Number(n.dataset.count), String, { duration: 1 }), 1);
  }

  // ── Planes ───────────────────────────────────────────
  const cupos = $('[data-cupos]');
  if (cupos) {
    const tl = gsap.timeline({ scrollTrigger: { trigger: cupos, start: 'top 80%', once: true } });
    tl.from($$('[data-cupo]', cupos), { scaleX: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' });
    const n = $('[data-count]', cupos);
    if (n) tl.add(contar(motion, n, Number(n.dataset.count) + 5, Number(n.dataset.count), String, { duration: 0.9 }), 0);
  }

  $$('[data-plan]').forEach((plan) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: plan, start: 'top 82%', once: true } });
    tl.from(plan, { y: 48, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .from($$('.plan-inc li', plan), { opacity: 0, x: -12, duration: 0.4, stagger: 0.04 }, 0.2);
    const precio = $('[data-price-to]', plan);
    if (precio) {
      tl.add(contar(motion, precio, Number(precio.dataset.priceFrom), Number(precio.dataset.priceTo), cop, { duration: 1.2 }), 0.3);
    }
  });

  // ── Portafolio ───────────────────────────────────────
  $$('[data-case]').forEach((c) => {
    gsap.from(c, { y: 56, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 85%', once: true } });
    const img = $('[data-parallax]', c);
    if (img) {
      gsap.fromTo(img, { yPercent: 0 }, {
        yPercent: -10.7,
        ease: 'none',
        scrollTrigger: { trigger: c, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }
  });
}
