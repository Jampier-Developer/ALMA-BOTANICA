# Alma Botánica — Sitio Web

Página web de **Alma Botánica**, marca de cosmética capilar natural fundada por **Rosa Pérez** en Cartagena de Indias, Colombia.

## Datos del negocio
- **Marca:** Alma Botánica
- **Fundadora:** Rosa Pérez (Formuladora Botánica)
- **Ubicación:** Barrio El Pozón, Cartagena de Indias, Bolívar, Colombia
- **WhatsApp:** +573135487027
- **Instagram:** @almabotanica26
- **Facebook:** https://www.facebook.com/profile.php?id=61573483268712
- **TikTok:** @alma.botnica

## Despliegue
- **Hosting:** Cloudflare Pages
- **URL actual:** https://alma-botanica.pages.dev/
- **Dominio propio:** pendiente de comprar (objetivo: `almabotanica.co`)
- **Repositorio:** https://github.com/Jampier-Developer/ALMA-BOTANICA.git
- **Rama principal:** `main`
- **Flujo:** Editar localmente → `git add` → `git commit` → `git push origin main` → Cloudflare despliega automáticamente
- **"actualiza todo"** = 1) actualizar este CLAUDE.md con los cambios de la sesión, 2) actualizar README.md para que refleje el estado actual del sitio, 3) hacer push a GitHub. Siempre en ese orden, nunca antes.
- **"continuemos"** = el usuario quiere seguir trabajando en este proyecto. Leer este CLAUDE.md, entender el estado actual y preguntar qué sigue.
- **Documentar siempre:** cada vez que se agregue o modifique código importante (nuevo producto, nueva sección, nuevo componente CSS/JS, decisión de diseño), actualizar este CLAUDE.md para que futuros chats tengan el contexto completo.
- **Consistencia de diseño:** todo código nuevo (modales, secciones, componentes, anuncios) debe usar las mismas variables CSS del sitio (`--pink`, `--gold`, `--font-d`, `--font-b`, `--radius-lg`, etc.), las mismas fuentes (Cormorant Garamond para títulos, Jost para cuerpo) y el mismo estilo visual. Nunca introducir estilos ajenos al diseño existente.
- **Quitar promo cuando el usuario lo indique:** cuando diga que se acabó la promoción, eliminar TODO sin dejar rastro: 1) bloque `<!-- PROMO MODAL — Nuevos Productos -->` completo en `index.html`, 2) el `<script>` del promo al fondo de `index.html`, 3) en `layout.css`: `@keyframes cardJump`, `.card-jump`, `#promoModal`, y todos los estilos `.promo-*`. Cero residuos.

## Stack técnico
- HTML5, CSS3, JavaScript vanilla — sin frameworks, sin build tools (no npm, no webpack)
- Google Analytics: `G-D9VGNFGPMP` (en `js/analytics.js`)
- ContentSquare/Hotjar: `js/hotjar.js`
- Fuentes: **Cormorant Garamond** (títulos) + **Jost** (cuerpo), cargadas de forma no bloqueante

## Archivos principales
| Archivo | Rol |
|---|---|
| `index.html` | Página principal (única página de marketing) |
| `catalogo.html` | Página de catálogo en construcción |
| `css/reset.css` | Variables CSS globales y reset |
| `css/layout.css` | Todos los estilos (1050+ líneas) |
| `css/catalogo.css` | Estilos exclusivos del catálogo |
| `js/interactions.js` | Scroll progress, menú hamburguesa, FAQ accordion, carouseles de tarjetas, lightbox de resultados |
| `js/cart.js` | Carrito con localStorage (`botanica_cart_v1`), pedido por WhatsApp, toast de producto agregado |
| `js/forms.js` | Array PRODUCTS, modal de producto, modal catálogo, lightbox interno del modal, carrito desde modal |
| `js/analytics.js` | Carga async Google Analytics |
| `js/hotjar.js` | Carga async ContentSquare |
| `js/catalogo.js` | Lógica del catálogo |

## Archivos que NO existen (no referenciar)
- `css/components.css` — no existe
- `css/animations.css` — no existe
- `js/scene.js` — Three.js fue eliminado

---

## Productos — lista completa (12 productos)

Los productos viven en el array `PRODUCTS[]` en `js/forms.js`. El índice del array = `data-product` en la tarjeta HTML.

