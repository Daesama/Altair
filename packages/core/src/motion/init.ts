/**
 * Inicializa GSAP + ScrollTrigger + Lenis sincronizados.
 *
 * - Con `prefers-reduced-motion: reduce` no se crea Lenis (scroll nativo) y
 *   `reduced` vuelve en true para que cada sitio omita animaciones grandes.
 * - Lenis lo mueve el ticker de GSAP, así ScrollTrigger y el scroll suave
 *   comparten un solo requestAnimationFrame.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export interface Motion {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  lenis: Lenis | null;
  reduced: boolean;
}

let instancia: Motion | null = null;

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initMotion(opciones: { lenis?: ConstructorParameters<typeof Lenis>[0] } = {}): Motion {
  if (instancia) return instancia;

  gsap.registerPlugin(ScrollTrigger);
  const reduced = prefersReducedMotion();
  document.documentElement.toggleAttribute('data-reduced-motion', reduced);

  let lenis: Lenis | null = null;
  if (!reduced) {
    lenis = new Lenis({ anchors: true, ...opciones.lenis });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis!.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Reajusta los disparadores cuando terminan de cargar las fuentes.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  instancia = { gsap, ScrollTrigger, lenis, reduced };
  return instancia;
}

/** Detiene/reanuda el scroll suave (p. ej. al abrir un menú). */
export function setScrollLock(bloquear: boolean): void {
  if (!instancia?.lenis) {
    document.documentElement.style.overflow = bloquear ? 'hidden' : '';
    return;
  }
  bloquear ? instancia.lenis.stop() : instancia.lenis.start();
}

type Limpieza = () => void;

/**
 * Para sitios con View Transitions de Astro (<ClientRouter />): corre `montar`
 * en cada página (también en la primera) y, antes de cambiar de página, mata
 * sus animaciones, ScrollTriggers y efectos de puntero. Lenis se crea una sola vez.
 *
 * `montar` corre dentro de un gsap.context: todo lo que cree con gsap queda
 * registrado. Puede devolver funciones de limpieza propias (listeners, etc.).
 */
export function enCadaPagina(montar: (m: Motion) => void | Limpieza | Limpieza[]): void {
  const m = initMotion();
  let ctx: gsap.Context | null = null;
  let propias: Limpieza[] = [];

  document.addEventListener('astro:page-load', () => {
    // Sincroniza Lenis con el scroll que dejó el enrutador (arriba o el restaurado al volver).
    m.lenis?.resize();
    m.lenis?.scrollTo(window.scrollY, { immediate: true, force: true });
    setScrollLock(false);
    ctx = gsap.context(() => {
      const r = montar(m);
      propias = r ? [r].flat() : [];
    });
    ScrollTrigger.refresh();
  });

  document.addEventListener('astro:before-swap', () => {
    propias.splice(0).forEach((f) => f());
    // kill() sin revertir: la página vieja ya está capturada para la transición.
    ctx?.kill();
    ctx = null;
    ScrollTrigger.getAll().forEach((t) => t.kill());
  });
}

export { gsap, ScrollTrigger };
