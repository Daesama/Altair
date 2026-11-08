/**
 * Movimiento de altair.lat. Corre en cada página (el sitio usa View Transitions):
 * - Titulares con data-reveal: se revelan por líneas al entrar en pantalla.
 * - data-in: aparece al cargar la página, en orden de lectura.
 * - data-rise: los bloques suben al llegar a ellos, para separar uno del siguiente.
 * - data-tilt="4": la tarjeta se inclina con el mouse (grados máximos).
 * - data-magnetic: el botón se acerca al cursor (máximo uno o dos por pantalla).
 * Cada página suma lo suyo desde scripts/paginas según <main data-page>.
 * Solo se animan transform y opacity (los contadores cambian texto).
 */
import { enCadaPagina, type Motion } from '@altair/core/motion';
import { revealAll } from '@altair/core/reveal';
import { magnetic, tilt } from '@altair/core/pointer';
import { inicio } from './paginas/inicio';
import { planes } from './paginas/planes';
import { portafolio } from './paginas/portafolio';
import { proceso } from './paginas/proceso';
import { contacto } from './paginas/contacto';
import { personal } from './paginas/personal';

type Limpieza = () => void;
const paginas: Record<string, (m: Motion) => Limpieza[]> = { inicio, planes, portafolio, proceso, contacto, personal };

enCadaPagina((m) => {
  const { gsap, ScrollTrigger } = m;
  const main = document.querySelector<HTMLElement>('main')!;
  const $$ = (s: string) => [...main.querySelectorAll<HTMLElement>(s)];
  const limpiar: Limpieza[] = [];

  revealAll(m, main);
  $$('[data-tilt]').forEach((el) => limpiar.push(tilt(m, el, Number(el.dataset.tilt) || 4)));
  $$('[data-magnetic]').forEach((el) => limpiar.push(magnetic(m, el, 0.25)));

  if (!m.reduced) {
    const entrada = $$('[data-in]');
    if (entrada.length) gsap.fromTo(entrada, { y: 16 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, delay: 0.15, ease: 'power3.out' });
    ScrollTrigger.batch($$('[data-rise]'), {
      start: 'top 92%',
      once: true,
      onEnter: (lote) => gsap.fromTo(lote, { y: 36 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out', overwrite: true }),
    });
  }

  const pagina = paginas[main.dataset.page ?? ''];
  if (pagina) limpiar.push(...pagina(m));
  return limpiar;
});
