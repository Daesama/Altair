# Despliegue en Cloudflare Pages

Los tres sitios son estáticos y se publican como **tres proyectos de Cloudflare Pages** conectados al mismo repositorio de GitHub (`Daesama/Altair`).

| Proyecto | Dominio | Comando de build | Directorio de salida |
|---|---|---|---|
| `altair` | `altair.lat` | `pnpm --filter altair build` | `sites/altair/dist` |
| `altair-barberia` | `barberia.altair.lat` | `pnpm --filter demo-barberia build` | `sites/demo-barberia/dist` |
| `altair-restaurante` | `restaurante.altair.lat` | `pnpm --filter demo-restaurante build` | `sites/demo-restaurante/dist` |

En los tres el **directorio raíz** es la raíz del repositorio (déjelo vacío). Así Cloudflare instala las dependencias del monorepo desde `pnpm-lock.yaml` y el paquete `@altair/core` queda disponible.

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

## 2. Crear los tres proyectos de Pages

Repita estos pasos tres veces, una por fila de la tabla de arriba:

1. En Cloudflare vaya a **Workers & Pages → Create → Pages → Connect to Git**.
2. Autorice GitHub y elija el repositorio `Daesama/Altair`.
3. Configure:
   - **Project name:** `altair`, `altair-barberia` o `altair-restaurante`.
   - **Production branch:** `main`.
   - **Framework preset:** `None`. El comando se escribe a mano.
   - **Build command:** el de la tabla.
   - **Build output directory:** el de la tabla.
   - **Root directory:** vacío (la raíz del repositorio).
4. En **Environment variables (Production y Preview)** agregue:
   - `NODE_VERSION` = `22`
   - `PNPM_VERSION` = `10.34.9`
5. Pulse **Save and Deploy**. Al terminar, el sitio queda en `https://<proyecto>.pages.dev`. Ábralo y revise que se vea bien.

> Si el build falla porque no encuentra pnpm, cambie el comando de build a
> `npx pnpm@10.34.9 install --frozen-lockfile && npx pnpm@10.34.9 --filter <sitio> build`.

## 3. Conectar los dominios

Con el dominio ya **Active** en Cloudflare:

1. **Proyecto `altair`** → **Custom domains → Set up a custom domain** → escriba `altair.lat` → **Activate domain**. Cloudflare crea el registro DNS solo.
2. En el mismo proyecto agregue también `www.altair.lat`.
   - Luego, en **Rules → Redirect Rules** del dominio, cree la regla «Redirect from WWW to root» para que `www` lleve a `altair.lat`.
3. **Proyecto `altair-barberia`** → **Custom domains** → `barberia.altair.lat`.
4. **Proyecto `altair-restaurante`** → **Custom domains** → `restaurante.altair.lat`.
5. Espere a que cada dominio diga **Active**. El certificado SSL se emite solo, en unos minutos.

## 4. Revisión final

- [ ] `https://altair.lat`, `https://barberia.altair.lat` y `https://restaurante.altair.lat` cargan con candado (HTTPS).
- [ ] `https://www.altair.lat` redirige a `https://altair.lat`.
- [ ] `https://altair.lat/sitemap-index.xml` y `https://altair.lat/robots.txt` responden.
- [ ] Los botones de WhatsApp abren el número real, no el placeholder `+57 300 000 0000`.
- [ ] En **SSL/TLS → Overview** el modo está en **Full**. Pages funciona con cualquier modo, pero Full evita problemas si luego agrega otros servicios.
- [ ] Opcional: en **Google Search Console** agregue `altair.lat` como propiedad de dominio y envíe el sitemap.

## Despliegues siguientes

Cada `git push` a `main` vuelve a publicar los **tres** proyectos.

Para que un proyecto solo se publique cuando cambie su carpeta, use en cada proyecto **Settings → Builds → Build watch paths**:

- `altair`: `sites/altair/*`, `packages/core/*`
- `altair-barberia`: `sites/demo-barberia/*`, `packages/core/*`
- `altair-restaurante`: `sites/demo-restaurante/*`, `packages/core/*`