| idx | Nombre en grid | Precio | ML | Tiene variantes |
|---|---|---|---|---|
| 0 | Shampoos | desde $32.000 | 500ml | ✅ 3 variantes |
| 1 | Acondicionadores | desde $32.000 | 500ml | ✅ 4 variantes |
| 2 | Tónicos Capilares | desde $15.000 | 120ml | ✅ 3 variantes |
| 3 | Gel Fijador Hidratante | $13.000 | 300ml | ❌ |
| 4 | Tratamiento Capilar | $23.000 | 250ml | ❌ |
| 5 | Kit Rutina Completa / Kits Completos | desde $60.000 | 500ml | ✅ 6 variantes |
| 6 | Crema para Peinar | $28.000 | 200ml | ❌ |
| 7 | Bio Repolarizador | $32.000 | 120ml | ❌ |
| 8 | Pree Poo | $25.000 | 250ml | ❌ |
| 9 | Termoprotector | $25.000 | 200ml | ❌ — **Nuevo** |
| 10 | Mascarilla Nutritiva | $25.000 | 120ml | ❌ — **Nuevo** |
| 11 | Rescate Supremo | $40.000 | 500ml | ❌ — **Nuevo** |

### Variantes de productos con variantes

**Shampoos (idx 0):** Romero $32k · Nutritivo $34k · Aguacate $32k

**Acondicionadores (idx 1):** Romero $32k · Nutritivo $34k · Aguacate $32k · Cebolla $32k

**Tónicos Capilares (idx 2):** Romero $15k · 7 Aceites $20k · Bomba $25k

**Kits (idx 5):** Cebolla Premium $90k · Aguacate Premium $90k · Linaza $75k · Nutritivo $130k · Romero $60k · Romero Premium $90k · Cebolla $64k · Aguacate $64k

Los primeros 2 (Cebolla Premium y Aguacate Premium) son los más nuevos y aparecen de primero tanto en el modal como en el carrusel exterior. Imágenes: `Kits7.PNG` y `Kits8.PNG`.

---

## Orden de las tarjetas en el grid (index.html)

Los 3 productos nuevos aparecen **primero** en el grid con badge `🌿 Nuevo`, luego siguen los originales:

1. Termoprotector (data-product="9") — `pc-img-10`
2. Mascarilla Nutritiva (data-product="10") — `pc-img-11`
3. Rescate Supremo (data-product="11") — `pc-img-12`
4. Shampoos (data-product="0") — `pc-img-1`
5. Acondicionadores (data-product="1") — `pc-img-2`
6. Tónicos Capilares (data-product="2") — `pc-img-3`
7. Gel Fijador (data-product="3") — `pc-img-4`
8. Tratamiento Capilar (data-product="4") — `pc-img-5`
9. Kit (data-product="5") — `pc-img-6` — con borde especial `.kit-border-wrap` y badge `🌟 Más vendido`
10. Crema para Peinar (data-product="6") — `pc-img-7`
11. Bio Repolarizador (data-product="7") — `pc-img-8`
12. Pree Poo (data-product="8") — `pc-img-9`

---

## Imágenes de productos
Cada producto tiene su carpeta en `img/`:
- `img/Shampoos/` — shampoo 1.jpeg, 2.jpeg, 3.jpeg
- `img/acondicionador/` — acondicionador1.jpeg, 2.jpeg, Acondicionador3.jpeg, 4.jpeg
- `img/Tonicos-Capilares/` — tonico capilar 1.jpeg, 2.jpeg, 3.jpeg
- `img/Gel/` — Gel 1.jpeg
- `img/Tratamientos/` — tratamiento 1.jpeg
- `img/Kits/` — Kit1.jpeg … kit6.jpeg (6 fotos)
- `img/Crema para Peinar/` — crema de peinar 1.jpeg
- `img/BIO REPOLARIZADOR/` — BIO REPOLARIZADOR 1.jpeg
- `img/PREE PO/` — PREE PO.jpeg
- `img/Termoprotector/` — termoprotector-1.jpeg
- `img/Mascarilla-Nutritiva/` — mascarilla-nutritiva-1.jpeg
- `img/Rescate-Supremo/` — rescate-supremo-1.jpeg
- `img/Fotos de rosa/` — Rosa-Perez1.png (sección Nosotras) · Rosa-Perez2.png (hero)
- `img/Img Logo/` — LOGO - ALMA BOTANICA.jpg
- `img/Clientes y Resultados/` — subcarpetas Cliente Estrella, Cliente Dioneris, Cliente Yina

---

