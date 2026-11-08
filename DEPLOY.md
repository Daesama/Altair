# Despliegue en Cloudflare Pages

Todo se publica como **un solo proyecto de Cloudflare Pages** conectado al repositorio de GitHub (`Daesama/Altair`). Las demos y las páginas de clientes en revisión van dentro de altair.lat, cada una en su carpeta:

| Sitio | Dirección |
|---|---|
| Web de Altair | `https://altair.lat` |
| Demo barbería | `https://altair.lat/demos/barberia/` |
| Demo restaurante | `https://altair.lat/demos/restaurante/` |

El build de altair (`pnpm --filter altair build`) termina corriendo `tools/build-web.mjs`, que construye las demos y copia cada demo en `sites/altair/dist/demos/<nombre>/`. Esa carpeta es la que se publica.

---

## 1. Pasar el DNS de altair.lat a Cloudflare

Esto se hace una sola vez y es lo que más tarda, porque el cambio de nameservers puede demorar de unos minutos a 24 horas.

1. Entre a <https://dash.cloudflare.com> y cree una cuenta si no tiene.
2. **Add a domain**, escriba `altair.lat` y elija el plan **Free**.
3. Cloudflare revisa los registros DNS actuales. Si el dominio no tiene correo ni nada configurado, puede continuar sin agregar nada.
   - Si ya usa correo con ese dominio, por ejemplo Google Workspace o Zoho, verifique que los registros **MX** y **TXT** aparezcan en la lista antes de seguir.
4. Cloudflare le muestra **dos nameservers**, por ejemplo `ana.ns.cloudflare.com` y `bob.ns.cloudflare.com`.
5. Entre al panel del registrador donde compró `altair.lat` y busque **Nameservers / DNS / Servidores de nombres**.
6. Cambie los nameservers actuales por los dos de Cloudflare y guarde.
7. Vuelva a Cloudflare y pulse **Check nameservers**. Cuando el dominio aparezca como **Active**, siga con el paso 2.

## 2. Crear el proyecto de Pages

1. En Cloudflare vaya a **Workers & Pages → Create → Pages → Connect to Git**.
2. Autorice GitHub y elija el repositorio `Daesama/Altair`.
3. Configure:
   - **Project name:** `altair`
   - **Production branch:** `main`
   - **Framework preset:** `None`
   - **Build command:** `pnpm --filter altair build` (o `pnpm build:web`, que es lo mismo; los dos arman también las demos)
   - **Build output directory:** `sites/altair/dist`
   - **Root directory:** vacío (la raíz del repositorio)
4. En **Environment variables (Production y Preview)** agregue:
   - `NODE_VERSION` = `22`
   - `PNPM_VERSION` = `10.34.9`
5. Pulse **Save and Deploy**. Al terminar, el sitio queda en `https://altair.pages.dev` (o el nombre que Cloudflare asigne). Abra también `/demos/barberia/` y `/demos/restaurante/`.

> Si el build falla porque no encuentra pnpm, cambie el comando de build a
> `npx pnpm@10.34.9 install --frozen-lockfile && npx pnpm@10.34.9 --filter altair build`.

> Si antes había creado los proyectos `altair-barberia` y `altair-restaurante`, ya no hacen falta: puede borrarlos, junto con los subdominios `barberia` y `restaurante` en DNS.

## 3. Conectar el dominio

Con el dominio ya **Active** en Cloudflare:

1. Proyecto `altair` → **Custom domains → Set up a custom domain** → escriba `altair.lat` → **Activate domain**. Cloudflare crea el registro DNS solo.
2. En el mismo proyecto agregue también `www.altair.lat`.
   - Luego, en **Rules → Redirect Rules** del dominio, cree la regla «Redirect from WWW to root» para que `www` lleve a `altair.lat`.
3. Espere a que el dominio diga **Active**. El certificado SSL se emite solo, en unos minutos.

## 4. Revisión final

- [ ] `https://altair.lat`, `https://altair.lat/demos/barberia/` y `https://altair.lat/demos/restaurante/` cargan con candado (HTTPS).
- [ ] `https://www.altair.lat` redirige a `https://altair.lat`.
- [ ] `https://altair.lat/sitemap-index.xml` y `https://altair.lat/robots.txt` responden.
- [ ] Los enlaces del portafolio abren las demos.
- [ ] Los botones de WhatsApp abren el número real.
- [ ] En **SSL/TLS → Overview** el modo está en **Full**.
- [ ] Opcional: en **Google Search Console** agregue `altair.lat` como propiedad de dominio y envíe el sitemap.

## Despliegues siguientes

Cada `git push` a `main` vuelve a publicar todo: altair.lat y las demos. Si un build falla, el sitio sigue mostrando la última versión buena hasta que se corrija.

## Mostrarle una página a un cliente

1. Cree el sitio en `sites/<nombre>` (copie una demo como punto de partida).
2. En su `astro.config.mjs` ponga `site: 'https://altair.lat'`, `base: '/demos/<nombre>/'`, `trailingSlash: 'always'` y `build: { format: 'directory' }`.
3. Use `import.meta.env.BASE_URL` en vez de `/` para íconos y enlaces al inicio.
4. Agréguelo a la lista `demos` de `tools/build-web.mjs`.
5. Mientras esté en revisión, pase `noindex` al componente `Seo` para que Google no la muestre.
6. `git push` → el cliente la ve en `https://altair.lat/demos/<nombre>/`.

Cuando el cliente lance con su propio dominio, la página pasa a un proyecto de Pages aparte: quite `base`, cambie `site` por el dominio del cliente y sáquela de `tools/build-web.mjs`.
