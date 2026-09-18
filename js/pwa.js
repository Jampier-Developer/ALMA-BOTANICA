/* ── INSTALACIÓN Y FUNCIONAMIENTO SIN INTERNET ─────────────────────
   Registra el service worker y, cuando el navegador lo permite, ofrece
   instalar la página como aplicación.

   El service worker se registra siempre (es lo que hace que funcione
   sin señal). El botón de instalar solo sale si el navegador avisa de
   que se puede, y no se insiste a quien ya dijo que no. */
(function () {
  'use strict';

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function () {
        /* Sin service worker el sitio funciona igual, solo que sin la
           copia para cuando no hay señal. No se molesta a nadie. */
      });
    });
  }

  var aviso = null;
  var CLAVE = 'botanica_instalar_no';

  window.addEventListener('beforeinstallprompt', function (ev) {
    ev.preventDefault();

    try { if (localStorage.getItem(CLAVE) === '1') return; } catch (_) {}

    aviso = document.createElement('div');
    aviso.className = 'pwa-aviso';
    aviso.setAttribute('role', 'dialog');
    aviso.setAttribute('aria-label', 'Instalar Alma Botánica');
    aviso.innerHTML =
      '<img class="pwa-logo" src="img/Img%20Logo/LOGO%20-%20ALMA%20BOTANICA.webp" alt="" width="500" height="500">' +
      '<div class="pwa-txt">' +
        '<p class="pwa-t">Tenla siempre a mano</p>' +
        '<p class="pwa-d">Instala Alma Botánica y ábrela como una app, incluso sin internet.</p>' +
      '</div>' +
      '<div class="pwa-btns">' +
        '<button type="button" class="pwa-si">Instalar</button>' +
        '<button type="button" class="pwa-no">Ahora no</button>' +
      '</div>';
    document.body.appendChild(aviso);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { aviso.classList.add('vis'); });
    });

    aviso.querySelector('.pwa-si').addEventListener('click', function () {
      aviso.classList.remove('vis');
      ev.prompt();
      ev.userChoice.then(function (r) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'pwa_instalar', { respuesta: r.outcome });
        }
      });
    });

    aviso.querySelector('.pwa-no').addEventListener('click', function () {
      aviso.classList.remove('vis');
      try { localStorage.setItem(CLAVE, '1'); } catch (_) {}
    });
  });
})();
