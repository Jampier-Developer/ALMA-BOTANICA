# 🌿 Alma Botánica — Sitio Web Oficial

> Cosmética capilar 100% natural formulada por **Rosa Pérez** en Cartagena de Indias, Colombia.

[![Estado](https://img.shields.io/badge/Estado-En%20producci%C3%B3n-brightgreen)](https://alma-botanica.store/)
[![Hosting](https://img.shields.io/badge/Hosting-Cloudflare%20Pages-orange)](https://alma-botanica.store/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](/)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](/)

**🌐 URL en vivo:** [alma-botanica.store](https://alma-botanica.store/) · **Última actualización:** 14 de octubre de 2026 (hora de Colombia)

---

## 🗓️ Estado del proyecto

> **Para quien retome esto más adelante (persona o sesión nueva): empieza por aquí.**

**Última sesión de trabajo:** 14 de octubre de 2026
**Rama de esa sesión:** `claude/epic-lovelace-jl2sda`
**Versión al cerrar:** v1.3 (ver el historial en "Versión de la página")
**Qué se hizo:** revisión completa del sitio; página más corta; arreglo de
tres fallos del carrito; textos de productos, kits, preguntas frecuentes y
políticas puestos de acuerdo entre sí y con lo que el sitio hace de verdad;
catálogo en PDF regenerado.

### ✅ Terminado y probado

| | |
|---|---|
| **Carrito** | Los campos de entrega y de regalo salen siempre, se abra el carrito por donde se abra, no se pierden al cambiar cantidades, y el botón de enviar se ve siempre, también en celulares pequeños. Con teclado, + y − cambian la cantidad |
| **Textos de producto** | Sin promesas de efecto médico: son cosméticos (ver "Cosas que hay que recordar al editar") |
| **Kits** | Un solo nombre, "Kits Completos", cada kit en singular y el precio "por kit" |
| **Políticas** | La de cookies declara todo lo que se guarda en el navegador; envíos, FAQ y PDF dicen lo mismo (solo Cartagena) |
| **Catálogo en PDF** | 16 páginas, 5,7 MB, regenerado con los textos nuevos y vigencia de octubre de 2026 |
| **Rendimiento** | `width`/`height` en las imágenes (CLS), caché de un año versionada con `?v=` |

### ⏳ Pendiente — hace falta que Rosa aporte datos

1. **Los datos de las páginas legales.** Quedan **21 marcadores `{POR CONFIRMAR}`**
   (la portada está limpia). Aparecen resaltados en amarillo a propósito:

   | Dato | Dónde aparece |
   |---|---|
   | Cédula de Rosa | privacidad, términos, cookies y ventas (4 veces) |
   | Un correo de contacto | 7 veces — obligatorio para habeas data (Ley 1581) |
   | Plazos de conservación | privacidad: borrado de chats y de registros de pedidos (2) |
   | Envíos | ventas: quién lleva el pedido, costo y tiempo de entrega (3) |
   | Garantía | ventas: plazo de garantía de los productos (1) |
   | Cambios | ventas: procedimiento, quién paga el transporte y productos abiertos (4) |

2. **Qué trae cada kit.** Cinco de los ocho kits (Linaza, Nutritivo, Romero,
   Cebolla y Aguacate) dicen "varios productos" sin decir cuáles. El Cebolla
   Premium nombra un shampoo y un tónico de cebolla que no se venden por
   separado, y el Aguacate Premium un tónico de aguacate que tampoco. Hay que
   confirmarlo con Rosa.
3. **Otros datos de la portada:** los años de experiencia ("5+ años"), si hay
   punto físico para visitas y su dirección, si los productos tienen
   notificación sanitaria del INVIMA, si el TikTok es `@alma.botnica` o
   `@alma.botanica`, y que los precios sigan vigentes.
4. **Pedidos reales** en `js/pedidos.js` → enciende el aviso de pedidos recientes.
5. **Reseñas reales** en `js/resenas-datos.js` → enciende la sección de reseñas
   y manda la nota media a Google.

> Los puntos 4 y 5 hoy traen contenido de ejemplo que **no se le muestra a
> nadie**. Ver "Contenido de ejemplo" más abajo.

### 💡 Ideas que quedaron fuera

Ninguna pendiente. Si surgen nuevas, este es el sitio para anotarlas.

---

## 📋 Tabla de Contenidos

- [Estado del proyecto](#-estado-del-proyecto) ← **empieza aquí**
- [Sobre el proyecto](#-sobre-el-proyecto)
- [Sobre la marca](#-sobre-la-marca)
- [Qué puede hacer la página](#-qué-puede-hacer-la-página)
- [Características del sitio](#-características-del-sitio)
- [Páginas legales](#-páginas-legales)
- [Cómo funciona el banner de cookies](#-cómo-funciona-el-banner-de-cookies)
- [Versión de la página](#-versión-de-la-página)
- [Contenido de ejemplo](#-contenido-de-ejemplo--leer-antes-de-tocarlo)
- [Cosas que hay que recordar al editar](#-cosas-que-hay-que-recordar-al-editar)
- [El catálogo en PDF](#-el-catálogo-en-pdf)
- [Si editas CSS o JavaScript: sube la versión](#-si-editas-css-o-javascript-sube-la-versión)
- [Dónde ve Rosa su tráfico](#-dónde-ve-rosa-su-tráfico-en-simple)
- [Propiedad](#-propiedad)
- [Productos](#-productos)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura de archivos](#-estructura-de-archivos)
- [Cómo correr localmente](#-cómo-correr-localmente)
- [Flujo de despliegue](#-flujo-de-despliegue)
- [SEO y Analytics](#-seo-y-analytics)
- [Cómo se comprueba que nada se rompió](#-cómo-se-comprueba-que-nada-se-rompió)
- [Contacto](#-contacto)

---

## 🌺 Sobre el proyecto

Sitio web de marketing y ventas de **Alma Botánica**, una marca de cosmética capilar natural artesanal. El sitio está diseñado como una página de aterrizaje (landing page) de una sola página principal con:

- Presentación de la marca y su fundadora
- Catálogo completo de 12 productos con modal de detalle
- Carrito de compras integrado con pedido por WhatsApp
- Sección de resultados reales de clientes
- FAQ interactivo
- Diseño 100% responsivo para móvil, tablet y desktop

---

## 🌸 Sobre la marca

| | |
|---|---|
| **Marca** | Alma Botánica |
| **Fundadora** | Rosa Pérez — Formuladora Botánica |
| **Ubicación** | Barrio El Pozón, Cartagena de Indias, Bolívar, Colombia |
| **WhatsApp** | [+57 313 548 7027](https://wa.me/573135487027) |
| **Instagram** | [@almabotanica26](https://instagram.com/almabotanica26) |
| **Facebook** | [Alma Botánica](https://www.facebook.com/profile.php?id=61573483268712) |
| **TikTok** | [@alma.botnica](https://tiktok.com/@alma.botnica) |

---

## ✨ Características del sitio

### 🛒 Carrito de compras
- Guardado en `localStorage` (clave: `botanica_cart_v1`) — persiste al cerrar el navegador
- Drawer lateral en desktop / modal desde abajo en móvil
- Botón flotante con contador de items en la nav
- Genera mensaje de pedido formateado para WhatsApp al confirmar
- Modal de confirmación antes de eliminar productos o vaciar el carrito

### 🪟 Modal de producto
- Se abre al hacer clic en cualquier tarjeta del grid
- Carrusel de imágenes con navegación manual (sin autoplay)
- Productos con variantes: cada imagen corresponde a una variante con su propio precio
- Botones de acción: **Agregar al carrito** + **Pedir por WhatsApp**
- Clic en imagen dentro del modal → lightbox con zoom y navegación

### 🎠 Carruseles
- Tarjetas del grid con autoplay cada 4 segundos
- Navegación táctil (swipe) en móvil
- Carrusel de resultados de clientes (antes/después) con lightbox y zoom

### 📖 FAQ Acordeón
- 10 preguntas frecuentes con animación suave
- Solo una pregunta abierta a la vez

### 🔍 SEO
- `<title>` optimizado: nombre + cargo + ciudad + barrio del punto físico (`Cartagena de Indias, Barrio El Pozón`) — ayuda a la gente a ubicarse desde el resultado de búsqueda
- `<meta description>` natural, 154 caracteres, con palabras clave locales
- `<meta keywords>` con 15 términos clave capilares y de ubicación
- `<meta robots>` con directivas avanzadas: `max-snippet:-1`, `max-image-preview:large`
- **Geo tags** de posicionamiento local: región, ciudad y coordenadas de Cartagena de Indias
- `<link rel="canonical">` apuntando a la URL oficial
- **Open Graph** completo para previsualizaciones en WhatsApp, Facebook e Instagram — imagen: logo de Alma Botánica
- **Twitter Card** configurado
- **JSON-LD** `WebSite` + `LocalBusiness` con dirección, teléfono, fundadora, `areaServed` y `knowsAbout`
- **`sitemap.xml`** en la raíz con la portada y el catálogo — las páginas legales y la 404 llevan `noindex`
- **`robots.txt`** en la raíz permitiendo todo el rastreo
- **Google Search Console** verificado y sitemap enviado el 25/06/2026
- **JSON-LD productos** con precio (COP) y disponibilidad — permite a Google mostrar precios en resultados de búsqueda

### ⚡ Rendimiento
- Sin frameworks (sin jQuery, sin React, sin Three.js). La única librería de terceros es `pdf-lib`, y solo se descarga al pulsar el botón del catálogo
- **Todas las fotos (`img/`) en formato WebP** (29 MB → 8,3 MB) — sin `.jpeg`/`.jpg` en el sitio; solo los iconos de pestaña y de app son PNG, porque Safari y los navegadores viejos no aceptan iconos WebP
- Fuentes Google cargadas de forma no bloqueante (`preload` + `onload`)
- Imagen hero con `fetchpriority="high"` para mejorar el LCP
- 35 imágenes con `loading="lazy"`
- Las 38 imágenes de la portada llevan `width` y `height` (todas menos las de los dos visores ampliados, que no tienen foto hasta que se abren) — el navegador reserva el espacio antes de que carguen y la página no da saltos al abrirse (CLS, que Google mide en Core Web Vitals)
- Analytics y ContentSquare no se cargan con la página: `js/cookies.js` los inyecta (`async`) solo si la persona acepta las cookies

### 🎨 Paleta e identidad visual
- Colores tomados directamente del logo: **verde salvia** (acentos interactivos), **bronce** (texto de énfasis y botones), **dorado** (detalles premium, badge de Kits) y **marfil** (fondos)
- Tipografía: **Marcellus** (títulos, la más parecida a las letras del logo) + **Poppins** (cuerpo)
- El botón de WhatsApp usa el bronce del sitio en vez del verde oficial de WhatsApp, por decisión de marca — Instagram y Facebook conservan sus colores oficiales

### 🎨 Efectos visuales
- **Underline deslizante** en la navegación: línea que aparece de izquierda a derecha al pasar el cursor sobre los links (CSS puro, sin JavaScript)
- **Borde dorado animado** exclusivo en la tarjeta de Kits Completos
- **Reveal animations** al hacer scroll con `IntersectionObserver`

### 🌿 Testimonio de Rosa
- Sección entre "Nosotras" y "Resultados" con la foto antes/después de Rosa publicada en IG/FB
- Imagen con `mix-blend-mode:multiply` — fondo blanco desaparece y se integra con el fondo de la página
- Badge "Rosa Pérez / Formuladora · Botánica / 🌿 Antes · Después ✨" — idéntico al de la sección Nosotras
- Texto original de Rosa sin modificar + botones de Instagram y Facebook con SVG inline
- Clases: `.testi-layout`, `.testi-img-wrap`, `.testi-img`, `.testi-badge`, `.testi-social`, `.testi-link`

### 🏷️ Crédito de desarrollo
- Footer incluye "Diseño y desarrollo: JX Company" con identidad visual propia (plateado + dorado)

---

## 📄 Páginas legales

El sitio tiene cuatro documentos legales, redactados según la ley **colombiana** (no según el RGPD europeo, que aquí no aplica). Todos llevan `noindex`: existen para quien los busque, pero no compiten en Google con la página principal.

| Página | Qué cubre | Norma |
|---|---|---|
| `privacidad.html` | Qué datos se recogen, para qué, con quién se comparten y cómo ejercer tus derechos | Ley 1581 de 2012 · Decreto 1377 de 2013 |
| `cookies.html` | Qué cookies usa el sitio, en tabla, y cómo aceptarlas o rechazarlas | Resolución 32.126 de 2022 de la SIC |
| `terminos.html` | Condiciones de uso y propiedad intelectual de textos, fotos, logo y marca | — |
| `ventas.html` | Cómo comprar, envíos, garantía, cambios y derecho de retracto | Ley 1480 de 2011 (Estatuto del Consumidor) |

> ⚠️ **Estos textos deben ser revisados por un abogado antes de considerarse definitivos.** Son un estándar de trabajo profesional, no asesoría legal.

> 📌 Hay **21 datos marcados como `{POR CONFIRMAR}`** dentro de las páginas (cédula, correo de habeas data, plazos, envío, garantía y cambios; el detalle está en "Estado del proyecto"). Aparecen resaltados en amarillo a propósito, para que nadie los pase por alto. Cuando Rosa los confirme, se reemplazan.
>
> Al revisarlas, que el abogado mire en especial la sección 3 de `cookies.html`: los datos técnicos (carrito, datos de entrega, la decisión sobre cookies, la copia para abrir sin internet) se guardan sin pasar por el banner, porque sin ellos esas funciones no existen; lo que mide o pone un tercero sí espera al "Aceptar".

---

## 🍪 Cómo funciona el banner de cookies

En Colombia el consentimiento debe ser **previo, expreso e informado**: no vale asumir que la persona acepta por seguir navegando, y no hay cookies "exentas" como en Europa.

Por eso el sitio funciona así:

1. La primera vez que alguien entra, aparece un banner abajo con dos botones: **Aceptar** y **Rechazar**, del mismo tamaño y con el mismo peso visual.
2. **Hasta que no elija, no se carga la medición ni el mapa**: ni Google Analytics, ni ContentSquare, ni el mapa de Google.
3. Si acepta, se activan en ese momento. Si rechaza, no se activa nada y el banner no vuelve a aparecer.
4. La decisión se guarda en su propio navegador y puede cambiarla cuando quiera con el enlace **"Configuración de cookies"** que está en el pie de todas las páginas.

Lo que el propio sitio guarda en el navegador para que funcionen el carrito, los datos de entrega, el aviso de instalar, el video y el modo sin internet **no** pasa por el banner: se queda en el dispositivo y está declarado, uno por uno, en la tabla de `cookies.html`.

Todo eso vive en `js/cookies.js`. **Importante para quien edite el sitio:** `js/analytics.js` y `js/hotjar.js` ya no se enlazan en el `<head>`. Si alguien los vuelve a poner ahí, el sitio deja de cumplir la norma.

---

## 📈 Dónde ve Rosa su tráfico (en simple)

El sitio mide visitas con Google Analytics. Para revisarlo:

1. Entra a [analytics.google.com](https://analytics.google.com) con la cuenta de Google del negocio.
2. Elige la propiedad de **Alma Botánica**.

Lo más útil de mirar:

| Quiero saber... | Dónde |
|---|---|
| Cuánta gente entró y en qué días | **Informes → Adquisición → Visión general** |
| De dónde llegan (Instagram, Google, WhatsApp, directo) | **Informes → Adquisición → Adquisición de tráfico** |
| Desde qué ciudad entran | **Informes → Usuario → Datos demográficos** |
| Si entran desde celular o computador | **Informes → Usuario → Tecnología** |
| **Cuánta gente escribió por WhatsApp** | **Informes → Interacción → Eventos** |

En Eventos aparecen estos nombres, que son los que de verdad importan porque miden ventas potenciales:

- `whatsapp_flotante` — clics en el botón flotante de WhatsApp (el redondo de la esquina)
- `pedido_whatsapp` — clics en "Pedir por WhatsApp" desde el carrito o desde un producto
- `whatsapp_enlace` — cualquier otro enlace a WhatsApp del sitio
- `como_llegar_mapa` — clics en "Cómo llegar" en el mapa

> Ojo: solo se mide a quienes **aceptaron las cookies**. Los números reales de visitas siempre son un poco más altos que lo que muestra Analytics.

---

## 🔑 Propiedad

- **El código y todo el contenido del sitio son propiedad de Alma Botánica (Rosa Pérez).** JX Company lo desarrolló; la marca, los textos y las fotografías son del cliente.
- **Dominio** `alma-botanica.store`: registrado en GoDaddy, a nombre del cliente.
- **DNS y hosting:** Cloudflare (Cloudflare Pages), a nombre del cliente.
- **Repositorio:** GitHub, cuenta `Jampier-Developer`.

---

## 🧴 Productos

El sitio presenta **12 productos** organizados en un grid de 3 columnas. Los 3 más nuevos aparecen primero; el Termoprotector lleva además el distintivo **🌿 Nuevo**.

| # | Producto | Precio | Contenido | Variantes |
|---|---|---|---|---|
| 1 | **Termoprotector** *(🌿 Nuevo)* | $28.000 | 250ml | — |
| 2 | **Mascarilla Nutritiva** | $25.000 | 120ml | — |
| 3 | **Rescate Supremo** | $40.000 | 500ml | — |
| 4 | Shampoos | desde $32.000 | 500ml | Romero · Nutritivo · Aguacate |
| 5 | Acondicionadores | desde $32.000 | 500ml | Romero · Nutritivo · Aguacate · Cebolla |
| 6 | Tónicos Capilares | desde $15.000 | 120ml | Romero · 7 Aceites · Bomba |
| 7 | Gel Fijador Hidratante | $13.000 | 300ml | — |
| 8 | Tratamiento Capilar | $25.000 | 250ml | — |
| 9 | Kits Completos 🌟 | desde $60.000 | por kit | 8 kits: Cebolla Premium · Aguacate Premium · Linaza · Nutritivo · Romero · Romero Premium · Cebolla · Aguacate |
| 10 | Crema para Peinar | $28.000 | 200ml | — |
| 11 | Bio Repolarizador | $32.000 | 120ml | — |
| 12 | Pree Poo | $25.000 | 250ml | — |

> Los datos de cada producto (nombre, precio, descripción, beneficios, imágenes) viven en el array `PRODUCTS[]` dentro de `js/forms.js`.

---

## 🛠 Stack tecnológico

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura y semántica |
| **CSS3** | Estilos, animaciones, diseño responsivo |
| **JavaScript Vanilla** | Interactividad, carrito, modales, carruseles |
| **Cloudflare Pages** | Hosting y despliegue continuo |
| **Google Analytics** | Métricas de tráfico (`G-D9VGNFGPMP`) |
| **ContentSquare / Hotjar** | Mapas de calor y grabaciones de sesión |
| **Marcellus** | Fuente de títulos (Google Fonts) |
| **Poppins** | Fuente de cuerpo (Google Fonts) |
| **WebP** | Formato de todas las imágenes del sitio |

> Sin frameworks, sin npm, sin webpack, sin paso de compilación. Solo archivos estáticos.
>
> **Una sola librería de terceros:** `js/vendor/pdf-lib.min.js` (513 KB, MIT),
> que escribe el nombre de la persona en la portada del catálogo. Se guarda en
> el repositorio en vez de traerla de un CDN, y **no se carga al abrir ninguna
> página**: `js/forms.js` la pide solo cuando alguien pulsa "Descargar catálogo
> PDF". Si no llega, el catálogo se descarga igual, sin el saludo.

---

## 📁 Estructura de archivos

```
ALMA-BOTANICA/
│
├── index.html              # Página principal (landing page)
├── catalogo.html           # Página del catálogo: descarga el PDF
├── privacidad.html         # Política de privacidad (noindex)
├── cookies.html            # Política de cookies (noindex)
├── terminos.html           # Términos y condiciones (noindex)
├── ventas.html             # Políticas de venta (noindex)
├── 404.html                # Página de error propia (noindex)
│
├── catalogo-alma-botanica.pdf  # El catálogo que descarga la gente (16 pág.)
├── sw.js                   # Service worker: hace que funcione sin internet
│
├── css/
│   ├── reset.css           # Variables CSS globales y reset base
│   ├── layout.css          # Estilos de index.html
│   ├── legal.css           # Estilos de las 4 páginas legales y la 404
│   └── catalogo.css        # Estilos exclusivos de catalogo.html
│
├── js/
│   ├── forms.js            # Array PRODUCTS[], modales. Lo comparte en
│   │                       # window.ALMA_PRODUCTS para el test y los filtros
│   ├── cart.js             # Carrito, localStorage y el mensaje del pedido
│   ├── interactions.js     # Nav, FAQ, carruseles, lightbox y el anuncio
│   ├── cookies.js          # Banner de consentimiento; inyecta analytics y
│   │                       # hotjar SOLO si la persona acepta
│   ├── quiz.js             # El test "¿cuál es para mí?"
│   ├── filtros.js          # Buscador y filtros del grid
│   ├── whatsapp.js         # Mensaje del botón flotante según la sección
│   ├── social.js           # Aviso de pedidos recientes
│   ├── pedidos.js          # ← LOS DATOS de esos pedidos (los pone Rosa)
│   ├── resenas.js          # Sección de reseñas y su JSON-LD
│   ├── resenas-datos.js    # ← LAS RESEÑAS (las pone Rosa)
│   ├── extras.js           # Comparador, regalo y datos de entrega
│   ├── pwa.js              # Registra sw.js y ofrece instalar la página
│   ├── analytics.js        # Google Analytics (lo carga cookies.js)
│   ├── hotjar.js           # ContentSquare/Hotjar (lo carga cookies.js)
│   ├── catalogo.js         # Saludo personalizado en catalogo.html
│   └── vendor/
│       ├── pdf-lib.min.js  # Escribe el nombre en el PDF (lo pide forms.js
│       │                   # solo al descargar el catálogo)
│       └── LEEME.md
│
├── video/
│   └── anuncio-alma-botanica.mp4   # El del modal de bienvenida (1,5 MB)
│
├── tools/
│   └── catalogo-pdf/       # Genera el PDF desde los datos del sitio.
│                           # NO forma parte de la web. Tiene su README.
│
├── functions/
│   └── _middleware.js      # Redirect 301 pages.dev -> alma-botanica.store
│
├── _headers                # Cache-Control de Cloudflare Pages para css/ y js/
├── robots.txt              # Permite todo el rastreo, incluidos bots de IA
├── sitemap.xml             # La portada y el catálogo (lo legal y la 404 llevan noindex)
├── llms.txt                # Resumen del negocio para asistentes de IA
├── site.webmanifest        # Iconos y datos de PWA
├── favicon.ico, favicon.png, apple-touch-icon.png,
│   icon-192.png, icon-512.png   # Iconos de pestaña y de app (PNG a propósito)
├── googleb9bed816d05afe45.html  # Verificación de Search Console: NO borrar
│
└── img/
    ├── Shampoos/
    ├── acondicionador/
    ├── Tonicos-Capilares/
    ├── Gel/
    ├── Tratamientos/
    ├── Kits/
    ├── Crema para Peinar/
    ├── BIO REPOLARIZADOR/
    ├── PREE PO/
    ├── Termoprotector/
    ├── Mascarilla Nutritiva/
    ├── Rescate Supremo/
    ├── Rosa-Perez-Fundadora/
    ├── Img Logo/
    └── Clientes y Resultados/
```

---

## 💻 Cómo correr localmente

No requiere instalación. Solo abre `index.html` en tu navegador, o usa un servidor local simple:

```bash
# Con Python (viene en macOS/Linux)
python -m http.server 8000

# Con VS Code
# Instala la extensión "Live Server" y haz clic en "Go Live"
```

Luego abre `http://localhost:8000` en tu navegador.

---

## ✨ Qué puede hacer la página

Además del catálogo, el carrito y el pedido por WhatsApp de siempre:

| | Qué hace | Dónde vive |
|---|---|---|
| **Test "¿cuál es para mí?"** | Cuatro preguntas y recomienda 2 o 3 productos con el motivo de cada uno | `js/quiz.js` |
| **Buscador y filtros** | Busca por nombre o por activo (romero, aguacate…) y filtra por necesidad sin recargar | `js/filtros.js` |
| **Pedidos recientes** | Aviso discreto de lo que otras personas acaban de pedir | `js/social.js` + `js/pedidos.js` |
| **WhatsApp con contexto** | El mensaje cambia según la sección y avisa de lo que hay en el carrito | `js/whatsapp.js` |
| **Reseñas** | Con nota media y estrellas en Google cuando sean reales | `js/resenas.js` |
| **Sin internet + instalable** | La página abre sin señal y se puede instalar como app | `sw.js` + `js/pwa.js` |
| **Antes / después** | Barra que se arrastra para comparar las fotos de las clientas | `js/extras.js` |
| **Datos de entrega** | Nombre, barrio y dirección dentro del mensaje del pedido | `js/extras.js` + `js/cart.js` |
| **Modo regalo** | Casilla, destinatario y dedicatoria, dentro del pedido | `js/extras.js` + `js/cart.js` |
| **Anuncio en video** | Se abre una vez por visita y se cierra al acabar el video | `js/interactions.js` |

> **Los pedidos recientes y las reseñas traen contenido de ejemplo.** No se
> le muestra a nadie: solo aparece abriendo la página con `?demo=1`. Cuando
> Rosa ponga datos reales en `js/pedidos.js` y `js/resenas-datos.js` y les
> quite el `ejemplo:true`, se encienden solos.

---

## 🏷️ Versión de la página

En la portada, encima de la píldora de "100% Natural", hay un distintivo
pequeño: **🌿 v1.3**. Sirve para saber de un vistazo qué versión está
publicada, sin tener que mirar el repositorio.

### Dónde se cambia

**Un solo sitio.** En `index.html`, dentro de `.hero-content`:

```html
<span class="version-pill" title="Versión publicada el 14 de octubre de 2026">
  <span aria-hidden="true">🌿</span> v1.3
</span>
```

Se cambia el número **y también la fecha del `title`** (es lo que se ve al
dejar el cursor encima).

### Cuándo se sube, y cuánto

**Se sube en cada publicación a `main`**, porque cada push a `main` sale en
vivo. Si no cambia nada visible, no hace falta.

**Dos números, nada más.** En cada publicación sube el segundo:

```
v1.0  →  v1.1  →  v1.2  →  v1.3  →  v1.4  …
```

No se usan terceros números (nada de `v1.0.1`). Da igual si el cambio fue
grande o pequeño: **cada publicación a `main` es una versión nueva** y el
historial de abajo cuenta qué trajo.

| Cuánto sube | Cuándo |
|---|---|
| **v1.4 → v1.5** | Cualquier publicación: una función nueva, un arreglo, un texto, un precio |
| **v1.x → v2.0** | Solo un rediseño grande o un cambio de fondo en cómo funciona la página |

### Al subir la versión, acuérdate de

1. Cambiar el número **y la fecha del `title`** en `index.html`
2. Añadir la fila al **historial de aquí abajo**, contando qué trajo
3. Subir el `?v=` de CSS y JS, la `VERSION` de `sw.js` y la de
   `js/cookies.js` (ver "Cosas que hay que recordar al editar")

### Historial de versiones

| Versión | Fecha | Qué trajo |
|---|---|---|
| **v1.3** | 14 oct 2026 | **Página más corta y enfocada en los productos.** **Carrito:** los campos de "¿A dónde te lo llevamos?" y "Es un regalo" no salían si el carrito se abría desde "Ver carrito"; se borraban al cambiar una cantidad; y la casilla de regalo salía desmarcada aunque el pedido seguía llegando a Rosa como regalo. Ahora salen siempre y conservan lo escrito. **Textos:** sin promesas de efecto médico (minoxidil, "estudios clínicos demuestran", "crecimiento extremo"); los kits con un solo nombre, en singular y "por kit" en vez de "500 ml"; FAQ de kits y de envíos al día; en la portada, una garantía que existe (la legal) y fuera el "Cancela cuando quieras". **Legal:** la política de cookies declara todo lo que se guarda en el navegador, privacidad explica los datos de entrega y el nombre del catálogo, y ventas dice lo mismo que la FAQ (solo Cartagena). **Además:** PDF regenerado con vigencia de octubre, Cambios/Garantía/PQR del pie llevan a las políticas de venta (y el título de la sección ya no queda bajo la cabecera), ids únicos en los comparadores, enlaces de Instagram sin rastreadores, el contador del carrito ya no muestra un "0" con el carrito vacío, el carrito cerrado no recibe el foco del tabulador, Escape o un clic fuera de "¿Agregar uno más?" ya no abren el carrito, el anuncio en video ya no se abre encima del banner de cookies, y el distintivo de versión ya no queda bajo el menú. |
| **v1.2** | 18 sep 2026 | **El catálogo lleva el nombre de quien lo descarga**, en el archivo y en la portada del PDF. Además: la ficha de datos del mapa agrupaba mal (la etiqueta quedaba a 14px del grupo de arriba y a 18px de su propio dato, así que "Horarios" parecía pertenecer a la dirección); y los nombres de producto se salían del borde de la tarjeta en pantallas de 320 a 390px — "Acondicionadores" es una sola palabra y no cabía. |
| **v1.1** | 18 sep 2026 | El test "¿cuál es para mí?" pasa de estar **encima** del grid a estar **debajo**: lo primero que hay que enseñar son los productos, y quien baja hasta el test es porque los vio y no se decidió. De paso se arregla la alternancia de fondos, que había quedado con tres secciones crema seguidas al añadir las nuevas. |
| **v1.0** | 18 sep 2026 | Primera versión numerada. Catálogo en PDF de 16 páginas, precios visibles en el grid, anuncio en video y funciones nuevas: test de recomendación, buscador y filtros, pedidos recientes, WhatsApp con contexto, reseñas, funcionamiento sin internet e instalable, comparador antes/después, datos de entrega y modo regalo. Además: limpieza de código muerto, `width`/`height` en todas las imágenes y caché de un año versionada. |

> Antes de la v1.0 el sitio no llevaba número. Lo publicado hasta el 8 de
> septiembre de 2026 se puede considerar la v0.

---

## 🧪 Contenido de ejemplo — leer antes de tocarlo

Dos archivos traen datos de muestra para que se vea cómo queda la sección
antes de tener contenido real:

| Archivo | Qué guarda |
|---|---|
| `js/pedidos.js` | Los pedidos del aviso de abajo a la izquierda |
| `js/resenas-datos.js` | Las reseñas con estrellas |

**Tres puertas impiden que eso salga a producción por accidente:**

1. Cada entrada lleva `ejemplo:true`
2. Se muestran con la palabra **"Ejemplo"** a la vista
3. Solo aparecen abriendo la página con **`?demo=1`** al final de la dirección

Para verlos: [alma-botanica.store/?demo=1](https://alma-botanica.store/?demo=1)

**Para encenderlos de verdad:** Rosa escribe entradas reales y se les quita el
`ejemplo:true`. No hay que tocar nada más — la sección aparece sola.

> ⚠️ **Mientras quede una sola entrada de ejemplo, la nota media de las reseñas
> NO se le manda a Google.** Publicar valoraciones inventadas en los datos
> estructurados va contra las normas de Google (puede costar los resultados
> enriquecidos para siempre) y es publicidad engañosa según la **Ley 1480 de
> 2011**. La comprobación está en `js/resenas.js` y no se debe quitar.

Lo mismo con los pedidos: inventarlos es publicidad engañosa. Rosa anota los
suyos y conviene repasarlos de vez en cuando — un pedido de "hace 3 días" que
lleve un mes ahí se nota.

---

## ⚙️ Cosas que hay que recordar al editar

Seis reglas que, si se olvidan, rompen algo sin avisar:

### 1. Al tocar `css/` o `js/`: subir la versión (son tres números)

```bash
V=20261014   # la fecha de hoy, AAAAMMDD
sed -i "s/?v=[0-9]\{8\}/?v=$V/g" *.html js/*.js sw.js
sed -i "s/VERSION = '[0-9]\{8\}'/VERSION = '$V'/" js/cookies.js
sed -i "s/alma-v[0-9]\{8\}/alma-v$V/" sw.js
```

- **El `?v=`** de los HTML: si no se sube, quien ya visitó el sitio sigue
  viendo la versión vieja durante un año. También va en `js/forms.js` (la
  librería del PDF) y en la lista de `sw.js`.
- **La `VERSION` de `js/cookies.js`:** ese archivo inyecta Analytics y
  ContentSquare por su cuenta y lleva su propia copia del número.
- **La `VERSION` de `sw.js`:** el service worker guarda copia del sitio para
  que funcione sin internet; si no se sube, sigue sirviendo los archivos
  viejos aunque el `?v=` haya cambiado.

Para comprobar que quedó parejo:

```bash
grep -oh '?v=[0-9]\+' *.html js/*.js sw.js | sort -u   # una sola línea
grep -n "VERSION = " js/cookies.js sw.js                # la misma fecha
```

### 2. Los precios viven en CINCO sitios, más el PDF

| Dónde | Qué es |
|---|---|
| `PRODUCTS[]` en `js/forms.js` | El detalle del modal y la fuente del resto (test, buscador, PDF) |
| Las tarjetas de `index.html` (`.pc-price-amount`) | Lo que se ve en el grid |
| El JSON-LD `hasOfferCatalog` del `<head>` | Lo que lee Google |
| La tabla de `llms.txt` | Lo que leen los asistentes de IA |
| La tabla "Productos" de este README | La documentación |

Tienen que coincidir. El precio mínimo de los kits ("desde $60.000") sale
además en la pregunta frecuente de los kits, que está dos veces (ver la
regla 4). Después hay que **regenerar el PDF** (ver más abajo) y actualizar
la línea de vigencia de su última página.

### 3. Los textos de producto: cosméticos, no medicamentos

Los productos son cosméticos. Los textos pueden decir que algo **ayuda a**
fortalecer o a disminuir la caída, pero no prometer efectos de tratamiento
ni apoyarse en estudios que no están citados: nada de "tan efectivo como el
minoxidil", "estudios clínicos demuestran", "bloquea causas hormonales" o
"crecimiento extremo". Los propios términos (`terminos.html`, sección 7)
dicen que los productos no curan ni tratan nada; los textos de venta no
pueden contradecirlos.

### 4. La FAQ está dos veces

Las preguntas frecuentes están en la sección `#faq` y en el JSON-LD
`FAQPage` del `<head>`. Google exige que digan **exactamente** lo mismo: si
se edita una, se edita la otra.

### 5. Todo lo que se guarde en el navegador va declarado

Si se añade algo que use `localStorage`, `sessionStorage` o cookies, hay que
sumarlo a la tabla de `cookies.html` (sección 2) y, si es un dato personal,
explicarlo en `privacidad.html` (sección 2). Hoy son: `botanica_cart_v1`,
`alma_cookies_consent_v1`, `botanica_entrega_v1`, `botanica_instalar_no`,
`botanica_anuncio_visto`, `botanica_avisos_off` y la copia de `sw.js`.

### 6. El carrito se repinta entero, y su pie no se desplaza

`js/cart.js` vuelve a pintar la lista y el pie del carrito cada vez que
cambia algo, y eso borra lo que hubiera dentro. Por eso los bloques de regalo
y de datos de entrega (`js/extras.js`) se montan de nuevo cada vez que
`cart.js` lanza el evento `alma:carrito-pintado`, y lo escrito se guarda en
memoria, no en el formulario.

Esos bloques van **al final de la lista** (`#cartBody`, que hace scroll) y
**no en el pie**: el pie no se desplaza, y con ellos dentro el botón "Enviar
pedido por WhatsApp" quedaba fuera de la pantalla en celulares de pantalla
corta. Cualquier cosa nueva que se añada al carrito tiene que seguir el mismo
camino, y hay que probarla a 320×568, 360×640 y 375×667.

---

## 📕 El catálogo en PDF

`catalogo-alma-botanica.pdf` (16 páginas, 5,7 MB) es el archivo que descarga
la gente desde el botón "Catálogo" de la portada y desde `catalogo.html`.

Lleva portada, la página de Rosa, una ficha por cada uno de los 12 productos
con foto, descripción, beneficios y **precios de las 26 presentaciones**, y
una última página con cómo pedir y los datos de contacto.

### Lleva el nombre de quien lo descarga

El modal pide el nombre, así que el nombre se honra en dos sitios:

1. **En el archivo:** `Maria Jose - Catalogo Alma Botanica - Rosa Perez.pdf`
2. **En la portada del PDF:** un `🌿 PARA MARÍA JOSÉ` en dorado, justo encima
   del logo, en la misma tipografía mono y con el mismo espaciado que el
   "ROSA PÉREZ · COSMÉTICA NATURAL" que ya estaba ahí.

Lo hace `js/forms.js` con `pdf-lib`, en el navegador de la persona. El PDF que
está en el servidor **nunca cambia**: se le añade el saludo al vuelo, tarda
menos de medio segundo y el archivo no engorda.

Dos detalles que parecen caprichos y no lo son:

- **En el nombre del archivo se quitan las tildes y la ñ.** Si el atributo
  `download` lleva un carácter fuera del ASCII, el navegador descarta el nombre
  entero y el archivo acaba llamándose `download`. Con medio país llamándose
  María, José o Muñoz, eso no es un caso raro. **Dentro del PDF sí se
  conservan**, porque ahí no hay esa limitación.
- **El saludo se dibuja letra a letra.** Se intentó con la opción
  `characterSpacing` de pdf-lib y no llegaba a escribirse en el archivo: el
  texto salía junto y, como el centrado sí contaba con ese aire, quedaba 18 pt
  corrido a la derecha.

Si algo falla —no llega la librería, el navegador es viejo, el nombre no se
puede pintar— **se entrega el catálogo tal cual**. Perder el saludo es un
detalle; perder la descarga, no.

**No se escribió a mano.** Se genera a partir del array `PRODUCTS[]` de
`js/forms.js` y de las fotos de `img/`, con la misma paleta y las mismas
tipografías del sitio. Por eso, cuando Rosa cambie un precio o un texto de
producto:

1. Se actualiza en todos los sitios donde vive (ver "Cosas que hay que
   recordar al editar", regla 2).
2. Se regenera el PDF con los pasos de `tools/catalogo-pdf/README.md` y se
   reemplaza el archivo.

La última página del PDF lleva la línea *"Precios vigentes a octubre de
2026… sujetos a cambio"*, que hay que actualizar al regenerarlo (está en la
función `order()` de `tools/catalogo-pdf/build.js`).

> El PDF se sirve con caché de un día, no de un año como el resto de
> archivos estáticos: así una versión nueva llega pronto sin que cada
> visita tenga que descargar 5,7 MB.

---

## ⚠️ Si editas CSS o JavaScript: sube la versión

Los archivos de `css/` y `js/` se guardan en el navegador de quien visita
durante un año, porque van marcados con `?v=` en el HTML. Eso hace que el
sitio cargue mucho más rápido en la segunda visita.

El precio de eso es una regla que **no se puede olvidar**: si cambias un
archivo de `css/` o `js/` y no subes el número, quien ya entró antes sigue
viendo la versión vieja. No es que el cambio no se haya subido — es que su
navegador no vuelve a pedir el archivo.

Los comandos para subirla de una sola vez, y para comprobar que quedó
pareja, están en "Cosas que hay que recordar al editar", regla 1. Son
**tres** números (el `?v=`, la `VERSION` de `js/cookies.js` y la de
`sw.js`), no uno.

---

## 🚀 Flujo de despliegue

El sitio se despliega automáticamente en Cloudflare Pages cada vez que se hace push a la rama `main`.

```bash
# 1. Hacer cambios en los archivos
# 2. Agregar los cambios
git add nombre-del-archivo

# 3. Crear commit
git commit -m "descripción del cambio"

# 4. Subir a GitHub → Cloudflare despliega automáticamente
git push origin main
```

**Rama principal:** `main`
**Repositorio:** [github.com/Jampier-Developer/ALMA-BOTANICA](https://github.com/Jampier-Developer/ALMA-BOTANICA)

---

## 📊 SEO y Analytics

- **Google Analytics:** `G-D9VGNFGPMP`
- **Canonical URL:** `https://alma-botanica.store/`
- **Dominio propio:** `alma-botanica.store` — activo desde 06/07/2026 (DNS en Cloudflare)
- **Redirect:** `alma-botanica.pages.dev` → `alma-botanica.store` vía `functions/_middleware.js` (301)
- **Google Search Console:** propiedad `https://alma-botanica.store/` verificada, sitemap enviado el 06/07/2026

---

## 🧭 Cómo se comprueba que nada se rompió

No hay tests automáticos en el repo, pero esta es la revisión que se siguió y que
conviene repetir antes de cualquier push a `main`. Se hace con un navegador de
verdad (Chromium + Playwright), no leyendo el código:

| Qué se mira | Cómo |
|---|---|
| **Responsive** | Las 7 páginas a 14 anchos distintos (320 → 1920px), buscando desbordes horizontales |
| **Errores** | Consola del navegador y peticiones fallidas en cada combinación |
| **Imágenes** | Que ninguna referencia apunte a un archivo que no existe, y que no sobre ninguna |
| **Carrito** | Abrir producto → agregar → badge → drawer → total → mensaje de WhatsApp. Y abrir el carrito por los tres caminos (icono del menú, "Ver carrito" del aviso y la confirmación de "¿Agregar uno más?"), cambiar cantidades y comprobar que los campos de entrega y regalo siguen ahí con lo escrito |
| **Cookies** | Que Analytics **no** cargue antes de aceptar (esto es lo que hace que el sitio cumpla la norma) |
| **Sin internet** | Apagar la red y recargar: la página tiene que abrir |
| **Contraste** | Relación de contraste del texto contra su fondo real (mínimo 4.5:1) |
| **Teclado** | Que el test, los filtros y el comparador se usen sin ratón |

> **Ojo con el navegador de pruebas:** el Chromium de Playwright **no trae el
> códec H.264**, así que el video del anuncio no se reproduce ahí. Eso no es un
> fallo del sitio — en cualquier navegador real funciona. Para probar la lógica
> del anuncio hay que simular el elemento `<video>`.

### Fallos que se encontraron probando (no leyendo)

Se dejan anotados porque son el tipo de cosa que vuelve a aparecer:

- **Una imagen borrada por error.** `Termoprotector 1.webp` se dio por huérfana
  y sí se usaba: es la primera foto de su carrusel, y su ruta vive dentro de
  `js/forms.js`, no en un `src=` del HTML. **Al buscar imágenes sin usar hay que
  mirar también dentro del JavaScript.**
- **Tarjetas invisibles al filtrar.** Las tarjetas llevan `.reveal`, que las deja
  en `opacity:0` hasta que entran en pantalla. Una tarjeta ocultada por el filtro
  antes de haber entrado nunca recibía la clase, y al volver a mostrarla dejaba
  el hueco sin el producto. La clase correcta es **`.on`**, no `.visible`.
- **La barra de navegación desbordaba** 104px entre 768 y 900px al añadirle dos
  enlaces: en esa franja se enseñan todos sin hamburguesa.
- **El modal del video se quedaba colgado** si el video no cargaba: sin duración
  no hay evento `ended` ni cuenta atrás.
- **Los campos de entrega y regalo desaparecían.** Se montaban solo al pulsar
  el icono del carrito y el pie se repinta en cada cambio: no salían desde
  "Ver carrito", se borraban al cambiar una cantidad y la casilla de regalo
  volvía desmarcada mientras el pedido seguía yendo como regalo. Y al
  arreglarlo salió otro: puestos en el pie, que no se desplaza, empujaban el
  botón de enviar fuera de la pantalla en celulares de 568 a 667 px de alto.
  Ver la regla 6 de "Cosas que hay que recordar al editar".
- **El anuncio en video tapaba el banner de cookies.** Un plazo de respaldo
  de 6 s lo abría aunque la persona aún no hubiera decidido. Ahora el
  respaldo solo actúa si el banner ya no está.
- **`[hidden]` no escondía nada** en los campos del modo regalo, porque una clase
  con `display:flex` le gana al `[hidden]` del navegador.

---

## 📞 Contacto

**Rosa Pérez — Alma Botánica**

- 📱 WhatsApp: [+57 313 548 7027](https://wa.me/573135487027)
- 📸 Instagram: [@almabotanica26](https://instagram.com/almabotanica26)
- 👤 Facebook: [Alma Botánica](https://www.facebook.com/profile.php?id=61573483268712)
- 🎵 TikTok: [@alma.botnica](https://tiktok.com/@alma.botnica)

---

<p align="center">
  Hecho con 🌿 para <strong>Alma Botánica</strong> · Cartagena de Indias, Colombia<br>
  <sub>Este README se actualizó por última vez el <strong>14 de octubre de 2026</strong> (hora de Colombia).<br>
  Si vuelves a trabajar en el proyecto, empieza por «Estado del proyecto», arriba del todo.</sub>
</p>
