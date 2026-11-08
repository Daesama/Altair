/**
 * Movimiento de Simón: todo flota, nada salta. El scroll es una inmersión.
 * - El agua cambia de color al bajar de zona y el profundímetro cuenta los metros.
 * - El título ondula como una ola; el salvavidas se mece; los datos flotan como burbujas.
 * - El cardumen cruza con el scroll; las fichas de la bitácora suben desde el fondo y se mecen.
 * - En pantallas anchas, las ventanas del submarino pasan de lado mientras bajas.
 * - Las medusas nadan (se contraen y suben). El sonar barre en CSS.
 * Con movimiento reducido solo se actualiza el número del profundímetro.
 */
import type { Motion } from '@altair/core/motion';
import { SplitText } from 'gsap/SplitText';

const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

/** Profundímetro: interpola los metros entre las zonas según el punto medio de la pantalla. */
function profundimetro(): void {
  const zonas = [document.getElementById('superficie'), ...$$('[data-zona]')].filter(Boolean) as HTMLElement[];
  const metros = [0, ...$$('[data-zona]').map((z) => Number(z.dataset.zona))];
  const salida = document.querySelector('[data-metros]');
  const buzo = document.querySelector<HTMLElement>('[data-buzo]');
  const links = $$<HTMLAnchorElement>('[data-zona-link]');
  if (!salida || !zonas.length) return;
  let ultimo = -1;
  const actualizar = () => {
    const y = window.scrollY + innerHeight * 0.5;
    const tops = zonas.map((z) => z.getBoundingClientRect().top + window.scrollY);
    let i = tops.findIndex((t, k) => y >= t && (k === tops.length - 1 || y < tops[k + 1]));
    if (i < 0) i = 0;
    const sig = Math.min(i + 1, tops.length - 1);
    const f = sig === i ? 0 : Math.min(1, (y - tops[i]) / (tops[sig] - tops[i]));
    const m = Math.round(metros[i] + (metros[sig] - metros[i]) * f);
    if (m !== ultimo) { salida.textContent = String(m); ultimo = m; }
    links.forEach((l, k) => l.setAttribute('aria-current', String(k === i)));
    if (buzo && links[i]) {
      const a = links[i].getBoundingClientRect(), b = links[sig].getBoundingClientRect(), caja = buzo.parentElement!.getBoundingClientRect();
      buzo.style.transform = `translateY(${a.top + (b.top - a.top) * f - caja.top - 78 + a.height / 2 - 6}px)`;
    }
  };
  addEventListener('scroll', actualizar, { passive: true });
  addEventListener('resize', actualizar);
  actualizar();
}

export function runPage(motion: Motion): void {
  profundimetro();
  const { gsap, reduced } = motion;
  if (reduced) return;
  gsap.registerPlugin(SplitText);
  document.documentElement.classList.add('agua-viva');

  // Agua: el color de cada zona
  const agua = document.querySelector<HTMLElement>('[data-agua]');
  $$('[data-zona]').forEach((z) => {
    const color = getComputedStyle(z).getPropertyValue('--c').trim() || getComputedStyle(document.documentElement).getPropertyValue(z.style.getPropertyValue('--c').replace(/var\(|\)/g, '')).trim();
    const ir = () => gsap.to(agua, { backgroundColor: color, duration: 1.2, ease: 'sine.inOut', overwrite: true });
    motion.ScrollTrigger.create({ trigger: z, start: 'top 55%', end: 'bottom 55%', onEnter: ir, onEnterBack: ir });
  });

  // Superficie: el título ondula como una ola
  const titulo = document.querySelector('[data-titulo]');
  if (titulo) {
    const split = SplitText.create(titulo, { type: 'chars', aria: 'auto' });
    gsap.from(split.chars, { y: 80, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.5)', stagger: 0.04 });
    gsap.to(split.chars, { y: -8, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: { each: 0.09, repeat: -1, yoyo: true }, delay: 1.2 });
  }
  gsap.to('.sup [data-up]', { opacity: 1, y: 0, duration: 1, ease: 'sine.out', stagger: 0.15, delay: 0.5, startAt: { y: 24 } });
  gsap.to('[data-flota]', { y: -16, rotate: 4, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  gsap.to('[data-sol]', { scale: 1.06, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  // Al bajar, la superficie se aleja hacia arriba más lento (sensación de hundirse)
  gsap.to('.sup-in', { yPercent: 30, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.sup', start: 'top top', end: 'bottom top', scrub: true } });

  // Cardumen que cruza
  gsap.fromTo('[data-cardumen]', { x: '-40vw' }, { x: '110vw', ease: 'none', scrollTrigger: { trigger: '#sobre-mi', start: 'top bottom', end: 'bottom top', scrub: 1 } });

  // Burbujas de datos: cada una flota a su ritmo
  $$('[data-bob]').forEach((b, i) => {
    gsap.to(b, { y: gsap.utils.random(-10, -18), x: gsap.utils.random(-4, 4), duration: gsap.utils.random(2, 3.4), ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.2 });
  });

  // Bitácora: suben desde el fondo y se mecen
  $$('[data-registro]').forEach((r, i) => {
    gsap.from(r, { y: 140, opacity: 0, rotate: i % 2 ? 6 : -6, duration: 1.6, ease: 'sine.out', scrollTrigger: { trigger: r, start: 'top 92%', once: true } });
    gsap.to(r, { rotate: i % 2 ? -1.5 : 1.5, y: -6, duration: 3 + i * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.6 });
  });

  // Ventanas del submarino: pasan de lado (pantallas anchas)
  gsap.matchMedia().add('(min-width: 1000px)', () => {
    const sec = document.querySelector<HTMLElement>('[data-pasiones]');
    const pista = document.querySelector<HTMLElement>('[data-ventanas]');
    if (!sec || !pista) return;
    const distancia = () => pista.scrollWidth - innerWidth;
    gsap.to(pista, {
      x: () => -distancia(), ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top top', end: () => '+=' + distancia(), pin: true, scrub: 1, invalidateOnRefresh: true },
    });
    gsap.to('.buey', { rotate: 25, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: () => '+=' + distancia(), scrub: true } });
  });
  gsap.matchMedia().add('(max-width: 999px)', () => {
    $$('.ventana').forEach((v) => gsap.from(v, { y: 80, opacity: 0, duration: 1.2, ease: 'sine.out', scrollTrigger: { trigger: v, start: 'top 90%', once: true } }));
  });

  // Medusas: se contraen y suben
  $$('[data-medusa]').forEach((m, i) => {
    gsap.timeline({ repeat: -1, delay: i * 1.3 })
      .to(m, { scaleY: 0.82, scaleX: 1.08, duration: 0.6, ease: 'sine.in', transformOrigin: '50% 30%' })
      .to(m, { scaleY: 1, scaleX: 1, y: '-=36', duration: 1.4, ease: 'sine.out' })
      .to(m, { y: '+=36', duration: 2.4, ease: 'sine.inOut' });
  });

  // Resto: aparecen subiendo despacio
  $$('[data-up]').filter((el) => !el.closest('.sup')).forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.3, ease: 'sine.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });
}
