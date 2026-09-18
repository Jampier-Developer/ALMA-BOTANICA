# Generador del catálogo en PDF

Arma `catalogo-alma-botanica.pdf` (el que está en la raíz del sitio) a
partir de los datos que ya viven en la web, para que el PDF y la página
nunca digan cosas distintas:

- los productos y sus precios salen de `PRODUCTS[]` en `js/forms.js`
- las fotos salen de `img/`
- los colores y las tipografías son los de `css/reset.css`

**Esta carpeta no forma parte del sitio.** Cloudflare Pages la publica
porque publica todo, pero ninguna página la enlaza y no contiene nada
privado. Si algún día estorba, se borra y el sitio sigue igual.

## Cuándo hay que volver a generarlo

Cuando cambie un precio, se agregue un producto o se cambie una foto.
Ojo: los precios viven en tres sitios y hay que tocarlos todos antes de
regenerar (está explicado en el README de la raíz).

También conviene actualizar la línea de vigencia de la última página,
que hoy dice *"Precios vigentes a septiembre de 2026"*. Está en la
función `order()` de `build.js`.

## Cómo se genera

Hace falta Node y Python con Pillow. Desde esta carpeta:

```bash
npm install playwright          # solo la primera vez
pip install Pillow              # solo la primera vez

node extraer-productos.js       # js/forms.js  -> products.json
python3 preparar-imagenes.py    # img/*.webp   -> img/*.jpg (+ el logo en png)
node descargar-fuentes.js       # Google Fonts -> fonts-embed.css
node build.js                   # todo lo anterior -> catalogo.html
node check.js                   # avisa si alguna página corta texto
node render.js                  # catalogo.html -> Catalogo-Alma-Botanica.pdf
python3 poner-metadata.py       # título y autor dentro del PDF
```

Y se copia el resultado a la raíz:

```bash
cp Catalogo-Alma-Botanica.pdf ../../catalogo-alma-botanica.pdf
```

> `render.js` y `check.js` apuntan a un Chromium concreto en
> `executablePath`. En otro equipo se quita esa línea y Playwright usa el
> suyo.

## Por qué las fotos se pasan a JPEG

Chromium vuelve a comprimir cada imagen al exportar el PDF. Con WebP las
guarda sin pérdida y el archivo se va a más de 40 MB; con JPEG las copia
tal cual y baja a unos 5 MB. El logo es la excepción: va sobre el
degradado de la portada, necesita transparencia real y por eso se guarda
en PNG.

## `check.js`

Mide, página por página, hasta dónde llega el contenido y lo compara con
el alto útil de la hoja. Si algo se sale, lo dice y nombra al culpable.
Es lo que detectó que el Kit Rutina Completa, con sus 8 presentaciones,
no cabía en una sola página — por eso ahora ocupa dos.