## Clases CSS de fondos de tarjetas (layout.css)
```
.pc-img-1  → rosa claro (Shampoos)
.pc-img-2  → lila (Acondicionadores)
.pc-img-3  → verde claro (Tónicos)
.pc-img-4  → amarillo (Gel)
.pc-img-5  → rosa salmón (Tratamiento)
.pc-img-6  → rosa degradado (Kits)
.pc-img-7  → dorado suave (Crema)
.pc-img-8  → azul agua (Bio Repolarizador)
.pc-img-9  → verde menta (Pree Poo)
.pc-img-10 → naranja suave (Termoprotector)
.pc-img-11 → rosa fuerte (Mascarilla Nutritiva)
.pc-img-12 → lila oscuro (Rescate Supremo)
```

---

## Secciones de index.html (en orden)
1. **Hero** (`#inicio`) — foto Rosa-Perez2.png, título, botones CTA, stats bar
2. **Productos** (`#productos`) — grid 3 columnas, 12 tarjetas
3. **Beneficios** — 4 cards (natural, cruelty-free, sin sal/parabenos, todo tipo cabello)
4. **Sobre Rosa** (`#nosotras`) — foto Rosa-Perez1.png, quote de Rosa
5. **Resultados reales** (`#resultados`) — 3 clientes (Estrella, Dioneris, Yina) con carousel antes/después
6. **FAQ** (`#faq`) — 10 preguntas acordeón
7. **CTA Final** — botón catálogo
8. **Footer** — logo, redes, lista de 12 productos, compañía, políticas

---

## Stats bar (hero)
El hero muestra **12 Productos** — ya actualizado.

---

## Elementos UI especiales

### Carrito
- Guardado en `localStorage` con key `botanica_cart_v1`
- Drawer lateral (desktop) / sube desde abajo (móvil)
- Botón en nav con badge contador
- Al pedir → genera mensaje WhatsApp con detalle del pedido
- Confirmación modal antes de eliminar o vaciar

### Modal de producto
- Se abre al hacer clic en cualquier tarjeta
- Muestra carousel de imágenes (navegación manual, sin autoplay)
- En productos con variantes: cada foto = una variante con su precio
- Kits tienen borde dorado especial (`.kit-modal` + `.kit-active`)
- Botones: "Agregar al carrito" + "Pedir por WhatsApp"
- Al clic en imagen dentro del modal → abre lightbox con zoom

### Modal catálogo
- Pide nombre → redirige a `catalogo.html?nombre=XXX`
- Botones que lo abren: `catalogBtn` (nav), `heroCatalogBtn` (hero), `ctaCatalogBtn` (CTA), `mobCatalogBtn` (menú móvil)

### Resultados (sección clientes)
- Carousel antes/después por cliente
- Clic en imagen → lightbox con zoom y navegación

---

## Decisiones de diseño importantes
- **Hero image (`Rosa-Perez2.png`) tiene `style="width:1000px"`** — intencional. Sin ese ancho la imagen se ve aplastada en desktop porque desborda el contenedor de 600px a propósito.
- El Kit tiene `.kit-border-wrap` envolviendo la tarjeta para el borde animado dorado.
- Los 3 productos nuevos (Termoprotector, Mascarilla, Rescate) tienen badge `🌿 Nuevo` — se puede quitar cuando dejen de ser "nuevos".
- Carouseles de tarjetas tienen autoplay cada 4000ms; el modal NO tiene autoplay (navegación manual).

---

## SEO / Meta
- Canonical: `https://alma-botanica.pages.dev/` (actualizar cuando haya dominio propio)
- JSON-LD: `WebSite` + `LocalBusiness` con los 12 productos, fundadora, `areaServed` y `knowsAbout`
- OG + Twitter Card configurados
- `<meta name="keywords">` con 14 términos clave
- `<meta name="robots">` con `max-snippet:-1, max-image-preview:large, max-video-preview:-1`
- Geo tags: `geo.region=CO-BOL`, `geo.placename=Cartagena de Indias`, coordenadas `10.3910,-75.4794`
- `sitemap.xml` en la raíz — incluye `/` (priority 1.0) y `/catalogo.html` (priority 0.8)
- `robots.txt` en la raíz — permite todo y apunta al sitemap
- **Google Search Console**: propiedad verificada con archivo HTML, sitemap enviado el 25/06/2026
- Archivo de verificación: `googleb9bed816d05afe45.html` (no eliminar)
- Cuando se compre dominio propio: actualizar canonical, og:url, og:image, twitter:image, los dos JSON-LD, `sitemap.xml` y `robots.txt`

---

## Última sesión de edición (25/06/2026)

