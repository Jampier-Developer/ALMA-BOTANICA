/* ── WHATSAPP: TODO MENSAJE DICE QUE VIENE DE LA PÁGINA ─────────────
   A Rosa le escriben por WhatsApp desde muchos sitios: Instagram,
   TikTok, recomendaciones, tarjetas… Para que sepa al instante cuáles
   vienen de la página web, TODO mensaje que sale del sitio empieza
   igual:

     ¡Hola Rosa! 🌿 Vengo de la página web de Alma Botánica.

   y sigue con lo que la persona eligió: el producto, el pedido, la
   duda. Ejemplo: "¡Hola Rosa! 🌿 Vengo de la página web de Alma
   Botánica. Me interesa *Shampoo Romero* ($32.000)…".

   Este archivo es el ÚNICO sitio donde vive ese saludo:

   - ALMA_WA.enlace(texto) arma el enlace a wa.me con el saludo delante.
     Lo usan el carrito, la ficha del producto, el test, las reseñas y
     el botón flotante.
   - Además vigila TODOS los enlaces a WhatsApp de la página, también
     los que se pintan después, y si a alguno le falta el saludo se lo
     pone. Así no se escapa ninguno, ni uno nuevo que se añada mañana
     sin acordarse de esto. Lo mismo con window.open.

   Los enlaces escritos a mano en el HTML ya llevan el saludo dentro,
   para que funcionen igual sin JavaScript. Si se cambia el saludo, hay
   que cambiarlo aquí y en esos enlaces (el README explica cómo).

   Se carga en todas las páginas y antes que los demás scripts. */
(function () {
  'use strict';

  var NUMERO = '573135487027';
  var SALUDO = '¡Hola Rosa! 🌿 Vengo de la página web de Alma Botánica.';
  /* Lo que se busca para saber si un mensaje ya lleva el saludo */
  var MARCA = 'Vengo de la página web de Alma Botánica';

  /* Si un texto viejo empieza con su propio "Hola Rosa!", se le quita
     para no saludar dos veces. */
  function sinSaludoPropio(t) {
    return t.replace(/^\s*[¡!]?\s*hola\s+rosa\b[\s!¡,.:👋🌿]*/iu, '');
  }

  function conSaludo(texto) {
    var t = String(texto || '').trim();
    if (t.indexOf(MARCA) !== -1) return t;
    t = sinSaludoPropio(t);
    return t ? SALUDO + ' ' + t : SALUDO;
  }

  function enlace(texto) {
    return 'https://wa.me/' + NUMERO + '?text=' + encodeURIComponent(conSaludo(texto));
  }

  function esWhatsApp(url) {
    return /^(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com|whatsapp\.com|www\.whatsapp\.com)$/i.test(url.hostname);
  }

  /* Devuelve la misma dirección con el saludo dentro del texto, o la
     dirección tal cual si no es de WhatsApp o ya lo tenía. */
  function normalizarUrl(direccion) {
    if (typeof direccion !== 'string' || !/wa\.me|whatsapp/i.test(direccion)) return direccion;
    var url;
    try { url = new URL(direccion, location.href); } catch (_) { return direccion; }
    if (!esWhatsApp(url)) return direccion;
    var texto = url.searchParams.get('text') || '';
    if (texto.indexOf(MARCA) !== -1) return direccion;
    /* Se rearma a mano con encodeURIComponent (espacios como %20, que es
       lo que mejor entiende WhatsApp) y se conservan los demás datos. */
    var partes = [];
    url.searchParams.forEach(function (valor, clave) {
      if (clave !== 'text') partes.push(encodeURIComponent(clave) + '=' + encodeURIComponent(valor));
    });
    partes.push('text=' + encodeURIComponent(conSaludo(texto)));
    return url.origin + url.pathname + '?' + partes.join('&') + url.hash;
  }

  function normalizarEnlace(a) {
    if (!a || a.tagName !== 'A') return;
    var href = a.getAttribute('href');
    if (!href) return;
    var nuevo = normalizarUrl(href);
    if (nuevo !== href) a.setAttribute('href', nuevo);
  }

  function normalizarDentro(raiz) {
    if (!raiz || !raiz.querySelectorAll) return;
    if (raiz.tagName === 'A') normalizarEnlace(raiz);
    var enlaces = raiz.querySelectorAll('a[href]');
    for (var i = 0; i < enlaces.length; i++) normalizarEnlace(enlaces[i]);
  }

  window.ALMA_WA = {
    numero: NUMERO,
    saludo: SALUDO,
    conSaludo: conSaludo,
    enlace: enlace,
    normalizarUrl: normalizarUrl
  };

  /* window.open: el carrito abre WhatsApp así */
  var abrirOriginal = window.open;
  if (typeof abrirOriginal === 'function') {
    window.open = function (direccion) {
      var args = Array.prototype.slice.call(arguments);
      args[0] = normalizarUrl(direccion);
      return abrirOriginal.apply(window, args);
    };
  }

  /* Justo antes de seguir un enlace (clic, clic central, teclado) */
  function alPulsar(ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
    if (a) normalizarEnlace(a);
  }
  document.addEventListener('click', alPulsar, true);
  document.addEventListener('auxclick', alPulsar, true);

  /* Los que ya están y los que se pinten o cambien después. Se vigila
     el href para que también salga bien "copiar enlace". */
  function arrancar() {
    normalizarDentro(document.body);
    if (!('MutationObserver' in window)) return;
    new MutationObserver(function (cambios) {
      for (var i = 0; i < cambios.length; i++) {
        var c = cambios[i];
        if (c.type === 'attributes') normalizarEnlace(c.target);
        else for (var j = 0; j < c.addedNodes.length; j++) normalizarDentro(c.addedNodes[j]);
      }
    }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['href'] });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arrancar);
  else arrancar();
})();
