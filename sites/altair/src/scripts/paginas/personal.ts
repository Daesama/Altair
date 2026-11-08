/**
 * Páginas personales: cada mundo muestra su demo en vivo dentro de un marco.
 * - El iframe se carga al ancho de un computador (o de un celular en pantallas
 *   pequeñas) y se escala para caber en el marco.
 * - Con mouse, al pasar sobre un mundo la página de adentro se recorre sola;
 *   al salir vuelve arriba. Con movimiento reducido solo se escala.
 */
import type { Motion } from '@altair/core/motion';
import { finePointer } from '@altair/core/pointer';
import { $$ } from '../util';

export function personal(m: Motion) {
  const { gsap } = m;
  const limpiar: Array<() => void> = [];
  const mouse = finePointer();

  $$('[data-mundo]').forEach((mundo) => {
    const viva = mundo.querySelector<HTMLElement>('[data-viva]');
    const iframe = viva?.querySelector('iframe');
    if (!viva || !iframe) return;

    const escalar = () => {
      const base = innerWidth < 700 ? 390 : 1280;
      const s = viva.clientWidth / base;
      iframe.style.width = `${base}px`;
      iframe.style.height = `${Math.ceil(viva.clientHeight / s)}px`;
      viva.style.setProperty('--s', String(s));
    };
    escalar();
    const ro = new ResizeObserver(escalar);
    ro.observe(viva);
    limpiar.push(() => ro.disconnect());

    if (m.reduced || !mouse) return;
    // Recorrido automático dentro del iframe (mismo dominio).
    const pos = { y: 0 };
    const mover = () => { try { iframe.contentWindow?.scrollTo(0, pos.y); } catch { /* otro dominio: se ignora */ } };
    const fondo = () => {
      try { const d = iframe.contentDocument!.documentElement; return Math.max(0, d.scrollHeight * 0.55 - iframe.clientHeight); } catch { return 0; }
    };
    const entrar = () => gsap.to(pos, { y: fondo(), duration: 9, ease: 'sine.inOut', onUpdate: mover, overwrite: true });
    const salir = () => gsap.to(pos, { y: 0, duration: 1.4, ease: 'power3.out', onUpdate: mover, overwrite: true });
    mundo.addEventListener('pointerenter', entrar);
    mundo.addEventListener('pointerleave', salir);
    limpiar.push(() => {
      mundo.removeEventListener('pointerenter', entrar);
      mundo.removeEventListener('pointerleave', salir);
      gsap.killTweensOf(pos);
    });
  });
  return limpiar;
}
