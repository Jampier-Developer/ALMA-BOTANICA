/* ── AÑADIDOS DE LA PÁGINA ─────────────────────────────────────────
   Tres cosas pequeñas que comparten archivo porque ninguna da para uno
   propio:

   1. Comparador antes/después con barra deslizante
   2. Modo regalo en el carrito
   3. Datos de entrega en el carrito
*/
(function () {
  'use strict';

  /* ══ 1. COMPARADOR ANTES / DESPUÉS ══════════════════════════════
     Las fotos de las clientas están en carruseles separados: hay que
     pasar de una a otra para comparar. Con una barra que se arrastra,
     el antes y el después se ven a la vez y el cambio salta a la vista.

     Se construye sobre los carruseles que ya existen: se leen sus dos
     imágenes y se monta el comparador al lado, sin tocar el HTML. */
  function montarComparadores() {
    var carruseles = [].slice.call(document.querySelectorAll('.rcard-carousel'));

    carruseles.forEach(function (car, n) {
      var imgs = [].slice.call(car.querySelectorAll('.rc-slide img'));
      if (imgs.length < 2) return;

      /* Cuál es el antes y cuál el después, por el texto de su etiqueta */
      var despues = null, antes = null;
      [].slice.call(car.querySelectorAll('.rc-slide')).forEach(function (sl) {
        var badge = sl.querySelector('.rc-badge');
        var esDespues = badge && /despu[eé]s/i.test(badge.textContent);
        var img = sl.querySelector('img');
        if (!img) return;
        /* Se copian también width y height: el navegador reserva el sitio
           antes de que la foto cargue y la página no da un salto. */
        var datos = {
          src: img.getAttribute('src'),
          w: img.getAttribute('width') || '',
          h: img.getAttribute('height') || ''
        };
        if (esDespues && !despues) despues = datos;
        else if (!esDespues && !antes) antes = datos;
      });
      if (!antes || !despues) return;

      /* Un id distinto por comparador: hay tres en la página y la
         etiqueta tiene que apuntar al suyo. */
      var idRango = 'cmp-rango-' + (n + 1);

      function medidas(d) {
        return (d.w ? ' width="' + d.w + '"' : '') + (d.h ? ' height="' + d.h + '"' : '');
      }

      var caja = document.createElement('div');
      caja.className = 'cmp';
      caja.innerHTML =
        '<div class="cmp-marco">' +
          '<img class="cmp-antes" src="' + antes.src + '" alt="Antes de usar los productos" loading="lazy"' + medidas(antes) + '>' +
          '<div class="cmp-despues-wrap"><img class="cmp-despues" src="' + despues.src + '" alt="Después de usar los productos" loading="lazy"' + medidas(despues) + '></div>' +
          '<span class="cmp-etq cmp-etq-a">Antes</span>' +
          '<span class="cmp-etq cmp-etq-d">Después</span>' +
          '<div class="cmp-tirador" aria-hidden="true"><span></span></div>' +
          '<label class="visually-hidden" for="' + idRango + '">Deslizar para comparar el antes y el después</label>' +
          '<input class="cmp-rango" id="' + idRango + '" type="range" min="0" max="100" value="50">' +
        '</div>';

      car.parentNode.insertBefore(caja, car);
      car.classList.add('rcard-carousel-oculto');

      var wrap = caja.querySelector('.cmp-despues-wrap');
      var tirador = caja.querySelector('.cmp-tirador');
      var rango = caja.querySelector('.cmp-rango');

      function mover(v) {
        wrap.style.clipPath = 'inset(0 0 0 ' + v + '%)';
        tirador.style.left = v + '%';
      }
      rango.addEventListener('input', function () { mover(rango.value); });
      mover(50);
    });
  }

  /* ══ 2 y 3. REGALO Y DATOS DE ENTREGA EN EL CARRITO ═══════════
     Dos bloques que van justo encima del botón "Enviar pedido por
     WhatsApp", porque lo que se escribe en ellos viaja dentro de ese
     mensaje, que es donde Rosa lo lee.

     El carrito (js/cart.js) vuelve a pintar su pie cada vez que cambia
     algo —una cantidad, un producto quitado— y al hacerlo borra lo que
     hubiera dentro. Por eso los bloques no se montan una sola vez: se
     vuelven a poner cada vez que cart.js avisa con 'alma:carrito-pintado',
     y lo escrito vive aquí, en memoria, no en el formulario. Así da
     igual por dónde se abra el carrito (el icono del menú, el "Ver
     carrito" del aviso o el de la confirmación) y da igual cuántas veces
     se repinte: la casilla y los campos salen siempre como se dejaron. */

  /* ── Regalo: casilla, destinatario y dedicatoria ── */
  var regalo = { activo: false, para: '', nota: '' };

  function publicarRegalo() {
    window.ALMA_REGALO = regalo.activo
      ? { para: regalo.para.trim(), nota: regalo.nota.trim() }
      : null;
  }

  function montarRegalo(pie) {
    var bloque = document.createElement('div');
    bloque.className = 'rg-bloque';
    bloque.innerHTML =
      '<label class="rg-check"><input type="checkbox" id="rgEs"> <span>🎁 Es un regalo</span></label>' +
      '<div class="rg-campos" hidden>' +
        '<label class="visually-hidden" for="rgPara">Para quién es</label>' +
        '<input type="text" id="rgPara" class="rg-input" placeholder="¿Para quién es?" maxlength="40">' +
        '<label class="visually-hidden" for="rgNota">Dedicatoria</label>' +
        '<textarea id="rgNota" class="rg-input" rows="2" placeholder="Dedicatoria (opcional)" maxlength="160"></textarea>' +
      '</div>';
    pie.parentNode.insertBefore(bloque, pie);

    var check = bloque.querySelector('#rgEs');
    var campos = bloque.querySelector('.rg-campos');
    var para = bloque.querySelector('#rgPara');
    var nota = bloque.querySelector('#rgNota');

    /* Se devuelve lo que ya había: si la casilla estaba marcada, sigue
       marcada. Antes salía desmarcada pero el pedido seguía llegando a
       Rosa como regalo. */
    check.checked = regalo.activo;
    campos.hidden = !regalo.activo;
    para.value = regalo.para;
    nota.value = regalo.nota;

    check.addEventListener('change', function () {
      regalo.activo = check.checked;
      campos.hidden = !check.checked;
      publicarRegalo();
    });
    bloque.addEventListener('input', function () {
      regalo.para = para.value;
      regalo.nota = nota.value;
      publicarRegalo();
    });
  }

  /* ── Entrega: nombre, barrio y dirección ──
     Antes, el pedido llegaba a Rosa sin saber a quién ni adónde, y ella
     tenía que pedir nombre, barrio y dirección en cuatro mensajes más.
     Con tres campos cortos, el pedido llega completo al primer mensaje.

     No se guarda nada en ningún servidor: lo que se escriba viaja
     dentro del mensaje de WhatsApp y se queda en el navegador
     (botanica_entrega_v1) para no tener que repetirlo la próxima vez.
     Está declarado en la política de cookies y en la de privacidad. */
  var CLAVE_ENTREGA = 'botanica_entrega_v1';
  var entrega = { nombre: '', barrio: '', dir: '' };
  try {
    var guardado = JSON.parse(localStorage.getItem(CLAVE_ENTREGA) || '{}');
    ['nombre', 'barrio', 'dir'].forEach(function (k) {
      if (typeof guardado[k] === 'string') entrega[k] = guardado[k];
    });
  } catch (_) {}

  function publicarEntrega() {
    var d = {
      nombre: entrega.nombre.trim(),
      barrio: entrega.barrio.trim(),
      dir: entrega.dir.trim()
    };
    window.ALMA_ENTREGA = (d.nombre || d.barrio || d.dir) ? d : null;
  }

  function montarEntrega(pie) {
    var bloque = document.createElement('div');
    bloque.className = 'en-bloque';
    bloque.innerHTML =
      '<p class="en-t">¿A dónde te lo llevamos?</p>' +
      '<p class="en-d">Opcional, pero así Rosa no tiene que preguntártelo.</p>' +
      '<label class="visually-hidden" for="enNombre">Tu nombre</label>' +
      '<input type="text" id="enNombre" class="en-input" placeholder="Tu nombre" maxlength="50" autocomplete="name">' +
      '<label class="visually-hidden" for="enBarrio">Tu barrio</label>' +
      '<input type="text" id="enBarrio" class="en-input" placeholder="Tu barrio" maxlength="60" autocomplete="address-level3">' +
      '<label class="visually-hidden" for="enDir">Dirección</label>' +
      '<input type="text" id="enDir" class="en-input" placeholder="Dirección y punto de referencia" maxlength="120" autocomplete="street-address">';
    pie.parentNode.insertBefore(bloque, pie);

    var campos = {
      nombre: bloque.querySelector('#enNombre'),
      barrio: bloque.querySelector('#enBarrio'),
      dir: bloque.querySelector('#enDir')
    };
    Object.keys(campos).forEach(function (k) { campos[k].value = entrega[k]; });

    bloque.addEventListener('input', function () {
      Object.keys(campos).forEach(function (k) { entrega[k] = campos[k].value; });
      try { localStorage.setItem(CLAVE_ENTREGA, JSON.stringify(entrega)); } catch (_) {}
      publicarEntrega();
    });
    publicarEntrega();
  }

  /* cart.js avisa cada vez que pinta el pie con el botón de enviar */
  document.addEventListener('alma:carrito-pintado', function () {
    var pie = document.getElementById('cartSendWa');
    if (!pie || pie.parentNode.querySelector('.rg-bloque')) return;
    montarRegalo(pie);
    montarEntrega(pie);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', montarComparadores);
  } else {
    montarComparadores();
  }
})();
