# Altair Studio

Monorepo con los tres sitios de Altair Studio. Todos son estáticos (Astro), con animaciones GSAP + ScrollTrigger y scroll suave con Lenis.

| Carpeta | Sitio | Qué es |
|---|---|---|
| `sites/altair` | altair.lat | Web de ventas del estudio |
| `sites/demo-barberia` | altair.lat/demos/barberia | Demo «Filo Barbería & Spa» (negocio ficticio) |
| `sites/demo-restaurante` | altair.lat/demos/restaurante | Demo «La Leñera, cocina de fogón» (negocio ficticio) |
| `packages/core` | — | Solo lógica compartida, sin estilos: SEO, WhatsApp, mapa, aviso de datos y animación |
| `tools` | — | Capturas con Playwright, Lighthouse y capturas del portafolio |

Cada sitio tiene su propio diseño, sus fuentes y sus estilos. Lo único que comparten es `packages/core`.

## Requisitos

- Node 22.12 o superior (`.nvmrc`).
- pnpm 10: `npm install -g pnpm@10`.

## Correr en local

```bash
pnpm install
pnpm dev:altair        # http://localhost:4321
pnpm dev:barberia
pnpm dev:restaurante
pnpm build             # construye los tres sitios en sites/*/dist
pnpm build:web         # arma altair.lat completo, con las demos en /demos/ (es lo que se publica)
```

Las demos se publican dentro de altair.lat, así que en local también viven en su carpeta: por ejemplo `pnpm dev:barberia` abre en `http://localhost:<puerto>/demos/barberia/`.

**Agregar otra página (demo o cliente en revisión):** cree la carpeta en `sites/`, ponga `base: '/demos/<nombre>/'` en su `astro.config.mjs` y agréguela a la lista de `tools/build-web.mjs`. Con el siguiente `git push` queda en `altair.lat/demos/<nombre>/`.

Para ver la versión final ya construida de un sitio: `pnpm --filter altair preview`.

## Páginas de altair.lat

| Ruta | Contenido |
|---|---|
| `/` | Hero con el recorrido del cliente en un celular (Google → página → WhatsApp) y bloques que llevan a cada página |
| `/planes` | Los tres planes, cupos de lanzamiento, qué cubre la mensualidad |
| `/portafolio` | ARKE y las dos demos, en computador y celular |
| `/proceso` | Los cuatro pasos y las preguntas frecuentes |
| `/contacto` | WhatsApp con mensaje según el plan elegido, correo e Instagram |
| `/terminos`, `/privacidad` | Borradores legales |

El menú está en `sites/altair/src/nav.ts`. Las páginas cambian con View Transitions (`<ClientRouter />` de Astro): la cabecera se queda fija y solo el contenido entra y sale.

## Editar datos (`site.config.ts`)

Todo lo que se puede editar está en el archivo `site.config.ts` de cada sitio. Ningún componente tiene datos escritos a mano.

- **altair.lat** (`sites/altair/site.config.ts`):
  - WhatsApp, correo e Instagram.
  - Precios y contenido de los planes.
  - Cupos de lanzamiento: `lanzamiento.cuposRestantes`.
  - Qué cubre la mensualidad.
  - Casos del portafolio.
  - Pasos del proceso (`proceso`) y preguntas frecuentes (`preguntas`).
  - Datos legales del responsable.
  - Mensajes precargados de WhatsApp.
- **Demos**: nombre, contacto, dirección y coordenadas, horarios, servicios o carta con precios, especiales, mensajes de reserva y créditos de fotos.

Los datos inventados están marcados con el comentario `// PLACEHOLDER`. Para encontrarlos todos:

```bash
grep -rn PLACEHOLDER sites/*/site.config.ts
```

Cuando se ocupe un cupo de lanzamiento, reste uno en `cuposRestantes` y vuelva a publicar.

## Cambiar el logo (un solo archivo)

