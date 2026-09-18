/* ── AÑADIDOS DE LA PÁGINA ─────────────────────────────────────────
   Tres cosas pequeñas que comparten archivo porque ninguna da para uno
   propio:

   1. Comparador antes/después con barra deslizante
   2. Calculadora "¿cuánto me dura?"
   3. Modo regalo en el carrito
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

    carruseles.forEach(function (car) {
      var imgs = [].slice.call(car.querySelectorAll('.rc-slide img'));
      if (imgs.length < 2) return;

      /* Cuál es el antes y cuál el después, por el texto de su etiqueta */
      var despues = null, antes = null;
      [].slice.call(car.querySelectorAll('.rc-slide')).forEach(function (sl) {
        var badge = sl.querySelector('.rc-badge');
        var esDespues = badge && /despu[eé]s/i.test(badge.textContent);
        var img = sl.querySelector('img');
        if (!img) return;
        if (esDespues && !despues) despues = img.getAttribute('src');
        else if (!esDespues && !antes) antes = img.getAttribute('src');
      });
      if (!antes || !despues) return;

      var caja = document.createElement('div');
      caja.className = 'cmp';
      caja.innerHTML =
        '<div class="cmp-marco">' +
          '<img class="cmp-antes" src="' + antes + '" alt="Antes de usar los productos" loading="lazy">' +
          '<div class="cmp-despues-wrap"><img class="cmp-despues" src="' + despues + '" alt="Después de usar los productos" loading="lazy"></div>' +
          '<span class="cmp-etq cmp-etq-a">Antes</span>' +
          '<span class="cmp-etq cmp-etq-d">Después</span>' +
          '<div class="cmp-tirador" aria-hidden="true"><span></span></div>' +
          '<label class="visually-hidden" for="' + (car.id || 'cmp') + '-rango">Deslizar para comparar el antes y el después</label>' +
          '<input class="cmp-rango" id="' + (car.id || 'cmp') + '-rango" type="range" min="0" max="100" value="50" aria-label="Deslizar para comparar">' +
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

  /* ══ 2. CALCULADORA "¿CUÁNTO ME DURA?" ═════════════════════════
     Un shampoo de $32.000 parece caro al lado de uno de supermercado,
     hasta que se ve lo que cuesta cada lavado. Esto lo pone en números
     sin prometer nada que no se pueda sostener. */
  function montarCalculadora() {
    var caja = document.getElementById('calculadora');
    if (!caja) return;

    /* Mililitros por uso, con el largo del cabello de por medio.
       Son cantidades de uso normal; se dice en la página que son
       aproximadas, porque cada persona usa lo que usa. */
    var POR_USO = { corto: 10, medio: 16, largo: 24 };
    var PRODUCTOS = [
      { nombre: 'Shampoo',              ml: 500, precio: 32000 },
      { nombre: 'Acondicionador',       ml: 500, precio: 32000 },
      { nombre: 'Tónico Capilar',       ml: 120, precio: 15000, porUso: 3 },
      { nombre: 'Mascarilla Nutritiva', ml: 120, precio: 25000, cada: 7 },
      { nombre: 'Tratamiento Capilar',  ml: 250, precio: 25000, cada: 7 }
    ];

    var largo = 'medio', lavados = 3, producto = 0;

    function pintar() {
      var p = PRODUCTOS[producto];
      var ml = p.porUso || POR_USO[largo];
      var usosSemana = p.cada ? (7 / p.cada) : lavados;
      var usos = Math.floor(p.ml / ml);
      var semanas = usos / usosSemana;
      var meses = semanas / 4.345;
      var porUso = Math.round(p.precio / usos);

      caja.querySelector('.cal-res').innerHTML =
        '<div class="cal-dato"><strong>' + (meses >= 1 ? (Math.round(meses * 10) / 10).toString().replace('.', ',') : (Math.round(semanas * 10) / 10).toString().replace('.', ',')) + '</strong>' +
          '<span>' + (meses >= 1 ? (Math.round(meses * 10) === 10 ? 'mes' : 'meses') : 'semanas') + ' de duración</span></div>' +
        '<div class="cal-dato"><strong>' + usos + '</strong><span>usos aproximados</span></div>' +
        '<div class="cal-dato cal-dato-destacado"><strong>$' + porUso.toLocaleString('es-CO').replace(/,/g, '.') + '</strong><span>por cada uso</span></div>';
    }

    caja.innerHTML =
      '<div class="cal-card">' +
        '<div class="cal-campos">' +
          '<div class="cal-campo">' +
            '<label for="calProd">Producto</label>' +
            '<select id="calProd">' + PRODUCTOS.map(function (p, i) { return '<option value="' + i + '">' + p.nombre + ' · ' + p.ml + " ml</option>"; }).join('') + '</select>' +
          '</div>' +
          '<div class="cal-campo">' +
            '<label for="calLargo">Largo de tu cabello</label>' +
            '<select id="calLargo"><option value="corto">Corto</option><option value="medio" selected>Media melena</option><option value="largo">Largo</option></select>' +
          '</div>' +
          '<div class="cal-campo">' +
            '<label for="calLav">Lavados por semana</label>' +
            '<select id="calLav"><option value="2">2</option><option value="3" selected>3</option><option value="4">4</option><option value="5">5</option><option value="7">A diario</option></select>' +
          '</div>' +
        '</div>' +
        '<div class="cal-res"></div>' +
        '<p class="cal-nota">Son cálculos aproximados: cada cabello y cada mano usan distinto. Sirven para hacerse una idea de lo que cuesta cada lavado.</p>' +
      '</div>';

    caja.querySelector('#calProd').addEventListener('change', function (e) { producto = +e.target.value; pintar(); });
    caja.querySelector('#calLargo').addEventListener('change', function (e) { largo = e.target.value; pintar(); });
    caja.querySelector('#calLav').addEventListener('change', function (e) { lavados = +e.target.value; pintar(); });
    pintar();
  }

  /* ══ 3. MODO REGALO ════════════════════════════════════════════
     Una casilla en el carrito para avisar que el pedido es un regalo y
     dejarle una dedicatoria. Va dentro del mensaje de WhatsApp, que es
     donde Rosa lo va a leer. */
  function montarRegalo() {
    var drawer = document.getElementById('cartDrawer');
    if (!drawer) return;

    document.addEventListener('click', function (ev) {
      if (!ev.target.closest('#cartBtn') && !ev.target.closest('.cart-btn')) return;
      setTimeout(function () {
        if (drawer.querySelector('.rg-bloque')) return;
        var pie = drawer.querySelector('#cartSendWa');
        if (!pie) return;

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
        check.addEventListener('change', function () {
          campos.hidden = !check.checked;
          window.ALMA_REGALO = check.checked ? datos() : null;
        });
        bloque.addEventListener('input', function () {
          if (check.checked) window.ALMA_REGALO = datos();
        });
        function datos() {
          return {
            para: (bloque.querySelector('#rgPara').value || '').trim(),
            nota: (bloque.querySelector('#rgNota').value || '').trim()
          };
        }
      }, 120);
    });
  }

  /* ══ 4. DATOS DE ENTREGA ═══════════════════════════════════════
     Antes, el pedido llegaba a Rosa sin saber a quién ni adónde, y ella
     tenía que pedir nombre, barrio y dirección en cuatro mensajes más.
     Con tres campos cortos, el pedido llega completo al primer mensaje.

     No se guarda nada en ningún servidor: lo que se escriba viaja
     dentro del mensaje de WhatsApp y se queda en el navegador para no
     tener que repetirlo la próxima vez. */
  function montarEntrega() {
    var drawer = document.getElementById('cartDrawer');
    if (!drawer) return;
    var CLAVE = 'botanica_entrega_v1';

    document.addEventListener('click', function (ev) {
      if (!ev.target.closest('#cartBtn') && !ev.target.closest('.cart-btn')) return;
      setTimeout(function () {
        if (drawer.querySelector('.en-bloque')) return;
        var pie = drawer.querySelector('#cartSendWa');
        if (!pie) return;

        var guardado = {};
        try { guardado = JSON.parse(localStorage.getItem(CLAVE) || '{}'); } catch (_) {}

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

        ['Nombre', 'Barrio', 'Dir'].forEach(function (c) {
          var el = bloque.querySelector('#en' + c);
          if (guardado[c.toLowerCase()]) el.value = guardado[c.toLowerCase()];
        });

        function recoger() {
          return {
            nombre: bloque.querySelector('#enNombre').value.trim(),
            barrio: bloque.querySelector('#enBarrio').value.trim(),
            dir:    bloque.querySelector('#enDir').value.trim()
          };
        }
        function volcar() {
          var d = recoger();
          window.ALMA_ENTREGA = (d.nombre || d.barrio || d.dir) ? d : null;
          try { localStorage.setItem(CLAVE, JSON.stringify(d)); } catch (_) {}
        }
        bloque.addEventListener('input', volcar);
        volcar();
      }, 120);
    });
  }

  function arrancar() {
    montarComparadores();
    montarCalculadora();
    montarRegalo();
    montarEntrega();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', arrancar);
  } else {
    arrancar();
  }
})();