### Cambios realizados en esta sesión

#### Rendimiento y SEO (sesión anterior)
- Eliminó Three.js (~600KB), canvas-confetti y referencias a CSS inexistentes
- Fuentes Google no bloqueantes, analytics/hotjar con `defer`
- `fetchpriority="high"` en imagen LCP, `loading="lazy"` en 22 imágenes
- SEO completo: canonical, Open Graph, Twitter Card, JSON-LD `WebSite` + `LocalBusiness`
- Fix font-weight mobile: quitó `font-weight:700` de párrafos de cuerpo

#### 3 productos nuevos agregados
- **Termoprotector** (idx 9) — $25.000 · 200ml · 🛡️ · `pc-img-10` (ámbar) — imagen pendiente
- **Mascarilla Nutritiva** (idx 10) — $25.000 · 120ml · 🍯 · `pc-img-11` (rosa) — imagen pendiente
- **Rescate Supremo** (idx 11) — $40.000 · 500ml · 💫 · `pc-img-12` (lila) — imagen pendiente
- Aparecen **primeros** en el grid con badge dorado `🌿 Nuevo`
- Agregados al footer (con link que abre su modal) y al JSON-LD de Google
- Stats bar del hero muestra **12 Productos**

#### Diseño
- **Underline deslizante** en links del nav: línea rosa que aparece de izquierda a derecha al hover (CSS puro con `::after` + `scaleX`)
- CSS clases `pc-img-10`, `pc-img-11`, `pc-img-12` agregadas a `layout.css`

#### Modal promocional — 3 productos nuevos
- **Promo modal** (`#promoModal`) en `index.html`: aparece 1.4s después de cargar la página, **siempre en cada visita** (sin sessionStorage)
- **Barra de cuenta regresiva** de 10 segundos (degradado dorado→rosa) — el modal se cierra solo al llegar a 0
- Se puede cerrar antes con: ✕, "No, gracias", clic fuera del modal, tecla Escape
- Botón "Ver los nuevos productos" → cierra el modal, baja a `#productos` y dispara animación en los 3 cards nuevos
- **`@keyframes cardJump`** + `.card-jump`: los 3 cards saltan suavemente en lugar (escala + flotación) con retardo escalonado de 140ms entre cada uno
- Todos los estilos en `layout.css` bajo el comentario `/* ── PROMO MODAL — Nuevos Productos ── */`
- El script está al fondo de `index.html` antes de `</body>`

#### Documentación e infraestructura
- **README.md** creado con documentación completa del proyecto
- **CLAUDE.md** actualizado con reglas: `actualiza todo`, `continuemos`, documentar siempre, consistencia de diseño, quitar promo completa cuando se indique
- **Git credentials**: token de Jampier-Developer embebido en la URL del remote para separar cuentas sin interferencias

#### SEO profesional completo (25/06/2026)
- `<title>` actualizado: nombre + cargo + ciudad
- `<meta keywords>` con 14 términos clave capilares y locales
- `<meta robots>` mejorado con directivas de snippet e imagen
- Geo tags añadidos: región, ciudad y coordenadas de Cartagena
- JSON-LD `LocalBusiness` mejorado: `areaServed` (Cartagena) + `knowsAbout` de Rosa
- `sitemap.xml` creado en raíz con las 2 páginas del sitio
- `robots.txt` creado en raíz apuntando al sitemap
- `<link rel="sitemap">` añadido al `<head>`
- **Google Search Console** configurado: propiedad verificada, sitemap enviado
- Archivo de verificación `googleb9bed816d05afe45.html` en la raíz — **no eliminar nunca**

### Pendientes activos

#### Imágenes de los 3 productos nuevos
Cuando Rosa envíe las fotos, agregarlas a sus carpetas y actualizar `src` en `index.html` y `images:[]` en `js/forms.js`:
- `img/Termoprotector/termoprotector-1.jpeg`
- `img/Mascarilla-Nutritiva/mascarilla-nutritiva-1.jpeg`
- `img/Rescate-Supremo/rescate-supremo-1.jpeg`

#### Quitar el promo modal cuando la promoción termine
Ver regla en sección Despliegue — eliminar TODO (HTML, script y CSS) sin residuos.

#### Dominio propio pendiente
Cuando se compre `almabotanica.co`, actualizar en `index.html`:
- `<link rel="canonical">`
- `og:url`, `og:image`, `twitter:image`
- Los dos bloques JSON-LD (`WebSite` y `LocalBusiness`)
