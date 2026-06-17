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

## Stack técnico
- HTML5, CSS3, JavaScript vanilla — sin frameworks
- Sin build tools (no npm, no webpack) — archivos directos
- Google Analytics: `G-D9VGNFGPMP` (en `js/analytics.js`)
- ContentSquare/Hotjar: `js/hotjar.js`

## Archivos principales
| Archivo | Rol |
|---|---|
| `index.html` | Página principal (única página de marketing) |
| `catalogo.html` | Página de catálogo en construcción |
| `css/reset.css` | Variables CSS globales y reset |
| `css/layout.css` | Todos los estilos (1000+ líneas) |
| `js/interactions.js` | Scroll, menú hamburguesa, FAQ, carousels, lightbox |
| `js/cart.js` | Carrito con localStorage, pedido por WhatsApp |
| `js/forms.js` | Productos (array PRODUCTS), modales, catálogo |
| `js/analytics.js` | Carga async Google Analytics |
| `js/hotjar.js` | Carga async ContentSquare |

## Productos
Shampoo de Romero · Acondicionador de Romero · Tónico Capilar · Gel Fijador Hidratante · Tratamiento Capilar · Kit Capilar Completo · Crema para Peinar · Bio Repolarizador · Pree Poo

## Decisiones de diseño importantes
- **Hero image (`Rosa-Perez2.png`) tiene `style="width:1000px"`** — intencional. Sin ese ancho la imagen se ve aplastada en desktop porque desborda el contenedor de 600px a propósito.
- Las fuentes son **Cormorant Garamond** (títulos) y **Jost** (cuerpo), cargadas de forma no bloqueante.
- `css/components.css` y `css/animations.css` **no existen** — no los referenciar.
- `js/scene.js` **no existe** — Three.js fue eliminado.

## SEO / Meta
- Canonical: `https://alma-botanica.pages.dev/` (actualizar cuando haya dominio propio)
- JSON-LD: `WebSite` + `LocalBusiness` con productos y fundadora
- OG + Twitter Card configurados
- Cuando se compre dominio propio: actualizar canonical, og:url, og:image, twitter:image y los dos JSON-LD

## Flujo de trabajo
- Editar archivos localmente → `git add` → `git commit` → `git push origin main`
- Cloudflare Pages despliega automáticamente al hacer push a `main`