El logo de Altair vive en **`sites/altair/src/brand/logo.svg`**. Para cambiarlo en todo el sitio, reemplace ese archivo y nada más.

`Logo.astro` lo lee en el encabezado y en el pie. Al construir, `scripts/brand-assets.mjs` genera a partir de él `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-512.png` y `og.png`.

El archivo nuevo debe cumplir este contrato (está descrito en el comentario de `logo.svg`):

- `viewBox` con el logo completo.
- `data-symbol="x y ancho alto"` con el recorte del símbolo solo, que se usa para el favicon.
- El logotipo dentro de `<g class="wordmark">`.
- Colores con `currentColor`. La pieza de acento lleva `class="accent"`.

Para regenerar los íconos sin construir el sitio: `pnpm --filter altair brand`.

## Fotos e imágenes

- Las fotos de las demos están en `sites/demo-*/src/assets/fotos/`. Son de Unsplash (licencia Unsplash) y los créditos se muestran en el pie de cada demo; si cambia una foto, actualice también la lista `creditos` en `site.config.ts`.
- Las capturas del portafolio de altair.lat se regeneran con las demos corriendo en vista previa (puertos 4322 y 4323):

  ```bash
  pnpm --filter demo-barberia preview --port 4322   # en una terminal
  pnpm --filter demo-restaurante preview --port 4323 # en otra
  node tools/portfolio.mjs                           # usa :4322/demos/barberia/ y :4323/demos/restaurante/; o pase las URLs públicas como argumentos
  ```

## Verificación

```bash
node tools/shots.mjs http://localhost:4321/ altair            # capturas 375 y 1440 px en .shots/
node tools/shots.mjs http://localhost:4321/ altair --reduced   # con movimiento reducido
node tools/lighthouse.mjs http://localhost:4321/ http://localhost:4322/demos/barberia/ http://localhost:4323/demos/restaurante/
```

`lighthouse.mjs` usa el perfil móvil por defecto, imprime los cuatro puntajes con LCP, CLS y TBT, y lista lo que esté por debajo de 90.

## Animación

- `@altair/core/motion` inicializa Lenis sincronizado con ScrollTrigger. Con `prefers-reduced-motion: reduce` no se crea Lenis y cada sitio omite sus animaciones.
- `@altair/core/reveal` revela titulares por líneas, palabras o letras. Basta con poner `data-reveal="lines|words|chars"` en el elemento.
- `enCadaPagina(montar)` (en `@altair/core/motion`) es para sitios con View Transitions: corre las animaciones de cada página y las limpia antes de cambiar. altair.lat lo usa en `src/scripts/app.ts`; lo propio de cada página está en `src/scripts/paginas/`.
- `@altair/core/pointer` tiene los efectos de mouse (`magnetic`, `tilt`, `parallaxPointer`). Solo se activan con mouse real y sin movimiento reducido. En altair.lat basta con `data-tilt="4"` o `data-magnetic` en el elemento.
- Solo se animan `transform` y `opacity`. Sin WebGL.

## Desplegar

Vea [DEPLOY.md](DEPLOY.md): un solo proyecto de Cloudflare Pages publica altair.lat con las demos en `/demos/`.

## Legal

`/terminos` y `/privacidad` de altair.lat son **borradores** y llevan un comentario `<!-- BORRADOR: revisar con abogado antes de publicar -->`. Haga que un abogado los revise antes de publicar.

## Pendientes antes de publicar

- [ ] Reemplazar los datos marcados con `// PLACEHOLDER` en los `site.config.ts` (WhatsApp, correo, Instagram, cupos, datos legales).
- [ ] Revisión de `/terminos` y `/privacidad` por un abogado.
- [ ] Confirmar que las fotos de Unsplash de las demos no sean de Unsplash+.
- [ ] Verificar `PNPM_VERSION` en Cloudflare Pages (ver DEPLOY.md).
