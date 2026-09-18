# 🌿 Alma Botánica — Sitio Web Oficial

> Cosmética capilar 100% natural formulada por **Rosa Pérez** en Cartagena de Indias, Colombia.

[![Estado](https://img.shields.io/badge/Estado-En%20producci%C3%B3n-brightgreen)](https://alma-botanica.store/)
[![Hosting](https://img.shields.io/badge/Hosting-Cloudflare%20Pages-orange)](https://alma-botanica.store/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](/)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](/)

**🌐 URL en vivo:** [alma-botanica.store](https://alma-botanica.store/) · **Última actualización:** 18 de septiembre de 2026, 14:53 (hora de Colombia)

---

## 🗓️ Estado del proyecto

> **Para quien retome esto más adelante (persona o sesión nueva): empieza por aquí.**

**Última sesión de trabajo:** 17–18 de septiembre de 2026
**Rama de esa sesión:** `claude/gifted-tesla-e6s1lj` · 18 commits sobre `main`
**Qué se hizo:** revisión completa del sitio, limpieza, el catálogo en PDF, el
anuncio en video y doce funciones nuevas.

### ✅ Terminado y probado

| | |
|---|---|
| **Limpieza** | CSS muerto, imagen huérfana, BOM, código de confetti, un conflicto de breakpoints a 768px |
| **Rendimiento** | `width`/`height` en las 44 imágenes con medida (CLS), caché de un año versionada con `?v=` |
| **Catálogo en PDF** | 16 páginas, 5,7 MB, generado desde los datos del sitio. El botón por fin lo entrega |
| **Precios a la vista** | En las 12 tarjetas del grid, no solo dentro del modal |
| **Anuncio en video** | Vuelve, con el video del 18/09. Una vez por visita, espera al banner de cookies |
| **12 funciones nuevas** | Ver la tabla de "Qué puede hacer la página" |

### ⏳ Pendiente — hace falta que Rosa aporte datos

1. **Los 4 datos que faltan.** Quedan **23 marcadores `{POR CONFIRMAR}`** en las
   páginas legales (la portada ya está limpia). Los 23 se resuelven con solo
   cuatro datos:

   | Dato | Dónde aparece |
   |---|---|
   | Cédula de Rosa | privacidad, términos y cookies (3 veces) |
   | Un correo de contacto | 5 veces — obligatorio para habeas data (Ley 1581) |
   | Horario de atención | `ventas.html` |
   | Datos de envío | cobertura, transportadora, costo, tiempos, garantía y retracto — 13 veces en `ventas.html` |

2. **Pedidos reales** en `js/pedidos.js` → enciende el aviso de pedidos recientes.
3. **Reseñas reales** en `js/resenas-datos.js` → enciende la sección de reseñas
   y manda la nota media a Google.

> Los puntos 2 y 3 hoy traen contenido de ejemplo que **no se le muestra a
> nadie**. Ver "Contenido de ejemplo" más abajo.

### 💡 Ideas que quedaron fuera

Ninguna pendiente: se propusieron doce y están las doce hechas. Si surgen
nuevas, este es el sitio para anotarlas.

---

## 📋 Tabla de Contenidos

- [Estado del proyecto](#-estado-del-proyecto) ← **empieza aquí**
- [Sobre el proyecto](#-sobre-el-proyecto)
- [Sobre la marca](#-sobre-la-marca)
- [Qué puede hacer la página](#-qué-puede-hacer-la-página)
- [Características del sitio](#-características-del-sitio)
- [Páginas legales](#-páginas-legales)
- [Cómo funciona el banner de cookies](#-cómo-funciona-el-banner-de-cookies)
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
- `<meta keywords>` con 14 términos clave capilares y de ubicación
- `<meta robots>` con directivas avanzadas: `max-snippet:-1`, `max-image-preview:large`
- **Geo tags** de posicionamiento local: región, ciudad y coordenadas de Cartagena de Indias
- `<link rel="canonical">` apuntando a la URL oficial
- **Open Graph** completo para previsualizaciones en WhatsApp, Facebook e Instagram — imagen: logo de Alma Botánica
- **Twitter Card** configurado
- **JSON-LD** `WebSite` + `LocalBusiness` con dirección, teléfono, fundadora, `areaServed` y `knowsAbout`
- **`sitemap.xml`** en la raíz solo con la portada — el resto de páginas llevan `noindex`
- **`robots.txt`** en la raíz permitiendo todo el rastreo
- **Google Search Console** verificado y sitemap enviado el 25/06/2026
- **JSON-LD productos** con precio (COP) y disponibilidad — permite a Google mostrar precios en resultados de búsqueda

### ⚡ Rendimiento
- Sin frameworks ni librerías pesadas (sin jQuery, sin React, sin Three.js)
- **Todas las imágenes en formato WebP** (29MB → 8.1MB, -72%) — sin `.jpeg`/`.jpg`/`.png` en el sitio
- Fuentes Google cargadas de forma no bloqueante (`preload` + `onload`)
- Imagen hero con `fetchpriority="high"` para mejorar el LCP
- 35 imágenes con `loading="lazy"`
- Las 37 imágenes de la portada llevan `width` y `height` — el navegador reserva el espacio antes de que carguen y la página no da saltos al abrirse (CLS, que Google mide en Core Web Vitals)
- Analytics y Hotjar con atributo `defer`

### 🎨 Paleta e identidad visual
- Colores tomados directamente del logo: **verde salvia** (acentos interactivos), **bronce** (texto de énfasis y botones), **dorado** (detalles premium, badge de Kits) y **marfil** (fondos)
- Tipografía: **Marcellus** (títulos, la más parecida a las letras del logo) + **Poppins** (cuerpo)
- El botón de WhatsApp usa el bronce del sitio en vez del verde oficial de WhatsApp, por decisión de marca — Instagram y Facebook conservan sus colores oficiales

### 🎨 Efectos visuales
- **Underline deslizante** en la navegación: línea que aparece de izquierda a derecha al pasar el cursor sobre los links (CSS puro, sin JavaScript)
- **Borde dorado animado** exclusivo en la tarjeta de Kits Completos
- **Reveal animations** al hacer scroll con `IntersectionObserver`
- **Animación de salto** en el Termoprotector al navegar desde el modal promocional

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

> 📌 Hay **25 datos marcados como `{POR CONFIRMAR}`** dentro de las páginas (cédula, correo de habeas data, horarios, datos de envío). Aparecen resaltados en amarillo a propósito, para que nadie los pase por alto. Cuando Rosa los confirme, se reemplazan.

---

## 🍪 Cómo funciona el banner de cookies

En Colombia el consentimiento debe ser **previo, expreso e informado**: no vale asumir que la persona acepta por seguir navegando, y no hay cookies "exentas" como en Europa.

Por eso el sitio funciona así:

1. La primera vez que alguien entra, aparece un banner abajo con dos botones: **Aceptar** y **Rechazar**, del mismo tamaño y con el mismo peso visual.
2. **Hasta que no elija, no se carga nada**: ni Google Analytics, ni ContentSquare, ni el mapa de Google.
3. Si acepta, se activan en ese momento. Si rechaza, no se activa nada y el banner no vuelve a aparecer.
4. La decisión se guarda en su propio navegador y puede cambiarla cuando quiera con el enlace **"Configuración de cookies"** que está en el pie de todas las páginas.

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

El sitio presenta **12 productos** organizados en un grid de 3 columnas. Los 3 más nuevos aparecen primero con badge **🌿 Nuevo**.

| # | Producto | Precio | Contenido | Variantes |
|---|---|---|---|---|
| 1 | **Termoprotector** *(Nuevo)* | $28.000 | 250ml | — |
| 2 | **Mascarilla Nutritiva** *(Nuevo)* | $25.000 | 120ml | — |
| 3 | **Rescate Supremo** *(Nuevo)* | $40.000 | 500ml | — |
| 4 | Shampoos | desde $32.000 | 500ml | Romero · Nutritivo · Aguacate |
| 5 | Acondicionadores | desde $32.000 | 500ml | Romero · Nutritivo · Aguacate · Cebolla |
| 6 | Tónicos Capilares | desde $15.000 | 120ml | Romero · 7 Aceites · Bomba |
| 7 | Gel Fijador Hidratante | $13.000 | 300ml | — |
| 8 | Tratamiento Capilar | $25.000 | 250ml | — |
| 9 | Kit Rutina Completa 🌟 | desde $60.000 | 500ml | 8 variantes |
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

> Sin frameworks, sin npm, sin webpack, sin dependencias externas. Solo archivos estáticos.

---

## 📁 Estructura de archivos

```
ALMA-BOTANICA/
│
├── index.html              # Página principal (landing page)
├── catalogo.html           # Página de catálogo (en construcción, noindex)
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
│   ├── rutina.js           # Rutina paso a paso y fichas de ingredientes
│   ├── extras.js           # Comparador, calculadora, regalo y entrega
│   ├── pwa.js              # Registra sw.js y ofrece instalar la página
│   ├── analytics.js        # Google Analytics (lo carga cookies.js)
│   ├── hotjar.js           # ContentSquare/Hotjar (lo carga cookies.js)
│   └── catalogo.js         # Saludo personalizado en catalogo.html
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
├── sitemap.xml             # Solo la portada (el resto lleva noindex)
├── llms.txt                # Resumen del negocio para asistentes de IA
├── site.webmanifest        # Iconos y datos de PWA
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
| **Buscador y filtros** | Busca por ingrediente y filtra por necesidad sin recargar | `js/filtros.js` |
| **Pedidos recientes** | Aviso discreto de lo que otras personas acaban de pedir | `js/social.js` + `js/pedidos.js` |
| **WhatsApp con contexto** | El mensaje cambia según la sección y avisa de lo que hay en el carrito | `js/whatsapp.js` |
| **Calculadora de duración** | Cuánto dura un producto y a cuánto sale cada lavado | `js/extras.js` |
| **Reseñas** | Con nota media y estrellas en Google cuando sean reales | `js/resenas.js` |
| **Sin internet + instalable** | La página abre sin señal y se puede instalar como app | `sw.js` + `js/pwa.js` |
| **Antes / después** | Barra que se arrastra para comparar las fotos de las clientas | `js/extras.js` |
| **Rutina paso a paso** | Los siete pasos en orden, con el porqué de cada uno | `js/rutina.js` |
| **Datos de entrega** | Nombre, barrio y dirección dentro del mensaje del pedido | `js/extras.js` |
| **Ingredientes** | Seis fichas de los activos botánicos de la línea | `js/rutina.js` |
| **Modo regalo** | Casilla, destinatario y dedicatoria, dentro del pedido | `js/extras.js` |
| **Anuncio en video** | Se abre una vez por visita y se cierra al acabar el video | `js/interactions.js` |

> **Los pedidos recientes y las reseñas traen contenido de ejemplo.** No se
> le muestra a nadie: solo aparece abriendo la página con `?demo=1`. Cuando
> Rosa ponga datos reales en `js/pedidos.js` y `js/resenas-datos.js` y les
> quite el `ejemplo:true`, se encienden solos.

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

Tres reglas que, si se olvidan, rompen algo sin avisar:

### 1. Al tocar `css/` o `js/`: subir el `?v=`

```bash
sed -i 's/?v=[0-9]\{8\}/?v=20260920/g' *.html js/cookies.js
```

Si no se sube, quien ya visitó el sitio sigue viendo la versión vieja durante
un año. El `?v=` de `js/cookies.js` también cuenta: ese archivo inyecta
analytics y hotjar por su cuenta y lleva su propia copia del número.

### 2. Al tocar `css/` o `js/`: subir también la `VERSION` de `sw.js`

Está en la primera línea del archivo. El service worker guarda copia del sitio
para que funcione sin internet; si no se sube su versión, sigue sirviendo los
archivos viejos aunque el `?v=` haya cambiado.

### 3. Los precios viven en TRES sitios

| Dónde | Qué es |
|---|---|
| `PRODUCTS[]` en `js/forms.js` | El detalle del modal y la fuente del resto |
| Las tarjetas de `index.html` (`.pc-price-amount`) | Lo que se ve en el grid |
| El JSON-LD `hasOfferCatalog` del `<head>` | Lo que lee Google |

Tienen que coincidir. Después hay que **regenerar el PDF** (ver más abajo) y
actualizar la línea de vigencia de su última página.

---

## 📕 El catálogo en PDF

`catalogo-alma-botanica.pdf` (16 páginas, 5,7 MB) es el archivo que descarga
la gente desde el botón "Catálogo" de la portada y desde `catalogo.html`.

Lleva portada, la página de Rosa, una ficha por cada uno de los 12 productos
con foto, descripción, beneficios y **precios de las 26 presentaciones**, y
una última página con cómo pedir y los datos de contacto.

**No se escribió a mano.** Se genera a partir del array `PRODUCTS[]` de
`js/forms.js` y de las fotos de `img/`, con la misma paleta y las mismas
tipografías del sitio. Por eso, cuando Rosa cambie un precio:

1. Se actualiza el precio en `js/forms.js`, en la tarjeta de `index.html` y
   en el JSON-LD del `<head>` (los tres sitios, como explica la sección de
   productos).
2. Se regenera el PDF y se reemplaza el archivo.

La última página del PDF lleva la línea *"Precios vigentes a septiembre de
2026… sujetos a cambio"*, que hay que actualizar al regenerarlo.

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

Para subir la versión en todo el sitio de una sola vez:

```bash
# Cambia la fecha por la de hoy (formato AAAAMMDD)
sed -i 's/?v=[0-9]\{8\}/?v=20260920/g' *.html js/cookies.js
```

Luego haz commit y push como siempre. Comprueba que quedó parejo con:

```bash
grep -oh '?v=[0-9]*' *.html js/cookies.js | sort -u
# debe imprimir una sola línea
```

> El `?v=` de `js/cookies.js` también cuenta: ese archivo carga Analytics
> y ContentSquare por su cuenta y lleva su propia copia del número.

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

No hay tests automáticos en el repo, pero esta es la rutina que se siguió y que
conviene repetir antes de cualquier push a `main`. Se hace con un navegador de
verdad (Chromium + Playwright), no leyendo el código:

| Qué se mira | Cómo |
|---|---|
| **Responsive** | Las 7 páginas a 14 anchos distintos (320 → 1920px), buscando desbordes horizontales |
| **Errores** | Consola del navegador y peticiones fallidas en cada combinación |
| **Imágenes** | Que ninguna referencia apunte a un archivo que no existe, y que no sobre ninguna |
| **Carrito** | Abrir producto → agregar → badge → drawer → total → mensaje de WhatsApp |
| **Cookies** | Que Analytics **no** cargue antes de aceptar (esto es lo que hace que el sitio cumpla la norma) |
| **Sin internet** | Apagar la red y recargar: la página tiene que abrir |
| **Contraste** | Relación de contraste del texto contra su fondo real (mínimo 4.5:1) |
| **Teclado** | Que el test, los filtros, la calculadora y el comparador se usen sin ratón |

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
  <sub>Este README se actualizó por última vez el <strong>18 de septiembre de 2026 a las 14:53</strong> (hora de Colombia).<br>
  Si vuelves a trabajar en el proyecto, empieza por «Estado del proyecto», arriba del todo.</sub>
</p>
