/**
 * Movimiento de Filo: lento y pesado, como pasar las páginas de una revista.
 * - Portada: el titular entra por líneas y la foto se asienta (escala).
 * - Fotos: un velo color crema se recoge hacia arriba (cortina).
 * - Carta: los servicios entran uno a uno, en orden de lectura.
 * - Galería: en pantallas grandes se fija y avanza en horizontal con el scroll.
 */
import type { Motion } from '@altair/core/motion';
import { revealText } from '@altair/core/reveal';

const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

export function runPage(motion: Motion): void {
  const { gsap, reduced } = motion;
  if (reduced) return;

  // Portada
  const titulo = document.querySelector('[data-hero-title]');
  if (titulo) revealText(motion, titulo, { scroll: false, delay: 0.15, duracion: 1.3, stagger: 0.12, ease: 'power3.out' });
  gsap.timeline({ defaults: { ease: 'power2.out' } })
    .fromTo('[data-hero-img]', { scale: 1.12 }, { scale: 1, duration: 2.2, ease: 'power2.out' }, 0)
    .to('.portada [data-in]', { opacity: 1, duration: 1, stagger: 0.15 }, 0.5);

  // Cortinas
  $$('[data-cortina]').forEach((c) => {
    const velo = c.querySelector('.velo');
    const img = c.querySelector('img');
    const tl = gsap.timeline({ scrollTrigger: { trigger: c, start: 'top 80%', once: true } });
    if (velo) tl.to(velo, { scaleY: 0, duration: 1.4, ease: 'power3.inOut' }, 0);
    if (img) tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.8, ease: 'power2.out' }, 0);
  });

  // Carta: servicios uno a uno
  $$('.cat').forEach((cat) => {
    gsap.from($$('[data-item]', cat), {
      opacity: 0, y: 18, duration: 0.8, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: cat, start: 'top 78%', once: true },
    });
  });
  gsap.from('[data-ritual]', {
    opacity: 0, y: 30, duration: 1, ease: 'power2.out',
    scrollTrigger: { trigger: '[data-ritual]', start: 'top 85%', once: true },
  });

  // Galería horizontal fijada (solo pantallas anchas)
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    const gal = document.querySelector<HTMLElement>('[data-galeria]');
    const track = document.querySelector<HTMLElement>('[data-gal-track]');
    if (!gal || !track) return;
    const distancia = () => Math.max(0, track.scrollWidth - window.innerWidth);
    gsap.to(track, {
      x: () => -distancia(),
      ease: 'none',
      scrollTrigger: {
        trigger: gal,
        start: 'top top',
        end: () => `+=${distancia()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
  });
}
