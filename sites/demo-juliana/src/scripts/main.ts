/**
 * Movimiento de Juliana: preciso y contenido, como pasar las láminas de un libro bien impreso.
 * - La retícula se traza de arriba abajo; la foto aparece como una lámina que se revela.
 * - La flecha de norte gira apenas con el scroll; una línea fina en la cabecera marca el avance.
 * - Las cifras cuentan hasta su valor; las láminas de proyectos se descubren de abajo arriba.
 * - La barra de escala se llena tramo a tramo con el scroll y los hitos aparecen al alcanzarlos.
 * - La estantería funciona siempre (también sin movimiento): filtrar y sacar libros.
 */
import type { Motion } from '@altair/core/motion';

const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

interface Libro { titulo: string; autor: string; anio: number; tema: string; nota: string }

/** Estantería: elegir un libro y filtrar por tema. No depende del movimiento. */
function estanteria(motion: Motion): void {
  const datos = document.getElementById('datos-libros');
  if (!datos) return;
  const libros: Libro[] = JSON.parse(datos.textContent || '[]');
  const lomos = $$<HTMLButtonElement>('[data-lomo]');
  const campo = (k: string) => document.querySelector<HTMLElement>(`[data-f-${k}]`);
  const ficha = document.querySelector<HTMLElement>('[data-ficha]');

  const elegir = (i: number) => {
    lomos.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
    const l = libros[i];
    const pintar = () => {
      campo('titulo')!.textContent = l.titulo; campo('autor')!.textContent = l.autor;
      campo('anio')!.textContent = String(l.anio); campo('tema')!.textContent = l.tema; campo('nota')!.textContent = l.nota;
    };
    if (motion.reduced || !ficha) return pintar();
    motion.gsap.timeline()
      .to(ficha, { opacity: 0, y: 8, duration: 0.18, ease: 'power1.in' })
      .add(pintar)
      .to(ficha, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });
  };
  lomos.forEach((b, i) => b.addEventListener('click', () => elegir(i)));

  const filtros = $$<HTMLButtonElement>('[data-filtro]');
  filtros.forEach((f) => f.addEventListener('click', () => {
    const tema = f.dataset.filtro!;
    filtros.forEach((x) => x.setAttribute('aria-pressed', String(x === f)));
    let primero = -1;
    $$('[data-lomo-li]').forEach((li, i) => {
      const ok = tema === 'Todos' || li.dataset.tema === tema;
      li.toggleAttribute('data-oculto', !ok);
      lomos[i].tabIndex = ok ? 0 : -1;
      if (ok && primero < 0) primero = i;
    });
    if (primero >= 0) elegir(primero);
  }));
}

export function runPage(motion: Motion): void {
  estanteria(motion);
  const { gsap, reduced } = motion;
  if (reduced) return;

  // Portada
  gsap.from('[data-linea]', { scaleY: 0, duration: 1.4, ease: 'power3.inOut', stagger: 0.05 });
  gsap.fromTo('.portada [data-up]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.5 });
  gsap.fromTo('[data-retrato] .lamina-img', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power3.inOut', delay: 0.3 });
  gsap.from('[data-retrato] img', { scale: 1.15, duration: 2, ease: 'power2.out', delay: 0.3 });
  gsap.from('.corte', { opacity: 0, scale: 0.4, duration: 0.6, ease: 'power2.out', stagger: 0.08, delay: 1.2 });
  gsap.to('[data-norte]', { rotate: 40, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1 } });
  gsap.to('[data-progreso]', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 } });

  // Cifras que cuentan
  $$('[data-contar]').forEach((el) => {
    const fin = Number(el.dataset.contar!.replace(/\./g, ''));
    const obj = { v: 0 };
    gsap.to(obj, {
      v: fin, duration: 1.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('es-CO'); },
    });
  });

  // Láminas que se descubren
  $$('[data-lamina]').forEach((f) => {
    const caja = f.querySelector('.proy-img'); const img = f.querySelector('img');
    const tl = gsap.timeline({ scrollTrigger: { trigger: f, start: 'top 80%', once: true } });
    tl.fromTo(caja, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.3, ease: 'power3.inOut' }, 0);
    if (img) tl.from(img, { scale: 1.18, duration: 1.8, ease: 'power2.out' }, 0);
  });

  // Barra de escala: tramos que se llenan con el scroll y hitos que aparecen
  gsap.matchMedia().add('(min-width: 1000px)', () => {
    const escala = document.querySelector('[data-escala]');
    if (!escala) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: escala, start: 'top 70%', end: 'bottom 60%', scrub: 0.8 } });
    tl.from('[data-tramo]', { scaleX: 0, transformOrigin: 'left', ease: 'none', stagger: 0.1, duration: 0.1 }, 0);
    $$('[data-hito]').forEach((h) => {
      const x = parseFloat(h.style.getPropertyValue('--x')) / 100;
      tl.from(h, { opacity: 0, y: h.classList.contains('hito--arriba') ? 14 : -14, duration: 0.12, ease: 'power2.out' }, x * 1.3);
    });
  });
  gsap.matchMedia().add('(max-width: 999px)', () => {
    $$('[data-hito]').forEach((h) => gsap.from(h, { opacity: 0, x: -16, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: h, start: 'top 88%', once: true } }));
  });

  // Estantería: los libros se acomodan uno a uno
  gsap.from('[data-lomo-li]', { y: 60, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.05, scrollTrigger: { trigger: '[data-estante]', start: 'top 80%', once: true } });

  // Resto de bloques
  $$('[data-up]').filter((el) => !el.closest('.portada')).forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });
}
