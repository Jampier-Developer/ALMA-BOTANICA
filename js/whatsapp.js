/* ── MENSAJE DE WHATSAPP SEGÚN DÓNDE ESTÁ LA PERSONA ───────────────
   El botón flotante mandaba siempre el mismo texto: "Hola Rosa, me
   interesan los productos". Rosa recibía decenas iguales sin saber de
   qué le hablaban y tenía que empezar preguntando.

   Ahora el mensaje cambia según la sección que se esté mirando, y si hay
   algo en el carrito lo menciona. Rosa abre el chat sabiendo ya de qué
   va, y la persona no tiene que explicarse. */
(function () {
  'use strict';

  var boton = document.querySelector('.wa-btn');
  if (!boton) return;

  var WA = '573135487027';

  var POR_SECCION = {
    inicio:     'Hola Rosa! 👋 Estaba viendo la página y quiero saber más de los productos 🌿',
    test:       'Hola Rosa! 👋 Hice el test de la página y quiero que me confirmes qué me conviene 🌿',
    productos:  'Hola Rosa! 👋 Estaba viendo los productos y tengo una duda 🌿',
    nosotras:   'Hola Rosa! 👋 Me encantó conocer tu historia. Quiero probar tus productos 🌿',
    resultados: 'Hola Rosa! 👋 Vi los resultados de tus clientas y quiero saber qué me recomiendas a mí 🌿',
    faq:        'Hola Rosa! 👋 Tengo una pregunta que no encontré en las frecuentes 🌿',
    'rutina-sec':      'Hola Rosa! 👋 Vi la rutina de la página y quiero que me ayudes a armar la mía 🌿',
    'ingredientes-sec':'Hola Rosa! 👋 Estaba leyendo sobre los ingredientes y quiero saber cuál me conviene 🌿',
    'resenas-sec':     'Hola Rosa! 👋 Vi las reseñas y quiero probar los productos 🌿',
    dura:       'Hola Rosa! 👋 Quiero saber cuánto me rendiría un producto para mi cabello 🌿',
    ubicacion:  'Hola Rosa! 👋 Quiero saber el horario y cómo hago para recibir mi pedido 🌿'
  };

  var seccionActual = 'inicio';

  function texto() {
    var base = POR_SECCION[seccionActual] || POR_SECCION.inicio;

    /* Si ya tiene productos en el carrito, se lo dice a Rosa: es la
       persona con más intención de compra de toda la página. */
    var n = typeof window.cartGetCount === 'function' ? window.cartGetCount() : 0;
    if (n > 0) {
      base += '\n\nTengo ' + n + (n === 1 ? ' producto' : ' productos') + ' en el carrito de la página.';
    }
    return base;
  }

  function refrescar() {
    boton.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(texto());
  }

  /* Qué sección se está mirando. Se usa IntersectionObserver, que es lo
     que ya usa el resto del sitio para las animaciones al hacer scroll. */
  var secciones = [].slice.call(document.querySelectorAll('section[id], div[id="inicio"]'))
    .filter(function (s) { return POR_SECCION[s.id]; });

  if (secciones.length && 'IntersectionObserver' in window) {
    var vigia = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { seccionActual = e.target.id; refrescar(); }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });   /* la que cruza el centro */
    secciones.forEach(function (s) { vigia.observe(s); });
  }

  /* El carrito puede cambiar sin que cambie la sección */
  document.addEventListener('click', function () { setTimeout(refrescar, 120); });

  refrescar();
})();
