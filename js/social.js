/* ── AVISO DE PEDIDOS RECIENTES ────────────────────────────────────
   Un aviso discreto abajo a la izquierda: "Marcela, de Cartagena, pidió
   un Kit Romero hace 2 horas". Funciona porque ver que otras personas
   compran quita el miedo a ser el primero.

   ⚠️ LOS PEDIDOS TIENEN QUE SER REALES.

   El archivo js/pedidos.js es el que manda. Hoy trae ejemplos, marcados
   uno a uno con ejemplo:true, para que se vea cómo queda. Mientras haya
   ejemplos, el aviso lleva la palabra "Ejemplo" a la vista y NO se
   muestra a los visitantes: solo aparece si se abre la página con
   ?demo=1 al final de la dirección.

   Para ponerlo en marcha de verdad: Rosa anota sus pedidos en
   js/pedidos.js, se les quita el ejemplo:true, y el aviso empieza a
   salir solo. Inventar pedidos que no existen es publicidad engañosa
   (Ley 1480 de 2011) además de una forma rápida de perder la confianza
   de la gente. */
(function () {
  'use strict';

  var pedidos = window.ALMA_PEDIDOS;
  if (!pedidos || !pedidos.length) return;

  var esDemo = /[?&]demo=1\b/.test(window.location.search);
  var hayEjemplos = pedidos.some(function (p) { return p.ejemplo; });
  var reales = pedidos.filter(function (p) { return !p.ejemplo; });

  /* Con ejemplos dentro solo se muestra en modo demo. Si ya hay pedidos
     reales, se usan solo esos y se muestra a todo el mundo. */
  var lista = esDemo ? pedidos : reales;
  if (!lista.length) return;

  var PRIMERO_MS = 14000;   /* tiempo antes del primero */
  var ENTRE_MS = 26000;     /* tiempo entre uno y el siguiente */
  var VISIBLE_MS = 7000;    /* cuánto se queda en pantalla */

  var caja = document.createElement('div');
  caja.className = 'ps-aviso';
  caja.setAttribute('role', 'status');
  caja.setAttribute('aria-live', 'polite');
  document.body.appendChild(caja);

  var turno = 0;
  var relojes = [];

  function haceCuanto(min) {
    if (min < 60) return 'hace ' + min + ' min';
    var h = Math.round(min / 60);
    if (h < 24) return 'hace ' + h + (h === 1 ? ' hora' : ' horas');
    var d = Math.round(h / 24);
    return 'hace ' + d + (d === 1 ? ' día' : ' días');
  }

  function pintar() {
    var p = lista[turno % lista.length];
    turno++;
    caja.innerHTML =
      (p.ejemplo ? '<span class="ps-demo">Ejemplo</span>' : '') +
      (p.imagen ? '<div class="ps-img"><img src="' + p.imagen + '" alt="" loading="lazy"></div>' : '<div class="ps-img ps-img-hoja">🌿</div>') +
      '<div class="ps-txt">' +
        '<p class="ps-linea"><strong>' + p.nombre + '</strong>, de ' + p.lugar + '</p>' +
        '<p class="ps-prod">pidió ' + p.producto + '</p>' +
        '<p class="ps-cuando">' + haceCuanto(p.hace) + '</p>' +
      '</div>' +
      '<button type="button" class="ps-cerrar" aria-label="Cerrar aviso">✕</button>';
    caja.classList.add('vis');
    relojes.push(setTimeout(ocultar, VISIBLE_MS));
  }

  function ocultar() {
    caja.classList.remove('vis');
    relojes.push(setTimeout(pintar, ENTRE_MS));
  }

  caja.addEventListener('click', function (ev) {
    if (!ev.target.closest('.ps-cerrar')) return;
    caja.classList.remove('vis');
    relojes.forEach(clearTimeout);
    relojes = [];
    try { sessionStorage.setItem('botanica_avisos_off', '1'); } catch (_) {}
  });

  /* Si ya los cerró en esta visita, no se vuelve a insistir */
  try {
    if (sessionStorage.getItem('botanica_avisos_off') === '1') return;
  } catch (_) {}

  /* No se arranca hasta que el banner de cookies deje la pantalla libre */
  function arrancar() { relojes.push(setTimeout(pintar, PRIMERO_MS)); }
  if (document.body.classList.contains('ck-abierto')) {
    document.addEventListener('alma:cookies-resueltas', arrancar, { once: true });
  } else {
    arrancar();
  }
})();
