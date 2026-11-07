/**
 * Inicio: el celular muestra cómo llega un cliente (Google → página → WhatsApp)
 * en bucle; los botones de pasos saltan a cada momento. El precio del bloque de
 * planes baja del oficial al de lanzamiento al aparecer.
 */
import type { Motion } from '@altair/core/motion';
import { revealText } from '@altair/core/reveal';
import { parallaxPointer, tilt } from '@altair/core/pointer';
import { cop } from '@altair/core/types';
import { $, $$, contar } from '../util';

const DUR = [3.4, 3.4, 3.8];

export function inicio(m: Motion) {
  const { gsap } = m;
  const limpiar: Array<() => void> = [];

  const titulo = $('[data-hero-title]');
  if (titulo) revealText(m, titulo, { scroll: false, delay: 0.1, stagger: 0.08 });

  const stage = $('[data-stage]');
  const phone = $('[data-phone]');
  if (stage && phone) limpiar.push(tilt(m, phone, 8, stage), parallaxPointer(m, stage));

  // Recorrido en el celular.
  const scr = $$('[data-scr]');
  const pasos = $$<HTMLButtonElement>('[data-step]');
  const prog = $$('[data-prog]');
  const typed = $('[data-typed]');
  const consulta = typed?.textContent ?? '';
  const burbujas = $$('[data-b]');
  let tl: gsap.core.Timeline | null = null;
  let vivo = true;

  const correr = (i: number) => {
    if (!vivo) return;
    tl?.kill();
    scr.forEach((s, k) => gsap.set(s, { autoAlpha: k === i ? 1 : 0 }));
    pasos.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
    if (m.reduced) {
      prog.forEach((p, k) => gsap.set(p, { scaleX: k <= i ? 1 : 0 }));
      return;
    }
    prog.forEach((p, k) => gsap.set(p, { scaleX: k < i ? 1 : 0 }));
    tl = gsap.timeline({ onComplete: () => correr((i + 1) % 3) });
    tl.to(prog[i], { scaleX: 1, duration: DUR[i], ease: 'none' }, 0);
    if (i === 0 && typed) {
      const o = { n: 0 };
      typed.textContent = '';
      tl.to(o, { n: consulta.length, duration: 1.2, ease: 'none', onUpdate: () => { typed.textContent = consulta.slice(0, Math.round(o.n)); } }, 0.2)
        .from('[data-gcard]', { y: 14, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out' }, 1.4)
        .to('[data-gbtn]', { scale: 0.92, duration: 0.15, yoyo: true, repeat: 1 }, 2.8);
    }
    if (i === 1) {
      const img = $('[data-wimg]');
      const marco = img?.parentElement;
      const recorrido = img && marco ? Math.max(0, img.offsetHeight - marco.offsetHeight) * 0.55 : 0;
      tl.fromTo(img, { y: 0 }, { y: -recorrido, duration: DUR[1] - 0.4, ease: 'power1.inOut' }, 0.3);
    }
    if (i === 2) {
      gsap.set(burbujas, { autoAlpha: 0, y: 10, display: '' });
      tl.to(burbujas[0], { autoAlpha: 1, y: 0, duration: 0.35 }, 0.3)
        .to(burbujas[1], { autoAlpha: 1, y: 0, duration: 0.3 }, 1.0)
        .to(burbujas[1], { autoAlpha: 0, duration: 0.2 }, 2.0)
        .set(burbujas[1], { display: 'none' }, 2.2)
        .to(burbujas[2], { autoAlpha: 1, y: 0, duration: 0.35 }, 2.2);
    }
  };
  pasos.forEach((b, k) => {
    const f = () => correr(k);
    b.addEventListener('click', f);
    limpiar.push(() => b.removeEventListener('click', f));
  });
  correr(0);
  limpiar.push(() => { vivo = false; tl?.kill(); });

  if (!m.reduced) {
    if (phone) gsap.from(phone, { y: 60, rotationX: 18, opacity: 0, duration: 1.2, ease: 'expo.out', delay: 0.2 });
    gsap.from('[data-float]', { scale: 0.6, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.8)', delay: 0.8 });
    const precio = $('[data-count-to]');
    if (precio) {
      contar(m, precio, Number(precio.dataset.countFrom), Number(precio.dataset.countTo), cop, {
        scrollTrigger: { trigger: precio, start: 'top 90%', once: true },
      });
    }
  }
  return limpiar;
}
