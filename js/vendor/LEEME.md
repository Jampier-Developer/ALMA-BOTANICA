# js/vendor/

Aquí va código de terceros. Hoy solo hay uno:

## pdf-lib.min.js — v1.17.1

Sirve para escribir el nombre de la persona en la portada del catálogo
antes de que se lo descargue.

**Se guarda aquí a propósito, en vez de traerlo de un CDN.** Tres razones:

1. El sitio no depende de que otro servidor esté vivo.
2. `sw.js` puede guardarlo para que la descarga funcione sin buena señal.
3. Va con el mismo `?v=` que el resto, así que se cachea un año.

**No se carga en ninguna página al abrirla.** `js/forms.js` lo pide solo
cuando alguien pulsa "Descargar catálogo PDF", y si no llega, el catálogo
se descarga igual pero sin el saludo. La descarga nunca se queda colgada
por culpa de esto.

Licencia MIT. Origen:
https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js
