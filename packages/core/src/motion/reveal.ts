/**
 * Revelado de titulares por líneas, palabras o caracteres al entrar en pantalla.
 * Solo anima `transform` y `opacity`. Con movimiento reducido no hace nada
 * (el texto queda visible tal cual).
 */
import { SplitText } from 'gsap/SplitText';
import type { Motion } from './init';

export interface RevealOpciones {
  tipo?: 'lines' | 'words' | 'chars';
  stagger?: number;
  duracion?: number;
  ease?: string;
  /** Inicio del ScrollTrigger. */
  start?: string;
  /** Si es false, no usa ScrollTrigger: anima al cargar, tras `delay` segundos. */
  scroll?: boolean;
  delay?: number;
}

/**
 * Divide y revela un elemento. La división puede esperar a que carguen las fuentes
 * (autoSplit), por eso no se devuelve la animación: use `delay` para coordinarla.
 */
export function revealText(motion: Motion, el: Element, o: RevealOpciones = {}): void {
  const mostrar = () => { (el as HTMLElement).style.visibility = 'visible'; };
  if (motion.reduced) return mostrar();
  const { gsap } = motion;
  gsap.registerPlugin(SplitText);
  const tipo = o.tipo ?? 'lines';

  SplitText.create(el, {
    type: tipo === 'chars' ? 'lines, chars' : tipo === 'words' ? 'lines, words' : 'lines',
    mask: 'lines',
    autoSplit: true,
    aria: 'auto',
    onSplit(self) {
      const piezas = tipo === 'chars' ? self.chars : tipo === 'words' ? self.words : self.lines;
      const anim = gsap.from(piezas, {
        yPercent: 110,
        duration: o.duracion ?? 0.9,
        ease: o.ease ?? 'power4.out',
        stagger: o.stagger ?? (tipo === 'chars' ? 0.02 : 0.08),
        delay: o.delay ?? 0,
        scrollTrigger: o.scroll === false ? undefined : { trigger: el, start: o.start ?? 'top 85%', once: true },
      });
      mostrar();
      return anim;
    },
  });
}

/**
 * Atajo declarativo: revela todo `[data-reveal]` del documento.
 * `data-reveal="lines|words|chars"`, `data-reveal-stagger="0.05"` opcional.
 */
export function revealAll(motion: Motion, raiz: ParentNode = document): void {
  raiz.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const tipo = (el.dataset.reveal || 'lines') as RevealOpciones['tipo'];
    const stagger = el.dataset.revealStagger ? Number(el.dataset.revealStagger) : undefined;
    revealText(motion, el, { tipo, stagger });
  });
}
