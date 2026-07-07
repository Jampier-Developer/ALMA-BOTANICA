# 🌿 Alma Botánica — Sitio Web Oficial

> Cosmética capilar 100% natural formulada por **Rosa Pérez** en Cartagena de Indias, Colombia.

[![Estado](https://img.shields.io/badge/Estado-En%20producci%C3%B3n-brightgreen)](https://alma-botanica.store/)
[![Hosting](https://img.shields.io/badge/Hosting-Cloudflare%20Pages-orange)](https://alma-botanica.store/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](/)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](/)

**🌐 URL en vivo:** [alma-botanica.store](https://alma-botanica.store/) · **Última actualización:** 6 Julio 2026

---

## 📋 Tabla de Contenidos

- [Sobre el proyecto](#-sobre-el-proyecto)
- [Sobre la marca](#-sobre-la-marca)
- [Características del sitio](#-características-del-sitio)
- [Productos](#-productos)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura de archivos](#-estructura-de-archivos)
- [Cómo correr localmente](#-cómo-correr-localmente)
- [Flujo de despliegue](#-flujo-de-despliegue)
- [SEO y Analytics](#-seo-y-analytics)
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
- `<title>` optimizado: nombre + cargo + ciudad
- `<meta description>` natural, 154 caracteres, con palabras clave locales
- `<meta keywords>` con 14 términos clave capilares y de ubicación
- `<meta robots>` con directivas avanzadas: `max-snippet:-1`, `max-image-preview:large`
- **Geo tags** de posicionamiento local: región, ciudad y coordenadas de Cartagena de Indias
- `<link rel="canonical">` apuntando a la URL oficial
- **Open Graph** completo para previsualizaciones en WhatsApp, Facebook e Instagram
- **Twitter Card** configurado
- **JSON-LD** `WebSite` + `LocalBusiness` con dirección, teléfono, fundadora, `areaServed` y `knowsAbout`
- **`sitemap.xml`** en la raíz con las 2 páginas del sitio
- **`robots.txt`** en la raíz permitiendo todo el rastreo
- **Google Search Console** verificado y sitemap enviado el 25/06/2026
- **JSON-LD productos** con precio (COP) y disponibilidad — permite a Google mostrar precios en resultados de búsqueda

### ⚡ Rendimiento
- Sin frameworks ni librerías pesadas (sin jQuery, sin React, sin Three.js)
- Fuentes Google cargadas de forma no bloqueante (`preload` + `onload`)
- Imagen hero con `fetchpriority="high"` para mejorar el LCP
- 22+ imágenes con `loading="lazy"`
- Analytics y Hotjar con atributo `defer`

### 🎨 Efectos visuales
- **Underline deslizante** en la navegación: línea rosa que aparece de izquierda a derecha al pasar el cursor sobre los links (CSS puro, sin JavaScript)
- **Borde dorado animado** exclusivo en la tarjeta de Kits Completos
- **Reveal animations** al hacer scroll con `IntersectionObserver`
- **Animación de salto** en el Termoprotector al navegar desde el modal promocional

### 📢 Modal promocional
- Aparece automáticamente **1.4 segundos** después de cargar la página
- Promueve el **Termoprotector** 🛡️ con imagen y descripción del producto
- **Barra de cuenta regresiva** de 10 segundos — se cierra solo al terminar
- Cierre manual: botón ✕, "No, gracias", clic fuera, tecla Escape
- Al hacer clic en "Ver producto nuevo" → baja a `#productos` y la tarjeta del Termoprotector hace una animación de salto

---

## 🧴 Productos

El sitio presenta **12 productos** organizados en un grid de 3 columnas. Los 3 más nuevos aparecen primero con badge **🌿 Nuevo**.

| # | Producto | Precio | Contenido | Variantes |
|---|---|---|---|---|
| 1 | **Termoprotector** *(Nuevo)* | $25.000 | 200ml | — |
| 2 | **Mascarilla Nutritiva** *(Nuevo)* | $25.000 | 120ml | — |
| 3 | **Rescate Supremo** *(Nuevo)* | $40.000 | 500ml | — |
| 4 | Shampoos | desde $32.000 | 500ml | Romero · Nutritivo · Aguacate |
| 5 | Acondicionadores | desde $32.000 | 500ml | Romero · Nutritivo · Aguacate · Cebolla |
| 6 | Tónicos Capilares | desde $15.000 | 120ml | Romero · 7 Aceites · Bomba |
| 7 | Gel Fijador Hidratante | $13.000 | 300ml | — |
| 8 | Tratamiento Capilar | $23.000 | 250ml | — |
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
| **Cormorant Garamond** | Fuente de títulos (Google Fonts) |
| **Jost** | Fuente de cuerpo (Google Fonts) |

> Sin frameworks, sin npm, sin webpack, sin dependencias externas. Solo archivos estáticos.

---

## 📁 Estructura de archivos

```
Botanica/
│
├── index.html              # Página principal (landing page)
├── catalogo.html           # Página de catálogo (en construcción)
│
├── css/
│   ├── reset.css           # Variables CSS globales y reset base
│   ├── layout.css          # Todos los estilos (1050+ líneas)
│   └── catalogo.css        # Estilos exclusivos de catalogo.html
│
├── js/
│   ├── forms.js            # Array PRODUCTS[], modales, carrito desde modal
│   ├── cart.js             # Carrito completo con localStorage y WhatsApp
│   ├── interactions.js     # Nav, FAQ, carruseles, lightbox de resultados
│   ├── analytics.js        # Carga async Google Analytics
│   ├── hotjar.js           # Carga async ContentSquare/Hotjar
│   └── catalogo.js         # Lógica de catalogo.html
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
    ├── Mascarilla-Nutritiva/
    ├── Rescate-Supremo/
    ├── Fotos de rosa/
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
- **Dominio propio:** `alma-botanica.store` — activo desde 06/07/2026 (DNS en Cloudflare, 301 redirect desde `pages.dev`)
- **Google Search Console:** propiedad `https://alma-botanica.store/` verificada, sitemap enviado el 06/07/2026

---

## 📞 Contacto

**Rosa Pérez — Alma Botánica**

- 📱 WhatsApp: [+57 313 548 7027](https://wa.me/573135487027)
- 📸 Instagram: [@almabotanica26](https://instagram.com/almabotanica26)
- 👤 Facebook: [Alma Botánica](https://www.facebook.com/profile.php?id=61573483268712)
- 🎵 TikTok: [@alma.botnica](https://tiktok.com/@alma.botnica)

---

<p align="center">
  Hecho con 🌿 para <strong>Alma Botánica</strong> · Cartagena de Indias, Colombia
</p>
